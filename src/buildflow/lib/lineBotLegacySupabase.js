import { isSupabaseConfigured as hasSupabaseClientConfig, supabase } from "../../lib/supabaseClient"

const STATUS_PROGRESS = {
  待整理: 20,
  待場勘: 25,
  估價中: 40,
  已報價: 55,
  施工中: 75,
  待驗收: 90,
  已完成: 100,
}

export async function fetchLineProfiles() {
  return runLegacySupabase("fetchLineProfiles", [], async () => {
    const { data, error } = await supabase
      .from("line_profiles")
      .select("id, username, name, role, line_user_id")

    if (error) throw error
    return data || []
  })
}

export async function fetchLineProjects() {
  return runLegacySupabase("fetchLineProjects", [], async () => {
    const { data, error } = await supabase.from("line_projects").select("*")

    if (error) throw error
    return data || []
  })
}

export async function fetchLineTasks() {
  return runLegacySupabase("fetchLineTasks", [], async () => {
    const { data, error } = await supabase.from("line_tasks").select("*")

    if (error) throw error
    return data || []
  })
}

export async function fetchLineTaskReports() {
  return runLegacySupabase("fetchLineTaskReports", [], async () => {
    const { data, error } = await supabase.from("line_task_reports").select("*")

    if (error) throw error
    return data || []
  })
}

export async function fetchLegacyLineBotData() {
  if (!isLegacySupabaseConfigured()) {
    return {
      ok: false,
      data: emptyLegacyData(),
      reason: "not_configured",
    }
  }

  const [profiles, projects, tasks, reports] = await Promise.all([
    fetchLineProfiles(),
    fetchLineProjects(),
    fetchLineTasks(),
    fetchLineTaskReports(),
  ])

  return {
    ok: true,
    data: { profiles, projects, tasks, reports },
  }
}

export function mapLegacyLineDataToBuildFlowCases({ projects = [], tasks = [], reports = [] } = {}) {
  if (!projects.length && tasks.length) return mapTasksWithoutProjects(tasks, reports)

  return projects.map((project) => {
    const projectId = getProjectId(project)
    const projectTasks = tasks.filter((task) => getTaskProjectId(task) === projectId)
    const projectReports = getReportsForTasks(reports, projectTasks)
    const latestTask = getLatestByTime(projectTasks, ["updated_at", "created_at"])
    const latestReport = getLatestByTime(projectReports, ["created_at"])
    const status = normalizeLegacyStatus(firstText(project.status, latestTask?.status))
    const progress = getProgress(project.progress, status)

    return {
      id: `legacy-project-${projectId || project.name || project.title || cryptoRandomId()}`,
      name: firstText(project.name, project.title, project.project_name, "未命名工程案"),
      customer: firstText(project.customer, project.customer_name, project.client_name, project.client, "未填客戶"),
      location: firstText(project.address, project.location, "未填地點"),
      projectType: firstText(
        project.type,
        project.category,
        project.project_type,
        inferProjectType(`${project.name || ""} ${project.note || ""} ${latestTask?.title || ""}`),
      ),
      status,
      progress,
      lastUpdated: formatLegacyTime(
        firstText(latestReport?.created_at, latestTask?.updated_at, latestTask?.created_at, project.updated_at, project.created_at),
      ),
      dailySummary: firstText(latestReport?.content, latestTask?.report, latestTask?.note, project.note, "尚未有施工回報"),
      photoStatus: inferPhotoStatus(`${latestReport?.content || ""} ${latestTask?.report || ""} ${latestTask?.note || ""}`),
      hasChangeOrder: hasChangeOrder(`${project.note || ""} ${latestTask?.title || ""} ${latestTask?.note || ""}`),
      missingFields: getLegacyMissingFields(project),
      sourceNote: "LineBot 真實資料",
      tags: buildLegacyTags(project, projectTasks, projectReports),
    }
  })
}

export function mapLegacyTaskReportsToTimeline({ projects = [], tasks = [], reports = [] } = {}) {
  return reports.map((report) => {
    const task = tasks.find((item) => item.id && item.id === report.task_id)
    const project = projects.find((item) => getProjectId(item) === getTaskProjectId(task))
    const targetCaseName = firstText(task?.project_name, project?.name, project?.title, "未綁定案件回報")

    return {
      id: `legacy-report-${report.id || cryptoRandomId()}`,
      time: formatLegacyTime(report.created_at),
      sourceMessage: "LineBot 回報",
      intent: "legacy_task_report",
      type: "legacy_task_report",
      actionLabel: "新增施工回報",
      targetCaseName,
      caseName: targetCaseName,
      status: "已同步",
    }
  })
}

export function mapLegacyProfilesToCrew(profiles = []) {
  return profiles.map((profile) => ({
    id: profile.id || profile.username || cryptoRandomId(),
    name: firstText(profile.name, profile.username, "未命名成員"),
    username: firstText(profile.username, "未填帳號"),
    role: profile.role === "admin" ? "管理員" : "工班 / 師傅",
    lineUserId: firstText(profile.line_user_id, "尚未綁定 LINE"),
    sourceNote: "LineBot 真實資料",
  }))
}

export function isLegacySupabaseConfigured() {
  return Boolean(hasSupabaseClientConfig && supabase)
}

async function runLegacySupabase(operationName, fallback, operation) {
  if (!isLegacySupabaseConfigured()) return fallback

  try {
    return await operation()
  } catch (error) {
    console.warn(`[Legacy LineBot Supabase] ${operationName} failed`, error)
    return fallback
  }
}

function emptyLegacyData() {
  return {
    profiles: [],
    projects: [],
    tasks: [],
    reports: [],
  }
}

function mapTasksWithoutProjects(tasks, reports) {
  const tasksByProjectName = tasks.reduce((groups, task) => {
    const key = firstText(task.project_name, "未綁定案件回報")
    return {
      ...groups,
      [key]: [...(groups[key] || []), task],
    }
  }, {})

  return Object.entries(tasksByProjectName).map(([projectName, projectTasks]) => {
    const projectReports = getReportsForTasks(reports, projectTasks)
    const latestTask = getLatestByTime(projectTasks, ["updated_at", "created_at"])
    const latestReport = getLatestByTime(projectReports, ["created_at"])
    const status = normalizeLegacyStatus(latestTask?.status)

    return {
      id: `legacy-task-project-${projectName}`,
      name: projectName,
      customer: "未填客戶",
      location: "未填地點",
      projectType: inferProjectType(`${projectName} ${latestTask?.title || ""}`),
      status,
      progress: getProgress(latestTask?.progress, status),
      lastUpdated: formatLegacyTime(firstText(latestReport?.created_at, latestTask?.updated_at, latestTask?.created_at)),
      dailySummary: firstText(latestReport?.content, latestTask?.report, latestTask?.note, "尚未有施工回報"),
      photoStatus: inferPhotoStatus(`${latestReport?.content || ""} ${latestTask?.report || ""}`),
      hasChangeOrder: hasChangeOrder(`${latestTask?.title || ""} ${latestTask?.note || ""}`),
      missingFields: ["客戶", "地點"],
      sourceNote: "LineBot 真實資料",
      tags: ["LineBot", "真實資料"],
    }
  })
}

function getProjectId(project = {}) {
  return project.id || project.project_id || project.projectId || ""
}

function getTaskProjectId(task = {}) {
  return task.project_id || task.projectId || ""
}

function getReportsForTasks(reports, tasks) {
  const taskIds = tasks.map((task) => task.id).filter(Boolean)
  return reports.filter((report) => taskIds.includes(report.task_id))
}

function getLatestByTime(items, keys) {
  return [...items].sort((a, b) => {
    const aTime = getFirstDate(a, keys)
    const bTime = getFirstDate(b, keys)
    return bTime - aTime
  })[0]
}

function getFirstDate(item = {}, keys) {
  const value = keys.map((key) => item[key]).find(Boolean)
  const time = value ? new Date(value).getTime() : 0
  return Number.isNaN(time) ? 0 : time
}

function firstText(...values) {
  const fallback = values.at(-1)
  const found = values.slice(0, -1).find((value) => String(value || "").trim())
  return String(found || fallback || "").trim()
}

function normalizeLegacyStatus(status) {
  const value = String(status || "").trim()
  if (!value) return "待整理"
  if (/完成|完工|已完成/.test(value)) return "已完成"
  if (/驗收/.test(value)) return "待驗收"
  if (/施工|回報|進行/.test(value)) return "施工中"
  if (/已報價/.test(value)) return "已報價"
  if (/報價|估價/.test(value)) return "估價中"
  if (/場勘/.test(value)) return "待場勘"
  if (/待|新增|未/.test(value)) return "待整理"
  return value
}

function getProgress(progress, status) {
  const numericProgress = Number(progress)
  if (Number.isFinite(numericProgress)) return Math.max(0, Math.min(100, numericProgress))
  return STATUS_PROGRESS[status] || 20
}

function inferProjectType(text) {
  if (/防水|漏水|滲水|抓漏/.test(text)) return "防水 / 抓漏"
  if (/地坪|地板/.test(text)) return "地坪工程"
  if (/水電|電線/.test(text)) return "水電工程"
  if (/油漆|牆|修繕/.test(text)) return "修繕工程"
  return "工程案件"
}

function inferPhotoStatus(text) {
  if (/照片|相片|圖|上傳/.test(text)) return "已收到 LineBot 回報照片"
  return "未標記照片"
}

function hasChangeOrder(text) {
  return /追加|變更|多做/.test(text)
}

function getLegacyMissingFields(project = {}) {
  const missingFields = []
  if (!project.customer && !project.customer_name && !project.client_name && !project.client) missingFields.push("客戶")
  if (!project.address && !project.location) missingFields.push("地點")
  if (!project.status) missingFields.push("狀態")
  return missingFields
}

function buildLegacyTags(project = {}, tasks = [], reports = []) {
  const rawText = [
    project.name,
    project.title,
    project.project_name,
    project.note,
    ...tasks.flatMap((task) => [task.title, task.note, task.report]),
    ...reports.map((report) => report.content),
  ].join(" ")
  const tags = ["LineBot", "真實資料"]

  if (/防水|漏水|滲水|抓漏/.test(rawText)) tags.push("防水")
  if (/地坪|地板/.test(rawText)) tags.push("地坪")
  if (/報價|估價/.test(rawText)) tags.push("報價")
  if (/照片|相片|圖/.test(rawText)) tags.push("待照片")
  if (/追加|變更|多做/.test(rawText)) tags.push("追加")

  return Array.from(new Set(tags))
}

function formatLegacyTime(value) {
  if (!value) return "尚未更新"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return date.toLocaleString("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 10)
}
