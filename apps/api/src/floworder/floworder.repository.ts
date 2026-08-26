import { createHash, randomBytes } from "node:crypto";
import { Inject, Injectable } from "@nestjs/common";
import type { ApiEnvironment } from "@qingyu/config/api";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { API_ENVIRONMENT } from "../environment.js";
import type { FlowOrderAccess } from "./floworder.types.js";

interface DemoSandboxRecord {
  id: string;
  organization_id: string;
  expires_at: string;
}

interface CustomerRecord {
  id: string;
  organization_id: string;
  assigned_sales_account_id: string | null;
  user_id: string | null;
  name: string;
  contact_name: string | null;
}

interface SalesRecord {
  id: string;
  organization_id: string;
  user_id: string | null;
}

@Injectable()
export class FlowOrderRepository {
  private readonly database: SupabaseClient;

  constructor(@Inject(API_ENVIRONMENT) private readonly environment: ApiEnvironment) {
    this.database = createClient(environment.SUPABASE_URL, environment.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  static hashDemoToken(token: string): string {
    return createHash("sha256").update(token, "utf8").digest("hex");
  }

  async consumeRateLimit(scope: string, subject: string, limit: number, windowSeconds: number) {
    const subjectHash = createHash("sha256").update(subject, "utf8").digest("hex");
    const { data, error } = await this.database.rpc("floworder_consume_rate_limit", {
      request_scope: scope,
      request_subject_hash: subjectHash,
      max_requests: limit,
      window_seconds: windowSeconds,
    });
    if (error || !data || typeof data !== "object") throw this.databaseFailure(error);
    return data as { allowed: boolean; count: number; limit: number; retryAfterSeconds: number };
  }

  async createDemoSandbox() {
    const token = randomBytes(32).toString("base64url");
    const { data, error } = await this.database.rpc("floworder_create_demo_sandbox", {
      requested_token_hash: FlowOrderRepository.hashDemoToken(token),
      ttl_minutes: this.environment.FLOWORDER_DEMO_TTL_MINUTES,
    });
    if (error || !data || typeof data !== "object") throw this.databaseFailure(error);
    const record = data as Record<string, unknown>;
    return {
      token,
      sandboxId: String(record.sandboxId),
      organizationId: String(record.organizationId),
      organizationName: String(record.organizationName),
      expiresAt: String(record.expiresAt),
    };
  }

  async findAuthenticatedWorkspace(userId: string, organizationId?: string) {
    let query = this.database
      .from("organization_memberships")
      .select("organization_id,role:roles!organization_memberships_role_id_fkey(slug),organization:organizations!organization_memberships_organization_id_fkey(name)")
      .eq("user_id", userId)
      .order("created_at")
      .limit(1);
    if (organizationId) query = query.eq("organization_id", organizationId);
    const { data, error } = await query.maybeSingle();
    if (error) throw this.databaseFailure(error);
    if (!data) return null;
    const row = data as unknown as {
      organization_id: string;
      role: { slug: string };
      organization: { name: string };
    };
    return {
      organizationId: row.organization_id,
      organizationName: row.organization.name,
      membershipRole: row.role.slug,
    };
  }

  async resolveDemoAccess(token: string, requestedRole: "customer" | "sales" | "admin"): Promise<FlowOrderAccess | null> {
    const { data, error } = await this.database
      .from("floworder_demo_sandboxes")
      .select("id,organization_id,expires_at")
      .eq("token_hash", FlowOrderRepository.hashDemoToken(token))
      .maybeSingle();
    if (error) throw this.databaseFailure(error);
    if (!data) return null;

    const sandbox = data as DemoSandboxRecord;
    if (Date.parse(sandbox.expires_at) <= Date.now()) return null;
    const [{ data: customer }, { data: sales }] = await Promise.all([
      this.database
        .from("floworder_customers")
        .select("id,organization_id,assigned_sales_account_id,user_id,name,contact_name")
        .eq("organization_id", sandbox.organization_id)
        .order("code")
        .limit(1)
        .maybeSingle(),
      this.database
        .from("floworder_sales_accounts")
        .select("id,organization_id,user_id")
        .eq("organization_id", sandbox.organization_id)
        .order("email")
        .limit(1)
        .maybeSingle(),
    ]);
    await this.database
      .from("floworder_demo_sandboxes")
      .update({ last_accessed_at: new Date().toISOString() })
      .eq("id", sandbox.id);

    return {
      kind: "demo",
      organizationId: sandbox.organization_id,
      actorUserId: null,
      role: requestedRole,
      customerId: requestedRole === "customer" ? (customer as CustomerRecord | null)?.id ?? null : null,
      salesAccountId: requestedRole === "sales" ? (sales as SalesRecord | null)?.id ?? null : null,
    };
  }

  async resolveAuthenticatedAccess(
    userId: string,
    organizationId: string,
    membershipRole: "admin" | "manager" | "staff" | "sales" | "customer",
  ): Promise<FlowOrderAccess> {
    if (membershipRole === "customer") {
      const { data, error } = await this.database
        .from("floworder_customers")
        .select("id,organization_id,assigned_sales_account_id,user_id,name,contact_name")
        .eq("organization_id", organizationId)
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw this.databaseFailure(error);
      return {
        kind: "authenticated",
        organizationId,
        actorUserId: userId,
        role: "customer",
        customerId: (data as CustomerRecord | null)?.id ?? null,
        salesAccountId: null,
      };
    }
    if (membershipRole === "staff" || membershipRole === "sales") {
      const { data, error } = await this.database
        .from("floworder_sales_accounts")
        .select("id,organization_id,user_id")
        .eq("organization_id", organizationId)
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw this.databaseFailure(error);
      return {
        kind: "authenticated",
        organizationId,
        actorUserId: userId,
        role: "sales",
        customerId: null,
        salesAccountId: (data as SalesRecord | null)?.id ?? null,
      };
    }
    return {
      kind: "authenticated",
      organizationId,
      actorUserId: userId,
      role: "admin",
      customerId: null,
      salesAccountId: null,
    };
  }

  async getSnapshot(access: FlowOrderAccess, filters?: { search?: string; status?: string }) {
    const organizationId = access.organizationId;
    const [organizationResult, customersResult, tiersResult, salesResult, addressesResult, productsResult, inventoryResult] = await Promise.all([
      this.database.from("organizations").select("id,name").eq("id", organizationId).single(),
      this.database.from("floworder_customers").select("*").eq("organization_id", organizationId).eq("active", true).order("name"),
      this.database.from("floworder_customer_tiers").select("*").eq("organization_id", organizationId).order("default_discount"),
      this.database.from("floworder_sales_accounts").select("*").eq("organization_id", organizationId).eq("active", true).order("name"),
      this.database.from("floworder_customer_addresses").select("*").eq("organization_id", organizationId).order("is_default", { ascending: false }),
      this.database.from("floworder_products").select("*").eq("organization_id", organizationId).eq("active", true).order("sku"),
      this.database.from("floworder_inventory_balances").select("*").eq("organization_id", organizationId),
    ]);
    for (const result of [organizationResult, customersResult, tiersResult, salesResult, addressesResult, productsResult, inventoryResult]) {
      if (result.error) throw this.databaseFailure(result.error);
    }

    const allCustomers = (customersResult.data ?? []) as Array<Record<string, unknown>>;
    const scopedCustomers = allCustomers.filter((customer) => this.customerInScope(access, customer));
    const customerIds = scopedCustomers.map((customer) => String(customer.id));

    let messagesQuery = this.database
      .from("floworder_messages")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })
      .limit(100);
    let ordersQuery = this.database
      .from("floworder_orders")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (access.role !== "admin") {
      if (customerIds.length === 0) {
        messagesQuery = messagesQuery.in("customer_id", ["00000000-0000-0000-0000-000000000000"]);
        ordersQuery = ordersQuery.in("customer_id", ["00000000-0000-0000-0000-000000000000"]);
      } else {
        messagesQuery = messagesQuery.in("customer_id", customerIds);
        ordersQuery = ordersQuery.in("customer_id", customerIds);
      }
    }
    if (filters?.status && filters.status !== "all") messagesQuery = messagesQuery.eq("status", filters.status);
    if (filters?.search) messagesQuery = messagesQuery.ilike("raw_text", `%${this.escapeLike(filters.search)}%`);

    const [messagesResult, ordersResult] = await Promise.all([messagesQuery, ordersQuery]);
    if (messagesResult.error) throw this.databaseFailure(messagesResult.error);
    if (ordersResult.error) throw this.databaseFailure(ordersResult.error);

    const messages = messagesResult.data ?? [];
    const orders = ordersResult.data ?? [];
    const messageIds = messages.map((message) => String(message.id));
    const orderIds = orders.map((order) => String(order.id));
    const [parsesResult, itemsResult, transactionsResult, auditResult] = await Promise.all([
      messageIds.length > 0
        ? this.database.from("floworder_ai_parses").select("*").eq("organization_id", organizationId).in("message_id", messageIds).order("parsed_at", { ascending: false })
        : Promise.resolve({ data: [], error: null }),
      orderIds.length > 0
        ? this.database.from("floworder_order_items").select("*").eq("organization_id", organizationId).in("order_id", orderIds)
        : Promise.resolve({ data: [], error: null }),
      access.role === "customer"
        ? Promise.resolve({ data: [], error: null })
        : this.database.from("floworder_inventory_transactions").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }).limit(100),
      access.role === "admin"
        ? this.database.from("audit_logs").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false }).limit(100)
        : Promise.resolve({ data: [], error: null }),
    ]);
    for (const result of [parsesResult, itemsResult, transactionsResult, auditResult]) {
      if (result.error) throw this.databaseFailure(result.error);
    }

    return {
      organization: organizationResult.data,
      role: access.role,
      currentCustomerId: access.customerId,
      currentSalesAccountId: access.salesAccountId,
      customers: scopedCustomers,
      tiers: tiersResult.data ?? [],
      salesAccounts: salesResult.data ?? [],
      addresses: (addressesResult.data ?? []).filter((address) => access.role === "admin" || customerIds.includes(String(address.customer_id))),
      products: productsResult.data ?? [],
      inventory: access.role === "customer" ? [] : inventoryResult.data ?? [],
      messages,
      parses: parsesResult.data ?? [],
      orders,
      orderItems: itemsResult.data ?? [],
      inventoryTransactions: transactionsResult.data ?? [],
      auditLogs: auditResult.data ?? [],
      provider: {
        openaiConfigured: Boolean(this.environment.OPENAI_API_KEY),
        model: this.environment.OPENAI_MODEL,
      },
      generatedAt: new Date().toISOString(),
    };
  }

  async getMessageContext(access: FlowOrderAccess, messageId: string) {
    const { data: message, error } = await this.database
      .from("floworder_messages")
      .select("*")
      .eq("organization_id", access.organizationId)
      .eq("id", messageId)
      .maybeSingle();
    if (error) throw this.databaseFailure(error);
    if (!message) return null;
    await this.assertCustomerAccess(access, String(message.customer_id));

    const [{ data: customer }, { data: addresses }, { data: products }] = await Promise.all([
      this.database.from("floworder_customers").select("*").eq("organization_id", access.organizationId).eq("id", message.customer_id).single(),
      this.database.from("floworder_customer_addresses").select("*").eq("organization_id", access.organizationId).eq("customer_id", message.customer_id),
      this.database.from("floworder_products").select("id,sku,name,specification,unit").eq("organization_id", access.organizationId).eq("active", true).order("sku"),
    ]);
    return { message, customer, addresses: addresses ?? [], products: products ?? [] };
  }

  async createMessage(access: FlowOrderAccess, input: { customerId?: string | undefined; text: string; source: string; idempotencyKey: string }) {
    const customerId = access.role === "customer" ? access.customerId : input.customerId;
    if (!customerId) throw new Error("CUSTOMER_REQUIRED");
    const customer = await this.assertCustomerAccess(access, customerId);
    const fingerprint = createHash("sha256")
      .update(`${access.organizationId}:${customerId}:${input.text.trim().replace(/\s+/g, " ")}`, "utf8")
      .digest("hex");
    const { data, error } = await this.database.rpc("floworder_create_message", {
      target_organization_id: access.organizationId,
      target_customer_id: customerId,
      actor_user_id: access.actorUserId,
      sender_display_name: customer.contact_name ?? customer.name,
      message_source: input.source,
      message_text: input.text,
      message_fingerprint: fingerprint,
      request_idempotency_key: input.idempotencyKey,
    });
    if (error) throw this.databaseFailure(error);
    return data;
  }

  async updateMessageStatus(access: FlowOrderAccess, messageId: string, status: string) {
    const context = await this.getMessageContext(access, messageId);
    if (!context) return null;
    const patch: Record<string, unknown> = { status };
    if (status === "read") patch.read_at = new Date().toISOString();
    if (status === "archived") patch.archived_at = new Date().toISOString();
    const { data, error } = await this.database
      .from("floworder_messages")
      .update(patch)
      .eq("organization_id", access.organizationId)
      .eq("id", messageId)
      .select("id,status")
      .single();
    if (error) throw this.databaseFailure(error);
    await this.database.from("audit_logs").insert({
      organization_id: access.organizationId,
      actor_user_id: access.actorUserId,
      action: "floworder.message.status_changed",
      target_type: "message",
      target_id: messageId,
      metadata: { status },
    });
    return data;
  }

  async recordParse(access: FlowOrderAccess, messageId: string, parse: {
    provider: string;
    model: string;
    status: string;
    confidence: number | null;
    result: unknown;
    errorCode: string | null;
    durationMs: number;
  }) {
    const { data, error } = await this.database.rpc("floworder_record_parse", {
      target_organization_id: access.organizationId,
      target_message_id: messageId,
      actor_user_id: access.actorUserId,
      parser_provider: parse.provider,
      parser_model: parse.model,
      parser_status: parse.status,
      parser_confidence: parse.confidence,
      parser_result: parse.result,
      parser_error_code: parse.errorCode,
      parser_duration_ms: parse.durationMs,
    });
    if (error) throw this.databaseFailure(error);
    return data;
  }

  async confirmOrder(access: FlowOrderAccess, messageId: string, payload: Record<string, unknown>, idempotencyKey: string) {
    const { data, error } = await this.database.rpc("floworder_confirm_message_order", {
      target_organization_id: access.organizationId,
      target_message_id: messageId,
      actor_user_id: access.actorUserId,
      final_payload: payload,
      request_idempotency_key: idempotencyKey,
    });
    if (error) throw this.databaseFailure(error);
    return data;
  }

  async cancelOrder(access: FlowOrderAccess, orderId: string, reason: string, idempotencyKey: string) {
    const order = await this.getOrder(access, orderId);
    if (!order) return null;
    const { data, error } = await this.database.rpc("floworder_cancel_order", {
      target_organization_id: access.organizationId,
      target_order_id: orderId,
      actor_user_id: access.actorUserId,
      reason_text: reason,
      request_idempotency_key: idempotencyKey,
    });
    if (error) throw this.databaseFailure(error);
    return data;
  }

  async modifyOrder(access: FlowOrderAccess, orderId: string, payload: Record<string, unknown>, idempotencyKey: string) {
    const order = await this.getOrder(access, orderId);
    if (!order) return null;
    const { data, error } = await this.database.rpc("floworder_modify_order", {
      target_organization_id: access.organizationId,
      target_order_id: orderId,
      actor_user_id: access.actorUserId,
      final_payload: payload,
      request_idempotency_key: idempotencyKey,
    });
    if (error) throw this.databaseFailure(error);
    return data;
  }

  async getOrder(access: FlowOrderAccess, orderId: string) {
    const { data: order, error } = await this.database
      .from("floworder_orders")
      .select("*")
      .eq("organization_id", access.organizationId)
      .eq("id", orderId)
      .maybeSingle();
    if (error) throw this.databaseFailure(error);
    if (!order) return null;
    await this.assertCustomerAccess(access, String(order.customer_id));
    const [{ data: customer }, { data: sales }, { data: items }] = await Promise.all([
      this.database.from("floworder_customers").select("*").eq("organization_id", access.organizationId).eq("id", order.customer_id).single(),
      order.sales_account_id
        ? this.database.from("floworder_sales_accounts").select("*").eq("organization_id", access.organizationId).eq("id", order.sales_account_id).maybeSingle()
        : Promise.resolve({ data: null }),
      this.database.from("floworder_order_items").select("*").eq("organization_id", access.organizationId).eq("order_id", orderId).order("created_at"),
    ]);
    return { order, customer, sales, items: items ?? [] };
  }

  private async assertCustomerAccess(access: FlowOrderAccess, customerId: string): Promise<CustomerRecord> {
    const { data, error } = await this.database
      .from("floworder_customers")
      .select("id,organization_id,assigned_sales_account_id,user_id,name,contact_name")
      .eq("organization_id", access.organizationId)
      .eq("id", customerId)
      .maybeSingle();
    if (error) throw this.databaseFailure(error);
    if (!data || !this.customerInScope(access, data as Record<string, unknown>)) throw new Error("CUSTOMER_ACCESS_DENIED");
    return data as CustomerRecord;
  }

  private customerInScope(access: FlowOrderAccess, customer: Record<string, unknown>): boolean {
    if (access.role === "admin") return true;
    if (access.role === "customer") return String(customer.id) === access.customerId;
    return String(customer.assigned_sales_account_id) === access.salesAccountId;
  }

  private escapeLike(value: string): string {
    return value.replace(/[\\%_]/g, (character) => `\\${character}`);
  }

  private databaseFailure(error: unknown): Error {
    const details = error && typeof error === "object" ? error as Record<string, unknown> : {};
    const message = typeof details.message === "string" ? details.message : "DATABASE_ERROR";
    const code = typeof details.code === "string" ? details.code : "UNKNOWN";
    return new Error(`${code}:${message}`);
  }
}
