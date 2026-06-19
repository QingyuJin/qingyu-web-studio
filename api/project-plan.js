const MOCK_AI_PLAN = {
  recommendedPackage: "LINE Bot 詢價方案",
  summary:
    "建議先做一個可以收集需求的 LINE Bot，加上一個簡易後台整理客戶資料與追蹤狀態。第一版先確認客戶會怎麼詢問，再決定是否擴充預約、通知或 AI 回覆。",
  features: ["LINE 需求引導", "預約 / 詢價表單", "後台案件列表", "狀態追蹤", "LINE 聯絡入口"],
  techStack: ["React", "Tailwind CSS", "Vercel Serverless Function", "LINE Messaging API", "Supabase"],
  timeline: ["第 1 階段：整理需求欄位與對話流程", "第 2 階段：完成前端 Demo 與後台畫面", "第 3 階段：串接 Webhook 與資料庫"],
  risks: ["需要確認 LINE 官方帳號與 webhook 權限", "預約與通知規則要先定義清楚", "第一版不建議一次塞太多自動化"],
  nextSteps: ["準備 3～5 個常見客戶詢問情境", "確認需要收集的欄位", "先做可展示 MVP 再評估正式串接"],
  estimatedComplexity: "中",
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

function readBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body || {}
}

function text(value) {
  return String(value || "").trim()
}

function list(value, fallback = []) {
  if (!Array.isArray(value)) return fallback
  const items = value.map((item) => text(item)).filter(Boolean)
  return items.length ? items : fallback
}

function normalizePlan(value) {
  const plan = value && typeof value === "object" ? value : {}
  return {
    recommendedPackage: text(plan.recommendedPackage) || MOCK_AI_PLAN.recommendedPackage,
    summary: text(plan.summary) || MOCK_AI_PLAN.summary,
    features: list(plan.features, MOCK_AI_PLAN.features),
    techStack: list(plan.techStack, MOCK_AI_PLAN.techStack),
    timeline: list(plan.timeline, MOCK_AI_PLAN.timeline),
    risks: list(plan.risks, MOCK_AI_PLAN.risks),
    nextSteps: list(plan.nextSteps, MOCK_AI_PLAN.nextSteps),
    estimatedComplexity: text(plan.estimatedComplexity) || MOCK_AI_PLAN.estimatedComplexity,
  }
}

function parseOpenAIText(outputText) {
  try {
    return normalizePlan(JSON.parse(outputText))
  } catch {
    return normalizePlan({
      ...MOCK_AI_PLAN,
      summary: text(outputText) || MOCK_AI_PLAN.summary,
    })
  }
}

function validateAnswers(answers) {
  if (!answers || typeof answers !== "object") return false
  const required = ["profile", "goal", "budget", "timeline"]
  const hasRequired = required.every((key) => text(answers[key]))
  return hasRequired && Array.isArray(answers.features) && answers.features.length > 0
}

async function callOpenAI(answers, ruleBasedResult) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "你是一位台灣網站與小系統顧問。請根據使用者身份、想做的東西、功能需求、預算區間、上線時間，產生實際可執行的網站 / 系統 / AI 工具 / LINE Bot 規劃。語氣要清楚、務實、不亂承諾。不要保證價格，不要說一定能完成，只給合理方向。只回傳 JSON，格式為 { recommendedPackage:string, summary:string, features:string[], techStack:string[], timeline:string[], risks:string[], nextSteps:string[], estimatedComplexity:string }。",
        },
        {
          role: "user",
          content: JSON.stringify({ answers, ruleBasedResult }),
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`)
  }

  const data = await response.json()
  const outputText =
    data.output_text ||
    data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("") ||
    ""
  return parseOpenAIText(outputText)
}

export default async function handler(req, res) {
  setCors(res)

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = readBody(req)
  const answers = body.answers || {}
  const ruleBasedResult = body.ruleBasedResult || {}

  if (!validateAnswers(answers)) {
    return res.status(400).json({ error: "請先完成身份、目標、功能、預算與上線時間。" })
  }

  try {
    const plan = await callOpenAI(answers, ruleBasedResult)
    return res.status(200).json(plan || normalizePlan({
      ...MOCK_AI_PLAN,
      recommendedPackage: text(ruleBasedResult.planName) || MOCK_AI_PLAN.recommendedPackage,
      estimatedComplexity: text(ruleBasedResult.complexity) || MOCK_AI_PLAN.estimatedComplexity,
      features: list(ruleBasedResult.recommendedFeatures, MOCK_AI_PLAN.features),
      techStack: list(ruleBasedResult.tech, MOCK_AI_PLAN.techStack),
    }))
  } catch (error) {
    console.warn("[project-plan] fallback:", error.message)
    return res.status(200).json(MOCK_AI_PLAN)
  }
}
