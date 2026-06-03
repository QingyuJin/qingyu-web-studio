import { Link } from "react-router-dom"

const projectInfo = {
  contractor: {
    name: "Contractor Site",
    title: "估價前台",
    desc: "讓客戶先填需求、照片、日期與工種，後台接著做報價。",
    next: ["首頁", "服務項目", "施工案例", "聯絡表單"],
  },
  buildflow: {
    name: "BuildFlow",
    title: "工程工作流",
    desc: "把案件、報價、發包、追加減項、廠商與任務回報放在同一個地方。",
    next: ["登入角色", "案件管理", "批價管理", "追加減項", "使用者任務"],
  },
  coachflow: {
    name: "CoachFlow",
    title: "教練課表流程",
    desc: "教練排課，學生回報，Robot 協助整理狀態。",
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
          Product Entry
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">{project.name}</h1>

        <h2 className="mt-4 text-2xl font-black">{project.title}</h2>

        <p className="mt-5 max-w-3xl leading-8 text-slate-600">{project.desc}</p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black">可以先看這些</h3>

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
