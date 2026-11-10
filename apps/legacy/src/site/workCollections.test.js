import { describe, expect, it } from "vitest"
import { workCatalog } from "./workCatalog.js"
import { getCollectionWorks, getFeaturedWorks, getOtherSystems, getRelatedWorks, getRepresentativeWorks, getWebsiteWorks, getWorkGroups, normalizeCollection } from "./workCollections.js"

describe("portfolio collections", () => {
  it("starts with three representative capabilities", () => {
    expect(getRepresentativeWorks().map((item) => item.slug)).toEqual(["xinjiang", "linebot", "floworder"])
  })
  it("promotes the latest three products with direct same-domain entries", () => {
    expect(getFeaturedWorks().map(({ shortTitle, entryPath }) => [shortTitle, entryPath])).toEqual([
      ["ServiceDesk", "/works/servicedesk/app/support"],
      ["Watchtower", "/works/watchtower/app"],
      ["DocOps", "/works/docops/app/employee"],
    ])
  })

  it("places every work in one collection without duplicating featured systems", () => {
    const displayed = [...getFeaturedWorks(), ...getOtherSystems(), ...getWebsiteWorks(), ...getCollectionWorks("tools")]
    expect(displayed).toHaveLength(workCatalog.length)
    expect(new Set(displayed.map((item) => item.slug)).size).toBe(workCatalog.length)
    expect(getCollectionWorks("all")).toEqual(workCatalog)
  })

  it("automatically includes new catalog items without editing either page", () => {
    const next = { slug: "next-system", collection: "systems", group: "automation", entryPath: "/demo/next-system" }
    const updated = [...workCatalog, next]
    expect(getOtherSystems(updated)).toContain(next)
    expect(getCollectionWorks("systems", updated)).toContain(next)
  })

  it("puts every work into one buyer need group", () => {
    const grouped = getWorkGroups().flatMap((group) => group.items)
    expect(grouped).toHaveLength(workCatalog.length)
    expect(new Set(grouped.map((item) => item.slug)).size).toBe(workCatalog.length)
    expect(getWorkGroups().map((group) => group.id)).toEqual(["brand", "booking", "sales", "field-service", "knowledge", "automation", "growth"])
    expect(getRelatedWorks(workCatalog.find((item) => item.slug === "docops")).map((item) => item.slug)).toContain("rag-consultant")
  })

  it("keeps displaced featured products in the system list", () => {
    const next = { slug: "next-system", collection: "systems", featured: true, preview: { rows: [], steps: [] } }
    const updated = [next, ...workCatalog]
    expect(getFeaturedWorks(updated)).toHaveLength(3)
    expect(getFeaturedWorks(updated)[0]).toBe(next)
    expect(getOtherSystems(updated).map((item) => item.slug)).toContain("docops")
  })

  it("preserves full client websites and the original showcase routes", () => {
    const client = getWebsiteWorks()[0]
    expect(client.slug).toBe("xinjiang")
    expect(client.entryPath).toBe("/works/xinjiang")
    expect(client.entryLabel).toBe("開啟完整網站")
    expect(workCatalog.find((item) => item.slug === "morie").entryPath).toBe("/demo/morie")
    expect(workCatalog.find((item) => item.slug === "morie").casePath).toBe("/demo/morie")
    expect(workCatalog.find((item) => item.slug === "commerce-platform").casePath).toBe("/works/ecommerce-platform-redesign")
    expect(workCatalog.find((item) => item.slug === "commercial-visual").entryPath).toBe("/demo/commercial-visual")
  })

  it("keeps old filters usable and unknown filters safe", () => {
    expect(normalizeCollection("client")).toBe("websites")
    expect(normalizeCollection("systems")).toBe("systems")
    expect(normalizeCollection("not-a-collection")).toBe("all")
    expect(normalizeCollection(null)).toBe("all")
  })

  it("uses concise display copy without decorative punctuation", () => {
    for (const item of workCatalog) {
      expect(item.summary.length, item.slug).toBeLessThanOrEqual(24)
      expect([item.shortTitle, item.summary, item.entryLabel, item.categoryLabel ?? ""].join(" ")).not.toMatch(/[，。、！？｜：；·→↗,.!?;:]/u)
      expect(item.entryPath).toMatch(/^\/(works|demo)\//)
      expect(item.entryPath).not.toMatch(/^\/\//)
      expect(item.portfolioPath).toMatch(/^\/(works|demo)\//)
      expect(item.group).toBeTruthy()
      expect(item.evidence).toBeTruthy()
    }
  })
})
