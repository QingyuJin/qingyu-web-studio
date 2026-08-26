export const organizationRoles = ["admin", "manager", "staff", "sales", "customer"] as const;

export type OrganizationRole = (typeof organizationRoles)[number];

export interface TenantRow {
  organization_id: string;
}

export interface OrganizationMembership extends TenantRow {
  id: string;
  user_id: string;
  role: { slug: OrganizationRole; name: string };
  organization: { id: string; name: string; slug: string };
}

export function belongsToOrganization(row: TenantRow, organizationId: string): boolean {
  return row.organization_id === organizationId;
}
