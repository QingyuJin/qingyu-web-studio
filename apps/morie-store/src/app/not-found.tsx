"use client";
import { useCopy } from "@/i18n";
import Link from "@/components/LocaleLink";

export default function NotFound() {
  const t = useCopy();
  return <main className="mx-auto grid min-h-[70svh] max-w-3xl place-items-center px-6 py-24 text-center">
    <div>
      <p className="eyebrow">{t("MORIÉ")}</p>
      <h1 className="editorial-title mt-5">{t("找不到這一頁")}</h1>
      <p className="mt-5 text-sm opacity-65">{t("內容可能已調整 請返回選品首頁")}</p>
      <Link className="text-link mt-8 inline-flex" href="/">{t("返回首頁")}</Link>
    </div>
  </main>;
}
