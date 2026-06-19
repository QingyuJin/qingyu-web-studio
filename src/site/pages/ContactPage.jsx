import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, PageHero, SectionHeader } from "../SiteComponents"
import { contactInfo, seoPages } from "../siteContent"

function ContactPage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.contact} />
      <PageHero eyebrow="Contact" title="聯絡 Qingyu Web Studio">
        <p>你可以直接告訴我你想做哪種網站、目前有沒有舊網站、預算大約多少、希望什麼時候上線。</p>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeader title="聯絡方式" />
          <div className="mt-6 grid gap-3">
            <Card>
              <p className="text-xs font-black text-[#0f766e]">Email</p>
              <a href={`mailto:${contactInfo.email}`} className="mt-2 block text-lg font-black hover:text-[#0f766e]">
                {contactInfo.email}
              </a>
            </Card>
            <Card>
              <p className="text-xs font-black text-[#0f766e]">LINE</p>
              <p className="mt-2 text-sm font-bold text-[#5d6863]">{contactInfo.line}</p>
            </Card>
            <Card>
              <p className="text-xs font-black text-[#0f766e]">GitHub</p>
              <a href={contactInfo.github} className="mt-2 block text-sm font-black hover:text-[#0f766e]">
                QingyuJin/qingyu-web-studio
              </a>
            </Card>
          </div>
        </div>

        <form className="grid gap-4 rounded-xl border border-[#d8d4c8] bg-white p-5 shadow-sm">
          {["稱呼", "Email 或 LINE", "想做哪種網站", "預算大約多少", "希望什麼時候上線"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-black text-[#40514f]">
              {label}
              <input
                className="min-h-11 rounded-md border border-[#d5d1c7] px-3 text-sm font-bold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
                placeholder={label}
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-black text-[#40514f]">
            補充需求
            <textarea
              className="min-h-32 rounded-md border border-[#d5d1c7] px-3 py-3 text-sm font-bold outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
              placeholder="例如：我有舊網站、想改手機版、需要 LINE 按鈕、需要工程案例頁..."
            />
          </label>
          <a
            href={`mailto:${contactInfo.email}?subject=網站製作諮詢`}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
          >
            用 Email 聯絡
          </a>
        </form>
      </section>
    </SiteLayout>
  )
}

export default ContactPage
