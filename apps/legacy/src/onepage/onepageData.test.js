import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vitest"
import { allOnepageImages, createTemplateSeo, onepageTemplates } from "./onepageData"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")

describe("one-page template catalog", () => {
  it("contains the six required industries and truthful rendered section counts", () => {
    expect(onepageTemplates.map(({ slug, sectionCount }) => [slug, sectionCount])).toEqual([
      ["beauty", 6],
      ["clinic", 6],
      ["restaurant", 6],
      ["construction", 6],
      ["manufacturing", 6],
      ["saas", 6],
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
      expect(template.seoDescription.length).toBeGreaterThan(20)
      expect(template.primaryCta.length).toBeGreaterThan(2)
      expect(template.audience.length).toBeGreaterThan(4)
    }
  })

  it("marks each industry page as a creative concept instead of a real business", () => {
    for (const template of onepageTemplates) {
      const graph = createTemplateSeo(template).structuredData["@graph"]
      expect(graph[1]["@type"]).toBe("CreativeWork")
      expect(graph[1].additionalProperty.value).toContain("sample content")
    }
  })
})
