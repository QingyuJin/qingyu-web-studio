import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, FinalCta, PageHero, PrimaryLink, SecondaryLink, SectionHeader, TagList } from "../SiteComponents"
import { constructionDeliverables, constructionProblems, constructionTargets, seoPages } from "../siteContent"

function ConstructionWebsitePage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.construction} />
      <PageHero
        eyebrow="Construction Website"
        title="工程行接案網站製作"
        actions={
          <>
            <PrimaryLink to="/works/xinjiang">看鑫匠工程案例</PrimaryLink>
            <SecondaryLink to="/free-audit">免費健檢</SecondaryLink>
          </>
        }
      >
        <p>
          協助防水、地坪、水電、裝修、修繕、空調、弱電、監控與工程服務業，把服務項目、施工案例、估價入口與聯絡流程整理成能接案的網站。
        </p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Fit" title="適合對象" />
        <div className="mt-6">
          <TagList items={constructionTargets} />
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-[#f1eee5]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow="Problems" title="工程行網站常見問題" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {constructionProblems.map((item) => (
              <Card key={item}>
                <p className="text-sm font-black leading-7 text-[#40514f]">{item}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Deliverables" title="我會幫你做" />
        <div className="mt-6">
          <TagList items={constructionDeliverables} />
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow="Recommended Structure" title="推薦網站架構" />
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {["首頁", "服務項目", "案例", "施工流程", "常見問題", "聯絡 / 估價"].map((item, index) => (
              <Card key={item}>
                <p className="text-xs font-black text-[#0f766e]">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-black">{item}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="想整理你的工程接案網站？" text="可以先丟給我你的舊網站、服務照片或 LINE 接案流程，我幫你看最適合怎麼改。" />
    </SiteLayout>
  )
}

export default ConstructionWebsitePage
