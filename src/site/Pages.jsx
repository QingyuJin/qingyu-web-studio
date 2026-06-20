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
            <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#52605c]">{intro}</p>
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
    xinjiang: ["服務頁", "估價入口", "案例"],
    "qingyu-web": ["RWD", "SEO / OG", "Contact CTA"],
  }
  const items = panels[project.slug] || project.visuals.slice(0, 3)

  return (
    <div className="mb-5 rounded-xl border border-[#e6e0d5] bg-[#faf8f3] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Product Mockup</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#52605c]">{project.category}</span>
      </div>
      <div className="mt-4 rounded-xl bg-[#111c22] p-3 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">{project.title}</p>
          <span className="text-xs font-black text-[#8fd6cc]">Live</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/15">
          <div className="h-full w-4/5 rounded-full bg-[#8fd6cc]" />
        </div>
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

export function WorksPage() {
  const categories = ["網站", "系統", "AI 工具", "LINE Bot", "工程流程系統"]

  return (
    <PageShell page={seo.works} title="作品案例" intro="精選網站、LINE Bot、AI 工具與後台系統 Demo，展示從前端畫面到資料流程的完整製作能力。">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-[#ddd6c9] bg-white px-4 py-2 text-sm font-black text-[#2f3c3b]">
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-xl border border-[#e3ded3] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg">
              <WorkPreview project={project} />
              <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
              <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.summary}</p>
              <div className="mt-4">
                <Tags items={project.tags.slice(0, 4)} />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={project.livePath} className="inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                  {project.liveLabel}
                </Link>
                <Link to={project.secondaryPath || `/works/${project.slug}#tech`} className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] px-4 text-sm font-black text-[#111c22]">
                  {project.secondaryLabel}
                </Link>
              </div>
            </article>
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
      intro={project.summary}
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
            <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看互動 Demo
            </Link>
            <Link to="/tools/project-planner" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              查看需求診斷
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
            <Link to="/contractor-site" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看鑫匠網站
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
            <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              聯絡我
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
                  下方可以直接操作這個案例的核心流程，包含畫面狀態、資料結果與技術拆解。
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <h2 className="text-xl font-black">問題</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.problem}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-black">解法</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.solution}</p>
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
                  LINE User → LINE Platform → /api/line-webhook → OpenAI / Mock → LINE Reply → Dashboard
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "Vercel Serverless Function", "Messaging API / Reply API", "OpenAI optional", "Supabase optional", "Mock mode"].map((item) => (
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
                  {["React / Tailwind", "Case Status Management", "Dashboard UI", "LINE 回報 mock", "Supabase-ready", "報價單 PDF future"].map((item) => (
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
                  User Form → POST /api/automation-lead → Validation → Lead Object → Mock Notification → Dashboard UI
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["React / Tailwind", "Vercel Serverless Function", "Request Body Check", "JSON Payload", "Mock Notification", "React State UI"].map((item) => (
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Demo Details</p>
          <h2 className="mt-3 text-3xl font-black">功能展示</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {project.demo.map((item) => (
            <Card key={item}>
              <p className="text-sm font-black leading-7">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-7">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Workflow</p>
          <h2 className="mt-3 text-3xl font-black">使用流程</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {project.steps.map((step, index) => (
            <Card key={step}>
              <p className="text-xs font-black text-[#0d6b62]">Step {index + 1}</p>
              <p className="mt-3 text-lg font-black">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-black">手機版展示</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.mobile}</p>
          </Card>
          <Card>
            <h2 className="text-2xl font-black">未來可擴充</h2>
            <ul className="mt-3 grid gap-2 text-sm font-bold leading-7 text-[#52605c]">
              {project.future.map((item) => (
                <li key={item}>・{item}</li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="mt-8 rounded-xl border border-[#e3ded3] bg-white p-5">
          <h2 className="text-2xl font-black">想做類似的網站或系統？</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">
            可以先聊聊你的服務、客戶來源與目前卡住的流程，我會協助整理適合的網站、LINE Bot 或後台 Demo 方向。
          </p>
          <Link to="/contact" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            聊聊需求
          </Link>
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
    <div className="rounded-2xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-xl shadow-[#111c22]/10 md:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Live Product Preview</span>
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
            <HeroPreviewList items={["Webhook 接收", "Signature Verify", "OpenAI / Mock Reply", "Dashboard Saved"]} />
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
          <HeroPreviewList items={["案件列表 + 狀態", "現場照片 mock", "報價單 Preview", "LINE 回報可複製"]} />
        </div>
      ) : isAudit ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-[#0d6b62]">AI Audit Score</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">Mock fallback ready</span>
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
                <p className="text-xs font-black text-[#0d6b62]">POST /api/automation-lead</p>
                <p className="mt-2 text-sm font-black">客戶需求進件</p>
              </div>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">ok: true</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-[84%] rounded-full bg-[#0d6b62]" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-black sm:grid-cols-3">
              {["leadId", "mock_sent", "Dashboard"].map((item) => (
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

  async function copyLineId() {
    try {
      await navigator.clipboard.writeText(contact.lineId)
      setLineCopied(true)
    } catch {
      setLineCopied(true)
    }
  }

  return (
    <PageShell
      page={seo.contact}
      title="先聊聊你的網站"
      intro="先聊聊需求，我可以幫你判斷適合網站、LINE Bot、AI 工具還是小系統。你不需要先準備完整規格，先把目前卡住的流程說清楚就可以。"
    >
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-[0.82fr_1.18fr]">
        <Card>
          <h2 className="text-2xl font-black">聯絡方式</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">
            你可以先用 Email 或 LINE ID 留下產業、想做的功能、預算區間與希望上線時間。
          </p>
          <a href={`mailto:${contact.email}`} className="mt-4 block text-lg font-black text-[#0d6b62]">
            {contact.email}
          </a>
          <div className="mt-5 rounded-lg border border-[#e3ded3] bg-[#faf8f3] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">LINE ID</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xl font-black text-[#111c22]">{contact.lineId}</p>
              <button
                type="button"
                onClick={copyLineId}
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]"
              >
                {lineCopied ? "已複製 LINE ID" : "複製 LINE ID"}
              </button>
            </div>
            <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{contact.line}</p>
          </div>
          <a
            href={`mailto:${contact.email}?subject=${encodeURIComponent("網站需求討論")}&body=${encodeURIComponent("你好，我想討論網站 / LINE Bot / AI 工具 / 小系統。\n產業：\n想做的功能：\n預算區間：\n希望上線時間：\nLINE ID：")}`}
            className="mt-5 inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white transition hover:bg-[#0d6b62]"
          >
            用 Email 開始討論
          </a>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">你可以先告訴我</h2>
          <ul className="mt-4 grid gap-3 text-sm font-bold leading-7 text-[#52605c]">
            <li>想做網站、LINE Bot、AI 工具、小系統，或還不確定。</li>
            <li>你的產業、服務內容，以及客戶通常怎麼聯絡你。</li>
            <li>目前最卡的流程：詢問、報價、預約、回覆、整理資料或後台管理。</li>
            <li>預算區間與希望上線時間，方便我先判斷適合的做法。</li>
          </ul>
          <div className="mt-5 rounded-lg bg-[#eef7f4] p-4">
            <p className="text-sm font-black text-[#0d6b62]">CTA</p>
            <p className="mt-1 text-sm font-bold leading-7 text-[#40504c]">
              填下面的需求表單，或直接用 Email 傳送，我會用台灣小型網站與系統顧問的角度幫你整理方向。
            </p>
          </div>
        </Card>
      </section>
      <ContactLeadSection />
    </PageShell>
  )
}
