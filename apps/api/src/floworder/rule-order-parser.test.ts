import { afterEach, describe, expect, it, vi } from "vitest";
import type { OrderParserInput } from "./order-parser.js";
import { RuleBasedOrderParser } from "./rule-order-parser.js";

const input: OrderParserInput = {
  text: "",
  customerName: "測試餐廳",
  deliveryAddresses: ["台南市新營區民生路二段 18 號"],
  products: [
    { id: "60000000-0000-4000-8000-000000000001", sku: "BEEF-001", name: "美國特選牛五花", unit: "箱", specification: "10kg/箱" },
    { id: "60000000-0000-4000-8000-000000000002", sku: "BEEF-007", name: "澳洲穀飼牛五花", unit: "箱", specification: "10kg/箱" },
    { id: "60000000-0000-4000-8000-000000000003", sku: "CHKN-001", name: "國產去骨雞腿排", unit: "箱", specification: "10kg/箱" },
  ],
  today: "2026-08-27",
  timezone: "Asia/Taipei",
};

async function parse(text: string, overrides: Partial<OrderParserInput> = {}) {
  const response = await new RuleBasedOrderParser().parse({ ...input, ...overrides, text });
  expect(response).toMatchObject({ configured: true, provider: "rules", model: "floworder-rules-v1" });
  if (!response.configured) throw new Error("Rules must not need an API key");
  expect(response.result.needsReview).toBe(true);
  return response.result;
}

afterEach(() => vi.unstubAllGlobals());

describe("RuleBasedOrderParser", () => {
  it("parses exact SKUs, names, quantities, date and address without any network calls", async () => {
    const fetch = vi.fn(() => { throw new Error("Network is forbidden for rules"); });
    vi.stubGlobal("fetch", fetch);
    const result = await parse("請訂 美國特選牛五花（SKU BEEF-001）2箱、國產去骨雞腿排（SKU CHKN-001）3箱。送貨日期：2026-08-30。送貨地址：台南市新營區民生路二段18號。");
    expect(result.items).toHaveLength(2);
    expect(result.items.map((item) => [item.sku, item.quantity, item.unit, item.issue])).toEqual([["BEEF-001", 2, "箱", null], ["CHKN-001", 3, "箱", null]]);
    expect(result.deliveryDate).toBe("2026-08-30");
    expect(result.deliveryAddress).toBe(input.deliveryAddresses[0]);
    expect(result.issues).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("handles full-width digits, Chinese numbers, lower-case SKU, and adjacent items", async () => {
    const result = await parse("beef-001 ２箱雞腿排三箱");
    expect(result.items.map((item) => [item.sku, item.quantity])).toEqual([["BEEF-001", 2], ["CHKN-001", 3]]);
  });

  it("does not mistake an inline ISO delivery date for a quantity range", async () => {
    const result = await parse("雞腿排2箱 2026-08-30送到台南市新營區民生路二段18號");
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.quantity).toBe(2);
    expect(result.deliveryDate).toBe("2026-08-30");
  });

  it("does not guess colloquial Chinese quantities such as 一百二", async () => {
    expect((await parse("雞腿排一百二箱")).items[0]?.quantity).toBeNull();
  });

  it.each([["十二", 12], ["兩", 2], ["二十五", 25], ["一百零二", 102], ["二點五", 2.5], ["1,000", 1000], ["0.125", 0.125]])("reads quantity %s", async (quantity, expected) => {
    expect((await parse(`CHKN-001 ${quantity}箱`)).items[0]?.quantity).toBe(expected);
  });

  it("does not guess between multiple products sharing the same short name", async () => {
    const item = (await parse("牛五花2箱")).items[0];
    expect(item).toMatchObject({ productId: null, quantity: null });
    expect(item?.issue).toContain("多個商品");
  });

  it.each(["龍蝦2箱", "BEEF-999 2箱", "BEEF-0012 2箱", "國產去骨雞腿排 SKU BEEF-001 2箱", "龍蝦 SKU BEEF-001 2箱", "國產去骨雞腿排和龍蝦2箱"])("keeps unknown/conflicting references unresolved: %s", async (text) => {
    expect((await parse(text)).items[0]).toMatchObject({ productId: null, quantity: null });
  });

  it.each(["不要雞腿排2箱", "雞腿排2到3箱", "雞腿排2~3箱", "雞腿排2箱或3箱", "雞腿排各2箱", "雞腿排約2箱", "雞腿排改成3箱", "雞腿排-2箱", "雞腿排0箱", "雞腿排0.0001箱", "雞腿排1000001箱"])("never prefills unsafe quantities: %s", async (text) => {
    expect((await parse(text)).items.every((item) => item.quantity === null && item.issue)).toBe(true);
  });

  it("does not silently convert kilograms into boxes", async () => {
    const item = (await parse("雞腿排2公斤")).items[0];
    expect(item?.quantity).toBeNull();
    expect(item?.issue).toContain("不會自動換算");
  });

  it("preserves missing and unknown items for human review", async () => {
    const result = await parse("雞腿排2箱，牛五花，龍蝦1箱");
    expect(result.items).toHaveLength(3);
    expect(result.items[1]?.quantity).toBeNull();
    expect(result.items[2]?.productId).toBeNull();
  });

  it("does not automatically sum repeated items", async () => {
    const result = await parse("雞腿排2箱，CHKN-001 3箱");
    expect(result.items.every((item) => item.quantity === null && item.issue?.includes("重複"))).toBe(true);
  });

  it.each([["2026/8/30", "2026-08-30"], ["2026年8月30日", "2026-08-30"], ["8/30", "2026-08-30"], ["明天", "2026-08-28"], ["後天", "2026-08-29"], ["大後天", "2026-08-30"], ["本週五", "2026-08-28"], ["下週一", "2026-08-31"]])("recognizes explicit delivery date %s", async (date, expected) => {
    expect((await parse(`雞腿排2箱，配送日期：${date}`)).deliveryDate).toBe(expected);
  });

  it.each(["2026-02-30", "2026-08-26", "星期五", "月底", "2026-08-30或2026-08-31", "本週一", "8/20", "下週"])("does not guess invalid or ambiguous date %s", async (date) => {
    const result = await parse(`雞腿排2箱，日期：${date}`);
    expect(result.deliveryDate).toBeNull();
    expect(result.issues.some((issue) => issue.includes("日期"))).toBe(true);
  });

  it("does not extract products from notes and retains the notes", async () => {
    const result = await parse("雞腿排2箱。備註：牛五花3箱是上次的訂單");
    expect(result.items).toHaveLength(1);
    expect(result.notes).toContain("上次");
  });

  it("marks a new explicit address for review and never infers a vague destination", async () => {
    const result = await parse("雞腿排2箱，地址：台南市測試路100號");
    expect(result.deliveryAddress).toBe("台南市測試路100號");
    expect(result.issues.join()).toContain("不是已登錄");
    expect((await parse("雞腿排2箱，明天送新營")).deliveryAddress).toBeNull();
  });

  it("handles empty input and malformed context without invoking any provider", async () => {
    const result = await parse("", { today: "invalid", products: [], deliveryAddresses: [] });
    expect(result.items).toEqual([]);
    expect(result.deliveryDate).toBeNull();
    expect(result.issues.length).toBeGreaterThan(0);
  });
});
