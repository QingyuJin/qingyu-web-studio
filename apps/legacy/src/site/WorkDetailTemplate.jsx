import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const wholesaleProblems = ["LINE 與電話訂單容易漏", "不同客戶價格難管理", "出貨狀態不好追", "月底對帳耗時間"]
const wholesaleFlow = [
  { title: "客戶下單", text: "查看專屬價格並送出訂單" },
  { title: "後台收單", text: "訂單進入同一個管理畫面" },
  { title: "更新出貨", text: "店家確認數量與出貨狀態" },
  { title: "完成月結", text: "系統彙整月結與對帳資料" },
]
const wholesaleDeliverables = [
  { title: "客戶端", items: ["商品與分類", "專屬價格", "購物車", "訂單紀錄"] },
  { title: "管理端", items: ["訂單管理", "客戶管理", "商品價格", "出貨狀態"] },
  { title: "帳務", items: ["月結彙總", "對帳明細", "帳款狀態"] },
]

function WorkDetailTemplate({ work }) {
  const isWholesale = work.title === "批發訂貨系統"
  const price = isWholesale ? "35,000 元起" : work.price
  const tagline = isWholesale ? "客戶手機下單 後台收單 出貨與月結都在同一套流程" : work.tagline
  const problems = isWholesale ? wholesaleProblems : work.problem.signs.slice(0, 4)
  const flow = isWholesale ? wholesaleFlow : work.flow.steps.slice(0, 4)
  const deliverables = isWholesale ? wholesaleDeliverables : work.deliverables.items.slice(0, 3)
  const demoPath = work.demo?.livePath

  return <SiteLayout>
    <Seo page={work.seo} />
    <section className="bg-[#111c22] text-white"><div className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20"><Link to="/works" className="text-xs font-semibold text-white/55">← 回作品總覽</Link><p className="mt-7 text-[10px] font-semibold tracking-[.2em] text-[#8fd6cc]">{work.category}</p><h1 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,6vw,4rem)] font-semibold leading-[1.08] tracking-[-.045em]">{work.title}</h1><p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-white/68 md:text-base">{tagline}</p><p className="mt-6 text-lg font-semibold text-[#eac46f]">{price}</p><div className="mt-8 flex flex-wrap gap-3">{demoPath ? <Link to={demoPath} className="inline-flex min-h-12 items-center rounded-full bg-[#d7c89f] px-6 text-sm font-bold text-[#14211f]">{isWholesale ? "30 秒操作一次" : "操作系統"}</Link> : null}<Link to={`/contact?case=${encodeURIComponent(work.title)}`} className="inline-flex min-h-12 items-center rounded-full border border-white/22 px-6 text-sm font-bold text-white">詢問這套系統</Link></div></div></section>

    <Section eyebrow="Problem" title="它解決什麼" text={work.problem.desc}><div className="grid gap-px overflow-hidden border border-[#d9ddd6] bg-[#d9ddd6] sm:grid-cols-2">{problems.map((item) => <p key={item} className="bg-[#fbfaf6] p-5 text-sm font-semibold text-[#344540]">{item}</p>)}</div></Section>

    <Section eyebrow="Workflow" title="實際工作流程"><div className="grid gap-px overflow-hidden border border-[#d9ddd6] bg-[#d9ddd6] md:grid-cols-4">{flow.map((step, index) => <article key={step.title} className="bg-white p-5"><span className="text-[10px] font-semibold text-[#5d7c74]">0{index + 1}</span><h3 className="mt-5 text-base font-semibold text-[#12211f]">{step.title}</h3><p className="mt-3 text-xs font-medium leading-6 text-[#6e7975]">{step.text}</p></article>)}</div></Section>

    <Section eyebrow="Deliverables" title="可交付功能"><div className="grid gap-4 md:grid-cols-3">{deliverables.map((group) => <article key={group.title} className="border border-[#d9ddd6] bg-[#fbfaf6] p-5"><h3 className="text-base font-semibold text-[#173b35]">{group.title}</h3><ul className="mt-5 grid gap-3 text-sm font-medium text-[#596762]">{group.items.slice(0, 4).map((item) => <li key={item}>✓ {item}</li>)}</ul></article>)}</div></Section>

    <section className="bg-[#0d1917] text-white"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-7 md:grid-cols-[1fr_auto] md:items-center md:py-20"><div><p className="text-[10px] font-semibold tracking-[.2em] text-[#8fd6cc]">Pricing</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-[-.04em]">{price}</h2><p className="mt-4 max-w-xl text-sm font-medium leading-7 text-white/65">依實際流程 權限與串接範圍確認正式報價</p></div><div className="flex flex-wrap gap-3 md:justify-end">{demoPath ? <Link to={demoPath} className="inline-flex min-h-12 items-center rounded-full bg-[#d7c89f] px-6 text-sm font-bold text-[#14211f]">{isWholesale ? "30 秒操作一次" : "操作系統"}</Link> : null}<Link to={`/contact?case=${encodeURIComponent(work.title)}`} className="inline-flex min-h-12 items-center rounded-full border border-white/22 px-6 text-sm font-bold text-white">詢問這套系統</Link></div></div></section>
  </SiteLayout>
}

function Section({ eyebrow, title, text, children }) {
  return <section className="border-b border-[#d9ddd6] bg-[#f7f5f0]"><div className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20"><p className="text-[10px] font-semibold tracking-[.2em] text-[#557b72]">{eyebrow}</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-.04em] text-[#12211f]">{title}</h2>{text ? <p className="mt-4 mb-8 max-w-xl text-sm font-medium leading-7 text-[#65716d]">{text}</p> : <div className="h-8" />}{children}</div></section>
}

export default WorkDetailTemplate
