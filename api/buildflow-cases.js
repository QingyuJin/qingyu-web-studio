const statusMessages = {
  "待估價": "已收到您的案件需求，我們會先整理照片與問題描述，接著安排初步估價。",
  "已報價": "已完成初步報價，您可以查看報價明細，確認後即可安排施工時間。",
  "施工中": "案件目前施工中，如有現場照片或進度更新，會同步整理在系統紀錄。",
  "完工": "案件已完工，請安排驗收。若有後續保固或維修需求，也可透過 LINE 回報。",
}

const initialCases = [
  {
    id: "BF-001",
    customer: "林先生",
    type: "屋頂防水",
    status: "待估價",
    budget: "NT$28,000",
    createdAt: "2026-06-20",
    source: "LINE",
    description: "屋頂下雨會滲水，想先估價。",
    photos: ["roof-1", "roof-2"],
    logs: ["已收到案件需求，等待初步估價。"],
  },
  {
    id: "BF-002",
    customer: "王小姐",
    type: "浴室漏水修繕",
    status: "已報價",
    budget: "NT$36,000",
    createdAt: "2026-06-20",
    source: "表單",
    description: "浴室外牆滲水，已補現場照片，等待客戶確認報價。",
    photos: ["bathroom-1", "bathroom-2", "quote-photo"],
    logs: ["已完成報價，等待客戶確認。"],
  },
]

let caseStore = initialCases.map((item) => ({ ...item, logs: [...item.logs], photos: [...item.photos] }))

function setJsonHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

function readBody(req) {
  if (!req.body) return {}
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : ""
}

function createCaseId() {
  return `BF-${String(caseStore.length + 1).padStart(3, "0")}`
}

function normalizeCase(body) {
  return {
    id: createCaseId(),
    customer: cleanText(body.customer),
    type: cleanText(body.type),
    status: "待估價",
    budget: cleanText(body.budget) || "未填預算",
    createdAt: new Date().toISOString().slice(0, 10),
    source: cleanText(body.source) || "LINE",
    description: cleanText(body.description),
    photos: Array.isArray(body.photos) ? body.photos : ["site-photo-1", "site-photo-2"],
    logs: [statusMessages["待估價"]],
  }
}

function findOrCreateCase(id) {
  let target = caseStore.find((item) => item.id === id)
  if (!target) {
    target = {
      id,
      customer: "未填客戶",
      type: "工程案件",
      status: "待估價",
      budget: "未填預算",
      createdAt: new Date().toISOString().slice(0, 10),
      source: "API Demo",
      description: "由狀態更新建立的 demo 案件。",
      photos: ["site-photo-1"],
      logs: [statusMessages["待估價"]],
    }
    caseStore = [target, ...caseStore]
  }
  return target
}

export default async function handler(req, res) {
  setJsonHeaders(res)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  try {
    if (req.method === "GET") {
      return res.status(200).json({ ok: true, cases: caseStore })
    }

    if (req.method === "POST") {
      const body = readBody(req)
      if (!cleanText(body.customer) || !cleanText(body.type)) {
        return res.status(400).json({ ok: false, error: "Missing required fields" })
      }
      const nextCase = normalizeCase(body)
      caseStore = [nextCase, ...caseStore]
      return res.status(200).json({ ok: true, case: nextCase })
    }

    if (req.method === "PATCH") {
      const body = readBody(req)
      const id = cleanText(body.id)
      const status = cleanText(body.status)

      if (!id || !status) {
        return res.status(400).json({ ok: false, error: "Missing required fields" })
      }

      const lineMessage = statusMessages[status] || `案件狀態已更新為 ${status}。`
      const target = findOrCreateCase(id)
      target.status = status
      target.logs = [lineMessage, ...target.logs]
      caseStore = caseStore.map((item) => (item.id === target.id ? target : item))

      return res.status(200).json({ ok: true, case: target, lineMessage })
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" })
  } catch {
    return res.status(500).json({ ok: false, error: "Unable to process BuildFlow demo request" })
  }
}
