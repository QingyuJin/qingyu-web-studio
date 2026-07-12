import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"

const works = [
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
  const previews = {
    b2b: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-white/20 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm">批發客戶端<span className="rounded-full bg-[#f0c36a] px-2 text-[10px] text-[#111c22]">3 件</span></div>
        <div className="grid flex-1 grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-white/12 p-2 backdrop-blur-sm"><div className="aspect-[4/3] rounded-md bg-white/20" /><div className="mt-1.5 h-3 w-3/4 rounded bg-white/20" /><div className="mt-1 h-3 w-1/2 rounded bg-[#f0c36a]/50" /></div>
          <div className="rounded-lg bg-white/12 p-2 backdrop-blur-sm"><div className="aspect-[4/3] rounded-md bg-white/20" /><div className="mt-1.5 h-3 w-3/4 rounded bg-white/20" /><div className="mt-1 h-3 w-1/2 rounded bg-[#f0c36a]/50" /></div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/15 px-3 py-1.5 text-[10px] font-bold backdrop-blur-sm">後台訂單 <span className="text-[#f0c36a]">NT$8,640</span></div>
      </div>
    ),
    rag: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-lg bg-[#0d1a24]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm"><span className="rounded bg-[#8fd6cc]/20 px-1.5 text-[10px] text-[#8fd6cc]">AI</span>文件問答中控台</div>
        <div className="flex flex-1 gap-1.5">
          <div className="flex flex-1 flex-col gap-1 rounded-lg bg-[#0d1a24]/60 p-2"><div className="h-3 w-full rounded bg-white/15" /><div className="h-3 w-4/5 rounded bg-white/10" /><div className="mt-auto h-2 w-full rounded bg-[#8fd6cc]/30" /></div>
          <div className="flex w-16 flex-col gap-1 rounded-lg bg-[#0d1a24]/60 p-2"><div className="h-4 rounded bg-white/15" /><div className="h-4 rounded bg-white/10" /><span className="mt-auto rounded bg-[#8fd6cc]/30 px-1 text-center text-[9px] font-black">3 src</span></div>
        </div>
        <div className="rounded-lg bg-[#8fd6cc]/15 px-2.5 py-1 text-[10px] font-bold backdrop-blur-sm">↳ 引用：報價規則.md §2.1</div>
      </div>
    ),
    food: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-[#c85f34]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm">🍔 點餐 <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">桌 3</span></div>
        <div className="flex flex-1 gap-1.5">
          <div className="flex flex-[2] flex-col gap-1 rounded-lg bg-white/12 p-2"><div className="flex items-center justify-between"><span className="text-[10px] font-black">牛肉漢堡</span><span className="text-[10px] text-[#f0c36a]">$180</span></div><div className="h-1.5 w-full rounded-full bg-white/15" /><div className="flex items-center justify-between"><span className="text-[10px] font-black">薯條</span><span className="text-[10px] text-[#f0c36a]">$80</span></div></div>
          <div className="flex flex-1 flex-col gap-1 rounded-lg bg-white/12 p-2 text-[10px] font-black">廚房<span className="mt-auto rounded bg-[#c85f34]/40 px-2 py-1 text-center">3 待出</span></div>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold backdrop-blur-sm">今日營收 <span className="text-[#f0c36a]">$4,280</span></div>
      </div>
    ),
    ink: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-[#1b1b1b]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm"><span className="text-[#c49a35]">◧</span> 鑫匠工程</div>
        <div className="flex flex-1 items-center justify-center rounded-lg bg-[#1b1b1b]/60 p-2">
          <div className="w-24 overflow-hidden rounded-xl border border-white/20 bg-[#0c1518] p-1">
            <div className="aspect-[9/19] rounded-lg bg-[#0c1518] p-1">
              <div className="h-2 w-full rounded bg-[#c49a35]/40" />
              <div className="mt-2 h-1 w-3/4 rounded bg-white/20" />
              <div className="mt-1 h-1 w-1/2 rounded bg-white/10" />
              <div className="mt-4 rounded bg-[#c49a35]/30 px-2 py-0.5 text-center text-[6px] font-black">詢價</div>
            </div>
          </div>
        </div>
        <div className="text-center text-[9px] font-bold text-white/60 backdrop-blur-sm">手機版 · 官網</div>
      </div>
    ),
    bio: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-white/25 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm"><span>LightCare BioMed</span><span className="rounded-full bg-[#0d6b62] px-2 py-0.5 text-[10px] text-white">預約</span></div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-white/12 p-3">
          <div className="text-center">
            <div className="mx-auto h-1 w-12 rounded-full bg-white/30" />
            <div className="mt-2 text-lg font-black leading-tight">點亮<br />生命之光</div>
            <div className="mt-2 mx-auto h-1 w-16 rounded bg-white/20" />
            <div className="mt-4 rounded-lg bg-white/20 px-4 py-1.5 text-[10px] font-black">了解更多</div>
          </div>
        </div>
      </div>
    ),
    site: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-white/20 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm">品牌<span className="rounded-full bg-[#0d6b62] px-2 text-[10px] text-white">預約</span></div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-white/10 p-2 text-center">
          <div className="mx-auto h-2 w-20 rounded bg-white/25" />
          <div className="mt-2 text-lg font-black leading-tight">把專業<br />說清楚</div>
          <div className="mt-3 rounded-lg bg-white/20 px-4 py-1.5 text-[10px] font-black">CTA</div>
        </div>
      </div>
    ),
    flow: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="rounded-lg bg-[#0d1a24]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm">案件看板</div>
        <div className="flex flex-1 gap-1">
          {[["詢價", 2], ["報價", 1], ["施工", 1]].map(([l, n]) => (
            <div key={l} className="flex flex-1 flex-col rounded-lg bg-[#0d1a24]/60 p-1.5"><span className="text-[9px] font-black text-white/50">{l}</span>{Array.from({ length: n }).map((_, i) => <div key={i} className="mt-1 h-3 rounded bg-white/12" />)}</div>
          ))}
        </div>
      </div>
    ),
    quiz: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-lg bg-[#715bd1]/60 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm"><span className="rounded bg-white/20 px-1.5 text-[10px]">Q1</span>你的數位化程度？</div>
        <div className="flex flex-1 flex-col gap-1 rounded-lg bg-white/10 p-2">
          {["有官網", "社群經營", "口碑"].map((o) => (
            <div key={o} className="rounded-md bg-white/15 px-2 py-1 text-[10px] font-black">{o}</div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-[#715bd1]/40 px-3 py-1 text-[10px] font-bold backdrop-blur-sm">雷達圖 <span className="text-[#f0c36a]">Score 72</span></div>
      </div>
    ),
    line: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-[#06c755]/70 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm">LINE 官方帳號<span className="rounded bg-white/20 px-1.5 text-[10px]">Bot</span></div>
        <div className="flex flex-1 flex-col justify-end gap-1.5 rounded-lg bg-white/10 p-2">
          <div className="ml-auto w-3/5 rounded-lg rounded-tr-sm bg-[#06c755]/60 px-2 py-1 text-[10px] font-bold">請問營業時間？</div>
          <div className="w-4/5 rounded-lg rounded-tl-sm bg-white/25 px-2 py-1 text-[10px] font-bold">您好！營業時間為...</div>
        </div>
      </div>
    ),
    ai: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-[#2b3146]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm"><span className="rounded bg-[#eac46f]/50 px-1.5 text-[10px]">AI</span>網站健檢</div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-[#2b3146]/60 p-2">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10"><span className="text-2xl font-black text-[#eac46f]">82</span></div>
          <div className="mt-2 flex gap-1.5"><span className="h-1.5 w-4 rounded-full bg-[#eac46f]/60" /><span className="h-1.5 w-3 rounded-full bg-white/20" /><span className="h-1.5 w-4 rounded-full bg-white/20" /></div>
        </div>
      </div>
    ),
    notion: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-lg bg-[#1b1b1d]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm"><span className="text-[#d8b46c]">◆</span> 財商顧問</div>
        <div className="flex flex-1 flex-col gap-1 rounded-lg bg-[#1b1b1d]/60 p-2">
          {["服務項目", "資源中心", "FAQ"].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-md bg-white/8 px-2 py-1.5"><span className="h-2 w-2 rounded-full bg-[#d8b46c]" /><span className="text-[10px] font-black">{i}</span></div>
          ))}
        </div>
      </div>
    ),
    build: (
      <div className="flex h-full flex-col gap-1.5">
        <div className="flex items-center justify-between rounded-lg bg-[#1b2a28]/80 px-3 py-1.5 text-[11px] font-black backdrop-blur-sm">BuildFlow<span className="text-[10px] text-[#eac46f]">●</span></div>
        <div className="grid flex-1 grid-cols-3 gap-1 rounded-lg bg-[#1b2a28]/60 p-2">
          {[["案件", "12"], ["待辦", "5"], ["營收", "86K"]].map(([l, v]) => (
            <div key={l} className="rounded-md bg-white/8 p-1.5 text-center"><span className="text-[9px] font-black text-white/50">{l}</span><div className="text-sm font-black text-[#eac46f]">{v}</div></div>
          ))}
        </div>
      </div>
    ),
  }

  const preview = previews[visual] || (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <div className="text-3xl font-black text-white/30">{title.slice(0, 2)}</div>
      <div className="h-2 w-16 rounded-full bg-white/15" />
    </div>
  )

  const bg = {
    ink: "from-[#1b1b1b] via-[#26302d] to-[#c49a35]",
    b2b: "from-[#15352d] via-[#f3e7ce] to-[#c86434]",
    rag: "from-[#111c22] via-[#243a48] to-[#8fd6cc]",
    bio: "from-[#f8efe3] via-[#e4efe7] to-[#9fb9aa]",
    site: "from-[#faf8f3] via-[#dfece7] to-[#0d6b62]",
    food: "from-[#fff2dc] via-[#e9d0b2] to-[#c85f34]",
    flow: "from-[#111c22] via-[#264542] to-[#8fd6cc]",
    quiz: "from-[#f4efe5] via-[#e5eef7] to-[#715bd1]",
    line: "from-[#0b3527] via-[#0d6b62] to-[#06c755]",
    ai: "from-[#111c22] via-[#2b3146] to-[#eac46f]",
    notion: "from-[#0f0f10] via-[#1b1b1d] to-[#d8b46c]",
    build: "from-[#111c22] via-[#253534] to-[#eac46f]",
  }[visual] || "from-[#111c22] via-[#233139] to-[#0d6b62]"

  return (
    <div className={`relative min-h-44 overflow-hidden rounded-2xl bg-gradient-to-br ${bg} p-3 text-white`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/18 blur-2xl" />
      <div className="relative h-full min-h-36">
        {preview}
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
