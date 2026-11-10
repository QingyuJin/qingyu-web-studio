import { existsSync, readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { onepageTemplates } from "../onepage/onepageData.js"
import { workCatalog } from "./workCatalog.js"
import { getFeaturedWorks } from "./workCollections.js"

const appRoot = new URL("../../", import.meta.url)
const deployment = JSON.parse(readFileSync(new URL("vercel.json", appRoot), "utf8"))

describe("portfolio deployment contract", () => {
  it("uses existing public images for every visible website cover", () => {
    for (const item of workCatalog) {
      expect(existsSync(new URL("public" + item.image, appRoot)), item.image).toBe(true)
    }
    for (const item of onepageTemplates) {
      expect(existsSync(new URL("public" + item.hero, appRoot)), item.hero).toBe(true)
    }
  })

  it("routes every featured experience without a soft 404 fallback", () => {
    expect(deployment.rewrites.some((rule) => rule.source === "/(.*)")).toBe(false)
    for (const item of getFeaturedWorks()) {
      const index = deployment.rewrites.findIndex((rule) => {
        const prefix = rule.source.replace(/\/:path\*$/, "")
        return rule.source === item.entryPath || (rule.source.endsWith("/:path*") && item.entryPath.startsWith(prefix + "/"))
      })
      expect(index, item.slug).toBeGreaterThanOrEqual(0)
      expect(deployment.rewrites[index].destination).toContain(item.entryPath.split("/").slice(0, 4).join("/"))
    }
  })

  it("preserves the native static demos used by the website cards", () => {
    for (const slug of ["morie", "commercial-visual"]) {
      const item = workCatalog.find((work) => work.slug === slug)
      expect(existsSync(new URL("public" + item.entryPath + "/index.html", appRoot))).toBe(true)
      const rewrite = deployment.rewrites.find((rule) => rule.source === item.entryPath)
      expect(rewrite?.destination).toBe(`${item.entryPath}/index.html`)
    }
  })
  it("keeps MORIÉ useful before client scripts load", () => {
    const html = readFileSync(new URL("public/demo/morie/index.html", appRoot), "utf8")
    expect(html).toContain("探索全系列")
    expect(html).not.toMatch(/opacity\s*:\s*0/u)
  })
  it("allows the MORIÉ client runtime on root and nested pages", () => {
    for (const source of ["/demo/morie", "/demo/morie/:path*"]) {
      const route = deployment.headers.find((rule) => rule.source === source)
      const policy = route?.headers.find((header) => header.key === "Content-Security-Policy")?.value
      expect(policy, source).toContain("script-src 'self' 'unsafe-inline'")
    }
  })
  it("hydrates the MORIÉ cart only after the client mounts", () => {
    const store = readFileSync(new URL("../morie-store/src/store/cart-store.ts", appRoot), "utf8")
    const chrome = readFileSync(new URL("../morie-store/src/components/SiteChrome.tsx", appRoot), "utf8")
    expect(store).toContain("skipHydration: true")
    expect(chrome).toContain("useCartStore.persist.rehydrate()")
  })
  it("routes the Watchtower root without an empty wildcard trailing-slash loop", () => {
    const exact = deployment.rewrites.findIndex(rule => rule.source === "/works/watchtower/app")
    const nested = deployment.rewrites.findIndex(rule => rule.source === "/works/watchtower/app/:path*")
    expect(exact).toBeGreaterThanOrEqual(0)
    expect(exact).toBeLessThan(nested)
    expect(deployment.rewrites[exact].destination).toBe("https://qingyu-floworder-web.vercel.app/works/watchtower/app")
  })
  it("routes the FlowDesk root without an empty wildcard trailing-slash loop", () => {
    const exact = deployment.rewrites.findIndex(rule => rule.source === "/works/flowdesk/app")
    const nested = deployment.rewrites.findIndex(rule => rule.source === "/works/flowdesk/app/:path*")
    expect(exact).toBeGreaterThanOrEqual(0)
    expect(exact).toBeLessThan(nested)
    expect(deployment.rewrites[exact].destination).toBe("https://qingyu-floworder-web.vercel.app/works/flowdesk/app")
    const api = deployment.rewrites.find((rule) => rule.source === "/api/flowdesk/:path*")
    expect(new URL(api.destination.replace(":path*", "health")).origin).toBe(new URL(deployment.rewrites[exact].destination).origin)
  })
})
