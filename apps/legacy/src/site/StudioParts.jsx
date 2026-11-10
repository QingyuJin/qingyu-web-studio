import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { getLocalizedWork } from "./portfolioI18n"
import { studioWords } from "./studioWords"
import { getHomeRevampCopy } from "./homeRevampContent"

export function StudioCta({ caseSlug = "" }) {
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  return (
    <section className="qy-cta">
      <div className="qy-wrap qy-cta-inner">
        <div>
          <p className="qy-kicker">{caseSlug ? getHomeRevampCopy(locale).similar : c.kickers[11]}</p>
          <h2>
            {c.ctaTitle}
            <br />
            <em>{c.ctaSecond}</em>
          </h2>
          <p>{c.ctaText}</p>
        </div>
        <div className="qy-actions">
          <Link
            className="qy-button"
            to={caseSlug ? `/contact?case=${encodeURIComponent(caseSlug)}` : "/contact"}
            data-track="contact"
            data-placement="page_cta"
          >
            {c.talk}
            <span aria-hidden="true">↗</span>
          </Link>
          <Link className="qy-text-link" to="/works">
            {c.viewWorks} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function WorkCard({ item, index = 0 }) {
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const local = getLocalizedWork(item, locale)
  const zh = locale === "zh-Hant"
  const nature = c.natures[item.nature === "client" ? 0 : item.nature === "product" ? 1 : 2]
  return (
    <article className="qy-work-card">
      <div className="qy-work-copy">
        <p className="qy-meta">
          {nature}
        </p>
        <h3>
          <Link to={item.caseUrl} data-track="portfolio" data-work={item.slug}>{local.shortTitle}</Link>
        </h3>
        <p className="qy-work-answer">{zh ? item.answer : local.solution}</p>
      </div>
      <Link
        to={item.caseUrl}
        className="qy-work-image"
        data-track="portfolio"
        data-work={item.slug}
        aria-label={`${String(index + 1).padStart(2, "0")} ${zh ? item.headline : local.shortTitle} — ${c.caseStudy}`}
      >
        <img
          src={item.screenshot}
          srcSet={`${item.screenshot.replace(".webp", "-680.webp")} 680w, ${item.screenshot} 1200w`}
          sizes="(max-width: 560px) calc(100vw - 40px), (max-width: 1100px) calc((100vw - 96px) / 2), 608px"
          alt={`${local.shortTitle} ${c.screen}`}
          width="1200"
          height="800"
          loading="lazy"
          decoding="async"
        />
        <span className="qy-image-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Link>
      <div className="qy-work-bottom">
        <span className="qy-meta">
          {item.nature === "product"
            ? c.working
            : item.nature === "client"
              ? c.liveSite
              : c.concept}
        </span>
        <Link className="qy-text-link" to={item.caseUrl} data-track="portfolio" data-work={item.slug}>
          {c.caseStudy} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

export function SectionIntro({ number, label, title, text, children }) {
  return (
    <div className="qy-section-intro">
      <div>
        <p className="qy-kicker">
          {number && <span>{number} / </span>}
          {label}
        </p>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children}
    </div>
  )
}
