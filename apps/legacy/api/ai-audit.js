const MOCK_REPORT = {
  score: 82,
  summary: "這份網站方向已經清楚，但首頁需要更快說明服務對象、主要 CTA 與信任證據，讓台灣小型店家或工作室能在 10 秒內判斷是否要聯絡你。",
  seo: [
    "首頁 title 建議包含「台灣網站製作、作品集、一頁式網站」等主要關鍵字。",
    "description 要說清楚服務對象、交付內容與聯絡方式，不要只寫品牌名稱。",
  ],
  cta: [
    "第一屏保留一個主要 CTA，例如「免費網站健檢」或「聊聊需求」。",
    "次要 CTA 可以放「看作品」，避免訪客不知道下一步。",
  ],
  copywriting: [
    "首頁標題先說結果，例如「讓你的服務被看懂」，細節放在副標。",
    "服務卡片用客戶看得懂的語言，不要一開始堆滿技術詞。",
  ],
  trust: [
    "加入作品案例、製作流程、聯絡方式與常見交付項目。",
    "若有 Demo，標示哪些是 mock、哪些可以真正互動，會更有可信度。",
  ],
  mobile: [
    "手機第一屏要看到標題、短描述與 CTA，避免過多卡片擠在一起。",
    "按鈕高度至少 40px，表單欄位要有清楚 label 與錯誤提示。",
  ],
  nextSteps: [
    "重整首頁第一屏標題與 CTA",
    "補上 3 到 5 個作品案例的實際 Demo 入口",
    "檢查 sitemap、Open Graph 與 canonical",
    "用手機實測首頁與作品頁是否能順暢閱讀",
  ],
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

function normalizeReport(value) {
  const report = value && typeof value === "object" ? value : {}
  return {
    score: clampScore(report.score),
    summary: nonEmptyText(report.summary, MOCK_REPORT.summary),
    seo: stringList(report.seo, MOCK_REPORT.seo),
    cta: stringList(report.cta, MOCK_REPORT.cta),
    copywriting: stringList(report.copywriting, MOCK_REPORT.copywriting),
    trust: stringList(report.trust, MOCK_REPORT.trust),
    mobile: stringList(report.mobile, MOCK_REPORT.mobile),
    nextSteps: stringList(report.nextSteps, MOCK_REPORT.nextSteps),
  }
}

function clampScore(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return MOCK_REPORT.score
  return Math.max(0, Math.min(100, Math.round(number)))
}

function nonEmptyText(value, fallback) {
  const text = String(value || "").trim()
  return text || fallback
}

function stringList(value, fallback) {
  if (!Array.isArray(value)) return fallback
  const items = value.map((item) => String(item || "").trim()).filter(Boolean)
  return items.length ? items : fallback
}

function parseOpenAIText(text) {
  try {
    return normalizeReport(JSON.parse(text))
  } catch {
    return {
      ...MOCK_REPORT,
      summary: text?.trim() || MOCK_REPORT.summary,
    }
  }
}

async function callOpenAI(input) {
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
            "你是一位台灣網站顧問，請用台灣小型店家、個人品牌、工作室看得懂的語氣，分析網站首頁文案、CTA、SEO、信任感、手機版體驗，並提出可執行建議。只回傳 JSON，不要 markdown。格式固定為：{ score:number, summary:string, seo:string[], cta:string[], copywriting:string[], trust:string[], mobile:string[], nextSteps:string[] }。",
        },
        {
          role: "user",
          content: `請分析這個網站網址或需求：${input}`,
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
  const text =
    data.output_text ||
    data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("") ||
    ""
  return parseOpenAIText(text)
}

export default async function handler(req, res) {
  setCors(res)

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = readBody(req)
  const input = String(body.input || "").trim()

  if (!input) {
    return res.status(400).json({ error: "請先輸入網站網址或網站描述。" })
  }

  try {
    const report = await callOpenAI(input)
    return res.status(200).json(report || MOCK_REPORT)
  } catch (error) {
    console.warn("[ai-audit] fallback:", error.message)
    return res.status(200).json(MOCK_REPORT)
  }
}
