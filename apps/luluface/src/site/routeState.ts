import {
  pageSeo,
  products,
  siteConfig,
  siteNavigation,
  utilityNavigation,
} from "../beauty-shopline/beautyShoplineData"

export const notFoundSeo = {
  title: "找不到頁面｜LULUFACE 嚕嚕臉",
  description: "這個 LULUFACE 頁面不存在或網址已更新，請返回首頁重新瀏覽。",
}

export function resolveSiteRoute(pathname) {
  const relativePath = pathname.slice(siteConfig.route.length).replace(/^\/+|\/+$/g, "")
  const pathParts = relativePath ? relativePath.split("/") : []
  const pageKey = pathParts[0] || "home"
  const productId = pageKey === "products" ? (pathParts[1] ?? "") : ""
  const isHome = pathParts.length === 0
  const currentProduct = productId
    ? (products.find((product) => product.id === productId) ?? null)
    : null
  const hasKnownContentPage =
    Object.prototype.hasOwnProperty.call(pageSeo, pageKey) && pathParts.length === 1
  const hasKnownProductPage =
    pageKey === "products" &&
    (pathParts.length === 1 || (pathParts.length === 2 && Boolean(currentProduct)))
  const isNotFound = !isHome && !hasKnownContentPage && !hasKnownProductPage
  const currentSeo = isNotFound
    ? notFoundSeo
    : isHome
      ? siteConfig.seo
      : currentProduct
        ? {
            title: `${currentProduct.name}｜LULUFACE 嚕嚕臉`,
            description: `${currentProduct.summary} ${currentProduct.size}；售價、使用方式與供貨狀態請透過 LINE 確認。`,
          }
        : pageSeo[pageKey]

  return {
    relativePath,
    pathParts,
    pageKey,
    productId,
    isHome,
    currentProduct,
    isNotFound,
    currentSeo,
  }
}

export const prerenderRoutes = Array.from(
  new Set([
    siteConfig.route,
    ...siteNavigation.map((item) => item.path),
    ...utilityNavigation.map((item) => item.path),
    ...products.map((product) => `/products/${product.id}`),
  ])
)
