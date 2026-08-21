import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { createContactRequest } from "../lib/contactRequests"
import { onepageContact } from "./onepageData"

export function ProposalNotice({ dark = false }) {
  return (
    <div className={`op-proposal-notice ${dark ? "is-dark" : ""}`} role="note">
      <span>QINGYU INDUSTRY CONCEPT</span>
      <p>產業提案範本 非實際品牌</p>
    </div>
  )
}

export function TemplateHeader({ template, navItems, ctaLabel, ctaHref, dark = false }) {
  return (
    <>
      <header className={`op-template-header ${template.slug}-header ${dark ? "is-dark" : ""}`}>
        <a className="op-template-brand" href="#top" aria-label={`${template.brand} 回到頁首`}>
          <small>{template.eyebrow}</small>
          <strong>{template.brand}</strong>
        </a>
        <nav aria-label={`${template.industry}範本導覽`}>
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="op-template-header-actions">
          <Link to="/onepage" className="op-back-link">範本總覽</Link>
          <a className="op-header-cta" href={ctaHref}>{ctaLabel}</a>
        </div>
      </header>
      <ProposalNotice dark={dark} />
    </>
  )
}

export function TemplateFooter({ template, dark = false }) {
  return (
    <footer className={`op-template-footer ${dark ? "is-dark" : ""}`}>
      <div>
        <p className="op-footer-brand">{template.brand}</p>
        <p>Qingyu Web Studio 產業範本</p>
      </div>
      <div className="op-footer-links">
        <Link to="/onepage">返回六套範本</Link>
        <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE {onepageContact.lineId}</a>
        <a href={`mailto:${onepageContact.email}`}>Email</a>
      </div>
    </footer>
  )
}

export function MobileContactBar({ primaryLabel, primaryHref }) {
  return (
    <aside className="op-mobile-contact" aria-label="快速聯絡">
      <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE 諮詢</a>
      <a href={primaryHref}>{primaryLabel}</a>
    </aside>
  )
}

export function LightboxImage({ src, alt, className = "", imageClassName = "", eager = false }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <>
      <button type="button" className={`op-lightbox-trigger ${className}`} onClick={() => setOpen(true)} aria-label={`放大檢視：${alt}`}>
        <img src={src} alt={alt} width="1680" height="945" loading={eager ? "eager" : "lazy"} className={imageClassName} />
      </button>
      {open ? (
        <div className="op-lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button type="button" className="op-lightbox-close" onClick={() => setOpen(false)} aria-label="關閉大圖">關閉</button>
          <img src={src} alt={alt} width="1680" height="945" onClick={(event) => event.stopPropagation()} />
          <p>{alt}</p>
        </div>
      ) : null}
    </>
  )
}

export function FaqList({ items, className = "" }) {
  return (
    <div className={`op-faq-list ${className}`}>
      {items.map(([question, answer]) => (
        <details key={question}>
          <summary><span>{question}</span><b aria-hidden="true">＋</b></summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  )
}

export function LeadForm({
  source,
  title = "留下需求",
  description = "填寫基本資訊後送出我會依需求回覆適合的做法",
  services = ["網站規劃", "內容整理", "預約／詢價流程"],
  submitLabel = "送出需求",
  compact = false,
}) {
  const [form, setForm] = useState({ name: "", contact: "", service: services[0], note: "" })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const mailHref = useMemo(() => {
    const body = [
      `姓名：${form.name}`,
      `聯絡方式：${form.contact}`,
      `需求：${form.service}`,
      `補充：${form.note}`,
      `來源：${source}`,
    ].join("\n")
    return `mailto:${onepageContact.email}?subject=${encodeURIComponent("一頁式網站需求")}&body=${encodeURIComponent(body)}`
  }, [form, source])

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: "" }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (form.name.trim().length < 2) nextErrors.name = "請填寫至少 2 個字的稱呼"
    if (form.contact.trim().length < 4) nextErrors.contact = "請填寫可聯絡的 LINE、Email 或電話"
    if (!form.service) nextErrors.service = "請選擇需求"
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    const result = await createContactRequest({
      name: form.name.trim(),
      contact: form.contact.trim(),
      service_type: form.service,
      budget_range: "待討論",
      message: form.note.trim() || "由一頁式網站產業範本送出",
      source,
      status: "new",
    })
    setSubmitting(false)
    if (result.ok) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={`op-form-success ${compact ? "is-compact" : ""}`} role="status">
        <span aria-hidden="true">✓</span>
        <h3>需求已送出</h3>
        <p>我們會依聯絡方式回覆</p>
        <div>
          <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">加入 LINE</a>
          <button type="button" onClick={() => { setSubmitted(false); setForm({ name: "", contact: "", service: services[0], note: "" }) }}>再填一筆</button>
        </div>
      </div>
    )
  }

  return (
    <form className={`op-lead-form ${compact ? "is-compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="op-form-heading">
        <p>CONTACT FORM</p>
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
      <div className="op-form-fields">
        <label>
          <span>姓名／稱呼</span>
          <input value={form.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${source}-name-error` : undefined} placeholder="如何稱呼你" />
          {errors.name ? <small id={`${source}-name-error`}>{errors.name}</small> : null}
        </label>
        <label>
          <span>聯絡方式</span>
          <input value={form.contact} onChange={(event) => update("contact", event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? `${source}-contact-error` : undefined} placeholder="LINE／Email／電話" />
          {errors.contact ? <small id={`${source}-contact-error`}>{errors.contact}</small> : null}
        </label>
        <label>
          <span>想了解的項目</span>
          <select value={form.service} onChange={(event) => update("service", event.target.value)}>
            {services.map((service) => <option key={service}>{service}</option>)}
          </select>
        </label>
        <label className="op-form-note">
          <span>需求補充</span>
          <textarea value={form.note} onChange={(event) => update("note", event.target.value)} placeholder="希望的風格、時程或目前遇到的問題" />
        </label>
      </div>
      <div className="op-form-actions">
        <button type="submit" disabled={submitting}>{submitting ? "送出中…" : submitLabel}</button>
        <a href={mailHref}>改用 Email</a>
      </div>
      <p className="op-form-privacy">資料僅用於本次聯繫</p>
    </form>
  )
}

export function SectionLabel({ index, eyebrow, title, description }) {
  return (
    <div className="op-section-label">
      <span>{String(index).padStart(2, "0")}</span>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <div>{description}</div> : null}
      </div>
    </div>
  )
}
