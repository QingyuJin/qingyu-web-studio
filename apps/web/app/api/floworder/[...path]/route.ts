import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { getWebEnvironment } from "@/lib/env";
import { isAllowedFlowOrderOrigin } from "@/lib/floworder-origin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const tokenCookie = "floworder_demo_token";
const organizationCookie = "floworder_demo_organization";
const flowOrderRoleSchema = z.enum(["customer", "sales", "admin"]);

function sameOrigin(request: NextRequest): boolean {
  return isAllowedFlowOrderOrigin(
    request.headers.get("origin"),
    request.nextUrl.origin,
    process.env.FLOWORDER_PUBLIC_ORIGIN,
  );
}

async function proxyRequest(request: NextRequest, path: string[]) {
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method) && !sameOrigin(request)) {
    return NextResponse.json({ error: { code: "CSRF_ORIGIN_DENIED", message: "Request origin is not allowed" } }, { status: 403 });
  }

  const environment = getWebEnvironment();
  const upstreamUrl = new URL(path.map(encodeURIComponent).join("/"), `${environment.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/`);
  upstreamUrl.search = request.nextUrl.search;
  const headers = new Headers({ accept: request.headers.get("accept") ?? "application/json" });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const requestedRole = flowOrderRoleSchema.safeParse(request.headers.get("x-floworder-role"));
  if (requestedRole.success) headers.set("x-floworder-role", requestedRole.data);

  const demoToken = request.cookies.get(tokenCookie)?.value;
  if (demoToken) {
    headers.set("x-floworder-demo-token", demoToken);
  } else {
    try {
      const supabase = await createServerSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) headers.set("authorization", `Bearer ${data.session.access_token}`);
    } catch {
      // The API returns the authoritative authentication error.
    }
  }

  const body = ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer();
  let upstream: Response;
  try {
    upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      ...(body ? { body } : {}),
      cache: "no-store",
      signal: AbortSignal.timeout(35_000),
    });
  } catch {
    return NextResponse.json({
      error: { code: "FLOWORDER_API_UNAVAILABLE", message: "FlowOrder API 尚未連線或暫時無法使用" },
    }, { status: 503 });
  }

  const responseHeaders = new Headers({ "cache-control": "private, no-store" });
  const upstreamContentType = upstream.headers.get("content-type");
  const disposition = upstream.headers.get("content-disposition");
  if (upstreamContentType) responseHeaders.set("content-type", upstreamContentType);
  if (disposition) responseHeaders.set("content-disposition", disposition);

  if (path.join("/") === "floworder/demo/sandboxes" && upstream.ok) {
    const payload = await upstream.json() as Record<string, unknown>;
    const token = String(payload.token ?? "");
    const organizationId = String(payload.organizationId ?? "");
    const expiresAt = String(payload.expiresAt ?? "");
    const safePayload = { ...payload };
    delete safePayload.token;
    const response = NextResponse.json(safePayload, { status: upstream.status, headers: responseHeaders });
    const expires = Number.isNaN(Date.parse(expiresAt)) ? undefined : new Date(expiresAt);
    response.cookies.set(tokenCookie, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires });
    response.cookies.set(organizationCookie, organizationId, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires });
    return response;
  }

  const response = new NextResponse(await upstream.arrayBuffer(), { status: upstream.status, headers: responseHeaders });
  if (path.join("/") === "floworder/demo/session" && (upstream.status === 401 || upstream.status === 404)) {
    response.cookies.delete(tokenCookie);
    response.cookies.delete(organizationCookie);
  }
  return response;
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, (await context.params).path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, (await context.params).path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, (await context.params).path);
}
