const AUTH_KEY = "qingyu_system_lab_user"

export const ADMIN_ACCOUNT = {
  email: "admin@qingyu.dev",
  password: "qgadmin",
  name: "金晴宇",
  role: "admin",
}

export function login(email, password) {
  const cleanEmail = email.trim().toLowerCase()

  if (cleanEmail === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
    const user = {
      name: ADMIN_ACCOUNT.name,
      email: ADMIN_ACCOUNT.email,
      role: ADMIN_ACCOUNT.role,
      loginAt: new Date().toISOString(),
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(user))

    return {
      ok: true,
      user,
    }
  }

  return {
    ok: false,
    message: "帳號或密碼錯誤",
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
