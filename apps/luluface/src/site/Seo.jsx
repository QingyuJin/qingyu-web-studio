import { useEffect } from "react"

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

function Seo({ page }) {
  useEffect(() => {
    const baseUrl = page.useCurrentOrigin ? window.location.origin : page.baseUrl
    const normalizedBaseUrl = `${baseUrl.replace(/\/$/, "")}/`
    const url = new URL(page.path, normalizedBaseUrl).href
    const image = new URL(page.image, normalizedBaseUrl).href

    document.title = page.title
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: url })
    upsertMeta('meta[name="description"]', { name: "description", content: page.description })
    upsertMeta('meta[name="robots"]', { name: "robots", content: page.robots })
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: page.robots })
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: page.ogType })
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: page.siteName,
    })
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "zh_TW" })
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: page.title })
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: page.description,
    })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url })
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image })
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title })
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: page.description,
    })
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image })
    upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: page.themeColor })
  }, [page])

  return null
}

export default Seo
