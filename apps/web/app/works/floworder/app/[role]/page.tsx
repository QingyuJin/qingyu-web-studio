import { notFound } from "next/navigation";
import { FlowOrderClient } from "../floworder-client";

const roles = ["customer", "sales", "admin"] as const;
type FlowOrderRole = (typeof roles)[number];

export default async function FlowOrderRolePage({
  params,
  searchParams,
}: {
  params: Promise<{ role: string }>;
  searchParams: Promise<{ organization?: string | string[] }>;
}) {
  const role = (await params).role;
  if (!roles.includes(role as FlowOrderRole)) notFound();
  const rawOrganization = (await searchParams).organization;
  const organizationId = Array.isArray(rawOrganization) ? rawOrganization[0] : rawOrganization;
  return <FlowOrderClient {...(organizationId ? { organizationId } : {})} role={role as FlowOrderRole} />;
}
