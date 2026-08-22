import nodemailer from "nodemailer"

const DEFAULT_NOTIFICATION_EMAIL = "a0988874324@gmail.com"

function setHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

function readBody(req) {
  if (!req.body) return {}
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

function cleanText(value, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function formatSubmittedAt(date = new Date()) {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date)
}

export function buildInquiryEmail(payload, submittedAt = new Date()) {
  const rows = [
    ["姓名", payload.name],
    ["聯絡方式", payload.contact],
    ["公司或地區", payload.company || "未填"],
    ["需求類型", payload.service_type],
    ["預算", payload.budget_range || "未填"],
    ["來源", payload.source],
    ["送出時間", formatSubmittedAt(submittedAt)],
  ]
  const subject = `[晴宇新需求] ${payload.service_type}｜${payload.name}`
  const text = [
    "晴宇網站收到一筆新需求",
    "",
    ...rows.map(([label, value]) => `${label}：${value}`),
    "",
    "需求內容",
    payload.message || "未填",
  ].join("\n")
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th style="padding:10px 12px;text-align:left;color:#60706c;border-bottom:1px solid #e6e9e7;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:10px 12px;color:#14211f;border-bottom:1px solid #e6e9e7">${escapeHtml(value)}</td></tr>`,
    )
    .join("")
  const html = `<div style="margin:0;background:#f5f4ef;padding:28px 16px;font-family:Arial,'Noto Sans TC',sans-serif;color:#14211f"><div style="max-width:680px;margin:auto;background:#fff;border:1px solid #dfe4e1;padding:28px"><p style="margin:0 0 8px;color:#557b72;font-size:12px;letter-spacing:.12em">QINGYU WEB</p><h1 style="margin:0 0 24px;font-size:24px">收到新的網站需求</h1><table style="width:100%;border-collapse:collapse;font-size:14px">${htmlRows}</table><h2 style="margin:26px 0 10px;font-size:16px">需求內容</h2><div style="white-space:pre-wrap;line-height:1.8;background:#f5f7f6;padding:16px;border-left:3px solid #557b72">${escapeHtml(payload.message || "未填")}</div></div></div>`

  return { subject, text, html }
}

async function storeInquiry(payload) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) return { stored: false, configured: false }

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Supabase responded ${response.status}`)
  }

  return { stored: true, configured: true }
}

async function sendGmailNotification(payload) {
  const gmailUser = cleanText(process.env.GMAIL_USER, 200)
  const gmailAppPassword = cleanText(process.env.GMAIL_APP_PASSWORD, 200).replaceAll(" ", "")
  const recipient = cleanText(process.env.INQUIRY_NOTIFICATION_EMAIL, 200) || DEFAULT_NOTIFICATION_EMAIL

  if (!gmailUser || !gmailAppPassword) return { notified: false, configured: false }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: gmailAppPassword },
  })
  const email = buildInquiryEmail(payload)
  await transporter.sendMail({
    from: `晴宇網站 <${gmailUser}>`,
    to: recipient,
    replyTo: isEmail(payload.contact) ? payload.contact : gmailUser,
    ...email,
  })

  return { notified: true, configured: true }
}

export default async function handler(req, res) {
  setHeaders(res)

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" })

  const body = readBody(req)
  const payload = {
    name: cleanText(body.name, 100),
    contact: cleanText(body.contact, 200),
    company: cleanText(body.area || body.company, 200),
    service_type: cleanText(body.service_type || body.service, 100) || "網站需求",
    budget_range: cleanText(body.budget_range || body.budget, 100),
    message: cleanText(body.message),
    source: cleanText(body.source, 100) || "qingyu-website",
    status: "new",
  }

  if (!payload.name || !payload.contact) {
    return res.status(400).json({ ok: false, error: "請填寫姓名與聯絡方式" })
  }

  let storage = { stored: false, configured: false }
  let notification = { notified: false, configured: false }

  try {
    storage = await storeInquiry(payload)
  } catch (error) {
    console.error("inquiry insert failed", error.message)
  }

  try {
    notification = await sendGmailNotification(payload)
  } catch (error) {
    console.error("inquiry notification failed", error.message)
  }

  const accepted = storage.stored || notification.notified
  if (!accepted) {
    return res.status(503).json({
      ok: false,
      stored: false,
      notified: false,
      error: "目前無法送出需求 請改用 LINE 或 Email",
    })
  }

  return res.status(200).json({
    ok: true,
    stored: storage.stored,
    notified: notification.notified,
    notificationConfigured: notification.configured,
    mode: storage.stored && notification.notified ? "stored-and-notified" : notification.notified ? "email-only" : "stored-only",
    warning: notification.notified ? "" : "需求已保存 但 Email 通知尚未寄出",
  })
}
