const MOCK_REPLY =
  "可以，我會建議先從「目標客群、主要服務、需要的聯絡方式」開始整理。如果你是店家或工作室，通常先做一頁式網站加表單 / LINE CTA；如果有很多詢問與狀態要追蹤，再加 LINE Bot 或簡易後台。這是 Demo 回覆，正式內容會依你的需求調整。"

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

async function callOpenAI(messages) {
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
            "你是 Qingyu Web Studio 的台灣小型網站顧問。用繁體中文、簡短、務實。不要亂承諾價格，不要宣稱已替真實客戶完成，清楚標示這是 Demo 建議。",
        },
        ...messages.slice(-8),
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`)
  }

  const data = await response.json()
  return data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("") || MOCK_REPLY
}

export default async function handler(req, res) {
  setCors(res)

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = readBody(req)
  const message = String(body.message || "").trim()
  const history = Array.isArray(body.history) ? body.history : []
  if (!message) return res.status(400).json({ error: "請先輸入問題。", reply: MOCK_REPLY, source: "mock" })

  const messages = [
    ...history.map((item) => ({
      role: item.role === "assistant" ? "assistant" : "user",
      content: String(item.content || ""),
    })),
    { role: "user", content: message },
  ]

  try {
    const reply = await callOpenAI(messages)
    return res.status(200).json({ reply: reply || MOCK_REPLY, source: reply ? "openai" : "mock_no_key" })
  } catch (error) {
    console.warn("[chat] fallback:", error.message)
    return res.status(200).json({ reply: MOCK_REPLY, source: "mock_error_fallback" })
  }
}
