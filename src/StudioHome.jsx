import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, pageSeo, pricing, services, techItems, works } from "./site/siteData"

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={pageSeo.home} />

      <section className="border-b border-[#e5e1d7] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1fr_0.8fr] md:items-center md:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Qingyu Web Studio</p>
            <h1 className="mt-4 max-w-2xl text-[clamp(2.35rem,8vw,4.75rem)] font-black leading-[1.04] tracking-tight">
              做一個能被看懂的網站
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#4f5d59] md:text-lg">
              我協助學生、小型店家、個人品牌與工作室，製作作品集、一頁式網站、形象網站與簡易互動功能。從設計、RWD、表單、LINE 連結到 Vercel 部署上線。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#26343b]">
                看作品
              </Link>
              <Link to="/free-audit" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#ccd6d2] bg-white px-5 text-sm font-black text-[#172026] hover:border-[#0f766e] hover:text-[#0f766e]">
                免費網站健檢
              </Link>
            </div>
          </div>
          <WebsiteMockup />
        </div>
      </section>

      <Section id="services" eyebrow="Services" title="我可以幫你做">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#e1ddd2] bg-white p-5">
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-[#e5e1d7] bg-[#f3f1ea]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Technical</p>
            <h2 className="mt-3 text-[clamp(1.8rem,6vw,3rem)] font-black tracking-tight">不只做版面</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">
              網站要好看，也要能在手機上清楚閱讀、能分享、能被搜尋、能讓人聯絡。技術會放在背後，把流程做穩。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {techItems.map((item) => (
              <div key={item} className="rounded-xl border border-[#d9d4c8] bg-white px-4 py-3 text-sm font-black text-[#40514f]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section id="works" eyebrow="Works" title="作品案例">
        <div className="grid gap-4 md:grid-cols-2">
          {works.map((work) => (
            <article key={work.title} className="rounded-xl border border-[#e1ddd2] bg-white p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">{work.label}</span>
              </div>
              <h3 className="mt-4 text-xl font-black">{work.title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{work.description}</p>
              <Link to={work.path} className="mt-5 inline-flex text-sm font-black text-[#0f766e] hover:text-[#172026]">
                查看 →
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <section className="border-y border-[#e5e1d7] bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Free Audit</p>
            <h2 className="mt-3 text-[clamp(1.8rem,6vw,3rem)] font-black tracking-tight">不知道網站哪裡怪？</h2>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#5d6863]">
              你可以丟舊網站或想法給我，我幫你看手機版、首頁文案、CTA、SEO、版面信任感。
            </p>
          </div>
          <Link to="/free-audit" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#26343b]">
            開始健檢
          </Link>
        </div>
      </section>

      <Section eyebrow="Pricing" title="簡單好懂的方案">
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map(([name, price, text]) => (
            <article key={name} className="rounded-xl border border-[#e1ddd2] bg-white p-5">
              <h3 className="text-xl font-black">{name}</h3>
              <p className="mt-2 text-2xl font-black text-[#0f766e]">{price}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <section id="contact" className="border-t border-[#e5e1d7] bg-[#172026] text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#83d4c8]">Contact</p>
            <h2 className="mt-3 text-[clamp(1.8rem,6vw,3rem)] font-black tracking-tight">先聊聊你的網站</h2>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-white/72">
              告訴我你想做哪種網站、目前有沒有舊網站、希望什麼時候上線。我會先幫你抓最小可行方向。
            </p>
          </div>
          <div className="grid gap-3">
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] hover:bg-[#ffd785]">
              {contact.email}
            </a>
            <p className="text-sm font-bold text-white/60">{contact.line}</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function Section({ eyebrow, title, children, id }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 max-w-2xl">
        {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">{eyebrow}</p> : null}
        <h2 className="mt-3 text-[clamp(1.8rem,6vw,3rem)] font-black tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function WebsiteMockup() {
  return (
    <div className="rounded-[1.4rem] border border-[#d7d2c6] bg-[#f7f4ed] p-3 shadow-sm">
      <div className="rounded-[1rem] border border-[#e1ddd2] bg-white p-4">
        <div className="flex items-center justify-between border-b border-[#eee9df] pb-3">
          <span className="text-xs font-black text-[#0f766e]">mobile-first site</span>
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">RWD</span>
        </div>
        <div className="mt-4 grid gap-3">
          <div className="h-24 rounded-xl bg-[#eef7f4]" />
          {["服務看得懂", "作品有重點", "聯絡入口清楚"].map((item, index) => (
            <div key={item} className="rounded-lg border border-[#eee9df] bg-[#fbfaf7] p-3">
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#172026] text-xs font-black text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-black">{item}</p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e6ede9]">
                <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${52 + index * 16}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudioHome
