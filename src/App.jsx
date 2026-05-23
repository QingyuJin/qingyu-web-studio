import { Routes, Route, Link } from "react-router-dom"
import CafeDemo from "./CafeDemo"
import PortfolioDemo from "./PortfolioDemo"
import EventDemo from "./EventDemo"
import ServiceDemo from "./ServiceDemo"
import BriefPage from "./BriefPage"
import LumaNailDemo from "./LumaNailDemo"

const featuredWorks = [
  {
    title: "美甲工作室形象頁",
    subtitle: "Beauty Studio Landing Page",
    desc: "適合美甲、美睫、美容、霧眉、攝影與其他預約制個人工作室。重點是展示服務、價格、作品風格、預約流程與聯絡方式。",
    link: "/luma-nail",
    color: "from-[#f4c7b8] via-[#b58a79] to-[#2f2723]",
    tags: ["服務價格", "作品展示", "預約流程", "FAQ"],
  },
  {
    title: "服務型網站",
    subtitle: "Service Website",
    desc: "適合顧問服務、數位工作室、SaaS 工具與小型團隊。重點是把服務內容、流程、方案與聯絡方式整理清楚。",
    link: "/service-demo",
    color: "from-cyan-400 via-blue-500 to-violet-600",
    tags: ["服務介紹", "方案比較", "需求確認", "CTA"],
  },
  {
    title: "個人作品集網站",
    subtitle: "Personal Portfolio",
    desc: "適合學生、求職者、設計師、攝影師與創作者。協助整理個人介紹、作品案例、經歷與聯絡方式。",
    link: "/portfolio-demo",
    color: "from-stone-200 via-stone-500 to-stone-950",
    tags: ["作品展示", "經歷整理", "技能", "聯絡"],
  },
]

const serviceCards = [
  {
    title: "網站架構整理",
    desc: "先協助釐清網站用途、目標對象、必要內容與訪客該完成的行動。",
  },
  {
    title: "前端頁面製作",
    desc: "使用 React、Tailwind CSS 製作乾淨、可維護、手機版友善的頁面。",
  },
  {
    title: "內容模組組合",
    desc: "依需求組合 Hero、服務項目、作品展示、FAQ、地圖、表單與 CTA。",
  },
  {
    title: "部署與交付",
    desc: "協助部署上線，提供公開網址與簡單交付說明。",
  },
]

const modules = [
  "首頁主視覺",
  "服務項目",
  "作品展示",
  "價格方案",
  "菜單 / 商品",
  "活動流程",
  "FAQ",
  "Google Map",
  "LINE / IG / Email",
  "報名 / 預約連結",
  "案例說明",
  "聯絡 CTA",
]

const process = [
  {
    title: "釐清目標",
    desc: "確認網站要給誰看、要達成什麼目的、需要引導訪客做什麼。",
  },
  {
    title: "整理內容",
    desc: "將服務、作品、價格、地點、聯絡方式與素材整理成可用的網站架構。",
  },
  {
    title: "設計版面",
    desc: "依照網站類型規劃視覺風格、區塊順序、資訊層級與行動版排版。",
  },
  {
    title: "製作上線",
    desc: "完成前端頁面、RWD 調整、部署上線與交付連結。",
  },
]

const prices = [
  {
    title: "基本單頁網站",
    price: "NT$3,000 起",
    desc: "適合個人履歷、簡單作品集、活動介紹頁。",
  },
  {
    title: "標準形象頁",
    price: "NT$5,000–8,000",
    desc: "適合小店形象頁、個人品牌頁、服務介紹頁。",
  },
  {
    title: "網站修改 / 優化",
    price: "NT$500–1,000 / 小時",
    desc: "適合舊網站排版調整、手機版修正、圖片文字更新。",
  },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/luma-nail" element={<LumaNailDemo />} />
      <Route path="/service-demo" element={<ServiceDemo />} />
      <Route path="/cafe-demo" element={<CafeDemo />} />
      <Route path="/portfolio-demo" element={<PortfolioDemo />} />
      <Route path="/event-demo" element={<EventDemo />} />
      <Route path="/brief" element={<BriefPage />} />
    </Routes>
  )
}

function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <BackgroundGlow />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="font-semibold tracking-tight">
            Qingyu Web Studio
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/55 md:flex">
            <a href="#works" className="hover:text-white">
              作品
            </a>
            <a href="#services" className="hover:text-white">
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

      <section className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-20 md:grid-cols-[1.02fr_0.98fr] md:items-center md:pb-32 md:pt-28">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur">
            資訊工程背景・前端頁面製作・小型網站設計
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            把想法、服務與作品，整理成一個真正能上線的網站。
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/60">
            我專注製作小型網站：個人作品集、一頁式形象頁、服務型網站與活動頁。
            從內容架構、RWD 前端製作到部署上線，協助你把零散資訊變成清楚可用的網站。
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              查看主打案例
            </a>
            <Link
              to="/brief"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              查看需求表
            </Link>
            <a
              href="#contact"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              聯絡討論
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            <Stat number="3" label="主打案例" />
            <Stat number="RWD" label="手機版支援" />
            <Stat number="Launch" label="協助部署" />
          </div>
        </div>

        <ShowcaseWall />
      </section>

      <section id="works" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Selected Works"
          title="主打三種最容易成交的網站方向。"
          desc="不再用一堆普通 Demo 填版面，而是把作品整理成可延伸的案例方向。"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {featuredWorks.map((work) => (
            <Link
              key={work.title}
              to={work.link}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition hover:-translate-y-2 hover:bg-white/[0.1]"
            >
              <div
                className={`h-72 rounded-[1.5rem] bg-gradient-to-br ${work.color} p-6`}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                  {work.subtitle}
                </p>

                <div className="mt-28">
                  <h3 className="text-3xl font-semibold">{work.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="leading-8 text-white/60">{work.desc}</p>
                <div className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black">
                  查看案例
                  <span className="ml-2 transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            to="/cafe-demo"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-white/55 transition hover:bg-white/[0.08] hover:text-white"
          >
            補充案例：咖啡店一頁式網站 →
          </Link>

          <Link
            to="/event-demo"
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-white/55 transition hover:bg-white/[0.08] hover:text-white"
          >
            補充案例：活動宣傳頁 →
          </Link>
        </div>
      </section>

      <section id="services" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Services"
          title="我不是只做畫面，而是協助你整理網站內容。"
          desc="小型網站最常失敗的原因不是技術太難，而是資訊散亂、重點不清楚、手機版不好讀。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {serviceCards.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
            >
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.5rem] bg-white p-8 text-black md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Flexible System
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                網站不是套固定模板，而是依需求組合模組。
              </h2>
              <p className="mt-6 leading-8 text-black/60">
                不同客戶需要的內容不同。我會依照網站目的、產業類型與資料完整度，
                組合適合的頁面區塊，避免做出看起來漂亮但不好用的網站。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {modules.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Process"
          title="從需求到網站，不是直接開始亂做。"
          desc="先釐清目標與內容，再進入版面與前端製作，能減少修改成本，也讓網站更有方向。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {process.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur"
            >
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/55">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">還不知道怎麼整理需求？</h3>
              <p className="mt-2 leading-7 text-white/60">
                可以先看需求確認表，整理網站用途、內容、風格、功能與預算。
              </p>
            </div>

            <Link
              to="/brief"
              className="inline-flex w-fit rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-200"
            >
              查看需求表 →
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="Pricing"
          title="先從小型需求開始，報價依範圍調整。"
          desc="目前主打小型網站與前端頁面製作，避免一開始接超出範圍的大型系統。"
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
              <p className="mt-5 leading-8 text-white/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-7xl px-5 py-20 pb-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-cyan-300 p-8 text-black md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Contact
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                有網站需求，可以先把想法傳給我。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-black/65">
                你不需要一開始就準備好完整規格。可以先告訴我網站用途、
                參考風格、需要放什麼內容，我會協助整理成可報價的範圍。
              </p>
            </div>

            <div className="grid gap-3">
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
                <p className="mt-2 font-semibold">查看需求確認表 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
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

function ShowcaseWall() {
  return (
    <div className="relative">
      <div className="rounded-[2.4rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="rounded-[1.9rem] bg-[#11141d] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
              Live Preview
            </span>
          </div>

          <div className="grid gap-4">
            {featuredWorks.map((work, index) => (
              <Link
                key={work.title}
                to={work.link}
                className={`group rounded-[1.6rem] border border-white/10 bg-white/5 p-3 transition hover:-translate-y-1 hover:bg-white/10 ${
                  index === 1 ? "md:ml-8" : ""
                }`}
              >
                <div
                  className={`rounded-[1.25rem] bg-gradient-to-br ${work.color} p-5`}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {work.subtitle}
                  </p>
                  <div className="mt-12 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold">{work.title}</p>
                      <p className="mt-1 text-sm text-white/70">
                        {work.tags.join(" · ")}
                      </p>
                    </div>
                    <span className="text-white/60 transition group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <Link
              to="/event-demo"
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 text-white/55 transition hover:bg-white/10 hover:text-white"
            >
              補充案例：活動宣傳頁 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md leading-8 text-white/55">{desc}</p>
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-2xl font-semibold text-cyan-300">{number}</p>
      <p className="mt-2 text-xs text-white/45">{label}</p>
    </div>
  )
}

function ContactCard({ label, value, href }) {
  const content = (
    <>
      <p className="text-sm text-black/50">{label}</p>
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