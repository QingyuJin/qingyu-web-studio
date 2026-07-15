import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10">
      <nav className="flex items-center justify-between border-b border-slate-200 pb-6" aria-label="主要導覽">
        <span className="font-semibold tracking-tight">Qingyu Platform</span>
        <Link className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white" href="/login">
          登入
        </Link>
      </nav>

      <section className="flex flex-1 items-center py-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Platform v2</p>
          <h1 className="text-balance text-5xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-7xl">
            為正式營運打造的安全平台地基
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            組織隔離、真實身分驗證與可稽核的權限邊界，從第一個版本就納入核心架構。
          </p>
          <div className="mt-10">
            <Link className="inline-flex min-h-11 items-center rounded-lg bg-slate-950 px-5 font-medium text-white hover:bg-slate-800" href="/login">
              使用 Email Magic Link 登入
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
