import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { useLocale } from "./i18n/LocaleContext"
import { contact } from "./site/siteConfig"
import { studioSeo, studioWorks } from "./site/studioContent"
import { studioWords } from "./site/studioWords"
import { StudioCta, WorkCard, SectionIntro } from "./site/StudioParts"
import { getTemplateEntryCopy } from "./onepage/templateEntry"
import { getHomeRevampCopy, homeFeaturedSlugs } from "./site/homeRevampContent"

export default function StudioHome() {
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const zh = locale === "zh-Hant"
  const home = getHomeRevampCopy(locale)
  const featured = homeFeaturedSlugs.map((slug) => studioWorks.find((item) => item.slug === slug))
  return (
    <SiteLayout>
      <Seo
        page={{
          ...studioSeo,
          title: zh ? studioSeo.title : `Qingyu Web | ${c.hero.join(" ")}`,
          description: zh ? studioSeo.description : c.intro,
          localizedCopy: true,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Qingyu Web",
            url: "https://www.qingyuweb.com/",
            image: `https://www.qingyuweb.com${studioSeo.image}`,
            description: zh ? studioSeo.description : c.intro,
            email: contact.email,
            areaServed: "Taiwan",
          },
        }}
      />
      <main className="qy-page qy-home">
        <section className="qy-hero">
          <div className="qy-wrap qy-hero-grid">
            <div className="qy-hero-copy">
              <p className="qy-kicker">{c.independent}</p>
              <h1>
                {c.hero[0]}
                <br />
                <em>{c.hero[1]}</em>
              </h1>
              <p className="qy-lead">{c.intro}</p>
              <div className="qy-actions">
                <Link className="qy-button" to="/contact" data-track="contact" data-placement="home_hero">
                  {c.talk}
                  <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  className="qy-text-link"
                  to="/works"
                >
                  {c.viewWorks} <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <p className="qy-reassurance">{c.reassurance}</p>
            </div>
            <figure className="qy-composition">
              <div className="qy-composition-field" aria-hidden="true" />
              <Link className="qy-composition-site" to="/works/morie" aria-label="MORIÉ SELECT">
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/studio/hero-morie-640.avif 640w, /studio/hero-morie.avif 1000w"
                    sizes="(max-width: 560px) 90vw, (max-width: 800px) 490px, 40vw"
                  />
                  <img
                    src="/studio/hero-morie.webp"
                    srcSet="/studio/hero-morie-640.webp 640w, /studio/hero-morie.webp 1000w"
                    sizes="(max-width: 560px) 90vw, (max-width: 800px) 490px, 40vw"
                    alt={`MORIÉ SELECT ${c.screen}`}
                    width="1000"
                    height="780"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </Link>
              <Link className="qy-composition-system" to="/works/bookcrm" aria-label="BookCRM">
                <picture>
                  <source type="image/avif" srcSet="/studio/hero-bookcrm.avif" />
                  <img
                    src="/studio/hero-bookcrm.webp"
                    alt={`BookCRM ${c.screen}`}
                    width="390"
                    height="680"
                    decoding="async"
                  />
                </picture>
              </Link>
              <p className="qy-composition-hand" aria-hidden="true">
                {c.handNote[0]}
                <br />
                {c.handNote[1]}
              </p>
              <figcaption>{c.composition}</figcaption>
            </figure>
          </div>
          <div className="qy-wrap qy-hero-foot">
            <span>{c.kickers[1]}</span>
            <p>{c.note}</p>
            <a href="#selected-work" aria-label={c.viewWorks}>
              ↓
            </a>
          </div>
        </section>
        <section className="qy-section qy-home-services" aria-labelledby="home-services-title">
          <div className="qy-wrap">
            <div className="qy-section-intro">
              <div>
                <p className="qy-kicker">01 / {c.kickers[3]}</p>
                <h2 id="home-services-title">{home.servicesTitle}</h2>
                <p>{home.servicesIntro}</p>
              </div>
              <Link className="qy-text-link" to="/services">{c.serviceLink} ↗</Link>
            </div>
            <div className="qy-solution-grid">
              {home.services.map(([title, text, to], i) => (
                <Link key={to} to={to} className="qy-solution-card">
                  <span className="qy-solution-icon" aria-hidden="true">{["▣", "✳", "↗", "☷"][i]}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="qy-solution-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="qy-section" id="selected-work">
          <div className="qy-wrap">
            <SectionIntro
              number="02"
              label={c.kickers[2]}
              title={home.selectedTitle}
              text={home.selectedIntro}
            >
              <Link className="qy-text-link" to="/works">
                {c.allWorks} ↗
              </Link>
            </SectionIntro>
            <div className="qy-work-grid qy-home-work-grid">
              {featured.map((item, i) => (
                <WorkCard key={item.slug} item={item} index={i} />
              ))}
            </div>
            <div className="qy-work-footnote">
              <p className="qy-proof-note">{home.proofNote}</p>
              <Link className="qy-text-link" to={`/showcase?lang=${locale}`}>
                {getTemplateEntryCopy(locale).action} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
        <section className="qy-section qy-tinted">
          <div className="qy-wrap">
            <SectionIntro number="03" label={c.kickers[8]} title={home.processTitle} text={home.processIntro} />
            <ol className="qy-process qy-home-process">
              {home.steps.map(([title, text], i) => (
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
