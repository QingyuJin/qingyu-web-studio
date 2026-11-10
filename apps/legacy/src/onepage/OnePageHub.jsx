import { useState } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import Seo from "../site/Seo"
import SiteLayout from "../site/SiteLayout"
import { onepageContact, onepageTemplates } from "./onepageData"
import { getOnepageHubCopy, localizeOnepageTemplate } from "./onepageI18n"
import { getTemplateEntryCopy } from "./templateEntry"
import useResetScroll from "./useResetScroll"
import "./onepage.css"

function OnePageHub() {
  useResetScroll()
  const { locale } = useLocale()
  const copy = getOnepageHubCopy(locale)
  const entry = getTemplateEntryCopy(locale)
  const templates = onepageTemplates.map((template) => localizeOnepageTemplate(template, locale))
  const [previewMode, setPreviewMode] = useState("desktop")

  return (
    <SiteLayout>
      <Seo page={{ path: "/showcase", title: copy.seoTitle, description: copy.seoDescription, image: templates[0].hero, localizedCopy: true }} />
      <div className="onepage-hub" data-preserve-text data-skip-experience-polish>
        <section className="op-hub-hero">
          <div className="op-hub-hero-copy">
            <p>{entry.label}</p>
            <h1>{entry.title}</h1>
            <div className="op-hub-rule" />
            <p className="op-hub-lead">{copy.lead}</p>
            <div className="op-hub-actions">
              <a href="#templates">{copy.view}</a>
              <Link to={`/contact?type=landing&lang=${locale}`}>{copy.contact}</Link>
            </div>
          </div>
          <div className="op-hub-mosaic" aria-label={copy.mosaic}>
            {templates.map((template, index) => (
              <Link to={`/onepage/${template.slug}?lang=${locale}`} key={template.slug} className={`tile-${index + 1}`} aria-label={`${copy.tile} ${template.industry}`}>
                <img src={template.hero} alt={`${template.industry} ${copy.tile}`} width="1680" height="945" loading={index < 2 ? "eager" : "lazy"} />
                <span>{template.industry}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="op-spec-strip" aria-label={copy.eyebrow}>
          {copy.benefits.map(([label, value]) => <div key={label}><b>{label}</b><span>{value}</span></div>)}
        </section>

        <section className="op-template-catalog" id="templates">
          <div className="op-catalog-head">
            <div>
              <p>{copy.catalog}</p>
              <h2>{copy.catalogTitle}</h2>
              <span>{entry.note}</span>
            </div>
            <div className="op-preview-switch" aria-label={copy.preview}>
              <button type="button" aria-pressed={previewMode === "desktop"} onClick={() => setPreviewMode("desktop")}>{copy.desktop}</button>
              <button type="button" aria-pressed={previewMode === "mobile"} onClick={() => setPreviewMode("mobile")}>{copy.mobile}</button>
            </div>
          </div>

          <div className={`op-catalog-grid preview-${previewMode}`}>
            {templates.map((template, index) => (
              <article className="op-catalog-card" key={template.slug}>
                <Link to={`/onepage/${template.slug}?lang=${locale}`} className="op-catalog-preview" aria-label={`${copy.open} ${template.industry}`}>
                  <div className="op-browser-bar"><i /><i /><i /><span>qingyuweb.com/onepage/{template.slug}</span></div>
                  <div className="op-preview-canvas">
                    <img src={template.hero} alt={`${template.industry} ${previewMode === "desktop" ? copy.desktop : copy.mobile}`} width="1680" height="945" loading={index > 1 ? "lazy" : "eager"} />
                    <div className="op-preview-copy"><small>{template.eyebrow}</small><b>{template.brand}</b><span>{template.title}</span></div>
                  </div>
                </Link>
                <div className="op-catalog-content">
                  <div className="op-card-index">0{index + 1}</div>
                  <div>
                    <p>{template.industry}</p>
                    <h3>{template.brand}</h3>
                  </div>
                  <Link to={`/onepage/${template.slug}?lang=${locale}`}>{copy.open}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="op-hub-contact">
          <p>{copy.closing}</p>
          <h2>{copy.closingTitle[0]}<br />{copy.closingTitle[1]}</h2>
          <div>
            <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">{copy.line}</a>
            <a href={`mailto:${onepageContact.email}`}>{copy.email}</a>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default OnePageHub
