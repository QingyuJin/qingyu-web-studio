import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { createContactRequest } from "../lib/contactRequests"
import { getAttribution, trackEvent } from "../site/marketing"

const email = "a0988874324@gmail.com"
const lineId = "mulavuc"
const inquiryOptions = ["還不確定", "企業 Web 系統", "品牌網站", "Landing Page", "技術開發協作"]
const budgetOptions = ["1 萬內", "1 至 3 萬", "3 至 6 萬", "6 萬以上", "先討論"]
const caseNames = {
  "wholesale-ordering": "批發訂貨系統", buildflow: "工程案件管理", xinjiang: "鑫匠工程", linebot: "LINE 詢價助手", "line-bot": "LINE 詢價助手", "rag-consultant": "AI 公司知識庫", beauty: "美容保養網站", clinic: "牙醫診所網站", restaurant: "精品餐飲網站", construction: "室內工程網站", manufacturing: "精密製造網站", saas: "SaaS 產品網站",
}
const typeNames = { system: "企業 Web 系統", business: "企業 Web 系統", website: "品牌網站", landing: "Landing Page", agency: "技術開發協作", consultant: "技術開發協作" }

function clean(value) {
  if (!value || value.length > 80 || Array.from(value).some((character) => character.charCodeAt(0) < 32)) return ""
  return value.trim()
}

export default function ContactLeadSection() {
  const [searchParams] = useSearchParams()
  const incomingCase = clean(searchParams.get("case"))
  const initialCase = caseNames[incomingCase] || incomingCase
  const initialType = typeNames[clean(searchParams.get("type")).toLowerCase()] || "還不確定"
  const [reference, setReference] = useState(initialCase)
  const [form, setForm] = useState({ name: "", contact: "", inquiry_type: initialType, budget_range: "先討論", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState("")

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setNotice("")
  }

  async function submit(event) {
    event.preventDefault()
    setSubmitting(true)
    const attribution = getAttribution()
    const context = [reference ? `正在詢問：${reference}` : "", form.message, Object.keys(attribution).length ? `來源：${JSON.stringify(attribution)}` : ""].filter(Boolean).join("\n")
    const result = await createContactRequest({ name: form.name, contact: form.contact, service_type: form.inquiry_type, budget_range: form.budget_range, message: context, source: "contact-page", status: "new" })
    setSubmitting(false)
    trackEvent("generate_lead", { service_type: form.inquiry_type, reference_case: reference, budget_range: form.budget_range, lead_delivery: result.ok ? "connected" : "fallback" })
    setNotice(result.ok ? "已收到 我會回覆做法與估價" : "暫時無法送出 請改用 LINE 或 Email")
  }

  return <section id="contact" className="bg-[#172026] text-white"><div className="mx-auto grid max-w-6xl gap-9 px-5 py-14 sm:px-7 md:py-20 lg:grid-cols-[.8fr_1.2fr]">
    <div><p className="text-[10px] font-semibold tracking-[.18em] text-[#83d4c8]">Contact</p><h2 className="mt-4 font-['Noto_Serif_TC',serif] text-3xl font-semibold md:text-4xl">先說明目前的問題</h2><p className="mt-4 max-w-md text-sm font-medium leading-7 text-white/65">留下五項必要資訊 就能開始確認做法</p><div className="mt-8 flex flex-wrap items-center gap-5"><a href={`https://line.me/R/ti/p/~${lineId}`} target="_blank" rel="noreferrer" data-track="contact" data-placement="contact_line" className="inline-flex min-h-12 items-center rounded-full bg-[#f0c36a] px-6 text-sm font-bold text-[#172026]">加入 LINE 洽談</a><a href={`mailto:${email}`} data-track="contact" data-placement="contact_email" className="inline-flex min-h-11 items-center text-sm font-semibold text-white/75 underline underline-offset-4">改用 Email</a></div></div>
    <form onSubmit={submit} className="border border-white/12 bg-white/[.06] p-5 sm:p-6">
      {reference ? <div className="mb-5 inline-flex min-h-10 items-center gap-3 rounded-full border border-white/14 bg-white/[.06] px-4 text-xs font-semibold text-[#d8e4e1]">正在詢問：{reference}<button type="button" onClick={() => setReference("")} aria-label="清除詢問案例" className="grid h-7 w-7 place-items-center rounded-full text-base text-white/55">×</button></div> : null}
      <div className="grid gap-4 sm:grid-cols-2"><Input label="姓名稱呼" value={form.name} onChange={(value) => update("name", value)} required /><Input label="聯絡方式" value={form.contact} onChange={(value) => update("contact", value)} placeholder="Email LINE 或電話" required /><Select label="想做什麼" value={form.inquiry_type} onChange={(value) => update("inquiry_type", value)} options={inquiryOptions} /><Select label="預算區間" value={form.budget_range} onChange={(value) => update("budget_range", value)} options={budgetOptions} /><label className="grid gap-2 sm:col-span-2"><span className="text-sm font-semibold text-[#d9e6e3]">想解決的問題</span><textarea value={form.message} onChange={(event) => update("message", event.target.value)} required placeholder="例如 餐飲批發 目前用 LINE 接單 希望三個月內完成" className="min-h-32 rounded-md border border-white/14 bg-[#111d22] px-4 py-3 text-base font-medium leading-7 text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]" /></label></div>
      {notice ? <p className="mt-4 border border-white/12 bg-white/[.06] p-4 text-sm font-semibold leading-6 text-[#f5e8c9]" role="status">{notice}</p> : null}
      <button type="submit" disabled={submitting} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#f0c36a] px-6 text-sm font-bold text-[#172026] disabled:opacity-60 sm:w-auto">{submitting ? "送出中" : "送出需求"}</button>
    </form>
  </div></section>
}

function Input({ label, value, onChange, placeholder = "", required = false }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-[#d9e6e3]">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} required={required} className="min-h-12 rounded-md border border-white/14 bg-[#111d22] px-4 text-base font-medium text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]" /></label>
}

function Select({ label, value, onChange, options }) {
  return <label className="grid gap-2"><span className="text-sm font-semibold text-[#d9e6e3]">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-12 rounded-md border border-white/14 bg-[#111d22] px-4 text-base font-medium text-white outline-none focus:border-[#f0c36a]">{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}
