import { Link } from "react-router-dom"

const projects = [
  {
    title: "工程行對外接案網站",
    name: "Contractor Site",
    path: "/contractor-site",
    status: "Website",
    type: "Public Site",
    desc: "服務介紹、施工案例、流程說明與需求表單，讓客戶先建立信任，再把需求帶進後台。",
    features: ["服務展示", "施工案例", "需求表單", "導入 BuildFlow"],
    icon: "⌘",
  },
  {
    title: "工程行後台管理系統",
    name: "BuildFlow",
    path: "/buildflow",
    status: "System",
    type: "Operation System",
    desc: "管理案件、發包、批價、廠商、追加減項、任務與 LINE Bot 回報，讓工程流程可追蹤。",
    features: ["角色登入", "案件管理", "發包批價", "LINE Bot"],
    icon: "▦",
  },
  {
    title: "健身教練課表系統",
    name: "CoachFlow",
    path: "/coachflow",
    status: "Prototype",
    type: "Vertical Workflow",
    desc: "用第二個垂直領域展示同一套能力：角色流程、課表指派、完成追蹤與回報。",
    features: ["學生管理", "課表建立", "完成追蹤", "回報流程"],
    icon: "◈",
  },
]

const capabilities = [
  "Role-based login",
  "Admin dashboard",
  "CRUD workflow",
  "Search and filters",
  "Supabase webhook",
  "LINE Bot task reports",
  "Mobile-first UI",
  "Interactive feedback",
]

const demoAccounts = [
  { label: "Main Admin", account: "admin@qingyu.dev / qgadmin" },
  { label: "BuildFlow Admin", account: "admin / admin123" },
  { label: "BuildFlow Worker", account: "aming / 1234" },
]

function ProjectHub() {
  return (
    <main className="lab-page min-h-screen overflow-hidden text-stone-100">
      <FloatingParticles />

      <header className="lab-topbar sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Qingyu System Lab">
            <span className="lab-mark">Q</span>
            <div>
              <p className="text-lg font-black tracking-wide">Qingyu System Lab</p>
              <p className="text-xs font-bold text-stone-400">Web / System / LINE Bot</p>
            </div>
          </Link>

          <Link to="/login" className="lab-ghost-button">
            管理者登入
          </Link>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="lab-eyebrow">SYSTEM PORTFOLIO</p>
          <h1 className="mt-6 text-5xl font-black leading-tight tracking-normal text-white md:text-7xl">
            把散落流程
            <span className="block text-yellow-300">整理成可操作系統</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-bold leading-9 text-stone-300 md:text-xl">
            網站、後台、登入權限、資料管理、LINE Bot 與 Supabase 串接，組成一套可以展示的系統作品。
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/buildflow" className="lab-primary-button">
              進入 BuildFlow
            </Link>
            <Link to="/contractor-site" className="lab-secondary-button">
              查看接案網站
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.name} to={project.path} className="lab-project-card group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300/80">
                    {project.type}
                  </p>
                  <h2 className="mt-4 text-3xl font-black text-white">{project.name}</h2>
                </div>
                <span className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-3 py-1 text-xs font-black text-yellow-200">
                  {project.status}
                </span>
              </div>

              <div className="my-8 grid h-32 place-items-center rounded-2xl border border-white/10 bg-black/25 text-6xl text-yellow-300 shadow-inner">
                {project.icon}
              </div>

              <h3 className="text-2xl font-black text-stone-100">{project.title}</h3>
              <p className="mt-4 leading-8 text-stone-300">{project.desc}</p>

              <div className="mt-6 grid gap-3">
                {project.features.map((feature) => (
                  <span key={feature} className="lab-check-row">
                    <span>✓</span>
                    {feature}
                  </span>
                ))}
              </div>

              <span className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-yellow-300 px-5 py-4 text-sm font-black text-black shadow-[0_0_32px_rgba(250,204,21,0.22)] transition group-hover:bg-yellow-200">
                進入作品
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-5 px-4 pb-16 lg:grid-cols-[1fr_0.85fr]">
        <div className="lab-glass-panel">
          <p className="lab-eyebrow">SYSTEM CAPABILITIES</p>
          <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">可展示能力</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="lab-check-row">
                <span>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="lab-glass-panel">
          <p className="lab-eyebrow">DEMO ACCOUNTS</p>
          <h2 className="mt-4 text-3xl font-black text-white">快速測試</h2>
          <div className="mt-7 grid gap-3">
            {demoAccounts.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300/70">
                  {item.label}
                </p>
                <p className="mt-2 font-mono text-sm font-bold text-stone-100">{item.account}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 26 }).map((_, index) => (
        <span
          key={index}
          className="lab-particle"
          style={{
            "--x": `${(index * 37) % 100}%`,
            "--y": `${(index * 61) % 100}%`,
            "--d": `${5 + (index % 7)}s`,
            "--s": `${3 + (index % 5)}px`,
          }}
        />
      ))}
    </div>
  )
}

export default ProjectHub
