import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "./auth"

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("admin@qingyu.dev")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()

    const result = login(email, password)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate("/admin")
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center px-4 py-12 md:grid-cols-[1fr_420px] md:gap-12">
        <div>
          <Link to="/" className="text-sm font-bold text-slate-500">
            ← 回公開首頁
          </Link>

          <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            Admin Login
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">管理者登入</h1>

          <p className="mt-5 max-w-xl leading-8 text-slate-600">
            登入後可查看系統入口、開發狀態與管理者專用資訊。 此版本使用本機登入流程，之後可替換為
            Supabase Auth 或其他正式登入系統。
          </p>

          <div className="mt-8 rounded-2xl bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">
            <p className="font-black text-slate-950">Demo Login</p>
            <p className="mt-2">Email：admin@qingyu.dev</p>
            <p>密碼：qgadmin</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:mt-0"
        >
          <h2 className="text-2xl font-black">登入後台</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">只有管理者可以進入控制中心。</p>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-slate-600">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              placeholder="admin@qingyu.dev"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-slate-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
              placeholder="輸入密碼"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
          >
            登入
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
