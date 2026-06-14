import { isSupabaseConfigured, supabase } from "./supabaseClient"

const LOCAL_STORAGE_KEY = "qingyu_contact_requests"

export const contactRequestStatuses = [
  { value: "new", label: "新需求" },
  { value: "reviewing", label: "確認中" },
  { value: "contacted", label: "已聯絡" },
  { value: "closed", label: "已結案" },
]

export function getStatusLabel(status) {
  return contactRequestStatuses.find((item) => item.value === status)?.label || status
}

export async function createContactRequest(payload) {
  if (!isSupabaseConfigured) {
    saveLocalRequest(payload)
    return { ok: true, mode: "local" }
  }

  const { error } = await supabase.from("contact_requests").insert(payload)
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}

export async function listContactRequests() {
  if (!isSupabaseConfigured) {
    return {
      ok: true,
      mode: "local",
      reason: "目前使用本機暫存資料。部署後設定 Supabase 環境變數即可改讀後端。",
      data: readLocalRequests(),
    }
  }

  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return { ok: false, reason: error.message, data: [] }
  return { ok: true, data: data || [] }
}

export async function updateContactRequest(requestId, values) {
  if (!isSupabaseConfigured) {
    updateLocalRequest(requestId, values)
    return { ok: true, mode: "local" }
  }

  const { error } = await supabase.from("contact_requests").update(values).eq("id", requestId)
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}

function saveLocalRequest(payload) {
  const now = new Date().toISOString()
  const request = {
    id: `local-${Date.now()}`,
    status: "new",
    admin_note: "",
    created_at: now,
    updated_at: now,
    ...payload,
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([request, ...readLocalRequests()]))
}

function readLocalRequests() {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
  } catch {
    return []
  }
}

function updateLocalRequest(requestId, values) {
  const nextRequests = readLocalRequests().map((request) =>
    request.id === requestId
      ? { ...request, ...values, updated_at: new Date().toISOString() }
      : request
  )
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextRequests))
}
