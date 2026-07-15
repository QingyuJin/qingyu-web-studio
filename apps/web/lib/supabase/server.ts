import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getWebEnvironment } from "../env";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const environment = getWebEnvironment();

  return createServerClient(
    environment.NEXT_PUBLIC_SUPABASE_URL,
    environment.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Components are read-only; proxy.ts owns refresh cookie writes.
          }
        },
      },
    },
  );
}
