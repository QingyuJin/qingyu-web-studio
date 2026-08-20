import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const plans = [
  {
    id: "line-inquiry",
    name: "LINE 詢價數位化",
    audience: "工程行、服務業",
    pain: "詢價散在 LINE 和電話裡 客戶資料難追蹤",
    deliverables: ["線上詢價表單", "LINE 入口與導流", "案件後台收件匣", "一鍵轉為案件追蹤"],
    demos: [
      ["試填詢價表單", "/contractor-site#inquiry"],
      ["開後台收件匣", "/demo/buildflow"],
    ],
  },
  {
    id: "wholesale",
    name: "批發訂貨系統",
    audience: "批發商、食材商",
    pain: "訂單靠電話與紙本 漏單、對帳、報價各自為政",
    deliverables: ["商品表與客戶分級報價", "客戶端手機下單", "訂單與出貨後台", "叫貨單與月結對帳文字"],
    demos: [["直接操作訂貨系統", "/works/wholesale-ordering"]],
  },
  {
    id: "rag",
    name: "AI 文件知識庫",
    audience: "公司、協會、工廠",
    pain: "SOP、規章、產品文件一堆 新人與客服每天重複找答案",
    deliverables: ["PDF / 文件問答", "回答附引用來源", "文件版本與資料庫", "用量統計與權限管理"],
    demos: [["直接操作知識庫問答", "/works/rag-consultant"]],
  },
  {
    id: "brand-site",
    name: "企業形象 + 作品集網站",
    audience: "傳統產業",
    pain: "只有名片和口碑 客戶與補助單位搜尋不到你",
    deliverables: ["品牌形象網站", "案例 / 作品頁", "詢價入口", "手機版 RWD 與基本 SEO"],
    demos: [
      ["看真實案例：鑫匠工程", "/demo/xinjiang"],
      ["看品牌網站範例", "/works/biomed-brand-site"],
    ],
  },
]

const proofFlow = [
  ["客戶在官網填詢價", "以鑫匠工程為例：品牌官網上的表單 手機就能填"],
  ["需求進後台收件匣", "BuildFlow「網站詢價」即時收到 含聯絡方式與需求全文"],
  ["一鍵轉為案件", "接著報價、發包、任務指派與回報 全部同一套系統"],
]

const steps = [
  ["01", "需求盤點", "了解現況流程 對齊補助案可申請的項目"],
  ["02", "方案與報價", "把要做的系統寫成看得懂的範圍、時程與金額"],
  ["03", "分階段實作", "先上核心流程 每階段都有可操作的版本可驗收"],
  ["04", "驗收上線", "部署到正式網址 實際資料跑一輪"],
  ["05", "教學與維護", "操作教學與文件 後續可談維護或擴充"],
]

const trustChips = ["每個方案都有可操作成品", "前後台實際串接 不是示意圖", "可對齊數位轉型補助項目"]

function isExternal(to) {
  return /^https?:\/\//.test(to)
}

function DemoLink({ to, children, primary = false }) {
  const className = `inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-black transition ${
    primary
      ? "bg-[#111c22] text-white hover:bg-[#26343b]"
      : "border border-[#cfd7d3] bg-white text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]"
  }`
  if (isExternal(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

function AiTransformation() {
  return (
    <SiteLayout>
      <Seo
        page={{
          path: "/ai-transformation",
          title: "中小企業 AI 數位轉型實作服務｜網站、LINE 詢價、訂貨系統、AI 知識庫｜Qingyu Web Studio",
          description:
            "協助傳統產業導入網站、LINE 詢價、訂貨系統、AI 文件知識庫與後台管理每個方案都有可直接操作的成品 讓補助案不只停在企劃書 而是真的做得出來",
        }}
      />

      <section className="border-b border-[#1c2d2e] bg-[#111c22] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8fd6cc]">AI Digital Transformation</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,7vw,4.2rem)] font-black leading-[1.05] tracking-tight">
            中小企業 AI 數位轉型
            <br />
            實作服務
          </h1>
          <p className="mt-6 max-w-2xl text-sm font-bold leading-8 text-white/72 md:text-base">
            協助傳統產業導入網站、LINE 詢價、訂貨系統、AI 文件知識庫與後台管理——讓補助案不只停在企劃書 而是真的做得出來
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#plans"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]"
            >
              看四個方案與成品
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              填需求表單
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <span key={chip} className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-black text-white/80">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-20 border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Plans</p>
            <h2 className="mt-3 text-[clamp(1.7rem,5vw,3rem)] font-black leading-tight text-[#111c22]">
              四個方案 每個都能直接點開操作
            </h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c] md:text-base">
              不用想像做出來會長怎樣——每個方案下面的按鈕 就是已經做好、可以直接操作的系統
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {plans.map((plan) => (
              <article key={plan.id} className="flex flex-col rounded-2xl border border-[#e0d8cc] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-2xl font-black text-[#111c22]">{plan.name}</h3>
                  <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{plan.audience}</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{plan.pain}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {plan.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg bg-[#faf8f3] px-3 py-2 text-sm font-black text-[#3d4c48]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d6b62]" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2 pt-1">
                  {plan.demos.map(([label, to], index) => (
                    <DemoLink key={label} to={to} primary={index === 0}>
                      {label}
                    </DemoLink>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Proof</p>
              <h2 className="mt-3 text-[clamp(1.7rem,5vw,3rem)] font-black leading-tight text-[#111c22]">
                不是企劃書 
                <br />
                是已經在跑的系統
              </h2>
              <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#52605c] md:text-base">
                屏東泥作工程行「鑫匠」的官網詢價 已經真實串進 BuildFlow 後台資料庫補助顧問或審查委員打開網站 就能自己操作一遍
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/works/xinjiang" className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                  看鑫匠完整案例
                </Link>
                <Link to="/works" className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                  看所有成品
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              {proofFlow.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[3rem_1fr] gap-3 rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
                  <span className="font-mono text-sm font-black text-[#0d6b62]">0{index + 1}</span>
                  <div>
                    <p className="text-lg font-black text-[#111c22]">{title}</p>
                    <p className="mt-1 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Process</p>
            <h2 className="mt-3 text-[clamp(1.7rem,5vw,3rem)] font-black leading-tight text-[#111c22]">導入流程</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">從盤點到上線 每一階段都有看得到、點得動的東西</p>
          </div>
          <div className="grid gap-3 md:grid-cols-5">
            {steps.map(([no, title, text]) => (
              <article key={no} className="rounded-2xl border border-[#e3ded3] bg-white p-4">
                <p className="font-mono text-xs font-black text-[#0d6b62]">{no}</p>
                <h3 className="mt-3 text-lg font-black text-[#111c22]">{title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111c22] text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Contact</p>
            <h2 className="mt-3 text-3xl font-black">想把數位轉型真的做出來？</h2>
            <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">
              告訴我你的產業、想解決的流程、預算與時程；如果正在申請補助 也可以直接把計畫項目丟給我對齊
            </p>
          </div>
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22]">
            填需求表單
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}

export default AiTransformation
