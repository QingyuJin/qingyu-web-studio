import { describe, expect, it } from "vitest"
import { getTrustPageCopy, trustPageLanguages } from "./trustPagesI18n"

describe("trust page translations", () => {
  it("provides all public trust pages in four languages", () => {
    expect(trustPageLanguages).toEqual(["zh-Hant", "en", "ja", "ko"])
    for (const locale of trustPageLanguages) {
      const copy = getTrustPageCopy(locale)
      expect(Object.keys(copy)).toEqual(["services", "pricing", "about", "collaboration", "contact"])
      expect(copy.services.offerings).toHaveLength(3)
      expect(copy.pricing.plans).toHaveLength(4)
      expect(copy.contact.services).toHaveLength(5)
    }
  })

  it("keeps English interface copy free of Chinese fallback text", () => {
    const text = JSON.stringify(getTrustPageCopy("en"))
    expect(text).not.toMatch(/[\u3400-\u9fff]/u)
  })

  it("uses stable contact option values across languages", () => {
    const keys = (locale, field) => getTrustPageCopy(locale).contact[field].map(([key]) => key)
    for (const field of ["services", "budgets", "timelines"]) {
      expect(keys("ja", field)).toEqual(keys("zh-Hant", field))
      expect(keys("ko", field)).toEqual(keys("zh-Hant", field))
      expect(keys("en", field)).toEqual(keys("zh-Hant", field))
    }
  })

  it("offers individual estimates without public service prices or promised turnaround times", () => {
    for (const locale of trustPageLanguages) {
      const copy = getTrustPageCopy(locale).pricing
      expect(JSON.stringify(copy)).not.toMatch(/\d|priceRange|offers/)
      expect(copy.plans).toHaveLength(4)
      expect(copy.plans.every(plan => plan.price && plan.included && plan.path.startsWith("/"))).toBe(true)
    }
  })
})
