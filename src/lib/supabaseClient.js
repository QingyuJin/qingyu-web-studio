import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

function isValidConfig(url, key) {
  if (!url || !key) return false
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url.trim())) return false
  // anon key 是 JWT / publishable key，必為 ASCII；擋掉「你的 key」這類佔位字
  if (/[^\x21-\x7e]/.test(key.trim()) || key.trim().length < 30) return false
  return true
}

export const isSupabaseConfigured = isValidConfig(supabaseUrl, supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl.trim(), supabaseAnonKey.trim())
  : null
