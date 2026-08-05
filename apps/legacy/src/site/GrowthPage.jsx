import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const page = {
  path: "/seo-ads",
  title: "SEO 與 Google Ads 廣告落地頁｜網站成長與轉換追蹤｜Qingyu Web Studio",
  description: "整合技術 SEO、關鍵字與內容架構、Google Ads／Meta Ads 落地頁、GA4 與廣告轉換追蹤，讓網站流量能被衡量並持續優化。",
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "SEO、廣告落地頁與轉換追蹤",
        provider: { "@type": "ProfessionalService", name: "Qingyu Web Studio", url: "https://www.qingyuweb.com/" },
        areaServed: { "@type": "Country", name: "Taiwan" },
        serviceType: ["技術 SEO", "內容架構", "Google Ads 落地頁", "Meta Ads 落地頁", "GA4 轉換追蹤"],
        url: "https://www.qingyuweb.com/seo-ads",
        description: "從搜尋意圖、網站與落地頁到轉換衡量的一體化成長服務。",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.qingyuweb.com/" },
          { "@type": "ListItem", position: 2, name: "SEO 與廣告成長", item: "https://www.qingyuweb.com/seo-ads" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          ["SEO 多久會看到結果？", "SEO 是中長期累積，時間會受到網站現況、競爭程度、內容品質與搜尋引擎重新抓取速度影響。專案會先把可控制的技術與內容基礎做好。"],
          ["可以只做 Google Ads 落地頁嗎？", "可以。會從廣告訊息、受眾意圖、手機體驗與轉換事件規劃單一落地頁，也可串接既有網站與表單。"],
          ["廣告費包含在服務費嗎？", "不包含。媒體廣告費由平台收取，網站、落地頁、追蹤建置與代營運服務會分開報價。"],
        ].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })),
      },
    ],
  },
}

const funnel = [
  ["01", "Search intent", "先理解客戶正在搜尋什麼、比較什麼、擔心什麼。"],
  ["02", "Message match", "關鍵字、廣告文案與落地頁標題說同一件事。"],
  ["03", "Conversion UX", "手機版、速度、信任內容與 CTA 降低行動阻力。"],
  ["04", "Measurement", "把 LINE、電話、Email、表單與有效名單分開衡量。"],
]

const deliverables = [
  ["技術 SEO", ["可索引結構與 canonical", "metadata 與 Open Graph", "sitemap / robots", "Schema 結構化資料", "Core Web Vitals 基礎"]],
  ["內容與關鍵字", ["搜尋意圖分群", "服務頁資訊架構", "標題與 FAQ 規劃", "內部連結路徑", "內容優先序"]],
  ["廣告落地頁", ["單一受眾與主訴求", "訊息一致性", "手機轉換版面", "信任與案例證據", "表單／LINE CTA"]],
  ["衡量與優化", ["GA4 事件規格", "Google Ads 轉換", "UTM 與來源保存", "名單來源欄位", "月度優化清單"]],
]

const plans = [
  { name: "SEO 基礎整頓", price: "15,000 元起", text: "適合已有網站，但搜尋引擎結構、服務頁與內容方向不清楚。", list: ["技術盤點與修正", "核心服務頁架構", "metadata / Schema", "Search Console 建議"] },
  { name: "廣告落地頁＋追蹤", price: "18,000 元起", text: "適合準備投放 Google Ads 或 Meta Ads，需要專屬承接頁面。", list: ["1 組受眾／訴求", "RWD 落地頁", "表單或 LINE CTA", "GA4／廣告轉換事件"] },
  { name: "成長營運方案", price: "12,000 元起／月", text: "適合需要持續做內容、落地頁、廣告素材與成效優化的品牌。", list: ["每月成效檢視", "內容與頁面優化", "Campaign 素材支援", "下一輪實驗規劃"] },
]

function GrowthPage() {
  return (
    <SiteLayout>
      <Seo page={page} />
      <section className="relative overflow-hidden bg-[#0c161a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(99,190,174,.20),transparent_30%),radial-gradient(circle_at_8%_82%,rgba(213,242,107,.08),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#7ecabf]">SEO · Google Ads · Conversion</p>
            <h1 className="mt-6 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[1.03] tracking-[-.055em]">
              不只買流量，<br /><span className="text-[#d5f26b]">要買到下一個答案。</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base font-bold leading-8 text-white/65 md:text-lg md:leading-9">
              整合 SEO、廣告落地頁與轉換追蹤，知道客戶從哪裡來、看了什麼、為什麼行動，下一筆預算才有方向。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact?case=SEO / 廣告成長" data-track="contact" data-placement="growth_hero" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#d5f26b] px-7 text-sm font-black text-[#14231f]">預約成長診斷</Link>
              <Link to="/works/analytics-dashboard#demo" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/15 px-7 text-sm font-black text-white">看成效後台 Demo</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/12 bg-white/[.045] p-5 backdrop-blur md:p-7">
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#7ecabf]">Growth loop</p>
            <div className="mt-5 grid gap-3">
              {funnel.map(([no, title, text]) => <div key={no} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-black/10 p-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/[.08] text-[10px] font-black text-[#d5f26b]">{no}</span><div><h2 className="text-sm font-black">{title}</h2><p className="mt-1 text-xs font-bold leading-5 text-white/48">{text}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f6f0]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="max-w-4xl"><p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">Full-funnel foundation</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(2.1rem,5vw,4rem)] font-black leading-[1.08] text-[#12201d]">SEO、廣告與網站，<br />本來就不該各做各的。</h2></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {deliverables.map(([title, list], index) => <article key={title} className="rounded-2xl border border-[#dce3db] bg-white p-6 md:p-7"><div className="flex items-center justify-between"><h3 className="text-xl font-black text-[#14231f]">{title}</h3><span className="text-xs font-black text-[#39766c]">0{index + 1}</span></div><ul className="mt-5 grid gap-3 text-sm font-bold text-[#5e6c67] sm:grid-cols-2">{list.map((item) => <li key={item} className="flex gap-2"><span className="text-[#39766c]">✓</span>{item}</li>)}</ul></article>)}
          </div>
        </div>
      </section>

      <section id="ads" className="bg-[#13231f] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[.7fr_1.3fr] lg:px-8">
          <div><p className="text-xs font-black uppercase tracking-[.24em] text-[#7ecabf]">Ad landing system</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-4xl font-black leading-tight">一個廣告，<br />一個清楚的承諾。</h2><p className="mt-5 text-sm font-bold leading-7 text-white/55">不同客群不該全部送回同一個首頁。每組廣告都需要對應的訊息、案例與 CTA。</p></div>
          <div className="grid gap-3 md:grid-cols-3">
            {[["Keyword", "台中網站設計", "搜尋者已經知道要找什麼"], ["Ad message", "讓官網開始帶來詢問", "聚焦一個具體結果"], ["Landing page", "案例＋流程＋表單", "用同一條敘事承接行動"]].map(([label, title, text], index) => <article key={label} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><span className="text-[10px] font-black uppercase tracking-[.15em] text-[#7ecabf]">0{index + 1} · {label}</span><h3 className="mt-7 text-lg font-black">{title}</h3><p className="mt-3 text-xs font-bold leading-6 text-white/48">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-black uppercase tracking-[.24em] text-[#39766c]">Plans</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-4xl font-black text-[#14231f]">先從最需要的地方開始。</h2></div><p className="text-sm font-bold text-[#69766f]">媒體廣告費、第三方工具與大量內容製作另計。</p></div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">{plans.map((plan, index) => <article key={plan.name} className={`rounded-2xl border p-6 ${index === 1 ? "border-[#39766c] bg-[#f1f6ed]" : "border-[#dde3dd] bg-[#fafaf7]"}`}><p className="text-xs font-black uppercase tracking-[.16em] text-[#39766c]">{index === 1 ? "Most focused" : `Plan 0${index + 1}`}</p><h3 className="mt-4 text-2xl font-black text-[#14231f]">{plan.name}</h3><p className="mt-3 text-xl font-black text-[#39766c]">{plan.price}</p><p className="mt-4 min-h-20 text-sm font-bold leading-7 text-[#65736d]">{plan.text}</p><ul className="mt-5 grid gap-2 text-sm font-bold text-[#3e4e48]">{plan.list.map((item) => <li key={item}>✓ {item}</li>)}</ul><Link to={`/contact?case=${encodeURIComponent(plan.name)}`} data-track="contact" data-placement="growth_plan" className="mt-7 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#14231f] px-5 text-sm font-black text-white">討論這個方案</Link></article>)}</div>
          <p className="mt-6 rounded-xl border border-[#e1e5df] bg-[#fafaf6] p-4 text-xs font-bold leading-6 text-[#68746f]">SEO 與廣告成效會受到市場競爭、預算、品牌條件、內容與銷售流程影響，不保證排名或特定業績；專案會把可控制的網站、內容、追蹤與優化流程做好。</p>
        </div>
      </section>

      <section className="bg-[#0c161a] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8"><div><p className="text-xs font-black uppercase tracking-[.24em] text-[#7ecabf]">Next step</p><h2 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,5vw,4.5rem)] font-black leading-[1.08]">先找出流量卡在哪裡，<br /><span className="text-[#d5f26b]">再決定錢要花在哪裡。</span></h2></div><Link to="/contact?case=SEO / 廣告成長" data-track="contact" data-placement="growth_final" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#d5f26b] px-7 text-sm font-black text-[#14231f]">預約成長診斷</Link></div>
      </section>
    </SiteLayout>
  )
}

export default GrowthPage
