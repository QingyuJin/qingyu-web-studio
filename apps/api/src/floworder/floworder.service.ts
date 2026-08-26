import {
  BadGatewayException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type {
  FlowOrderCancellationInput,
  FlowOrderConfirmationInput,
  FlowOrderMessageInput,
  FlowOrderMessageStatusInput,
  FlowOrderModificationInput,
} from "@qingyu/validation";
import type { OrderParser } from "./order-parser.js";
import { ORDER_PARSER } from "./order-parser.js";
import { buildFlowOrderPdf } from "./floworder.pdf.js";
import { FlowOrderRepository } from "./floworder.repository.js";
import type { FlowOrderAccess } from "./floworder.types.js";

@Injectable()
export class FlowOrderService {
  constructor(
    private readonly repository: FlowOrderRepository,
    @Inject(ORDER_PARSER) private readonly parser: OrderParser,
  ) {}

  async createDemoSandbox(limiterSubject: string) {
    await this.enforceRateLimit("demo_sandbox_create", limiterSubject, 8, 900);
    return this.repository.createDemoSandbox();
  }

  async getAuthenticatedSession(userId: string, organizationId?: string) {
    const workspace = await this.repository.findAuthenticatedWorkspace(userId, organizationId);
    if (!workspace) throw this.notFound("FLOWORDER_WORKSPACE_NOT_FOUND", "No FlowOrder workspace is assigned to this account");
    return workspace;
  }

  async getDemoSession(token: string | undefined) {
    if (!token) throw new NotFoundException({ code: "DEMO_SESSION_NOT_FOUND", message: "Demo sandbox not found" });
    const access = await this.repository.resolveDemoAccess(token, "admin");
    if (!access) throw new NotFoundException({ code: "DEMO_SESSION_EXPIRED", message: "Demo sandbox expired or does not exist" });
    return { organizationId: access.organizationId };
  }

  getSnapshot(access: FlowOrderAccess, filters: { search?: string; status?: string }) {
    return this.repository.getSnapshot(access, filters);
  }

  async createMessage(access: FlowOrderAccess, input: FlowOrderMessageInput) {
    await this.enforceAccessRateLimit(access, "message_create", 30, 60);
    try {
      return await this.repository.createMessage(access, input);
    } catch (error) {
      throw this.mapRepositoryError(error);
    }
  }

  async updateMessageStatus(access: FlowOrderAccess, messageId: string, input: FlowOrderMessageStatusInput) {
    this.requireOperationalRole(access);
    await this.enforceAccessRateLimit(access, "message_status", 60, 60);
    const result = await this.repository.updateMessageStatus(access, messageId, input.status);
    if (!result) throw this.notFound("MESSAGE_NOT_FOUND", "Message not found");
    return result;
  }

  async parseMessage(access: FlowOrderAccess, messageId: string) {
    this.requireOperationalRole(access);
    await this.enforceAccessRateLimit(access, "ai_parse", 20, 60);
    const context = await this.repository.getMessageContext(access, messageId);
    if (!context) throw this.notFound("MESSAGE_NOT_FOUND", "Message not found");

    try {
      const parserResponse = await this.parser.parse({
        text: String(context.message.raw_text),
        customerName: String(context.customer?.name ?? ""),
        deliveryAddresses: context.addresses.map((address) =>
          `${String(address.city)}${String(address.district)}${String(address.address_line)}`),
        products: context.products.map((product) => ({
          id: String(product.id),
          sku: String(product.sku),
          name: String(product.name),
          specification: String(product.specification),
          unit: String(product.unit),
        })),
        today: new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(new Date()),
        timezone: "Asia/Taipei",
      });

      if (!parserResponse.configured) {
        await this.repository.recordParse(access, messageId, {
          provider: parserResponse.provider,
          model: parserResponse.model,
          status: "not_configured",
          confidence: null,
          result: null,
          errorCode: parserResponse.errorCode,
          durationMs: parserResponse.durationMs,
        });
        return parserResponse;
      }

      const status = parserResponse.result.needsReview || parserResponse.result.confidence < 0.8
        ? "needs_review"
        : "succeeded";
      const recorded = await this.repository.recordParse(access, messageId, {
        provider: parserResponse.provider,
        model: parserResponse.model,
        status,
        confidence: parserResponse.result.confidence,
        result: parserResponse.result,
        errorCode: null,
        durationMs: parserResponse.durationMs,
      });
      return { ...parserResponse, parseId: (recorded as Record<string, unknown>).parseId, status };
    } catch {
      await this.repository.recordParse(access, messageId, {
        provider: "openai",
        model: "configured-provider",
        status: "failed",
        confidence: null,
        result: null,
        errorCode: "AI_PROVIDER_FAILURE",
        durationMs: 0,
      });
      throw new BadGatewayException({
        code: "AI_PROVIDER_FAILURE",
        message: "The AI provider could not parse this message. No order was created.",
      });
    }
  }

  async confirmOrder(access: FlowOrderAccess, messageId: string, input: FlowOrderConfirmationInput) {
    this.requireOperationalRole(access);
    await this.enforceAccessRateLimit(access, "order_confirm", 30, 60);
    try {
      return await this.repository.confirmOrder(
        access,
        messageId,
        {
          items: input.items,
          deliveryDate: input.deliveryDate,
          deliveryAddress: input.deliveryAddress,
          notes: input.notes ?? null,
        },
        input.idempotencyKey,
      );
    } catch (error) {
      throw this.mapRepositoryError(error);
    }
  }

  async cancelOrder(access: FlowOrderAccess, orderId: string, input: FlowOrderCancellationInput) {
    this.requireOperationalRole(access);
    await this.enforceAccessRateLimit(access, "order_cancel", 30, 60);
    try {
      const result = await this.repository.cancelOrder(access, orderId, input.reason, input.idempotencyKey);
      if (!result) throw this.notFound("ORDER_NOT_FOUND", "Order not found");
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw this.mapRepositoryError(error);
    }
  }

  async modifyOrder(access: FlowOrderAccess, orderId: string, input: FlowOrderModificationInput) {
    this.requireOperationalRole(access);
    await this.enforceAccessRateLimit(access, "order_modify", 30, 60);
    try {
      const result = await this.repository.modifyOrder(access, orderId, {
        items: input.items,
        deliveryDate: input.deliveryDate,
        deliveryAddress: input.deliveryAddress,
        notes: input.notes ?? null,
      }, input.idempotencyKey);
      if (!result) throw this.notFound("ORDER_NOT_FOUND", "Order not found");
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw this.mapRepositoryError(error);
    }
  }

  async getOrderPdf(access: FlowOrderAccess, orderId: string) {
    const order = await this.repository.getOrder(access, orderId);
    if (!order) throw this.notFound("ORDER_NOT_FOUND", "Order not found");
    return {
      filename: `${String(order.order.order_number)}.pdf`,
      buffer: buildFlowOrderPdf({
        order: order.order as Record<string, unknown>,
        customer: order.customer as Record<string, unknown> | null,
        sales: order.sales as Record<string, unknown> | null,
        items: order.items as Array<Record<string, unknown>>,
      }),
    };
  }

  private requireOperationalRole(access: FlowOrderAccess): void {
    if (access.role === "customer") {
      throw new ForbiddenException({
        code: "FLOWORDER_ROLE_DENIED",
        message: "Customer accounts cannot manage messages or orders",
      });
    }
  }

  private enforceAccessRateLimit(access: FlowOrderAccess, scope: string, limit: number, windowSeconds: number) {
    const subject = `${access.kind}:${access.actorUserId ?? access.organizationId}:${access.role}`;
    return this.enforceRateLimit(scope, subject, limit, windowSeconds);
  }

  private async enforceRateLimit(scope: string, subject: string, limit: number, windowSeconds: number) {
    const result = await this.repository.consumeRateLimit(scope, subject, limit, windowSeconds);
    if (!result.allowed) {
      throw new HttpException({
        code: "RATE_LIMIT_EXCEEDED",
        message: "Too many requests. Please retry shortly.",
        retryAfterSeconds: result.retryAfterSeconds,
      }, HttpStatus.TOO_MANY_REQUESTS);
    }
  }

  private mapRepositoryError(error: unknown) {
    const message = error instanceof Error ? error.message : "DATABASE_ERROR";
    if (message.includes("DUPLICATE_MESSAGE")) {
      return new ConflictException({ code: "DUPLICATE_MESSAGE", message: "This message has already been received" });
    }
    if (message.includes("INSUFFICIENT_STOCK")) {
      return new ConflictException({ code: "INSUFFICIENT_STOCK", message: "Available stock is insufficient" });
    }
    if (message.includes("ALREADY_CONVERTED") || message.includes("ALREADY_CANCELED")) {
      return new ConflictException({ code: "DUPLICATE_OPERATION", message: "This operation has already been completed" });
    }
    if (message.includes("CANNOT_BE_MODIFIED") || message.includes("DUPLICATE_ORDER_PRODUCT")) {
      return new ConflictException({ code: "ORDER_MODIFICATION_REJECTED", message: "This order cannot be modified with the requested items" });
    }
    if (message.includes("NOT_FOUND")) return this.notFound("RESOURCE_NOT_FOUND", "The requested record was not found");
    if (message.includes("ACCESS_DENIED") || message.includes("CUSTOMER_REQUIRED")) {
      return new ForbiddenException({ code: "FLOWORDER_ACCESS_DENIED", message: "The selected record is outside this role's scope" });
    }
    return new ConflictException({ code: "FLOWORDER_OPERATION_FAILED", message: "The operation could not be completed" });
  }

  private notFound(code: string, message: string): NotFoundException {
    return new NotFoundException({ code, message });
  }
}
