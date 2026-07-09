import { useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, pricing, pricingNote, seo } from "./site/content"
import { productOrder, products } from "./site/productData"
import { LiveIndustryDemo, industries } from "./site/homeIndustries"

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />
      <HeroPicker />
      <ShowcaseSection />
      <FeaturedCases />
      <PriceListSection />
      <AiLabSection />
      <ContactCta />
    </SiteLayout>
  )
}

/* ---------- Hero：選行業 → 活成品 → 為你準備的 ---------- */

function HeroPicker() {
  const [idx, setIdx] = useState(0)
  const [interacted, setInteracted] = useState(false)
  const industry = industries[idx]

  function selectIndustry(i) {
    setIdx(i)
    setInteracted(false)
  }

  const steps = [
    ["選你的行業", true],
    ["按前台試一下", interacted],
    ["看你的成品與報價", true],
  ]

  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 md:pt-16">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0d6b62]">Qingyu Web Studio</p>
        <h1 className="mt-5 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,5.6vw,3.6rem)] font-black leading-[1.15] tracking-tight text-[#111c22]">
          你想要一個<span className="text-[#0d6b62]">真的能用</span>的網站或系統。
          <br className="hidden sm:block" />
          先選你的行業，看它動起來 ↓
        </h1>
        <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#52605c]">
          店家、公司、工作室與創作者——把網站、表單、商品、預約、LINE 與資料管理，做成一套真的能用的成品。
          下面直接按按看：<span className="text-[#111c22]">前台動一下，後台立刻有反應</span>。
        </p>

        {/* 行業選擇 */}
        <div className="mt-8">
          <p className="text-sm font-black text-[#111c22]">① 你是做什麼的？</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {industries.map((item, i) => {
              const active = i === idx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectIndustry(i)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-center transition ${
                    active
                      ? "border-[#111c22] bg-[#111c22] text-white shadow-lg shadow-[#111c22]/15"
                      : "border-[#e0d8cc] bg-white text-[#111c22] hover:border-[#0d6b62]"
                  }`}
                >
                  <span className="text-2xl leading-none" aria-hidden="true">{item.emoji}</span>
                  <span className="text-xs font-black leading-tight">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 進度列 */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          {steps.map(([label, done], i) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-black ${done ? "bg-[#0d6b62] text-white" : "bg-[#e3ded3] text-[#8a938f]"}`}>
                {done ? "✓" : i + 1}
              </span>
              <span className={`text-xs font-black ${done ? "text-[#111c22]" : "text-[#8a938f]"}`}>{label}</span>
              {i < steps.length - 1 ? <span className="hidden text-[#c9d2ce] sm:inline">—</span> : null}
            </div>
          ))}
        </div>

        {/* 活成品 */}
        <div className="mt-6">
          <LiveIndustryDemo key={industry.id} industry={industry} onInteract={() => setInteracted(true)} />
        </div>

        {/* 為你準備的 */}
        <div className="mt-4 rounded-3xl border border-[#e0d8cc] bg-white p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">為「{industry.label}」準備的</p>
              <h2 className="mt-2 font-['Noto_Serif_TC',serif] text-2xl font-black text-[#111c22] md:text-3xl">{industry.product.system}</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl bg-[#faf8f3] p-3">
                  <p className="text-[11px] font-black text-[#8a938f]">客人看到</p>
                  <p className="mt-1 text-sm font-black text-[#111c22]">{industry.product.customerSees}</p>
                </div>
                <div className="rounded-xl bg-[#faf8f3] p-3">
                  <p className="text-[11px] font-black text-[#8a938f]">你管理</p>
                  <p className="mt-1 text-sm font-black text-[#111c22]">{industry.product.youManage}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-2xl font-black text-[#0d6b62]">{industry.product.price}</span>
                <span className="text-sm font-bold text-[#66716d]">工期約 {industry.product.duration}</span>
              </div>
              <div className="mt-4 grid gap-2">
                <Link to={industry.product.live.path} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white transition hover:bg-[#0d6b62]">
                  {industry.product.live.label}
                </Link>
                <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                  問這個報價
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs font-bold text-[#8a938f] sm:text-left">↑ 換一個行業，上面整段會跟著你變</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- 全部成品（產品頁入口）---------- */

function ShowcaseSection() {
  return (
    <section id="products" className="scroll-mt-16 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="全部成品"
          title="想看每一種系統的完整樣子"
          text="每張卡點進去都是完整產品頁：前台成品、後台畫面、資料流程、技術架構與報價，一頁看完。"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productOrder.map((slug) => {
            const p = products[slug]
            return (
              <Link
                key={slug}
                to={`/works/${slug}`}
                className="group flex flex-col rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5 transition hover:-translate-y-1 hover:border-[#111c22]/30 hover:shadow-xl hover:shadow-[#c8bba9]/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22]">{p.name}</h3>
                  <span className="rounded-full bg-[#eef7f4] px-2.5 py-1 text-[11px] font-black text-[#0d6b62]">{p.priceFrom}</span>
                </div>
                <p className="mt-3 flex-1 text-sm font-bold leading-6 text-[#52605c]">{p.solves}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["前台成品", "後台畫面", "報價"].map((t) => (
                    <span key={t} className="rounded-md bg-white px-2 py-1 text-[11px] font-black text-[#66716d] ring-1 ring-[#e3ded3]">{t}</span>
                  ))}
                </div>
                <span className="mt-5 inline-flex min-h-10 w-fit items-center rounded-lg bg-[#111c22] px-4 text-sm font-black text-white transition group-hover:bg-[#0d6b62]">
                  查看成品 →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- 精選案例 ---------- */

function FeaturedCases() {
  const cases = [
    {
      tag: "工程行接案系統",
      name: "鑫匠工程",
      text: "屏東 40 年泥作工程行。書法品牌官網 + 線上詢價，需求直接進 BuildFlow 後台，一鍵轉成案件。前後台真的串起來、正在營運。",
      image: "/project-photos/335941_0.jpg",
      to: "/works/xinjiang",
      live: "https://xinjiang-website.vercel.app/",
    },
    {
      tag: "公司品牌官網",
      name: "生醫品牌網站",
      text: "醫療內容品牌形象站：品牌故事、內容特色、案例網格與講座報名，把專業轉成訪客看得懂的網站。",
      image: "/project-photos/335949_0.jpg",
      to: "/works/biomed-brand-site",
      live: "/works/biomed-brand-site",
    },
  ]
  return (
    <section className="border-b border-[#1c2d2e] bg-[#111c22] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading eyebrow="精選案例" title="真實上線的作品" dark />
        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <article key={c.name} className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04]">
              <div className="relative overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-500 hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-[#111c22]/78 px-3 py-1 text-[11px] font-black text-[#eac46f] backdrop-blur">{c.tag}</span>
              </div>
              <div className="p-5">
                <h3 className="font-['Noto_Serif_TC',serif] text-2xl font-black">{c.name}</h3>
                <p className="mt-2 text-sm font-bold leading-7 text-white/72">{c.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link to={c.to} className="inline-flex min-h-10 items-center rounded-lg bg-white px-4 text-sm font-black text-[#111c22]">看案例拆解</Link>
                  {/^https?:/.test(c.live) ? (
                    <a href={c.live} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-lg border border-white/25 px-4 text-sm font-black text-white">打開網站 ↗</a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 服務價目表 ---------- */

function PriceListSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="服務價目表"
          title="價格與工期，先講清楚"
          text="以下為參考價，實際依需求範圍調整。台灣中小型專案的合理行情，不喊天價、也不做賠本削價。"
        />
        <div className="overflow-hidden rounded-2xl border border-[#e3ded3] bg-white">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr] gap-3 border-b border-[#eee9df] bg-[#111c22] px-5 py-3 text-xs font-black text-white sm:grid">
            <span>服務項目</span>
            <span>參考價格</span>
            <span>預估時間</span>
          </div>
          {pricing.map(([name, price, time], i) => (
            <div
              key={name}
              className={`grid gap-1 px-5 py-3.5 sm:grid-cols-[1.4fr_1fr_1fr] sm:items-center ${i > 0 ? "border-t border-[#eee9df]" : ""}`}
            >
              <span className="text-sm font-black text-[#111c22]">{name}</span>
              <span className="text-sm font-black text-[#0d6b62]">{price}</span>
              <span className="text-sm font-bold text-[#66716d]">{time}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 rounded-xl border border-[#e3ded3] bg-white p-5 text-sm font-bold leading-7 text-[#52605c]">
          {pricingNote}
        </p>
      </div>
    </section>
  )
}

/* ---------- 技術展示 / AI Demo Lab ---------- */

function AiLabSection() {
  const labs = [
    { name: "AI 技術任務", text: "互動式 AI 產品展示：文件問答、模型分類、店家 AI 助手、Unity 邏輯閘關卡，一邊玩一邊理解 AI 能做什麼。", to: "https://ai-tech-quest.vercel.app", label: "線上實測" },
    { name: "RAG 企業顧問", text: "把公司文件變成可問答的知識庫，回答附引用來源，還有用量與權限管理。可直接操作。", to: "/works/rag-consultant", label: "操作 RAG 系統" },
    { name: "LINE Bot 接待模擬", text: "體驗 LINE Bot 怎麼自動接待、整理需求並同步後台。", to: "/tools/linebot-mission", label: "看接待流程" },
  ]
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <SectionHeading
          eyebrow="技術展示 / AI Demo Lab"
          title="想看更進階的 AI 與技術實驗"
          text="這區是實驗性的技術展示，適合想導入 AI、或想看底層能做到什麼的人。"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {labs.map((l) => {
            const external = /^https?:/.test(l.to)
            const cls = "group flex flex-col rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c8bba9]/20"
            const inner = (
              <>
                <span className="w-fit rounded-full bg-[#111c22] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#8fd6cc]">Lab</span>
                <h3 className="mt-4 font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22]">{l.name}</h3>
                <p className="mt-2 flex-1 text-sm font-bold leading-6 text-[#52605c]">{l.text}</p>
                <span className="mt-5 inline-flex text-sm font-black text-[#0d6b62]">{l.label} →</span>
              </>
            )
            return external ? (
              <a key={l.name} href={l.to} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
            ) : (
              <Link key={l.name} to={l.to} className={cls}>{inner}</Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- 聯絡 CTA ---------- */

function ContactCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Contact</p>
            <h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,5vw,3rem)] font-black leading-snug">
              把你的想法，變成能用的成品
            </h2>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-white/72">
              告訴我你的產業、想解決的問題、預算與時程，我會整理成適合的做法與報價。加 LINE 聊最快。
            </p>
            <div className="mt-7 grid gap-3 sm:max-w-md">
              <a
                href={`https://line.me/R/ti/p/~${contact.lineId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-5 py-4 transition hover:bg-white/10"
              >
                <span className="text-sm font-black text-white/60">LINE</span>
                <span className="text-base font-black text-[#06c755]">{contact.lineId}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-between rounded-xl border border-white/12 bg-white/[0.06] px-5 py-4 transition hover:bg-white/10"
              >
                <span className="text-sm font-black text-white/60">Email</span>
                <span className="text-base font-black text-white">{contact.email}</span>
              </a>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-white px-8 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]"
          >
            填需求表單
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- shared ---------- */

function SectionHeading({ eyebrow, title, text, dark = false }) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className={`text-xs font-black uppercase tracking-[0.2em] ${dark ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.7rem,4.5vw,2.9rem)] font-black leading-snug ${dark ? "text-white" : "text-[#111c22]"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-4 max-w-2xl text-sm font-bold leading-7 md:text-base ${dark ? "text-white/72" : "text-[#52605c]"}`}>{text}</p> : null}
    </div>
  )
}

export default StudioHome
