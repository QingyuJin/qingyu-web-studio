import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import WorkCasePage from "./WorkCasePage"
import { studioWorks } from "./studioContent"

let locale = "zh-Hant"
vi.mock("../i18n/LocaleContext", () => ({ useLocale: () => ({ locale }) }))
vi.mock("./SiteLayout", () => ({ default: ({ children }) => children }))
vi.mock("./Seo", () => ({ default: () => null }))

function render(slug, language = "zh-Hant") {
  locale = language
  return renderToStaticMarkup(<MemoryRouter initialEntries={[`/works/${slug}`]}><WorkCasePage slug={slug} /></MemoryRouter>)
}

describe("work case pages", () => {
  it("uses one compact structure for system work", () => {
    const html = render("quoteflow")
    expect(html).toContain("QuoteFlow")
    expect(html).toContain("使用情境與問題")
    expect(html).toContain("核心流程")
    expect(html).toContain('href="/works/quoteflow/app/sales?lang=zh-Hant"')
    expect(html.match(/<h1/g)).toHaveLength(1)
    expect(html).not.toContain("Pricing")
    expect(html).not.toContain("Deliverables")
  })

  it("renders the English detail interface without Chinese fallback text", () => {
    const html = render("quoteflow", "en")
    expect(html).toContain("The situation")
    expect(html).toContain("Core flow")
    expect(html).not.toMatch(/[\u3400-\u9fff]/u)
  })

  it("keeps all English and Korean cases free of Chinese fallback content", () => {
    for (const language of ["en", "ko"]) {
      for (const item of studioWorks) {
        const html = render(item.slug, language)
        expect(html, `${item.slug} ${language}`).not.toMatch(/[\u3400-\u9fff]/u)
        expect(html).toContain(`lang=${language}`)
      }
    }
  })

  it("does not render another project for an unknown slug", () => {
    const html = render("unknown-work")
    expect(html).toContain("404")
    expect(html).toContain("這一頁不存在")
    expect(html).not.toContain("QuoteFlow")
  })
})
