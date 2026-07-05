import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"

const pageSeo = {
  path: "/works/notion-brand-landing",
  title: "Notion 個人品牌落地頁｜IG 導流個人品牌入口｜Qingyu Web Studio",
  description: "深色系 Notion 個人品牌落地頁，適合顧問、講師、創作者與知識型品牌作為 IG 導流入口。",
}

const services = ["財商諮詢", "現金流規劃", "投資觀念教學", "房地產投資入門"]
const resources = ["現金流試算表", "投資觀念文章", "諮詢前檢查表", "常見問題"]
const highlights = ["手機瀏覽優化", "Notion 架構規劃", "深色系視覺整理", "LINE / 表單導流", "可自行維護內容", "可嵌入影片資源"]
const audiences = ["財商顧問", "教練 / 講師", "房地產顧問", "知識型創作者", "IG 個人品牌經營者"]
const steps = ["確認定位", "規劃架構", "製作 Notion 頁面", "教學交付"]
const deliverables = ["品牌首頁", "服務入口", "資源中心", "FAQ", "LINE 導流", "諮詢表單"]

function Pill({ children, tone = "dark" }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full px-3 text-xs font-black ${
        tone === "light" ? "bg-white/10 text-white/72 ring-1 ring-white/10" : "bg-[#141414] text-[#d8c79f]"
      }`}
    >
      {children}
    </span>
  )
}

function SectionTitle({ eyebrow, title, text, light = false }) {
  return (
    <div className="mb-7 max-w-2xl">
      <p className={`text-xs font-black uppercase tracking-[0.22em] ${light ? "text-[#d8c79f]" : "text-[#8b6b33]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-[clamp(1.8rem,5vw,3rem)] font-black leading-tight ${light ? "text-white" : "text-[#17130f]"}`}>{title}</h2>
      {text ? <p className={`mt-3 text-sm font-bold leading-7 ${light ? "text-white/62" : "text-[#63584a]"}`}>{text}</p> : null}
    </div>
  )
}

function NotionPreview() {
  const faq = [
    ["適合誰？", "顧問、講師、創作者、需要 IG 導流的人。"],
    ["怎麼預約？", "點 LINE 或表單，先留下需求與時間。"],
    ["服務流程？", "初談、盤點、規劃、交付。"],
  ]

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#0c0c0d] p-4 shadow-2xl shadow-black/30 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff6b5f]" />
          <span className="h-3 w-3 rounded-full bg-[#f6c15f]" />
          <span className="h-3 w-3 rounded-full bg-[#69d17d]" />
        </div>
        <span className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-black text-white/55">Ready-to-use Notion page</span>
      </div>

      <div className="rounded-[1.6rem] bg-[#151516] p-5 md:p-7">
        <div className="flex flex-wrap gap-2">
          <Pill tone="light">Cashflow</Pill>
          <Pill tone="light">Personal Brand</Pill>
          <Pill tone="light">LINE CTA</Pill>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c7a96b]">Private Advisor Page</p>
            <h3 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              讓錢流向更清楚的生活。
            </h3>
            <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-white/58">
              給想整理財務、投資觀念與現金流的人，一個清楚的入口。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex min-h-11 items-center rounded-xl bg-[#d8b46c] px-4 text-sm font-black text-[#17130f]">加入 LINE 官方帳號</span>
              <span className="inline-flex min-h-11 items-center rounded-xl border border-white/12 px-4 text-sm font-black text-white/78">填寫諮詢表單</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#d8b46c] text-xl font-black text-[#17130f]">C</div>
              <div>
                <p className="text-sm font-black text-white">Cashflow Mentor</p>
                <p className="mt-1 text-xs font-bold text-white/48">財商顧問｜現金流規劃</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ["諮詢入口", "LINE / 表單"],
                ["資源數", "12 篇"],
                ["更新方式", "自行編輯"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-3">
                  <span className="text-xs font-black text-white/44">{label}</span>
                  <span className="text-sm font-black text-[#d8c79f]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="structure" className="mt-8 grid gap-4 lg:grid-cols-[0.85fr_1fr_0.85fr]">
          <NotionBlock title="核心服務" items={services} />
          <NotionBlock title="資源中心" items={resources} />
          <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
            <p className="text-sm font-black text-white">FAQ</p>
            <div className="mt-4 grid gap-3">
              {faq.map(([question, answer]) => (
                <div key={question} className="rounded-xl border border-white/8 bg-black/16 p-3">
                  <p className="text-xs font-black text-[#d8c79f]">{question}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-white/58">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["IG 個人檔案", "Notion 品牌頁", "LINE / 表單諮詢"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black/18 p-4">
              <p className="font-mono text-xs font-black text-[#d8c79f]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-black text-white/78">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NotionBlock({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <p className="text-sm font-black text-white">{title}</p>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-xl bg-black/18 px-3 py-3 text-sm font-bold text-white/68">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.2rem] bg-[#d8b46c]/18 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/12 bg-[#101011]/90 p-4 shadow-2xl shadow-black/30">
        <div className="rounded-[1.5rem] border border-white/8 bg-[#171717] p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-[#d8b46c] px-3 py-1 text-[11px] font-black text-[#17130f]">IG Link in Bio</span>
            <span className="font-mono text-xs font-black text-white/42">notion.site</span>
          </div>
          <h2 className="mt-8 text-3xl font-black leading-tight text-white">財商顧問個人入口</h2>
          <p className="mt-3 text-sm font-bold leading-6 text-white/58">服務、資源、LINE 與諮詢表單集中在一頁。</p>
          <div className="mt-6 grid gap-2">
            {["加入 LINE 官方帳號", "預約一對一諮詢", "下載現金流工具"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-black text-white/80">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 h-11 rounded-xl bg-[#d8b46c]" />
        </div>
      </div>
    </div>
  )
}

function PricePanel() {
  return (
    <section className="border-y border-[#29231d] bg-[#0e0e0f] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-16">
        <SectionTitle eyebrow="Pricing" title="價格參考" text="依內容量、區塊數、修改次數與是否需要表單 / LINE 導流調整。" light />
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
          <p className="text-sm font-black text-[#d8c79f]">Notion 個人品牌落地頁</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-white">12,000～20,000 元</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs font-black text-white/48">預估時間</p>
              <p className="mt-2 text-xl font-black text-white">5～10 天</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-xs font-black text-white/48">交付形式</p>
              <p className="mt-2 text-xl font-black text-white">Notion 頁面</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NotionBrandLanding() {
  return (
    <SiteLayout>
      <Seo page={pageSeo} />

      <section id="top" className="relative isolate overflow-hidden border-b border-[#2f281f] bg-[#101011] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(216,180,108,0.22),transparent_34%),radial-gradient(circle_at_88%_8%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl gap-10 px-4 py-14 md:min-h-[760px] md:grid-cols-[0.92fr_1.08fr] md:items-center md:py-20">
          <div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="light">Notion</Pill>
              <Pill tone="light">個人品牌</Pill>
              <Pill tone="light">財商顧問</Pill>
            </div>
            <h1 className="mt-7 max-w-2xl text-[clamp(2.4rem,8vw,5.4rem)] font-black leading-[0.98] tracking-tight">
              Notion 個人品牌落地頁
            </h1>
            <p className="mt-6 max-w-xl text-base font-bold leading-8 text-white/66 md:text-lg">
              為顧問、講師與知識型創作者打造的 IG 導流入口。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#preview" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#d8b46c] px-6 text-sm font-black text-[#17130f] transition hover:bg-[#e7c982]">
                查看成品頁面
              </a>
              <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/14 bg-white/8 px-6 text-sm font-black text-white transition hover:bg-white/12">
                我想做類似的
              </Link>
            </div>
          </div>
          <HeroMockup />
        </div>
      </section>

      <section id="preview" className="scroll-mt-20 bg-[#0f0f10] px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Product Page" title="完整頁面" text="深色系、金融感、可直接放在 IG 個人檔案。" light />
          <NotionPreview />
        </div>
      </section>

      <section className="border-y border-[#2b251f] bg-[#101011] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle eyebrow="Delivery" title="交付內容" text="不是空白模板，是整理好架構與導流的完整頁面。" light />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <article key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5">
                <p className="text-lg font-black text-white">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8dfd2] bg-[#f8f3ea]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle eyebrow="Highlights" title="功能亮點" text="少量內容，就能成為清楚的品牌入口。" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <article key={item} className="rounded-2xl border border-[#e2d6c5] bg-white/84 p-5 shadow-sm">
                <p className="text-base font-black text-[#17130f]">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.82fr_1.18fr] md:items-start md:py-16">
          <SectionTitle eyebrow="Audience" title="適合對象" text="需要快速上線、可自行維護的個人品牌入口。" />
          <div className="grid gap-3 sm:grid-cols-2">
            {audiences.map((item) => (
              <div key={item} className="rounded-2xl border border-[#e4ded5] bg-[#faf8f3] p-5 text-lg font-black text-[#17130f]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8dfd2] bg-[#f8f3ea]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle eyebrow="Process" title="製作流程" text="從定位到交付，用四步整理好。" />
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <article key={step} className="rounded-2xl border border-[#e2d6c5] bg-white p-5">
                <p className="font-mono text-xs font-black text-[#9f793d]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-xl font-black text-[#17130f]">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricePanel />

      <section className="bg-[#f8f3ea] px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-[2rem] border border-[#e2d6c5] bg-white p-6 shadow-xl shadow-[#c7b697]/12 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8b6b33]">Contact</p>
            <h2 className="mt-3 text-3xl font-black text-[#17130f]">想做一個可以直接放在 IG 的個人品牌入口？</h2>
          </div>
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17130f] px-6 text-sm font-black text-white transition hover:bg-[#2a2118]">
            找我討論
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}

export default NotionBrandLanding
