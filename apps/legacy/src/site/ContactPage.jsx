import { useLocale } from "../i18n/LocaleContext"
import ContactLeadSection from "../components/ContactLeadSection"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { getTrustPageCopy } from "./trustPagesI18n"
import { studioSeo } from "./studioContent"
import { studioWords } from "./studioWords"

export default function ContactPage() {
  const { locale } = useLocale()
  const copy = getTrustPageCopy(locale).contact
  const words = studioWords[locale] ?? studioWords["zh-Hant"]
  return <SiteLayout><Seo page={{ ...studioSeo, path: "/contact", title: locale === "zh-Hant" ? "聊聊需求｜Qingyu Web" : copy.seo[0], description: words.ctaText, localizedCopy: true }} /><ContactLeadSection /></SiteLayout>
}
