import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"

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
const pathCards = [
  {
    title: "我要做網站",
    text: "適合小店、工作室、個人品牌。",
    detail: "一頁式網站、手機版 RWD、LINE / IG / Google Map、表單收單。",
    to: "/services",
    label: "看網站服務",
    preview: ["一頁式網站", "手機版 RWD", "表單收單"],
  },
  {
    title: "我要自動回覆客人",
    text: "適合常被問營業時間、價目表、預約方式的店家。",
    detail: "FAQ 助手、LINE Bot、自動回覆、問題紀錄。",
    to: "/tools/linebot-mission#demo",
    label: "看自動回覆 Demo",
    preview: ["FAQ 助手", "LINE Bot", "問題紀錄"],
  },
  {
    title: "我要整理接案流程",
    text: "適合工程行、水電、防水、裝修、維修服務團隊。",
    detail: "需求表單、報價、派工、師傅回報、後台、LINE 查詢。",
    to: "/buildflow",
    label: "看 BuildFlow 案例",
    preview: ["需求表單", "報價派工", "LINE 查詢"],
  },
  {
    title: "我要展示專題或作品",
    text: "適合學生專題、AI 專案、求職作品集。",
    detail: "互動式 Demo、作品集網站、GitHub README、AI / ML / RAG 展示頁。",
    to: "https://ai-tech-quest.vercel.app",
    label: "體驗 AI 技術任務",
    preview: ["互動 Demo", "作品集網站", "技術展示"],
  },
]

const interactiveDemos = [
  {
    slug: "ai-tech-quest",
    title: "互動式技術展示：AI 技術任務",
    label: "技術展示 Demo",
    summary: "展示文件問答、模型分類、店家 AI 助手與全端開發能力的互動 Demo。",
    livePath: "https://ai-tech-quest.vercel.app",
    techPath: "https://github.com/QingyuJin/ai-tech-quest",
    liveLabel: "線上實測",
    techLabel: "GitHub 原始碼",
    tone: "quest",
  },
  {
    slug: "website-rescue",
    title: "網站救援互動展示",
    label: "網站救援",
    summary: "點選改善項目，查看網站狀態變化。",
    livePath: "/tools/website-rescue#demo",
    techPath: "/tools/website-rescue#tech",
    liveLabel: "開始體驗",
    tone: "rescue",
  },
  {
    slug: "linebot-mission",
    title: "LINE Bot 接待模擬",
    label: "LINE Bot 接待",
    summary: "模擬 LINE 客戶訊息與後台同步。",
    livePath: "/tools/linebot-mission#demo",
    techPath: "/tools/linebot-mission#tech",
    liveLabel: "開始體驗",
    tone: "line",
  },
]


const featuredProducts = [
  {
    name: "BuildFlow",
    label: "工程行案例",
    description: "案例：工程行接案與派工管理系統。工程行需求、報價、派工、回報、LINE 查詢整合案例。",
    facts: [
      {
        title: "問題",
        text: "工程案常散在 LINE、口頭、Excel、紙本，老闆很難追需求、報價、派工與現場回報。",
      },
      {
        title: "解法",
        text: "建立前台需求表單、後台案件管理、派工回報與 LINE Bot 查詢流程。",
      },
      {
        title: "適合",
        text: "工程行、防水、水電、裝修、維修服務團隊。",
      },
    ],
    tech: ["全端開發（Full-stack）", "Supabase MVP 後端", "LINE Bot 流程整合"],
    links: [
      { label: "查看 BuildFlow", to: "/buildflow", primary: true },
      { label: "GitHub 原始碼", to: "https://github.com/QingyuJin/qingyu-web-studio" },
    ],
    preview: ["需求表單", "報價流程", "派工回報", "LINE 查詢"],
  },
  {
    name: "互動式技術展示：AI 技術任務",
    label: "技術展示 Demo",
    description: "這是我用來展示 AI 文件問答、模型分類、店家助手與全端開發能力的互動 Demo。適合想了解我技術能力的客戶、團隊與面試官。",
    facts: [
      {
        title: "這是什麼產品",
        text: "互動式 AI 技術展示 Demo，展示文件問答、模型分類、店家 AI 助手與產品展示室。",
      },
      {
        title: "誰會用",
        text: "想了解技術能力的客戶、團隊、面試官與需要 Demo 包裝的專題團隊。",
      },
      {
        title: "可以怎麼變現",
        text: "可延伸成互動式作品集、教育訓練展示、AI Demo 展示站與技術提案頁。",
      },
    ],
    tech: ["文件檢索增強生成（RAG）", "模型評估（Model Evaluation）", "全端開發（Full-stack）"],
    links: [
      { label: "立即體驗", to: "https://ai-tech-quest.vercel.app", primary: true },
      { label: "GitHub 原始碼", to: "https://github.com/QingyuJin/ai-tech-quest" },
    ],
    preview: ["文件問答", "模型分類", "店家 AI 助手", "產品展示室"],
  },
  {
    name: "店家 AI 助手",
    label: "接案變現產品",
    description: "小型店家 FAQ 與自動回覆產品，可延伸成 LINE Bot、補習班 FAQ 助手、工作室客服系統。",
    facts: [
      {
        title: "這是什麼產品",
        text: "把常見問答、預約方式、價目表與店家規則整理成可管理、可查詢的回覆流程。",
      },
      {
        title: "解決什麼問題",
        text: "減少重複回覆與漏訊息，讓店家在忙碌時也能維持一致的顧客服務。",
      },
      {
        title: "可以怎麼變現",
        text: "可做成 LINE Bot 建置案、FAQ 後台、客服知識庫與每月維護服務。",
      },
    ],
    tech: ["語意向量（Embedding）", "向量搜尋（Vector Search）", "店家自動化（Business Automation）"],
    links: [
      { label: "查看規劃", to: "/works/linebot#demo", primary: true },
      { label: "了解服務", to: "/contact" },
    ],
    preview: ["FAQ 後台", "自動回覆", "LINE Bot", "客服知識庫"],
  },
  {
    name: "繁體中文文件問答系統",
    label: "文件查詢產品",
    description: "文件檢索增強生成（RAG）文件查詢產品，支援來源引用、文件搜尋與不知道就回答不知道的安全回覆流程。",
    facts: [
      {
        title: "這是什麼產品",
        text: "把 PDF、課程資料、公司文件或活動規範變成可查詢的問答系統。",
      },
      {
        title: "誰會用",
        text: "補習班、學生團隊、小公司、工程行、文件很多的工作室。",
      },
      {
        title: "可以怎麼變現",
        text: "可包裝成文件客服、內部知識庫、補習班 FAQ 與專案資料查詢工具。",
      },
    ],
    tech: ["文件檢索增強生成（RAG）", "語意向量（Embedding）", "向量搜尋（Vector Search）"],
    links: [
      { label: "查看 Demo", to: "https://ai-tech-quest.vercel.app/missions/rag", primary: true },
      { label: "了解服務", to: "/contact" },
    ],
    preview: ["文件上傳", "來源引用", "安全回覆", "簡易評測"],
  },
  {
    name: "Unity AI 學習關卡",
    label: "互動式學習展示",
    description: "用 Unity 做互動式學習任務，讓學生透過拖拉、試錯與 AI 提示理解抽象概念。",
    facts: [
      {
        title: "這是什麼產品",
        text: "互動式學習展示，第一個規劃關卡是 Digital Logic Gate Lab。",
      },
      {
        title: "誰會用",
        text: "需要展示教材、專題、教育產品或互動式訓練流程的團隊。",
      },
      {
        title: "可以怎麼變現",
        text: "可延伸成教學關卡、展場互動展示、WebGL Demo 與教育訓練產品。",
      },
    ],
    tech: ["Unity 2D", "C#", "WebGL Build"],
    links: [
      { label: "查看規劃", to: "/works", primary: true },
      { label: "聯絡討論", to: "/contact" },
    ],
    preview: ["拖拉互動", "AI 提示", "關卡設計", "WebGL"],
  },
]
const serviceCards = [
  {
    title: "網站與表單",
    text: "把服務介紹、手機版頁面、LINE / IG / Google Map 與表單收單整理好。",
    examples: ["一頁式網站", "手機版 RWD", "表單收單"],
  },
  {
    title: "自動回覆與 LINE Bot",
    text: "把 FAQ、預約、價格與常見問題變成可回覆流程。",
    examples: ["LINE Bot", "網站客服", "FAQ 後台"],
  },
  {
    title: "接案流程後台",
    text: "把案件、報價、派工與 LINE 回報整理成可追蹤流程。",
    examples: ["案件狀態", "Supabase", "LINE 回報"],
  },
  {
    title: "作品與專題展示",
    text: "把 AI、ML、RAG 或作品集做成可試用、可展示、可部署的 Demo。",
    examples: ["互動 Demo", "GitHub README", "Vercel"],
  },
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid min-h-[calc(76svh-56px)] max-w-6xl gap-8 px-4 py-9 md:min-h-0 md:grid-cols-[1fr_0.78fr] md:items-center md:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-3xl text-[clamp(1.75rem,8vw,2rem)] font-black leading-[1.1] tracking-tight md:text-[clamp(2.35rem,5vw,4rem)] md:leading-[1.08]">
              我幫你做出能真正使用的網站與 AI 工具
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-lg md:leading-8">
              適合小型店家、工作室、工程行與個人品牌。從網站、LINE Bot、自動回覆，到接案流程與小型後台，把零散需求整理成清楚可用的系統。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
                看服務方案
              </Link>
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                查看作品案例
              </Link>
              <SmartLink to="https://ai-tech-quest.vercel.app" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                體驗 AI 技術任務
              </SmartLink>
            </div>
          </div>
          <div className="hidden md:block">
            <HeroMockup />
          </div>
        </div>
      </section>

      <PathNavigation />
      <FeaturedProducts />
      <InteractiveLab />
      <CompleteCase />
      <ServiceAbility />
      <ContactCta />
    </SiteLayout>
  )
}


function FeaturedProducts() {
  return (
    <section id="featured-products" className="scroll-mt-20 border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="主打產品"
          title="主打案例與產品入口"
          text="先看可落地的商業流程案例，再看 AI 技術任務與可延伸的自動化產品。"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <article key={product.name} className={`rounded-2xl border p-5 shadow-sm ${index === 0 ? "border-[#0d6b62] bg-white shadow-[#0d6b62]/10" : "border-[#e3ded3] bg-white"}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{product.label}</span>
                <span className="text-xs font-black text-[#8b5a25]">0{index + 1}</span>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-[#111c22]">{product.name}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{product.description}</p>

              <div className="mt-5 grid gap-3">
                {product.facts.map((fact) => (
                  <ProductInfo key={fact.title} title={fact.title} text={fact.text} />
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.tech.map((item) => (
                  <span key={item} className="rounded-md bg-[#111c22] px-2.5 py-1 text-xs font-black text-white">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-3">
                <p className="text-xs font-black text-[#0d6b62]">線上展示會看到</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {product.preview.map((item) => (
                    <span key={item} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-[#40504c]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {product.links.map((link) => (
                  <SmartLink
                    key={link.label}
                    to={link.to}
                    className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 text-sm font-black ${link.primary ? "bg-[#111c22] text-white hover:bg-[#26343b]" : "border border-[#cfd7d3] bg-white text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]"}`}
                  >
                    {link.label}
                  </SmartLink>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductInfo({ title, text }) {
  return (
    <div className="rounded-xl border border-[#e3ded3] bg-white px-3 py-3">
      <p className="text-xs font-black text-[#0d6b62]">{title}</p>
      <p className="mt-1 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
    </div>
  )
}
function PathNavigation() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <SectionHeading eyebrow="開始選擇" title="你想解決什麼問題？" text="不用先懂技術，先從你遇到的問題開始看適合的做法。" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {pathCards.map((card) => (
            <SmartLink
              key={card.title}
              to={card.to}
              className="group rounded-xl border border-[#e3ded3] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg"
            >
              <div className="mb-4 grid grid-cols-2 gap-2">
                {card.preview.map((item) => (
                  <span key={item} className="rounded-lg bg-[#faf8f3] px-3 py-2 text-[11px] font-black text-[#40504c]">
                    {item}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-black text-[#111c22]">{card.title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{card.text}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-[#697572]">{card.detail}</p>
              <span className="mt-4 inline-flex text-sm font-black text-[#0d6b62]">{card.label}</span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function InteractiveLab() {
  return (
    <section id="interactive-lab" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="互動實驗室"
          title="互動實驗室"
          text="先從主打 AI 技術任務開始，再延伸到網站救援、LINE Bot 與流程自動化展示。"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {interactiveDemos.map((demo) => (
            <InteractiveDemoCard key={demo.slug} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CompleteCase() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.82fr_1.18fr] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">完整案例</p>
          <h2 className="mt-3 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-tight md:text-[clamp(2rem,6vw,3.2rem)]">從網站詢價到後台管理</h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#52605c]">
            以工程行情境展示案件、報價、照片、施工狀態與 LINE 回報流程。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/works/buildflow#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看 BuildFlow
            </Link>
            <Link to="/works/xinjiang" className="hidden min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] md:inline-flex">
              查看鑫匠案例
            </Link>
          </div>
        </div>
        <BuildFlowCaseMockup />
      </div>
    </section>
  )
}

function ServiceAbility() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="接案服務"
            title="可以委託我做什麼"
            text="從店家自動回覆、文件問答到後台流程，先做出可試用版本，再依資料與流程逐步升級。"
          />
          <Link to="/services" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
            查看服務細節
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((service) => (
            <article key={service.title} className="rounded-xl border border-[#e3ded3] bg-white p-5">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[#eef7f4] text-sm font-black text-[#0d6b62]">
                AI
              </div>
              <h3 className="text-lg font-black">{service.title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{service.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.examples.map((item) => (
                  <span key={item} className="rounded-md bg-[#faf8f3] px-2.5 py-1 text-xs font-black text-[#40504c]">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">聯絡</p>
          <h2 className="mt-3 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-tight md:text-[clamp(2rem,6vw,3.2rem)]">想做網站、LINE Bot、AI 工具或小系統？</h2>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-white/70">
            可以先聊聊方向，我會幫你判斷適合哪一種做法。
          </p>
        </div>
        <div className="grid gap-3">
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22] hover:bg-[#f3efe7]">
            聯絡我
          </Link>
          <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-5 text-sm font-black text-white hover:bg-white/10">
            開始需求診斷
          </Link>
          <a href={`mailto:${contact.email}`} className="text-sm font-black text-white/70 hover:text-white">
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-tight md:text-[clamp(2rem,6vw,3.2rem)]">{title}</h2>
      {text ? <p className="mt-3 line-clamp-2 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

function InteractiveDemoCard({ demo }) {
  return (
    <article className="group overflow-hidden rounded-[1.65rem] border border-[#ded8cb] bg-white shadow-xl shadow-[#111c22]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#111c22]/10">
      <div className="grid gap-0 md:grid-cols-[1.02fr_0.98fr]">
        <div className="p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{demo.label}</p>
          <h3 className="mt-3 text-xl font-black tracking-tight md:text-3xl">{demo.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#52605c]">{demo.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SmartLink to={demo.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
              {demo.liveLabel}
            </SmartLink>
            <SmartLink to={demo.techPath} className="hidden min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62] md:inline-flex">
              {demo.techLabel || "技術拆解"}
            </SmartLink>
          </div>
        </div>
        <div className="min-h-48 bg-[#111c22] p-4 text-white md:min-h-80 md:p-5">
          {demo.tone === "quest" ? <AiQuestPreview /> : demo.tone === "rescue" ? <WebsiteRescuePreview /> : <LineMissionPreview />}
        </div>
      </div>
    </article>
  )
}
function AiQuestPreview() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">AI 任務</span>
        <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b171b]">5 個任務</span>
      </div>
      <div className="mt-5 grid gap-3">
        {["文件問答調查員", "模型分類挑戰", "店家 AI 助手"].map((item, index) => (
          <div key={item} className="rounded-xl bg-white p-3 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-[#0d6b62]">關卡 {index + 1}</p>
              <span className="h-2 w-16 rounded-full bg-[#dce7e2]">
                <span className="block h-full rounded-full bg-[#0d6b62]" style={{ width: `${58 + index * 14}%` }} />
              </span>
            </div>
            <p className="mt-2 text-sm font-black">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-black text-white/78">
        Vercel 實測版已上線，可從主站直接開啟。
      </div>
    </div>
  )
}
function WebsiteRescuePreview() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">網站狀態</span>
        <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b171b]">○v○ 82</span>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-4 text-[#111c22]">
        <div className="flex items-center justify-between">
          <div className="h-3 w-2/3 rounded-full bg-[#111c22]" />
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">CTA</span>
        </div>
        <div className="mt-3 h-2 w-1/2 rounded-full bg-[#d8d2c5]" />
        <div className="mt-5 grid gap-2">
          <div className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-3">
            <p className="text-xs font-black text-[#0d6b62]">改善項目</p>
            <div className="mt-2 h-2 rounded-full bg-[#dce7e2]">
              <div className="h-full w-[82%] rounded-full bg-[#0d6b62]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-black text-[#40504c]">
            <span className="rounded-lg bg-[#eef7f4] px-3 py-2">LINE 入口</span>
            <span className="rounded-lg bg-[#eef7f4] px-3 py-2">SEO 摘要</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-black text-white/80">
        {["預覽", "修正", "報告"].map((item) => (
          <span key={item} className="rounded-lg bg-white/10 py-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function LineMissionPreview() {
  return (
    <div className="grid h-full gap-3 sm:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3">
        <div className="rounded-[1.15rem] bg-[#e9f7ef] p-3 text-[#10201c]">
          <div className="mb-3 flex justify-center">
            <span className="rounded-full bg-[#08bf5b] px-3 py-1 text-[11px] font-black text-white">LINE</span>
          </div>
          <div className="grid gap-2 text-[11px] font-black">
            <div className="rounded-2xl bg-white px-3 py-2">想做預約功能</div>
            <div className="ml-auto rounded-2xl bg-[#9bf4b6] px-3 py-2">我先整理需求</div>
            <div className="rounded-2xl bg-white px-3 py-2">需要菜單查詢</div>
          </div>
        </div>
      </div>
      <div className="grid content-between gap-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between text-xs font-black">
            <span>自動處理率</span>
            <span className="text-[#8fd6cc]">82%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/15">
            <div className="h-full w-[82%] rounded-full bg-[#8fd6cc]" />
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 text-[#111c22]">
          <p className="text-xs font-black text-[#0d6b62]">後台案件</p>
          <p className="mt-2 text-sm font-black">店家 LINE Bot 需求</p>
          <p className="mt-1 text-xs font-bold text-[#52605c]">狀態：已整理</p>
        </div>
      </div>
    </div>
  )
}

function BuildFlowCaseMockup() {
  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-white p-4 shadow-xl shadow-[#111c22]/8">
      <div className="rounded-[1.35rem] bg-[#111c22] p-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">BuildFlow 後台</p>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">施工中</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-2">
            {["BF-001 屋頂防水", "BF-002 地坪修繕", "BF-003 外牆補漏"].map((item, index) => (
              <div key={item} className={`rounded-xl px-3 py-3 text-xs font-black ${index === 0 ? "bg-[#8fd6cc] text-[#0b2724]" : "bg-white/10 text-white/78"}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black">鑫匠工程案例</p>
              <span className="text-xs font-black text-[#0d6b62]">75%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-3/4 rounded-full bg-[#0d6b62]" />
            </div>
            <div className="mt-4 grid gap-2 text-xs font-black text-[#52605c]">
              <span>報價單預覽</span>
              <span>LINE 回報已同步</span>
              <span>現場照片 3 張</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="rounded-[1.75rem] border border-[#e3ded3] bg-[#faf8f3] p-3 shadow-2xl shadow-[#111c22]/10 md:p-4">
      <div className="overflow-hidden rounded-[1.35rem] border border-[#d8d2c5] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee9df] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4a2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
          </div>
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">數位流程</span>
        </div>
        <div className="grid gap-3 p-4">
          {[
            ["被看到", "網站 / SEO"],
            ["被詢問", "表單 / LINE"],
            ["留下需求", "AI / API"],
            ["後台管理", "管理介面"],
            ["回覆客戶", "LINE / Email"],
          ].map(([title, text], index) => (
            <div key={title} className={`rounded-2xl p-4 ${index === 3 ? "bg-[#111c22] text-white" : "border border-[#eee9df] bg-[#faf8f3]"}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{title}</p>
                <span className={`rounded-full px-3 py-1 text-[11px] font-black ${index === 3 ? "bg-white/10 text-[#8fd6cc]" : "bg-white text-[#0d6b62]"}`}>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudioHome
