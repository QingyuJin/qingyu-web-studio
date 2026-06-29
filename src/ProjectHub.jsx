import { useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const services = [
  {
    id: "waterproof",
    title: "防水抓漏",
    short: "屋頂、外牆、浴室。",
    detail: "服務項目、材料與範圍一次看懂。",
    image: "/project-photos/335950_0.jpg",
  },
  {
    id: "floor",
    title: "地坪工程",
    short: "Epoxy、PU、工業空間。",
    detail: "照片、坪數、用途，快速形成報價方向。",
    image: "/project-photos/335953_0.jpg",
  },
  {
    id: "tile",
    title: "泥作磁磚",
    short: "修補、鋪貼、翻新。",
    detail: "工種、數量、材料與工期清楚列出。",
    image: "/project-photos/335940_0.jpg",
  },
  {
    id: "paint",
    title: "油漆修繕",
    short: "室內、外牆、補漆。",
    detail: "用前後差異建立信任。",
    image: "/project-photos/335945_0.jpg",
  },
  {
    id: "wood",
    title: "木作裝修",
    short: "木地板、櫃體、細部。",
    detail: "風格、尺寸、材質先整理。",
    image: "/project-photos/335949_0.jpg",
  },
  {
    id: "manage",
    title: "工程管理",
    short: "案件、報價、驗收。",
    detail: `可接 BuildFlow 與 LINE ${lineBotId}。`,
    image: "/project-photos/335941_0.jpg",
  },
]

const cases = [
  ["屋頂防水", "防水抓漏 / 工程案例", "/project-photos/335950_0.jpg"],
  ["Epoxy 地坪", "地坪工程 / 商空案例", "/project-photos/335953_0.jpg"],
  ["室內木地板", "木作裝修 / 住宅案例", "/project-photos/335949_0.jpg"],
  ["外牆整理", "油漆修繕 / 立面案例", "/project-photos/335945_0.jpg"],
]

const process = [
  ["01", "收到需求", "照片、地點、預算。"],
  ["02", "建立案件", "案件、報價、任務。"],
  ["03", "追蹤交付", "狀態、付款、驗收。"],
]

const systemPoints = [
  "BuildFlow：管理案件、報價與任務。",
  "LINE Bot：查狀態、送回報。",
  "網站表單：需求進後台。",
]

function ProjectHub() {
  const [activeService, setActiveService] = useState(services[0])

  return (
    <main className="min-h-screen bg-[#f7f6f0] text-[#172026]">
      <header className="sticky top-0 z-40 border-b border-[#ddd8ca] bg-[#f7f6f0]/94 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Qingyu Web Studio">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#172026] text-sm font-black text-white">
              Q
            </span>
            <div>
              <p className="font-black tracking-tight">Engineering Demo</p>
              <p className="text-xs font-bold text-[#66716d]">Landing page + workflow app</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-black text-[#40514f] md:flex">
            <a href="#services" className="hover:text-[#0f5b52]">
              Services
            </a>
            <a href="#cases" className="hover:text-[#0f5b52]">
              Cases
            </a>
            <a href="#system" className="hover:text-[#0f5b52]">
              System
            </a>
          </nav>

          <Link
            to="/contractor-site#inquiry"
            className="rounded-md bg-[#172026] px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-[#27404a]"
          >
            詢價表單
          </Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#10242a]">
        <img
          src="/project-photos/335953_0.jpg"
          alt="工程管理案例展示"
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10242a] via-[#10242a]/88 to-[#10242a]/34" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f7f6f0] to-transparent" />

        <div className="relative mx-auto grid min-h-[68vh] max-w-6xl items-end gap-10 px-4 pb-16 pt-20 lg:grid-cols-[1fr_0.72fr]">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8bd8cc]">
              Contractor Business System
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              工程網站，也能接到後台流程。
            </h1>
            <p className="mt-5 max-w-xl text-base font-bold leading-8 text-[#d8e1de] sm:text-lg">
              詢價、案例、BuildFlow 後台串在一起。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contractor-site#inquiry"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] shadow-lg shadow-black/20 hover:bg-[#ffd785]"
              >
                看詢價流程
              </Link>
              <Link
                to="/buildflow"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 text-sm font-black text-white backdrop-blur hover:bg-white/20"
              >
                打開 BuildFlow
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/[0.08] p-4 text-white backdrop-blur-md">
            <p className="text-sm font-black text-[#8bd8cc]">流程設計</p>
            <div className="mt-4 grid gap-2">
              {process.map(([no, title, text]) => (
                <div key={no} className="grid grid-cols-[3rem_1fr] gap-3 rounded-md bg-black/20 p-3">
                  <span className="font-mono text-xs font-black text-[#f0c36a]">{no}</span>
                  <div>
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm font-bold text-[#d8e1de]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Service Map</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">服務模組</h2>
          </div>
          <p className="max-w-md text-sm font-bold leading-7 text-[#5b6966]">
            讓需求更好分類、報價、追蹤。
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const isActive = activeService.id === service.id
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(service)}
                  className={`rounded-md border p-4 text-left ${
                    isActive
                      ? "border-[#172026] bg-[#172026] text-white shadow-lg shadow-[#172026]/18"
                      : "border-[#d9d1c4] bg-white text-[#172026] hover:border-[#0f766e]/50"
                  }`}
                >
                  <p className="text-lg font-black">{service.title}</p>
                  <p className={`mt-2 text-sm font-bold ${isActive ? "text-[#d7ebe5]" : "text-[#66716d]"}`}>
                    {service.short}
                  </p>
                </button>
              )
            })}
          </div>

          <article className="grid min-h-72 overflow-hidden rounded-lg border border-[#d9d1c4] bg-white md:grid-cols-[0.8fr_1fr]">
            <img src={activeService.image} alt={activeService.title} className="h-full min-h-64 w-full object-cover" />
            <div className="flex flex-col justify-between p-6">
              <div>
                <p className="text-sm font-black text-[#0f766e]">Selected service</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">{activeService.title}</h3>
                <p className="mt-4 text-base font-bold leading-8 text-[#4f5e5b]">{activeService.detail}</p>
              </div>
              <Link
                to="/contractor-site#inquiry"
                className="mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
              >
                前往需求表
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="cases" className="border-y border-[#dedbd1] bg-[#ebe8df]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">Cases</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">案例照片</h2>
            </div>
            <Link
              to="/contractor-site"
              className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-[#9f9586] px-5 text-sm font-black text-[#172026] hover:bg-white"
            >
              查看完整落地頁
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {cases.map(([title, meta, image], index) => (
              <article
                key={title}
                className={`overflow-hidden rounded-lg border border-[#d6cdbf] bg-white ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img src={image} alt={title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs font-black text-[#0f766e]">{meta}</p>
                  <h3 className="mt-2 text-xl font-black">{title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">BuildFlow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">接案後台</h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#5b6966]">
            網站不只展示，也能收需求、管案件。
          </p>
        </div>

        <div className="rounded-lg border border-[#d9d1c4] bg-white p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {systemPoints.map((step, index) => (
              <div key={step} className="rounded-md bg-[#f3f0e8] p-4">
                <p className="font-mono text-xs font-black text-[#0f766e]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm font-black leading-7 text-[#172026]">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/buildflow"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
            >
              進入 BuildFlow
            </Link>
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#c8c0b3] px-5 text-sm font-black text-[#172026] hover:bg-[#f7f6f0]"
            >
              管理入口
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectHub
