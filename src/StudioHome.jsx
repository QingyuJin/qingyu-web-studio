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
    subtitle: "工程行接案與派工管理系統",
    to: "/buildflow",
    action: "打開系統",
    items: ["案件", "報價", "派工", "LINE 查詢"],
    featured: true,
  },
  {
    title: "工程行網站案例",
    subtitle: "工程服務網站與估價入口",
    to: "/contractor-site",
    action: "看網站",
    items: ["服務頁", "案例", "估價表單"],
  },
  {
    title: "LINE Bot / 自動回覆",
    subtitle: "店家訊息接待與後台同步 Demo",
    to: "/tools/linebot-mission#demo",
    action: "看 Demo",
    items: ["LINE 對話", "自動回覆", "後台"],
  },
  {
    title: "網站救援 Demo",
    subtitle: "直接看網站改善前後的互動展示",
    to: "/tools/website-rescue#demo",
    action: "看 Demo",
    items: ["CTA", "SEO", "手機版"],
  },
  {
    title: "AI 技術任務",
    subtitle: "文件問答、模型分類、店家 AI 助手",
    to: "https://ai-tech-quest.vercel.app",
    action: "去玩",
    items: ["RAG", "ML", "AI 助手"],
  },
  {
    title: "找我做",
    subtitle: "有想做的網站、LINE Bot 或小系統，直接留言",
    to: "/contact",
    action: "聯絡我",
    items: ["需求", "預算", "上線時間"],
  },
]

const problemCards = [
  {
    title: "我要做網站",
    fit: "適合小店、工作室、個人品牌。",
    detail: "一頁式網站、手機版 RWD、LINE / IG / Google Map、表單收單、基本 SEO。",
    to: "/services",
  },
  {
    title: "我要做互動測驗",
    fit: "適合教育訓練、補習班、課程、公司內訓、活動測驗。",
    detail: "題目頁、選項作答、答案解析、結果頁、圖片素材、JSON / Google Sheet 題庫、手機版 RWD。",
    to: "/works/interactive-quiz",
  },
  {
    title: "我要自動回覆客人",
    fit: "適合常被問營業時間、價目表、預約方式的店家。",
    detail: "FAQ 助手、LINE Bot、自動回覆、問題紀錄。",
    to: "/tools/linebot-mission#demo",
  },
  {
    title: "我要整理接案流程",
    fit: "適合工程行、水電、防水、裝修、維修服務團隊。",
    detail: "需求表單、案件列表、狀態管理、報價紀錄、派工回報、LINE 查詢、小型後台。",
    to: "/buildflow",
  },
]

const pricePlans = [
  ["一頁式網站", "5,000 元起", "適合個人品牌、小店開張、活動頁，需要清楚介紹服務與聯絡方式。"],
  ["店家網站", "8,000 元起", "適合需要服務介紹、案例、地圖、LINE / IG 入口與表單收單的店家。"],
  ["舊站優化 / 手機版調整", "3,000 元起", "適合已有網站，但手機不好讀、CTA 不明顯、內容需要整理。"],
  ["互動測驗頁基本版", "6,000 元起", "適合課程測驗、活動問答、教育訓練或簡單結果頁。"],
  ["Google Sheet 題庫測驗版", "10,000 元起", "適合題目會更新、想用表格維護題庫的測驗頁。"],
  ["LINE Bot / FAQ 自動回覆", "8,000 元起", "適合常被問營業時間、價目表、預約方式與課程資訊的店家。"],
  ["小型後台", "20,000 元起", "適合需要管理資料、案件、FAQ、表單收件或簡單狀態的團隊。"],
  ["接案流程系統", "30,000 元起", "適合工程行、維修、裝修等需要需求、報價、派工與回報流程的服務業。"],
  ["月維護", "800 元起", "適合需要小修改、上線後協助、備份檢查或第三方服務設定支援的專案。"],
]

const caseCards = [
  {
    title: "BuildFlow",
    label: "案例：工程行接案與派工管理系統",
    text: "工程行需求、報價、派工、回報、LINE 查詢整合案例。",
    to: "/buildflow",
    action: "查看 BuildFlow",
    primary: true,
  },
  {
    title: "互動測驗頁",
    label: "教育訓練與測驗題庫網頁",
    text: "可做題目、選項、答案解析、結果頁，題庫可用 JSON、Google Sheet 或簡易後台維護。",
    to: "/works/interactive-quiz",
    action: "查看測驗規劃",
  },
  {
    title: "互動式技術展示：AI 技術任務",
    label: "AI 技術展示 Demo",
    text: "展示文件問答、模型分類、店家 AI 助手與產品展示室。",
    to: "https://ai-tech-quest.vercel.app",
    action: "體驗 Demo",
  },
  {
    title: "店家 AI 助手",
    label: "小型店家 FAQ 與自動回覆產品",
    text: "把常見問題、預約方式與價目表整理成可回覆流程。",
    to: "https://ai-tech-quest.vercel.app/missions/business",
    action: "看助手 Demo",
  },
  {
    title: "繁體中文文件問答系統",
    label: "文件檢索增強生成（RAG）文件查詢產品",
    text: "支援來源引用、文件查詢與不知道就回答不知道的回答方式。",
    to: "https://ai-tech-quest.vercel.app/missions/rag",
    action: "看 RAG Demo",
  },
]

const workSteps = [
  ["01", "初步討論需求", "先確認你要做網站、測驗頁、自動回覆，還是小型後台。"],
  ["02", "確認範圍與報價", "把頁數、功能、資料整理程度、上線時間先講清楚。"],
  ["03", "製作初版畫面", "先做能看的版本，讓你確認方向和使用流程。"],
  ["04", "修改 1～2 次", "依討論範圍調整文案、版面、流程與小問題。"],
  ["05", "上線交付", "部署到 Vercel 或約定平台，提供基本操作說明。"],
  ["06", "後續維護另談", "新增功能、第三方 API、主機或瀏覽器政策變動，會另外討論維護方式。"],
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

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_0.82fr] md:items-center md:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-4xl text-[clamp(2rem,8vw,4rem)] font-black leading-[1.06] tracking-tight">
              我幫小型店家、工作室與團隊，把網站、表單、LINE、自動回覆和後台流程整理成能用的系統。
            </h1>
            <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
              從一頁式網站、互動測驗頁、LINE Bot，到接案表單與小型後台，適合預算有限但想要穩定上線的小型專案。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
                看服務與價格
              </a>
              <a href="#cases" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                查看作品案例
              </a>
              <SmartLink to="https://ai-tech-quest.vercel.app" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                體驗技術展示
              </SmartLink>
            </div>
          </div>
          <div className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
            <p className="text-sm font-black text-[#0d6b62]">你可以直接看</p>
            <div className="mt-4 grid gap-3">
              {artifactTiles.slice(0, 4).map((tile) => (
                <SmartLink key={tile.title} to={tile.to} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm font-black text-[#111c22] hover:text-[#0d6b62]">
                  <span>{tile.title}</span>
                  <span className="text-xs text-[#0d6b62]">{tile.action}</span>
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProblemSection />
      <PricingSection />
      <CaseSection />
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
        <SectionHeading eyebrow="先看需求" title="你想解決什麼問題？" text="不用先懂技術，從你現在卡住的事情開始選。" />
        <div className="grid gap-4 md:grid-cols-2">
          {problemCards.map((card) => (
            <SmartLink key={card.title} to={card.to} className="rounded-xl border border-[#e3ded3] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg">
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

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="服務與參考價格"
          title="小型專案參考價"
          text="以下為早期合作參考價，實際依頁數、功能、資料整理程度與維護需求調整。"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricePlans.map(([name, price, text]) => (
            <article key={name} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
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
        <SectionHeading eyebrow="作品案例" title="先看我做過或已規劃好的成品" text="排序依照接案展示優先：先看商業流程，再看測驗頁與技術展示。" />
        <div className="grid gap-4 lg:grid-cols-2">
          {caseCards.map((item) => (
            <SmartLink
              key={item.title}
              to={item.to}
              className={`rounded-xl border p-5 transition hover:-translate-y-0.5 hover:shadow-lg ${
                item.primary ? "border-[#0d6b62] bg-[#111c22] text-white" : "border-[#e3ded3] bg-white text-[#111c22]"
              }`}
            >
              <p className={`text-xs font-black uppercase tracking-[0.18em] ${item.primary ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{item.label}</p>
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
        <SectionHeading eyebrow="合作流程" title="怎麼開始合作" text="範圍先講清楚，先做初版，再修改與上線。" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workSteps.map(([step, title, text]) => (
            <article key={step} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
              <p className="text-xs font-black text-[#0d6b62]">{step}</p>
              <h3 className="mt-2 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-[#e3ded3] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5f4a2a]">
          錯誤修正與新增功能不同，第三方 API、主機、瀏覽器政策變動造成的問題會另外討論維護方式。
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
    <article className={`rounded-xl border p-5 ${muted ? "border-[#e0d6c7] bg-white" : "border-[#0d6b62] bg-white"}`}>
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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">下一步</p>
          <h2 className="mt-3 text-3xl font-black">你可以先丟一個想法，我幫你整理成可做範圍。</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">
            告訴我你是什麼產業、想做什麼、預算大概多少、希望什麼時候上線。
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
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.6rem,5vw,3rem)] font-black tracking-tight">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
