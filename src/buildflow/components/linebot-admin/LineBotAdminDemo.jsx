import { useEffect, useMemo, useState } from "react"
import { initialLineBotCases, lineBotInboxMessages } from "../../data/lineBotAdminData"
import { getAdminActionToast, getBuildFlowPayloadForAdminAction } from "../../utils/lineBotAdminHelpers"
import AdminActionBar from "./AdminActionBar"
import AdminToast from "./AdminToast"
import BotParsedResult from "./BotParsedResult"
import BuildFlowCaseBoard from "./BuildFlowCaseBoard"
import LineInboxList from "./LineInboxList"
import SyncTimeline from "./SyncTimeline"

function LineBotAdminDemo({
  cases = initialLineBotCases,
  messageStatuses = {},
  activeMessageId = lineBotInboxMessages[0].id,
  activeCaseId = lineBotInboxMessages[0].actions[0].targetCaseId,
  highlightedCaseId,
  syncRecords = [],
  onMessageStatusesChange = () => {},
  onActiveMessageChange = () => {},
  onActiveCaseChange = () => {},
  onApplyBuildFlowAction,
  onResetDemo = () => {},
  isSupabaseReady = false,
  dataSource = "local",
  dataMode = "demo",
  dataModeOptions = [],
  actionNote = "Demo 只更新本機展示資料",
  caseBoardEmptyMessage = "",
  legacyCrew = [],
  onDataModeChange = () => {},
}) {
  const [toast, setToast] = useState("")

  const activeMessage = useMemo(
    () => lineBotInboxMessages.find((message) => message.id === activeMessageId) || lineBotInboxMessages[0],
    [activeMessageId],
  )

  const activeStatus = messageStatuses[activeMessage.id] || activeMessage.status
  const dataSourceLabel =
    dataMode === "legacy" && dataSource === "legacy"
      ? "讀取原本 LineBot 真資料"
      : dataMode === "buildflow" && dataSource === "supabase"
        ? "已連接 Supabase BuildFlow tables"
        : "目前使用本機 Demo 資料"
  const activeDataModeOption = dataModeOptions.find((option) => option.id === dataMode)

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(""), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const handleSelectMessage = (messageId) => {
    const nextMessage = lineBotInboxMessages.find((message) => message.id === messageId) || lineBotInboxMessages[0]
    onActiveMessageChange(messageId)
    onActiveCaseChange(nextMessage.actions[0]?.targetCaseId || initialLineBotCases[0].id)
  }

  const handleRunAction = (action) => {
    const payload = getBuildFlowPayloadForAdminAction(activeMessage, action)
    const targetCaseId = payload?.caseId || action.targetCaseId || activeMessage.actions[0]?.targetCaseId

    onMessageStatusesChange((current) => ({
      ...current,
      [activeMessage.id]: action.nextStatus,
    }))

    const result = onApplyBuildFlowAction?.({
      message: activeMessage,
      payload,
      actionLabel: action.label,
      status: action.nextStatus,
    })

    if (dataMode !== "legacy") onActiveCaseChange(targetCaseId)
    setToast(result?.toast || getAdminActionToast(action, payload?.caseName || activeMessage.parsedResult.caseName))
  }

  return (
    <section className="grid gap-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-slate-400">BuildFlow Inbox Demo</p>
            <h2 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">LineBot 後台管理 Demo</h2>
            <p className="mt-2 max-w-4xl text-sm font-bold leading-7 text-slate-500">
              LineBot 後台會把 LINE 對話中的工程需求、施工回報、照片、追加工程與驗收資訊整理成可追蹤的案件資料，減少資料散落在群組裡的問題。
            </p>
            <p className="mt-2 text-xs font-bold leading-6 text-slate-400">
              這是前端展示資料，會暫存在此瀏覽器中，可隨時重置 Demo。
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-end">
            <span
              className={`rounded-full px-3 py-2 text-xs font-black ${
                isSupabaseReady && dataSource !== "local"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {dataSourceLabel}
            </span>
            <div className="flex w-full flex-wrap gap-2 sm:justify-end">
              {dataModeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onDataModeChange(option.id)}
                  className={`rounded-full border px-3 py-2 text-xs font-black transition ${
                    option.id === dataMode
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {activeDataModeOption?.desc && (
              <p className="max-w-[320px] text-xs font-bold leading-5 text-slate-500 sm:text-right">
                {activeDataModeOption.desc}
              </p>
            )}
            <button
              type="button"
              onClick={onResetDemo}
              className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-black text-rose-700 transition hover:bg-rose-100 sm:w-auto"
            >
              重置 Demo
            </button>
          </div>
        </div>
      </div>

      {dataMode === "legacy" && legacyCrew.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <p className="text-xs font-black uppercase tracking-normal text-slate-400">LineBot Crew</p>
            <h3 className="mt-1 text-lg font-black text-slate-950">使用者 / 工班資訊</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {legacyCrew.map((member) => (
              <article key={member.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-black text-slate-950">{member.name}</p>
                <p className="mt-1 text-xs font-bold text-slate-500">{member.role}</p>
                <p className="mt-2 break-all text-xs font-bold leading-5 text-slate-500">
                  {member.lineUserId}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
        <LineInboxList
          messages={lineBotInboxMessages}
          activeMessageId={activeMessage.id}
          messageStatuses={messageStatuses}
          onSelect={handleSelectMessage}
        />

        <div className="grid gap-4">
          <BotParsedResult message={activeMessage} messageStatus={activeStatus} />
          <AdminActionBar actions={activeMessage.actions} onRunAction={handleRunAction} actionNote={actionNote} />
        </div>

        <BuildFlowCaseBoard
          cases={cases}
          activeCaseId={activeCaseId}
          highlightedCaseId={highlightedCaseId}
          emptyMessage={caseBoardEmptyMessage}
        />
      </div>

      <SyncTimeline records={syncRecords} />

      <AdminToast message={toast} />
    </section>
  )
}

export default LineBotAdminDemo
