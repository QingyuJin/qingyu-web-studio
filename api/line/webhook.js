import crypto from "node:crypto"
import { createClient } from "@supabase/supabase-js"
import {
  getActionTypeByIntent,
  parseEngineeringMessage,
  parseLineImageMessage,
} from "./buildFlowParser.js"
import {
  appendBuildFlowSyncAction,
  createDailyReportFromMessage,
  createOrUpdateProjectFromIntent,
} from "./buildFlowSync.js"

export const config = {
  api: {
    bodyParser: false,
  },
}

const HELP_TEXT = [
  "BuildFlow LINE 選單",
  "",
  "公開可測：",
  "- 選單",
  "- 案例",
  "- 估價",
  "- 流程",
  "- 業主 q-001",
  "- 老闆總覽",
  "- 綁定碼",
  "",
  "師傅功能：",
  "- 綁定 BF-AMING-1234",
  "- 今日任務",
  "- 回報 t-001 現場已完成第一道防水",
  "- 完成 t-001",
].join("\n")

const DEFAULT_QUICK_REPLIES = ["選單", "估價", "案例", "流程", "業主 q-001", "老闆總覽", "綁定碼"]

const PUBLIC_REPLIES = {
  選單: [
    "BuildFlow 工程助理｜@550oexzn",
    "",
    "直接測：",
    "1. 估價：整理需求",
    "2. 業主 q-001：查進度",
    "3. 老闆總覽：看待辦",
    "4. 綁定碼：師傅測試",
    "",
    "常用：綁定 BF-AMING-1234 → 今日任務 → 回報 t-001 現場完成 → 完成 t-001",
  ].join("\n"),
  案例: [
    "工程案例",
    "",
    "01 屋頂防水",
    "02 室內地坪",
    "03 木作整理",
    "04 外牆修繕",
    "",
    "輸入「估價」可整理需求。",
  ].join("\n"),
  估價: [
    "估價資料格式",
    "",
    "姓名：",
    "電話 / LINE：",
    "來源：LINE / 口頭 / Excel / 紙本 / Pro360",
    "案場地區：",
    "工種：防水 / 泥作 / 油漆 / 磁磚 / 板模 / 鋼筋",
    "工項：",
    "材料：",
    "工具：",
    "坪數 / 數量：",
    "單價預算：",
    "預計日期：",
    "照片：可直接傳",
    "",
    "填完可轉報價單與 PDF。",
  ].join("\n"),
  報價: [
    "報價指令已改成「估價」。",
    "",
    "輸入「估價」取得完整欄位。",
    "輸入「業主 q-001」看報價進度範例。",
  ].join("\n"),
  流程: [
    "工程行三步驟",
    "",
    "1. 確認：需求、照片、日期",
    "2. 報價：工項、材料、單價、PDF",
    "3. 發包：師傅、任務、回報",
    "",
    "業主看進度，老闆看毛利，師傅用 LINE 回報。",
  ].join("\n"),
  "業主 q-001": [
    "案件進度｜q-001",
    "",
    "案件：屏東住宅屋頂防水",
    "狀態：報價待確認",
    "金額：NT$53,900",
    "有效：2026-06-21",
    "下一步：確認施工日",
    "",
    "可回覆：同意 / 要修改 / 想看 PDF",
  ].join("\n"),
  "老闆總覽": [
    "老闆總覽",
    "",
    "待報價：1",
    "施工中：1",
    "待回報：1",
    "待確認追加：1",
    "粗估毛利：NT$77,000",
    "",
    "建議先處理：q-001 業主確認。",
  ].join("\n"),
  "PDF q-001": [
    "報價單 q-001",
    "",
    "防水｜屋頂防水底層處理｜18 坪｜NT$39,600",
    "泥作｜女兒牆補強｜12 米｜NT$10,800",
    "管理｜完工清潔拍照｜1 式｜NT$3,500",
    "",
    "總計：NT$53,900",
    "業主確認後可轉案件。",
  ].join("\n"),
  同意: "已收到：業主同意。\n後台可把 q-001 標記為已確認，並轉成正式案件。",
  要修改: "已收到：業主需要修改。\n請補充要改的項目，例如：日期、材料、金額或施工範圍。",
  "想看 PDF": [
    "報價單 q-001",
    "",
    "防水｜屋頂防水底層處理｜18 坪｜NT$39,600",
    "泥作｜女兒牆補強｜12 米｜NT$10,800",
    "管理｜完工清潔拍照｜1 式｜NT$3,500",
    "",
    "總計：NT$53,900",
    "業主確認後可轉案件。",
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
    "3. 估價",
    "4. 業主 q-001",
    "5. 老闆總覽",
    "6. 綁定 BF-AMING-1234",
    "7. 今日任務",
    "8. 回報 t-001 現場已完成第一道防水",
    "9. 完成 t-001",
    "10. 今日任務",
  ].join("\n"),
}

const PUBLIC_QUICK_REPLIES = {
  選單: ["估價", "業主 q-001", "老闆總覽", "綁定碼"],
  估價: ["業主 q-001", "PDF q-001", "流程", "綁定碼"],
  報價: ["估價", "業主 q-001", "流程"],
  流程: ["估價", "業主 q-001", "老闆總覽"],
  "業主 q-001": ["同意", "要修改", "想看 PDF", "老闆總覽"],
  "PDF q-001": ["同意", "要修改", "流程"],
  同意: ["老闆總覽", "流程", "選單"],
  要修改: ["估價", "PDF q-001", "選單"],
  "想看 PDF": ["同意", "要修改", "流程"],
  綁定碼: ["綁定 BF-AMING-1234", "今日任務", "工程測試"],
  工程測試: ["選單", "估價", "綁定 BF-AMING-1234"],
}

function getSupabaseClient() {
  const supabaseUrl = getSupabaseBaseUrl()
  const supabaseKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
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

function getLineBotSupabaseClient() {
  const supabaseUrl = getSupabaseBaseUrl()
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim()

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      error: "Supabase admin env is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    }
  }

  if (!getEnvStatus().supabaseUrlIsValid) {
    return {
      error:
        "SUPABASE_URL is invalid. It must look like https://your-project-ref.supabase.co without /rest/v1.",
    }
  }

  return {
    supabase: createClient(supabaseUrl, serviceRoleKey, {
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
    hasSupabaseAnonKey: Boolean(process.env.SUPABASE_ANON_KEY),
    hasLineChannelSecret: Boolean(process.env.LINE_CHANNEL_SECRET),
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

async function getRawRequestBody(req) {
  if (typeof req.body === "string") return req.body
  if (req.body && typeof req.body === "object") return JSON.stringify(req.body)

  const chunks = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString("utf8")
}

function verifyLineSignature(rawBody, signature) {
  const channelSecret = process.env.LINE_CHANNEL_SECRET
  if (!channelSecret || !signature || !rawBody) return false

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

function getRequestBody(req, rawBody = "") {
  if (rawBody) {
    try {
      return JSON.parse(rawBody)
    } catch {
      return {}
    }
  }

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

function getLineMessageTime(event) {
  const timestamp = Number(event?.timestamp)
  if (Number.isFinite(timestamp) && timestamp > 0) return new Date(timestamp).toISOString()
  return new Date().toISOString()
}

function getLineSenderName(event) {
  return event?.source?.userId || event?.source?.groupId || event?.source?.roomId || "LINE 使用者"
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

async function syncLineMessageToBuildFlow(event) {
  const messageType = event?.message?.type
  const text = messageType === "image" ? "[圖片訊息]" : getMessageText(event)
  if (!text) return { ok: false, skipped: true, reason: "empty_message" }

  try {
    const { supabase, error } = getLineBotSupabaseClient()
    if (error) {
      console.warn("[LineBot Supabase] sync skipped:", error)
      return { ok: false, skipped: true, reason: error }
    }

    const parse = messageType === "image" ? parseLineImageMessage(event) : parseEngineeringMessage(text)
    const isQuoteIntent = typeof parse.intent === "string" && parse.intent.startsWith("quote_")
    const lineMessagePayload = {
      scenario_id: isQuoteIntent ? "real_linebot_quote" : "real_linebot",
      role: "customer",
      sender_name: getLineSenderName(event),
      message: text,
      message_time: getLineMessageTime(event),
      status: messageType === "image" ? "pending_photo" : isQuoteIntent ? "received" : "pending",
      tags: parse.tags,
    }

    const { data: savedMessage, error: messageError } = await supabase
      .from("line_messages")
      .insert(lineMessagePayload)
      .select("id")
      .single()

    if (messageError) throw messageError

    const parsePayload = {
      line_message_id: savedMessage.id,
      intent: parse.intent,
      confidence: parse.confidence,
      entities: parse.entities,
      missing_fields: parse.missingFields,
      suggested_actions: parse.suggestedActions,
    }

    const { error: parseError } = await supabase.from("line_message_parses").insert(parsePayload)
    if (parseError) throw parseError

    const updatedProject = await createOrUpdateProjectFromIntent({
      supabase,
      parse,
      messageText: text,
      senderName: getLineSenderName(event),
      messageTime: getLineMessageTime(event),
    })
    const dailyReport = await createDailyReportFromMessage({
      supabase,
      project: updatedProject,
      parse,
      messageText: text,
    })
    const actionType = getActionTypeByIntent(parse.intent)
    const syncAction = await appendBuildFlowSyncAction({
      supabase,
      lineMessageId: savedMessage.id,
      projectId: updatedProject?.id,
      actionType,
      parse,
      messageText: text,
    })

    return {
      ok: true,
      lineMessageId: savedMessage.id,
      intent: parse.intent,
      actionType,
      projectId: updatedProject?.id,
      dailyReportId: dailyReport?.id,
      syncActionId: syncAction?.id,
    }
  } catch (error) {
    console.warn("[LineBot Supabase] sync failed", error)
    return { ok: false, error: error.message }
  }
}

function createTextReply(text, quickReplyLabels = DEFAULT_QUICK_REPLIES) {
  return {
    text,
    quickReplyLabels,
  }
}

function createLineQuickReply(labels) {
  const items = labels.slice(0, 13).map((item) => {
    const label = typeof item === "string" ? item : item.label
    const text = typeof item === "string" ? item : item.text

    return {
      type: "action",
      action: {
        type: "message",
        label: String(label || "").slice(0, 20),
        text: String(text || label || ""),
      },
    }
  })

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
    return createTextReply("系統在線。輸入「選單」開始測試。", [
      "選單",
      "估價",
      "業主 q-001",
      "工程測試",
    ])
  }
  if (command === "help" || command === "說明" || command === "功能" || command === "menu") {
    return createTextReply(HELP_TEXT)
  }
  if (PUBLIC_REPLIES[command]) {
    return createTextReply(PUBLIC_REPLIES[command], PUBLIC_QUICK_REPLIES[command])
  }
  if (command.startsWith("綁定") || /\bBF-[A-Z0-9-]+\b/i.test(command)) {
    return createTextReply(await bindProfile(supabase, lineUserId, command), [
      "今日任務",
      { label: "回報 t-001", text: "回報 t-001 現場已完成第一道防水" },
      "完成 t-001",
    ])
  }
  if (command === "今日任務") {
    return createTextReply(await listTodayTasks(supabase, lineUserId), [
      { label: "回報 t-001", text: "回報 t-001 現場已完成第一道防水" },
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

  const rawBody = await getRawRequestBody(req)
  const signatureHeader = req.headers["x-line-signature"]
  const signature = Array.isArray(signatureHeader) ? signatureHeader[0] : signatureHeader

  if (!verifyLineSignature(rawBody, signature)) {
    return res.status(401).json({ error: "Invalid LINE signature" })
  }

  const body = getRequestBody(req, rawBody)
  const events = Array.isArray(body?.events) ? body.events : []
  const results = []

  for (const event of events) {
    if (event?.type !== "message") continue

    if (event?.message?.type === "image") {
      const supabaseSync = await syncLineMessageToBuildFlow(event)
      const imageReply = createTextReply(
        "照片已收到。\n若要綁到任務，請輸入：回報 t-001 照片已上傳，請查看現場狀況。",
        [{ label: "回報 t-001", text: "回報 t-001 照片已上傳，請查看現場狀況。" }, "今日任務"]
      )
      const lineReply = await replyToLine(event.replyToken, imageReply)
      results.push({ input: "image", reply: imageReply, lineReply, supabaseSync })
      continue
    }

    if (event?.message?.type !== "text") continue

    try {
      const input = getMessageText(event)
      const supabaseSync = await syncLineMessageToBuildFlow(event)
      const { supabase, error } = commandNeedsSupabase(input)
        ? getSupabaseClient()
        : { supabase: null, error: null }

      if (error) throw new Error(error)

      const reply = await handleCommand(supabase, event)
      const lineReply = await replyToLine(event.replyToken, reply)
      results.push({ input, reply, lineReply, supabaseSync })
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
  getRawRequestBody,
  getSupabaseHealth,
  handleCommand,
  isPublicCommand,
  listTodayTasks,
  parseEngineeringMessage,
  reportTask,
  verifyLineSignature,
  syncLineMessageToBuildFlow,
  toLineMessages,
}
