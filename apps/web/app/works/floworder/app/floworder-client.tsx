"use client";

import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type FlowOrderRole = "customer" | "sales" | "admin";
type WorkspaceView = "inbox" | "orders" | "inventory" | "audit";

interface Customer {
  id: string;
  code: string;
  name: string;
  contact_name: string | null;
  assigned_sales_account_id: string | null;
}

interface Address {
  id: string;
  customer_id: string;
  city: string;
  district: string;
  address_line: string;
  is_default: boolean;
}

interface Message {
  id: string;
  customer_id: string;
  sender_name: string;
  raw_text: string;
  status: "unread" | "read" | "processing" | "converted" | "archived";
  created_at: string;
}

interface ParseRecord {
  id: string;
  message_id: string;
  provider: string;
  model: string;
  status: "succeeded" | "needs_review" | "failed" | "not_configured";
  confidence: number | null;
  structured_result: ParsedResult | null;
  error_code: string | null;
  parsed_at: string;
}

interface ParsedResult {
  items?: Array<{
    productId: string | null;
    productName: string;
    quantity: number | null;
    unit: string | null;
    confidence: number;
    issue: string | null;
  }>;
  deliveryDate?: string | null;
  deliveryAddress?: string | null;
  notes?: string | null;
  issues?: string[];
  confidence?: number;
  needsReview?: boolean;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  specification: string;
  unit: string;
  standard_price: number;
  safety_stock: number;
}

interface InventoryBalance {
  product_id: string;
  on_hand: number;
  reserved: number;
  updated_at: string;
}

interface OrderRecord {
  id: string;
  order_number: string;
  customer_id: string;
  status: "pending" | "confirmed" | "preparing" | "shipped" | "completed" | "canceled";
  payment_status: string;
  fulfillment_status: string;
  delivery_date: string | null;
  delivery_address: string;
  notes: string | null;
  subtotal: number;
  discount_total: number;
  total: number;
  created_at: string;
}

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  sku: string;
  product_name: string;
  specification: string;
  unit: string;
  quantity: number;
  unit_price: number;
  discount_percent: number;
  line_total: number;
}

interface AuditLog {
  id: string;
  action: string;
  target_type: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

interface Snapshot {
  organization: { id: string; name: string };
  role: FlowOrderRole;
  currentCustomerId: string | null;
  customers: Customer[];
  addresses: Address[];
  products: Product[];
  inventory: InventoryBalance[];
  messages: Message[];
  parses: ParseRecord[];
  orders: OrderRecord[];
  orderItems: OrderItem[];
  auditLogs: AuditLog[];
  provider: { openaiConfigured: boolean; model: string };
  generatedAt: string;
}

interface ApiErrorPayload {
  error?: { code?: string; message?: string };
}

const roleLabels: Record<FlowOrderRole, string> = {
  customer: "客戶",
  sales: "業務",
  admin: "老闆",
};

const messageStatus: Record<Message["status"], string> = {
  unread: "未讀",
  read: "已讀",
  processing: "處理中",
  converted: "已轉訂單",
  archived: "已封存",
};

const orderStatus: Record<OrderRecord["status"], string> = {
  pending: "待確認",
  confirmed: "已確認",
  preparing: "備貨中",
  shipped: "已出貨",
  completed: "已完成",
  canceled: "已取消",
};

function currency(value: number | string): string {
  return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(Number(value));
}

function dateTime(value: string): string {
  return new Intl.DateTimeFormat("zh-TW", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Taipei" }).format(new Date(value));
}

async function api<T>(path: string, role: FlowOrderRole, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("x-floworder-role", role);
  if (init?.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  const response = await fetch(`/api/floworder/${path}`, { ...init, headers, cache: "no-store" });
  if (!response.ok) {
    let payload: ApiErrorPayload = {};
    try { payload = await response.json() as ApiErrorPayload; } catch { /* Non-JSON upstream failure. */ }
    throw new Error(payload.error?.message ?? `操作失敗（${response.status}）`);
  }
  return response.json() as Promise<T>;
}

export function FlowOrderClient({ organizationId: requestedOrganizationId, role }: { organizationId?: string; role: FlowOrderRole }) {
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [view, setView] = useState<WorkspaceView>(role === "customer" ? "orders" : "inbox");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const loadSnapshot = useCallback(async (orgId: string, filters?: { search?: string; status?: string }) => {
    const query = new URLSearchParams();
    if (filters?.search) query.set("search", filters.search);
    if (filters?.status && filters.status !== "all") query.set("status", filters.status);
    const data = await api<Snapshot>(
      `organizations/${orgId}/floworder/snapshot${query.size ? `?${query}` : ""}`,
      role,
    );
    setSnapshot(data);
    setSelectedMessageId((current) => current ?? data.messages[0]?.id ?? null);
  }, [role]);

  useEffect(() => {
    let active = true;
    async function start() {
      setLoading(true);
      setError(null);
      try {
        let session: { organizationId: string };
        try {
          const query = requestedOrganizationId ? `?organization=${encodeURIComponent(requestedOrganizationId)}` : "";
          session = await api<{ organizationId: string }>(`floworder/session${query}`, role);
        } catch {
          try {
            session = await api<{ organizationId: string }>("floworder/demo/session", role);
          } catch {
            session = await api<{ organizationId: string }>("floworder/demo/sandboxes", role, { method: "POST" });
          }
        }
        if (!active) return;
        setOrganizationId(session.organizationId);
        await loadSnapshot(session.organizationId);
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "無法開啟 FlowOrder 工作區");
      } finally {
        if (active) setLoading(false);
      }
    }
    void start();
    return () => { active = false; };
  }, [loadSnapshot, requestedOrganizationId, role]);

  const runAction = useCallback(async (key: string, action: () => Promise<string>) => {
    if (!organizationId) return;
    setPendingAction(key);
    setNotice(null);
    setError(null);
    try {
      const message = await action();
      await loadSnapshot(organizationId);
      setNotice(message);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "操作未完成");
    } finally {
      setPendingAction(null);
    }
  }, [loadSnapshot, organizationId]);

  if (loading) return <LoadingScreen label="正在建立隔離體驗工作區…" />;
  if (error && !snapshot) return <UnavailableScreen error={error} />;
  if (!snapshot || !organizationId) return <UnavailableScreen error="FlowOrder 工作區尚未就緒" />;

  return (
    <main className="min-h-screen bg-[#f5f6f3] text-[#17211d]">
      <WorkspaceHeader role={role} organization={snapshot.organization.name} />
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-5 sm:px-6 lg:px-8">
        {error ? <Alert tone="error">{error}</Alert> : null}
        {notice ? <Alert tone="success">{notice}</Alert> : null}
        {role === "customer" ? (
          <CustomerWorkspace
            organizationId={organizationId}
            pendingAction={pendingAction}
            role={role}
            runAction={runAction}
            snapshot={snapshot}
          />
        ) : (
          <OperationsWorkspace
            loadSnapshot={loadSnapshot}
            organizationId={organizationId}
            pendingAction={pendingAction}
            role={role}
            runAction={runAction}
            selectedMessageId={selectedMessageId}
            setSelectedMessageId={setSelectedMessageId}
            setView={setView}
            snapshot={snapshot}
            view={view}
          />
        )}
      </div>
    </main>
  );
}

function WorkspaceHeader({ role, organization }: { role: FlowOrderRole; organization: string }) {
  return (
    <header className="border-b border-[#dfe3de] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <Link className="text-xs font-semibold text-[#347468]" href="/works/floworder">FlowOrder</Link>
          <p className="truncate text-sm font-semibold sm:text-base">{organization}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-[#69746d] sm:inline">切換視角</span>
          {(["customer", "sales", "admin"] as const).map((item) => (
            <Link
              className={`rounded-full px-3 py-2 text-xs font-semibold ${item === role ? "bg-[#173f37] text-white" : "border border-[#d9ded9] bg-white"}`}
              href={`/works/floworder/app/${item}`}
              key={item}
            >
              {roleLabels[item]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

function CustomerWorkspace(props: {
  organizationId: string;
  pendingAction: string | null;
  role: FlowOrderRole;
  runAction: (key: string, action: () => Promise<string>) => Promise<void>;
  snapshot: Snapshot;
}) {
  const { organizationId, pendingAction, role, runAction, snapshot } = props;
  const [text, setText] = useState("");
  const customer = snapshot.customers.find((item) => item.id === snapshot.currentCustomerId) ?? snapshot.customers[0];
  const orders = snapshot.orders.filter((order) => order.customer_id === customer?.id);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedText = text.trim();
    if (!submittedText) return;
    void runAction("send-message", async () => {
      const result = await api<{ messageId: string }>(`organizations/${organizationId}/floworder/messages`, role, {
        method: "POST",
        body: JSON.stringify({ text: submittedText, source: "web", idempotencyKey: crypto.randomUUID() }),
      });
      setText("");
      return `訊息已送出並建立紀錄（${result.messageId.slice(0, 8)}）`;
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <section className="py-8 sm:py-12">
        <p className="text-sm font-semibold text-[#347468]">{customer?.name ?? "客戶工作區"}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">照平常的方式，傳一句話就好</h1>
        <p className="mt-4 max-w-xl leading-7 text-[#667169]">送出後會真正寫入這個隔離工作區，業務端重新整理就能看到。</p>
      </section>

      <form className="rounded-3xl border border-[#dfe3de] bg-white p-5 shadow-[0_18px_60px_rgba(31,48,40,.06)] sm:p-7" onSubmit={submit}>
        <label className="text-sm font-semibold" htmlFor="order-message">這次要訂什麼？</label>
        <textarea
          className="mt-3 min-h-36 w-full resize-y rounded-2xl border border-[#d8ded8] bg-[#fbfcfa] p-4 text-base leading-7 outline-none focus:border-[#347468] focus:ring-2 focus:ring-[#dcece7]"
          id="order-message"
          maxLength={4000}
          onChange={(event) => setText(event.target.value)}
          placeholder="例如：牛五花15箱，雞腿排8箱，星期五送新營"
          required
          value={text}
        />
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-[#758079]">AI 只會整理內容，正式訂單仍需業務確認。</p>
          <button className="min-h-12 shrink-0 rounded-full bg-[#173f37] px-6 text-sm font-semibold text-white disabled:opacity-50" disabled={pendingAction === "send-message"} type="submit">
            {pendingAction === "send-message" ? "送出中…" : "送出訂單訊息"}
          </button>
        </div>
      </form>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div><p className="text-xs font-semibold text-[#738078]">歷史紀錄</p><h2 className="mt-1 text-2xl font-semibold">我的訂單</h2></div>
          <span className="text-sm text-[#68736c]">{orders.length} 筆</span>
        </div>
        <div className="mt-4 divide-y divide-[#e3e6e2] border-y border-[#e3e6e2]">
          {orders.map((order) => (
            <details className="group py-5" key={order.id}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div><p className="font-semibold">{order.order_number}</p><p className="mt-1 text-sm text-[#69736d]">{order.delivery_date ?? "配送日待確認"}</p></div>
                <div className="text-right"><p className="font-semibold">{currency(order.total)}</p><p className="mt-1 text-xs text-[#347468]">{orderStatus[order.status]}</p></div>
              </summary>
              <OrderDetail order={order} items={snapshot.orderItems.filter((item) => item.order_id === order.id)} />
            </details>
          ))}
          {orders.length === 0 ? <EmptyState>還沒有正式訂單；訊息需由業務確認後才會出現在這裡。</EmptyState> : null}
        </div>
      </section>
    </div>
  );
}

function OperationsWorkspace(props: {
  loadSnapshot: (organizationId: string, filters?: { search?: string; status?: string }) => Promise<void>;
  organizationId: string;
  pendingAction: string | null;
  role: FlowOrderRole;
  runAction: (key: string, action: () => Promise<string>) => Promise<void>;
  selectedMessageId: string | null;
  setSelectedMessageId: (id: string) => void;
  setView: (view: WorkspaceView) => void;
  snapshot: Snapshot;
  view: WorkspaceView;
}) {
  const { loadSnapshot, organizationId, pendingAction, role, runAction, selectedMessageId, setSelectedMessageId, setView, snapshot, view } = props;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei" }).format(new Date());
  const todayOrders = snapshot.orders.filter((order) => order.created_at.startsWith(today));
  const pendingMessages = snapshot.messages.filter((message) => ["unread", "read", "processing"].includes(message.status));
  const total = todayOrders.reduce((sum, order) => sum + Number(order.total), 0);

  return (
    <>
      <section className="py-6 sm:py-9">
        <p className="text-sm font-semibold text-[#347468]">今天</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
          {todayOrders.length} 張訂單 · {currency(total)}
        </h1>
        <button className="mt-3 text-sm font-semibold text-[#9a5d23] underline-offset-4 hover:underline" onClick={() => setView("inbox")} type="button">
          {pendingMessages.length} 張待處理
        </button>
      </section>

      <nav className="flex gap-1 overflow-x-auto border-b border-[#dfe3de]" aria-label="FlowOrder 功能">
        {([
          ["inbox", "待處理"], ["orders", "訂單"], ["inventory", "庫存"], ...(role === "admin" ? [["audit", "系統紀錄"]] : []),
        ] as Array<[WorkspaceView, string]>).map(([key, label]) => (
          <button className={`min-h-11 shrink-0 border-b-2 px-4 text-sm font-semibold ${view === key ? "border-[#173f37] text-[#173f37]" : "border-transparent text-[#6f7a73]"}`} key={key} onClick={() => setView(key)} type="button">{label}</button>
        ))}
      </nav>

      {view === "inbox" ? (
        <InboxView
          loadSnapshot={loadSnapshot}
          organizationId={organizationId}
          pendingAction={pendingAction}
          role={role}
          runAction={runAction}
          selectedMessageId={selectedMessageId}
          setSelectedMessageId={setSelectedMessageId}
          snapshot={snapshot}
        />
      ) : null}
      {view === "orders" ? <OrdersView organizationId={organizationId} pendingAction={pendingAction} role={role} runAction={runAction} snapshot={snapshot} /> : null}
      {view === "inventory" ? <InventoryView snapshot={snapshot} /> : null}
      {view === "audit" && role === "admin" ? <AuditView snapshot={snapshot} /> : null}
    </>
  );
}

function InboxView(props: {
  loadSnapshot: (organizationId: string, filters?: { search?: string; status?: string }) => Promise<void>;
  organizationId: string;
  pendingAction: string | null;
  role: FlowOrderRole;
  runAction: (key: string, action: () => Promise<string>) => Promise<void>;
  selectedMessageId: string | null;
  setSelectedMessageId: (id: string) => void;
  snapshot: Snapshot;
}) {
  const { loadSnapshot, organizationId, pendingAction, role, runAction, selectedMessageId, setSelectedMessageId, snapshot } = props;
  const selected = snapshot.messages.find((message) => message.id === selectedMessageId) ?? snapshot.messages[0];
  const parse = snapshot.parses.find((item) => item.message_id === selected?.id);
  const customer = snapshot.customers.find((item) => item.id === selected?.customer_id);
  const address = snapshot.addresses.find((item) => item.customer_id === customer?.id && item.is_default);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  function filter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadSnapshot(organizationId, { search: search.trim(), status });
  }

  return (
    <section className="mt-6 grid gap-5 lg:grid-cols-[22rem_1fr]">
      <div>
        <form className="flex gap-2" onSubmit={filter}>
          <input className="min-h-11 min-w-0 flex-1 rounded-xl border border-[#d8ddd8] bg-white px-3 text-sm outline-none focus:border-[#347468]" onChange={(event) => setSearch(event.target.value)} placeholder="搜尋訊息" value={search} />
          <button className="rounded-xl border border-[#cfd6cf] bg-white px-4 text-sm font-semibold" type="submit">搜尋</button>
        </form>
        <select className="mt-2 min-h-11 w-full rounded-xl border border-[#d8ddd8] bg-white px-3 text-sm" onChange={(event) => { setStatus(event.target.value); void loadSnapshot(organizationId, { search, status: event.target.value }); }} value={status}>
          <option value="all">全部狀態</option><option value="unread">未讀</option><option value="read">已讀</option><option value="processing">處理中</option><option value="converted">已轉訂單</option><option value="archived">已封存</option>
        </select>
        <div className="mt-3 max-h-[42rem] space-y-2 overflow-y-auto">
          {snapshot.messages.map((message) => {
            const itemCustomer = snapshot.customers.find((item) => item.id === message.customer_id);
            return (
              <button className={`w-full rounded-2xl border p-4 text-left ${message.id === selected?.id ? "border-[#347468] bg-white" : "border-transparent bg-[#eef0ec] hover:border-[#d5dad5]"}`} key={message.id} onClick={() => setSelectedMessageId(message.id)} type="button">
                <div className="flex items-center justify-between gap-3"><p className="truncate font-semibold">{itemCustomer?.name ?? message.sender_name}</p><span className="shrink-0 text-[11px] font-semibold text-[#347468]">{messageStatus[message.status]}</span></div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#657069]">{message.raw_text}</p>
                <p className="mt-2 text-xs text-[#89918c]">{dateTime(message.created_at)}</p>
              </button>
            );
          })}
          {snapshot.messages.length === 0 ? <EmptyState>沒有符合條件的訊息。</EmptyState> : null}
        </div>
      </div>

      {selected ? (
        <article className="rounded-3xl border border-[#dfe3de] bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#e6e9e5] pb-5">
            <div><p className="text-xs font-semibold text-[#738078]">{messageStatus[selected.status]}</p><h2 className="mt-1 text-2xl font-semibold">{customer?.name ?? selected.sender_name}</h2><p className="mt-1 text-sm text-[#6b756f]">{dateTime(selected.created_at)}</p></div>
            <div className="flex gap-2">
              {selected.status === "unread" ? <ActionButton disabled={pendingAction !== null} onClick={() => void runAction(`read-${selected.id}`, async () => { await api(`organizations/${organizationId}/floworder/messages/${selected.id}/status`, role, { method: "PATCH", body: JSON.stringify({ status: "read" }) }); return "訊息已標記為已讀"; })}>標記已讀</ActionButton> : null}
              {selected.status !== "archived" ? <ActionButton disabled={pendingAction !== null} onClick={() => void runAction(`archive-${selected.id}`, async () => { await api(`organizations/${organizationId}/floworder/messages/${selected.id}/status`, role, { method: "PATCH", body: JSON.stringify({ status: "archived" }) }); return "訊息已封存"; })}>封存</ActionButton> : null}
            </div>
          </div>
          <blockquote className="my-6 rounded-2xl bg-[#f3f5f1] p-5 text-lg font-medium leading-8">「{selected.raw_text}」</blockquote>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">訂單解析</h3>
              <p className="mt-1 text-sm text-[#69746d]">
                {snapshot.provider.openaiConfigured ? `已設定 OpenAI · ${snapshot.provider.model}` : "OpenAI 尚未設定；可先人工建單"}
              </p>
            </div>
            {selected.status !== "converted" ? (
              <button className="min-h-11 rounded-full bg-[#173f37] px-5 text-sm font-semibold text-white disabled:opacity-50" disabled={pendingAction !== null || !snapshot.provider.openaiConfigured} onClick={() => void runAction(`parse-${selected.id}`, async () => {
                const result = await api<{ configured: boolean; status?: string }>(`organizations/${organizationId}/floworder/messages/${selected.id}/parse`, role, { method: "POST" });
                return result.configured ? "AI 解析已完成，請確認內容" : "AI 尚未設定，未產生解析結果";
              })} type="button">{pendingAction === `parse-${selected.id}` ? "解析中…" : "使用 AI 解析"}</button>
            ) : null}
          </div>

          {parse ? <ParseSummary parse={parse} /> : null}
          {selected.status !== "converted" ? (
            <OrderReviewForm
              address={address}
              key={`${selected.id}-${parse?.id ?? "manual"}`}
              onConfirm={(payload) => runAction(`confirm-${selected.id}`, async () => {
                const result = await api<{ orderNumber: string }>(`organizations/${organizationId}/floworder/messages/${selected.id}/confirm`, role, { method: "POST", body: JSON.stringify({ ...payload, idempotencyKey: crypto.randomUUID() }) });
                return `正式訂單 ${result.orderNumber} 已建立，庫存交易已寫入`;
              })}
              parse={parse}
              pending={pendingAction === `confirm-${selected.id}`}
              products={snapshot.products}
            />
          ) : <p className="mt-6 rounded-xl bg-[#edf5f2] p-4 text-sm font-semibold text-[#286458]">這則訊息已建立正式訂單。</p>}
        </article>
      ) : <EmptyState>選擇一則訊息開始處理。</EmptyState>}
    </section>
  );
}

function ParseSummary({ parse }: { parse: ParseRecord }) {
  if (parse.status === "not_configured") return <Alert tone="warning">AI provider 尚未設定，這次沒有產生 AI 結果。</Alert>;
  if (parse.status === "failed") return <Alert tone="error">AI 解析失敗，沒有建立訂單；請稍後重試或改用人工輸入。</Alert>;
  return (
    <div className="mt-5 rounded-2xl border border-[#dfe4df] p-4">
      <div className="flex justify-between gap-3"><p className="text-sm font-semibold">{parse.status === "needs_review" ? "需要人工核對" : "解析完成"}</p><p className="text-xs text-[#647069]">信心 {Math.round(Number(parse.confidence ?? 0) * 100)}%</p></div>
      {parse.structured_result?.issues?.length ? <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#9a5d23]">{parse.structured_result.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul> : null}
    </div>
  );
}

function OrderReviewForm(props: {
  address: Address | undefined;
  onConfirm: (payload: { items: Array<{ productId: string; quantity: number; unit: string }>; deliveryDate: string | null; deliveryAddress: string; notes: string | null }) => Promise<void>;
  parse: ParseRecord | undefined;
  pending: boolean;
  products: Product[];
}) {
  const { address, onConfirm, parse, pending, products } = props;
  const initialItems = (parse?.structured_result?.items ?? [])
    .filter((item) => item.productId && item.quantity)
    .map((item) => ({ productId: item.productId as string, quantity: Number(item.quantity), unit: item.unit ?? "箱" }));
  const [items, setItems] = useState(initialItems.length ? initialItems : [{ productId: "", quantity: 1, unit: "箱" }]);
  const [deliveryDate, setDeliveryDate] = useState(parse?.structured_result?.deliveryDate ?? "");
  const defaultAddress = address ? `${address.city}${address.district}${address.address_line}` : "";
  const [deliveryAddress, setDeliveryAddress] = useState(parse?.structured_result?.deliveryAddress ?? defaultAddress);
  const [notes, setNotes] = useState(parse?.structured_result?.notes ?? "");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validItems = items.filter((item) => item.productId && item.quantity > 0);
    if (!validItems.length || !deliveryAddress.trim()) return;
    void onConfirm({ items: validItems, deliveryDate: deliveryDate || null, deliveryAddress: deliveryAddress.trim(), notes: notes.trim() || null });
  }

  return (
    <form className="mt-6 border-t border-[#e6e9e5] pt-6" onSubmit={submit}>
      <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">人工確認內容</h3><span className="text-xs text-[#6c766f]">成立前可修改</span></div>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div className="grid gap-2 rounded-xl bg-[#f5f6f3] p-3 sm:grid-cols-[1fr_7rem_auto]" key={`${index}-${item.productId}`}>
            <select aria-label={`第 ${index + 1} 個商品`} className="min-h-11 min-w-0 rounded-lg border border-[#d7ddd7] bg-white px-3 text-sm" onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, productId: event.target.value, unit: products.find((product) => product.id === event.target.value)?.unit ?? "箱" } : row))} required value={item.productId}>
              <option value="">選擇商品</option>{products.map((product) => <option key={product.id} value={product.id}>{product.sku} · {product.name} · {product.specification}</option>)}
            </select>
            <input aria-label={`第 ${index + 1} 個商品數量`} className="min-h-11 rounded-lg border border-[#d7ddd7] bg-white px-3 text-sm" min="0.001" onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, quantity: Number(event.target.value) } : row))} required step="0.001" type="number" value={item.quantity} />
            <button aria-label={`移除第 ${index + 1} 個商品`} className="min-h-11 px-3 text-sm font-semibold text-[#9b4f48]" disabled={items.length === 1} onClick={() => setItems((current) => current.filter((_, rowIndex) => rowIndex !== index))} type="button">移除</button>
          </div>
        ))}
      </div>
      <button className="mt-3 text-sm font-semibold text-[#286458]" onClick={() => setItems((current) => [...current, { productId: "", quantity: 1, unit: "箱" }])} type="button">＋ 加一個品項</button>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">配送日期<input className="mt-2 min-h-11 w-full rounded-lg border border-[#d7ddd7] px-3 font-normal" onChange={(event) => setDeliveryDate(event.target.value)} type="date" value={deliveryDate} /></label>
        <label className="text-sm font-semibold sm:col-span-2">配送地址<input className="mt-2 min-h-11 w-full rounded-lg border border-[#d7ddd7] px-3 font-normal" onChange={(event) => setDeliveryAddress(event.target.value)} required value={deliveryAddress} /></label>
        <label className="text-sm font-semibold sm:col-span-2">備註<textarea className="mt-2 min-h-20 w-full rounded-lg border border-[#d7ddd7] p-3 font-normal" onChange={(event) => setNotes(event.target.value)} value={notes} /></label>
      </div>
      <button className="mt-5 min-h-12 w-full rounded-full bg-[#173f37] px-6 text-sm font-semibold text-white disabled:opacity-50 sm:w-auto" disabled={pending} type="submit">{pending ? "建立中…" : "確認並建立正式訂單"}</button>
    </form>
  );
}

function OrdersView({ organizationId, pendingAction, role, runAction, snapshot }: { organizationId: string; pendingAction: string | null; role: FlowOrderRole; runAction: (key: string, action: () => Promise<string>) => Promise<void>; snapshot: Snapshot }) {
  async function downloadPdf(order: OrderRecord) {
    const response = await fetch(`/api/floworder/organizations/${organizationId}/floworder/orders/${order.id}/pdf`, { headers: { "x-floworder-role": role } });
    if (!response.ok) throw new Error("PDF 產生失敗");
    const url = URL.createObjectURL(await response.blob());
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${order.order_number}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mt-6">
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold text-[#738078]">最新在前</p><h2 className="mt-1 text-2xl font-semibold">正式訂單</h2></div><span className="text-sm text-[#68736c]">{snapshot.orders.length} 筆</span></div>
      <div className="mt-4 divide-y divide-[#e1e5e0] rounded-2xl border border-[#dfe3de] bg-white px-4 sm:px-6">
        {snapshot.orders.map((order) => {
          const customer = snapshot.customers.find((item) => item.id === order.customer_id);
          const items = snapshot.orderItems.filter((item) => item.order_id === order.id);
          return (
            <details className="py-5" key={order.id}>
              <summary className="grid cursor-pointer list-none gap-2 sm:grid-cols-[1fr_1.5fr_auto_auto] sm:items-center sm:gap-5">
                <div><p className="text-xs text-[#758078]">{order.order_number}</p><p className="mt-1 font-semibold">{customer?.name ?? "客戶"}</p></div>
                <p className="line-clamp-1 text-sm text-[#667169]">{items.map((item) => `${item.product_name} ${item.quantity}${item.unit}`).join("、")}</p>
                <p className="font-semibold">{currency(order.total)}</p>
                <span className="w-fit rounded-full bg-[#eef3ef] px-3 py-1 text-xs font-semibold text-[#347468]">{orderStatus[order.status]}</span>
              </summary>
              <OrderDetail order={order} items={items} />
              <div className="mt-4 flex flex-wrap gap-2">
                <ActionButton onClick={() => void runAction(`pdf-${order.id}`, async () => { await downloadPdf(order); return `PDF ${order.order_number} 已產生`; })}>下載 PDF</ActionButton>
                {(["confirmed", "preparing"] as string[]).includes(order.status) ? (
                  <ModifyOrderForm
                    disabled={pendingAction !== null}
                    items={items}
                    onModify={(payload) => runAction(`modify-${order.id}`, async () => {
                      await api(`organizations/${organizationId}/floworder/orders/${order.id}`, role, {
                        method: "PATCH",
                        body: JSON.stringify({ ...payload, idempotencyKey: crypto.randomUUID() }),
                      });
                      return `訂單 ${order.order_number} 已修改，金額、庫存與稽核紀錄已同步`;
                    })}
                    order={order}
                  />
                ) : null}
                {!(["canceled", "shipped", "completed"] as string[]).includes(order.status) ? <CancelOrderForm disabled={pendingAction !== null} onCancel={(reason) => runAction(`cancel-${order.id}`, async () => { await api(`organizations/${organizationId}/floworder/orders/${order.id}/cancel`, role, { method: "POST", body: JSON.stringify({ reason, idempotencyKey: crypto.randomUUID() }) }); return `訂單 ${order.order_number} 已取消，庫存已回補`; })} /> : null}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function ModifyOrderForm({
  disabled,
  items,
  onModify,
  order,
}: {
  disabled: boolean;
  items: OrderItem[];
  onModify: (payload: { items: Array<{ productId: string; quantity: number; unit: string }>; deliveryDate: string | null; deliveryAddress: string; notes: string | null }) => Promise<void>;
  order: OrderRecord;
}) {
  const [open, setOpen] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => Object.fromEntries(items.map((item) => [item.id, Number(item.quantity)])));
  const [deliveryDate, setDeliveryDate] = useState(order.delivery_date ?? "");
  const [deliveryAddress, setDeliveryAddress] = useState(order.delivery_address);
  const [notes, setNotes] = useState(order.notes ?? "");
  if (!open) return <ActionButton disabled={disabled} onClick={() => setOpen(true)}>修改訂單</ActionButton>;
  return (
    <form
      className="mt-2 w-full rounded-xl border border-[#d7ddd7] bg-white p-4"
      onSubmit={(event) => {
        event.preventDefault();
        void onModify({
          items: items.map((item) => ({ productId: item.product_id, quantity: quantities[item.id] ?? Number(item.quantity), unit: item.unit })),
          deliveryDate: deliveryDate || null,
          deliveryAddress,
          notes: notes || null,
        }).then(() => setOpen(false));
      }}
    >
      <p className="font-semibold">修改品項數量與配送</p>
      <p className="mt-1 text-xs leading-5 text-[#69746d]">送出後會在同一筆資料庫交易中重算價格、調整庫存並保留前後內容。</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <label className="text-sm font-semibold" key={item.id}>
            {item.product_name}（{item.unit}）
            <input
              className="mt-2 min-h-11 w-full rounded-lg border border-[#d7ddd7] px-3 font-normal"
              min="0.001"
              onChange={(event) => setQuantities((current) => ({ ...current, [item.id]: Number(event.target.value) }))}
              required
              step="0.001"
              type="number"
              value={quantities[item.id] ?? Number(item.quantity)}
            />
          </label>
        ))}
        <label className="text-sm font-semibold">配送日期<input className="mt-2 min-h-11 w-full rounded-lg border border-[#d7ddd7] px-3 font-normal" onChange={(event) => setDeliveryDate(event.target.value)} type="date" value={deliveryDate} /></label>
        <label className="text-sm font-semibold sm:col-span-2">配送地址<input className="mt-2 min-h-11 w-full rounded-lg border border-[#d7ddd7] px-3 font-normal" maxLength={500} onChange={(event) => setDeliveryAddress(event.target.value)} required value={deliveryAddress} /></label>
        <label className="text-sm font-semibold sm:col-span-2">備註<textarea className="mt-2 min-h-20 w-full rounded-lg border border-[#d7ddd7] p-3 font-normal" maxLength={2000} onChange={(event) => setNotes(event.target.value)} value={notes} /></label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="min-h-10 rounded-lg bg-[#173f37] px-4 text-sm font-semibold text-white disabled:opacity-50" disabled={disabled} type="submit">確認修改</button>
        <button className="min-h-10 rounded-lg px-3 text-sm font-semibold" onClick={() => setOpen(false)} type="button">返回</button>
      </div>
    </form>
  );
}

function CancelOrderForm({ disabled, onCancel }: { disabled: boolean; onCancel: (reason: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  if (!open) return <ActionButton disabled={disabled} onClick={() => setOpen(true)}>取消訂單</ActionButton>;
  return (
    <form className="flex flex-1 flex-wrap gap-2" onSubmit={(event) => { event.preventDefault(); void onCancel(reason).then(() => setOpen(false)); }}>
      <input className="min-h-10 min-w-56 flex-1 rounded-lg border border-[#d7ddd7] px-3 text-sm" minLength={2} onChange={(event) => setReason(event.target.value)} placeholder="請填寫取消原因" required value={reason} />
      <button className="rounded-lg bg-[#9b4f48] px-4 text-sm font-semibold text-white" disabled={disabled} type="submit">確認取消</button>
      <button className="rounded-lg px-3 text-sm font-semibold" onClick={() => setOpen(false)} type="button">返回</button>
    </form>
  );
}

function InventoryView({ snapshot }: { snapshot: Snapshot }) {
  const rows = useMemo(() => snapshot.products.map((product) => ({ product, balance: snapshot.inventory.find((item) => item.product_id === product.id) })).sort((a, b) => Number((a.balance?.on_hand ?? 0) <= Number(a.product.safety_stock)) - Number((b.balance?.on_hand ?? 0) <= Number(b.product.safety_stock))), [snapshot]);
  return (
    <section className="mt-6"><div><p className="text-xs font-semibold text-[#738078]">即時餘量</p><h2 className="mt-1 text-2xl font-semibold">商品與庫存</h2></div>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#dfe3de] bg-white">
        <table className="min-w-full text-left text-sm"><thead className="border-b border-[#e4e7e3] bg-[#f7f8f6] text-xs text-[#69746d]"><tr><th className="px-4 py-3">SKU</th><th className="px-4 py-3">商品</th><th className="px-4 py-3">規格</th><th className="px-4 py-3">庫存</th><th className="px-4 py-3">狀態</th></tr></thead><tbody className="divide-y divide-[#eceeeb]">{rows.map(({ product, balance }) => { const low = Number(balance?.on_hand ?? 0) <= Number(product.safety_stock); return <tr key={product.id}><td className="whitespace-nowrap px-4 py-3 font-medium">{product.sku}</td><td className="px-4 py-3">{product.name}</td><td className="whitespace-nowrap px-4 py-3 text-[#69746d]">{product.specification}</td><td className="px-4 py-3 font-semibold">{balance?.on_hand ?? 0} {product.unit}</td><td className={`whitespace-nowrap px-4 py-3 text-xs font-semibold ${low ? "text-[#a24f45]" : "text-[#347468]"}`}>{low ? "低於安全庫存" : "正常"}</td></tr>; })}</tbody></table>
      </div>
    </section>
  );
}

function AuditView({ snapshot }: { snapshot: Snapshot }) {
  return (
    <section className="mt-6"><div><p className="text-xs font-semibold text-[#738078]">Admin only</p><h2 className="mt-1 text-2xl font-semibold">系統紀錄</h2></div>
      <ol className="mt-5 border-l border-[#cfd6cf] pl-5">{snapshot.auditLogs.map((log) => <li className="relative pb-6" key={log.id}><span className="absolute -left-[1.55rem] top-1.5 h-2 w-2 rounded-full bg-[#347468]" /><p className="font-semibold">{auditLabel(log.action)}</p><p className="mt-1 text-sm text-[#69746d]">{dateTime(log.created_at)} · {log.target_type ?? "system"}</p></li>)}</ol>
    </section>
  );
}

function OrderDetail({ items, order }: { items: OrderItem[]; order: OrderRecord }) {
  return (
    <div className="mt-5 rounded-xl bg-[#f6f7f4] p-4 text-sm">
      <div className="grid gap-4 sm:grid-cols-2"><div><p className="text-xs font-semibold text-[#7a847e]">配送</p><p className="mt-1">{order.delivery_date ?? "待確認"}</p><p className="mt-1 text-[#657069]">{order.delivery_address}</p></div><div><p className="text-xs font-semibold text-[#7a847e]">付款／出貨</p><p className="mt-1">{order.payment_status} · {order.fulfillment_status}</p></div></div>
      <div className="mt-4 divide-y divide-[#e0e4df] border-y border-[#e0e4df]">{items.map((item) => <div className="flex justify-between gap-4 py-3" key={item.id}><div><p className="font-semibold">{item.product_name}</p><p className="mt-1 text-xs text-[#6b756f]">{item.sku} · {item.specification} · 折扣 {item.discount_percent}%</p></div><div className="text-right"><p>{item.quantity} {item.unit}</p><p className="mt-1 font-semibold">{currency(item.line_total)}</p></div></div>)}</div>
    </div>
  );
}

function auditLabel(action: string): string {
  const labels: Record<string, string> = {
    "floworder.sandbox.created": "建立隔離體驗工作區",
    "floworder.message.created": "客戶送出訊息",
    "floworder.message.parsed": "完成訊息解析",
    "floworder.message.status_changed": "更新訊息狀態",
    "floworder.order.confirmed": "確認正式訂單並扣庫",
    "floworder.order.modified": "修改訂單並同步庫存",
    "floworder.order.canceled": "取消訂單並回補庫存",
    "floworder.order.seeded": "匯入歷史訂單",
  };
  return labels[action] ?? action;
}

function ActionButton({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick: () => void }) {
  return <button className="min-h-10 rounded-lg border border-[#d4dad4] bg-white px-4 text-sm font-semibold hover:border-[#347468] disabled:opacity-50" disabled={disabled} onClick={onClick} type="button">{children}</button>;
}

function Alert({ children, tone }: { children: React.ReactNode; tone: "error" | "success" | "warning" }) {
  const colors = tone === "error" ? "border-[#e7c8c3] bg-[#fff5f3] text-[#91483f]" : tone === "warning" ? "border-[#ead9b6] bg-[#fffaf0] text-[#855f24]" : "border-[#cce1d9] bg-[#f0f8f5] text-[#286458]";
  return <p aria-live="polite" className={`mb-4 rounded-xl border px-4 py-3 text-sm font-medium ${colors}`}>{children}</p>;
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="py-10 text-center text-sm text-[#6b756f]">{children}</p>;
}

function LoadingScreen({ label }: { label: string }) {
  return <main className="grid min-h-screen place-items-center bg-[#f5f6f3] px-6"><div className="text-center"><span className="mx-auto block h-7 w-7 animate-spin rounded-full border-2 border-[#cdd7d1] border-t-[#173f37]" /><p className="mt-4 text-sm font-semibold text-[#536159]">{label}</p></div></main>;
}

function UnavailableScreen({ error }: { error: string }) {
  return <main className="grid min-h-screen place-items-center bg-[#f5f6f3] px-6"><div className="max-w-md rounded-2xl border border-[#e0d8d0] bg-white p-7 text-center"><p className="text-sm font-semibold text-[#9a5d23]">FlowOrder 尚未連線</p><h1 className="mt-2 text-2xl font-semibold">目前無法建立體驗工作區</h1><p className="mt-3 text-sm leading-6 text-[#68736c]">{error}</p><Link className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#173f37] px-5 text-sm font-semibold text-white" href="/works/floworder">返回產品頁</Link></div></main>;
}
