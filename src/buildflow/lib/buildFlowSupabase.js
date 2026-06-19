import { isSupabaseConfigured as hasSupabaseClientConfig, supabase } from "../../lib/supabaseClient"

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const QUOTE_ACTION_TYPES = [
  "quote_view_pdf",
  "quote_approved",
  "quote_change_request",
  "quote_convert_project",
  "schedule_construction",
  "pre_construction_ready",
  "start_construction",
  "construction_daily_report",
  "completion_acceptance",
  "notify_acceptance",
  "acceptance_confirmed",
  "create_payment_request",
  "payment_confirmed",
]
const QUOTE_PROJECT_TITLE = "q-001 屋頂防水工程"
const QUOTE_AMOUNT = 53900

export function isSupabaseConfigured() {
  return Boolean(hasSupabaseClientConfig && supabase)
}

export async function fetchProjects() {
  return runSupabase("fetchProjects", { ok: false, data: [], reason: "not_configured" }, async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false })

    if (error) throw error
    return { ok: true, data: (data || []).map(mapProjectRowToDemoCase) }
  })
}

export async function saveProject(project) {
  return runSupabase("saveProject", { ok: false, data: null, reason: "not_configured" }, async () => {
    const row = {
      ...mapDemoCaseToProjectRow(project),
      updated_at: new Date().toISOString(),
    }

    if (!row.title) return { ok: false, data: null, reason: "missing_title" }

    const existing = await supabase
      .from("projects")
      .select("id")
      .eq("title", row.title)
      .limit(1)

    if (existing.error) throw existing.error

    const existingId = existing.data?.[0]?.id
    if (existingId) return updateProject(existingId, project)

    const { data, error } = await supabase
      .from("projects")
      .insert(row)
      .select("*")
      .single()

    if (error) throw error
    return { ok: true, data: mapProjectRowToDemoCase(data) }
  })
}

export async function updateProject(projectId, patch) {
  return runSupabase("updateProject", { ok: false, data: null, reason: "not_configured" }, async () => {
    if (!isUuid(projectId)) return { ok: false, data: null, reason: "invalid_project_id" }

    const row = {
      ...mapDemoCaseToProjectRow(patch),
      updated_at: new Date().toISOString(),
    }
    delete row.id

    const { data, error } = await supabase
      .from("projects")
      .update(row)
      .eq("id", projectId)
      .select("*")
      .single()

    if (error) throw error
    return { ok: true, data: mapProjectRowToDemoCase(data) }
  })
}

export async function fetchLineMessages() {
  return runSupabase("fetchLineMessages", { ok: false, data: [], reason: "not_configured" }, async () => {
    const { data, error } = await supabase
      .from("line_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return { ok: true, data: data || [] }
  })
}

export async function fetchBuildFlowSyncActions() {
  return runSupabase("fetchBuildFlowSyncActions", { ok: false, data: [], reason: "not_configured" }, async () => {
    const { data, error } = await supabase
      .from("buildflow_sync_actions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error
    return { ok: true, data: data || [] }
  })
}

export async function fetchQuoteStatus() {
  return runSupabase("fetchQuoteStatus", { ok: false, data: null, reason: "not_configured" }, async () => {
    const { data: actions, error: actionsError } = await supabase
      .from("buildflow_sync_actions")
      .select("*")
      .in("action_type", QUOTE_ACTION_TYPES)
      .order("created_at", { ascending: false })
      .limit(50)

    if (actionsError) throw actionsError
    if (!actions?.length) return { ok: true, data: null, reason: "empty" }
    const q001Actions = actions.filter(isQ001QuoteAction)
    const displayActions = (q001Actions.length ? q001Actions : actions).slice(0, 12)

    const lineMessageIds = displayActions.map((action) => action.line_message_id).filter(Boolean)
    const projectIds = displayActions.map((action) => action.project_id).filter(Boolean)
    const [messagesResult, parsesResult, projectsResult, dailyReportsResult] = await Promise.all([
      lineMessageIds.length
        ? supabase.from("line_messages").select("*").in("id", lineMessageIds)
        : Promise.resolve({ data: [], error: null }),
      lineMessageIds.length
        ? supabase.from("line_message_parses").select("*").in("line_message_id", lineMessageIds)
        : Promise.resolve({ data: [], error: null }),
      projectIds.length
        ? supabase.from("projects").select("*").in("id", projectIds)
        : Promise.resolve({ data: [], error: null }),
      projectIds.length
        ? supabase
          .from("project_daily_reports")
          .select("*")
          .in("project_id", projectIds)
          .order("created_at", { ascending: false })
          .limit(5)
        : Promise.resolve({ data: [], error: null }),
    ])

    if (messagesResult.error) throw messagesResult.error
    if (parsesResult.error) throw parsesResult.error
    if (projectsResult.error) throw projectsResult.error
    if (dailyReportsResult.error) throw dailyReportsResult.error

    return {
      ok: true,
      data: mapQuoteStatusData({
        actions: displayActions,
        messages: messagesResult.data || [],
        parses: parsesResult.data || [],
        projects: projectsResult.data || [],
        dailyReports: dailyReportsResult.data || [],
      }),
    }
  })
}

export async function convertQuoteToProject(quoteStatus = {}) {
  return runSupabase("convertQuoteToProject", { ok: false, data: null, reason: "not_configured" }, async () => {
    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      status: "待排施工",
      progress: 65,
      latest_update: "報價已確認，等待安排施工日",
      today_summary: "報價總額 NT$53,900，業主已同意，下一步安排施工日",
      missing_fields: ["施工日", "現場照片"],
      source: "LINE webhook",
      tags: ["報價", "業主同意", "正式案件", "待排施工", "LINE"],
      customer_name: quoteStatus.customerName || "LINE 業主",
      location: quoteStatus.location || "未填地點",
      project_type: "防水 / 泥作",
      photo_status: "尚未上傳",
      change_order_status: "無",
      updated_at: new Date().toISOString(),
    }

    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      amount: quoteStatus.amount || QUOTE_AMOUNT,
      status: "已轉正式案件",
      nextStep: "安排施工日",
      projectTitle: QUOTE_PROJECT_TITLE,
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "quote_convert_project",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          amount: payload.amount,
          status: payload.status,
          nextStep: payload.nextStep,
          badge: "已轉正式案件",
          badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: "待排施工",
          scheduledDate: "",
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: payload.status,
              nextStep: payload.nextStep,
              message: "報價轉正式案件",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function scheduleQuoteConstruction(quoteStatus = {}, scheduledDate = "") {
  return runSupabase("scheduleQuoteConstruction", { ok: false, data: null, reason: "not_configured" }, async () => {
    if (!scheduledDate) return { ok: false, data: null, reason: "missing_scheduled_date" }

    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      status: "已排施工",
      progress: 70,
      latest_update: `已安排施工日：${scheduledDate}`,
      today_summary: "報價已確認，施工日已安排，準備進場前確認",
      missing_fields: ["現場照片"],
      source: "LINE webhook",
      tags: ["報價", "正式案件", "已排施工", "LINE"],
      customer_name: quoteStatus.customerName || "LINE 業主",
      location: quoteStatus.location || "未填地點",
      project_type: "防水 / 泥作",
      photo_status: quoteStatus.photoStatus || "尚未上傳",
      change_order_status: "無",
      updated_at: new Date().toISOString(),
    }

    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      projectTitle: QUOTE_PROJECT_TITLE,
      scheduledDate,
      status: "已排施工",
      nextStep: "施工前準備",
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "schedule_construction",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          status: payload.status,
          nextStep: payload.nextStep,
          badge: "已排施工",
          badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: "已排施工",
          scheduledDate,
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: `已安排施工日：${scheduledDate}`,
              nextStep: payload.nextStep,
              message: "安排施工日",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function completePreConstructionReady(quoteStatus = {}) {
  return runSupabase("completePreConstructionReady", { ok: false, data: null, reason: "not_configured" }, async () => {
    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      status: "施工前準備完成",
      progress: 72,
      latest_update: "施工前準備已完成，等待進場施工",
      today_summary: "施工日、師傅、材料與現場照片已確認",
      missing_fields: [],
      source: "LINE webhook",
      tags: ["正式案件", "已排施工", "施工前準備完成", "LINE"],
      customer_name: quoteStatus.customerName || "LINE 業主",
      location: quoteStatus.location || "未填地點",
      project_type: "防水 / 泥作",
      photo_status: "現場照片已確認",
      change_order_status: "無",
      updated_at: new Date().toISOString(),
    }

    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      projectTitle: QUOTE_PROJECT_TITLE,
      status: "施工前準備完成",
      nextStep: "進場施工",
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "pre_construction_ready",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          status: payload.status,
          nextStep: payload.nextStep,
          badge: "施工前準備完成",
          badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: "施工前準備完成",
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: payload.status,
              nextStep: payload.nextStep,
              message: "施工前準備完成",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function startQuoteConstruction(quoteStatus = {}) {
  return runSupabase("startQuoteConstruction", { ok: false, data: null, reason: "not_configured" }, async () => {
    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      status: "施工中",
      progress: 75,
      latest_update: "已開始進場施工",
      today_summary: "已完成施工前準備，今日開始進場施工",
      missing_fields: [],
      source: "LINE webhook",
      tags: ["正式案件", "施工中", "LINE"],
      customer_name: quoteStatus.customerName || "LINE 業主",
      location: quoteStatus.location || "未填地點",
      project_type: "防水 / 泥作",
      photo_status: quoteStatus.photoStatus || "現場照片已確認",
      change_order_status: "無",
      updated_at: new Date().toISOString(),
    }

    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      projectTitle: QUOTE_PROJECT_TITLE,
      status: "施工中",
      nextStep: "每日施工回報",
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "start_construction",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          status: payload.status,
          nextStep: payload.nextStep,
          badge: "施工中",
          badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: "施工中",
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: "開始施工",
              nextStep: payload.nextStep,
              message: "開始施工",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function notifyQuoteAcceptance(quoteStatus = {}) {
  return runSupabase("notifyQuoteAcceptance", { ok: false, data: null, reason: "not_configured" }, async () => {
    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      latest_update: "已通知業主驗收",
      tags: mergeTags(existingProject?.tags, ["已通知驗收"]),
      customer_name: existingProject?.customer_name || quoteStatus.customerName || "LINE 業主",
      location: existingProject?.location || quoteStatus.location || "未填地點",
      project_type: existingProject?.project_type || "防水 / 泥作",
      status: existingProject?.status || "待驗收",
      progress: existingProject?.progress || 90,
      today_summary: existingProject?.today_summary || quoteStatus.acceptanceSummary || "等待業主驗收確認",
      photo_status: existingProject?.photo_status || quoteStatus.acceptance?.photoStatus || "完工照片狀態未確認",
      missing_fields: existingProject?.missing_fields || ["業主驗收確認"],
      source: "LINE webhook",
      updated_at: new Date().toISOString(),
    }

    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      projectTitle: QUOTE_PROJECT_TITLE,
      status: "已通知業主驗收",
      nextStep: "等待業主確認",
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "notify_acceptance",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          status: payload.status,
          nextStep: payload.nextStep,
          badge: "已通知驗收",
          badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: project.status,
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: payload.status,
              nextStep: payload.nextStep,
              message: "通知業主驗收",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function createPaymentRequest(quoteStatus = {}) {
  return runSupabase("createPaymentRequest", { ok: false, data: null, reason: "not_configured" }, async () => {
    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      status: "待請款",
      progress: 97,
      latest_update: "已建立請款紀錄，等待業主付款",
      today_summary: "工程已驗收，請款金額 NT$53,900",
      missing_fields: ["付款確認"],
      source: "LINE webhook",
      tags: mergeTags(existingProject?.tags, ["待請款", "付款確認"]),
      customer_name: existingProject?.customer_name || quoteStatus.customerName || "LINE 業主",
      location: existingProject?.location || quoteStatus.location || "未填地點",
      project_type: existingProject?.project_type || "防水 / 泥作",
      photo_status: existingProject?.photo_status || quoteStatus.acceptance?.photoStatus || "完工照片已上傳",
      change_order_status: existingProject?.change_order_status || "無",
      updated_at: new Date().toISOString(),
    }

    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      amount: quoteStatus.amount || QUOTE_AMOUNT,
      projectTitle: QUOTE_PROJECT_TITLE,
      status: "待請款",
      nextStep: "等待付款確認",
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "create_payment_request",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          amount: payload.amount,
          status: payload.status,
          nextStep: payload.nextStep,
          badge: "待請款",
          badgeTone: "bg-amber-50 text-amber-700 border-amber-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: "待請款",
          payment: {
            amount: payload.amount,
            status: payload.status,
            nextStep: payload.nextStep,
            syncedAt: action.created_at,
          },
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: "建立請款紀錄",
              nextStep: payload.nextStep,
              message: "建立請款紀錄",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function confirmQuotePayment(quoteStatus = {}) {
  return runSupabase("confirmQuotePayment", { ok: false, data: null, reason: "not_configured" }, async () => {
    const existing = await supabase
      .from("projects")
      .select("*")
      .eq("title", QUOTE_PROJECT_TITLE)
      .limit(1)

    if (existing.error) throw existing.error

    const existingProject = existing.data?.[0]
    const projectRow = {
      title: QUOTE_PROJECT_TITLE,
      status: "已結案",
      progress: 100,
      latest_update: "已確認付款，案件已結案",
      today_summary: "工程已驗收並完成付款，案件進入保固期",
      missing_fields: [],
      photo_status: "完工照片已上傳",
      change_order_status: "無",
      source: "LINE webhook",
      tags: ["已結案", "已付款", "保固中", "LINE"],
      customer_name: existingProject?.customer_name || quoteStatus.customerName || "LINE 業主",
      location: existingProject?.location || quoteStatus.location || "未填地點",
      project_type: existingProject?.project_type || "防水 / 泥作",
      updated_at: new Date().toISOString(),
    }

    const projectMutation = existingProject
      ? supabase.from("projects").update(projectRow).eq("id", existingProject.id)
      : supabase.from("projects").insert(projectRow)

    const { data: project, error: projectError } = await projectMutation
      .select("*")
      .single()

    if (projectError) throw projectError

    const warranty = getWarrantyPayload()
    const payload = {
      quoteId: quoteStatus.quoteId || "q-001",
      amount: quoteStatus.amount || QUOTE_AMOUNT,
      status: "已付款",
      nextStep: "案件結案並進入保固",
      projectTitle: QUOTE_PROJECT_TITLE,
      warranty,
    }

    const { data: action, error: actionError } = await supabase
      .from("buildflow_sync_actions")
      .insert({
        line_message_id: quoteStatus.lineMessageId || null,
        project_id: project.id,
        action_type: "payment_confirmed",
        payload,
        status: "synced",
      })
      .select("*")
      .single()

    if (actionError) throw actionError

    return {
      ok: true,
      data: {
        project: mapProjectRowToDemoCase(project),
        action,
        quoteStatus: {
          ...quoteStatus,
          quoteId: payload.quoteId,
          amount: payload.amount,
          status: "已結案",
          nextStep: payload.nextStep,
          badge: "已結案",
          badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
          projectName: QUOTE_PROJECT_TITLE,
          projectStatus: "已結案",
          payment: {
            amount: payload.amount,
            status: payload.status,
            nextStep: payload.nextStep,
            syncedAt: action.created_at,
          },
          warranty,
          syncedAt: action.created_at,
          actions: [
            {
              id: action.id,
              actionType: action.action_type,
              label: "付款確認 → 案件結案",
              nextStep: payload.nextStep,
              message: "付款確認",
              time: action.created_at,
            },
            ...(quoteStatus.actions || []),
          ],
        },
      },
    }
  })
}

export async function saveLineMessage(message) {
  return runSupabase("saveLineMessage", { ok: false, data: null, reason: "not_configured" }, async () => {
    const row = omitUndefined({
      scenario_id: message.scenarioId,
      role: message.senderRole || message.role,
      sender_name: message.senderLabel || message.senderName,
      message: message.message || message.text,
      message_time: message.time || message.messageTime,
      status: message.status,
      tags: normalizeJsonArray(message.tags),
    })

    const { data, error } = await supabase
      .from("line_messages")
      .insert(row)
      .select("*")
      .single()

    if (error) throw error
    return { ok: true, data }
  })
}

export async function saveLineMessageParse(parse) {
  return runSupabase("saveLineMessageParse", { ok: false, data: null, reason: "not_configured" }, async () => {
    const row = omitUndefined({
      line_message_id: parse.line_message_id || parse.lineMessageId,
      intent: parse.intent,
      confidence: parse.confidence,
      entities: parse.entities || {},
      missing_fields: normalizeJsonArray(parse.missing_fields || parse.missingFields),
      suggested_actions: normalizeJsonArray(parse.suggested_actions || parse.suggestedActions),
    })

    const { data, error } = await supabase
      .from("line_message_parses")
      .insert(row)
      .select("*")
      .single()

    if (error) throw error
    return { ok: true, data }
  })
}

export async function saveSyncAction(action) {
  return runSupabase("saveSyncAction", { ok: false, data: null, reason: "not_configured" }, async () => {
    const row = omitUndefined({
      line_message_id: action.line_message_id || action.lineMessageId,
      project_id: action.project_id || action.projectId,
      action_type: action.action_type || action.actionType || action.type,
      payload: action.payload || {},
      status: action.status || "synced",
    })

    const { data, error } = await supabase
      .from("buildflow_sync_actions")
      .insert(row)
      .select("*")
      .single()

    if (error) throw error
    return { ok: true, data }
  })
}

export async function saveDailyReport(report) {
  return runSupabase("saveDailyReport", { ok: false, data: null, reason: "not_configured" }, async () => {
    const row = omitUndefined({
      project_id: report.project_id || report.projectId,
      report_date: report.report_date || report.reportDate || new Date().toISOString().slice(0, 10),
      worker_count: report.worker_count || report.workerCount,
      work_summary: report.work_summary || report.workSummary,
      next_work: report.next_work || report.nextWork,
      photo_status: report.photo_status || report.photoStatus,
      source: report.source || "linebot",
    })

    const { data, error } = await supabase
      .from("project_daily_reports")
      .insert(row)
      .select("*")
      .single()

    if (error) throw error
    return { ok: true, data }
  })
}

export function mapProjectRowToDemoCase(row) {
  const tags = normalizeJsonArray(row.tags)
  const demoCaseId = tags
    .find((tag) => typeof tag === "string" && tag.startsWith("demo-case-id:"))
    ?.replace("demo-case-id:", "")

  return {
    id: demoCaseId || row.id,
    name: row.title || "",
    customer: row.customer_name || "",
    location: row.location || "",
    projectType: row.project_type || "",
    status: row.status || "",
    progress: row.progress || 0,
    lastUpdated: row.latest_update || "",
    dailySummary: row.today_summary || "",
    photoStatus: row.photo_status || "",
    hasChangeOrder: Boolean(row.change_order_status && row.change_order_status !== "無"),
    missingFields: normalizeJsonArray(row.missing_fields),
    sourceNote: row.source || "Supabase Demo",
    tags,
    supabaseId: row.id,
  }
}

export function mapSyncActionsToTimeline(actions = []) {
  return actions.map((action) => {
    const payload = action.payload && typeof action.payload === "object" ? action.payload : {}
    const actionLabel = getSyncActionLabel(action.action_type, payload)
    const quoteLabel = payload.quoteId ? `${payload.quoteId} 報價流程` : ""

    return {
      id: action.id,
      time: formatTimelineTime(action.created_at),
      sourceMessage: getTimelineSourceMessage(action.action_type, payload, quoteLabel),
      intent: payload.intent || action.action_type || "unknown",
      actionLabel,
      caseName: payload.projectTitle || quoteLabel || payload.caseName || payload.targetCaseName || action.project_id || "BuildFlow 案件",
      targetCaseName: payload.projectTitle || quoteLabel || payload.targetCaseName || payload.caseName || action.project_id || "BuildFlow 案件",
      status: getSyncActionStatusLabel(action.status, payload),
    }
  })
}

export function mapDemoCaseToProjectRow(project = {}) {
  const tags = normalizeJsonArray(project.tags)
  const tagsWithDemoId = project.id && !isUuid(project.id)
    ? Array.from(new Set([...tags, `demo-case-id:${project.id}`]))
    : tags

  const row = omitUndefined({
    title: project.name || project.title,
    customer_name: project.customer || project.customerName,
    location: project.location,
    project_type: project.projectType || project.project_type,
    status: project.status,
    progress: project.progress,
    latest_update: project.lastUpdated || project.latest_update,
    today_summary: project.dailySummary || project.today_summary,
    photo_status: project.photoStatus || project.photo_status,
    change_order_status:
      project.changeOrderStatus ||
      project.change_order_status ||
      (project.hasChangeOrder ? "待確認追加工程" : "無"),
    missing_fields: normalizeJsonArray(project.missingFields || project.missing_fields),
    source: project.source || project.sourceNote,
    tags: tagsWithDemoId,
  })

  if (isUuid(project.id)) row.id = project.id
  return row
}

async function runSupabase(operationName, fallback, operation) {
  if (!isSupabaseConfigured()) return fallback

  try {
    return await operation()
  } catch (error) {
    console.warn(`[BuildFlow Supabase] ${operationName} failed`, error)
    return {
      ...fallback,
      reason: error?.message || "supabase_error",
    }
  }
}

function normalizeJsonArray(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  return [value]
}

function mergeTags(currentTags, nextTags) {
  return Array.from(new Set([...normalizeJsonArray(currentTags), ...normalizeJsonArray(nextTags)]))
}

function getWarrantyPayload(baseDate = new Date().toISOString()) {
  const startDate = new Date(baseDate)
  const expiresAt = new Date(startDate)
  expiresAt.setFullYear(expiresAt.getFullYear() + 1)

  return {
    status: "保固中",
    item: "屋頂防水",
    startDate: startDate.toISOString().slice(0, 10),
    period: "一年",
    expiresAt: expiresAt.toISOString().slice(0, 10),
    note: "保固範圍依報價單與施工紀錄為準",
  }
}

function omitUndefined(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  )
}

function isUuid(value) {
  return typeof value === "string" && UUID_PATTERN.test(value)
}

function isQ001QuoteAction(action = {}) {
  const payload = action.payload && typeof action.payload === "object" ? action.payload : {}
  return payload.quoteId === "q-001" || payload.projectTitle === QUOTE_PROJECT_TITLE
}

function mapQuoteStatusData({ actions = [], messages = [], parses = [], projects = [], dailyReports = [] }) {
  const orderedActions = [...actions].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
  const latestAction = orderedActions[0]
  const payload = latestAction?.payload && typeof latestAction.payload === "object" ? latestAction.payload : {}
  const latestMessage = messages.find((message) => message.id === latestAction?.line_message_id)
  const latestParse = parses.find((parse) => parse.line_message_id === latestAction?.line_message_id)
  const latestProject = projects.find((project) => project.id === latestAction?.project_id)
  const actionType = latestAction?.action_type || latestParse?.intent || payload.intent || ""
  const statusMeta = getQuoteStatusMeta(actionType)
  const amount = payload.amount || latestParse?.entities?.amount || 53900
  const quoteId = payload.quoteId || latestParse?.entities?.quoteId || "q-001"
  const orderedDailyReports = [...dailyReports].sort(
    (a, b) => new Date(b.created_at || b.report_date || 0) - new Date(a.created_at || a.report_date || 0),
  )
  const latestDailyReport = orderedDailyReports[0]
  const latestAcceptanceAction = orderedActions.find((action) => action.action_type === "completion_acceptance")
  const latestAcceptanceConfirmedAction = orderedActions.find((action) => action.action_type === "acceptance_confirmed")
  const latestPaymentAction = orderedActions.find((action) => action.action_type === "create_payment_request")
  const latestPaymentConfirmedAction = orderedActions.find((action) => action.action_type === "payment_confirmed")
  const latestAcceptancePayload =
    latestAcceptanceAction?.payload && typeof latestAcceptanceAction.payload === "object"
      ? latestAcceptanceAction.payload
      : {}
  const latestAcceptanceConfirmedPayload =
    latestAcceptanceConfirmedAction?.payload && typeof latestAcceptanceConfirmedAction.payload === "object"
      ? latestAcceptanceConfirmedAction.payload
      : {}
  const latestPaymentPayload =
    latestPaymentAction?.payload && typeof latestPaymentAction.payload === "object"
      ? latestPaymentAction.payload
      : {}
  const latestPaymentConfirmedPayload =
    latestPaymentConfirmedAction?.payload && typeof latestPaymentConfirmedAction.payload === "object"
      ? latestPaymentConfirmedAction.payload
      : {}

  return {
    quoteId,
    amount,
    actionType,
    lineMessageId: latestAction?.line_message_id || "",
    projectId: latestAction?.project_id || latestProject?.id || "",
    projectStatus: latestProject?.status || payload.projectStatus || "",
    scheduledDate: payload.scheduledDate || "",
    status: payload.status || statusMeta.status,
    nextStep: payload.nextStep || statusMeta.nextStep,
    badge: statusMeta.badge,
    badgeTone: statusMeta.badgeTone,
    latestMessage: latestMessage?.message || payload.message || "尚無 LINE 訊息內容",
    syncedAt: latestAction?.created_at || latestMessage?.created_at || "",
    projectName: latestProject?.title || `${quoteId} 屋頂防水工程`,
    acceptance: latestAcceptanceAction || latestAcceptanceConfirmedAction
      ? {
        status: latestAcceptanceConfirmedPayload.status || latestAcceptancePayload.status || "待驗收",
        ownerConfirmed: latestAcceptanceConfirmedAction ? "已確認" : "待確認",
        testDuration: latestAcceptancePayload.testDuration || "",
        acceptanceResult: latestAcceptancePayload.acceptanceResult || "",
        photoStatus: latestAcceptancePayload.photoStatus || "",
        nextStep: latestAcceptanceConfirmedPayload.nextStep || latestAcceptancePayload.nextStep || "通知業主驗收",
        syncedAt: latestAcceptanceConfirmedAction?.created_at || latestAcceptanceAction?.created_at || "",
      }
      : null,
    payment: latestPaymentAction || latestPaymentConfirmedAction
      ? {
        amount: latestPaymentConfirmedPayload.amount || latestPaymentPayload.amount || 53900,
        status: latestPaymentConfirmedPayload.status || latestPaymentPayload.status || "待請款",
        nextStep: latestPaymentConfirmedPayload.nextStep || latestPaymentPayload.nextStep || "等待付款確認",
        syncedAt: latestPaymentConfirmedAction?.created_at || latestPaymentAction?.created_at || "",
      }
      : null,
    warranty: latestPaymentConfirmedAction
      ? latestPaymentConfirmedPayload.warranty || getWarrantyPayload(latestPaymentConfirmedAction.created_at)
      : null,
    dailyReport: latestDailyReport
      ? {
        id: latestDailyReport.id,
        date: latestDailyReport.report_date,
        workerCount: latestDailyReport.worker_count,
        workSummary: latestDailyReport.work_summary,
        nextWork: latestDailyReport.next_work,
        photoStatus: latestDailyReport.photo_status,
        source: latestDailyReport.source,
      }
      : null,
    actions: orderedActions.map((action) => {
      const actionPayload = action.payload && typeof action.payload === "object" ? action.payload : {}
      const message = messages.find((item) => item.id === action.line_message_id)
      const meta = getQuoteStatusMeta(action.action_type)

      return {
        id: action.id,
        actionType: action.action_type,
        label: actionPayload.status || meta.status,
        nextStep: actionPayload.nextStep || meta.nextStep,
        message: message?.message || actionPayload.message || "",
        time: action.created_at || message?.created_at || "",
      }
    }),
  }
}

function getQuoteStatusMeta(actionType) {
  const meta = {
    quote_view_pdf: {
      status: "報價單已查看",
      nextStep: "等待業主同意或修改",
      badge: "等待回覆",
      badgeTone: "bg-sky-50 text-sky-700 border-sky-200",
    },
    quote_approved: {
      status: "業主已同意",
      nextStep: "轉成正式案件",
      badge: "可轉正式案件",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    quote_change_request: {
      status: "業主要求修改",
      nextStep: "重新調整報價",
      badge: "待修改報價",
      badgeTone: "bg-amber-50 text-amber-700 border-amber-200",
    },
    quote_convert_project: {
      status: "已轉正式案件",
      nextStep: "安排施工日",
      badge: "已轉正式案件",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    schedule_construction: {
      status: "已排施工",
      nextStep: "施工前準備",
      badge: "已排施工",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    pre_construction_ready: {
      status: "施工前準備完成",
      nextStep: "進場施工",
      badge: "施工前準備完成",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    start_construction: {
      status: "施工中",
      nextStep: "每日施工回報",
      badge: "施工中",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    construction_daily_report: {
      status: "施工中",
      nextStep: "持續追蹤每日回報",
      badge: "每日回報已同步",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    completion_acceptance: {
      status: "待驗收",
      nextStep: "通知業主驗收",
      badge: "待驗收",
      badgeTone: "bg-amber-50 text-amber-700 border-amber-200",
    },
    notify_acceptance: {
      status: "已通知業主驗收",
      nextStep: "等待業主確認",
      badge: "已通知驗收",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    acceptance_confirmed: {
      status: "已驗收",
      nextStep: "請款確認",
      badge: "已驗收",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    create_payment_request: {
      status: "待請款",
      nextStep: "等待付款確認",
      badge: "待請款",
      badgeTone: "bg-amber-50 text-amber-700 border-amber-200",
    },
    payment_confirmed: {
      status: "已結案",
      nextStep: "案件結案並進入保固",
      badge: "已結案",
      badgeTone: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  }

  return meta[actionType] || {
    status: "尚無報價狀態",
    nextStep: "等待 LINE Bot 同步報價流程",
    badge: "尚無紀錄",
    badgeTone: "bg-slate-50 text-slate-600 border-slate-200",
  }
}

function getSyncActionLabel(actionType, payload = {}) {
  const labels = {
    quote_view_pdf: "報價單已查看",
    quote_approved: "業主已同意",
    quote_change_request: "報價需修改",
    quote_convert_project: "報價轉正式案件",
    schedule_construction: "已安排施工日",
    pre_construction_ready: "施工前準備完成",
    start_construction: "開始施工",
    construction_daily_report: "LINE 每日回報 → 新增施工日誌",
    completion_acceptance: "LINE 完工回報 → 標記待驗收",
    notify_acceptance: "通知業主驗收",
    acceptance_confirmed: "業主驗收確認",
    create_payment_request: "建立請款紀錄",
    payment_confirmed: "付款確認 → 案件結案",
    request_missing_info: "通知補資料",
    mark_quotation: "更新報價狀態",
    mark_site_survey: "標記待場勘",
    add_daily_report: "新增施工回報",
    add_change_order: "新增追加工程",
    update_status: "更新案件狀態",
    mark_acceptance: "標記待驗收",
  }

  if (actionType === "construction_daily_report") return labels.construction_daily_report
  if (actionType === "start_construction") return labels.start_construction
  if (actionType === "completion_acceptance") return labels.completion_acceptance
  if (actionType === "notify_acceptance") return labels.notify_acceptance
  if (actionType === "acceptance_confirmed") return labels.acceptance_confirmed
  if (actionType === "create_payment_request") return labels.create_payment_request
  if (actionType === "payment_confirmed") return labels.payment_confirmed
  return payload.status || labels[actionType] || actionType || "已同步"
}

function getTimelineSourceMessage(actionType, payload = {}, quoteLabel = "") {
  if (actionType === "construction_daily_report") return "LINE 每日回報"
  if (actionType === "completion_acceptance") return "LINE 完工回報"
  if (actionType === "notify_acceptance") return "通知業主驗收"
  if (actionType === "acceptance_confirmed") return "LINE 驗收確認"
  if (actionType === "create_payment_request") return "建立請款紀錄"
  if (actionType === "payment_confirmed") return "付款確認"
  return payload.message || quoteLabel || "LineBot 訊息"
}

function getSyncActionStatusLabel(status, payload = {}) {
  if (payload.nextStep) return payload.nextStep
  if (status === "synced") return "已同步"
  if (status === "pending") return "待處理"
  return status || "已同步"
}

function formatTimelineTime(value) {
  if (!value) return "剛剛"

  try {
    return new Intl.DateTimeFormat("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(value))
  } catch {
    return "剛剛"
  }
}
