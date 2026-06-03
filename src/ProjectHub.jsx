import { useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const heroPhoto = "/project-photos/335953_0.jpg"

const flowSteps = [
  {
    id: "capture",
    no: "01",
    title: "先看前台",
    line: "客戶把需求、照片、日期先填清楚。",
    path: "/contractor-site#inquiry",
    action: "打開估價前台",
    points: ["LINE / 口頭 / Pro360", "工種與坪數", "施工日期"],
  },
  {
    id: "quote",
    no: "02",
    title: "再看後台",
    line: "老闆把案件、工項、單價和 PDF 整理好。",
    path: "/buildflow",
    action: "進入 BuildFlow",
    points: ["案件", "報價", "發包"],
  },
  {
    id: "line",
    no: "03",
    title: "最後試 LINE",
    line: `師傅用 ${lineBotId} 查任務、回報完成。`,
    path: "/buildflow",
    action: "看 LINE 指令",
    points: ["今日任務", "回報", "完成"],
  },
]

const roleCards = [
  ["老闆", "今天還缺什麼，不用翻群組。"],
  ["師傅", "打開 LINE，就知道今天做什麼。"],
  ["業主", "報價和進度，看得懂才安心。"],
]

const proofCards = [
  ["估價前台", "先把需求收齊"],
  ["BuildFlow", "案件與報價集中"],
  ["PDF 摘要", "給業主確認"],
  ["LINE Bot", `${lineBotId} 可試用`],
]

const guideSteps = [
  "先點「打開估價前台」看客戶怎麼填。",
  "再進 BuildFlow，用 admin / admin123 登入。",
  "最後加 LINE Bot，輸入「業主 q-001」。",
]

function ProjectHub() {
  const [activeStep, setActiveStep] = useState(flowSteps[0])

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#18232b]">
      <header className="sticky top-0 z-40 border-b border-[#d9d3c6] bg-[#f3f0e8]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Qingyu System Lab">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#16232f] font-black text-[#d7f2e8] shadow-sm">
              Q
            </span>
            <div>
              <p className="font-black tracking-tight">Qingyu System Lab</p>
              <p className="text-xs font-bold text-[#68746f]">工程行工作流作品</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/contractor-site"
              className="hidden rounded-lg border border-[#cfc7b8] px-4 py-2 text-sm font-black text-[#25313a] hover:bg-white sm:inline-flex"
            >
              前台
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-[#1f6f63] px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-[#18594f]"
            >
              管理登入
            </Link>
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[70vh] overflow-hidden bg-[#111b24]">
        <img
          src={heroPhoto}
          alt="工程地坪施工現場"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111d] via-[#07111d]/82 to-[#07111d]/18" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f3f0e8] to-transparent" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-end px-4 pb-16 pt-20">
          <div className="max-w-3xl text-white">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#96d8c3]">
              BuildFlow 工程工作流
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              不用再翻 LINE 找資料。
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#dbe6e2] sm:text-lg">
              接案、報價、派工、回報，整理成工程行看得懂的一條路。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contractor-site#inquiry"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#d7f2e8] px-5 text-sm font-black text-[#10231f] shadow-lg shadow-black/20 hover:bg-white"
              >
                先看客戶怎麼填
              </Link>
              <Link
                to="/buildflow"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-black text-white backdrop-blur hover:bg-white/20"
              >
                進入工程後台
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-lg border border-[#d8d0c1] bg-[#fbfaf7] shadow-xl shadow-[#1a2a33]/10 md:grid-cols-3">
          {flowSteps.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group border-b border-[#e4ded3] p-5 transition hover:bg-[#eef6f1] md:border-b-0 md:border-r last:md:border-r-0"
            >
              <span className="font-mono text-xs font-black text-[#1f6f63]">{item.no}</span>
              <h2 className="mt-3 text-xl font-black tracking-tight text-[#18232b]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm font-bold leading-6 text-[#68746f]">{item.line}</p>
              <p className="mt-4 text-sm font-black text-[#1f6f63] group-hover:translate-x-1">
                {item.action} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.84fr_1.16fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1f6f63]">
            先知道要看哪裡
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            外面簡單，點進去再看細節。
          </h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#647067]">
            首頁只放方向。真正的資料表、報價、派工、LINE 回報，都在 BuildFlow 裡面。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {roleCards.map(([role, text]) => (
              <div key={role} className="rounded-lg border border-[#d8d0c1] bg-white p-4">
                <p className="text-sm font-black text-[#1f6f63]">{role}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#4d5b55]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">
            {flowSteps.map((item) => {
              const isActive = activeStep.id === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveStep(item)}
                  className={`rounded-lg border p-4 text-left transition active:translate-y-px ${
                    isActive
                      ? "border-[#1f6f63] bg-[#1f6f63] text-white shadow-lg shadow-[#1f6f63]/20"
                      : "border-[#d8d0c1] bg-white text-[#18232b] hover:border-[#1f6f63]/50"
                  }`}
                >
                  <span className="font-mono text-xs font-black opacity-70">{item.no}</span>
                  <span className="mt-3 block text-base font-black sm:text-xl">{item.title}</span>
                </button>
              )
            })}
          </div>

          <section className="rounded-lg border border-[#d8d0c1] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1f6f63]">
                  現在這一步
                </p>
                <h3 className="mt-2 text-3xl font-black tracking-tight">{activeStep.title}</h3>
                <p className="mt-2 text-sm font-bold leading-7 text-[#647067]">{activeStep.line}</p>
              </div>
              <Link
                to={activeStep.path}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#16232f] px-5 text-sm font-black text-white hover:bg-[#25313a]"
              >
                {activeStep.action}
              </Link>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-3">
              {activeStep.points.map((item) => (
                <p
                  key={item}
                  className="rounded-lg border border-[#e4ded3] bg-[#f7f4ee] px-4 py-3 text-sm font-black text-[#25313a]"
                >
                  {item}
                </p>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="bg-[#14222c] text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#96d8c3]">
              作品能看到什麼
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              不是放幾張圖，是把流程走完。
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {proofCards.map(([title, desc]) => (
                <article key={title} className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                  <h3 className="text-lg font-black">{title}</h3>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#cbd9d5]">{desc}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <img
              src="/project-photos/335950_0.jpg"
              alt="屋頂防水案例"
              className="aspect-[4/5] w-full rounded-lg object-cover"
            />
            <div className="grid gap-3">
              <img
                src="/project-photos/335949_0.jpg"
                alt="室內木地板案例"
                className="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-black text-[#96d8c3]">LINE Bot</p>
                <p className="mt-2 font-mono text-sm font-black">{lineBotId}</p>
                <p className="mt-3 text-sm font-bold leading-6 text-[#cbd9d5]">
                  查任務、回報、完成，手機就能操作。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1f6f63]">
            第一次來
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">照這樣看就好。</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#647067]">
            不需要先懂系統，照這三步就能看出作品的價值。
          </p>
        </div>
        <ol className="grid gap-3 md:grid-cols-3">
          {guideSteps.map((item, index) => (
            <li key={item} className="rounded-lg border border-[#d8d0c1] bg-white p-5">
              <span className="font-mono text-xs font-black text-[#1f6f63]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-sm font-black leading-7 text-[#25313a]">{item}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}

export default ProjectHub
