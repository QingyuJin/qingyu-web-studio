"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { localeLabels, locales, makeTranslator, readLocale, subscribeLocale, writeLocale } from "../../showcase-i18n/core";
import { messages } from "./messages";

const CopyContext = createContext(makeTranslator(messages, "zh-Hant"));

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "zh-Hant" as const);
  const pathname = usePathname();
  const t = useMemo(() => makeTranslator(messages, locale), [locale]);
  useEffect(() => {
    try { window.localStorage.setItem("qingyu-locale", locale); } catch { /* Optional persistence */ }
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    // Static-export metadata can arrive after hydration or client navigation.
    // Keep only the tab title in sync with the already translated page heading.
    const updateTitle = () => {
      const title = document.querySelector("h1")?.innerText?.replace(/\s+/g, " ").trim();
      if (title && document.title !== `${title} — MORIÉ`) document.title = `${title} — MORIÉ`;
    };
    updateTitle();
    const observer = new MutationObserver(updateTitle);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [locale, pathname]);
  return <CopyContext.Provider value={t}>{children}</CopyContext.Provider>;
}

export const useCopy = () => useContext(CopyContext);

export function LanguageSelector() {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "zh-Hant" as const);
  const t = useCopy();
  return <select className="language-select" aria-label={t("選擇語言")} value={locale} onChange={(event) => writeLocale(event.target.value as typeof locale)}>
    {locales.map((code, index) => <option value={code} key={code} lang={code}>{localeLabels[index]}</option>)}
  </select>;
}
