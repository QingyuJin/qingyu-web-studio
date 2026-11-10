import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { StudioCta, SectionIntro } from "./StudioParts"
import { studioSeo, studioWorks } from "./studioContent"
import { studioWords } from "./studioWords"
import { getStudioServices, getWorkingSteps } from "./studioLocalizedContent"
import { getLocalizedWork } from "./portfolioI18n"
import { getHomeRevampCopy } from "./homeRevampContent"
import { estimateCopy } from "./estimatePolicy"
import { getTemplateEntryCopy } from "../onepage/templateEntry"
import ServicePackageCards from "./ServicePackageCards"

export default function ServicesPage() {
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const zh = locale === "zh-Hant"
  const services = getStudioServices(locale)
  const process = getWorkingSteps(locale)
  const home = getHomeRevampCopy(locale)
  const estimate = estimateCopy[locale] ?? estimateCopy["zh-Hant"]
  return (
    <SiteLayout>
      <Seo
        page={{
          ...studioSeo,
          path: "/services",
          title: zh ? "服務｜網站修改、一頁式網站與自動化｜Qingyu Web" : `${c.nav[1]}｜Qingyu Web`,
          description: estimate.seo[1],
          localizedCopy: true,
        }}
      />
      <main className="qy-page">
        <header className="qy-wrap qy-page-hero">
          <p className="qy-kicker">{c.kickers[7]}</p>
          <h1 className="qy-preline">{home.servicesTitle}</h1>
          <p className="qy-lead">{estimate.intro}</p>
          <Link className="qy-button" to="/contact" data-track="contact" data-placement="services_hero">{c.talk} ↗</Link>
        </header>
        <div className="qy-wrap">
          <ServicePackageCards locale={locale} />
          <section id="website-updates" className="qy-updates-story">
            <p className="qy-kicker">{c.includes}</p>
            <h2>{home.updatesTitle}</h2>
            <p>{home.updatesText}</p>
            <p className="qy-updates-scope">{home.updatesScope}</p>
            <Link className="qy-text-link" to="/contact?type=website-updates" data-track="contact" data-placement="service_updates">{c.talk} ↗</Link>
          </section>
          <section id="one-page" className="qy-updates-story qy-onepage-story">
            <p className="qy-kicker">{getTemplateEntryCopy(locale).label}</p><h2>{estimate.plans[1].name}</h2><p>{estimate.plans[1].included}</p><p className="qy-updates-scope">{estimate.rules[2]}</p>
            <div className="qy-actions"><Link className="qy-text-link" to={`/showcase?lang=${locale}`}>{getTemplateEntryCopy(locale).action} ↗</Link><Link className="qy-text-link" to="/contact?type=landing" data-track="contact" data-placement="service_onepage">{c.talk} ↗</Link></div>
          </section>
          {services.map((s, i) => {
            const work = studioWorks.find((item) => item.slug === s.slug)
            const local = getLocalizedWork(work, locale)
            return (
              <section id={s.id} key={s.id} className="qy-service-story">
                <div>
                  <p className="qy-kicker">
                    0{i + 1} / {c.includes}
                  </p>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                  <p style={{ marginTop: 18 }}>{s.result}</p>
                  <p className="qy-service-includes">
                    <span>{c.includes}</span>
                    {s.includes.split(" / ").map((label) => <span className="qy-service-term" key={label}>{label}</span>)}
                  </p>
                  <div className="qy-actions">
                    <Link className="qy-text-link" to={work.caseUrl}>
                      {c.caseStudy} ↗
                    </Link>
                    <Link className="qy-text-link" to={`/contact?type=${s.type}`} data-track="contact" data-placement="service_detail">
                      {c.talk} ↗
                    </Link>
                  </div>
                </div>
                <Link
                  className="qy-service-photo"
                  to={work.caseUrl}
                  aria-label={`${local.shortTitle} ${c.caseStudy}`}
                >
                  <img
                    src={work.screenshot}
                    alt={`${local.shortTitle} ${c.screen}`}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              </section>
            )
          })}
        </div>
        <section className="qy-section qy-tinted">
          <div className="qy-wrap qy-simple">
            <h2 className="qy-preline">{c.simple}</h2>
            <p>{c.simpleText}</p>
          </div>
        </section>
        <section className="qy-section">
          <div className="qy-wrap">
            <SectionIntro label={c.kickers[8]} title={c.process} text={c.processText} />
            <ol className="qy-process">
              {process.map(([title, text], i) => (
                <li key={title}>
                  <span className="qy-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <StudioCta />
      </main>
    </SiteLayout>
  )
}
