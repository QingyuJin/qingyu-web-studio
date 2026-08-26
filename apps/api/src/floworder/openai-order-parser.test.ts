import { describe, expect, it } from "vitest";
import { OpenAiOrderParser } from "./openai-order-parser.js";

describe("OpenAiOrderParser", () => {
  it("reports that the provider is not configured when no API key exists", async () => {
    const parser = new OpenAiOrderParser({
      NODE_ENV: "test",
      PORT: 4000,
      LOG_LEVEL: "error",
      SUPABASE_URL: "https://example.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "publishable-key-at-least-twenty-characters",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-key-at-least-twenty-characters",
      WEB_ORIGIN: "http://localhost:3000",
      OPENAI_MODEL: "gpt-5.4-mini",
      FLOWORDER_DEMO_TTL_MINUTES: 240,
    });

    await expect(parser.parse({
      text: "牛五花 2 箱",
      customerName: "新營佳味餐飲有限公司",
      deliveryAddresses: [],
      products: [],
      today: "2026-08-26",
      timezone: "Asia/Taipei",
    })).resolves.toMatchObject({
      configured: false,
      provider: "openai",
      errorCode: "AI_PROVIDER_NOT_CONFIGURED",
    });
  });
});

