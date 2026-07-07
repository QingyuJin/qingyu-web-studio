import { services } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionTitle eyebrow="Services" title="服務項目" text="泥作、水泥、磁磚、油漆、拆除與裝修，可到場評估後討論做法。" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="group overflow-hidden rounded-[1.5rem] border border-[#e5d6be] bg-white/72 shadow-[0_16px_45px_rgba(58,45,31,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(58,45,31,0.14)]"
          >
            <div className="photo-zoom relative">
              <img
                src={service.image}
                alt={`${service.title}施工照片`}
                loading="lazy"
                className="aspect-[16/8] w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0)_46%,rgba(17,16,14,0.55))]" />
              <span className="font-kai absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[#ffd45a]/60 bg-[#11100e]/76 text-lg font-bold text-[#ffd45a] backdrop-blur">
                {service.numeral}
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-kai text-2xl font-bold text-[#2b2118]">{service.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#766858]">{service.text}</p>
              <a href="#inquiry" className="mt-4 inline-flex text-sm font-black text-[#a05c2e] group-hover:text-[#7d411c]">
                詢問這項工程 →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
