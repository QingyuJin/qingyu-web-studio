import { useState } from "react"
import { Link } from "react-router-dom"

const projects = [
  {
    title: "接案網站",
    name: "Contractor Site",
    path: "/contractor-site",
    status: "Website",
    desc: "前台收需求，後台建案件。",
    features: ["服務項目", "工程案例", "需求表單", "報價銜接"],
    test: ["看案例", "填需求", "複製摘要", "到 BuildFlow 建案"],
    icon: "01",
  },
  {
    title: "工程後台",
    name: "BuildFlow",
    path: "/buildflow",
    status: "System",
    desc: "案件、發包、任務、LINE 回報。",
    features: ["案件管理", "暫存報價", "任務派工", "LINE Bot"],
    test: ["admin / admin123", "新增案件", "指派任務", "查看回報"],
    icon: "02",
  },
  {
    title: "課表系統",
    name: "CoachFlow",
    path: "/coachflow",
    status: "Robot Demo",
    desc: "課表、完成、回報、Robot 測試。",
    features: ["學員名單", "課表追蹤", "回報紀錄", "Robot 預覽"],
    test: ["進入 Robot", "點今日課表", "點回報", "點完成"],
    icon: "03",
  },
]

const systemFlow = ["前台", "需求", "後台", "任務", "LINE"]
const lineBotId = "@550oexzn"

function ProjectHub() {
  const [activeProject, setActiveProject] = useState(projects[0])

  return (
    <main className="lab-page min-h-screen overflow-hidden text-stone-100">
      <FloatingParticles />

      <header className="lab-topbar sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Qingyu System Lab">
            <span className="lab-mark">Q</span>
            <div>
              <p className="text-lg font-black tracking-wide">Qingyu System Lab</p>
              <p className="text-xs font-bold text-stone-400">System Portfolio</p>
            </div>
          </Link>
          <Link to="/login" className="lab-ghost-button">
            管理者登入
          </Link>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 py-10 md:py-18">
        <div className="max-w-3xl">
          <p className="lab-eyebrow">SYSTEM LAB</p>
          <h1 className="mt-5 text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl md:text-5xl">
            把流程做成系統
          </h1>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-stone-300 md:text-base">
            網站、後台、LINE Bot 串接展示。
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[330px_minmax(0,1fr)]">
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {projects.map((project) => {
              const isActive = activeProject.name === project.name
              return (
                <button
                  key={project.name}
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className={`minimal-motion aspect-square rounded-2xl border p-4 text-left lg:aspect-auto lg:min-h-28 ${
                    isActive
                      ? "border-sky-300 bg-sky-300 text-slate-950"
                      : "border-white/10 bg-white/[0.06] text-white hover:border-sky-300/50"
                  }`}
                >
                  <span className="font-mono text-xs font-black opacity-70">{project.icon}</span>
                  <span className="mt-3 block text-lg font-black">{project.title}</span>
                  <span className="mt-1 block text-xs font-bold opacity-70">{project.status}</span>
                </button>
              )
            })}
          </div>

          <section className="minimal-motion rounded-2xl border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="lab-eyebrow">{activeProject.status}</p>
                <h2 className="mt-3 text-2xl font-black text-white md:text-4xl">
                  {activeProject.name}
                </h2>
                <p className="mt-3 text-base font-bold leading-7 text-stone-300">
                  {activeProject.desc}
                </p>
              </div>
              <Link to={activeProject.path} className="lab-primary-button shrink-0">
                進入
              </Link>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              <InfoBlock title="能力" items={activeProject.features} />
              <InfoBlock title="測試" items={activeProject.test} />
            </div>

            <div className="mt-6 rounded-2xl border border-sky-300/15 bg-sky-300/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                LINE Bot
              </p>
              <p className="mt-2 font-mono text-lg font-black text-white">{lineBotId}</p>
              <p className="mt-2 text-sm font-bold text-stone-300">
                可測：選單、案例、報價、今日任務、回報、完成。
              </p>
            </div>
          </section>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
          <p className="lab-eyebrow">FLOW</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {systemFlow.map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <span className="system-flow-chip">{item}</span>
                {index < systemFlow.length - 1 ? (
                  <span className="text-sm font-black text-slate-500">→</span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoBlock({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="lab-check-row">
            <span>✓</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, index) => (
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
