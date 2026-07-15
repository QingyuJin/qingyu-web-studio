import { describe, expect, it } from "vitest";
import { selectOrganization, type OrganizationOption } from "./organizations";

const membership: OrganizationOption = {
  membershipId: "10000000-0000-4000-8000-000000000001",
  organizationId: "20000000-0000-4000-8000-000000000001",
  organizationName: "Tenant",
  organizationSlug: "tenant",
  role: "staff",
};

describe("selectOrganization", () => {
  it("does not select an organization without a matching membership", () => {
    expect(selectOrganization([membership], "20000000-0000-4000-8000-000000000002")).toBeNull();
  });
});
