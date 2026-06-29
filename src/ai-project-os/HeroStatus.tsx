import type { Project } from "./data"
import KpiCard from "./KpiCard"

type HeroStatusProps = {
  selectedProject: Project
  mode: "Studio" | "Ops"
}

export default function HeroStatus({ selectedProject, mode }: HeroStatusProps) {
  return (
    <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
      <article className="overflow-hidden rounded-[2rem] border border-[#eadbca] bg-[#fffaf2] p-5 shadow-2xl shadow-[#5b3925]/10 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b94722]">AI Project OS</p>
            <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.25rem,8vw,7.6rem)] font-black leading-[0.9] tracking-[-0.055em] text-[#2b1c16]">
              Curated project command table.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#725448]">
              展示 AI 工具、後台系統與作品成果，一個畫面管理狀態、指標、技術棧與下一步。
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-[#2b1c16] p-4 text-white md:w-72">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f7c1a2]">System State</p>
            <div className="mt-8 flex items-end justify-between">
              <p className="text-5xl font-black tracking-[-0.06em]">{selectedProject.progress}%</p>
              <span className="rounded-full bg-[#ff7a3d] px-3 py-1 text-xs font-black text-white">{mode}</span>
            </div>
            <div className="mt-5 h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#ff7a3d]" style={{ width: `${selectedProject.progress}%` }} />
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-white/68">{selectedProject.name} is selected for review.</p>
          </div>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <KpiCard label="進行中專案" value="12" delta="+3" tone="warm" />
        <KpiCard label="完成作品" value="38" delta="stable" />
        <KpiCard label="模型準確率" value={`${selectedProject.accuracy}%`} delta="+4%" tone="dark" />
        <KpiCard label="今日瀏覽" value={selectedProject.views} delta="live" />
      </div>
    </section>
  )
}
