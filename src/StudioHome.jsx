import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { audience, contact, pricing, processSteps, projects, seo, serviceCategories, techStack } from "./site/content"

function StudioHome() {
  const featuredProjects = projects.filter((project) => project.featured !== false)
  const plannerCard = {
    slug: "project-planner",
    title: "網站需求診斷",
    category: "互動工具",
    summary: "回答幾個問題，快速判斷適合品牌網站、作品集、LINE Bot、AI 工具還是小型系統。",
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
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[1fr_0.72fr] md:items-center md:py-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-2xl text-[clamp(2.55rem,8vw,5rem)] font-black leading-[1.02] tracking-tight">
              讓你的服務被看懂
            </h1>
            <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
              我協助台灣個人品牌、小型店家、工作室與學生，製作乾淨好懂的網站、互動功能、LINE Bot、AI 工具與簡易管理系統。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
                看作品
              </Link>
              <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                聊聊需求
              </Link>
              <Link to="/tools/project-planner" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                需求診斷
              </Link>
            </div>
          </div>
          <QuietMockup />
        </div>
      </section>

      <Section eyebrow="Services" title="我可以幫你做">
        <div className="grid gap-3 md:grid-cols-5">
          {serviceCategories.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#e3ded3] bg-white p-5">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5a6461]">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-black">不知道要做哪種網站？</h3>
            <p className="mt-2 max-w-2xl text-sm font-bold leading-7 text-[#5a6461]">
              用 1 分鐘回答幾個問題，我會幫你判斷適合品牌網站、作品集、LINE Bot、AI 工具還是小型系統。
            </p>
          </div>
          <Link to="/tools/project-planner" className="mt-4 inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white md:mt-0">
            開始需求診斷
          </Link>
        </div>
      </Section>

      <Section eyebrow="Works" title="精選作品">
        <div className="grid gap-4 md:grid-cols-2">
          {featuredCards.map((project) => (
            <article
              key={project.slug}
              className="rounded-xl border border-[#e3ded3] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg"
            >
              <ProjectPreview project={project} />
              <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{project.title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5a6461]">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={project.livePath} className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white hover:bg-[#26343b]">
                  {project.liveLabel}
                </Link>
                <Link to={project.secondaryPath || `/works/${project.slug}#tech`} className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                  {project.secondaryLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Demo Lab</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">互動作品入口</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">
                這些不是靜態截圖，而是可以直接點進去操作的網站、AI、LINE Bot、API 與後台流程 Demo。
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {featuredCards.map((project) => (
                <Link
                  key={project.slug}
                  to={project.slug === "project-planner" ? "/tools/project-planner" : `/works/${project.slug}`}
                  className="rounded-lg border border-[#ded8cb] bg-white p-3 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"
                >
                  <span className="block text-xs text-[#0d6b62]">{project.category}</span>
                  <span className="mt-1 block leading-5">{project.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e6e0d5] bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Technical</p>
            <h2 className="mt-3 text-[clamp(2rem,6vw,3.2rem)] font-black tracking-tight">不只做版面</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#5a6461]">
              首頁可以安靜好懂，點進作品時再看到系統、AI、LINE、API 與後台能力。
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

      <Section eyebrow="Process" title="製作流程">
        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map(([num, title, text]) => (
            <article key={num} className="rounded-xl border border-[#e3ded3] bg-white p-5">
              <p className="text-xs font-black text-[#0d6b62]">{num}</p>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5a6461]">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="For Taiwan Clients" title="適合對象">
        <div className="flex flex-wrap gap-2">
          {audience.map((item) => (
            <span key={item} className="rounded-full border border-[#ddd6c9] bg-white px-4 py-2 text-sm font-black text-[#2f3c3b]">
              {item}
            </span>
          ))}
        </div>
      </Section>

      <section className="border-y border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Pricing</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3.2rem)] font-black tracking-tight">價格依需求估</h2>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#5a6461]">
            不在首頁主打廉價。小型網站可從基礎方案開始，系統與 AI 工具依功能和資料流程估價。
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricing.map(([name, price, text]) => (
              <article key={name} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
                <h3 className="text-xl font-black">{name}</h3>
                <p className="mt-2 text-2xl font-black text-[#0d6b62]">{price}</p>
                <p className="mt-3 text-sm font-bold leading-7 text-[#5a6461]">{text}</p>
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
              可以先傳你的服務、舊網站、想做的功能或預算範圍。我會幫你抓最小可行方向。
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

function QuietMockup() {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
      <div className="rounded-xl border border-[#e3ded3] bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#eee9df] pb-3">
          <span className="text-xs font-black text-[#0d6b62]">Project preview</span>
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">RWD</span>
        </div>
        <div className="mt-5 space-y-3">
          {["品牌網站", "LINE Bot", "AI 工具", "Dashboard UI"].map((item, index) => (
            <div key={item} className="rounded-lg border border-[#eee9df] bg-[#faf8f3] p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{item}</p>
                <span className="text-xs font-black text-[#0d6b62]">0{index + 1}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e4e9e6]">
                <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${48 + index * 13}%` }} />
              </div>
            </div>
          ))}
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
    <div className="mb-5 min-h-44 rounded-lg border border-[#e6e0d5] bg-[#faf8f3] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black text-[#0d6b62]">{project.category}</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#53605d]">Preview</span>
      </div>

      {isBuildFlow ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg bg-[#111c22] p-3 text-white">
            <div className="flex items-center justify-between gap-3 text-xs font-black">
              <span>q-001 工程案件</span>
              <span className="text-[#8fd6cc]">75%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/15">
              <div className="h-full w-3/4 rounded-full bg-[#8fd6cc]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-black text-[#44504d]">
            {["LINE 回報", "驗收", "請款"].map((item) => (
              <span key={item} className="rounded-md border border-[#e1dbcf] bg-white py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : isLineBot ? (
        <div className="mt-4 grid gap-2">
          {["客戶：想預約服務", "Bot：請留下時間", "後台：新增需求"].map((item) => (
            <div key={item} className="rounded-lg border border-[#e1dbcf] bg-white px-3 py-2 text-xs font-black text-[#40504c]">
              {item}
            </div>
          ))}
        </div>
      ) : isAudit ? (
        <div className="mt-4 grid gap-2">
          {["首頁文案 82", "CTA 清楚度 76", "手機版信任感 88"].map((item, index) => (
            <div key={item} className="rounded-lg bg-white p-3">
              <div className="flex justify-between text-xs font-black text-[#40504c]">
                <span>{item}</span>
                <span>{index === 0 ? "A-" : index === 1 ? "B+" : "A"}</span>
              </div>
            </div>
          ))}
        </div>
      ) : isApi ? (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-black text-[#40504c]">
            {["Form", "API", "DB", "Notify"].map((item) => (
              <span key={item} className="rounded-md bg-white py-2">
                {item}
              </span>
            ))}
          </div>
          <div className="rounded-lg bg-[#111c22] p-3 text-xs font-black text-white">
            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-[#8fd6cc]">synced</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/15">
              <div className="h-full w-5/6 rounded-full bg-[#8fd6cc]" />
            </div>
          </div>
        </div>
      ) : isXinjiang ? (
        <div className="mt-4 grid gap-3">
          <div className="rounded-lg bg-white p-3">
            <div className="h-3 w-2/3 rounded-full bg-[#111c22]" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["服務", "案例", "估價"].map((item) => (
                <span key={item} className="rounded-md bg-[#f1ede4] py-2 text-center text-[11px] font-black text-[#40504c]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#e1dbcf] bg-white px-3 py-2 text-xs font-black text-[#40504c]">
            估價入口 → 後台概念
          </div>
        </div>
      ) : isQingyu ? (
        <div className="mt-4 grid gap-2">
          {["RWD layout", "SEO / OG", "Contact CTA"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs font-black text-[#40504c]">
              <span>{item}</span>
              <span className="text-[#0d6b62]">OK</span>
            </div>
          ))}
        </div>
      ) : isPlanner ? (
        <div className="mt-4 grid gap-3">
          <div className="rounded-lg bg-[#111c22] p-3 text-white">
            <div className="flex items-center justify-between gap-3 text-xs font-black">
              <span>推薦方案</span>
              <span className="text-[#8fd6cc]">LINE Bot 詢價</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white/15">
              <div className="h-full w-2/3 rounded-full bg-[#8fd6cc]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-black text-[#44504d]">
            {["5 步驟", "AI 規劃", "Contact CTA"].map((item) => (
              <span key={item} className="rounded-md border border-[#e1dbcf] bg-white py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-[#e1dbcf] bg-white p-3">
          <div className="h-3 w-2/3 rounded-full bg-[#111c22]" />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-16 rounded-md bg-[#eef7f4]" />
            <div className="h-16 rounded-md bg-[#f1ede4]" />
          </div>
        </div>
      )}
    </div>
  )
}

export default StudioHome
