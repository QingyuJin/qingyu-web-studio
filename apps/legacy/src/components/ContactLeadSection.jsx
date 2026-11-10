import { useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { createContactRequest } from "../lib/contactRequests"
import { getAttribution, hasMarketingTags, trackEvent } from "../site/marketing"
import { getTrustPageCopy } from "../site/trustPagesI18n"
import { contact } from "../site/siteConfig"
import { getHomeRevampCopy } from "../site/homeRevampContent"
import { isValidInquiryContact } from "../lib/inquiryValidation"

const { email, lineId } = contact
const typeKeys = {
  "business-system": "system",
  business: "system",
  system: "system",
  website: "website",
  "website-updates": "updates",
  landing: "landing",
  agency: "collaboration",
  consultant: "collaboration",
  collaboration: "collaboration",
  line: "line",
  ai: "ai",
}
const extraServices = {
  "zh-Hant": [
    ["updates", "網站修改／手機版優化"],
    ["line", "LINE Bot / 自動化"],
    ["ai", "AI / 文件搜尋"],
  ],
  en: [
    ["updates", "Website updates / Mobile layouts"],
    ["line", "LINE bots / Automation"],
    ["ai", "AI / Document search"],
  ],
  ja: [
    ["updates", "サイト修正／スマホ表示"],
    ["line", "LINE Bot / 自動化"],
    ["ai", "AI / 文書検索"],
  ],
  ko: [
    ["updates", "사이트 수정 / 모바일 개선"],
    ["line", "LINE Bot / 자동화"],
    ["ai", "AI / 문서 검색"],
  ],
}
function clean(value) {
  if (!value || value.length > 80 || Array.from(value).some((c) => c.charCodeAt(0) < 32)) return ""
  return value.trim()
}
function labels(options) {
  return Object.fromEntries(options)
}

export default function ContactLeadSection() {
  const { locale } = useLocale()
  const copy = getTrustPageCopy(locale).contact
  const home = getHomeRevampCopy(locale)
  const ownerCopy = getTrustPageCopy("zh-Hant").contact
  const [params] = useSearchParams()
  const caseKey = clean(params.get("case"))
  const [reference, setReference] = useState(ownerCopy.caseNames[caseKey] ? caseKey : "")
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: typeKeys[clean(params.get("type")).toLowerCase()] ?? "unsure",
    budget: "discuss",
    timeline: "open",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState(null)
  const submittingRef = useRef(false)
  const idempotencyRef = useRef("")
  const startedRef = useRef(false)
  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setNotice(null)
    idempotencyRef.current = ""
  }
  function trackStart() {
    if (startedRef.current) return
    startedRef.current = true
    trackEvent("contact_start", { service_type: form.type, reference_case: reference })
  }
  async function submit(event) {
    event.preventDefault()
    if (submittingRef.current) return
    if (form.message.trim().length < 4) {
      setNotice({ tone: "error", text: home.invalidProblem })
      event.currentTarget.elements.message.focus()
      return
    }
    if (!isValidInquiryContact(form.contact)) {
      setNotice({ tone: "error", text: home.invalidContact })
      event.currentTarget.elements.contact.focus()
      return
    }
    submittingRef.current = true
    const website = event.currentTarget.elements.website?.value || ""
    setSubmitting(true)
    const attribution = getAttribution()
    const service = labels([...ownerCopy.services, ...extraServices["zh-Hant"]])[form.type]
    const budget = labels(ownerCopy.budgets)[form.budget]
    const timeline = labels(ownerCopy.timelines)[form.timeline]
    const context = [
      reference ? `正在詢問 ${ownerCopy.caseNames[reference]}` : "",
      `希望時間 ${timeline}`,
      form.message,
      Object.keys(attribution).length ? `來源 ${JSON.stringify(attribution)}` : "",
    ]
      .filter(Boolean)
      .join("\n")
    idempotencyRef.current ||= globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
    const result = await createContactRequest(
      {
        name: form.name,
        contact: form.contact,
        service_type: service,
        budget_range: budget,
        message: context,
        source: "contact-page",
        status: "new",
        website,
      },
      { idempotencyKey: idempotencyRef.current }
    )
    submittingRef.current = false
    setSubmitting(false)
    const delivered = result.ok && result.stored && result.notified
    if (delivered) {
      trackEvent("generate_lead", {
        service_type: form.type,
        reference_case: reference,
        budget_range: form.budget,
        lead_delivery: result.notified ? "stored-and-notified" : "stored-only",
      })
      if (hasMarketingTags) trackEvent("submit_inquiry", { service_type: form.type, reference_case: reference })
      idempotencyRef.current = ""
    } else
      trackEvent(result.stored ? "contact_saved_without_notification" : "contact_submit_failed", {
        service_type: form.type,
        reference_case: reference,
      })
    setNotice({
      tone: delivered ? "success" : result.ok && result.stored ? "warning" : "error",
      text: delivered ? copy.success : result.ok && result.stored ? copy.stored : copy.failure,
    })
  }
  return (
    <main className="qy-page qy-contact" data-preserve-text data-skip-experience-polish>
      <section id="contact" className="qy-wrap qy-contact-grid">
        <div>
          <p className="qy-kicker">{copy.eyebrow}</p>
          <h1 className="qy-preline">{home.contactTitle}</h1>
          <p className="qy-contact-intro">{home.contactIntro}</p>
        </div>
        <form onSubmit={submit} onFocusCapture={trackStart} className="qy-contact-form" aria-busy={submitting}>
          <fieldset disabled={submitting} className="qy-inquiry-fields">
          <label className="qy-honeypot" aria-hidden="true">
            {copy.services.find(([key]) => key === "website")?.[1]}
            <input name="website" tabIndex="-1" autoComplete="off" />
          </label>
          {reference && (
            <div className="qy-form-reference">
              {copy.reference} {copy.caseNames[reference]}
              <button type="button" onClick={() => setReference("")} aria-label={copy.clear}>
                ×
              </button>
            </div>
          )}
          <div className="qy-form-grid">
            <label className="qy-field qy-field-wide">
              <span>{copy.fields.message} *</span>
              <textarea
                name="message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
                minLength={4}
                maxLength={1500}
                placeholder={copy.fields.messageHint}
              />
            </label>
            <Input
              label={copy.fields.contact}
              name="contact"
              value={form.contact}
              onChange={(v) => update("contact", v)}
              placeholder={home.contactHint}
              required
              maxLength={200}
              wide
            />
            <Select label={`${copy.fields.budget} · ${home.optionalShort}`} name="budget" value={form.budget} onChange={(v) => update("budget", v)} options={copy.budgets} wide />
          </div>
          <details className="qy-contact-optional">
            <summary>{home.optional}</summary>
            <div className="qy-form-grid">
              <Input label={copy.fields.name} name="name" autoComplete="name" value={form.name} onChange={(v) => update("name", v)} maxLength={100} />
              <Select label={copy.fields.type} name="service_type" value={form.type} onChange={(v) => update("type", v)} options={[...copy.services, ...(extraServices[locale] ?? extraServices.en)]} />
              <Select
                label={copy.fields.timeline}
                name="timeline"
                value={form.timeline}
                onChange={(v) => update("timeline", v)}
                options={copy.timelines}
              />
            </div>
          </details>
          </fieldset>
          {notice && (
            <div className={`qy-form-notice qy-form-notice-${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"}>
              <p>{notice.text}</p>
              {notice.tone === "success" && <p>{copy.next}</p>}
              {notice.tone === "warning" && <a href={`mailto:${email}`}>{copy.email} ↗</a>}
            </div>
          )}
          <p className="qy-inquiry-privacy">{home.privacy}</p>
          <button type="submit" disabled={submitting || notice?.tone === "success"} className="qy-button">
            {submitting ? copy.submitting : copy.submit}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
        <div className="qy-contact-channels">
          <p>{home.otherContact}</p>
          <a className="qy-button qy-line-fallback" href={contact.lineUrl} target="_blank" rel="noreferrer" data-track="contact" data-placement="contact_line">{copy.line} <span aria-hidden="true">↗</span></a>
          <p className="qy-direct-contact">LINE <bdi translate="no">{lineId}</bdi><br /><a href={`mailto:${email}`} data-track="contact" data-placement="contact_email">{email}</a></p>
        </div>
      </section>
    </main>
  )
}
function Input({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  autoComplete,
  maxLength,
  wide = false,
}) {
  return (
    <label className={`qy-field ${wide ? "qy-field-wide" : ""}`}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
    </label>
  )
}
function Select({ label, name, value, onChange, options, wide = false }) {
  return (
    <label className={`qy-field ${wide ? "qy-field-wide" : ""}`}>
      <span>{label}</span>
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}
