import { describe, expect, it } from "vitest"
import { localizedBrandName, translateDisplayText } from "./translations"

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

  it("keeps short interface fallbacks compact", () => {
    expect(translateDisplayText("網站內容", "en")).toBe("Brand Website")
    expect(translateDisplayText("施工進度", "ja")).toBe("施工管理")
    expect(translateDisplayText("補充說明", "ko")).toBe("핵심 내용")
  })

  it("uses compact translations for work cards", () => {
    expect(translateDisplayText("LULUFACE 美容品牌電商", "en")).toBe("LULUFACE Beauty Commerce")
    expect(translateDisplayText("品牌電商", "en")).toBe("Brand Commerce")
    expect(translateDisplayText("開啟正式展示", "en")).toBe("Open Live Site")
    expect(translateDisplayText("平台電商 Shopify MeepShop 建置與視覺優化", "ko")).toBe("Shopify MeepShop 스토어 디자인")
    expect(translateDisplayText("12 000 20 000 元", "en")).toBe("NT$12 000 to 20 000")
    expect(translateDisplayText("6 000 元以下", "ja")).toBe("NT$6 000以下")
  })

  it("keeps translated display copy free of punctuation", () => {
    const title = translateDisplayText("網站設計 SEO 廣告落地頁與電商整合 Qingyu Web Studio", "en")
    expect(title).toBe("Web Design SEO Advertising and Commerce Qingyu Web Studio")
    expect(title).not.toMatch(/[|,:;!?]/)
  })

  it("uses the official Chinese brand name and corrects the old mistranslation", () => {
    expect(localizedBrandName("zh-Hant")).toBe("晴宇")
    expect(translateDisplayText("Qingyu Web Studio", "zh-Hant")).toBe("晴宇")
    expect(translateDisplayText("青雨網路工作室", "zh-Hant")).toBe("晴宇")
    expect(translateDisplayText("青雨网络工作室", "en")).toBe("Qingyu Web Studio")
  })

  it("localizes every mission display string kept by preserveUnknown", () => {
    const cases = [
      ["← 晴宇", "Back to Qingyu", "Qingyuへ戻る", "Qingyu로 돌아가기"],
      ["5 盒 · ABC 餐廳專屬價格", "5 Boxes ABC Restaurant Price", "5箱 ABCレストラン専用価格", "5박스 ABC 식당 전용 가격"],
      ["剛剛 · LINE 詢價", "Just Now LINE Inquiry", "たった今 LINE問い合わせ", "방금 LINE 문의"],
      ["customer_name → 收件客戶", "customer_name Customer", "customer_name 顧客名", "customer_name 고객명"],
      ["items → 出貨品項", "items Shipping Items", "items 出荷品目", "items 출고 품목"],
      ["source_id → 去重識別", "source_id Duplicate Check ID", "source_id 重複防止ID", "source_id 중복 방지 ID"],
      ["網站聊天 · 剛剛收到", "Website Chat Just Now", "サイトチャット たった今受信", "웹사이트 채팅 방금 수신"],
    ]

    for (const [source, en, ja, ko] of cases) {
      const options = { preserveUnknown: true }
      expect(translateDisplayText(source, "en", options)).toBe(en)
      expect(translateDisplayText(source, "ja", options)).toBe(ja)
      expect(translateDisplayText(source, "ko", options)).toBe(ko)
    }
  })
})
