import { useEffect } from "react"
import { Link } from "react-router-dom"
import { projects } from "./content"
import { demoContactPath, getDemo } from "./demoRegistry"
import { trackEvent } from "./marketing"
import Seo from "./Seo"
import WorkDemoPanel from "./WorkDemoPanels"

export function DemoExperience({ slug, children }) {
  const demo = getDemo(slug)

  useEffect(() => {
    if (!demo) return
    trackEvent("demo_open", {
      demo_slug: demo.slug,
      source_project: demo.sourceProject,
    })
  }, [demo])

  if (!demo) return children

  return (
    <div className="min-h-screen bg-[#eef0ea]">
      <Seo page={{
        path: demo.caseStudyPath,
        title: `${demo.title} 展示｜晴宇 Qingyu Web`,
        description: `${demo.title} 可操作展示與實作流程`,
        robots: "noindex, follow, noarchive",
      }} />
      <DemoBar demo={demo} />
      {children}
    </div>
  )
}

export function NativeWorkDemo({ projectSlug }) {
  const project = projects.find((item) => item.slug === projectSlug)
  if (!project) return null
  return <WorkDemoPanel project={project} />
}

function DemoBar({ demo }) {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-[#0b1517]/96 text-white backdrop-blur-xl">
      <div className="mx-auto flex min-h-12 max-w-[1600px] items-center gap-3 px-3 sm:px-5">
        <Link to="/" className="shrink-0 text-[11px] font-semibold tracking-[.04em] text-white/64 hover:text-white">
          <span className="sm:hidden">← 晴宇</span>
          <span className="hidden sm:inline">← Qingyu Web</span>
        </Link>
        <span className="h-4 w-px bg-white/14" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-[11px] font-semibold sm:text-xs">{demo.title}</p>
        <span className="hidden rounded-full border border-[#8cb8ad]/28 bg-[#8cb8ad]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-[#b7d6ce] sm:inline-flex">{demo.type}</span>
        <Link to={demo.caseStudyPath} data-track="cta_click" data-placement="demo_bar_case" className="hidden text-[10px] font-semibold text-white/56 hover:text-white md:inline-flex">查看案例</Link>
        <Link to={demoContactPath(demo)} data-track="contact_from_demo" data-placement="demo_bar_contact" className="inline-flex min-h-8 shrink-0 items-center rounded-full bg-[#d7c89f] px-3 text-[10px] font-bold text-[#17201f] sm:px-4">洽談類似系統</Link>
      </div>
    </header>
  )
}
