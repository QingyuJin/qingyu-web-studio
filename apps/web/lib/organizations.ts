import { z } from "zod";

export interface OrganizationOption {
  membershipId: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  role: "admin" | "manager" | "staff" | "customer";
}

const membershipRowSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  role: z.object({ slug: z.enum(["admin", "manager", "staff", "customer"]), name: z.string() }),
  organization: z.object({ id: z.string().uuid(), name: z.string(), slug: z.string() }),
});

export function parseOrganizationOptions(value: unknown): OrganizationOption[] {
  return z.array(membershipRowSchema).parse(value).map((row) => ({
    membershipId: row.id,
    organizationId: row.organization_id,
    organizationName: row.organization.name,
    organizationSlug: row.organization.slug,
    role: row.role.slug,
  }));
}

export function selectOrganization(
  memberships: readonly OrganizationOption[],
  requestedOrganizationId: string | undefined,
): OrganizationOption | null {
  if (requestedOrganizationId) {
    return memberships.find(({ organizationId }) => organizationId === requestedOrganizationId) ?? null;
  }
  return memberships[0] ?? null;
}
