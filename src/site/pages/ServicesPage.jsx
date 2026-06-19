import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, FinalCta, PageHero, PrimaryLink, SectionHeader, TagList } from "../SiteComponents"
import { seoPages, serviceCards } from "../siteContent"

function ServicesPage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.services} />
      <PageHero eyebrow="Services" title="網站製作服務">
        <p>從一頁式網站、作品集、小型店家網站到工程行接案網站，先把內容、手機版與聯絡動線做好，再視需求擴充表單、LINE 或後台。</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="你可以從這些服務開始" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => (
            <Card key={service.title}>
              <h2 className="text-xl font-black">{service.title}</h2>
              <p className="mt-2 text-xs font-black text-[#0f766e]">適合：{service.fit}</p>
              <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">{service.problem}</p>
              <div className="mt-4">
                <TagList items={service.deliverables} />
              </div>
              {service.title === "工程行接案網站" ? (
                <div className="mt-5">
                  <PrimaryLink to="/services/construction-website">看工程行服務</PrimaryLink>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  )
}

export default ServicesPage
