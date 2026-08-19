import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { workCatalog, workFilters } from "./site/workCatalog"

const filterLabels = {
  All: "全部",
  Systems: "系統",
  Websites: "網站",
  Commerce: "商務",
  AI: "AI",
  LINE: "LINE",
  Growth: "成長",
}

const sectionMeta = {
  systems: ["Selected Systems", "企業系統", "從接單到營運 讓流程真正開始運作"],
  websites: ["Websites", "網站體驗", "品牌感與商業目的在同一個畫面成立"],
  growth: ["Growth Tools", "成長工具", "讓資料 自動化與轉換持續累積"],
}

function ProjectHub() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedFilter = searchParams.get("filter")
  const [activeFilter, setActiveFilter] = useState(
    workFilters.includes(requestedFilter) ? requestedFilter : "All"
  )

  const filtered = useMemo(
    () => activeFilter === "All"
      ? workCatalog
      : workCatalog.filter((item) => item.categories.includes(activeFilter)),
    [activeFilter]
  )

  const sections = useMemo(
    () => ["systems", "websites", "growth"]
      .map((key) => [key, filtered.filter((item) => item.section === key)])
      .filter(([, items]) => items.length > 0),
    [filtered]
  )

  function selectFilter(next) {
    setActiveFilter(next)
    setSearchParams(next === "All" ? {} : { filter: next }, { replace: true })
  }

  return (
    <SiteLayout>
      <Seo page={{
        path: "/works",
        title: "企業系統與網站作品｜晴宇 Qingyu Web",
        description: "查看企業管理系統 電商網站 AI 知識庫 LINE 串接與成效工具並直接操作展示",
      }} />

      <section className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-7 md:pb-16 md:pt-20 lg:px-9">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#557b72]">Works</p>
          <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)] md:items-end">
            <h1 className="font-['Noto_Serif_TC',serif] text-[clamp(2.25rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#10211f]">
              做過的系統<br />與網站
            </h1>
            <p className="max-w-md text-sm font-medium leading-7 text-[#65716d] md:justify-self-end">
              從能直接操作的企業系統到高質感品牌網站<br className="hidden sm:block" />每個作品都從真實問題開始
            </p>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-b border-[#d9ddd6] bg-[#f7f5f0]/94 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-7 lg:px-9 [&::-webkit-scrollbar]:hidden">
          {workFilters.map((filter) => {
            const selected = activeFilter === filter
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => selectFilter(filter)}
                className={`min-h-8 shrink-0 rounded-full px-3.5 text-[11px] font-semibold transition ${selected ? "bg-[#142a27] text-white" : "text-[#68736f] hover:bg-white hover:text-[#142a27]"}`}
              >
                {filterLabels[filter]}
              </button>
            )
          })}
          <span className="ml-auto hidden shrink-0 pl-4 text-[10px] font-medium text-[#88918d] sm:block">{filtered.length} Projects</span>
        </div>
      </div>

      <div className="bg-[#f7f5f0]">
        {sections.map(([section, items], sectionIndex) => (
          <section key={section} className={sectionIndex ? "border-t border-[#d9ddd6]" : ""}>
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 md:py-20 lg:px-9">
              <div className="mb-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)] sm:items-end md:mb-11">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#66877f]">{sectionMeta[section][0]}</p>
                  <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.55rem)] font-semibold tracking-[-.045em] text-[#12211f]">{sectionMeta[section][1]}</h2>
                </div>
                <p className="text-xs font-medium leading-6 text-[#74807b] sm:text-right">{sectionMeta[section][2]}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item, index) => <WorkCard key={item.slug} item={item} index={index} />)}
              </div>
            </div>
          </section>
        ))}
      </div>
    </SiteLayout>
  )
}

function WorkCard({ item, index }) {
  const systemCard = item.section === "systems"
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-[#d9ddd6] bg-[#fbfaf6] transition duration-300 hover:-translate-y-1 hover:border-[#aebdb7] hover:shadow-[0_22px_60px_rgba(21,43,39,.09)]">
      <Link to={item.demoPath || item.casePath} className="relative block aspect-[16/10] overflow-hidden bg-[#dfe6df]" aria-label={`查看 ${item.title}`}>
        <img src={item.image} alt="" loading={index > 2 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1717]/42 via-transparent to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/20 bg-[#0d1d1b]/76 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.1em] text-white backdrop-blur">{item.format}</span>
          {item.demoPath ? <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eee4bf] text-sm text-[#182622] transition group-hover:rotate-[-8deg]">↗</span> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap gap-1.5">
          {item.categories.slice(0, 3).map((category) => <span key={category} className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#64837b]">{category}</span>)}
        </div>
        <h3 className="mt-3 break-keep text-[1.15rem] font-semibold leading-snug tracking-[-.025em] text-[#12211f] sm:text-xl">{item.title}</h3>

        <div className="mt-5 grid gap-3 text-xs leading-6 text-[#65716d]">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#9a8764]">Problem</p>
            <p className="mt-1">{item.problem}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#5c8279]">Solution</p>
            <p className="mt-1">{item.solution}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {(systemCard ? item.functions : item.integrations).slice(0, 4).map((label) => (
            <span key={label} className="rounded-full border border-[#d8ddd6] px-2.5 py-1 text-[9px] font-medium text-[#66736e]">{label}</span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-[11px] font-semibold">
          {item.demoPath ? <Link to={item.demoPath} data-track="demo_open" data-demo={item.slug} className="text-[#173b35] hover:text-[#4f786f]">{systemCard ? "操作系統" : "查看作品"} ↗</Link> : null}
          <Link to={item.casePath} className="text-[#7e8985] hover:text-[#173b35]">案例說明</Link>
        </div>
      </div>
    </article>
  )
}

export default ProjectHub
