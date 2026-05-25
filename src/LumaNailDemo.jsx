import { Link } from "react-router-dom"

const problems = [
  "作品、價格、地址、預約流程散在 IG 貼文、限動或私訊裡。",
  "客人常重複詢問價格、卸甲、維持時間、預約方式。",
  "手機訪客想快速看到作品、價格與聯絡入口。",
  "店家需要一個能放在 IG、LINE、Google 商家的正式入口。",
]

const sections = [
  {
    title: "Hero 主視覺",
    desc: "第一眼說明這是預約制工作室，並放上作品與預約入口。",
  },
  {
    title: "服務與價格",
    desc: "把常被詢問的價格與服務整理成短卡片，而不是讓客人翻貼文。",
  },
  {
    title: "作品展示",
    desc: "用風格分類讓訪客快速理解店家的審美與適合款式。",
  },
  {
    title: "預約流程",
    desc: "把私訊、確認款式、報價、預約、到店流程寫清楚。",
  },
  {
    title: "FAQ",
    desc: "整理卸甲、遲到、付款、維持時間等常見問題。",
  },
  {
    title: "聯絡入口",
    desc: "把 LINE、Instagram、Google Map 放在手機容易點擊的位置。",
  },
]

const beforeAfter = [
  {
    before: "價格在限動精選，作品在貼文，地址在 Google Map，預約靠私訊問。",
    after: "網站集中整理價格、作品、地址、FAQ、預約流程與聯絡入口。",
  },
  {
    before: "客人每次都要問：多少錢？怎麼預約？在哪裡？可以看作品嗎？",
    after: "訪客先看網站，理解服務後再用 LINE / IG 詢問，降低重複溝通。",
  },
  {
    before: "社群頁面好看，但資訊順序不一定適合第一次來的客人。",
    after: "網站照客戶決策順序安排：風格 → 服務 → 價格 → 預約 → FAQ → 聯絡。",
  },
]

const mobileUx = [
  {
    title: "第一屏先說清楚用途",
    desc: "手機一進來先看到工作室定位、作品入口與預約入口，不讓使用者猜網站在做什麼。",
  },
  {
    title: "價格不用複雜表格",
    desc: "小型工作室價格先用短卡片呈現，讓手機閱讀更快。",
  },
  {
    title: "聯絡按鈕放在高頻位置",
    desc: "LINE、IG、Map 是最重要出口，不能只藏在頁尾。",
  },
  {
    title: "FAQ 放在後段",
    desc: "先讓客人看作品與服務，再用 FAQ 處理細節問題。",
  },
]

const serviceCards = [
  {
    title: "單色 / 透明感",
    price: "NT$999 起",
    desc: "適合乾淨、日常、簡約風格。",
  },
  {
    title: "設計款美甲",
    price: "NT$1,380 起",
    desc: "適合主題款、參考圖或客製小設計。",
  },
  {
    title: "延甲 / 修補",
    price: "依狀況報價",
    desc: "依指甲狀態、長度與修補數量評估。",
  },
]

const gallery = ["裸粉霧感", "法式線條", "奶茶色系", "銀色點綴", "短甲設計", "溫柔光澤"]

const faqs = [
  {
    q: "這是真實客戶網站嗎？",
    a: "不是。這是概念案例，用來展示預約制工作室網站可以怎麼整理內容、規劃區塊與設計手機版。",
  },
  {
    q: "如果換成真實店家，可以改哪些？",
    a: "可以替換品牌名稱、作品照、價格、服務項目、預約規則、LINE、IG、Google Map 與 FAQ。",
  },
  {
    q: "這個案例重點是什麼？",
    a: "重點不是假裝品牌完整，而是示範如何把店家常見的分散資訊整理成清楚、可上線、方便聯絡的一頁式網站。",
  },
]

function LumaNailDemo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f6efe9] text-[#2b211e]">
      <header className="sticky top-0 z-50 border-b border-[#2b211e]/10 bg-[#f6efe9]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="rounded-full border border-[#2b211e]/15 bg-white/50 px-4 py-2 text-sm font-semibold text-[#2b211e] transition hover:bg-white"
          >
            ← 回首頁
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="#case"
              className="hidden rounded-full border border-[#2b211e]/15 px-4 py-2 text-sm font-semibold text-[#2b211e]/70 transition hover:bg-white md:inline-flex"
            >
              案例說明
            </a>
            <Link
              to="/brief"
              className="rounded-full bg-[#2b211e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4b3a34]"
            >
              整理需求
            </Link>
          </div>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1fr_0.9fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <div className="mb-5 inline-flex max-w-full rounded-2xl border border-[#2b211e]/10 bg-white/60 px-4 py-2 text-xs font-semibold leading-5 text-[#8f6f63] sm:rounded-full">
            Concept Case Study / 預約制工作室網站
          </div>

          <h1 className="max-w-4xl text-[3rem] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">
            Luma Nail Studio
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-[#2b211e]/65">
            概念案例——如果一間預約制美甲工作室目前只有 IG、價格表、作品照和私訊預約，可以怎麼整理成手機好讀、可上線、客人一進來就知道怎麼預約的一頁式網站。
          </p>

          <div className="mt-8 rounded-[2rem] border border-[#2b211e]/10 bg-white/60 p-5">
            <p className="text-sm font-semibold text-[#8f6f63]">這個案例想展示的</p>
            <p className="mt-3 leading-8 text-[#2b211e]/68">
              不只是做一張漂亮頁面，而是把店家最常被問的東西整理成清楚的網站結構：服務與價格、作品展示、預約流程、FAQ、LINE / IG / Map 入口。
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demo"
              className="rounded-full bg-[#2b211e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4b3a34]"
            >
              看網站示範
            </a>
            <a
              href="#case"
              className="rounded-full border border-[#2b211e]/15 bg-white/60 px-6 py-3 text-sm font-semibold text-[#2b211e] transition hover:bg-white"
            >
              看案例分析
            </a>
          </div>
        </div>

        <div className="rounded-[2.6rem] border border-[#2b211e]/10 bg-[#2b211e] p-4 shadow-2xl shadow-[#2b211e]/20">
          <div className="flex min-h-[560px] flex-col justify-between rounded-[2rem] bg-gradient-to-br from-[#f4c7b8] via-[#b58a79] to-[#2f2723] p-7 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                Beauty / Local Studio
              </p>
              <div className="mt-6 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                Demo Website
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-semibold leading-tight tracking-[-0.05em]">
                Soft nails, clear booking.
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-white/70">
                服務價格、作品展示、預約流程與聯絡入口集中整理。
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["服務價格", "作品展示", "預約流程", "LINE / IG"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="case" className="mx-auto max-w-7xl px-5 py-16">
        <SectionIntro
          eyebrow="Case Background"
          title="預約制工作室的問題通常不是沒內容，而是內容太分散。"
          desc="社群上的資訊很豐富，但第一次來的客人常常找不到價格、不知道怎麼預約——網站可以把這些整理好。"
        />

        <div className="grid gap-4 md:grid-cols-4">
          {problems.map((item, index) => (
            <div
              key={item}
              className="rounded-[2rem] border border-[#2b211e]/10 bg-white/60 p-6"
            >
              <p className="text-sm font-semibold text-[#8f6f63]">0{index + 1}</p>
              <p className="mt-5 leading-8 text-[#2b211e]/68">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.8rem] bg-[#2b211e] p-8 text-white md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4c7b8]">
                Information Architecture
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                這個 Demo 的網站結構
              </h2>
              <p className="mt-6 leading-8 text-white/60">
                區塊不是隨便堆，而是照訪客可能會問的順序安排：
                你是誰、服務多少、作品好不好看、怎麼預約、還有常見問題。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"
                >
                  <p className="text-sm text-[#f4c7b8]">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/58">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <MobileUxSection />

      <section id="demo" className="mx-auto max-w-7xl px-5 py-16">
        <SectionIntro
          eyebrow="Demo Sections"
          title="模擬真實工作室會需要的內容。"
          desc="這裡用概念內容示範小型工作室網站的基本呈現方式。"
        />

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2.4rem] bg-white p-6 shadow-xl shadow-[#2b211e]/10">
            <p className="text-sm font-semibold text-[#8f6f63]">Services</p>
            <h3 className="mt-3 text-3xl font-semibold">服務與價格</h3>

            <div className="mt-6 grid gap-4">
              {serviceCards.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.6rem] border border-[#2b211e]/10 bg-[#f6efe9] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      <p className="mt-2 leading-7 text-[#2b211e]/60">{item.desc}</p>
                    </div>
                    <p className="shrink-0 font-semibold text-[#8f6f63]">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] bg-[#2b211e] p-6 text-white shadow-xl shadow-[#2b211e]/20">
            <p className="text-sm font-semibold text-[#f4c7b8]">Gallery</p>
            <h3 className="mt-3 text-3xl font-semibold">作品展示分類</h3>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.map((item, index) => (
                <div
                  key={item}
                  className={`flex h-36 flex-col justify-between rounded-[1.6rem] p-4 ${
                    index % 3 === 0
                      ? "bg-[#f4c7b8] text-[#2b211e]"
                      : index % 3 === 1
                        ? "bg-[#b58a79] text-white"
                        : "bg-white/10 text-white"
                  }`}
                >
                  <span className="text-xs opacity-70">Look 0{index + 1}</span>
                  <p className="text-xl font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="rounded-[2.8rem] bg-[#2b211e] p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4c7b8]">
                Next
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                如果你的需求像這種，可以先填需求表。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/60">
                先整理網站類型、功能、素材、預算與時程，我再判斷是否適合做成小型網站。
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                to="/brief"
                className="rounded-3xl bg-[#f4c7b8] p-5 text-[#2b211e] transition hover:bg-white"
              >
                <p className="text-sm text-[#2b211e]/50">Website Brief</p>
                <p className="mt-2 font-semibold">填需求整理器 →</p>
              </Link>

              <Link
                to="/"
                className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white transition hover:bg-white/10"
              >
                <p className="text-sm text-white/45">Back Home</p>
                <p className="mt-2 font-semibold">回作品集首頁 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function BeforeAfterSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionIntro
        eyebrow="Before / After"
        title="這個案例不是加裝飾，而是把資訊重新整理。"
        desc="Before / After 可以更清楚說明網站整理前後的差異，也比較像真實接案案例。"
      />

      <div className="grid gap-5">
        {beforeAfter.map((item, index) => (
          <div
            key={item.before}
            className="grid gap-4 rounded-[2rem] border border-[#2b211e]/10 bg-white/60 p-5 md:grid-cols-2"
          >
            <div className="rounded-[1.5rem] bg-[#f6efe9] p-5">
              <p className="text-sm font-semibold text-[#8f6f63]">
                Before 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-[#2b211e]/65">{item.before}</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#2b211e] p-5 text-white">
              <p className="text-sm font-semibold text-[#f4c7b8]">
                After 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-white/70">{item.after}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileUxSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] bg-white p-8 shadow-2xl shadow-[#2b211e]/10 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f6f63]">
              Mobile UX Decisions
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              手機版不是縮小桌機版。
            </h2>
            <p className="mt-6 leading-8 text-[#2b211e]/60">
              預約制工作室的流量常來自 IG 或 LINE，所以手機版閱讀順序與按鈕位置比桌機更重要。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mobileUx.map((item, index) => (
              <div
                key={item.title}
                className="rounded-[1.8rem] border border-[#2b211e]/10 bg-[#f6efe9] p-6"
              >
                <p className="text-sm font-semibold text-[#8f6f63]">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-8 text-[#2b211e]/65">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] bg-white p-8 shadow-2xl shadow-[#2b211e]/10 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f6f63]">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              先把疑問講清楚。
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-[1.8rem] border border-[#2b211e]/10 bg-[#f6efe9] p-6"
              >
                <h3 className="text-xl font-semibold">{item.q}</h3>
                <p className="mt-3 leading-8 text-[#2b211e]/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionIntro({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f6f63]">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl leading-8 text-[#2b211e]/60">{desc}</p>}
    </div>
  )
}

export default LumaNailDemo