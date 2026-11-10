import { describe, expect, it } from "vitest"
import { workCatalog } from "./workCatalog.js"
import { getLocalizedWork, getPortfolioText, getWorkDetailText, getWorkEvidenceLabel, getWorkGroupText, portfolioLanguages, siteChrome } from "./portfolioI18n.js"
import { workGroupIds } from "./workCollections.js"

const punctuation = /[，。、！？｜：；·→↗,.!?;:]/u

function strings(value) {
  if (typeof value === "string") return [value]
  if (Array.isArray(value)) return value.flatMap(strings)
  if (value && typeof value === "object") return Object.values(value).flatMap(strings)
  return []
}

describe("portfolio translations", () => {
  it("provides complete concise copy for all four languages", () => {
    for (const locale of portfolioLanguages) {
      const copy = getPortfolioText(locale)
      expect(copy.home.hero).toHaveLength(2)
      expect(copy.home.capabilities).toHaveLength(3)
      expect(copy.home.services).toHaveLength(3)
      expect(copy.works.filters).toHaveLength(4)
      expect(strings(copy).join(" "), locale).not.toMatch(punctuation)
      expect(strings(siteChrome[locale]).join(" "), locale).not.toMatch(punctuation)
      expect(strings(getWorkDetailText(locale)).join(" "), locale).not.toMatch(punctuation)
      for (const group of workGroupIds) expect(strings(getWorkGroupText(group, locale)).join(" "), `${locale} ${group}`).not.toMatch(punctuation)
    }
  })

  it("localizes every visible work entry without generic translation", () => {
    for (const locale of portfolioLanguages) {
      for (const source of workCatalog) {
        const item = getLocalizedWork(source, locale)
        expect(item.shortTitle, `${locale} ${source.slug}`).toBeTruthy()
        expect(item.summary, `${locale} ${source.slug}`).toBeTruthy()
        expect(item.entryLabel, `${locale} ${source.slug}`).toBeTruthy()
        if (["en", "ko"].includes(locale)) {
          expect([item.shortTitle, item.summary, item.problem, item.solution].join(" "), `${locale} ${source.slug}`).not.toMatch(/[\u3400-\u9fff]/u)
        }
        expect(getWorkEvidenceLabel(item, locale), `${locale} ${source.slug}`).toBeTruthy()
        expect([item.shortTitle, item.categoryLabel ?? "", item.summary, item.entryLabel].join(" "), `${locale} ${source.slug}`).not.toMatch(punctuation)
      }
    }
  })

  it("keeps English portfolio interface free of Chinese fallback copy", () => {
    const visible = [getPortfolioText("en"), getWorkDetailText("en"), ...workGroupIds.map((group) => getWorkGroupText(group, "en"))]
    expect(strings(visible).join(" ")).not.toMatch(/[\u3400-\u9fff]/u)
  })

  it("keeps foreign summaries short enough for the card layout", () => {
    const limits = { en: 62, ja: 32, ko: 34 }
    for (const locale of ["en", "ja", "ko"]) {
      for (const source of workCatalog) {
        expect(getLocalizedWork(source, locale).summary.length, `${locale} ${source.slug}`).toBeLessThanOrEqual(limits[locale])
      }
    }
  })
})
