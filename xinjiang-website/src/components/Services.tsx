import { services } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionTitle eyebrow="Services" title="服務項目" text="泥作、水泥、磁磚、油漆、拆除與裝修，可到場評估後討論做法。" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-[1.5rem] border border-[#e5d6be] bg-white/72 p-6 shadow-[0_16px_45px_rgba(58,45,31,0.06)]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f2dfc0] text-sm font-black text-[#9b4f28]">匠</span>
            <h3 className="mt-5 text-xl font-black text-[#2b2118]">{service.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#766858]">{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
