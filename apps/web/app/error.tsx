"use client";

export default function ErrorBoundary({ reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6">
      <p className="text-sm font-semibold text-red-700">系統暫時無法完成要求</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">發生未預期的錯誤</h1>
      <p className="mt-4 text-slate-600">請稍後重試；若問題持續，請將發生時間提供給系統管理員。</p>
      <button className="mt-8 w-fit rounded-lg bg-slate-950 px-5 py-3 font-medium text-white" onClick={reset} type="button">
        再試一次
      </button>
    </main>
  );
}
