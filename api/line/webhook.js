import crypto from "node:crypto"

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply"

function verifyLineSignature(rawBody, signature, channelSecret) {
  if (!signature || !channelSecret) return false

  const expectedSignature = crypto
    .createHmac("sha256", channelSecret)
    .update(rawBody)
    .digest("base64")

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch {
    return false
  }
}

async function replyMessage(replyToken, text) {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN

  if (!channelAccessToken) {
    console.error("Missing LINE_CHANNEL_ACCESS_TOKEN")
    return
  }

  const response = await fetch(LINE_REPLY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${channelAccessToken}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [
        {
          type: "text",
          text,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("LINE reply failed:", response.status, errorText)
  }
}

function buildReplyText(userText) {
  const text = String(userText || "").trim()

  if (text === "測試") {
    return "BuildFlow Bot 已收到：測試"
  }

  if (text === "今日任務") {
    return "BuildFlow Bot 已收到「今日任務」。下一階段會接 Supabase 後回覆你的真實任務。"
  }

  if (text.startsWith("綁定")) {
    return "BuildFlow Bot 已收到綁定指令。下一階段會建立綁定碼與使用者資料。"
  }

  if (text.startsWith("完成")) {
    return "BuildFlow Bot 已收到完成回報。下一階段會更新任務狀態。"
  }

  return `BuildFlow Bot 已收到：${text || "空訊息"}`
}

export default {
  async fetch(request) {
    try {
      if (request.method === "GET") {
        return new Response("BuildFlow LINE webhook is alive.", {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        })
      }

      if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
          status: 405,
        })
      }

      const channelSecret = process.env.LINE_CHANNEL_SECRET

      if (!channelSecret) {
        console.error("Missing LINE_CHANNEL_SECRET")
        return new Response("Missing LINE_CHANNEL_SECRET", {
          status: 500,
        })
      }

      const rawBody = await request.text()
      const signature = request.headers.get("x-line-signature")

      const isValid = verifyLineSignature(rawBody, signature, channelSecret)

      if (!isValid) {
        console.error("Invalid LINE signature")
        return new Response("Invalid signature", {
          status: 401,
        })
      }

      let payload

      try {
        payload = JSON.parse(rawBody)
      } catch (error) {
        console.error("Invalid JSON:", error)
        return new Response("Invalid JSON", {
          status: 400,
        })
      }

      const events = Array.isArray(payload.events) ? payload.events : []

      for (const event of events) {
        try {
          if (event.type !== "message") continue
          if (event.message?.type !== "text") continue
          if (!event.replyToken) continue

          const userText = event.message.text
          const replyText = buildReplyText(userText)

          await replyMessage(event.replyToken, replyText)
        } catch (eventError) {
          console.error("Event handling failed:", eventError)
        }
      }

      return new Response("OK", {
        status: 200,
      })
    } catch (error) {
      console.error("Webhook crashed:", error)

      return new Response("OK", {
        status: 200,
      })
    }
  },
}