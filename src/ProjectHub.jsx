import { useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const entryPoints = [
  {
    id: "quote",
    index: "01",
    title: "我要估價",
    desc: "把 LINE、口頭、Excel、Pro360 需求整理成報價單。",
    path: "/contractor-site#inquiry",
    checks: ["需求表單", "工種工項", "PDF 報價"],
  },
  {
    id: "cases",
    index: "02",
    title: "看工程案例",
    desc: "用真實照片快速建立信任。",
    path: "/contractor-site#cases",
    checks: ["防水", "地坪", "木作"],
  },
  {
    id: "status",
    index: "03",
    title: "查案件進度",
    desc: "老闆看總覽，師傅回報，業主確認進度。",
    path: "/buildflow",
    checks: ["案件", "派工", "LINE 回報"],
  },
]

const systems = [
  ["前台", "接需求"],
  ["後台", "做報價"],
  ["LINE", "回報進度"],
  ["PDF", "給業主確認"],
]

function ProjectHub() {
  const [activeEntry, setActiveEntry] = useState(entryPoints[0])

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
              <p className="text-xs font-bold text-slate-400">工程行流程系統</p>
            </div>
          </Link>
          <Link to="/login" className="rounded-xl border border-white/10 px-4 py-2 text-sm font-black text-slate-200">
            管理登入
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.78fr_1.22fr] lg:py-20">
        <div>
          <p className="text-xs font-black uppercase text-cyan-300">BuildFlow</p>
          <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight text-white md:text-6xl">
            工程行報價與派工系統
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-7 text-slate-300">
            需求進來，變報價。報價確認，變案件。師傅用 LINE 回報。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <InfoPill label="LINE Bot" value={lineBotId} />
            <InfoPill label="目標價值" value="20 萬級 MVP" />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-3">
          <div className="grid grid-cols-3 gap-3">
            {entryPoints.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveEntry(item)}
                className={`aspect-square rounded-2xl border p-3 text-left transition active:translate-y-px ${
                  activeEntry.id === item.id
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
            <p className="text-xs font-black uppercase text-cyan-300">Action</p>
            <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-black text-white">{activeEntry.title}</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{activeEntry.desc}</p>
              </div>
              <Link
                to={activeEntry.path}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300 px-5 text-sm font-black text-slate-950"
              >
                開啟
              </Link>
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {activeEntry.checks.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm font-black">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.035] p-4 md:grid-cols-4">
          {systems.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#111827] p-4">
              <p className="text-xs font-black text-cyan-300">{label}</p>
              <p className="mt-2 font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-black text-slate-500">{label}</p>
      <p className="mt-2 font-mono text-lg font-black text-cyan-200">{value}</p>
    </div>
  )
}

export default ProjectHub
