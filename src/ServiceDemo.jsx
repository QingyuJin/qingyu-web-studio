import { Link } from "react-router-dom"

const painPoints = [
  "服務內容很多，但客戶不知道哪個方案適合自己。",
  "價格、流程、交付內容散在聊天紀錄或貼文裡。",
  "第一次接觸的客戶需要快速理解你是不是可信。",
  "需要把詢問導向表單或私訊，減少來回溝通成本。",
]

const packages = [
  {
    title: "Starter",
    price: "NT$3,000 起",
    desc: "適合單一服務介紹頁、個人顧問、家教或簡單課程頁。",
    items: ["一頁式架構", "服務介紹", "聯絡 CTA"],
  },
  {
    title: "Standard",
    price: "NT$6,000 起",
    desc: "適合需要方案比較、流程說明與 FAQ 的小型服務業。",
    items: ["方案比較", "合作流程", "FAQ", "表單連結"],
    featured: true,
  },
  {
    title: "Custom",
    price: "依需求評估",
    desc: "適合內容較多、需要多頁結構或較多客製區塊的需求。",
    items: ["多頁規劃", "內容整理", "客製區塊"],
  },
]

const serviceBlocks = [
  {
    title: "服務定位",
    desc: "用一句話說清楚你提供什麼、適合誰、能解決什麼問題。",
  },
  {
    title: "方案比較",
    desc: "把不同價格和內容差異整理清楚，避免客戶只問『多少錢』。",
  },
  {
    title: "合作流程",
    desc: "讓第一次合作的人知道從諮詢、確認、製作到交付會怎麼進行。",
  },
  {
    title: "需求表 CTA",
    desc: "把有興趣的客戶導向需求表或聯絡入口，提升有效詢問。",
  },
]

const beforeAfter = [
  {
    before: "客戶只看到社群貼文，不確定你到底提供哪些服務。",
    after: "網站第一屏直接說明服務定位、適合對象與主要 CTA。",
  },
  {
    before: "每次都要重複解釋方案內容、價格和流程。",
    after: "用方案卡與流程區整理資訊，讓客戶先自行理解。",
  },
  {
    before: "私訊來了很多，但有效需求不清楚。",
    after: "用需求表先收集預算、時程、素材與功能，降低溝通成本。",
  },
]

const workflow = [
  "初步諮詢",
  "整理需求",
  "確認方案",
  "製作頁面",
  "測試修正",
  "部署交付",
]

const faqs = [
  {
    q: "這是真實客戶案例嗎？",
    a: "不是。這是概念案例，用來展示服務型網站可以怎麼整理方案、流程、FAQ 與 CTA。",
  },
  {
    q: "適合哪些人？",
    a: "顧問、家教、課程老師、健身教練、接案者、小型團隊、自由工作者都可以參考這種結構。",
  },
  {
    q: "重點是設計還是轉換？",
    a: "兩者都重要，但服務型網站最重要的是讓訪客快速理解服務內容、方案差異與下一步行動。",
  },
]

function ServiceDemo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            ← 回首頁
          </Link>

          <Link
            to="/brief"
            className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
          >
            整理需求
          </Link>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1fr_0.9fr] md:items-center md:pb-24 md:pt-24">
        <Background />

        <div className="relative">
          <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-200">
            Concept Case Study / 服務型網站
          </p>

          <h1 className="mt-6 max-w-4xl text-[3rem] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">
            ClearPath Studio
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/62">
            這是一個服務型網站概念案例，適合顧問、課程老師、自由工作者或小型團隊。
            重點不是做很多特效，而是把服務、方案、流程與需求入口整理得清楚可信。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#case"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              看案例分析
            </a>
            <a
              href="#packages"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              看方案區塊
            </a>
          </div>
        </div>

        <div className="relative rounded-[2.6rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="rounded-[2rem] bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-700 p-7">
            <div className="flex min-h-[540px] flex-col justify-between rounded-[1.6rem] bg-black/20 p-6 backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                  Service / Consultant
                </p>
                <div className="mt-6 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                  Service Website Demo
                </div>
              </div>

              <div>
                <h2 className="text-5xl font-semibold leading-tight tracking-[-0.05em]">
                  Turn services into clear choices.
                </h2>
                <p className="mt-5 max-w-sm leading-7 text-white/70">
                  服務介紹、方案比較、合作流程與需求表 CTA 集中整理。
                </p>

                <div className="mt-6 grid gap-3">
                  {["方案比較", "合作流程", "FAQ", "需求表"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/15 p-4">
                      <p className="text-sm font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro
        id="case"
        eyebrow="Case Background"
        title="服務型網站最怕講很多，但客戶還是不知道下一步。"
        desc="這個案例的核心是把服務內容從聊天、貼文、簡報中整理成網站可以理解的順序。"
      />

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {painPoints.map((item, index) => (
            <Card key={item}>
              <p className="text-sm font-semibold text-cyan-300">0{index + 1}</p>
              <p className="mt-5 leading-8 text-white/62">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.8rem] bg-white p-8 text-black md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Information Architecture
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                服務頁要先建立理解，再引導詢問。
              </h2>
              <p className="mt-6 leading-8 text-black/60">
                不是一開始就丟價格，而是先說清楚服務定位、適合對象、方案差異與合作流程。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {serviceBlocks.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6"
                >
                  <p className="text-sm font-semibold text-blue-600">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="mx-auto max-w-7xl px-5 py-16">
        <SectionHeader
          eyebrow="Packages"
          title="用方案卡讓客戶先理解差異。"
          desc="方案不是為了讓價格變複雜，而是減少每次都從頭解釋。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.title}
              className={`rounded-[2rem] border p-7 ${
                item.featured
                  ? "border-cyan-300 bg-cyan-300 text-black"
                  : "border-white/10 bg-white/[0.06] text-white"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  item.featured ? "text-black/55" : "text-cyan-300"
                }`}
              >
                {item.title}
              </p>
              <h3 className="mt-4 text-3xl font-semibold">{item.price}</h3>
              <p
                className={`mt-4 leading-7 ${
                  item.featured ? "text-black/65" : "text-white/58"
                }`}
              >
                {item.desc}
              </p>

              <div className="mt-6 grid gap-2">
                {item.items.map((line) => (
                  <div key={line} className="flex gap-3 text-sm">
                    <span
                      className={`mt-1.5 h-2 w-2 rounded-full ${
                        item.featured ? "bg-black" : "bg-cyan-300"
                      }`}
                    />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <BeforeAfter />
      <Workflow />
      <Faq />

      <section className="mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="rounded-[2.8rem] bg-cyan-300 p-8 text-black md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Next
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                服務內容很多，也可以先整理成網站需求。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-black/65">
                先整理服務、方案、素材、預算與時程，我再判斷適合一頁式網站還是多頁結構。
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                to="/brief"
                className="rounded-3xl bg-black p-5 text-white transition hover:bg-stone-800"
              >
                <p className="text-sm text-white/50">Website Brief</p>
                <p className="mt-2 font-semibold">填需求整理器 →</p>
              </Link>

              <Link
                to="/"
                className="rounded-3xl bg-white/60 p-5 text-black transition hover:bg-white"
              >
                <p className="text-sm text-black/50">Back Home</p>
                <p className="mt-2 font-semibold">回作品集首頁 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function BeforeAfter() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeader
        eyebrow="Before / After"
        title="把模糊服務變成可判斷的選項。"
        desc="服務型網站的價值，是讓客戶不用私訊十次才知道適不適合。"
      />

      <div className="grid gap-5">
        {beforeAfter.map((item, index) => (
          <div
            key={item.before}
            className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 md:grid-cols-2"
          >
            <div className="rounded-[1.5rem] bg-white/[0.06] p-5">
              <p className="text-sm font-semibold text-white/45">
                Before 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-white/60">{item.before}</p>
            </div>
            <div className="rounded-[1.5rem] bg-cyan-300 p-5 text-black">
              <p className="text-sm font-semibold text-black/45">
                After 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-black/70">{item.after}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Workflow() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] border border-white/10 bg-white/[0.06] p-8 md:p-12">
        <SectionHeader
          eyebrow="Workflow"
          title="流程清楚，客戶比較敢開始。"
          desc="很多人不是不想合作，而是不知道合作會怎麼進行。"
        />

        <div className="grid gap-4 md:grid-cols-6">
          {workflow.map((item, index) => (
            <div key={item} className="rounded-[1.6rem] bg-white/[0.06] p-5">
              <p className="text-sm font-semibold text-cyan-300">0{index + 1}</p>
              <p className="mt-6 text-xl font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] bg-white p-8 text-black md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              先回答常見疑問。
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-[1.8rem] border border-black/10 bg-black/[0.03] p-6"
              >
                <h3 className="text-xl font-semibold">{item.q}</h3>
                <p className="mt-3 leading-8 text-black/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionIntro({ id, eyebrow, title, desc }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeader eyebrow={eyebrow} title={title} desc={desc} />
    </section>
  )
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl leading-8 text-white/58">{desc}</p>}
    </div>
  )
}

function Card({ children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
      {children}
    </div>
  )
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-[-180px] top-[-120px] h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-[120px]" />
      <div className="absolute bottom-[-180px] right-[-160px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[130px]" />
    </div>
  )
}

export default ServiceDemo