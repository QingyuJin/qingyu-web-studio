import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "../site/Seo"
import { createTemplateSeo, getOnepageTemplate } from "./onepageData"
import { getIndustryConfig, getIndustryDetails, getIndustryUi, localizeOnepageTemplate } from "./onepageI18n"
import useResetScroll from "./useResetScroll"
import "./onepage.css"

const demoActions = {
  beauty: "/works/bookcrm",
  construction: "/works/quoteflow",
}

function PrimaryAction({ slug, config, copy, className }) {
  const label = config.action || copy.generic
  const path = demoActions[slug] ?? `/contact?case=${slug}&type=landing`
  return path.startsWith("#") ? <a className={className} href={path}>{label}</a> : <Link className={className} to={path}>{label}</Link>
}

function ConciseIndustryTemplate({ slug }) {
  useResetScroll()
  const { locale } = useLocale()
  const template = localizeOnepageTemplate(getOnepageTemplate(slug), locale)
  const config = getIndustryConfig(locale, slug)
  const details = getIndustryDetails(locale, slug)
  const copy = getIndustryUi(locale)
  const [dashboard, setDashboard] = useState("orders")
  const dark = ["restaurant", "manufacturing", "saas"].includes(slug)
  if (!template || !config) return null

  return (
    <main id="top" className={`opx-page opx-${slug} ${dark ? "is-dark" : ""}`} data-preserve-text data-skip-experience-polish>
      <Seo page={createTemplateSeo(template, locale)} />
      <div className="opx-notice">{copy.concept}</div>
      <header className="opx-header">
        <a href="#top" className="opx-brand"><small>{template.eyebrow}</small><strong>{template.brand}</strong></a>
        <nav>{config.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <PrimaryAction slug={slug} config={config} copy={copy} className="opx-header-cta" />
      </header>

      <section className="opx-hero">
        <img src={template.hero} alt={`${template.industry} ${template.brand}`} width="1680" height="945" fetchPriority="high" />
        <div className="opx-hero-shade" />
        <div className="opx-hero-copy"><p>{template.industry}</p><h1>{template.title}</h1><span>{config.intro}</span><PrimaryAction slug={slug} config={config} copy={copy} /></div>
      </section>

      <section id="services" className="opx-section">
        <div className="opx-heading"><p>{copy.main}</p><h2>{config.sectionTitle}</h2><span>{template.summary}</span></div>
        <div className="opx-card-grid">{config.services.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="process" className="opx-section opx-process">
        <div className="opx-heading"><p>{copy.flow}</p><h2>{config.processTitle || `${config.process.length} ${copy.steps}`}</h2></div>
        <ol>{config.process.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
      </section>

      <section id="details" className="opx-section opx-details">
        <div className="opx-heading"><p>{copy.sample}</p><h2>{details.title}</h2></div>
        <div className="opx-card-grid opx-detail-grid">{details.items.map(([label, value]) => <article key={label}><h3>{label}</h3><p>{value}</p></article>)}</div>
      </section>

      <section id="space" className="opx-section opx-feature">
        <div className="opx-feature-image"><img src={template.images[2]} alt={`${template.industry} ${copy.focus}`} width="1680" height="945" loading="lazy" /></div>
        <div className="opx-feature-copy"><p>{copy.focus}</p><h2>{config.featureTitle}</h2><span>{config.featureText}</span><ul>{(config.featureItems || config.process).map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="opx-section opx-showcase">
        {slug === "saas" ? <Dashboard value={dashboard} onChange={setDashboard} copy={copy} /> : <><div className="opx-heading"><p>{copy.more}</p><h2>{copy.moreTitle}</h2></div></>}
        <div className="opx-image-grid">{[template.images[1], ...template.images.slice(3)].filter(Boolean).map((image, index) => <img key={image} src={image} alt={`${template.industry} ${copy.more} ${index + 1}`} width="1680" height="945" loading="lazy" />)}</div>
      </section>

      <section className="opx-cta">
        <p>{copy.studio}</p><h2>{copy.cta}</h2><div><Link to={`/contact?case=${slug}&type=landing`}>{copy.contact}</Link><Link to="/showcase">{copy.back}</Link></div>
      </section>
    </main>
  )
}

function Dashboard({ value, onChange, copy }) {
  const keys = ["orders", "customers", "reports"]
  const data = Object.fromEntries(keys.map((key, index) => [key, copy.tabs[index]]))
  return <div className="opx-dashboard"><div className="opx-heading"><p>{copy.dashboard}</p><h2>{copy.dashboardTitle}</h2></div><div className="opx-dashboard-tabs">{keys.map((item) => <button key={item} type="button" aria-pressed={value === item} onClick={() => onChange(item)}>{data[item][0]}</button>)}</div><div className="opx-dashboard-card"><span>{copy.sample}</span><strong>{data[value][1]}</strong><p>{data[value][2]}</p></div></div>
}

export default ConciseIndustryTemplate
