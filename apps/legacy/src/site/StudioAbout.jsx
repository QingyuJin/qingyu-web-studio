import { useLocale } from "../i18n/LocaleContext"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { StudioCta, SectionIntro } from "./StudioParts"
import { studioSeo } from "./studioContent"
import { studioWords } from "./studioWords"
import { getWorkingSteps } from "./studioLocalizedContent"

export default function StudioAbout() {
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const steps = getWorkingSteps(locale)
  return (
    <SiteLayout>
      <Seo
        page={{
          ...studioSeo,
          path: "/about",
          title: `${c.nav[2]}｜Qingyu Web`,
          description: c.aboutIntro,
          localizedCopy: true,
        }}
      />
      <main className="qy-page">
        <header className="qy-wrap qy-page-hero">
          <p className="qy-kicker">{c.kickers[9]}</p>
          <h1 className="qy-preline">{c.aboutTitle}</h1>
          <p className="qy-lead">{c.aboutIntro}</p>
        </header>
        <section className="qy-section" style={{ paddingTop: 30 }}>
          <div className="qy-wrap qy-about-story">
            <blockquote className="qy-preline">
              {c.aboutQuote}
              <span className="qy-signature">{c.brand}</span>
            </blockquote>
            <div>
              <p>{c.aboutBody}</p>
              <p>{c.aboutHonest}</p>
            </div>
          </div>
        </section>
        <section className="qy-section qy-tinted">
          <div className="qy-wrap">
            <SectionIntro label={c.kickers[10]} title={c.process} text={c.processText} />
            <ol className="qy-process">
              {steps.map(([title, text], i) => (
                <li key={title}>
                  <span className="qy-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="qy-section">
          <div className="qy-wrap qy-simple">
            <h2>{c.deliveryTitle}</h2>
            <p>{c.deliveryText}</p>
          </div>
        </section>
        <StudioCta />
      </main>
    </SiteLayout>
  )
}
