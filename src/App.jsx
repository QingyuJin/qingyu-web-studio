import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"

const services = [
  {
    title: "一頁式形象網站",
    desc: "適合小型店家、個人品牌與服務介紹，協助整理品牌資訊、服務內容、聯絡方式與行動版排版。",
  },
  {
    title: "個人作品集網站",
    desc: "適合學生、求職者、設計師、攝影師與創作者，展示個人經歷、技能、作品與聯絡方式。",
  },
  {
    title: "活動 / 社團宣傳頁",
    desc: "適合社團招生、講座、營隊、比賽與校園活動，清楚呈現活動資訊、流程與報名連結。",
  },
  {
    title: "網站修改與手機版優化",
    desc: "協助調整舊網站排版、文字圖片、按鈕、區塊間距與 RWD 手機版顯示。",
  },
]

const works = [
  {
    title: "個人作品集網站",
    tag: "Portfolio Website",
    desc: "適合學生、求職者與創作者，用來展示經歷、技能、作品與聯絡方式。",
    link: "/portfolio-demo",
    accent: "from-stone-900 to-stone-600",
    previewTitle: "Personal Portfolio",
    previewSubtitle: "About · Skills · Projects",
  },
  {
    title: "咖啡店一頁式網站",
    tag: "Landing Page",
    desc: "適合小型餐飲品牌，包含品牌介紹、菜單、環境照、營業資訊與預約按鈕。",
    link: "/cafe-demo",
    accent: "from-amber-900 to-orange-500",
    previewTitle: "Qing Coffee",
    previewSubtitle: "Menu · Space · Visit",
  },
  {
    title: "活動宣傳頁",
    tag: "Event Page",
    desc: "適合社團活動、講座與工作坊，清楚呈現時間地點、活動流程與報名資訊。",
    link: "/event-demo",
    accent: "from-slate-950 to-cyan-600",
    previewTitle: "Campus Workshop",
    previewSubtitle: "Schedule · Info · Sign Up",
  },
]

const strengths = [
  {
    title: "手機版友善",
    desc: "以 RWD 響應式排版製作，讓網站在手機、平板與電腦上都能清楚閱讀。",
  },
  {
    title: "資訊整理清楚",
    desc: "協助把服務內容、作品、價格、地址與聯絡方式整理成容易理解的網站架構。",
  },
  {
    title: "適合小型需求",
    desc: "專注於個人作品集、小店形象頁、活動頁與簡易網站修改，不把需求複雜化。",
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

const process = [
  "討論需求",
  "整理架構",
  "製作初版",
  "修改調整",
  "上線交付",
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cafe-demo" element={<CafeDemo />} />
      <Route path="/portfolio-demo" element={<PortfolioDemo />} />
      <Route path="/event-demo" element={<EventDemo />} />
    </Routes>
  )
}

function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-stone-950">
      <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f4ef]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="text-sm font-semibold tracking-tight md:text-base">
            Qingyu Web Studio
          </a>

          <nav className="hidden items-center gap-6 text-sm text-stone-600 md:flex">
            <a href="#services" className="hover:text-stone-950">服務</a>
            <a href="#works" className="hover:text-stone-950">作品</a>
            <a href="#prices" className="hover:text-stone-950">價格</a>
            <a href="#contact" className="rounded-full bg-stone-950 px-4 py-2 text-white hover:bg-stone-800">
              聯絡我
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-stone-300 bg-white/60 px-4 py-2 text-sm text-stone-600 shadow-sm">
            資訊工程學系學生｜網頁設計與前端切版接案
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight md:text-7xl">
            為學生、小型店家與個人品牌製作清楚好用的網站。
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-stone-600">
            我協助整理網站架構、製作 RWD 手機版頁面，並協助部署上線。
            適合個人作品集、一頁式形象網站、活動宣傳頁與舊網站簡單優化。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              查看作品
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-300 bg-white/50 px-6 py-3 text-sm font-medium transition hover:border-stone-950"
            >
              討論需求
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm">
            <Stat number="3+" label="Demo 作品" />
            <Stat number="RWD" label="手機版支援" />
            <Stat number="Vercel" label="協助上線" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 hidden h-32 w-32 rounded-full bg-amber-200/60 blur-3xl md:block" />
          <div className="absolute -bottom-8 -right-8 hidden h-40 w-40 rounded-full bg-stone-300/70 blur-3xl md:block" />

          <div className="relative rounded-[2.2rem] border border-stone-200 bg-white/70 p-4 shadow-xl shadow-stone-300/30 backdrop-blur">
            <div className="rounded-[1.7rem] bg-stone-950 p-4 text-white">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="grid gap-3">
                {works.map((work) => (
                  <Link
                    key={work.title}
                    to={work.link}
                    className="group overflow-hidden rounded-3xl bg-white/10 p-4 transition hover:bg-white/15"
                  >
                    <div className={`h-28 rounded-2xl bg-gradient-to-br ${work.accent} p-4`}>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                        {work.tag}
                      </p>
                      <p className="mt-5 text-xl font-semibold">{work.previewTitle}</p>
                      <p className="mt-1 text-sm text-white/70">{work.previewSubtitle}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-white/75">{work.title}</p>
                      <span className="text-sm text-white/50 transition group-hover:translate-x-1 group-hover:text-white">
                        查看 →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
              Services
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              我可以協助的網站類型
            </h2>
          </div>
          <p className="max-w-md leading-7 text-stone-600">
            以小型網站為主，重點放在資訊清楚、版面乾淨、手機版正常與容易聯絡。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-stone-200 bg-white/75 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-stone-950 p-8 text-white md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-400">
            Why Me
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            適合預算有限，但想要正式網站的人。
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {strengths.map((item) => (
              <div key={item.title} className="rounded-3xl bg-white/10 p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-stone-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
              Works
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              作品展示
            </h2>
          </div>
          <p className="max-w-md leading-7 text-stone-600">
            目前先以 Demo 展示可製作的網站方向。實際接案會依照客戶內容、風格與需求重新調整。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {works.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="p-4">
                <div className={`h-56 rounded-[1.5rem] bg-gradient-to-br ${item.accent} p-5 text-white`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {item.tag}
                  </p>
                  <div className="mt-16">
                    <p className="text-2xl font-semibold">{item.previewTitle}</p>
                    <p className="mt-2 text-sm text-white/70">{item.previewSubtitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-2">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{item.desc}</p>

                <div className="mt-6 inline-flex items-center rounded-full bg-stone-950 px-5 py-2 text-sm font-medium text-white">
                  查看 Demo
                  <span className="ml-2 transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="prices" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Pricing
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            價格參考
          </h2>
          <p className="mt-4 max-w-2xl leading-8 text-stone-600">
            實際價格會依照頁面數量、內容多寡、功能需求與修改範圍評估。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {prices.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-stone-200 bg-white/80 p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-5 text-3xl font-semibold">{item.price}</p>
              <p className="mt-5 leading-7 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] border border-stone-200 bg-white/80 p-8 shadow-sm md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Process
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            接案流程
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {process.map((step, index) => (
              <div key={step} className="rounded-3xl bg-stone-100 p-5">
                <p className="text-sm text-stone-500">0{index + 1}</p>
                <p className="mt-3 font-semibold">{step}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 leading-8 text-stone-600">
            報價會先確認需求與製作範圍，通常包含 1–2 次小幅修改。
            若後續增加頁面、功能或大幅變更內容，會另外報價。
          </p>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] bg-stone-950 p-8 text-white md:p-12">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-stone-400">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            有網站需求，可以先討論。
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-stone-300">
            適合個人作品集、一頁式網站、小店形象頁、活動頁與簡易網站修改。
            可以先傳需求，我會協助評估內容與報價。
          </p>

          <div className="mt-9 grid gap-4 text-stone-200 md:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Email</p>
              <a
                href="mailto:a0988874324@gmail.com"
                className="mt-2 block hover:underline"
              >
                a0988874324@gmail.com
              </a>
            </div>

            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">LINE</p>
              <p className="mt-2">mulavuc</p>
            </div>

            <div className="rounded-3xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Instagram</p>
              <a
                href="https://www.instagram.com/qingyu.jin"
                target="_blank"
                rel="noreferrer"
                className="mt-2 block hover:underline"
              >
                qingyu.jin
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 shadow-sm">
      <p className="text-lg font-semibold">{number}</p>
      <p className="mt-1 text-xs text-stone-500">{label}</p>
    </div>
  )
}

export default App