import { describe, expect, it } from "vitest";
import { prepareFlowOrderReview } from "./floworder-review";

const products = [{ id: "beef", unit: "箱" }, { id: "chicken", unit: "箱" }];
const item = { productId: "beef", productName: "牛五花", quantity: 2, unit: "箱", issue: null };

describe("prepareFlowOrderReview", () => {
  it("prefills only catalog-backed, unambiguous items", () => {
    expect(prepareFlowOrderReview([item], products)).toEqual({ items: [{ productId: "beef", quantity: 2, unit: "箱" }], unresolved: [] });
  });

  it.each([{ productId: null }, { productId: "unknown" }, { quantity: null }, { quantity: -1 }, { quantity: Infinity }, { unit: "kg" }, { issue: "請人工核對" }])("keeps unsafe items visible but out of the confirmation payload: %j", (patch) => {
    const result = prepareFlowOrderReview([{ ...item, ...patch }], products);
    expect(result.items).toEqual([]);
    expect(result.unresolved).toHaveLength(1);
  });

  it("does not hide unresolved lines when some items parsed successfully", () => {
    const result = prepareFlowOrderReview([item, { ...item, productId: null, productName: "龍蝦" }], products);
    expect(result.items).toHaveLength(1);
    expect(result.unresolved[0]?.productName).toBe("龍蝦");
  });

  it("requires manual reconciliation of duplicate products", () => {
    const result = prepareFlowOrderReview([item, { ...item, quantity: 3 }], products);
    expect(result.items).toEqual([]);
    expect(result.unresolved).toHaveLength(2);
  });
});
