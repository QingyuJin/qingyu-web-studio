import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { audience, contact, pricing, processSteps, projects, seo, serviceCategories, techStack } from "./site/content"

function StudioHome() {
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
      </Section>

      <Section eyebrow="Works" title="精選作品">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/works/${project.slug}`}
              className="group rounded-xl border border-[#e3ded3] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg"
            >
              <p className="text-xs font-black text-[#0d6b62]">{project.category}</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight">{project.title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5a6461]">{project.summary}</p>
              <span className="mt-5 inline-flex text-sm font-black text-[#0d6b62] group-hover:text-[#111c22]">查看作品 →</span>
            </Link>
          ))}
        </div>
      </Section>

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

export default StudioHome
