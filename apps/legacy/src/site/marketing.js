const CONSENT_KEY = "qingyu-marketing-consent"
const ATTRIBUTION_KEY = "qingyu-attribution"

const measurementId = import.meta.env.VITE_QINGYU_GA4_ID?.trim()
const googleAdsId = import.meta.env.VITE_QINGYU_GOOGLE_ADS_ID?.trim()
const googleAdsSendTo = import.meta.env.VITE_QINGYU_GOOGLE_ADS_SEND_TO?.trim()
const metaPixelId = import.meta.env.VITE_QINGYU_META_PIXEL_ID?.trim()

export const hasMarketingTags = Boolean(measurementId || googleAdsId || metaPixelId)

function getConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

function loadScript(id, src) {
  if (document.getElementById(id)) return
  const script = document.createElement("script")
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

function configureGoogleTag() {
  if (!measurementId && !googleAdsId) return
  window.dataLayer ||= []
  window.gtag ||= function gtag() {
    window.dataLayer.push(arguments)
  }

  const tagId = measurementId || googleAdsId
  loadScript("qingyu-google-tag", `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`)
  window.gtag("js", new Date())

  if (measurementId) {
    window.gtag("config", measurementId, {
      send_page_view: false,
      anonymize_ip: true,
    })
  }
  if (googleAdsId) window.gtag("config", googleAdsId)
}

function configureMetaPixel() {
  if (!metaPixelId || window.fbq) return
  const fbq = function fbq() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
  }
  fbq.queue = []
  fbq.loaded = true
  fbq.version = "2.0"
  window.fbq = fbq
  loadScript("qingyu-meta-pixel", "https://connect.facebook.net/zh_TW/fbevents.js")
  window.fbq("init", metaPixelId)
  window.fbq("track", "PageView")
}

export function initializeMarketing() {
  if (!hasMarketingTags || getConsent() !== "granted") return
  configureGoogleTag()
  configureMetaPixel()
}

export function setMarketingConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Tracking remains disabled when storage is unavailable.
  }

  if (value === "granted") {
    initializeMarketing()
    window.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    })
  }
}

export function getMarketingConsent() {
  return getConsent()
}

export function captureAttribution(search = window.location.search) {
  const params = new URLSearchParams(search)
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]
  const incoming = Object.fromEntries(
    keys.map((key) => [key, params.get(key)]).filter(([, value]) => value)
  )
  if (Object.keys(incoming).length === 0) return getAttribution()

  const attribution = {
    ...incoming,
    landing_page: window.location.pathname,
    captured_at: new Date().toISOString(),
  }
  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution))
  } catch {
    // The form can still be submitted without attribution storage.
  }
  return attribution
}

export function getAttribution() {
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}")
  } catch {
    return {}
  }
}

export function trackEvent(name, parameters = {}) {
  window.dataLayer ||= []
  window.dataLayer.push({ event: name, ...parameters })

  if (getConsent() !== "granted") return
  window.gtag?.("event", name, parameters)

  const metaEvents = {
    generate_lead: "Lead",
    contact: "Contact",
    view_content: "ViewContent",
  }
  if (metaEvents[name]) window.fbq?.("track", metaEvents[name], parameters)

  if (name === "generate_lead" && googleAdsSendTo) {
    window.gtag?.("event", "conversion", { send_to: googleAdsSendTo })
  }
}

