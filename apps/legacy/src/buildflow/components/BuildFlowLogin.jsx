import { useState } from "react"
import { Link } from "react-router-dom"

function BuildFlowLogin({ users, onLogin }) {
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("admin123")
  const [error, setError] = useState("")
  const testAccounts = users.slice(0, 6)
  const trialSteps = [
    "使用 admin / admin123 登入管理者後台",
    "查看案件、發包項目、批價與追加減",
    "新增或編輯資料 觀察列表即時更新",
    "指派任務給師傅帳號",
    "登出後改用師傅帳號登入 填寫任務回報",
    "回到管理者視角確認任務狀態與回報內容",
  ]

  function handleSubmit(event) {
    event.preventDefault()
    const result = onLogin(username, password)
    if (!result.ok) {
      setError(result.message)
      return
    }
    setError("")
  }

  function fillAccount(user) {
    setUsername(user.username)
    setPassword(user.password)
    setError("")
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-[1fr_420px]">
        <div>
          <Link to="/admin" className="text-sm font-bold text-slate-500">
            ← 回管理入口
          </Link>
          <p className="mt-10 text-sm font-black uppercase text-slate-500">BuildFlow Login</p>
          <h1 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">
            把案件整理清楚
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-slate-600">
            報價、發包、追加減項、師傅回報 都放在同一個地方先用測試資料走一次流程
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">試用帳號</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  點卡片帶入帳密 直接看不同角色權限
                </p>
              </div>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
                Role test
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {testAccounts.map((user) => (
                <TestAccount
                  key={user.id}
                  title={user.name}
                  role={user.role}
                  account={`${user.username} / ${user.password}`}
                  onClick={() => fillAccount(user)}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">試用流程</h2>
            <ol className="mt-4 grid gap-3">
              {trialSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-950 text-xs text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-2xl font-black">登入 BuildFlow</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            點帳號帶入 直接進去看
          </p>

          <label className="mt-6 grid gap-2">
            <span className="text-sm font-bold text-slate-600">帳號</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </label>

          <label className="mt-4 grid gap-2">
            <span className="text-sm font-bold text-slate-600">密碼</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </p>
          )}
          <button className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            登入
          </button>
        </form>
      </section>
    </main>
  )
}

function TestAccount({ title, role, account, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-sky-200 hover:bg-sky-50"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-black">{title}</p>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-black uppercase text-slate-600">
          {role}
        </span>
      </div>
      <p className="mt-2 font-mono text-sm text-slate-600">{account}</p>
      <p className="mt-3 text-xs font-bold text-sky-700">點選帶入</p>
    </button>
  )
}

export default BuildFlowLogin
