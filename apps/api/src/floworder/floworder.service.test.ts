import { ForbiddenException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import type { OrderParser } from "./order-parser.js";
import type { FlowOrderRepository } from "./floworder.repository.js";
import { FlowOrderService } from "./floworder.service.js";
import type { FlowOrderAccess } from "./floworder.types.js";

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
