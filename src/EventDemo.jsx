import { Link } from "react-router-dom"

const problems = [
  "活動資訊散在貼文、圖片、群組公告與表單連結裡。",
  "參加者常問時間、地點、流程、報名截止與注意事項。",
  "主辦方需要一個能直接分享的活動入口。",
  "手機使用者需要快速看到重點，而不是讀一大張海報。",
]

const schedule = [
  {
    time: "13:00",
    title: "入場與簽到",
    desc: "確認報名、領取活動資訊。",
  },
  {
    time: "14:00",
    title: "主題分享",
    desc: "講者分享與實作示範。",
  },
  {
    time: "15:30",
    title: "小組討論",
    desc: "分組交流與問題整理。",
  },
  {
    time: "16:30",
    title: "QA 與收尾",
    desc: "總結重點、填寫回饋表。",
  },
]

const sections = [
  {
    title: "活動摘要",
    desc: "第一屏直接說清楚活動主題、時間、地點、對象與報名入口。",
  },
  {
    title: "流程時間表",
    desc: "用時間軸讓參加者快速理解活動節奏。",
  },
  {
    title: "報名 CTA",
    desc: "報名按鈕要明顯，且手機點擊區域要足夠大。",
  },
  {
    title: "注意事項",
    desc: "把費用、攜帶物品、名額、取消規則等資訊整理清楚。",
  },
]

const beforeAfter = [
  {
    before: "活動只用一張海報圖，手機上字很小、不好讀。",
    after: "網站把資訊拆成標題、時間、地點、流程、報名與 FAQ。",
  },
  {
    before: "報名表連結藏在貼文或群組訊息裡。",
    after: "首頁和底部都放明確報名 CTA，減少找不到連結的問題。",
  },
  {
    before: "參加者反覆問時間、地點、注意事項。",
    after: "FAQ 與注意事項集中整理，主辦方可以直接丟網站連結。",
  },
]

const faqs = [
  {
    q: "活動頁適合哪些情境？",
    a: "講座、社團活動、工作坊、營隊、比賽、課程招生、成果發表都適合。",
  },
  {
    q: "可以接 Google Form 嗎？",
    a: "可以。活動頁最常見的做法就是把報名 CTA 連到 Google Form、Tally 或其他表單工具。",
  },
  {
    q: "活動結束後網站還有用嗎？",
    a: "可以改成成果紀錄頁，放照片、講者資訊、回顧文字或下一場活動入口。",
  },
]

function EventDemo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#10091f] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10091f]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            ← 回首頁
          </Link>

          <Link
            to="/brief"
            className="rounded-full bg-fuchsia-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-fuchsia-200"
          >
            整理需求
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1fr_0.9fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <p className="inline-flex rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-2 text-xs font-semibold text-fuchsia-200">
            Concept Case Study / 活動宣傳頁
          </p>

          <h1 className="mt-6 max-w-4xl text-[3rem] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">
            Pulse Workshop
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/62">
            這是一個活動頁概念案例，展示如何把活動主題、時間、地點、流程、報名連結與 FAQ 整理成手機好讀的宣傳頁。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#schedule"
              className="rounded-full bg-fuchsia-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-fuchsia-200"
            >
              看時間表
            </a>
            <a
              href="#case"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              看案例分析
            </a>
          </div>
        </div>

        <div className="rounded-[2.6rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/30">
          <div className="flex min-h-[540px] flex-col justify-between rounded-[2rem] bg-gradient-to-br from-violet-400 via-fuchsia-500 to-rose-500 p-7 text-white">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">
                Event / Registration
              </p>
              <div className="mt-6 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                Event Landing Page
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-semibold leading-tight tracking-[-0.05em]">
                Make the event easy to join.
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-white/75">
                活動資訊、時間軸、注意事項與報名入口集中整理。
              </p>

              <div className="mt-6 rounded-3xl bg-white/18 p-5">
                {["13:00 入場", "14:00 主題分享", "15:30 小組討論"].map((item) => (
                  <div key={item} className="mb-3 flex items-center gap-3 last:mb-0">
                    <div className="h-3 w-3 rounded-full bg-white" />
                    <p className="text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro
        id="case"
        eyebrow="Case Background"
        title="活動頁不是把海報放上去，而是讓人快速完成報名判斷。"
        desc="活動資訊如果只靠圖片，手機上通常不好讀。網站可以把重點拆開，讓參加者更快理解。"
      />

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {problems.map((item, index) => (
            <Card key={item}>
              <p className="text-sm font-semibold text-fuchsia-300">0{index + 1}</p>
              <p className="mt-5 leading-8 text-white/65">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="schedule" className="mx-auto max-w-7xl px-5 py-16">
        <SectionHeader
          eyebrow="Schedule"
          title="用時間軸讓參加者快速理解活動節奏。"
          desc="活動頁最重要的是時間、地點、報名與注意事項，不要讓使用者從一張圖裡找字。"
        />

        <div className="grid gap-5 md:grid-cols-4">
          {schedule.map((item) => (
            <div key={item.time} className="rounded-[2rem] bg-white p-6 text-black">
              <p className="text-3xl font-semibold text-fuchsia-600">{item.time}</p>
              <h3 className="mt-5 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-black/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.8rem] bg-white p-8 text-black md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Structure
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                活動頁的重點，是降低報名阻力。
              </h2>
              <p className="mt-6 leading-8 text-black/60">
                參加者需要快速知道活動適不適合、什麼時候、在哪裡、怎麼報名。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6"
                >
                  <p className="text-sm font-semibold text-fuchsia-600">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeforeAfter />
      <Faq />

      <section className="mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="rounded-[2.8rem] bg-fuchsia-300 p-8 text-black md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Next
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                有活動要宣傳，也可以先整理需求。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-black/65">
                先整理活動主題、時間、地點、報名表、素材與時程，再規劃活動頁。
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
        title="把海報資訊拆成手機好讀的活動頁。"
        desc="活動頁不是取代海報，而是補足手機閱讀和報名流程。"
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
              <p className="mt-3 leading-8 text-white/65">{item.before}</p>
            </div>
            <div className="rounded-[1.5rem] bg-fuchsia-300 p-5 text-black">
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
              活動頁常見問題
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[1.8rem] bg-black/[0.03] p-6">
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
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl leading-8 text-white/62">{desc}</p>}
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

export default EventDemo