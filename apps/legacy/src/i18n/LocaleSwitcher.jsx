import { useLocale } from "./LocaleContext"
import { localeOptions } from "./translations"

function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <nav className="qy-locale-switcher" aria-label="Language" data-i18n-control>
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
