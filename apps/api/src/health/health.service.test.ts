import { describe, expect, it } from "vitest";
import { HealthService } from "./health.service.js";
import type { SupabaseService } from "../supabase/supabase.service.js";

describe("HealthService", () => {
  it("reports liveness without checking external dependencies", () => {
    const supabase = { isReady: async () => false } as SupabaseService;
    expect(new HealthService(supabase).liveness()).toEqual({ status: "ok" });
  });

  it("fails readiness when Supabase is unavailable", async () => {
    const supabase = { isReady: async () => false } as SupabaseService;
    await expect(new HealthService(supabase).readiness()).rejects.toThrow("required dependency");
  });
});
