import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import StudioHome from "../StudioHome"
import ProjectHub from "../ProjectHub"
import SiteLayout from "../site/SiteLayout"
import OnePageHub from "./OnePageHub"
import TemplatePortal from "./TemplatePortal"
import { onepageTemplates } from "./onepageData"
import { getTemplateEntryCopy } from "./templateEntry"

const state = vi.hoisted(() => ({ locale: "zh-Hant" }))
vi.mock("../i18n/LocaleContext", () => ({ useLocale: () => ({ locale: state.locale }) }))
vi.mock("../site/Seo", () => ({ default: () => null }))

function render(component, path = "/") {
  return renderToStaticMarkup(<MemoryRouter initialEntries={[path]}>{component}</MemoryRouter>)
}

describe("one page template discovery", () => {
  it.each(["zh-Hant", "en", "ja", "ko"])("keeps the collection and six template links in %s", (locale) => {
    state.locale = locale
    const copy = getTemplateEntryCopy(locale)
    const portal = render(<TemplatePortal />)
    expect(portal).toContain(copy.title)
    expect(portal).toContain(`href="/showcase?lang=${locale}"`)
    expect(portal.match(/<a /g)).toHaveLength(1)
    expect(portal.match(/<img /g)).toHaveLength(6)
    expect(portal).not.toContain('target="_blank"')

    const hub = render(<OnePageHub />)
    expect(hub).toContain(copy.note)
    for (const { slug, hero } of onepageTemplates) {
      expect(portal).toContain(hero)
      // The hero preview catalog image and action all open the same real route
      expect(hub.split(`href="/onepage/${slug}?lang=${locale}"`)).toHaveLength(4)
    }
  })

  it("keeps template discovery on works and the footer while the home focuses on three cases", () => {
    state.locale = "zh-Hant"
    const home = render(<StudioHome />)
    const works = render(<ProjectHub />, "/works")
    expect(home.match(/class="qy-work-card"/g)).toHaveLength(3)
    expect(works).toContain('href="/showcase?lang=zh-Hant"')
    expect(works.match(/class="qy-work-card"/g)).toHaveLength(6)
    expect(works).toContain("瀏覽六套模板")
    expect(render(<SiteLayout />)).toContain("一頁式模板")
  })

  it("keeps the entry available in system filters without inserting website previews", () => {
    state.locale = "en"
    const html = render(<ProjectHub />, "/works?type=systems")
    expect(html).toContain('href="/showcase?lang=en"')
    expect(html).toContain("One page templates")
    expect(html).not.toContain("Explore six templates")
    expect(html).toContain("ServiceDesk")
  })
})
