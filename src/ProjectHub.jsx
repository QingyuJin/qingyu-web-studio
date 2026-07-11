import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"

const categories = [
  {
    id: "live",
    title: "真實客戶案例",
    text: "已上線、可查看真實網站。",
  },
  {
    id: "product",
    title: "可操作產品",
    text: "前台、後台與流程可直接看。",
  },
  {
    id: "ai",
    title: "AI / 技術實驗",
    text: "RAG、AI、API 與自動化能力。",
  },
]

const works = [
  {
    title: "鑫匠工程",
    type: "真實上線",
    group: "live",
    industry: "泥作 / 工程服務",
    problem: "客戶只看得到 Pro360，詢價與案例沒有自己的入口。",
    solution: "黑金品牌官網、線上詢價、BuildFlow 收件流程。",
    price: "30,000 元起",
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
    industry: "批發 / B2B",
    problem: "不用 LINE 一筆一筆抄訂單，避免漏單與月底對帳混亂。",
    solution: "客戶用專屬價格下單，老闆從後台統一出貨與月結。",
    price: "25,000 元起",
    duration: "14–25 天",
    tags: ["商品列表", "專屬價格", "月結"],
    primary: ["直接操作", "/works/wholesale-ordering"],
    secondary: ["詢問類似系統", "/contact"],
    visual: "b2b",
  },
  {
    title: "RAG 企業知識庫",
    type: "AI / 技術實驗",
    group: "ai",
    industry: "公司 / 協會 / 內部文件",
    problem: "文件很多，員工與客服一直問，答案還要能附來源。",
    solution: "文件問答、引用來源、Token 用量、Rate Limit 與版本管理。",
    price: "需求估價",
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
    industry: "醫療 / 生醫 / 診所",
    problem: "專業內容很多，但缺少乾淨可信任的品牌入口。",
    solution: "品牌故事、醫生故事、講座報名與訂閱入口。",
    price: "12,000 元起",
    duration: "5–10 天",
    tags: ["品牌網站", "活動報名", "內容頁"],
    primary: ["查看成品", "/works/biomed-brand-site"],
    secondary: ["詢問類似網站", "/contact"],
    visual: "bio",
  },
  {
    title: "公司一頁式官網",
    type: "可操作產品",
    group: "product",
    industry: "公司 / 工作室 / 顧問",
    problem: "客戶搜到你，卻看不懂你是誰、做什麼、怎麼聯絡。",
    solution: "一頁整理品牌、服務、案例、流程與聯絡 CTA。",
    price: "12,000–20,000 元",
    duration: "5–10 天",
    tags: ["RWD", "SEO", "聯絡 CTA"],
    primary: ["查看成品", "/works/company-landing"],
    secondary: ["詢問類似網站", "/contact"],
    visual: "site",
  },
  {
    title: "點餐系統",
    type: "可操作產品",
    group: "product",
    industry: "餐飲店家",
    problem: "桌邊點餐、廚房控單與桌況管理分散。",
    solution: "客戶端點餐、服務端控單、廚房佇列與營收狀態。",
    price: "25,000 元起",
    duration: "14–25 天",
    tags: ["點餐", "控單", "桌況"],
    primary: ["直接操作", "/works/restaurant-ordering"],
    secondary: ["詢問點餐系統", "/contact"],
    visual: "food",
  },
  {
    title: "工程接案系統",
    type: "完整流程",
    group: "product",
    industry: "工程 / 到府服務",
    problem: "詢價、照片、報價與施工狀態散在 LINE。",
    solution: "網站詢價進後台，一鍵轉案件，追蹤報價與回報。",
    price: "30,000 元起",
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
    industry: "教育 / 顧問 / 活動",
    problem: "測驗結果靠人工整理，名單與分數不好留存。",
    solution: "題目、作答、解析、結果頁與填答紀錄。",
    price: "6,000 元起",
    duration: "3–8 天",
    tags: ["題庫", "計分", "結果頁"],
    primary: ["直接操作", "/works/assessment-system"],
    secondary: ["詢問測驗頁", "/contact"],
    visual: "quiz",
  },
  {
    title: "LINE Bot 接待",
    type: "互動展示",
    group: "product",
    industry: "店家 / 預約服務",
    problem: "LINE 訊息太散，同樣問題每天重複回覆。",
    solution: "自動回覆、追問需求、建立後台案件。",
    price: "8,000 元起",
    duration: "3–7 天",
    tags: ["自動回覆", "Webhook", "後台"],
    primary: ["查看流程", "/tools/linebot-mission#demo"],
    secondary: ["詢問 LINE Bot", "/contact"],
    visual: "line",
  },
  {
    title: "AI 網站健檢",
    type: "AI / 技術實驗",
    group: "ai",
    industry: "網站改版 / 品牌",
    problem: "網站不清楚，客戶看完不知道要不要聯絡。",
    solution: "檢查 CTA、SEO、手機版與信任感，產生建議報告。",
    price: "需求估價",
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
    industry: "講師 / 顧問 / 創作者",
    problem: "IG 有流量，但缺一個能介紹服務與收名單的入口。",
    solution: "深色品牌入口、服務區、資源中心、LINE 導流。",
    price: "12,000–20,000 元",
    duration: "5–10 天",
    tags: ["Notion", "個人品牌", "LINE"],
    primary: ["查看成品", "/works/notion-brand-landing"],
    secondary: ["詢問類似頁", "/contact"],
    visual: "notion",
  },
  {
    title: "BuildFlow",
    type: "後台系統",
    group: "product",
    industry: "案件型服務",
    problem: "需求、報價、派工、回報與完工紀錄不好追。",
    solution: "案件列表、詳情、報價單、LINE 回報與狀態管理。",
    price: "30,000 元起",
    duration: "14–25 天",
    tags: ["案件", "報價", "LINE"],
    primary: ["打開後台", "/buildflow"],
    secondary: ["看鑫匠案例", "/works/xinjiang"],
    visual: "build",
  },
]

const filters = ["全部", ...categories.map((item) => item.title)]

function ProjectHub() {
  return (
    <SiteLayout>
      <Seo
        page={{
          path: "/works",
          title: "全部作品｜Qingyu Web Studio",
          description: "從品牌網站到接單、後台與 AI 系統。依產業、需求與預算找到適合的成品。",
        }}
      />
      <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-18">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Works Catalog</p>
          <h1 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,6vw,4rem)] font-black leading-[1.12] text-[#111c22]">
            從品牌網站到接單、後台與 AI 系統
          </h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">
            依照產業、需求與預算找到適合的成品。先看真的畫面，再決定要做哪一種。
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {categories.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-2xl border border-[#e0d8cc] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62]/40 hover:shadow-lg hover:shadow-[#c8bba9]/20"
              >
                <p className="font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22]">{item.title}</p>
                <p className="mt-2 text-sm font-bold text-[#66716d]">{item.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <span key={item} className="rounded-full border border-[#e3ded3] bg-[#faf8f3] px-3 py-1.5 text-xs font-black text-[#40514f]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {categories.map((category) => {
        const groupWorks = works.filter((work) => work.group === category.id)
        return (
          <section key={category.id} id={category.id} className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
            <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
              <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{category.id}</p>
                  <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.65rem,4vw,2.75rem)] font-black text-[#111c22]">
                    {category.title}
                  </h2>
                </div>
                <p className="max-w-md text-sm font-bold leading-7 text-[#66716d]">{category.text}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupWorks.map((work, index) => (
                  <WorkCard key={work.title} work={work} featured={category.id === "live" || index < 3} />
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </SiteLayout>
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
  const tone = {
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
    <div className={`relative min-h-44 overflow-hidden rounded-2xl bg-gradient-to-br ${tone} p-4 text-white`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/18 blur-2xl" />
      <div className="relative flex h-full min-h-36 flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-14 rounded-full bg-white/45" />
          <span className="rounded-full bg-white/18 px-3 py-1 text-[10px] font-black uppercase tracking-widest">Product</span>
        </div>
        <div>
          <p className="font-['Noto_Serif_TC',serif] text-2xl font-black leading-tight">{title}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <span className="h-10 rounded-lg bg-white/16" />
            <span className="h-10 rounded-lg bg-white/10" />
            <span className="h-10 rounded-lg bg-white/16" />
          </div>
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
