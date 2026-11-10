import { Suspense, lazy, useEffect } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { localeOptions, localizedBrandName, translateDisplayText } from "../i18n/translations"
import { projects } from "./content"
import { demoContactPath, getDemo } from "./demoRegistry"
import { DemoMission } from "./DemoMission"
import { ENABLE_MULTILINGUAL } from "./features"
import { getDemoMission } from "./demoMissions"
import { trackEvent } from "./marketing"
import Seo from "./Seo"

const WorkDemoPanel = lazy(() => import("./WorkDemoPanels"))

export function DemoExperience({ slug, children }) {
  const { locale } = useLocale()
  const demo = getDemo(slug)
  const mission = getDemoMission(slug)

  useEffect(() => {
    if (!demo) return
    trackEvent("demo_open", {
      demo_slug: demo.slug,
      source_project: demo.sourceProject,
    })
  }, [demo])

  if (!demo) return children

  const demoTitle = translateDisplayText(demo.title, locale, { preserveUnknown: true })
  const seoCopy = {
    "zh-Hant": { title: `${demoTitle} 展示 晴宇 Qingyu Web`, description: `${demoTitle} 可操作展示與實作流程` },
    en: { title: `${demoTitle} Demo ${localizedBrandName(locale)}`, description: `Interactive demo and implementation flow for ${demoTitle}` },
    ja: { title: `${demoTitle} デモ ${localizedBrandName(locale)}`, description: `${demoTitle}の操作デモと実装フロー` },
    ko: { title: `${demoTitle} 데모 ${localizedBrandName(locale)}`, description: `${demoTitle}의 인터랙티브 데모와 구현 흐름` },
  }[locale]

  return (
    <div className="demo-experience min-h-screen overflow-x-hidden bg-[#eef0ea]">
      <Seo page={{
        path: demo.demoPath,
        title: seoCopy.title,
        description: seoCopy.description,
        localizedCopy: true,
        robots: "noindex, follow, noarchive",
      }} />
      <DemoBar demo={demo} />
      {mission ? <DemoMission definition={mission} slug={slug}>{children}</DemoMission> : children}
    </div>
  )
}

export function NativeWorkDemo({ projectSlug }) {
  const project = projects.find((item) => item.slug === projectSlug)
  if (!project) return null
  return <Suspense fallback={<div className="min-h-48 bg-[#f2f1ec]" aria-label="操作畫面載入中" />}><WorkDemoPanel project={project} /></Suspense>
}

function DemoBar({ demo }) {
  const hasCaseStudy = Boolean(demo.caseStudyPath && demo.caseStudyPath !== demo.demoPath)
  const contactLabel = demo.contactType === "website" ? "洽談類似網站" : "洽談類似系統"
  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-[#0b1517]/96 text-white backdrop-blur-xl">
      <div className="mx-auto flex min-h-12 max-w-[1600px] items-center gap-3 px-3 sm:px-5">
        <Link to="/" className="inline-flex min-h-11 shrink-0 items-center text-[11px] font-semibold tracking-[.04em] text-white/64 hover:text-white">
          <span className="sm:hidden">← 晴宇</span>
          <span className="hidden sm:inline">← Qingyu Web</span>
        </Link>
        <span className="h-4 w-px bg-white/14" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-[11px] font-semibold sm:text-xs">{demo.title}</p>
        <span className="hidden rounded-full border border-[#8cb8ad]/28 bg-[#8cb8ad]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-[#b7d6ce] sm:inline-flex">任務體驗</span>
        {hasCaseStudy ? <Link to={demo.caseStudyPath} data-track="cta_click" data-placement="demo_bar_case" className="hidden min-h-11 items-center text-[10px] font-semibold text-white/56 hover:text-white md:inline-flex">查看案例</Link> : null}
        {ENABLE_MULTILINGUAL ? <div className="hidden sm:block"><DemoLanguageButtons /></div> : null}
        <Link to={demoContactPath(demo)} data-track="contact_from_demo" data-placement="demo_bar_contact" className="hidden min-h-11 shrink-0 items-center rounded-full bg-[#d7c89f] px-4 text-[10px] font-bold text-[#17201f] sm:inline-flex">{contactLabel}</Link>
        <details className="relative sm:hidden">
          <summary aria-label="更多操作" className="grid min-h-11 min-w-11 cursor-pointer list-none place-items-center rounded-full border border-white/15 text-base text-white/80">⋯</summary>
          <div className="absolute right-0 top-11 grid w-40 gap-1 rounded-xl border border-white/10 bg-[#111d1e] p-2 shadow-2xl">
            {hasCaseStudy ? <Link to={demo.caseStudyPath} className="min-h-11 rounded-lg px-3 py-3 text-xs font-bold text-white/75">查看案例</Link> : null}
            <Link to={demoContactPath(demo)} className="min-h-11 rounded-lg bg-[#d7c89f] px-3 py-3 text-xs font-bold text-[#17201f]">{contactLabel}</Link>
            {ENABLE_MULTILINGUAL ? <DemoLanguageButtons /> : null}
          </div>
        </details>
      </div>
    </header>
  )
}

function DemoLanguageButtons() {
  const { locale, setLocale } = useLocale()
  return (
    <div className="grid grid-cols-2 gap-1 border-t border-white/10 pt-2 sm:flex sm:border-0 sm:pt-0" aria-label="Language" data-i18n-control>
      {localeOptions.map((option) => (
        <button key={option.code} type="button" aria-label={option.label} aria-current={locale === option.code ? "true" : undefined} onClick={() => setLocale(option.code)} className={`min-h-11 min-w-11 rounded-full text-[9px] font-bold ${locale === option.code ? "bg-white text-[#17201f]" : "text-white/50 hover:text-white"}`}>
          {option.short}
        </button>
      ))}
    </div>
  )
}
