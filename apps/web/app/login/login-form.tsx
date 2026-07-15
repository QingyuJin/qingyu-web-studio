"use client";

import { sendMagicLink } from "@qingyu/auth";
import { Button } from "@qingyu/ui";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { safeRelativeRedirect } from "@/lib/redirects";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const next = safeRelativeRedirect(searchParams.get("next"));
    const callback = new URL("/auth/callback", window.location.origin);
    callback.searchParams.set("next", next);

    try {
      await sendMagicLink(createBrowserSupabaseClient(), email, callback.toString());
      setMessage("登入連結已寄出。請回到這個瀏覽器完成登入。");
      event.currentTarget.reset();
    } catch {
      setMessage("目前無法寄送登入連結。請確認 Email 已受邀，或稍後再試。");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium" htmlFor="email">Email</label>
        <input
          autoComplete="email"
          className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-4 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
          id="email"
          name="email"
          required
          type="email"
        />
      </div>
      <Button className="w-full" disabled={pending} type="submit">
        {pending ? "寄送中…" : "寄送 Magic Link"}
      </Button>
      {message ? <p aria-live="polite" className="text-sm leading-6 text-slate-700">{message}</p> : null}
    </form>
  );
}
