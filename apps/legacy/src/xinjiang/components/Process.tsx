import { processSteps } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionTitle eyebrow="Process" title="施工流程" text="先看現場，再談做法。工項與報價盡量說清楚。" />
      <div className="mt-10 grid gap-3">
        {processSteps.map(([step, title, text], index) => (
          <div
            key={step}
            className="relative grid gap-4 rounded-[1.35rem] border border-[#e5d6be] bg-white/72 p-5 shadow-[0_12px_36px_rgba(58,45,31,0.05)] md:grid-cols-[5.5rem_0.55fr_1fr] md:items-center"
          >
            {index < processSteps.length - 1 ? (
              <span className="absolute -bottom-3 left-11 hidden h-3 w-px bg-[#c9b391] md:block" aria-hidden="true" />
            ) : null}
            <span className="font-kai grid h-14 w-14 place-items-center rounded-full border-2 border-[#b95e2f]/35 bg-[#f7ecd8] text-2xl font-bold text-[#b95e2f]">
              {step}
            </span>
            <h3 className="font-kai text-2xl font-bold text-[#2b2118]">{title}</h3>
            <p className="text-sm font-semibold leading-7 text-[#766858]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
