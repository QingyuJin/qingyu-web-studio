import { Link } from "react-router-dom"

const works = [
  {
    title: "工程數位化工具",
    tag: "Engineering",
    desc: "承包商網站、BuildFlow 管理系統與 LINE Bot 自動化工具。",
    path: "/engineering",
    image: "/project-photos/335950_0.jpg",
  },
]

const aiProjects = [
  {
    title: "SeedlingVision｜植物幼苗 AI 辨識系統",
    description:
      "使用 Python、PyTorch 概念與 Streamlit 建立的 AI 圖片分類 Demo。使用者可以上傳植物圖片，系統會顯示 Top-3 預測結果與信心分數。此作品展示影像分類、模型推論流程、資料擴增概念與 AI Demo 網頁化能力。",
    techStack: ["Python", "Streamlit", "PyTorch", "CNN", "Image Classification"],
    serviceAngle: "可延伸應用於商品分類、植物辨識、影像資料整理、瑕疵檢測原型與小型 AI Demo 開發。",
    actions: [
      { label: "View Demo", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Project Details", href: "#" },
    ],
  },
  {
    title: "ExamCraft AI｜課程摘要與考題生成工具",
    description:
      "將課程投影片、PDF 或文字資料轉換成重點整理、考題與參考答案，適合學生複習、老師備課、補習班講義整理與讀書會使用。",
    techStack: ["LLM Prompting", "Document AI", "PDF Processing", "Markdown Export"],
    serviceAngle: "可延伸為 PDF 摘要、講義整理、自動出題、詳解生成與讀書小抄製作服務。",
    actions: [
      { label: "Coming Soon", href: "#" },
      { label: "Project Details", href: "#" },
    ],
  },
  {
    title: "StockTrendLab｜時間序列資料分析 Dashboard",
    description:
      "上傳 CSV 後進行趨勢視覺化、移動平均分析、模型預測與指標比較。此作品展示時間序列資料處理、Dashboard 製作與模型結果視覺化能力。",
    techStack: ["Python", "pandas", "Streamlit", "LSTM", "Data Visualization"],
    serviceAngle: "可延伸應用於 CSV 資料分析、營運數據 Dashboard、趨勢分析與預測模型原型開發。",
    actions: [
      { label: "Coming Soon", href: "#" },
      { label: "Project Details", href: "#" },
    ],
  },
]

function StudioHome() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#141c20]">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
        <Link to="/" className="font-black tracking-tight" aria-label="Qingyu Web Studio">
          Qingyu Web Studio
        </Link>
        <nav className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.18em] text-[#66736f]">
          <a href="#works" className="hover:text-[#123f4a]">
            Works
          </a>
          <a href="#ai-projects" className="hover:text-[#123f4a]">
            AI Projects
          </a>
        </nav>
      </header>

      <section
        id="works"
        className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl content-center gap-10 px-4 py-12"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">Portfolio</p>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Qingyu Web Studio
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-8 text-[#5f6b68]">
            將網站、資料工具與 AI Prototype 做成清楚、可展示、可操作的作品。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <Link
              key={work.title}
              to={work.path}
              className="group overflow-hidden rounded-lg border border-[#d9d1c4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12212a]/10 active:translate-y-0"
            >
              <img src={work.image} alt={work.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1d6f65]">
                  {work.tag}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight">{work.title}</h2>
                <p className="mt-3 text-sm font-bold leading-7 text-[#5f6b68]">{work.desc}</p>
                <p className="mt-5 text-sm font-black text-[#123f4a] transition group-hover:translate-x-1">
                  View project
                </p>
              </div>
            </Link>
          ))}

          <div className="rounded-lg border border-dashed border-[#cfc7b8] p-5 text-[#66736f]">
            <p className="text-xs font-black uppercase tracking-[0.18em]">Next</p>
            <p className="mt-3 text-lg font-black text-[#2a3438]">
              More web, data, and AI tools are being added.
            </p>
          </div>
        </div>
      </section>

      <section id="ai-projects" className="border-y border-[#ded8cc] bg-[#ece7dd]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">
                Portfolio
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                AI Tools Portfolio
              </h2>
            </div>
            <p className="max-w-xl text-sm font-bold leading-7 text-[#5b6966]">
              我將 Machine Learning 與 AI
              技術做成可操作的小工具，包含圖片分類、文件摘要、自動出題與資料分析
              Dashboard。可協助把資料、文件或想法快速做成能展示的 AI Demo。
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {aiProjects.map((project) => (
              <article
                key={project.title}
                className="flex min-h-full flex-col rounded-lg border border-[#d6cdbf] bg-white p-5 shadow-sm"
              >
                <h3 className="text-xl font-black leading-snug tracking-tight text-[#12212a]">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm font-bold leading-7 text-[#5f6b68]">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#cfc7b8] bg-[#f7f5ef] px-3 py-1 text-xs font-black text-[#40514f]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 rounded-md bg-[#f7f5ef] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1d6f65]">
                    Service Angle
                  </p>
                  <p className="mt-2 text-sm font-bold leading-7 text-[#4f5e5b]">
                    {project.serviceAngle}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {project.actions.map((action, index) => (
                    <a
                      key={action.label}
                      href={action.href}
                      className={`inline-flex min-h-10 items-center justify-center rounded-md px-4 text-sm font-black transition active:translate-y-px ${
                        index === 0
                          ? "bg-[#123f4a] text-white hover:bg-[#0d3039]"
                          : "border border-[#9f9586] text-[#12212a] hover:bg-[#f7f5ef]"
                      }`}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 rounded-lg border border-[#d6cdbf] bg-[#f7f5ef] p-5 text-sm font-bold leading-7 text-[#4f5e5b]">
            如果你有圖片、PDF、CSV 或 AI 工具想法，我可以協助你整理資料、建立
            Demo，並做成可展示的網頁作品。
          </p>
        </div>
      </section>
    </main>
  )
}

export default StudioHome
