import { Link } from "react-router-dom"

const services = [
  {
    title: "網站健檢",
    desc: "檢查首頁資訊、手機版排版、CTA 動線、載入速度與聯絡入口是否清楚。",
    tag: "Audit",
  },
  {
    title: "服務頁製作",
    desc: "為顧問、工作室、課程品牌、小型團隊製作清楚的服務介紹頁。",
    tag: "Website",
  },
  {
    title: "表單與聯絡整合",
    desc: "整合 Google Form、LINE、Email、IG、預約連結與外部平台。",
    tag: "Contact",
  },
  {
    title: "上線與維護",
    desc: "協助網站部署、內容更新、版面調整與基礎維護。",
    tag: "Launch",
  },
]

const industries = [
  "顧問服務",
  "課程品牌",
  "SaaS 工具",
  "數位工作室",
  "設計工作室",
  "行銷服務",
  "自由工作者",
  "小型團隊",
]

const auditItems = [
  "首頁是否能在 5 秒內說清楚你提供什麼服務",
  "手機版是否好閱讀，按鈕是否容易點擊",
  "服務項目、價格或合作方式是否清楚",
  "是否有明確的聯絡方式或預約入口",
  "社群、表單、Email、LINE 是否整合完整",
  "網站是否適合放在 IG、名片、履歷或廣告連結中",
]

const plans = [
  {
    name: "Basic",
    price: "單頁服務介紹",
    desc: "適合個人品牌、自由工作者或剛開始整理服務內容的人。",
    items: ["首頁 Hero", "服務項目", "聯絡方式", "RWD 手機版", "協助部署上線"],
  },
  {
    name: "Growth",
    price: "完整服務頁",
    desc: "適合有多個服務、需要流程說明與常見問題的小型團隊。",
    items: ["服務模組", "製作流程", "FAQ", "表單 / LINE 整合", "基礎 SEO 結構"],
  },
  {
    name: "Custom",
    price: "客製網站架構",
    desc: "適合需要更完整內容架構、案例展示或特殊版面設計的服務型品牌。",
    items: ["多區塊頁面", "案例展示", "進階 CTA", "內容架構規劃", "客製視覺風格"],
  },
]

const deliverables = [
  "網站公開連結",
  "RWD 手機版頁面",
  "首頁與服務區塊",
  "聯絡 / 表單 / LINE 按鈕",
  "部署上線協助",
  "網站原始碼",
  "簡易修改說明",
  "基礎內容架構建議",
]

const steps = [
  {
    title: "填寫需求",
    desc: "確認網站用途、目標客戶、參考風格與需要放的內容。",
  },
  {
    title: "整理架構",
    desc: "將服務內容、流程、聯絡方式與 CTA 整理成清楚的網站區塊。",
  },
  {
    title: "製作初版",
    desc: "完成首頁視覺、主要區塊與手機版排版。",
  },
  {
    title: "修改調整",
    desc: "依照回饋調整文字、圖片、間距、顏色與聯絡資訊。",
  },
  {
    title: "部署上線",
    desc: "協助網站上線，提供公開連結與基本交付說明。",
  },
]

const briefQuestions = [
  "你想做什麼類型的網站？",
  "目前有沒有舊網站或社群頁？",
  "主要想給誰看？",
  "需要放哪些服務或產品？",
  "有沒有參考網站或喜歡的風格？",
  "需要 LINE、表單、Email 或預約連結嗎？",
  "希望什麼時候完成？",
  "預算大概落在哪裡？",
]

const faqs = [
  {
    q: "這種網站適合誰？",
    a: "適合顧問服務、課程品牌、數位工作室、自由工作者、小型團隊、SaaS 工具或需要清楚介紹服務的單位。",
  },
  {
    q: "可以改成我的品牌嗎？",
    a: "可以。內容、顏色、服務項目、區塊順序、聯絡方式與按鈕都能依照實際需求調整。",
  },
  {
    q: "需要後台嗎？",
    a: "如果只是形象頁、服務介紹與聯絡入口，不一定需要後台。若需要文章管理、大量內容更新或會員功能，會另外評估。",
  },
]

function ServiceDemo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[25%] h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur hover:border-white/40"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-28 md:pt-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            Digital Service Center
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            把服務內容整理成清楚、可信、容易成交的網站。
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-slate-300">
            這是一個科技服務中心網站案例，適合顧問服務、SaaS 工具、
            數位工作室、課程品牌與小型團隊。網站重點放在服務介紹、
            流程說明、信任感建立、需求確認與聯絡轉換。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#services"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
            >
              查看服務模組
            </a>
            <a
              href="#brief"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:border-white/40"
            >
              查看需求表
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <Stat value="RWD" label="手機版支援" />
            <Stat value="8+" label="內容區塊" />
            <Stat value="CTA" label="聯絡轉換" />
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
            <div className="rounded-[1.8rem] bg-[#0b1022] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Online
                </span>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-300/20 to-violet-400/20 p-6">
                <p className="text-sm text-slate-300">Service Dashboard</p>
                <h2 className="mt-4 text-3xl font-semibold">
                  Website Support Hub
                </h2>
                <p className="mt-4 leading-7 text-slate-300">
                  集中展示服務項目、流程、方案、FAQ 與聯絡入口。
                </p>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Panel title="需求整理" value="01" />
                <Panel title="版面設計" value="02" />
                <Panel title="RWD 調整" value="03" />
                <Panel title="部署上線" value="04" />
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">Current Status</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-cyan-300" />
                </div>
                <p className="mt-3 text-sm text-slate-300">
                  78% of content structure completed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Services"
          title="服務模組"
          desc="適合將服務內容整理成清楚的網站架構，讓訪客能快速理解你提供什麼、適合誰、如何聯絡。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
            >
              <p className="mb-5 inline-flex rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                {item.tag}
              </p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Industries"
          title="適合的產業與對象"
          desc="這種服務型網站可以依照產業調整內容與視覺，不只適合科技公司，也適合個人服務與小型團隊。"
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {industries.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center text-slate-200 backdrop-blur"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Website Audit
              </p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                網站健檢清單
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                這個區塊展示網站可以協助客戶檢查哪些問題。
                對服務型品牌來說，網站不只是漂亮，更重要的是讓訪客快速理解、信任並聯絡你。
              </p>
            </div>

            <div className="grid gap-3">
              {auditItems.map((item) => (
                <CheckItem key={item} text={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="Plans"
          title="服務方案示意"
          desc="這裡可以讓客戶理解不同製作範圍的差異，也能降低一直重複解釋報價內容的時間。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
            >
              <p className="text-sm font-medium text-cyan-300">{plan.name}</p>
              <h3 className="mt-3 text-2xl font-semibold">{plan.price}</h3>
              <p className="mt-4 leading-7 text-slate-300">{plan.desc}</p>

              <div className="mt-6 space-y-3">
                {plan.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-300">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-cyan-300 p-8 text-slate-950 md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">
                Deliverables
              </p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                交付內容
              </h2>
              <p className="mt-6 leading-8 text-slate-700">
                服務型網站可以清楚列出交付項目，讓客戶知道合作後會拿到什麼，
                也能讓接案範圍更明確。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/60 p-5 font-medium"
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
          eyebrow="Process"
          title="製作流程"
          desc="把合作流程整理清楚，可以讓客戶知道每一步會發生什麼，也能減少溝通落差。"
        />

        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <p className="text-sm text-cyan-300">0{index + 1}</p>
              <p className="mt-4 text-lg font-semibold">{step.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="brief" className="relative mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Brief
              </p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
                需求確認表
              </h2>
              <p className="mt-6 leading-8 text-slate-300">
                在正式報價前，先確認網站用途、內容、功能與時程。
                這可以避免需求模糊，也能讓製作範圍更清楚。
              </p>
            </div>

            <div className="grid gap-3">
              {briefQuestions.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-sm text-cyan-300">Q{index + 1}</p>
                  <p className="mt-2 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-16">
        <SectionTitle
          eyebrow="FAQ"
          title="常見問題"
          desc="FAQ 可以減少重複溝通，也能讓客戶在聯絡前先理解合作範圍。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur"
            >
              <h3 className="text-xl font-semibold">{item.q}</h3>
              <p className="mt-4 leading-8 text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] bg-cyan-300 p-8 text-slate-950 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">
            想做一個更正式的服務入口？
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-slate-700">
            這類網站適合顧問服務、數位工作室、課程品牌、SaaS 工具、
            自由工作者與小型團隊，能協助把服務內容整理成清楚的網站。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              回到接案首頁
            </Link>
            <a
              href="mailto:a0988874324@gmail.com"
              className="rounded-full border border-slate-950/20 px-6 py-3 text-sm font-semibold hover:border-slate-950"
            >
              聯絡製作網站
            </a>
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
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">{title}</h2>
      </div>
      <p className="max-w-md leading-8 text-slate-300">{desc}</p>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-2xl font-semibold text-cyan-200">{value}</p>
      <p className="mt-2 text-xs text-slate-400">{label}</p>
    </div>
  )
}

function Panel({ title, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-2xl font-semibold text-cyan-200">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{title}</p>
    </div>
  )
}

function CheckItem({ text }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white/10 p-5 text-slate-200">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-xs font-bold text-slate-950">
        ✓
      </span>
      <span className="leading-7">{text}</span>
    </div>
  )
}

export default ServiceDemo