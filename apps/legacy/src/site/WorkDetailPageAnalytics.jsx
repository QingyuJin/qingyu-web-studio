import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { AnalyticsDashboardDemo } from "./WorkDemoPanels"

const data = {
  seo: {
    path: "/works/analytics-dashboard",
    title: "網站成效追蹤與曝光管理後台展示｜Qingyu Web Studio",
    description: "今日瀏覽 本月瀏覽 Google 搜尋曝光點擊 LINE 電話表單與每月報告集中展示",
  },
  title: "網站成效追蹤 / 曝光管理後台",
  tagline: "把今日瀏覽 Google 搜尋曝光 LINE 電話點擊 表單送出與每月報告集中在一個後台",
  price: "15,000 元起",
  duration: "7–14 天",
  forWho: "有官網、品牌頁、投廣告或靠 Google 搜尋接案的店家",
  problem: {
    title: "網站上線後 訪客從哪來完全不知道",
    desc: "網站上線後只知道有人看 卻不知道訪客從哪裡來 Google 曝光有沒有成長 LINE 電話與表單是否真的帶來詢問",
    pain: "不知道哪些管道有效 看不到什麼頁面受歡迎 月報只能手動整理",
    signs: ["不知道訪客來源", "看不到搜尋曝光成長", "LINE 電話成效不明", "月報整理很累"],
  },
  solution: {
    title: "瀏覽 搜尋曝光 CTA 點擊 月報集中管理",
    desc: "建立一個老闆看得懂的成效後台 整合網站瀏覽 搜尋曝光 CTA 點擊 表單送出 熱門頁面 流量來源與月報輸出",
    points: [
      { title: "瀏覽與曝光儀表板", text: "今日瀏覽 本月瀏覽 Google 搜尋曝光與點擊 一眼掌握網站健康度" },
      { title: "轉換事件追蹤", text: "LINE 點擊 電話點擊 表單送出 不只看到訪客來 還看到他們做了什麼" },
      { title: "月報自動產生", text: "每月成效摘要 含瀏覽趨勢 熱門頁面 流量來源與成長提醒 可直接給客戶或老闆" },
    ],
  },
  result: {
    title: "從數據看到成長 從月報獲得方向",
    desc: "網站不再只是上線就好 而是持續看到曝光成長 了解訪客行為 用數據決定下一步",
    metrics: [
      { label: "今日瀏覽", value: "即時顯示" },
      { label: "搜尋曝光", value: "自動彙整" },
      { label: "轉換事件", value: "LINE/電話/表單" },
      { label: "月報輸出", value: "每月自動" },
    ],
  },
  flow: {
    title: "從追蹤埋點到月報產出",
    desc: "五個步驟 從網站安裝追蹤碼到月報自動產出",
    steps: [
      { title: "網站安裝追蹤碼", text: "在網站頁面與按鈕埋入瀏覽 LINE 電話 表單等事件追蹤碼" },
      { title: "串接 Google 數據", text: "串接 Google Search Console 與 GA4 自動拉取搜尋曝光點擊與流量來源" },
      { title: "後台彙整指標", text: "瀏覽 曝光 轉換事件 熱門頁面 流量來源集中在一個儀表板" },
      { title: "觀察與調整", text: "每天打開後台看變化 了解哪些頁面受歡迎 哪些管道有效" },
      { title: "月報自動產出", text: "每月生成成效摘要 含趨勢圖表 熱門頁面 成長提醒 可直接給客戶或老闆" },
    ],
  },
  deliverables: {
    title: "交付內容",
    desc: "從追蹤埋點到月報輸出 全部到位",
    items: [
      { title: "成效後台", items: ["瀏覽儀表板", "Google 搜尋曝光統計", "熱門頁面排行", "流量來源分析"] },
      { title: "事件追蹤", items: ["LINE 點擊追蹤", "電話點擊追蹤", "表單送出追蹤", "自訂事件命名"] },
      { title: "報告功能", items: ["每月成效摘要", "成長趨勢圖表", "可匯出分享", "月報模板"] },
    ],
  },
  pricing: {
    title: "報價範圍",
    desc: "依資料來源數量與報表需求報價",
    plans: [
      { name: "基礎成效後台", price: "15,000 元起", note: "瀏覽儀表板 事件追蹤 月報" },
      { name: "含 GA4 / Search Console 串接", price: "25,000 元起", note: "自動拉取 Google 數據" },
      { name: "多站管理版", price: "依需求估價", note: "多網站同時追蹤 自訂報表" },
    ],
  },
  techStack: ["React / Vite", "Tailwind CSS", "Google Search Console API", "GA4", "Serverless Function", "Vercel"],
}

const sectionStyle = "border-b border-[#e6e0d5]"
const innerStyle = "mx-auto max-w-6xl px-4 py-14 md:py-18"

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.5rem,4vw,2.5rem)] font-black leading-tight text-[#111c22]">{title}</h2>
      {text ? <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p> : null}
    </div>
  )
}

function WorkDetailPageAnalytics() {
  return (
    <SiteLayout>
      <Seo page={data.seo} />

      {/* Hero */}
      <section className="bg-[#111c22] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Link to="/works" className="text-xs font-black text-white/50 hover:text-white/80">← 回作品總覽</Link>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">成效追蹤系統</p>
          <h1 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,6vw,3.8rem)] font-black leading-[1.12]">{data.title}</h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-white/72 md:text-base">{data.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#eac46f] px-4 py-1.5 text-sm font-black text-[#111c22]">{data.price}</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-black text-white/80">工期約 {data.duration}</span>
            <span className="text-sm font-bold text-white/50">適合：{data.forWho}</span>
          </div>
        </div>
      </section>

      {/* 問題 */}
      <section className={`${sectionStyle} bg-[#faf8f3]`}>
        <div className={innerStyle}>
          <SectionTitle eyebrow="Problem" title={data.problem.title} text={data.problem.desc} />
          <div className="rounded-2xl border border-[#e3ded3] bg-white p-6">
            <p className="text-sm font-bold leading-7 text-[#b91c1c]">{data.problem.pain}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.problem.signs.map((s) => <span key={s} className="rounded-full border border-[#e3ded3] bg-[#faf8f3] px-3 py-1 text-xs font-black text-[#52605c]">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* 解法 */}
      <section className={`${sectionStyle} bg-white`}>
        <div className={innerStyle}>
          <SectionTitle eyebrow="Solution" title={data.solution.title} text={data.solution.desc} />
          <div className="grid gap-4 md:grid-cols-3">
            {data.solution.points.map((p) => (
              <div key={p.title} className="rounded-xl border border-[#e3ded3] bg-white p-5">
                <p className="text-sm font-black text-[#0d6b62]">{p.title}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 成果 */}
      <section className={`${sectionStyle} bg-[#111c22] text-white`}>
        <div className={innerStyle}>
          <SectionTitle eyebrow="Result" title={data.result.title} text={data.result.desc} />
          <div className="grid gap-4 md:grid-cols-4">
            {data.result.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-[#233139] bg-[#111c22] p-5">
                <p className="text-sm font-black text-[#8fd6cc]">{m.label}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-white/72">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className={`${sectionStyle} bg-white`}>
        <div className={innerStyle}>
          <SectionTitle eyebrow="Flow" title={data.flow.title} text={data.flow.desc} />
          <div className="grid gap-3 md:grid-cols-5">
            {data.flow.steps.map((step, i) => (
              <div key={step.title} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
                <span className="font-mono text-sm font-black text-[#0d6b62]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-black text-[#111c22]">{step.title}</h3>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 完整操作展示 */}
      <section className={`${sectionStyle} bg-[#faf8f3]`}>
        <div className="mx-auto max-w-full px-0 py-14 md:py-18">
          <div className="px-4">
            <SectionTitle eyebrow="Demo" title="直接操作成效後台" text="點擊側欄切換面板 模擬 CTA 點擊 產生月報 全部可以直接按" />
          </div>
          <div className="max-w-6xl mx-auto px-4">
            <AnalyticsDashboardDemo />
          </div>
          <div className="mt-6 text-center">
            <a href="#demo-report" className="inline-flex min-h-12 items-center rounded-xl bg-[#111c22] px-6 text-sm font-black text-white transition hover:bg-[#0d6b62]">
              跳到月報功能 ↗
            </a>
          </div>
        </div>
      </section>

      {/* 交付內容 */}
      <section className={`${sectionStyle} bg-white`}>
        <div className={innerStyle}>
          <SectionTitle eyebrow="Deliverables" title={data.deliverables.title} text={data.deliverables.desc} />
          <div className="grid gap-4 md:grid-cols-3">
            {data.deliverables.items.map((item) => (
              <div key={item.title} className="rounded-xl border border-[#e3ded3] bg-white p-5">
                <p className="text-sm font-black text-[#0d6b62]">{item.title}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{item.items.map((i) => `・${i}`).join("\n")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 價格 */}
      <section className={`${sectionStyle} bg-[#faf8f3]`}>
        <div className={innerStyle}>
          <SectionTitle eyebrow="Pricing" title={data.pricing.title} text={data.pricing.desc} />
          <div className="overflow-hidden rounded-2xl border border-[#e3ded3] bg-white">
            {data.pricing.plans.map((plan, i) => (
              <div key={plan.name} className={`grid gap-1 p-5 sm:grid-cols-[1fr_auto] sm:items-center ${i > 0 ? "border-t border-[#eee9df]" : ""}`}>
                <div>
                  <p className="text-base font-black text-[#111c22]">{plan.name}</p>
                  <p className="mt-0.5 text-sm font-bold text-[#52605c]">{plan.note}</p>
                </div>
                <p className="text-lg font-black text-[#0d6b62] sm:text-right">{plan.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {data.techStack.map((t) => (
              <span key={t} className="rounded-md bg-white px-2.5 py-1 text-[11px] font-black text-[#8a938f] ring-1 ring-[#e3ded3]">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111c22] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center md:py-18">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">想看自己的網站數據？</h2>
          <p className="max-w-xl text-sm font-bold leading-7 text-white/72">{data.price} 工期約 {data.duration} 先聊聊你想追蹤哪些數據 我給你適合的做法與報價</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact?case=網站成效追蹤%20%2F%20曝光管理後台" className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]">
              問這個報價
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default WorkDetailPageAnalytics
