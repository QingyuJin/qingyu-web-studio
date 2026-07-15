import { Link } from "react-router-dom"
import { portfolioProjects } from "../data/portfolioContent"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function ProjectAction({ project }) {
  const className = "mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0f766e] px-5 text-sm font-black text-white hover:bg-[#115e59]"

  if (project.external || isExternalUrl(project.demoPath)) {
    return (
      <a href={project.demoPath} target="_blank" rel="noreferrer" className={className}>
        {project.cta}
      </a>
    )
  }

  return (
    <Link to={project.demoPath} className={className}>
      {project.cta}
    </Link>
  )
}

function PortfolioSection() {
  return (
    <section id="works" className="border-y border-[#dedbd1] bg-[#ebe8df]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
              Projects / Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              作品展示：能被客戶理解的實作案例
            </h2>
          </div>
          <p className="max-w-md text-sm font-bold leading-7 text-[#5d6863]">
            每個作品都聚焦一個真實商務問題：收需求、整理資料、追蹤案件、建立可信任的網站門面
          </p>
        </div>

        <div className="mt-8 grid gap-5">
          {portfolioProjects.map((project) => (
            <article
              key={project.id}
              className="grid gap-5 rounded-lg border border-[#d2cdc0] bg-white p-5 shadow-sm md:grid-cols-[1fr_17rem] lg:grid-cols-[1fr_20rem]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#cad7d3] bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#135e56]">
                    {project.positioning}
                  </span>
                  <span className="text-xs font-black text-[#8b5a25]">服務對象：{project.audience}</span>
                </div>

                <h3 className="mt-4 text-2xl font-black tracking-tight text-[#172026]">
                  {project.name}
                </h3>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <InfoBlock title="解決問題" text={project.problem} />
                  <div>
                    <p className="text-sm font-black text-[#40514f]">主要功能</p>
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

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[#172026] px-2.5 py-1 text-xs font-black text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ProjectAction project={project} />
              </div>

              <PhonePreview project={project} />
            </article>
          ))}
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

export default PortfolioSection
