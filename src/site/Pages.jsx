import { Link, useParams } from "react-router-dom"
import ContactLeadSection from "../components/ContactLeadSection"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import WorkDemoPanel from "./WorkDemoPanels"
import { contact, pricing, projects, seo, serviceOfferings, serviceWorkflow } from "./content"

function PageShell({ page, eyebrow = "Qingyu Web Studio", title, intro, actions, heroVisual, children }) {
  return (
    <SiteLayout>
      <Seo page={page} />
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className={`mx-auto grid max-w-6xl gap-8 px-4 py-12 md:py-20 ${heroVisual ? "lg:grid-cols-[0.95fr_1.05fr] lg:items-center" : ""}`}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2rem,8vw,4.5rem)] font-black leading-[1.04] tracking-[-0.02em] text-[#111c22]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm font-bold leading-7 text-[#52605c] md:text-base md:leading-8">{intro}</p>
            {actions ? <div className="mt-7 grid gap-2 sm:flex sm:flex-wrap md:gap-3">{actions}</div> : null}
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
    <article className={`rounded-2xl border p-5 ${dark ? "border-[#233139] bg-[#111c22] text-white" : "border-[#e3ded3] bg-white"}`}>
      {children}
    </article>
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

function Tags({ items = [], max = 4 }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, max).map((item) => (
        <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
          {item}
        </span>
      ))}
    </div>
  )
}

function WorkPreview({ project }) {
  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-[#e6e0d5] bg-[#faf8f3] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Preview</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#52605c]">{project.price}</span>
      </div>
      <div className="mt-4 rounded-2xl bg-[#111c22] p-4 text-white shadow-lg shadow-[#111c22]/10">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">{project.title}</p>
          <span className="text-xs font-black text-[#8fd6cc]">{project.category}</span>
        </div>
        <div className="mt-4 grid gap-2">
          {(project.visuals || []).slice(0, 3).map((item) => (
            <div key={item} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-black text-white/82">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const sectionConfig = [
  {
    title: "可委託成品",
    text: "可以直接改成你的公司、店家或流程。",
    slugs: ["company-site", "tracking-system", "memberhub", "quiz-page", "buildflow", "linebot"],
  },
  {
    title: "技術展示",
    text: "展示 AI、RAG、互動與自動化能力。",
    slugs: ["ai-tech-quest", "tw-civic-rag", "ai-audit", "unity-ai-tutor"],
  },
]

export function WorksPage() {
  const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]))

  return (
    <PageShell page={seo.works} title="成品範例" intro="這些是可以改成你需求的網站與系統範例。">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-12">
          {sectionConfig.map((section) => (
            <div key={section.title}>
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black text-[#0d6b62]">Collection</p>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">{section.title}</h2>
                </div>
                <p className="max-w-xl text-sm font-bold leading-6 text-[#52605c]">{section.text}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.slugs.map((slug) => projectBySlug[slug]).filter(Boolean).map((project) => (
                  <WorkCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function WorkCard({ project }) {
  return (
    <article className="rounded-2xl border border-[#e3ded3] bg-white p-4 transition hover:-translate-y-1 hover:border-[#0d6b62] hover:shadow-xl hover:shadow-[#162321]/10 md:p-5">
      <WorkPreview project={project} />
      <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
      <h3 className="mt-3 text-xl font-black md:text-2xl">{project.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm font-bold leading-6 text-[#52605c]">{project.summary}</p>
      <div className="mt-4 hidden md:block">
        <Tags items={project.tags} max={3} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <ActionLink to={project.livePath} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white md:w-auto">
          {project.liveLabel || "查看成品"}
        </ActionLink>
        <ActionLink to={`/works/${project.slug}#tech`} className="hidden min-h-11 items-center rounded-md border border-[#cfd7d3] px-4 text-sm font-black text-[#111c22] md:inline-flex">
          技術拆解
        </ActionLink>
      </div>
    </article>
  )
}

export function WorkDetailPage({ slug: forcedSlug }) {
  const params = useParams()
  const slug = forcedSlug || params.slug
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
          <ActionLink to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            {project.liveLabel || "查看成品"}
          </ActionLink>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#0d6b62] bg-[#eef7f4] px-5 text-sm font-black text-[#0d6b62]">
            我想做類似的
          </Link>
          <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            回到成品列表
          </Link>
        </>
      }
      heroVisual={<HeroVisual project={project} />}
    >
      <section id="demo" className="scroll-mt-20 border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <WorkDemoPanel project={project} />
        </div>
      </section>

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3 md:py-16">
          <InfoBlock title="這個成品適合誰" items={project.audience || []} />
          <InfoBlock title="可以幫你解決什麼" items={[project.problem, project.solution].filter(Boolean)} />
          <InfoBlock title="你可以改哪些內容" items={project.customizable || []} />
        </div>
      </section>

      <section id="tech" className="scroll-mt-20 border-b border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 md:grid-cols-[0.72fr_1.28fr] md:py-16">
          <div>
            <p className="text-xs font-black text-[#0d6b62]">Tech</p>
            <h2 className="mt-3 text-3xl font-black">技術拆解</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">保留重點，細節依需求調整。</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {Object.entries(project.stack || {}).map(([label, value]) => (
              <Card key={label}>
                <p className="text-xs font-black text-[#0d6b62]">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3 md:py-16">
          <Card>
            <p className="text-sm font-black text-[#0d6b62]">參考價格</p>
            <p className="mt-3 text-2xl font-black">{project.price}</p>
          </Card>
          <Card>
            <p className="text-sm font-black text-[#0d6b62]">不包含項目</p>
            <div className="mt-3">
              <Tags items={project.excluded || []} max={6} />
            </div>
          </Card>
          <Card dark>
            <p className="text-sm font-black text-[#8fd6cc]">下一步</p>
            <p className="mt-3 text-2xl font-black">想做類似版本？</p>
            <div className="mt-5 grid gap-2">
              <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-4 text-sm font-black text-[#111c22]">
                我想做類似的
              </Link>
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/16 px-4 text-sm font-black text-white">
                回到成品列表
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  )
}

function HeroVisual({ project }) {
  return (
    <div className="rounded-[1.5rem] border border-[#e3ded3] bg-[#faf8f3] p-4 shadow-xl shadow-[#162321]/10">
      <WorkPreview project={project} />
      <div className="grid gap-2 sm:grid-cols-3">
        {(project.demo || []).slice(0, 3).map((item) => (
          <div key={item} className="rounded-xl border border-[#e3ded3] bg-white px-3 py-3 text-xs font-black text-[#40504c]">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

function InfoBlock({ title, items }) {
  return (
    <Card>
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.slice(0, 6).map((item) => (
          <span key={item} className="rounded-lg bg-[#faf8f3] px-3 py-2 text-xs font-black text-[#40504c]">
            {item}
          </span>
        ))}
      </div>
    </Card>
  )
}

export function ServicesPage() {
  return (
    <PageShell
      page={seo.services}
      title="服務與客製範圍"
      intro="先看成品，再選客製範圍。"
      actions={
        <>
          <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            查看成品
          </Link>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
        </>
      }
    >
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {serviceOfferings.map((service) => (
            <article key={service.id} className="rounded-2xl border border-[#e3ded3] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{service.price}</span>
                <ActionLink to={service.demoPath} className="text-sm font-black text-[#0d6b62]">
                  查看成品
                </ActionLink>
              </div>
              <h2 className="mt-4 text-2xl font-black">{service.name}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{service.summary}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <ServiceFact title="適合" text={service.targetUsers} />
                <ServiceFact title="交付" text={service.proof} />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <TagPanel title="包含" items={service.deliverables} />
                <TagPanel title="不包含" items={service.excluded} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e6e0d5] bg-[#faf8f3]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="mb-7">
            <p className="text-xs font-black text-[#0d6b62]">Process</p>
            <h2 className="mt-3 text-3xl font-black">合作方式</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {serviceWorkflow.map(([step, title, text]) => (
              <Card key={step}>
                <p className="text-xs font-black text-[#0d6b62]">{step}</p>
                <h3 className="mt-2 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}

function ServiceFact({ title, text }) {
  return (
    <div className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-4">
      <p className="text-sm font-black text-[#0d6b62]">{title}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
    </div>
  )
}

function TagPanel({ title, items }) {
  return (
    <div>
      <p className="text-sm font-black text-[#40504c]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-md bg-[#faf8f3] px-3 py-2 text-xs font-black text-[#40504c]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PricingPage() {
  return (
    <PageShell page={seo.pricing} title="價格參考" intro="實際價格會依內容、功能、修改次數與維護需求調整。">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricing.map(([name, price, text]) => (
            <Card key={name}>
              <h2 className="text-xl font-black">{name}</h2>
              <p className="mt-2 text-2xl font-black text-[#0d6b62]">{price}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-[#e3ded3] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5f4a2a]">
          錯誤修正與新增功能分開計算，第三方平台費用另計。
        </p>
      </section>
    </PageShell>
  )
}

export function FreeAuditPage() {
  return (
    <PageShell
      page={seo.audit}
      title="網站健檢"
      intro="先看網站 CTA、SEO、手機版與聯絡流程。"
      actions={
        <>
          <Link to="/works/ai-audit#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            查看 AI 健檢 Demo
          </Link>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
        </>
      }
    >
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {["CTA", "SEO", "手機版"].map((item) => (
            <Card key={item}>
              <p className="text-2xl font-black">{item}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

export function ContactPage() {
  return (
    <PageShell page={seo.contact} title="我想做類似的成品" intro="請告訴我你喜歡哪個成品、想改成什麼用途、需要哪些功能。">
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-2 md:py-12">
          <Card>
            <p className="text-sm font-black text-[#0d6b62]">LINE</p>
            <p className="mt-2 text-2xl font-black">{contact.lineId}</p>
            <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{contact.line}</p>
          </Card>
          <Card>
            <p className="text-sm font-black text-[#0d6b62]">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block break-words text-2xl font-black text-[#111c22]">
              {contact.email}
            </a>
          </Card>
        </div>
      </section>
      <ContactLeadSection />
    </PageShell>
  )
}
