import { Link } from "react-router-dom"

export function PageHero({ eyebrow, title, children, actions, visual }) {
  return (
    <section className="border-b border-[#dedbd1] bg-[#f1eee5]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1fr_0.85fr] md:items-center md:py-16">
        <div>
          {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">{eyebrow}</p> : null}
          <h1 className="mt-3 text-[clamp(2.2rem,8vw,4.8rem)] font-black leading-[1.04] tracking-tight text-[#172026]">
            {title}
          </h1>
          <div className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#4f5d59]">{children}</div>
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {visual ? <div>{visual}</div> : null}
      </div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">{eyebrow}</p> : null}
      <h2 className="mt-3 text-[clamp(1.8rem,6vw,2.7rem)] font-black leading-tight tracking-tight text-[#172026]">
        {title}
      </h2>
      {children ? <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">{children}</p> : null}
    </div>
  )
}

export function PrimaryLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
    >
      {children}
    </Link>
  )
}

export function SecondaryLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#172026] hover:border-[#0f766e] hover:text-[#0f766e]"
    >
      {children}
    </Link>
  )
}

export function Card({ children, className = "" }) {
  return <article className={`rounded-xl border border-[#d8d4c8] bg-white p-5 shadow-sm ${className}`}>{children}</article>
}

export function TagList({ items, dark = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full px-3 py-1 text-xs font-black ${
            dark ? "bg-white/10 text-white" : "border border-[#e0ddd3] bg-[#f8f7f2] text-[#5d6863]"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export function FinalCta({ title = "不確定你適合哪種網站？", text, primary = "免費網站健檢", secondary = "聯絡我" }) {
  return (
    <section className="border-t border-[#dedbd1] bg-[#eef7f4]">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#172026]">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-[#5d6863]">
            {text || "可以先丟給我你的需求或舊網站，我幫你看怎麼改最有效。"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryLink to="/free-audit">{primary}</PrimaryLink>
          <SecondaryLink to="/contact">{secondary}</SecondaryLink>
        </div>
      </div>
    </section>
  )
}

export function MockWebsiteVisual() {
  return (
    <div className="rounded-[1.5rem] border border-[#172026] bg-[#172026] p-2 shadow-xl">
      <div className="overflow-hidden rounded-[1.15rem] bg-[#f8f7f2]">
        <div className="flex items-center justify-between border-b border-[#dedbd1] bg-white px-4 py-3">
          <span className="text-xs font-black">mobile-first website</span>
          <span className="rounded-full bg-[#eef7f4] px-2 py-1 text-[0.65rem] font-black text-[#0f766e]">
            RWD
          </span>
        </div>
        <div className="grid gap-3 p-4">
          <div className="h-28 rounded-xl bg-gradient-to-br from-[#d9e8e3] to-[#f5e2b5]" />
          {["服務看得懂", "案例有說服力", "LINE / 表單 CTA"].map((item, index) => (
            <div key={item} className="rounded-lg border border-[#dedbd1] bg-white p-3">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#eef7f4] text-xs font-black text-[#0f766e]">
                  {index + 1}
                </span>
                <p className="text-sm font-black text-[#40514f]">{item}</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf0ec]">
                <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${52 + index * 16}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
