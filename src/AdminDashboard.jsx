import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "./auth"

const adminProjects = [
  {
    name: "Contractor Site",
    title: "前台接案",
    path: "/contractor-site",
    status: "Website",
    summary: "案例、需求、詢問集中整理。",
    checks: ["看工程照片", "填需求表單", "複製摘要"],
  },
  {
    name: "BuildFlow",
    title: "工程後台",
    path: "/buildflow",
    status: "System",
    summary: "案件、報價、發包、任務回報。",
    checks: ["角色登入", "新增案件", "派工回報"],
  },
  {
    name: "CoachFlow",
    title: "課表流程",
    path: "/coachflow",
    status: "Robot",
    summary: "課表、學員、Robot 回覆測試。",
    checks: ["切換學員", "查今日課表", "回報完成"],
  },
]

const verificationFlow = ["前台收件", "後台建案", "報價暫存", "任務派工", "LINE 回報"]

function AdminDashboard() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <main className="min-h-screen bg-[#0b111b] text-slate-100">
      <header className="border-b border-white/10 bg-[#0b111b]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-sm font-black text-cyan-200">Admin Control</p>
            <p className="text-xs font-bold text-slate-400">
              {user?.name || "Admin"} / {user?.role || "admin"}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-black text-slate-200"
            >
              首頁
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-black uppercase text-cyan-300">System Portfolio</p>
            <h1 className="mt-4 max-w-xl text-3xl font-black leading-tight text-white md:text-5xl">
              三套作品，一條驗證流程。
            </h1>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-slate-300">
              後台只放入口、狀態與測試重點，細節進系統再看。
            </p>
          </div>

          <div className="grid gap-2 rounded-[24px] border border-white/10 bg-white/[0.04] p-3 sm:grid-cols-5">
            {verificationFlow.map((item, index) => (
              <div key={item} className="rounded-2xl bg-[#111827] p-4">
                <p className="font-mono text-xs font-black text-cyan-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-black text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {adminProjects.map((project) => (
            <article
              key={project.name}
              className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-cyan-200">{project.title}</p>
                  <h2 className="mt-2 text-2xl font-black text-white">{project.name}</h2>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-slate-300">
                  {project.status}
                </span>
              </div>

              <p className="mt-5 text-sm font-bold leading-6 text-slate-300">{project.summary}</p>

              <div className="mt-5 grid gap-2">
                {project.checks.map((check) => (
                  <div key={check} className="rounded-xl bg-[#111827] px-3 py-2 text-sm font-bold">
                    {check}
                  </div>
                ))}
              </div>

              <Link
                to={project.path}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950"
              >
                開啟
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard
