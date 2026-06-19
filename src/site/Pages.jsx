import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { contact, pageSeo, pricing, services, works } from "./siteData"

function ContentShell({ seo, title, intro, children }) {
  return (
    <SiteLayout>
      <Seo page={seo} />
      <section className="border-b border-[#e5e1d7] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Qingyu Web Studio</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.1rem,8vw,4.2rem)] font-black leading-tight tracking-tight">{title}</h1>
          <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#5d6863]">{intro}</p>
        </div>
      </section>
      {children}
    </SiteLayout>
  )
}

function Card({ children }) {
  return <article className="rounded-xl border border-[#e1ddd2] bg-white p-5">{children}</article>
}

function TagRow({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">
          {item}
        </span>
      ))}
    </div>
  )
}

export function WorksPage() {
  return (
    <ContentShell seo={pageSeo.works} title="作品案例" intro="作品會用案例方式呈現：它解決什麼問題、適合誰，以及網站如何幫助聯絡與理解。">
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {works.map((work) => (
            <Card key={work.title}>
              <TagRow items={[work.label]} />
              <h2 className="mt-4 text-2xl font-black">{work.title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{work.description}</p>
              <Link to={work.path} className="mt-5 inline-flex text-sm font-black text-[#0f766e]">
                查看 →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </ContentShell>
  )
}

export function XinjiangPage() {
  const problems = ["服務與案例散在 LINE 或相簿", "客戶不知道怎麼描述需求", "估價入口不清楚", "案件流程難追蹤"]
  const solutions = ["工程行網站首頁", "服務與案例分類", "估價 CTA", "BuildFlow 後台概念"]
  return (
    <ContentShell
      seo={pageSeo.xinjiang}
      title="鑫匠工程 Demo"
      intro="這是工程行網站與後台概念案例，不是 qingyuweb.com 的主品牌。它示範工程行如何整理服務、案例、估價入口與案件流程。"
    >
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-black">解決問題</h2>
          <ul className="mt-4 grid gap-2 text-sm font-bold leading-7 text-[#5d6863]">
            {problems.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-2xl font-black">設計解法</h2>
          <ul className="mt-4 grid gap-2 text-sm font-bold leading-7 text-[#5d6863]">
            {solutions.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
        </Card>
      </section>
      <section className="border-y border-[#e5e1d7] bg-[#f3f1ea]">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-black">BuildFlow 後台概念</h2>
          <p className="mt-4 max-w-3xl text-sm font-bold leading-7 text-[#5d6863]">
            目標是把 LINE 裡分散的需求、照片、報價、派工狀態與完工回報整理成可以追蹤的流程。
          </p>
          <div className="mt-6">
            <TagRow items={["案件列表", "案件狀態", "客戶資料", "現場照片", "報價狀態", "LINE 回報示意"]} />
          </div>
          <Link to="/buildflow" className="mt-7 inline-flex min-h-11 items-center rounded-md bg-[#172026] px-5 text-sm font-black text-white">
            看 BuildFlow Demo
          </Link>
        </div>
      </section>
    </ContentShell>
  )
}

export function ServicesPage() {
  return (
    <ContentShell seo={pageSeo.services} title="服務項目" intro="我主要協助小型網站從內容整理、手機版、CTA 到部署上線。">
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, text]) => (
            <Card key={title}>
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </ContentShell>
  )
}

export function PricingPage() {
  return (
    <ContentShell seo={pageSeo.pricing} title="簡單好懂的方案" intro="價格依內容量、頁面數、互動功能與是否需要後台調整，以下先給常見範圍。">
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map(([name, price, text]) => (
            <Card key={name}>
              <h2 className="text-2xl font-black">{name}</h2>
              <p className="mt-2 text-3xl font-black text-[#0f766e]">{price}</p>
              <p className="mt-4 text-sm font-bold leading-7 text-[#5d6863]">{text}</p>
            </Card>
          ))}
        </div>
      </section>
    </ContentShell>
  )
}

export function FreeAuditPage() {
  return (
    <ContentShell seo={pageSeo.audit} title="免費網站健檢" intro="你可以丟舊網站或想法給我，我幫你看手機版、首頁文案、CTA、SEO、版面信任感。">
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {["手機版有沒有爆版", "首頁 5 秒內能不能看懂", "CTA 是否明顯", "SEO 與 Open Graph 是否正常", "服務項目是否清楚", "版面是否有信任感"].map((item) => (
            <Card key={item}>
              <p className="text-lg font-black">{item}</p>
            </Card>
          ))}
        </div>
        <a href={`mailto:${contact.email}?subject=免費網站健檢`} className="mt-8 inline-flex min-h-11 items-center rounded-md bg-[#172026] px-5 text-sm font-black text-white">
          開始健檢
        </a>
      </section>
    </ContentShell>
  )
}

export function ContactPage() {
  return (
    <ContentShell seo={pageSeo.contact} title="先聊聊你的網站" intro="你可以直接告訴我你想做哪種網站、目前有沒有舊網站、預算大約多少、希望什麼時候上線。">
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-4">
          <Card>
            <p className="text-xs font-black text-[#0f766e]">Email</p>
            <a href={`mailto:${contact.email}`} className="mt-2 block text-lg font-black">{contact.email}</a>
          </Card>
          <Card>
            <p className="text-xs font-black text-[#0f766e]">LINE</p>
            <p className="mt-2 text-sm font-bold text-[#5d6863]">{contact.line}</p>
          </Card>
        </div>
        <Card>
          <h2 className="text-2xl font-black">可以先告訴我</h2>
          <ul className="mt-4 grid gap-2 text-sm font-bold leading-7 text-[#5d6863]">
            <li>・你想做哪種網站</li>
            <li>・有沒有舊網站或參考網站</li>
            <li>・預算與希望上線時間</li>
            <li>・是否需要表單、LINE 或簡易後台</li>
          </ul>
        </Card>
      </section>
    </ContentShell>
  )
}
