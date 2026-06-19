import SiteLayout from "../SiteLayout"
import Seo from "../Seo"
import { Card, FinalCta, PageHero, PrimaryLink, SecondaryLink, SectionHeader, TagList } from "../SiteComponents"
import { seoPages } from "../siteContent"

const problems = [
  "客戶不知道要怎麼描述漏水、地坪、修繕問題",
  "工程方缺少清楚的服務介紹",
  "案例散在手機相簿或 LINE",
  "估價需求沒有統一入口",
  "案件狀態不容易管理",
  "手機版資訊不清楚會降低信任感",
]

const solutions = [
  "首頁服務定位",
  "工程項目分類",
  "施工案例展示",
  "我要估價 CTA",
  "表單收件流程",
  "BuildFlow 後台概念",
  "案件狀態管理",
  "LINE 回報流程示意",
]

const structure = ["首頁", "服務項目", "施工案例", "估價表單", "後台 Dashboard", "案件詳情", "聯絡 CTA"]

const buildFlowFeatures = ["案件列表", "案件狀態", "客戶資料", "工程類型", "現場照片", "報價狀態", "派工 / 完工狀態", "LINE 回報示意"]

function XinjiangCasePage() {
  return (
    <SiteLayout>
      <Seo page={seoPages.xinjiang} />
      <PageHero
        eyebrow="Case Study"
        title="鑫匠工程｜防水地坪修繕網站 + BuildFlow 後台 Demo"
        actions={
          <>
            <PrimaryLink to="/buildflow">看網站區塊</PrimaryLink>
            <SecondaryLink to="/contact">聯絡我做類似網站</SecondaryLink>
          </>
        }
      >
        <p>
          一個為工程行設計的接案網站與案件管理流程概念，將服務項目、施工案例、估價入口與後台管理整理在同一套網站架構中。
        </p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Background" title="專案背景">
          很多工程行的接案流程都散在 LINE、電話、照片與口頭報價裡。客戶不知道怎麼描述問題，工程方也不容易整理需求、追蹤進度與展示過去案例，所以這個 Demo 嘗試把工程接案流程整理成網站與後台。
        </SectionHeader>
      </section>

      <TwoColumnSection title="解決問題" items={problems} tone="warm" />
      <TwoColumnSection title="我設計的解法" items={solutions} />

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Site Map" title="網站架構" />
        <div className="mt-8 flex flex-wrap gap-2">
          {structure.map((item) => (
            <span key={item} className="rounded-full bg-[#172026] px-4 py-2 text-sm font-black text-white">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dedbd1] bg-[#eef7f4]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHeader eyebrow="BuildFlow" title="工程案件管理後台概念">
              BuildFlow 是給工程行的小型案件管理後台概念。目標是把 LINE 裡分散的需求、照片、報價、派工狀態與完工回報整理成可以追蹤的流程。
            </SectionHeader>
            <div className="mt-6">
              <PrimaryLink to="/buildflow">查看 BuildFlow Demo</PrimaryLink>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildFlowFeatures.map((item) => (
              <Card key={item}>
                <h3 className="text-lg font-black">{item}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader eyebrow="Tech Stack" title="技術棧" />
        <div className="mt-6">
          <TagList items={["React", "Vite", "Tailwind CSS", "React Router", "Vercel", "表單流程設計", "後台 UI 設計"]} />
        </div>
      </section>

      <section className="border-t border-[#dedbd1] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow="Value" title="成果與價值">
            這個案例展示我不只是做一個漂亮首頁，而是能幫工程行思考接案流程、服務呈現、案例展示、表單入口與後台管理。未來可以擴充成真正的 Supabase 資料庫、LINE 通知、報價單 PDF 匯出與客戶進度查詢。
          </SectionHeader>
        </div>
      </section>

      <FinalCta
        title="你也是工程、修繕或現場服務業嗎？"
        text="防水、水電、裝修、清潔、空調、弱電、監控或修繕類型，都可以用類似架構整理你的網站。"
        primary="我也想做工程網站"
        secondary="免費網站健檢"
      />
    </SiteLayout>
  )
}

function TwoColumnSection({ title, items, tone = "cool" }) {
  const warm = tone === "warm"
  return (
    <section className={warm ? "border-y border-[#dedbd1] bg-[#f1eee5]" : "bg-[#f8f7f2]"}>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader title={title} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item} className={warm ? "" : "border-[#b9d8d0]"}>
              <p className="text-sm font-black leading-7 text-[#40514f]">{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default XinjiangCasePage
