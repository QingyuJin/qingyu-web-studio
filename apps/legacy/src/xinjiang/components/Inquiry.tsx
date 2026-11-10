import { useRef, useState } from "react"
import { contactInfo, services } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

const INQUIRY_ENDPOINT = "/api/inquiry"

const initialForm = {
  name: "",
  contact: "",
  service: services[0].title,
  area: "",
  message: "",
}

type FormState = typeof initialForm

export function Inquiry() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<"" | "stored" | "stored-only" | "notified-only" | "fallback">("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const submittingRef = useRef(false)
  const idempotencyRef = useRef("")

  const inquiryText = [
    "【鑫匠工程 線上詢價】",
    `姓名：${form.name || "未填"}`,
    `聯絡方式：${form.contact || "未填"}`,
    `工程項目：${form.service}`,
    `施工地區：${form.area || "未填"}`,
    `需求說明：${form.message || "未填"}`,
  ].join("\n")

  function updateForm<Key extends keyof FormState>(field: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [field]: value }))
    setError("")
    idempotencyRef.current = ""
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  async function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submittingRef.current) return
    if (!form.name.trim() || !form.contact.trim()) {
      setError("請填寫姓名與聯絡方式，方便我們回覆。")
      return
    }

    submittingRef.current = true
    setSubmitting(true)
    setError("")

    try {
      idempotencyRef.current ||= globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
      const website = new FormData(event.currentTarget).get("website")
      const response = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyRef.current },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          service_type: form.service,
          area: form.area,
          message: inquiryText,
          source: "xinjiang-website",
          website,
        }),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) {
        setResult(data.notified ? "notified-only" : "fallback")
        return
      }
      setResult(data.notified ? "stored" : "stored-only")
      idempotencyRef.current = ""
    } catch {
      setResult("fallback")
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  function resetInquiry() {
    setForm(initialForm)
    setResult("")
    setError("")
    idempotencyRef.current = ""
  }

  return (
    <section id="inquiry" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <SectionTitle
            eyebrow="Inquiry"
            title="線上詢價"
            text="填寫工程需求，我們整理後主動與你聯絡；急件可直接撥打電話。"
          />
          <div className="mt-8 grid gap-3">
            {[
              ["01", "填寫需求", "地點、項目與現場狀況。"],
              ["02", "電話確認", "老師父判斷是否需到場評估。"],
              ["03", "到場評估報價", "看過現場才給實在報價。"],
            ].map(([step, title, text]) => (
              <div key={step} className="flex items-start gap-4 rounded-[1.2rem] border border-[#e5d6be] bg-white/70 p-4">
                <span className="font-mono text-sm font-black text-[#a05c2e]">{step}</span>
                <div>
                  <p className="font-black text-[#2b2118]">{title}</p>
                  <p className="mt-1 text-sm font-semibold text-[#766858]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e5d6be] bg-white p-5 shadow-[0_24px_70px_rgba(58,45,31,0.1)] md:p-7">
          {result ? (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#a05c2e]">
                {result === "stored" ? "Received" : "Please confirm"}
              </p>
              <h3 className="mt-3 text-3xl font-black text-[#2b2118]">
                {result === "stored" ? "需求已送出" : result === "stored-only" ? "需求已保存" : result === "notified-only" ? "通知已寄出" : "還差一步"}
              </h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#766858]">
                {result === "stored"
                  ? `${form.name} 我們已保存需求並寄出通知 會在服務時間內主動聯絡`
                  : result === "stored-only"
                    ? "需求已保存但通知信未寄出 急件請直接來電確認"
                    : result === "notified-only"
                      ? "通知信已寄出但資料未完成保存 我們會以通知內容聯絡你"
                      : "線上收件暫時無法使用 請用下面任一方式直接傳送需求"}
              </p>

              {result === "fallback" || result === "stored-only" ? (
                <div className="mt-5 grid gap-3">
                  <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap rounded-[1.2rem] bg-[#f7efe2] p-4 font-sans text-sm font-semibold leading-6 text-[#5c4d3c]">
                    {inquiryText}
                  </pre>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`sms:${contactInfo.phone}?body=${encodeURIComponent(inquiryText)}`}
                      className="inline-flex min-h-11 items-center rounded-full bg-[#2b2118] px-5 text-sm font-black text-white"
                    >
                      用簡訊傳送
                    </a>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="inline-flex min-h-11 items-center rounded-full bg-[#e8bd6d] px-5 text-sm font-black text-[#2b2118]"
                    >
                      直接撥打 {contactInfo.phoneDisplay}
                    </a>
                    <button
                      type="button"
                      onClick={copyInquiry}
                      className="min-h-11 rounded-full border border-[#d9c6a6] px-5 text-sm font-black text-[#2b2118]"
                    >
                      {copied ? "已複製需求" : "複製需求文字"}
                    </button>
                  </div>
                </div>
              ) : null}

              <button
                type="button"
                onClick={resetInquiry}
                className="mt-6 min-h-11 rounded-full border border-[#d9c6a6] px-5 text-sm font-black text-[#766858]"
              >
                再填一筆需求
              </button>
            </div>
          ) : (
            <form onSubmit={submitInquiry}>
              <label className="absolute left-[-9999px]" aria-hidden="true">網站<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#a05c2e]">Inquiry Form</p>
              <h3 className="mt-3 text-3xl font-black text-[#2b2118]">工程需求表</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#5c4d3c]">姓名 / 稱呼</span>
                  <input
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    placeholder="例如：林先生"
                    className="min-h-12 rounded-[0.9rem] border border-[#dccdb2] bg-[#fdfaf3] px-4 text-sm font-semibold text-[#2b2118] outline-none focus:border-[#a05c2e]"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#5c4d3c]">電話 / LINE</span>
                  <input
                    value={form.contact}
                    onChange={(event) => updateForm("contact", event.target.value)}
                    placeholder="方便聯絡的方式"
                    className="min-h-12 rounded-[0.9rem] border border-[#dccdb2] bg-[#fdfaf3] px-4 text-sm font-semibold text-[#2b2118] outline-none focus:border-[#a05c2e]"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#5c4d3c]">工程項目</span>
                  <select
                    value={form.service}
                    onChange={(event) => updateForm("service", event.target.value)}
                    className="min-h-12 rounded-[0.9rem] border border-[#dccdb2] bg-[#fdfaf3] px-4 text-sm font-semibold text-[#2b2118] outline-none focus:border-[#a05c2e]"
                  >
                    {services.map((service) => (
                      <option key={service.title}>{service.title}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-black text-[#5c4d3c]">施工地區</span>
                  <input
                    value={form.area}
                    onChange={(event) => updateForm("area", event.target.value)}
                    placeholder="例如：屏東市、三地門鄉"
                    className="min-h-12 rounded-[0.9rem] border border-[#dccdb2] bg-[#fdfaf3] px-4 text-sm font-semibold text-[#2b2118] outline-none focus:border-[#a05c2e]"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-black text-[#5c4d3c]">需求說明</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => updateForm("message", event.target.value)}
                    placeholder="例如：浴室磁磚空鼓想修補，大約 2 坪，希望先到場看現場。"
                    className="min-h-28 rounded-[0.9rem] border border-[#dccdb2] bg-[#fdfaf3] px-4 py-3 text-sm font-semibold leading-6 text-[#2b2118] outline-none focus:border-[#a05c2e]"
                  />
                </label>
              </div>

              {error ? <p className="mt-4 text-sm font-black text-[#b3562e]">{error}</p> : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-12 items-center rounded-full bg-[#2b2118] px-6 text-sm font-black text-white disabled:opacity-60"
                >
                  {submitting ? "送出中⋯" : "送出需求"}
                </button>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-[#d9c6a6] px-6 text-sm font-black text-[#2b2118]"
                >
                  急件直接撥 {contactInfo.phoneDisplay}
                </a>
              </div>
              <p className="mt-4 text-xs font-semibold leading-5 text-[#8f7d68]">
                送出後我們會在服務時間內回覆（{contactInfo.hours}）。
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
