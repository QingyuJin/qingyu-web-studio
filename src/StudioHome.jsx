import SiteLayout from "./site/SiteLayout"
import Seo from "./site/Seo"
import { Card, FinalCta, MockWebsiteVisual, PageHero, PrimaryLink, SecondaryLink, SectionHeader, TagList } from "./site/SiteComponents"
import { audienceCards, faqs, pricingPlans, seoPages, serviceCards, workflowSteps } from "./site/siteContent"

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seoPages.home} />

      <PageHero
        eyebrow="Qingyu Web Studio"
        title="幫你做出能被聯絡的網站"
        visual={<MockWebsiteVisual />}
        actions={
          <>
            <PrimaryLink to="/works">看作品案例</PrimaryLink>
            <SecondaryLink to="/free-audit">免費網站健檢</SecondaryLink>
          </>
        }
      >
        <p>
          幫學生、小型店家、個人品牌與工程行，做出乾淨、手機友善、能直接帶來聯絡的網站。
        </p>
        <p className="mt-3 text-sm font-black text-[#0f766e]">
          一頁式網站｜作品集｜工程行接案網站｜表單 / LINE 串接｜Vercel 部署
        </p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Who It Helps" title="你可能需要的是這幾種網站">
          不一定一開始就要做大型系統。先把服務、案例與聯絡入口整理清楚，網站才有機會幫你帶來詢問。
        </SectionHeader>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audienceCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-[#eef7f4]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader eyebrow="Featured Case" title="鑫匠工程｜工程網站 + BuildFlow 後台 Demo">
              工程需求、照片、報價與進度常散在 LINE 裡，不容易整理與追蹤。這個案例示範如何把接案首頁、服務分類、施工案例、估價入口與案件管理後台概念整理在同一套網站架構中。
            </SectionHeader>
            <div className="mt-5">
              <TagList items={["React", "Tailwind", "Vercel", "表單流程", "後台 UI"]} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryLink to="/works/xinjiang">查看完整案例</PrimaryLink>
              <SecondaryLink to="/buildflow">看 BuildFlow Demo</SecondaryLink>
            </div>
          </div>
          <div className="rounded-[1.4rem] border border-[#172026] bg-[#172026] p-2 shadow-xl">
            <div className="grid gap-3 rounded-[1rem] bg-[#f8f7f2] p-4">
              <div className="rounded-xl border border-[#dedbd1] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e]">Case Flow</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-[#40514f]">
                  {["首頁", "服務分類", "案例展示", "估價入口", "後台 Dashboard"].map((item) => (
                    <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-[#0f766e]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <MiniMetric label="案件狀態" value="施工回報中" />
                <MiniMetric label="後台概念" value="BuildFlow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Services" title="服務項目">
          用客戶看得懂的方式整理網站，而不是只把技術名詞放上去。
        </SectionHeader>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-2 text-xs font-black text-[#0f766e]">適合：{item.fit}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{item.problem}</p>
              <div className="mt-4">
                <TagList items={item.deliverables} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow="Why Me" title="為什麼找我">
            我不是只做漂亮畫面，也會幫你整理服務內容、案例與聯絡動線。
          </SectionHeader>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["資工背景", "能處理部署、表單、後台與後續維護。"],
              ["手機版優先", "大部分客戶都是用手機打開網站。"],
              ["小型預算友善", "可以先從一頁式網站開始。"],
              ["可逐步擴充", "之後再做多頁、資料庫或 LINE Bot。"],
            ].map(([title, text]) => (
              <Card key={title}>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["100% RWD 手機版", "React / Vite / Tailwind / Vercel", "可串 LINE / 表單 / Email", "支援後續維護與內容更新"].map((item) => (
              <div key={item} className="rounded-xl bg-[#172026] px-4 py-3 text-sm font-black text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Process" title="製作流程" />
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <Card key={step}>
              <p className="text-xs font-black text-[#0f766e]">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-black">{step}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-[#f1eee5]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow="Pricing" title="價格方案預覽">
            價格會依內容量、頁面數、表單與後台需求調整，先給你一個好估的範圍。
          </SectionHeader>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={plan.featured ? "border-[#0f766e] ring-4 ring-[#0f766e]/10" : ""}>
                <h3 className="text-xl font-black">{plan.name}</h3>
                <p className="mt-2 text-2xl font-black text-[#0f766e]">{plan.price}</p>
                <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{plan.fit}</p>
                <ul className="mt-4 grid gap-2 text-sm font-bold text-[#40514f]">
                  {plan.includes.slice(0, 4).map((item) => (
                    <li key={item}>・{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="mt-7">
            <PrimaryLink to="/pricing">查看完整價格</PrimaryLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="FAQ" title="常見問題" />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <Card key={question}>
              <h3 className="text-lg font-black">{question}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{answer}</p>
            </Card>
          ))}
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  )
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-[#dedbd1] bg-white p-4">
      <p className="text-xs font-black text-[#66716d]">{label}</p>
      <p className="mt-2 text-lg font-black text-[#172026]">{value}</p>
    </div>
  )
}

export default StudioHome
