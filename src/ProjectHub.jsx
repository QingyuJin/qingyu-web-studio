import { useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const flowSteps = [
  {
    id: "capture",
    no: "01",
    title: "確認",
    line: "把口頭需求變成欄位。",
    path: "/contractor-site#inquiry",
    bullets: ["來源", "工種", "日期"],
  },
  {
    id: "quote",
    no: "02",
    title: "報價",
    line: "材料、工項、單價集中。",
    path: "/buildflow",
    bullets: ["材料", "單價", "PDF"],
  },
  {
    id: "dispatch",
    no: "03",
    title: "發包",
    line: "派工、回報、追加留紀錄。",
    path: "/buildflow",
    bullets: ["派工", "回報", "追加"],
  },
]

const roleCards = [
  ["老闆", "看毛利、待辦、追加"],
  ["師傅", "看任務、回報照片"],
  ["業主", "看報價、確認進度"],
]

const proofCards = [
  ["估價前台", "收需求與照片"],
  ["報價後台", "工項、材料、單價"],
  ["PDF 摘要", "給業主確認"],
  ["LINE Bot", `${lineBotId} 可直接測`],
]

const testFlow = [
  "工程前台填估價",
  "BuildFlow 登入 admin / admin123",
  "看 q-001 報價與 PDF",
  "LINE 輸入：業主 q-001",
  "再測：綁定 → 今日任務",
]

function ProjectHub() {
  const [activeStep, setActiveStep] = useState(flowSteps[0])

  return (
    <main className="min-h-screen bg-[#08111f] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#08111f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Qingyu System Lab">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-300/25 bg-white/5 font-black text-emerald-200">
              Q
            </span>
            <div>
              <p className="font-black">Qingyu System Lab</p>
              <p className="text-xs font-bold text-slate-400">工程行系統作品</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/contractor-site"
              className="hidden rounded-xl border border-white/10 px-4 py-2 text-sm font-black text-slate-200 sm:inline-flex"
            >
              前台
            </Link>
            <Link
              to="/login"
              className="rounded-xl bg-emerald-300 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/20"
            >
              管理登入
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">
            BuildFlow 工程系統
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">
            需求進來，系統接住。
          </h1>
          <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-slate-300">
            給統包與工程行：收需求、做報價、派師傅、追進度、輸出 PDF。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/buildflow"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-300 px-5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/20"
            >
              進入 BuildFlow
            </Link>
            <Link
              to="/contractor-site"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-5 text-sm font-black text-slate-100 hover:border-emerald-300/50"
            >
              看前台流程
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {roleCards.map(([role, text]) => (
              <div key={role} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-xs font-black text-emerald-300">{role}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-3">
            {flowSteps.map((item) => {
              const isActive = activeStep.id === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveStep(item)}
                  className={`aspect-square rounded-2xl border p-4 text-left transition active:translate-y-px ${
                    isActive
                      ? "border-emerald-300 bg-emerald-300 text-slate-950 shadow-xl shadow-emerald-950/20"
                      : "border-white/10 bg-white/[0.045] text-slate-100 hover:border-emerald-300/40"
                  }`}
                >
                  <span className="font-mono text-xs font-black opacity-60">{item.no}</span>
                  <span className="mt-4 block text-xl font-black">{item.title}</span>
                  <span className="mt-2 hidden text-xs font-bold leading-5 opacity-70 sm:block">
                    {item.line}
                  </span>
                </button>
              )
            })}
          </div>

          <section className="rounded-[28px] border border-white/10 bg-[#0d1726] p-5 md:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase text-emerald-300">流程</p>
                <h2 className="mt-2 text-3xl font-black text-white">{activeStep.title}</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{activeStep.line}</p>
              </div>
              <Link
                to={activeStep.path}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-white px-5 text-sm font-black text-slate-950"
              >
                開啟
              </Link>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {activeStep.bullets.map((item) => (
                <p
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-black text-slate-200"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-3 md:grid-cols-4">
          {proofCards.map(([title, desc]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-lg font-black text-white">{title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-400">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0d1726]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
              測試路線
            </p>
            <h2 className="mt-3 text-2xl font-black text-white">怎麼測</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-400">前台、後台、LINE 一次看。</p>
          </div>
          <ol className="grid gap-3 md:grid-cols-5">
            {testFlow.map((item, index) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-[#08111f] p-4">
                <span className="font-mono text-xs font-black text-emerald-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm font-black leading-6 text-slate-200">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}

export default ProjectHub
