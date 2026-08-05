import { useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"
import { LiveIndustryDemo, industries } from "./site/homeIndustries"

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
      image: "https://www.qingyuweb.com/og.png",
      email: contact.email,
      areaServed: { "@type": "Country", name: "Taiwan" },
      availableLanguage: ["zh-Hant", "English"],
      knowsAbout: [
        "網站設計",
        "品牌官網",
        "電商網站",
        "搜尋引擎最佳化",
        "Google Ads 落地頁",
        "LINE Bot",
        "客製化後台",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "網站與數位成長服務",
        itemListElement: [
          "品牌網站設計",
          "電商建置與優化",
          "SEO 與內容架構",
          "廣告落地頁與轉換追蹤",
          "LINE Bot 與客製系統",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["網站做完之後會有人看嗎？", "網站會先建立可被搜尋引擎理解的技術結構，再依需求串接內容、Search Console、廣告落地頁與轉換追蹤。"],
        ["可以只改現有網站，不重做嗎？", "可以。會先盤點速度、手機體驗、文案、SEO 與轉換路徑，再決定局部優化或重新設計。"],
        ["廣告預算不大也適合嗎？", "適合先用單一服務、單一客群與單一落地頁驗證，再依有效詢問逐步擴大。"],
      ].map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
}

const caseStudies = [
  {
    label: "BEAUTY COMMERCE",
    title: "LULUFACE",
    text: "美容品牌、商品、服務、培訓與內容 SEO 的完整品牌電商體驗。",
    href: "https://luluface.vercel.app/",
    cta: "開啟正式展示 ↗",
    image: "/beauty-preview/optimized/hero-ritual.webp",
    result: "品牌電商 / SEO / RWD",
  },
  {
    label: "NEXT.JS COMMERCE",
    title: "MORIE SELECT",
    text: "從品牌故事、商品探索到購物流程，展示完整 DTC 電商產品設計。",
    href: "https://morie-store.vercel.app/",
    cta: "體驗電商成品 ↗",
    image: "/demo-covers/platform-commerce.svg",
    result: "品牌策略 / UX / 電商",
  },
  {
    label: "CAMPAIGN SYSTEM",
    title: "商業視覺作品集",
    text: "把廣告主視覺、社群素材與活動版型做成可重複擴充的視覺系統。",
    href: "https://commercial-visual-portfolio.vercel.app/",
    cta: "查看視覺作品 ↗",
    image: "/og.png",
    result: "廣告視覺 / 社群 / Campaign",
  },
  {
    label: "SERVICE BUSINESS",
    title: "鑫匠工程",
    text: "品牌官網、案例信任、詢價表單與案件後台串成一條接案流程。",
    href: "/works/xinjiang",
    cta: "閱讀案例",
    image: "/project-photos/335941_0.jpg",
    result: "官網 / 詢價 / 後台",
  },
]

const services = [
  {
    no: "01",
    title: "品牌網站與電商",
    text: "從定位、文案、視覺到手機體驗，建立看得懂、記得住、願意行動的數位門面。",
    tags: ["品牌官網", "Shopify / MeepShop", "Landing Page"],
    link: "/services",
  },
  {
    no: "02",
    title: "SEO 與內容成長",
    text: "關鍵字與搜尋意圖先進入網站架構，補齊 metadata、結構化資料、速度與內容路徑。",
    tags: ["技術 SEO", "內容架構", "Search Console"],
    link: "/seo-ads",
  },
  {
    no: "03",
    title: "廣告與轉換落地頁",
    text: "為每一組受眾與廣告訊息打造對應頁面，讓流量、CTA、表單與詢問能被正確衡量。",
    tags: ["Google Ads", "Meta Ads", "GA4 轉換"],
    link: "/seo-ads#ads",
  },
  {
    no: "04",
    title: "LINE 與營運系統",
    text: "把表單、LINE、訂單、案件、派工與 AI 助手整合成團隊真正能使用的流程。",
    tags: ["LINE Bot", "客製後台", "AI / API"],
    link: "/works",
  },
]

const faqs = [
  ["網站做完之後會有人看嗎？", "網站會先建立可被搜尋引擎理解的技術結構，再依需求串接內容、Search Console、廣告落地頁與轉換追蹤。網站不是流量保證，但會是後續成長能被累積與衡量的基礎。"],
  ["可以只改現有網站，不重做嗎？", "可以。會先盤點速度、手機體驗、文案、SEO 與轉換路徑，再決定局部優化或重新設計，避免為了改版而改版。"],
  ["廣告預算不大也適合嗎？", "適合先用單一服務、單一客群與單一落地頁驗證。先確認哪些訊息能帶來有效詢問，再逐步擴大預算。"],
  ["可以接 LINE、表單或既有後台嗎？", "可以。可依既有工具串接 LINE、Email、Supabase、Google Sheet、API 或客製後台，範圍會在報價前確認。"],
]

function SmartLink({ href, children, ...props }) {
  if (/^https?:\/\//.test(href)) {
    return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>
  }
  return <Link to={href} {...props}>{children}</Link>
}

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={{ ...seo.home, structuredData: homeStructuredData, imageAlt: "Qingyu Web Studio 品牌網站、SEO、廣告與系統整合" }} />
      <Hero />
      <ProofStrip />
      <CaseStudies />
      <ServiceSystem />
      <GrowthSection />
      <IndustryDemoSection />
      <ProcessSection />
      <FaqSection />
      <ContactCta />
    </SiteLayout>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b1418] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_20%,rgba(64,150,136,.24),transparent_30%),radial-gradient(circle_at_12%_84%,rgba(213,242,107,.10),transparent_24%)]" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="mx-auto grid min-h-[calc(100svh-64px)] max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[.2em] text-[#9eb6ad]">
            <span className="rounded-full border border-[#d5f26b]/30 bg-[#d5f26b]/10 px-3 py-1.5 text-[#d5f26b]">Taiwan · Web Growth Studio</span>
            <span>Brand</span><span className="text-white/25">/</span><span>Commerce</span><span className="text-white/25">/</span><span>Growth</span>
          </div>
          <h1 className="mt-7 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.7rem,7vw,5.7rem)] font-black leading-[1.02] tracking-[-.055em]">
            不只把網站做漂亮
            <span className="mt-2 block text-[#d5f26b]">也把生意接進來。</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base font-bold leading-8 text-white/68 md:text-lg md:leading-9">
            Qingyu Web Studio 整合品牌設計、網站與電商、SEO、廣告落地頁、轉換追蹤與 LINE／後台系統，讓每一個數位接觸點都往詢問與成交前進。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" data-track="contact" data-placement="home_hero" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#d5f26b] px-7 text-sm font-black text-[#122017] shadow-[0_18px_50px_rgba(213,242,107,.18)] hover:bg-[#e4fb8e]">
              預約 30 分鐘需求診斷
            </Link>
            <Link to="/works" data-track="view_content" data-placement="home_hero" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/18 bg-white/[.05] px-7 text-sm font-black text-white hover:bg-white/[.1]">
              先看完整作品
            </Link>
          </div>
          <p className="mt-5 text-xs font-bold tracking-wide text-white/42">先釐清目標與優先順序，再確認範圍、時程與報價。</p>
        </div>

        <div className="relative lg:pl-8">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[#3d8b80]/12 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#101f24]/90 p-4 shadow-[0_40px_100px_rgba(0,0,0,.35)] backdrop-blur md:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#79c8bb]">Growth Operating System</p>
                <p className="mt-1 text-sm font-black">從第一次看見，到有效詢問</p>
              </div>
              <span className="flex items-center gap-2 text-[11px] font-black text-white/45"><i className="h-2 w-2 rounded-full bg-[#d5f26b]" /> LIVE</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["被看見", "SEO · Ads", "搜尋與精準受眾"],
                ["被理解", "Brand · UX", "三秒看懂價值"],
                ["被信任", "Cases · Content", "作品與內容證據"],
                ["能成交", "CTA · CRM", "詢問進入流程"],
              ].map(([title, meta, text], index) => (
                <div key={title} className={`rounded-2xl border p-4 ${index === 3 ? "border-[#d5f26b]/35 bg-[#d5f26b]/10" : "border-white/10 bg-white/[.045]"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-white/35">0{index + 1}</span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#79c8bb]">{meta}</span>
                  </div>
                  <p className="mt-5 text-lg font-black">{title}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-white/48">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-[#081216] p-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[.15em] text-white/36">
                <span>Traffic → Lead system</span><span className="text-[#d5f26b]">可衡量</span>
              </div>
              <div className="mt-4 flex items-center gap-2" aria-hidden="true">
                {[24, 38, 32, 52, 47, 68, 62, 86, 78, 100].map((height, index) => (
                  <span key={`${height}-${index}`} className="flex-1 rounded-full bg-gradient-to-t from-[#34776d] to-[#d5f26b]" style={{ height: `${Math.max(10, height * .55)}px`, opacity: .35 + index * .06 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofStrip() {
  return (
    <section className="border-b border-[#dfe4dd] bg-[#f4f5ef]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 md:grid-cols-[1fr_2fr] md:items-center lg:px-8">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#315e57]">One studio, one growth system</p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-black text-[#24322f] sm:grid-cols-5">
          {["品牌策略", "網站／電商", "SEO 內容", "廣告落地頁", "LINE／後台"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  return (
    <section className="bg-[#f7f6f1]" id="featured-work">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[.72fr_1.28fr] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">Selected Work</p>
            <h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,5vw,4.2rem)] font-black leading-[1.08] tracking-[-.04em] text-[#111b1e]">看得見設計，<br />也看得見系統。</h2>
          </div>
          <p className="max-w-2xl text-sm font-bold leading-7 text-[#596762] md:justify-self-end md:text-base md:leading-8">
            從美容品牌、選品電商、商業視覺到工程服務，每個案例都對應不同的客群、決策情境與轉換目標。
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.map((item, index) => (
            <article key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-[#dfe3da] bg-white shadow-[0_16px_55px_rgba(36,50,47,.06)]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#102025]">
                <img src={item.image} alt={`${item.title} 專案畫面`} loading={index > 1 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081013]/80 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-black tracking-[.16em] text-white backdrop-blur">{item.label}</span>
                <p className="absolute bottom-5 left-5 text-xs font-black text-white/72">{item.result}</p>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-['Noto_Serif_TC',serif] text-2xl font-black text-[#111b1e] md:text-3xl">{item.title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#61706a]">{item.text}</p>
                <SmartLink href={item.href} data-track="view_content" data-placement="featured_case" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#285f57] hover:text-[#102a26]">{item.cta}<span aria-hidden="true">→</span></SmartLink>
              </div>
            </article>
          ))}
        </div>
        <Link to="/works" className="mt-8 inline-flex min-h-12 items-center rounded-xl border border-[#cfd8d1] bg-white px-6 text-sm font-black text-[#172521] hover:border-[#39766c]">查看全部作品與可操作系統 →</Link>
      </div>
    </section>
  )
}

function ServiceSystem() {
  return (
    <section className="bg-[#0d171b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#7ecabf]">Capabilities</p>
            <h2 className="mt-4 max-w-md font-['Noto_Serif_TC',serif] text-[clamp(2.1rem,4.5vw,3.8rem)] font-black leading-[1.1] tracking-[-.04em]">成長不是單點，<br />而是一整條路。</h2>
            <p className="mt-6 max-w-md text-sm font-bold leading-8 text-white/56">從品牌、流量、體驗到名單承接，讓每一筆投入可以被看見、理解與優化。</p>
          </div>
          <div className="grid gap-3">
            {services.map((service) => (
              <Link key={service.no} to={service.link} className="group grid gap-4 rounded-2xl border border-white/10 bg-white/[.035] p-5 hover:border-[#7ecabf]/35 hover:bg-white/[.06] md:grid-cols-[auto_1fr_auto] md:items-start md:p-7">
                <span className="text-xs font-black text-[#d5f26b]">{service.no}</span>
                <div>
                  <h3 className="text-xl font-black md:text-2xl">{service.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/55">{service.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[10px] font-black text-white/55">{tag}</span>)}
                  </div>
                </div>
                <span className="hidden text-xl text-white/30 transition group-hover:translate-x-1 group-hover:text-[#d5f26b] md:block">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function GrowthSection() {
  return (
    <section className="border-b border-[#dfe4dd] bg-[#e9efe9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">SEO + Performance</p>
          <h2 className="mt-4 max-w-2xl font-['Noto_Serif_TC',serif] text-[clamp(2.1rem,5vw,4rem)] font-black leading-[1.08] tracking-[-.045em] text-[#11201d]">每一筆廣告費，<br />都該留下可用的答案。</h2>
          <p className="mt-6 max-w-xl text-sm font-bold leading-8 text-[#53645e] md:text-base">不是只看曝光和點擊，而是追到哪個關鍵字、哪個頁面、哪個 CTA 帶來有效詢問，讓 SEO、內容與廣告彼此累積。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/seo-ads" className="inline-flex min-h-12 items-center rounded-xl bg-[#17352f] px-6 text-sm font-black text-white">查看 SEO／廣告成長方案</Link>
            <Link to="/free-audit" className="inline-flex min-h-12 items-center rounded-xl border border-[#bfcfc5] bg-white/60 px-6 text-sm font-black text-[#17352f]">先做網站健檢</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#cbd8cf] bg-white p-5 shadow-[0_24px_70px_rgba(32,68,58,.10)] md:p-7">
          <div className="flex items-center justify-between">
            <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#39766c]">Measurement Plan</p><p className="mt-1 text-lg font-black text-[#14221f]">從流量到有效詢問</p></div>
            <span className="rounded-full bg-[#e7f2d0] px-3 py-1 text-[10px] font-black text-[#38551c]">可追蹤</span>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              ["01", "搜尋與廣告", "Keyword / Campaign / Creative"],
              ["02", "對應落地頁", "Message match / Mobile UX"],
              ["03", "關鍵行動", "LINE / Email / Form / Call"],
              ["04", "有效名單", "Source / Service / Budget"],
            ].map(([no, title, text]) => (
              <div key={no} className="grid grid-cols-[auto_1fr] gap-4 rounded-xl border border-[#e1e7e1] bg-[#f8f9f5] p-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#17352f] text-[10px] font-black text-[#d5f26b]">{no}</span>
                <div><p className="text-sm font-black text-[#14221f]">{title}</p><p className="mt-1 text-xs font-bold text-[#68766f]">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IndustryDemoSection() {
  const [idx, setIdx] = useState(0)
  const industry = industries[idx]
  return (
    <section className="bg-[#f7f6f1]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[.7fr_1.3fr] md:items-end">
          <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">Interactive Demo</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.1] text-[#11201d]">選你的產業，<br />看流程怎麼動。</h2></div>
          <p className="max-w-2xl text-sm font-bold leading-7 text-[#60706a] md:justify-self-end">網站不只是畫面。點一次客戶端操作，右側後台就會同步出現資料。</p>
        </div>
        <div className="mt-9 flex gap-2 overflow-x-auto pb-2">
          {industries.map((item, i) => (
            <button key={item.id} type="button" onClick={() => setIdx(i)} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-black ${i === idx ? "border-[#17352f] bg-[#17352f] text-white" : "border-[#d4ddd6] bg-white text-[#40504b]"}`}>{item.label}</button>
          ))}
        </div>
        <div className="mt-5 rounded-[1.75rem] border border-[#d9e0d8] bg-white p-4 shadow-[0_18px_55px_rgba(36,50,47,.06)] md:p-6"><LiveIndustryDemo key={industry.id} industry={industry} /></div>
        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-[#14231f] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div><p className="font-black">{industry.product.system}</p><p className="mt-1 text-xs font-bold text-white/55">{industry.product.price} · {industry.product.duration}</p></div>
          <div className="flex gap-2"><Link to={industry.product.live.path} className="inline-flex min-h-10 items-center rounded-lg bg-[#d5f26b] px-4 text-xs font-black text-[#17352f]">{industry.product.live.label}</Link><Link to="/contact" className="inline-flex min-h-10 items-center rounded-lg border border-white/15 px-4 text-xs font-black">討論需求</Link></div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const steps = [["01", "找到真正要解決的問題", "商業目標、客群、主力服務與轉換行動先對齊。"], ["02", "把策略變成頁面與內容", "資訊架構、文案、視覺、SEO 與廣告訊息一起設計。"], ["03", "接上追蹤與營運流程", "GA4、廣告轉換、表單、LINE、Email 或後台依需求串接。"], ["04", "上線後持續優化", "用搜尋、流量與詢問資料決定下一輪內容與廣告。"]]
  return (
    <section className="border-y border-[#dfe4dd] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">How we work</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(2rem,4.5vw,3.6rem)] font-black leading-[1.1] text-[#11201d]">先做對，再做大。</h2></div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#dfe4dd] bg-[#dfe4dd] md:grid-cols-4">
          {steps.map(([no, title, text]) => <article key={no} className="bg-[#fafaf6] p-6"><p className="text-xs font-black text-[#39766c]">{no}</p><h3 className="mt-8 text-lg font-black leading-7 text-[#15231f]">{title}</h3><p className="mt-3 text-sm font-bold leading-7 text-[#64716c]">{text}</p></article>)}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="bg-[#f7f6f1]">
      <div className="mx-auto grid max-w-7xl gap-9 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[.65fr_1.35fr] lg:px-8">
        <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">FAQ</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-4xl font-black text-[#11201d]">先回答你可能正在想的。</h2></div>
        <div className="grid gap-3">{faqs.map(([question, answer], index) => <details key={question} open={index === 0} className="group rounded-2xl border border-[#dbe2da] bg-white p-5"><summary className="flex list-none items-center justify-between gap-4 text-base font-black text-[#172521]"><span>{question}</span><span className="text-xl font-medium text-[#39766c] group-open:rotate-45">＋</span></summary><p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#62706b]">{answer}</p></details>)}</div>
      </div>
    </section>
  )
}

function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-[#101b20] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(213,242,107,.12),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-9 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8">
        <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#79c8bb]">Start a project</p><h2 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.05] tracking-[-.05em]">下一次客戶搜尋時，<br /><span className="text-[#d5f26b]">讓他更快選擇你。</span></h2><p className="mt-6 max-w-2xl text-sm font-bold leading-8 text-white/58 md:text-base">告訴我你的產業、目前網站、想推的服務與預算範圍，我會先整理適合的優先順序。</p></div>
        <div className="grid gap-3 sm:min-w-72"><Link to="/contact" data-track="contact" data-placement="home_final_cta" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#d5f26b] px-7 text-sm font-black text-[#122017]">填寫專案需求</Link><a href={`https://line.me/R/ti/p/~${contact.lineId}`} target="_blank" rel="noreferrer" data-track="contact" data-placement="home_final_line" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/15 px-7 text-sm font-black text-white">LINE：{contact.lineId}</a></div>
      </div>
    </section>
  )
}

export default StudioHome
