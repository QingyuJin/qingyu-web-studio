import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { localeOptions, localeTags } from "./translations"
import { ENABLE_MULTILINGUAL } from "../site/features"

const LocaleContext = createContext(null)
const localeCodes = new Set(localeOptions.map(({ code }) => code))

function initialLocale() {
  if (!ENABLE_MULTILINGUAL) return "zh-Hant"
  const query = new URLSearchParams(window.location.search).get("lang")
  if (localeCodes.has(query)) return query

  const saved = window.localStorage.getItem("qingyu-locale")
  if (localeCodes.has(saved)) return saved

  const browser = navigator.language.toLowerCase()
  if (browser.startsWith("ja")) return "ja"
  if (browser.startsWith("ko")) return "ko"
  if (browser.startsWith("en")) return "en"
  return "zh-Hant"
}

function updateAlternateLinks() {
  localeOptions.forEach(({ code }) => {
    const hreflang = localeTags[code]
    let link = document.head.querySelector(`link[rel="alternate"][data-qingyu-locale="${code}"]`)
    if (!link) {
      link = document.createElement("link")
      link.rel = "alternate"
      link.dataset.qingyuLocale = code
      document.head.appendChild(link)
    }

    const url = new URL(window.location.href)
    if (code === "zh-Hant") url.searchParams.delete("lang")
    else url.searchParams.set("lang", code)
    link.hreflang = hreflang
    link.href = url.href
  })

  let defaultLink = document.head.querySelector('link[rel="alternate"][hreflang="x-default"]')
  if (!defaultLink) {
    defaultLink = document.createElement("link")
    defaultLink.rel = "alternate"
    defaultLink.hreflang = "x-default"
    document.head.appendChild(defaultLink)
  }
  const defaultUrl = new URL(window.location.href)
  defaultUrl.searchParams.delete("lang")
  defaultLink.href = defaultUrl.href
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(initialLocale)
  const location = useLocation()

  const setLocale = useCallback((nextLocale) => {
    if (!ENABLE_MULTILINGUAL) return
    if (!localeCodes.has(nextLocale)) return
    setLocaleState(nextLocale)
    window.localStorage.setItem("qingyu-locale", nextLocale)

    const url = new URL(window.location.href)
    if (nextLocale === "zh-Hant") url.searchParams.delete("lang")
    else url.searchParams.set("lang", nextLocale)
    window.history.replaceState(window.history.state, "", url)
  }, [])

  useEffect(() => {
    const currentUrl = new URL(window.location.href)
    if (!ENABLE_MULTILINGUAL || locale === "zh-Hant") currentUrl.searchParams.delete("lang")
    else currentUrl.searchParams.set("lang", locale)
    window.history.replaceState(window.history.state, "", currentUrl)
    document.documentElement.lang = ENABLE_MULTILINGUAL ? localeTags[locale] : "zh-Hant-TW"
    document.documentElement.dataset.locale = ENABLE_MULTILINGUAL ? locale : "zh-Hant"
    if (ENABLE_MULTILINGUAL) updateAlternateLinks()
    else document.head.querySelectorAll('link[rel="alternate"][data-qingyu-locale]').forEach((link) => link.remove())
  }, [locale, location.pathname, location.search])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error("useLocale must be used inside LocaleProvider")
  return value
}
