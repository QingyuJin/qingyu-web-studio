import { useEffect, useMemo, useRef, useState } from "react"
import { lineBotInboxMessages } from "../../data/lineBotAdminData"
import { clearDemoStorage, getInitialDemoState, loadDemoState, saveDemoState } from "../../lib/demoStorage"
import {
  completePreConstructionReady,
  confirmQuotePayment,
  convertQuoteToProject,
  createPaymentRequest,
  fetchBuildFlowSyncActions,
  fetchProjects,
  fetchQuoteStatus,
  isSupabaseConfigured as isBuildFlowSupabaseConfigured,
  mapSyncActionsToTimeline,
  notifyQuoteAcceptance,
  scheduleQuoteConstruction,
  startQuoteConstruction,
  saveDailyReport,
  saveLineMessage,
  saveLineMessageParse,
  saveProject,
  saveSyncAction,
} from "../../lib/buildFlowSupabase"
import {
  fetchLegacyLineBotData,
  mapLegacyLineDataToBuildFlowCases,
  mapLegacyProfilesToCrew,
  mapLegacyTaskReportsToTimeline,
} from "../../lib/lineBotLegacySupabase"
import {
  lineBotRoleLabels,
  lineBotScenarios,
  progressByLineBotStatus,
} from "../../data/lineBotScenarios"
import {
  getBuildFlowActionForQuickReply,
  getInitialMessageId,
  getProgressByStatus,
  getQuickReplyResult,
} from "../../utils/lineBotHelpers"
import {
  createSyncRecord,
  getSyncToastByPayload,
  getUpdatedCaseByPayload,
} from "../../utils/lineBotAdminHelpers"
import Card from "../../shared/Card"
import SectionTitle from "../../shared/SectionTitle"
import LineBotAdminDemo from "../linebot-admin/LineBotAdminDemo"
import QuoteDemoOverview from "../quote/QuoteDemoOverview"
import QuoteStatusCard from "../quote/QuoteStatusCard"
import Status from "../../shared/Status"
import BotAnalysisPanel from "./BotAnalysisPanel"
import CaseSummaryCard from "./CaseSummaryCard"
import ChatMessage from "./ChatMessage"
import LineBotToast from "./LineBotToast"
import QuickReplyBar from "./QuickReplyBar"
import ScenarioTabs from "./ScenarioTabs"

const roleValueCards = [
  {
    title: "客戶端",
    desc: "詢問漏水、報價、場勘、保固時，不用在群組裡重複說明，Bot 會把缺少資料整理出來。",
    items: ["漏水詢問", "報價追蹤", "場勘時間", "保固查詢"],
  },
  {
    title: "老闆端",
    desc: "一句話建立案件、追報價、確認追加，重要決策不會被 LINE 訊息洗掉。",
    items: ["建立案件", "追蹤報價", "確認追加", "待辦提醒"],
  },
  {
    title: "師傅端",
    desc: "現場用口語回報施工、照片與異常狀況，後台自動留下可追蹤紀錄。",
    items: ["施工回報", "上傳照片", "通報異常", "完工驗收"],
  },
]

const DATA_MODE_OPTIONS = [
  { id: "demo", label: "Demo mock data", desc: "使用本機展示資料" },
  { id: "buildflow", label: "Supabase BuildFlow tables", desc: "讀取 BuildFlow Supabase Demo 資料表" },
  { id: "legacy", label: "原本 LineBot 真資料", desc: "讀取既有 LineBot 工程回報資料" },
]

const ACTION_NOTE_BY_MODE = {
  demo: "Demo 只更新本機展示資料",
  buildflow: "Action 會寫入 BuildFlow Supabase 資料表",
  legacy: "目前讀取真 LineBot 資料，Action 暫不覆寫原始 LineBot 表",
}

function LineBotDemo({ tasks = [], session }) {
  const [initialDemoState] = useState(loadDemoState)
  const [activeScenarioId, setActiveScenarioId] = useState(initialDemoState.activeScenarioId)
  const [activeMessageId, setActiveMessageId] = useState(initialDemoState.activeMessageId)
  const [caseStateByScenario, setCaseStateByScenario] = useState(initialDemoState.caseStateByScenario)
  const [syncCases, setSyncCases] = useState(initialDemoState.syncCases)
  const [messageStatuses, setMessageStatuses] = useState(initialDemoState.messageStatuses)
  const [syncRecords, setSyncRecords] = useState(initialDemoState.syncRecords)
  const [activeInboxMessageId, setActiveInboxMessageId] = useState(initialDemoState.activeInboxMessageId)
  const [activeCaseId, setActiveCaseId] = useState(initialDemoState.activeCaseId)
  const [highlightedCaseId, setHighlightedCaseId] = useState("")
  const [toast, setToast] = useState("")
  const [isSupabaseReady] = useState(isBuildFlowSupabaseConfigured)
  const [dataMode, setDataMode] = useState("demo")
  const [dataSource, setDataSource] = useState("local")
  const [caseBoardEmptyMessage, setCaseBoardEmptyMessage] = useState("")
  const [legacyCrew, setLegacyCrew] = useState([])
  const [quoteStatus, setQuoteStatus] = useState(null)
  const [isConvertingQuote, setIsConvertingQuote] = useState(false)
  const [isSchedulingQuote, setIsSchedulingQuote] = useState(false)
  const [isCompletingPreConstruction, setIsCompletingPreConstruction] = useState(false)
  const [isStartingConstruction, setIsStartingConstruction] = useState(false)
  const [isNotifyingAcceptance, setIsNotifyingAcceptance] = useState(false)
  const [isCreatingPaymentRequest, setIsCreatingPaymentRequest] = useState(false)
  const [isConfirmingPayment, setIsConfirmingPayment] = useState(false)
  const skipNextStorageSaveRef = useRef(false)

  const activeScenario = useMemo(
    () => lineBotScenarios.find((scenario) => scenario.id === activeScenarioId) || lineBotScenarios[0],
    [activeScenarioId],
  )

  const activeMessage = useMemo(
    () =>
      activeScenario.messages.find((message) => message.id === activeMessageId) ||
      activeScenario.messages.find((message) => message.analysis) ||
      activeScenario.messages[0],
    [activeMessageId, activeScenario],
  )

  const reportedTasks = useMemo(() => tasks.filter((task) => task.report?.trim()), [tasks])
  const visibleRole = session?.role === "admin" ? "管理員" : "現場人員"
  const caseState = caseStateByScenario[activeScenario.id]
  const displayStatus = caseState?.status || activeScenario.parsedCase.status
  const displayProgress = getProgressByStatus(displayStatus, activeScenario.parsedCase.progress)
  const displayScenario = useMemo(
    () => ({
      ...activeScenario,
      parsedCase: {
        ...activeScenario.parsedCase,
        status: displayStatus,
        progress: displayProgress,
      },
    }),
    [activeScenario, displayProgress, displayStatus],
  )
  const q001DemoStatus = useMemo(
    () => getQ001DemoStatus({ dataMode, quoteStatus, syncCases }),
    [dataMode, quoteStatus, syncCases],
  )

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(""), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!highlightedCaseId) return undefined
    const timer = window.setTimeout(() => setHighlightedCaseId(""), 1500)
    return () => window.clearTimeout(timer)
  }, [highlightedCaseId])

  useEffect(() => {
    if (dataMode !== "demo") return

    if (skipNextStorageSaveRef.current) {
      skipNextStorageSaveRef.current = false
      return
    }

    saveDemoState({
      syncCases,
      messageStatuses,
      syncRecords,
      activeScenarioId,
      activeMessageId,
      activeInboxMessageId,
      activeCaseId,
      caseStateByScenario,
    })
  }, [
    syncCases,
    messageStatuses,
    syncRecords,
    activeScenarioId,
    activeMessageId,
    activeInboxMessageId,
    activeCaseId,
    caseStateByScenario,
    dataMode,
  ])

  useEffect(() => {
    let isCancelled = false

    async function loadSelectedDataMode() {
      if (dataMode === "demo") {
        const demoState = loadDemoState()
        skipNextStorageSaveRef.current = true
        setSyncCases(demoState.syncCases)
        setSyncRecords(demoState.syncRecords)
        setMessageStatuses(demoState.messageStatuses)
        setActiveInboxMessageId(demoState.activeInboxMessageId)
        setActiveCaseId(demoState.activeCaseId)
        setDataSource("local")
        setCaseBoardEmptyMessage("")
        setLegacyCrew([])
        setQuoteStatus(null)
        return
      }

      if (!isSupabaseReady) {
        const demoState = loadDemoState()
        skipNextStorageSaveRef.current = true
        setSyncCases(demoState.syncCases)
        setSyncRecords(demoState.syncRecords)
        setActiveCaseId(demoState.activeCaseId)
        setDataSource("local")
        setCaseBoardEmptyMessage("Supabase 尚未設定，已切回本機 Demo 資料。")
        setLegacyCrew([])
        setQuoteStatus(null)
        setToast("Supabase 尚未設定，先使用本機 Demo 資料")
        return
      }

      if (dataMode === "buildflow") {
        const [result, syncActionResult, quoteStatusResult] = await Promise.all([
          fetchProjects(),
          fetchBuildFlowSyncActions(),
          fetchQuoteStatus(),
        ])
        if (isCancelled) return

        if (result.ok) {
          skipNextStorageSaveRef.current = true
          setSyncCases(result.data)
          setSyncRecords(syncActionResult.ok ? mapSyncActionsToTimeline(syncActionResult.data) : [])
          setQuoteStatus(quoteStatusResult.ok ? quoteStatusResult.data : null)
          setActiveCaseId(result.data[0]?.id || "")
          setDataSource("supabase")
          setCaseBoardEmptyMessage(result.data.length ? "" : "Supabase BuildFlow tables 目前沒有案件資料。")
          setLegacyCrew([])
          return
        }

        const demoState = loadDemoState()
        skipNextStorageSaveRef.current = true
        setSyncCases(demoState.syncCases)
        setSyncRecords(demoState.syncRecords)
        setActiveCaseId(demoState.activeCaseId)
        setDataSource("local")
        setCaseBoardEmptyMessage("Supabase BuildFlow tables 讀取失敗，已使用本機 Demo 資料。")
        setLegacyCrew([])
        setQuoteStatus(null)
        return
      }

      if (dataMode === "legacy") {
        const result = await fetchLegacyLineBotData()
        if (isCancelled) return

        if (result.ok) {
          const legacyCases = mapLegacyLineDataToBuildFlowCases(result.data)
          const legacyTimeline = mapLegacyTaskReportsToTimeline(result.data)
          const crew = mapLegacyProfilesToCrew(result.data.profiles)
          skipNextStorageSaveRef.current = true
          setSyncCases(legacyCases)
          setSyncRecords(legacyTimeline)
          setActiveCaseId(legacyCases[0]?.id || "")
          setDataSource("legacy")
          setCaseBoardEmptyMessage(
            legacyCases.length
              ? ""
              : "目前沒有可顯示的 LineBot 真資料，請先確認 Supabase 表格或 LineBot 是否已有回報紀錄。",
          )
          setLegacyCrew(crew)
          setQuoteStatus(null)
          return
        }

        const demoState = loadDemoState()
        skipNextStorageSaveRef.current = true
        setSyncCases(demoState.syncCases)
        setSyncRecords(demoState.syncRecords)
        setActiveCaseId(demoState.activeCaseId)
        setDataSource("local")
        setCaseBoardEmptyMessage("原本 LineBot 資料表讀取失敗，已使用本機 Demo 資料。")
        setLegacyCrew([])
        setQuoteStatus(null)
      }
    }

    loadSelectedDataMode()
    return () => {
      isCancelled = true
    }
  }, [dataMode, isSupabaseReady])

  const applyBuildFlowAction = ({ message, payload, actionLabel }) => {
    if (!payload) return null

    if (dataMode === "legacy") {
      return {
        toast: ACTION_NOTE_BY_MODE.legacy,
        caseId: payload.caseId,
      }
    }

    const targetCase = syncCases.find((item) => item.id === payload.caseId)
    const updatedCase = targetCase ? getUpdatedCaseByPayload(targetCase, payload) : null

    setSyncCases((currentCases) =>
      currentCases.map((item) => (item.id === payload.caseId ? getUpdatedCaseByPayload(item, payload) : item)),
    )
    setSyncRecords((currentRecords) => [
      createSyncRecord({ message, payload, actionLabel }),
      ...currentRecords,
    ].slice(0, 8))
    setHighlightedCaseId(payload.caseId)

    if (dataMode === "buildflow") {
      persistBuildFlowAction({ message, payload, actionLabel, updatedCase })
    }

    return {
      toast: getSyncToastByPayload(payload),
      caseId: payload.caseId,
    }
  }

  const persistBuildFlowAction = async ({ message, payload, actionLabel, updatedCase }) => {
    if (!isSupabaseReady || dataMode !== "buildflow" || !payload) return

    const savedProject = updatedCase ? await saveProject(updatedCase) : { ok: false, data: null }
    const savedMessage = await saveLineMessage({
      ...message,
      status: actionLabel,
    })
    const lineMessageId = savedMessage.data?.id
    const projectId = savedProject.data?.supabaseId || savedProject.data?.id

    if (lineMessageId) {
      await saveLineMessageParse({
        line_message_id: lineMessageId,
        intent: message?.intent,
        confidence: message?.confidence,
        entities: message?.entities,
        missing_fields: message?.parsedResult?.missingFields,
        suggested_actions: message?.suggestedActions,
      })
    }

    await saveSyncAction({
      line_message_id: lineMessageId,
      project_id: projectId,
      action_type: payload.type,
      payload,
      status: "synced",
    })

    if (payload.type === "add_daily_report" && projectId) {
      await saveDailyReport({
        project_id: projectId,
        worker_count: payload.workerCount,
        work_summary: payload.summary,
        next_work: payload.note,
        photo_status: updatedCase?.photoStatus,
        source: "linebot",
      })
    }
  }

  const handleResetDemo = () => {
    const initialState = getInitialDemoState()
    clearDemoStorage()
    skipNextStorageSaveRef.current = true
    setDataMode("demo")
    setActiveScenarioId(initialState.activeScenarioId)
    setActiveMessageId(initialState.activeMessageId)
    setCaseStateByScenario(initialState.caseStateByScenario)
    setSyncCases(initialState.syncCases)
    setMessageStatuses(initialState.messageStatuses)
    setSyncRecords(initialState.syncRecords)
    setActiveInboxMessageId(initialState.activeInboxMessageId)
    setActiveCaseId(initialState.activeCaseId)
    setHighlightedCaseId("")
    setDataSource("local")
    setCaseBoardEmptyMessage("")
    setLegacyCrew([])
    setQuoteStatus(null)
    setToast("Demo 已重置")
  }

  const handleScenarioSelect = (scenarioId) => {
    const nextScenario = lineBotScenarios.find((scenario) => scenario.id === scenarioId) || lineBotScenarios[0]
    setActiveScenarioId(scenarioId)
    setActiveMessageId(getInitialMessageId(nextScenario))
    setToast(nextScenario.toast)
  }

  const handleQuickReply = (reply) => {
    const result = getQuickReplyResult(reply, displayStatus)
    setCaseStateByScenario((current) => ({
      ...current,
      [activeScenario.id]: {
        status: result.status,
      },
    }))
    const payload = getBuildFlowActionForQuickReply(activeScenario.id, reply)
    const inboxMessage = lineBotInboxMessages.find((message) => message.scenarioId === activeScenario.id)
    const syncResult = applyBuildFlowAction({
      message: inboxMessage || activeScenario,
      payload,
      actionLabel: reply,
    })
    setToast(syncResult?.toast || result.toast)
  }

  const handleConvertQuoteToProject = async () => {
    if (dataMode !== "buildflow" || !quoteStatus || isConvertingQuote) return

    setIsConvertingQuote(true)
    const result = await convertQuoteToProject(quoteStatus)
    setIsConvertingQuote(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] convert quote failed", result.reason)
      setToast("轉正式案件失敗，請稍後再試")
      return
    }

    const convertedProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === convertedProject.id ||
        item.supabaseId === convertedProject.supabaseId ||
        item.name === convertedProject.name
      )

      if (!hasProject) return [convertedProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === convertedProject.id ||
        item.supabaseId === convertedProject.supabaseId ||
        item.name === convertedProject.name
          ? convertedProject
          : item,
      )
    })
    setActiveCaseId(convertedProject.id)
    setHighlightedCaseId(convertedProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `quote-convert-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "報價轉正式案件",
        intent: "quote_convert_project",
        actionLabel: "報價轉正式案件",
        caseName: convertedProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("已轉成正式案件")
  }

  const handleScheduleConstruction = async (scheduledDate) => {
    if (dataMode !== "buildflow" || !quoteStatus || isSchedulingQuote) return

    if (!scheduledDate) {
      setToast("請先選擇施工日")
      return
    }

    setIsSchedulingQuote(true)
    const result = await scheduleQuoteConstruction(quoteStatus, scheduledDate)
    setIsSchedulingQuote(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] schedule construction failed", result.reason)
      setToast("安排施工日失敗，請稍後再試")
      return
    }

    const scheduledProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === scheduledProject.id ||
        item.supabaseId === scheduledProject.supabaseId ||
        item.name === scheduledProject.name
      )

      if (!hasProject) return [scheduledProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === scheduledProject.id ||
        item.supabaseId === scheduledProject.supabaseId ||
        item.name === scheduledProject.name
          ? scheduledProject
          : item,
      )
    })
    setActiveCaseId(scheduledProject.id)
    setHighlightedCaseId(scheduledProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `schedule-construction-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "安排施工日",
        intent: "schedule_construction",
        actionLabel: "已安排施工日",
        caseName: scheduledProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("已安排施工日")
  }

  const handlePreConstructionToggle = (item, checked) => {
    setToast(`${item}${checked ? "已確認" : "已取消"}`)
  }

  const handleCompletePreConstruction = async () => {
    if (dataMode !== "buildflow" || !quoteStatus || isCompletingPreConstruction) return

    setIsCompletingPreConstruction(true)
    const result = await completePreConstructionReady(quoteStatus)
    setIsCompletingPreConstruction(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] complete pre-construction failed", result.reason)
      setToast("施工前準備更新失敗，請稍後再試")
      return
    }

    const readyProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === readyProject.id ||
        item.supabaseId === readyProject.supabaseId ||
        item.name === readyProject.name
      )

      if (!hasProject) return [readyProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === readyProject.id ||
        item.supabaseId === readyProject.supabaseId ||
        item.name === readyProject.name
          ? readyProject
          : item,
      )
    })
    setActiveCaseId(readyProject.id)
    setHighlightedCaseId(readyProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `pre-construction-ready-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "施工前準備",
        intent: "pre_construction_ready",
        actionLabel: "施工前準備完成",
        caseName: readyProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("施工前準備已完成")
  }

  const handleStartConstruction = async () => {
    if (dataMode !== "buildflow" || !quoteStatus || isStartingConstruction) return

    setIsStartingConstruction(true)
    const result = await startQuoteConstruction(quoteStatus)
    setIsStartingConstruction(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] start construction failed", result.reason)
      setToast("開始施工失敗，請稍後再試")
      return
    }

    const startedProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === startedProject.id ||
        item.supabaseId === startedProject.supabaseId ||
        item.name === startedProject.name
      )

      if (!hasProject) return [startedProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === startedProject.id ||
        item.supabaseId === startedProject.supabaseId ||
        item.name === startedProject.name
          ? startedProject
          : item,
      )
    })
    setActiveCaseId(startedProject.id)
    setHighlightedCaseId(startedProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `start-construction-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "開始施工",
        intent: "start_construction",
        actionLabel: "開始施工",
        caseName: startedProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("已開始施工")
  }

  const handleNotifyAcceptance = async () => {
    if (dataMode !== "buildflow" || !quoteStatus || isNotifyingAcceptance) return

    setIsNotifyingAcceptance(true)
    const result = await notifyQuoteAcceptance(quoteStatus)
    setIsNotifyingAcceptance(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] notify acceptance failed", result.reason)
      setToast("通知業主驗收更新失敗，請稍後再試")
      return
    }

    const notifiedProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === notifiedProject.id ||
        item.supabaseId === notifiedProject.supabaseId ||
        item.name === notifiedProject.name
      )

      if (!hasProject) return [notifiedProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === notifiedProject.id ||
        item.supabaseId === notifiedProject.supabaseId ||
        item.name === notifiedProject.name
          ? notifiedProject
          : item,
      )
    })
    setActiveCaseId(notifiedProject.id)
    setHighlightedCaseId(notifiedProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `notify-acceptance-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "通知業主驗收",
        intent: "notify_acceptance",
        actionLabel: "通知業主驗收",
        caseName: notifiedProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("已標記通知業主驗收")
  }

  const handleCreatePaymentRequest = async () => {
    if (dataMode !== "buildflow" || !quoteStatus || isCreatingPaymentRequest) return

    setIsCreatingPaymentRequest(true)
    const result = await createPaymentRequest(quoteStatus)
    setIsCreatingPaymentRequest(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] create payment request failed", result.reason)
      setToast("建立請款紀錄失敗，請稍後再試")
      return
    }

    const paymentProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === paymentProject.id ||
        item.supabaseId === paymentProject.supabaseId ||
        item.name === paymentProject.name
      )

      if (!hasProject) return [paymentProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === paymentProject.id ||
        item.supabaseId === paymentProject.supabaseId ||
        item.name === paymentProject.name
          ? paymentProject
          : item,
      )
    })
    setActiveCaseId(paymentProject.id)
    setHighlightedCaseId(paymentProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `create-payment-request-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "建立請款紀錄",
        intent: "create_payment_request",
        actionLabel: "建立請款紀錄",
        caseName: paymentProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("已建立請款紀錄")
  }

  const handleConfirmPayment = async () => {
    if (dataMode !== "buildflow" || !quoteStatus || isConfirmingPayment) return

    setIsConfirmingPayment(true)
    const result = await confirmQuotePayment(quoteStatus)
    setIsConfirmingPayment(false)

    if (!result.ok || !result.data?.project) {
      console.warn("[BuildFlow Quote] confirm payment failed", result.reason)
      setToast("付款確認失敗，請稍後再試")
      return
    }

    const closedProject = result.data.project
    setQuoteStatus(result.data.quoteStatus)
    setSyncCases((currentCases) => {
      const hasProject = currentCases.some((item) =>
        item.id === closedProject.id ||
        item.supabaseId === closedProject.supabaseId ||
        item.name === closedProject.name
      )

      if (!hasProject) return [closedProject, ...currentCases]

      return currentCases.map((item) =>
        item.id === closedProject.id ||
        item.supabaseId === closedProject.supabaseId ||
        item.name === closedProject.name
          ? closedProject
          : item,
      )
    })
    setActiveCaseId(closedProject.id)
    setHighlightedCaseId(closedProject.id)
    setSyncRecords((currentRecords) => [
      {
        id: result.data.action?.id || `payment-confirmed-${Date.now()}`,
        time: "剛剛",
        sourceMessage: "付款確認",
        intent: "payment_confirmed",
        actionLabel: "付款確認 → 案件結案",
        caseName: closedProject.name,
        status: "已同步",
      },
      ...currentRecords,
    ].slice(0, 8))
    setToast("已確認付款，案件已結案")
  }

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="LINE 助理 Demo"
        desc="模擬工程行在 LINE 裡收需求、派工、回報、追報價與整理照片，展示 BuildFlow 如何把對話變成後台資料。"
      />

      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 md:p-5">
        <p className="max-w-4xl text-sm font-bold leading-7 text-emerald-950">
          BuildFlow LineBot 可以把 LINE 裡的工程對話、照片、報價、追加與驗收紀錄整理成後台可追蹤資料，減少工程資料散落在群組裡的問題。
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        {roleValueCards.map((card) => (
          <RoleValueCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <MetricCard label="Demo 情境" value={`${lineBotScenarios.length} 組`} desc="客戶、老闆、工班與後台" />
        <MetricCard label="目前角色" value={visibleRole} desc="依登入角色可延伸不同權限" />
        <MetricCard label="LINE 回報" value={`${reportedTasks.length} 筆`} desc="可接回現有任務回報資料" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)_380px]">
        <ScenarioTabs
          scenarios={lineBotScenarios}
          activeScenarioId={activeScenario.id}
          onSelectScenario={handleScenarioSelect}
        />

        <Card>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-normal text-slate-400">LINE Chat</p>
              <h3 className="mt-1 text-xl font-black text-slate-950">{activeScenario.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">{activeScenario.summary}</p>
            </div>
            <Status>{displayScenario.parsedCase.status}</Status>
          </div>

          <div className="mt-4 rounded-[2rem] border border-slate-200 bg-slate-950 p-3 shadow-inner">
            <div className="overflow-hidden rounded-[1.5rem] bg-[#eef3ef]">
              <div className="flex items-center justify-between bg-emerald-600 px-4 py-3 text-white">
                <div>
                  <p className="text-sm font-black">BuildFlow 助理</p>
                  <p className="text-xs font-bold text-emerald-100">
                    {activeScenario.roles.map((role) => lineBotRoleLabels[role]).join(" / ")}
                  </p>
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">
                  {displayScenario.parsedCase.progress}%
                </span>
              </div>

              <div className="grid max-h-[560px] gap-3 overflow-y-auto px-3 py-4">
                {activeScenario.messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isActive={message.id === activeMessage.id}
                    onSelect={() => setActiveMessageId(message.id)}
                  />
                ))}

                {activeScenario.photos && (
                  <div className="grid grid-cols-3 gap-2 px-1">
                    {activeScenario.photos.map((photo) => (
                      <div
                        key={photo.label}
                        className={`flex aspect-[4/3] items-end rounded-xl ${photo.tone} p-2 text-xs font-black text-slate-700 shadow-sm`}
                      >
                        {photo.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-emerald-100 bg-white px-3 py-3">
                <QuickReplyBar replies={activeScenario.quickReplies} onReply={handleQuickReply} />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span>狀態進度對應</span>
              <span>{displayScenario.parsedCase.status}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600 sm:grid-cols-4">
              {Object.entries(progressByLineBotStatus).map(([status, value]) => (
                <span key={status} className="rounded-lg bg-white px-2 py-2">
                  {status} {value}%
                </span>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-4">
          <CaseSummaryCard scenario={displayScenario} />
          <BotAnalysisPanel analysis={activeMessage.analysis} scenario={activeScenario} />
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <p className="text-xs font-black uppercase tracking-normal text-slate-400">LINE to BuildFlow Sync</p>
        <h2 className="mt-1 text-xl font-black text-slate-950 md:text-2xl">LineBot 對話同步更新 BuildFlow 後台卡片</h2>
        <p className="mt-2 max-w-4xl text-sm font-bold leading-7 text-slate-500">
          這個 Demo 展示 BuildFlow 如何把 LINE 對話轉成後台資料。客戶詢問、師傅回報、照片上傳、追加工程與驗收紀錄，都可以被整理成案件卡、施工日誌與同步紀錄，讓老闆不用再回 LINE 群組翻資料。
        </p>
      </section>

      <QuoteDemoOverview
        quoteStatus={quoteStatus}
        isVisible={dataMode === "buildflow"}
      />

      <SeedDemoStatusCard status={q001DemoStatus} />

      <QuoteStatusCard
        quoteStatus={quoteStatus}
        isVisible={dataMode === "buildflow"}
        isConverting={isConvertingQuote}
        isScheduling={isSchedulingQuote}
        isCompletingPreConstruction={isCompletingPreConstruction}
        isStartingConstruction={isStartingConstruction}
        isNotifyingAcceptance={isNotifyingAcceptance}
        isCreatingPaymentRequest={isCreatingPaymentRequest}
        isConfirmingPayment={isConfirmingPayment}
        onConvertToProject={handleConvertQuoteToProject}
        onScheduleConstruction={handleScheduleConstruction}
        onPreConstructionToggle={handlePreConstructionToggle}
        onCompletePreConstruction={handleCompletePreConstruction}
        onStartConstruction={handleStartConstruction}
        onNotifyAcceptance={handleNotifyAcceptance}
        onCreatePaymentRequest={handleCreatePaymentRequest}
        onConfirmPayment={handleConfirmPayment}
      />

      <LineBotAdminDemo
        cases={syncCases}
        messageStatuses={messageStatuses}
        activeMessageId={activeInboxMessageId}
        activeCaseId={activeCaseId}
        highlightedCaseId={highlightedCaseId}
        syncRecords={syncRecords}
        onMessageStatusesChange={setMessageStatuses}
        onActiveMessageChange={setActiveInboxMessageId}
        onActiveCaseChange={setActiveCaseId}
        onApplyBuildFlowAction={applyBuildFlowAction}
        onResetDemo={handleResetDemo}
        isSupabaseReady={isSupabaseReady}
        dataSource={dataSource}
        dataMode={dataMode}
        dataModeOptions={DATA_MODE_OPTIONS}
        actionNote={ACTION_NOTE_BY_MODE[dataMode]}
        caseBoardEmptyMessage={caseBoardEmptyMessage}
        legacyCrew={legacyCrew}
        onDataModeChange={setDataMode}
      />

      <LineBotToast message={toast} />
    </div>
  )
}

function MetricCard({ label, value, desc }) {
  return (
    <Card>
      <p className="text-sm font-black text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
    </Card>
  )
}

function SeedDemoStatusCard({ status }) {
  if (!status.isVisible) return null

  if (status.isComplete) {
    return (
      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-normal text-emerald-700">Seed Demo</p>
            <h3 className="mt-1 text-lg font-black text-emerald-950">q-001 完整流程展示中</h3>
            <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-emerald-900">
              目前 Supabase BuildFlow tables 已讀到 q-001 的報價、施工、驗收、請款、付款與保固紀錄。
            </p>
          </div>
          <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-black text-emerald-700">
            已連接 Seed
          </span>
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-amber-700">Seed Demo</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">目前尚無 q-001 Demo 資料</h3>
          <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-slate-600">
            目前尚無 q-001 Demo 資料。請先在 Supabase SQL Editor 執行 <span className="font-black">supabase/seed_buildflow_demo.sql</span>。
          </p>
        </div>
        <span className="w-fit rounded-full border border-amber-200 bg-white px-3 py-2 text-xs font-black text-amber-700">
          等待 Seed
        </span>
      </div>
    </section>
  )
}

function getQ001DemoStatus({ dataMode, quoteStatus, syncCases }) {
  if (dataMode !== "buildflow") return { isVisible: false, isComplete: false }

  const hasQ001Case = syncCases.some((item) => item.name === "q-001 屋頂防水工程")
  const actionTypes = new Set((quoteStatus?.actions || []).map((action) => action.actionType))
  const hasQ001Quote = quoteStatus?.quoteId === "q-001" || quoteStatus?.projectName === "q-001 屋頂防水工程"
  const isComplete =
    (hasQ001Case || hasQ001Quote) &&
    (quoteStatus?.warranty || quoteStatus?.projectStatus === "已結案" || actionTypes.has("payment_confirmed"))

  return {
    isVisible: true,
    isComplete: Boolean(isComplete),
  }
}

function RoleValueCard({ title, desc, items }) {
  return (
    <Card>
      <p className="text-base font-black text-slate-950">{title}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    </Card>
  )
}

export default LineBotDemo
