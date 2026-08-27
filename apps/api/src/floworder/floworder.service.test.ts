import { ForbiddenException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import type { OrderParser } from "./order-parser.js";
import type { FlowOrderRepository } from "./floworder.repository.js";
import { FlowOrderService } from "./floworder.service.js";
import type { FlowOrderAccess } from "./floworder.types.js";
import { RuleBasedOrderParser } from "./rule-order-parser.js";

const customerAccess: FlowOrderAccess = {
  kind: "demo",
  organizationId: "20000000-0000-4000-8000-000000000001",
  actorUserId: null,
  role: "customer",
  customerId: "30000000-0000-4000-8000-000000000001",
  salesAccountId: null,
};

const salesAccess: FlowOrderAccess = {
  ...customerAccess,
  role: "sales",
  customerId: null,
  salesAccountId: "40000000-0000-4000-8000-000000000001",
};

function serviceWith(repository: Partial<FlowOrderRepository>, parser?: OrderParser) {
  const fallbackParser: OrderParser = {
    parse: vi.fn().mockResolvedValue({
      configured: false,
      provider: "openai",
      model: "gpt-5.4-mini",
      durationMs: 1,
      errorCode: "AI_PROVIDER_NOT_CONFIGURED",
    }),
  };
  return new FlowOrderService({
    consumeRateLimit: vi.fn().mockResolvedValue({ allowed: true, count: 1, limit: 30, retryAfterSeconds: 60 }),
    ...repository,
  } as FlowOrderRepository, parser ?? fallbackParser);
}

describe("FlowOrderService", () => {
  it("persists a real rule result without invoking order or stock mutation workflows", async () => {
    const recordParse = vi.fn().mockResolvedValue({ parseId: "rules-parse", status: "needs_review" });
    const confirmOrder = vi.fn();
    const modifyOrder = vi.fn();
    const cancelOrder = vi.fn();
    const service = serviceWith({
      getMessageContext: vi.fn().mockResolvedValue({
        message: { raw_text: "CHKN-001 2箱" }, customer: { name: "測試餐廳" }, addresses: [],
        products: [{ id: "60000000-0000-4000-8000-000000000001", sku: "CHKN-001", name: "雞腿排", specification: "10kg/箱", unit: "箱" }],
      }), recordParse, confirmOrder, modifyOrder, cancelOrder,
    }, new RuleBasedOrderParser());
    const result = await service.parseMessage(salesAccess, "50000000-0000-4000-8000-000000000001");
    expect(result).toMatchObject({ configured: true, provider: "rules", parseId: "rules-parse", status: "needs_review" });
    expect(recordParse).toHaveBeenCalledWith(salesAccess, expect.any(String), expect.objectContaining({ provider: "rules", model: "floworder-rules-v1", status: "needs_review", result: expect.objectContaining({ needsReview: true }) }));
    expect(confirmOrder).not.toHaveBeenCalled();
    expect(modifyOrder).not.toHaveBeenCalled();
    expect(cancelOrder).not.toHaveBeenCalled();
  });

  it("does not allow customers to start parsing", async () => {
    const parse = vi.fn();
    await expect(serviceWith({}, { parse }).parseMessage(customerAccess, "message-id")).rejects.toBeInstanceOf(ForbiddenException);
    expect(parse).not.toHaveBeenCalled();
  });

  it("records rule failures without misreporting a paid provider", async () => {
    const recordParse = vi.fn().mockResolvedValue({ parseId: "failed-parse" });
    const service = serviceWith({ getMessageContext: vi.fn().mockResolvedValue({ message: { raw_text: "test" }, customer: null, addresses: [], products: [] }), recordParse }, { parse: vi.fn().mockRejectedValue(new Error("test failure")) });
    await expect(service.parseMessage(salesAccess, "message-id")).rejects.toMatchObject({ response: expect.objectContaining({ code: "ORDER_PARSER_FAILURE" }) });
    expect(recordParse).toHaveBeenCalledWith(salesAccess, "message-id", expect.objectContaining({ provider: "rules", status: "failed", errorCode: "ORDER_PARSER_FAILURE" }));
  });

  it("allows a customer to persist a message only through the repository workflow", async () => {
    const createMessage = vi.fn().mockResolvedValue({ messageId: "message-id", status: "unread" });
    const service = serviceWith({ createMessage });

    await expect(service.createMessage(customerAccess, {
      text: "牛五花 2 箱",
      source: "web",
      idempotencyKey: "message-test-001",
    })).resolves.toEqual({ messageId: "message-id", status: "unread" });
    expect(createMessage).toHaveBeenCalledOnce();
  });

  it("enforces RBAC before a customer can manage an inbox message", async () => {
    const service = serviceWith({ updateMessageStatus: vi.fn() });
    await expect(service.updateMessageStatus(customerAccess, "50000000-0000-4000-8000-000000000001", {
      status: "processing",
    })).rejects.toBeInstanceOf(ForbiddenException);
  });

  it("records an explicit not-configured AI result without inventing an order", async () => {
    const recordParse = vi.fn().mockResolvedValue({ parseId: "parse-id", status: "not_configured" });
    const service = serviceWith({
      getMessageContext: vi.fn().mockResolvedValue({
        message: { raw_text: "牛五花 2 箱" },
        customer: { name: "新營佳味餐飲有限公司" },
        addresses: [],
        products: [],
      }),
      recordParse,
    });

    const result = await service.parseMessage(salesAccess, "50000000-0000-4000-8000-000000000001");
    expect(result).toMatchObject({ configured: false, errorCode: "AI_PROVIDER_NOT_CONFIGURED" });
    expect(recordParse).toHaveBeenCalledWith(salesAccess, expect.any(String), expect.objectContaining({
      status: "not_configured",
      result: null,
    }));
  });

  it("passes a human-confirmed structured order to the atomic database function", async () => {
    const confirmOrder = vi.fn().mockResolvedValue({ orderId: "order-id", orderNumber: "FO-202608-000001" });
    const service = serviceWith({ confirmOrder });
    const input = {
      items: [{ productId: "60000000-0000-4000-8000-000000000001", quantity: 2, unit: "箱" }],
      deliveryDate: "2026-08-28",
      deliveryAddress: "台南市新營區民生路二段 18 號",
      notes: null,
      idempotencyKey: "confirm-test-001",
    };

    await service.confirmOrder(salesAccess, "50000000-0000-4000-8000-000000000001", input);
    expect(confirmOrder).toHaveBeenCalledWith(
      salesAccess,
      "50000000-0000-4000-8000-000000000001",
      expect.objectContaining({ items: input.items }),
      input.idempotencyKey,
    );
  });

  it("passes an order change to the atomic modification workflow", async () => {
    const modifyOrder = vi.fn().mockResolvedValue({ orderId: "order-id", status: "confirmed" });
    const service = serviceWith({ modifyOrder });
    const input = {
      items: [{ productId: "60000000-0000-4000-8000-000000000001", quantity: 4, unit: "箱" }],
      deliveryDate: "2026-08-29",
      deliveryAddress: "台南市新營區復興路 66 號",
      notes: "客戶調整數量",
      idempotencyKey: "modify-test-001",
    };

    await service.modifyOrder(salesAccess, "50000000-0000-4000-8000-000000000001", input);
    expect(modifyOrder).toHaveBeenCalledWith(
      salesAccess,
      "50000000-0000-4000-8000-000000000001",
      expect.objectContaining({ items: input.items, deliveryAddress: input.deliveryAddress }),
      input.idempotencyKey,
    );
  });

  it("rejects writes after the shared database rate limit is exceeded", async () => {
    const service = serviceWith({
      consumeRateLimit: vi.fn().mockResolvedValue({ allowed: false, count: 31, limit: 30, retryAfterSeconds: 25 }),
      createMessage: vi.fn(),
    });

    await expect(service.createMessage(customerAccess, {
      text: "牛五花 2 箱",
      source: "web",
      idempotencyKey: "message-rate-001",
    })).rejects.toMatchObject({ status: 429 });
  });
});
