import { useEffect } from "react"
import { pageSeo, siteUrl } from "./siteData"

function upsertMeta(selector, attrs) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value))
}

function upsertCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]')
  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", "canonical")
    document.head.appendChild(element)
  }
  element.setAttribute("href", href)
}

function Seo({ page = pageSeo.home }) {
  useEffect(() => {
    const url = `${siteUrl}${page.path}`
    document.title = page.title
    upsertMeta('meta[name="description"]', { name: "description", content: page.description })
    upsertCanonical(url)
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: page.title })
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: page.description })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title })
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description })
  }, [page])

  return null
}

export default Seo
