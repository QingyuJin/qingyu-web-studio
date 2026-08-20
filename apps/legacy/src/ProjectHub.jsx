import { Link, useSearchParams } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { workCatalog } from "./site/workCatalog"
import { onepageTemplates } from "./onepage/onepageData"

const groups = [
  { key: "client", label: "正式客戶案例", title: "已交付的客戶專案", text: "真實品牌與工作流程的正式製作" },
  { key: "product", label: "可操作系統", title: "可以親手完成的產品流程", text: "不用研究功能 直接跟著任務操作" },
  { key: "concept", label: "概念展示", title: "品牌與介面方向提案", text: "用完整畫面呈現設計與轉換思路" },
]

function ProjectHub() {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedType = searchParams.get("type")
  const activeType = groups.some((group) => group.key === requestedType) ? requestedType : "all"
  const visibleGroups = activeType === "all" ? groups : groups.filter((group) => group.key === activeType)

  return (
    <SiteLayout>
      <Seo page={{ path: "/works", title: "客戶案例與可操作產品｜晴宇 Qingyu Web", description: "正式客戶專案 可操作系統與概念作品 清楚標示每個案例目前的完成狀態" }} />
      <section className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-7 md:pb-16 md:pt-20 lg:px-9">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#557b72]">Works</p>
          <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(16rem,31rem)] md:items-end">
            <h1 className="max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(2.25rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-.055em] text-[#10211f]">客戶案例與<br className="hidden sm:block" />可操作產品</h1>
            <p className="max-w-lg text-sm font-medium leading-7 text-[#65716d] md:justify-self-end">正式客戶專案、可操作系統與概念作品，清楚標示每個案例目前的完成狀態。</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-label="作品類型">
            <button type="button" onClick={() => setSearchParams({}, { replace: true })} aria-pressed={activeType === "all"} className={`min-h-11 rounded-full px-4 text-xs font-semibold ${activeType === "all" ? "bg-[#142a27] text-white" : "border border-[#ccd2cc] bg-white/60 text-[#56635e]"}`}>全部</button>
            {groups.map((group) => <button key={group.key} type="button" onClick={() => setSearchParams({ type: group.key }, { replace: true })} aria-pressed={activeType === group.key} className={`min-h-11 rounded-full px-4 text-xs font-semibold ${activeType === group.key ? "bg-[#142a27] text-white" : "border border-[#ccd2cc] bg-white/60 text-[#56635e]"}`}>{group.label}</button>)}
          </div>
        </div>
      </section>

      <div className="bg-[#f7f5f0]">
        {visibleGroups.map((group, groupIndex) => {
          const items = workCatalog.filter((item) => item.nature === group.key)
          return (
            <section key={group.key} className={groupIndex ? "border-t border-[#d9ddd6]" : ""}>
              <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 md:py-20 lg:px-9">
                <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end md:mb-10">
                  <div><span className="inline-flex rounded-full border border-[#b8c6c0] px-3 py-1 text-[9px] font-semibold text-[#52786f]">{group.label}</span><h2 className="mt-4 text-[clamp(1.55rem,3vw,2.55rem)] font-semibold tracking-[-.045em] text-[#12211f]">{group.title}</h2></div>
                  <p className="text-xs font-medium leading-6 text-[#74807b] sm:text-right">{group.text}</p>
                </div>
                {group.key === "concept" ? <ShowcasePortal /> : null}
                <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-3 ${group.key === "concept" ? "mt-5" : ""}`}>{items.map((item, index) => <WorkCard key={item.slug} item={item} index={index} />)}</div>
              </div>
            </section>
          )
        })}
      </div>
    </SiteLayout>
  )
}

function ShowcasePortal() {
  return (
    <article className="grid overflow-hidden rounded-[1.5rem] border border-[#263734] bg-[#0b1517] text-white lg:grid-cols-[.85fr_1.15fr]">
      <div className="p-6 sm:p-8 lg:p-10"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#8fb6ad]">Website Showcase</p><h3 className="mt-5 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.14] tracking-[-.045em]">產業網站<br />展示空間</h3><p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/58">保留一頁式網站最好的部分 訊息集中 行動明確 手機一路讀完</p><div className="mt-6 flex flex-wrap gap-2 text-[10px] font-semibold text-[#d7c89f]"><span>單一訊息</span><span>清楚轉換</span><span>手機優先</span><span>快速上線</span></div><Link to="/showcase" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#d7c89f] px-5 text-xs font-bold text-[#14211f]">進入展示空間</Link></div>
      <div className="grid grid-cols-3 gap-px bg-white/10 p-px">{onepageTemplates.slice(0, 6).map((template) => <Link key={template.slug} to={`/onepage/${template.slug}`} className="group relative min-h-36 overflow-hidden bg-[#182624] sm:min-h-48"><img src={template.hero} alt={`${template.industry}網站提案`} width="560" height="700" loading="lazy" className="h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /><span className="absolute inset-x-2 bottom-2 text-[9px] font-semibold text-white drop-shadow">{template.industry}</span></Link>)}</div>
    </article>
  )
}

function WorkCard({ item, index }) {
  const destination = item.nature === "product" ? item.demoPath : item.casePath
  const status = groups.find((group) => group.key === item.nature)?.label
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-[#d9ddd6] bg-[#fbfaf6] transition duration-300 hover:-translate-y-1 hover:border-[#aebdb7] hover:shadow-[0_22px_60px_rgba(21,43,39,.09)]">
      <Link to={destination} className="relative block aspect-[16/10] overflow-hidden bg-[#dfe6df]" aria-label={`查看 ${item.title}`}><img src={item.image} alt={`${item.title}預覽`} width="960" height="600" loading={index > 1 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b1717]/45 via-transparent to-transparent" /><span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#0d1d1b]/78 px-2.5 py-1 text-[9px] font-semibold text-white backdrop-blur">{status}</span></Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6"><h3 className="break-keep text-xl font-semibold leading-snug tracking-[-.025em] text-[#12211f]">{item.title}</h3><p className="mt-3 text-sm font-medium leading-7 text-[#65716d]">{item.solution}</p><div className="mt-auto flex flex-wrap items-center gap-5 pt-6 text-xs font-semibold"><Link to={destination} className="text-[#173b35]">{item.nature === "product" ? "開始操作" : "查看作品"} ↗</Link>{item.nature === "product" ? <Link to={item.casePath} className="text-[#7e8985]">案例說明</Link> : null}</div></div>
    </article>
  )
}

export default ProjectHub
