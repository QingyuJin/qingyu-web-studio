import { servicePlans } from "../data/portfolioContent"

const painPoints = [
  ["訊息太亂", "客戶詢問、報價、回覆都散在 LINE。"],
  ["網站沒轉換", "只有介紹，沒有引導客戶留下需求。"],
  ["流程靠人工", "報價、施工、驗收、請款都靠自己記。"],
]

function ServicePlansSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-6 md:gap-8">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
            What I Build
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,7vw,2.25rem)] font-black tracking-tight md:text-4xl">
            網站不只要好看
          </h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863] sm:mt-4">
            真正有用的網站，應該能引導客戶、整理需求，甚至連到後台流程。
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {painPoints.map(([title, text]) => (
            <article key={title} className="rounded-lg border border-[#d8d4c8] bg-white p-4 shadow-sm md:p-5">
              <h3 className="text-lg font-black tracking-tight text-[#172026] md:text-xl">{title}</h3>
              <p className="mt-1.5 text-sm font-bold leading-6 text-[#5d6863] md:mt-2 md:leading-7">{text}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {servicePlans.map((plan) => (
            <article
              key={plan.id}
              className="flex min-h-full flex-col rounded-lg border border-[#d8d4c8] bg-white p-4 shadow-sm md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-normal text-[#0f766e]">{plan.price}</p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-[#172026] md:mt-3 md:text-2xl">{plan.name}</h3>
              <p className="mt-1 text-xs font-black text-[#0f766e]">適合：{plan.audience}</p>
              <p className="mt-1.5 text-sm font-black leading-6 text-[#40514f] md:mt-2 md:text-base">{plan.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
                {plan.deliverables.map((item, index) => (
                  <span
                    key={item}
                    className={`rounded-full border border-[#e0ddd3] bg-[#f8f7f2] px-3 py-1 text-xs font-black text-[#5d6863] ${
                      index > 2 ? "hidden md:inline-flex" : ""
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a] md:mt-6"
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicePlansSection
