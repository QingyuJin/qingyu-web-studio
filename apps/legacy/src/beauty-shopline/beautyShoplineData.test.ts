import { describe, expect, it } from "vitest"
import {
  faqs,
  imageAssets,
  pageSeo,
  products,
  siteConfig,
  siteNavigation,
  utilityNavigation,
} from "./beautyShoplineData"

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
})
