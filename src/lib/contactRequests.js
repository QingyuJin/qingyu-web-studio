import { isSupabaseConfigured, supabase } from "./supabaseClient"

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
    return {
      ok: false,
      reason: "Supabase 尚未設定，請加入 VITE_SUPABASE_URL 與 VITE_SUPABASE_ANON_KEY。",
    }
  }

  const { error } = await supabase.from("contact_requests").insert(payload)
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}

export async function listContactRequests() {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      reason: "Supabase 尚未設定，部署環境需要 VITE_SUPABASE_URL 與 VITE_SUPABASE_ANON_KEY。",
      data: [],
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
    return { ok: false, reason: "Supabase 尚未設定。" }
  }

  const { error } = await supabase.from("contact_requests").update(values).eq("id", requestId)
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}
