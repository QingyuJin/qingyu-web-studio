import type { Project } from "./data"

type ProjectDetailPanelProps = {
  project: Project
  darkPreview: boolean
  onDarkPreviewChange: () => void
}

export default function ProjectDetailPanel({ project, darkPreview, onDarkPreviewChange }: ProjectDetailPanelProps) {
  return (
    <aside className="sticky top-20 h-fit rounded-[1.75rem] border border-[#eadbca] bg-[#fffaf2] p-5 shadow-2xl shadow-[#5b3925]/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#b94722]">Selected Work</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#2b1c16]">{project.name}</h2>
        </div>
        <button
          type="button"
          onClick={onDarkPreviewChange}
          className={`min-h-10 rounded-full px-3 text-xs font-black ${darkPreview ? "bg-[#2b1c16] text-white" : "border border-[#eadbca] bg-white text-[#2b1c16]"}`}
        >
          {darkPreview ? "Dark" : "Light"}
        </button>
      </div>

      <div className={`mt-5 rounded-[1.25rem] p-4 ${darkPreview ? "bg-[#2b1c16] text-white" : "bg-[#fff2e7] text-[#2b1c16]"}`}>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/14 px-3 py-1 text-[11px] font-black">{project.status}</span>
          <span className="text-xs font-black opacity-70">{project.owner}</span>
        </div>
        <p className="mt-8 text-5xl font-black tracking-[-0.06em]">{project.accuracy}%</p>
        <p className="mt-2 text-sm font-bold opacity-70">model / workflow confidence</p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8c6f60]">Tech Stack</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#6f5143] shadow-sm">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <a href={project.demo} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#e6572e] px-4 text-sm font-black text-white shadow-lg shadow-[#e6572e]/18">
          Live Demo
        </a>
        <a href={`https://${project.github}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#eadbca] bg-white px-4 text-sm font-black text-[#2b1c16]">
          GitHub
        </a>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-[#eadbca] bg-white p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8c6f60]">Next</p>
        <div className="mt-3 grid gap-2">
          {project.nextSteps.map((step) => (
            <div key={step} className="rounded-xl bg-[#fff8ee] px-3 py-2 text-sm font-bold text-[#6f5143]">
              {step}
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
