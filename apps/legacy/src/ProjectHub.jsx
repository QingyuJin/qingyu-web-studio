import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useLocale } from "./i18n/LocaleContext"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { filterStudioWorks, studioSeo } from "./site/studioContent"
import { studioWords } from "./site/studioWords"
import { StudioCta, WorkCard } from "./site/StudioParts"
import TemplatePortal from "./onepage/TemplatePortal"
import { getTemplateEntryCopy } from "./onepage/templateEntry"

const filters = ["featured", "websites", "systems", "automation", "ai", "experiments"]
export default function ProjectHub() {
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const value = params.get("type")
  const category =
    value === "tools"
      ? "experiments"
      : value === "client"
        ? "websites"
        : filters.includes(value)
          ? value
          : "featured"
  const items = filterStudioWorks(category)
  return (
    <SiteLayout>
      <Seo
        page={{
          ...studioSeo,
          path: "/works",
          title: `${c.nav[0]}｜Qingyu Web`,
          description: c.worksIntro,
          localizedCopy: true,
        }}
      />
      <main className="qy-page">
        <header className="qy-page-hero qy-wrap">
          <p className="qy-kicker">{c.kickers[6]}</p>
          <h1 className="qy-preline">{c.worksTitle}</h1>
          <p className="qy-lead">{c.worksIntro}</p>
          <div className="qy-filter-compact">
            <label>
              <span>{c.filterLabel}</span>
              <select value={category} onChange={(event) => {
                const next = new URLSearchParams(params)
                if (event.target.value === "featured") next.delete("type")
                else next.set("type", event.target.value)
                next.set("lang", locale)
                navigate({ pathname: "/works", search: next.toString() })
              }}>
                {filters.map((filter, i) => <option key={filter} value={filter}>{c.filters[i]}</option>)}
              </select>
            </label>
            <Link className="qy-text-link" to={`/showcase?lang=${locale}`}>{getTemplateEntryCopy(locale).label} <span aria-hidden="true">↗</span></Link>
          </div>
          <nav className="qy-filters" aria-label={c.filterLabel}>
            {filters.map((filter, i) => (
              <Link
                to={filter === "featured" ? "/works" : `/works?type=${filter}`}
                className={category === filter ? "is-active" : ""}
                key={filter}
                aria-current={category === filter ? "page" : undefined}
              >
                {c.filters[i]}
              </Link>
            ))}
            <Link to={`/showcase?lang=${locale}`}>
              {getTemplateEntryCopy(locale).label} <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </header>
        <section className="qy-wrap qy-works-results" aria-label={c.nav[0]}>
          <p className="qy-results-status" role="status">
            {c.filters[filters.indexOf(category)]} · {items.length}
          </p>
          <div className="qy-work-grid">
            {items.map((item, i) => (
              <WorkCard key={item.slug} item={item} index={i} />
            ))}
          </div>
          <p className="qy-catalog-note">{c.worksNote}</p>
          {["featured", "websites"].includes(category) && <TemplatePortal />}
        </section>
        <StudioCta />
      </main>
    </SiteLayout>
  )
}
