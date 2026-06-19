function setJsonHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
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

function createLeadId() {
  const suffix = Math.random().toString(36).slice(2, 8)
  return `lead_${Date.now().toString(36)}_${suffix}`
}

export default async function handler(req, res) {
  setJsonHeaders(res)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" })
  }

  try {
    const body = readBody(req)
    const name = cleanText(body.name)
    const service = cleanText(body.service)

    if (!name || !service) {
      return res.status(400).json({ ok: false, error: "Missing required fields" })
    }

    const dashboardItem = {
      name,
      industry: cleanText(body.industry) || "未填產業",
      service,
      budget: cleanText(body.budget) || "未填預算",
      note: cleanText(body.note),
      status: "新需求",
      source: "API Demo",
      createdAt: new Date().toISOString(),
    }

    return res.status(200).json({
      ok: true,
      leadId: createLeadId(),
      status: "received",
      notification: "mock_sent",
      message: "Demo mode: notification simulated",
      dashboardItem,
    })
  } catch {
    return res.status(500).json({ ok: false, error: "Unable to process demo lead" })
  }
}
