import { servicePlans } from "../data/portfolioContent"

function ServicePlansSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
            Service Plans
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            服務方案：從網站到流程系統
          </h2>
          <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">
            不先綁死價格，而是依照你的資料量、流程複雜度與上線目標，切成能交付的階段。
          </p>
        </div>
        <p className="rounded-full border border-[#d8d4c8] bg-white px-4 py-2 text-sm font-black text-[#8b5a25]">
          價格皆依需求報價
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {servicePlans.map((plan) => (
          <article
            key={plan.id}
            className="flex min-h-full flex-col rounded-lg border border-[#d8d4c8] bg-white p-6 shadow-sm"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e]">
                {plan.price}
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#172026]">{plan.name}</h3>
            </div>

            <div className="mt-5 grid gap-4">
              <PlanBlock title="適合誰" text={plan.fit} />
              <PlanBlock title="能解決什麼" text={plan.solves} />
              <div>
                <p className="text-sm font-black text-[#40514f]">會交付什麼</p>
                <ul className="mt-3 grid gap-2">
                  {plan.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-md bg-[#f8f7f2] px-3 py-2 text-sm font-bold text-[#5d6863]"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#0f766e]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
            >
              {plan.cta}
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function PlanBlock({ title, text }) {
  return (
    <div>
      <p className="text-sm font-black text-[#40514f]">{title}</p>
      <p className="mt-2 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
    </div>
  )
}

export default ServicePlansSection
