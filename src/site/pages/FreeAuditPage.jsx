import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, PageHero, PrimaryLink, SectionHeader } from "../SiteComponents"
import { contactInfo, seoPages } from "../siteContent"

const auditItems = [
  "手機版有沒有爆版",
  "首頁 5 秒內能不能看懂",
  "LINE / 表單 CTA 是否明顯",
  "服務項目是否清楚",
  "案例與作品是否有說服力",
  "SEO title / description 是否正常",
  "是否缺少信任元素",
  "是否有多餘卡片、過度設計、AI 感太重的問題",
]

function FreeAuditPage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.audit} />
      <PageHero
        eyebrow="Free Audit"
        title="免費網站健檢"
        actions={<PrimaryLink to="/contact">送出健檢需求</PrimaryLink>}
      >
        <p>你可以丟給我你的舊網站、作品集、店家頁或工程網站，我會幫你看哪些地方會影響手機閱讀、信任感與聯絡轉換。</p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title="我會幫你看這些地方" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {auditItems.map((item) => (
            <Card key={item}>
              <p className="text-sm font-black leading-7 text-[#40514f]">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-[#f1eee5]">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <SectionHeader title="健檢表單" />
          <form className="mt-8 grid gap-4 rounded-xl border border-[#d8d4c8] bg-white p-5 shadow-sm">
            {["姓名 / 稱呼", "Email 或 LINE", "網站網址", "你想改善什麼", "預算區間（可選填）"].map((label) => (
              <label key={label} className="grid gap-2 text-sm font-black text-[#40514f]">
                {label}
                <input
                  className="min-h-11 rounded-md border border-[#d5d1c7] px-3 text-sm font-bold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
                  placeholder={label}
                />
              </label>
            ))}
            <p className="text-xs font-bold leading-6 text-[#66716d]">
              TODO：目前先做前端占位。正式使用時可改接 Google Form、mailto 或 Supabase 表單。
            </p>
            <a
              href={`mailto:${contactInfo.email}?subject=免費網站健檢需求`}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
            >
              用 Email 送出
            </a>
          </form>
        </div>
      </section>
    </SiteLayout>
  )
}

export default FreeAuditPage
