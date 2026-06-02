import { Link } from "react-router-dom"

const projects = [
  {
    title: "接案網站",
    name: "Contractor Site",
    path: "/contractor-site",
    status: "Website",
    type: "Public Site",
    desc: "服務、案例、表單。前台收需求，後台接案件。",
    features: ["服務", "案例", "表單", "建案"],
    icon: "⌘",
  },
  {
    title: "工程後台",
    name: "BuildFlow",
    path: "/buildflow",
    status: "System",
    type: "Operation System",
    desc: "案件、發包、批價、任務、LINE 回報集中管理。",
    features: ["登入", "案件", "發包", "LINE"],
    icon: "▦",
  },
  {
    title: "課表系統",
    name: "CoachFlow",
    path: "/coachflow",
    status: "Prototype",
    type: "Vertical Workflow",
    desc: "學生、課表、完成、回報。展示跨產業流程化。",
    features: ["學生", "課表", "追蹤", "回報"],
    icon: "◈",
  },
]

const capabilities = [
  "角色登入",
  "後台總覽",
  "資料管理",
  "搜尋篩選",
  "Supabase",
  "LINE 回報",
  "手機版",
  "點擊回饋",
]

const demoAccounts = [
  { label: "Main Admin", account: "admin@qingyu.dev / qgadmin" },
  { label: "BuildFlow Admin", account: "admin / admin123" },
  { label: "BuildFlow Worker", account: "aming / 1234" },
]

const lineBotId = "@550oexzn"

const testSteps = [
  `LINE 加 ${lineBotId}`,
  "輸入：選單 / 案例 / 報價",
  "進入 Contractor Site",
  "填需求表單",
  "進入 BuildFlow",
  "admin / admin123 登入",
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

      <section className="relative mx-auto max-w-6xl px-4 py-10 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="lab-eyebrow">SYSTEM PORTFOLIO</p>
          <h1 className="mt-5 text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl md:text-6xl">
            工程接案網站
            <span className="block text-sky-300">後台管理系統</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-bold leading-8 text-stone-300 md:text-lg">
            前台收需求，後台管案件。LINE Bot 可測任務與回報。
          </p>
          <p className="mx-auto mt-3 inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm font-black text-sky-300">
            LINE Bot {lineBotId}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/buildflow" className="lab-primary-button">
              測後台系統
            </Link>
            <Link to="/contractor-site" className="lab-secondary-button">
              看工程網站
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.name} to={project.path} className="lab-project-card group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-300/70">
                    {project.type}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                    {project.name}
                  </h2>
                </div>
                <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-black text-sky-100">
                  {project.status}
                </span>
              </div>

              <div className="my-5 grid h-24 place-items-center rounded-xl border border-white/10 bg-black/25 text-4xl text-sky-300 shadow-inner md:h-28 md:text-5xl">
                {project.icon}
              </div>

              <h3 className="text-xl font-black text-stone-100 md:text-2xl">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-300 md:text-base">{project.desc}</p>

              <div className="mt-6 grid gap-3">
                {project.features.map((feature) => (
                  <span key={feature} className="lab-check-row">
                    <span>✓</span>
                    {feature}
                  </span>
                ))}
              </div>

              <span className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-black text-slate-950 transition group-hover:bg-sky-400">
                進入作品
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-6xl gap-5 px-4 pb-16 lg:grid-cols-[1fr_0.85fr]">
        <div className="lab-glass-panel lg:col-span-2">
          <p className="lab-eyebrow">HOW TO TEST</p>
          <h2 className="mt-3 text-2xl font-black text-white md:text-4xl">測試流程</h2>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {testSteps.map((step, index) => (
              <div key={step} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="font-mono text-xs font-black text-sky-300">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-black leading-7 text-stone-100">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lab-glass-panel">
          <p className="lab-eyebrow">SYSTEM CAPABILITIES</p>
          <h2 className="mt-3 text-2xl font-black text-white md:text-4xl">能力清單</h2>
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
          <h2 className="mt-3 text-2xl font-black text-white">測試帳號</h2>
          <div className="mt-7 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300/70">
                LINE Bot
              </p>
              <p className="mt-2 font-mono text-sm font-bold text-stone-100">{lineBotId}</p>
            </div>
            {demoAccounts.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300/70">
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
