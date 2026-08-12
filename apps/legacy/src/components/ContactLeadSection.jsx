import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { createContactRequest } from "../lib/contactRequests"
import { getAttribution, trackEvent } from "../site/marketing"

const email = "a0988874324@gmail.com"
const lineId = "mulavuc"

const initialForm = {
  name: "",
  contact: "",
  industry: "",
  reference: "鑫匠工程",
  budget_range: "5,000～10,000",
  deadline: "",
  message: "",
}

const referenceOptions = [
  "鑫匠工程",
  "LULUFACE 美容品牌電商",
  "MORIE SELECT 選品電商",
  "商業視覺與廣告 Campaign",
  "SEO / 廣告成長",
  "SEO 基礎整頓",
  "廣告落地頁＋追蹤",
  "成長營運方案",
  "批發訂貨系統",
  "RAG 企業知識庫",
  "生醫品牌網站",
  "公司一頁式官網",
  "點餐系統",
  "互動測驗系統",
  "Notion 個人品牌頁",
  "LINE Bot",
  "快速網站",
  "品牌官網",
  "接單 / 後台系統",
  "AI / 客製系統",
  "還不確定",
]
const budgetOptions = ["1 萬內", "1～3 萬", "3～6 萬", "6 萬以上", "先討論"]

function ContactLeadSection() {
  const [searchParams] = useSearchParams()
  const caseParam = searchParams.get("case")
  const safeReference = referenceOptions.includes(caseParam) ? caseParam : initialForm.reference
  const [form, setForm] = useState({ ...initialForm, reference: safeReference })
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState("")

  const mailBody = useMemo(() => {
    const lines = [
      "你好 我想討論網站、LINE Bot、AI 工具或後台流程需求",
      `姓名：${form.name}`,
      `聯絡方式：${form.contact}`,
      `產業：${form.industry}`,
      `參考案例：${form.reference}`,
      `預算：${form.budget_range}`,
      `希望完成時間：${form.deadline}`,
      `需求：${form.message}`,
    ]
    return encodeURIComponent(lines.join("\n"))
  }, [form])

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setNotice("")
  }

  async function copyText(text, label) {
    try {
      await navigator.clipboard.writeText(text)
      setNotice(`已複製 ${label}`)
    } catch {
      setNotice(`無法自動複製 請手動複製：${text}`)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setNotice("")

    const attribution = getAttribution()
    const attributionText = Object.keys(attribution).length
      ? `\n來源：${JSON.stringify(attribution)}`
      : ""
    const result = await createContactRequest({
      name: form.name,
      contact: form.contact,
      service_type: form.reference,
      budget_range: form.budget_range,
      message: `產業：${form.industry}\n希望完成時間：${form.deadline}\n需求：${form.message}${attributionText}`,
      source: "contact-page",
      status: "new",
    })

    setSubmitting(false)
    trackEvent("generate_lead", {
      service_type: form.reference,
      budget_range: form.budget_range,
      lead_delivery: result.ok ? "connected" : "fallback",
    })
    setNotice(
      result.ok
        ? "已收到 我會回覆做法與估價"
        : "已整理 請用 Email 或 LINE 傳給我"
    )
  }

  function resetForm() {
    setForm(initialForm)
    setNotice("")
  }

  return (
    <section id="contact" className="bg-[#172026] text-white">
      <div className="mx-auto grid max-w-6xl gap-7 px-4 py-10 md:py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-xs font-black text-[#83d4c8]">聯絡</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            填需求表單
          </h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#d9e6e3]">
            傳產業、參考案例、預算與時程
          </p>

          <div className="mt-8 grid gap-3">
            <ContactLine label="LINE" value={lineId} />
            <ContactLine label="Email" value="直接寄信" />
          </div>

          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <button type="button" data-track="contact" data-placement="contact_copy_line" onClick={() => copyText(lineId, "LINE ID")} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] sm:w-auto">
              複製 LINE ID
            </button>
            <button type="button" onClick={() => copyText(email, "Email")} className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white sm:w-auto">
              複製 Email
            </button>
            <a href={`mailto:${email}?subject=${encodeURIComponent("接案需求討論")}&body=${mailBody}`} data-track="contact" data-placement="contact_email" className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white sm:w-auto">
              Email
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-white/12 bg-white/[0.07] p-4 md:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="姓名 / 稱呼" value={form.name} onChange={(value) => updateForm("name", value)} required />
            <Input label="聯絡方式" value={form.contact} onChange={(value) => updateForm("contact", value)} placeholder="Email / LINE / 電話" required />
            <Input label="產業" value={form.industry} onChange={(value) => updateForm("industry", value)} placeholder="例如：工程行 / 批發 / 餐飲" required />
            <Select label="參考案例" value={form.reference} onChange={(value) => updateForm("reference", value)} options={referenceOptions} />
            <Select label="預算區間" value={form.budget_range} onChange={(value) => updateForm("budget_range", value)} options={budgetOptions} />
            <Input label="希望完成時間" value={form.deadline} onChange={(value) => updateForm("deadline", value)} placeholder="例如：兩週內 / 下個月 / 不急" />
            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-black text-[#d9e6e3]">想解決的問題</span>
              <textarea
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                required
                placeholder="例如：想做類似鑫匠的官網與詢價系統"
                className="min-h-28 rounded-md border border-white/14 bg-[#111d22] px-4 py-3 text-sm font-bold leading-7 text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]"
              />
            </label>
          </div>

          {notice ? (
            <p className="mt-4 rounded-md border border-white/12 bg-white/[0.08] p-4 text-sm font-bold leading-6 text-[#f5e8c9]">
              {notice}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] transition hover:bg-[#ffd785] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "送出中..." : "送出需求"}
            </button>
            <button type="button" onClick={resetForm} className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white transition hover:bg-white/10 sm:w-auto">
              清空
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function ContactLine({ label, value }) {
  return (
    <div className="rounded-lg border border-white/12 bg-white/[0.07] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#83d4c8]">{label}</p>
      <p className="mt-2 text-lg font-black">{value}</p>
    </div>
  )
}

function Input({ label, value, onChange, placeholder = "", required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-[#d9e6e3]">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="min-h-12 rounded-md border border-white/14 bg-[#111d22] px-4 text-sm font-bold text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]"
      />
    </label>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-[#d9e6e3]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-md border border-white/14 bg-[#111d22] px-4 text-sm font-bold text-white outline-none focus:border-[#f0c36a]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export default ContactLeadSection
