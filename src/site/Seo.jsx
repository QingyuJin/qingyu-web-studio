import { useEffect } from "react"
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

function Seo({ page = seo.home }) {
  useEffect(() => {
    const url = `${siteUrl}${page.path}`
    document.title = page.title
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: url })
    upsertMeta('meta[name="description"]', { name: "description", content: page.description })
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" })
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Qingyu Web Studio" })
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: page.title })
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: page.description })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url })
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title })
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description })
  }, [page])

  return null
}

export default Seo
