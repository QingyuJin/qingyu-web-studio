import { z } from "zod";

export const webEnvironmentSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(20),
  NEXT_PUBLIC_API_URL: z.string().url(),
});

export type WebEnvironment = z.infer<typeof webEnvironmentSchema>;

export function parseWebEnvironment(input: unknown): WebEnvironment {
  return webEnvironmentSchema.parse(input);
}
