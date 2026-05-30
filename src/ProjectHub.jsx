import { Link } from "react-router-dom"

const projects = [
  {
    title: "工程行前台網站",
    name: "Contractor Site",
    path: "/contractor-site",
    status: "Website",
    type: "公開網站",
    desc: "協助工程行展示服務、案例、流程與聯絡方式，讓客戶快速理解並建立信任。",
    features: ["服務介紹", "施工案例", "聯絡導流", "RWD 網站"],
  },
  {
    title: "工程行發包管理系統",
    name: "BuildFlow",
    path: "/buildflow",
    status: "System",
    type: "後台系統",
    desc: "管理案件、發包、批價、廠商與追加減項，讓工程流程不再只靠 LINE 和記憶。",
    features: ["案件管理", "發包批價", "追加減項", "角色權限"],
  },
  {
    title: "健身教練課表系統",
    name: "CoachFlow",
    path: "/coachflow",
    status: "LINE Bot",
    type: "自動化系統",
    desc: "協助教練建立學生課表、追蹤完成狀態，並透過 LINE Bot 提醒與回報訓練。",
    features: ["學生管理", "課表建立", "完成追蹤", "LINE Bot"],
  },
]

const capabilities = [
  "Role-based login",
  "Admin dashboard",
  "CRUD workflow",
  "Search and filters",
  "Local data persistence",
  "LINE Bot workflow simulation",
  "Future Supabase integration",
]

const demoAccounts = [
  { label: "Main Admin", account: "admin@qingyu.dev / qgadmin" },
  { label: "BuildFlow Admin", account: "admin / admin123" },
  { label: "BuildFlow Worker", account: "aming / 1234" },
]

function ProjectHub() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-lg font-black">Qingyu System Lab</p>
            <p className="text-sm text-slate-500">網站、後台系統與 LINE Bot 自動化</p>
          </div>

          <Link
            to="/login"
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
          >
            管理者登入
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            System Portfolio
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">
            把散落的流程，整理成可追蹤的系統。
          </h1>

          <p className="mt-5 leading-8 text-slate-600">
            專注於小型團隊的網站、內部管理工具與自動化流程，
            協助案件、課表、資料與日常溝通更清楚地被管理。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/buildflow"
              className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white"
            >
              直接試用 BuildFlow
            </Link>
            <Link
              to="/contractor-site"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700"
            >
              查看前台接案網站
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex min-h-[360px] flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-500">{project.type}</p>
                    <h2 className="mt-2 text-2xl font-black">{project.name}</h2>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                    {project.status}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-black">{project.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{project.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to={project.path}
                className="mt-8 block rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white"
              >
                進入作品 →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
              System Capabilities
            </p>
            <h2 className="mt-3 text-2xl font-black">可以展示的技術能力</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
              Demo Accounts
            </p>
            <h2 className="mt-3 text-2xl font-black">快速測試帳號</h2>
            <div className="mt-5 grid gap-3">
              {demoAccounts.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-500">{item.label}</p>
                  <p className="mt-1 font-mono text-sm font-bold text-slate-800">{item.account}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default ProjectHub
