import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
      <p className="text-sm font-semibold text-teal-700">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">找不到這個頁面</h1>
      <p className="mt-4 text-slate-600">網址可能已變更，或你沒有可用的入口。</p>
      <Link className="mt-8 font-medium underline underline-offset-4" href="/">
        返回首頁
      </Link>
    </main>
  );
}
