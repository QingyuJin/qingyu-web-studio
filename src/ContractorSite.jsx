import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const services = [
  {
    title: "防水工程",
    desc: "浴室、陽台、屋頂漏水處理。",
    items: ["檢查", "防水", "修補", "紀錄"],
  },
  {
    title: "泥作修繕",
    desc: "牆面、地坪、磁磚修繕。",
    items: ["牆面", "地坪", "磁磚", "泥作"],
  },
  {
    title: "水電配置",
    desc: "基礎水電配置與修繕。",
    items: ["管線", "插座", "燈具", "水管"],
  },
  {
    title: "油漆整理",
    desc: "牆面、店面與局部整理。",
    items: ["批土", "油漆", "修補", "清潔"],
  },
  {
    title: "木作裝修",
    desc: "展示牆、櫃體、天花板。",
    items: ["展示牆", "櫃體", "天花", "店面"],
  },
  {
    title: "統包修繕",
    desc: "小型住宅、店面整合施工。",
    items: ["評估", "安排", "報價", "追蹤"],
  },
]

const cases = [
  {
    id: "case-001",
    title: "屏東住宅浴室防水工程",
    type: "防水工程",
    area: "屏東市",
    status: "完工",
    desc: "浴室防水、追加紀錄、完工照片。",
    highlights: ["防水", "追加", "照片"],
  },
  {
    id: "case-002",
    title: "高雄店面展示牆整修",
    type: "木作裝修",
    area: "高雄市",
    status: "施工中",
    desc: "展示牆、燈槽、追加確認。",
    highlights: ["木作", "燈槽", "確認"],
  },
  {
    id: "case-003",
    title: "潮州透天浴室翻修",
    type: "水電配置",
    area: "潮州",
    status: "估價中",
    desc: "水電、磁磚、防水丈量。",
    highlights: ["水電", "磁磚", "報價"],
  },
  {
    id: "case-004",
    title: "鹽埔老屋外牆修補",
    type: "泥作修繕",
    area: "鹽埔",
    status: "完工",
    desc: "外牆裂縫與局部修補。",
    highlights: ["外牆", "裂縫", "對照"],
  },
]

const processSteps = [
  {
    title: "初步詢問",
    desc: "位置、需求、照片。",
  },
  {
    title: "現場評估",
    desc: "範圍、材料、追加。",
  },
  {
    title: "報價整理",
    desc: "工項、金額、時程。",
  },
  {
    title: "安排施工",
    desc: "師傅、日期、重點。",
  },
  {
    title: "完工驗收",
    desc: "照片、紀錄、注意事項。",
  },
]

const faqItems = [
  {
    question: "一定要現場估價嗎？",
    answer: "防水、泥作、水電建議現場看，判斷會更準。",
  },
  {
    question: "追加項目怎麼確認？",
    answer: "先列原因、金額、做法，確認後施工。",
  },
  {
    question: "可以看施工案例嗎？",
    answer: "可以。案例會整理工項、做法與照片。",
  },
  {
    question: "這個網站和 BuildFlow 有什麼關係？",
    answer: "網站收需求，BuildFlow 管案件。",
  },
]

const filters = ["全部", "防水工程", "泥作修繕", "水電配置", "油漆整理", "木作裝修"]

function ContractorSite() {
  const [activeFilter, setActiveFilter] = useState("全部")
  const [copied, setCopied] = useState(false)
  const [inquiry, setInquiry] = useState({
    name: "",
    contact: "",
    area: "",
    type: "",
    situation: "",
    schedule: "",
    note: "",
  })
  const [submittedSummary, setSubmittedSummary] = useState("")

  const filteredCases = useMemo(() => {
    if (activeFilter === "全部") return cases
    return cases.filter((item) => item.type === activeFilter)
  }, [activeFilter])

  const contactText = `工程需求摘要

姓名：${inquiry.name || "未填"}
電話 / LINE：${inquiry.contact || "未填"}
案場地區：${inquiry.area || "未填"}
工程類型：${inquiry.type || "未填"}
目前狀況：${inquiry.situation || "未填"}
希望施工時間：${inquiry.schedule || "未填"}
備註：${inquiry.note || "未填"}

後續可將這筆需求帶入 BuildFlow 建立案件。`

  function updateInquiry(field, value) {
    setInquiry((current) => ({ ...current, [field]: value }))
  }

  function createInquirySummary(event) {
    event.preventDefault()
    setSubmittedSummary(contactText)
  }

  async function copyContactText() {
    try {
      await navigator.clipboard.writeText(contactText)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = contactText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <main className="contractor-dark lab-page min-h-screen text-slate-950">
      <header className="lab-topbar sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="text-sm font-bold text-yellow-400">
              ← 回系統入口
            </Link>
            <p className="mt-2 text-xl font-black text-white">Contractor Site</p>
            <p className="text-sm text-slate-500">接案網站</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="#contact"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
            >
              詢問
            </a>
            <Link
              to="/buildflow"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700"
            >
              BuildFlow
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />
      <ServicesSection />
      <CasesSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filteredCases={filteredCases}
      />
      <ProcessSection />
      <WhyWebsiteSection />
      <BuildFlowRelationSection />
      <FaqSection />
      <ContactSection
        contactText={contactText}
        copied={copied}
        inquiry={inquiry}
        submittedSummary={submittedSummary}
        updateInquiry={updateInquiry}
        createInquirySummary={createInquirySummary}
        copyContactText={copyContactText}
      />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="text-center lg:text-left">
          <p className="lab-eyebrow">Contractor Website</p>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-normal sm:text-4xl md:text-6xl">
            工程接案網站
          </h1>

          <p className="mt-5 max-w-xl text-base font-bold leading-8 text-slate-600 md:text-lg">
            服務、案例、流程、表單。前台收需求，後台管案件。
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#services" className="lab-primary-button">
              服務
            </a>
            <a href="#cases" className="lab-secondary-button">
              案例
            </a>
          </div>
        </div>

        <div className="lab-glass-panel">
          <p className="lab-eyebrow">Website Purpose</p>

          <div className="mt-5 grid gap-3">
            {["服務清楚", "案例可信", "需求好填", "後台可接"].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-yellow-600 text-xs font-black text-black">
                  ✓
                </span>
                <p className="font-bold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle label="Services" title="服務項目" desc="讓客戶快速知道能不能找你。" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-xl font-black md:text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">{service.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CasesSection({ activeFilter, setActiveFilter, filteredCases }) {
  return (
    <section id="cases" className="mx-auto max-w-6xl px-4 py-12">
      <SectionTitle label="Cases" title="施工案例" desc="案場、工項、狀態清楚呈現。" />

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
              activeFilter === filter ? "bg-slate-950 text-white" : "bg-white text-slate-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredCases.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  {item.type}｜{item.area}
                </p>
                <h3 className="mt-2 text-xl font-black md:text-2xl">{item.title}</h3>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {item.status}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">{item.desc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {item.highlights.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle label="Process" title="施工流程" desc="從詢問到完工，步驟清楚。" />

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-black text-slate-500">STEP {index + 1}</p>
              <h3 className="mt-3 text-xl font-black">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyWebsiteSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            Why Website
          </p>
          <h2 className="mt-4 text-2xl font-black tracking-normal md:text-4xl">
            不只靠 LINE 相簿。
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            客戶先看服務、案例、流程，再送需求。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["服務", "清楚列出可做項目。"],
            ["案例", "建立基本信任。"],
            ["表單", "固定格式收需求。"],
            ["後台", "交給 BuildFlow 管理。"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BuildFlowRelationSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              Website + System
            </p>
            <h2 className="mt-4 text-2xl font-black tracking-normal md:text-4xl">
              前台接案，後台管理。
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
              Contractor Site 收需求。BuildFlow 管案件、發包、批價與任務。
            </p>

            <div className="mt-8">
              <Link
                to="/buildflow"
                className="inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-950"
              >
                進入 BuildFlow →
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 text-slate-950">
            <p className="text-sm font-black text-slate-500">資料流程</p>

            <div className="mt-5 grid gap-3">
              {["了解服務", "送出需求", "建立案件", "安排任務", "追蹤回報"].map((item, index) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="font-bold text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <SectionTitle label="FAQ" title="常見問題" desc="先回答，少來回。" />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqItems.map((item) => (
          <article
            key={item.question}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-xl font-black">{item.question}</h3>
            <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ContactSection({
  contactText,
  copied,
  inquiry,
  submittedSummary,
  updateInquiry,
  createInquirySummary,
  copyContactText,
}) {
  return (
    <section id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h2 className="mt-4 text-2xl font-black tracking-normal md:text-4xl">需求表單</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              先收地區、類型、狀況與時間。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={copyContactText}
                className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800 active:translate-y-px"
              >
                {copied ? "已複製詢問格式" : "複製詢問格式"}
              </button>

              <Link
                to="/admin"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:translate-y-px"
              >
                回管理入口
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <form
              onSubmit={createInquirySummary}
              className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">姓名</span>
                  <input
                    value={inquiry.name}
                    onChange={(event) => updateInquiry("name", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">電話 / LINE</span>
                  <input
                    value={inquiry.contact}
                    onChange={(event) => updateInquiry("contact", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">案場地區</span>
                  <input
                    value={inquiry.area}
                    onChange={(event) => updateInquiry("area", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">工程類型</span>
                  <input
                    value={inquiry.type}
                    onChange={(event) => updateInquiry("type", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-600">目前狀況</span>
                <textarea
                  value={inquiry.situation}
                  onChange={(event) => updateInquiry("situation", event.target.value)}
                  rows={3}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">希望施工時間</span>
                  <input
                    value={inquiry.schedule}
                    onChange={(event) => updateInquiry("schedule", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">備註</span>
                  <input
                    value={inquiry.note}
                    onChange={(event) => updateInquiry("note", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </label>
              </div>

              <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800 active:translate-y-px">
                送出並產生案件摘要
              </button>
            </form>

            {submittedSummary ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-700">
                  Inquiry Summary
                </p>
                <h3 className="mt-2 text-2xl font-black">前台收需求，後台建案件。</h3>
                <p className="mt-3 leading-7">
                  這份摘要可以複製給管理者，或進入 BuildFlow 建立正式案件。
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={copyContactText}
                    className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-600 active:translate-y-px"
                  >
                    {copied ? "已複製，可貼到 BuildFlow" : "複製到 BuildFlow"}
                  </button>
                  <Link
                    to="/buildflow"
                    className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-emerald-900 transition hover:bg-emerald-100 active:translate-y-px"
                  >
                    前往 BuildFlow 建案
                  </Link>
                </div>
              </div>
            ) : null}

            <pre className="whitespace-pre-wrap rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700">
              {contactText}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ label, title, desc }) {
  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <h2 className="mt-3 max-w-4xl text-2xl font-black tracking-normal md:text-4xl">{title}</h2>
      {desc && (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{desc}</p>
      )}
    </div>
  )
}

export default ContractorSite
