import { useEffect, useMemo, useRef, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"
import ServiceDemo from "./ServiceDemo"
import BriefPage from "./BriefPage"
import LumaNailDemo from "./LumaNailDemo"
import FitnessCoachDemo from "./FitnessCoachDemo"


const workDemos = [
  {
    title: "Luma Nail Studio",
    category: "預約制工作室",
    type: "studio",
    desc: "把服務、價格、作品、預約流程與聯絡入口整理成一頁式網站。",
    fit: "美甲 / 美睫 / 美容 / 攝影",
    link: "/luma-nail",
    color: "from-[#f4c7b8] via-[#b58a79] to-[#2f2723]",
    tags: ["主打案例", "手機版", "預約"],
  },
  {
    title: "QG Strength Lab",
    category: "健身教練接案工具",
    type: "fitness",
    desc: "力量訓練教練頁、學員初步評估器與 PR Tracker 概念工具。",
    fit: "健身教練 / 力量舉 / 私教 / 健身工作室",
    link: "/fitness-coach",
    color: "from-[#d7ff67] via-cyan-400 to-[#11161c]",
    tags: ["力量訓練", "學員評估", "PR Tracker"],
  },
  {
    title: "Service Demo",
    category: "服務型網站",
    type: "service",
    desc: "適合顧問、課程品牌、自由工作者，重點是服務介紹與方案比較。",
    fit: "顧問 / 課程 / 自由工作者",
    link: "/service-demo",
    color: "from-cyan-400 via-blue-500 to-violet-600",
    tags: ["服務介紹", "方案", "CTA"],
  },
  {
    title: "Portfolio Demo",
    category: "個人作品集",
    type: "portfolio",
    desc: "整理個人介紹、技能、作品、經歷與聯絡方式。",
    fit: "學生 / 求職 / 創作者",
    link: "/portfolio-demo",
    color: "from-stone-200 via-stone-500 to-stone-950",
    tags: ["作品集", "履歷", "個人品牌"],
  },
  {
    title: "Cafe Demo",
    category: "小店形象網站",
    type: "shop",
    desc: "展示品牌氛圍、菜單、地點、營業資訊與社群入口。",
    fit: "咖啡廳 / 小餐飲 / 小店",
    link: "/cafe-demo",
    color: "from-amber-200 via-orange-300 to-stone-900",
    tags: ["餐飲", "菜單", "地點"],
  },
  {
    title: "Event Demo",
    category: "活動宣傳頁",
    type: "event",
    desc: "整理活動資訊、流程、報名入口、注意事項與 FAQ。",
    fit: "講座 / 社團 / 工作坊",
    link: "/event-demo",
    color: "from-violet-400 via-fuchsia-500 to-rose-500",
    tags: ["活動", "報名", "FAQ"],
  },
  {
    title: "Brief Builder",
    category: "互動需求整理器",
    type: "tool",
    desc: "讓客戶先整理網站類型、功能、素材、預算與時程。",
    fit: "需求釐清 / 初步評估",
    link: "/brief",
    color: "from-emerald-300 via-cyan-300 to-blue-500",
    tags: ["需求表", "摘要", "估價前"],
  },
]

const filters = [
  { id: "all", label: "全部" },
  { id: "studio", label: "工作室" },
  { id: "service", label: "服務型" },
  { id: "portfolio", label: "作品集" },
  { id: "shop", label: "小店" },
  { id: "event", label: "活動" },
  { id: "tool", label: "工具" },
  { id: "fitness", label: "健身" },
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

const heroStatus = [
  {
    label: "目前可接",
    value: "一頁式網站 / 作品集 / 工作室網站",
  },
  {
    label: "交付內容",
    value: "RWD / Vercel 部署 / OGP / 表單連結",
  },
  {
    label: "主打案例",
    value: "Luma Nail Studio Case Study",
  },
  {
    label: "適合對象",
    value: "學生 / 小店 / 工作室 / 個人品牌",
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
      <Route path="/fitness-coach" element={<FitnessCoachDemo />} />
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
        <Reveal>
          <div>
            <div className="text-safe mb-5 inline-flex max-w-full rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs leading-5 text-cyan-100 backdrop-blur sm:rounded-full sm:text-sm">
              學生接案｜小型網站・RWD・部署上線
            </div>

            <h1 className="text-safe mobile-soft-title max-w-4xl text-[2.35rem] font-semibold tracking-[-0.04em] sm:text-5xl sm:leading-[1.08] md:text-7xl md:leading-[1.02]">
              <span className="block">把你散落各處的資訊，</span>
              <span className="block text-cyan-300">做成一個真正的網站。</span>
            </h1>

            <p className="text-safe mt-6 max-w-2xl text-base leading-8 text-white/62 sm:text-lg sm:leading-9">
              我是資訊工程學生，協助學生、小型店家、工作室與個人品牌，把 IG、LINE、Google Map、價格表、作品與表單，整理成手機好讀、可以分享、可以被搜尋到的網站。
            </p>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-safe text-sm font-semibold text-cyan-300">
                擅長範圍
              </p>
              <p className="text-safe mt-3 leading-7 text-white/58">
                一頁式官網、作品集、活動頁、服務介紹頁、舊網站手機版優化——不接大型後台或金流系統，把資源留在真正做得好的地方。
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
        </Reveal>

        <Reveal delay={120}>
          <HeroPreview />
        </Reveal>
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
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroStatus.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [])

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
            <p className="text-xs text-cyan-200 md:text-sm">
              {heroStatus[active].label}
            </p>
            <h2 className="text-safe mt-2 text-2xl font-semibold md:mt-3 md:text-3xl">
              {heroStatus[active].value}
            </h2>
            <div className="mt-4 flex gap-2">
              {heroStatus.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  aria-label={`切換到 ${item.label}`}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all ${
                    active === index
                      ? "w-8 bg-cyan-300"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
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
  const [activeFilter, setActiveFilter] = useState("all")

  const visibleWorks = useMemo(() => {
    if (activeFilter === "all") return workDemos
    return workDemos.filter((work) => work.type === activeFilter)
  }, [activeFilter])

  return (
    <section id="works" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Work Gallery"
          title="可以互動篩選的作品 Demo"
          desc="以下是概念 Demo 與練習案例，不假裝是真實客戶案。你可以依照自己的需求類型先看最接近的作品。"
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.id
                  ? "bg-cyan-300 text-black"
                  : "border border-white/10 bg-white/[0.06] text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleWorks.map((work, index) => (
          <Reveal key={work.title} delay={index * 70}>
            <Link
              to={work.link}
              className={`group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:-translate-y-2 hover:bg-white/[0.1] ${
                work.type === "studio" ? "ring-1 ring-cyan-300/40" : ""
              }`}
            >
              <div
                className={`relative min-h-[250px] overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${work.color} p-6`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.12),transparent_30%)]" />

                <div className="relative flex items-start justify-between gap-3">
                  <p className="text-safe text-xs uppercase tracking-[0.18em] text-white/70">
                    {work.category}
                  </p>
                  <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                    Demo
                  </span>
                </div>

                <div className="relative mt-auto flex min-h-[160px] flex-col justify-end">
                  <p className="text-safe text-xl font-semibold">{work.title}</p>
                  <p className="text-safe mt-1 text-xs leading-5 text-white/72">{work.tags.join(" · ")}</p>
                </div>
              </div>

                <div className="relative mt-7">
                  <WorkPreview type={work.type} />
                </div>

                <div className="relative mt-7">
                  <h3 className="text-safe text-3xl font-semibold leading-tight tracking-[-0.04em] text-white">
                    {work.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
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

              <div className="p-4">
                <p className="text-safe text-sm font-semibold text-cyan-300">
                  適合：{work.fit}
                </p>
                <p className="text-safe mt-3 leading-7 text-white/65">{work.desc}</p>

                <div className="mt-5 flex items-center gap-2">
                  <div className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition group-hover:bg-cyan-300">
                    打開作品
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WorkPreview({ type }) {
  if (type === "fitness") {
    return (
      <div className="grid gap-3">
        <div className="rounded-2xl bg-black/30 p-4 text-white backdrop-blur">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-white/45">TOTAL</div>
              <div className="mt-1 text-3xl font-bold">630kg</div>
            </div>
            <div className="rounded-full bg-[#d7ff67] px-3 py-1 text-xs font-bold text-black">
              QG
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/20 p-3 text-center text-xs font-semibold text-white">
            SQ 240
          </div>
          <div className="rounded-xl bg-white/20 p-3 text-center text-xs font-semibold text-white">
            BP 140
          </div>
          <div className="rounded-xl bg-white/20 p-3 text-center text-xs font-semibold text-white">
            DL 250
          </div>
        </div>
      </div>
    )
  }
  if (type === "studio") {
    return (
      <div className="grid gap-3">
        <div className="rounded-2xl bg-white/22 p-4 backdrop-blur">
          <div className="h-3 w-24 rounded-full bg-white/70" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-white/45" />
            <div className="h-14 rounded-xl bg-white/25" />
            <div className="h-14 rounded-xl bg-white/35" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 flex-1 rounded-full bg-white text-xs font-semibold text-black grid place-items-center">
            LINE
          </div>
          <div className="h-8 flex-1 rounded-full bg-white/20 text-xs font-semibold text-white grid place-items-center">
            IG
          </div>
        </div>
      </div>
    )
  }

  if (type === "service") {
    return (
      <div className="grid gap-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white p-3 text-black">
            <div className="h-2 w-10 rounded-full bg-black/20" />
            <div className="mt-6 text-xs font-bold">Basic</div>
          </div>
          <div className="rounded-2xl bg-black/30 p-3 text-white ring-1 ring-white/30">
            <div className="h-2 w-10 rounded-full bg-white/40" />
            <div className="mt-6 text-xs font-bold">Pro</div>
          </div>
          <div className="rounded-2xl bg-white/20 p-3 text-white">
            <div className="h-2 w-10 rounded-full bg-white/40" />
            <div className="mt-6 text-xs font-bold">Custom</div>
          </div>
        </div>
        <div className="h-2 rounded-full bg-white/20">
          <div className="h-2 w-2/3 rounded-full bg-white/80" />
        </div>
      </div>
    )
  }

  if (type === "portfolio") {
    return (
      <div className="rounded-2xl bg-white/18 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/70" />
          <div className="flex-1">
            <div className="h-3 w-24 rounded-full bg-white/70" />
            <div className="mt-2 h-2 w-32 rounded-full bg-white/35" />
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <div className="h-8 rounded-xl bg-white/25" />
          <div className="h-8 rounded-xl bg-white/15" />
        </div>
      </div>
    )
  }

  if (type === "shop") {
    return (
      <div className="grid gap-3">
        <div className="rounded-2xl bg-white/70 p-4 text-black">
          <div className="flex justify-between text-xs font-semibold">
            <span>Latte</span>
            <span>$120</span>
          </div>
          <div className="mt-3 flex justify-between text-xs font-semibold">
            <span>Toast</span>
            <span>$90</span>
          </div>
        </div>
        <div className="rounded-2xl bg-black/25 p-3 text-xs font-semibold text-white">
          Map · Open 10:00 - 18:00
        </div>
      </div>
    )
  }

  if (type === "event") {
    return (
      <div className="rounded-2xl bg-white/18 p-4">
        <div className="grid gap-3">
          {["13:00 入場", "14:00 主講", "16:00 交流"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white" />
              <div className="h-7 flex-1 rounded-xl bg-white/25 px-3 text-xs font-semibold text-white grid items-center">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white/18 p-4">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-white" />
          <div className="h-3 flex-1 rounded-full bg-white/45" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md border border-white/50" />
          <div className="h-3 flex-1 rounded-full bg-white/30" />
        </div>
        <div className="mt-3 rounded-xl bg-white/20 p-3 text-xs font-semibold text-white">
          自動產生需求摘要
        </div>
      </div>
    </div>
  )
}

function LumaFeatureSection() {
  return (
    <section id="main-case" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
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
      </Reveal>
    </section>
  )
}

function ServiceSection() {
  return (
    <section id="service" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="What I Actually Do"
          title="我真正協助的是整理、切版、手機版和上線。"
          desc="不是只生一張漂亮圖，而是讓小型網站能被理解、能被點擊、能被分享、能被修改。"
        />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {servicePoints.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.08]">
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="text-safe mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ProofSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
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
                誠實標示範圍，對雙方都安全。目前專注在小型網站，把每一個案子做好，再慢慢累積能力邊界。
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
      </Reveal>
    </section>
  )
}

function ProcessSection() {
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Process"
          title="流程簡單一點，客戶比較知道下一步。"
          desc="先看作品，再整理需求，確認範圍後才開始製作。"
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="relative grid gap-5 md:grid-cols-4">
          <div className="pointer-events-none absolute left-[2.75rem] top-[1.375rem] hidden h-px w-[calc(100%-5.5rem)] border-t border-dashed border-white/20 md:block" />

          {process.map((item, index) => (
            <div
              key={item.title}
              className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-black">
                0{index + 1}
              </div>
              <h3 className="text-safe text-2xl font-semibold">{item.title}</h3>
              <p className="text-safe mt-4 leading-7 text-white/58">{item.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function DeliverySection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
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
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.08]"
              >
                <h3 className="text-safe text-xl font-semibold text-cyan-300">
                  {item.title}
                </h3>
                <p className="text-safe mt-4 leading-7 text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-16 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Pricing"
          title="報價透明，不偷加隱藏費用。"
          desc="先從小型需求開始，依實際範圍調整。第一批案子以累積真實作品與流程經驗為主。"
        />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {pricing.map((item, index) => (
          <Reveal key={item.title} delay={index * 80}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.08]">
              <h3 className="text-safe text-xl font-semibold">{item.title}</h3>
              <p className="text-safe mt-5 text-3xl font-semibold text-cyan-300">
                {item.price}
              </p>
              <p className="text-safe mt-5 leading-8 text-white/58">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-16 pb-28 md:py-20">
      <Reveal>
        <div className="overflow-hidden rounded-[2.8rem] bg-cyan-300 p-8 text-black md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div className="min-w-0">
              <p className="text-safe mobile-soft-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Contact
              </p>
              <h2 className="text-safe mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                有網站需求，把想法傳給我就好。
              </h2>
              <p className="text-safe mt-6 max-w-2xl leading-8 text-black/65">
                不需要準備完整規格。說說網站用途、喜歡的風格、手上有的素材、預算和希望完成的時間，我先判斷是否在範圍內。
              </p>
            </div>

            <div className="grid min-w-0 gap-3">
              <ContactCard label="Email" value="a0988874324@gmail.com" href="mailto:a0988874324@gmail.com" />
              <ContactCard label="LINE ID（點擊複製）" value="mulavuc" copyable />
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
      </Reveal>
    </section>
  )
}

function MobileBottomCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-[1.6rem] border border-white/10 bg-[#08090d]/88 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
      <Link
        to="/brief"
        className="breathing-cta flex items-center justify-center rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-black"
      >
        先整理需求，取得初步評估 →
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

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (reduceMotion.matches) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.16 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-block ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
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

function ContactCard({ label, value, href, copyable }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    })
  }

  const content = (
    <>
      <p className="text-safe text-sm text-black/50">{label}</p>
      <p className="text-safe mt-2 font-semibold">{copied ? "已複製！" : value}</p>
    </>
  )

  if (copyable) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-3xl bg-white/70 p-5 text-left transition hover:-translate-y-1 hover:bg-white"
      >
        {content}
      </button>
    )
  }

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