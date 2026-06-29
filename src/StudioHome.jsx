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

const serviceCards = [
  {
    id: "website-fast",
    title: "網站製作",
    description: "品牌網站、服務入口、RWD。",
    price: "5,000 元起",
    button: "看內容",
  },
  {
    id: "quiz-package",
    title: "互動工具",
    description: "測驗、診斷、表單 Demo。",
    price: "6,000 元起",
    button: "看內容",
  },
  {
    id: "line-reply",
    title: "LINE Bot 串接",
    description: "自動回覆、需求整理。",
    price: "8,000 元起",
    button: "看內容",
  },
  {
    id: "admin-flow",
    title: "後台流程 / API",
    description: "表單、案件、狀態同步。",
    price: "20,000 元起",
    button: "看內容",
  },
]

const serviceDetails = [
  {
    id: "website-fast",
    title: "網站製作",
    fit: "店家、工作室、工程服務、個人品牌。",
    includes: ["首頁或一頁式網站", "手機版 RWD", "LINE / IG / Google Map", "表單或聯絡按鈕", "基本 SEO 標題"],
    delivery: "可上線的網站頁面。",
    price: "5,000 元起",
    cta: "我想做網站",
  },
  {
    id: "quiz-package",
    title: "互動工具",
    fit: "教育訓練、課程複習、公司內訓、活動測驗。",
    includes: ["題目與選項", "答案解析", "結果頁", "圖片素材", "JSON / Google Sheet 題庫"],
    delivery: "可作答的測驗頁。",
    price: "6,000 元起",
    cta: "我想做測驗頁",
  },
  {
    id: "line-reply",
    title: "LINE Bot 串接",
    fit: "用 LINE 接客、預約或收需求的服務。",
    includes: ["FAQ 整理", "LINE Bot 回覆", "關鍵字回覆", "需求整理流程"],
    delivery: "可展示的回覆流程。",
    price: "8,000 元起",
    cta: "我想做 LINE 回覆",
  },
  {
    id: "admin-flow",
    title: "後台流程 / API",
    fit: "工程行、工作室、服務團隊。",
    includes: ["表單收件", "案件列表", "狀態管理", "資料後台", "API 串接"],
    delivery: "可追蹤資料與流程的後台。",
    price: "20,000 元起",
    cta: "我想做後台流程",
  },
]

const processSteps = [
  ["01", "確認方向", "先整理最接近的需求。"],
  ["02", "填需求", "提供服務類型、預算、時程。"],
  ["03", "確認報價", "確認頁數、功能與修改次數。"],
  ["04", "製作與修改", "先給初版，再依約修改。"],
  ["05", "上線交付", "部署網站，提供基本使用說明。"],
]

const fitItems = ["品牌網站", "活動頁", "互動工具", "LINE Bot", "表單收件", "API 串接", "後台流程", "AI 工具"]
const flowItems = ["網站入口", "表單需求", "LINE 接待", "資料同步", "案件管理", "報價回報", "AI 分析", "後台追蹤"]

const caseCards = [
  {
    title: "點餐系統",
    text: "客戶端點餐、服務端控單、桌況與廚房佇列。",
    action: "直接試用",
    to: "/works/restaurant-ordering",
    featured: true,
  },
  {
    title: "BuildFlow 工程行流程系統",
    text: "需求、報價、派工、回報與 LINE 查詢流程。",
    action: "查看案例",
    to: "/buildflow",
    featured: true,
  },
  {
    title: "互動測驗頁",
    text: "題目、答案解析、結果頁與題庫更新。",
    action: "查看範例",
    to: "/works/interactive-quiz",
  },
  {
    title: "LINE Bot / FAQ 回覆",
    text: "整理常見問題，協助自動回覆客人。",
    action: "查看說明",
    to: "/tools/linebot-mission#demo",
  },
  {
    title: "AI 技術任務",
    text: "技術展示 Demo，給想了解開發能力的人看。",
    action: "體驗 Demo",
    to: "https://ai-tech-quest.vercel.app",
  },
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <HeroSection />
      <CaseSection />
      <ServiceCardsSection />
      <ServiceDetailsSection />
      <ProcessSection />
      <FitSection />
      <FinalCta />
    </SiteLayout>
  )
}

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/40 bg-[#0f1d1e] bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(10,18,20,0.8), rgba(21,58,60,0.32) 45%, rgba(250,248,243,0.7)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(250,248,243,0.45))]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-6xl gap-5 px-4 py-10 md:grid-cols-[1fr_0.72fr] md:items-center md:py-16">
        <div className="rounded-lg border border-white/55 bg-white/28 p-6 shadow-2xl shadow-[#071113]/20 backdrop-blur-xl md:p-8">
          <p className="text-xs font-black text-white/82">Qingyu Web Studio</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2rem,8vw,4.35rem)] font-black leading-[1.08] text-white drop-shadow">
            網站、<span className="whitespace-nowrap">LINE Bot</span>、AI 工具與<span className="whitespace-nowrap">後台流程</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-white/82 md:text-base">
            漂亮網站，串接 LINE、AI、表單、API 與後台。
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a href="#cases" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22] shadow-lg shadow-[#071113]/10 hover:bg-[#f5f1e9]">
              查看案例
            </a>
            <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white shadow-lg shadow-[#071113]/10 hover:bg-[#26343b]">
              看服務能力
            </a>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/55 bg-white/18 px-5 text-sm font-black text-white backdrop-blur hover:bg-white/25">
              填需求表單
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-white/45 bg-white/22 p-4 shadow-2xl shadow-[#071113]/20 backdrop-blur-xl">
          <p className="px-2 text-xs font-black text-white/82">範例實作</p>
          <div className="mt-3 grid gap-2">
            {caseCards.map((item) => (
              <SmartLink key={item.title} to={item.to} className="group flex min-h-16 items-center justify-between rounded-lg border border-white/35 bg-white/38 px-4 text-sm font-black text-[#132123] shadow-sm backdrop-blur transition hover:bg-white/62">
                <span>
                  <span className="block">{item.title}</span>
                  <span className="mt-1 block text-xs font-bold text-[#4d5e5b]">{item.text}</span>
                </span>
                <span className="text-xs text-[#0d6b62] group-hover:text-[#083f3b]">{item.action}</span>
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCardsSection() {
  return (
    <section id="services" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="服務能力" title="從網站到流程系統" text="漂亮、清楚、可聯絡。" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg">
              <span className="inline-flex rounded-md bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">{item.price}</span>
              <h3 className="mt-4 text-2xl font-black text-[#111c22]">{item.title}</h3>
              <p className="mt-3 min-h-20 text-sm font-bold leading-7 text-[#52605c]">{item.description}</p>
              <span className="mt-5 inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                {item.button}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceDetailsSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="內容" title="服務能力內容" text="範圍短，報價清楚。" />
        <div className="grid gap-4 lg:grid-cols-2">
          {serviceDetails.map((item) => (
            <article id={item.id} key={item.id} className="scroll-mt-24 rounded-lg border border-[#e3ded3] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-[#111c22]">{item.title}</h3>
                  <p className="mt-2 text-sm font-black text-[#0d6b62]">{item.price}</p>
                </div>
                <Link to="/contact" className="inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                  {item.cta}
                </Link>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <DetailBlock title="適合誰" text={item.fit} />
                <DetailBlock title="交付內容" text={item.delivery} />
              </div>

              <div className="mt-5">
                <p className="text-sm font-black text-[#40504c]">包含什麼</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.includes.map((part) => (
                    <span key={part} className="rounded-md bg-[#eef7f4] px-3 py-2 text-xs font-black text-[#0d6b62]">
                      {part}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DetailBlock({ title, text }) {
  return (
    <div className="rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-4">
      <p className="text-sm font-black text-[#0d6b62]">{title}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
    </div>
  )
}

function ProcessSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="流程" title="合作流程" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map(([step, title, text]) => (
            <article key={step} className="rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-5">
              <p className="text-xs font-black text-[#0d6b62]">{step}</p>
              <h3 className="mt-2 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-lg border border-[#e3ded3] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5f4a2a]">
          維護與新增功能另談。
        </p>
      </div>
    </section>
  )
}

function FitSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="流程串接" title="可以怎麼接？" text="網站入口，串 LINE、表單、API、後台。" />
        <div className="grid gap-5 md:grid-cols-2">
          <FitList title="服務入口" items={fitItems} />
          <FitList title="流程能力" items={flowItems} />
        </div>
      </div>
    </section>
  )
}

function FitList({ title, items, muted = false }) {
  return (
    <article className={`rounded-lg border p-5 ${muted ? "border-[#e0d6c7] bg-white" : "border-[#0d6b62] bg-white"}`}>
      <h3 className="text-2xl font-black">{title}</h3>
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

function CaseSection() {
  return (
    <section id="cases" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="範例" title="先看實作" text="看畫面，不看長文。" />
        <div className="grid gap-4 md:grid-cols-2">
          {caseCards.map((item) => (
            <SmartLink
              key={item.title}
              to={item.to}
              className={`rounded-lg border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                item.featured ? "border-[#0d6b62] bg-[#111c22] text-white" : "border-[#e3ded3] bg-[#faf8f3] text-[#111c22]"
              }`}
            >
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className={`mt-3 text-sm font-bold leading-7 ${item.featured ? "text-white/72" : "text-[#52605c]"}`}>{item.text}</p>
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

function FinalCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black text-[#8fd6cc]">下一步</p>
          <h2 className="mt-3 text-3xl font-black">看完範例，再填需求。</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">
            填需求，我先幫你整理適合的做法。
          </p>
        </div>
        <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-black text-[#111c22]">
          填需求表單
        </Link>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-xs font-black text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.6rem,5vw,3rem)] font-black">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
