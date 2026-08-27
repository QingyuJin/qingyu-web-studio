import { describe, expect, it } from "vitest";
import { isAllowedFlowOrderOrigin } from "./floworder-origin";

describe("FlowOrder request origins", () => {
  const upstream = "https://qingyu-floworder-web.vercel.app";
  const publicOrigin = "https://www.qingyuweb.com";

  it("accepts the configured public origin behind a cross-project rewrite", () => {
    expect(isAllowedFlowOrderOrigin(publicOrigin, upstream, publicOrigin)).toBe(true);
  });

  it("accepts direct same-origin and non-browser requests", () => {
    expect(isAllowedFlowOrderOrigin(upstream, upstream, publicOrigin)).toBe(true);
    expect(isAllowedFlowOrderOrigin(null, upstream, publicOrigin)).toBe(true);
    expect(isAllowedFlowOrderOrigin("http://localhost:3000", "http://localhost:3000", undefined)).toBe(true);
  });

  it("rejects arbitrary, suffix-spoofed, and opaque origins", () => {
    for (const origin of ["https://attacker.example", "https://www.qingyuweb.com.attacker.example", "null"]) {
      expect(isAllowedFlowOrderOrigin(origin, upstream, publicOrigin)).toBe(false);
    }
  });

  it("fails closed for an invalid configured origin", () => {
    for (const configured of [undefined, "not-a-url", "javascript:alert(1)", "https://user:password@www.qingyuweb.com"]) {
      expect(isAllowedFlowOrderOrigin(publicOrigin, upstream, configured)).toBe(false);
    }
  });
});
