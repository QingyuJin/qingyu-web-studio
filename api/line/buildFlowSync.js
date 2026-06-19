const QUOTE_PROJECT_TITLE = "q-001 屋頂防水工程"
const QUOTE_AMOUNT = 53900

export async function createOrUpdateProjectFromIntent({ supabase, parse, messageText, senderName, messageTime }) {
  return runBuildFlowSync("createOrUpdateProjectFromIntent", null, async () => {
    if (![
      "inquiry_waterproof",
      "daily_report",
      "construction_daily_report",
      "completion_acceptance",
      "acceptance_confirmed",
      "acceptance",
      "quote_view_pdf",
      "quote_approved",
      "quote_change_request",
    ].includes(parse.intent)) return null

    const project = await findProjectByCaseHint(supabase, parse.entities.quoteId || parse.entities.caseHint)

    if (parse.intent === "inquiry_waterproof") {
      const payload = {
        title: project?.title || parse.entities.caseHint || "LINE 漏水詢問",
        customer_name: project?.customer_name || senderName || "LINE 使用者",
        location: project?.location || "未填地點",
        project_type: "防水 / 漏水",
        status: "待補資料",
        progress: 20,
        latest_update: summarizeMessage(messageText),
        missing_fields: ["地點", "照片", "可場勘時間"],
        source: "LINE webhook",
        tags: mergeTags(project?.tags, ["漏水", "防水", "待補資料", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      }

      return project ? updateProject(supabase, project.id, payload) : insertProject(supabase, payload)
    }

    if (parse.intent === "daily_report") {
      const activeProject = project || await insertProject(supabase, {
        title: parse.entities.caseHint || "未綁定 LineBot 回報",
        customer_name: senderName || "LINE 使用者",
        location: "未填地點",
        project_type: "工程案件",
        status: "施工中",
        progress: 75,
        latest_update: summarizeMessage(messageText),
        today_summary: summarizeMessage(messageText),
        missing_fields: parse.entities.caseHint ? [] : ["案件名稱"],
        source: "LINE webhook",
        tags: ["LINE", "施工回報"],
        updated_at: messageTime || new Date().toISOString(),
      })

      await updateProject(supabase, activeProject.id, {
        status: "施工中",
        progress: 75,
        today_summary: summarizeMessage(messageText),
        latest_update: summarizeMessage(messageText),
        tags: mergeTags(activeProject.tags, ["LINE", "施工回報"]),
        updated_at: messageTime || new Date().toISOString(),
      })

      return { ...activeProject, status: "施工中", progress: 75 }
    }

    if (parse.intent === "construction_daily_report") {
      const workSummary = parse.entities.workSummary || summarizeMessage(messageText)
      const photoStatus = parse.entities.photoStatus || "未提到照片"
      const activeProject = project || await insertProject(supabase, {
        title: QUOTE_PROJECT_TITLE,
        customer_name: senderName || "LINE 使用者",
        location: "未填地點",
        project_type: "防水 / 泥作",
        status: "施工中",
        progress: 75,
        latest_update: "來自 LINE 的每日施工回報",
        today_summary: workSummary,
        photo_status: photoStatus,
        change_order_status: "無",
        missing_fields: [],
        source: "LINE webhook",
        tags: ["施工中", "每日回報", "LINE"],
        updated_at: messageTime || new Date().toISOString(),
      })

      const updatedProject = await updateProject(supabase, activeProject.id, {
        status: "施工中",
        progress: 75,
        today_summary: workSummary,
        latest_update: "來自 LINE 的每日施工回報",
        photo_status: photoStatus,
        missing_fields: [],
        tags: mergeTags(activeProject.tags, ["施工中", "每日回報", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      })

      return updatedProject || { ...activeProject, status: "施工中", progress: 75 }
    }

    if (parse.intent === "completion_acceptance") {
      const acceptanceSummary = getAcceptanceSummary(parse, messageText)
      const photoStatus = parse.entities.photoStatus || "未提到照片"
      const activeProject = project || await insertProject(supabase, {
        title: QUOTE_PROJECT_TITLE,
        customer_name: senderName || "LINE 使用者",
        location: "未填地點",
        project_type: "防水 / 泥作",
        status: "待驗收",
        progress: 90,
        latest_update: "來自 LINE 的完工驗收回報",
        today_summary: acceptanceSummary,
        photo_status: photoStatus,
        change_order_status: "無",
        missing_fields: ["業主驗收確認"],
        source: "LINE webhook",
        tags: ["完工", "待驗收", "試水", "LINE"],
        updated_at: messageTime || new Date().toISOString(),
      })

      return updateProject(supabase, activeProject.id, {
        status: "待驗收",
        progress: 90,
        latest_update: "來自 LINE 的完工驗收回報",
        today_summary: acceptanceSummary,
        photo_status: photoStatus,
        missing_fields: ["業主驗收確認"],
        tags: mergeTags(activeProject.tags, ["完工", "待驗收", "試水", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      })
    }

    if (parse.intent === "acceptance_confirmed") {
      const activeProject = project || await insertProject(supabase, {
        title: QUOTE_PROJECT_TITLE,
        customer_name: senderName || "LINE 使用者",
        location: "未填地點",
        project_type: "防水 / 泥作",
        status: "已驗收",
        progress: 95,
        latest_update: "業主已確認驗收通過",
        today_summary: "業主已確認完工與試水結果，下一步進入請款",
        photo_status: "完工照片已上傳",
        change_order_status: "無",
        missing_fields: ["請款確認"],
        source: "LINE webhook",
        tags: ["已驗收", "請款", "LINE"],
        updated_at: messageTime || new Date().toISOString(),
      })

      return updateProject(supabase, activeProject.id, {
        status: "已驗收",
        progress: 95,
        latest_update: "業主已確認驗收通過",
        today_summary: "業主已確認完工與試水結果，下一步進入請款",
        missing_fields: ["請款確認"],
        tags: mergeTags(activeProject.tags, ["已驗收", "請款", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      })
    }

    if (parse.intent === "acceptance") {
      const activeProject = project || await insertProject(supabase, {
        title: parse.entities.caseHint || "LINE 完工驗收",
        customer_name: senderName || "LINE 使用者",
        location: "未填地點",
        project_type: "工程案件",
        source: "LINE webhook",
        missing_fields: parse.entities.caseHint ? [] : ["案件名稱"],
      })

      return updateProject(supabase, activeProject.id, {
        status: "待驗收",
        progress: 90,
        today_summary: summarizeMessage(messageText),
        latest_update: summarizeMessage(messageText),
        photo_status: /完工照|照片|相片|圖/.test(messageText) ? "完工照片已上傳" : activeProject.photo_status,
        tags: mergeTags(activeProject.tags, ["驗收", "完工"]),
        updated_at: messageTime || new Date().toISOString(),
      })
    }

    if (parse.intent === "quote_view_pdf") {
      const payload = {
        title: "q-001 屋頂防水工程",
        customer_name: project?.customer_name || senderName || "LINE 業主",
        location: project?.location || "未填地點",
        project_type: "防水 / 泥作",
        status: "已查看報價",
        progress: 45,
        latest_update: "業主已查看報價單 q-001",
        today_summary: "報價總額 NT$53,900，等待業主同意或修改",
        photo_status: project?.photo_status || "尚未上傳",
        change_order_status: project?.change_order_status || "無",
        missing_fields: project?.missing_fields || ["施工日", "現場照片"],
        source: "LINE webhook",
        tags: mergeTags(project?.tags, ["報價", "PDF", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      }

      return project ? updateProject(supabase, project.id, payload) : insertProject(supabase, payload)
    }

    if (parse.intent === "quote_approved") {
      const payload = {
        title: "q-001 屋頂防水工程",
        customer_name: project?.customer_name || senderName || "LINE 業主",
        location: project?.location || "未填地點",
        project_type: "防水 / 泥作",
        status: "業主已同意",
        progress: 55,
        latest_update: "業主已同意報價 q-001，可轉正式案件",
        today_summary: "報價總額 NT$53,900，等待安排施工日",
        photo_status: project?.photo_status || "尚未上傳",
        change_order_status: project?.change_order_status || "無",
        missing_fields: ["施工日", "現場照片"],
        source: "LINE webhook",
        tags: mergeTags(project?.tags, ["報價", "業主同意", "可轉案件", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      }

      return project ? updateProject(supabase, project.id, payload) : insertProject(supabase, payload)
    }

    if (parse.intent === "quote_change_request") {
      const payload = {
        title: "q-001 屋頂防水工程",
        customer_name: project?.customer_name || senderName || "LINE 業主",
        location: project?.location || "未填地點",
        project_type: "防水 / 泥作",
        status: "報價需修改",
        progress: 40,
        latest_update: "業主要求修改報價",
        today_summary: "報價總額 NT$53,900，等待重新調整報價",
        photo_status: project?.photo_status || "尚未上傳",
        change_order_status: project?.change_order_status || "無",
        missing_fields: project?.missing_fields || ["修改項目"],
        source: "LINE webhook",
        tags: mergeTags(project?.tags, ["報價", "要求修改", "LINE"]),
        updated_at: messageTime || new Date().toISOString(),
      }

      return project ? updateProject(supabase, project.id, payload) : insertProject(supabase, payload)
    }

    return null
  })
}

export async function createDailyReportFromMessage({ supabase, project, parse, messageText }) {
  return runBuildFlowSync("createDailyReportFromMessage", null, async () => {
    if (!["daily_report", "construction_daily_report"].includes(parse.intent) || !project?.id) return null
    const isConstructionDailyReport = parse.intent === "construction_daily_report"
    const workSummary = isConstructionDailyReport
      ? parse.entities.workSummary || summarizeMessage(messageText)
      : summarizeMessage(messageText)
    const photoStatus = isConstructionDailyReport
      ? parse.entities.photoStatus || "未提到照片"
      : parse.entities.hasPhotoKeyword ? "已提到照片" : "未提到照片"

    const { data, error } = await supabase
      .from("project_daily_reports")
      .insert({
        project_id: project.id,
        report_date: new Date().toISOString().slice(0, 10),
        worker_count: parse.entities.workerCount || null,
        work_summary: workSummary,
        next_work: parse.entities.nextWork || null,
        photo_status: photoStatus,
        source: "linebot",
      })
      .select("*")
      .single()

    if (error) throw error
    return data
  })
}

export async function findProjectByCaseHint(supabase, caseHint) {
  return runBuildFlowSync("findProjectByCaseHint", null, async () => {
    const hint = String(caseHint || "").trim()
    if (!hint) return null

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .limit(50)

    if (error) throw error

    return (data || []).find((project) => {
      const haystack = [project.title, project.customer_name, project.latest_update, project.today_summary]
        .filter(Boolean)
        .join(" ")
      return haystack.includes(hint)
    }) || null
  })
}

export async function appendBuildFlowSyncAction({ supabase, lineMessageId, projectId, actionType, parse, messageText }) {
  return runBuildFlowSync("appendBuildFlowSyncAction", null, async () => {
    if (!actionType) return null

    const { data, error } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: lineMessageId,
        project_id: projectId || null,
        action_type: actionType,
        payload: {
          source: "real_linebot",
          message: messageText,
          intent: parse.intent,
          entities: parse.entities,
          missingFields: parse.missingFields,
          suggestedActions: parse.suggestedActions,
          ...getQuoteActionPayload(parse),
          ...getConstructionDailyReportPayload(parse),
          ...getCompletionAcceptancePayload(parse),
          ...getAcceptanceConfirmedPayload(parse),
        },
        status: ["construction_daily_report", "completion_acceptance", "acceptance_confirmed"].includes(actionType)
          ? "synced"
          : "pending",
      })
      .select("*")
      .single()

    if (error) throw error
    return data
  })
}

async function insertProject(supabase, payload) {
  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("*")
    .single()

  if (error) throw error
  return data
}

async function updateProject(supabase, projectId, payload) {
  const { data, error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", projectId)
    .select("*")
    .single()

  if (error) throw error
  return data
}

async function runBuildFlowSync(operationName, fallback, operation) {
  try {
    return await operation()
  } catch (error) {
    console.warn(`[BuildFlow Sync] ${operationName} failed`, error)
    return fallback
  }
}

function summarizeMessage(messageText) {
  return String(messageText || "").trim().slice(0, 120)
}

function mergeTags(currentTags, nextTags) {
  const safeCurrentTags = Array.isArray(currentTags) ? currentTags : []
  return Array.from(new Set([...safeCurrentTags, ...nextTags]))
}

function getQuoteActionPayload(parse) {
  const quoteId = parse.entities.quoteId || "q-001"
  const amount = parse.entities.amount || QUOTE_AMOUNT

  if (parse.intent === "quote_view_pdf") {
    return {
      quoteId,
      amount,
      status: "報價單已查看",
      nextStep: "等待業主同意或修改",
    }
  }

  if (parse.intent === "quote_approved") {
    return {
      quoteId,
      amount,
      status: "業主已同意",
      nextStep: "轉成正式案件",
    }
  }

  if (parse.intent === "quote_change_request") {
    return {
      quoteId,
      amount,
      status: "業主要求修改",
      nextStep: "重新調整報價",
    }
  }

  return {}
}

function getConstructionDailyReportPayload(parse) {
  if (parse.intent !== "construction_daily_report") return {}

  return {
    quoteId: parse.entities.quoteId || "q-001",
    projectTitle: QUOTE_PROJECT_TITLE,
    workerCount: parse.entities.workerCount || null,
    workSummary: parse.entities.workSummary || "",
    nextWork: parse.entities.nextWork || "",
    photoStatus: parse.entities.photoStatus || "未提到照片",
    status: "施工中",
  }
}

function getCompletionAcceptancePayload(parse) {
  if (parse.intent !== "completion_acceptance") return {}

  return {
    quoteId: parse.entities.quoteId || "q-001",
    projectTitle: QUOTE_PROJECT_TITLE,
    status: "待驗收",
    progress: 90,
    testDuration: parse.entities.testDuration || "",
    acceptanceResult: parse.entities.acceptanceResult || "",
    photoStatus: parse.entities.photoStatus || "未提到照片",
    nextStep: "通知業主驗收",
  }
}

function getAcceptanceConfirmedPayload(parse) {
  if (parse.intent !== "acceptance_confirmed") return {}

  return {
    quoteId: parse.entities.quoteId || "q-001",
    projectTitle: QUOTE_PROJECT_TITLE,
    status: "已驗收",
    progress: 95,
    nextStep: "請款確認",
  }
}

function getAcceptanceSummary(parse, messageText) {
  const parts = [
    parse.entities.acceptanceResult,
    parse.entities.testDuration ? `試水 ${parse.entities.testDuration}` : "",
    parse.entities.photoStatus,
  ].filter(Boolean)

  return parts.length ? parts.join("；") : summarizeMessage(messageText)
}
