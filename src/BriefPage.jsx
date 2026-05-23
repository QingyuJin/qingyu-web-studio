import { Link } from "react-router-dom"

const websiteTypes = [
  {
    title: "個人作品集 / 履歷網站",
    desc: "適合學生、求職者、創作者、設計師、攝影師，用來展示個人介紹、作品、技能與聯絡方式。",
  },
  {
    title: "一頁式形象網站",
    desc: "適合小店、個人品牌、工作室、自由工作者，用來介紹服務、價格、作品與預約方式。",
  },
  {
    title: "活動 / 社團宣傳頁",
    desc: "適合社團招生、講座、營隊、比賽、工作坊，用來整理活動資訊、流程與報名入口。",
  },
  {
    title: "服務型網站",
    desc: "適合顧問、課程品牌、數位工作室、小型團隊，用來展示服務內容、方案、流程與聯絡方式。",
  },
]

const questions = [
  {
    title: "網站用途",
    items: [
      "這個網站主要是要做什麼？",
      "希望訪客看完後做什麼？例如聯絡、預約、報名、看作品、了解服務。",
      "主要目標對象是誰？學生、顧客、店家客人、活動參與者、合作對象？",
    ],
  },
  {
    title: "內容資料",
    items: [
      "目前是否已有文字內容？",
      "是否已有圖片、Logo、品牌色、社群連結？",
      "需要我協助整理文案架構嗎？",
    ],
  },
  {
    title: "頁面與區塊",
    items: [
      "需要哪些區塊？首頁、關於、服務、作品、價格、FAQ、地圖、聯絡方式？",
      "是否需要 Google Map、LINE、Instagram、Email、報名表連結？",
      "是否需要多頁網站，還是一頁式網站即可？",
    ],
  },
  {
    title: "風格參考",
    items: [
      "有沒有喜歡的網站或參考風格？",
      "希望網站感覺是簡約、活潑、科技、溫柔、專業，還是高級感？",
      "有沒有不喜歡的風格？",
    ],
  },
  {
    title: "時程與預算",
    items: [
      "希望什麼時候完成？",
      "預算大概落在哪個範圍？",
      "是否需要後續修改或維護？",
    ],
  },
]

const modules = [
  "首頁主視覺",
  "關於我們",
  "服務項目",
  "價格方案",
  "作品展示",
  "菜單 / 商品列表",
  "活動流程",
  "FAQ 常見問題",
  "Google Map",
  "LINE / IG / Email",
  "表單 / 報名連結",
  "案例說明",
]

const deliverables = [
  "網站公開連結",
  "RWD 手機版頁面",
  "前端頁面製作",
  "協助部署上線",
  "聯絡按鈕整合",
  "基本修改調整",
  "網站原始碼",
  "簡易交付說明",
]

function BriefPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute right-[-180px] top-[260px] h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute bottom-[-180px] left-[30%] h-[480px] w-[480px] rounded-full bg-amber-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur hover:border-white/40"
        >
          ← 回到首頁
        </Link>
      </div>

      <section className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-28 md:pt-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            Website Brief
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            網站需求確認表
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-white/60">
            在正式報價前，可以先用這份需求表整理網站用途、內容、功能、
            參考風格、時程與預算。需求越清楚，網站製作範圍和報價就越準確。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#questions"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-200"
            >
              查看問題清單
            </a>
            <a
              href="mailto:a0988874324@gmail.com"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/40"
            >
              寄信討論需求
            </a>
          </div>
        </div>

        <div className="rounded-[2.2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="rounded-[1.8rem] bg-[#11141d] p-6">
            <p className="text-sm text-white/40">Brief Status</p>
            <h2 className="mt-4 text-3xl font-semibold">
              從模糊想法整理成可製作範圍
            </h2>

            <div className="mt-6 space-y-4">
              <Progress label="網站用途" value="90%" width="w-[90%]" />
              <Progress label="內容資料" value="70%" width="w-[70%]" />
              <Progress label="功能範圍" value="80%" width="w-[80%]" />
              <Progress label="風格方向" value="65%" width="w-[65%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Website Type"
          title="先確認你需要哪一種網站。"
          desc="不同網站的重點不同。先確認類型，才能判斷需要哪些區塊、功能與報價方式。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {websiteTypes.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="questions" className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Questions"
          title="需求確認問題"
          desc="你不需要一次回答得很完整，但這些問題可以幫助我們把網站範圍變清楚。"
        />

        <div className="space-y-5">
          {questions.map((group, index) => (
            <div
              key={group.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm text-cyan-300">0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{group.title}</h3>
                </div>

                <div className="grid gap-3 md:w-[68%]">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl bg-white/5 p-4 leading-7 text-white/65"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-white p-8 text-black md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Modules
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                可以依照需求組合的網站模組
              </h2>
              <p className="mt-6 leading-8 text-black/60">
                網站不一定要從零亂做，也不應該全部套同一個模板。
                會依照你的產業、內容與目標，選擇適合的區塊。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {modules.map((item) => (
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

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Deliverables"
          title="合作後會交付什麼？"
          desc="交付內容會依照實際方案調整，但基本網站製作會包含以下項目。"
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {deliverables.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-white/70 backdrop-blur"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] bg-cyan-300 p-8 text-black md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
            Next Step
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            你可以先把需求用訊息傳給我。
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-black/65">
            可以不用非常完整，只要先告訴我網站用途、想放的內容、參考風格、
            預算與希望完成時間，我就能幫你初步判斷範圍。
          </p>

          <div className="mt-9 grid gap-3 md:grid-cols-3">
            <ContactCard
              label="Email"
              value="a0988874324@gmail.com"
              href="mailto:a0988874324@gmail.com"
            />
            <ContactCard label="LINE" value="mulavuc" />
            <ContactCard
              label="Instagram"
              value="qingyu.jin"
              href="https://www.instagram.com/qingyu.jin"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md leading-8 text-white/55">{desc}</p>
    </div>
  )
}

function Progress({ label, value, width }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/55">{label}</span>
        <span className="text-cyan-300">{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full bg-cyan-300 ${width}`} />
      </div>
    </div>
  )
}

function ContactCard({ label, value, href }) {
  const content = (
    <>
      <p className="text-sm text-black/50">{label}</p>
      <p className="mt-2 font-semibold">{value}</p>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="rounded-3xl bg-white/70 p-5 transition hover:bg-white"
      >
        {content}
      </a>
    )
  }

  return <div className="rounded-3xl bg-white/70 p-5">{content}</div>
}

export default BriefPage