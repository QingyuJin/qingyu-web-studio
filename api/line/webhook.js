import crypto from "node:crypto"
import { createClient } from "@supabase/supabase-js"

const LINE_REPLY_ENDPOINT = "https://api.line.me/v2/bot/message/reply"

let supabaseClient = null

function getSupabase() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return supabaseClient
}

function verifyLineSignature(rawBody, signature, channelSecret) {
  if (!signature || !channelSecret) return false

  const expectedSignature = crypto
    .createHmac("sha256", channelSecret)
    .update(rawBody)
    .digest("base64")

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
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

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim()
}

function getLineUserId(event) {
  return event?.source?.userId || ""
}

async function getBoundProfile(lineUserId) {
  if (!lineUserId) return null

  const supabase = getSupabase()

  const { data, error } = await supabase
    .from("line_profiles")
    .select("id, username, name, role, line_user_id")
    .eq("line_user_id", lineUserId)
    .maybeSingle()

  if (error) {
    console.error("getBoundProfile error:", error)
    return null
  }

  return data
}

async function handleBindCommand(text, event) {
  const lineUserId = getLineUserId(event)

  if (!lineUserId) {
    return "無法取得 LINE userId，請用一對一聊天進行綁定。"
  }

  const code = normalizeText(text).replace(/^綁定\s*/u, "").trim()

  if (!code) {
    return "請輸入綁定碼，例如：綁定 BF-AMING-1234"
  }

  const supabase = getSupabase()

  const alreadyBound = await getBoundProfile(lineUserId)

  if (alreadyBound) {
    return `你已經綁定：${alreadyBound.name}\n角色：${
      alreadyBound.role === "admin" ? "管理者" : "使用者"
    }`
  }

  const { data, error } = await supabase
    .from("line_profiles")
    .update({
      line_user_id: lineUserId,
    })
    .eq("line_bind_code", code)
    .select("id, username, name, role")
    .maybeSingle()

  if (error) {
    console.error("bind error:", error)
    return "綁定失敗，請稍後再試。"
  }

  if (!data) {
    return "找不到這組綁定碼，請確認格式是否正確。"
  }

  return `綁定成功：${data.name}\n之後可輸入「今日任務」查詢你的任務。`
}

function formatTask(task) {
  const dueDate = task.due_date || "未設定"
  const note = task.note || "無"
  const report = task.report ? `\n回報：${task.report}` : ""

  return `${task.id}｜${task.project_name}
${task.title}
期限：${dueDate}
狀態：${task.status}
備註：${note}${report}`
}

async function handleTodayTasks(event) {
  const lineUserId = getLineUserId(event)
  const profile = await getBoundProfile(lineUserId)

  if (!profile) {
    return "你尚未綁定 BuildFlow 帳號。\n請先輸入：綁定 <你的綁定碼>\n例如：綁定 BF-AMING-1234"
  }

  const supabase = getSupabase()

  const { data, error } = await supabase
    .from("line_tasks")
    .select("id, project_name, title, status, due_date, note, report")
    .eq("assigned_to", profile.id)
    .neq("status", "已完成")
    .order("due_date", { ascending: true })
    .limit(10)

  if (error) {
    console.error("today tasks error:", error)
    return "查詢任務失敗，請稍後再試。"
  }

  if (!data || data.length === 0) {
    return `${profile.name}，你目前沒有待完成任務。`
  }

  return `今日任務｜${profile.name}\n\n${data.map(formatTask).join("\n\n")}`
}

async function handleCompleteCommand(text, event) {
  const lineUserId = getLineUserId(event)
  const profile = await getBoundProfile(lineUserId)

  if (!profile) {
    return "你尚未綁定 BuildFlow 帳號。\n請先輸入：綁定 <你的綁定碼>"
  }

  const taskId = normalizeText(text).replace(/^完成\s*/u, "").trim()

  if (!taskId) {
    return "請輸入要完成的任務 ID，例如：完成 t-001"
  }

  const supabase = getSupabase()

  const { data, error } = await supabase
    .from("line_tasks")
    .update({
      status: "已完成",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("assigned_to", profile.id)
    .select("id, project_name, title, status")
    .maybeSingle()

  if (error) {
    console.error("complete task error:", error)
    return "更新任務失敗，請稍後再試。"
  }

  if (!data) {
    return "找不到這個任務，或這個任務不是指派給你的。"
  }

  return `已完成任務：${data.id}\n${data.project_name}\n${data.title}`
}

async function handleReportCommand(text, event) {
  const lineUserId = getLineUserId(event)
  const profile = await getBoundProfile(lineUserId)

  if (!profile) {
    return "你尚未綁定 BuildFlow 帳號。\n請先輸入：綁定 <你的綁定碼>"
  }

  const body = normalizeText(text).replace(/^回報\s*/u, "").trim()
  const [taskId, ...contentParts] = body.split(" ")
  const content = contentParts.join(" ").trim()

  if (!taskId || !content) {
    return "請輸入回報內容，例如：回報 t-001 現場已完成第一道防水"
  }

  const supabase = getSupabase()

  const { data: task, error: taskError } = await supabase
    .from("line_tasks")
    .select("id, project_name, title")
    .eq("id", taskId)
    .eq("assigned_to", profile.id)
    .maybeSingle()

  if (taskError) {
    console.error("find report task error:", taskError)
    return "查詢任務失敗，請稍後再試。"
  }

  if (!task) {
    return "找不到這個任務，或這個任務不是指派給你的。"
  }

  const { error: updateError } = await supabase
    .from("line_tasks")
    .update({
      report: content,
      status: "有回報",
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("assigned_to", profile.id)

  if (updateError) {
    console.error("update report error:", updateError)
    return "更新回報失敗，請稍後再試。"
  }

  const { error: insertError } = await supabase.from("line_task_reports").insert({
    task_id: taskId,
    profile_id: profile.id,
    content,
  })

  if (insertError) {
    console.error("insert report error:", insertError)
  }

  return `已收到回報：${task.id}\n${task.project_name}\n${task.title}\n\n${content}`
}

async function buildReplyText(userText, event) {
  const text = normalizeText(userText)

  if (text === "測試") {
    return "BuildFlow Bot 已收到：測試"
  }

  if (text.startsWith("綁定")) {
    return await handleBindCommand(text, event)
  }

  if (text === "今日任務") {
    return await handleTodayTasks(event)
  }

  if (text.startsWith("完成")) {
    return await handleCompleteCommand(text, event)
  }

  if (text.startsWith("回報")) {
    return await handleReportCommand(text, event)
  }

  return `BuildFlow Bot 已收到：${text || "空訊息"}

可用指令：
1. 綁定 BF-AMING-1234
2. 今日任務
3. 完成 t-001
4. 回報 t-001 現場已完成第一道防水`
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
          const replyText = await buildReplyText(userText, event)

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