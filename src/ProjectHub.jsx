import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"

const works = [
  {
    title: "美容保養品牌＋電商＋美容服務／培訓",
    type: "品牌提案預覽",
    group: "proposal",
    industry: "品牌 / 官網",
    problemGroup: "官網與曝光",
    problem: "品牌同時有商品、美容服務與培訓內容，需要在同一個首頁建立清楚層次與高級感",
    solution: "精品品牌視覺、商品選購、服務預約、培訓介紹與手機購物流程的前端提案",
    price: "提案展示",
    priceGroup: "需求估價",
    duration: "依正式內容估時",
    tags: ["品牌電商", "美容服務", "SHOPLINE 前期提案"],
    primary: ["查看提案", "/works/beauty-shopline-preview"],
    secondary: ["詢問類似網站", "/contact?case=美容保養品牌電商提案"],
    visual: "beauty",
  },
  {
    title: "平台電商 / Shopify / MeepShop 建置與視覺優化",
    type: "平台電商",
    group: "product",
    industry: "零售 / 批發",
    problemGroup: "官網與曝光",
    problem: "Shopify、MeepShop、WooCommerce、QDM 店家有商品 但整間店的分類、首頁與手機購物動線還像套版",
    solution: "依平台可調整範圍整理首頁、商品分類、商品頁、手機購物、基本 SEO 與成效追蹤",
    price: "12,000 元起",
    priceGroup: "6,000–15,000 元",
    duration: "7–14 天",
    tags: ["Shopify", "MeepShop", "平台商店改版"],
    primary: ["查看展示", "/works/ecommerce-platform-redesign#demo"],
    secondary: ["詢問平台商店改版", "/contact?case=平台電商 / Shopify / MeepShop 建置與視覺優化"],
    visual: "platformCommerce",
  },
  {
    title: "鑫匠工程",
    type: "真實上線",
    group: "live",
    industry: "工程 / 服務業",
    problemGroup: "官網與曝光",
    problem: "客戶只看得到 Pro360 詢價與案例沒有自己的入口",
    solution: "黑金品牌官網、線上詢價、BuildFlow 收件流程",
    price: "30,000 元起",
    priceGroup: "25,000–40,000 元",
    duration: "約 3–4 週",
    tags: ["品牌官網", "詢價表單", "案件後台"],
    primary: ["查看案例", "/works/xinjiang"],
    secondary: ["打開網站", "https://xinjiang-website.vercel.app/"],
    visual: "ink",
  },
  {
    title: "批發訂貨系統",
    type: "可操作產品",
    group: "product",
    industry: "零售 / 批發",
    problemGroup: "接單與管理",
    problem: "不用 LINE 一筆一筆抄訂單 避免漏單與月底對帳混亂",
    solution: "客戶用專屬價格下單 老闆從後台統一出貨與月結",
    price: "25,000 元起",
    priceGroup: "25,000–40,000 元",
    duration: "14–25 天",
    tags: ["商品列表", "專屬價格", "月結"],
    primary: ["直接操作", "/works/wholesale-ordering"],
    secondary: ["詢問類似系統", "/contact?case=批發訂貨系統"],
    visual: "b2b",
  },
  {
    title: "RAG 企業知識庫",
    type: "AI / 技術實驗",
    group: "ai",
    industry: "公司 / 內部",
    problemGroup: "AI 與自動化",
    problem: "文件很多 員工與客服一直問 答案還要能附來源",
    solution: "文件問答、引用來源、Token 用量、Rate Limit 與版本管理",
    price: "需求估價",
    priceGroup: "需求估價",
    duration: "依資料量估時",
    tags: ["文件問答", "引用來源", "用量控管"],
    primary: ["操作系統", "/works/rag-consultant#demo"],
    secondary: ["看架構", "/works/rag-consultant#tech"],
    visual: "rag",
  },
  {
    title: "生醫品牌網站",
    type: "可操作產品",
    group: "product",
    industry: "品牌 / 官網",
    problemGroup: "官網與曝光",
    problem: "專業內容很多 但缺少乾淨可信任的品牌入口",
    solution: "品牌故事、醫生故事、講座報名與訂閱入口",
    price: "12,000 元起",
    priceGroup: "6,000–15,000 元",
    duration: "5–10 天",
    tags: ["品牌網站", "活動報名", "內容頁"],
    primary: ["查看成品", "/works/biomed-brand-site"],
    secondary: ["詢問類似網站", "/contact?case=生醫品牌網站"],
    visual: "bio",
  },
  {
    title: "公司一頁式官網",
    type: "可操作產品",
    group: "product",
    industry: "品牌 / 官網",
    problemGroup: "官網與曝光",
    problem: "客戶搜到你 卻看不懂你是誰、做什麼、怎麼聯絡",
    solution: "一頁整理品牌、服務、案例、流程與聯絡 CTA",
    price: "12,000–20,000 元",
    priceGroup: "6,000–15,000 元",
    duration: "5–10 天",
    tags: ["RWD", "SEO", "聯絡 CTA"],
    primary: ["查看成品", "/works/company-landing"],
    secondary: ["詢問類似網站", "/contact?case=公司一頁式官網"],
    visual: "site",
  },
  {
    title: "網站成效追蹤 / 曝光管理後台",
    type: "後台系統",
    group: "product",
    industry: "品牌 / 官網",
    problemGroup: "官網與曝光",
    problem: "網站上線後不知道瀏覽、搜尋曝光、LINE 電話與表單詢問成效",
    solution: "今日瀏覽、本月瀏覽、Google 曝光點擊、CTA 點擊與月報集中管理",
    price: "15,000 元起",
    priceGroup: "15,000–25,000 元",
    duration: "7–14 天",
    tags: ["瀏覽追蹤", "搜尋曝光", "月報"],
    primary: ["查看後台", "/works/analytics-dashboard#demo"],
    secondary: ["詢問追蹤後台", "/contact?case=網站成效追蹤 / 曝光管理後台"],
    visual: "analytics",
  },
  {
    title: "點餐系統",
    type: "可操作產品",
    group: "product",
    industry: "餐飲",
    problemGroup: "接單與管理",
    problem: "桌邊點餐、廚房控單與桌況管理分散",
    solution: "客戶端點餐、服務端控單、廚房佇列與營收狀態",
    price: "25,000 元起",
    priceGroup: "25,000–40,000 元",
    duration: "14–25 天",
    tags: ["點餐", "控單", "桌況"],
    primary: ["直接操作", "/works/restaurant-ordering"],
    secondary: ["詢問點餐系統", "/contact?case=點餐系統"],
    visual: "food",
  },
  {
    title: "工程接案系統",
    type: "完整流程",
    group: "product",
    industry: "工程 / 服務業",
    problemGroup: "接單與管理",
    problem: "詢價、照片、報價與施工狀態散在 LINE",
    solution: "網站詢價進後台 一鍵轉案件 追蹤報價與回報",
    price: "30,000 元起",
    priceGroup: "25,000–40,000 元",
    duration: "14–25 天",
    tags: ["詢價", "案件", "LINE 回報"],
    primary: ["查看系統", "/buildflow"],
    secondary: ["看鑫匠案例", "/works/xinjiang"],
    visual: "flow",
  },
  {
    title: "互動測驗系統",
    type: "可操作產品",
    group: "product",
    industry: "顧問 / 教育",
    problemGroup: "客戶溝通",
    problem: "測驗結果靠人工整理 名單與分數不好留存",
    solution: "題目、作答、解析、結果頁與填答紀錄",
    price: "6,000 元起",
    priceGroup: "6,000 元以下",
    duration: "3–8 天",
    tags: ["題庫", "計分", "結果頁"],
    primary: ["直接操作", "/works/assessment-system"],
    secondary: ["詢問測驗頁", "/contact?case=互動測驗系統"],
    visual: "quiz",
  },
  {
    title: "LINE Bot 接待",
    type: "互動展示",
    group: "product",
    industry: "店家 / 服務業",
    problemGroup: "客戶溝通",
    problem: "LINE 訊息太散 同樣問題每天重複回覆",
    solution: "自動回覆、追問需求、建立後台案件",
    price: "8,000 元起",
    priceGroup: "6,000–15,000 元",
    duration: "3–7 天",
    tags: ["自動回覆", "Webhook", "後台"],
    primary: ["查看流程", "/tools/linebot-mission#demo"],
    secondary: ["詢問 LINE Bot", "/contact?case=LINE Bot"],
    visual: "line",
  },
  {
    title: "AI 網站健檢",
    type: "AI / 技術實驗",
    group: "ai",
    industry: "品牌 / 官網",
    problemGroup: "AI 與自動化",
    problem: "網站不清楚 客戶看完不知道要不要聯絡",
    solution: "檢查 CTA、SEO、手機版與信任感 產生建議報告",
    price: "需求估價",
    priceGroup: "需求估價",
    duration: "依需求估時",
    tags: ["AI 報告", "SEO", "CTA"],
    primary: ["查看工具", "/works/ai-audit#demo"],
    secondary: ["技術拆解", "/works/ai-audit#tech"],
    visual: "ai",
  },
  {
    title: "Notion 個人品牌頁",
    type: "可操作產品",
    group: "product",
    industry: "顧問 / 教育",
    problemGroup: "官網與曝光",
    problem: "IG 有流量 但缺一個能介紹服務與收名單的入口",
    solution: "深色品牌入口、服務區、資源中心、LINE 導流",
    price: "12,000–20,000 元",
    priceGroup: "6,000–15,000 元",
    duration: "5–10 天",
    tags: ["Notion", "個人品牌", "LINE"],
    primary: ["查看成品", "/works/notion-brand-landing"],
    secondary: ["詢問類似頁", "/contact?case=Notion 個人品牌頁"],
    visual: "notion",
  },
  {
    title: "BuildFlow",
    type: "後台系統",
    group: "product",
    industry: "工程 / 服務業",
    problemGroup: "內部流程",
    problem: "需求、報價、派工、回報與完工紀錄不好追",
    solution: "案件列表、詳情、報價單、LINE 回報與狀態管理",
    price: "30,000 元起",
    priceGroup: "25,000–40,000 元",
    duration: "14–25 天",
    tags: ["案件", "報價", "LINE"],
    primary: ["打開後台", "/buildflow"],
    secondary: ["看鑫匠案例", "/works/xinjiang"],
    visual: "build",
  },
]

const industryOptions = ["全部", ...new Set(works.map((w) => w.industry))]
const problemOptions = ["全部", ...new Set(works.map((w) => w.problemGroup))]
const budgetOptions = ["全部", ...new Set(works.map((w) => w.priceGroup))]

function ProjectHub() {
  const [filterIndustry, setFilterIndustry] = useState("全部")
  const [filterProblem, setFilterProblem] = useState("全部")
  const [filterBudget, setFilterBudget] = useState("全部")

  const filtered = useMemo(() => {
    return works.filter((w) => {
      if (filterIndustry !== "全部" && w.industry !== filterIndustry) return false
      if (filterProblem !== "全部" && w.problemGroup !== filterProblem) return false
      if (filterBudget !== "全部" && w.priceGroup !== filterBudget) return false
      return true
    })
  }, [filterIndustry, filterProblem, filterBudget])

  const activeCount = [filterIndustry, filterProblem, filterBudget].filter((f) => f !== "全部").length

  return (
    <SiteLayout>
      <Seo
        page={{
          path: "/works",
          title: "全部作品｜Qingyu Web Studio",
          description: "從品牌網站到接單、後台與 AI 系統依產業、需求與預算找到適合的成品",
        }}
      />
      <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Works Catalog</p>
          <h1 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,6vw,4rem)] font-black leading-[1.12] text-[#111c22]">
            從品牌網站到接單、後台與 AI 系統
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">
            依照產業、需求與預算找到適合的成品先看真的畫面 再決定要做哪一種
          </p>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-[#e6e0d5] bg-white/92 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <FilterGroup label="產業" options={industryOptions} value={filterIndustry} onChange={setFilterIndustry} />
            <FilterGroup label="想解決的問題" options={problemOptions} value={filterProblem} onChange={setFilterProblem} />
            <FilterGroup label="預算" options={budgetOptions} value={filterBudget} onChange={setFilterBudget} />
            {activeCount > 0 ? (
              <button
                type="button"
                onClick={() => { setFilterIndustry("全部"); setFilterProblem("全部"); setFilterBudget("全部") }}
                className="rounded-full border border-[#0d6b62] px-3 py-1.5 text-[11px] font-black text-[#0d6b62] transition hover:bg-[#eef7f4]"
              >
                清除全部
              </button>
            ) : null}
            <span className="ml-auto text-xs font-bold text-[#8a938f]">共 {filtered.length} 件作品</span>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#cfd7d3] bg-[#faf8f3] p-12 text-center">
              <p className="text-lg font-black text-[#52605c]">沒有符合條件的作品</p>
              <p className="mt-2 text-sm font-bold text-[#8a938f]">試著放寬篩選條件看看</p>
              <button
                type="button"
                onClick={() => { setFilterIndustry("全部"); setFilterProblem("全部"); setFilterBudget("全部") }}
                className="mt-5 rounded-lg bg-[#111c22] px-5 py-2.5 text-sm font-black text-white"
              >
                清除篩選
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((work) => (
                <WorkCard key={work.title} work={work} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  )
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-black text-[#40514f]">{label}</span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
              value === opt
                ? "bg-[#111c22] text-white"
                : "border border-[#e3ded3] bg-[#faf8f3] text-[#40514f] hover:border-[#0d6b62]/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

function WorkCard({ work, featured = false }) {
  return (
    <article className={`group overflow-hidden rounded-2xl border border-[#e3ded3] bg-[#faf8f3] transition hover:-translate-y-1 hover:border-[#111c22]/30 hover:shadow-xl hover:shadow-[#c8bba9]/20 ${featured ? "lg:col-span-1" : ""}`}>
      <div className="p-4">
        <WorkVisual visual={work.visual} title={work.title} />
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="rounded-full bg-[#eef7f4] px-2.5 py-1 text-[11px] font-black text-[#0d6b62]">{work.type}</span>
            <h3 className="mt-3 font-['Noto_Serif_TC',serif] text-2xl font-black leading-tight text-[#111c22]">{work.title}</h3>
          </div>
          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-black text-[#5f6b67] ring-1 ring-[#e3ded3]">{work.price}</span>
        </div>

        <div className="mt-4 grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
          <InfoLine label="產業" value={work.industry} />
          <InfoLine label="問題" value={work.problem} />
          <InfoLine label="解法" value={work.solution} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {work.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-white px-2 py-1 text-[11px] font-black text-[#66716d] ring-1 ring-[#e3ded3]">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <SmartLink to={work.primary[1]} className="inline-flex min-h-10 items-center rounded-lg bg-[#111c22] px-4 text-sm font-black text-white transition group-hover:bg-[#0d6b62]">
            {work.primary[0]}
          </SmartLink>
          <SmartLink to={work.secondary[1]} className="hidden min-h-10 items-center rounded-lg border border-[#d5ded9] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] md:inline-flex">
            {work.secondary[0]}
          </SmartLink>
        </div>

        <p className="mt-4 text-xs font-bold text-[#8a938f]">預估工期：{work.duration}</p>
      </div>
    </article>
  )
}

function WorkVisual({ visual, title }) {
  const images = {
    b2b: "/demo-covers/wholesale-ordering.svg",
    rag: "/demo-covers/rag-knowledge.svg",
    food: "/demo-products/short-rib-rice.svg",
    ink: "/project-photos/335941_0.jpg",
    bio: "/demo-covers/product-landing.svg",
    site: "/demo-covers/platform-commerce.svg",
    flow: "/demo-covers/analytics-dashboard.svg",
    quiz: "/demo-covers/rag-knowledge.svg",
    line: "/demo-covers/analytics-dashboard.svg",
    ai: "/demo-covers/rag-knowledge.svg",
    notion: "/demo-covers/platform-commerce.svg",
    build: "/project-photos/335950_0.jpg",
    analytics: "/demo-covers/analytics-dashboard.svg",
    platformCommerce: "/demo-covers/platform-commerce.svg",
    beauty: "/beauty-preview/serum-ritual.jpg",
  }

  const src = images[visual]

  if (src) {
    return (
      <div className="relative min-h-44 overflow-hidden rounded-2xl">
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      </div>
    )
  }

  return (
    <div className="relative min-h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-[#111c22] via-[#233139] to-[#0d6b62] p-3 text-white">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/18 blur-2xl" />
      <div className="relative flex h-full min-h-36 items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-black text-white/30">{title.slice(0, 2)}</div>
          <div className="mx-auto mt-2 h-2 w-16 rounded-full bg-white/15" />
        </div>
      </div>
    </div>
  )
}

function InfoLine({ label, value }) {
  return (
    <p className="line-clamp-2">
      <span className="font-black text-[#111c22]">{label}：</span>
      {value}
    </p>
  )
}

function isExternalUrl(to) {
  return /^https?:\/\//.test(to)
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

export default ProjectHub
