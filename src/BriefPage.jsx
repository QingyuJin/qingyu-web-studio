import { useState } from "react"
import { Link } from "react-router-dom"

const websiteTypes = [
  {
    title: "預約制工作室",
    examples: "美甲 / 美睫 / 美容 / 霧眉 / 攝影 / 健身教練",
    needs: ["服務價格", "作品展示", "預約流程", "LINE / IG", "Google Map", "FAQ"],
  },
  {
    title: "個人作品集 / 履歷網站",
    examples: "學生 / 求職者 / 創作者 / 設計師 / 攝影師",
    needs: ["個人介紹", "技能", "作品案例", "經歷", "聯絡方式", "履歷連結"],
  },
  {
    title: "服務型網站",
    examples: "顧問 / 課程品牌 / 自由工作者 / 小型團隊",
    needs: ["服務內容", "方案比較", "合作流程", "案例說明", "需求表", "CTA"],
  },
  {
    title: "活動 / 報名頁",
    examples: "社團活動 / 講座 / 工作坊 / 營隊 / 比賽",
    needs: ["活動資訊", "時間地點", "流程", "報名連結", "注意事項", "FAQ"],
  },
]

const questionGroups = [
  {
    title: "網站目標",
    desc: "先確認網站存在的目的，避免只是做出漂亮但沒有方向的頁面。",
    questions: [
      "這個網站主要要給誰看？",
      "希望訪客看完後做什麼？例如：私訊、預約、報名、看作品、了解服務。",
      "目前最大的問題是什麼？資訊太散、手機版不好看、客人一直問重複問題，還是沒有正式入口？",
    ],
  },
  {
    title: "內容與素材",
    desc: "小型網站最常卡在資料不完整，所以要先確認文字、圖片與連結有哪些。",
    questions: [
      "目前是否已有 Logo、品牌色、照片、文案、菜單、價格表或作品圖？",
      "圖片是你提供，還是需要先用示意圖 / 免費素材做概念版？",
      "是否需要我協助整理文案順序與網站區塊？",
    ],
  },
  {
    title: "功能與連結",
    desc: "先確認必要功能，避免一開始就把範圍拉得太大。",
    questions: [
      "需要放 LINE、Instagram、Email、Google Map、Google Form 或預約連結嗎？",
      "需要一頁式網站即可，還是需要多頁網站？",
      "是否需要基本 SEO meta、社群分享預覽 OGP、Google Analytics 或 Search Console 設定建議？",
    ],
  },
  {
    title: "設計方向",
    desc: "設計不是只問喜歡什麼顏色，而是要確認產業、風格與客戶期待。",
    questions: [
      "希望網站感覺是簡約、溫柔、專業、科技、高級、可愛，還是生活感？",
      "有沒有喜歡的參考網站或 IG 頁面？",
      "有沒有不喜歡的風格？例如太花、太暗、太像模板、太像 AI 生成。",
    ],
  },
  {
    title: "時程與預算",
    desc: "先講清楚時程與預算，後面比較不容易誤會。",
    questions: [
      "希望什麼時候完成初版？什麼時候正式上線？",
      "預算大概落在哪個範圍？",
      "上線後是否需要協助修改文字、圖片或連結？",
    ],
  },
]

const assetsChecklist = [
  "Logo 或品牌名稱",
  "品牌色 / 喜歡的色系",
  "店家或個人照片",
  "作品照 / 商品照 / 活動照",
  "服務項目與價格",
  "營業時間 / 地點 / 注意事項",
  "LINE / IG / Email / Google Map",
  "參考網站或喜歡的風格",
]

const featureOptions = [
  "一頁式網站",
  "個人作品集",
  "服務介紹區",
  "價格 / 方案表",
  "作品展示",
  "FAQ 常見問題",
  "Google Map",
  "LINE / IG / Email 按鈕",
  "Google Form / 報名連結",
  "基本 SEO meta",
  "社群分享 OGP",
  "Vercel 部署",
]

const packageLevels = [
  {
    title: "Basic",
    price: "NT$2,000–4,000",
    fit: "學生作品集、簡單個人頁、活動介紹頁",
    items: ["單頁架構", "RWD 排版", "基本聯絡按鈕", "Vercel 部署"],
  },
  {
    title: "Standard",
    price: "NT$5,000–8,000",
    fit: "小店形象頁、工作室預約頁、服務介紹頁",
    items: ["完整一頁式網站", "服務 / 價格 / FAQ", "LINE / IG / Map", "基本 SEO / OGP"],
  },
  {
    title: "Adjust",
    price: "NT$500–1,000 / 小時",
    fit: "舊網站修改、手機版調整、文案圖片更新",
    items: ["版面調整", "RWD 修正", "連結更新", "小功能修改"],
  },
]

const scopeCanDo = [
  "React / Vite 前端頁面",
  "RWD 手機版排版",
  "一頁式網站 / 作品集網站",
  "LINE / IG / Email / Google Map 整合",
  "Google Form / 報名連結整合",
  "Vercel 部署與 GitHub 原始碼管理",
  "基本 SEO meta / OGP 設定",
  "簡易交付與修改說明",
]

const scopeNotMain = [
  "大型後台系統",
  "會員登入",
  "金流付款",
  "完整電商購物車",
  "大型 CMS 內容管理系統",
  "保證 Google SEO 排名",
  "廣告投放成效保證",
  "高階品牌識別全套設計",
]

const process = [
  {
    title: "填寫需求",
    desc: "先用下面格式整理網站用途、內容、功能、預算與時程。",
  },
  {
    title: "初步評估",
    desc: "我會判斷是否適合小型網站範圍，並確認頁面內容與交付項目。",
  },
  {
    title: "製作初版",
    desc: "完成主要版面、RWD 手機版、按鈕連結與基本內容排版。",
  },
  {
    title: "修改上線",
    desc: "依回饋調整文字、圖片與區塊，確認後部署上線並交付連結。",
  },
]

const shortTemplate = `網站用途：
網站類型：
主要給誰看：
希望訪客做什麼：
需要放的內容：
目前有的素材：
需要的功能：
參考風格：
預算範圍：
希望完成時間：
聯絡方式：`

const fullTemplate = `【網站需求整理】

1. 網站用途
例如：工作室預約頁 / 個人作品集 / 活動報名頁 / 服務介紹頁

2. 主要對象
例如：新客戶 / 學校老師 / 求職公司 / 活動參加者 / 小店客人

3. 希望訪客完成的動作
例如：私訊 LINE、追蹤 IG、填表單、預約、查看作品、了解價格

4. 需要放的內容
例如：關於我、服務項目、價格、作品照、FAQ、地點、營業時間、注意事項

5. 目前已有素材
Logo：
照片：
文字內容：
價格表：
社群連結：
Google Map：
參考網站：

6. 需要的功能
LINE / IG / Email：
Google Map：
Google Form：
基本 SEO：
社群分享預覽：
流量追蹤建議：

7. 風格方向
喜歡的風格：
不喜歡的風格：
品牌色或參考色：

8. 預算與時程
預算範圍：
希望初版時間：
希望上線時間：

9. 補充說明
`

function BriefPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <BackgroundGlow />

      <div className="relative mx-auto max-w-7xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
        >
          ← 回到首頁
        </Link>
      </div>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.02fr_0.98fr] md:items-center md:pb-28 md:pt-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Website Brief / 接案需求整理
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            先把需求整理清楚，再開始做網站。
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-white/60">
            這份需求表是用來確認網站目的、內容素材、功能範圍、預算與時程。
            你不需要一開始就準備得很完整，但資料越清楚，越容易評估能不能做、多久完成、以及大概費用。
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#copy"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              直接複製需求格式
            </a>
            <a
              href="#scope"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40"
            >
              查看服務範圍
            </a>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            <Stat number="Purpose" label="網站目的" />
            <Stat number="Content" label="內容素材" />
            <Stat number="Scope" label="功能範圍" />
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2.4rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-[1.9rem] bg-[#11141d] p-6">
              <p className="text-sm text-cyan-200">Brief Checklist</p>
              <h2 className="mt-4 text-3xl font-semibold">
                最常需要先確認的 5 件事
              </h2>

              <div className="mt-6 space-y-3">
                {[
                  "網站要給誰看？",
                  "希望訪客做什麼？",
                  "目前有什麼素材？",
                  "需要哪些功能與連結？",
                  "預算與時程大概多少？",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-semibold text-black">
                      {index + 1}
                    </span>
                    <span className="text-white/75">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5">
                <p className="text-sm font-semibold text-cyan-200">
                  重點
                </p>
                <p className="mt-2 leading-7 text-white/65">
                  需求表不是考試，不用一次寫完。它只是幫我們把網站範圍變清楚，避免做到一半才發現方向不同。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          eyebrow="Website Type"
          title="先確認你要的是哪一種網站。"
          desc="不同類型的網站，重點不同。預約制工作室需要預約流程，作品集需要整理能力，服務型網站需要說清楚方案。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {websiteTypes.map((type) => (
            <Card key={type.title}>
              <h3 className="text-2xl font-semibold">{type.title}</h3>
              <p className="mt-3 leading-7 text-white/55">{type.examples}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {type.needs.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          eyebrow="Questions"
          title="需求確認問題"
          desc="這些問題來自實際接案最常卡住的地方：目的不清楚、素材不足、功能想太多、預算時程沒有先講。"
        />

        <div className="space-y-5">
          {questionGroups.map((group, index) => (
            <Card key={group.title}>
              <div className="grid gap-6 md:grid-cols-[0.32fr_0.68fr]">
                <div>
                  <p className="text-sm text-cyan-300">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{group.title}</h3>
                  <p className="mt-4 leading-7 text-white/50">{group.desc}</p>
                </div>

                <div className="grid gap-3">
                  {group.questions.map((question) => (
                    <div
                      key={question}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 leading-7 text-white/70"
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.8rem] bg-white p-8 text-black md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Materials
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                先看看你手上有哪些素材。
              </h2>
              <p className="mt-6 leading-8 text-black/60">
                沒有全部資料也可以開始討論，但如果有照片、價格表、社群連結和參考風格，會更容易評估網站架構。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {assetsChecklist.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-sm font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          eyebrow="Features"
          title="可以先勾選需要的功能。"
          desc="小型網站不是功能越多越好，應該先保留真正會幫助訪客理解與聯絡你的功能。"
        />

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {featureOptions.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-white/70"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="scope" className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          eyebrow="Scope"
          title="先把服務範圍說清楚。"
          desc="這樣可以避免一開始只是做一頁式網站，後面卻變成大型系統、金流、會員、後台管理。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <ScopeCard title="目前適合承接" items={scopeCanDo} positive />
          <ScopeCard title="目前不主打 / 不亂承諾" items={scopeNotMain} />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          eyebrow="Budget"
          title="預算可以先用範圍討論。"
          desc="實際價格會依內容完整度、區塊數量、修改次數、功能與時程調整。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {packageLevels.map((item) => (
            <Card key={item.title}>
              <p className="text-sm font-semibold text-cyan-300">{item.title}</p>
              <h3 className="mt-3 text-3xl font-semibold">{item.price}</h3>
              <p className="mt-4 leading-7 text-white/55">{item.fit}</p>

              <div className="mt-6 grid gap-3">
                {item.items.map((detail) => (
                  <div key={detail} className="flex gap-3 text-white/65">
                    <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          eyebrow="Process"
          title="接案流程"
          desc="先整理需求，再評估範圍，最後才進入製作。這樣比較不會浪費雙方時間。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {process.map((item, index) => (
            <Card key={item.title}>
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/55">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="copy" className="relative mx-auto max-w-7xl px-5 py-16 pb-28">
        <SectionHeading
          eyebrow="Copy Template"
          title="可以直接複製下面格式傳給我。"
          desc="你可以先填簡短版。如果需求比較多，再用完整版本補充。"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <CopyBox title="簡短版需求格式" text={shortTemplate} />
          <CopyBox title="完整需求格式" text={fullTemplate} />
        </div>

        <div className="mt-8 overflow-hidden rounded-[2.8rem] bg-cyan-300 p-8 text-black md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Next Step
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                需求還不完整也可以先討論。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-black/65">
                可以先傳網站用途、參考風格、預算和希望完成時間。我會先幫你判斷是不是適合小型網站範圍。
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href="mailto:a0988874324@gmail.com"
                className="rounded-3xl bg-white/75 p-5 transition hover:bg-white"
              >
                <p className="text-sm text-black/50">Email</p>
                <p className="mt-2 font-semibold">a0988874324@gmail.com</p>
              </a>
              <div className="rounded-3xl bg-white/50 p-5">
                <p className="text-sm text-black/50">LINE</p>
                <p className="mt-2 font-semibold">mulavuc</p>
              </div>
              <Link
                to="/luma-nail"
                className="rounded-3xl bg-black p-5 text-white transition hover:bg-stone-800"
              >
                <p className="text-sm text-white/50">Main Case</p>
                <p className="mt-2 font-semibold">查看 Luma 主打案例 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function CopyBox({ title, text }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.06] backdrop-blur">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
        >
          {copied ? "已複製" : "複製"}
        </button>
      </div>

      <pre className="max-h-[560px] overflow-auto whitespace-pre-wrap p-6 text-sm leading-7 text-white/70">
        {text}
      </pre>
    </div>
  )
}

function ScopeCard({ title, items, positive = false }) {
  return (
    <Card>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 leading-7 text-white/65">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                positive ? "bg-cyan-300" : "bg-amber-300"
              }`}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

function Card({ children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]">
      {children}
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-xl font-semibold text-cyan-300">{number}</p>
      <p className="mt-2 text-xs text-white/45">{label}</p>
    </div>
  )
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md leading-8 text-white/55">{desc}</p>
    </div>
  )
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute left-[-160px] top-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute right-[-220px] top-[280px] h-[560px] w-[560px] rounded-full bg-amber-400/10 blur-[150px]" />
      <div className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
    </div>
  )
}

export default BriefPage