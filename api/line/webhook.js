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

function getLineUserId(event) {
  return event?.source?.userId || ""
}

function getMessageText(event) {
  return String(event?.message?.text || "").trim()
}

function taskLabel(task) {
  return `${task.id}｜${task.title}｜${task.projects?.name || "未指定案件"}｜${task.status}`
}

async function findProfileByLineUserId(supabase, lineUserId) {
  if (!lineUserId) return null

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, name, role, line_user_id")
    .eq("line_user_id", lineUserId)
    .maybeSingle()

  if (error) throw error
  return data
}

async function bindProfile(supabase, lineUserId, code) {
  if (!lineUserId) return "LINE userId 不存在，無法綁定。"
  if (!code) return "請輸入綁定代碼，例如：綁定 aming"

  const { data: profile, error: findError } = await supabase
    .from("profiles")
    .select("id, username, name")
    .eq("username", code)
    .maybeSingle()

  if (findError) throw findError
  if (!profile) return `找不到帳號「${code}」。請確認 profiles.username 是否存在。`

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ line_user_id: lineUserId })
    .eq("id", profile.id)

  if (updateError) throw updateError
  return `已綁定 ${profile.name || profile.username}。之後可用「今日任務」查詢。`
}

async function listTodayTasks(supabase, lineUserId) {
  const profile = await findProfileByLineUserId(supabase, lineUserId)
  if (!profile) return "尚未綁定帳號。請先輸入：綁定 <帳號>"

  let query = supabase
    .from("tasks")
    .select("id, title, status, due_date, note, projects(name)")
    .order("due_date", { ascending: true })
    .limit(8)

  if (profile.role !== "admin") {
    query = query.eq("worker_id", profile.id)
  }

  const { data: tasks, error } = await query
  if (error) throw error
  if (!tasks?.length) return "目前沒有任務。"

  return [`${profile.name || profile.username} 的任務：`, ...tasks.map(taskLabel)].join("\n")
}

async function completeTask(supabase, lineUserId, taskId) {
  if (!taskId) return "請輸入任務 ID，例如：完成 t-001"

  const profile = await findProfileByLineUserId(supabase, lineUserId)
  if (!profile) return "尚未綁定帳號。請先輸入：綁定 <帳號>"

  let query = supabase.from("tasks").update({
    status: "completed",
    completed_at: new Date().toISOString(),
  })

  query = query.eq("id", taskId)
  if (profile.role !== "admin") query = query.eq("worker_id", profile.id)

  const { data, error } = await query.select("id, title").maybeSingle()
  if (error) throw error
  if (!data) return `找不到可完成的任務：${taskId}`

  return `已完成任務：${data.title}`
}

async function reportTask(supabase, lineUserId, taskId, body) {
  if (!taskId || !body) return "請輸入任務 ID 與回報內容，例如：回報 t-001 已完成第一道防水"

  const profile = await findProfileByLineUserId(supabase, lineUserId)
  if (!profile) return "尚未綁定帳號。請先輸入：綁定 <帳號>"

  let taskQuery = supabase.from("tasks").select("id, title").eq("id", taskId)
  if (profile.role !== "admin") taskQuery = taskQuery.eq("worker_id", profile.id)

  const { data: task, error: taskError } = await taskQuery.maybeSingle()
  if (taskError) throw taskError
  if (!task) return `找不到可回報的任務：${taskId}`

  const { error: reportError } = await supabase.from("task_reports").insert({
    task_id: task.id,
    reporter_id: profile.id,
    body,
  })

  if (reportError) throw reportError

  await supabase.from("tasks").update({ report: body }).eq("id", task.id)

  return `已收到回報：${task.title}\n${body}`
}

async function handleCommand(supabase, event) {
  const lineUserId = getLineUserId(event)
  const text = getMessageText(event)
  const [command, ...args] = text.split(/\s+/)

  if (!text || command === "測試") {
    return "BuildFlow LINE webhook with Supabase v2 is alive."
  }

  if (command === "help" || command === "說明") return HELP_TEXT
  if (command === "綁定") return bindProfile(supabase, lineUserId, args[0])
  if (command === "今日任務") return listTodayTasks(supabase, lineUserId)
  if (command === "完成") return completeTask(supabase, lineUserId, args[0])
  if (command === "回報") return reportTask(supabase, lineUserId, args[0], args.slice(1).join(" "))

  return `看不懂「${text}」。\n\n${HELP_TEXT}`
}

async function replyToLine(replyToken, text) {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!channelAccessToken || !replyToken) return false

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
    throw new Error(`LINE reply failed: ${response.status} ${body}`)
  }

  return true
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

  try {
    const events = Array.isArray(req.body?.events) ? req.body.events : []
    const replies = []

    for (const event of events) {
      if (event?.type !== "message" || event?.message?.type !== "text") continue

      const text = await handleCommand(supabase, event)
      replies.push(text)
      await replyToLine(event.replyToken, text)
    }

    return res.status(200).json({
      ok: true,
      replies,
    })
  } catch (requestError) {
    return res.status(500).json({
      ok: false,
      error: requestError.message,
    })
  }
}
