function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

function normalizeBaseUrl(value) {
  return String(value || "").trim().replace(/\/+$/, "")
}

function safeErrorMessage(status) {
  if (status === 401 || status === 403) return "RAG Engine API Key 無效或權限不足。"
  if (status === 429) return "RAG Engine 請求量過高，請稍後再試。"
  return "無法向 RAG Engine 取得 widget token。"
}

async function requestWidgetToken() {
  const ragEngineUrl = normalizeBaseUrl(process.env.RAG_ENGINE_URL)
  const ragEngineApiKey = process.env.RAG_ENGINE_API_KEY

  if (!ragEngineUrl || !ragEngineApiKey) {
    return {
      status: 503,
      body: {
        ok: false,
        mode: "not_configured",
        error: "尚未設定 RAG_ENGINE_URL 或 RAG_ENGINE_API_KEY。",
      },
    }
  }

  const response = await fetch(`${ragEngineUrl}/auth/widget-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ragEngineApiKey}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    return {
      status: response.status === 429 ? 429 : 502,
      body: {
        ok: false,
        mode: "rag_engine_error",
        error: safeErrorMessage(response.status),
      },
    }
  }

  const data = await response.json()
  return {
    status: 200,
    body: {
      ok: true,
      mode: "live",
      token: data.token,
      expires_in_seconds: data.expires_in_seconds || 15 * 60,
    },
  }
}

export default async function handler(req, res) {
  setCors(res)

  if (req.method === "OPTIONS") return res.status(204).end()

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      endpoint: "/api/widget-token",
      ragEngine: process.env.RAG_ENGINE_URL ? "configured" : "missing_url",
      apiKey: process.env.RAG_ENGINE_API_KEY ? "configured" : "missing_key",
    })
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST, OPTIONS")
    return res.status(405).json({ ok: false, error: "Method not allowed" })
  }

  try {
    const result = await requestWidgetToken()
    return res.status(result.status).json(result.body)
  } catch (error) {
    console.warn("[widget-token] exchange failed:", error.message)
    return res.status(502).json({
      ok: false,
      mode: "network_error",
      error: "RAG Engine 暫時無法連線。",
    })
  }
}
