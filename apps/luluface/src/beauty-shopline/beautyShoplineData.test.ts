import { describe, expect, it } from "vitest"
import {
  faqs,
  getProductPurchaseConfig,
  imageAssets,
  pageSeo,
  productCatalogCapacity,
  products,
  services,
  shoplineProductFields,
  siteConfig,
  siteNavigation,
  utilityNavigation,
} from "./beautyShoplineData"
import { prerenderRoutes, resolveSiteRoute } from "../site/routeState"
import { buildStructuredData } from "../site/structuredData"

describe("LULUFACE storefront data", () => {
  it("keeps every internal navigation target inside the LULUFACE route", () => {
    const navigation = [...siteNavigation, ...utilityNavigation]

    expect(navigation.length).toBeGreaterThan(0)
    navigation.forEach((item) => {
      expect(item.path.startsWith(siteConfig.route)).toBe(true)
    })
    expect(new Set(navigation.map((item) => item.path)).size).toBe(navigation.length)
  })

  it("has SEO copy for every non-home navigation page", () => {
    const navigationKeys = [...siteNavigation, ...utilityNavigation]
      .map((item) => item.path.slice(siteConfig.route.length).replace(/^\//, ""))
      .filter(Boolean)

    navigationKeys.forEach((key) => {
      expect(pageSeo[key]).toBeDefined()
      expect(pageSeo[key].title).toContain("LULUFACE")
      expect(pageSeo[key].description.length).toBeGreaterThan(20)
    })
  })

  it("keeps product identifiers unique and required product content complete", () => {
    expect(products.length).toBeGreaterThan(0)
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length)

    products.forEach((product) => {
      expect(product.id).toMatch(/^[a-z0-9-]+$/)
      expect(product.name).toBeTruthy()
      expect(product.size).toBeTruthy()
      expect(product.summary).toBeTruthy()
      expect(product.image.src.endsWith(".webp")).toBe(true)
      expect(product.image.sourceType).toBe("placeholder")
      shoplineProductFields.forEach((field) => {
        expect(product).toHaveProperty(field)
      })
    })

    expect(productCatalogCapacity).toBeGreaterThanOrEqual(products.length)
    expect(productCatalogCapacity).toBeGreaterThanOrEqual(10)
    expect(getProductPurchaseConfig(products[0])).toMatchObject({
      mode: "line",
      href: siteConfig.links.line,
    })
  })

  it("does not invent unconfirmed service duration or pricing", () => {
    services.forEach((service) => {
      expect(service.duration).toBeNull()
      expect(service.price).toBeNull()
      expect(service.suitableSkin).toBeTruthy()
    })
  })

  it("uses the real client logo and labels the remaining visual assets as placeholders", () => {
    expect(imageAssets.logo.sourceType).toBe("client")

    Object.entries(imageAssets)
      .filter(([key]) => key !== "logo")
      .forEach(([, image]) => expect(image.sourceType).toBe("placeholder"))
  })

  it("publishes complete FAQ question-and-answer pairs", () => {
    expect(faqs.length).toBeGreaterThan(0)
    faqs.forEach((faq) => {
      expect(faq.question.endsWith("？")).toBe(true)
      expect(faq.answer.length).toBeGreaterThan(20)
    })
  })

  it("resolves every public route and rejects unknown paths", () => {
    prerenderRoutes.forEach((route) => {
      expect(resolveSiteRoute(route).isNotFound).toBe(false)
    })

    const missingPage = resolveSiteRoute("/not-a-real-page")
    expect(missingPage.isNotFound).toBe(true)
    expect(missingPage.currentSeo.title).toContain("找不到頁面")
  })

  it("resolves product routes with product-specific SEO", () => {
    const product = products[0]
    const route = resolveSiteRoute(`/products/${product.id}`)

    expect(route.currentProduct?.id).toBe(product.id)
    expect(route.currentSeo.title).toContain(product.name)
    expect(route.isNotFound).toBe(false)
  })

  it("builds business, FAQ, breadcrumb and product structured data", () => {
    const faqData = buildStructuredData({
      pagePath: "/faq",
      pageKey: "faq",
      currentProduct: null,
      isNotFound: false,
      baseUrl: "https://luluface.vercel.app",
    })
    const product = products[0]
    const productData = buildStructuredData({
      pagePath: `/products/${product.id}`,
      pageKey: "products",
      currentProduct: product,
      isNotFound: false,
      baseUrl: "https://luluface.vercel.app",
    })

    expect(faqData?.["@graph"].map((item) => item["@type"])).toEqual([
      "BeautySalon",
      "BreadcrumbList",
      "FAQPage",
    ])
    expect(productData?.["@graph"].map((item) => item["@type"])).toEqual([
      "BeautySalon",
      "BreadcrumbList",
      "Product",
    ])
    expect(
      buildStructuredData({
        pagePath: "/missing",
        pageKey: "missing",
        currentProduct: null,
        isNotFound: true,
        baseUrl: "https://luluface.vercel.app",
      })
    ).toBeNull()
  })
})
