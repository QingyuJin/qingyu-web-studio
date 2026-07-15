import { describe, expect, it } from "vitest";
import { z } from "zod";
import { ZodValidationPipe } from "./zod-validation.pipe.js";

class TestDto {
  static readonly schema = z.object({ value: z.string().min(1) });
}

describe("ZodValidationPipe", () => {
  it("rejects an invalid DTO before it reaches a controller", () => {
    const pipe = new ZodValidationPipe();
    expect(() => pipe.transform({ value: "" }, { type: "body", metatype: TestDto })).toThrow(
      "Request validation failed",
    );
  });
});
