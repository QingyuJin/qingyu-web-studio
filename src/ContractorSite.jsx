import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { createContactRequest } from "./lib/contactRequests"

const lineBotId = "@550oexzn"

const services = ["防水抓漏", "地坪工程", "磁磚泥作", "油漆修繕", "木作裝修", "工程管理"]

const cases = [
  {
    title: "屋頂防水修繕",
    type: "防水抓漏",
    image: "/project-photos/335950_0.jpg",
    brief: "以現場照片、施工範圍與材料說明，讓客戶能快速理解報價基礎。",
    detail: "適合整理成接案作品案例：問題描述、處理方式、施工前後與保固說明。",
  },
  {
    title: "Epoxy 地坪整理",
    type: "地坪工程",
    image: "/project-photos/335953_0.jpg",
    brief: "用大圖呈現表面質感，搭配坪數、材料與工期資訊。",
    detail: "可延伸成線上詢價表，讓客戶先提供坪數、用途、地面狀況與照片。",
  },
  {
    title: "木地板與室內修繕",
    type: "木作裝修",
    image: "/project-photos/335949_0.jpg",
    brief: "把複雜的修繕需求拆成項目，協助業主更快取得有效報價。",
    detail: "適合需要多工種整合的服務頁，將流程、注意事項與交付物寫清楚。",
  },
  {
    title: "外牆與立面工程",
    type: "油漆修繕",
    image: "/project-photos/335945_0.jpg",
    brief: "建立信任感的重點是照片、施工位置、安全措施與完工品質。",
    detail: "作品頁可加入常見問題，例如是否需要搭架、是否影響住戶與保固範圍。",
  },
  {
    title: "住宅門面翻新",
    type: "工程管理",
    image: "/project-photos/335941_0.jpg",
    brief: "以專案方式呈現前期溝通、排程、廠商協調與驗收。",
    detail: "此類案例能展示專案管理能力，適合銜接 BuildFlow 這類後台工具。",
  },
  {
    title: "室內明亮化整理",
    type: "磁磚泥作",
    image: "/project-photos/335942_0.jpg",
    brief: "讓服務頁不只放照片，也能說明問題、預算與施工限制。",
    detail: "對接案網站來說，案例越具體，客戶越容易判斷是否適合委託。",
  },
]

const quoteSteps = [
  ["需求整理", "先用表單收集地點、照片、尺寸與預算。"],
  ["初步報價", "用固定欄位建立可追蹤的報價草稿。"],
  ["施工追蹤", "把進度、變更、付款與驗收集中管理。"],
]

const formFields = [
  ["name", "姓名"],
  ["contact", "電話 / LINE"],
  ["source", "來源", "LINE / Google / Pro360"],
  ["area", "施工地區"],
  ["trade", "工程類型", "防水 / 地坪 / 泥作"],
  ["item", "需求項目"],
  ["material", "指定材料"],
  ["size", "坪數 / 尺寸"],
  ["date", "期望施工日期"],
  ["budget", "預算範圍"],
  ["note", "補充說明"],
]

function ContractorSite() {
  const [activeCase, setActiveCase] = useState(cases[0])
  const [activeType, setActiveType] = useState("全部")
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [form, setForm] = useState(Object.fromEntries(formFields.map(([key]) => [key, ""])))

  const filteredCases = useMemo(() => {
    if (activeType === "全部") return cases
    return cases.filter((item) => item.type === activeType)
  }, [activeType])

  const inquiryText = `工程需求詢價
姓名：${form.name || "待填"}
電話 / LINE：${form.contact || "待填"}
來源：${form.source || "待填"}
施工地區：${form.area || "待填"}
工程類型：${form.trade || "待填"}
需求項目：${form.item || "待填"}
指定材料：${form.material || "待填"}
坪數 / 尺寸：${form.size || "待填"}
期望施工日期：${form.date || "待填"}
預算範圍：${form.budget || "待填"}
補充說明：${form.note || "待填"}
LINE Bot：${lineBotId}`

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryText)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = inquiryText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  async function submitInquiry(event) {
    event.preventDefault()
    setSubmitting(true)
    setSubmitMessage("")

    const result = await createContactRequest({
      name: form.name || "未填姓名",
      contact: form.contact || "未填聯絡方式",
      company: form.area,
      service_type: form.trade || form.item || "工程需求",
      budget_range: form.budget,
      message: inquiryText,
      source: form.source || "contractor-site",
      status: "new",
    })

    setSubmitting(false)

    if (!result.ok) {
      setSubmitMessage(`尚未送出到後台：${result.reason}`)
      return
    }

    setSubmitMessage("需求已送出，我會盡快回覆。")
    setForm(Object.fromEntries(formFields.map(([key]) => [key, ""])))
  }

  return (
    <main className="min-h-screen bg-[#0c1518] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c1518]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link to="/" className="text-sm font-bold text-[#8bd8cc]">
              Qingyu Web Studio
            </Link>
            <p className="mt-1 font-black">Qingyu Web Studio 作品案例 Demo</p>
          </div>
          <div className="flex gap-2">
            <a href="#inquiry" className="rounded-md bg-[#f0c36a] px-4 py-2 text-sm font-black text-[#0c1518]">
              填寫需求
            </a>
            <Link to="/buildflow" className="rounded-md border border-white/12 px-4 py-2 text-sm font-black">
              BuildFlow
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8bd8cc]">Contractor Landing Page</p>
          <h1 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">
            作品案例：工程服務頁如何變成可收需求的網站。
          </h1>
          <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-slate-300 md:text-base">
            這頁是 Qingyu Web Studio 的 demo，示範工程類客戶如何呈現案例、引導詢價，並把需求接到 LINE 或後台系統。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {quoteSteps.map(([title, desc], index) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
                <span className="font-mono text-xs font-black text-[#f0c36a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-lg font-black text-white">{title}</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => setActiveCase(cases[(cases.indexOf(activeCase) + 1) % cases.length])}
            className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left"
          >
            <img
              src={activeCase.image}
              alt={activeCase.title}
              className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
            />
          </button>
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
            <p className="text-xs font-black text-[#8bd8cc]">{activeCase.type}</p>
            <h2 className="mt-2 text-2xl font-black">{activeCase.title}</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{activeCase.brief}</p>
          </div>
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeader label="Cases" title="案例展示" desc="用照片與明確描述建立信任，讓客戶知道你做過什麼、適合處理什麼。" />
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {["全部", ...services].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveType(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                activeType === item ? "bg-[#f0c36a] text-[#0c1518]" : "bg-white/5 text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.055] p-3">
              <button
                type="button"
                onClick={() => setActiveCase(item)}
                className="block w-full overflow-hidden rounded-md bg-white/5 text-left"
              >
                <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover" />
              </button>
              <div className="p-3">
                <p className="text-xs font-black text-[#8bd8cc]">{item.type}</p>
                <h3 className="mt-2 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{item.brief}</p>
                <details className="minimal-detail mt-4">
                  <summary>查看說明</summary>
                  <p className="minimal-detail-body text-sm font-bold leading-7 text-slate-300">{item.detail}</p>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="inquiry" className="border-t border-white/10 bg-[#111d22]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader label="Inquiry" title="需求表單範例" desc="客戶填完後可一鍵複製，轉貼到 LINE、Email 或後台工單。" />
          <div className="grid gap-4">
            <form
              className="grid gap-4 rounded-lg border border-white/10 bg-[#0c1518] p-5"
              onSubmit={submitInquiry}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {formFields.map(([key, label, placeholder]) => (
                  <Input
                    key={key}
                    label={label}
                    value={form[key]}
                    onChange={(value) => updateForm(key, value)}
                    placeholder={placeholder}
                  />
                ))}
              </div>
              {submitMessage ? (
                <p className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold leading-6 text-slate-200">
                  {submitMessage}
                </p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  disabled={submitting}
                  className="rounded-md bg-[#f0c36a] px-4 py-3 text-sm font-black text-[#0c1518]"
                >
                  {submitting ? "送出中..." : "送出需求到後台"}
                </button>
                <button
                  type="button"
                  onClick={copyInquiry}
                  className="rounded-md border border-white/10 px-4 py-3 text-sm font-black text-white"
                >
                  {copied ? "已複製需求內容" : "複製詢價內容"}
                </button>
              </div>
            </form>
            <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-[#0c1518] p-5 text-sm font-bold leading-7 text-slate-300">
              {inquiryText}
            </pre>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeader({ label, title, desc }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8bd8cc]">{label}</p>
      <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-400">{desc}</p>
    </div>
  )
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]"
      />
    </label>
  )
}

export default ContractorSite
