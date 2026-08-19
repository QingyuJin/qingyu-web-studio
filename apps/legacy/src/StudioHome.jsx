import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"
import { demoContactPath, getDemo } from "./site/demoRegistry"
import {
  architectureLayers,
  businessProblems,
  capabilityGroups,
  collaborationModels,
  primaryPricing,
  studioProcess,
} from "./site/homeContent"
import { getWork } from "./site/workCatalog"

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.qingyuweb.com/#website",
      url: "https://www.qingyuweb.com/",
      name: "Qingyu Web Studio",
      inLanguage: "zh-Hant-TW",
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.qingyuweb.com/#studio",
      name: "Qingyu Web Studio",
      url: "https://www.qingyuweb.com/",
      image: "https://www.qingyuweb.com/og.png?v=20260820",
      email: contact.email,
      areaServed: { "@type": "Country", name: "Taiwan" },
      slogan: "Built to work Designed to impress",
      knowsAbout: ["企業 Web 系統", "管理後台", "品牌網站", "LINE API", "RAG", "SEO", "Analytics"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Systems and Digital Experiences",
        itemListElement: ["Web Systems", "Business Websites", "Landing Pages", "Development Support"].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
  ],
}

const selectedSystemSlugs = ["wholesale-ordering", "linebot", "rag-consultant", "buildflow"]
const systemCardCopy = {
  "wholesale-ordering": {
    problem: "LINE 接單容易漏",
    result: "讓客戶自己下單 你只管出貨與月結",
    cta: "30 秒試一次",
  },
  linebot: {
    problem: "客服一直回答同樣問題",
    result: "LINE 自動取得需求 後台直接收到",
    cta: "假裝當一次客戶",
  },
  "rag-consultant": {
    problem: "公司文件總是找不到",
    result: "直接問 AI 它從公司資料找答案",
    cta: "問它一個問題",
  },
  buildflow: {
    problem: "工程進度每天都在追問",
    result: "案件 進度與客戶通知集中管理",
    cta: "更新一次案件",
  },
}
const websiteSlugs = ["luluface", "morie", "xinjiang"]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={{ ...seo.home, structuredData: homeStructuredData, imageAlt: "晴宇企業 Web 系統與高質感網站開發" }} />
      <Hero />
      <SelectedSystems />
      <BusinessProblems />
      <Architecture />
      <WebsiteExperience />
      <IntegrationGrowth />
      <Collaboration />
      <Process />
      <Pricing />
      <ContactCta />
    </SiteLayout>
  )
}

function SectionHeading({ eyebrow, title, text, dark = false, id }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-[10px] font-bold uppercase tracking-[.24em] ${dark ? "text-[#8fb6ad]" : "text-[#52786f]"}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.75rem,3.5vw,3.15rem)] font-semibold leading-[1.18] tracking-[-.04em] ${dark ? "text-white" : "text-[#14201f]"}`}>{title}</h2>
      {text ? <p className={`mt-5 max-w-2xl text-[13px] font-medium leading-7 sm:text-sm ${dark ? "text-white/58" : "text-[#5b6662]"}`}>{text}</p> : null}
    </div>
  )
}

function Hero() {
  const capabilities = ["Web Systems", "Business Websites", "LINE API", "AI RAG", "Automation"]

  return (
    <section className="relative isolate overflow-hidden bg-[#0b1517] text-white" aria-labelledby="home-hero-title">
      <div className="absolute inset-0 -z-10 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_45%_30%,rgba(82,120,111,.25),transparent_54%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-7 md:py-22 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16 lg:px-10 lg:py-26">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#96bcb2] sm:text-[10px] sm:tracking-[.26em]">QINGYU WEB / WEB SYSTEMS & DIGITAL PRODUCTS</p>
          <h1 id="home-hero-title" className="mt-6 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(2.25rem,5.1vw,4.45rem)] font-semibold leading-[1.1] tracking-[-.05em]">
            把企業需求
            <span className="mt-1 block text-[#d7c89f]">做成真正能運作的系統</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[14px] font-medium leading-7 text-white/66 sm:text-base sm:leading-8">從接單 會員 LINE 管理後台到 AI 我們把實際工作流程做成每天都能使用的數位產品</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/demo/wholesale-ordering" data-track="demo_open" data-placement="home_hero" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d7c89f] px-6 text-xs font-bold tracking-[.04em] text-[#17201f] hover:bg-[#e6d9b7]">直接操作系統案例</Link>
            <Link to="/works?filter=Websites" data-track="view_content" data-placement="home_hero" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 px-6 text-xs font-bold tracking-[.04em] text-white hover:bg-white/[.06]">查看網站作品</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5">
            {capabilities.map((item) => <span key={item} className="text-[9px] font-semibold uppercase tracking-[.12em] text-white/38">{item}</span>)}
          </div>
        </div>
        <LiveProductPreview />
      </div>
    </section>
  )
}

function LiveProductPreview() {
  const steps = [
    { label: "New order", detail: "宏泰餐飲 12 項商品", metric: "24" },
    { label: "Order confirmed", detail: "庫存與客戶價格已核對", metric: "25" },
    { label: "Dashboard updated", detail: "本月訂單即時同步", metric: "26" },
    { label: "LINE notified", detail: "負責人收到出貨提醒", metric: "27" },
  ]
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const timer = window.setInterval(() => setActive((current) => (current + 1) % steps.length), 2200)
    return () => window.clearInterval(timer)
  }, [steps.length])

  return (
    <div className="relative mx-auto w-full max-w-[610px] lg:mx-0" aria-label="Live Product Preview">
      <div className="rounded-[1.35rem] border border-white/12 bg-[#111d1e] p-4 shadow-[0_30px_90px_rgba(0,0,0,.28)] sm:p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#91b6ac]">Live Product Preview</p>
            <p className="mt-1 text-xs font-semibold text-white/76">Order Operations</p>
          </div>
          <span className="inline-flex items-center gap-2 text-[9px] font-semibold text-white/40"><span className="h-1.5 w-1.5 rounded-full bg-[#8fbf8c] shadow-[0_0_0_4px_rgba(143,191,140,.1)]" />LIVE</span>
        </div>
        <div className="grid gap-4 pt-4 sm:grid-cols-[1fr_132px]">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={step.label} className={`grid grid-cols-[1.4rem_1fr] gap-3 rounded-xl border px-3 py-3 transition duration-500 ${index === active ? "border-[#d7c89f]/40 bg-[#d7c89f]/8" : "border-white/8 bg-white/[.025]"}`}>
                <span className={`mt-1 grid h-5 w-5 place-items-center rounded-full border text-[8px] font-bold ${index <= active ? "border-[#d7c89f] bg-[#d7c89f] text-[#17201f]" : "border-white/16 text-white/30"}`}>{index + 1}</span>
                <div>
                  <p className="text-[11px] font-semibold text-white/84">{step.label}</p>
                  <p className="mt-1 text-[10px] font-medium leading-5 text-white/35">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            <div className="rounded-xl border border-white/8 bg-[#0b1517] p-3">
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-white/30">Orders</p>
              <p className="mt-2 font-['Noto_Serif_TC',serif] text-3xl font-semibold text-[#d7c89f] tabular-nums" aria-live="polite">{steps[active].metric}</p>
              <p className="mt-1 text-[9px] text-[#93b9af]">+1 updated</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#0b1517] p-3">
              <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-white/30">Status</p>
              <div className="mt-3 flex items-end gap-1" aria-hidden="true">
                {[28, 46, 34, 58, 74, 62].map((height, index) => <span key={height} className={`w-full rounded-sm transition-all duration-700 ${index <= active + 1 ? "bg-[#7aa69c]" : "bg-white/10"}`} style={{ height: `${height}px` }} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-right text-[9px] font-medium tracking-[.08em] text-white/28">BUILT TO WORK&nbsp;&nbsp; DESIGNED TO IMPRESS</p>
    </div>
  )
}

function SelectedSystems() {
  const systems = selectedSystemSlugs.map(getWork).filter(Boolean)
  return (
    <section id="systems" className="border-b border-[#dcd8ce] bg-[#f7f5f0]" aria-labelledby="selected-systems-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="selected-systems-title" eyebrow="Selected Systems" title="不是 Demo 圖 是可以操作的系統" text="每個展示都有一個短任務 直接完成一次真實工作流程" />
        <div className="mt-10 grid gap-px overflow-hidden border border-[#d9d4c8] bg-[#d9d4c8] lg:grid-cols-2">
          {systems.map((item, index) => <SystemCard key={item.slug} item={item} index={index} />)}
        </div>
      </div>
    </section>
  )
}

function SystemCard({ item, index }) {
  const copy = systemCardCopy[item.slug] ?? { problem: item.title, result: item.solution, cta: "30 秒試一次" }
  return (
    <article className="group grid gap-6 bg-[#fbfaf7] p-5 sm:p-7 md:grid-cols-[1fr_132px] md:items-start">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[9px] font-bold tracking-[.16em] text-[#71807b]">0{index + 1}</span>
          <span className="rounded-full border border-[#bdd0ca] bg-[#edf4f1] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-[#39675e]">{item.format}</span>
        </div>
        <p className="mt-5 text-[10px] font-bold tracking-[.08em] text-[#71807b]">{item.title}</p>
        <h3 className="mt-2 font-['Noto_Serif_TC',serif] text-xl font-semibold tracking-[-.025em] text-[#14201f] sm:text-2xl">{copy.problem}</h3>
        <p className="mt-3 text-[13px] font-medium leading-6 text-[#66716d]">{copy.result}</p>
        <Link to={item.demoPath} data-track="demo_open" data-placement="home_selected_system" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#173c37] px-5 text-[11px] font-bold text-white">{copy.cta}</Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#e3ded3] bg-[#eef1ec]">
        <img src={item.image} alt={`${item.title} 系統介面`} width="640" height="480" loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
      </div>
    </article>
  )
}

function BusinessProblems() {
  const [active, setActive] = useState(0)
  const problem = businessProblems[active]
  const demo = problem.demoSlug ? getDemo(problem.demoSlug) : null
  const destination = demo?.demoPath ?? problem.href

  return (
    <section className="bg-white" aria-labelledby="business-problems-title">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-7 md:py-24 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <SectionHeading id="business-problems-title" eyebrow="Business Problems" title="先理解問題 再決定做什麼" text="技術不是起點 先找到最耗時間 最容易出錯或最影響客戶體驗的流程" />
          <div className="mt-8 border-y border-[#dedbd2]">
            {businessProblems.map((item, index) => (
              <button key={item.problem} type="button" onClick={() => setActive(index)} aria-pressed={active === index} className={`grid min-h-14 w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-[#e8e4db] px-1 text-left text-[12px] font-semibold last:border-0 ${active === index ? "text-[#174f46]" : "text-[#66716d]"}`}>
                <span>{item.problem}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${active === index ? "bg-[#9a8050]" : "bg-[#d7d3ca]"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="self-end rounded-[1.4rem] border border-[#d8d4ca] bg-[#eef1ec] p-6 sm:p-8">
          <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#70817b]">Problem to Solution</p>
          <p className="mt-7 text-[12px] font-semibold text-[#7a8581]">{problem.problem}</p>
          <span className="my-5 block h-9 w-px bg-[#a99c76]" aria-hidden="true" />
          <h3 className="font-['Noto_Serif_TC',serif] text-[clamp(1.7rem,4vw,2.65rem)] font-semibold leading-[1.18] tracking-[-.04em] text-[#14201f]">{problem.solution}</h3>
          <p className="mt-5 max-w-lg text-[13px] font-medium leading-7 text-[#5d6965]">{problem.detail}</p>
          {destination ? <Link to={destination} className="mt-8 inline-flex min-h-10 items-center rounded-full bg-[#14211f] px-5 text-[11px] font-bold text-white">查看解法</Link> : null}
        </div>
      </div>
    </section>
  )
}

function Architecture() {
  return (
    <section className="border-y border-white/8 bg-[#0f1819] text-white" aria-labelledby="architecture-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="architecture-title" eyebrow="System Architecture" title="從畫面 到真正運作" text="從使用者看到的介面一路處理商業邏輯 整合 資料與 AI" dark />
        <div className="mt-10 grid gap-3 lg:grid-cols-5">
          {architectureLayers.map((layer, index) => (
            <article key={layer.name} className="relative border-t border-white/12 px-1 pt-5 lg:border-l lg:border-t-0 lg:px-5 lg:pt-0 first:lg:border-l-0 first:lg:pl-0">
              <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#d7c89f]">0{index + 1}</p>
              <h3 className="mt-3 text-sm font-semibold text-white">{layer.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2 lg:grid">
                {layer.items.map((item) => <span key={item} className="text-[10px] font-medium text-white/42">{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsiteExperience() {
  const websites = websiteSlugs.map(getWork).filter(Boolean)
  const [featured, ...secondary] = websites
  return (
    <section id="websites" className="bg-[#f7f5f0]" aria-labelledby="website-experience-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="website-experience-title" eyebrow="Websites & Digital Experiences" title="系統能用 網站也必須讓人想用" text="從品牌官網 企業網站到 Landing Page 視覺 手機體驗與品牌感同樣是產品的一部分" />
        <div className="mt-11 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <WebsiteCard item={featured} featured />
          <div className="grid gap-6">
            {secondary.map((item) => <WebsiteCard key={item.slug} item={item} />)}
          </div>
        </div>
        <Link to="/works?filter=Websites" className="mt-8 inline-flex min-h-11 items-center rounded-full border border-[#bec7c2] px-5 text-[11px] font-bold text-[#28433d]">查看所有網站作品</Link>
      </div>
    </section>
  )
}

function WebsiteCard({ item, featured = false }) {
  return (
    <article className="group relative overflow-hidden bg-[#14201f] text-white">
      <img src={item.image} alt={`${item.title} 網站畫面`} width="1200" height="800" loading={featured ? "eager" : "lazy"} className={`w-full object-cover opacity-86 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100 ${featured ? "aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[640px]" : "aspect-[16/9] min-h-64"}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08100f]/92 via-[#08100f]/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/56">{item.format}</p>
        <h3 className={`mt-2 font-['Noto_Serif_TC',serif] font-semibold tracking-[-.03em] ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{item.title}</h3>
        <p className="mt-3 max-w-xl text-[11px] font-medium leading-6 text-white/58">{item.solution}</p>
        <div className="mt-5 flex gap-4">
          <Link to={item.demoPath} className="text-[10px] font-bold text-[#e2d5b4] underline underline-offset-4">View Project</Link>
          <Link to={item.casePath} className="text-[10px] font-bold text-white/64 underline underline-offset-4">View Case</Link>
        </div>
      </div>
    </article>
  )
}

function IntegrationGrowth() {
  return (
    <section className="border-y border-[#d7dcd6] bg-[#e9ede7]" aria-labelledby="integration-growth-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="integration-growth-title" eyebrow="Integration & Growth" title="需要的不只是網站" text="把 LINE SEO Analytics AI 與 API 放進同一個產品思維裡" />
        <div className="mt-10 grid gap-px overflow-hidden border border-[#cfd6cf] bg-[#cfd6cf] sm:grid-cols-2 lg:grid-cols-4">
          {capabilityGroups.map((group) => (
            <article key={group.name} className="bg-[#f3f5f0] p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-[#1e3832]">{group.name}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => <li key={item} className="text-[10px] font-semibold uppercase tracking-[.08em] text-[#68756f]">{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Collaboration() {
  return (
    <section className="bg-white" aria-labelledby="collaboration-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="collaboration-title" eyebrow="Collaboration" title="不只有直接委託 也可以成為你的技術團隊" text="依照合作關係調整角色 交付方式與溝通流程" />
        <div className="mt-10 divide-y divide-[#dfdcd3] border-y border-[#dfdcd3]">
          {collaborationModels.map((model, index) => (
            <article key={model.name} className="grid gap-5 py-7 md:grid-cols-[3rem_.7fr_1fr_auto] md:items-start md:gap-8">
              <span className="text-[9px] font-bold tracking-[.18em] text-[#9a8050]">0{index + 1}</span>
              <div><p className="text-[9px] font-bold uppercase tracking-[.14em] text-[#75817d]">{model.name}</p><h3 className="mt-2 text-lg font-semibold text-[#17211f]">{model.title}</h3></div>
              <div><p className="text-[12px] font-medium leading-6 text-[#64706b]">{model.text}</p><p className="mt-3 text-[9px] font-semibold uppercase tracking-[.08em] text-[#8a938f]">{model.items.join("   ")}</p></div>
              <Link to={`/contact?type=${model.type}`} className="inline-flex min-h-9 items-center text-[10px] font-bold text-[#1e5d53] underline decoration-[#9ebbb3] underline-offset-4">洽談技術協作</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="bg-[#f7f5f0]" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="process-title" eyebrow="Process" title="從問題開始 不從功能清單開始" />
        <ol className="mt-10 grid border-y border-[#d8d4cb] lg:grid-cols-5">
          {studioProcess.map(([number, title, text]) => (
            <li key={number} className="border-b border-[#e0dcd3] py-6 lg:border-b-0 lg:border-r lg:px-5 first:lg:pl-0 last:border-0">
              <p className="text-[9px] font-bold tracking-[.16em] text-[#9a8050]">{number}</p>
              <h3 className="mt-5 text-sm font-semibold text-[#17211f]">{title}</h3>
              <p className="mt-3 text-[11px] font-medium leading-6 text-[#6a746f]">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section className="border-y border-white/8 bg-[#0e1718] text-white" aria-labelledby="home-pricing-title">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <SectionHeading id="home-pricing-title" eyebrow="Engagement" title="先選擇合作層級" text="實際價格依流程 範圍 資料與整合深度確認" dark />
        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {primaryPricing.map((plan) => (
            <article key={plan.name} className="flex min-h-72 flex-col bg-[#111b1c] p-5 sm:p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8fb6ad]">{plan.name}</p>
              <p className="mt-5 font-['Noto_Serif_TC',serif] text-2xl font-semibold text-[#d7c89f]">{plan.price}</p>
              <p className="mt-3 text-[11px] font-medium leading-6 text-white/48">{plan.fit}</p>
              <ul className="mt-5 space-y-2">
                {plan.items.map((item) => <li key={item} className="text-[9px] font-semibold uppercase tracking-[.08em] text-white/32">{item}</li>)}
              </ul>
              <Link to={plan.casePath} className="mt-auto pt-7 text-[10px] font-bold text-white/72 underline underline-offset-4">了解方案</Link>
            </article>
          ))}
        </div>
        <Link to="/pricing" className="mt-8 inline-flex min-h-11 items-center rounded-full border border-white/18 px-5 text-[11px] font-bold text-white">查看完整價格</Link>
      </div>
    </section>
  )
}

function ContactCta() {
  const demo = getDemo("wholesale-ordering")
  return (
    <section className="bg-[#d7c89f] text-[#15201f]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-18 sm:px-7 md:py-22 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#5d665c]">Start a Project</p>
          <h2 className="mt-4 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.18] tracking-[-.045em]">把目前的工作流程<br />做成真正能使用的產品</h2>
        </div>
        <div className="grid gap-3 sm:min-w-60">
          <Link to="/contact?type=system" data-track="contact" data-placement="home_final_cta" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#14211f] px-6 text-xs font-bold text-white">啟動專案</Link>
          <Link to={demoContactPath(demo)} className="text-center text-[10px] font-semibold text-[#4f5c56]">先用案例說明需求</Link>
        </div>
      </div>
    </section>
  )
}

export default StudioHome
