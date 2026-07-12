import { Link, useParams } from "react-router-dom"
import ContactLeadSection from "../components/ContactLeadSection"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import WorkDemoPanel from "./WorkDemoPanels"
import {
  contact,
  pricing,
  pricingNote,
  projects,
  seo,
  serviceOfferings,
  serviceWorkflow,
} from "./content"

function PageShell({ page, eyebrow = "Qingyu Web Studio", title, intro, actions, heroVisual, children }) {
  return (
    <SiteLayout>
      <Seo page={page} />
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className={`mx-auto grid max-w-6xl gap-8 px-4 py-12 md:py-20 ${heroVisual ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-center" : ""}`}>
          <div>
            <p className="text-xs font-black uppercase text-[#0d6b62]">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(1.75rem,8vw,2rem)] font-black leading-[1.1] md:text-[clamp(2.35rem,8vw,4.7rem)] md:leading-[1.04]">
              {title}
            </h1>
            <p className="mt-5 line-clamp-2 max-w-3xl text-sm font-bold leading-7 text-[#52605c] md:text-base md:leading-8">{intro}</p>
            {actions ? (
              <div className="mt-7 grid gap-2 sm:flex sm:flex-wrap md:gap-3">
                {actions}
                {page?.path?.startsWith("/works/") ? (
                  <Link
                    to={`/contact?case=${encodeURIComponent(title || "")}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#0d6b62] bg-[#eef7f4] px-5 text-sm font-black text-[#0d6b62] transition hover:bg-[#dff1ec]"
                  >
                    找我做類似系統
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
          {heroVisual ? <div>{heroVisual}</div> : null}
        </div>
      </section>
      {children}
    </SiteLayout>
  )
}

function Card({ children, dark = false }) {
  return (
    <article className={`rounded-xl border p-5 ${dark ? "border-[#233139] bg-[#111c22] text-white" : "border-[#e3ded3] bg-white"}`}>
      {children}
    </article>
  )
}

function Tags({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
          {item}
        </span>
      ))}
    </div>
  )
}

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function ActionLink({ to, children, ...props }) {
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
function WorkPreview({ project }) {
  const panels = {
    "biomed-brand-site": ["品牌故事", "內容特色", "講座活動"],
    "ecommerce-platform-redesign": ["首頁版型", "手機動線", "活動追蹤"],
    "ai-tech-quest": ["文件問答", "模型分類", "店家助手"],
    "interactive-quiz": ["題目頁", "答案解析", "結果頁"],
    "ai-business-assistant": ["FAQ 後台", "自動回覆", "問答紀錄"],
    "tw-civic-rag": ["文件切分", "來源引用", "安全回答"],
    "unity-ai-tutor": ["Unity 2D", "AI 提示", "WebGL"],
    "ai-audit": ["SEO 82", "CTA 建議", "手機版檢查"],
    linebot: ["LINE 對話", "Webhook", "後台收件"],
    buildflow: ["案件列表", "報價單", "LINE 回報"],
    "api-automation": ["Form", "API", "Notify"],
    "project-planner": ["5 步驟", "AI 規劃", "聯絡 CTA"],
    xinjiang: ["服務頁", "估價入口", "案例"],
    "analytics-dashboard": ["今日瀏覽", "搜尋曝光", "每月報告"],
    "qingyu-web": ["RWD", "SEO / OG", "聯絡 CTA"],
  }
  const previewMeta = {
    "biomed-brand-site": { status: "品牌網站", metric: "醫療故事", summary: "Hero / 案例 / 講座" },
    "ecommerce-platform-redesign": { status: "平台電商", metric: "UX", summary: "首頁 → 分類 → 商品 → 結帳" },
    "ai-tech-quest": { status: "可試玩 Demo", metric: "5 個任務", summary: "文件問答 → 模型分類 → 店家助手" },
    "interactive-quiz": { status: "測驗頁", metric: "RWD", summary: "題目 → 作答 → 解析 → 結果" },
    "ai-business-assistant": { status: "店家助手", metric: "FAQ", summary: "FAQ → matching → 自動回覆" },
    "tw-civic-rag": { status: "文件問答", metric: "RAG", summary: "文件檢索增強生成（RAG）+ 來源引用" },
    "unity-ai-tutor": { status: "學習關卡", metric: "WebGL", summary: "Unity 互動學習展示" },
    "ai-audit": { status: "AI 報告", metric: "分數 82", summary: "SEO / CTA / 信任感" },
    linebot: { status: "Webhook", metric: "3 則訊息", summary: "LINE → 回覆 → 收件匣" },
    buildflow: { status: "後台", metric: "75%", summary: "案件 / 報價 / LINE" },
    "api-automation": { status: "API 流程", metric: "ok: true", summary: "資料送出 → 回應" },
    "project-planner": { status: "需求診斷", metric: "步驟 1 / 5", summary: "規則判斷 + AI 規劃" },
    xinjiang: { status: "案例", metric: "估價", summary: "網站 → BuildFlow" },
    "analytics-dashboard": { status: "成效後台", metric: "月報", summary: "瀏覽 → 曝光 → 點擊 → 詢問" },
    "qingyu-web": { status: "SEO 已整理", metric: "RWD", summary: "展示區 → 聯絡" },
  }
  const toolPreviewFallback = {
    "website-rescue": {
      items: ["網站分數", "CTA / SEO", "改善報告"],
      meta: { status: "互動展示", metric: "分數 +50", summary: "改善前 / 改善後 / CTA" },
    },
    "linebot-mission": {
      items: ["LINE 對話", "接待狀態", "案件後台"],
      meta: { status: "接待模擬", metric: "5 則訊息", summary: "LINE Bot → 後台" },
    },
  }
  const fallbackPreview = toolPreviewFallback[project.slug]
  const items = panels[project.slug] || fallbackPreview?.items || project.visuals.slice(0, 3)
  const meta = previewMeta[project.slug] || fallbackPreview?.meta || { status: "可操作", metric: "展示", summary: project.category }

  return (
    <div className="mb-5 min-h-48 overflow-hidden rounded-2xl border border-[#e6e0d5] bg-[#faf8f3] p-4 md:min-h-56">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">產品預覽</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#52605c]">{meta.status}</span>
      </div>
      <div className="mt-4 rounded-2xl bg-[#111c22] p-4 text-white shadow-lg shadow-[#111c22]/10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">{project.title}</p>
          <span className="text-xs font-black text-[#8fd6cc]">{meta.metric}</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/15">
          <div className="h-full w-4/5 rounded-full bg-[#8fd6cc]" />
        </div>
        <p className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs font-black text-white/80">{meta.summary}</p>
      </div>
      <div className="mt-3 hidden gap-2 sm:grid sm:grid-cols-3">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-[#e1dbcf] bg-white px-3 py-2 text-xs font-black text-[#40504c]">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

const conversionProfiles = {
  "ai-audit": {
    audience: ["店家", "個人品牌", "工作室", "準備改版的網站"],
    custom: ["健檢項目", "報告格式", "Prompt Flow", "Email 報告輸出"],
    problems: ["不知道網站哪裡不清楚", "客戶看完沒有聯絡", "首頁 CTA 與 SEO 不夠明確"],
    scenario: "改版前先找問題",
    next: "先健檢 再改版",
  },
  linebot: {
    audience: ["店家", "預約型服務", "工作室", "需要 LINE 收需求的團隊"],
    custom: ["對話流程", "Webhook 欄位", "後台收件狀態", "LINE / Email 通知"],
    problems: ["LINE 訊息太散", "客戶需求沒有被整理", "店家回覆與追蹤靠人工記"],
    scenario: "LINE 詢問變成可追蹤需求",
    next: "先整理問答與收件欄位",
  },
  buildflow: {
    audience: ["工程行", "修繕服務", "現場服務團隊", "需要照片與進度管理的公司"],
    custom: ["案件欄位", "報價單", "LINE 回報", "Supabase / PDF Export"],
    problems: ["照片與報價散在 LINE", "施工狀態不好追", "案件從詢價到完工沒有完整紀錄"],
    scenario: "詢價、照片、報價進後台",
    next: "先定義案件狀態",
  },
  "api-automation": {
    audience: ["有表單收件需求的團隊", "需要通知流程的店家", "想把資料進後台的工作室"],
    custom: ["API Payload", "驗證規則", "通知節點", "後台欄位"],
    problems: ["表單送出後沒人追", "資料要手動複製到表格", "通知與後台狀態沒有串接"],
    scenario: "表單送出後自動進後台",
    next: "先確認欄位與通知對象",
  },
  "qingyu-web": {
    audience: ["個人品牌", "店家", "工作室", "作品展示"],
    custom: ["首頁架構", "作品頁", "需求診斷工具", "SEO / Open Graph"],
    problems: ["服務說不清楚", "作品沒有導到詢問", "客戶不知道下一步該怎麼聯絡"],
    scenario: "服務、作品、工具、聯絡整合",
    next: "先整理服務分類與作品入口",
  },
  xinjiang: {
    audience: ["工程服務業", "需要形象網站的店家", "想把詢價接到後台的團隊"],
    custom: ["估價入口", "服務分類", "BuildFlow 串接", "LINE 回報流程"],
    problems: ["客戶只看 LINE 或社群", "估價需求沒有進後台", "工程案例與案件管理分開"],
    scenario: "工程網站串到案件管理",
    next: "先做好估價入口",
  },
  "analytics-dashboard": {
    audience: ["有官網的店家", "個人品牌", "工作室", "投廣告或做 SEO 的團隊"],
    custom: ["追蹤事件", "Search Console 指標", "GA4 流量來源", "月報格式"],
    problems: ["不知道網站有沒有人看", "Google 曝光與點擊無法整理", "LINE 電話表單成效沒有紀錄"],
    scenario: "網站上線後持續看成效",
    next: "先定義要追蹤的按鈕與頁面",
  },
  "ecommerce-platform-redesign": {
    audience: ["MeepShop 店家", "Shopify 店家", "WooCommerce 店家", "已有平台但想改善視覺與轉換的品牌"],
    custom: ["首頁版型", "商品分類", "手機購物動線", "Banner 版位", "活動頁會員入口", "GA / Search Console"],
    problems: ["平台套版缺少品牌感", "商品分類不好找", "手機加入購物車與結帳路徑太長"],
    scenario: "不換平台 先把前台視覺與購物動線整理好",
    next: "先盤點平台可改範圍與主打商品",
  },
}

const defaultConversionProfile = {
  audience: ["店家", "個人品牌", "工作室"],
  custom: ["頁面架構", "互動流程", "資料欄位", "聯絡 CTA"],
  problems: ["服務不容易被理解", "客戶看完不知道怎麼詢問", "流程太靠人工整理"],
  scenario: "先用成品確認流程",
  next: "先整理方向",
}

const workBusinessValues = {
  "biomed-brand-site": "醫師、診所與生醫品牌故事網站",
  "ai-audit": "幫你快速找出網站為什麼沒人聯絡",
  linebot: "讓客戶在 LINE 裡留下需求 後台自動整理",
  buildflow: "需求、報價、回報、LINE 查詢",
  "ai-tech-quest": "可直接試玩的 AI 技術展示成品 讓客戶看懂文件問答、模型分類與店家助手如何變成產品",
  "interactive-quiz": "測驗、解析、結果頁",
  "ai-business-assistant": "店家 FAQ 與自動回覆產品",
  "tw-civic-rag": "文件檢索增強生成（RAG）文件查詢產品",
  "unity-ai-tutor": "互動式學習展示",
  "api-automation": "表單送出後 自動進 API、通知與後台",
  "project-planner": "用診斷工具分類需求",
  "analytics-dashboard": "瀏覽、搜尋曝光、點擊、表單與月報集中管理",
  "ecommerce-platform-redesign": "MeepShop、Shopify、WooCommerce 店家的首頁、分類、手機購物與活動追蹤優化",
  "qingyu-web": "服務、作品、工具與聯絡流程",
  xinjiang: "把工程網站的估價入口接到案件管理流程",
}

const conciseWorkValues = {
  "biomed-brand-site": "品牌故事、案例、內容與講座活動",
  "ai-audit": "檢查網站 CTA、SEO 與聯絡流程",
  linebot: "讓 LINE 訊息自動整理成需求",
  buildflow: "需求、報價、回報與 LINE 查詢",
  "interactive-quiz": "題目、作答、解析、結果頁",
  "ai-tech-quest": "可試玩：文件問答、模型分類、店家助手與產品展示室",
  "ai-business-assistant": "FAQ、回答紀錄、LINE Bot 延伸",
  "tw-civic-rag": "RAG、來源引用、文件查詢",
  "unity-ai-tutor": "Unity 互動學習關卡",
  "api-automation": "表單送出後 自動進 API、通知與後台",
  "project-planner": "判斷適合做網站、LINE Bot 還是系統",
  "website-rescue": "點選改善項目 查看網站狀態變化",
  "linebot-mission": "模擬 LINE 接待與後台同步",
  "analytics-dashboard": "今日瀏覽、Google 曝光、CTA 點擊與每月報告",
  "ecommerce-platform-redesign": "首頁版型、商品分類、手機購物、Banner 與成效追蹤",
  "qingyu-web": "展示主站、作品、工具與聯絡流程",
  xinjiang: "工程網站如何串到 BuildFlow 後台",
}

export function WorksPage() {
  const plannerProject = {
    slug: "project-planner",
    title: "網站需求診斷工具",
    category: "互動工具",
    summary: "回答幾題 整理方向",
    livePath: "/tools/project-planner#demo",
    liveLabel: "查看成品",
    secondaryPath: "/tools/project-planner#tech",
    secondaryLabel: "技術拆解",
    tags: ["React", "Rule-based", "OpenAI optional", "聯絡 CTA"],
    visuals: ["5-step form", "Recommendation UI", "AI plan"],
    demo: ["需求表單", "快速建議", "AI 完整規劃"],
  }
  const rescueProject = {
    slug: "website-rescue",
    title: "網站救援互動成品",
    category: "互動工具",
    summary: "點選改善項目 看網站狀態變化",
    livePath: "/tools/website-rescue#demo",
    liveLabel: "開始改善",
    secondaryPath: "/tools/website-rescue#tech",
    secondaryLabel: "技術拆解",
    tags: ["React", "State Machine", "Scoring UI", "Conversion CTA"],
    visuals: ["分數介面", "改善前 / 改善後", "結果報告"],
    demo: ["問題清單", "修正選項", "改善報告"],
  }
  const lineBotMissionProject = {
    slug: "linebot-mission",
    title: "LINE Bot 接待模擬",
    category: "互動工具",
    summary: "模擬 LINE 接待與後台同步",
    livePath: "/tools/linebot-mission#demo",
    liveLabel: "開始模擬",
    secondaryPath: "/tools/linebot-mission#tech",
    secondaryLabel: "技術拆解",
    tags: ["React", "LINE Bot", "State Machine", "後台介面"],
    visuals: ["LINE 對話", "接待狀態", "案件後台"],
    demo: ["處理策略", "指標變化", "後台同步"],
  }
  const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]))
  const primaryProducts = [
    projectBySlug["ecommerce-platform-redesign"],
    projectBySlug["biomed-brand-site"],
    projectBySlug.buildflow,
    projectBySlug["analytics-dashboard"],
    projectBySlug["interactive-quiz"],
    projectBySlug["ai-tech-quest"],
    projectBySlug["ai-business-assistant"],
    projectBySlug["tw-civic-rag"],
  ].filter(Boolean)
  const sections = [
    {
      title: "主打成品",
      text: "直接打開",
      items: primaryProducts,
    },
    {
      title: "互動工具",
      text: "可試用",
      items: [rescueProject, lineBotMissionProject, plannerProject, projectBySlug.xinjiang].filter(Boolean),
    },
    {
      title: "其他作品",
      text: "補充案例",
      items: [projectBySlug["ai-audit"], projectBySlug["api-automation"], projectBySlug["qingyu-web"]].filter(Boolean),
    },
  ]

  return (
    <PageShell page={seo.works} title="成品入口" intro="點卡片 直接看實物">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black text-[#0d6b62]">作品</p>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">{section.title}</h2>
                </div>
                <p className="max-w-xl text-sm font-bold leading-6 text-[#52605c]">{section.text}</p>
              </div>
              <div className={`grid gap-4 ${section.items.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
                {section.items.map((project) => (
                  <article key={project.slug} className="rounded-xl border border-[#e3ded3] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg md:p-5">
                    <WorkPreview project={project} />
                    <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
                    <h3 className="mt-3 text-xl font-black md:text-2xl">{project.title}</h3>
                    <p className="mt-3 rounded-lg bg-[#faf8f3] px-3 py-2 text-sm font-black leading-6 text-[#40504c]">
                      {conciseWorkValues[project.slug] || workBusinessValues[project.slug] || project.summary}
                    </p>
                    {project.slug === "buildflow" ? <BuildFlowCaseFacts /> : null}
                    <div className="mt-4 hidden md:block">
                      <Tags items={(project.tags || []).slice(0, 3)} />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <ActionLink to={project.livePath} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white md:min-h-10 md:w-auto">
                        {project.liveLabel}
                      </ActionLink>
                      <ActionLink to={project.secondaryPath || `/works/${project.slug}#tech`} className="hidden min-h-10 items-center rounded-md border border-[#cfd7d3] px-4 text-sm font-black text-[#111c22] md:inline-flex">
                        {project.secondaryLabel || "技術拆解"}
                      </ActionLink>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function BuildFlowCaseFacts() {
  const facts = [
    {
      title: "問題",
      text: "工程案常散在 LINE、口頭、Excel、紙本 老闆很難追需求、報價、派工與現場回報",
    },
    {
      title: "解法",
      text: "建立前台需求表單、後台案件管理、派工回報與 LINE Bot 查詢流程",
    },
    {
      title: "適合",
      text: "工程行、防水、水電、裝修、維修服務團隊",
    },
  ]

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.title} className="rounded-lg border border-[#e3ded3] bg-white px-3 py-3">
          <p className="text-xs font-black text-[#0d6b62]">{fact.title}</p>
          <p className="mt-2 text-xs font-bold leading-5 text-[#52605c]">{fact.text}</p>
        </div>
      ))}
    </div>
  )
}

export function WorkDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug) || projects[0]
  const isLineBotProject = project.slug === "linebot"
  const isBuildFlowProject = project.slug === "buildflow"
  const isApiAutomationProject = project.slug === "api-automation"
  const isQingyuWebProject = project.slug === "qingyu-web"
  const isXinjiangProject = project.slug === "xinjiang"
  const isAiTechQuestProject = project.slug === "ai-tech-quest"
  const isAnalyticsProject = project.slug === "analytics-dashboard"
  const isInternalDemoPath = project.livePath === `/works/${project.slug}#demo`
  const conversionProfile = conversionProfiles[project.slug] || defaultConversionProfile
  const projectSeo = {
    path: `/works/${project.slug}`,
    title: isQingyuWebProject
      ? "Qingyu Web Studio 主站案例｜網站服務、互動展示區 與 SEO 架構"
      : isBuildFlowProject
      ? "BuildFlow 工程行案件管理系統展示｜鑫匠工程案例｜Qingyu Web Studio"
      : isXinjiangProject
      ? "鑫匠工程案例｜工程網站與 BuildFlow 案件管理展示｜Qingyu Web Studio"
      : isAnalyticsProject
      ? "網站成效追蹤與曝光管理後台展示｜Qingyu Web Studio"
      : isApiAutomationProject
        ? "API 自動化流程展示｜表單、API、通知與後台展示｜Qingyu Web Studio"
        : `${project.title}｜Qingyu Web Studio`,
    description: isQingyuWebProject
      ? "展示主站、成品、SEO 與聯絡轉換"
      : isBuildFlowProject
      ? "以鑫匠工程為案例 展示詢價、案件、報價與 LINE 回報"
      : isXinjiangProject
      ? "工程網站與 BuildFlow 案件流程案例"
      : isAnalyticsProject
      ? "今日瀏覽、本月瀏覽、Google 搜尋曝光點擊、LINE 電話表單與每月報告集中展示"
      : isApiAutomationProject
        ? "表單、API、通知與後台流程展示"
        : project.summary,
  }

  return (
    <PageShell
      page={projectSeo}
      eyebrow={project.category}
      title={project.title}
      intro={conciseWorkValues[project.slug] || project.summary}
      actions={
        isAiTechQuestProject ? (
          <>
            <ActionLink to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              線上實測
            </ActionLink>
            <ActionLink to={project.secondaryPath} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              GitHub 原始碼
            </ActionLink>
            <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              討論類似 AI 系統
            </Link>
          </>
        ) : isLineBotProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              操作 LINE 接待
            </Link>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              查看後台
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : isBuildFlowProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看系統
            </Link>
            <Link to="/works/xinjiang" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              看鑫匠案例
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : isQingyuWebProject ? (
          <>
            <Link to="/" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看首頁
            </Link>
            <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              開始需求診斷
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : isApiAutomationProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              操作流程
            </Link>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              查看 API 流程
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : isAnalyticsProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看成效後台
            </Link>
            <Link to="#demo-report" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              產生月報
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術架構
            </Link>
          </>
        ) : isXinjiangProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看案例
            </Link>
            <Link to="/works/buildflow#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              查看 BuildFlow 系統
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看成品
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        )
      }
      heroVisual={<HeroPreview project={project} />}
    >
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <WorkShowcase project={project} />
      </section>

      {isXinjiangProject ? <XinjiangProjectBrief /> : null}

      <section id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-8">
        <div className="grid gap-5">
          <div className="rounded-xl border border-[#e3ded3] bg-white p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">線上展示</p>
                <h2 className="mt-2 text-2xl font-black">展示操作台</h2>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">
                  直接操作 看資料怎麼變
                </p>
              </div>
              {isInternalDemoPath ? (
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {["可操作成品", "狀態會變化", "手機版可操作"].map((item) => (
                    <span key={item} className="rounded-full border border-[#d7dfdb] bg-[#f7f4ec] px-3 py-2 text-xs font-black text-[#40504c]">
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <ActionLink to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            {project.liveLabel}
          </ActionLink>
              )}
            </div>
          </div>
          <WorkDemoPanel project={project} />
        </div>
      </section>

      {isQingyuWebProject ? (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-2xl border border-[#e3ded3] bg-white p-5 md:p-6">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Main Site 案例說明</p>
                <h2 className="mt-3 text-3xl font-black">主站轉換流程</h2>
                <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
                  服務、作品、工具、聯絡串成一路
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["問題", "服務要先被看懂"],
                  ["首頁", "定位、作品、CTA"],
                  ["互動", "成品可以直接操作"],
                  ["診斷", "先整理需求"],
                  ["聯絡", "LINE、Email、表單"],
                  ["SEO", "metadata、sitemap、robots"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-4">
                    <p className="text-sm font-black text-[#0d6b62]">{title}</p>
                    <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-[#111c22] p-5 text-white">
              <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">CTA Flow</p>
                  <h3 className="mt-3 text-2xl font-black">訪客 → 首頁 → 展示區 → 需求診斷 → 聯絡</h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-white/70">
                    首頁建立信任 作品展示技術 最後導到聯絡
                  </p>
                </div>
                <div className="grid gap-2">
                  {["首頁定位", "互動展示區", "需求診斷收需求", "聯絡轉換", "SEO / sitemap / robots / Vercel"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8fd6cc] text-xs font-black text-[#0b2724]">{index + 1}</span>
                      <span className="text-sm font-black text-white/86">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["React", "Vite", "Tailwind", "React Router", "SEO metadata 設定", "Open Graph", "sitemap.xml", "robots.txt", "Vercel"].map((item) => (
                  <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-black">問題</h2>
            <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#52605c]">{project.problem}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-black">解法</h2>
            <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#52605c]">{project.solution}</p>
          </Card>
          <Card dark>
            <h2 className="text-xl font-black">畫面展示</h2>
            <div className="mt-4 grid gap-2">
              {project.visuals.map((item) => (
                <div key={item} className="rounded-lg bg-white/10 px-3 py-2 text-sm font-black text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-black">功能與技術架構</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
              畫面、資料流、API 與部署拆開看
            </p>
          </div>
          <div className="grid gap-5">
            <div>
              <p className="mb-3 text-sm font-black text-[#0d6b62]">功能</p>
              <Tags items={project.features} />
            </div>
            <div>
              <p className="mb-3 text-sm font-black text-[#0d6b62]">技術架構</p>
              <div className="grid gap-3">
                {Object.entries(project.stack).map(([layer, detail]) => (
                  <div key={layer} className="rounded-lg border border-[#ddd6c9] bg-white p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{layer}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            {isLineBotProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Architecture</p>
                <div className="mt-4 overflow-x-auto text-sm font-black leading-7">
                  LINE 使用者 → LINE 平台 → /api/line-webhook → OpenAI / 展示回覆 → LINE 回覆 → 後台
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "Vercel Serverless Function", "Messaging API / Reply API", "OpenAI optional", "Supabase optional", "展示模式"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {isBuildFlowProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">BuildFlow 架構</p>
                <div className="mt-4 overflow-x-auto text-sm font-black leading-7">
                  案件列表 → 案件詳情 → 狀態更新 → LINE 回報時間軸 → 照片 / 報價視窗
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "案件狀態管理", "後台介面", "LINE 回報", "Supabase-ready", "報價單 未來 PDF 匯出"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {isQingyuWebProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">主站轉換流程</p>
                <div className="mt-4 overflow-x-auto text-sm font-black leading-7">
                  訪客 → 首頁 → 展示區 → 需求診斷 → 聯絡 → Case Study
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Vite / Tailwind", "React Router", "Vercel 部署", "SEO metadata 設定", "Open Graph", "聯絡 CTA"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {isApiAutomationProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">自動化架構</p>
                <div className="mt-4 overflow-x-auto text-sm font-black leading-7">
                  客戶表單 → 資料檢查 → 需求建立 → 通知紀錄 → 後台追蹤
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "Vercel Serverless Function", "Request Body Check", "JSON Payload", "通知流程", "React State UI"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <details className="rounded-2xl border border-[#e3ded3] bg-white p-5">
          <summary className="cursor-pointer list-none">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">功能細節</p>
            <h2 className="mt-2 text-2xl font-black">功能展示細節</h2>
          </summary>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {project.demo.map((item) => (
              <Card key={item}>
                <p className="text-sm font-black leading-7">{item}</p>
              </Card>
            ))}
          </div>
        </details>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <details className="rounded-2xl border border-[#e3ded3] bg-white p-5">
          <summary className="cursor-pointer list-none">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">使用流程</p>
            <h2 className="mt-2 text-2xl font-black">使用流程</h2>
          </summary>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {project.steps.map((step, index) => (
              <Card key={step}>
                <p className="text-xs font-black text-[#0d6b62]">步驟 {index + 1}</p>
                <p className="mt-3 text-lg font-black">{step}</p>
              </Card>
            ))}
          </div>
        </details>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-black">手機版展示</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.mobile}</p>
          </Card>
          <Card>
            <h2 className="text-2xl font-black">未來可擴充</h2>
            <ul className="mt-3 grid gap-2 text-sm font-bold leading-7 text-[#52605c] md:grid-cols-2">
              {project.future.map((item) => (
                <li key={item}>・{item}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">應用情境</p>
              <h2 className="mt-2 text-2xl font-black">可以怎麼用在你的服務？</h2>
            </div>
            <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">
              先看成品 再整理流程
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["適合誰", conversionProfile.audience.slice(0, 2).join("、")],
              ["能做什麼", conversionProfile.custom.slice(0, 2).join("、")],
              ["下一步", conversionProfile.next],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-4">
                <p className="text-sm font-black text-[#0d6b62]">{title}</p>
                <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-[#e3ded3] bg-white p-5">
          <h2 className="text-2xl font-black">想做類似網站或系統？</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">
            先診斷 再聯絡
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              開始需求診斷
            </Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              找我做類似系統
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function XinjiangProjectBrief() {
  const facts = [
    ["類型", "真實上線案例"],
    ["產業", "泥作 / 工程服務"],
    ["內容", "品牌官網 + 詢價 + 案件後台"],
    ["工期", "約 3–4 週"],
    ["預算", "類似系統 30,000 元起"],
    ["狀態", "正式營運"],
  ]
  const beforeAfter = [
    ["改版前", "客戶多從 Pro360 或 LINE 詢問 服務與案例不容易被完整看見"],
    ["改版後", "品牌官網展示服務與案例 詢價資料可導入 BuildFlow 後台追蹤"],
    ["交付重點", "手機版詢價、案例照片、服務分類、線上聯絡與後台收件流程"],
  ]

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <div className="rounded-2xl border border-[#e3ded3] bg-white p-5 md:p-6">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Project Data</p>
            <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-3xl font-black text-[#111c22]">鑫匠專案資料</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {facts.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-3">
                  <p className="text-[11px] font-black text-[#0d6b62]">{label}</p>
                  <p className="mt-1 text-sm font-black text-[#111c22]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {beforeAfter.map(([title, text]) => (
              <div key={title} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-4">
                <p className="text-sm font-black text-[#111c22]">{title}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-1">
              <a href="https://xinjiang-website.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-lg bg-[#111c22] px-4 text-sm font-black text-white">
                打開正式網站
              </a>
              <Link to="/contact?case=鑫匠工程" className="inline-flex min-h-10 items-center rounded-lg border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
                詢問類似案例
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroPreview({ project }) {
  const isLineBot = project.slug === "linebot"
  const isBuildFlow = project.slug === "buildflow"
  const isAudit = project.slug === "ai-audit"
  const isApi = project.slug === "api-automation"
  const isQuiz = project.slug === "interactive-quiz"
  const isQingyuWeb = project.slug === "qingyu-web"

  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-2xl shadow-[#111c22]/15 md:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">產品預覽</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">Product-ready</span>
      </div>

      {isLineBot ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.82fr_1fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-[#dff1e8] p-3 text-[#111c22]">
            {[
              ["user", "我想做店家網站"],
              ["bot", "請提供產業、功能、預算、上線時間"],
              ["user", "我是咖啡店 想做預約和菜單查詢"],
            ].map(([role, text]) => (
              <div key={text} className={`mb-2 max-w-[88%] rounded-2xl px-3 py-2 text-xs font-black ${role === "bot" ? "bg-white" : "ml-auto bg-[#0d6b62] text-white"}`}>
                {text}
              </div>
            ))}
          </div>
          <div className="grid gap-3">
            <div className="rounded-xl bg-white p-4 text-[#111c22]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">REQ-001 咖啡店需求</p>
                <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">已整理需求</span>
              </div>
              <p className="mt-3 text-xs font-bold leading-5 text-[#52605c]">來源 LINE · 建議方案：LINE Bot + 表單 + 後台流程</p>
            </div>
            <HeroPreviewList items={["Webhook 接收", "簽章驗證", "AI 回覆", "後台已儲存"]} />
          </div>
        </div>
      ) : isBuildFlow ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.82fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black">BF-001 屋頂防水</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">施工中</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-3/4 rounded-full bg-[#0d6b62]" />
            </div>
            <div className="mt-4 grid gap-2">
              {[
                ["LINE 回報", "今日 2 人出工 照片已補"],
                ["報價卡", "NT$28,000｜業主確認中"],
                ["案件列表", "4 件進行中"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#faf8f3] px-3 py-2">
                  <p className="text-[11px] font-black text-[#0d6b62]">{label}</p>
                  <p className="mt-1 text-xs font-bold text-[#52605c]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroPreviewList items={["案件列表 + 狀態", "現場照片", "報價單預覽", "LINE 回報可複製"]} />
        </div>
      ) : isAudit ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-[#0d6b62]">AI Audit Score</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">展示模式可用</span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <p className="text-5xl font-black">82</p>
              <p className="pb-2 text-xs font-black text-[#52605c]">/ 100</p>
            </div>
            <div className="mt-4 grid gap-2">
              {[["SEO", 78], ["CTA", 74], ["Trust", 88]].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-black">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-[#e4e9e6]">
                    <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <HeroPreviewList items={["首頁標題建議", "CTA 動線", "SEO 描述", "手機版問題"]} />
        </div>
      ) : isApi ? (
        <div className="mt-5 grid gap-4">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[#0d6b62]">表單自動化</p>
                <p className="mt-2 text-sm font-black">客戶需求進件</p>
              </div>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">已收到</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-[84%] rounded-full bg-[#0d6b62]" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-black sm:grid-cols-3">
              {["需求編號", "通知完成", "後台新增"].map((item) => (
                <span key={item} className="rounded-md bg-[#faf8f3] px-2 py-2 text-center">{item}</span>
              ))}
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {["表單 → API", "驗證 → 需求資料", "通知 → 後台"].map((item) => (
              <div key={item} className="rounded-xl bg-white/10 p-3 text-sm font-black text-white/86">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : isQuiz ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-[#0d6b62]">互動測驗</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">4 題範例</span>
            </div>
            <h3 className="mt-4 text-xl font-black leading-snug">首頁第一屏最應該讓訪客先看懂什麼？</h3>
            <div className="mt-4 grid gap-2">
              {["公司成立年份", "你能解決什麼問題", "完整技術清單"].map((item, index) => (
                <div key={item} className={`rounded-lg px-3 py-2 text-xs font-black ${index === 1 ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#faf8f3] text-[#52605c]"}`}>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-1/2 rounded-full bg-[#0d6b62]" />
            </div>
          </div>
          <HeroPreviewList items={["題目卡片", "選項作答", "答案解析", "結果頁"]} />
        </div>
      ) : isQingyuWeb ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.78fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black">Qingyu Web Studio</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">SEO Ready</span>
            </div>
            <div className="mt-4 grid gap-2">
              {[
                ["Hero", "讓你的服務被看懂"],
                ["互動展示區", "AI / LINE Bot / BuildFlow"],
                ["CTA", "需求診斷 → 聯絡"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#faf8f3] px-3 py-2">
                  <p className="text-[11px] font-black text-[#0d6b62]">{label}</p>
                  <p className="mt-1 text-xs font-bold text-[#52605c]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroPreviewList items={["RWD 預覽", "Open Graph", "sitemap.xml", "robots.txt"]} />
        </div>
      ) : (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <p className="text-sm font-black">{project.title}</p>
            <p className="mt-3 text-xs font-bold leading-6 text-[#52605c]">{project.summary}</p>
          </div>
          <HeroPreviewList items={project.visuals.slice(0, 4)} />
        </div>
      )}
    </div>
  )
}

function HeroPreviewList({ items }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm font-black text-white/82">
          {item}
        </div>
      ))}
    </div>
  )
}

function WorkShowcase({ project }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
      <div className="rounded-2xl border border-[#e3ded3] bg-white p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">案例說明</p>
        <h2 className="mt-3 text-3xl font-black">{project.title}</h2>
        <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">{project.summary}</p>
        <div className="mt-5">
          <Tags items={project.tags} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <ActionLink to={project.livePath} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            {project.liveLabel}
          </ActionLink>
          <ActionLink to={project.secondaryPath || `/works/${project.slug}#tech`} className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            {project.secondaryLabel}
          </ActionLink>
        </div>
      </div>
      <div className="rounded-2xl border border-[#d8d2c5] bg-[#faf8f3] p-5">
        <p className="text-sm font-black text-[#0d6b62]">畫面展示</p>
        <div className="mt-4 grid gap-3">
          {project.visuals.map((item) => (
            <div key={item} className="rounded-xl border border-[#e3ded3] bg-white p-4 text-sm font-black text-[#2f3c3b]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ServicesPage() {
  const faqs = [
    ["可以先做簡單版嗎？", "可以 先做可用版本 再慢慢擴充"],
    ["價格會變動嗎？", "會 依頁數、功能、資料整理程度調整"],
    ["修改包含幾次？", "一般包含 1～2 次小修改 超出另估"],
    ["有後續維護嗎？", "可以另談月維護或單次修改"],
  ]

  return (
    <PageShell
      page={seo.services}
      eyebrow="解決方案"
      title="先選你想解決的問題"
      intro="品牌入口、訂貨接單、客戶管理、LINE 與 AI 自動化先看成品 再決定範圍"
      actions={
        <>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            填需求表單
          </Link>
          <Link to="/pricing" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            看價格
          </Link>
        </>
      }
    >
      <section className="mx-auto max-w-6xl px-4 pt-10 md:pt-12">
        <Link
          to="/ai-transformation"
          className="flex flex-col justify-between gap-4 rounded-2xl border border-[#1c2d2e] bg-[#0f2a26] p-5 text-white transition hover:-translate-y-0.5 hover:shadow-xl md:flex-row md:items-center"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">給正在申請補助的中小企業</p>
            <p className="mt-2 text-xl font-black md:text-2xl">中小企業 AI 數位轉型實作服務</p>
            <p className="mt-1 text-sm font-bold text-white/70">LINE 詢價、訂貨系統、AI 知識庫、企業網站——每個方案都有可操作成品</p>
          </div>
          <span className="inline-flex min-h-11 w-fit shrink-0 items-center rounded-xl bg-[#eac46f] px-5 text-sm font-black text-[#111c22]">
            看方案與成品
          </span>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceOfferings.map((service) => (
            <article key={service.id} className="rounded-lg border border-[#e3ded3] bg-white p-5">
              <span className="inline-flex rounded-md bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{service.price}</span>
              <h2 className="mt-4 text-xl font-black">{service.name}</h2>
              <p className="mt-3 min-h-16 text-sm font-bold leading-7 text-[#52605c]">{service.summary}</p>
              <ActionLink to={service.demoPath} className="mt-5 inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                看相關成品
              </ActionLink>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black text-[#0d6b62]">內容</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">交付範圍</h2>
            </div>
            <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">短版範圍 細節報價確認</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {serviceOfferings.map((service) => (
              <article key={service.id} className="rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-md bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
                    {service.label}
                  </span>
                  <ActionLink to={service.demoPath} className="text-sm font-black text-[#0d6b62]">
                    看成品
                  </ActionLink>
                </div>
                <h3 className="mt-4 text-2xl font-black text-[#111c22]">{service.name}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{service.summary}</p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  <ServiceFact title="適合" text={service.targetUsers} />
                  <ServiceFact title="參考價格" text={service.price} />
                </div>

                <div className="mt-5">
                  <p className="text-sm font-black text-[#40504c]">包含什麼</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.deliverables.map((item) => (
                      <span key={item} className="rounded-md bg-white px-3 py-2 text-xs font-black text-[#40504c]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-5 rounded-lg border border-[#d8d2c5] bg-white p-4 text-sm font-bold leading-7 text-[#52605c]">
                  交付內容：{service.proof}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-7">
            <p className="text-xs font-black text-[#0d6b62]">價格</p>
            <h2 className="mt-3 text-3xl font-black">參考價格</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map(([name, price, text]) => (
              <Card key={name}>
                <h3 className="text-xl font-black">{name}</h3>
                <p className="mt-2 text-2xl font-black text-[#0d6b62]">{price}</p>
                <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-black text-[#0d6b62]">流程</p>
            <h2 className="mt-3 text-3xl font-black">合作流程</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">看成品、填需求、確認報價</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {serviceWorkflow.map(([step, title, text]) => (
              <div key={step} className="rounded-lg border border-[#e3ded3] bg-white p-5">
                <p className="text-xs font-black text-[#0d6b62]">{step}</p>
                <h3 className="mt-2 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 rounded-lg border border-[#e3ded3] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5f4a2a]">
          錯誤修正與新增功能分開計算 維護可另談
        </p>
      </section>

      <section className="border-y border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-7">
            <p className="text-xs font-black text-[#0d6b62]">FAQ</p>
            <h2 className="mt-3 text-3xl font-black">常見問題</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map(([question, answer]) => (
              <Card key={question}>
                <h3 className="text-lg font-black">Q：{question}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">A：{answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mt-10 rounded-lg border border-[#e3ded3] bg-[#111c22] p-6 text-white">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black text-[#8fd6cc]">下一步</p>
              <h2 className="mt-3 text-2xl font-black">填需求表單</h2>
              <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-white/72">我會先看內容 再回覆適合的做法與估價</p>
            </div>
            <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22]">
              填需求表單
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function ServiceFact({ title, text }) {
  return (
    <div className="rounded-lg border border-[#e3ded3] bg-white p-4">
      <p className="text-sm font-black text-[#0d6b62]">{title}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
    </div>
  )
}

export function PricingPage() {
  const priceCards = [
    {
      name: "快速網站",
      price: "5,000 元起",
      time: "2–5 天",
      fit: "已有內容 只需要快速上線",
      includes: "單頁、基本 RWD、聯絡按鈕",
      excludes: "品牌設計、後台、複雜表單",
      casePath: "/works/company-landing",
    },
    {
      name: "品牌官網",
      price: "12,000 元起",
      time: "5–10 天",
      fit: "需要正式門面與詢價入口",
      includes: "首頁、服務、案例、聯絡、SEO",
      excludes: "會員、訂單、客製後台",
      casePath: "/works/biomed-brand-site",
    },
    {
      name: "接單 / 後台系統",
      price: "25,000 元起",
      time: "10–25 天",
      fit: "訂單、案件、出貨、月結需要管理",
      includes: "前台表單、後台列表、狀態流程",
      excludes: "金流、物流、ERP 深度串接",
      casePath: "/works/wholesale-ordering",
    },
    {
      name: "AI / 客製系統",
      price: "需求估價",
      time: "依需求估時",
      fit: "需要 RAG、API、自動化或權限流程",
      includes: "需求拆解、系統規劃、核心流程",
      excludes: "未定義範圍、無資料規格的估價",
      casePath: "/works/rag-consultant",
    },
  ]

  return (
    <PageShell
      page={seo.pricing}
      title="專案預算怎麼抓"
      intro="以下是常見委託的參考區間 實際依範圍、頁數與整合深度報價"
    >
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {priceCards.map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-[#e3ded3] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black text-[#111c22]">{plan.name}</h2>
                  <p className="mt-2 text-sm font-bold text-[#66716d]">{plan.fit}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-[#0d6b62]">{plan.price}</p>
                  <p className="mt-1 text-xs font-bold text-[#8a938f]">{plan.time}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ServiceFact title="包含" text={plan.includes} />
                <ServiceFact title="不包含" text={plan.excludes} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link to={plan.casePath} className="inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                  看對應案例
                </Link>
                <Link to={`/contact?case=${encodeURIComponent(plan.name)}`} className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
                  詢問報價
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-[#e3ded3] bg-white p-5 text-sm font-bold leading-7 text-[#52605c]">
          {pricingNote}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            告訴我需求 拿到報價
          </Link>
          <Link to="/#products" className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            看成品展示
          </Link>
        </div>
      </section>
    </PageShell>
  )
}

export function FreeAuditPage() {
  const auditItems = ["手機版是否好讀", "首頁標題是否清楚", "CTA 是否明顯", "SEO / Open Graph", "版面信任感", "下一步優化方向"]

  return (
    <PageShell page={seo.audit} title="免費網站健檢" intro="寄網址或想法 我看手機版、文案、CTA">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {auditItems.map((item) => (
            <Card key={item}>
              <p className="text-lg font-black">{item}</p>
            </Card>
          ))}
        </div>
        <a href={`mailto:${contact.email}?subject=免費網站健檢`} className="mt-8 inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
          開始健檢
        </a>
      </section>
    </PageShell>
  )
}

export function ContactPage() {
  return (
    <PageShell
      page={seo.contact}
      title="聊聊你想做的網站或系統"
      intro="傳產業、功能、預算、時程"
    >
      <ContactLeadSection />
    </PageShell>
  )
}
