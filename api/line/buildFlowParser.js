const ENGINEERING_INTENT_RULES = [
  {
    intent: "quote_view_pdf",
    keywords: ["想看 PDF", "看 PDF", "PDF", "報價單", "看報價"],
    confidence: 0.95,
    tags: ["報價", "PDF"],
  },
  {
    intent: "quote_approved",
    keywords: ["同意", "可以", "確認", "沒問題", "就這樣", "OK", "ok"],
    confidence: 0.93,
    tags: ["報價", "業主同意"],
  },
  {
    intent: "quote_change_request",
    keywords: ["要修改", "想修改", "改一下", "價格再調整", "太貴", "有點高"],
    confidence: 0.9,
    tags: ["報價", "要求修改"],
  },
  {
    intent: "quote_menu",
    keywords: ["老闆總覽", "流程", "選單"],
    confidence: 0.82,
    tags: ["報價", "選單"],
  },
  {
    intent: "weather_delay",
    keywords: ["下雨", "停工"],
    confidence: 0.9,
    tags: ["天候", "停工"],
  },
  {
    intent: "acceptance",
    keywords: ["完工", "驗收", "試水", "完成", "沒有滲漏"],
    confidence: 0.92,
    tags: ["驗收", "完工"],
  },
  {
    intent: "warranty",
    keywords: ["保固"],
    confidence: 0.86,
    tags: ["保固"],
  },
  {
    intent: "change_order",
    keywords: ["追加", "變更", "多做"],
    confidence: 0.9,
    tags: ["追加", "待老闆確認"],
  },
  {
    intent: "daily_report",
    keywords: ["今天", "回報", "出工", "明天", "完成", "施工"],
    confidence: 0.88,
    tags: ["施工回報"],
  },
  {
    intent: "construction_daily_report",
    keywords: ["今日回報", "今天", "出工", "完成", "明天", "施工", "進場", "q-001", "Q001"],
    confidence: 0.92,
    tags: ["施工中", "每日回報", "LINE"],
  },
  {
    intent: "completion_acceptance",
    keywords: ["完工", "驗收", "試水", "沒有滲漏", "無滲漏", "完工照", "完成", "q-001", "Q001"],
    confidence: 0.94,
    tags: ["完工", "待驗收", "試水", "LINE"],
  },
  {
    intent: "acceptance_confirmed",
    keywords: ["驗收通過", "沒問題", "可以", "OK", "確認", "沒有問題", "施工完成確認", "收到", "q-001"],
    confidence: 0.93,
    tags: ["已驗收", "請款", "LINE"],
  },
  {
    intent: "site_survey",
    keywords: ["場勘", "什麼時候來", "可以來看"],
    confidence: 0.86,
    tags: ["場勘"],
  },
  {
    intent: "inquiry_waterproof",
    keywords: ["漏水", "滲水", "防水", "抓漏"],
    confidence: 0.9,
    tags: ["漏水", "防水", "待補資料", "LINE"],
  },
  {
    intent: "quotation_request",
    keywords: ["報價", "估價", "多少錢"],
    confidence: 0.87,
    tags: ["報價"],
  },
]

export const SYNC_ACTION_BY_INTENT = {
  inquiry_waterproof: "request_missing_info",
  quotation_request: "mark_quotation",
  site_survey: "mark_site_survey",
  daily_report: "add_daily_report",
  construction_daily_report: "construction_daily_report",
  completion_acceptance: "completion_acceptance",
  acceptance_confirmed: "acceptance_confirmed",
  change_order: "add_change_order",
  weather_delay: "update_status",
  acceptance: "mark_acceptance",
  warranty: "request_missing_info",
  quote_view_pdf: "quote_view_pdf",
  quote_approved: "quote_approved",
  quote_change_request: "quote_change_request",
}

export function parseIntent(text) {
  const normalizedText = normalizeText(text)
  const acceptanceRule = ENGINEERING_INTENT_RULES.find((rule) => rule.intent === "acceptance")
  const dailyReportRule = ENGINEERING_INTENT_RULES.find((rule) => rule.intent === "daily_report")
  const constructionDailyReportRule = ENGINEERING_INTENT_RULES.find((rule) => rule.intent === "construction_daily_report")
  const completionAcceptanceRule = ENGINEERING_INTENT_RULES.find((rule) => rule.intent === "completion_acceptance")
  const acceptanceConfirmedRule = ENGINEERING_INTENT_RULES.find((rule) => rule.intent === "acceptance_confirmed")

  if (/q-?0*01/i.test(normalizedText) && isAcceptanceConfirmedText(normalizedText)) {
    return acceptanceConfirmedRule
  }
  if (/q-?0*01/i.test(normalizedText) && isCompletionAcceptanceText(normalizedText)) {
    return completionAcceptanceRule
  }
  if (/完工|驗收|試水|沒有滲漏|無滲漏|完工照/.test(normalizedText)) return acceptanceRule
  if (/完成/.test(normalizedText) && !/今天|今日|回報|出工|明天|施工/.test(normalizedText)) {
    return acceptanceRule
  }
  if (/q-?0*01/i.test(normalizedText) && /今日回報|今天|出工|完成|明天|施工|進場/.test(normalizedText)) {
    return constructionDailyReportRule
  }
  if (/今天|今日|回報|出工|明天|施工/.test(normalizedText)) return dailyReportRule
  if (/場勘|什麼時候來|可以來看/.test(normalizedText)) {
    return ENGINEERING_INTENT_RULES.find((rule) => rule.intent === "site_survey")
  }

  const matchedRule =
    ENGINEERING_INTENT_RULES.find((rule) =>
      rule.keywords.some((keyword) => normalizedText.includes(keyword))
    ) || {
      intent: "general_message",
      confidence: 0.55,
      tags: [],
    }

  return matchedRule
}

export function extractEntities(text, intent = "") {
  const rawText = normalizeText(text)
  const quoteId = extractQuoteId(rawText)
  const isQuoteIntent = typeof intent === "string" && intent.startsWith("quote_")
  const isQuoteFlowIntent = ["quote_view_pdf", "quote_approved", "quote_change_request"].includes(intent)
  const isConstructionDailyReport = intent === "construction_daily_report"
  const isCompletionAcceptance = intent === "completion_acceptance"

  return {
    rawText,
    caseHint: extractCaseHint(rawText),
    workerCount: extractWorkerCount(rawText),
    hasPhotoKeyword: /照片|相片|圖|完工照/.test(rawText),
    nextWork: extractNextWork(rawText),
    workSummary: extractWorkSummary(rawText),
    photoStatus: isCompletionAcceptance ? extractCompletionPhotoStatus(rawText) : extractPhotoStatus(rawText),
    acceptanceResult: extractAcceptanceResult(rawText),
    testDuration: extractTestDuration(rawText),
    quoteId: quoteId || (isQuoteFlowIntent || isConstructionDailyReport || isCompletionAcceptance ? "q-001" : ""),
    amount: isQuoteFlowIntent || quoteId ? 53900 : null,
    approvalStatus: isQuoteIntent ? getApprovalStatus(rawText) : "",
  }
}

export function extractWorkerCount(text) {
  const normalizedText = normalizeText(text)
  const digitMatch = normalizedText.match(/(\d+)\s*(人|個人|位)/)
  if (digitMatch) return Number(digitMatch[1])

  const zhNumberMap = {
    一: 1,
    兩: 2,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
  }
  const zhMatch = normalizedText.match(/([一兩二三四五六七八九十])\s*(人|個人|位)/)
  return zhMatch ? zhNumberMap[zhMatch[1]] || null : null
}

export function extractCaseHint(text) {
  const normalizedText = normalizeText(text)
  if (/q-?0*01/i.test(normalizedText)) return "q-001"
  return normalizedText.match(/[A-Z]\s*案|[a-z]\s*案|[\u4e00-\u9fa5]{1,4}小姐|[\u4e00-\u9fa5]{1,4}先生/u)?.[0] || ""
}

export function getMissingFields(intent, entities = {}) {
  const missingFieldsByIntent = {
    inquiry_waterproof: ["地點", "照片", "可場勘時間"],
    quotation_request: ["工程範圍", "現場照片", "地址"],
    site_survey: ["地址", "可場勘時間"],
    daily_report: entities.hasPhotoKeyword ? [] : ["現場照片"],
    construction_daily_report: entities.hasPhotoKeyword ? [] : ["現場照片"],
    completion_acceptance: ["業主驗收確認"],
    acceptance_confirmed: ["請款確認"],
    change_order: ["追加範圍", "客戶是否同意", "追加費用"],
    weather_delay: ["是否影響工期", "預計復工時間"],
    acceptance: ["客戶驗收時間"],
    warranty: ["姓名或案件地址"],
    quote_view_pdf: [],
    quote_approved: [],
    quote_change_request: ["要修改的項目"],
    quote_menu: [],
  }

  return missingFieldsByIntent[intent] || []
}

export function getSuggestedActions(intent) {
  const suggestedActionsByIntent = {
    inquiry_waterproof: ["建立草稿案件", "請客戶補地點與照片", "安排場勘"],
    quotation_request: ["建立報價追蹤", "請客戶補現場照片", "安排場勘"],
    site_survey: ["標記待場勘", "確認場勘時間", "請客戶提供地址"],
    daily_report: ["新增施工日誌", "更新案件進度", "提醒補施工照片"],
    construction_daily_report: ["新增施工日誌", "更新 q-001 為施工中", "提醒補施工照片"],
    completion_acceptance: ["標記待驗收", "通知業主驗收", "確認完工照片"],
    acceptance_confirmed: ["更新為已驗收", "建立請款待辦", "等待請款確認"],
    change_order: ["建立追加工程紀錄", "通知老闆確認", "等待客戶同意"],
    weather_delay: ["更新案件狀態為天候停工", "通知客戶工期可能順延", "建立今日施工日誌"],
    acceptance: ["標記案件為待驗收", "建立驗收提醒", "通知客戶確認完工狀態"],
    warranty: ["請客戶提供姓名或地址", "查詢保固紀錄"],
    quote_view_pdf: ["記錄報價單已查看", "等待業主同意或修改"],
    quote_approved: ["標記業主已同意", "轉成正式案件", "安排施工日"],
    quote_change_request: ["標記報價需修改", "通知老闆重新調整報價"],
    quote_menu: ["保留報價流程操作紀錄"],
  }

  return suggestedActionsByIntent[intent] || ["保留 LINE 訊息紀錄"]
}

export function parseEngineeringMessage(text) {
  const rule = parseIntent(text)
  const entities = extractEntities(text, rule.intent)

  return {
    intent: rule.intent,
    confidence: rule.confidence,
    entities,
    missingFields: getMissingFields(rule.intent, entities),
    suggestedActions: getSuggestedActions(rule.intent),
    tags: rule.tags,
  }
}

export function parseLineImageMessage(event) {
  return {
    intent: "photo_upload",
    confidence: 0.8,
    entities: {
      messageId: event?.message?.id || "",
      messageType: "image",
      sourceType: event?.source?.type || "",
    },
    missingFields: ["案件名稱或任務 ID"],
    suggestedActions: ["請使用者補案件名稱", "暫存為待歸檔照片"],
    tags: ["待照片", "圖片"],
  }
}

export function getActionTypeByIntent(intent) {
  return SYNC_ACTION_BY_INTENT[intent]
}

export function extractNextWork(text) {
  const match = text.match(/明天(.+)/)
  return match ? `明天${match[1]}`.trim() : ""
}

function extractQuoteId(text) {
  const quoteMatch = text.match(/q-?\d+/i)?.[0]?.toLowerCase() || ""
  if (/q-?0*01/i.test(quoteMatch)) return "q-001"
  return quoteMatch
}

export function extractWorkSummary(text) {
  const normalizedText = normalizeText(text)
  const completedClause = normalizedText
    .split(/[，。,.]/)
    .map((item) => item.trim())
    .find((item) => /已完成|完成/.test(item))
  if (completedClause) return completedClause

  const todayMatch = normalizedText.match(/(?:今日回報|今天)([^。,.，]*)/)
  return todayMatch?.[0]?.trim() || summarizeConstructionText(normalizedText)
}

export function extractAcceptanceResult(text) {
  const normalizedText = normalizeText(text)
  if (/沒有滲漏|無滲漏|試水正常|沒有滲水/.test(normalizedText)) return "試水正常，無滲漏"
  if (/試水/.test(normalizedText)) return "已回報試水，待確認結果"
  return ""
}

export function extractTestDuration(text) {
  const normalizedText = normalizeText(text)
  const match = normalizedText.match(/試水\s*(\d+)\s*(小時|hr|HR|h|H)/)
  if (!match) return ""
  return `${match[1]} 小時`
}

export function extractPhotoStatus(text) {
  if (/照片(?:晚點|等下|等等)?(?:補|傳)/.test(text)) return "待補照片"
  if (/完工照(?:已)?(?:傳|上傳)|照片已上傳|完工照片已上傳/.test(text)) return "完工照片已上傳"
  if (/完工照.*(?:晚點|等下|等等).*(?:補|傳)/.test(text)) return "待補完工照片"
  if (/照片|相片|圖/.test(text)) return "已提到照片"
  return "未提到照片"
}

function extractCompletionPhotoStatus(text) {
  if (/完工照.*(?:晚點|等下|等等).*(?:補|傳)|照片(?:晚點|等下|等等)?(?:補|傳)/.test(text)) {
    return "待補完工照片"
  }
  if (/完工照(?:已)?(?:傳|上傳)|照片已上傳|完工照片已上傳/.test(text)) return "完工照片已上傳"
  if (/完工照|照片|相片|圖/.test(text)) return "已提到完工照片"
  return "未提到完工照片"
}

function summarizeConstructionText(text) {
  return normalizeText(text)
    .replace(/^今日回報\s*/u, "")
    .slice(0, 80)
}

function getApprovalStatus(text) {
  if (/同意|可以|確認|沒問題|就這樣|OK|ok/.test(text)) return "approved"
  if (/要修改|想修改|改一下|價格再調整|太貴|有點高/.test(text)) return "change_requested"
  if (/想看 PDF|看 PDF|PDF|報價單|看報價/.test(text)) return "pending"
  return ""
}

function isCompletionAcceptanceText(text) {
  if (/完工|驗收|試水|沒有滲漏|無滲漏|沒有滲水|完工照/.test(text)) return true
  return /完成/.test(text) && /防水|屋頂|第二道|最後|收尾/.test(text) && !/今日回報|出工|明天/.test(text)
}

function isAcceptanceConfirmedText(text) {
  if (!/q-?0*01/i.test(text)) return false
  if (/同意/.test(text) && !/驗收|完工|施工完成/.test(text)) return false
  return /驗收通過|施工完成確認|沒有問題|沒問題|可以|OK|ok|確認|收到/.test(text)
}

function normalizeText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
}
