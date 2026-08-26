import { z } from "zod";

export const apiEnvironmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4_000),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  WEB_ORIGIN: z.string().url(),
  OPENAI_API_KEY: z.preprocess(
    (value) => value === "" ? undefined : value,
    z.string().min(20).optional(),
  ),
  OPENAI_MODEL: z.string().min(1).default("gpt-5.4-mini"),
  FLOWORDER_DEMO_TTL_MINUTES: z.coerce.number().int().min(15).max(1_440).default(240),
});

export type ApiEnvironment = z.infer<typeof apiEnvironmentSchema>;

export function parseApiEnvironment(input: unknown): ApiEnvironment {
  return apiEnvironmentSchema.parse(input);
}
