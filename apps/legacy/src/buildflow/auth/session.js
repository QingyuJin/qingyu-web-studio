export const SESSION_KEY = "buildflow_v1_4_session"

export function loadInitialSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.id || !parsed?.role) return null
    return parsed
  } catch {
    return null
  }
}
