import { createClient } from "@supabase/supabase-js"

const HELP_TEXT = [
  "BuildFlow LINE 選單",
  "",
  "公開可測：",
  "- 選單",
  "- 案例",
  "- 報價",
  "- 流程",
  "- 綁定碼",
  "",
  "師傅功能：",
  "- 綁定 BF-AMING-1234",
  "- 今日任務",
  "- 回報 t-001 現場已完成第一道防水",
  "- 完成 t-001",
].join("\n")

const DEFAULT_QUICK_REPLIES = ["選單", "案例", "報價", "流程", "綁定碼", "工程測試"]

const PUBLIC_REPLIES = {
  選單: [
    "BuildFlow 工程助理",
    "",
    "你可以直接測：",
    "1. 案例：看工程照片與項目",
    "2. 報價：產生需求摘要",
    "3. 流程：了解接案步驟",
    "4. 綁定碼：取得測試帳號",
    "",
    "LINE Bot：@550oexzn",
  ].join("\n"),
  案例: [
    "近期工程案例",
    "",
    "- 室內木地板整理",
    "- 屋頂防水整理",
    "- 室內地坪施工",
    "- 外牆修繕評估",
    "",
    "到網站可看照片案例。輸入「報價」可產生需求格式。",
  ].join("\n"),
  報價: [
    "需求摘要格式",
    "",
    "姓名：",
    "電話 / LINE：",
    "案場地區：",
    "工程類型：",
    "目前狀況：",
    "希望時間：",
    "照片：可先傳 LINE",
    "",
    "複製填寫後，前台可轉成 BuildFlow 案件。",
  ].join("\n"),
  流程: [
    "工程接案流程",
    "",
    "詢問需求",
    "現場評估",
    "整理報價",
    "安排施工",
    "回報進度",
    "完工驗收",
    "",
    "師傅可用「今日任務」查待辦。",
  ].join("\n"),
  綁定碼: [
    "測試綁定碼",
    "",
    "阿明師傅：BF-AMING-1234",
    "阿龍師傅：BF-ALONG-1234",
    "阿明測試：BF-MING-1234",
    "",
    "範例：綁定 BF-AMING-1234",
  ].join("\n"),
  工程測試: [
    "推薦測試順序",
    "",
    "1. 測試",
    "2. 選單",
    "3. 案例",
    "4. 綁定 BF-AMING-1234",
    "5. 今日任務",
    "6. 回報 t-001 現場已完成第一道防水",
    "7. 完成 t-001",
    "8. 今日任務",
  ].join("\n"),
}

function getSupabaseClient() {
  const supabaseUrl = getSupabaseBaseUrl()
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    ""
  ).trim()

  if (!supabaseUrl || !supabaseKey) {
    return { error: "Supabase env is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." }
  }

  if (!getEnvStatus().supabaseUrlIsValid) {
    return {
      error:
        "SUPABASE_URL is invalid. It must look like https://your-project-ref.supabase.co without /rest/v1.",
    }
  }

  return {
    supabase: createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    }),
  }
}

function getEnvStatus() {
  const rawSupabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim()
  let supabaseHost = ""
  let supabasePath = ""
  let normalizedSupabaseUrl = ""
  let supabaseUrlIsValid = false

  try {
    const parsedUrl = new URL(rawSupabaseUrl || "")
    supabaseHost = parsedUrl.host
    supabasePath = parsedUrl.pathname
    normalizedSupabaseUrl = parsedUrl.origin
    supabaseUrlIsValid = parsedUrl.protocol === "https:" && parsedUrl.host.endsWith(".supabase.co")
  } catch {
    // Leave the host empty when the URL cannot be parsed.
  }

  return {
    hasSupabaseUrl: Boolean(rawSupabaseUrl),
    supabaseHost,
    supabasePath,
    normalizedSupabaseUrl,
    supabaseUrlIsValid,
    hasSupabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasSupabaseAnonKey: Boolean(
      process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
    ),
    hasLineChannelAccessToken: Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN),
  }
}

function getSupabaseBaseUrl() {
  const rawSupabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim()

  try {
    return new URL(rawSupabaseUrl).origin
  } catch {
    return rawSupabaseUrl
  }
}

async function getSupabaseHealth() {
  const supabaseUrl = getSupabaseBaseUrl()
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    ""
  ).trim()
  const env = getEnvStatus()

  if (!env.hasSupabaseUrl || !supabaseKey) {
    return { ok: false, skipped: true, reason: "Missing Supabase URL or key." }
  }

  if (!env.supabaseUrlIsValid) {
    return { ok: false, skipped: true, reason: "Invalid Supabase URL format." }
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/line_profiles?select=id&limit=1`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
    }
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    }
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

function isPublicCommand(text) {
  const command = normalizeText(text).toLowerCase()
  return (
    !command ||
    command === "測試" ||
    command === "help" ||
    command === "說明" ||
    command === "功能" ||
    command === "menu" ||
    Object.keys(PUBLIC_REPLIES).some((key) => key.toLowerCase() === command)
  )
}

function commandNeedsSupabase(text) {
  return !isPublicCommand(text)
}

function createTextReply(text, quickReplyLabels = DEFAULT_QUICK_REPLIES) {
  return {
    text,
    quickReplyLabels,
  }
}

function createLineQuickReply(labels) {
  const items = labels.slice(0, 13).map((label) => ({
    type: "action",
    action: {
      type: "message",
      label,
      text: label,
    },
  }))

  return items.length ? { items } : undefined
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

  return `綁定成功：${profile.name}\n可輸入「今日任務」查詢待辦。`
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
  const command = normalizeText(text)

  if (!command || command === "測試") {
    return createTextReply("系統在線。輸入「選單」開始測試。", ["選單", "工程測試", "綁定碼"])
  }
  if (command === "help" || command === "說明" || command === "功能" || command === "menu") {
    return createTextReply(HELP_TEXT)
  }
  if (PUBLIC_REPLIES[command]) {
    return createTextReply(PUBLIC_REPLIES[command])
  }
  if (command.startsWith("綁定") || /\bBF-[A-Z0-9-]+\b/i.test(command)) {
    return createTextReply(await bindProfile(supabase, lineUserId, command), [
      "今日任務",
      "回報 t-001 現場已完成第一道防水",
      "完成 t-001",
    ])
  }
  if (command === "今日任務") {
    return createTextReply(await listTodayTasks(supabase, lineUserId), [
      "回報 t-001 現場已完成第一道防水",
      "完成 t-001",
      "流程",
    ])
  }
  if (command.startsWith("完成")) {
    return createTextReply(await completeTask(supabase, lineUserId, command), ["今日任務", "案例"])
  }
  if (command.startsWith("回報")) {
    return createTextReply(await reportTask(supabase, lineUserId, command), [
      "完成 t-001",
      "今日任務",
    ])
  }

  return createTextReply(`看不懂「${command}」。\n\n${HELP_TEXT}`)
}

function toLineMessages(reply) {
  const replies = Array.isArray(reply) ? reply : [reply]

  return replies.slice(0, 5).map((item) => {
    if (typeof item === "string") {
      return { type: "text", text: item }
    }

    const message = { type: "text", text: item.text || "" }
    const quickReply = createLineQuickReply(item.quickReplyLabels || [])
    if (quickReply) message.quickReply = quickReply
    return message
  })
}

async function replyToLine(replyToken, reply) {
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
      messages: toLineMessages(reply),
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
    if (req.query?.debug === "1") {
      const includeHealth = req.query?.health === "1"
      return res.status(200).json({
        ok: true,
        message: "BuildFlow LINE webhook with Supabase v2 is alive.",
        env: getEnvStatus(),
        supabaseHealth: includeHealth ? await getSupabaseHealth() : "add &health=1 to check",
      })
    }

    return res.status(200).send("BuildFlow LINE webhook with Supabase v2 is alive.")
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const body = getRequestBody(req)
  const events = Array.isArray(body?.events) ? body.events : []
  const results = []

  for (const event of events) {
    if (event?.type !== "message" || event?.message?.type !== "text") continue

    try {
      const input = getMessageText(event)
      const { supabase, error } = commandNeedsSupabase(input)
        ? getSupabaseClient()
        : { supabase: null, error: null }

      if (error) throw new Error(error)

      const reply = await handleCommand(supabase, event)
      const lineReply = await replyToLine(event.replyToken, reply)
      results.push({ input, reply, lineReply })
    } catch (requestError) {
      const errorReply = `BuildFlow webhook 收到訊息，但處理失敗：${requestError.message}`
      const lineReply = await replyToLine(event.replyToken, errorReply)
      results.push({
        input: getMessageText(event),
        reply: errorReply,
        error: requestError.message,
        env: getEnvStatus(),
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

export const __testables = {
  bindProfile,
  completeTask,
  findProfileByLineUserId,
  getEnvStatus,
  getRequestBody,
  getSupabaseHealth,
  handleCommand,
  isPublicCommand,
  listTodayTasks,
  reportTask,
  toLineMessages,
}
