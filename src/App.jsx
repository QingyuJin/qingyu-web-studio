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
    category: "預約制工作室",
    desc: "把服務、價格、作品、預約流程與聯絡入口整理成一頁式網站。",
    fit: "美甲 / 美睫 / 美容 / 攝影",
    link: "/luma-nail",
    color: "from-[#f4c7b8] via-[#b58a79] to-[#2f2723]",
    tags: ["主打案例", "手機版", "預約"],
  },
  {
    title: "Service Demo",
    category: "服務型網站",
    desc: "適合顧問、課程品牌、自由工作者，重點是服務介紹與方案比較。",
    fit: "顧問 / 課程 / 自由工作者",
    link: "/service-demo",
    color: "from-cyan-400 via-blue-500 to-violet-600",
    tags: ["服務介紹", "方案", "CTA"],
  },
  {
    title: "Portfolio Demo",
    category: "個人作品集",
    desc: "整理個人介紹、技能、作品、經歷與聯絡方式。",
    fit: "學生 / 求職 / 創作者",
    link: "/portfolio-demo",
    color: "from-stone-200 via-stone-500 to-stone-950",
    tags: ["作品集", "履歷", "個人品牌"],
  },
  {
    title: "Cafe Demo",
    category: "小店形象網站",
    desc: "展示品牌氛圍、菜單、地點、營業資訊與社群入口。",
    fit: "咖啡廳 / 小餐飲 / 小店",
    link: "/cafe-demo",
    color: "from-amber-200 via-orange-300 to-stone-900",
    tags: ["餐飲", "菜單", "地點"],
  },
  {
    title: "Event Demo",
    category: "活動宣傳頁",
    desc: "整理活動資訊、流程、報名入口、注意事項與 FAQ。",
    fit: "講座 / 社團 / 工作坊",
    link: "/event-demo",
    color: "from-violet-400 via-fuchsia-500 to-rose-500",
    tags: ["活動", "報名", "FAQ"],
  },
  {
    title: "Brief Builder",
    category: "互動需求整理器",
    desc: "讓客戶先整理網站類型、功能、素材、預算與時程。",
    fit: "需求釐清 / 初步評估",
    link: "/brief",
    color: "from-emerald-300 via-cyan-300 to-blue-500",
    tags: ["需求表", "摘要", "估價前"],
  },
]

const servicePoints = [
  {
    title: "整理分散資訊",
    desc: "把 IG、LINE、Google Map、價格、作品、表單與常見問題整理成清楚網站架構。",
  },
  {
    title: "手機版優先",
    desc: "確認標題、段落、按鈕、圖片與聯絡入口在手機上好讀、好點、順序清楚。",
  },
  {
    title: "協助上線交付",
    desc: "處理 GitHub、Vercel、基本 SEO、OGP 分享圖、LINE / IG / Email / Map 連結。",
  },
]

const proofPoints = [
  "目前以一頁式網站、作品集、活動頁、小型服務頁為主。",
  "不主打大型後台、會員、金流、完整電商或大型系統。",
  "AI 工具可以輔助，但我會負責整理需求、調整版面、修手機版與部署。",
  "每個 Demo 會標示為概念案例，不假裝是真實客戶案。",
]

const process = [
  {
    title: "看作品",
    desc: "先看 Demo 是否接近你想要的網站類型。",
  },
  {
    title: "填需求",
    desc: "用需求表整理網站用途、功能、素材、預算與時程。",
  },
  {
    title: "確認範圍",
    desc: "先判斷是否適合小型網站，再討論價格與交付內容。",
  },
  {
    title: "製作上線",
    desc: "完成前端頁面、RWD、連結整合、部署與交付說明。",
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
  {
    title: "內容整理",
    desc: "協助整理服務、價格、作品、FAQ、地點、社群與聯絡方式。",
  },
  {
    title: "RWD 前端頁面",
    desc: "製作手機、平板與桌機都能正常閱讀與操作的前端頁面。",
  },
  {
    title: "部署上線",
    desc: "協助 GitHub / Vercel 部署、正式網址、自訂網域與基本交付。",
  },
  {
    title: "分享與聯絡設定",
    desc: "設定基本 SEO、OGP 分享預覽、LINE / IG / Email / Google Map 入口。",
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
      <BackgroundGlow />
      <WarmInteractions />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090d]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="text-safe font-semibold tracking-tight">
            Qingyu Web Studio
          </a>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#works"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
            >
              作品
            </a>
            <Link
              to="/brief"
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black"
            >
              需求表
            </Link>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
            <a href="#works" className="hover:text-white">
              作品
            </a>
            <a href="#main-case" className="hover:text-white">
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
            <a
              href="#contact"
              className="rounded-full bg-white px-4 py-2 font-medium text-black hover:bg-cyan-200"
            >
              聯絡我
            </a>
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
            我是資訊工程學生，目前從小型網站開始接案。主要協助學生、小型店家、
            工作室與個人品牌，把 IG、LINE、Google Map、價格、作品與表單整理成可以上線、
            可以聯絡、手機版好讀的網站。
          </p>

          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
            <p className="text-safe text-sm font-semibold text-cyan-300">
              目前定位
            </p>
            <p className="text-safe mt-3 leading-7 text-white/58">
              不主打大型後台、會員、金流或完整電商。比較適合一頁式網站、
              作品集、活動頁、服務介紹頁、舊網站手機版調整這類小型需求。
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              直接看作品
            </a>

            <Link
              to="/luma-nail"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              看主打案例
            </Link>

            <Link
              to="/brief"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              整理需求
            </Link>
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
              工作室、服務頁、作品集、活動頁與需求整理器。
            </p>
          </div>

          <div className="mt-4 grid gap-3 md:gap-4">
            {workDemos.slice(0, 3).map((item, index) => (
              <Link
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
                        {item.tags.join(" · ")}
                      </p>
                    </div>
                    <span className="shrink-0 text-white/60 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
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
        desc="以下是概念 Demo 與練習案例，不假裝是真實客戶案。每個作品都可以直接打開查看頁面結構與手機版。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {workDemos.map((work, index) => (
          <Link
            key={work.title}
            to={work.link}
            className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:-translate-y-2 hover:bg-white/[0.1] ${
              index === 0 ? "ring-1 ring-cyan-300/40" : ""
            }`}
          >
            <div
              className={`flex min-h-[230px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br ${work.color} p-6`}
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
                適合：{work.fit}
              </p>
              <p className="text-safe mt-4 leading-7 text-white/65">{work.desc}</p>

              <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                打開作品
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function LumaFeatureSection() {
  return (
    <section id="main-case" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="overflow-hidden rounded-[2.8rem] border border-white/10 bg-[#12151d] p-6 shadow-2xl shadow-black/40 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Main Case Study
            </p>
            <h2 className="text-safe mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Luma 是預約制工作室網站的內容整理練習。
            </h2>
            <p className="text-safe mt-6 leading-8 text-white/60">
              這個案例不是假裝真實客戶，而是展示一間工作室如果只有 IG、作品照、價格與私訊預約，
              可以如何被整理成手機版好讀的一頁式網站。
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "整理服務、價格、作品、FAQ、預約流程",
                "把 LINE / IG / Google Map 放在明顯位置",
                "用手機閱讀順序安排區塊，不只追求畫面好看",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white/5 p-4">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                  <p className="text-safe leading-7 text-white/65">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/luma-nail"
                className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-200"
              >
                看完整案例
              </Link>
              <Link
                to="/brief"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/40"
              >
                整理你的需求
              </Link>
            </div>
          </div>

          <Link
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
                  預約制工作室網站概念案例，主打服務、作品、預約與聯絡入口整理。
                </p>
                <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                  打開案例
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
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
        title="我真正協助的是整理、切版、手機版和上線。"
        desc="不是只生一張漂亮圖，而是讓小型網站能被理解、能被點擊、能被分享、能被修改。"
      />

      <div className="grid gap-5 md:grid-cols-3">
        {servicePoints.map((item, index) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
          >
            <p className="text-sm text-cyan-300">0{index + 1}</p>
            <h3 className="text-safe mt-5 text-2xl font-semibold">{item.title}</h3>
            <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
          </div>
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
              我不把學生副業包裝成大型公司。
            </h2>
            <p className="text-safe mt-6 leading-8 text-black/60">
              目前從小型網站開始累積作品、流程與實戰經驗。範圍講清楚，對雙方都比較安全。
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
        desc="先看作品，再整理需求，確認範圍後才開始製作。"
      />

      <div className="grid gap-5 md:grid-cols-4">
        {process.map((item, index) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
          >
            <p className="text-sm text-cyan-300">0{index + 1}</p>
            <h3 className="text-safe mt-5 text-2xl font-semibold">{item.title}</h3>
            <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function DeliverySection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <div className="rounded-[2.8rem] border border-white/10 bg-[#11141d] p-8 shadow-2xl shadow-black/40 md:p-12">
        <SectionHeading
          eyebrow="Delivery"
          title="交付重點是能看、能點、能分享、能上線。"
          desc="小型網站不需要把功能堆滿，而是要把最重要的資訊與聯絡入口做好。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {deliveryItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"
            >
              <h3 className="text-safe text-xl font-semibold text-cyan-300">
                {item.title}
              </h3>
              <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
            </div>
          ))}
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
        desc="第一批案子我會以累積真實作品、流程經驗和客戶回饋為主，不亂接超出能力的大型系統。"
      />

      <div className="grid gap-5 md:grid-cols-3">
        {pricing.map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
          >
            <h3 className="text-safe text-xl font-semibold">{item.title}</h3>
            <p className="text-safe mt-5 text-3xl font-semibold text-cyan-300">
              {item.price}
            </p>
            <p className="text-safe mt-5 leading-8 text-white/58">{item.desc}</p>
          </div>
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
              不需要一開始就準備完整規格。可以先告訴我網站用途、參考風格、
              目前素材、預算和希望完成時間，我會先判斷是否適合小型網站範圍。
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
            <Link
              to="/brief"
              className="rounded-3xl bg-black p-5 text-white transition hover:bg-stone-800"
            >
              <p className="text-sm text-white/50">Website Brief</p>
              <p className="mt-2 font-semibold">先整理需求 →</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function MobileBottomCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-[1.6rem] border border-white/10 bg-[#08090d]/88 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
      <Link
        to="/brief"
        className="flex items-center justify-center rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-black"
      >
        填需求表，取得初步評估
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

function WarmInteractions() {
  const [bursts, setBursts] = useState([])

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    function handlePointerDown(event) {
      if (reduceMotion.matches) return

      const target =
        event.target instanceof Element
          ? event.target.closest("a, button")
          : null

      if (!target) return

      const id = `${Date.now()}-${Math.random()}`
      const rect = target.getBoundingClientRect()
      const x = event.clientX || rect.left + rect.width / 2
      const y = event.clientY || rect.top + rect.height / 2

      setBursts((current) => [
        ...current,
        {
          id,
          x,
          y,
          touch: event.pointerType !== "mouse",
        },
      ])

      window.setTimeout(() => {
        setBursts((current) => current.filter((item) => item.id !== id))
      }, 720)
    }

    window.addEventListener("pointerdown", handlePointerDown)

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className={`warm-burst ${burst.touch ? "touch" : "mouse"}`}
          style={{ left: burst.x, top: burst.y }}
        >
          <span className="warm-ring" />
          <span className="warm-ring warm-ring-soft" />
          <span className="warm-dot" />
        </div>
      ))}
    </div>
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