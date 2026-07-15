import { describe, expect, it } from "vitest";
import { invitationInputSchema } from "./index.js";

describe("invitationInputSchema", () => {
  it("normalizes a valid email", () => {
    const result = invitationInputSchema.parse({ email: " Member@Example.com ", role: "staff" });
    expect(result.email).toBe("member@example.com");
  });

  it("rejects roles outside the platform role set", () => {
    expect(invitationInputSchema.safeParse({ email: "member@example.com", role: "owner" }).success).toBe(false);
  });
});
