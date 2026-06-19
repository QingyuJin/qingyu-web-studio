import { useState } from "react"
import { createContactRequest } from "../lib/contactRequests"

const initialForm = {
  name: "",
  contact: "",
  company: "",
  service_type: "LINE Bot 後台",
  budget_range: "",
  message: "",
}

const process = [
  ["01", "說清楚服務", "讓客戶一眼懂你能解決什麼。"],
  ["02", "收進需求", "表單、LINE、報價流程整理起來。"],
  ["03", "追到結案", "案件、進度、請款與保固不再散落。"],
]

function ContactLeadSection() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setMessage("")

    const result = await createContactRequest({
      ...form,
      source: "studio-home",
      status: "new",
    })

    setSubmitting(false)

    if (!result.ok) {
      setMessage(`送出失敗：${result.reason}`)
      return
    }

    setForm(initialForm)
    setMessage(
      result.mode === "local"
        ? "需求已先暫存在本機 Demo 後台。接上 Supabase 後會直接寫入資料庫。"
        : "需求已送出，我會盡快回覆。"
    )
  }

  return (
    <section id="contact" className="bg-[#172026] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#83d4c8]">Contact</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            想讓網站開始幫你接單？
          </h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#d9e6e3]">
            告訴我你的服務與目前卡住的流程，我可以幫你規劃網站、LINE Bot 或後台系統。
          </p>

          <div className="mt-8 grid gap-3">
            {process.map(([no, title, text]) => (
              <div
                key={no}
                className="grid gap-3 rounded-lg border border-white/12 bg-white/[0.07] p-4 sm:grid-cols-[3rem_1fr]"
              >
                <p className="font-mono text-sm font-black text-[#f0c36a]">{no}</p>
                <div>
                  <p className="font-black">{title}</p>
                  <p className="mt-1 text-sm font-bold leading-7 text-[#d9e6e3]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-white/12 bg-white/[0.07] p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="姓名 / 稱呼"
              value={form.name}
              onChange={(value) => updateForm("name", value)}
              required
            />
            <Input
              label="聯絡方式"
              value={form.contact}
              onChange={(value) => updateForm("contact", value)}
              placeholder="LINE / Email / 電話"
              required
            />
            <Input
              label="服務或公司"
              value={form.company}
              onChange={(value) => updateForm("company", value)}
              placeholder="可留空"
            />
            <label className="grid gap-2">
              <span className="text-sm font-black text-[#d9e6e3]">想做什麼</span>
              <select
                value={form.service_type}
                onChange={(event) => updateForm("service_type", event.target.value)}
                className="min-h-12 rounded-md border border-white/14 bg-[#111d22] px-4 text-sm font-bold text-white outline-none focus:border-[#f0c36a]"
              >
                <option>形象官網</option>
                <option>Landing Page</option>
                <option>LINE Bot 後台</option>
              </select>
            </label>
            <Input
              label="預算或時程"
              value={form.budget_range}
              onChange={(value) => updateForm("budget_range", value)}
              placeholder="例如：3-8 萬 / 先討論"
            />
            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-black text-[#d9e6e3]">目前卡住的流程</span>
              <textarea
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                required
                placeholder="例如：客戶需求都在 LINE，很難追蹤報價與進度..."
                className="min-h-32 rounded-md border border-white/14 bg-[#111d22] px-4 py-3 text-sm font-bold leading-7 text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]"
              />
            </label>
          </div>

          {message ? (
            <p className="mt-4 rounded-md border border-white/12 bg-white/[0.08] p-4 text-sm font-bold leading-6 text-[#f5e8c9]">
              {message}
            </p>
          ) : null}

          <button
            disabled={submitting}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] hover:bg-[#ffd785]"
          >
            {submitting ? "送出中..." : "找我討論"}
          </button>
        </form>
      </div>
    </section>
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

export default ContactLeadSection
