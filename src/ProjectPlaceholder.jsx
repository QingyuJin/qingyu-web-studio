import { Link } from "react-router-dom"

const projectInfo = {
  contractor: {
    name: "Contractor Site",
    title: "工程行前台網站",
    desc: "這裡之後會做成工程行對外展示網站，包含服務項目、施工案例、流程、FAQ 與 LINE 聯絡入口。",
    next: ["首頁", "服務項目", "施工案例", "聯絡表單"],
  },
  buildflow: {
    name: "BuildFlow",
    title: "工程行後台發包系統",
    desc: "這裡之後會做成案件、發包、批價、追加減項、廠商資料與使用者任務管理系統。",
    next: ["登入角色", "案件管理", "批價管理", "追加減項", "使用者任務"],
  },
  coachflow: {
    name: "CoachFlow",
    title: "健身教練課表系統",
    desc: "這裡之後會做成教練建立學生課表，學生查看今日訓練與回報完成的 LINE Bot 系統。",
    next: ["教練後台", "學生頁面", "課表建立", "完成回報", "LINE Bot"],
  },
}

function ProjectPlaceholder({ type }) {
  const project = projectInfo[type]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-sm font-bold text-slate-600">
            ← 回首頁
          </Link>

          <Link
            to="/admin"
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
          >
            管理後台
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
          Project Entry
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">
          {project.name}
        </h1>

        <h2 className="mt-4 text-2xl font-black">{project.title}</h2>

        <p className="mt-5 max-w-3xl leading-8 text-slate-600">{project.desc}</p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black">接下來要做的模組</h3>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {project.next.map((item, index) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-500">0{index + 1}</p>
                <p className="mt-2 font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectPlaceholder