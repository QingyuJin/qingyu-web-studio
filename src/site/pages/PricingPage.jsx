import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, FinalCta, PageHero, SectionHeader } from "../SiteComponents"
import { pricingPlans, seoPages } from "../siteContent"

function PricingPage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.pricing} />
      <PageHero eyebrow="Pricing" title="價格方案">
        <p>價格可以依需求調整。這裡先提供常見範圍，方便你判斷該從一頁式網站、標準網站，還是小系統開始。</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="三種開始方式" />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.featured ? "border-[#0f766e] ring-4 ring-[#0f766e]/10" : ""}>
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <p className="mt-2 text-3xl font-black text-[#0f766e]">{plan.price}</p>
              <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">適合：{plan.fit}</p>
              <ul className="mt-5 grid gap-3 text-sm font-bold text-[#40514f]">
                {plan.includes.map((item) => (
                  <li key={item} className="rounded-lg bg-[#f8f7f2] px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-6 rounded-xl border border-[#dedbd1] bg-white p-4 text-sm font-bold leading-7 text-[#5d6863]">
          注意：以上是初步範圍，實際會依頁面數、內容整理程度、表單/後台/LINE Bot 需求與上線時間調整。
        </p>
      </section>

      <FinalCta title="不知道該選哪一種？" text="你可以先傳需求，我會建議最小可行版本，不會一開始就叫你做大型系統。" />
    </SiteLayout>
  )
}

export default PricingPage
