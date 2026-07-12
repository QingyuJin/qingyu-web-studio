const AUTH_KEY = "qingyu_system_lab_user"

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function login(email, password) {
  const cleanEmail = email.trim().toLowerCase()

  if (!isValidEmail(cleanEmail) || password.length < 6) {
    return {
      ok: false,
      message: "請輸入有效 Email 密碼至少 6 個字元",
    }
  }

  const user = {
    name: "Qingyu Studio",
    email: cleanEmail,
    role: "admin",
    loginAt: new Date().toISOString(),
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(user))

  return {
    ok: true,
    user,
  }
}

export function logout() {
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null

    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function isAdmin() {
  const user = getCurrentUser()
  return user?.role === "admin"
}
