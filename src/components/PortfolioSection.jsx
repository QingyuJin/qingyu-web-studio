import { Link } from "react-router-dom"
import { portfolioProjects } from "../data/portfolioContent"

function PortfolioSection() {
  return (
    <section id="works" className="border-y border-[#dedbd1] bg-[#ebe8df]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
              Featured Work
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,7vw,2.25rem)] font-black tracking-tight md:text-4xl">
              主打作品
            </h2>
          </div>
          <p className="max-w-md text-sm font-bold leading-7 text-[#5d6863]">
            先看 BuildFlow：從 LINE 接單到後台追蹤，完整示範網站如何真的進入工作流程。
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:mt-8 md:gap-5">
          {portfolioProjects.map((project) => {
            const isFeatured = project.id === "buildflow"

            return (
            <article
              key={project.id}
              className={`grid gap-4 rounded-xl border p-4 shadow-sm md:grid-cols-[1fr_17rem] md:gap-5 md:p-5 lg:grid-cols-[1fr_20rem] ${
                isFeatured
                  ? "border-[#9fcfc4] bg-gradient-to-br from-white to-[#eef7f4] shadow-xl shadow-[#0f766e]/10"
                  : "border-[#d2cdc0] bg-white"
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#cad7d3] bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#135e56]">
                    {project.positioning}
                  </span>
                  {project.badge ? (
                    <span className="rounded-full border border-[#f0dcc0] bg-[#fff7e8] px-3 py-1 text-xs font-black text-[#8b5a25]">
                      {project.badge}
                    </span>
                  ) : null}
                  <span className="text-xs font-black text-[#8b5a25]">服務對象：{project.audience}</span>
                </div>

                <h3 className="mt-4 text-xl font-black tracking-tight text-[#172026] md:text-2xl">
                  {project.name}
                </h3>

                <div className="mt-3 grid gap-3 md:mt-4 md:gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <InfoBlock title="重點" text={project.problem} />
                  <div>
                    <p className="text-sm font-black text-[#40514f]">標籤</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-[#e0ddd3] bg-[#f8f7f2] px-3 py-1 text-xs font-black text-[#5d6863]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {project.note ? (
                  <p className="mt-4 rounded-lg border border-[#e0ddd3] bg-[#f8f7f2] px-4 py-3 text-sm font-bold leading-7 text-[#5d6863]">
                    {project.note}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[#172026] px-2.5 py-1 text-xs font-black text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={project.demoPath}
                  className={`mt-5 inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-black text-white md:mt-6 ${
                    isFeatured ? "bg-[#172026] hover:bg-[#27404a]" : "bg-[#0f766e] hover:bg-[#115e59]"
                  }`}
                >
                  {project.ctaLabel || "查看案例"}
                </Link>
              </div>

              {project.id === "buildflow" ? <BuildFlowPreview /> : <PhonePreview project={project} />}
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ title, text }) {
  return (
    <div>
      <p className="text-sm font-black text-[#40514f]">{title}</p>
      <p className="mt-2 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
    </div>
  )
}

function PhonePreview({ project }) {
  return (
    <div className="mx-auto w-full max-w-[17rem] rounded-[1.65rem] border border-[#172026] bg-[#172026] p-2 shadow-xl shadow-[#172026]/12">
      <div className="overflow-hidden rounded-[1.25rem] bg-[#f8f7f2]">
        <div className="flex items-center justify-between border-b border-[#d9d5ca] bg-white px-4 py-3">
          <span className="text-xs font-black text-[#172026]">{project.preview.title}</span>
          <span className="rounded-full bg-[#f0c36a] px-2 py-1 text-[0.65rem] font-black text-[#172026]">
            {project.preview.metric}
          </span>
        </div>
        <div className="grid gap-3 p-4">
          <div className="h-24 rounded-lg bg-gradient-to-br from-[#d9e8e3] to-[#f5e2b5]" />
          {project.preview.rows.map((row, index) => (
            <div key={row} className="rounded-md border border-[#dedbd1] bg-white p-3">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#eef7f4] text-xs font-black text-[#0f766e]">
                  {index + 1}
                </span>
                <p className="text-xs font-black text-[#40514f]">{row}</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf0ec]">
                <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${48 + index * 18}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BuildFlowPreview() {
  const flow = ["報價", "同意", "回報", "驗收", "請款", "保固"]

  return (
    <div className="mx-auto w-full max-w-[20rem] rounded-[1.35rem] border border-[#172026] bg-[#172026] p-2 shadow-xl shadow-[#172026]/12">
      <div className="grid gap-3 overflow-hidden rounded-[1rem] bg-[#f8f7f2] p-3">
        <div className="rounded-lg border border-[#dedbd1] bg-white p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[0.65rem] font-black uppercase tracking-normal text-[#0f766e]">
                Case
              </p>
              <p className="mt-1 text-sm font-black text-[#172026]">q-001 屋頂防水工程</p>
            </div>
            <span className="rounded-full bg-sky-50 px-2 py-1 text-[0.65rem] font-black text-sky-800">
              施工中
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.65rem] font-black text-[#66716d]">
            <span>進度</span>
            <span>75%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#edf0ec]">
            <div className="h-full w-3/4 rounded-full bg-[#0f766e]" />
          </div>
        </div>

        <div className="rounded-lg border border-[#dedbd1] bg-white p-3">
          <p className="text-[0.65rem] font-black uppercase tracking-normal text-[#0f766e]">Flow Overview</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {flow.map((item) => (
              <span key={item} className="rounded-full bg-[#eef7f4] px-2 py-1 text-[0.65rem] font-black text-[#135e56]">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-2 rounded-lg border border-[#dedbd1] bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.65rem] font-black uppercase tracking-normal text-[#0f766e]">Timeline</p>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[0.65rem] font-black text-emerald-800">
              Supabase sync
            </span>
          </div>
          <PreviewTimeline time="09:12" text="LINE 報價已查看" />
          <PreviewTimeline time="10:40" text="業主同意轉案件" />
          <PreviewTimeline time="17:30" text="施工回報同步後台" />
        </div>
      </div>
    </div>
  )
}

function PreviewTimeline({ time, text }) {
  return (
    <div className="grid grid-cols-[2.4rem_1fr] gap-2 text-[0.7rem] font-bold text-[#5d6863]">
      <span className="font-black text-[#0f766e]">{time}</span>
      <span className="min-w-0 truncate">{text}</span>
    </div>
  )
}

export default PortfolioSection
