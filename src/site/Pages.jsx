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
      <section className="relative overflow-hidden border-b border-[#ece4d8] bg-[#fbfaf7]">
        <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,#f5efe4,rgba(245,239,228,0))]" />
        <div className={`relative mx-auto grid max-w-6xl gap-9 px-4 py-12 md:py-18 ${heroVisual ? "lg:grid-cols-[0.9fr_1.1fr] lg:items-center" : ""}`}>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2rem,7vw,4.65rem)] font-black leading-[1.04] tracking-[-0.035em] text-[#111c22]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base md:leading-8">{intro}</p>
            {actions ? <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          </div>
          {heroVisual ? <div>{heroVisual}</div> : null}
        </div>
      </section>
      {children}
    </SiteLayout>
  )
}

function Card({ children, dark = false, className = "" }) {
  return (
    <article className={`rounded-[1.35rem] border p-5 shadow-sm ${dark ? "border-[#233139] bg-[#111c22] text-white" : "border-[#e6ded2] bg-white"} ${className}`}>
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

const sections = [
  {
    title: "可委託成品",
    text: "可以改成你的公司、店家或流程。",
    slugs: ["company-site", "tracking-system", "memberhub", "quiz-page", "buildflow", "linebot"],
  },
  {
    title: "技術展示",
    text: "AI、RAG、互動與自動化能力展示。",
    slugs: ["ai-tech-quest", "tw-civic-rag", "ai-audit", "unity-ai-tutor"],
  },
]

export function WorksPage() {
  const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project]))

  return (
    <PageShell page={seo.works} title="成品範例" intro="可以直接看畫面，再改成你的需求。">
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-18">
        <div className="grid gap-14">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Collection</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.02em]">{section.title}</h2>
                </div>
                <p className="max-w-xl text-sm font-bold leading-6 text-[#52605c]">{section.text}</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
    <article className="rounded-[1.55rem] border border-[#e6ded2] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#18231f]/8">
      <WorkPreview project={project} />
      <p className="mt-5 text-xs font-black text-[#0d6b62]">{project.price}</p>
      <h3 className="mt-2 text-2xl font-black tracking-[-0.02em]">{project.title}</h3>
      <p className="mt-3 line-clamp-2 min-h-12 text-sm font-bold leading-6 text-[#52605c]">{project.summary}</p>
      <div className="mt-4 hidden md:block">
        <Tags items={project.tags} max={2} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <ActionLink to={project.livePath} className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#111c22] px-4 text-sm font-black text-white md:w-auto">
          {project.liveLabel || "查看成品"}
        </ActionLink>
        <ActionLink to={`/works/${project.slug}#tech`} className="hidden min-h-11 items-center rounded-full border border-[#d8d2c5] px-4 text-sm font-black text-[#111c22] md:inline-flex">
          技術拆解
        </ActionLink>
      </div>
    </article>
  )
}

function WorkPreview({ project }) {
  return (
    <div className="rounded-[1.25rem] border border-[#e5ddd0] bg-[#fbfaf7] p-3">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0c36a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#d8d2c5]" />
      </div>
      <div className="mt-4 min-h-44 rounded-2xl bg-[#111c22] p-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">{project.title}</p>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-black text-white/68">{project.category}</span>
        </div>
        <div className="mt-5 grid gap-2">
          {(project.visuals || []).slice(0, 3).map((item) => (
            <div key={item} className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white/78">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
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
          <ActionLink to={project.livePath} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111c22] px-5 text-sm font-black text-white">
            {project.liveLabel || "查看成品"}
          </ActionLink>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d2c5] bg-white px-5 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
          <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-full px-2 text-sm font-black text-[#0d6b62]">
            回到成品列表
          </Link>
        </>
      }
      heroVisual={<HeroVisual project={project} />}
    >
      <section id="demo" className="scroll-mt-20 border-b border-[#ece4d8] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <WorkDemoPanel project={project} />
        </div>
      </section>

      <section className="border-b border-[#ece4d8] bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-3 md:py-18">
          <InfoBlock title="適合誰" items={project.audience || []} />
          <InfoBlock title="解決什麼" items={[project.problem, project.solution].filter(Boolean)} />
          <InfoBlock title="可改內容" items={project.customizable || []} />
        </div>
      </section>

      <section id="tech" className="scroll-mt-20 border-b border-[#ece4d8] bg-white">
        <div className="mx-auto grid max-w-6xl gap-7 px-4 py-14 md:grid-cols-[0.72fr_1.28fr] md:py-18">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Tech</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.02em]">技術拆解</h2>
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

      <section className="bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-14 md:grid-cols-3 md:py-18">
          <Card>
            <p className="text-sm font-black text-[#0d6b62]">參考價格</p>
            <p className="mt-3 text-2xl font-black">{project.price}</p>
          </Card>
          <Card>
            <p className="text-sm font-black text-[#0d6b62]">後續可加</p>
            <div className="mt-3">
              <Tags items={project.future || []} max={6} />
            </div>
          </Card>
          <Card dark>
            <p className="text-sm font-black text-[#8fd6cc]">Next</p>
            <p className="mt-3 text-2xl font-black">想做類似版本？</p>
            <div className="mt-5 grid gap-2">
              <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 text-sm font-black text-[#111c22]">
                我想做類似的
              </Link>
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/16 px-4 text-sm font-black text-white">
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
    <div className="rounded-[1.75rem] border border-[#e6ded2] bg-white p-4 shadow-2xl shadow-[#17231f]/10">
      <WorkPreview project={project} />
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(project.demo || []).slice(0, 3).map((item) => (
          <div key={item} className="rounded-2xl border border-[#eee7dd] bg-[#fbfaf7] px-3 py-3 text-xs font-black text-[#40504c]">
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
      <h2 className="text-xl font-black tracking-[-0.01em]">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.slice(0, 5).map((item) => (
          <span key={item} className="rounded-full bg-[#fbfaf7] px-3 py-2 text-xs font-black text-[#40504c]">
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
          <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111c22] px-5 text-sm font-black text-white">
            查看成品
          </Link>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d2c5] bg-white px-5 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
        </>
      }
    >
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-18">
        <div className="grid gap-5 lg:grid-cols-2">
          {serviceOfferings.map((service) => (
            <article key={service.id} className="rounded-[1.55rem] border border-[#e6ded2] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{service.price}</span>
                <ActionLink to={service.demoPath} className="text-sm font-black text-[#0d6b62]">
                  查看成品
                </ActionLink>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.02em]">{service.name}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{service.summary}</p>
              <div className="mt-5">
                <TagPanel title="交付重點" items={service.deliverables} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#ece4d8] bg-[#fbfaf7]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <div className="mb-7">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Process</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.02em]">合作方式</h2>
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

function TagPanel({ title, items }) {
  return (
    <div>
      <p className="text-sm font-black text-[#40504c]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-[#fbfaf7] px-3 py-2 text-xs font-black text-[#40504c]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PricingPage() {
  return (
    <PageShell page={seo.pricing} title="價格參考" intro="實際價格依內容、功能、修改次數與維護需求調整。">
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-18">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricing.map(([name, price, text]) => (
            <Card key={name}>
              <h2 className="text-xl font-black tracking-[-0.01em]">{name}</h2>
              <p className="mt-2 text-2xl font-black text-[#0d6b62]">{price}</p>
              <p className="mt-3 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border border-[#e6ded2] bg-[#fffaf0] p-4 text-sm font-bold leading-7 text-[#5f4a2a]">
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
          <Link to="/works/ai-audit#demo" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#111c22] px-5 text-sm font-black text-white">
            查看 AI 健檢
          </Link>
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d2c5] bg-white px-5 text-sm font-black text-[#111c22]">
            我想做類似的
          </Link>
        </>
      }
    >
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-18">
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
    <PageShell page={seo.contact} title="我想做類似的成品" intro="告訴我你喜歡哪個成品、想改成什麼用途。">
      <section className="border-b border-[#ece4d8] bg-white">
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
