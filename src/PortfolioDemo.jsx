import { Link } from "react-router-dom"

const projects = [
  {
    title: "城市人像攝影企劃",
    type: "Photography",
    desc: "以自然光與城市街景為主軸，整理一系列適合放在作品集與社群曝光的人像攝影作品。",
    detail: "作品頁可放專案介紹、照片集、拍攝理念與合作方式。",
    accent: "bg-stone-900",
  },
  {
    title: "個人品牌視覺整理",
    type: "Branding",
    desc: "為自由工作者整理色彩、字體、社群版型與網站視覺，建立一致的個人形象。",
    detail: "適合設計師、攝影師、講師、顧問與個人品牌經營者。",
    accent: "bg-[#7b5c44]",
  },
  {
    title: "校園活動宣傳設計",
    type: "Campaign",
    desc: "將活動資訊、主視覺、社群素材與報名連結整理成清楚的活動作品展示。",
    detail: "適合社團、系學會、講座、營隊與比賽活動。",
    accent: "bg-[#485b70]",
  },
]

const skills = [
  "作品集整理",
  "個人品牌頁",
  "攝影作品展示",
  "履歷網站",
  "社群連結整合",
  "RWD 手機版",
  "專案案例排版",
  "聯絡表單規劃",
]

const experiences = [
  {
    year: "2026",
    title: "個人作品集網站規劃",
    desc: "整理個人介紹、技能、作品案例與聯絡方式，建立可用於求職或接案的線上作品集。",
  },
  {
    year: "2025",
    title: "品牌內容與社群素材整理",
    desc: "協助將社群內容、專案成果與服務項目整理成清楚的展示架構。",
  },
  {
    year: "2024",
    title: "校園活動視覺與簡報設計",
    desc: "製作活動宣傳素材、簡報頁面與成果紀錄，用於社團與課程展示。",
  },
]

const sections = [
  {
    title: "清楚介紹自己",
    desc: "讓訪客快速知道你是誰、擅長什麼、正在尋找什麼合作或機會。",
  },
  {
    title: "整理作品成果",
    desc: "將零散作品變成有標題、說明、分類與脈絡的完整展示。",
  },
  {
    title: "建立聯絡入口",
    desc: "整合 Email、Instagram、LinkedIn、Behance 或其他作品平台。",
  },
]

function PortfolioDemo() {
  return (
    <main className="min-h-screen bg-[#f4efe8] text-stone-950">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-full border border-stone-300 bg-white/60 px-5 py-2 text-sm font-medium text-stone-700 shadow-sm hover:border-stone-950"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
            Personal Portfolio
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            將作品、經歷與個人特色整理成一個正式網站。
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-stone-600">
            這是一個個人作品集網站案例，適合學生、求職者、攝影師、
            設計師與創作者。網站重點不是只放圖片，而是把個人介紹、
            技能、作品成果與聯絡方式整理成清楚、有說服力的展示。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              查看作品案例
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-400 bg-white/40 px-6 py-3 text-sm font-medium transition hover:border-stone-950"
            >
              聯絡合作
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 text-sm">
            <InfoMini number="3+" label="作品分類" />
            <InfoMini number="RWD" label="手機版支援" />
            <InfoMini number="1 Page" label="清楚展示" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-stone-300/70 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-amber-200/70 blur-3xl" />

          <div className="relative rounded-[2.2rem] border border-stone-200 bg-white/75 p-4 shadow-2xl shadow-stone-400/25 backdrop-blur">
            <div className="overflow-hidden rounded-[1.8rem] bg-stone-950">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85"
                alt="個人作品集形象照"
                className="h-[460px] w-full object-cover opacity-90"
              />

              <div className="p-6 text-white">
                <p className="text-sm text-stone-400">Portfolio Owner</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-semibold">Lin Yu-An</p>
                    <p className="mt-2 text-sm text-stone-300">
                      Visual Design · Photography · Branding
                    </p>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-950">
                    Available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {sections.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-stone-200 bg-white/75 p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              About
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              不只是放作品，而是讓人看懂你的能力。
            </h2>
            <p className="mt-6 leading-9 text-stone-600">
              很多學生或創作者雖然有作品，但常散落在雲端、社群貼文、
              PDF 或簡報裡。個人作品集網站可以把這些內容重新整理，
              讓訪客快速理解你的背景、專長、作品品質與聯絡方式。
            </p>
          </div>

          <div className="rounded-[2rem] bg-stone-950 p-7 text-white shadow-sm">
            <p className="text-sm font-medium text-stone-400">適合對象</p>
            <div className="mt-6 grid gap-3">
              <Audience text="正在準備實習或求職的大學生" />
              <Audience text="需要展示作品的設計師、攝影師、剪輯師" />
              <Audience text="想經營個人品牌的自由工作者" />
              <Audience text="想把作品從社群整理成正式頁面的人" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              Skills
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              可以放進網站的內容
            </h2>
          </div>
          <p className="max-w-md leading-8 text-stone-600">
            作品集網站的重點是整理內容，讓經歷、能力和成果能被快速理解。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-stone-200 bg-white/75 px-5 py-3 text-sm font-medium shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
              Selected Works
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              精選作品案例
            </h2>
          </div>
          <p className="max-w-md leading-8 text-stone-600">
            透過分類、專案說明與成果描述，讓作品不只是圖片，而是有脈絡的案例。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="p-4">
                <div className={`h-56 rounded-[1.5rem] ${project.accent} p-5 text-white`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                    {project.type}
                  </p>
                  <p className="mt-24 text-2xl font-semibold">{project.title}</p>
                </div>
              </div>

              <div className="p-6 pt-2">
                <p className="leading-7 text-stone-600">{project.desc}</p>
                <p className="mt-4 rounded-2xl bg-stone-100 p-4 text-sm leading-7 text-stone-600">
                  {project.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-stone-950 p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-400">
                Website Goal
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                這類網站解決什麼問題？
              </h2>
              <p className="mt-6 leading-8 text-stone-300">
                對求職或接案來說，作品集網站可以讓對方不用下載檔案、
                翻社群或打開很多連結，就能直接看到你的個人定位、作品案例、
                技能與聯絡方式。
              </p>
            </div>

            <div className="grid gap-4">
              <Goal text="整理個人介紹、學經歷與技能" />
              <Goal text="展示作品分類與專案說明" />
              <Goal text="放置履歷、社群與聯絡方式" />
              <Goal text="支援手機版瀏覽，適合放在履歷或 IG 連結" />
              <Goal text="可依照求職、接案或個人品牌方向調整內容" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
            Experience
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            經歷整理
          </h2>

          <div className="mt-10 space-y-5">
            {experiences.map((item) => (
              <Experience
                key={item.title}
                year={item.year}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] bg-[#7b5c44] p-8 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-100/80">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            想把作品整理成一個正式網站？
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-amber-50/90">
            這類網站適合放在履歷、IG 個人檔案、求職信、作品投稿或接案介紹中。
            可以依照你的作品類型與目標對象調整版面與內容。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5f432f] hover:bg-amber-50"
            >
              回到接案首頁
            </Link>
            <a
              href="mailto:a0988874324@gmail.com"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              聯絡製作網站
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoMini({ number, label }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 shadow-sm">
      <p className="font-semibold">{number}</p>
      <p className="mt-1 text-xs text-stone-500">{label}</p>
    </div>
  )
}

function Audience({ text }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 text-stone-200">
      {text}
    </div>
  )
}

function Goal({ text }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 text-stone-200">
      {text}
    </div>
  )
}

function Experience({ year, title, desc }) {
  return (
    <div className="grid gap-3 border-t border-stone-200 pt-5 md:grid-cols-[120px_1fr]">
      <p className="font-semibold text-stone-400">{year}</p>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 leading-7 text-stone-600">{desc}</p>
      </div>
    </div>
  )
}

export default PortfolioDemo