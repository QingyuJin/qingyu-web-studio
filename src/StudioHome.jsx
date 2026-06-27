import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { seo } from "./site/content"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function SmartLink({ to, children, ...props }) {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}

const artifactTiles = [
  {
    title: "BuildFlow",
    subtitle: "工程行流程系統",
    to: "/buildflow",
    action: "打開",
    items: ["案件", "報價", "派工"],
    featured: true,
  },
  {
    title: "互動測驗",
    subtitle: "測驗頁與結果頁",
    to: "/works/interactive-quiz",
    action: "查看",
    items: ["題目", "解析", "結果"],
  },
  {
    title: "自動回覆",
    subtitle: "FAQ 與 LINE Bot",
    to: "/tools/linebot-mission#demo",
    action: "試用",
    items: ["FAQ", "LINE", "紀錄"],
  },
  {
    title: "AI 技術任務",
    subtitle: "互動式 AI 展示",
    to: "https://ai-tech-quest.vercel.app",
    action: "體驗",
    items: ["RAG", "ML", "AI"],
  },
  {
    title: "網站案例",
    subtitle: "服務頁與表單",
    to: "/contractor-site",
    action: "查看",
    items: ["RWD", "表單", "SEO"],
  },
  {
    title: "找我做",
    subtitle: "留下需求",
    to: "/contact",
    action: "聯絡",
    items: ["需求", "預算", "時程"],
  },
]

const problemCards = [
  {
    title: "網站",
    fit: "小店、工作室、個人品牌",
    detail: "一頁式網站、地圖、表單、手機版。",
    to: "/services",
  },
  {
    title: "互動測驗",
    fit: "課程、活動、教育訓練",
    detail: "題目、作答、解析、結果頁。",
    to: "/works/interactive-quiz",
  },
  {
    title: "自動回覆",
    fit: "店家、補習班、服務業",
    detail: "FAQ、LINE Bot、問題紀錄。",
    to: "/tools/linebot-mission#demo",
  },
  {
    title: "流程系統",
    fit: "工程行、維修、裝修團隊",
    detail: "需求、報價、派工、回報。",
    to: "/buildflow",
  },
]

const pricePlans = [
  ["網站包", "5,000 元起", "一頁式網站、手機版、表單。"],
  ["店家網站", "8,000 元起", "服務、案例、地圖、聯絡入口。"],
  ["舊站整理", "3,000 元起", "手機版、文案、CTA 調整。"],
  ["互動測驗", "6,000 元起", "題目、解析、結果頁。"],
  ["題庫測驗", "10,000 元起", "JSON / Google Sheet 題庫。"],
  ["自動回覆", "8,000 元起", "FAQ、LINE Bot、紀錄。"],
  ["小型後台", "20,000 元起", "資料、案件、狀態管理。"],
  ["流程系統", "30,000 元起", "需求、報價、派工、回報。"],
  ["月維護", "800 元起", "小修改與上線支援。"],
]

const productPackages = [
  {
    title: "網站包",
    price: "5,000 元起",
    fit: "小店 / 工作室",
    outcome: "把店面放到網路上，讓客人看懂、找得到、聯絡得到。",
    includes: ["首頁", "手機版", "地圖", "表單"],
    to: "/services",
    action: "看方案",
  },
  {
    title: "測驗包",
    price: "6,000 元起",
    fit: "課程 / 活動",
    outcome: "讓使用者作答、看解析、得到結果。",
    includes: ["題目", "作答", "解析", "結果"],
    to: "/works/interactive-quiz",
    action: "看成品",
  },
  {
    title: "回覆包",
    price: "8,000 元起",
    fit: "店家 / 補習班",
    outcome: "把常見問題變成可用的自動回覆。",
    includes: ["FAQ", "LINE", "紀錄", "語氣"],
    to: "/tools/linebot-mission#demo",
    action: "試用",
  },
  {
    title: "流程包",
    price: "30,000 元起",
    fit: "工程行 / 維修團隊",
    outcome: "把需求、報價、派工與回報整理成一套系統。",
    includes: ["需求", "案件", "報價", "派工"],
    to: "/buildflow",
    action: "打開",
    featured: true,
  },
]

const caseCards = [
  {
    title: "BuildFlow",
    label: "流程系統",
    text: "需求、報價、派工、回報。",
    to: "/buildflow",
    action: "查看 BuildFlow",
    primary: true,
  },
  {
    title: "互動測驗頁",
    label: "測驗商品",
    text: "題目、解析、結果頁。",
    to: "/works/interactive-quiz",
    action: "查看測驗規劃",
  },
  {
    title: "互動式技術展示：AI 技術任務",
    label: "AI Demo",
    text: "文件問答、模型分類、店家助手。",
    to: "https://ai-tech-quest.vercel.app",
    action: "體驗 Demo",
  },
  {
    title: "店家 AI 助手",
    label: "自動回覆",
    text: "FAQ、預約、價目表。",
    to: "https://ai-tech-quest.vercel.app/missions/business",
    action: "看助手 Demo",
  },
  {
    title: "繁體中文文件問答系統",
    label: "文件問答",
    text: "查文件、附來源、不亂答。",
    to: "https://ai-tech-quest.vercel.app/missions/rag",
    action: "看 RAG Demo",
  },
]

const workSteps = [
  ["01", "討論", "需求、預算、時程。"],
  ["02", "報價", "確認範圍。"],
  ["03", "初版", "先看畫面。"],
  ["04", "修改", "調整 1～2 次。"],
  ["05", "上線", "部署交付。"],
  ["06", "維護", "另談後續。"],
]

const fitItems = [
  "小店",
  "工作室",
  "個人品牌",
  "學生專題",
  "教育訓練頁",
  "工程行小流程",
  "小型公司形象站",
]

const notFitItems = [
  "大型企業 ERP",
  "大型電商",
  "複雜會員系統",
  "大型多語系 CMS",
  "永久保固系統",
  "高資安要求內部系統",
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <section
        className="relative overflow-hidden border-b border-white/40 bg-[#0f1d1e] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(10,18,20,0.78), rgba(21,58,60,0.34) 44%, rgba(250,248,243,0.7)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(250,248,243,0.5))]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-6xl gap-5 px-4 py-10 md:grid-cols-[1fr_0.72fr] md:items-center md:py-16">
          <div className="rounded-lg border border-white/55 bg-white/28 p-6 shadow-2xl shadow-[#071113]/20 backdrop-blur-xl md:p-8">
            <p className="text-xs font-black uppercase text-white/82">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.35rem,6.4vw,4.35rem)] font-black leading-[1.06] text-white drop-shadow">
              網站、測驗、<span className="whitespace-nowrap">LINE Bot</span>、<span className="whitespace-nowrap">小後台。</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-bold leading-8 text-white/82 md:text-lg">
              做成能上線的成品。
            </p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <a href="#products" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22] shadow-lg shadow-[#071113]/10 hover:bg-[#f5f1e9]">
                看成品
              </a>
              <a href="#pricing" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/55 bg-white/18 px-5 text-sm font-black text-white backdrop-blur hover:bg-white/25">
                看價格
              </a>
              <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/55 bg-white/18 px-5 text-sm font-black text-white backdrop-blur hover:bg-white/25">
                聯絡
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/45 bg-white/22 p-4 shadow-2xl shadow-[#071113]/20 backdrop-blur-xl">
            <p className="px-2 text-xs font-black text-white/82">直接打開</p>
            <div className="mt-3 grid gap-2">
              {artifactTiles.slice(0, 4).map((tile) => (
                <SmartLink key={tile.title} to={tile.to} className="group flex min-h-16 items-center justify-between rounded-lg border border-white/35 bg-white/38 px-4 text-sm font-black text-[#132123] shadow-sm backdrop-blur transition hover:bg-white/62">
                  <span>
                    <span className="block">{tile.title}</span>
                    <span className="mt-1 block text-xs font-bold text-[#4d5e5b]">{tile.subtitle}</span>
                  </span>
                  <span className="text-xs text-[#0d6b62] group-hover:text-[#083f3b]">{tile.action}</span>
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductPackageSection />
      <ProblemSection />
      <CaseSection />
      <PricingSection />
      <ProcessSection />
      <FitSection />
      <FinalCta />
    </SiteLayout>
  )
}

function ProblemSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="需求" title="選需求" text="直接點。" />
        <div className="grid gap-4 md:grid-cols-2">
          {problemCards.map((card) => (
            <SmartLink key={card.title} to={card.to} className="rounded-lg border border-[#e3ded3] bg-white/85 p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg">
              <h3 className="text-2xl font-black text-[#111c22]">{card.title}</h3>
              <p className="mt-3 text-sm font-black text-[#0d6b62]">{card.fit}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{card.detail}</p>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductPackageSection() {
  return (
    <section id="products" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="成品"
          title="選成品"
          text="可交付商品。"
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {productPackages.map((item) => (
            <SmartLink
              key={item.title}
              to={item.to}
              className={`rounded-lg border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                item.featured ? "border-[#0d6b62] bg-[#111c22] text-white" : "border-[#e3ded3] bg-[#faf8f3] text-[#111c22]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className={`text-xs font-black uppercase ${item.featured ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>
                    Product
                  </p>
                  <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                </div>
                <p className={`rounded-md px-3 py-1 text-sm font-black ${item.featured ? "bg-white text-[#111c22]" : "bg-white text-[#0d6b62]"}`}>
                  {item.price}
                </p>
              </div>
              <p className={`mt-4 text-sm font-black ${item.featured ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{item.fit}</p>
              <p className={`mt-3 text-sm font-bold leading-7 ${item.featured ? "text-white/75" : "text-[#52605c]"}`}>{item.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.includes.map((part) => (
                  <span key={part} className={`rounded-md px-3 py-1 text-xs font-black ${item.featured ? "bg-white/10 text-white" : "bg-white text-[#52605c]"}`}>
                    {part}
                  </span>
                ))}
              </div>
              <span className={`mt-5 inline-flex min-h-10 items-center rounded-md px-4 text-sm font-black ${item.featured ? "bg-white text-[#111c22]" : "bg-[#111c22] text-white"}`}>
                {item.action}
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="價格"
          title="參考價"
          text="實際依範圍調整。"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricePlans.map(([name, price, text]) => (
            <article key={name} className="rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-5">
              <h3 className="text-xl font-black text-[#111c22]">{name}</h3>
              <p className="mt-3 text-2xl font-black text-[#0d6b62]">{price}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseSection() {
  return (
    <section id="cases" className="scroll-mt-20 border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="作品" title="看實物" text="點開就能試。" />
        <div className="grid gap-4 lg:grid-cols-2">
          {caseCards.map((item) => (
            <SmartLink
              key={item.title}
              to={item.to}
              className={`rounded-lg border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                item.primary ? "border-[#0d6b62] bg-[#111c22] text-white" : "border-[#e3ded3] bg-white text-[#111c22]"
              }`}
            >
              <p className={`text-xs font-black uppercase ${item.primary ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{item.label}</p>
              <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
              <p className={`mt-3 text-sm font-bold leading-7 ${item.primary ? "text-white/72" : "text-[#52605c]"}`}>{item.text}</p>
              <span className={`mt-5 inline-flex min-h-10 items-center rounded-md px-4 text-sm font-black ${item.primary ? "bg-white text-[#111c22]" : "bg-[#111c22] text-white"}`}>
                {item.action}
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="流程" title="合作流程" text="六步完成。" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workSteps.map(([step, title, text]) => (
            <article key={step} className="rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-5">
              <p className="text-xs font-black text-[#0d6b62]">{step}</p>
              <h3 className="mt-2 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-lg border border-[#e3ded3] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5f4a2a]">
          新增功能與第三方變動，另談維護。
        </p>
      </div>
    </section>
  )
}

function FitSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-2 md:py-16">
        <FitList title="適合" items={fitItems} />
        <FitList title="暫不適合" items={notFitItems} muted />
      </div>
    </section>
  )
}

function FitList({ title, items, muted = false }) {
  return (
    <article className={`rounded-lg border p-5 ${muted ? "border-[#e0d6c7] bg-white" : "border-[#0d6b62] bg-white"}`}>
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-md px-3 py-2 text-sm font-black ${muted ? "bg-[#faf8f3] text-[#6b6258]" : "bg-[#eef7f4] text-[#0d6b62]"}`}>
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black text-[#8fd6cc]">聯絡</p>
          <h2 className="mt-3 text-3xl font-black">丟想法，我整理成方案。</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">
            產業、需求、預算、時程即可。
          </p>
        </div>
        <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-black text-[#111c22]">
          聯絡我
        </Link>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-xs font-black uppercase text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.6rem,5vw,3rem)] font-black">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
