import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "登入" };

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold text-teal-700">Qingyu Platform</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">安全登入</h1>
      <p className="mt-4 leading-7 text-slate-600">輸入受邀的 Email，我們會寄送一次性的登入連結。平台不使用共用密碼。</p>
      <Suspense fallback={<p className="mt-8 text-sm text-slate-600">正在準備安全登入…</p>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
