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
    <main className="min-h-screen bg-[#0b111b] text-slate-100">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center px-4 py-12 md:grid-cols-[1fr_420px] md:gap-12">
        <div>
          <Link to="/" className="text-sm font-bold text-cyan-300">
            ← 回公開首頁
          </Link>

          <p className="mt-10 text-sm font-black uppercase text-cyan-300">Admin Login</p>

          <h1 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
            管理作品入口
          </h1>

          <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-slate-300">
            登入後可查看三套作品、測試路徑與管理入口。
          </p>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.045] p-5 text-sm font-bold leading-7 text-slate-300">
            <p className="font-black text-white">測試帳號</p>
            <p className="mt-2">Email：admin@qingyu.dev</p>
            <p>密碼：qgadmin</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.045] p-6 md:mt-0"
        >
          <h2 className="text-2xl font-black text-white">登入後台</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-400">管理者專用。</p>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-slate-300">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="admin@qingyu.dev"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-cyan-300"
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
            className="mt-6 w-full rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"
          >
            登入
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
