import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { PageCta, PageHero, SectionHead } from "./TrustPageParts"
import styles from "./TrustPage.module.css"
import { getTrustPageCopy } from "./trustPagesI18n"

function DetailList({ items }) {
  return <div className={styles.detailGrid}>{items.map(([title, text]) => <article className={styles.detail} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div>
}

export function AboutPage() {
  const { locale } = useLocale()
  const copy = getTrustPageCopy(locale).about
  return <SiteLayout><Seo page={{ path: "/about", title: copy.seo[0], description: copy.seo[1], localizedCopy: true }} /><main className={styles.page} data-preserve-text data-skip-experience-polish>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
    <section className={styles.section}><div className={styles.container}><DetailList items={copy.details} /></div></section>
    <section className={[styles.section, styles.sectionLight].join(" ")}><div className={styles.container}><SectionHead label={copy.workLabel} title={copy.workTitle} text={copy.workText} /><Link to="/works" className={styles.primary}>{copy.workAction}</Link></div></section>
    <PageCta title={copy.cta} action={copy.ctaAction} />
  </main></SiteLayout>
}

export function CollaborationPage() {
  const { locale } = useLocale()
  const copy = getTrustPageCopy(locale).collaboration
  return <SiteLayout><Seo page={{ path: "/collaboration", title: copy.seo[0], description: copy.seo[1], localizedCopy: true }} /><main className={styles.page} data-preserve-text data-skip-experience-polish>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} actions={[{ label: copy.primary, path: "/contact?type=collaboration" }]} />
    <section className={[styles.section, styles.sectionDark].join(" ")}><div className={styles.container}><div className={styles.darkGrid}>{copy.models.map(([title, text]) => <article className={styles.darkCard} key={title}><h2>{title}</h2><p>{text}</p></article>)}</div></div></section>
    <section className={styles.section}><div className={styles.container}><SectionHead label={copy.rolesLabel} title={copy.rolesTitle} /><DetailList items={copy.roles} /></div></section>
    <PageCta title={copy.cta} action={copy.ctaAction} path="/contact?type=collaboration" />
  </main></SiteLayout>
}
