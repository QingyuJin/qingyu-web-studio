import { useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const services = [
  {
    id: "waterproof",
    title: "防水抓漏",
    short: "屋頂、外牆、浴室",
    detail: "先看漏點，再談工法。照片、位置、日期都會留在案件裡。",
  },
  {
    id: "floor",
    title: "地坪工程",
    short: "Epoxy、PU、整平",
    detail: "記錄坪數、材料、工期和單價，報價不靠記憶。",
  },
  {
    id: "tile",
    title: "泥作磁磚",
    short: "修補、鋪貼、收邊",
    detail: "工項拆清楚，師傅知道要做哪一段。",
  },
  {
    id: "paint",
    title: "油漆修繕",
    short: "牆面、天花、補土",
    detail: "現場照片和備註一起存，回頭查得到。",
  },
  {
    id: "wood",
    title: "木作收邊",
    short: "地板、櫃體、隔間",
    detail: "尺寸、材料、追加項目分開記，少掉口頭落差。",
  },
  {
    id: "manage",
    title: "工程管理",
    short: "報價、發包、回報",
    detail: `老闆用後台看進度，師傅用 LINE ${lineBotId} 回報。`,
  },
]

const cases = [
  {
    title: "屋頂防水",
    meta: "頂樓 / 防水層",
    image: "/project-photos/335950_0.jpg",
  },
  {
    title: "地坪整理",
    meta: "室內 / Epoxy",
    image: "/project-photos/335953_0.jpg",
  },
  {
    title: "木地板收整",
    meta: "住宅 / 木作",
    image: "/project-photos/335949_0.jpg",
  },
  {
    title: "外牆修繕",
    meta: "透天 / 外牆",
    image: "/project-photos/335945_0.jpg",
  },
]

const process = [
  ["01", "傳現場", "照片、位置、想做的時間。"],
  ["02", "出報價", "工項、材料、單價拆清楚。"],
  ["03", "排施工", "日期、師傅、進度一起追。"],
]

const testSteps = [
  "前台填需求表。",
  "BuildFlow 登入 admin / admin123。",
  `LINE 加 ${lineBotId}，輸入「業主 q-001」。`,
]

function ProjectHub() {
  const [activeService, setActiveService] = useState(services[0])

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#12212a]">
      <header className="sticky top-0 z-40 border-b border-[#ded8cc] bg-[#f6f3ec]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/engineering" className="flex items-center gap-3" aria-label="鑫匠工程">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-[#12212a] text-sm font-black text-white">
              鑫
            </span>
            <div>
              <p className="font-black tracking-tight">鑫匠工程</p>
              <p className="text-xs font-bold text-[#61706d]">接案網站 + 工程後台</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-black text-[#40514f] md:flex">
            <a href="#services" className="hover:text-[#123f4a]">
              服務
            </a>
            <a href="#cases" className="hover:text-[#123f4a]">
              案例
            </a>
            <a href="#system" className="hover:text-[#123f4a]">
              系統
            </a>
          </nav>

          <Link
            to="/contractor-site#inquiry"
            className="rounded-md bg-[#123f4a] px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-[#0d3039] active:translate-y-px"
          >
            我要估價
          </Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#101d25]">
        <img
          src="/project-photos/335953_0.jpg"
          alt="工程地坪施工現場"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b24] via-[#0d1b24]/90 to-[#0d1b24]/30" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f6f3ec] to-transparent" />

        <div className="relative mx-auto grid min-h-[68vh] max-w-6xl items-end gap-10 px-4 pb-16 pt-20 lg:grid-cols-[1fr_0.72fr]">
          <div className="max-w-2xl text-white">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#9bc7bd]">
              防水 / 地坪 / 修繕
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              工程先講清楚。
            </h1>
            <p className="mt-5 max-w-xl text-base font-bold leading-8 text-[#d8e1de] sm:text-lg">
              現場、工項、日期、報價，先整理好再施工。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contractor-site#inquiry"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#d7ebe5] px-5 text-sm font-black text-[#102721] shadow-lg shadow-black/20 transition hover:bg-white active:translate-y-px"
              >
                填需求
              </Link>
              <Link
                to="/buildflow"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 text-sm font-black text-white backdrop-blur transition hover:bg-white/20 active:translate-y-px"
              >
                看後台
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/[0.08] p-4 text-white backdrop-blur-md">
            <p className="text-sm font-black text-[#b8dcd3]">今天要做什麼</p>
            <div className="mt-4 grid gap-2">
              {process.map(([no, title, text]) => (
                <div key={no} className="grid grid-cols-[3rem_1fr] gap-3 rounded-md bg-black/20 p-3">
                  <span className="font-mono text-xs font-black text-[#9bc7bd]">{no}</span>
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">Service</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">服務項目</h2>
          </div>
          <p className="max-w-md text-sm font-bold leading-7 text-[#5b6966]">
            外面只放項目。點一下，再看說明。
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
                  className={`rounded-md border p-4 text-left transition active:translate-y-px ${
                    isActive
                      ? "border-[#123f4a] bg-[#123f4a] text-white shadow-lg shadow-[#123f4a]/20"
                      : "border-[#d9d1c4] bg-white text-[#12212a] hover:border-[#123f4a]/50"
                  }`}
                >
                  <p className="text-lg font-black">{service.title}</p>
                  <p className={`mt-2 text-sm font-bold ${isActive ? "text-[#d7ebe5]" : "text-[#6a7672]"}`}>
                    {service.short}
                  </p>
                </button>
              )
            })}
          </div>

          <article className="grid min-h-72 overflow-hidden rounded-md border border-[#d9d1c4] bg-white md:grid-cols-[0.8fr_1fr]">
            <img
              src="/project-photos/335950_0.jpg"
              alt="防水工程現場"
              className="h-full min-h-64 w-full object-cover"
            />
            <div className="flex flex-col justify-between p-6">
              <div>
                <p className="text-sm font-black text-[#1d6f65]">目前選擇</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight">{activeService.title}</h3>
                <p className="mt-4 text-base font-bold leading-8 text-[#4f5e5b]">
                  {activeService.detail}
                </p>
              </div>
              <Link
                to="/contractor-site#inquiry"
                className="mt-8 inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-[#12212a] px-5 text-sm font-black text-white transition hover:bg-[#243743] active:translate-y-px"
              >
                送出估價資料
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="cases" className="border-y border-[#ded8cc] bg-[#ece7dd]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">Works</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">工程案例</h2>
            </div>
            <Link
              to="/contractor-site"
              className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-[#9f9586] px-5 text-sm font-black text-[#12212a] transition hover:bg-white active:translate-y-px"
            >
              看前台案例
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {cases.map((item, index) => (
              <article
                key={item.title}
                className={`overflow-hidden rounded-md border border-[#d6cdbf] bg-white ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs font-black text-[#1d6f65]">{item.meta}</p>
                  <h3 className="mt-2 text-xl font-black">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="system" className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">BuildFlow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">前台收件，後台管案。</h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#5b6966]">
            客戶先填需求。老闆整理報價。師傅用 LINE 回報。資料不要散在群組裡。
          </p>
        </div>

        <div className="rounded-md border border-[#d9d1c4] bg-white p-5">
          <div className="grid gap-3 md:grid-cols-3">
            {testSteps.map((step, index) => (
              <div key={step} className="rounded-md bg-[#f3f0e8] p-4">
                <p className="font-mono text-xs font-black text-[#1d6f65]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-sm font-black leading-7 text-[#12212a]">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/buildflow"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#123f4a] px-5 text-sm font-black text-white transition hover:bg-[#0d3039] active:translate-y-px"
            >
              進入 BuildFlow
            </Link>
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#c8c0b3] px-5 text-sm font-black text-[#12212a] transition hover:bg-[#f6f3ec] active:translate-y-px"
            >
              管理登入
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProjectHub
