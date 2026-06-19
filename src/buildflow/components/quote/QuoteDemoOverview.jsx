const flowSteps = [
  { id: "quote_view_pdf", label: "報價查看", status: "已查看報價" },
  { id: "quote_approved", label: "業主同意", status: "業主已同意" },
  { id: "quote_convert_project", label: "轉正式案件", status: "待排施工" },
  { id: "schedule_construction", label: "安排施工日", status: "已排施工" },
  { id: "pre_construction_ready", label: "施工前準備", status: "施工前準備完成" },
  { id: "start_construction", label: "開始施工", status: "施工中" },
  { id: "construction_daily_report", label: "每日回報", status: "施工中" },
  { id: "completion_acceptance", label: "完工試水", status: "待驗收" },
  { id: "notify_acceptance", label: "通知驗收", status: "已通知業主" },
  { id: "acceptance_confirmed", label: "業主驗收", status: "已驗收" },
  { id: "create_payment_request", label: "請款", status: "待請款" },
  { id: "payment_confirmed", label: "付款確認", status: "已結案" },
  { id: "warranty", label: "結案保固", status: "保固中" },
]

const lineScriptSteps = [
  "想看 PDF",
  "同意",
  "每日回報 q-001",
  "完工試水",
  "驗收通過",
]

const buildFlowScriptSteps = [
  "轉正式案件",
  "安排施工日",
  "完成施工前準備",
  "開始施工",
  "通知業主驗收",
  "建立請款紀錄",
  "確認已付款",
]

function QuoteDemoOverview({ quoteStatus, isVisible = true }) {
  if (!isVisible) return null

  const hasQuoteStatus = Boolean(quoteStatus)
  const actionTypes = new Set((quoteStatus?.actions || []).map((action) => action.actionType))
  const currentIndex = getCurrentFlowIndex(quoteStatus, actionTypes)
  const latestAction = quoteStatus?.actions?.[0]

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">Flow Overview</p>
          <h2 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">BuildFlow Demo 流程總覽</h2>
          <p className="mt-2 max-w-4xl text-sm font-bold leading-7 text-slate-500">
            這裡把 LINE 報價、施工回報、完工驗收、請款與保固整理成一條可展示的案件流程，讓訪客快速看懂 BuildFlow 如何把 LINE 訊息轉成後台資料。
          </p>
        </div>
        <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
          q-001 屋頂防水工程
        </span>
      </div>

      {!hasQuoteStatus ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-bold leading-7 text-slate-500">
          目前尚無 q-001 同步資料。請先在 Supabase SQL Editor 執行 `supabase/seed_buildflow_demo.sql`。
        </div>
      ) : (
        <>
          <div className="mt-5 overflow-x-auto pb-2">
            <div className="grid min-w-[980px] grid-flow-col auto-cols-[minmax(132px,1fr)] gap-2">
              {flowSteps.map((step, index) => {
                const state = getFlowState(index, currentIndex, step.id, actionTypes, quoteStatus)
                return <FlowNode key={step.id} index={index} step={step} state={state} />
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-950">目前 Demo 狀態</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InfoLine label="目前案件" value={quoteStatus.projectName || "q-001 屋頂防水工程"} />
                <InfoLine label="目前狀態" value={quoteStatus.projectStatus || quoteStatus.status || "尚未同步"} />
                <InfoLine label="目前進度" value={`${getProgressByStatus(quoteStatus.projectStatus || quoteStatus.status)}%`} />
                <InfoLine label="最近 LINE 訊息" value={quoteStatus.latestMessage || "尚無 LINE 訊息內容"} />
                <InfoLine label="最近同步動作" value={latestAction?.label || quoteStatus.status || "尚無同步紀錄"} />
                <InfoLine label="下一步建議" value={quoteStatus.nextStep || "等待下一個 Demo 動作"} />
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="text-sm font-black text-slate-950">重置 Demo 指引</p>
              <p className="mt-2 text-sm font-bold leading-7 text-slate-600">
                若要重新展示，建議到 Supabase 清除 q-001 測試資料，或使用新的 quoteId。
              </p>
            </div>
          </div>
        </>
      )}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ScriptCard title="Demo Guide｜LINE" steps={lineScriptSteps} />
        <ScriptCard title="Demo Guide｜後台" steps={buildFlowScriptSteps} />
      </div>
    </section>
  )
}

function FlowNode({ index, step, state }) {
  const tone = {
    done: "border-emerald-200 bg-emerald-50 text-emerald-800",
    current: "border-amber-200 bg-amber-50 text-amber-800",
    pending: "border-slate-200 bg-slate-50 text-slate-500",
  }[state]

  const label = {
    done: "已完成",
    current: "進行中",
    pending: "尚未開始",
  }[state]

  return (
    <div className={`rounded-xl border p-3 ${tone}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black">
          {index + 1}
        </span>
        <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-black">{label}</span>
      </div>
      <p className="mt-3 text-sm font-black">{step.label}</p>
      <p className="mt-1 text-xs font-bold leading-5 opacity-80">{step.status}</p>
    </div>
  )
}

function ScriptCard({ title, steps }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-black text-slate-950">{title}</p>
      <ol className="mt-3 grid gap-2">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 text-sm font-bold leading-6 text-slate-600">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-slate-950">
              {index + 1}
            </span>
            <span className="break-words">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function InfoLine({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-2 break-words text-sm font-black leading-6 text-slate-800">{value}</p>
    </div>
  )
}

function getCurrentFlowIndex(quoteStatus, actionTypes) {
  if (!quoteStatus) return -1
  if (quoteStatus.warranty || quoteStatus.projectStatus === "已結案") return 12

  const latestActionType = quoteStatus.actionType || quoteStatus.actions?.[0]?.actionType
  const latestActionIndex = flowSteps.findIndex((step) => step.id === latestActionType)
  if (latestActionIndex >= 0) return latestActionIndex

  const statusIndexMap = {
    已查看報價: 0,
    業主已同意: 1,
    待排施工: 2,
    已排施工: 3,
    施工前準備完成: 4,
    施工中: actionTypes.has("construction_daily_report") ? 6 : 5,
    待驗收: 7,
    已通知業主驗收: 8,
    已驗收: 9,
    待請款: 10,
    已結案: 12,
    保固中: 12,
  }

  return statusIndexMap[quoteStatus.projectStatus] ?? statusIndexMap[quoteStatus.status] ?? -1
}

function getFlowState(index, currentIndex, stepId, actionTypes, quoteStatus) {
  if (stepId === "warranty" && quoteStatus?.warranty) return "done"
  if (actionTypes.has(stepId)) return index === currentIndex ? "current" : "done"
  if (index < currentIndex) return "done"
  if (index === currentIndex) return "current"
  return "pending"
}

function getProgressByStatus(status = "") {
  const progressMap = {
    已查看報價: 45,
    業主已同意: 55,
    待排施工: 65,
    已排施工: 70,
    施工前準備完成: 72,
    施工中: 75,
    待驗收: 90,
    已驗收: 95,
    待請款: 97,
    已結案: 100,
    保固中: 100,
  }

  return progressMap[status] || 0
}

export default QuoteDemoOverview
