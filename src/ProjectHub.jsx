import { useState } from "react"
import { Link } from "react-router-dom"

const cases = [
  {
    id: "contractor",
    index: "01",
    name: "Contractor Site",
    title: "工程接案入口",
    path: "/contractor-site",
    role: "Public Website",
    outcome: "把案例、詢問、報價前置整理成同一條線。",
    proof: ["工程案例", "需求表單", "LINE 詢問", "後台建案"],
    test: ["看工程照片", "填需求表單", "複製摘要", "進 BuildFlow"],
  },
  {
    id: "buildflow",
    index: "02",
    name: "BuildFlow",
    title: "工程管理後台",
    path: "/buildflow",
    role: "Operation System",
    outcome: "案件、發包、追加、任務、回報集中管理。",
    proof: ["角色登入", "案件狀態", "暫存報價", "LINE 回報"],
    test: ["admin / admin123", "建立案件", "指派任務", "查看回報"],
  },
  {
    id: "coachflow",
    index: "03",
    name: "CoachFlow",
    title: "課表追蹤系統",
    path: "/coachflow",
    role: "Workflow Product",
    outcome: "用同一套邏輯展示跨產業流程化能力。",
    proof: ["學員資料", "課表狀態", "回報紀錄", "Robot 測試"],
    test: ["點 Robot", "查今日課表", "送出回報", "標記完成"],
  },
]

const lineBotId = "@550oexzn"
const systemSteps = ["前台收件", "後台建案", "任務派工", "LINE 回報"]

function ProjectHub() {
  const [activeCase, setActiveCase] = useState(cases[0])

  return (
    <main className="min-h-screen bg-[#0b111b] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b111b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Qingyu System Lab">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/25 bg-white/5 font-black text-cyan-200">
              Q
            </span>
            <div>
              <p className="font-black">Qingyu System Lab</p>
              <p className="text-xs font-bold text-slate-400">Workflow systems</p>
            </div>
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-black text-slate-200"
          >
            管理登入
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
        <div>
          <p className="text-xs font-black uppercase text-cyan-300">Portfolio</p>
          <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-white md:text-6xl">
            小型企業流程系統作品集
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-7 text-slate-300">
            從前台接案、後台管理到 LINE Bot 回報，展示一套可驗證的工作流。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-black text-slate-500">LINE Bot</p>
              <p className="mt-2 font-mono text-lg font-black text-cyan-200">{lineBotId}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-black text-slate-500">Core</p>
              <p className="mt-2 text-lg font-black">Website + Backend + Bot</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-3 shadow-2xl">
          <div className="grid grid-cols-3 gap-3">
            {cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCase(item)}
                className={`aspect-square rounded-2xl border p-3 text-left transition active:translate-y-px ${
                  activeCase.id === item.id
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : "border-white/10 bg-[#111827] text-slate-200 hover:border-cyan-300/40"
                }`}
              >
                <span className="font-mono text-xs font-black opacity-70">{item.index}</span>
                <span className="mt-3 block text-sm font-black leading-5 md:text-base">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          <section className="mt-3 rounded-2xl bg-[#080d14] p-5 md:p-6">
            <p className="text-xs font-black uppercase text-cyan-300">{activeCase.role}</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">{activeCase.name}</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-300">
                  {activeCase.outcome}
                </p>
              </div>
              <Link
                to={activeCase.path}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950"
              >
                開啟
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <CaseList title="交付內容" items={activeCase.proof} />
              <CaseList title="測試方式" items={activeCase.test} />
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.035] p-4 md:grid-cols-4">
          {systemSteps.map((step, index) => (
            <div key={step} className="rounded-2xl bg-[#111827] p-4">
              <p className="font-mono text-xs font-black text-cyan-300">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-black text-white">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function CaseList({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <h3 className="text-sm font-black text-white">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectHub
