import { describe, expect, it } from "vitest";
import { safeRelativeRedirect } from "./redirects";

describe("safeRelativeRedirect", () => {
  it("allows same-origin relative paths", () => {
    expect(safeRelativeRedirect("/dashboard?organization=id")).toBe("/dashboard?organization=id");
  });

  it("rejects protocol-relative redirects", () => {
    expect(safeRelativeRedirect("//outside.example")).toBe("/dashboard");
  });
});
