import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { contact } from "./content"
import { products } from "./productData"

const TABS = [
  ["overview", "總覽"],
  ["front", "前台成品"],
  ["back", "後台畫面"],
  ["flow", "資料流程"],
  ["tech", "技術架構"],
  ["pricing", "報價範圍"],
]

function isExternal(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function LiveButton({ live, className }) {
  if (!live) return null
  if (isExternal(live.path)) {
    return (
      <a href={live.path} target="_blank" rel="noreferrer" className={className}>
        {live.label} ↗
      </a>
    )
  }
  return (
    <Link to={live.path} className={className}>
      {live.label}
    </Link>
  )
}

function ProductPage({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp || params.slug
  const product = products[slug]
  const [tab, setTab] = useState("overview")

  if (!product) return <Navigate to="/works" replace />

  const { Front, Back } = product

  return (
    <SiteLayout>
      <Seo
        page={{
          path: `/works/${slug}`,
          title: `${product.name}｜成品展示與報價｜Qingyu Web Studio`,
          description: `${product.tagline} 適合${product.forWho}。${product.priceFrom}，工期約 ${product.duration}。可直接看前台成品與後台畫面。`,
        }}
      />

      {/* hero */}
      <section className="border-b border-[#e6e0d5] bg-[#111c22] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Link to="/#products" className="text-xs font-black text-white/50 hover:text-white/80">← 回成品展示</Link>
            <h1 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,5vw,3.1rem)] font-black leading-snug">{product.name}</h1>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-white/72 md:text-base">{product.tagline}</p>
            <div className="mt-6 grid gap-2 text-sm font-bold sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.07] p-3">
                <p className="text-[11px] font-black text-[#8fd6cc]">適合誰</p>
                <p className="mt-1 text-white/85">{product.forWho}</p>
              </div>
              <div className="rounded-xl bg-white/[0.07] p-3">
                <p className="text-[11px] font-black text-[#8fd6cc]">解決什麼</p>
                <p className="mt-1 text-white/85">{product.solves}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#eac46f] px-4 py-1.5 text-sm font-black text-[#111c22]">{product.priceFrom}</span>
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-black text-white/80">工期約 {product.duration}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <LiveButton live={product.live} className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]" />
              <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white/10">
                詢問這個系統
              </Link>
            </div>
          </div>

          <div className="lg:pl-6">
            <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-white/40">成品預覽</p>
            <Front />
          </div>
        </div>
      </section>

      {/* tabs */}
      <div className="sticky top-14 z-30 border-b border-[#e6e0d5] bg-[#faf8f3]/95 backdrop-blur md:top-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                  tab === id ? "bg-[#111c22] text-white" : "bg-white text-[#52605c] hover:text-[#111c22]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          {tab === "overview" ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <SectionTitle>這個系統在做什麼</SectionTitle>
                <div className="mt-4 grid gap-3">
                  {product.overview.map((p) => (
                    <p key={p.slice(0, 12)} className="text-sm font-bold leading-7 text-[#52605c] md:text-base">{p}</p>
                  ))}
                </div>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 rounded-xl border border-[#e3ded3] bg-white p-3 text-sm font-black text-[#3d4c48]">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eef7f4] text-[11px] text-[#0d6b62]">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest text-[#0d6b62]">報價與工期</p>
                <p className="mt-3 text-3xl font-black text-[#111c22]">{product.priceFrom}</p>
                <p className="mt-1 text-sm font-bold text-[#52605c]">工期約 {product.duration}（素材齊全、修改 1–2 次）</p>
                <div className="mt-5 grid gap-2">
                  <LiveButton live={product.live} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white" />
                  <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                    詢問報價
                  </Link>
                </div>
              </div>
            </div>
          ) : null}

          {tab === "front" ? (
            <div>
              <SectionTitle>前台成品｜客戶看到的畫面</SectionTitle>
              <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c]">這是客戶實際會操作的介面，不是效果圖。</p>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div><product.Front /></div>
                <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
                  <p className="text-sm font-black text-[#111c22]">前台重點</p>
                  <div className="mt-3 grid gap-2">
                    {product.features.slice(0, 4).map((f) => (
                      <p key={f} className="text-sm font-bold text-[#52605c]">・{f}</p>
                    ))}
                  </div>
                  <LiveButton live={product.live} className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white" />
                </div>
              </div>
            </div>
          ) : null}

          {tab === "back" ? (
            <div>
              <SectionTitle>後台畫面｜你管理的地方</SectionTitle>
              <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c]">資料、訂單、客戶或案件，都在後台一目了然。</p>
              <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div><Back /></div>
                <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
                  <p className="text-sm font-black text-[#111c22]">後台能做什麼</p>
                  <div className="mt-3 grid gap-2">
                    {product.features.slice(2).map((f) => (
                      <p key={f} className="text-sm font-bold text-[#52605c]">・{f}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {tab === "flow" ? (
            <div>
              <SectionTitle>資料流程｜需求怎麼跑成資料</SectionTitle>
              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {product.flow.map(([title, text], i) => (
                  <div key={title} className="relative rounded-2xl border border-[#e3ded3] bg-white p-5">
                    <span className="font-mono text-xs font-black text-[#0d6b62]">0{i + 1}</span>
                    <h3 className="mt-2 text-lg font-black text-[#111c22]">{title}</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
                    {i < product.flow.length - 1 ? (
                      <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[#c9d2ce] md:block">→</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "tech" ? (
            <div>
              <SectionTitle>技術架構</SectionTitle>
              <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c]">用穩定、好維護的技術做，之後要擴充也接得上。</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tech.map((t) => (
                  <span key={t} className="rounded-xl border border-[#e3ded3] bg-white px-4 py-2 text-sm font-black text-[#3d4c48]">{t}</span>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "pricing" ? (
            <div>
              <SectionTitle>報價範圍</SectionTitle>
              <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c]">
                以下為參考區間，實際依頁數、功能與資料整理程度報價。網域、主機與第三方費用另計。
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-[#e3ded3] bg-white">
                {product.pricing.map(([item, price, note], i) => (
                  <div key={item} className={`grid gap-1 p-4 sm:grid-cols-[1fr_auto] sm:items-center ${i > 0 ? "border-t border-[#eee9df]" : ""}`}>
                    <div>
                      <p className="text-base font-black text-[#111c22]">{item}</p>
                      <p className="mt-0.5 text-sm font-bold text-[#52605c]">{note}</p>
                    </div>
                    <p className="text-lg font-black text-[#0d6b62] sm:text-right">{price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white">詢問報價</Link>
                <a href={`https://line.me/R/ti/p/~${contact.lineId}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-xl border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                  加 LINE：{contact.lineId}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[#111c22] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center md:py-16">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">想做一套像這樣的{product.name}？</h2>
          <p className="max-w-xl text-sm font-bold leading-7 text-white/72">{product.priceFrom}，工期約 {product.duration}。先聊聊你的需求，我給你適合的做法與報價。</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22]">詢問報價</Link>
            <LiveButton live={product.live} className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-6 text-sm font-black text-white" />
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function SectionTitle({ children }) {
  return <h2 className="font-['Noto_Serif_TC',serif] text-[clamp(1.4rem,4vw,2.1rem)] font-black text-[#111c22]">{children}</h2>
}

export default ProductPage
