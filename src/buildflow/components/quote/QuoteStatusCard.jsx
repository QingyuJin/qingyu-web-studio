import { useState } from "react"

const quoteItems = [
  {
    category: "防水",
    name: "屋頂防水底層處理",
    spec: "18 坪",
    amount: 39600,
  },
  {
    category: "泥作",
    name: "女兒牆補強",
    spec: "12 米",
    amount: 10800,
  },
  {
    category: "管理",
    name: "完工清潔拍照",
    spec: "1 式",
    amount: 3500,
  },
]

const flowSteps = [
  { key: "sent", label: "報價單已送出" },
  { key: "viewed", label: "業主查看 PDF" },
  { key: "decision", label: "業主同意 / 業主要求修改" },
  { key: "next", label: "下一步處理" },
]

const preConstructionItems = [
  "確認施工日",
  "確認師傅",
  "確認材料",
  "確認現場照片",
  "通知業主進場時間",
]

function QuoteStatusCard({
  quoteStatus,
  isVisible = true,
  isConverting = false,
  isScheduling = false,
  isCompletingPreConstruction = false,
  isStartingConstruction = false,
  isNotifyingAcceptance = false,
  isCreatingPaymentRequest = false,
  isConfirmingPayment = false,
  onConvertToProject,
  onScheduleConstruction,
  onPreConstructionToggle,
  onCompletePreConstruction,
  onStartConstruction,
  onNotifyAcceptance,
  onCreatePaymentRequest,
  onConfirmPayment,
}) {
  const [scheduledDate, setScheduledDate] = useState("")
  const [checkedItems, setCheckedItems] = useState({})

  if (!isVisible) return null

  const hasQuoteStatus = Boolean(quoteStatus)
  const currentActionType = quoteStatus?.actionType || quoteStatus?.actions?.[0]?.actionType || ""
  const activeStepIndex = getActiveStepIndex(currentActionType)
  const canConvertToProject = currentActionType === "quote_approved"
  const canScheduleConstruction = quoteStatus?.projectStatus === "待排施工"
  const canPrepareConstruction = quoteStatus?.projectStatus === "已排施工"
  const canStartConstruction = quoteStatus?.projectStatus === "施工前準備完成"
  const canNotifyAcceptance = quoteStatus?.projectStatus === "待驗收" && currentActionType !== "notify_acceptance"
  const canCreatePaymentRequest = quoteStatus?.projectStatus === "已驗收" && currentActionType !== "create_payment_request"
  const canConfirmPayment = quoteStatus?.projectStatus === "待請款"
  const isPreConstructionComplete = preConstructionItems.every((item) => checkedItems[item])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">Quote Status</p>
          <h2 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">報價狀態卡片</h2>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-slate-500">
            這張卡片會讀取 LINE Bot 報價流程同步到 BuildFlow 的紀錄，讓老闆看得出報價單是否已查看、業主是否同意，以及下一步能不能轉正式案件。
          </p>
        </div>

        <span
          className={`w-fit rounded-full border px-3 py-2 text-xs font-black ${
            quoteStatus?.badgeTone || "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {quoteStatus?.badge || "尚無紀錄"}
        </span>
      </div>

      {!hasQuoteStatus ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-bold leading-7 text-slate-500">
          目前尚無報價同步紀錄，請先在 LINE Bot 輸入「想看 PDF」或「同意」。
        </div>
      ) : (
        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <InfoBlock label="報價單編號" value={quoteStatus.quoteId || "q-001"} />
              <InfoBlock label="報價金額" value={formatCurrency(quoteStatus.amount || 53900)} />
              <InfoBlock label="狀態" value={quoteStatus.status} />
              <InfoBlock label="下一步" value={quoteStatus.nextStep} />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-black text-slate-950">最近 LINE 訊息</p>
                  <p className="mt-1 break-words text-sm font-bold leading-6 text-slate-500">
                    {quoteStatus.latestMessage}
                  </p>
                </div>
                <p className="shrink-0 text-xs font-black text-slate-400">
                  {formatDateTime(quoteStatus.syncedAt)}
                </p>
              </div>
              <p className="mt-3 text-xs font-black text-slate-500">
                對應案件：{quoteStatus.projectName || "q-001 屋頂防水工程"}
              </p>
              {quoteStatus.scheduledDate && (
                <p className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">
                  施工日：{quoteStatus.scheduledDate}
                </p>
              )}
              <div className="mt-4">
                {canConvertToProject ? (
                  <button
                    type="button"
                    onClick={onConvertToProject}
                    disabled={isConverting}
                    className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                  >
                    {isConverting ? "轉換中..." : "轉正式案件"}
                  </button>
                ) : canScheduleConstruction ? (
                  <div className="grid gap-2 sm:grid-cols-[minmax(0,220px)_auto]">
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(event) => setScheduledDate(event.target.value)}
                      className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    />
                    <button
                      type="button"
                      onClick={() => onScheduleConstruction?.(scheduledDate)}
                      disabled={isScheduling}
                      className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {isScheduling ? "安排中..." : "安排施工日"}
                    </button>
                  </div>
                ) : canStartConstruction ? (
                  <button
                    type="button"
                    onClick={onStartConstruction}
                    disabled={isStartingConstruction}
                    className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                  >
                    {isStartingConstruction ? "更新中..." : "開始施工"}
                  </button>
                ) : canNotifyAcceptance ? (
                  <button
                    type="button"
                    onClick={onNotifyAcceptance}
                    disabled={isNotifyingAcceptance}
                    className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                  >
                    {isNotifyingAcceptance ? "更新中..." : "通知業主驗收"}
                  </button>
                ) : canCreatePaymentRequest ? (
                  <button
                    type="button"
                    onClick={onCreatePaymentRequest}
                    disabled={isCreatingPaymentRequest}
                    className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                  >
                    {isCreatingPaymentRequest ? "建立中..." : "建立請款紀錄"}
                  </button>
                ) : canConfirmPayment ? (
                  <button
                    type="button"
                    onClick={onConfirmPayment}
                    disabled={isConfirmingPayment}
                    className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                  >
                    {isConfirmingPayment ? "確認中..." : "確認已付款"}
                  </button>
                ) : (
                  <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600">
                    {getActionHint(currentActionType)}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-black text-slate-950">q-001 報價項目</p>
              <div className="mt-3 grid gap-2">
                {quoteItems.map((item) => (
                  <div
                    key={item.name}
                    className="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-600 sm:grid-cols-[80px_minmax(0,1fr)_72px_110px]"
                  >
                    <span className="text-slate-950">{item.category}</span>
                    <span className="break-words">{item.name}</span>
                    <span>{item.spec}</span>
                    <span className="font-black text-slate-950 sm:text-right">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-sm font-black text-slate-950">
                <span>總計</span>
                <span>{formatCurrency(53900)}</span>
              </div>
            </div>

            {quoteStatus.dailyReport && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-emerald-700">
                      Daily Report
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">最近每日施工回報</h3>
                  </div>
                  <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                    {formatReportDate(quoteStatus.dailyReport.date)}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoBlock
                    label="出工人數"
                    value={quoteStatus.dailyReport.workerCount ? `${quoteStatus.dailyReport.workerCount} 人` : "未填"}
                  />
                  <InfoBlock label="照片狀態" value={quoteStatus.dailyReport.photoStatus || "未提到照片"} />
                  <InfoBlock label="今日施工" value={quoteStatus.dailyReport.workSummary || "未填"} />
                  <InfoBlock label="明日預計" value={quoteStatus.dailyReport.nextWork || "未填"} />
                </div>
              </div>
            )}

            {quoteStatus.acceptance && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-amber-700">
                      Acceptance
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">完工驗收 / 試水紀錄</h3>
                  </div>
                  <span className="w-fit rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-black text-amber-700">
                    {quoteStatus.acceptance.status || "待驗收"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoBlock label="驗收狀態" value={quoteStatus.acceptance.status || "待驗收"} />
                  <InfoBlock label="業主確認" value={quoteStatus.acceptance.ownerConfirmed || "待確認"} />
                  <InfoBlock label="試水結果" value={quoteStatus.acceptance.acceptanceResult || "未填"} />
                  <InfoBlock label="試水時間" value={quoteStatus.acceptance.testDuration || "未填"} />
                  <InfoBlock label="完工照片" value={quoteStatus.acceptance.photoStatus || "未提到照片"} />
                </div>
                <p className="mt-3 rounded-xl border border-amber-100 bg-white px-4 py-3 text-sm font-black text-slate-700">
                  下一步：{quoteStatus.acceptance.nextStep || "通知業主驗收"}
                </p>
              </div>
            )}

            {quoteStatus.payment && (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-slate-500">
                      Payment
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">請款紀錄</h3>
                  </div>
                  <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                    {quoteStatus.payment.status || "待請款"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoBlock label="請款金額" value={formatCurrency(quoteStatus.payment.amount || 53900)} />
                  <InfoBlock label="狀態" value={quoteStatus.payment.status || "待請款"} />
                  <InfoBlock label="下一步" value={quoteStatus.payment.nextStep || "等待付款確認"} />
                </div>
              </div>
            )}

            {quoteStatus.warranty && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-emerald-700">
                      Warranty
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">保固紀錄</h3>
                  </div>
                  <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-black text-emerald-700">
                    案件已進入保固期
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoBlock label="保固狀態" value={quoteStatus.warranty.status || "保固中"} />
                  <InfoBlock label="保固項目" value={quoteStatus.warranty.item || "屋頂防水"} />
                  <InfoBlock label="保固起算" value={quoteStatus.warranty.startDate || "今日"} />
                  <InfoBlock label="保固期限" value={quoteStatus.warranty.period || "一年"} />
                  <InfoBlock label="到期日" value={quoteStatus.warranty.expiresAt || "尚未同步"} />
                  <InfoBlock label="備註" value={quoteStatus.warranty.note || "保固範圍依報價單與施工紀錄為準"} />
                </div>
              </div>
            )}

            {canPrepareConstruction && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-normal text-emerald-700">
                      Pre-construction
                    </p>
                    <h3 className="mt-1 text-lg font-black text-slate-950">施工前準備</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
                      案件：q-001 屋頂防水工程
                      <br />
                      施工日：{quoteStatus.scheduledDate || "尚未同步"}
                      <br />
                      目前狀態：已排施工，下一步：施工前準備
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-black text-emerald-700">
                    待確認
                  </span>
                </div>

                <div className="mt-4 grid gap-2">
                  {preConstructionItems.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-3 py-3 text-sm font-black text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(checkedItems[item])}
                        onChange={(event) => {
                          const nextChecked = event.target.checked
                          setCheckedItems((current) => ({ ...current, [item]: nextChecked }))
                          onPreConstructionToggle?.(item, nextChecked)
                        }}
                        className="size-4 accent-emerald-600"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>

                {isPreConstructionComplete ? (
                  <button
                    type="button"
                    onClick={() => onCompletePreConstruction?.(preConstructionItems)}
                    disabled={isCompletingPreConstruction}
                    className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                  >
                    {isCompletingPreConstruction ? "更新中..." : "標記為施工前準備完成"}
                  </button>
                ) : (
                  <p className="mt-4 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-600">
                    全部準備項目完成後，才能標記施工前準備完成。
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-black text-slate-950">報價流程 Timeline</p>
            <div className="mt-4 grid gap-3">
              {flowSteps.map((step, index) => (
                <div key={step.key} className="flex gap-3">
                  <span
                    className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
                      index <= activeStepIndex
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-950">{step.label}</p>
                    <p className="mt-1 text-xs font-bold leading-5 text-slate-500">
                      {getStepDescription(step.key, quoteStatus)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {quoteStatus.actions?.length > 0 && (
              <div className="mt-5 rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-black text-slate-400">最近同步紀錄</p>
                <div className="mt-2 grid gap-2">
                  {quoteStatus.actions.slice(0, 3).map((action) => (
                    <div key={action.id} className="text-xs font-bold leading-5 text-slate-600">
                      <span className="font-black text-slate-950">{formatDateTime(action.time)}</span>
                      <span>｜{action.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-2 break-words text-base font-black text-slate-950">{value || "尚未同步"}</p>
    </div>
  )
}

function getActiveStepIndex(actionType) {
  if (actionType === "payment_confirmed") return 3
  if (actionType === "create_payment_request") return 3
  if (actionType === "notify_acceptance") return 3
  if (actionType === "completion_acceptance") return 3
  if (actionType === "construction_daily_report") return 3
  if (actionType === "start_construction") return 3
  if (actionType === "pre_construction_ready") return 3
  if (actionType === "schedule_construction") return 3
  if (actionType === "quote_convert_project") return 3
  if (actionType === "quote_approved" || actionType === "quote_change_request") return 3
  if (actionType === "quote_view_pdf") return 1
  return 0
}

function getActionHint(actionType) {
  if (actionType === "quote_view_pdf") return "等待業主同意或修改"
  if (actionType === "quote_change_request") return "待修改報價"
  if (actionType === "quote_convert_project") return "已轉正式案件，下一步安排施工日"
  if (actionType === "schedule_construction") return "已安排施工日，下一步施工前準備"
  if (actionType === "pre_construction_ready") return "施工前準備完成，下一步進場施工"
  if (actionType === "start_construction") return "已開始施工，等待每日施工回報"
  if (actionType === "construction_daily_report") return "LINE 每日回報已同步到施工日誌"
  if (actionType === "completion_acceptance") return "完工與試水回報已同步，等待通知業主驗收"
  if (actionType === "notify_acceptance") return "已通知業主驗收，等待業主確認"
  if (actionType === "acceptance_confirmed") return "業主已確認驗收，下一步建立請款紀錄"
  if (actionType === "create_payment_request") return "請款紀錄已建立，等待付款確認"
  if (actionType === "payment_confirmed") return "已確認付款，案件已結案並進入保固"
  return "等待報價流程同步"
}

function getStepDescription(stepKey, quoteStatus) {
  const descriptions = {
    sent: "LineBot 已提供 q-001 報價單內容。",
    viewed: quoteStatus.status === "報價單已查看" ? "業主已要求查看 PDF 報價。" : "等待或已完成業主查看。",
    decision:
      quoteStatus.status === "施工前準備完成"
        ? "施工日、師傅、材料與現場照片已確認。"
        : quoteStatus.status === "已結案"
        ? "工程已驗收並完成付款，案件已進入保固期。"
        : quoteStatus.status === "待請款"
        ? "請款紀錄已建立，等待業主付款確認。"
        : quoteStatus.status === "已驗收"
        ? "業主已確認驗收通過，下一步建立請款紀錄。"
        : quoteStatus.status === "已通知業主驗收"
        ? "已完成後台標記，等待業主確認驗收結果。"
        : quoteStatus.status === "待驗收"
        ? "完工回報與試水紀錄已同步，下一步通知業主驗收。"
        : quoteStatus.status === "施工中"
        ? "案件已進場施工，可持續透過 LINE 同步每日回報。"
        : quoteStatus.status === "已排施工"
        ? `施工日已安排${quoteStatus.scheduledDate ? `：${quoteStatus.scheduledDate}` : ""}。`
        : quoteStatus.status === "已轉正式案件"
        ? "報價已轉正式案件，等待安排施工日。"
        : quoteStatus.status === "業主已同意"
        ? "業主已同意報價，可準備轉正式案件。"
        : quoteStatus.status === "業主要求修改"
          ? "業主要求修改報價，需重新調整內容。"
          : "等待業主同意或提出修改。",
    next: quoteStatus.nextStep,
  }

  return descriptions[stepKey] || ""
}

function formatCurrency(value) {
  return `NT$${Number(value || 0).toLocaleString("zh-TW")}`
}

function formatDateTime(value) {
  if (!value) return "尚未同步"

  try {
    return new Intl.DateTimeFormat("zh-TW", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value))
  } catch {
    return "尚未同步"
  }
}

function formatReportDate(value) {
  if (!value) return "今日"

  try {
    return new Intl.DateTimeFormat("zh-TW", {
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(value))
  } catch {
    return value
  }
}

export default QuoteStatusCard
