import { describe, expect, it } from "vitest"
import { translateDisplayText } from "./translations"

describe("translateDisplayText", () => {
  it("uses precise translations for primary messages", () => {
    expect(translateDisplayText("清楚的品牌", "en")).toBe("A Clear Brand")
    expect(translateDisplayText("清楚的品牌", "ja")).toBe("伝わるブランド")
    expect(translateDisplayText("清楚的品牌", "ko")).toBe("명확한 브랜드")
  })

  it("translates dynamic project counts", () => {
    expect(translateDisplayText("共 17 件作品", "en")).toBe("17 Projects")
    expect(translateDisplayText("17 件作品", "ko")).toBe("포트폴리오 17개")
  })

  it("keeps technical addresses unchanged", () => {
    expect(translateDisplayText("a0988874324@gmail.com", "ja")).toBe("a0988874324@gmail.com")
  })

  it("provides concise semantic translations for detailed copy", () => {
    expect(translateDisplayText("網站內容與品牌策略", "en")).toBe("A clear brand experience built around action")
    expect(translateDisplayText("施工進度與材料管理", "ko")).toBe("범위 진행 납품을 명확하게 관리")
  })

  it("keeps translated display copy free of punctuation", () => {
    const title = translateDisplayText("網站設計 SEO 廣告落地頁與電商整合 Qingyu Web Studio", "en")
    expect(title).toBe("Web Design SEO Advertising and Commerce Qingyu Web Studio")
    expect(title).not.toMatch(/[|,:;!?]/)
  })
})
