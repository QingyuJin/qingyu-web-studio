import { Link } from "react-router-dom"

const goals = [
  "讓教授、面試官或合作對象快速理解你是誰。",
  "整理技能、專案、經歷、履歷與聯絡方式。",
  "把雲端連結、GitHub、簡報和作品截圖集中在同一頁。",
  "讓手機打開也能快速瀏覽，不只是一份 PDF。",
]

const projects = [
  {
    title: "LINE Auto Reply Bot",
    role: "Backend / API",
    desc: "整合天氣查詢、待辦功能與 GPT 對話流程。",
    tags: ["Python", "API", "LINE Bot"],
  },
  {
    title: "Stock Prediction Notebook",
    role: "ML Practice",
    desc: "使用 Colab 完成回歸與方向分類模型練習。",
    tags: ["Colab", "ML", "Report"],
  },
  {
    title: "Web Studio Portfolio",
    role: "Frontend",
    desc: "React / Vite 製作作品集、Demo 頁面與需求整理器。",
    tags: ["React", "RWD", "Vercel"],
  },
]

const structure = [
  {
    title: "個人定位",
    desc: "第一屏直接說明你目前身份、方向、擅長內容與正在尋找的機會。",
  },
  {
    title: "技能整理",
    desc: "用分類整理語言、框架、工具與實作經驗，不只列一堆名詞。",
  },
  {
    title: "專案案例",
    desc: "每個專案要寫清楚問題、做法、技術、成果與連結。",
  },
  {
    title: "聯絡入口",
    desc: "Email、GitHub、LinkedIn、履歷下載要放在容易找到的位置。",
  },
]

const beforeAfter = [
  {
    before: "作品散在 GitHub、雲端、簡報、課堂報告和聊天紀錄。",
    after: "作品集頁面集中整理專案、技能、履歷與聯絡方式。",
  },
  {
    before: "只有專案名稱，看不出你實際負責什麼。",
    after: "每個專案寫清楚角色、技術、流程與成果。",
  },
  {
    before: "面試官需要自己找 GitHub、履歷、作品連結。",
    after: "首頁 CTA 直接提供履歷、GitHub、Email 與專案入口。",
  },
]

const skills = [
  "C / C++",
  "Java",
  "Python",
  "React",
  "Vite",
  "Tailwind CSS",
  "Git / GitHub",
  "Linux",
  "Colab",
  "Vercel",
  "API 串接",
  "RWD",
]

const faqs = [
  {
    q: "這個作品集適合誰？",
    a: "適合學生、求職者、創作者、設計師、接案者或需要整理個人作品的人。",
  },
  {
    q: "作品集一定要很炫嗎？",
    a: "不一定。求職作品集最重要的是讓對方快速理解你的能力、專案脈絡與聯絡方式。",
  },
  {
    q: "可以放課堂作業嗎？",
    a: "可以，但建議補上你負責的內容、使用技術、遇到的問題與學到什麼，讓它更像案例。",
  },
]

function PortfolioDemo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f3f1ec] text-[#171717]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f3f1ec]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-black transition hover:bg-white"
          >
            ← 回首頁
          </Link>

          <Link
            to="/brief"
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
          >
            整理需求
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1fr_0.95fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-black/55">
            Concept Case Study / 個人作品集網站
          </p>

          <h1 className="mt-6 max-w-4xl text-[3rem] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">
            Student Portfolio Case
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-black/62">
            這是一個個人作品集概念案例，展示學生或求職者如何把專案、技能、履歷與聯絡方式整理成清楚的網站。
            重點不是炫技，而是讓對方快速看懂你的能力。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              看專案展示
            </a>
            <a
              href="#case"
              className="rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
            >
              看案例分析
            </a>
          </div>
        </div>

        <div className="rounded-[2.6rem] border border-black/10 bg-white p-4 shadow-2xl shadow-black/10">
          <div className="rounded-[2rem] bg-[#171717] p-7 text-white">
            <div className="flex min-h-[540px] flex-col justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                  Portfolio / Resume
                </p>
                <div className="mt-6 h-20 w-20 rounded-3xl bg-white" />
              </div>

              <div>
                <h2 className="text-5xl font-semibold leading-tight tracking-[-0.05em]">
                  Show the work, not just the title.
                </h2>
                <p className="mt-5 max-w-sm leading-7 text-white/60">
                  個人介紹、技能、專案、履歷與聯絡入口集中整理。
                </p>

                <div className="mt-6 grid gap-3">
                  {["Projects", "Skills", "Resume", "Contact"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white/10 p-4">
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
        title="作品集不是把作品堆上去，而是幫對方快速判斷你能不能做事。"
        desc="學生與求職者常有很多資料，但缺少一個清楚、可分享、手機也好讀的入口。"
      />

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {goals.map((item, index) => (
            <Card key={item}>
              <p className="text-sm font-semibold text-black/40">0{index + 1}</p>
              <p className="mt-5 leading-8 text-black/65">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.8rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                Structure
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                作品集的順序，要照對方理解你的方式安排。
              </h2>
              <p className="mt-6 leading-8 text-white/60">
                不是先塞滿技能，而是先讓對方知道你是誰、做過什麼、能力在哪、怎麼聯絡你。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {structure.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"
                >
                  <p className="text-sm text-white/40">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/58">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-5 py-16">
        <SectionHeader
          eyebrow="Projects"
          title="專案卡片要寫出你做了什麼。"
          desc="只放作品名稱不夠，最好補上角色、技術與成果。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((item) => (
            <div key={item.title} className="rounded-[2rem] bg-white p-6 shadow-xl shadow-black/5">
              <p className="text-sm font-semibold text-black/40">{item.role}</p>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-black/60">{item.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-black px-3 py-1 text-xs text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Skills />
      <BeforeAfter />
      <Faq />

      <section className="mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="rounded-[2.8rem] bg-black p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/45">
                Next
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                需要作品集，也可以先整理資料。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/60">
                先整理你有的作品、履歷、技能、GitHub 與想呈現的方向，再規劃網站結構。
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                to="/brief"
                className="rounded-3xl bg-white p-5 text-black transition hover:bg-stone-200"
              >
                <p className="text-sm text-black/50">Website Brief</p>
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

function Skills() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] bg-white p-8 shadow-2xl shadow-black/5 md:p-12">
        <SectionHeader
          eyebrow="Skills"
          title="技能不要只是列名詞，要讓人看出方向。"
          desc="技能可以依照語言、前端、工具、部署、實作經驗分類。"
        />

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-sm font-semibold text-black/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfter() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeader
        eyebrow="Before / After"
        title="把分散作品整理成可閱讀的故事。"
        desc="作品集的價值是降低對方理解你的成本。"
      />

      <div className="grid gap-5">
        {beforeAfter.map((item, index) => (
          <div
            key={item.before}
            className="grid gap-4 rounded-[2rem] bg-white p-5 shadow-xl shadow-black/5 md:grid-cols-2"
          >
            <div className="rounded-[1.5rem] bg-[#f3f1ec] p-5">
              <p className="text-sm font-semibold text-black/40">
                Before 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-black/65">{item.before}</p>
            </div>
            <div className="rounded-[1.5rem] bg-black p-5 text-white">
              <p className="text-sm font-semibold text-white/45">
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

function Faq() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] bg-white p-8 shadow-2xl shadow-black/5 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              作品集常見問題
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[1.8rem] bg-[#f3f1ec] p-6">
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
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl leading-8 text-black/60">{desc}</p>}
    </div>
  )
}

function Card({ children }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-xl shadow-black/5">
      {children}
    </div>
  )
}

export default PortfolioDemo