import { createBrowserClient } from "@supabase/ssr";
import { getWebEnvironment } from "../env";

export function createBrowserSupabaseClient() {
  const environment = getWebEnvironment();
  return createBrowserClient(
    environment.NEXT_PUBLIC_SUPABASE_URL,
    environment.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
