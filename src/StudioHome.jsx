import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { audience, contact, pricing, pricingNote, seo } from "./site/content"
import { productOrder, products } from "./site/productData"

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />
      <HeroSection />
      <ShowcaseSection />
      <AudienceSection />
      <PriceListSection />
      <FeaturedCases />
      <AiLabSection />
      <ContactCta />
    </SiteLayout>
  )
}

/* ---------- Hero ---------- */

function HeroSection() {
  const chips = ["網站", "表單", "商品訂購", "線上預約", "LINE 自動回覆", "資料後台"]
  return (
    <section className="relative overflow-hidden border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(17,28,34,0.05),transparent_34rem)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 md:pt-20 lg:pb-24">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-[#0d6b62]">Qingyu Web Studio</p>
        <h1 className="mt-6 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.1rem,6vw,4.1rem)] font-black leading-[1.15] tracking-tight text-[#111c22]">
          我幫你做出可以直接使用的
          <br className="hidden sm:block" />
          網站、LINE Bot、後台與互動系統
        </h1>
        <p className="mt-7 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
          協助店家、公司、工作室與創作者，把網站、表單、商品、預約、LINE、自動回覆與資料管理，
          整理成一套真的能用的成品。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#products"
            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#111c22] px-7 text-sm font-black text-white shadow-lg shadow-[#111c22]/15 transition hover:bg-[#1f3032]"
          >
            看成品展示
          </a>
          <Link
            to="/contact"
            className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[#111c22]/20 bg-white px-7 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"
          >
            詢問報價
          </Link>
        </div>
        <div className="mt-9 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="rounded-full border border-[#e0d8cc] bg-white px-3.5 py-1.5 text-xs font-black text-[#3d4c48]">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 成品展示 ---------- */

function ShowcaseSection() {
  return (
    <section id="products" className="scroll-mt-16 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="成品展示"
          title="可以直接點看的成品 Demo"
          text="每一個都是能操作的成品，不是效果圖。點進去就能看到前台畫面、後台管理、資料流程與報價。"
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
                <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{p.solves}</p>
                <div className="mt-4 grid gap-1.5 text-xs font-bold text-[#66716d]">
                  <p><span className="font-black text-[#3d4c48]">適合：</span>{p.forWho}</p>
                  <p><span className="font-black text-[#3d4c48]">工期：</span>約 {p.duration}</p>
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

/* ---------- 適合對象 ---------- */

function AudienceSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading eyebrow="適合對象" title="這些人正在用這樣的網站接生意" />
        <div className="flex flex-wrap gap-3">
          {audience.map((a) => (
            <span key={a} className="rounded-xl border border-[#e0d8cc] bg-white px-5 py-3 text-base font-black text-[#111c22]">
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 服務價目表 ---------- */

function PriceListSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
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
        <p className="mt-5 rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5 text-sm font-bold leading-7 text-[#52605c]">
          {pricingNote}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white">
            告訴我需求，拿到報價
          </Link>
          <Link to="/pricing" className="inline-flex min-h-11 items-center rounded-xl border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            完整價目表
          </Link>
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

/* ---------- 技術展示 / AI Demo Lab ---------- */

function AiLabSection() {
  const labs = [
    {
      name: "AI 技術任務",
      badge: "可試玩 Demo",
      text: "互動式 AI 技術展示遊戲。用任務方式體驗文件問答、模型分類、店家 FAQ 回覆與產品展示室。",
      proof: "適合客戶、團隊與面試官快速看懂我的 AI / 全端開發能力。",
      points: ["文件問答", "模型分類", "店家助手", "產品展示室"],
      to: "https://ai-tech-quest.vercel.app",
      label: "立即體驗",
      secondaryTo: "https://github.com/QingyuJin/ai-tech-quest",
      secondaryLabel: "GitHub 原始碼",
      featured: true,
    },
    {
      name: "RAG 企業顧問",
      badge: "文件問答",
      text: "把公司文件變成可問答的知識庫，回答附引用來源，還有用量與權限管理。可直接操作。",
      to: "/works/rag-consultant",
      label: "操作 RAG 系統",
    },
    {
      name: "LINE Bot 接待模擬",
      badge: "接待流程",
      text: "體驗 LINE Bot 怎麼自動接待、整理需求並同步後台。",
      to: "/tools/linebot-mission",
      label: "看接待流程",
    },
  ]

  const renderAction = (to, label, variant = "primary") => {
    const external = /^https?:/.test(to)
    const className =
      variant === "primary"
        ? "inline-flex min-h-10 items-center rounded-lg bg-white px-4 text-sm font-black text-[#111c22] transition hover:bg-[#f4efe5]"
        : "inline-flex min-h-10 items-center rounded-lg border border-white/25 px-4 text-sm font-black text-white transition hover:bg-white/10"

    return external ? (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    ) : (
      <Link to={to} className={variant === "primary" ? "inline-flex min-h-10 items-center rounded-lg bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]" : "inline-flex min-h-10 items-center rounded-lg border border-[#cfd7d3] px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"}>
        {label}
      </Link>
    )
  }

  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="技術展示 / AI Demo Lab"
          title="想看更進階的 AI 與技術實驗"
          text="這區是實驗性的技術展示，適合想導入 AI、或想看底層能做到什麼的人。"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {labs.map((l) => (
            <article
              key={l.name}
              className={`flex flex-col rounded-xl border p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c8bba9]/20 ${
                l.featured
                  ? "border-[#0d6b62] bg-[#111c22] text-white md:col-span-1 lg:col-span-1"
                  : "border-[#e3ded3] bg-white text-[#111c22]"
              }`}
            >
              <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                l.featured ? "bg-white/10 text-[#8fd6cc]" : "bg-[#111c22] text-[#8fd6cc]"
              }`}>
                {l.badge || "Lab"}
              </span>
              <h3 className={`mt-4 font-['Noto_Serif_TC',serif] text-xl font-black ${l.featured ? "text-white" : "text-[#111c22]"}`}>
                {l.name}
              </h3>
              <p className={`mt-2 flex-1 text-sm font-bold leading-6 ${l.featured ? "text-white/[0.74]" : "text-[#52605c]"}`}>
                {l.text}
              </p>
              {l.points ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {l.points.map((point) => (
                    <span key={point} className="rounded-full border border-white/[0.14] bg-white/[0.08] px-2.5 py-1 text-xs font-black text-white/[0.86]">
                      {point}
                    </span>
                  ))}
                </div>
              ) : null}
              {l.proof ? (
                <p className="mt-4 rounded-lg border border-white/[0.12] bg-white/[0.07] p-3 text-xs font-bold leading-5 text-white/70">
                  {l.proof}
                </p>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-2">
                {renderAction(l.to, `${l.label} ↗`, l.featured ? "primary" : "secondary")}
                {l.secondaryTo ? renderAction(l.secondaryTo, `${l.secondaryLabel} ↗`, "secondary") : null}
              </div>
            </article>
          ))}
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
