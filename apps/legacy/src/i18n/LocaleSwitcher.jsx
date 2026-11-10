import { useLocale } from "./LocaleContext"
import { localeOptions } from "./locales"

function LocaleSwitcher({ inline = false }) {
  const { locale, setLocale } = useLocale()
  const languageLabel = { "zh-Hant": "語系", en: "Language", ja: "言語", ko: "언어" }[locale]

  if (inline) {
    return (
      <label className="qy-locale-inline" data-i18n-control>
        <span>{languageLabel}</span>
        <select aria-label={languageLabel} value={locale} onChange={(event) => setLocale(event.target.value)}>
          {localeOptions.map(({ code, short }) => <option key={code} value={code}>{short}</option>)}
        </select>
      </label>
    )
  }

  return (
    <nav className="qy-locale-switcher qy-locale-switcher--floating" aria-label={languageLabel} data-i18n-control>
      {localeOptions.map(({ code, short, label }) => (
        <button
          key={code}
          type="button"
          aria-label={label}
          aria-current={locale === code ? "true" : undefined}
          title={label}
          onClick={() => setLocale(code)}
        >
          {short}
        </button>
      ))}
    </nav>
  )
}

export default LocaleSwitcher
