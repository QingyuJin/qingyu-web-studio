import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { audience, contact, pricing, processSteps, projects, seo, serviceCategories, techStack } from "./site/content"

const interactiveDemos = [
  {
    slug: "website-rescue",
    title: "網站救援互動 Demo",
    label: "Website Rescue",
    summary: "點選改善項目，看看 CTA、SEO、手機版與信任感如何改變網站狀態。",
    livePath: "/tools/website-rescue#demo",
    techPath: "/tools/website-rescue#tech",
    liveLabel: "開始互動",
    stat: "42 → 92",
    chips: ["CTA", "SEO", "手機版", "信任感"],
    tone: "rescue",
  },
  {
    slug: "linebot-mission",
    title: "LINE Bot 接待模擬",
    label: "LINE Bot Reception",
    summary: "模擬 LINE 客戶訊息，看看 Bot 如何回覆、整理需求並同步到後台。",
    livePath: "/tools/linebot-mission#demo",
    techPath: "/tools/linebot-mission#tech",
    liveLabel: "開始模擬",
    stat: "5 則訊息",
    chips: ["LINE Bot", "Webhook", "需求分類", "Dashboard"],
    tone: "line",
  },
]

const businessValues = {
  "ai-audit": "找出網站為什麼沒人聯絡。",
  linebot: "讓 LINE 對話自動整理成需求。",
  buildflow: "把工程案變成可追蹤案件。",
  "api-automation": "表單送出後，自動進 API、通知與後台。",
  "project-planner": "先判斷該做網站、LINE Bot 還是系統。",
  "qingyu-web": "展示服務、作品、工具與聯絡流程。",
  xinjiang: "工程網站如何接到 BuildFlow 後台。",
}

function StudioHome() {
  const featuredProjects = projects.filter((project) => project.featured !== false)
  const plannerCard = {
    slug: "project-planner",
    title: "網站需求診斷",
    category: "互動工具",
    summary: "回答幾個問題，快速判斷適合網站、LINE Bot、AI 工具還是小型系統。",
    livePath: "/tools/project-planner#demo",
    liveLabel: "開始診斷",
    secondaryPath: "/tools/project-planner#tech",
    secondaryLabel: "技術拆解",
    tags: ["Rule-based", "OpenAI optional", "Vercel API", "Recommendation UI"],
  }
  const featuredCards = [...featuredProjects, plannerCard]

  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1fr_0.78fr] md:items-center md:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-2xl text-[clamp(1.75rem,8vw,2rem)] font-black leading-[1.08] tracking-tight md:text-[clamp(2.5rem,8vw,5rem)]">
              網站、LINE Bot、AI 工具與小系統
            </h1>
            <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
              把你的服務整理成清楚、漂亮、可以聯絡、可以互動的網站。
            </p>
            <div className="mt-5 inline-flex max-w-full rounded-full border border-[#d8e2dc] bg-[#f5faf7] px-4 py-2 text-sm font-black text-[#0d6b62] shadow-sm">
              不只做網站，也能把表單、LINE、AI、API 與後台流程接起來。
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
                看作品
              </Link>
              <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                需求診斷
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <HeroMockup />
          </div>
        </div>
      </section>

      <InteractiveLab />

      <Section eyebrow="Works" title="精選作品">
        <div className="grid gap-4 md:grid-cols-2">
          {featuredCards.map((project) => (
            <article
              key={project.slug}
              className="rounded-xl border border-[#e3ded3] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg md:p-5"
            >
              <ProjectPreview project={project} />
              <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{project.title}</h3>
              <p className="mt-3 rounded-lg bg-[#faf8f3] px-3 py-2 text-sm font-black leading-6 text-[#40504c]">
                {businessValues[project.slug] || "把流程做成客戶看得懂、老闆管得住的網站系統。"}
              </p>
              <div className="mt-4 hidden flex-wrap gap-2 md:flex">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={project.livePath} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white hover:bg-[#26343b] md:min-h-10 md:w-auto">
                  {project.liveLabel}
                </Link>
                <Link to={project.secondaryPath || `/works/${project.slug}#tech`} className="hidden min-h-10 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62] md:inline-flex">
                  {project.secondaryLabel || "技術拆解"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Services" title="我可以幫你做">
        <div className="grid gap-3 md:grid-cols-5">
          {serviceCategories.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#e3ded3] bg-white p-5">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#5a6461]">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-black">不知道該做哪種網站？</h3>
            <p className="mt-2 max-w-2xl text-sm font-bold leading-7 text-[#5a6461]">
              用 1 分鐘回答幾個問題，我會幫你判斷適合品牌網站、作品集、LINE Bot、AI 工具還是小型系統。
            </p>
          </div>
          <Link to="/tools/project-planner#demo" className="mt-4 inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white md:mt-0">
            開始需求診斷
          </Link>
        </div>
      </Section>

      <section className="hidden border-y border-[#e6e0d5] bg-[#f2efe7] md:block">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Technical</p>
            <h2 className="mt-3 text-[clamp(2rem,6vw,3.2rem)] font-black tracking-tight">不只做版面</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#5a6461]">
              前端畫面、API、LINE、AI 與後台狀態，可以被包裝成清楚、漂亮、能展示的產品體驗。
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((item) => (
              <div key={item} className="rounded-lg border border-[#ddd6c9] bg-white px-4 py-3 text-sm font-black text-[#2f3c3b]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hidden md:block">
        <Section eyebrow="Process" title="製作流程">
          <div className="grid gap-4 md:grid-cols-4">
            {processSteps.map(([num, title, text]) => (
              <article key={num} className="rounded-xl border border-[#e3ded3] bg-white p-5">
                <p className="text-xs font-black text-[#0d6b62]">{num}</p>
                <h3 className="mt-3 text-xl font-black">{title}</h3>
                <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#5a6461]">{text}</p>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <div className="hidden md:block">
        <Section eyebrow="For Taiwan Clients" title="適合對象">
          <div className="flex flex-wrap gap-2">
            {audience.map((item) => (
              <span key={item} className="rounded-full border border-[#ddd6c9] bg-white px-4 py-2 text-sm font-black text-[#2f3c3b]">
                {item}
              </span>
            ))}
          </div>
        </Section>
      </div>

      <section className="hidden border-y border-[#e6e0d5] bg-white md:block">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Pricing</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3.2rem)] font-black tracking-tight">簡單好懂的方案</h2>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#5a6461]">
            小型網站可從基礎方案開始；系統、AI 工具與 LINE Bot 依需求估價。
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricing.map(([name, price, text]) => (
              <article key={name} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
                <h3 className="text-xl font-black">{name}</h3>
                <p className="mt-2 text-2xl font-black text-[#0d6b62]">{price}</p>
                <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#5a6461]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111c22] text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Contact</p>
            <h2 className="mt-3 text-[clamp(2rem,6vw,3.2rem)] font-black tracking-tight">先聊聊你的網站</h2>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-white/70">
              告訴我你的服務、客戶來源與卡住的流程，我可以幫你判斷適合網站、LINE Bot、AI 工具還是小型後台。
            </p>
          </div>
          <div className="grid gap-3">
            <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22] hover:bg-[#f3efe7]">
              聯絡我
            </Link>
            <a href={`mailto:${contact.email}`} className="text-sm font-black text-white/70 hover:text-white">
              {contact.email}
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function InteractiveLab() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-7 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Interactive Lab</p>
          <h2 className="mt-3 text-[clamp(2.1rem,6vw,3.6rem)] font-black tracking-tight">
            互動實驗室
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-[#52605c] md:text-base">
            直接操作幾個小型 Demo，看看網站、LINE Bot 與後台流程怎麼動起來。
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {interactiveDemos.map((demo) => (
            <InteractiveDemoCard key={demo.slug} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  )
}

function InteractiveDemoCard({ demo }) {
  return (
    <article className="group overflow-hidden rounded-[1.65rem] border border-[#ded8cb] bg-white shadow-xl shadow-[#111c22]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#111c22]/10">
      <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
        <div className="p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{demo.label}</p>
          <h3 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">{demo.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#52605c]">{demo.summary}</p>
          <div className="mt-4 hidden flex-wrap gap-2 md:flex">
            {demo.chips.map((chip) => (
              <span key={chip} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={demo.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
              {demo.liveLabel}
            </Link>
            <Link to={demo.techPath} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
              技術拆解
            </Link>
          </div>
        </div>
        <div className="min-h-52 bg-[#111c22] p-4 text-white md:min-h-72 md:p-5">
          {demo.tone === "rescue" ? <WebsiteRescuePreview /> : <LineMissionPreview />}
        </div>
      </div>
    </article>
  )
}

function WebsiteRescuePreview() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">Rescue Score</span>
        <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b171b]">42 → 92</span>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-4 text-[#111c22]">
        <div className="h-3 w-3/4 rounded-full bg-[#111c22]" />
        <div className="mt-3 h-2 w-1/2 rounded-full bg-[#d8d2c5]" />
        <div className="mt-5 grid gap-2">
          <div className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-3">
            <p className="text-xs font-black text-[#0d6b62]">CTA 修復成功</p>
            <div className="mt-2 h-2 rounded-full bg-[#dce7e2]">
              <div className="h-full w-[82%] rounded-full bg-[#0d6b62]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-black text-[#40504c]">
            <span className="rounded-lg bg-[#eef7f4] px-3 py-2">LINE 入口</span>
            <span className="rounded-lg bg-[#eef7f4] px-3 py-2">SEO 摘要</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-black text-white/80">
        {["Before", "Fix", "Report"].map((item) => (
          <span key={item} className="rounded-lg bg-white/10 py-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function LineMissionPreview() {
  return (
    <div className="grid h-full gap-3 sm:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3">
        <div className="rounded-[1.15rem] bg-[#e9f7ef] p-3 text-[#10201c]">
          <div className="mb-3 flex justify-center">
            <span className="rounded-full bg-[#08bf5b] px-3 py-1 text-[11px] font-black text-white">LINE</span>
          </div>
          <div className="grid gap-2 text-[11px] font-black">
            <div className="rounded-2xl bg-white px-3 py-2">請問網站大概多少？</div>
            <div className="ml-auto rounded-2xl bg-[#9bf4b6] px-3 py-2">先幫你整理需求。</div>
            <div className="rounded-2xl bg-white px-3 py-2">想做預約和菜單查詢。</div>
          </div>
        </div>
      </div>
      <div className="grid content-between gap-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between text-xs font-black">
            <span>自動處理率</span>
            <span className="text-[#8fd6cc]">82%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/15">
            <div className="h-full w-[82%] rounded-full bg-[#8fd6cc]" />
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 text-[#111c22]">
          <p className="text-xs font-black text-[#0d6b62]">後台同步</p>
          <p className="mt-2 text-sm font-black">店家 LINE Bot 需求</p>
          <p className="mt-1 text-xs font-bold text-[#52605c]">狀態：已整理需求</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-black">
          <span className="rounded-lg bg-white/10 py-2">Cases +3</span>
          <span className="rounded-lg bg-white/10 py-2">Time -24m</span>
        </div>
      </div>
    </div>
  )
}

function Section({ eyebrow, title, children }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
        <h2 className="mt-3 text-[clamp(2rem,6vw,3.2rem)] font-black tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function HeroMockup() {
  return (
    <div className="rounded-[1.75rem] border border-[#e3ded3] bg-[#faf8f3] p-3 shadow-2xl shadow-[#111c22]/10 md:p-4">
      <div className="overflow-hidden rounded-[1.35rem] border border-[#d8d2c5] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee9df] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4a2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
          </div>
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">Live System</span>
        </div>
        <div className="grid gap-3 p-4">
          <div className="rounded-2xl bg-[#111c22] p-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black">LINE 詢問</p>
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-[#8fd6cc]">parsed</span>
            </div>
            <div className="mt-4 grid gap-2 text-xs font-black">
              {["客戶傳照片", "想看報價", "已整理成需求"].map((item, index) => (
                <div key={item} className={`rounded-xl px-3 py-2 ${index === 1 ? "ml-auto bg-[#0d6b62] text-white" : "bg-white/10 text-white/84"}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#eee9df] bg-[#faf8f3] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">BuildFlow 案件</p>
                <span className="text-xs font-black text-[#0d6b62]">75%</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#e4e9e6]">
                <div className="h-full w-3/4 rounded-full bg-[#0d6b62]" />
              </div>
              <p className="mt-3 text-xs font-black text-[#52605c]">施工回報中</p>
            </div>
            <div className="rounded-2xl border border-[#eee9df] bg-white p-4">
              <p className="text-sm font-black">AI 分析</p>
              <p className="mt-2 text-2xl font-black text-[#0d6b62]">79.26%</p>
              <p className="mt-1 text-xs font-black text-[#52605c]">CSV / 題庫 / 影像分類</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["LINE Bot", "Supabase", "Webhook", "Vercel", "RWD"].map((item) => (
              <span key={item} className="rounded-full border border-[#e1dbcf] bg-white px-3 py-1 text-[11px] font-black text-[#40504c]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectPreview({ project }) {
  const isBuildFlow = project.slug === "buildflow"
  const isLineBot = project.slug === "linebot"
  const isAudit = project.slug === "ai-audit"
  const isApi = project.slug === "api-automation"
  const isXinjiang = project.slug === "xinjiang"
  const isQingyu = project.slug === "qingyu-web"
  const isPlanner = project.slug === "project-planner"

  return (
    <div className="mb-4 min-h-36 overflow-hidden rounded-2xl border border-[#e6e0d5] bg-[#faf8f3] p-3 md:mb-5 md:min-h-52 md:p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black text-[#0d6b62]">{project.category}</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#53605d]">Demo Preview</span>
      </div>

      {isBuildFlow ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-[#111c22] p-4 text-white shadow-lg shadow-[#111c22]/10">
            <div className="flex items-center justify-between gap-3 text-xs font-black">
              <span>q-001 工程案件</span>
              <span className="text-[#8fd6cc]">75%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/15">
              <div className="h-full w-3/4 rounded-full bg-[#8fd6cc]" />
            </div>
          </div>
          <PreviewChips items={["LINE 回報", "報價單", "施工狀態"]} />
        </div>
      ) : isLineBot ? (
        <SimplePreview items={["LINE 對話", "Webhook", "後台收件"]} />
      ) : isAudit ? (
        <SimplePreview items={["SEO 82", "CTA 建議", "手機版檢查"]} />
      ) : isApi ? (
        <div className="mt-4 space-y-3">
          <PreviewChips items={["Form", "API", "Notify"]} />
          <div className="rounded-xl bg-[#111c22] p-4 text-xs font-black text-white shadow-lg shadow-[#111c22]/10">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-[#8fd6cc]">synced</span>
            </div>
          </div>
        </div>
      ) : isXinjiang ? (
        <SimplePreview items={["估價入口", "工程案例", "BuildFlow"]} />
      ) : isQingyu ? (
        <SimplePreview items={["RWD layout", "SEO / OG", "Contact CTA"]} />
      ) : isPlanner ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-[#111c22] p-4 text-white shadow-lg shadow-[#111c22]/10">
            <div className="flex items-center justify-between gap-3 text-xs font-black">
              <span>推薦方案</span>
              <span className="text-[#8fd6cc]">LINE Bot 詢價</span>
            </div>
          </div>
          <PreviewChips items={["5 steps", "AI plan", "Contact CTA"]} />
        </div>
      ) : (
        <SimplePreview items={["RWD", "SEO", "CTA"]} />
      )}
    </div>
  )
}

function SimplePreview({ items }) {
  return (
    <div className="mt-4 grid gap-2">
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-[#e1dbcf] bg-white px-3 py-2 text-xs font-black text-[#40504c]">
          {item}
        </div>
      ))}
    </div>
  )
}

function PreviewChips({ items }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-black text-[#44504d]">
      {items.map((item) => (
        <span key={item} className="rounded-md border border-[#e1dbcf] bg-white py-2">
          {item}
        </span>
      ))}
    </div>
  )
}

export default StudioHome
