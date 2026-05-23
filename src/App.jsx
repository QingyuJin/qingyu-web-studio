import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"
import ServiceDemo from "./ServiceDemo"

const services = [
  {
    title: "一頁式形象網站",
    desc: "適合小型店家、個人品牌、服務介紹與工作室形象頁。重點是讓訪客快速理解你提供什麼、適合誰、如何聯絡。",
    number: "01",
  },
  {
    title: "個人作品集網站",
    desc: "適合學生、求職者、設計師、攝影師與創作者。協助整理個人介紹、技能、作品、經歷與聯絡入口。",
    number: "02",
  },
  {
    title: "活動 / 社團宣傳頁",
    desc: "適合社團招生、講座、營隊、比賽與校園活動。清楚呈現活動亮點、時間地點、流程與報名連結。",
    number: "03",
  },
  {
    title: "網站修改與手機版優化",
    desc: "協助調整舊網站排版、文字圖片、按鈕、區塊間距與 RWD 手機版顯示，讓網站更清楚好讀。",
    number: "04",
  },
]

const works = [
  {
    title: "個人作品集網站",
    category: "Portfolio",
    desc: "適合學生、求職者與創作者，用來展示經歷、技能、作品與聯絡方式。",
    fit: "學生履歷 / 設計師作品集 / 攝影師作品集 / 求職網站",
    link: "/portfolio-demo",
    accent: "from-stone-900 via-stone-700 to-stone-500",
    previewTitle: "Personal Portfolio",
    previewSubtitle: "About · Skills · Projects",
  },
  {
    title: "小型店家形象頁",
    category: "Landing Page",
    desc: "適合小型餐飲、個人工作室與服務型品牌，集中呈現品牌、商品、地點與預約方式。",
    fit: "咖啡店 / 美甲工作室 / 攝影工作室 / 健身教練",
    link: "/cafe-demo",
    accent: "from-amber-950 via-orange-700 to-amber-400",
    previewTitle: "Wuchiu Coffee",
    previewSubtitle: "Menu · Space · Visit",
  },
  {
    title: "活動宣傳頁",
    category: "Event Page",
    desc: "適合社團活動、講座與工作坊，讓參與者快速了解活動內容並完成報名。",
    fit: "社團招生 / 講座活動 / 營隊 / 比賽 / 課程報名",
    link: "/event-demo",
    accent: "from-slate-950 via-blue-900 to-cyan-500",
    previewTitle: "Campus Workshop",
    previewSubtitle: "Schedule · Info · Sign Up",
  },
  {
    title: "科技服務中心網站",
    category: "Service Website",
    desc: "適合顧問服務、數位工作室、SaaS 工具與小型團隊，用來展示服務內容、流程與聯絡入口。",
    fit: "顧問服務 / SaaS / 數位工作室 / 課程品牌 / 小型團隊",
    link: "/service-demo",
    accent: "from-cyan-500 via-blue-600 to-violet-700",
    previewTitle: "Service Center",
    previewSubtitle: "Services · Process · Contact",
  },
]

const modules = [
  "首頁主視覺",
  "關於我們",
  "服務項目",
  "價格方案",
  "作品展示",
  "菜單 / 商品",
  "活動流程",
  "FAQ",
  "Google Map",
  "LINE / IG / Email",
  "表單 / 報名連結",
  "案例說明",
]

const buildSteps = [
  {
    title: "了解目標",
    desc: "確認網站用途、目標客戶、希望訪客完成的行動。",
  },
  {
    title: "整理內容",
    desc: "協助整理服務、作品、價格、地址、聯絡方式與必要資訊。",
  },
  {
    title: "組合模組",
    desc: "依照需求選擇首頁、服務、作品、FAQ、表單、地圖等區塊。",
  },
  {
    title: "製作 RWD",
    desc: "完成桌機版與手機版排版，確保閱讀與操作清楚。",
  },
  {
    title: "部署上線",
    desc: "協助上線網站，提供公開連結與基本交付說明。",
  },
]

const prices = [
  {
    title: "基本單頁網站",
    price: "NT$3,000 起",
    desc: "適合個人履歷、簡單作品集、活動介紹頁。",
  },
  {
    title: "標準一頁式網站",
    price: "NT$5,000–8,000",
    desc: "適合小店形象頁、個人品牌頁、服務介紹頁。",
  },
  {
    title: "網站修改",
    price: "NT$500–1,000 / 小時",
    desc: "適合舊網站排版調整、手機版修正、圖片文字更新。",
  },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cafe-demo" element={<CafeDemo />} />
      <Route path="/portfolio-demo" element={<PortfolioDemo />} />
      <Route path="/event-demo" element={<EventDemo />} />
      <Route path="/service-demo" element={<ServiceDemo />} />
    </Routes>
  )
}

function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0f1115] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-[-160px] top-[260px] h-[520px] w-[520px] rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute bottom-[-200px] left-[30%] h-[480px] w-[480px] rounded-full bg-violet-500/10 blur-[130px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1115]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-semibold tracking-tight">
            Qingyu Web Studio
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            <a href="#services" className="hover:text-white">
              服務
            </a>
            <a href="#modules" className="hover:text-white">
              模組
            </a>
            <a href="#works" className="hover:text-white">
              作品
            </a>
            <a href="#prices" className="hover:text-white">
              價格
            </a>
            <a
              href="#contact"
              className="rounded-full bg-white px-4 py-2 font-medium text-stone-950 hover:bg-cyan-200"
            >
              聯絡我
            </a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.02fr_0.98fr] md:items-center md:pb-28 md:pt-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
            資訊工程背景｜小型網站設計與前端製作
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            把零散的想法，整理成一個能被看懂、能被聯絡、能上線的網站。
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/65">
            專注製作個人作品集、一頁式形象網站、活動頁與服務型網站。
            從內容架構、RWD 前端製作到部署上線，協助小型需求快速擁有正式網站。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-cyan-200"
            >
              查看作品案例
            </a>
            <a
              href="#modules"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              看可客製模組
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <Stat number="4+" label="網站案例" />
            <Stat number="RWD" label="手機版支援" />
            <Stat number="Launch" label="協助部署" />
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.8rem] bg-[#151924] p-4">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Portfolio Online
                </span>
              </div>

              <div className="grid gap-4">
                {works.map((work, index) => (
                  <Link
                    key={work.title}
                    to={work.link}
                    className={`group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 p-3 transition hover:-translate-y-1 hover:bg-white/10 ${
                      index === 1 ? "md:ml-8" : ""
                    } ${index === 2 ? "md:mr-8" : ""}`}
                  >
                    <div className={`rounded-[1.25rem] bg-gradient-to-br ${work.accent} p-5`}>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                        {work.category}
                      </p>
                      <div className="mt-8 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-2xl font-semibold">{work.previewTitle}</p>
                          <p className="mt-1 text-sm text-white/70">
                            {work.previewSubtitle}
                          </p>
                        </div>
                        <span className="text-sm text-white/60 transition group-hover:translate-x-1 group-hover:text-white">
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
      </section>

      <section id="services" className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Services"
          title="不是單純做畫面，而是把內容整理成網站。"
          desc="我目前專注在小型網站需求，協助把資訊整理清楚、做成 RWD 頁面，並協助部署上線。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((item) => (
            <div
              key={item.title}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <p className="text-sm text-cyan-300">{item.number}</p>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="modules" className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-white p-8 text-stone-950 md:p-12">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
                Flexible Modules
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                網站可以依需求組合，不只是套固定模板。
              </h2>
            </div>
            <p className="max-w-md leading-8 text-stone-600">
              每個客戶需要的內容不同，我會依照產業、目標與資料完整度，組合適合的網站區塊。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {modules.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-sm font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Works"
          title="四種不同方向的網站案例。"
          desc="目前先用 Demo 展示可製作的網站方向；實際接案會依照客戶內容、品牌風格與需求重新調整。"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {works.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <div className={`h-72 rounded-[1.5rem] bg-gradient-to-br ${item.accent} p-6`}>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                  {item.category}
                </p>

                <div className="mt-28">
                  <p className="text-3xl font-semibold">{item.previewTitle}</p>
                  <p className="mt-2 text-sm text-white/70">{item.previewSubtitle}</p>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/60">{item.desc}</p>
                <p className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-7 text-white/55">
                  可延伸：{item.fit}
                </p>

                <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-stone-950">
                  查看案例
                  <span className="ml-2 transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            From Brief To Website
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            我如何把需求整理成網站？
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {buildSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm text-cyan-300">0{index + 1}</p>
                <p className="mt-3 font-semibold">{step.title}</p>
                <p className="mt-3 text-sm leading-6 text-white/55">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          eyebrow="Pricing"
          title="先用合理範圍開始，再依需求調整。"
          desc="實際價格會依照頁面數量、內容多寡、功能需求與修改範圍評估。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {prices.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-5 text-3xl font-semibold text-cyan-300">
                {item.price}
              </p>
              <p className="mt-5 leading-7 text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] bg-cyan-300 p-8 text-stone-950 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-700">
            Contact
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            有網站需求，可以先把想法傳給我。
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-stone-700">
            適合個人作品集、一頁式網站、小店形象頁、活動頁與簡易網站修改。
            我可以先協助評估內容、頁面架構與大致報價。
          </p>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <ContactCard label="Email" value="a0988874324@gmail.com" href="mailto:a0988874324@gmail.com" />
            <ContactCard label="LINE" value="mulavuc" />
            <ContactCard label="Instagram" value="qingyu.jin" href="https://www.instagram.com/qingyu.jin" />
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md leading-8 text-white/60">{desc}</p>
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-xl font-semibold text-cyan-300">{number}</p>
      <p className="mt-2 text-xs text-white/45">{label}</p>
    </div>
  )
}

function ContactCard({ label, value, href }) {
  const content = (
    <>
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="rounded-3xl bg-white/70 p-5 transition hover:bg-white"
      >
        {content}
      </a>
    )
  }

  return <div className="rounded-3xl bg-white/70 p-5">{content}</div>
}

export default App