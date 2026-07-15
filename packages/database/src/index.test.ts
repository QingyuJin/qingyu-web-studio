import { describe, expect, it } from "vitest";
import { belongsToOrganization } from "./index.js";

describe("belongsToOrganization", () => {
  it("never treats a row from another organization as in-scope", () => {
    expect(belongsToOrganization({ organization_id: "tenant-a" }, "tenant-b")).toBe(false);
  });
});
