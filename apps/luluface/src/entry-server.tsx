import { renderToString } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import App from "./App"
import { siteConfig } from "./beauty-shopline/beautyShoplineData"
import { prerenderRoutes, resolveSiteRoute } from "./site/routeState"
import { buildStructuredData } from "./site/structuredData"

export { prerenderRoutes }

export function render(url) {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  )
}

export function getPageMetadata(url, baseUrl, allowIndexing) {
  const pathname = new URL(url, "https://luluface.local").pathname
  const route = resolveSiteRoute(pathname)
  const normalizedBaseUrl = `${baseUrl.replace(/\/$/, "")}/`
  const canonical = new URL(pathname, normalizedBaseUrl).href
  const image = new URL(siteConfig.seo.image, normalizedBaseUrl).href
  const robots =
    allowIndexing && !route.isNotFound ? "index, follow" : "noindex, nofollow, noarchive"

  return {
    title: route.currentSeo.title,
    description: route.currentSeo.description,
    canonical,
    image,
    imageAlt: "LULUFACE 嚕嚕臉專業臉部護膚服務",
    robots,
    ogType: route.currentProduct ? "product" : "website",
    structuredData: buildStructuredData({
      pagePath: pathname,
      pageKey: route.pageKey,
      currentProduct: route.currentProduct,
      isNotFound: route.isNotFound,
      baseUrl,
    }),
  }
}
