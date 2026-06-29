import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { projects, seo } from "./site/content"

const productOrder = ["company-site", "tracking-system", "memberhub", "quiz-page", "buildflow", "linebot"]
const productCards = productOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean)

const featuredCases = [
  projects.find((project) => project.slug === "company-site"),
  projects.find((project) => project.slug === "tracking-system"),
  projects.find((project) => project.slug === "buildflow"),
  projects.find((project) => project.slug === "memberhub"),
].filter(Boolean)

const quickGuide = [
  ["只要展示公司", "公司一頁式官網"],
  ["要查貨件 / 案件進度", "查件系統 MVP"],
  ["要會員登入 / 檔案下載", "會員專區系統"],
  ["要題目測驗", "互動測驗頁"],
  ["要工程接案流程", "工程行接案系統"],
  ["要自動回 LINE", "LINE 自動回覆"],
]

const serviceScopes = [
  ["網站製作", "形象頁、公司頁、作品頁。"],
  ["LINE Bot", "FAQ、預約說明、關鍵字回覆。"],
  ["互動工具", "測驗、診斷、網站健檢。"],
  ["小型後台 / API", "查件、會員、表單與狀態管理。"],
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />
      <HeroSection />
      <ProductShowcase />
      <CaseShowcase />
      <WorkflowSection />
      <ServiceScopeSection />
      <FinalCta />
    </SiteLayout>
  )
}

function HeroSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl gap-8 px-4 py-12 md:min-h-[720px] md:grid-cols-[0.92fr_1.08fr] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0d6b62]">Qingyu Web Studio</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,8vw,5.2rem)] font-black leading-[1.02] tracking-[-0.02em] text-[#111c22]">
            看成品，選一個像你要的網站或系統
          </h1>
          <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
            我把常見接案需求做成可展示的成品範例。你可以直接看成品，再改成你的公司、店家或流程。
          </p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a href="#products" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#111c22] px-6 text-sm font-black text-white transition hover:bg-[#27333a]">
              查看成品
            </a>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#0d6b62] bg-white px-6 text-sm font-black text-[#0d6b62] transition hover:bg-[#eef7f4]">
              我想做類似的
            </Link>
            <Link to="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#d8d2c5] bg-white px-6 text-sm font-black text-[#111c22] transition hover:border-[#111c22]">
              看價格參考
            </Link>
          </div>
        </div>
        <HeroMockup />
      </div>
    </section>
  )
}

function HeroMockup() {
  return (
    <div className="rounded-[1.6rem] border border-[#dfd8cb] bg-white p-4 shadow-2xl shadow-[#142321]/10 md:p-5">
      <div className="rounded-[1.25rem] bg-[#111c22] p-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black text-[#8fd6cc]">Product Shelf</p>
            <h2 className="mt-2 text-2xl font-black">成品展示櫃</h2>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">可客製</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {productCards.slice(0, 4).map((project) => (
            <div key={project.slug} className="rounded-xl border border-white/10 bg-white/8 p-4">
              <div className="h-2 w-16 rounded-full bg-[#8fd6cc]" />
              <p className="mt-4 text-sm font-black">{project.title}</p>
              <p className="mt-2 line-clamp-2 text-xs font-bold leading-5 text-white/62">{project.summary}</p>
              <div className="mt-4 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full bg-[#f0c36a]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {["看成品", "改內容", "上線交付"].map((item) => (
          <div key={item} className="rounded-xl border border-[#e8e1d6] bg-[#faf8f3] px-4 py-3 text-sm font-black text-[#111c22]">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductShowcase() {
  return (
    <section id="products" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="Product Demos"
          title="可客製成品範例"
          text="點進去可以直接看成品，喜歡哪一種，再改成你的內容與需求。"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productCards.map((project) => (
            <ProductCard key={project.slug} project={project} />
          ))}
        </div>
        <QuickGuide />
      </div>
    </section>
  )
}

function ProductCard({ project }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4 transition hover:-translate-y-1 hover:border-[#0d6b62] hover:shadow-xl hover:shadow-[#162321]/10">
      <ProductPreview project={project} />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
          <h3 className="mt-2 text-xl font-black text-[#111c22]">{project.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-[#6b6258]">{project.price}</span>
      </div>
      <p className="mt-3 line-clamp-2 min-h-12 text-sm font-bold leading-6 text-[#52605c]">{project.summary}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]">
          查看成品
        </Link>
        <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#d8d2c5] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]">
          我想做類似的
        </Link>
      </div>
    </article>
  )
}

function ProductPreview({ project }) {
  const dots = {
    "company-site": ["Hero", "Service", "Contact"],
    "tracking-system": ["TRK-1024", "配送中", "已更新"],
    memberhub: ["Login", "Notice", "Files"],
    "quiz-page": ["Q1", "解析", "結果"],
    buildflow: ["案件", "報價", "LINE"],
    linebot: ["FAQ", "價目", "預約"],
  }[project.slug] || ["Demo", "Preview", "CTA"]

  return (
    <div className="rounded-xl border border-[#ded8cb] bg-white p-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0c36a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d6d0c4]" />
      </div>
      <div className="mt-4 rounded-lg bg-[#111c22] p-4 text-white">
        <p className="text-sm font-black">{project.title}</p>
        <div className="mt-4 grid gap-2">
          {dots.map((dot, index) => (
            <div key={dot} className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-black">
              <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#8fd6cc]" : index === 1 ? "bg-[#f0c36a]" : "bg-white/45"}`} />
              {dot}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickGuide() {
  return (
    <div className="mt-8 rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black text-[#0d6b62]">Quick Pick</p>
          <h3 className="mt-2 text-2xl font-black">不知道選哪個？</h3>
        </div>
        <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
          直接問我
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {quickGuide.map(([need, product]) => (
          <div key={need} className="rounded-xl border border-[#e3ded3] bg-white p-4">
            <p className="text-xs font-black text-[#0d6b62]">{need}</p>
            <p className="mt-2 text-sm font-black text-[#111c22]">{product}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CaseShowcase() {
  return (
    <section id="cases" className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="Cases" title="成品預覽" text="首頁只放代表作品，完整清單在成品庫。" />
        <div className="grid gap-4 md:grid-cols-2">
          {featuredCases.map((project) => (
            <Link key={project.slug} to={project.livePath} className="rounded-2xl border border-[#e3ded3] bg-white p-5 transition hover:-translate-y-1 hover:border-[#0d6b62] hover:shadow-xl hover:shadow-[#162321]/10">
              <ProductPreview project={project} />
              <p className="mt-5 text-xs font-black text-[#0d6b62]">{project.price}</p>
              <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
              <p className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-[#52605c]">{project.summary}</p>
              <span className="mt-5 inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                查看成品
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkflowSection() {
  const steps = [
    ["01", "看成品"],
    ["02", "選類似範例"],
    ["03", "調整內容與功能"],
    ["04", "上線交付"],
  ]

  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="Process" title="合作方式" text="價格會依頁數、功能、資料整理程度與修改次數調整。" />
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map(([step, title]) => (
            <div key={step} className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5">
              <p className="text-xs font-black text-[#0d6b62]">{step}</p>
              <h3 className="mt-3 text-xl font-black text-[#111c22]">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceScopeSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="Scope" title="服務能力" text="先做可用版本，再依需求擴充。" />
        <div className="grid gap-4 md:grid-cols-4">
          {serviceScopes.map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-[#e3ded3] bg-white p-5">
              <div className="mb-5 h-10 w-10 rounded-xl bg-[#eef7f4]" />
              <h3 className="text-xl font-black text-[#111c22]">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black text-[#8fd6cc]">Start</p>
          <h2 className="mt-3 text-3xl font-black">想做類似成品？</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">
            告訴我你喜歡哪個範例、想改成什麼用途、需要哪些功能。
          </p>
        </div>
        <div className="grid gap-3 sm:flex">
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
          <Link to="/works" className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/16 px-6 text-sm font-black text-white">
            回到成品列表
          </Link>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.6rem,5vw,3rem)] font-black tracking-[-0.01em] text-[#111c22]">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
