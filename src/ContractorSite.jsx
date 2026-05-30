import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const services = [
  {
    title: "防水工程",
    desc: "浴室、陽台、屋頂、外牆防水處理，適合老屋修繕與漏水改善。",
    items: ["漏水檢查", "防水層施作", "裂縫修補", "完工照片紀錄"],
  },
  {
    title: "泥作修繕",
    desc: "牆面、地坪、磁磚、局部修補與老屋基礎整理。",
    items: ["牆面修補", "地坪整理", "磁磚修繕", "基礎泥作"],
  },
  {
    title: "水電配置",
    desc: "浴室、廚房、店面與住宅基礎水電配置與修繕。",
    items: ["管線配置", "插座調整", "燈具安排", "水管更新"],
  },
  {
    title: "油漆整理",
    desc: "室內牆面、店面空間、局部修補後的表面整理。",
    items: ["牆面批土", "乳膠漆", "局部修補", "完工清潔"],
  },
  {
    title: "木作裝修",
    desc: "展示牆、櫃體、天花板、店面裝修與局部木作。",
    items: ["展示牆", "櫃體規劃", "天花板", "店面木作"],
  },
  {
    title: "統包修繕",
    desc: "協助小型住宅、店面、老屋局部修繕，整合不同工種。",
    items: ["現場評估", "工種安排", "報價整理", "進度追蹤"],
  },
]

const cases = [
  {
    id: "case-001",
    title: "屏東住宅浴室防水工程",
    type: "防水工程",
    area: "屏東市",
    status: "完工",
    desc: "浴室拆除後重新施作防水層，並整理追加項目與完工紀錄。",
    highlights: ["浴室防水", "牆面補強", "完工照片"],
  },
  {
    id: "case-002",
    title: "高雄店面展示牆整修",
    type: "木作裝修",
    area: "高雄市",
    status: "施工中",
    desc: "店面展示牆、燈槽與油漆整理，搭配現場追加項目確認流程。",
    highlights: ["展示牆", "燈槽", "追加確認"],
  },
  {
    id: "case-003",
    title: "潮州透天浴室翻修",
    type: "水電配置",
    area: "潮州",
    status: "估價中",
    desc: "浴室水電管線、磁磚與防水重新整理，先進行現場丈量與報價。",
    highlights: ["水電", "磁磚", "報價整理"],
  },
  {
    id: "case-004",
    title: "鹽埔老屋外牆修補",
    type: "泥作修繕",
    area: "鹽埔",
    status: "完工",
    desc: "外牆裂縫、局部泥作修補與油漆整理，建立施工前後對照。",
    highlights: ["外牆修補", "裂縫處理", "前後對照"],
  },
]

const processSteps = [
  {
    title: "初步詢問",
    desc: "先了解位置、需求、照片、預算與希望施工時間。",
  },
  {
    title: "現場評估",
    desc: "確認實際狀況、施工範圍、材料與可能追加項目。",
  },
  {
    title: "報價整理",
    desc: "整理工項、數量、單價、總價與施工時程。",
  },
  {
    title: "安排施工",
    desc: "確認師傅、日期、材料與每日施工重點。",
  },
  {
    title: "完工驗收",
    desc: "提供完工照片、修繕紀錄與後續注意事項。",
  },
]

const faqItems = [
  {
    question: "一定要現場估價嗎？",
    answer:
      "若是防水、泥作、水電或老屋修繕，通常建議現場確認，因為照片無法完整判斷基底狀況與施工難度。",
  },
  {
    question: "追加項目怎麼確認？",
    answer: "若施工後發現原本未預期的問題，會先整理原因、金額與處理方式，再由業主確認後施工。",
  },
  {
    question: "可以看施工案例嗎？",
    answer:
      "可以。網站會整理不同類型案例，包含施工前後、工項與處理方式，讓客戶更容易理解工程內容。",
  },
  {
    question: "這個網站和 BuildFlow 有什麼關係？",
    answer:
      "前台網站負責讓客戶認識服務與送出需求；BuildFlow 則負責內部案件、發包、批價與追加減項管理。",
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
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="text-sm font-bold text-slate-500">
              ← 回系統入口
            </Link>
            <p className="mt-2 text-xl font-black">Contractor Site</p>
            <p className="text-sm text-slate-500">工程行對外接案網站</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="#contact"
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
            >
              聯絡詢問
            </a>
            <Link
              to="/buildflow"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700"
            >
              查看 BuildFlow
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
        updateInquiry={updateInquiry}
        copyContactText={copyContactText}
      />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            Contractor Website
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">
            讓工程行的服務、案例與聯絡方式被清楚看見。
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-slate-600">
            這是一個工程行對外接案網站原型，負責展示服務項目、施工案例、流程說明與聯絡導流。
            對外網站負責接案，內部系統則交給 BuildFlow 管理案件、發包與追加減項。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#services"
              className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white"
            >
              查看服務
            </a>
            <a
              href="#cases"
              className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700"
            >
              查看案例
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-slate-500">網站目的</p>

          <div className="mt-5 grid gap-3">
            {[
              "整理工程行服務項目",
              "展示施工案例與信任感",
              "讓客戶快速送出需求",
              "把前台詢問導入後台管理",
            ].map((item, index) => (
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
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          label="Services"
          title="服務項目清楚，客戶才知道能不能找你。"
          desc="工程行網站不只放照片，還要讓客戶快速理解服務範圍、適合案件與聯絡方式。"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <h3 className="text-2xl font-black">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{service.desc}</p>

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
      <SectionTitle
        label="Cases"
        title="施工案例要能被分類、被理解、被信任。"
        desc="案例不是只放照片，而是要讓客戶知道案場類型、處理方式與目前狀態。"
      />

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
                <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                {item.status}
              </span>
            </div>

            <p className="mt-4 leading-7 text-slate-600">{item.desc}</p>

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
        <SectionTitle
          label="Process"
          title="把施工流程講清楚，降低客戶的不確定感。"
          desc="工程行網站的重點不是華麗，而是讓客戶知道從詢問到完工會怎麼進行。"
        />

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
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
            工程行不能只靠 LINE 相簿和口頭介紹。
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            客戶在詢問前，通常想先知道你做什麼、做過什麼、流程怎麼走、能不能信任。
            網站的目的，就是把這些資訊整理成一個可被理解的入口。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["清楚展示服務", "讓客戶快速知道工程行能處理哪些類型。"],
            ["整理施工案例", "把過去的施工經驗沉澱成可展示的信任證明。"],
            ["建立詢問流程", "讓客戶用固定格式提供需求、照片與地點。"],
            ["銜接內部管理", "前台收到需求後，可以交給 BuildFlow 進行案件管理。"],
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
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
              前台負責接案，後台負責管理。
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Contractor Site 是對外網站，負責建立信任與收集需求。 BuildFlow
              是內部系統，負責案件、發包、批價、追加減項與任務追蹤。
              兩者合起來，才是一套完整工程行數位流程。
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
              {[
                "客戶在前台網站了解服務",
                "客戶送出需求與照片",
                "管理者建立 BuildFlow 案件",
                "安排發包、批價與施工任務",
                "追加減項產生確認文字",
              ].map((item, index) => (
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
      <SectionTitle
        label="FAQ"
        title="常見問題先說清楚，減少重複溝通。"
        desc="前台網站可以先回答客戶最常問的問題，讓正式溝通更有效率。"
      />

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

function ContactSection({ contactText, copied, inquiry, updateInquiry, copyContactText }) {
  return (
    <section id="contact" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
              讓客戶用固定格式提供需求。
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              工程詢問最怕資訊不完整。前台網站可以先引導客戶提供需求類型、地區、照片與希望施工時間，
              讓後續估價與現場評估更有效率。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={copyContactText}
                className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white"
              >
                {copied ? "已複製詢問格式" : "複製詢問格式"}
              </button>

              <Link
                to="/admin"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-700"
              >
                回管理入口
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <form className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">姓名</span>
                  <input
                    value={inquiry.name}
                    onChange={(event) => updateInquiry("name", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">電話 / LINE</span>
                  <input
                    value={inquiry.contact}
                    onChange={(event) => updateInquiry("contact", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">案場地區</span>
                  <input
                    value={inquiry.area}
                    onChange={(event) => updateInquiry("area", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">工程類型</span>
                  <input
                    value={inquiry.type}
                    onChange={(event) => updateInquiry("type", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-bold text-slate-600">目前狀況</span>
                <textarea
                  value={inquiry.situation}
                  onChange={(event) => updateInquiry("situation", event.target.value)}
                  rows={3}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">希望施工時間</span>
                  <input
                    value={inquiry.schedule}
                    onChange={(event) => updateInquiry("schedule", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-slate-600">備註</span>
                  <input
                    value={inquiry.note}
                    onChange={(event) => updateInquiry("note", event.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-sm"
                  />
                </label>
              </div>
            </form>

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
      <h2 className="mt-4 max-w-4xl text-3xl font-black tracking-[-0.04em] md:text-5xl">{title}</h2>
      {desc && <p className="mt-4 max-w-3xl leading-8 text-slate-600">{desc}</p>}
    </div>
  )
}

export default ContractorSite
