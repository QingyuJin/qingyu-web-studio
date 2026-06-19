import { useEffect } from "react"
import { siteBaseUrl, structuredData } from "./siteContent"

const ogImage = `${siteBaseUrl}/og-image.png`

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", rel)
    document.head.appendChild(element)
  }
  element.setAttribute("href", href)
}

function upsertJsonLd(data) {
  const id = "qingyu-web-studio-jsonld"
  let element = document.getElementById(id)
  if (!element) {
    element = document.createElement("script")
    element.id = id
    element.type = "application/ld+json"
    document.head.appendChild(element)
  }
  element.textContent = JSON.stringify(data)
}

function Seo({ page }) {
  useEffect(() => {
    const url = `${siteBaseUrl}${page.path}`
    document.title = page.title

    upsertMeta('meta[name="description"]', { name: "description", content: page.description })
    upsertLink("canonical", url)

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" })
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Qingyu Web Studio" })
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: page.title })
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: page.description })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url })
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage })

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title })
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description })
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage })

    upsertJsonLd(structuredData)
  }, [page])

  return null
}

export default Seo
