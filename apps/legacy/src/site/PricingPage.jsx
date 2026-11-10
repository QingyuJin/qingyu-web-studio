import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { getTrustPageCopy } from "./trustPagesI18n"

export default function PricingPage() {
  const { locale } = useLocale()
  const copy = getTrustPageCopy(locale).pricing

  return <SiteLayout><Seo page={{ path: "/pricing", title: copy.seo[0], description: copy.seo[1], localizedCopy: true }} /><main className="qy-page qy-estimate">
    <header className="qy-wrap qy-page-hero"><p className="qy-kicker">{copy.eyebrow}</p><h1 className="qy-preline">{copy.title}</h1><p className="qy-lead">{copy.intro}</p><Link className="qy-button" to="/contact" data-track="contact" data-placement="estimate_hero">{copy.ctaAction} ↗</Link></header>
    <section className="qy-wrap qy-estimate-grid">{copy.plans.map(plan => <article className="qy-estimate-card" key={plan.name}><p className="qy-kicker">{plan.price}</p><h2>{plan.name}</h2><p>{plan.fit}</p><div className="qy-estimate-scope"><h3>{copy.labels.included}</h3><p>{plan.included}</p></div><Link className="qy-text-link" to={plan.path}>{copy.labels.case} ↗</Link></article>)}</section>
    <section className="qy-section"><div className="qy-wrap"><p className="qy-kicker">{copy.factorsLabel}</p><h2>{copy.factorsTitle}</h2><ul className="qy-estimate-factors">{copy.factors.map(item => <li key={item}>{item}</li>)}</ul><ul className="qy-estimate-rules">{copy.rules.map(item => <li key={item}>{item}</li>)}</ul></div></section>
    <section className="qy-cta"><div className="qy-wrap qy-cta-inner"><h2>{copy.cta}</h2><Link className="qy-button" to="/contact" data-track="contact" data-placement="estimate_final">{copy.ctaAction} ↗</Link></div></section>
  </main></SiteLayout>
}
