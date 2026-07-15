import { describe, expect, it } from "vitest";
import { createRequestId } from "./index.js";

describe("createRequestId", () => {
  it("preserves a valid upstream request id", () => {
    expect(createRequestId("request-1234")).toBe("request-1234");
  });

  it("does not trust malformed upstream values", () => {
    expect(createRequestId("bad value\nheader")).not.toContain("\n");
  });
});
