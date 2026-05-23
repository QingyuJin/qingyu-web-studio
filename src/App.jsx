import { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"
import ServiceDemo from "./ServiceDemo"
import BriefPage from "./BriefPage"
import LumaNailDemo from "./LumaNailDemo"

const primaryCases = [
  {
    title: "預約制工作室網站",
    subtitle: "Beauty / Local Studio",
    problem: "客人常在 IG 私訊詢問價格、作品、地址、預約流程，資訊分散在貼文和限動裡。",
    solution:
      "把服務價格、作品展示、預約流程、FAQ、LINE / IG / Google Map 整理成一頁式網站。",
    link: "/luma-nail",
    color: "from-[#f4c7b8] via-[#b58a79] to-[#2f2723]",
    tags: ["服務價格", "作品展示", "預約流程", "LINE / IG"],
  },
  {
    title: "服務型網站",
    subtitle: "Service / Consultant",
    problem: "客戶不知道你提供哪些服務、方案差異在哪、怎麼聯絡，也不清楚合作流程。",
    solution:
      "整理服務模組、方案比較、製作流程、需求確認表與聯絡 CTA，讓訪客快速理解服務。",
    link: "/service-demo",
    color: "from-cyan-400 via-blue-500 to-violet-600",
    tags: ["服務介紹", "方案比較", "需求表", "CTA"],
  },
  {
    title: "個人作品集網站",
    subtitle: "Portfolio / Resume",
    problem: "作品散落在雲端、IG、簡報或 PDF 裡，對方很難快速看懂你的能力與經歷。",
    solution:
      "整理個人介紹、技能、作品案例、經歷與聯絡方式，做成可放履歷或社群的作品集網站。",
    link: "/portfolio-demo",
    color: "from-stone-200 via-stone-500 to-stone-950",
    tags: ["作品展示", "經歷整理", "技能", "聯絡"],
  },
]

const secondaryWorks = [
  {
    title: "咖啡店一頁式網站",
    desc: "餐飲、小店與生活風格品牌的補充案例。",
    link: "/cafe-demo",
  },
  {
    title: "活動宣傳頁",
    desc: "社團活動、講座、營隊、工作坊與報名頁補充案例。",
    link: "/event-demo",
  },
]

const clientProblems = [
  {
    title: "只有 IG，資訊很散",
    desc: "服務、價格、地址、預約流程都在不同貼文裡，客人要自己翻資料。",
  },
  {
    title: "AI 生得出畫面，但不知道怎麼上線",
    desc: "常卡在路由、RWD、部署、表單、社群連結、後續修改與檔案管理。",
  },
  {
    title: "手機版不好讀",
    desc: "很多客戶其實都從手機點進來，手機版排版比桌機版更重要。",
  },
  {
    title: "需求還不清楚",
    desc: "不知道要放哪些內容、哪些功能必要、哪些只是增加成本。",
  },
]

const deliverables = [
  "React / Vite 前端頁面",
  "RWD 手機版排版",
  "Vercel 部署上線",
  "GitHub 原始碼管理",
  "LINE / IG / Email 連結",
  "Google Map 整合",
  "Google Form / 報名連結",
  "基本 SEO meta",
  "社群分享 OGP 設定建議",
  "自訂網域設定協助",
  "Google Search Console 設定建議",
  "簡易修改與交付說明",
]

const growthSetups = [
  {
    title: "基本 SEO Meta",
    desc: "協助設定網站標題、描述、關鍵頁面文字，讓搜尋引擎更容易理解網站內容。",
    tag: "Search",
  },
  {
    title: "社群分享 OGP",
    desc: "設定網站被分享到 LINE、Facebook、Threads 時顯示的標題、描述與預覽圖方向。",
    tag: "Share",
  },
  {
    title: "Google Search Console",
    desc: "可協助提供搜尋收錄設定建議，讓網站有機會被 Google 正確索引。",
    tag: "Index",
  },
  {
    title: "Google Analytics",
    desc: "可依需求協助加入流量追蹤，了解訪客來源、瀏覽行為與常被點擊的頁面。",
    tag: "Track",
  },
  {
    title: "LINE / IG / Email CTA",
    desc: "把訪客導向最重要的聯絡入口，讓網站不只是展示，而是能促成聯絡。",
    tag: "Contact",
  },
  {
    title: "Google Map / 商家連結",
    desc: "適合店家與工作室，把 Google 商家、地圖、社群連結集中整理。",
    tag: "Local",
  },
]

const launchKit = [
  {
    title: "手機版檢查",
    desc: "確認標題、段落、圖片、按鈕與聯絡入口在手機上是否好讀、好點、不卡住。",
    items: ["標題層級", "按鈕大小", "圖片裁切", "手機閱讀順序"],
  },
  {
    title: "聯絡入口檢查",
    desc: "確認網站能不能把訪客導向真正重要的下一步，例如 LINE、IG、Email、Map 或表單。",
    items: ["LINE", "Instagram", "Email", "Google Map"],
  },
  {
    title: "分享與搜尋基礎",
    desc: "整理網站標題、描述、社群分享預覽與 canonical URL，讓網站更像正式上線頁面。",
    items: ["Title", "Description", "OGP", "Canonical"],
  },
  {
    title: "流量追蹤建議",
    desc: "可依需求提供 GA4 事件追蹤方向，例如 LINE、IG、表單、Email、Map 點擊。",
    items: ["LINE click", "IG click", "Form click", "Map click"],
  },
  {
    title: "Google 商家 / 地圖整理",
    desc: "適合店家與工作室，把 Google 商家、地圖、營業資訊與網站連結關係整理清楚。",
    items: ["Google Map", "Business Profile", "營業時間", "地址"],
  },
  {
    title: "交付說明",
    desc: "提供網站連結、原始碼、部署方式與後續修改方式，避免客戶拿到網站後不知道怎麼維護。",
    items: ["網站連結", "GitHub", "Vercel", "修改說明"],
  },
]

const techStack = [
  {
    name: "React",
    desc: "前端頁面與元件化結構。",
  },
  {
    name: "Vite",
    desc: "輕量快速的前端開發環境。",
  },
  {
    name: "Tailwind CSS",
    desc: "RWD 排版與介面樣式。",
  },
  {
    name: "Git / GitHub",
    desc: "版本管理與程式碼交付。",
  },
  {
    name: "Vercel",
    desc: "網站部署與公開網址。",
  },
  {
    name: "Forms / Map / Social",
    desc: "表單、地圖、社群與聯絡入口整合。",
  },
]

const modules = [
  {
    title: "Hero 主視覺",
    desc: "第一眼說清楚你是誰、提供什麼、訪客下一步要做什麼。",
    className:
      "md:col-span-3 md:row-span-2 bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-700 text-white",
  },
  {
    title: "服務項目",
    desc: "整理服務內容與適合對象。",
    className: "md:col-span-3 bg-white/10 text-white",
  },
  {
    title: "價格 / 方案",
    desc: "讓預算範圍更清楚。",
    className: "md:col-span-2 bg-white text-black",
  },
  {
    title: "作品 / 案例",
    desc: "用過往範例建立信任。",
    className:
      "md:col-span-2 bg-gradient-to-br from-[#f4c7b8] to-[#b58a79] text-[#2f2723]",
  },
  {
    title: "FAQ",
    desc: "減少重複私訊。",
    className: "md:col-span-2 bg-white/10 text-white",
  },
  {
    title: "Google Map",
    desc: "店家與工作室常用。",
    className:
      "md:col-span-2 bg-gradient-to-br from-emerald-300 to-cyan-400 text-[#0f172a]",
  },
  {
    title: "LINE / IG / Email",
    desc: "把聯絡入口放在最容易點的位置。",
    className:
      "md:col-span-4 bg-gradient-to-br from-stone-100 to-stone-300 text-black",
  },
  {
    title: "表單 / 預約",
    desc: "適合活動、課程、諮詢與預約制服務。",
    className:
      "md:col-span-2 bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white",
  },
]

const process = [
  {
    title: "釐清目標",
    desc: "確認網站要給誰看、希望訪客完成什麼行動、目前資料完整度如何。",
  },
  {
    title: "整理內容",
    desc: "把服務、作品、價格、地點、聯絡方式、參考風格整理成網站架構。",
  },
  {
    title: "製作前端",
    desc: "依需求製作 React 頁面、RWD 排版、按鈕、區塊與基本互動。",
  },
  {
    title: "部署交付",
    desc: "協助部署到 Vercel，提供公開網址、原始碼與簡易修改說明。",
  },
]

const pricing = [
  {
    title: "學生 / 個人作品集",
    price: "NT$2,000–4,000",
    desc: "適合履歷網站、作品集展示、簡單個人介紹頁。",
  },
  {
    title: "一頁式形象網站",
    price: "NT$5,000–8,000",
    desc: "適合小店、工作室、個人品牌、服務介紹與預約入口。",
  },
  {
    title: "網站修改 / 優化",
    price: "NT$500–1,000 / 小時",
    desc: "適合舊網站排版、RWD、文案圖片更新、按鈕與連結調整。",
  },
]

const scopeItems = {
  canDo: [
    "一頁式網站",
    "RWD 手機版",
    "前端切版",
    "Vercel 部署",
    "表單 / 地圖 / 社群連結",
    "基本 SEO / OGP 設定",
  ],
  notMain: [
    "大型後台系統",
    "會員與金流",
    "完整 CMS",
    "大型電商",
    "高階品牌識別設計",
    "保證 SEO 排名",
  ],
}

const quickStart = [
  {
    title: "先看主打案例",
    desc: "從 Luma Nail Studio 了解預約制工作室網站可以怎麼整理服務、價格、作品與預約流程。",
    link: "/luma-nail",
    cta: "查看 Luma 案例",
  },
  {
    title: "整理網站需求",
    desc: "不知道怎麼開始也沒關係，可以先用需求表整理網站用途、內容、功能、預算與時程。",
    link: "/brief",
    cta: "填寫需求方向",
  },
  {
    title: "傳給我初步討論",
    desc: "把目前想法、參考風格、現有素材和預算範圍傳給我，我會先判斷是否適合小型網站範圍。",
    link: "#contact",
    cta: "聯絡我",
  },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/luma-nail" element={<LumaNailDemo />} />
      <Route path="/service-demo" element={<ServiceDemo />} />
      <Route path="/portfolio-demo" element={<PortfolioDemo />} />
      <Route path="/cafe-demo" element={<CafeDemo />} />
      <Route path="/event-demo" element={<EventDemo />} />
      <Route path="/brief" element={<BriefPage />} />
    </Routes>
  )
}

function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] pb-20 text-white md:pb-0">
      <PointerEffects />
      <BackgroundGlow />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="font-semibold tracking-tight">
            Qingyu Web Studio
          </a>

          <Link
            to="/brief"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-cyan-200 md:hidden"
          >
            需求表
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
            <a href="#problems" className="hover:text-white">
              問題
            </a>
            <a href="#cases" className="hover:text-white">
              案例
            </a>
            <a href="#deliverables" className="hover:text-white">
              交付
            </a>
            <a href="#growth" className="hover:text-white">
              曝光
            </a>
            <a href="#launch" className="hover:text-white">
              上線
            </a>
            <a href="#tech" className="hover:text-white">
              技術
            </a>
            <a href="#pricing" className="hover:text-white">
              價格
            </a>
            <Link to="/brief" className="hover:text-white">
              需求表
            </Link>
            <RippleLink
              href="#contact"
              className="rounded-full bg-white px-4 py-2 font-medium text-black hover:bg-cyan-200"
            >
              聯絡我
            </RippleLink>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-14 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-14 md:pb-32 md:pt-28">
        <div>
          <div className="text-safe mb-5 inline-flex max-w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs leading-5 text-cyan-100 backdrop-blur sm:rounded-full sm:text-sm">
            資訊工程學生｜前端網站製作・RWD・部署上線
          </div>

          <h1 className="text-safe mobile-soft-title max-w-4xl text-[2.35rem] font-semibold tracking-[-0.04em] sm:text-5xl sm:leading-[1.08] md:text-7xl md:leading-[1.02]">
            <span className="block">把零散資訊，</span>
            <span className="block">整理成能上線的網站。</span>
          </h1>

          <p className="text-safe mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg sm:leading-9">
            我協助學生、小型店家與個人品牌整理網站內容，製作手機版友善的前端頁面，
            並協助表單、社群連結、Vercel 部署與基本 SEO 設定。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <RippleLink
              href="#cases"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              查看需求案例
            </RippleLink>

            <RippleLink
              to="/luma-nail"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              看主打案例
            </RippleLink>

            <RippleLink
              to="/brief"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              先整理需求
            </RippleLink>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 md:mt-12">
            <Stat number="RWD" label="手機版優先" />
            <Stat number="GitHub" label="原始碼管理" />
            <Stat number="Vercel" label="部署上線" />
          </div>
        </div>

        <ProjectConsole />
      </section>

      <QuickStartSection />

      <section id="problems" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Client Problems"
          title="我不是只做漂亮畫面，而是先處理客戶真正卡住的地方。"
          desc="很多小型網站的問題不是沒有工具，而是需求不清楚、內容散亂、手機版不好讀、也不知道怎麼部署。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {clientProblems.map((item, index) => (
            <SpotlightCard
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
            >
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="text-safe mt-5 text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-safe mt-4 leading-7 text-white/55">
                {item.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section id="cases" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Scenario Cases"
          title="作品不只展示畫面，而是對應真實需求情境。"
          desc="目前只主打最容易轉成小型接案的三種方向，其他 Demo 降為補充案例。"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {primaryCases.map((item, index) => (
            <SpotlightLink
              key={item.title}
              to={item.link}
              className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/[0.1] ${
                index === 0 ? "ring-1 ring-cyan-300/30" : ""
              }`}
            >
              <div
                className={`flex min-h-[430px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br ${item.color} p-6 sm:min-h-[360px] md:h-72 md:min-h-0`}
              >
                <p className="text-safe text-xs uppercase tracking-[0.18em] text-white/60 md:tracking-[0.28em]">
                  {item.subtitle}
                </p>

                <div>
                  {index === 0 && (
                    <span className="mb-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                      Main Case
                    </span>
                  )}

                  <h3 className="text-safe text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl sm:leading-tight">
                    {item.title}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-3 py-1 text-xs leading-5 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold text-cyan-300">需求問題</p>
                <p className="text-safe mt-2 leading-7 text-white/55">
                  {item.problem}
                </p>

                <p className="mt-5 text-sm font-semibold text-cyan-300">
                  網站解法
                </p>
                <p className="text-safe mt-2 leading-7 text-white/65">
                  {item.solution}
                </p>

                <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                  查看案例
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </SpotlightLink>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {secondaryWorks.map((item) => (
            <SpotlightLink
              key={item.title}
              to={item.link}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-white/55 transition hover:-translate-y-1 hover:bg-white/[0.08] hover:text-white"
            >
              <p className="text-safe text-lg font-semibold">{item.title}</p>
              <p className="text-safe mt-2 leading-7">{item.desc}</p>
              <p className="mt-4 text-cyan-300">查看補充案例 →</p>
            </SpotlightLink>
          ))}
        </div>
      </section>

      <section id="deliverables" className="relative mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.8rem] bg-white p-8 text-black shadow-2xl shadow-black/30 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Deliverables
              </p>
              <h2 className="text-safe mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                交付的不是一張圖，而是一個可上線的前端網站。
              </h2>
              <p className="text-safe mt-6 leading-8 text-black/60">
                客戶最在意的通常不是你用了什麼特效，而是網站能不能放資訊、
                能不能在手機上看、能不能被分享、能不能部署、後續能不能修改。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="text-safe rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm font-medium transition hover:-translate-y-1 hover:bg-black/[0.06]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GrowthSetupSection />

      <LaunchKitSection />

      <ModuleSystemSection />

      <section id="tech" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Tech & Scope"
          title="用工程背景補足小型網站最常缺的交付能力。"
          desc="不亂承諾大型系統，先把小型網站的前端、RWD、部署與基本整合做好。"
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {techStack.map((item) => (
              <SpotlightCard
                key={item.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
              >
                <h3 className="text-safe text-2xl font-semibold text-cyan-300">
                  {item.name}
                </h3>
                <p className="text-safe mt-4 leading-7 text-white/55">
                  {item.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>

          <div className="grid gap-5">
            <ScopeCard title="目前適合承接" items={scopeItems.canDo} positive />
            <ScopeCard title="目前不亂承諾" items={scopeItems.notMain} />
          </div>
        </div>
      </section>

      <section id="process" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Process"
          title="先整理需求，再開始製作，避免做出看起來有東西但不能用的網站。"
          desc="流程會先聚焦目的、內容與範圍，再進入前端製作與部署。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {process.map((item, index) => (
            <SpotlightCard
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
            >
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="text-safe mt-5 text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="text-safe mt-4 leading-7 text-white/55">
                {item.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h3 className="text-safe text-2xl font-semibold">
                需求還不清楚也可以先討論。
              </h3>
              <p className="text-safe mt-2 leading-7 text-white/60">
                可以先看需求確認表，整理網站用途、內容、功能、風格與預算。
              </p>
            </div>

            <RippleLink
              to="/brief"
              className="inline-flex w-fit rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-200"
            >
              查看需求表 →
            </RippleLink>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Pricing"
          title="先從小型需求開始，報價依範圍調整。"
          desc="目前主打小型網站與前端頁面製作，避免一開始接超出能力範圍的大型系統。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {pricing.map((item) => (
            <SpotlightCard
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
            >
              <h3 className="text-safe text-xl font-semibold">{item.title}</h3>
              <p className="text-safe mt-5 text-3xl font-semibold text-cyan-300">
                {item.price}
              </p>
              <p className="text-safe mt-5 leading-8 text-white/55">
                {item.desc}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-5 py-20 pb-28">
        <div className="overflow-hidden rounded-[2.8rem] bg-cyan-300 p-8 text-black md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div className="min-w-0">
              <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Contact
              </p>
              <h2 className="text-safe mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                有網站需求，可以先把想法傳給我。
              </h2>
              <p className="text-safe mt-6 max-w-2xl leading-8 text-black/65">
                不需要一開始就準備完整規格。可以先告訴我網站用途、參考風格、
                需要放什麼內容、預算和希望完成時間，我會協助整理成可評估的範圍。
              </p>
            </div>

            <div className="grid min-w-0 gap-3">
              <ContactCard
                label="Email"
                value="a0988874324@gmail.com"
                href="mailto:a0988874324@gmail.com"
              />
              <ContactCard label="LINE" value="mulavuc" />
              <ContactCard
                label="Instagram"
                value="qingyu.jin"
                href="https://www.instagram.com/qingyu.jin"
              />
              <RippleLink
                to="/brief"
                className="rounded-3xl bg-black p-5 text-white transition hover:bg-stone-800"
              >
                <p className="text-sm text-white/50">Website Brief</p>
                <p className="mt-2 font-semibold">查看需求確認表 →</p>
              </RippleLink>
            </div>
          </div>
        </div>
      </section>

      <MobileBottomCTA />
    </main>
  )
}

function QuickStartSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-12 md:py-20">
      <div className="rounded-[2.4rem] border border-cyan-300/20 bg-cyan-300/10 p-6 backdrop-blur md:p-8">
        <div className="mb-8 flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Quick Start
            </p>
            <h2 className="text-safe mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              不知道怎麼開始？先照這三步。
            </h2>
          </div>
          <p className="text-safe max-w-md leading-8 text-white/55">
            讓第一次來的客戶不用自己猜流程，直接知道該看案例、整理需求、再聯絡討論。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickStart.map((item, index) => (
            <SpotlightLink
              key={item.title}
              to={item.link.startsWith("/") ? item.link : undefined}
              href={item.link.startsWith("#") ? item.link : undefined}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.1]"
            >
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="text-safe mt-4 text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="text-safe mt-4 leading-7 text-white/55">
                {item.desc}
              </p>
              <p className="text-safe mt-5 text-sm font-semibold text-cyan-300">
                {item.cta} →
              </p>
            </SpotlightLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileBottomCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-3 rounded-[1.6rem] border border-white/10 bg-[#08090d]/85 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
      <Link
        to="/luma-nail"
        className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
      >
        看案例
      </Link>
      <Link
        to="/brief"
        className="flex items-center justify-center rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-black"
      >
        填需求
      </Link>
    </div>
  )
}

function ProjectConsole() {
  return (
    <div className="relative min-w-0">
      <div className="rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl md:rounded-[2.4rem] md:p-4">
        <div className="rounded-[1.6rem] bg-[#11141d] p-4 md:rounded-[1.9rem] md:p-5">
          <div className="mb-4 flex items-center justify-between md:mb-5">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400 md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 md:h-3 md:w-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400 md:h-3 md:w-3" />
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/60 md:text-xs">
              Project Scope
            </span>
          </div>

          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-4 md:rounded-[1.5rem] md:p-5">
            <p className="text-xs text-cyan-200 md:text-sm">目前定位</p>
            <h2 className="text-safe mt-2 text-2xl font-semibold md:mt-3 md:text-3xl">
              Frontend Website Build
            </h2>
            <p className="text-safe mt-2 text-sm leading-7 text-white/60 md:mt-3 md:text-base">
              RWD、前端頁面、部署、表單與社群連結整合。
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:gap-4">
            {primaryCases.map((item, index) => (
              <SpotlightLink
                key={item.title}
                to={item.link}
                className={`group rounded-[1.4rem] border border-white/10 bg-white/5 p-2.5 transition hover:-translate-y-1 hover:bg-white/10 md:rounded-[1.6rem] md:p-3 ${
                  index === 1 ? "md:ml-8" : ""
                }`}
              >
                <div
                  className={`rounded-[1.1rem] bg-gradient-to-br ${item.color} p-4 md:rounded-[1.25rem] md:p-5`}
                >
                  <p className="text-safe text-[10px] uppercase tracking-[0.18em] text-white/60 md:text-xs md:tracking-[0.25em]">
                    {item.subtitle}
                  </p>
                  <div className="mt-7 flex min-w-0 items-end justify-between gap-4 md:mt-10">
                    <div className="min-w-0">
                      <p className="text-safe text-xl font-semibold md:text-2xl">
                        {item.title}
                      </p>
                      <p className="text-safe mt-1 text-xs leading-5 text-white/70 md:text-sm">
                        {item.tags.join(" · ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-white/60 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </SpotlightLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GrowthSetupSection() {
  return (
    <section id="growth" className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[#11141d] p-8 shadow-2xl shadow-black/40 md:p-12">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-[90px]" />
        <div className="pointer-events-none absolute right-[-80px] bottom-[-80px] h-80 w-80 rounded-full bg-cyan-400/20 blur-[100px]" />

        <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Basic Growth Setup
            </p>

            <h2 className="text-safe mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              網站不是保證帶流量，而是把流量接住。
            </h2>

            <p className="text-safe mt-6 max-w-xl leading-8 text-white/60">
              我不會承諾 SEO 排名或保證客人變多，但可以協助網站做好基本曝光、
              社群分享、搜尋收錄與追蹤準備。對小型店家來說，網站通常是承接
              IG、LINE、Google 商家與朋友轉發流量的正式入口。
            </p>

            <div className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
              <p className="text-safe text-sm font-semibold text-cyan-200">
                比較正確的期待
              </p>
              <p className="text-safe mt-3 leading-8 text-white/65">
                網站本身不會自動帶來大量流量；它的價值是讓已經點進來的人，
                更快看懂服務、價格、作品、地點與聯絡方式，進而提高詢問與預約機率。
              </p>
            </div>
          </div>

          <div className="grid min-w-0 gap-4 sm:grid-cols-2">
            {growthSetups.map((item) => (
              <SpotlightCard
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1"
              >
                <div className="mb-5 inline-flex rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  {item.tag}
                </div>
                <h3 className="text-safe text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-safe mt-4 leading-7 text-white/55">
                  {item.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LaunchKitSection() {
  return (
    <section id="launch" className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="rounded-[2.8rem] bg-white p-8 text-black shadow-2xl shadow-black/30 md:p-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
              Launch Kit
            </p>
            <h2 className="text-safe mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              網站上線前，不只是看起來完成而已。
            </h2>
          </div>

          <p className="text-safe max-w-xl leading-8 text-black/60">
            真實客戶在意的是網站能不能在手機上使用、能不能聯絡、能不能分享、
            能不能被 Google 理解、上線後拿到什麼。Launch Kit 是我交付前會協助檢查的基本項目。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {launchKit.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6 transition hover:-translate-y-1 hover:bg-black/[0.06]"
            >
              <h3 className="text-safe text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="text-safe mt-4 leading-7 text-black/60">
                {item.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.items.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-[#08090d] p-6 text-white">
          <p className="text-safe text-sm font-semibold text-cyan-300">
            交付時的正確期待
          </p>
          <p className="text-safe mt-3 leading-8 text-white/65">
            我可以協助做好基本設定與交付檢查，但不承諾 SEO 排名、廣告成效或保證客源。
            對小型網站來說，真正重要的是讓已經從 IG、LINE、Google 商家或朋友轉發進來的人，
            能快速理解服務並完成聯絡。
          </p>
        </div>
      </div>
    </section>
  )
}

function ModuleSystemSection() {
  return (
    <section id="modules" className="relative mx-auto max-w-7xl px-5 py-20">
      <div className="relative overflow-hidden rounded-[2.8rem] border border-white/10 bg-[#11141d] p-6 shadow-2xl shadow-black/40 md:p-10">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-[90px]" />
        <div className="pointer-events-none absolute right-[-80px] top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-120px] left-[35%] h-80 w-80 rounded-full bg-amber-300/10 blur-[110px]" />

        <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Modular Website System
            </p>

            <h2 className="text-safe mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              依需求組合模組，不是每個網站都套同一個模板。
            </h2>

            <p className="text-safe mt-6 max-w-xl leading-8 text-white/60">
              每個客戶需要的內容不同。我會依照網站目的、產業類型、資料完整度與預算，
              選擇必要模組，避免網站看起來很多東西但沒有重點。
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <InfoPill number="01" text="先確認網站目的，不急著做畫面。" />
              <InfoPill number="02" text="選擇必要區塊，避免資訊過多。" />
              <InfoPill number="03" text="完成 RWD，讓手機版也能清楚操作。" />
            </div>
          </div>

          <div className="grid auto-rows-[150px] gap-4 md:grid-cols-6">
            {modules.map((item) => (
              <SpotlightCard
                key={item.title}
                className={`flex flex-col justify-between rounded-[2rem] p-5 shadow-lg transition duration-300 hover:-translate-y-1 ${item.className}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-semibold">
                  +
                </div>

                <div className="min-w-0">
                  <h3 className="text-safe text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-safe mt-2 text-sm leading-6 opacity-75">
                    {item.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ScopeCard({ title, items, positive = false }) {
  return (
    <SpotlightCard className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
      <h3 className="text-safe text-2xl font-semibold">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 leading-7 text-white/60">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                positive ? "bg-cyan-300" : "bg-amber-300"
              }`}
            />
            <span className="text-safe">{item}</span>
          </div>
        ))}
      </div>
    </SpotlightCard>
  )
}

function InfoPill({ number, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-2xl font-semibold text-cyan-300">{number}</p>
      <p className="text-safe mt-2 text-sm text-white/55">{text}</p>
    </div>
  )
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mb-10 flex min-w-0 flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
      <div className="min-w-0">
        <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="text-safe mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="text-safe max-w-md leading-8 text-white/55">{desc}</p>
    </div>
  )
}

function PointerEffects() {
  const [mouse, setMouse] = useState({ x: -999, y: -999, visible: false })
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    function handlePointerMove(event) {
      if (event.pointerType !== "mouse") return
      setMouse({ x: event.clientX, y: event.clientY, visible: true })
    }

    function handlePointerLeave() {
      setMouse((current) => ({ ...current, visible: false }))
    }

    function handlePointerDown(event) {
      const id = `${Date.now()}-${Math.random()}`
      const isTouch = event.pointerType !== "mouse"

      setBursts((current) => [
        ...current,
        {
          id,
          x: event.clientX,
          y: event.clientY,
          touch: isTouch,
        },
      ])

      window.setTimeout(() => {
        setBursts((current) => current.filter((item) => item.id !== id))
      }, 900)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("pointerdown", handlePointerDown)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return (
    <>
      <div
        className={`pointer-events-none fixed z-[60] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-3xl transition-opacity duration-300 md:block ${
          mouse.visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: mouse.x, top: mouse.y }}
      />

      <div className="pointer-events-none fixed inset-0 z-[70]">
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className={`tap-burst ${burst.touch ? "touch" : "mouse"}`}
            style={{ left: burst.x, top: burst.y }}
          >
            <span className="tap-ring" />
            <span className="tap-ring tap-ring-delay" />
            <span className="tap-dot" />
          </div>
        ))}
      </div>
    </>
  )
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute left-[-160px] top-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute right-[-220px] top-[280px] h-[560px] w-[560px] rounded-full bg-amber-400/10 blur-[150px]" />
      <div className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
    </div>
  )
}

function SpotlightCard({ className = "", children }) {
  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`)
  }

  return (
    <div onMouseMove={handleMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  )
}

function SpotlightLink({ to, href, className = "", children }) {
  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`)
  }

  if (to) {
    return (
      <Link onMouseMove={handleMouseMove} to={to} className={`spotlight-card ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <a onMouseMove={handleMouseMove} href={href} className={`spotlight-card ${className}`}>
      {children}
    </a>
  )
}

function RippleLink({ to, href, className = "", children }) {
  const [ripples, setRipples] = useState([])

  function handlePointerDown(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.4
    const newRipple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      size,
    }

    setRipples((current) => [...current, newRipple])

    window.setTimeout(() => {
      setRipples((current) => current.filter((ripple) => ripple.id !== newRipple.id))
    }, 650)
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        onPointerDown={handlePointerDown}
        className={`relative isolate overflow-hidden active:scale-[0.98] ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      href={href}
      onPointerDown={handlePointerDown}
      className={`relative isolate overflow-hidden active:scale-[0.98] ${className}`}
    >
      {content}
    </a>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10">
      <p className="text-safe text-2xl font-semibold text-cyan-300">{number}</p>
      <p className="text-safe mt-2 text-xs text-white/45">{label}</p>
    </div>
  )
}

function ContactCard({ label, value, href }) {
  const content = (
    <>
      <p className="text-safe text-sm text-black/50">{label}</p>
      <p className="text-safe mt-2 font-semibold">{value}</p>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="rounded-3xl bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white"
      >
        {content}
      </a>
    )
  }

  return <div className="rounded-3xl bg-white/70 p-5">{content}</div>
}

export default App