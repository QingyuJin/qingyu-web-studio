import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { allOnepageImages, onepageTemplates } from "./onepageData"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

describe("one-page template catalog", () => {
  it("contains the six required industries and exact section counts", () => {
    expect(onepageTemplates.map(({ slug, sectionCount }) => [slug, sectionCount])).toEqual([
      ["beauty", 9],
      ["clinic", 10],
      ["restaurant", 8],
      ["construction", 9],
      ["manufacturing", 9],
      ["saas", 10],
    ])
  })

  it("uses all 35 unique supplied images and every file exists", () => {
    expect(allOnepageImages).toHaveLength(35)
    expect(new Set(allOnepageImages).size).toBe(35)
    for (const publicUrl of allOnepageImages) {
      expect(existsSync(path.join(projectRoot, "public", publicUrl))).toBe(true)
    }
  })

  it("gives every template independent SEO and contact metadata", () => {
    for (const template of onepageTemplates) {
      expect(template.seoTitle).toContain("Qingyu Web Studio")
      expect(template.seoDescription.length).toBeGreaterThan(40)
      expect(template.primaryCta.length).toBeGreaterThan(2)
      expect(template.audience.length).toBeGreaterThan(4)
    }
  })
})
