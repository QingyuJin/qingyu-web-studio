import { describe, expect, it } from "vitest";
import { webEnvironmentSchema } from "./web.js";

describe("webEnvironmentSchema", () => {
  it("rejects missing runtime configuration", () => {
    expect(webEnvironmentSchema.safeParse({}).success).toBe(false);
  });
});
