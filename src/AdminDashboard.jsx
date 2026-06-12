import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "./auth"

const adminProjects = [
  {
    name: "Contractor Site",
    title: "估價前台",
    path: "/contractor-site",
    status: "Website",
    summary: "給客戶填需求、看案例、留下聯絡資料。",
    checks: ["工程照片", "需求表單", "估價摘要"],
  },
  {
    name: "BuildFlow",
    title: "工程後台",
    path: "/buildflow",
    status: "System",
    summary: "案件、報價、發包、任務回報集中管理。",
    checks: ["角色登入", "報價單", "LINE 回報"],
  },
]

const verificationFlow = ["收需求", "建案件", "出報價", "派師傅", "回報完成"]

function AdminDashboard() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#12212a]">
      <header className="border-b border-[#ded8cc] bg-[#f6f3ec]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-sm font-black text-[#1d6f65]">工程入口</p>
            <p className="text-xs font-bold text-[#61706d]">
              {user?.name || "Admin"} / {user?.role || "admin"}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/engineering"
              className="rounded-md border border-[#c8c0b3] px-4 py-2 text-sm font-black text-[#12212a]"
            >
              回首頁
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-[#123f4a] px-4 py-2 text-sm font-black text-white"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">
              Work Flow
            </p>
            <h1 className="mt-4 max-w-xl text-3xl font-black leading-tight md:text-5xl">
              一條工程流程，兩個入口。
            </h1>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#5b6966]">
              前台收需求，後台管案件。先看流程，再進系統操作。
            </p>
          </div>

          <div className="grid gap-2 rounded-md border border-[#d9d1c4] bg-white p-3 sm:grid-cols-5">
            {verificationFlow.map((item, index) => (
              <div key={item} className="rounded-md bg-[#f3f0e8] p-4">
                <p className="font-mono text-xs font-black text-[#1d6f65]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {adminProjects.map((project) => (
            <article key={project.name} className="rounded-md border border-[#d9d1c4] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#1d6f65]">{project.title}</p>
                  <h2 className="mt-2 text-2xl font-black">{project.name}</h2>
                </div>

                <span className="rounded-full border border-[#d9d1c4] px-3 py-1 text-xs font-black text-[#61706d]">
                  {project.status}
                </span>
              </div>

              <p className="mt-5 text-sm font-bold leading-6 text-[#5b6966]">{project.summary}</p>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {project.checks.map((check) => (
                  <div key={check} className="rounded-md bg-[#f3f0e8] px-3 py-2 text-sm font-bold">
                    {check}
                  </div>
                ))}
              </div>

              <Link
                to={project.path}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#123f4a] px-5 text-sm font-black text-white"
              >
                打開
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AdminDashboard
