import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { seo } from "./site/content"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function SmartLink({ to, children, ...props }) {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}

const productCards = [
  {
    title: "批發訂貨系統",
    text: "B2B 訂貨、專屬報價、出貨與月結。",
    action: "查看系統",
    to: "/works/wholesale-ordering",
    tone: "dark",
  },
  {
    title: "RAG 企業顧問",
    text: "文件知識庫、引用回答、用量與權限控管。",
    action: "查看系統",
    to: "/works/rag-consultant",
    tone: "dark",
  },
  {
    title: "BuildFlow 工程流程",
    text: "案件、報價、照片、施工狀態與 LINE 回報。",
    action: "查看系統",
    to: "/buildflow",
    tone: "dark",
  },
  {
    title: "點餐系統",
    text: "客戶端點餐、服務端控單、桌況與廚房佇列。",
    action: "直接操作",
    to: "/works/restaurant-ordering",
  },
  {
    title: "生醫品牌網站",
    text: "醫療品牌、專業內容、案例與講座活動。",
    action: "查看成品",
    to: "/works/biomed-brand-site",
  },
  {
    title: "互動測驗頁",
    text: "題目、答案解析、結果頁與題庫更新。",
    action: "查看成品",
    to: "/works/interactive-quiz",
  },
]

const capabilities = [
  ["漂亮網站", "品牌、服務、案例與聯絡入口。"],
  ["LINE 串接", "接待、回覆、收需求與通知。"],
  ["AI / RAG", "文件問答、報告與企業知識庫。"],
  ["後台系統", "訂單、案件、狀態、報表與權限。"],
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <HeroSection />
      <ProductSection />
      <CapabilitySection />
      <FinalCta />
    </SiteLayout>
  )
}

function HeroSection() {
  return (
    <section
      className="relative isolate overflow-hidden border-b border-[#e6e0d5] bg-[#101b1c] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(9,15,17,0.82), rgba(20,52,50,0.58) 48%, rgba(246,241,230,0.34)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(250,248,243,0.18))]" />
      <div className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[720px] md:py-24">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-white/72">Qingyu Web Studio</p>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,8vw,5.4rem)] font-black leading-[1.02] tracking-tight drop-shadow">
          漂亮網站，
          <br />
          也能接 LINE、AI 與後台。
        </h1>
        <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-white/78 md:text-lg">
          把服務做成可被理解、可被操作、可以真正接客戶的線上成品。
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#products" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22] shadow-lg shadow-black/10 transition hover:bg-[#f5f1e9]">
            查看成品
          </a>
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/45 bg-[#111c22]/82 px-6 text-sm font-black text-white transition hover:bg-[#1f3032]">
            聯絡我
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProductSection() {
  return (
    <section id="products" className="scroll-mt-20 border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="成品展示櫃" title="可直接打開的系統與網站" text="每個成品只有一個主要入口，不再重複分散。" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productCards.map((item) => (
            <SmartLink
              key={item.title}
              to={item.to}
              className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-xl ${
                item.tone === "dark"
                  ? "border-[#1c2d2e] bg-[#111c22] text-white shadow-[#111c22]/10"
                  : "border-[#e0d8cc] bg-white text-[#111c22] shadow-[#c8bba9]/10"
              }`}
            >
              <div className={`mb-5 h-36 rounded-xl border ${item.tone === "dark" ? "border-white/10 bg-white/8" : "border-[#eadfd1] bg-[#f6efe4]"}`}>
                <div className="flex h-full flex-col justify-between p-4">
                  <div className="flex items-center justify-between">
                    <span className={`h-3 w-16 rounded-full ${item.tone === "dark" ? "bg-white/18" : "bg-[#d7c7b4]"}`} />
                    <span className={`rounded-full px-3 py-1 text-[11px] font-black ${item.tone === "dark" ? "bg-white/10 text-white/72" : "bg-white text-[#66716d]"}`}>
                      成品
                    </span>
                  </div>
                  <div className="grid gap-2">
                    <span className={`h-3 rounded-full ${item.tone === "dark" ? "w-5/6 bg-white/18" : "w-5/6 bg-[#d7c7b4]"}`} />
                    <span className={`h-3 rounded-full ${item.tone === "dark" ? "w-2/3 bg-white/12" : "w-2/3 bg-[#e6d8c8]"}`} />
                    <span className={`h-8 w-28 rounded-lg ${item.tone === "dark" ? "bg-[#eac46f]" : "bg-[#111c22]"}`} />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-black">{item.title}</h3>
              <p className={`mt-3 line-clamp-2 text-sm font-bold leading-6 ${item.tone === "dark" ? "text-white/70" : "text-[#52605c]"}`}>
                {item.text}
              </p>
              <span className={`mt-6 inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-black ${item.tone === "dark" ? "bg-white text-[#111c22]" : "bg-[#111c22] text-white"}`}>
                {item.action}
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilitySection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="能力範圍" title="不只是畫面，也能接流程" text="網站、表單、LINE、AI、API 與後台可以一起規劃。" />
        <div className="grid gap-4 md:grid-cols-4">
          {capabilities.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5">
              <h3 className="text-xl font-black text-[#111c22]">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </article>
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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Contact</p>
          <h2 className="mt-3 text-3xl font-black">想做類似的系統或網站？</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">
            先告訴我產業、功能、預算與時程，我會整理成適合的做法。
          </p>
        </div>
        <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22]">
          填需求表單
        </Link>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.7rem,5vw,3.15rem)] font-black leading-tight text-[#111c22]">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
