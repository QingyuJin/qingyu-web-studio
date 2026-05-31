import { createClient } from "@supabase/supabase-js"

const HELP_TEXT = [
  "BuildFlow LINE 指令：",
  "測試",
  "綁定 <帳號>",
  "今日任務",
  "完成 <taskId>",
  "回報 <taskId> <內容>",
].join("\n")

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { error: "Supabase env is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." }
  }

  return {
    supabase: createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    }),
  }
}

function getRequestBody(req) {
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  return req.body || {}
}

function getLineUserId(event) {
  return event?.source?.userId || ""
}

function getMessageText(event) {
  return String(event?.message?.text || "").trim()
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
}

function taskLabel(task) {
  const dueDate = task.due_date || "未設定"
  const note = task.note || "無"
  const report = task.report ? `\n回報：${task.report}` : ""

  return `${task.id}｜${task.project_name}
${task.title}
期限：${dueDate}
狀態：${task.status}
備註：${note}${report}`
}

async function findProfileByLineUserId(supabase, lineUserId) {
  if (!lineUserId) return null

  const { data, error } = await supabase
    .from("line_profiles")
    .select("id, username, name, role, line_user_id")
    .eq("line_user_id", lineUserId)
    .maybeSingle()

  if (error) throw error
  return data
}

async function bindProfile(supabase, lineUserId, text) {
  if (!lineUserId) return "LINE userId 不存在，無法綁定。"

  const code = normalizeText(text).match(/\bBF-[A-Z0-9-]+\b/i)?.[0]
  if (!code) return "請輸入綁定碼，例如：綁定 BF-AMING-1234"

  const existingProfile = await findProfileByLineUserId(supabase, lineUserId)
  if (existingProfile) {
    return `你已經綁定：${existingProfile.name}\n角色：${
      existingProfile.role === "admin" ? "管理者" : "使用者"
    }`
  }

  const { data: profile, error } = await supabase
    .from("line_profiles")
    .update({ line_user_id: lineUserId })
    .eq("line_bind_code", code)
    .select("id, username, name, role")
    .maybeSingle()

  if (error) throw error
  if (!profile) return `找不到綁定碼「${code}」。請確認 line_profiles.line_bind_code 是否存在。`

  return `綁定成功：${profile.name}\n之後可輸入「今日任務」查詢你的任務。`
}

async function listTodayTasks(supabase, lineUserId) {
  const profile = await findProfileByLineUserId(supabase, lineUserId)
  if (!profile) return "你尚未綁定 BuildFlow 帳號。\n請先輸入：綁定 BF-AMING-1234"

  const { data, error } = await supabase
    .from("line_tasks")
    .select("id, project_name, title, status, due_date, note, report")
    .eq("assigned_to", profile.id)
    .neq("status", "已完成")
    .order("due_date", { ascending: true })
    .limit(10)

  if (error) throw error
  if (!data || data.length === 0) return `${profile.name}，你目前沒有待完成任務。`

  return `今日任務｜${profile.name}\n\n${data.map(taskLabel).join("\n\n")}`
}

async function completeTask(supabase, lineUserId, text) {
  const profile = await findProfileByLineUserId(supabase, lineUserId)
  if (!profile) return "你尚未綁定 BuildFlow 帳號。\n請先輸入：綁定 BF-AMING-1234"

  const taskId = normalizeText(text)
    .replace(/^完成\s*/u, "")
    .trim()
  if (!taskId) return "請輸入要完成的任務 ID，例如：完成 t-001"

  const { data, error } = await supabase
    .from("line_tasks")
    .update({
      status: "已完成",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("assigned_to", profile.id)
    .select("id, project_name, title")
    .maybeSingle()

  if (error) throw error
  if (!data) return "找不到這個任務，或這個任務不是指派給你的。"

  return `已完成任務：${data.id}\n${data.project_name}\n${data.title}`
}

async function reportTask(supabase, lineUserId, text) {
  const profile = await findProfileByLineUserId(supabase, lineUserId)
  if (!profile) return "你尚未綁定 BuildFlow 帳號。\n請先輸入：綁定 BF-AMING-1234"

  const reportCommand = normalizeText(text)
    .replace(/^回報\s*/u, "")
    .trim()
  const [taskId, ...contentParts] = reportCommand.split(" ")
  const content = contentParts.join(" ").trim()

  if (!taskId || !content) {
    return "請輸入回報內容，例如：回報 t-001 現場已完成第一道防水"
  }

  const { data: task, error: taskError } = await supabase
    .from("line_tasks")
    .select("id, project_name, title")
    .eq("id", taskId)
    .eq("assigned_to", profile.id)
    .maybeSingle()

  if (taskError) throw taskError
  if (!task) return "找不到這個任務，或這個任務不是指派給你的。"

  const { error: updateError } = await supabase
    .from("line_tasks")
    .update({
      report: content,
      status: "有回報",
      updated_at: new Date().toISOString(),
    })
    .eq("id", taskId)
    .eq("assigned_to", profile.id)

  if (updateError) throw updateError

  const { error: insertError } = await supabase.from("line_task_reports").insert({
    task_id: taskId,
    profile_id: profile.id,
    content,
  })

  if (insertError) throw insertError

  return `已收到回報：${task.id}\n${task.project_name}\n${task.title}\n\n${content}`
}

async function handleCommand(supabase, event) {
  const text = getMessageText(event)
  const lineUserId = getLineUserId(event)

  if (!text || text === "測試") return "BuildFlow LINE webhook with Supabase v2 is alive."
  if (text === "help" || text === "說明") return HELP_TEXT
  if (text.startsWith("綁定") || /\bBF-[A-Z0-9-]+\b/i.test(text)) {
    return bindProfile(supabase, lineUserId, text)
  }
  if (text === "今日任務") return listTodayTasks(supabase, lineUserId)
  if (text.startsWith("完成")) return completeTask(supabase, lineUserId, text)
  if (text.startsWith("回報")) return reportTask(supabase, lineUserId, text)

  return `看不懂「${text}」。\n\n${HELP_TEXT}`
}

async function replyToLine(replyToken, text) {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!channelAccessToken) return { ok: false, error: "Missing LINE_CHANNEL_ACCESS_TOKEN" }
  if (!replyToken) return { ok: false, error: "Missing LINE replyToken" }

  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${channelAccessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    return { ok: false, error: `LINE reply failed: ${response.status} ${body}` }
  }

  return { ok: true }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).send("BuildFlow LINE webhook with Supabase v2 is alive.")
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { supabase, error } = getSupabaseClient()
  if (error) return res.status(500).json({ error })

  const body = getRequestBody(req)
  const events = Array.isArray(body?.events) ? body.events : []
  const results = []

  for (const event of events) {
    if (event?.type !== "message" || event?.message?.type !== "text") continue

    try {
      const reply = await handleCommand(supabase, event)
      const lineReply = await replyToLine(event.replyToken, reply)
      results.push({ input: getMessageText(event), reply, lineReply })
    } catch (requestError) {
      results.push({ input: getMessageText(event), error: requestError.message })
    }
  }

  return res.status(200).json({
    ok: true,
    eventCount: events.length,
    handledCount: results.length,
    results,
  })
}

export const __testables = {
  bindProfile,
  completeTask,
  findProfileByLineUserId,
  getRequestBody,
  handleCommand,
  listTodayTasks,
  reportTask,
}
