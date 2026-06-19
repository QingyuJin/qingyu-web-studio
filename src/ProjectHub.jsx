import { useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const services = [
  {
    id: "waterproof",
    title: "防水抓漏",
    short: "屋頂、外牆、浴室與裂縫修繕需求。",
    detail: "示範如何把工程服務拆成清楚的項目、材料、施工範圍與注意事項，讓客戶更容易提供有效資訊。",
    image: "/project-photos/335950_0.jpg",
  },
  {
    id: "floor",
    title: "地坪工程",
    short: "Epoxy、PU、表面整理與工業空間。",
    detail: "用照片與規格欄位呈現地坪服務，搭配坪數、用途、現況與預算，能快速形成報價草稿。",
    image: "/project-photos/335953_0.jpg",
  },
  {
    id: "tile",
    title: "泥作磁磚",
    short: "修補、鋪貼、拆除與局部翻新。",
    detail: "把工種、數量、材料與工期拆清楚，避免客戶只傳一句話就無法判斷現場狀況。",
    image: "/project-photos/335940_0.jpg",
  },
  {
    id: "paint",
    title: "油漆修繕",
    short: "室內牆面、外牆立面與局部補漆。",
    detail: "適合展示前後差異、表面狀況與色彩選項，讓作品頁更像銷售頁，而不是單純相簿。",
    image: "/project-photos/335945_0.jpg",
  },
  {
    id: "wood",
    title: "木作裝修",
    short: "木地板、櫃體、牆面與室內細部。",
    detail: "以風格、尺寸、材質、現場限制整理需求，幫助客戶在聯絡前就知道要準備什麼。",
    image: "/project-photos/335949_0.jpg",
  },
  {
    id: "manage",
    title: "工程管理",
    short: "案件、廠商、報價、付款與驗收追蹤。",
    detail: `可延伸到 BuildFlow 後台，並用 LINE ${lineBotId} 做案件查詢或通知概念驗證。`,
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
  ["01", "收到需求", "客戶提供照片、地點、尺寸、預算與期望工期。"],
  ["02", "建立案件", "後台產生案件、報價草稿、任務與廠商資料。"],
  ["03", "追蹤交付", "用狀態、變更單、付款與驗收記錄追蹤進度。"],
]

const systemPoints = [
  "BuildFlow 測試入口：管理工程案件、廠商、報價與任務。",
  "LINE Bot 概念：用案件編號查詢狀態或產生報價摘要。",
  "接案頁整合：從網站表單收集需求，再進入後台管理。",
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
              <p className="font-black tracking-tight">BuildFlow Case Demo</p>
              <p className="text-xs font-bold text-[#66716d]">Qingyu Web Studio 作品案例</p>
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
              這是 Qingyu Web Studio 的工程資料管理作品案例。
            </h1>
            <p className="mt-5 max-w-xl text-base font-bold leading-8 text-[#d8e1de] sm:text-lg">
              以工程行常見情境示範：把服務頁、詢價表單、案例展示與 BuildFlow 後台串成可追蹤流程。
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
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">把服務拆成可報價的模組</h2>
          </div>
          <p className="max-w-md text-sm font-bold leading-7 text-[#5b6966]">
            對工程類客戶來說，網站最重要的是降低溝通成本，讓需求能被快速分類。
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
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">案例照片可以變成轉換素材</h2>
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
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">後台工具讓接案流程可以被管理</h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#5b6966]">
            這裡展示網站不只是門面，也可以變成管理案件、報價、廠商與客戶溝通的入口。
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
