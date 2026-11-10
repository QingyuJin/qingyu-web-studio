import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react"
import { localeLabels, locales, makeTranslator, readLocale, subscribeLocale, writeLocale } from "../../showcase-i18n/core"
import { messages } from "./messages"

const CopyContext = createContext(makeTranslator(messages, "zh-Hant"))
export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "zh-Hant" as const)
  const t = useMemo(() => makeTranslator(messages, locale), [locale])
  useEffect(() => {
    try { window.localStorage.setItem("qingyu-locale", locale) } catch { /* Optional persistence */ }
    document.documentElement.lang = locale
    document.documentElement.dataset.locale = locale
    document.title = t("Commercial Visual Design")
  }, [locale, t])
  return <CopyContext.Provider value={t}>{children}</CopyContext.Provider>
}
export const useCopy = () => useContext(CopyContext)
export function LanguageSelector() {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "zh-Hant" as const)
  const t = useCopy()
  return <select className="language-select" aria-label={t("選擇語言")} value={locale} onChange={(event) => writeLocale(event.target.value as typeof locale)}>
    {locales.map((code, index) => <option value={code} key={code} lang={code}>{localeLabels[index]}</option>)}
  </select>
}
