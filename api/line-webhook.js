import crypto from "node:crypto"

const MOCK_LINE_REPLY =
  "可以，我可以先幫你判斷適合網站、系統還是 LINE Bot。你可以簡單說：產業、想做的功能、預算區間、希望上線時間。"

async function readRawBody(req) {
  if (typeof req.body === "string") return req.body
  if (Buffer.isBuffer(req.body)) return req.body.toString("utf8")

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
  const signatureBuffer = Buffer.from(signature)
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

async function generateReply(text) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return { text: MOCK_LINE_REPLY, source: "mock_no_key" }

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
            "你是 Qingyu Web Studio 的 LINE Bot Demo。用繁體中文，回覆短、務實、像台灣小型網站顧問。引導使用者留下：產業、功能、預算區間、上線時間。不要承諾固定價格。",
        },
        {
          role: "user",
          content: text,
        },
      ],
    }),
  })

  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`)
  const data = await response.json()
  return { text: data.output_text || MOCK_LINE_REPLY, source: "openai" }
}

async function replyToLine(replyToken, text) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token || !replyToken) return { ok: false, skipped: true }

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

  if (!response.ok) {
    throw new Error(`LINE reply failed: ${response.status}`)
  }

  return { ok: true }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "Qingyu LINE webhook demo is alive." })
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const rawBody = await readRawBody(req)
  const signature = req.headers["x-line-signature"]

  if (!verifyLineSignature(rawBody, signature)) {
    return res.status(401).json({ error: "LINE channel secret is not configured or signature is invalid." })
  }

  const events = parseEvents(rawBody)
  const results = []

  for (const event of events) {
    if (event.type !== "message" || event.message?.type !== "text") continue

    const input = String(event.message.text || "").trim()
    try {
      const reply = await generateReply(input)
      const lineReply = await replyToLine(event.replyToken, reply.text)
      results.push({ type: "text", source: reply.source, lineReply })
    } catch (error) {
      console.warn("[line-webhook] fallback:", error.message)
      try {
        const lineReply = await replyToLine(event.replyToken, MOCK_LINE_REPLY)
        results.push({ type: "text", source: "mock_error_fallback", lineReply })
      } catch (replyError) {
        console.warn("[line-webhook] reply failed:", replyError.message)
        results.push({ type: "text", source: "reply_failed" })
      }
    }
  }

  return res.status(200).json({ ok: true, handledCount: results.length, results })
}
