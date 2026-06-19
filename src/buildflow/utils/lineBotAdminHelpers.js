import { progressByLineBotStatus } from "../data/lineBotScenarios.js"

export function getBuildFlowPayloadForAdminAction(message, action) {
  const payloadByType = message.buildFlowActions?.find((payload) => payload.type === action.type)
  return payloadByType || message.buildFlowActions?.[0]
}

export function getUpdatedCaseByPayload(currentCase, payload) {
  if (!payload) return currentCase

  const nextStatus = payload.status || currentCase.status
  const nextProgress = payload.progress || progressByLineBotStatus[nextStatus] || currentCase.progress

  return {
    ...currentCase,
    name: payload.caseName || currentCase.name,
    customer: payload.customerName || currentCase.customer,
    location: payload.location || currentCase.location,
    projectType: payload.projectType || currentCase.projectType,
    status: nextStatus,
    progress: nextProgress,
    lastUpdated: "剛剛",
    dailySummary: payload.summary || currentCase.dailySummary,
    photoStatus: payload.type === "add_photo_record" ? payload.summary : currentCase.photoStatus,
    hasChangeOrder: payload.type === "add_change_order" ? true : currentCase.hasChangeOrder,
    missingFields: payload.missingFields || currentCase.missingFields,
    sourceNote: "剛剛由 LineBot 建立",
  }
}

export function getUpdatedCaseByAction(currentCase, message, action) {
  const payload = getBuildFlowPayloadForAdminAction(message, action)
  if (payload) return getUpdatedCaseByPayload(currentCase, payload)

  const statusByAction = {
    "create-case": "待場勘",
    "mark-survey": "待場勘",
    "daily-log": "施工中",
    "update-progress": "施工中",
    "photo-record": "施工中",
    "quote-follow": "估價中",
    "change-order": "施工中",
    "boss-confirm": "施工中",
    "weather-log": "施工中",
    "issue-ticket": "施工中",
    "mark-acceptance": "待驗收",
    "acceptance-task": "待驗收",
    "warranty-check": currentCase.status,
    "request-info": currentCase.status,
  }

  const nextStatus = statusByAction[action.id] || message.parsedResult.status || currentCase.status
  const nextProgress = progressByLineBotStatus[nextStatus] || message.parsedResult.progress || currentCase.progress
  const actionSummaryById = {
    "create-case": "已由 LINE 訊息建立案件草稿",
    "mark-survey": "已標記待場勘並等待補件",
    "daily-log": "已新增今日施工日誌",
    "update-progress": "已依 LINE 回報更新案件進度",
    "photo-record": "已新增施工照片紀錄",
    "quote-follow": "已通知老闆確認報價",
    "change-order": "已新增追加工程待確認",
    "boss-confirm": "已通知老闆確認處理方式",
    "weather-log": "已新增天候停工紀錄",
    "issue-ticket": "已建立異常通報",
    "mark-acceptance": "已標記為待驗收",
    "acceptance-task": "已建立驗收待辦",
    "warranty-check": "已開啟保固查詢並等待客戶補資料",
    "request-info": "已通知客戶補資料",
  }

  return {
    ...currentCase,
    status: nextStatus,
    progress: nextProgress,
    lastUpdated: "剛剛",
    dailySummary: actionSummaryById[action.id] || message.parsedResult.nextStep,
    photoStatus: action.id === "photo-record" ? "已由 LineBot 歸檔照片" : currentCase.photoStatus,
    hasChangeOrder: action.id === "change-order" ? true : currentCase.hasChangeOrder,
    missingFields: action.id === "request-info" ? message.parsedResult.missingFields : currentCase.missingFields,
    sourceNote: "剛剛由 LineBot 建立",
  }
}

export function getAdminActionToast(action, caseName) {
  return `${action.label}：${caseName} 已同步更新`
}

export function getSyncToastByPayload(payload) {
  const toastByType = {
    create_case: "已由 LineBot 建立案件",
    update_status: "已同步案件狀態到 BuildFlow",
    add_daily_report: "已同步施工日誌到 BuildFlow",
    add_photo_record: "已將照片紀錄歸檔",
    add_change_order: "已新增追加工程紀錄",
    mark_site_survey: "已標記待場勘",
    mark_quotation: "已更新報價追蹤狀態",
    mark_acceptance: "已更新為待驗收",
    request_missing_info: "已建立缺資料提醒",
  }

  return toastByType[payload?.type] || "已同步 LineBot 動作"
}

export function createSyncRecord({ message, payload, actionLabel }) {
  return {
    id: `sync-${payload.id}-${Date.now()}`,
    time: payload.createdAt || "剛剛",
    sourceMessage: message?.scenarioTitle || message?.title || payload.caseName,
    intent: message?.intent || "linebot_action",
    actionLabel: actionLabel || payload.type,
    caseName: payload.caseName,
    status: "已同步",
  }
}
