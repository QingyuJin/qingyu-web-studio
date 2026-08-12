import { describe, expect, it } from "vitest"
import { cleanDisplayText } from "./ExperiencePolish"

describe("cleanDisplayText", () => {
  it("removes decorative and sentence punctuation", () => {
    expect(cleanDisplayText("品牌、網站與成長｜立即查看 →")).toBe("品牌 網站與成長 立即查看")
  })

  it("preserves functional email addresses", () => {
    expect(cleanDisplayText("a0988874324@gmail.com")).toBe("a0988874324@gmail.com")
  })

  it("keeps inline spacing stable", () => {
    expect(cleanDisplayText(" 品牌 · 網站 ")).toBe(" 品牌 網站 ")
  })
})
