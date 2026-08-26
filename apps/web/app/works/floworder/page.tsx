import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

const title = "FlowOrder 智慧訂單中心";
const description = "把 LINE 與文字訊息訂單，轉成可確認、可追蹤、可稽核的訂單與庫存流程。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const canonical = `${origin}/works/floworder`;
  const image = `${origin}/floworder-og.png`;
  return {
    title: { absolute: `${title}｜晴宇 Qingyu Web` },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: { title, description, type: "website", url: canonical, images: [{ url: image, width: 1731, height: 909, alt: "FlowOrder 訊息轉訂單與庫存流程" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const roles = [
  {
    name: "我是客戶",
    description: "照原本習慣傳一句話，快速完成下單。",
    next: "/works/floworder/app/customer",
  },
  {
    name: "我是業務",
    description: "確認訊息、調整品項，建立正式訂單。",
    next: "/works/floworder/app/sales",
  },
  {
    name: "我是老闆",
    description: "掌握待辦、庫存與每一筆操作紀錄。",
    next: "/works/floworder/app/admin",
  },
] as const;

const capabilities = [
  ["訊息變訂單", "保留客戶原文，解析後交由人員確認，不讓 AI 擅自成立訂單。"],
  ["庫存有依據", "每次扣庫、回補都留下交易紀錄，重要操作由資料庫原子處理。"],
  ["價格跟著客戶", "依客戶等級、專屬價格與付款條件，帶入正確成交資訊。"],
  ["全程可追溯", "從收件、解析、修改到出貨，每一步都有時間與操作者。"],
] as const;

export default function FlowOrderLandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
  };
  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#17211d]">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} type="application/ld+json" />
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link className="text-sm font-semibold tracking-[-0.02em]" href="/">
          Qingyu Web Studio
        </Link>
        <Link
          className="min-h-11 rounded-full border border-[#cfd5cf] bg-white px-5 py-3 text-sm font-semibold transition-colors hover:border-[#17211d]"
          href="/login?next=/works/floworder/app/admin"
        >
          企業登入
        </Link>
      </header>

      <section className="mx-auto grid min-h-[72vh] max-w-6xl content-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[#347468]">FlowOrder 智慧訂單中心</p>
          <h1 className="mt-5 max-w-3xl text-balance text-[clamp(3rem,8vw,6.6rem)] font-semibold leading-[0.98] tracking-[-0.065em]">
            LINE 訂單，<br />不再人工抄寫
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#59645f]">
            客戶照原本方式下單。系統幫你整理、確認、建單、追蹤。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex min-h-12 items-center rounded-full bg-[#173f37] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#24584e]"
              href="#experience"
            >
              直接操作 <span aria-hidden="true" className="ml-2">↓</span>
            </Link>
            <a className="text-sm font-semibold underline-offset-4 hover:underline" href="#capabilities">
              先了解怎麼運作
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#dfe3de] bg-white p-5 shadow-[0_24px_80px_rgba(30,50,42,.08)] sm:p-7">
          <div className="flex items-center justify-between border-b border-[#e7e9e5] pb-5">
            <div>
              <p className="text-xs font-semibold text-[#728078]">今天</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">3 件事待處理</p>
            </div>
            <span className="rounded-full bg-[#eaf4f0] px-3 py-1.5 text-xs font-semibold text-[#286458]">即時同步</span>
          </div>
          <div className="divide-y divide-[#eceeea]">
            {[
              ["新營佳味餐飲", "牛五花 15 箱、雞腿排 8 箱", "待確認"],
              ["府城日光飯店", "澳洲牛腱 6 箱", "商品待核對"],
              ["安平海味食堂", "週五到貨，地址同上次", "資訊不完整"],
            ].map(([customer, content, status]) => (
              <div className="py-5" key={customer}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{customer}</p>
                    <p className="mt-1 text-sm leading-6 text-[#647069]">{content}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#d8ddd8] px-2.5 py-1 text-[11px] font-semibold text-[#536059]">
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e1e4df] bg-white" id="experience">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#347468]">選擇你的視角</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">一筆訂單，三種工作方式</h2>
          </div>
          <div className="mt-9 grid gap-3 md:grid-cols-3">
            {roles.map((role, index) => (
              <Link
                className="group rounded-2xl border border-[#dde2dc] p-6 transition-colors hover:border-[#347468] hover:bg-[#f7faf8]"
                href={role.next}
                key={role.name}
              >
                <span className="text-xs font-semibold text-[#7b867f]">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-semibold">{role.name}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-[#657169]">{role.description}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-[#286458]">
                  進入體驗 <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm text-[#6b756f]">每次體驗都會建立隔離的資料庫沙盒；操作會真實寫入、扣庫並留下稽核紀錄。</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" id="capabilities">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">從訊息到出貨，<br />每一步都有依據</h2>
          <div className="divide-y divide-[#dfe3de] border-y border-[#dfe3de]">
            {capabilities.map(([title, description]) => (
              <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr]" key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-[#657169]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
