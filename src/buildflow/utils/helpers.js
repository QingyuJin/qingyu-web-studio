import { STORAGE_KEY, demoData } from "../data/demoData"

export const today = new Date().toISOString().slice(0, 10)

export function includesKeyword(text, keyword) {
  const cleanKeyword = String(keyword || "")
    .trim()
    .toLowerCase()
  if (!cleanKeyword) return true
  return String(text || "")
    .toLowerCase()
    .includes(cleanKeyword)
}

export function formatMoney(value) {
  return new Intl.NumberFormat("zh-TW").format(Number(value || 0))
}

export function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

export function textValue(form, key) {
  return String(form.get(key) || "").trim()
}

export function numberValue(form, key) {
  return Number(form.get(key)) || 0
}

export function cloneDemoData() {
  return JSON.parse(JSON.stringify(demoData))
}

export function copyByTextarea(text) {
  const textarea = document.createElement("textarea")
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

export function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneDemoData()
    const parsed = JSON.parse(raw)
    return {
      users: Array.isArray(parsed.users) ? parsed.users : demoData.users,
      projects: Array.isArray(parsed.projects) ? parsed.projects : demoData.projects,
      subcontracts: Array.isArray(parsed.subcontracts)
        ? parsed.subcontracts
        : demoData.subcontracts,
      bids: Array.isArray(parsed.bids) ? parsed.bids : demoData.bids,
      changeOrders: Array.isArray(parsed.changeOrders)
        ? parsed.changeOrders
        : demoData.changeOrders,
      quoteDrafts: Array.isArray(parsed.quoteDrafts) ? parsed.quoteDrafts : demoData.quoteDrafts,
      vendors: Array.isArray(parsed.vendors) ? parsed.vendors : demoData.vendors,
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : demoData.tasks,
    }
  } catch {
    return cloneDemoData()
  }
}
