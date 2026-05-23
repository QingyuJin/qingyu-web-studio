import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"

const services = [
  {
    title: "一頁式形象網站",
    desc: "適合小型店家、個人品牌、活動宣傳。包含服務介紹、作品展示、聯絡方式與手機版排版。",
  },
  {
    title: "個人作品集網站",
    desc: "適合學生、設計師、攝影師、求職者。展示個人經歷、技能、作品與聯絡方式。",
  },
  {
    title: "活動 / 社團頁面",
    desc: "適合社團招生、講座、營隊、比賽頁面。包含活動資訊、流程、報名連結。",
  },
  {
    title: "網站修改與手機版優化",
    desc: "協助調整舊網站排版、圖片、文字、按鈕，以及 RWD 手機版顯示。",
  },
]

const works = [
  {
    title: "個人作品集網站",
    tag: "Portfolio",
    desc: "適合學生、設計師、攝影師與求職者，用來展示作品、技能與經歷。",
    link: "/portfolio-demo",
  },
  {
    title: "咖啡店一頁式網站",
    tag: "Landing Page",
    desc: "品牌介紹、菜單、環境照片、Google Map 與 LINE 預約按鈕。",
    link: "/cafe-demo",
  },
  {
    title: "活動宣傳頁",
    tag: "Event Page",
    desc: "適合社團招生、講座、營隊與校園活動，用來展示活動資訊、流程與報名連結。",
    link: "/event-demo",
  },
]

const prices = [
  {
    title: "基本單頁網站",
    price: "NT$3,000 起",
    desc: "適合履歷、簡單作品集、活動介紹頁。",
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
    </Routes>
  )
}

function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="font-semibold tracking-tight">
            Qingyu Web Studio
          </a>

          <nav className="hidden gap-6 text-sm text-stone-600 md:flex">
            <a href="#services" className="hover:text-stone-950">服務</a>
            <a href="#works" className="hover:text-stone-950">作品</a>
            <a href="#prices" className="hover:text-stone-950">價格</a>
            <a href="#contact" className="hover:text-stone-950">聯絡</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-28">
        <div>
          <p className="mb-4 text-sm font-medium text-stone-500">
            資訊工程學系學生｜網頁設計與前端切版接案
          </p>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            我協助學生、小型店家與個人品牌，製作乾淨、清楚、手機版友善的網站。
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
            我是資訊工程學系學生，主要提供一頁式形象網站、個人作品集網站、
            活動頁與簡易前端切版服務。適合學生、小型店家、社團活動與個人品牌，
            用合理預算建立正式、清楚、手機版友善的網站。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              查看作品集
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium transition hover:border-stone-950"
            >
              聯絡我討論需求
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="rounded-[1.5rem] bg-stone-950 p-6 text-white">
            <p className="text-sm text-stone-300">目前接案方向</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight">
              一頁式網站、個人作品集、小店形象頁
            </h2>
            <p className="mt-5 text-sm leading-7 text-stone-300">
              以清楚資訊架構、RWD 手機版、快速上線為主，協助客戶用合理預算建立正式網站。
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-stone-100 p-4">
              <p className="text-stone-500">起始價格</p>
              <p className="mt-1 text-xl font-semibold">NT$3,000+</p>
            </div>
            <div className="rounded-2xl bg-stone-100 p-4">
              <p className="text-stone-500">適合需求</p>
              <p className="mt-1 text-xl font-semibold">小型網站</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium text-stone-500">Services</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">服務項目</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((item) => (
            <div key={item.title} className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="works" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium text-stone-500">Works</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">作品集</h2>
          <p className="mt-4 max-w-2xl text-stone-600">
            先用 Demo 作品展示能力，之後每完成一個真實案件，就更新到這裡。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {works.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm"
            >
              <div className="flex h-44 items-center justify-center bg-stone-200 text-stone-500">
                作品預覽圖
              </div>

              <div className="p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-400">
                  {item.tag}
                </p>

                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="mt-3 leading-7 text-stone-600">{item.desc}</p>

                <Link
                  to={item.link}
                  className="mt-5 inline-block rounded-full bg-stone-950 px-5 py-2 text-sm font-medium text-white hover:bg-stone-800"
                >
                  查看 Demo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="prices" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium text-stone-500">Pricing</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">價格方案</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {prices.map((item) => (
            <div key={item.title} className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-3xl font-semibold">{item.price}</p>
              <p className="mt-4 leading-7 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-stone-200 md:p-10">
          <p className="text-sm font-medium text-stone-500">Process</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">接案流程</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {["討論需求", "確認報價", "製作初版", "修改調整", "上線交付"].map((step, index) => (
              <div key={step} className="rounded-2xl bg-stone-100 p-5">
                <p className="text-sm text-stone-500">0{index + 1}</p>
                <p className="mt-2 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2rem] bg-stone-950 p-8 text-white md:p-12">
          <p className="text-sm font-medium text-stone-400">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">聯絡我討論網站需求</h2>
          <p className="mt-5 max-w-2xl leading-8 text-stone-300">
            有作品集、一頁式網站、小店形象頁或活動頁需求，可以先傳訊息討論。
          </p>

          <div className="mt-8 grid gap-4 text-stone-200 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Email</p>
              <a
                href="mailto:a0988874324@gmail.com"
                className="mt-1 block hover:underline"
              >
                a0988874324@gmail.com
              </a>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">LINE</p>
              <p className="mt-1">mulavuc</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Instagram</p>
              <a
                href="https://www.instagram.com/qingyu.jin"
                target="_blank"
                rel="noreferrer"
                className="mt-1 block hover:underline"
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

export default App