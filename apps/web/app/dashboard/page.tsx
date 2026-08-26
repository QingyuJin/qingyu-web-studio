import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { parseOrganizationOptions, selectOrganization } from "@/lib/organizations";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "組織工作區" };

interface DashboardPageProps {
  searchParams: Promise<{ organization?: string | string[] }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createServerSupabaseClient();
  const { data: claimData, error: claimError } = await supabase.auth.getClaims();
  const userId = typeof claimData?.claims.sub === "string" ? claimData.claims.sub : null;
  if (claimError || !userId) redirect("/login?next=/dashboard");

  const { data, error } = await supabase
    .from("organization_memberships")
    .select(
      "id,organization_id,role:roles!organization_memberships_role_id_fkey(slug,name),organization:organizations!organization_memberships_organization_id_fkey(id,name,slug)",
    )
    .eq("user_id", userId);

  if (error) throw new Error("Unable to load organization memberships");

  const memberships = parseOrganizationOptions(data ?? []);
  const rawRequested = (await searchParams).organization;
  const requested = Array.isArray(rawRequested) ? rawRequested[0] : rawRequested;
  const selected = selectOrganization(memberships, requested);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-8 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-sm font-semibold text-teal-700">Qingyu Platform</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">組織工作區</h1>
        </div>
        <form action="/logout" method="post">
          <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium" type="submit">登出</button>
        </form>
      </header>

      <section className="py-10">
        {memberships.length > 0 ? (
          <form className="max-w-md" method="get">
            <label className="block text-sm font-medium" htmlFor="organization">目前組織</label>
            <div className="mt-2 flex gap-3">
              <select
                className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-3"
                defaultValue={selected?.organizationId ?? ""}
                id="organization"
                name="organization"
              >
                {memberships.map((membership) => (
                  <option key={membership.membershipId} value={membership.organizationId}>
                    {membership.organizationName} · {membership.role}
                  </option>
                ))}
              </select>
              <button className="rounded-lg bg-slate-950 px-5 font-medium text-white" type="submit">切換</button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="font-semibold">尚無可用組織</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">請由組織管理員寄送邀請；平台不會自動建立示範公司或成員。</p>
          </div>
        )}

        {requested && !selected ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6" role="alert">
            <h2 className="font-semibold text-red-900">無權存取此組織</h2>
            <p className="mt-2 text-sm text-red-800">選擇的 organization 不在你的有效 membership 中。</p>
          </div>
        ) : null}

        {selected ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-slate-500">目前安全範圍</p>
            <h2 className="mt-2 text-2xl font-semibold">{selected.organizationName}</h2>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div><dt className="text-slate-500">Organization ID</dt><dd className="mt-1 break-all font-mono">{selected.organizationId}</dd></div>
              <div><dt className="text-slate-500">Role</dt><dd className="mt-1 font-medium">{selected.role}</dd></div>
            </dl>
            <Link
              className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white"
              href={`/works/floworder/app/${selected.role === "customer" ? "customer" : selected.role === "admin" || selected.role === "manager" ? "admin" : "sales"}?organization=${encodeURIComponent(selected.organizationId)}`}
            >
              開啟 FlowOrder
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
