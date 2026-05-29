import { useState } from "react"
import { Link } from "react-router-dom"

function BuildFlowLogin({ users, onLogin }) {
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("admin123")
  const [error, setError] = useState("")
  const demoAccounts = users.slice(0, 6)

  function handleSubmit(event) {
    event.preventDefault()
    const result = onLogin(username, password)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setError("")
  }

  function fillDemo(user) {
    setUsername(user.username)
    setPassword(user.password)
    setError("")
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-[1fr_420px]">
        <div>
          <Link to="/admin" className="text-sm font-bold text-slate-500">← 回管理入口</Link>
          <p className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-slate-500">BuildFlow Login</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">工程行發包與追加減項管理系統</h1>
          <p className="mt-5 max-w-2xl leading-8 text-slate-600">
            這版加入使用者管理。管理者可新增師傅帳號並指派任務；使用者登入後只會看到自己負責的任務與回報。
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {demoAccounts.map((user) => (
              <DemoAccount key={user.id} title={user.name} account={`${user.username} / ${user.password}`} onClick={() => fillDemo(user)} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">登入 BuildFlow</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">目前是假登入，之後可替換成 Supabase Auth。</p>

          <label className="mt-6 grid gap-2">
            <span className="text-sm font-bold text-slate-600">帳號</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500" />
          </label>

          <label className="mt-4 grid gap-2">
            <span className="text-sm font-bold text-slate-600">密碼</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500" />
          </label>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}
          <button className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">登入</button>
        </form>
      </section>
    </main>
  )
}

function DemoAccount({ title, account, onClick }) {
  return (
    <button type="button" onClick={onClick} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm">
      <p className="font-black">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{account}</p>
    </button>
  )
}


export default BuildFlowLogin
