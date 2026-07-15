import { Link, Navigate, useParams } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { products } from "./productData"

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

  if (!product) return <Navigate to="/works" replace />

  const { Front, Back } = product

  return (
    <SiteLayout>
      <Seo
        page={{
          path: `/works/${slug}`,
          title: `${product.name}｜成品展示與報價｜Qingyu Web Studio`,
          description: `${product.tagline} 適合${product.forWho}${product.priceFrom} 工期約 ${product.duration}可直接看前台成品與後台畫面`,
        }}
      />

      {/* Hero */}
      <section className="border-b border-[#e6e0d5] bg-[#111c22] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Link to="/#products" className="text-xs font-black text-white/50 hover:text-white/80">← 回成品展示</Link>
            <h1 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,5vw,3.1rem)] font-black leading-snug">{product.name}</h1>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-white/72 md:text-base">{product.tagline}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#eac46f] px-4 py-1.5 text-sm font-black text-[#111c22]">{product.priceFrom}</span>
              <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-black text-white/80">工期約 {product.duration}</span>
            </div>
            <p className="mt-4 text-sm font-bold leading-7 text-white/60">適合：{product.forWho}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LiveButton live={product.live} className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]" />
              <Link to="/contact" className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10">
                問這個報價
              </Link>
            </div>
          </div>

          <div className="lg:pl-6">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/40">成品預覽</p>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${product.interactive ? "bg-[#8fd6cc]/18 text-[#8fd6cc]" : "bg-white/10 text-white/60"}`}>
                {product.interactive ? "● 可直接操作" : "實際成品畫面"}
              </span>
            </div>
            <Front />
          </div>
        </div>
      </section>

      {/* 前台 / 後台 並排 */}
      <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle>{product.solves}</SectionTitle>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c]">
            這套系統把它變成兩個畫面：客人自己操作前台 資料自動進你的後台
          </p>
          <div className="mt-7 grid gap-4 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">前台 · 客人看到的</p>
              <Front />
              <p className="mt-3 text-sm font-bold text-[#52605c]">{product.name.includes("測驗") ? "上面可以直接作答試玩" : "客人在手機上就能完成"}</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">後台 · 你管理的</p>
              <Back />
              <p className="mt-3 text-sm font-bold text-[#52605c]">每一筆都追得到 不再散在訊息裡</p>
            </div>
          </div>
        </div>
      </section>

      {/* 三個重點 */}
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle>重點只有三個</SectionTitle>
          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {product.features.slice(0, 3).map((f, i) => (
              <div key={f} className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5">
                <span className="font-mono text-sm font-black text-[#0d6b62]">0{i + 1}</span>
                <p className="mt-2 text-lg font-black text-[#111c22]">{f}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.features.slice(3).map((f) => (
              <span key={f} className="rounded-full bg-[#faf8f3] px-3 py-1.5 text-xs font-black text-[#66716d] ring-1 ring-[#e3ded3]">
                ＋{f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 報價 */}
      <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle>報價範圍</SectionTitle>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#52605c]">
            參考區間 實際依範圍報價網域、主機與第三方費用另計
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
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tech.map((t) => (
              <span key={t} className="rounded-md bg-white px-2.5 py-1 text-[11px] font-black text-[#8a938f] ring-1 ring-[#e3ded3]">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111c22] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center md:py-16">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">想做一套像這樣的{product.name}？</h2>
          <p className="max-w-xl text-sm font-bold leading-7 text-white/72">{product.priceFrom} 工期約 {product.duration}先聊聊你的需求 我給你適合的做法與報價</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22]">問這個報價</Link>
            <LiveButton live={product.live} className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-6 text-sm font-black text-white" />
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function SectionTitle({ children }) {
  return <h2 className="max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(1.4rem,4vw,2.1rem)] font-black leading-snug text-[#111c22]">{children}</h2>
}

export default ProductPage
