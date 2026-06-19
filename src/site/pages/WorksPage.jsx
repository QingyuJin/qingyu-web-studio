import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, FinalCta, PageHero, PrimaryLink, SectionHeader, TagList } from "../SiteComponents"
import { seoPages, works } from "../siteContent"

function WorksPage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.works} />
      <PageHero eyebrow="Works" title="作品案例">
        <p>這裡不是放很多炫技截圖，而是整理成客戶看得懂的案例：解決什麼問題、做了什麼、適合誰。</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="目前代表作品" />
        <div className="mt-8 grid gap-5">
          {works.map((work, index) => (
            <Card key={work.title} className={index === 0 ? "border-[#0f766e] bg-[#eef7f4]" : ""}>
              <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{work.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-[#5d6863]">{work.description}</p>
                  <div className="mt-4">
                    <TagList items={work.tags} />
                  </div>
                </div>
                <PrimaryLink to={work.path}>{index === 0 ? "查看案例" : "看服務方向"}</PrimaryLink>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  )
}

export default WorksPage
