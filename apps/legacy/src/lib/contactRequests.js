const DEMO_STORAGE_KEY = "qingyu_buildflow_demo_leads"

const seedRequests = [
  {
    id: "demo-lead-wang",
    name: "王小姐",
    contact: "LINE 展示帳號",
    company: "住家翻修",
    service_type: "工程案件管理",
    budget_range: "先討論",
    message: "希望先確認浴室翻修與防水工程",
    source: "展示資料",
    status: "new",
    admin_note: "",
    created_at: "2026-09-09T01:00:00.000Z",
    updated_at: "2026-09-09T01:00:00.000Z",
  },
]

export const contactRequestStatuses = [
  { value: "new", label: "新需求" },
  { value: "reviewing", label: "確認中" },
  { value: "contacted", label: "已聯絡" },
  { value: "closed", label: "已結案" },
]

export function getStatusLabel(status) {
  return contactRequestStatuses.find((item) => item.value === status)?.label || status
}

export async function createContactRequest(payload, options = {}) {
  try {
    const idempotencyKey = options.idempotencyKey || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
    const response = await fetch("/api/inquiry", {
      method: "POST",
      signal: globalThis.AbortSignal?.timeout?.(15000),
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    if (!response.ok || !data.ok) throw new Error(data.error || "送出失敗")
    return {
      ok: true,
      stored: Boolean(data.stored),
      notified: Boolean(data.notified),
      warning: data.warning || "",
      mode: data.mode,
    }
  } catch (error) {
    return { ok: false, mode: "failed", reason: error.message || "暫時無法送出 請改用 LINE 或 Email" }
  }
}

// BuildFlow is public demo content and never reads production inquiries.
export async function listContactRequests() {
  return {
    ok: true,
    mode: "demo",
    reason: "展示使用獨立資料 不會讀取正式詢問",
    data: readDemoRequests(),
  }
}

export async function updateContactRequest(requestId, values) {
  updateDemoRequest(requestId, values)
  return { ok: true, mode: "demo" }
}

function readDemoRequests() {
  try {
    const stored = window.localStorage.getItem(DEMO_STORAGE_KEY)
    return stored ? JSON.parse(stored) : seedRequests
  } catch {
    return seedRequests
  }
}

function updateDemoRequest(requestId, values) {
  const nextRequests = readDemoRequests().map((request) =>
    request.id === requestId
      ? { ...request, ...values, updated_at: new Date().toISOString() }
      : request,
  )
  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(nextRequests))
}
