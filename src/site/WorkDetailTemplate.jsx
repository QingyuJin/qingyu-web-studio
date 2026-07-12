import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

function Section({ children, className = "" }) {
  return <section className={`border-b border-[#e6e0d5] ${className}`}>{children}</section>
}

function SectionInner({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-4 py-14 md:py-18 ${className}`}>{children}</div>
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.5rem,4vw,2.5rem)] font-black leading-tight text-[#111c22]">{title}</h2>
      {text ? <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p> : null}
    </div>
  )
}

function Card({ title, text, tone = "light", children }) {
  const dark = tone === "dark"
  return (
    <div className={`rounded-xl border p-5 ${dark ? "border-[#233139] bg-[#111c22] text-white" : "border-[#e3ded3] bg-white"}`}>
      {title ? <p className={`text-sm font-black ${dark ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{title}</p> : null}
      {text ? <p className={`mt-2 text-sm font-bold leading-7 ${dark ? "text-white/72" : "text-[#52605c]"}`}>{text}</p> : null}
      {children}
    </div>
  )
}

function WorkDetailTemplate({ work }) {
  return (
    <SiteLayout>
      <Seo page={work.seo} />

      {/* Hero */}
      <section className="bg-[#111c22] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <Link to="/works" className="text-xs font-black text-white/50 hover:text-white/80">← 回作品總覽</Link>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">{work.category}</p>
          <h1 className="mt-4 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,6vw,3.8rem)] font-black leading-[1.12]">{work.title}</h1>
          <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-white/72 md:text-base">{work.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#eac46f] px-4 py-1.5 text-sm font-black text-[#111c22]">{work.price}</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-black text-white/80">工期約 {work.duration}</span>
            <span className="text-sm font-bold text-white/50">適合：{work.forWho}</span>
          </div>
        </div>
      </section>

      {/* 問題 */}
      <Section className="bg-[#faf8f3]">
        <SectionInner>
          <SectionTitle eyebrow="Problem" title={work.problem.title} text={work.problem.desc} />
          <div className="rounded-2xl border border-[#e3ded3] bg-white p-6">
            <p className="text-sm font-bold leading-7 text-[#b91c1c]">{work.problem.pain}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {work.problem.signs.map((s) => <span key={s} className="rounded-full border border-[#e3ded3] bg-[#faf8f3] px-3 py-1 text-xs font-black text-[#52605c]">{s}</span>)}
            </div>
          </div>
        </SectionInner>
      </Section>

      {/* 解法 */}
      <Section className="bg-white">
        <SectionInner>
          <SectionTitle eyebrow="Solution" title={work.solution.title} text={work.solution.desc} />
          <div className="grid gap-4 md:grid-cols-3">
            {work.solution.points.map((p) => (
              <Card key={p.title} title={p.title} text={p.text} />
            ))}
          </div>
        </SectionInner>
      </Section>

      {/* 成果 */}
      <Section className="bg-[#111c22] text-white">
        <SectionInner>
          <SectionTitle eyebrow="Result" title={work.result.title} text={work.result.desc} />
          <div className="grid gap-4 md:grid-cols-4">
            {work.result.metrics.map((m) => (
              <Card key={m.label} tone="dark" title={m.label} text={m.value} />
            ))}
          </div>
        </SectionInner>
      </Section>

      {/* 客戶見證 */}
      {work.testimonial ? (
        <Section className="bg-white">
          <SectionInner>
            <SectionTitle eyebrow="Testimonial" title={`${work.title} 怎麼說？`} />
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-8 text-center">
              <p className="text-lg font-bold leading-8 text-[#111c22]">"{work.testimonial.quote}"</p>
              <div className="mt-6">
                <p className="text-sm font-black text-[#0d6b62]">{work.testimonial.name}</p>
                <p className="text-sm font-bold text-[#52605c]">{work.testimonial.title}</p>
              </div>
            </div>
          </SectionInner>
        </Section>
      ) : null}

      {/* 操作展示 */}
      <Section className="bg-[#faf8f3]">
        <SectionInner>
          <SectionTitle eyebrow="Demo" title={work.demo.title} text={work.demo.desc} />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">前台 · 客戶看到的</p>
              <work.demo.Front />
            </div>
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">後台 · 你管理的</p>
              <work.demo.Back />
            </div>
          </div>
          {work.demo.livePath ? (
            <div className="mt-6 text-center">
              <Link to={work.demo.livePath} className="inline-flex min-h-12 items-center rounded-xl bg-[#111c22] px-6 text-sm font-black text-white transition hover:bg-[#0d6b62]">
                打開完整操作畫面 ↗
              </Link>
            </div>
          ) : null}
        </SectionInner>
      </Section>

      {/* 流程 */}
      <Section className="bg-white">
        <SectionInner>
          <SectionTitle eyebrow="Flow" title={work.flow.title} text={work.flow.desc} />
          <div className="grid gap-3 md:grid-cols-4">
            {work.flow.steps.map((step, i) => (
              <div key={step.title} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-5">
                <span className="font-mono text-sm font-black text-[#0d6b62]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-black text-[#111c22]">{step.title}</h3>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{step.text}</p>
              </div>
            ))}
          </div>
        </SectionInner>
      </Section>

      {/* 交付內容 */}
      <Section className="bg-[#faf8f3]">
        <SectionInner>
          <SectionTitle eyebrow="Deliverables" title={work.deliverables.title} text={work.deliverables.desc} />
          <div className="grid gap-3 md:grid-cols-3">
            {work.deliverables.items.map((item) => (
              <Card key={item.title} title={item.title} text={item.items.map((i) => `・${i}`).join("\n")} />
            ))}
          </div>
        </SectionInner>
      </Section>

      {/* 價格 */}
      <Section className="bg-white">
        <SectionInner>
          <SectionTitle eyebrow="Pricing" title={work.pricing.title} text={work.pricing.desc} />
          <div className="overflow-hidden rounded-2xl border border-[#e3ded3] bg-white">
            {work.pricing.plans.map((plan, i) => (
              <div key={plan.name} className={`grid gap-1 p-5 sm:grid-cols-[1fr_auto] sm:items-center ${i > 0 ? "border-t border-[#eee9df]" : ""}`}>
                <div>
                  <p className="text-base font-black text-[#111c22]">{plan.name}</p>
                  <p className="mt-0.5 text-sm font-bold text-[#52605c]">{plan.note}</p>
                </div>
                <p className="text-lg font-black text-[#0d6b62] sm:text-right">{plan.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {work.techStack.map((t) => (
              <span key={t} className="rounded-md bg-white px-2.5 py-1 text-[11px] font-black text-[#8a938f] ring-1 ring-[#e3ded3]">{t}</span>
            ))}
          </div>
        </SectionInner>
      </Section>

      {/* 詢價 CTA */}
      <section className="bg-[#111c22] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center md:py-18">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">想做一套像這樣的{work.title}？</h2>
          <p className="max-w-xl text-sm font-bold leading-7 text-white/72">{work.price}，工期約 {work.duration}。先聊聊你的需求，給你適合的做法與報價。</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to={`/contact?case=${encodeURIComponent(work.title)}`} className="inline-flex min-h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]">
              問這個報價
            </Link>
            {work.demo.livePath ? (
              <Link to={work.demo.livePath} className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10">
                直接操作看看
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default WorkDetailTemplate
