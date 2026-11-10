import { onepageTemplates } from "../onepage/onepageData"
import styles from "./Portfolio.module.css"
import { getLocalizedWork, getWorkDetailText, getWorkEvidenceLabel, getWorkGroupText, getWorkStatusLabel } from "./portfolioI18n"

function SystemPreview({ preview, flowLabel }) {
  if (!preview) return null
  return (
    <div className={styles.preview} data-tone={preview.tone} aria-hidden="true">
      <div className={styles.previewPanel}>
        <div className={styles.previewHeading}><span>{preview.heading}</span><span>{flowLabel}</span></div>
        <div className={styles.previewSubject}>{preview.subject}</div>
        <div className={styles.previewRows}>
          {preview.rows.map(([number, title, status]) => (
            <div className={styles.previewRow} key={title}>
              <span>{number}</span><span>{title}</span><span>{status}</span>
            </div>
          ))}
        </div>
        <div className={styles.previewSteps}>{preview.steps.map((step) => <span key={step}>{step}</span>)}</div>
      </div>
    </div>
  )
}

export function FeaturedSystems({ items, locale = "zh-Hant", flowLabel = "流程示意" }) {
  return (
    <div className={styles.featuredGrid}>
      {items.map((source) => {
        const item = getLocalizedWork(source, locale)
        return <article className={styles.feature} key={item.slug}>
          {/* App and static demo routes need a document request to reach their own runtime */}
          <a href={item.entryPath} className={styles.featureLink} aria-label={`${item.shortTitle} ${item.entryLabel}`}>
            <SystemPreview preview={item.preview} flowLabel={flowLabel} />
            <div className={styles.featureBody}>
              <span className={styles.category}>{getWorkStatusLabel(item, locale)} {item.categoryLabel}</span>
              <h3 className={styles.productName} translate="no" data-preserve-text>{item.shortTitle}</h3>
              <p className={styles.description}>{item.summary}</p>
              <span className={styles.cardAction}>{item.entryLabel}</span>
            </div>
          </a>
        </article>
      })}
    </div>
  )
}

export function WorkRows({ items, locale = "zh-Hant" }) {
  return (
    <div className={styles.workRows}>
      {items.map((source) => {
        const item = getLocalizedWork(source, locale)
        return <article className={styles.workRow} key={item.slug}>
          <a href={item.entryPath} className={styles.rowLink} aria-label={`${item.shortTitle} ${item.entryLabel}`}>
            <div className={styles.rowCopy}>
              <span className={styles.category}>{getWorkStatusLabel(item, locale)} {item.categoryLabel}</span>
              <h3 className={styles.rowTitle}>{item.shortTitle}</h3>
              <p className={styles.rowDescription}>{item.summary}</p>
            </div>
            <span className={styles.rowAction}>{item.entryLabel}</span>
          </a>
        </article>
      })}
    </div>
  )
}

export function WorkGroups({ groups, locale = "zh-Hant" }) {
  const detailCopy = getWorkDetailText(locale)
  return <div className={styles.groupedWorks}>
    {groups.map((group) => {
      const groupCopy = getWorkGroupText(group.id, locale)
      return <section className={styles.workGroup} key={group.id}>
        <header className={styles.groupHeader}><p className={styles.eyebrow}>{groupCopy.title}</p><h2>{groupCopy.summary}</h2></header>
        <div className={styles.groupItems}>{group.items.map((source) => {
          const item = getLocalizedWork(source, locale)
          const opensDetail = item.portfolioPath !== item.entryPath
          const meta = [...new Set([getWorkStatusLabel(item, locale), getWorkEvidenceLabel(item, locale)])]
          return <a className={styles.groupItem} href={item.portfolioPath} key={item.slug} aria-label={`${item.shortTitle} ${opensDetail ? detailCopy.details : item.entryLabel}`}>
            <div><p className={styles.groupMeta}>{meta[0]} {meta[1] ? <span>{meta[1]}</span> : null}</p><h3>{item.shortTitle}</h3><p className={styles.groupSummary}>{item.summary}</p></div>
            <span className={styles.groupAction}>{opensDetail ? detailCopy.details : item.entryLabel}</span>
          </a>
        })}</div>
      </section>
    })}
  </div>
}

export function WebsiteCard({ item: source, locale = "zh-Hant" }) {
  const item = getLocalizedWork(source, locale)
  return (
    <article className={styles.websiteCard}>
      <a href={item.entryPath} className={styles.websiteLink} aria-label={`${item.shortTitle} ${item.entryLabel}`}>
        <div className={styles.websiteImage}>
          <img src={item.image} alt={item.shortTitle} width="760" height="475" loading="lazy" decoding="async" />
        </div>
        <div className={styles.websiteBody}>
          <span className={styles.category}>{getWorkStatusLabel(item, locale)}</span>
          <h3 className={styles.websiteTitle}>{item.shortTitle}</h3>
          <p className={styles.description}>{item.summary}</p>
          <span className={styles.textAction}>{item.entryLabel}</span>
        </div>
      </a>
    </article>
  )
}

export function RepresentativeWorks({ items, locale = "zh-Hant", flowLabel = "流程示意" }) {
  return (
    <div className={styles.featuredGrid}>
      {items.map((source) => {
        const item = getLocalizedWork(source, locale)
        return <article className={styles.feature} key={item.slug}>
          <a href={item.entryPath} className={styles.featureLink} aria-label={`${item.shortTitle} ${item.entryLabel}`}>
            {item.image ? (
              <div className={styles.representativeImage}>
                <img src={item.image} alt={`${item.shortTitle} ${item.summary}`} width="760" height="475" loading="eager" decoding="async" />
              </div>
            ) : <SystemPreview preview={item.preview} flowLabel={flowLabel} />}
            <div className={styles.featureBody}>
              <span className={styles.category}>{getWorkStatusLabel(item, locale)} {item.categoryLabel}</span>
              <h3 className={styles.productName} translate="no" data-preserve-text>{item.shortTitle}</h3>
              <p className={styles.description}>{item.summary}</p>
              <span className={styles.cardAction}>{item.entryLabel}</span>
            </div>
          </a>
        </article>
      })}
    </div>
  )
}

export function PortfolioSpotlights({ items, locale = "zh-Hant" }) {
  const detailCopy = getWorkDetailText(locale)
  return (
    <div className={styles.spotlightGrid}>
      {items.map((source, index) => {
        const item = getLocalizedWork(source, locale)
        const opensDetail = item.portfolioPath !== item.entryPath
        return (
          <article className={`${styles.spotlightCard} ${index === 0 ? styles.spotlightLead : ""}`} key={item.slug}>
            <div className={styles.spotlightLink}>
              <a href={item.portfolioPath} className={styles.spotlightImage} aria-label={`${item.shortTitle} ${opensDetail ? detailCopy.details : item.entryLabel}`}>
                <img
                  src={item.image}
                  alt={`${item.shortTitle} ${item.summary}`}
                  width="1200"
                  height="750"
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </a>
              <div className={styles.spotlightBody}>
                <p className={styles.spotlightMeta}>{getWorkStatusLabel(item, locale)} <span>{getWorkEvidenceLabel(item, locale)}</span></p>
                <h3><a href={item.portfolioPath} className={styles.spotlightTitleLink}>{item.shortTitle}</a></h3>
                <p>{item.summary}</p>
                <div className={styles.spotlightActions}>
                  <a href={item.portfolioPath} className={styles.spotlightAction}>{opensDetail ? detailCopy.details : item.entryLabel}</a>
                  {opensDetail ? <a href={item.entryPath} className={`${styles.spotlightAction} ${styles.spotlightPrimaryAction}`}>{item.entryLabel || detailCopy.open}</a> : null}
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export function ShowcasePortal({ compact = false, copy = { showcase: "展示空間", showcaseTitle: "網站設計提案", showcaseSummary: "美容 餐飲 工程等產業網站", showcaseAction: "進入展示空間" } }) {
  return (
    <a href="/showcase" className={`${styles.showcasePortal} ${compact ? styles.showcaseCompact : ""}`}>
      <div className={styles.showcaseImages} aria-hidden="true">
        {onepageTemplates.slice(0, 3).map((template) => (
          <img key={template.slug} src={template.hero} alt="" width="360" height="450" loading="lazy" decoding="async" />
        ))}
      </div>
      <div className={styles.showcaseCopy}>
        <span className={styles.category}>{copy.showcase}</span>
        <h3 className={styles.websiteTitle}>{copy.showcaseTitle}</h3>
        <p className={styles.description}>{copy.showcaseSummary}</p>
        <span className={styles.textAction}>{copy.showcaseAction}</span>
      </div>
    </a>
  )
}

export function SectionHeading({ label, title, href, action }) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        {label ? <p className={styles.eyebrow}>{label}</p> : null}
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {href ? <a href={href} className={styles.sectionAction}>{action}</a> : null}
    </div>
  )
}
