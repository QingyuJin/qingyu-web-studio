import { initialLineBotCases, lineBotInboxMessages } from "../data/lineBotAdminData.js"
import { getInitialMessageId } from "../utils/lineBotHelpers.js"
import { lineBotScenarios } from "../data/lineBotScenarios.js"

export const DEMO_STORAGE_KEYS = {
  cases: "qingyu-buildflow-cases",
  inbox: "qingyu-linebot-inbox",
  timeline: "qingyu-buildflow-sync-timeline",
  state: "qingyu-linebot-demo-state",
}

const initialScenario = lineBotScenarios[0]

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

export function getInitialDemoState() {
  return {
    syncCases: initialLineBotCases,
    messageStatuses: {},
    syncRecords: [],
    activeScenarioId: initialScenario.id,
    activeMessageId: getInitialMessageId(initialScenario),
    activeInboxMessageId: lineBotInboxMessages[0]?.id || "",
    activeCaseId: lineBotInboxMessages[0]?.actions[0]?.targetCaseId || initialLineBotCases[0]?.id || "",
    caseStateByScenario: {},
  }
}

export function safeReadStorage(key, fallbackValue) {
  if (typeof window === "undefined") return fallbackValue

  try {
    const rawValue = window.localStorage.getItem(key)
    if (!rawValue) return fallbackValue
    return JSON.parse(rawValue)
  } catch {
    return fallbackValue
  }
}

export function safeWriteStorage(key, value) {
  if (typeof window === "undefined") return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Demo storage should never break the page.
  }
}

export function clearDemoStorage() {
  if (typeof window === "undefined") return

  Object.values(DEMO_STORAGE_KEYS).forEach((key) => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Ignore storage cleanup errors in demo mode.
    }
  })
}

export function loadDemoState() {
  const initialState = getInitialDemoState()
  const storedCases = safeReadStorage(DEMO_STORAGE_KEYS.cases, initialState.syncCases)
  const storedInbox = safeReadStorage(DEMO_STORAGE_KEYS.inbox, initialState.messageStatuses)
  const storedTimeline = safeReadStorage(DEMO_STORAGE_KEYS.timeline, initialState.syncRecords)
  const storedState = safeReadStorage(DEMO_STORAGE_KEYS.state, {})

  return {
    ...initialState,
    syncCases: Array.isArray(storedCases) ? storedCases : initialState.syncCases,
    messageStatuses: isPlainObject(storedInbox) ? storedInbox : initialState.messageStatuses,
    syncRecords: Array.isArray(storedTimeline) ? storedTimeline : initialState.syncRecords,
    ...(isPlainObject(storedState) ? storedState : {}),
  }
}

export function saveDemoState(state) {
  safeWriteStorage(DEMO_STORAGE_KEYS.cases, state.syncCases)
  safeWriteStorage(DEMO_STORAGE_KEYS.inbox, state.messageStatuses)
  safeWriteStorage(DEMO_STORAGE_KEYS.timeline, state.syncRecords)
  safeWriteStorage(DEMO_STORAGE_KEYS.state, {
    activeScenarioId: state.activeScenarioId,
    activeMessageId: state.activeMessageId,
    activeInboxMessageId: state.activeInboxMessageId,
    activeCaseId: state.activeCaseId,
    caseStateByScenario: state.caseStateByScenario,
  })
}
