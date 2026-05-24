import { useEffect, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"
import ServiceDemo from "./ServiceDemo"
import BriefPage from "./BriefPage"
import LumaNailDemo from "./LumaNailDemo"

const workDemos = [
  {
    title: "Luma Nail Studio",
    category: "預約制工作室網站",
    desc: "概念案例。示範如何把服務、價格、作品、預約流程、FAQ、LINE / IG / Google Map 整理成一頁式網站。",
    fit: "美甲 / 美睫 / 美容 / 霧眉 / 攝影 / 健身教練",
    link: "/luma-nail",
    color: "from-[#f4c7b8] via-[#b58a79] to-[#2f2723]",
    tags: ["主打 Demo", "預約制", "手機版", "案例說明"],
  },
  {
    title: "Service Demo",
    category: "服務型網站",
    desc: "適合顧問、課程品牌、自由工作者或小型團隊。重點是服務介紹、方案比較、流程與 CTA。",
    fit: "顧問 / 課程 / 自由工作者 / 小型團隊",
    link: "/service-demo",
    color: "from-cyan-400 via-blue-500 to-violet-600",
    tags: ["服務介紹", "方案比較", "CTA"],
  },
  {
    title: "Portfolio Demo",
    category: "個人作品集網站",
    desc: "適合學生、求職者、創作者或設計師。整理個人介紹、技能、經歷與作品案例。",
    fit: "學生 / 求職 / 創作者 / 設計師",
    link: "/portfolio-demo",
    color: "from-stone-200 via-stone-500 to-stone-950",
    tags: ["作品集", "履歷", "個人品牌"],
  },
  {
    title: "Cafe Demo",
    category: "咖啡店一頁式網站",
    desc: "適合小型餐飲、咖啡廳與生活風格品牌。展示品牌氛圍、菜單、地點與營業資訊。",
    fit: "咖啡廳 / 小餐飲 / 生活品牌",
    link: "/cafe-demo",
    color: "from-amber-200 via-orange-300 to-stone-900",
    tags: ["餐飲", "菜單", "地點"],
  },
  {
    title: "Event Demo",
    category: "活動宣傳頁",
    desc: "適合講座、社團活動、營隊、工作坊與報名頁。重點是活動資訊、流程、報名入口與 FAQ。",
    fit: "講座 / 社團 / 工作坊 / 活動報名",
    link: "/event-demo",
    color: "from-violet-400 via-fuchsia-500 to-rose-500",
    tags: ["活動", "報名", "FAQ"],
  },
  {
    title: "Brief Builder",
    category: "互動式需求整理器",
    desc: "接案前的需求整理工具。讓客戶勾選網站類型、功能、素材、預算與時程，產生需求摘要。",
    fit: "需求釐清 / 初步估價 / 接案前討論",
    link: "/brief",
    color: "from-emerald-300 via-cyan-300 to-blue-500",
    tags: ["需求表", "互動工具", "摘要產生"],
  },
]

const servicePoints = [
  {
    title: "我先幫你整理內容",
    desc: "很多小型網站不是缺技術，而是服務、價格、作品、地點、預約流程都散在 IG、LINE 或貼文裡。",
  },
  {
    title: "我做手機版友善的頁面",
    desc: "真實客戶通常從手機點進來，所以我會優先確認標題、按鈕、段落、圖片與聯絡入口在手機上是否好讀好點。",
  },
  {
    title: "我協助部署和基本設定",
    desc: "包含 GitHub、Vercel、LINE / IG / Email / Google Map 連結、OGP 分享預覽與基本 SEO meta。",
  },
]

const proofPoints = [
  "不是主打大型後台、會員、金流或完整電商",
  "目前從一頁式網站、作品集、活動頁、小型服務頁開始",
  "AI 工具可以輔助產出，但我會負責改版面、修手機版、整理內容與部署",
  "每個 Demo 都會盡量補上適合對象、內容結構與使用情境",
]

const process = [
  {
    title: "看作品",
    desc: "先看 Demo 是否接近你想要的網站類型。",
  },
  {
    title: "整理需求",
    desc: "用需求整理器勾選網站用途、功能、素材、預算與時程。",
  },
  {
    title: "確認範圍",
    desc: "我會先判斷是否適合小型網站，再討論價格與交付內容。",
  },
  {
    title: "製作上線",
    desc: "完成前端頁面、RWD、連結整合、部署與簡易交付說明。",
  },
]

const pricing = [
  {
    title: "學生 / 個人作品集",
    price: "NT$2,000–4,000",
    desc: "適合履歷網站、作品集展示、簡單個人介紹頁。",
  },
  {
    title: "一頁式小型網站",
    price: "NT$3,000–8,000",
    desc: "適合工作室、小店、個人品牌、服務介紹與預約入口。",
  },
  {
    title: "網站修改 / 優化",
    price: "NT$500–1,000 / 小時",
    desc: "適合舊網站手機版、排版、文字圖片、按鈕與連結調整。",
  },
]

const deliveryItems = [
  "React / Vite 前端頁面",
  "RWD 手機版排版",
  "Vercel 部署上線",
  "GitHub 原始碼管理",
  "LINE / IG / Email 連結",
  "Google Map 整合",
  "Google Form / 報名連結",
  "基本 SEO meta",
  "社群分享 OGP 設定",
  "簡易修改與交付說明",
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
          <a href="#" className="text-safe font-semibold tracking-tight">
            Qingyu Web Studio
          </a>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#works"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/40"
            >
              作品
            </a>
            <Link
              to="/brief"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-cyan-200"
            >
              需求表
            </Link>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
            <a href="#works" className="hover:text-white">
              作品
            </a>
            <a href="#luma" className="hover:text-white">
              主打案例
            </a>
            <a href="#service" className="hover:text-white">
              服務
            </a>
            <a href="#process" className="hover:text-white">
              流程
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

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-14 md:pb-24 md:pt-24">
        <div>
          <div className="text-safe mb-5 inline-flex max-w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs leading-5 text-cyan-100 backdrop-blur sm:rounded-full sm:text-sm">
            學生接案｜小型網站・RWD・部署上線
          </div>

          <h1 className="text-safe mobile-soft-title max-w-4xl text-[2.35rem] font-semibold tracking-[-0.04em] sm:text-5xl sm:leading-[1.08] md:text-7xl md:leading-[1.02]">
            <span className="block">我協助小型需求，</span>
            <span className="block">做成手機好讀的網站。</span>
          </h1>

          <p className="text-safe mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg sm:leading-9">
            我是資訊工程學生，目前從小型網站開始接案。主要協助學生、小型店家、工作室與個人品牌，
            把 IG、LINE、Google Map、價格、作品與表單整理成可以上線、可以聯絡、手機版好讀的網站。
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-safe text-sm font-semibold text-cyan-300">
              目前定位
            </p>
            <p className="text-safe mt-3 leading-7 text-white/58">
              我不把自己包裝成大型設計公司，也不主打大型後台或完整電商。
              目前更適合一頁式網站、作品集、活動頁、服務介紹頁、舊網站手機版調整這類小型需求。
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <RippleLink
              href="#works"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              直接看作品
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
              整理需求
            </RippleLink>
          </div>
        </div>

        <HeroPreview />
      </section>

      <WorkGallerySection />

      <LumaFeatureSection />

      <ServiceSection />

      <ProofSection />

      <ProcessSection />

      <DeliverySection />

      <PricingSection />

      <ContactSection />

      <MobileBottomCTA />
    </main>
  )
}

function HeroPreview() {
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
              Demo Preview
            </span>
          </div>

          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-4 md:rounded-[1.5rem] md:p-5">
            <p className="text-xs text-cyan-200 md:text-sm">可以直接打開的作品</p>
            <h2 className="text-safe mt-2 text-2xl font-semibold md:mt-3 md:text-3xl">
              Work Demo Collection
            </h2>
            <p className="text-safe mt-2 text-sm leading-7 text-white/60 md:mt-3 md:text-base">
              每個 Demo 都有不同情境：工作室、作品集、服務頁、活動頁。
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:gap-4">
            {workDemos.slice(0, 3).map((item, index) => (
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
                    {item.category}
                  </p>
                  <div className="mt-7 flex min-w-0 items-end justify-between gap-4 md:mt-10">
                    <div className="min-w-0">
                      <p className="text-safe text-xl font-semibold md:text-2xl">
                        {item.title}
                      </p>
                      <p className="text-safe mt-1 text-xs leading-5 text-white/72 md:text-sm">
                        {item.tags.slice(0, 3).join(" · ")}
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

function WorkGallerySection() {
  return (
    <section id="works" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading
        eyebrow="Work Gallery"
        title="可以直接點開看的作品 Demo"
        desc="這些是概念 Demo 與練習案例，不假裝是真實客戶案。每個作品都可以直接打開查看頁面結構與手機版。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {workDemos.map((work, index) => (
          <SpotlightLink
            key={work.title}
            to={work.link}
            className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:-translate-y-2 hover:bg-white/[0.1] ${
              index === 0 ? "ring-1 ring-cyan-300/40" : ""
            }`}
          >
            <div
              className={`flex min-h-[260px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br ${work.color} p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-safe text-xs uppercase tracking-[0.18em] text-white/65">
                  {work.category}
                </p>
                <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  Demo
                </span>
              </div>

              <div>
                <h3 className="text-safe text-4xl font-semibold leading-tight tracking-[-0.04em] text-white">
                  {work.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/15 px-3 py-1 text-xs leading-5 text-white/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-safe text-sm font-semibold text-cyan-300">
                適合類型
              </p>
              <p className="text-safe mt-2 leading-7 text-white/60">
                {work.fit}
              </p>

              <p className="text-safe mt-5 leading-7 text-white/65">
                {work.desc}
              </p>

              <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                打開作品
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </SpotlightLink>
        ))}
      </div>
    </section>
  )
}

function LumaFeatureSection() {
  return (
    <section id="luma" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-[#12151d] p-6 shadow-2xl shadow-black/40 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Main Case Study
            </p>
            <h2 className="text-safe mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Luma 不只是展示頁，而是預約制工作室的內容整理練習。
            </h2>
            <p className="text-safe mt-6 leading-8 text-white/60">
              這個案例不是假裝真實客戶，而是我用來展示「如果一間工作室只有 IG、作品照、價格和預約流程，
              可以怎麼被整理成一個手機版好讀的一頁式網站」。
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "把服務、價格、作品、FAQ、預約流程整理成一頁式結構",
                "把 LINE / IG / Google Map 放到容易點擊的位置",
                "用手機版優先的方式安排標題、段落、按鈕與區塊順序",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                  <p className="text-safe leading-7 text-white/65">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <RippleLink
                to="/luma-nail"
                className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-200"
              >
                看完整 Case Study
              </RippleLink>
              <RippleLink
                to="/brief"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/40"
              >
                用需求表整理你的網站
              </RippleLink>
            </div>
          </div>

          <SpotlightLink
            to="/luma-nail"
            className="group rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-4 transition hover:-translate-y-2 hover:bg-white/[0.1]"
          >
            <div className="flex min-h-[520px] flex-col justify-between rounded-[1.8rem] bg-gradient-to-br from-[#f4c7b8] via-[#b58a79] to-[#2f2723] p-7">
              <div>
                <p className="text-safe text-xs uppercase tracking-[0.24em] text-white/65">
                  Concept Case / Local Studio
                </p>
                <div className="mt-6 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                  Main Demo
                </div>
              </div>

              <div>
                <h3 className="text-safe text-5xl font-semibold leading-tight tracking-[-0.05em] text-white">
                  Luma Nail Studio
                </h3>
                <p className="text-safe mt-5 max-w-sm leading-7 text-white/70">
                  預約制工作室網站概念案例。主打服務、作品、預約與聯絡入口整理。
                </p>
                <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                  打開案例
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </SpotlightLink>
        </div>
      </div>
    </section>
  )
}

function ServiceSection() {
  return (
    <section id="service" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading
        eyebrow="What I Actually Do"
        title="我真正能協助的，不只是生出一個漂亮畫面。"
        desc="AI 工具可以加速產出，但小型客戶真正需要的是有人幫忙整理內容、修手機版、處理連結與上線。"
      />

      <div className="grid gap-5 md:grid-cols-3">
        {servicePoints.map((item, index) => (
          <SpotlightCard
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
          >
            <p className="text-sm text-cyan-300">0{index + 1}</p>
            <h3 className="text-safe mt-5 text-2xl font-semibold">{item.title}</h3>
            <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}

function ProofSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="rounded-[2.8rem] bg-white p-8 text-black shadow-2xl shadow-black/30 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
              Honest Scope
            </p>
            <h2 className="text-safe mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              我不會把學生副業包裝成大型公司。
            </h2>
            <p className="text-safe mt-6 leading-8 text-black/60">
              目前我的定位是從小型網站開始，練習真實需求、切版、RWD、部署和溝通流程。
              這樣比較誠實，也比較符合我現在能穩定交付的範圍。
            </p>
          </div>

          <div className="grid gap-3">
            {proofPoints.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-black/10 bg-black/[0.03] p-4"
              >
                <p className="text-safe leading-7 text-black/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading
        eyebrow="Process"
        title="流程簡單一點，客戶比較知道下一步。"
        desc="不要一開始就談很大的系統，先確認網站目的、內容、範圍和預算。"
      />

      <div className="grid gap-5 md:grid-cols-4">
        {process.map((item, index) => (
          <SpotlightCard
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
          >
            <p className="text-sm text-cyan-300">0{index + 1}</p>
            <h3 className="text-safe mt-5 text-2xl font-semibold">{item.title}</h3>
            <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}

function DeliverySection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="rounded-[2.8rem] border border-white/10 bg-[#11141d] p-8 shadow-2xl shadow-black/40 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Delivery
            </p>
            <h2 className="text-safe mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              交付重點是能看、能點、能分享、能上線。
            </h2>
            <p className="text-safe mt-6 leading-8 text-white/60">
              小型網站最重要的不是功能堆很多，而是資訊清楚、手機版能用、聯絡入口明顯、部署後能分享。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {deliveryItems.map((item) => (
              <div
                key={item}
                className="text-safe rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm font-medium text-white/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <SectionHeading
        eyebrow="Pricing"
        title="先從小型需求開始，報價依範圍調整。"
        desc="第一批案子我會以累積真實作品、流程經驗和客戶回饋為主，不會亂接超出能力的大型系統。"
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
            <p className="text-safe mt-5 leading-8 text-white/58">{item.desc}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-16 pb-28 md:py-20">
      <div className="overflow-hidden rounded-[2.8rem] bg-cyan-300 p-8 text-black md:p-12">
        <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
              Contact
            </p>
            <h2 className="text-safe mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              有小型網站需求，可以先把想法傳給我。
            </h2>
            <p className="text-safe mt-6 max-w-2xl leading-8 text-black/65">
              不需要一開始就準備完整規格。可以先告訴我網站用途、參考風格、目前有什麼素材、
              預算和希望完成時間，我會先判斷是否適合小型網站範圍。
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
              <p className="mt-2 font-semibold">先整理需求 →</p>
            </RippleLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileBottomCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-3 rounded-[1.6rem] border border-white/10 bg-[#08090d]/85 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
      <a
        href="#works"
        className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
      >
        看作品
      </a>
      <Link
        to="/brief"
        className="flex items-center justify-center rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-black"
      >
        填需求
      </Link>
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