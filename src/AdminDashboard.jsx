import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "./auth"
import {
  contactRequestStatuses,
  getStatusLabel,
  listContactRequests,
  updateContactRequest,
} from "./lib/contactRequests"

const adminProjects = [
  {
    name: "Contractor Site",
    title: "工程案例前台 Demo",
    path: "/contractor-site",
    status: "Website",
    summary: "給客戶填需求、看案例、留下聯絡資料。",
    checks: ["工程照片", "需求表單", "估價摘要"],
  },
  {
    name: "BuildFlow",
    title: "工程資料管理 Demo",
    path: "/buildflow",
    status: "System",
    summary: "案件、報價、發包、任務回報集中管理。",
    checks: ["角色登入", "報價單", "LINE 回報"],
  },
]

const verificationFlow = ["收需求", "建案件", "出報價", "派師傅", "回報完成"]

function AdminDashboard() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [requests, setRequests] = useState([])
  const [requestStatusFilter, setRequestStatusFilter] = useState("all")
  const [requestKeyword, setRequestKeyword] = useState("")
  const [requestMessage, setRequestMessage] = useState("")
  const [loadingRequests, setLoadingRequests] = useState(true)

  const filteredRequests = useMemo(() => {
    const keyword = requestKeyword.trim().toLowerCase()

    return requests.filter((item) => {
      const matchStatus = requestStatusFilter === "all" || item.status === requestStatusFilter
      const matchKeyword =
        !keyword ||
        [
          item.name,
          item.contact,
          item.company,
          item.service_type,
          item.budget_range,
          item.message,
          item.admin_note,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword)

      return matchStatus && matchKeyword
    })
  }, [requests, requestStatusFilter, requestKeyword])

  const requestCounts = useMemo(
    () =>
      contactRequestStatuses.map((status) => ({
        ...status,
        count: requests.filter((item) => item.status === status.value).length,
      })),
    [requests]
  )

  function handleLogout() {
    logout()
    navigate("/")
  }

  async function loadRequests() {
    setRequestMessage("")
    const result = await listContactRequests()
    setLoadingRequests(false)
    setRequests(result.data)
    setRequestMessage(result.mode === "local" ? result.reason : result.ok ? "" : result.reason)
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadRequests()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  async function handleRequestUpdate(requestId, values) {
    const result = await updateContactRequest(requestId, values)
    if (!result.ok) {
      setRequestMessage(result.reason)
      return
    }

    setRequests((current) =>
      current.map((item) => (item.id === requestId ? { ...item, ...values } : item))
    )
    setRequestMessage("需求狀態已更新。")
  }

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-[#12212a]">
      <header className="border-b border-[#ded8cc] bg-[#f6f3ec]/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-sm font-black text-[#1d6f65]">Qingyu Web Studio 管理入口</p>
            <p className="text-xs font-bold text-[#61706d]">
              {user?.name || "Admin"} / {user?.role || "admin"}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/engineering"
              className="rounded-md border border-[#c8c0b3] px-4 py-2 text-sm font-black text-[#12212a]"
            >
              回首頁
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-[#123f4a] px-4 py-2 text-sm font-black text-white"
            >
              登出
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">
              Work Flow
            </p>
            <h1 className="mt-4 max-w-xl text-3xl font-black leading-tight md:text-5xl">
              一條工程流程，兩個入口。
            </h1>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#5b6966]">
              前台收需求，後台管案件。先看流程，再進系統操作。
            </p>
          </div>

          <div className="grid gap-2 rounded-md border border-[#d9d1c4] bg-white p-3 sm:grid-cols-5">
            {verificationFlow.map((item, index) => (
              <div key={item} className="rounded-md bg-[#f3f0e8] p-4">
                <p className="font-mono text-xs font-black text-[#1d6f65]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {adminProjects.map((project) => (
            <article key={project.name} className="rounded-md border border-[#d9d1c4] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#1d6f65]">{project.title}</p>
                  <h2 className="mt-2 text-2xl font-black">{project.name}</h2>
                </div>

                <span className="rounded-full border border-[#d9d1c4] px-3 py-1 text-xs font-black text-[#61706d]">
                  {project.status}
                </span>
              </div>

              <p className="mt-5 text-sm font-bold leading-6 text-[#5b6966]">{project.summary}</p>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {project.checks.map((check) => (
                  <div key={check} className="rounded-md bg-[#f3f0e8] px-3 py-2 text-sm font-bold">
                    {check}
                  </div>
                ))}
              </div>

              <Link
                to={project.path}
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#123f4a] px-5 text-sm font-black text-white"
              >
                打開
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-md border border-[#d9d1c4] bg-white p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1d6f65]">
                Contact Requests
              </p>
              <h2 className="mt-2 text-2xl font-black">接案需求列表</h2>
              <p className="mt-2 text-sm font-bold leading-6 text-[#5b6966]">
                前台表單送出後會進到這裡，先用最小狀態管理追蹤每一筆需求。
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={loadRequests}
                className="rounded-full border border-[#d9d1c4] px-3 py-2 text-xs font-black text-[#61706d]"
              >
                重新整理
              </button>
              <button
                type="button"
                onClick={() => setRequestStatusFilter("all")}
                className={`rounded-full px-3 py-2 text-xs font-black ${
                  requestStatusFilter === "all"
                    ? "bg-[#123f4a] text-white"
                    : "border border-[#d9d1c4] text-[#61706d]"
                }`}
              >
                全部
              </button>
              {contactRequestStatuses.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setRequestStatusFilter(status.value)}
                  className={`rounded-full px-3 py-2 text-xs font-black ${
                    requestStatusFilter === status.value
                      ? "bg-[#123f4a] text-white"
                      : "border border-[#d9d1c4] text-[#61706d]"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
            <input
              value={requestKeyword}
              onChange={(event) => setRequestKeyword(event.target.value)}
              placeholder="搜尋姓名、聯絡方式、方案、留言或管理備註"
              className="min-h-11 rounded-md border border-[#c8c0b3] bg-white px-4 text-sm font-bold text-[#12212a] outline-none focus:border-[#123f4a]"
            />
            <p className="rounded-md bg-[#f3f0e8] px-4 py-3 text-sm font-black text-[#61706d]">
              顯示 {filteredRequests.length} / {requests.length} 筆
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {requestCounts.map((status) => (
              <div key={status.value} className="rounded-md bg-[#f3f0e8] p-4">
                <p className="text-xs font-black text-[#61706d]">{status.label}</p>
                <p className="mt-2 text-2xl font-black">{status.count}</p>
              </div>
            ))}
          </div>

          {requestMessage ? (
            <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-900">
              {requestMessage}
            </p>
          ) : null}

          <div className="mt-5 grid gap-3">
            {loadingRequests ? (
              <p className="rounded-md bg-[#f3f0e8] p-4 text-sm font-bold text-[#61706d]">
                載入需求中...
              </p>
            ) : null}

            {!loadingRequests && !filteredRequests.length ? (
              <p className="rounded-md border border-dashed border-[#d9d1c4] p-6 text-center text-sm font-bold text-[#61706d]">
                目前沒有符合的接案需求。
              </p>
            ) : null}

            {filteredRequests.map((request) => (
              <article key={request.id} className="rounded-md border border-[#e1dccf] bg-[#fbfaf6] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black">{request.name}</h3>
                      <span className="rounded-full bg-[#e9f4ef] px-3 py-1 text-xs font-black text-[#1d6f65]">
                        {getStatusLabel(request.status)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-bold text-[#61706d]">{request.contact}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#5b6966]">
                      {request.company ? `${request.company} / ` : ""}
                      {request.service_type || "未填服務類型"} / {request.budget_range || "未填預算"}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#8a8172]">
                      來源：{request.source || "website"} / 建立：
                      {formatRequestDate(request.created_at)}
                    </p>
                  </div>

                  <select
                    value={request.status}
                    onChange={(event) =>
                      handleRequestUpdate(request.id, { status: event.target.value })
                    }
                    className="rounded-md border border-[#c8c0b3] bg-white px-3 py-2 text-sm font-black text-[#12212a]"
                  >
                    {contactRequestStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="mt-4 whitespace-pre-wrap rounded-md bg-white p-3 text-sm font-bold leading-7 text-[#5b6966]">
                  {request.message || "沒有留言內容"}
                </p>

                <label className="mt-4 grid gap-2">
                  <span className="text-sm font-black text-[#61706d]">管理備註</span>
                  <textarea
                    defaultValue={request.admin_note || ""}
                    onBlur={(event) =>
                      handleRequestUpdate(request.id, { admin_note: event.target.value })
                    }
                    className="min-h-24 rounded-md border border-[#c8c0b3] bg-white px-3 py-2 text-sm font-bold leading-6 text-[#12212a] outline-none focus:border-[#123f4a]"
                    placeholder="例如：已加 LINE、等待照片、下週回覆..."
                  />
                </label>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

function formatRequestDate(value) {
  if (!value) return "未知"
  return new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value))
}

export default AdminDashboard
