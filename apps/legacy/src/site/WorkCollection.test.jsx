import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import { FeaturedSystems, PortfolioSpotlights, WebsiteCard } from "./WorkCollection"
import { getFeaturedWorks, getPortfolioSpotlights, getWebsiteWorks } from "./workCollections"
import { featuredWorks } from "./studioContent"
import { homeFeaturedSlugs } from "./homeRevampContent"
import ProjectHub from "../ProjectHub"
import StudioHome from "../StudioHome"

vi.mock("./SiteLayout", () => ({ default: ({ children }) => children }))
vi.mock("./Seo", () => ({ default: () => null }))
vi.mock("../i18n/LocaleContext", () => ({ useLocale: () => ({ locale: "zh-Hant" }) }))

function renderWorks(path = "/works") {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><ProjectHub /></MemoryRouter>)
}

describe("portfolio entry points", () => {
  it("gives each featured product exactly one native navigation target", () => {
    const html = renderToStaticMarkup(<FeaturedSystems items={getFeaturedWorks()} />)
    expect(html.match(/<a /g)).toHaveLength(3)
    expect(html).not.toContain('target="_blank"')
    expect(html).not.toContain("data-discover")
    expect(html).not.toContain("案例說明")
    for (const item of getFeaturedWorks()) expect(html).toContain('href="' + item.entryPath + '"')
  })

  it("makes the whole client card open the complete website", () => {
    const html = renderToStaticMarkup(<WebsiteCard item={getWebsiteWorks()[0]} />)
    expect(html.match(/<a /g)).toHaveLength(1)
    expect(html).toContain('href="/works/xinjiang"')
    expect(html).toContain("開啟完整網站")
    expect(html).not.toContain("vercel.app")
  })

  it("offers both case details and the real experience when their routes differ", () => {
    const html = renderToStaticMarkup(<PortfolioSpotlights items={getPortfolioSpotlights("websites")} />)
    expect(html).toContain('href="/works/ecommerce-platform-redesign"')
    expect(html).toContain('href="/demo/commerce-platform"')
    expect(html).toContain('href="/works/commercial-visual"')
    expect(html).toContain('href="/demo/commercial-visual"')
    expect(html).toContain("查看細節")
    expect(html).toContain("體驗購物流程")
  })

  it("focuses the home on three examples and keeps the full featured portfolio", () => {
    const home = renderToStaticMarkup(<MemoryRouter><StudioHome /></MemoryRouter>)
    const works = renderWorks()
    for (const item of featuredWorks) {
      if (homeFeaturedSlugs.includes(item.slug)) expect(home).toContain('href="' + item.caseUrl + '"')
      expect(works).toContain('href="' + item.caseUrl + '"')
    }
    expect(home.match(/class="qy-work-card"/g)).toHaveLength(3)
    expect(home.indexOf('data-work="quoteflow"')).toBeLessThan(home.indexOf('data-work="bookcrm"'))
    expect(home.indexOf('data-work="bookcrm"')).toBeLessThan(home.indexOf('data-work="xinjiang"'))
    expect(works.match(/class="qy-work-card"/g)).toHaveLength(6)
    expect(works).not.toContain("ServiceDesk")
    expect(home).toContain("還沒有完整規格也沒關係")
    expect(home).toContain('href="#selected-work"')
  })

  it("filters systems without showing websites or tools", () => {
    const html = renderWorks("/works?type=systems")
    expect(html).toContain("ServiceDesk")
    expect(html).toContain("查看案例")
    expect(html).not.toContain("鑫匠工程")
    expect(html).not.toContain("網站健檢報告")
    const selectedLink = html.match(/<a\b[^>]*aria-current="page"[^>]*>/)?.[0]
    expect(selectedLink).toContain('href="/works?type=systems"')
  })

  it("supports website deep links including the previous client filter", () => {
    for (const path of ["/works?type=websites", "/works?type=client"]) {
      const html = renderWorks(path)
      expect(html).toContain("鑫匠工程")
      expect(html).toContain("完整網站")
      expect(html).not.toContain("ServiceDesk")
    }
  })

  it("shows only tools for the tool filter", () => {
    const html = renderWorks("/works?type=tools")
    expect(html).toContain("網站健檢報告")
    expect(html).not.toContain("ServiceDesk")
    expect(html).not.toContain("鑫匠工程")
    expect(html).toContain('role="status"')
  })
})
