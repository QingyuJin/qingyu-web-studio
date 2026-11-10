import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { onepageTemplates } from "./onepageData"
import { getTemplateEntryCopy } from "./templateEntry"
import styles from "./TemplatePortal.module.css"

export default function TemplatePortal() {
  const { locale } = useLocale()
  const copy = getTemplateEntryCopy(locale)
  return (
    <aside className={styles.portal} aria-label={copy.label}>
      <Link to={`/showcase?lang=${locale}`} className={styles.link}>
        <div className={styles.copy}>
          <p className="qy-kicker">{copy.label}</p>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.description}>{copy.text}</p>
          <span className={styles.action}>{copy.action}<span aria-hidden="true">↗</span></span>
        </div>
        <div className={styles.previews} aria-hidden="true">
          {onepageTemplates.map((template) => (
            <img key={template.slug} src={template.hero} alt="" width="1680" height="945" loading="lazy" decoding="async" />
          ))}
        </div>
      </Link>
    </aside>
  )
}
