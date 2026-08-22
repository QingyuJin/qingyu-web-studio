import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { workCatalog } from "./site/workCatalog"
import { onepageTemplates } from "./onepage/onepageData"

const bySlug = (slug) => workCatalog.find((item) => item.slug === slug)
const systems = ["wholesale-ordering", "buildflow", "linebot", "rag-consultant"].map(bySlug).filter(Boolean)
const websites = ["luluface", "morie", "biomed-brand-site"].map(bySlug).filter(Boolean)
const mainSlugs = ["xinjiang", ...systems.map((entry) => entry.slug), ...websites.map((entry) => entry.slug)]
const experiments = workCatalog.filter((item) => !mainSlugs.includes(item.slug))

function ProjectHub() {
  const client = bySlug("xinjiang")
  return (
    <SiteLayout>
      <Seo page={{ path: "/works", title: "客戶案例與可操作系統｜晴宇 Qingyu Web", description: "正式客戶案例 可操作系統與產業網站提案" }} />
      <header className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 md:py-20 lg:px-9">
          <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#557b72]">Works</p>
          <h1 className="mt-5 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-.05em] text-[#10211f]">看見網站與系統<br className="hidden sm:block" />怎麼解決實際問題</h1>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#65716d]">先看正式案例 再親手完成一段工作流程</p>
        </div>
      </header>

      <main className="bg-[#f7f5f0]">
        <WorksSection label="正式客戶案例" title="已上線的品牌與流程">
          {client ? <ClientFeature item={client} /> : null}
        </WorksSection>

        <WorksSection label="可操作系統" title="30 秒完成一次真實操作">
          <div className="grid gap-4 md:grid-cols-2">{systems.map((item, index) => <SystemCard key={item.slug} item={item} eager={index < 2} />)}</div>
          <details className="mt-6 rounded-2xl border border-[#d9ddd6] bg-[#fbfaf6] px-5 py-2">
            <summary className="flex min-h-12 cursor-pointer items-center text-sm font-semibold text-[#41514c]">更多實驗作品</summary>
            <div className="grid gap-3 border-t border-[#e2e4df] py-5 sm:grid-cols-2 lg:grid-cols-3">
              {experiments.map((item) => <Link key={item.slug} to={item.demoPath || item.casePath} className="rounded-xl border border-[#dfe2dd] bg-white p-4 text-sm font-semibold text-[#20312e] transition hover:border-[#8ea69e]">{item.title}<span className="mt-1 block text-xs font-medium text-[#79847f]">查看作品 →</span></Link>)}
            </div>
          </details>
        </WorksSection>

        <WorksSection label="網站與概念作品" title="六套產業提案與品牌網站">
          <ShowcasePortal />
          <div className="mt-5 grid gap-4 md:grid-cols-3">{websites.map((item) => <WebsiteCard key={item.slug} item={item} />)}</div>
        </WorksSection>
      </main>
    </SiteLayout>
  )
}

function WorksSection({ label, title, children }) {
  return <section className="border-b border-[#d9ddd6]"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 md:py-20 lg:px-9"><p className="text-[10px] font-semibold tracking-[.15em] text-[#557b72]">{label}</p><h2 className="mt-3 mb-8 text-[clamp(1.6rem,3vw,2.55rem)] font-semibold tracking-[-.045em] text-[#12211f]">{title}</h2>{children}</div></section>
}

function ClientFeature({ item }) {
  return <article className="grid overflow-hidden rounded-[1.5rem] border border-[#cfd5cf] bg-[#fbfaf6] lg:grid-cols-[1.08fr_.92fr]"><Link to="/works/xinjiang" aria-label="開啟鑫匠工程完整網站" className="block min-h-64 overflow-hidden bg-[#dfe6df]"><img src={item.image} alt="鑫匠工程完整網站" width="1200" height="720" fetchPriority="high" className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]" /></Link><div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10"><p className="text-[10px] font-semibold tracking-[.16em] text-[#557b72]">正式客戶網站</p><Link to="/works/xinjiang" className="block"><h3 className="mt-4 font-['Noto_Serif_TC',serif] text-3xl font-semibold tracking-[-.04em] text-[#12211f]">鑫匠工程</h3></Link><p className="mt-4 text-sm font-medium leading-7 text-[#65716d]">屏東在地泥作裝修網站 服務 案例 流程與詢價完整呈現</p><div className="mt-7"><Link to="/works/xinjiang" className="inline-flex min-h-11 items-center rounded-full bg-[#173c37] px-5 text-xs font-bold text-white">開啟完整網站</Link></div></div></article>
}

function SystemCard({ item, eager }) {
  return <article className="grid overflow-hidden rounded-[1.35rem] border border-[#d9ddd6] bg-[#fbfaf6] sm:grid-cols-[12rem_1fr]"><Link to={item.demoPath} className="block aspect-[16/9] overflow-hidden bg-[#dfe6df] sm:aspect-auto"><img src={item.image} alt={`${item.title}操作預覽`} width="760" height="560" loading={eager ? "eager" : "lazy"} className="h-full w-full object-cover" /></Link><div className="flex flex-col p-5 sm:p-6"><h3 className="text-xl font-semibold text-[#12211f]">{item.title}</h3><p className="mt-3 text-sm font-medium leading-7 text-[#65716d]">{item.problem}</p><div className="mt-auto flex flex-wrap gap-5 pt-6 text-xs font-semibold"><Link to={item.demoPath} className="text-[#173b35]">操作系統 →</Link><Link to={item.casePath} className="text-[#7e8985]">案例說明</Link></div></div></article>
}

function WebsiteCard({ item }) {
  return <article className="overflow-hidden rounded-[1.25rem] border border-[#d9ddd6] bg-[#fbfaf6]"><Link to={item.casePath} className="block aspect-[16/10] overflow-hidden bg-[#dfe6df]"><img src={item.image} alt={`${item.title}網站預覽`} width="760" height="480" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" /></Link><div className="p-5"><h3 className="text-lg font-semibold text-[#12211f]">{item.title}</h3><Link to={item.casePath} className="mt-4 inline-flex min-h-11 items-center text-xs font-semibold text-[#173b35]">查看網站 →</Link></div></article>
}

function ShowcasePortal() {
  return <article className="grid overflow-hidden rounded-[1.5rem] border border-[#263734] bg-[#0b1517] text-white lg:grid-cols-[.8fr_1.2fr]"><div className="p-6 sm:p-8 lg:p-10"><p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#8fb6ad]">Website Showcase</p><h3 className="mt-5 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3.25rem)] font-semibold leading-[1.14] tracking-[-.045em]">六套產業<br />網站提案</h3><p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/58">訊息集中 手機好讀 行動清楚</p><div className="mt-6 flex flex-wrap gap-3 text-[10px] font-semibold text-[#d7c89f]"><span>ONE</span><span>RWD</span><span>SEO</span><span>CTA</span></div><Link to="/showcase" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[#d7c89f] px-5 text-xs font-bold text-[#14211f]">進入展示空間</Link></div><div className="grid grid-cols-3 gap-px bg-white/10 p-px">{onepageTemplates.map((template) => <Link key={template.slug} to={`/onepage/${template.slug}`} className="group relative min-h-36 overflow-hidden bg-[#182624] sm:min-h-48"><img src={template.hero} alt={`${template.industry}網站提案`} width="560" height="700" loading="lazy" className="h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105 group-hover:opacity-100" /><span className="absolute inset-x-2 bottom-2 text-[9px] font-semibold text-white drop-shadow">{template.industry}</span></Link>)}</div></article>
}

export default ProjectHub
