import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  buildFlowDemoCases,
  buildFlowStatuses,
  buildFlowStatusProgress,
} from "../data/buildFlowDemoCases"

const statusTone = {
  待整理: "border-slate-300 bg-slate-100 text-slate-700",
  估價中: "border-amber-200 bg-amber-50 text-amber-800",
  施工中: "border-sky-200 bg-sky-50 text-sky-800",
  已完成: "border-emerald-200 bg-emerald-50 text-emerald-800",
}

function BuildFlowDemoSection() {
  const [cases, setCases] = useState(buildFlowDemoCases)
  const [selectedCaseId, setSelectedCaseId] = useState(buildFlowDemoCases[0].id)
  const [keyword, setKeyword] = useState("")
  const [toast, setToast] = useState("")

  const filteredCases = useMemo(() => {
    const query = keyword.trim().toLowerCase()
    if (!query) return cases

    return cases.filter((item) => {
      const searchableText = [
        item.name,
        item.client,
        item.status,
        item.quoteStatus,
        item.notes.join(" "),
        item.timeline.map((entry) => entry.join(" ")).join(" "),
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [cases, keyword])

  const selectedCase =
    filteredCases.find((item) => item.id === selectedCaseId) || filteredCases[0] || cases[0]

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(""), 1800)
    return () => window.clearTimeout(timer)
  }, [toast])

  function updateSelectedStatus(nextStatus) {
    setCases((currentCases) =>
      currentCases.map((item) =>
        item.id === selectedCase.id
          ? {
              ...item,
              status: nextStatus,
              updatedAt: "剛剛更新",
              quoteStatus: statusQuoteText(nextStatus),
            }
          : item
      )
    )
    setToast(`案件已更新為${nextStatus}`)
  }

  return (
    <section id="buildflow-demo" className="border-y border-[#dedbd1] bg-[#eef4f1]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0f766e]">
              BuildFlow Demo
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,7vw,2.25rem)] font-black tracking-tight md:text-4xl">
              LINE 訊息，變成案件
            </h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#5d6863] md:mt-4">
              LINE 報價、業主同意、施工回報、驗收、請款與保固，都同步成後台可追蹤資料。
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-black text-[#40514f] md:mt-5">
              {["LINE 報價", "業主同意", "施工回報", "驗收", "請款", "保固"].map((item, index) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[#0f766e] shadow-sm">{item}</span>
                  {index < 5 ? <span className="text-[#8aa39d]">→</span> : null}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["LINE Bot", "Supabase", "Webhook", "Vercel", "狀態同步"].map((tech) => (
                <span key={tech} className="rounded-md bg-[#172026] px-2.5 py-1 text-xs font-black text-white">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <BuildFlowProductMock />
        </div>

        <div className="mt-5 grid gap-3 rounded-2xl border border-[#d0ddd9] bg-white p-3 shadow-sm sm:grid-cols-[1fr_auto] md:p-4">
          <label className="grid gap-2">
            <span className="text-sm font-black text-[#40514f]">搜尋案件、狀態或備註</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="例如：施工中、防水、照片、報價"
              className="min-h-12 rounded-md border border-[#cbd8d4] bg-white px-4 text-sm font-bold text-[#172026] shadow-sm outline-none placeholder:text-[#8a9692] focus:border-[#0f766e] focus:ring-4 focus:ring-[#0f766e]/10"
            />
          </label>
          <Link
            to="/buildflow"
            className="inline-flex min-h-12 items-center justify-center self-end rounded-md bg-[#172026] px-5 text-sm font-black text-white hover:bg-[#27404a]"
          >
            看 LINE 接單後台
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:mt-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5">
          <div className="grid gap-3">
            {filteredCases.map((item) => (
              <CaseCard
                key={item.id}
                item={item}
                selected={item.id === selectedCase.id}
                onSelect={() => setSelectedCaseId(item.id)}
              />
            ))}

            {!filteredCases.length ? (
              <div className="rounded-lg border border-dashed border-[#bfd0cb] bg-white/72 p-8 text-center">
                <p className="text-lg font-black text-[#172026]">目前沒有符合的工程案件</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#66716d]">
                  換個關鍵字，例如「施工中」、「報價」或「防水」再試試。
                </p>
              </div>
            ) : null}
          </div>

          {filteredCases.length ? (
            <CaseDetail item={selectedCase} onStatusChange={updateSelectedStatus} />
          ) : (
            <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-[#bfd0cb] bg-white/72 p-8 text-center">
              <div>
                <p className="text-lg font-black text-[#172026]">沒有可顯示的案件詳情</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#66716d]">
                  清除搜尋或改用其他關鍵字後，這裡會重新顯示案件時間軸、照片與備註。
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#d0ddd9] bg-white p-5 shadow-sm">
          <p className="max-w-2xl text-sm font-bold leading-7 text-[#5d6863]">
            這種 Demo 可以依照不同產業調整欄位，例如維修紀錄、客戶追蹤、庫存、訂單或報價管理。
          </p>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#f0c36a] px-5 text-sm font-black text-[#172026] hover:bg-[#ffd785]"
          >
            我也想整理工程資料
          </a>
        </div>

        {toast ? (
          <div className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-sm rounded-lg border border-emerald-200 bg-white p-4 text-sm font-black text-emerald-800 shadow-xl">
            {toast}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function BuildFlowProductMock() {
  const flow = ["報價", "同意", "回報", "驗收", "請款", "保固"]

  return (
    <div className="rounded-[1.35rem] border border-[#172026] bg-[#172026] p-2.5 shadow-xl shadow-[#0f766e]/10">
      <div className="grid gap-3 rounded-[1rem] bg-[#f8f7f2] p-3 text-[#172026]">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#dedbd1] bg-white px-3 py-3">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-[#0f766e]">
              BuildFlow Sync
            </p>
            <p className="mt-1 text-sm font-black">q-001 屋頂防水工程</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">
            Supabase synced
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_0.9fr]">
          <div className="rounded-xl border border-[#dedbd1] bg-white p-3">
            <div className="flex items-center justify-between text-xs font-black text-[#66716d]">
              <span>案件進度</span>
              <span>75%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#dfe7e3]">
              <div className="h-full w-3/4 rounded-full bg-[#0f766e]" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <MockStat label="狀態" value="施工中" />
              <MockStat label="來源" value="LINE Bot" />
            </div>
          </div>

          <div className="rounded-xl border border-[#dedbd1] bg-white p-3">
            <p className="text-xs font-black text-[#0f766e]">Timeline</p>
            <div className="mt-2 grid gap-2 text-xs font-bold text-[#40514f]">
              <p>09:12 報價單已查看</p>
              <p>10:40 業主已同意</p>
              <p>17:30 每日施工回報</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {flow.map((item) => (
            <span key={item} className="shrink-0 rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#135e56]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MockStat({ label, value }) {
  return (
    <div className="rounded-lg bg-[#f8f7f2] px-3 py-2">
      <p className="text-[0.65rem] font-black text-[#66716d]">{label}</p>
      <p className="mt-1 text-xs font-black text-[#172026]">{value}</p>
    </div>
  )
}

function CaseCard({ item, selected, onSelect }) {
  const progress = buildFlowStatusProgress[item.status]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-lg border bg-white p-4 text-left shadow-sm hover:-translate-y-0.5 hover:shadow-md ${
        selected ? "border-[#0f766e] ring-4 ring-[#0f766e]/10" : "border-[#d8d4c8]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-[#172026]">{item.name}</h3>
          <p className="mt-1 text-sm font-bold text-[#66716d]">{item.client}</p>
        </div>
        <StatusPill status={item.status} />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-black text-[#66716d]">
          <span>整理進度</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e2e8e5]">
          <div
            className="h-full rounded-full bg-[#0f766e] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-black text-[#5d6863]">
        <span>{item.updatedAt}</span>
        <span>{item.photoCount} 張照片</span>
        <span>{item.noteCount} 則備註</span>
      </div>
    </button>
  )
}

function CaseDetail({ item, onStatusChange }) {
  return (
    <article className="rounded-lg border border-[#d8d4c8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e]">
            Selected Case
          </p>
          <h3 className="mt-2 text-2xl font-black text-[#172026]">{item.name}</h3>
          <p className="mt-1 text-sm font-bold text-[#66716d]">{item.client}</p>
        </div>
        <StatusPill status={item.status} />
      </div>

      <div className="mt-5 rounded-lg border border-[#dce4e1] bg-[#f7faf8] p-4">
        <div className="flex items-center justify-between text-sm font-black text-[#40514f]">
          <span>報價狀態</span>
          <span>{buildFlowStatusProgress[item.status]}%</span>
        </div>
        <p className="mt-2 text-sm font-bold leading-7 text-[#5d6863]">{item.quoteStatus}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e2e8e5]">
          <div
            className="h-full rounded-full bg-[#f0c36a] transition-all duration-500"
            style={{ width: `${buildFlowStatusProgress[item.status]}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-[#40514f]">切換案件狀態</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {buildFlowStatuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onStatusChange(status)}
              className={`min-h-10 rounded-md border px-3 text-sm font-black ${
                item.status === status
                  ? "border-[#172026] bg-[#172026] text-white"
                  : "border-[#d1d8d5] bg-white text-[#40514f] hover:bg-[#eef4f1]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black text-[#40514f]">工程照片</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="grid aspect-square place-items-center rounded-md border border-[#dce4e1] bg-[#edf3f1] text-xs font-black text-[#78908a]"
              >
                Photo {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-[#40514f]">時間軸</p>
          <div className="mt-3 grid gap-3">
            {item.timeline.map(([time, text]) => (
              <div key={`${time}-${text}`} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <span className="text-xs font-black text-[#0f766e]">{time}</span>
                <p className="border-l border-[#dce4e1] pl-3 text-sm font-bold leading-6 text-[#5d6863]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-black text-[#40514f]">備註內容</p>
        <div className="mt-3 grid gap-2">
          {item.notes.map((note) => (
            <p
              key={note}
              className="rounded-md border border-[#dce4e1] bg-[#f7faf8] p-3 text-sm font-bold leading-7 text-[#5d6863]"
            >
              {note}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-black ${
        statusTone[status] || statusTone.待整理
      }`}
    >
      {status}
    </span>
  )
}

function statusQuoteText(status) {
  if (status === "待整理") return "資料剛匯入，等待整理 LINE 照片與備註"
  if (status === "估價中") return "報價草稿建立中，等待確認材料與數量"
  if (status === "施工中") return "已轉為施工案件，正在追蹤現場回報"
  return "案件已完成，照片、報價與保固備註已歸檔"
}

export default BuildFlowDemoSection
