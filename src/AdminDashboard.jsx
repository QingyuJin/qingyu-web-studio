import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "./auth"

const adminProjects = [
  {
    name: "Contractor Site",
    title: "工程行前台網站",
    path: "/contractor-site",
    status: "Website",
    next: "建立服務介紹、施工案例、流程說明與聯絡導流。",
  },
  {
    name: "BuildFlow",
    title: "工程行發包管理系統",
    path: "/buildflow",
    status: "Main System",
    next: "建立登入角色、案件管理、批價、追加減項與使用者任務。",
  },
  {
    name: "CoachFlow",
    title: "健身教練課表系統",
    path: "/coachflow",
    status: "LINE Bot",
    next: "建立教練與學生角色、課表模組、完成回報與 LINE Bot 指令。",
  },
]

const tasks = [
  "完成主站登入與管理者後台",
  "建立 BuildFlow 系統規格與頁面架構",
  "第一版使用假資料與角色切換",
  "流程穩定後接 Supabase 登入與資料庫",
  "最後串接 LINE Bot Webhook 與推播",
]

function AdminDashboard() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-lg font-black">Admin Control Center</p>
            <p className="text-sm text-slate-500">
              {user?.name || "Admin"}｜{user?.role || "admin"}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
            >
              公開首頁
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            Private Dashboard
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">
            系統作品管理入口
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-600">
            集中管理三個主力作品的入口、開發狀態與下一步規劃。
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {adminProjects.map((project) => (
            <article
              key={project.name}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-500">
                    {project.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-black">{project.name}</h2>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                  {project.status}
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-950">下一步</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {project.next}
                </p>
              </div>

              <Link
                to={project.path}
                className="mt-6 block rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white"
              >
                進入系統 →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">開發待辦</h2>

            <div className="mt-5 grid gap-3">
              {tasks.map((task, index) => (
                <div key={task} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-slate-700">{task}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black">目前方向</h2>

            <p className="mt-5 leading-8 text-slate-600">
              建立可展示、可操作、可延伸的系統作品，
              從前台網站到後台管理，再到 LINE Bot 與 API 串接。
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard