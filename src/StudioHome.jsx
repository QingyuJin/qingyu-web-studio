import { Link } from "react-router-dom"
import BuildFlowDemoSection from "./components/BuildFlowDemoSection"
import ContactLeadSection from "./components/ContactLeadSection"
import PortfolioSection from "./components/PortfolioSection"
import ServicePlansSection from "./components/ServicePlansSection"

const highlights = [
  ["7-14 days", "Landing page or portfolio MVP"],
  ["Web + AI", "From website to workflow automation"],
  ["Demo first", "Ship a usable prototype before polishing"],
]

const aiProjects = [
  ["SeedlingVision", "影像分類 Demo，適合把照片判讀、品質檢查、分類流程做成可展示原型。"],
  ["ExamCraft AI", "PDF 與教材內容轉成題庫草稿，展示文件處理與提示工程能力。"],
  ["StockTrendLab", "CSV 資料清理、趨勢圖表與儀表板，適合營運與報表自動化情境。"],
]

function StudioHome() {
  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#172026]">
      <header className="sticky top-0 z-40 border-b border-[#dedbd1] bg-[#f8f7f2]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="font-black tracking-tight" aria-label="Qingyu Web Studio">
            Qingyu Web Studio
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-bold text-[#5d6863] md:flex">
            <a href="#services" className="hover:text-[#0f5b52]">
              Services
            </a>
            <a href="#works" className="hover:text-[#0f5b52]">
              Works
            </a>
            <a href="#buildflow-demo" className="hover:text-[#0f5b52]">
              Demo
            </a>
            <a href="#contact" className="hover:text-[#0f5b52]">
              Contact
            </a>
          </nav>
          <a
            href="https://github.com/QingyuJin/qingyu-web-studio"
            className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#172026] px-4 text-sm font-black text-white hover:bg-[#27404a]"
          >
            GitHub
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#dedbd1] bg-[#10242a] text-white">
        <img
          src="/project-photos/335949_0.jpg"
          alt="Qingyu Web Studio project preview"
          className="absolute inset-0 h-full w-full object-cover opacity-36"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10242a] via-[#10242a]/92 to-[#10242a]/50" />
        <div className="relative mx-auto grid min-h-[calc(100vh-74px)] max-w-6xl content-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#83d4c8]">
              Freelance Web Studio
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              幫你把接案網站、流程工具與 AI Demo 做到能上線。
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#d9e6e3] sm:text-lg">
              我是 Qingyu，專注把想法整理成清楚的網頁與可操作的產品原型。適合需要快速建立作品集、服務頁、後台工具或 AI 概念驗證的客戶。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] hover:bg-[#ffd785]"
              >
                開始討論專案
              </a>
              <a
                href="#works"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/18 bg-white/10 px-5 text-sm font-black text-white backdrop-blur hover:bg-white/16"
              >
                查看作品方向
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map(([value, label]) => (
              <div key={value} className="rounded-lg border border-white/14 bg-white/[0.09] p-5 backdrop-blur">
                <p className="text-2xl font-black text-[#f0c36a]">{value}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#d9e6e3]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicePlansSection />

      <BuildFlowDemoSection />

      <PortfolioSection />

      <section id="ai-projects" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">AI Projects</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">AI 原型不是炫技，是驗證流程</h2>
          <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">
            我會把 AI 能力包成客戶看得懂的操作畫面，例如上傳文件、整理資料、產出草稿或分析圖表。
          </p>
        </div>
        <div className="grid gap-3">
          {aiProjects.map(([title, desc]) => (
            <article key={title} className="rounded-lg border border-[#d8d4c8] bg-white p-5">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm font-bold leading-7 text-[#5d6863]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <ContactLeadSection />
    </main>
  )
}

export default StudioHome
