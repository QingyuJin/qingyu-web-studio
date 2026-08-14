import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"

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
      image: "https://www.qingyuweb.com/og.png?v=20260814",
      email: contact.email,
      areaServed: { "@type": "Country", name: "Taiwan" },
      knowsAbout: ["品牌網站", "電商網站", "SEO", "廣告落地頁", "LINE Bot", "客製後台"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "品牌與數位成長服務",
        itemListElement: ["品牌網站", "電商建置", "SEO 與廣告", "LINE 與客製系統"].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["可以只改現有網站嗎？", "可以 先盤點內容、手機體驗、SEO 與轉換路徑 再決定局部優化或重做"],
        ["可以做 SEO 與廣告嗎？", "可以 從搜尋意圖、落地頁到轉換追蹤一起規劃"],
        ["可以串接 LINE 或後台嗎？", "可以 依需求串接表單、LINE、API 與客製後台"],
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
    href: "https://luluface.vercel.app/",
    cta: "查看網站 ↗",
    image: "/beauty-preview/optimized/hero-ritual.webp",
    result: "BRAND / SEO / COMMERCE",
  },
  {
    label: "DTC COMMERCE",
    title: "MORIE SELECT",
    href: "https://morie-store.vercel.app/",
    cta: "查看網站 ↗",
    image: "/demo-covers/platform-commerce.svg",
    result: "STRATEGY / UX / NEXT.JS",
  },
  {
    label: "VISUAL SYSTEM",
    title: "商業視覺作品集",
    href: "https://commercial-visual-portfolio.vercel.app/",
    cta: "查看作品 ↗",
    image: "/og.png",
    result: "CAMPAIGN / SOCIAL / ART DIRECTION",
  },
  {
    label: "SERVICE BUSINESS",
    title: "鑫匠工程",
    href: "/works/xinjiang",
    cta: "閱讀案例",
    image: "/project-photos/335941_0.jpg",
    result: "WEB / LEAD / SYSTEM",
  },
]

const services = [
  ["01", "品牌網站與電商", ["Brand", "Web", "Commerce"], "/services"],
  ["02", "SEO 與內容", ["SEO", "Content", "Search"], "/seo-ads"],
  ["03", "廣告落地頁", ["Google Ads", "Meta", "GA4"], "/seo-ads#ads"],
  ["04", "LINE 與系統", ["LINE", "API", "Admin"], "/works"],
]

const onepagePreviews = [
  ["美容", "/assets/onepage/beauty/beauty-hero.webp"],
  ["牙醫", "/assets/onepage/clinic/clinic-hero.webp"],
  ["餐飲", "/assets/onepage/restaurant/restaurant-hero.webp"],
  ["工程", "/assets/onepage/construction/construction-hero.webp"],
  ["製造", "/assets/onepage/manufacturing/manufacturing-hero.webp"],
  ["SaaS", "/assets/onepage/saas/saas-hero.webp"],
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
      <Seo page={{ ...seo.home, structuredData: homeStructuredData, imageAlt: "Qingyu Web Studio 品牌網站與數位成長" }} />
      <Hero />
      <CaseStudies />
      <OnePageSpotlight />
      <ServiceSystem />
      <GrowthSection />
      <ContactCta />
    </SiteLayout>
  )
}

function OnePageSpotlight() {
  return (
    <section className="relative isolate overflow-hidden border-y border-[#c9c3b5] bg-[#d9d1c0]" aria-labelledby="onepage-spotlight-title">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_24%,rgba(255,255,255,.42),transparent_28%),radial-gradient(circle_at_82%_76%,rgba(49,94,84,.12),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.18] [background-image:linear-gradient(rgba(23,32,31,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(23,32,31,.12)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-7 md:py-24 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-20 lg:px-10">
        <div className="lg:pl-2">
          <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#52786f]">One page service</p>
          <h2 id="onepage-spotlight-title" className="mt-4 max-w-xl font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.28] tracking-[-.035em] text-[#17201f]">
            一頁式網站設計
          </h2>
          <p className="mt-5 max-w-lg text-[13px] font-medium leading-7 text-[#5d645f]">六套完整產業範本</p>
          <div className="mt-7 flex flex-wrap gap-3 text-[10px] font-bold text-[#52605b]">
            {['RWD', 'SEO', 'LINE', 'Email', '表單互動'].map((item) => <span key={item} className="border border-[#a7a294]/80 bg-white/10 px-3 py-1.5 backdrop-blur-sm">{item}</span>)}
          </div>
          <Link to="/onepage" data-track="view_content" data-placement="home_onepage" className="mt-8 inline-flex min-h-12 items-center gap-12 border border-[#17201f] bg-[#17201f] px-6 text-[11px] font-bold tracking-[.05em] text-white shadow-[0_18px_38px_rgba(23,32,31,.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#315e54]">
            查看一頁式範本 <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <Link to="/onepage" className="group grid grid-cols-3 gap-px border border-white/35 bg-[#b8af9f] p-1 shadow-[0_30px_80px_rgba(23,32,31,.18)]" aria-label="查看美容牙醫餐飲工程製造與 SaaS 六套一頁式網站範本">
          {onepagePreviews.map(([label, image], index) => (
            <div key={label} className={`relative overflow-hidden bg-[#17201f] ${index === 0 || index === 5 ? 'aspect-[4/5]' : 'aspect-square'}`}>
              <img src={image} alt={`${label}一頁式網站縮圖`} width="1680" height="945" loading="lazy" className="h-full w-full object-cover saturate-[.86] transition duration-700 group-hover:scale-[1.025] group-hover:saturate-100" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-9 text-[8px] font-bold tracking-[.16em] text-white">{label}</span>
            </div>
          ))}
        </Link>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0d1517] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_76%_18%,rgba(92,143,132,.18),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 opacity-[.12] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:84px_84px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-7 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-10 lg:py-28">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#91b6ac]">Brand · Web · Growth</p>
          <h1 className="mt-7 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(2.35rem,5vw,4.25rem)] font-bold leading-[1.12] tracking-[-.045em]">
            清楚的品牌
            <span className="mt-1 block text-[#d7c89f]">有用的網站</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-white/62 md:text-base">品牌 網站 成長 系統</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/works" data-track="view_content" data-placement="home_hero" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d7c89f] px-6 text-xs font-bold tracking-wide text-[#17201f] hover:bg-[#e5d9b8]">
              查看作品
            </Link>
            <Link to="/contact" data-track="contact" data-placement="home_hero" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-6 text-xs font-bold tracking-wide text-white hover:bg-white/[.06]">
              洽談專案
            </Link>
          </div>
        </div>

        <div className="relative lg:pl-10">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[.035] p-6 backdrop-blur md:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <span className="text-[10px] font-bold uppercase tracking-[.24em] text-white/42">Studio Scope</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7c89f]" />
            </div>
            <div className="divide-y divide-white/10">
              {[
                ["Brand", "定位與視覺"],
                ["Web", "網站與電商"],
                ["Growth", "SEO 與廣告"],
                ["System", "LINE 與後台"],
              ].map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-4">
                  <span className="text-[10px] font-medium text-white/28">0{index + 1}</span>
                  <span className="text-sm font-semibold tracking-wide">{title}</span>
                  <span className="text-xs font-medium text-white/42">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CaseStudies() {
  return (
    <section className="bg-[#f7f5f0]" id="featured-work">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#52786f]">Selected Work</p>
            <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3vw,2.65rem)] font-bold tracking-[-.035em] text-[#17201f]">精選作品</h2>
          </div>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {caseStudies.map((item, index) => (
            <article key={item.title} className="group overflow-hidden rounded-[1.25rem] border border-[#dedbd3] bg-white">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#102025]">
                <img src={item.image} alt={`${item.title} 專案畫面`} loading={index > 1 ? "lazy" : "eager"} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081013]/72 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[9px] font-semibold tracking-[.14em] text-white backdrop-blur">{item.label}</span>
                <p className="absolute bottom-4 left-4 text-[9px] font-semibold tracking-[.12em] text-white/72">{item.result}</p>
              </div>
              <div className="flex items-end justify-between gap-4 p-5 md:p-6">
                <div>
                  <h3 className="font-['Noto_Serif_TC',serif] text-xl font-bold text-[#17201f]">{item.title}</h3>
                </div>
                <SmartLink href={item.href} data-track="view_content" data-placement="featured_case" className="shrink-0 text-[11px] font-bold text-[#315e54]">{item.cta}</SmartLink>
              </div>
            </article>
          ))}
        </div>
        <Link to="/works" className="mt-7 inline-flex min-h-10 items-center rounded-full border border-[#cfd3ca] px-5 text-xs font-bold text-[#263a35] hover:border-[#52786f]">全部作品 →</Link>
      </div>
    </section>
  )
}

function ServiceSystem() {
  return (
    <section className="bg-[#111918] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-7 md:py-24 lg:grid-cols-[.72fr_1.28fr] lg:px-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#82a99f]">Capabilities</p>
          <h2 className="mt-3 max-w-sm font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3vw,2.65rem)] font-bold leading-[1.2] tracking-[-.035em]">一套完整的方法</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {services.map(([no, title, tags, link]) => (
            <Link key={no} to={link} className="group grid gap-3 py-5 md:grid-cols-[2rem_1fr_auto] md:items-center md:gap-5">
              <span className="text-[10px] font-medium text-[#d7c89f]">{no}</span>
              <h3 className="text-base font-semibold">{title}</h3>
              <div className="flex gap-2 md:justify-end">
                {tags.map((tag) => <span key={tag} className="text-[9px] font-semibold uppercase tracking-wide text-white/28">{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function GrowthSection() {
  return (
    <section className="border-b border-[#ddd9cf] bg-[#e9ede7]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-7 md:py-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#52786f]">SEO + Performance</p>
          <h2 className="mt-3 max-w-lg font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3vw,2.65rem)] font-bold leading-[1.2] tracking-[-.035em] text-[#17201f]">流量有來源<br />成效有答案</h2>
          <Link to="/seo-ads" className="mt-7 inline-flex min-h-10 items-center rounded-full bg-[#1d332e] px-5 text-xs font-bold text-white">SEO 與廣告方案</Link>
        </div>
        <div className="rounded-[1.25rem] border border-[#cfd8d0] bg-white/72 px-5 py-2 md:px-7">
          {[
            ["01", "搜尋與廣告"],
            ["02", "對應落地頁"],
            ["03", "關鍵行動"],
            ["04", "有效名單"],
          ].map(([no, title]) => (
            <div key={no} className="grid grid-cols-[2rem_1fr] items-center gap-3 border-b border-[#dfe4dd] py-4 last:border-0">
              <span className="text-[9px] font-semibold text-[#52786f]">{no}</span>
              <span className="text-sm font-semibold text-[#1c2b27]">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCta() {
  return (
    <section className="bg-[#0d1517] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-7 md:py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#82a99f]">Start a project</p>
          <h2 className="mt-4 max-w-2xl font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,3.5vw,3rem)] font-bold leading-[1.2] tracking-[-.035em]">從一個清楚的方向開始</h2>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-60">
          <Link to="/contact" data-track="contact" data-placement="home_final_cta" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d7c89f] px-6 text-xs font-bold text-[#17201f]">洽談專案</Link>
          <a href={`https://line.me/R/ti/p/~${contact.lineId}`} target="_blank" rel="noreferrer" data-track="contact" data-placement="home_final_line" className="text-center text-[11px] font-semibold text-white/48">LINE {contact.lineId}</a>
        </div>
      </div>
    </section>
  )
}

export default StudioHome
