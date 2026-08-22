import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"
import { getWork } from "./site/workCatalog"

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": "https://www.qingyuweb.com/#website", url: "https://www.qingyuweb.com/", name: "晴宇 Qingyu Web", inLanguage: "zh-Hant-TW" },
    { "@type": "ProfessionalService", "@id": "https://www.qingyuweb.com/#studio", name: "晴宇 Qingyu Web", url: "https://www.qingyuweb.com/", image: "https://www.qingyuweb.com/og.png?v=20260820", email: contact.email, areaServed: { "@type": "Country", name: "Taiwan" }, description: "企業 Web 系統 品牌網站與技術開發協作" },
  ],
}

const systemCards = [
  { slug: "wholesale-ordering", problem: "LINE 接單容易漏", result: "讓客戶自己下單 你只管出貨與月結", cta: "30 秒試一次" },
  { slug: "linebot", problem: "客服一直回答同樣問題", result: "LINE 自動取得需求 後台直接收到", cta: "假裝當一次客戶" },
]

const services = [
  { title: "企業 Web 系統", text: "把訂單 客戶 權限與內部流程集中管理", href: "/services#web-systems", cta: "查看系統服務" },
  { title: "企業品牌網站", text: "整理品牌 服務與詢價動線 建立正式數位門面", href: "/showcase", cta: "進入展示空間" },
  { title: "技術開發協作", text: "支援代理商 顧問與既有團隊完成技術交付", href: "/collaboration", cta: "查看協作方式" },
]

function Heading({ eyebrow, title, text, dark = false }) {
  return <div className="max-w-3xl"><p className={`text-[10px] font-semibold uppercase tracking-[.2em] ${dark ? "text-[#8fb6ad]" : "text-[#557b72]"}`}>{eyebrow}</p><h2 className={`mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.7rem,3.4vw,3rem)] font-semibold leading-[1.16] tracking-[-.045em] ${dark ? "text-white" : "text-[#14211f]"}`}>{title}</h2>{text ? <p className={`mt-4 max-w-2xl text-sm font-medium leading-7 ${dark ? "text-white/55" : "text-[#65716d]"}`}>{text}</p> : null}</div>
}

function StudioHome() {
  const client = getWork("xinjiang")
  return (
    <SiteLayout>
      <Seo page={{ ...seo.home, structuredData: homeStructuredData, imageAlt: "晴宇企業 Web 系統與品牌網站開發" }} />
      <section className="relative isolate overflow-hidden bg-[#0b1517] text-white">
        <div className="absolute inset-0 -z-10 opacity-[.11] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:88px_88px]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-7 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:px-9">
          <div><p className="text-[9px] font-semibold uppercase tracking-[.22em] text-[#96bcb2]">Qingyu Web</p><h1 className="mt-6 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1.08] tracking-[-.055em]">把接單 客戶與內部流程<br className="hidden sm:block" />做成真正能使用的系統</h1><p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/64 sm:text-base sm:leading-8">從管理後台 LINE 會員與訂單 到品牌網站與 AI 工具 由需求整理 介面設計 開發到正式上線一次完成</p><div className="mt-8 grid gap-3 sm:flex"><Link to="/demo/wholesale-ordering" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#d7c89f] px-6 text-xs font-bold text-[#17201f]">操作系統案例</Link><Link to="/works?type=client" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 px-6 text-xs font-bold text-white">查看正式客戶案例</Link></div></div>
          <div className="border-l border-white/12 pl-6"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#d7c89f]">一條流程 一個明確結果</p><div className="mt-6 grid gap-4">{["客戶送出資料", "後台立即收到", "團隊完成下一步"].map((item, index) => <div key={item} className="flex items-center gap-4 text-sm font-medium text-white/68"><span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 text-[9px] text-[#d7c89f]">0{index + 1}</span>{item}</div>)}</div></div>
        </div>
      </section>
      <section id="systems" className="border-b border-[#d9ddd6] bg-[#f7f5f0]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-22 lg:px-9"><Heading eyebrow="Systems" title="先操作 再判斷適不適合" text="每個展示都能在一分鐘內完成一次真實工作流程" /><div className="mt-10 grid gap-px overflow-hidden border border-[#d9ddd6] bg-[#d9ddd6] lg:grid-cols-2">{systemCards.map((copy, index) => { const item = getWork(copy.slug); return <article key={copy.slug} className="grid gap-6 bg-[#fbfaf6] p-5 sm:grid-cols-[1fr_9rem] sm:p-7"><div><p className="text-[9px] font-semibold tracking-[.16em] text-[#9a8764]">0{index + 1}</p><h3 className="mt-5 font-['Noto_Serif_TC',serif] text-2xl font-semibold tracking-[-.035em] text-[#14211f]">{copy.problem}</h3><p className="mt-3 text-sm font-medium leading-7 text-[#65716d]">{copy.result}</p><Link to={item.demoPath} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#173c37] px-5 text-xs font-bold text-white">{copy.cta}</Link></div><img src={item.image} alt={`${item.title} 操作畫面`} width="640" height="480" loading={index ? "lazy" : "eager"} fetchPriority={index ? "auto" : "high"} className="aspect-[4/3] w-full rounded-xl border border-[#d9ddd6] bg-[#e8ece7] object-cover" /></article> })}</div></div></section>
      <section className="bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-7 md:py-22 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-9"><Link to="/works/xinjiang" aria-label="開啟鑫匠工程完整網站" className="block overflow-hidden rounded-2xl"><img src={client.image} alt="鑫匠工程品牌網站畫面" width="1200" height="800" loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.02]" /></Link><div><span className="inline-flex rounded-full border border-[#aebdb7] px-3 py-1 text-[10px] font-semibold text-[#42675f]">正式客戶網站</span><Link to="/works/xinjiang" className="block"><h2 className="mt-5 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3.2rem)] font-semibold tracking-[-.045em] text-[#14211f]">鑫匠工程</h2></Link><p className="mt-4 max-w-xl text-sm font-medium leading-7 text-[#65716d]">屏東在地泥作裝修網站 服務 案例與線上詢價一次看懂</p><Link to="/works/xinjiang" className="mt-7 inline-flex min-h-11 items-center rounded-full border border-[#b8c2bd] px-5 text-xs font-bold text-[#173c37]">開啟完整網站</Link></div></div></section>
      <section className="border-y border-[#d9ddd6] bg-[#eef1ec]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-22 lg:px-9"><Heading eyebrow="Services" title="三種合作起點" /><div className="mt-10 grid gap-px overflow-hidden border border-[#d3d9d2] bg-[#d3d9d2] md:grid-cols-3">{services.map((service, index) => <article key={service.title} className="flex min-h-64 flex-col bg-[#f8f8f4] p-6"><p className="text-[9px] font-semibold text-[#9a8764]">0{index + 1}</p><h3 className="mt-5 text-lg font-semibold text-[#14211f]">{service.title}</h3><p className="mt-4 text-sm font-medium leading-7 text-[#65716d]">{service.text}</p><Link to={service.href} className="mt-auto pt-8 text-xs font-bold text-[#285f57]">{service.cta} ↗</Link></article>)}</div></div></section>
      <section className="bg-[#0b1517] text-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-7 md:py-22 lg:grid-cols-[1fr_auto] lg:items-end lg:px-9"><Heading eyebrow="Collaboration" title="你負責客戶與策略 我負責技術實作與交付" text="可配合代理商 顧問 設計與內容團隊 依專案確認範圍與交付方式" dark /><Link to="/collaboration" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 px-6 text-xs font-bold text-white">查看協作方式</Link></div></section>
      <section className="bg-[#f7f5f0]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-22 lg:px-9"><Heading eyebrow="Pricing" title="先知道合作起點" text="實際費用依頁面 功能 資料與串接範圍確認" /><div className="mt-9 grid gap-px overflow-hidden border border-[#d9ddd6] bg-[#d9ddd6] md:grid-cols-3">{[["企業 Web 系統","35,000 元起"],["企業品牌網站","25,000 元起"],["Landing Page","12,000 元起"]].map(([name, price]) => <div key={name} className="bg-[#fbfaf6] p-6"><p className="text-sm font-semibold text-[#14211f]">{name}</p><p className="mt-4 font-['Noto_Serif_TC',serif] text-2xl font-semibold text-[#52786f]">{price}</p></div>)}</div><Link to="/pricing" className="mt-7 inline-flex min-h-11 items-center rounded-full border border-[#b8c2bd] px-5 text-xs font-bold text-[#173c37]">查看完整價格</Link></div></section>
      <section className="border-y border-[#d9ddd6] bg-white"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-7 md:grid-cols-3 lg:px-9">{[["正式上線","包含部署與基本設定"],["錯誤修正","驗收範圍內依約處理"],["後續維護","新增功能與維護另外安排"]].map(([title, text]) => <div key={title}><h2 className="text-base font-semibold text-[#14211f]">{title}</h2><p className="mt-2 text-sm font-medium leading-7 text-[#65716d]">{text}</p></div>)}</div></section>
      <section className="bg-[#d7c89f] text-[#14211f]"><div className="mx-auto grid max-w-7xl gap-7 px-5 py-16 sm:px-7 md:grid-cols-[1fr_auto] md:items-end lg:px-9"><div><p className="text-[10px] font-semibold uppercase tracking-[.2em]">Start a Project</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.15] tracking-[-.045em]">把目前最耗時間的流程<br />先做成可以使用的版本</h2></div><Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#14211f] px-6 text-xs font-bold text-white">聊聊你的需求</Link></div></section>
    </SiteLayout>
  )
}

export default StudioHome
