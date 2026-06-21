import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import ContactLeadSection from "../components/ContactLeadSection"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import WorkDemoPanel from "./WorkDemoPanels"
import { contact, pricing, projects, seo, serviceCategories } from "./content"

function PageShell({ page, eyebrow = "Qingyu Web Studio", title, intro, actions, heroVisual, children }) {
  return (
    <SiteLayout>
      <Seo page={page} />
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className={`mx-auto grid max-w-6xl gap-8 px-4 py-14 md:py-20 ${heroVisual ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-center" : ""}`}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.35rem,8vw,4.7rem)] font-black leading-[1.04] tracking-tight">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#52605c] md:line-clamp-2">{intro}</p>
            {actions ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {actions}
                {page?.path?.startsWith("/works/") ? (
                  <Link
                    to="/contact"
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

function WorkPreview({ project }) {
  const panels = {
    "ai-audit": ["SEO 82", "CTA 建議", "手機版檢查"],
    linebot: ["LINE 對話", "Webhook", "後台收件"],
    buildflow: ["案件列表", "報價單", "LINE 回報"],
    "api-automation": ["Form", "API", "Notify"],
    "project-planner": ["5 步驟", "AI 規劃", "Contact CTA"],
    xinjiang: ["服務頁", "估價入口", "案例"],
    "qingyu-web": ["RWD", "SEO / OG", "Contact CTA"],
  }
  const previewMeta = {
    "ai-audit": { status: "AI Report", metric: "Score 82", summary: "SEO / CTA / Trust" },
    linebot: { status: "Webhook", metric: "3 messages", summary: "LINE → Reply → Inbox" },
    buildflow: { status: "Dashboard", metric: "75%", summary: "Case / Quote / LINE" },
    "api-automation": { status: "API Flow", metric: "ok: true", summary: "Payload → Response" },
    "project-planner": { status: "Planner", metric: "Step 1 / 5", summary: "Rule-based + AI plan" },
    xinjiang: { status: "Case Study", metric: "Estimate", summary: "Website → BuildFlow" },
    "qingyu-web": { status: "SEO Ready", metric: "RWD", summary: "Demo Lab → Contact" },
  }
  const toolPreviewFallback = {
    "website-rescue": {
      items: ["Score 42 → 92", "CTA / SEO", "Result Report"],
      meta: { status: "Rescue Game", metric: "Score +50", summary: "Before / After / CTA" },
    },
    "linebot-mission": {
      items: ["LINE Chat", "Reception Score", "Case Dashboard"],
      meta: { status: "Reception", metric: "5 則訊息", summary: "LINE Bot → Dashboard" },
    },
  }
  const fallbackPreview = toolPreviewFallback[project.slug]
  const items = panels[project.slug] || fallbackPreview?.items || project.visuals.slice(0, 3)
  const meta = previewMeta[project.slug] || fallbackPreview?.meta || { status: "Live", metric: "Demo", summary: project.category }

  return (
    <div className="mb-5 min-h-56 overflow-hidden rounded-2xl border border-[#e6e0d5] bg-[#faf8f3] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Product Mockup</span>
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
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
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
    audience: ["小型店家", "個人品牌", "工作室", "準備改版的網站"],
    custom: ["健檢項目", "報告格式", "Prompt Flow", "Email 報告輸出"],
    problems: ["不知道網站哪裡不清楚", "客戶看完沒有聯絡", "首頁 CTA 與 SEO 不夠明確"],
    scenario: "適合在改版前快速找出首頁文案、CTA、SEO、信任感與手機版問題。",
    next: "先用健檢工具整理問題，再決定是改文案、調 CTA，還是重做一頁式網站。",
  },
  linebot: {
    audience: ["小型店家", "預約型服務", "工作室", "需要 LINE 收需求的團隊"],
    custom: ["對話流程", "Webhook 欄位", "後台收件狀態", "LINE / Email 通知"],
    problems: ["LINE 訊息太散", "客戶需求沒有被整理", "店家回覆與追蹤靠人工記"],
    scenario: "適合把 LINE 詢問整理成可追蹤需求，減少訊息散落與人工整理。",
    next: "先整理客戶常問問題與收件欄位，再做 LINE Bot 對話與後台收件流程。",
  },
  buildflow: {
    audience: ["工程行", "修繕服務", "現場服務團隊", "需要照片與進度管理的公司"],
    custom: ["案件欄位", "報價單", "LINE 回報", "Supabase / PDF Export"],
    problems: ["照片與報價散在 LINE", "施工狀態不好追", "案件從詢價到完工沒有完整紀錄"],
    scenario: "適合把網站詢價、照片、報價、施工狀態與 LINE 回報整理成後台流程。",
    next: "先定義案件狀態與報價欄位，再把 LINE 回報與後台案件串起來。",
  },
  "api-automation": {
    audience: ["有表單收件需求的團隊", "需要通知流程的店家", "想把資料進後台的工作室"],
    custom: ["API Payload", "驗證規則", "通知節點", "Dashboard 欄位"],
    problems: ["表單送出後沒人追", "資料要手動複製到表格", "通知與後台狀態沒有串接"],
    scenario: "適合把表單送出後的 API、資料驗證、通知與後台狀態串起來。",
    next: "先確認表單欄位與通知對象，再設計 API、資料流程與後台狀態。",
  },
  "qingyu-web": {
    audience: ["個人品牌", "小型店家", "工作室", "學生作品集"],
    custom: ["首頁架構", "作品頁", "需求診斷工具", "SEO / Open Graph"],
    problems: ["服務說不清楚", "作品沒有導到詢問", "客戶不知道下一步該怎麼聯絡"],
    scenario: "適合把服務、作品、技術展示與聯絡轉換整合成一個能接案的主站。",
    next: "先定義服務分類與作品入口，再把需求診斷與 Contact 串成成交路徑。",
  },
  xinjiang: {
    audience: ["工程服務業", "需要形象網站的店家", "想把詢價接到後台的團隊"],
    custom: ["估價入口", "服務分類", "BuildFlow 串接", "LINE 回報流程"],
    problems: ["客戶只看 LINE 或社群", "估價需求沒有進後台", "工程案例與案件管理分開"],
    scenario: "適合用工程行情境展示網站如何從詢價入口延伸到案件管理流程。",
    next: "先做好服務頁與估價入口，再視需求接到 BuildFlow 案件管理。",
  },
}

const defaultConversionProfile = {
  audience: ["小型店家", "個人品牌", "工作室"],
  custom: ["頁面架構", "互動流程", "資料欄位", "聯絡 CTA"],
  problems: ["服務不容易被理解", "客戶看完不知道怎麼詢問", "流程太靠人工整理"],
  scenario: "適合先用 Demo 驗證流程，再依實際需求客製成可上線版本。",
  next: "先用需求診斷整理方向，再挑一個最重要的流程做成可展示版本。",
}

const workBusinessValues = {
  "ai-audit": "幫你快速找出網站為什麼沒人聯絡。",
  linebot: "讓客戶在 LINE 裡留下需求，後台自動整理。",
  buildflow: "把工程案從 LINE 對話變成可追蹤案件。",
  "api-automation": "表單送出後，自動進 API、通知與後台。",
  "project-planner": "客戶不知道要做什麼時，先用診斷工具分類需求。",
  "qingyu-web": "展示主站如何把服務、作品、工具與聯絡流程串成成交路徑。",
  xinjiang: "把工程網站的估價入口接到案件管理流程。",
}

const conciseWorkValues = {
  "ai-audit": "檢查網站 CTA、SEO 與聯絡流程。",
  linebot: "讓 LINE 訊息自動整理成需求。",
  buildflow: "管理案件、報價、照片與 LINE 回報。",
  "api-automation": "表單送出後，自動進 API、通知與後台。",
  "project-planner": "判斷適合做網站、LINE Bot 還是系統。",
  "website-rescue": "點選改善項目，查看網站狀態變化。",
  "linebot-mission": "模擬 LINE 接待與後台同步。",
  "qingyu-web": "展示主站、作品、工具與聯絡流程。",
  xinjiang: "工程網站如何串到 BuildFlow 後台。",
}

export function WorksPage() {
  const plannerProject = {
    slug: "project-planner",
    title: "網站需求診斷工具",
    category: "互動工具",
    summary: "回答幾個問題，整理適合的網站、LINE Bot、AI 工具或小系統方向。",
    livePath: "/tools/project-planner#demo",
    liveLabel: "查看互動 Demo",
    secondaryPath: "/tools/project-planner#tech",
    secondaryLabel: "技術拆解",
    tags: ["React", "Rule-based", "OpenAI optional", "Contact CTA"],
    visuals: ["5-step form", "Recommendation UI", "AI plan"],
    demo: ["需求表單", "快速建議", "AI 完整規劃"],
  }
  const rescueProject = {
    slug: "website-rescue",
    title: "網站救援互動 Demo",
    category: "互動工具",
    summary: "點選改善項目，觀察 CTA、SEO、手機版與信任感如何改變網站狀態。",
    livePath: "/tools/website-rescue#demo",
    liveLabel: "開始改善",
    secondaryPath: "/tools/website-rescue#tech",
    secondaryLabel: "技術拆解",
    tags: ["React", "State Machine", "Scoring UI", "Conversion CTA"],
    visuals: ["Score UI", "Before / After", "Result Report"],
    demo: ["問題清單", "修正選項", "改善報告"],
  }
  const lineBotMissionProject = {
    slug: "linebot-mission",
    title: "LINE Bot 接待模擬",
    category: "互動工具",
    summary: "模擬 LINE 客戶訊息，看看 Bot 如何回覆、整理需求並同步到後台。",
    livePath: "/tools/linebot-mission#demo",
    liveLabel: "開始模擬",
    secondaryPath: "/tools/linebot-mission#tech",
    secondaryLabel: "技術拆解",
    tags: ["React", "LINE Bot", "State Machine", "Dashboard UI"],
    visuals: ["LINE Chat", "Mission Score", "Case Dashboard"],
    demo: ["任務策略", "指標變化", "後台同步"],
  }
  const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]))
  const sections = [
    {
      title: "主打互動",
      text: "先動手體驗網站整理與 LINE Bot 接待。",
      items: [rescueProject, lineBotMissionProject],
    },
    {
      title: "完整案例",
      text: "從網站詢價一路串到後台流程。",
      items: [projectBySlug.buildflow, projectBySlug.xinjiang].filter(Boolean),
    },
    {
      title: "AI / API 工具",
      text: "把分析、診斷、表單與 API 流程做成產品介面。",
      items: [plannerProject, projectBySlug["ai-audit"], projectBySlug["api-automation"]].filter(Boolean),
    },
    {
      title: "主站案例",
      text: "這個網站本身的規劃、SEO、Demo Lab 與聯絡流程。",
      items: [projectBySlug["qingyu-web"]].filter(Boolean),
    },
  ]

  return (
    <PageShell page={seo.works} title="作品案例" intro="互動展示、完整案例與 AI / API 工具，依照客戶最容易理解的方式分類。">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Works</p>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">{section.title}</h2>
                </div>
                <p className="max-w-xl text-sm font-bold leading-6 text-[#52605c]">{section.text}</p>
              </div>
              <div className={`grid gap-4 ${section.items.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
                {section.items.map((project) => (
                  <article key={project.slug} className="rounded-xl border border-[#e3ded3] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg md:p-5">
                    <WorkPreview project={project} />
                    <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
                    <h3 className="mt-3 text-2xl font-black">{project.title}</h3>
                    <p className="mt-3 rounded-lg bg-[#faf8f3] px-3 py-2 text-sm font-black leading-6 text-[#40504c]">
                      {conciseWorkValues[project.slug] || workBusinessValues[project.slug] || project.summary}
                    </p>
                    <div className="mt-4 hidden md:block">
                      <Tags items={(project.tags || []).slice(0, 3)} />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to={project.livePath} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white md:min-h-10 md:w-auto">
                        {project.liveLabel}
                      </Link>
                      <Link to={project.secondaryPath || `/works/${project.slug}#tech`} className="hidden min-h-10 items-center rounded-md border border-[#cfd7d3] px-4 text-sm font-black text-[#111c22] md:inline-flex">
                        {project.secondaryLabel || "技術拆解"}
                      </Link>
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

export function WorkDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug) || projects[0]
  const isLineBotProject = project.slug === "linebot"
  const isBuildFlowProject = project.slug === "buildflow"
  const isApiAutomationProject = project.slug === "api-automation"
  const isQingyuWebProject = project.slug === "qingyu-web"
  const isXinjiangProject = project.slug === "xinjiang"
  const isInternalDemoPath = project.livePath === `/works/${project.slug}#demo`
  const conversionProfile = conversionProfiles[project.slug] || defaultConversionProfile
  const projectSeo = {
    path: `/works/${project.slug}`,
    title: isQingyuWebProject
      ? "Qingyu Web Studio 主站案例｜網站服務、Demo Lab 與 SEO 架構"
      : isBuildFlowProject
      ? "BuildFlow 工程行案件管理系統 Demo｜鑫匠工程案例｜Qingyu Web Studio"
      : isXinjiangProject
      ? "鑫匠工程案例｜工程網站與 BuildFlow 案件管理展示｜Qingyu Web Studio"
      : isApiAutomationProject
        ? "API 自動化流程 Demo｜表單、API、通知與後台展示｜Qingyu Web Studio"
        : `${project.title}｜Qingyu Web Studio`,
    description: isQingyuWebProject
      ? "展示 Qingyu Web Studio 主站如何整合網站服務、作品展示、需求診斷工具、SEO metadata、Vercel 部署與聯絡轉換。"
      : isBuildFlowProject
      ? "以鑫匠工程為案例，展示工程服務業如何用 BuildFlow 整合網站詢價、案件管理、現場照片、報價單、施工狀態與 LINE 回報流程。"
      : isXinjiangProject
      ? "展示鑫匠工程網站如何結合 BuildFlow 案件管理流程，串接估價入口、工程案例、報價狀態與 LINE 回報。"
      : isApiAutomationProject
        ? "展示如何將客戶表單、API、資料驗證、通知流程與後台 Dashboard 串接成完整小型系統。"
        : project.summary,
  }

  return (
    <PageShell
      page={projectSeo}
      eyebrow={project.category}
      title={project.title}
      intro={conciseWorkValues[project.slug] || project.summary}
      actions={
        isLineBotProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看互動 Demo
            </Link>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              查看後台 Demo
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : isBuildFlowProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看互動 Demo
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
              查看互動 Demo
            </Link>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              查看 API Demo
            </Link>
            <Link to="#tech" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              技術拆解
            </Link>
          </>
        ) : isXinjiangProject ? (
          <>
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看互動 Demo
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
              查看互動 Demo
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

      <section id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-8">
        <div className="grid gap-5">
          <div className="rounded-xl border border-[#e3ded3] bg-white p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Live Demo</p>
                <h2 className="mt-2 text-2xl font-black">Demo 操作台</h2>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">
                  直接操作核心流程，看畫面與資料怎麼變化。
                </p>
              </div>
              {isInternalDemoPath ? (
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {["可互動 Demo", "狀態會變化", "手機版可操作"].map((item) => (
                    <span key={item} className="rounded-full border border-[#d7dfdb] bg-[#f7f4ec] px-3 py-2 text-xs font-black text-[#40504c]">
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <Link to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                  {project.liveLabel}
                </Link>
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
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Main Site Case Study</p>
                <h2 className="mt-3 text-3xl font-black">主站如何把作品變成詢問</h2>
                <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
                  主站把服務、作品、工具與聯絡串成一條路徑。
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  ["解決什麼問題", "讓台灣客戶先看懂服務，再透過作品與工具判斷能不能合作。"],
                  ["首頁如何導流", "Hero 先講定位，服務區說明能做什麼，作品區導向可互動 Demo。"],
                  ["Demo Lab 展示技術", "AI Audit、LINE Bot、BuildFlow、API Automation 都有可操作畫面。"],
                  ["Project Planner 收需求", "用問答整理身份、需求、功能、預算與時程，降低第一次溝通成本。"],
                  ["Contact 如何轉換", "Email、LINE ID 複製、需求表單與 mailto 都能把詢問送出去。"],
                  ["SEO / 部署", "每頁 metadata、Open Graph、canonical、sitemap、robots 與 Vercel 部署。"],
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
                  <h3 className="mt-3 text-2xl font-black">Visitor → Homepage → Demo Lab → Project Planner → Contact</h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-white/70">
                    首頁先建立信任，作品頁展示技術，需求診斷整理問題，最後把客戶帶到 LINE / Email 討論。
                  </p>
                </div>
                <div className="grid gap-2">
                  {["首頁定位", "Demo Lab 技術展示", "Project Planner 收需求", "Contact 轉換", "SEO / sitemap / robots / Vercel"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8fd6cc] text-xs font-black text-[#0b2724]">{index + 1}</span>
                      <span className="text-sm font-black text-white/86">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["React", "Vite", "Tailwind", "React Router", "SEO metadata", "Open Graph", "sitemap.xml", "robots.txt", "Vercel"].map((item) => (
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
              把畫面、資料流、API 與部署拆開展示，讓客戶看懂這不是只有切版的作品。
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
                  LINE User → LINE Platform → /api/line-webhook → OpenAI / Demo → LINE Reply → Dashboard
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "Vercel Serverless Function", "Messaging API / Reply API", "OpenAI optional", "Supabase optional", "Demo 模式"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {isBuildFlowProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">BuildFlow Architecture</p>
                <div className="mt-4 overflow-x-auto text-sm font-black leading-7">
                  Case List → Case Detail → Status Update → LINE Report Timeline → Photo / Quote Modal
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "Case Status Management", "Dashboard UI", "LINE 回報", "Supabase-ready", "報價單 PDF future"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {isQingyuWebProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Site Conversion Flow</p>
                <div className="mt-4 overflow-x-auto text-sm font-black leading-7">
                  Visitor → Homepage → Demo Lab → Project Planner → Contact → Case Study
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Vite / Tailwind", "React Router", "Vercel Deploy", "SEO metadata", "Open Graph", "Contact CTA"].map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {isApiAutomationProject ? (
              <div className="rounded-xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Automation Architecture</p>
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Design Details</p>
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Workflow</p>
            <h2 className="mt-2 text-2xl font-black">使用流程</h2>
          </summary>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {project.steps.map((step, index) => (
              <Card key={step}>
                <p className="text-xs font-black text-[#0d6b62]">Step {index + 1}</p>
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
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Use Case</p>
              <h2 className="mt-2 text-2xl font-black">可以怎麼用在你的服務？</h2>
            </div>
            <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">
              先看 Demo，再整理你的流程。
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
            先診斷方向，再決定做網站、LINE Bot 或小後台。
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

function HeroPreview({ project }) {
  const isLineBot = project.slug === "linebot"
  const isBuildFlow = project.slug === "buildflow"
  const isAudit = project.slug === "ai-audit"
  const isApi = project.slug === "api-automation"
  const isQingyuWeb = project.slug === "qingyu-web"

  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-2xl shadow-[#111c22]/15 md:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Product Preview</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">Demo-ready</span>
      </div>

      {isLineBot ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.82fr_1fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-[#dff1e8] p-3 text-[#111c22]">
            {[
              ["user", "我想做店家網站"],
              ["bot", "請提供產業、功能、預算、上線時間"],
              ["user", "我是咖啡店，想做預約和菜單查詢"],
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
              <p className="mt-3 text-xs font-bold leading-5 text-[#52605c]">來源 LINE · 建議方案：LINE Bot + 表單 + 小型後台</p>
            </div>
            <HeroPreviewList items={["Webhook 接收", "Signature Verify", "AI 回覆", "Dashboard Saved"]} />
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
                ["LINE 回報", "今日 2 人出工，照片已補"],
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
          <HeroPreviewList items={["案件列表 + 狀態", "現場照片", "報價單 Preview", "LINE 回報可複製"]} />
        </div>
      ) : isAudit ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-[#0d6b62]">AI Audit Score</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">Demo 模式可用</span>
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
          <HeroPreviewList items={["首頁標題建議", "CTA 動線", "SEO Description", "手機版問題"]} />
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
            {["Form → API", "Validation → Lead Object", "Notification → Dashboard"].map((item) => (
              <div key={item} className="rounded-xl bg-white/10 p-3 text-sm font-black text-white/86">
                {item}
              </div>
            ))}
          </div>
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
                ["Demo Lab", "AI / LINE Bot / BuildFlow"],
                ["CTA", "Project Planner → Contact"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#faf8f3] px-3 py-2">
                  <p className="text-[11px] font-black text-[#0d6b62]">{label}</p>
                  <p className="mt-1 text-xs font-bold text-[#52605c]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroPreviewList items={["RWD mockup", "Open Graph", "sitemap.xml", "robots.txt"]} />
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
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Case Study</p>
        <h2 className="mt-3 text-3xl font-black">{project.title}</h2>
        <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">{project.summary}</p>
        <div className="mt-5">
          <Tags items={project.tags} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={project.livePath} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            {project.liveLabel}
          </Link>
          <Link to={project.secondaryPath || `/works/${project.slug}#tech`} className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            {project.secondaryLabel}
          </Link>
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
  return (
    <PageShell page={seo.services} title="服務項目" intro="用好懂的方式，把網站、表單、LINE Bot 與小型系統整理成能被使用的產品。">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-5">
          {serviceCategories.map(([title, text]) => (
            <Card key={title}>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

export function PricingPage() {
  return (
    <PageShell page={seo.pricing} title="簡單好懂的方案" intro="小型網站可從基礎方案開始，系統、AI 工具與 LINE Bot 依需求估價。">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map(([name, price, text]) => (
            <Card key={name}>
              <h2 className="text-2xl font-black">{name}</h2>
              <p className="mt-2 text-3xl font-black text-[#0d6b62]">{price}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

export function FreeAuditPage() {
  const auditItems = ["手機版是否好讀", "首頁標題是否清楚", "CTA 是否明顯", "SEO / Open Graph", "版面信任感", "下一步優化方向"]

  return (
    <PageShell page={seo.audit} title="免費網站健檢" intro="如果你不確定網站哪裡怪，可以先把網址或想法寄給我，我會從手機版、文案、CTA 與信任感快速檢查。">
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
  const [lineCopied, setLineCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  async function copyLineId() {
    try {
      await navigator.clipboard.writeText(contact.lineId)
      setLineCopied(true)
    } catch {
      setLineCopied(true)
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setEmailCopied(true)
    } catch {
      setEmailCopied(true)
    }
  }

  return (
      <PageShell
        page={seo.contact}
        title="聊聊你想做的網站或系統"
        intro="可以先傳產業、功能、預算與希望上線時間。"
      >
        <section className="hidden">
          <Card>
            <h2 className="text-2xl font-black">加 LINE 或 Email 討論需求</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">可以先傳產業、功能、預算與希望上線時間。</p>
          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">LINE</p>
              <p className="mt-2 text-2xl font-black text-[#111c22]">{contact.lineId}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{contact.line}</p>
            </div>
            <div className="rounded-2xl border border-[#e3ded3] bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Email</p>
              <a href={`mailto:${contact.email}`} className="mt-2 block break-words text-lg font-black text-[#0d6b62]">
                {contact.email}
              </a>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyLineId}
              className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white transition hover:bg-[#0d6b62]"
            >
              {lineCopied ? "已複製 LINE ID" : "複製 LINE ID"}
            </button>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"
            >
              {emailCopied ? "已複製 Email" : "複製 Email"}
            </button>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent("網站需求討論")}&body=${encodeURIComponent("你好，我想討論網站 / LINE Bot / AI 工具 / 小系統。\n產業：\n想做的功能：\n預算區間：\n希望上線時間：\nLINE ID：")}`}
              className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"
            >
              用 Email 傳送需求
            </a>
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">先給我三件事</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["你是誰", "店家、工作室、學生或個人品牌"],
              ["想做什麼", "網站、LINE Bot、AI 工具或小系統"],
              ["卡在哪裡", "詢問、報價、預約、回覆或後台整理"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
                <p className="text-sm font-black text-[#0d6b62]">{title}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
      <ContactLeadSection />
    </PageShell>
  )
}
