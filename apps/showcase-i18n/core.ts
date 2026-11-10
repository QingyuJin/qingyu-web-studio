export const locales = ["zh-Hant", "en", "ja", "ko"] as const
export type Locale = typeof locales[number]
export type Messages = Record<string, readonly [string, string, string, string]>
export const localeLabels = ["中文", "English", "日本語", "한국어"]
export const localeKey = "qingyu-locale"
export const localeEvent = "qingyu:locale"

export function readLocale(): Locale {
  if (typeof window === "undefined") return "zh-Hant"
  const query = new URLSearchParams(window.location.search).get("lang")
  if (locales.includes(query as Locale)) return query as Locale
  try {
    const saved = window.localStorage.getItem(localeKey)
    if (locales.includes(saved as Locale)) return saved as Locale
  } catch { /* Language controls also work with storage disabled */ }
  const language = navigator.language.split("-")[0]
  return locales.includes(language as Locale) ? language as Locale : "zh-Hant"
}

export function writeLocale(locale: Locale) {
  try { window.localStorage.setItem(localeKey, locale) } catch { /* Optional persistence */ }
  const url = new URL(window.location.href)
  url.searchParams.set("lang", locale)
  window.history.replaceState(window.history.state, "", url)
  window.dispatchEvent(new Event(localeEvent))
}

export function subscribeLocale(listener: () => void) {
  window.addEventListener(localeEvent, listener)
  window.addEventListener("storage", listener)
  window.addEventListener("popstate", listener)
  return () => {
    window.removeEventListener(localeEvent, listener)
    window.removeEventListener("storage", listener)
    window.removeEventListener("popstate", listener)
  }
}

export const tidyCopy = (value: string) => value.replace(/[，。、；：！？「」『』“”｜·・]/g, " ").replace(/\s+/g, " ").trim()

export function makeTranslator(messages: Messages, locale: Locale) {
  return function t<T>(value: T, values: unknown[] = []): T {
    if (typeof value !== "string") return value
    const entry = messages[value.trim()]
    const copy = entry ? entry[locales.indexOf(locale)] : value
    return copy.replace(/\{(\d+)\}/g, (_, index) => String(t(values[Number(index)] ?? ""))) as T
  }
}
