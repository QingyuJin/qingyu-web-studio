import { describe, expect, it } from "vitest";
import { buildFlowOrderPdf } from "./floworder.pdf.js";

describe("buildFlowOrderPdf", () => {
  it("generates a database-backed PDF document", () => {
    const pdf = buildFlowOrderPdf({
      order: {
        order_number: "FO-202608-000001",
        delivery_date: "2026-08-28",
        delivery_address: "台南市新營區民生路二段 18 號",
        subtotal: 15000,
        discount_total: 600,
        total: 14400,
      },
      customer: { name: "新營佳味餐飲有限公司" },
      sales: { name: "王柏翔" },
      items: [{
        product_name: "美國特選牛五花",
        specification: "10 kg／箱",
        quantity: 15,
        unit: "箱",
        unit_price: 1000,
        line_total: 15000,
      }],
    });
    expect(pdf.subarray(0, 8).toString("ascii")).toBe("%PDF-1.4");
    expect(pdf.length).toBeGreaterThan(1_000);
  });
});

