import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "./auth"

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
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
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-[1fr_420px] md:gap-12">
        <div>
          <Link to="/" className="text-sm font-black text-cyan-300">
            Qingyu Web Studio
          </Link>

          <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
            Studio dashboard
          </p>

          <h1 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
            後台展示入口
          </h1>

          <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-slate-300">
            這裡用來展示網站專案、需求資料與後台流程。正式專案會改為後端驗證與權限控管。
          </p>

          <div className="mt-8 grid gap-3 text-sm font-bold text-slate-300 sm:grid-cols-3">
            {["Preview only", "No real data", "Private workflow"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20"
        >
          <h2 className="text-2xl font-black text-white">登入展示後台</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-400">
            請輸入 Email 與至少 6 個字元的密碼。此頁不顯示公開測試帳密。
          </p>

          <label className="mt-6 block">
            <span className="text-sm font-bold text-slate-300">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-white outline-none focus:border-cyan-300"
              placeholder="至少 6 個字元"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
          >
            進入展示後台
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
