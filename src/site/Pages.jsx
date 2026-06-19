import { Link, useParams } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { contact, pricing, projects, seo, serviceCategories } from "./content"

function PageShell({ page, eyebrow = "Qingyu Web Studio", title, intro, children }) {
  return (
    <SiteLayout>
      <Seo page={page} />
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.35rem,8vw,4.7rem)] font-black leading-[1.04] tracking-tight">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#52605c]">{intro}</p>
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
  return (
    <PageShell page={seo.works} title="作品案例" intro="首頁安靜好懂，作品頁展現技術力。這裡放精選 Demo 與系統概念。">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} to={`/works/${project.slug}`} className="rounded-xl border border-[#e3ded3] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg">
              <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
              <h2 className="mt-3 text-2xl font-black">{project.title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{project.summary}</p>
              <span className="mt-5 inline-flex text-sm font-black text-[#0d6b62]">看作品頁 →</span>
            </Link>
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
    <PageShell page={projectSeo} eyebrow={project.category} title={project.title} intro={project.summary}>
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

      <section className="border-y border-[#e6e0d5] bg-[#f2efe7]">
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
              <Tags items={project.architecture} />
            </div>
          </div>
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
