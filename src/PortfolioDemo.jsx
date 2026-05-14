import { Link } from "react-router-dom"

const projects = [
  {
    title: "品牌視覺設計",
    type: "Design",
    desc: "為個人品牌設計視覺風格、社群模板與形象頁面。",
  },
  {
    title: "攝影作品系列",
    type: "Photography",
    desc: "整理人像、生活風格與商業攝影作品，建立清楚的作品展示。",
  },
  {
    title: "活動宣傳素材",
    type: "Campaign",
    desc: "製作活動主視覺、海報、社群貼文與活動頁設計。",
  },
]

const skills = ["品牌設計", "攝影", "社群內容", "作品整理", "簡報設計", "網頁展示"]

function PortfolioDemo() {
  return (
    <main className="min-h-screen bg-[#f6f1ea] text-stone-950">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-block rounded-full border border-stone-300 px-5 py-2 text-sm font-medium hover:border-stone-950"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
        <div>
          <p className="mb-4 text-sm font-medium tracking-widest text-stone-500">
            PERSONAL PORTFOLIO
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            我是林予安，專注於設計、影像與品牌內容。
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            這是一個個人作品集網站 Demo，適合學生、設計師、攝影師、
            求職者或個人品牌，用來展示作品、經歷、技能與聯絡方式。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
            >
              查看作品
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-400 px-6 py-3 text-sm font-medium hover:border-stone-950"
            >
              聯絡合作
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="overflow-hidden rounded-[1.5rem] bg-stone-200">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              alt="個人作品集形象照"
              className="h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-medium tracking-widest text-stone-500">
            ABOUT
          </p>
          <h2 className="mt-2 text-4xl font-semibold">關於我</h2>
          <p className="mt-5 max-w-3xl leading-8 text-stone-600">
            我擅長將想法整理成清楚的視覺內容，包含品牌形象、攝影作品、
            社群素材與作品集呈現。這個網站可以作為求職、接案或個人品牌介紹頁，
            讓訪客快速理解我的能力與作品方向。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-widest text-stone-500">
            SKILLS
          </p>
          <h2 className="mt-2 text-4xl font-semibold">技能與服務</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-widest text-stone-500">
            PROJECTS
          </p>
          <h2 className="mt-2 text-4xl font-semibold">精選作品</h2>
          <p className="mt-4 max-w-2xl text-stone-600">
            使用卡片式作品展示，適合放設計、攝影、剪輯、簡報、程式專案或活動成果。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-3xl bg-white shadow-sm"
            >
              <div className="flex h-48 items-center justify-center bg-stone-200 text-stone-500">
                作品圖片
              </div>

              <div className="p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-400">
                  {project.type}
                </p>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-medium tracking-widest text-stone-500">
            EXPERIENCE
          </p>
          <h2 className="mt-2 text-4xl font-semibold">經歷</h2>

          <div className="mt-8 space-y-5">
            <Experience
              year="2025"
              title="個人品牌內容設計"
              desc="協助整理品牌介紹、社群貼文與作品展示。"
            />
            <Experience
              year="2024"
              title="攝影作品集整理"
              desc="建立人像與生活風格攝影作品分類。"
            />
            <Experience
              year="2023"
              title="校園活動視覺設計"
              desc="製作活動海報、簡報與宣傳素材。"
            />
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2rem] bg-stone-950 p-8 text-white md:p-12">
          <p className="text-sm font-medium tracking-widest text-stone-400">
            CONTACT
          </p>
          <h2 className="mt-2 text-4xl font-semibold">想合作或了解更多作品？</h2>
          <p className="mt-5 max-w-2xl leading-8 text-stone-300">
            這裡可以放 Email、Instagram、LinkedIn、Behance 或個人社群連結。
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Email</p>
              <p className="mt-1">hello@example.com</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Instagram</p>
              <p className="mt-1">@portfolio.demo</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">Location</p>
              <p className="mt-1">Taiwan</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Experience({ year, title, desc }) {
  return (
    <div className="grid gap-2 border-t border-stone-200 pt-5 md:grid-cols-[120px_1fr]">
      <p className="font-medium text-stone-400">{year}</p>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-stone-600">{desc}</p>
      </div>
    </div>
  )
}

export default PortfolioDemo