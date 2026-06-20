import { useMemo, useState } from "react"
import { createContactRequest } from "../lib/contactRequests"

const initialForm = {
  name: "",
  contact: "",
  service_type: "網站",
  budget_range: "",
  message: "",
}

const serviceOptions = ["網站", "LINE Bot", "AI 工具", "小系統", "不確定"]
const budgetOptions = ["還不確定", "NT$3,000-5,000", "NT$6,000-12,000", "NT$15,000-30,000", "NT$30,000 以上"]

function ContactLeadSection() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const mailBody = useMemo(() => {
    const lines = [
      "你好，我想討論網站 / LINE Bot / AI 工具 / 小系統需求。",
      `姓名 / 稱呼：${form.name || ""}`,
      `聯絡方式：${form.contact || ""}`,
      `想做的項目：${form.service_type || ""}`,
      `預算區間：${form.budget_range || ""}`,
      `需求描述：${form.message || ""}`,
    ]

    return encodeURIComponent(lines.join("\n"))
  }, [form])

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setMessage("")
    setCopied(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setMessage("")

    const result = await createContactRequest({
      ...form,
      source: "contact-page",
      status: "new",
    })

    setSubmitting(false)

    if (!result.ok) {
      setMessage(`送出時遇到問題：${result.reason || "請稍後再試，或直接用 Email 聯絡我。"}`)
      return
    }

    setMessage(
      result.mode === "local"
        ? "已整理需求，請透過 Email 傳送給我。"
        : "需求已送出，我會盡快回覆。"
    )
  }

  async function copySummary() {
    const text = [
      "Qingyu Web Studio 需求整理",
      `姓名 / 稱呼：${form.name || "未填"}`,
      `聯絡方式：${form.contact || "未填"}`,
      `想做的項目：${form.service_type || "未填"}`,
      `預算區間：${form.budget_range || "未填"}`,
      `需求描述：${form.message || "未填"}`,
    ].join("\n")

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setMessage("已複製需求摘要，可以直接貼到 Email 或 LINE。")
    } catch {
      setMessage("瀏覽器不支援自動複製，請手動複製表單內容。")
    }
  }

  function resetForm() {
    setForm(initialForm)
    setMessage("")
    setCopied(false)
  }

  return (
    <section id="contact" className="bg-[#172026] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#83d4c8]">Contact</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">先聊聊需求</h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#d9e6e3]">
            你可以先不用想得很完整。告訴我你的服務、客戶來源與目前卡住的流程，我可以幫你判斷適合網站、LINE Bot、AI 工具還是小系統。
          </p>

          <div className="mt-8 grid gap-3">
            {[
              ["01", "留下需求", "簡單描述你想做的項目與目前狀況。"],
              ["02", "判斷方向", "我會整理適合的網站、工具或後台流程。"],
              ["03", "討論下一步", "確認功能範圍、預算級距與上線節奏。"],
            ].map(([no, title, text]) => (
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
              placeholder="Email / LINE ID / 電話"
              required
            />
            <Select
              label="想做的項目"
              value={form.service_type}
              onChange={(value) => updateForm("service_type", value)}
              options={serviceOptions}
            />
            <Select
              label="預算區間"
              value={form.budget_range}
              onChange={(value) => updateForm("budget_range", value)}
              options={budgetOptions}
            />
            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-black text-[#d9e6e3]">需求描述</span>
              <textarea
                value={form.message}
                onChange={(event) => updateForm("message", event.target.value)}
                required
                placeholder="例如：我是咖啡店，想做一頁式網站、LINE 預約、菜單查詢，最好手機版好操作。"
                className="min-h-32 rounded-md border border-white/14 bg-[#111d22] px-4 py-3 text-sm font-bold leading-7 text-white outline-none placeholder:text-slate-500 focus:border-[#f0c36a]"
              />
            </label>
          </div>

          {message ? (
            <p className="mt-4 rounded-md border border-white/12 bg-white/[0.08] p-4 text-sm font-bold leading-6 text-[#f5e8c9]">
              {message}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] transition hover:bg-[#ffd785] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "整理中..." : "整理需求"}
            </button>
            <a
              href={`mailto:a0988874324@gmail.com?subject=${encodeURIComponent("網站需求討論")}&body=${mailBody}`}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white transition hover:bg-white/10"
            >
              用 Email 傳送
            </a>
            <button
              type="button"
              onClick={copySummary}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/16 px-5 text-sm font-black text-white transition hover:bg-white/10"
            >
              {copied ? "已複製" : "複製摘要"}
            </button>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="mt-3 text-sm font-black text-[#d9e6e3] underline underline-offset-4 hover:text-white"
          >
            清空表單
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
