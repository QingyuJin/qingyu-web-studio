import { useEffect } from "react"
import { cleanDisplayText } from "../experienceText"
import { useLocale } from "../i18n/LocaleContext"
import { localizedBrandName, localeTags, translateDisplayText } from "../i18n/translations"
import { seo, siteUrl } from "./content"

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("link")
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

function upsertStructuredData(id, data) {
  let element = document.getElementById(id)
  if (!data) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement("script")
    element.id = id
    element.type = "application/ld+json"
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(data).replaceAll("<", "\\u003c")
}

function localizeStructuredData(value, locale, key = "") {
  if (key === "inLanguage") return localeTags[locale]
  if (typeof value === "string") return translateDisplayText(cleanDisplayText(value), locale)
  if (Array.isArray(value)) return value.map((item) => localizeStructuredData(item, locale))
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([childKey, childValue]) => [childKey, localizeStructuredData(childValue, locale, childKey)]))
  }
  return value
}

function Seo({ page = seo.home }) {
  const { locale } = useLocale()

  useEffect(() => {
    document.getElementById("qingyu-static-structured-data")?.remove()
    const baseUrl = page.useCurrentOrigin ? window.location.origin : (page.baseUrl ?? siteUrl)
    const normalizedBaseUrl = `${baseUrl.replace(/\/$/, "")}/`
    const url = new URL(page.path, normalizedBaseUrl).href
    const localizedUrl = new URL(url)
    if (locale !== "zh-Hant") localizedUrl.searchParams.set("lang", locale)
    const image = new URL(page.image ?? "/og.png?v=20260814", normalizedBaseUrl).href
    const siteName = page.siteName ? translateDisplayText(page.siteName, locale) : localizedBrandName(locale)
    const robots = page.robots ?? "index, follow"
    const ogType = page.ogType ?? "website"
    const structuredData = page.structuredData ?? {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url,
      inLanguage: "zh-Hant-TW",
      isPartOf: {
        "@type": "WebSite",
        name: "Qingyu Web Studio",
        url: normalizedBaseUrl,
      },
    }

    const title = translateDisplayText(cleanDisplayText(page.title), locale)
    const description = translateDisplayText(cleanDisplayText(page.description), locale)
    const imageAlt = translateDisplayText(cleanDisplayText(page.imageAlt ?? "Qingyu Web Studio 品牌網站與數位成長服務"), locale)
    const localizedStructuredData = localizeStructuredData(structuredData, locale)

    document.title = title
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: localizedUrl.href })
    upsertMeta('meta[name="description"]', { name: "description", content: description })
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots })
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: robots })
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: ogType })
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteName })
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "zh_TW" })
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title })
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: localizedUrl.href })
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image })
    upsertMeta('meta[property="og:image:width"]', { property: "og:image:width", content: String(page.imageWidth ?? 1731) })
    upsertMeta('meta[property="og:image:height"]', { property: "og:image:height", content: String(page.imageHeight ?? 909) })
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: imageAlt,
    })
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title })
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    })
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image })

    if (page.themeColor) {
      upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: page.themeColor })
    }
    upsertStructuredData("qingyu-page-structured-data", localizedStructuredData)
  }, [locale, page])

  return null
}

export default Seo
