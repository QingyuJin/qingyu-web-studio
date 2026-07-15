import { describe, expect, it } from "vitest";
import { extractBearerToken, requireOrganizationMembership } from "./index.js";

describe("extractBearerToken", () => {
  it("accepts a single bearer token", () => {
    expect(extractBearerToken("Bearer signed-token")).toBe("signed-token");
  });

  it("rejects malformed authorization headers", () => {
    expect(extractBearerToken("Basic value")).toBeNull();
  });
});

describe("requireOrganizationMembership", () => {
  it("denies users without membership", async () => {
    const checker = { isMember: async () => false };
    await expect(requireOrganizationMembership(checker, "user", "organization")).rejects.toThrow(
      "ORGANIZATION_ACCESS_DENIED",
    );
  });
});
