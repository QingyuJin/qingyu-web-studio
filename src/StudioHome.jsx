import { useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"
import { LiveIndustryDemo, industries } from "./site/homeIndustries"

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />
      <HeroPicker />
      <ShowcaseSection />
      <PriceListSection />
      <LabStrip />
      <ContactCta />
    </SiteLayout>
  )
}

/* ---------- Hero：選行業 看它動 ---------- */

function HeroPicker() {
  const [idx, setIdx] = useState(0)
  const industry = industries[idx]

  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 md:pt-20">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#0d6b62]">Qingyu Web Studio</p>
        <h1 className="mt-5 font-['Noto_Serif_TC',serif] text-[clamp(2rem,5.6vw,3.6rem)] font-black leading-[1.15] tracking-tight text-[#111c22]">
          選你的行業 看它動起來
        </h1>

        {/* 行業選擇 */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((item, i) => {
            const active = i === idx
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setIdx(i)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3.5 text-center transition ${
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

        {/* 活成品 */}
        <div className="mt-5">
          <LiveIndustryDemo key={industry.id} industry={industry} />
        </div>

        {/* 為你準備的（一條） */}
        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#e0d8cc] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22] md:text-2xl">{industry.product.system}</p>
            <p className="mt-1 text-sm font-bold text-[#66716d]">
              <span className="font-black text-[#0d6b62]">{industry.product.price}</span>・{industry.product.duration}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to={industry.product.live.path} className="inline-flex min-h-11 items-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white transition hover:bg-[#0d6b62]">
              {industry.product.live.label}
            </Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              問報價
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 代表作 ---------- */

function ShowcaseSection() {
  const featured = [
    {
      title: "平台電商 / MeepShop 視覺優化",
      text: "首頁、分類、手機購物、Banner、活動會員與成效追蹤",
      price: "12,000 元起",
      to: "/works/ecommerce-platform-redesign#demo",
      visual: null,
      kind: "platform-commerce",
    },
    {
      title: "電商商品頁 / 銷售頁",
      text: "把商品賣點變成一頁會成交的銷售頁",
      price: "12,000 元起",
      to: "/works/product-landing-page",
      visual: null,
      kind: "landing",
    },
    {
      title: "鑫匠工程",
      text: "真實上線官網詢價直接進後台",
      price: "30,000 元起",
      to: "/works/xinjiang",
      visual: "/project-photos/335941_0.jpg",
    },
    {
      title: "網站成效追蹤 / 曝光管理後台",
      text: "瀏覽、Google 曝光、LINE 電話與表單成效集中看",
      price: "15,000 元起",
      to: "/works/analytics-dashboard#demo",
      visual: null,
      kind: "analytics",
    },
    {
      title: "批發訂貨系統",
      text: "客戶下單、出貨、對帳 一套顧好",
      price: "25,000 元起",
      to: "/works/wholesale-ordering",
      visual: null,
    },
    {
      title: "RAG 企業知識庫",
      text: "公司文件變成會回答的 AI 附引用",
      price: "需求估價",
      to: "/works/rag-consultant#demo",
      visual: null,
    },
  ]

  return (
    <section id="products" className="scroll-mt-16 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="font-['Noto_Serif_TC',serif] text-[clamp(1.7rem,4.5vw,2.9rem)] font-black leading-snug text-[#111c22]">
          代表作 先看六個
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#e3ded3] bg-[#faf8f3] transition hover:-translate-y-1 hover:border-[#111c22]/30 hover:shadow-xl hover:shadow-[#c8bba9]/20"
            >
              {item.kind === "landing" ? (
                <div className="flex aspect-[16/9] items-center justify-between gap-4 bg-gradient-to-br from-[#123f2e] to-[#1e6e4e] p-5 text-white">
                  <div>
                    <span className="rounded-full bg-white/16 px-2.5 py-1 text-[10px] font-black tracking-[0.2em]">PLANT FUEL</span>
                    <p className="mt-3 font-['Noto_Serif_TC',serif] text-2xl font-black leading-tight">下午三點 <br />還有電</p>
                    <span className="mt-3 inline-flex rounded-lg bg-white px-3 py-1.5 text-xs font-black text-[#1e6e4e]">立即訂購</span>
                  </div>
                  <div className="flex h-24 w-14 shrink-0 flex-col items-center justify-between rounded-[1.1rem] border border-white/40 bg-white/12 py-2">
                    <span className="text-[8px] font-black tracking-widest text-white/80">植感</span>
                    <span aria-hidden="true">🌿</span>
                  </div>
                </div>
              ) : item.kind === "platform-commerce" ? (
                <div className="aspect-[16/9] bg-[#13231f] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#eac46f] px-3 py-1 text-[10px] font-black text-[#13231f]">MeepShop / Shopify</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Redesign</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl bg-white p-3 text-[#13231f]">
                      <div className="h-6 rounded-lg bg-[#13231f]" />
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {["主打", "預購", "現貨"].map((label) => (
                          <div key={label} className="rounded-lg bg-[#eef7f4] px-2 py-3 text-center text-[10px] font-black text-[#0d6b62]">{label}</div>
                        ))}
                      </div>
                      <div className="mt-3 h-14 rounded-xl bg-[#eac46f]/35" />
                    </div>
                    <div className="rounded-[1.2rem] border border-white/25 bg-white/10 p-2">
                      <div className="rounded-[0.9rem] bg-white p-2 text-[#13231f]">
                        <div className="h-5 rounded-md bg-[#eac46f]" />
                        <div className="mt-2 grid gap-1.5">
                          <span className="h-5 rounded bg-[#eef7f4]" />
                          <span className="h-5 rounded bg-[#eef7f4]" />
                          <span className="h-7 rounded bg-[#13231f]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item.kind === "analytics" ? (
                <div className="aspect-[16/9] bg-[#101d22] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Analytics</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black text-white/70">Monthly Report</span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[["今日瀏覽", "428"], ["搜尋曝光", "18.4K"], ["表單", "23"]].map(([label, value]) => (
                      <div key={label} className="rounded-xl bg-white/10 p-3">
                        <p className="text-[10px] font-black text-white/45">{label}</p>
                        <p className="mt-1 text-lg font-black text-[#eac46f]">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex h-20 items-end gap-1.5 rounded-xl bg-white/8 p-3">
                    {[42, 58, 50, 74, 66, 88, 78, 94].map((height, index) => (
                      <span key={height + index} className="flex-1 rounded-t bg-[#8fd6cc]" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>
              ) : item.visual ? (
                <img src={item.visual} alt={item.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              ) : (
                <div className="aspect-[16/9] bg-[#111c22] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="h-2 w-16 rounded-full bg-[#8fd6cc]" />
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest">System</span>
                  </div>
                  <div className="mt-8 grid gap-2">
                    <span className="h-10 rounded-xl bg-white/12" />
                    <span className="h-10 rounded-xl bg-white/8" />
                    <span className="h-10 rounded-xl bg-white/12" />
                  </div>
                </div>
              )}
              <div className="flex flex-1 items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22]">{item.title}</h3>
                  <p className="mt-1 text-sm font-bold leading-6 text-[#66716d]">{item.text}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[#eef7f4] px-2.5 py-1 text-[11px] font-black text-[#0d6b62]">{item.price}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/works" className="mt-8 inline-flex min-h-11 items-center rounded-xl border border-[#d5ded9] bg-white px-5 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]">
          查看全部作品 →
        </Link>
      </div>
    </section>
  )
}

/* ---------- 價格 ---------- */

function PriceListSection() {
  const plans = [
    ["快速網站", "5,000 元起", "一頁快速上線"],
    ["品牌官網", "12,000 元起", "形象、案例、聯絡"],
    ["接單 / 後台系統", "25,000 元起", "訂單、案件、狀態管理"],
    ["AI / 客製系統", "需求估價", "RAG、API、自動化"],
  ]

  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="font-['Noto_Serif_TC',serif] text-[clamp(1.7rem,4.5vw,2.9rem)] font-black leading-snug text-[#111c22]">
          價格 先給範圍
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map(([name, price, text]) => (
            <article key={name} className="rounded-2xl border border-[#e3ded3] bg-white p-5">
              <p className="font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22]">{name}</p>
              <p className="mt-4 text-2xl font-black text-[#0d6b62]">{price}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-[#66716d]">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm font-bold text-[#8a938f]">實際依範圍報價網域、主機與第三方費用另計</p>
      </div>
    </section>
  )
}

/* ---------- 技術實驗（一條） ---------- */

function LabStrip() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-bold text-[#66716d]">
          <span className="font-black text-[#111c22]">想看更深的技術？</span> AI 問答、模型分類、Unity 關卡都能玩
        </p>
        <div className="flex gap-2">
          <a href="https://ai-tech-quest.vercel.app" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-lg bg-[#111c22] px-4 text-sm font-black text-white">
            AI 技術任務 ↗
          </a>
          <Link to="/works/rag-consultant" className="inline-flex min-h-10 items-center rounded-lg border border-[#d5ded9] bg-white px-4 text-sm font-black text-[#111c22]">
            RAG 系統
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- 聯絡 ---------- */

function ContactCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,5vw,3rem)] font-black leading-snug">
              聊聊你想做的
            </h2>
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

export default StudioHome
