const MOCK_REPORT = {
  source: "mock",
  summary: "這個網站方向可以成立，但首頁需要更快說清楚服務、客群與聯絡方式。",
  scores: {
    clarity: 82,
    cta: 74,
    seo: 78,
    trust: 86,
    mobile: 80,
  },
  sections: [
    {
      title: "首頁標題",
      finding: "標題需要在 5 秒內說清楚你提供什麼服務。",
      suggestion: "建議使用「讓你的服務被看懂」這類短句，再用副標補充服務範圍。",
    },
    {
      title: "首頁文案",
      finding: "副標需要說清楚服務對象、交付內容與下一步行動。",
      suggestion: "建議用 1～2 句補充：服務對象、可做項目、聯絡方式，不要一開始堆太多技術詞。",
    },
    {
      title: "CTA",
      finding: "聯絡入口要比作品說明更容易被看到。",
      suggestion: "第一屏保留 1 個主要 CTA，例如「聊聊需求」，次要 CTA 放「看作品」。",
    },
    {
      title: "SEO",
      finding: "title 與 description 應包含地區、服務與客群。",
      suggestion: "可使用「台灣網站製作、AI 工具與 LINE Bot 開發」這類明確描述。",
    },
    {
      title: "台灣客戶信任感",
      finding: "小型店家會先看案例、流程、價格區間與聯絡方式。",
      suggestion: "補上精選作品、製作流程、簡單價格方向與 Email / LINE CTA。",
    },
    {
      title: "手機版",
      finding: "手機第一屏不宜塞太多技術詞或卡片。",
      suggestion: "保留短標題、副標、兩個按鈕，作品展示往下放。",
    },
  ],
  nextSteps: ["收斂首頁主標題", "補清楚 CTA", "整理 3～5 個精選作品", "確認手機版第一屏"],
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

function jsonFromResponseText(text) {
  try {
    return JSON.parse(text)
  } catch {
    return {
      ...MOCK_REPORT,
      source: "openai_text_fallback",
      summary: text || MOCK_REPORT.summary,
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
            "你是台灣小型網站顧問。請用繁體中文，輸出 JSON，不要 markdown。欄位：summary, scores{clarity,cta,seo,trust,mobile}, sections[{title,finding,suggestion}], nextSteps[]。不要承諾固定價格。",
        },
        {
          role: "user",
          content: `請健檢這個網站或需求：${input}`,
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
  const text = data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("") || ""
  return {
    ...jsonFromResponseText(text),
    source: "openai",
  }
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
    return res.status(400).json({ error: "請先輸入網站網址或需求描述。", fallback: MOCK_REPORT })
  }

  try {
    const report = await callOpenAI(input)
    return res.status(200).json(report || { ...MOCK_REPORT, source: "mock_no_key" })
  } catch (error) {
    console.warn("[ai-audit] fallback:", error.message)
    return res.status(200).json({
      ...MOCK_REPORT,
      source: "mock_error_fallback",
      warning: "AI 暫時無法回覆，已使用 mock report。",
    })
  }
}
