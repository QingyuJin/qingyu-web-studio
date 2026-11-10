import { useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { studioWorks } from "./studioContent"
import { studioWords } from "./studioWords"
import { StudioCta, SectionIntro } from "./StudioParts"
import { getWorkCaseContent } from "./workCaseI18n"
import { getLocalizedWork, getWorkGroupText } from "./portfolioI18n"
import { trackEvent } from "./marketing"
import NotFoundPage from "./NotFoundPage"

export default function WorkCasePage({ slug: fixedSlug }) {
  const params = useParams()
  const { locale } = useLocale()
  const source = studioWorks.find((item) => item.slug === (fixedSlug ?? params.slug))
  const dialog = useRef(null)
  useEffect(() => {
    if (source) trackEvent("work_view", { work_slug: source.slug, evidence_type: source.evidence })
  }, [source])
  if (!source) return <NotFoundPage />
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const zh = locale === "zh-Hant"
  const item = getLocalizedWork(source, locale)
  const content = getWorkCaseContent(item, locale, getWorkGroupText(source.group, locale))
  const headline = zh ? source.headline : item.summary
  const nature = c.natures[source.nature === "client" ? 0 : source.nature === "product" ? 1 : 2]
  const technical = [...new Set(source.integrations)]
  const description = zh ? source.answer : content.outcome
  return (
    <SiteLayout>
      <Seo
        page={{
          path: source.caseUrl,
          title: `${headline}｜${item.shortTitle}｜Qingyu Web`,
          description,
          image: `/og/cases/${source.slug}.png?v=20261018-v2`,
          imageWidth: 1200,
          imageHeight: 630,
          imageAlt: `${headline} ${c.screen}`,
          localizedCopy: true,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: headline,
            description,
            url: `https://www.qingyuweb.com${source.caseUrl}`,
            creator: { "@type": "Organization", name: "Qingyu Web" },
            genre: nature,
          },
        }}
      />
      <main className="qy-page qy-case">
        <header className="qy-wrap qy-case-hero">
          <Link className="qy-text-link" to="/works">
            ← {c.back}
          </Link>
          <div className="qy-case-top">
            <div>
              <p className="qy-kicker">01 / {c.caseSections[0]}</p>
              <h1>{headline}</h1>
              <p className="qy-case-title-meta">
                {item.shortTitle} · {nature}
              </p>
              <p className="qy-lead" style={{ marginTop: 20 }}>
                {description}
              </p>
            </div>
            <aside className="qy-case-aside">
              <p className="qy-meta">
                {source.nature === "product"
                  ? c.working
                  : source.nature === "client"
                    ? c.liveSite
                    : c.concept}
              </p>
              <a
                className="qy-button"
                href={`${source.entryPath}${source.entryPath.includes("?") ? "&" : "?"}lang=${locale}`}
                data-track="demo"
                data-placement="case_hero"
              >
                {c.open}
                <span aria-hidden="true">↗</span>
              </a>
            </aside>
          </div>
        </header>
        <div className="qy-wrap">
          <section className="qy-case-section">
            <div>
              <p className="qy-kicker" aria-hidden="true">02</p>
              <h2>{c.caseSections[1]}</h2>
            </div>
            <div>
              <p className="qy-case-text">{zh ? source.question : content.problem}</p>
              <p>{content.context}</p>
            </div>
          </section>
          <section className="qy-case-section">
            <div>
              <p className="qy-kicker" aria-hidden="true">03</p>
              <h2>{c.caseSections[2]}</h2>
            </div>
            <div>
              <p className="qy-case-text">{zh ? source.approach : description}</p>
            </div>
          </section>
          <section className="qy-case-section">
            <div>
              <p className="qy-kicker" aria-hidden="true">04</p>
              <h2>{c.caseSections[3]}</h2>
            </div>
            <ol className="qy-case-flow">
              {content.steps.map((step, i) => (
                <li key={step}>
                  <span>0{i + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <section className="qy-case-gallery">
          <div className="qy-wrap">
            <SectionIntro label="05" title={c.caseSections[4]} />
            <figure>
              <button
                type="button"
                className="qy-screenshot-button"
                aria-label={c.inspect}
                onClick={() => dialog.current?.showModal()}
              >
                <img
                  src={source.screenshot}
                  alt={`${headline} ${c.screen}`}
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <figcaption>
                <span>{source.nature === "client" ? c.screenshotClient : c.screenshotNote}</span>
                <span>{c.inspect} ↗</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <div className="qy-wrap">
          <section className="qy-case-section">
            <div>
              <p className="qy-kicker" aria-hidden="true">06</p>
              <h2>{c.caseSections[5]}</h2>
            </div>
            <ul className="qy-case-features">
              {content.scope.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section className="qy-case-section">
            <div>
              <p className="qy-kicker" aria-hidden="true">07</p>
              <h2>{c.caseSections[6]}</h2>
            </div>
            <div>
              <p className="qy-case-text">{zh ? source.effect : content.outcome}</p>
              <p>{content.evidence}</p>
              <a className="qy-text-link" style={{ marginTop: 20 }} href={`${source.entryPath}${source.entryPath.includes("?") ? "&" : "?"}lang=${locale}`}>
                {c.evidence} ↗
              </a>
            </div>
          </section>
          <section className="qy-case-section">
            <div>
              <p className="qy-kicker" aria-hidden="true">08</p>
              <h2>{c.caseSections[7]}</h2>
            </div>
            <details className="qy-technical">
              <summary>{c.caseSections[7]}</summary>
              <p>{c.technicalIntro}</p>
              <p>{content.responsibility}</p>
              <div>
                {technical.map((tech) => (
                  <code key={tech}>{tech}</code>
                ))}
              </div>
            </details>
          </section>
        </div>
        <StudioCta caseSlug={source.slug} />
        <dialog ref={dialog} className="qy-screenshot-dialog" aria-label={c.inspect}>
          <form method="dialog">
            <button>{c.close} ×</button>
          </form>
          <img src={source.screenshot} alt={`${headline} ${c.screen}`} width="1200" height="800" />
        </dialog>
      </main>
    </SiteLayout>
  )
}
