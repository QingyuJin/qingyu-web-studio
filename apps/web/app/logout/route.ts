import { signOut } from "@qingyu/auth";
import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  await signOut(await createServerSupabaseClient());
  return NextResponse.redirect(new URL("/login", request.url), { status: 303 });
}
