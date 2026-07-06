import { useEffect, useState } from "react"

import {
  contactRequestStatuses,
  getStatusLabel,
  listContactRequests,
  updateContactRequest,
} from "../../lib/contactRequests"

function formatLeadTime(value) {
  if (!value) return "時間未知"
  try {
    return new Date(value).toLocaleString("zh-TW", { hour12: false })
  } catch {
    return value
  }
}

function statusTone(status) {
  if (status === "closed") return "bg-slate-100 text-slate-500"
  if (status === "contacted") return "bg-emerald-50 text-emerald-700"
  if (status === "reviewing") return "bg-amber-50 text-amber-700"
  return "bg-sky-50 text-sky-700"
}

function LeadsPanel({ createProjectFromLead }) {
  const [leads, setLeads] = useState([])
  const [sourceNote, setSourceNote] = useState("")
  const [loading, setLoading] = useState(true)

  async function loadLeads() {
    const result = await listContactRequests()
    setLeads(result.data || [])
    setSourceNote(
      result.mode === "local"
        ? "資料來源：本機瀏覽器（部署 Supabase 後自動改讀後端）"
        : "資料來源：Supabase"
    )
    setLoading(false)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadLeads()
    }, 0)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function changeStatus(lead, status) {
    await updateContactRequest(lead.id, { status })
    await loadLeads()
  }

  async function convertLead(lead) {
    createProjectFromLead(lead)
    await updateContactRequest(lead.id, { status: "contacted" })
    await loadLeads()
  }

  const newCount = leads.filter((lead) => lead.status === "new").length

  return (
    <div className="grid gap-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Website Leads</p>
            <h2 className="mt-1 text-2xl font-black">網站詢價收件匣</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
              前台詢價表單（工程接案頁、聯絡頁）送出後會進到這裡，可直接轉成案件開始追蹤。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {newCount > 0 ? (
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700">
                {newCount} 筆新需求
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => void loadLeads()}
              className="min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-black text-slate-700 hover:bg-slate-100"
            >
              重新整理
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs font-bold text-slate-400">{sourceNote}</p>
      </section>

      {loading ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm font-black text-slate-400">
          載入中⋯
        </section>
      ) : leads.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-lg font-black text-slate-700">目前沒有網站詢價</p>
          <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
            到前台的工程接案頁送出一筆詢價表單，回到這裡就會看到需求進來。
          </p>
          <a
            href="/contractor-site#inquiry"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-slate-950 px-5 text-sm font-black text-white"
          >
            打開前台詢價表單
          </a>
        </section>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <section key={lead.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black">{lead.name || "未填姓名"}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(lead.status)}`}>
                      {getStatusLabel(lead.status)}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                      {lead.source || "網站"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-slate-400">{formatLeadTime(lead.created_at)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={lead.status}
                    onChange={(event) => void changeStatus(lead, event.target.value)}
                    className="min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-black text-slate-700"
                  >
                    {contactRequestStatuses.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => void convertLead(lead)}
                    className="min-h-10 rounded-xl bg-emerald-600 px-4 text-sm font-black text-white hover:bg-emerald-500"
                  >
                    轉為案件
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600 md:grid-cols-3">
                <p>
                  <span className="text-slate-400">聯絡：</span>
                  {lead.contact || "未填"}
                </p>
                <p>
                  <span className="text-slate-400">項目：</span>
                  {lead.service_type || "未填"}
                </p>
                <p>
                  <span className="text-slate-400">預算：</span>
                  {lead.budget_range || "未填"}
                </p>
              </div>

              {lead.message ? (
                <pre className="mt-3 max-h-44 overflow-y-auto whitespace-pre-wrap rounded-xl bg-slate-50 p-4 font-sans text-sm font-bold leading-6 text-slate-600">
                  {lead.message}
                </pre>
              ) : null}
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

export default LeadsPanel
