function setHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Access-Control-Allow-Origin", "*")
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

function cleanText(value, maxLength = 2000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

export default async function handler(req, res) {
  setHeaders(res)

  if (req.method === "OPTIONS") {
    return res.status(204).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" })
  }

  const body = readBody(req)
  const payload = {
    name: cleanText(body.name, 100),
    contact: cleanText(body.contact, 200),
    company: cleanText(body.area || body.company, 200),
    service_type: cleanText(body.service_type || body.service, 100) || "工程需求",
    budget_range: cleanText(body.budget_range || body.budget, 100),
    message: cleanText(body.message),
    source: cleanText(body.source, 100) || "xinjiang-website",
    status: "new",
  }

  if (!payload.name || !payload.contact) {
    return res.status(400).json({ ok: false, error: "請填寫姓名與聯絡方式" })
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return res.status(200).json({
      ok: true,
      stored: false,
      mode: "demo",
      message: "線上收件後端尚未啟用，請改用電話或簡訊聯絡。",
    })
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/contact_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const detail = await response.text()
      throw new Error(detail || `Supabase responded ${response.status}`)
    }

    return res.status(200).json({ ok: true, stored: true })
  } catch (error) {
    console.error("inquiry insert failed", error.message)
    return res.status(200).json({
      ok: true,
      stored: false,
      mode: "fallback",
      message: "線上收件暫時無法使用，請改用電話或簡訊聯絡。",
    })
  }
}
