import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { projects, seo } from "./site/content"

const productOrder = ["company-site", "tracking-system", "memberhub", "quiz-page", "buildflow", "linebot"]
const products = productOrder.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean)
const featuredProducts = products.filter((project) => ["company-site", "buildflow"].includes(project.slug))
const compactProducts = products.filter((project) => !["company-site", "buildflow"].includes(project.slug))

const scopeItems = [
  ["網站製作", "公司頁、品牌頁、活動頁。"],
  ["LINE Bot", "FAQ、預約、關鍵字回覆。"],
  ["互動工具", "測驗、診斷、網站健檢。"],
  ["小型後台", "查件、會員、案件管理。"],
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />
      <HeroSection />
      <ProductShelf />
      <WorkflowCase />
      <ScopeSection />
      <FinalCta />
    </SiteLayout>
  )
}

function HeroSection() {
  return (
    <section className="nature-section-soft relative overflow-hidden border-b border-white/50">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,#f5efe4,rgba(245,239,228,0))]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl gap-10 px-4 py-12 md:min-h-[720px] md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0d6b62]">Qingyu Web Studio</p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.35rem,7.5vw,5.5rem)] font-black leading-[1.02] tracking-[-0.035em] text-[#121b1f]">
            看成品，選一個像你要的網站或系統
          </h1>
          <p className="mt-6 max-w-xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
            我把常見接案需求做成可展示的成品範例。喜歡哪一種，再改成你的公司、店家或流程。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#products" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#111c22] px-6 text-sm font-black text-white shadow-lg shadow-[#111c22]/12 transition hover:-translate-y-0.5 hover:bg-[#26343b]">
              查看成品
            </a>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8d2c5] bg-white px-6 text-sm font-black text-[#111c22] shadow-sm transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:text-[#0d6b62]">
              我想做類似的
            </Link>
            <Link to="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full px-2 text-sm font-black text-[#0d6b62] transition hover:text-[#084d46]">
              看價格參考
            </Link>
          </div>
        </div>
        <HeroShowcase />
      </div>
    </section>
  )
}

function HeroShowcase() {
  return (
    <div className="relative">
      <div className="absolute -left-6 top-10 hidden h-32 w-32 rounded-full bg-[#d9efe9] blur-3xl md:block" />
      <div className="qy-glass-card relative rounded-[2rem] border p-4">
        <div className="rounded-[1.45rem] bg-[#111c22] p-5 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Product Shelf</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.02em]">成品展示櫃</h2>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/78">可客製</span>
          </div>

          <div className="mt-6 grid gap-3">
            {featuredProducts.map((project) => (
              <div key={project.slug} className="rounded-2xl border border-white/10 bg-white/[0.075] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black">{project.title}</p>
                    <p className="mt-2 line-clamp-2 text-xs font-bold leading-5 text-white/58">{project.summary}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#f0c36a] px-3 py-1 text-[11px] font-black text-[#111c22]">{project.price}</span>
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-4/5 rounded-full bg-[#8fd6cc]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["看成品", "改內容", "上線交付"].map((item) => (
            <div key={item} className="qy-glass-soft rounded-2xl border px-4 py-3 text-center text-sm font-black text-[#111c22]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductShelf() {
  return (
    <section id="products" className="nature-section scroll-mt-20 border-b border-white/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="Product Demos"
          title="可客製成品範例"
          text="先看畫面。喜歡哪一種，再改成你的內容與需求。"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProducts.map((project) => (
            <FeaturedProduct key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {compactProducts.map((project) => (
            <CompactProduct key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProduct({ project }) {
  return (
    <article className="qy-glass-card overflow-hidden rounded-[1.75rem] border p-4 transition hover:-translate-y-1">
      <ProductMock project={project} large />
      <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">{project.price}</p>
          <h3 className="mt-2 text-3xl font-black tracking-[-0.025em] text-[#111c22]">{project.title}</h3>
          <p className="mt-3 max-w-xl text-sm font-bold leading-7 text-[#52605c]">{project.summary}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col">
          <Link to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111c22] px-5 text-sm font-black text-white">
            查看成品
          </Link>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d2c5] bg-white px-5 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
        </div>
      </div>
    </article>
  )
}

function CompactProduct({ project }) {
  return (
    <article className="qy-glass-card rounded-[1.5rem] border p-4 transition hover:-translate-y-1">
      <ProductMock project={project} />
      <p className="mt-5 text-xs font-black text-[#0d6b62]">{project.price}</p>
      <h3 className="mt-2 text-xl font-black tracking-[-0.01em]">{project.title}</h3>
      <p className="mt-3 line-clamp-2 min-h-12 text-sm font-bold leading-6 text-[#52605c]">{project.summary}</p>
      <Link to={project.livePath} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#111c22] px-4 text-sm font-black text-white">
        查看成品
      </Link>
    </article>
  )
}

function ProductMock({ project, large = false }) {
  const labels = {
    "company-site": ["Hero", "服務", "聯絡"],
    "tracking-system": ["單號", "配送中", "備註"],
    memberhub: ["登入", "公告", "檔案"],
    "quiz-page": ["題目", "解析", "結果"],
    buildflow: ["案件", "報價", "LINE"],
    linebot: ["FAQ", "預約", "回覆"],
  }[project.slug] || ["Demo", "Preview", "CTA"]

  return (
    <div className={`qy-glass-soft rounded-[1.3rem] border p-3 ${large ? "md:p-4" : ""}`}>
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0c36a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c5]" />
      </div>
      <div className={`mt-4 rounded-[1rem] bg-[#111c22] p-4 text-white ${large ? "min-h-56" : "min-h-40"}`}>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">{project.title}</p>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-black text-white/68">Demo</span>
        </div>
        <div className="mt-5 grid gap-2">
          {labels.map((label, index) => (
            <div key={label} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white/82">
              <span className={`h-2 w-2 rounded-full ${index === 0 ? "bg-[#8fd6cc]" : index === 1 ? "bg-[#f0c36a]" : "bg-white/40"}`} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkflowCase() {
  const buildflow = projects.find((project) => project.slug === "buildflow")

  return (
    <section className="nature-section-soft border-b border-white/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Full Case</p>
            <h2 className="mt-4 text-[clamp(1.9rem,5vw,3.5rem)] font-black leading-tight tracking-[-0.025em] text-[#111c22]">
              從網站詢價到後台管理
            </h2>
            <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-[#52605c]">
              以工程行情境展示案件、報價、照片、施工狀態與 LINE 回報。
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/works/buildflow#demo" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111c22] px-5 text-sm font-black text-white">
                查看 BuildFlow
              </Link>
              <Link to="/works/xinjiang" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d2c5] bg-white px-5 text-sm font-black text-[#111c22]">
                查看鑫匠案例
              </Link>
            </div>
          </div>
          <div className="qy-glass-card rounded-[1.75rem] border p-4">
            {buildflow ? <ProductMock project={buildflow} large /> : null}
            <div className="mt-4 grid gap-2 md:grid-cols-4">
              {["網站詢價", "案件進後台", "產生報價", "LINE 回報"].map((item) => (
                <div key={item} className="qy-glass-soft rounded-2xl px-3 py-3 text-center text-xs font-black text-[#40504c]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScopeSection() {
  return (
    <section className="nature-section border-b border-white/50">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading eyebrow="Scope" title="服務能力" text="先做可用版本，再依需求擴充。" />
        <div className="grid gap-4 md:grid-cols-4">
          {scopeItems.map(([title, text]) => (
            <div key={title} className="qy-glass-card rounded-[1.35rem] border p-5">
              <div className="mb-5 h-11 w-11 rounded-2xl bg-[#e3f3ef]" />
              <h3 className="text-xl font-black tracking-[-0.01em] text-[#111c22]">{title}</h3>
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
    <section className="nature-section-soft px-4 py-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#111c22]/88 text-white shadow-2xl shadow-[#111c22]/18 backdrop-blur-xl">
      <div className="grid gap-7 px-5 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-8 md:py-14">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">Start</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.02em]">想做類似成品？</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/68">
            告訴我你喜歡哪個範例、想改成什麼用途、需要哪些功能。
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
          <Link to="/works" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 px-6 text-sm font-black text-white">
            回到成品列表
          </Link>
        </div>
      </div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.7rem,5vw,3.35rem)] font-black leading-tight tracking-[-0.025em] text-[#111c22]">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
