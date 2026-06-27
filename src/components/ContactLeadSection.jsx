import { useMemo, useState } from "react"
import { createContactRequest } from "../lib/contactRequests"

const email = "a0988874324@gmail.com"
const lineId = "mulavuc"

const initialForm = {
  name: "",
  contact: "",
  service_type: "小店上線網站包",
  budget_range: "還不確定",
  message: "",
}

const serviceOptions = [
  "小店上線網站包",
  "店家形象網站包",
  "互動測驗商品包",
  "店家自動回覆包",
  "工程行流程管理包",
  "小型後台包",
  "文件問答商品包",
  "互動式技術展示包",
  "不確定，想先討論",
]
const budgetOptions = ["還不確定", "3,000-5,000 元", "6,000-10,000 元", "10,000-20,000 元", "20,000-30,000 元", "30,000 元以上"]

function ContactLeadSection() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState("")

  const mailBody = useMemo(() => {
    const lines = [
      "你好，我想討論一個可交付的網站、互動測驗、LINE Bot、自動回覆或小型後台商品包。",
      `姓名：${form.name}`,
      `聯絡方式：${form.contact}`,
      `項目：${form.service_type}`,
      `預算：${form.budget_range}`,
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
      setNotice(`無法自動複製，請手動複製：${text}`)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setNotice("")

    const result = await createContactRequest({
      ...form,
      source: "contact-page",
      status: "new",
    })

    setSubmitting(false)
    setNotice(
      result.ok
        ? "已整理需求。你可以用 Email 或 LINE 傳給我。"
        : "已整理需求，請透過 Email 傳送給我。"
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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#83d4c8]">Contact</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            聊聊你想做的成品
          </h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#d9e6e3]">
            可以先傳產業、想解決的問題、目前怎麼收單、想要哪一種商品包，以及預算與希望上線時間。
          </p>

          <div className="mt-8 grid gap-3">
            <ContactLine label="LINE" value={lineId} />
            <ContactLine label="Email" value={email} />
          </div>

          <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap">
            <button type="button" onClick={() => copyText(lineId, "LINE ID")} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] sm:w-auto">
              複製 LINE ID
            </button>
            <button type="button" onClick={() => copyText(email, "Email")} className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white sm:w-auto">
              複製 Email
            </button>
            <a href={`mailto:${email}?subject=${encodeURIComponent("網站與 AI 工具需求討論")}&body=${mailBody}`} className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white sm:w-auto">
              用 Email 傳送需求
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-white/12 bg-white/[0.07] p-4 md:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="姓名 / 稱呼" value={form.name} onChange={(value) => updateForm("name", value)} required />
            <Input label="聯絡方式" value={form.contact} onChange={(value) => updateForm("contact", value)} placeholder="Email / LINE / 電話" required />
            <Select label="想做的項目" value={form.service_type} onChange={(value) => updateForm("service_type", value)} options={serviceOptions} />
            <Select label="預算區間" value={form.budget_range} onChange={(value) => updateForm("budget_range", value)} options={budgetOptions} />
            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-black text-[#d9e6e3]">需求描述</span>
              <textarea
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                required
                placeholder="例如：我想做小店上線網站包、互動測驗商品包、店家自動回覆包，或把工程接案流程整理成小型後台。"
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
              {submitting ? "整理中..." : "整理需求"}
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
