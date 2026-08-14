import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"

const works = [
  {
    title: "LULUFACE 美容品牌電商",
    type: "正式展示",
    group: "live",
    industry: "品牌 / 官網",
    problemGroup: "官網與曝光",
    problem: "品牌同時有商品、美容服務與培訓內容，需要在同一個首頁建立清楚層次與高級感",
    solution: "精品品牌視覺、商品選購、服務預約、培訓介紹、內容 SEO 與手機購物流程",
    price: "品牌電商",
    priceGroup: "需求估價",
    duration: "依正式內容估時",
    tags: ["品牌電商", "美容服務", "SEO / RWD"],
    primary: ["開啟正式展示", "https://luluface.vercel.app/"],
    secondary: ["查看提案拆解", "/works/beauty-shopline-preview"],
    visual: "beauty",
  },
  {
    title: "MORIE SELECT 選品電商",
    type: "可操作產品",
    group: "live",
    industry: "零售 / 批發",
    problemGroup: "官網與曝光",
    problem: "選品品牌需要把故事、商品探索、門市資訊與購物流程整合成一致體驗",
    solution: "以 Next.js 建立品牌敘事、分類探索、商品詳情、購物車與結帳流程",
    price: "電商展示",
    priceGroup: "需求估價",
    duration: "依商品與平台範圍估時",
    tags: ["Next.js", "DTC 電商", "購物 UX"],
    primary: ["體驗電商成品", "https://morie-store.vercel.app/"],
    secondary: ["詢問類似電商", "/contact?case=MORIE SELECT 選品電商"],
    visual: "morie",
  },
  {
    title: "商業視覺與廣告 Campaign",
    type: "視覺作品集",
    group: "live",
    industry: "品牌 / 官網",
    problemGroup: "官網與曝光",
    problem: "廣告、社群與活動素材缺乏一致系統，每次製作都要重新開始",
    solution: "把主視覺、社群比例、Campaign 版型與品牌語言整理成可擴充系統",
    price: "視覺展示",
    priceGroup: "需求估價",
    duration: "依 Campaign 範圍估時",
    tags: ["廣告視覺", "Social Campaign", "視覺系統"],
    primary: ["查看視覺作品", "https://commercial-visual-portfolio.vercel.app/"],
    secondary: ["討論廣告素材", "/contact?case=商業視覺與廣告 Campaign"],
    visual: "campaign",
  },
  {
    title: "平台電商 / Shopify / MeepShop 建置與視覺優化",
    type: "平台電商",
    group: "product",
    industry: "零售 / 批發",
    problemGroup: "官網與曝光",
    problem:
      "Shopify、MeepShop、WooCommerce、QDM 店家有商品 但整間店的分類、首頁與手機購物動線還像套版",
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
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    return works.filter((w) => {
      if (filterIndustry !== "全部" && w.industry !== filterIndustry) return false
      if (filterProblem !== "全部" && w.problemGroup !== filterProblem) return false
      if (filterBudget !== "全部" && w.priceGroup !== filterBudget) return false
      return true
    })
  }, [filterIndustry, filterProblem, filterBudget])

  const activeCount = [filterIndustry, filterProblem, filterBudget].filter(
    (f) => f !== "全部"
  ).length

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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">
            Works Catalog
          </p>
          <h1 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,6vw,4rem)] font-black leading-[1.12] text-[#111c22]">
            網站 電商 系統
          </h1>
        </div>
      </section>

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="mobile-work-filters"
              onClick={() => setFiltersOpen((current) => !current)}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#dcd7cc] bg-[#faf8f3] px-4 text-xs font-bold text-[#263835]"
            >
              <span>篩選作品</span>
              {activeCount > 0 ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#15322e] px-1.5 text-[10px] text-white">{activeCount}</span> : null}
              <span className="text-[10px] text-[#72807b]" aria-hidden="true">{filtersOpen ? "收合" : "展開"}</span>
            </button>
            <span className="text-[11px] font-medium text-[#7d8884]">{filtered.length} 件作品</span>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <FilterSelect label="產業" options={industryOptions} value={filterIndustry} onChange={setFilterIndustry} />
            <FilterSelect label="需求" options={problemOptions} value={filterProblem} onChange={setFilterProblem} />
            <FilterSelect label="預算" options={budgetOptions} value={filterBudget} onChange={setFilterBudget} />
            {activeCount > 0 ? (
              <button type="button" onClick={() => resetFilters(setFilterIndustry, setFilterProblem, setFilterBudget)} className="text-[11px] font-semibold text-[#0d6b62] transition hover:text-[#111c22]">
                清除篩選
              </button>
            ) : null}
            <span className="ml-auto text-[11px] font-medium text-[#7d8884]">{filtered.length} 件作品</span>
          </div>

          {filtersOpen ? (
            <div id="mobile-work-filters" className="mt-3 grid gap-3 border-t border-[#ebe6dc] pt-3 lg:hidden">
              <FilterSelect label="產業" options={industryOptions} value={filterIndustry} onChange={setFilterIndustry} />
              <FilterSelect label="需求" options={problemOptions} value={filterProblem} onChange={setFilterProblem} />
              <FilterSelect label="預算" options={budgetOptions} value={filterBudget} onChange={setFilterBudget} />
              {activeCount > 0 ? (
                <button type="button" onClick={() => resetFilters(setFilterIndustry, setFilterProblem, setFilterBudget)} className="justify-self-start text-xs font-semibold text-[#0d6b62]">
                  清除篩選
                </button>
              ) : null}
            </div>
          ) : null}
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
                onClick={() => {
                  setFilterIndustry("全部")
                  setFilterProblem("全部")
                  setFilterBudget("全部")
                }}
                className="mt-5 rounded-lg bg-[#111c22] px-5 py-2.5 text-sm font-black text-white"
              >
                清除篩選
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

function resetFilters(setIndustry, setProblem, setBudget) {
  setIndustry("全部")
  setProblem("全部")
  setBudget("全部")
}

function FilterSelect({ label, options, value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-[11px] font-semibold text-[#65716d]">
      <span className="shrink-0">{label}</span>
      <span className="relative min-w-0">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-9 w-full appearance-none rounded-full border border-[#ddd8ce] bg-[#faf8f3] py-1.5 pl-3 pr-8 text-xs font-semibold text-[#263835] outline-none transition hover:border-[#9daca6] focus:border-[#0d6b62] focus:ring-2 focus:ring-[#0d6b62]/10 md:w-auto"
          aria-label={`${label}篩選`}
        >
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#72807b]" aria-hidden="true">▼</span>
      </span>
    </label>
  )
}

function WorkCard({ work, featured = false }) {
  return (
    <article
      className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e3ded3] bg-[#faf8f3] transition hover:-translate-y-1 hover:border-[#111c22]/30 hover:shadow-xl hover:shadow-[#c8bba9]/20 ${featured ? "xl:col-span-1" : ""}`}
    >
      <div className="p-4">
        <WorkVisual visual={work.visual} title={work.title} />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="max-w-full rounded-full bg-[#eef7f4] px-2.5 py-1 text-[11px] font-black leading-5 text-[#0d6b62]">
            {work.type}
          </span>
          <span className="max-w-full rounded-full bg-white px-3 py-1 text-[11px] font-black leading-5 text-[#5f6b67] ring-1 ring-[#e3ded3]">
            {work.price}
          </span>
        </div>
        <h3 className="work-card-title mt-4 font-['Noto_Serif_TC',serif] text-lg font-bold leading-[1.28] text-[#111c22] sm:text-xl">
          {work.title}
        </h3>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {work.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white px-2 py-1 text-[11px] font-black text-[#66716d] ring-1 ring-[#e3ded3]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto grid gap-2 pt-5">
          <SmartLink
            to={work.primary[1]}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-[#111c22] px-4 py-2 text-center text-xs font-black leading-5 text-white transition group-hover:bg-[#0d6b62]"
          >
            {work.primary[0]}
          </SmartLink>
          <SmartLink
            to={work.secondary[1]}
            className="hidden min-h-10 w-full items-center justify-center rounded-lg border border-[#d5ded9] bg-white px-4 py-2 text-center text-xs font-black leading-5 text-[#111c22] transition hover:border-[#0d6b62] md:inline-flex"
          >
            {work.secondary[0]}
          </SmartLink>
        </div>
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
    morie: "/demo-covers/platform-commerce.svg",
    campaign: "/og.png",
  }

  const src = images[visual]

  if (src) {
    return (
      <div className="relative min-h-44 overflow-hidden rounded-2xl">
        <img
          src={src}
          alt={title}
          loading="lazy"
          className="qy-tech-visual absolute inset-0 h-full w-full object-cover"
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
