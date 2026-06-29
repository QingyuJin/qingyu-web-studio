import type { Project } from "./data"

type ProjectCardProps = {
  project: Project
  selected: boolean
  onSelect: () => void
}

const statusClass = {
  Live: "bg-[#eaf4dc] text-[#526828]",
  Training: "bg-[#fff0d0] text-[#9b5d1c]",
  Design: "bg-[#fde7dd] text-[#b94722]",
  Review: "bg-[#efe8ff] text-[#6544a6]",
}

export default function ProjectCard({ project, selected, onSelect }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group text-left transition hover:-translate-y-1 ${
        selected ? "rounded-[1.45rem] outline outline-2 outline-[#e6572e]/55" : "rounded-[1.45rem]"
      }`}
    >
      <article className="min-h-[250px] rounded-[1.45rem] border border-[#eadbca] bg-[#fffaf2] p-4 shadow-sm shadow-[#5b3925]/5 transition group-hover:shadow-xl group-hover:shadow-[#5b3925]/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9b7864]">{project.category}</p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#2b1c16]">{project.name}</h3>
          </div>
          <span className={`rounded-full px-3 py-1 text-[11px] font-black ${statusClass[project.status]}`}>{project.status}</span>
        </div>

        <p className="mt-4 line-clamp-2 text-sm font-bold leading-6 text-[#725448]">{project.summary}</p>

        <div className="mt-5 rounded-2xl bg-[#2b1c16] p-4 text-white">
          <div className="flex items-center justify-between text-xs font-black text-white/72">
            <span>{project.tone}</span>
            <span>{project.progress}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.accent }} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {project.outcomes.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white/8 px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">{label}</p>
                <p className="mt-1 text-sm font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </button>
  )
}
