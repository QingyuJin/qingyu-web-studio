import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const page = {
  path: "/seo-ads",
  title: "SEO 與 Google Ads 廣告落地頁｜Qingyu Web Studio",
  description: "技術 SEO、內容架構、廣告落地頁與轉換追蹤 讓流量清楚可衡量",
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "SEO 與廣告成長",
        provider: { "@type": "ProfessionalService", name: "Qingyu Web Studio", url: "https://www.qingyuweb.com/" },
        areaServed: { "@type": "Country", name: "Taiwan" },
        serviceType: ["技術 SEO", "內容架構", "廣告落地頁", "GA4 轉換追蹤"],
        url: "https://www.qingyuweb.com/seo-ads",
        description: "從搜尋意圖、落地頁到轉換衡量的成長服務",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.qingyuweb.com/" },
          { "@type": "ListItem", position: 2, name: "SEO 與廣告", item: "https://www.qingyuweb.com/seo-ads" },
        ],
      },
    ],
  },
}

const deliverables = [
  ["01", "技術 SEO", "索引、metadata、Schema、sitemap"],
  ["02", "內容架構", "搜尋意圖、服務頁、內部連結"],
  ["03", "廣告落地頁", "訊息、手機體驗、CTA"],
  ["04", "轉換追蹤", "GA4、UTM、有效名單"],
]

const plans = [
  ["SEO 基礎整頓", "15,000 元起", "技術盤點、服務頁架構、metadata 與 Schema"],
  ["落地頁與追蹤", "18,000 元起", "單一受眾、RWD 頁面、CTA 與轉換事件"],
  ["成長營運", "12,000 元起／月", "成效檢視、內容優化與下一輪實驗"],
]

function GrowthPage() {
  return (
    <SiteLayout>
      <Seo page={page} />

      <section className="relative overflow-hidden bg-[#0d1517] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(92,143,132,.18),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-7 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.28em] text-[#91b6ac]">SEO · Ads · Conversion</p>
            <h1 className="mt-7 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(2.3rem,5vw,4rem)] font-bold leading-[1.12] tracking-[-.045em]">
              流量有方向
              <span className="mt-1 block text-[#d7c89f]">成效有答案</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm font-medium leading-7 text-white/58 md:text-base">
              SEO、廣告、落地頁與轉換追蹤
              <span className="block">放在同一條成長路徑</span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact?case=SEO / 廣告成長" data-track="contact" data-placement="growth_hero" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d7c89f] px-6 text-xs font-bold text-[#17201f]">洽談成長方案</Link>
              <Link to="/demo/analytics-dashboard" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-6 text-xs font-bold text-white">查看成效後台</Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/12 bg-white/[.035] px-6 py-3 backdrop-blur md:px-8">
            {[
              ["01", "Search", "找到對的需求"],
              ["02", "Message", "保持訊息一致"],
              ["03", "Action", "讓行動更清楚"],
              ["04", "Measure", "辨識有效名單"],
            ].map(([no, title, text]) => (
              <div key={no} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-white/10 py-4 last:border-0">
                <span className="text-[9px] font-medium text-[#d7c89f]">{no}</span>
                <span className="text-sm font-semibold">{title}</span>
                <span className="text-[11px] font-medium text-white/38">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0]">
        <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#52786f]">Foundation</p>
            <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3vw,2.65rem)] font-bold tracking-[-.035em] text-[#17201f]">網站、搜尋與廣告<br />使用同一套訊息</h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] border border-[#dedbd3] bg-[#dedbd3] md:grid-cols-2">
            {deliverables.map(([no, title, text]) => (
              <article key={no} className="bg-white p-5 md:p-6">
                <span className="text-[9px] font-semibold text-[#52786f]">{no}</span>
                <h3 className="mt-5 text-base font-semibold text-[#17201f]">{title}</h3>
                <p className="mt-2 text-xs font-medium leading-6 text-[#6a736f]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ads" className="bg-[#111918] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:px-7 md:py-24 lg:grid-cols-[.72fr_1.28fr] lg:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#82a99f]">Landing System</p>
            <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3vw,2.65rem)] font-bold leading-[1.2] tracking-[-.035em]">一組廣告<br />一個清楚承諾</h2>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              ["Keyword", "客戶正在找什麼"],
              ["Message", "廣告承諾什麼"],
              ["Landing", "頁面如何承接"],
              ["Action", "哪個行動有效"],
            ].map(([title, text], index) => (
              <div key={title} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-4">
                <span className="text-[9px] font-medium text-[#d7c89f]">0{index + 1}</span>
                <span className="text-sm font-semibold">{title}</span>
                <span className="text-[11px] font-medium text-white/40">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-18 sm:px-7 md:py-24 lg:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#52786f]">Plans</p>
              <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,3vw,2.65rem)] font-bold text-[#17201f]">從最需要的地方開始</h2>
            </div>
            <p className="text-[11px] font-medium text-[#747d78]">媒體費與第三方工具另計</p>
          </div>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {plans.map(([name, price, text], index) => (
              <article key={name} className={`rounded-[1.25rem] border p-5 md:p-6 ${index === 1 ? "border-[#52786f] bg-[#f1f3ed]" : "border-[#dedbd3] bg-[#faf9f6]"}`}>
                <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-[#52786f]">Plan 0{index + 1}</span>
                <h3 className="mt-5 text-lg font-semibold text-[#17201f]">{name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#52786f]">{price}</p>
                <p className="mt-5 min-h-12 text-xs font-medium leading-6 text-[#6a736f]">{text}</p>
                <Link to={`/contact?case=${encodeURIComponent(name)}`} data-track="contact" data-placement="growth_plan" className="mt-6 inline-flex min-h-10 items-center rounded-full bg-[#1d332e] px-5 text-[11px] font-bold text-white">洽談方案</Link>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[10px] font-medium leading-5 text-[#7b837f]">SEO 與廣告成效受市場、預算、品牌內容與銷售流程影響 不保證特定排名或業績</p>
        </div>
      </section>

      <section className="bg-[#0d1517] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-20 sm:px-7 md:flex-row md:items-end md:justify-between md:py-24 lg:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#82a99f]">Next Step</p>
            <h2 className="mt-4 max-w-2xl font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,3.5vw,3rem)] font-bold leading-[1.2] tracking-[-.035em]">先看清楚流量<br />再決定預算</h2>
          </div>
          <Link to="/contact?case=SEO / 廣告成長" data-track="contact" data-placement="growth_final" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d7c89f] px-6 text-xs font-bold text-[#17201f]">洽談成長方案</Link>
        </div>
      </section>
    </SiteLayout>
  )
}

export default GrowthPage
