import { Link } from "react-router-dom"
import styles from "./TrustPage.module.css"

export function PageHero({ eyebrow, title, intro, actions = [] }) {
  return <header className={styles.hero}><div className={[styles.container, styles.heroInner].join(" ")}><p className={styles.eyebrow}>{eyebrow}</p><h1 className={styles.title}>{title}</h1><p className={styles.intro}>{intro}</p>{actions.length ? <div className={styles.actions}>{actions.map(({ label, path }, index) => <Link key={path} to={path} className={index ? styles.secondary : styles.primary}>{label}</Link>)}</div> : null}</div></header>
}

export function SectionHead({ label, title, text }) {
  return <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{label}</p><h2 className={styles.sectionTitle}>{title}</h2>{text ? <p className={styles.sectionText}>{text}</p> : null}</div></div>
}

export function PageCta({ title, action, path = "/contact" }) {
  return <section className={styles.cta}><div className={[styles.container, styles.ctaInner].join(" ")}><h2 className={styles.ctaTitle}>{title}</h2><Link to={path} className={styles.primary}>{action}</Link></div></section>
}
