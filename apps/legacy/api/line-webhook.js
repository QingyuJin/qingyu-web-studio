import crypto from "node:crypto"

const MOCK_REPLY =
  "可以，我可以先幫你判斷適合網站、LINE Bot 還是小系統。你可以提供：產業、需要的功能、預算區間、希望上線時間。"

function safeModeStatus() {
  return {
    openAI: process.env.OPENAI_API_KEY ? "OpenAI ready" : "Demo 回覆模式",
    line: process.env.LINE_CHANNEL_ACCESS_TOKEN ? "LINE reply ready" : "Demo webhook 模式",
    signature: process.env.LINE_CHANNEL_SECRET ? "signature verify ready" : "signature secret missing",
  }
}

async function readRawBody(req) {
  if (typeof req.body === "string") return req.body
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8")
  if (req.body && typeof req.body === "object") return JSON.stringify(req.body)

  const chunks = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString("utf8")
}

function verifyLineSignature(rawBody, signature) {
  const secret = process.env.LINE_CHANNEL_SECRET
  if (!secret || !signature) return false

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("base64")
  const signatureBuffer = Buffer.from(String(signature))
  const digestBuffer = Buffer.from(digest)

  return signatureBuffer.length === digestBuffer.length && crypto.timingSafeEqual(signatureBuffer, digestBuffer)
}

function parseEvents(rawBody) {
  try {
    const body = JSON.parse(rawBody)
    return Array.isArray(body.events) ? body.events : []
  } catch {
    return []
  }
}

function getTextMessage(event) {
  if (event?.type !== "message" || event?.message?.type !== "text") return ""
  return String(event.message.text || "").trim()
}

async function generateReply(text) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { text: MOCK_REPLY, source: "mock_no_openai_key" }

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
            "你是 Qingyu Web Studio 的 LINE Bot Demo。請用台灣小型網站顧問語氣，簡短回答網站、作品集、LINE Bot、AI 工具、工程系統相關問題。不要承諾固定價格；請引導使用者提供產業、功能、預算區間、希望上線時間。",
        },
        {
          role: "user",
          content: text || "我想做網站",
        },
      ],
    }),
  })

  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`)
  const data = await response.json()
  const output =
    data.output_text ||
    data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("") ||
    MOCK_REPLY

  return { text: output, source: "openai" }
}

async function replyToLine(replyToken, text) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token || !replyToken) {
    return { ok: true, mode: "mock_line_reply", skipped: true }
  }

  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  })

  if (!response.ok) throw new Error(`LINE reply failed: ${response.status}`)
  return { ok: true, mode: "line_reply_api" }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "LINE webhook endpoint ready",
      modes: safeModeStatus(),
    })
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const rawBody = await readRawBody(req)
  const signature = req.headers["x-line-signature"]

  if (!verifyLineSignature(rawBody, signature)) {
    return res.status(401).json({ error: "Invalid LINE signature" })
  }

  const events = parseEvents(rawBody)
  const results = []

  for (const event of events) {
    const text = getTextMessage(event)
    if (!text) continue

    try {
      const reply = await generateReply(text)
      const lineReply = await replyToLine(event.replyToken, reply.text)
      results.push({
        type: "text",
        replySource: reply.source,
        lineReply,
      })
    } catch (error) {
      console.warn("[line-webhook] fallback:", error.message)
      const lineReply = await replyToLine(event.replyToken, MOCK_REPLY)
      results.push({
        type: "text",
        replySource: "mock_error_fallback",
        lineReply,
      })
    }
  }

  return res.status(200).json({
    ok: true,
    eventCount: events.length,
    handledCount: results.length,
    results,
  })
}
