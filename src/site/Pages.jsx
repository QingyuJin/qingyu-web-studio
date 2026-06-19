import { Link, useParams } from "react-router-dom"
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
            {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
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

export function WorksPage() {
  const categories = ["網站", "系統", "AI 工具", "LINE Bot", "工程流程系統"]

  return (
    <PageShell page={seo.works} title="作品案例" intro="首頁安靜好懂，作品頁展現技術力。這裡放精選 Demo 與系統概念。">
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
              <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
              <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.summary}</p>
              <Tags items={project.tags.slice(0, 4)} />
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={project.livePath} className="inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                  {project.liveLabel}
                </Link>
                <Link to={`/works/${project.slug}#tech`} className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] px-4 text-sm font-black text-[#111c22]">
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
  const projectSeo = {
    path: `/works/${project.slug}`,
    title: `${project.title}｜Qingyu Web Studio`,
    description: project.summary,
  }

  return (
    <PageShell
      page={projectSeo}
      eyebrow={project.category}
      title={project.title}
      intro={project.summary}
      actions={
        <>
          <Link to="#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            查看 Demo
          </Link>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            聯絡我
          </Link>
        </>
      }
      heroVisual={<HeroPreview project={project} />}
    >
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <WorkShowcase project={project} />
      </section>

      <section id="demo" className="mx-auto max-w-6xl px-4 pt-8">
        <div className="grid gap-5">
          <div className="rounded-xl border border-[#e3ded3] bg-white p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Live Demo</p>
                <h2 className="mt-2 text-2xl font-black">實際成品入口</h2>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">
                  這個案例連到專案裡已存在的成品頁或展示頁，作品頁則保留技術拆解。
                </p>
              </div>
              <Link to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                {project.liveLabel}
              </Link>
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
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">作品頁保留系統感，讓你看到我能做的不只是靜態版面。</p>
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
          <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">可以先聊需求，我會幫你判斷適合從網站、Demo、LINE Bot 還是小型後台開始。</p>
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

  return (
    <div className="rounded-2xl border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-xl shadow-[#111c22]/10 md:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Live Product Preview</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">Demo-ready</span>
      </div>

      {isLineBot ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[0.82fr_1fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-[#dff1e8] p-3 text-[#111c22]">
            {["客戶：我想預約諮詢", "Bot：請留下時間與需求", "後台：已建立案件"].map((item, index) => (
              <div key={item} className={`mb-2 max-w-[88%] rounded-2xl px-3 py-2 text-xs font-black ${index === 1 ? "bg-white" : "ml-auto bg-[#0d6b62] text-white"}`}>
                {item}
              </div>
            ))}
          </div>
          <HeroPreviewList items={["Webhook 已接收", "OpenAI 回覆草稿", "Supabase Inbox", "LINE Reply"]} />
        </div>
      ) : isBuildFlow ? (
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.82fr]">
          <div className="rounded-xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black">q-001 屋頂防水工程</p>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">施工中</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-3/4 rounded-full bg-[#0d6b62]" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black">
              {["報價", "回報", "驗收"].map((item) => <span key={item} className="rounded-md bg-[#faf8f3] py-2">{item}</span>)}
            </div>
          </div>
          <HeroPreviewList items={["LINE 每日回報", "照片已歸檔", "請款待建立", "保固可追蹤"]} />
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
              {[
                ["SEO", 78],
                ["CTA", 74],
                ["Trust", 88],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-[11px] font-black text-[#52605c]">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#e4e9e6]">
                    <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            {["首頁標題太長", "CTA 需要更明確", "手機版第一屏要收斂", "下一步：重排作品入口"].map((item, index) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/80">
                <span className="mr-2 text-[#8fd6cc]">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : isApi ? (
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {["Form", "API", "DB", "Notify", "Dashboard"].map((item, index) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-black text-[#8fd6cc]">0{index + 1}</p>
              <p className="mt-2 text-sm font-black">{item}</p>
              <div className="mt-3 h-1.5 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-[#8fd6cc]" style={{ width: `${58 + index * 9}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {project.visuals.map((item, index) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">0{index + 1}</p>
              <p className="mt-2 text-sm font-black">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HeroPreviewList({ items }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/80">
          {item}
        </div>
      ))}
    </div>
  )
}

function WorkShowcase({ project }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d8d2c5] bg-[#111c22] text-white shadow-xl shadow-[#111c22]/10">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            {project.architecture.slice(0, 4).map((item) => (
              <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/75">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-black">{project.title}</span>
              <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">Demo UI</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {project.visuals.map((item, index) => (
                <div key={item} className="rounded-lg bg-white p-3 text-[#111c22]">
                  <p className="text-xs font-black text-[#0d6b62]">0{index + 1}</p>
                  <p className="mt-2 text-sm font-black">{item}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-[#e4e9e6]">
                    <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${60 + index * 12}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-white/[0.03] p-5 md:p-8 lg:border-l lg:border-t-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Data Flow</p>
          <div className="mt-5 grid gap-3">
            {project.steps.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.05] p-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-[#111c22]">
                  {index + 1}
                </span>
                <p className="text-sm font-bold leading-6 text-white/78">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesPage() {
  return (
    <PageShell page={seo.services} title="服務分類" intro="講人話，不從技術名詞開始。先確認你要被誰看見，再決定網站和功能怎麼做。">
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
    <PageShell page={seo.pricing} title="價格依需求估" intro="小型網站可從基礎方案開始，系統與 AI 工具依需求估價。">
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
  return (
    <PageShell page={seo.audit} title="免費網站健檢" intro="不知道網站哪裡怪？你可以丟舊網站或想法給我，我幫你看手機版、首頁文案、CTA、SEO、版面信任感。">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {["手機版是否清楚", "首頁文案是否好懂", "CTA 是否明顯", "SEO / Open Graph", "信任感與作品呈現", "下一步修改建議"].map((item) => (
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
    <PageShell page={seo.contact} title="先聊聊你的網站" intro="LINE 明顯，Email 有，表單簡單。你可以先告訴我想做哪種網站、預算、功能和希望上線時間。">
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 md:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="text-2xl font-black">聯絡方式</h2>
          <a href={`mailto:${contact.email}`} className="mt-4 block text-lg font-black text-[#0d6b62]">{contact.email}</a>
          <p className="mt-3 text-sm font-bold text-[#52605c]">{contact.line}</p>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">可以先提供</h2>
          <ul className="mt-4 grid gap-2 text-sm font-bold leading-7 text-[#52605c]">
            <li>・你想服務的客群</li>
            <li>・想做網站、AI 工具、LINE Bot 或後台</li>
            <li>・是否有舊網站或參考網站</li>
            <li>・預算範圍與希望上線時間</li>
          </ul>
        </Card>
      </section>
    </PageShell>
  )
}
