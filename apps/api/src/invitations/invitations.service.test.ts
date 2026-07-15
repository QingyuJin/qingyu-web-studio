import { describe, expect, it } from "vitest";
import { canInviteRole } from "./invitations.service.js";

describe("canInviteRole", () => {
  it("prevents managers from escalating a member to admin", () => {
    expect(canInviteRole("manager", "admin")).toBe(false);
  });

  it("allows managers to invite operational staff", () => {
    expect(canInviteRole("manager", "staff")).toBe(true);
  });
});
