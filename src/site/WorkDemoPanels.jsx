import { useEffect, useMemo, useState } from "react"

const aiExampleReport = {
  source: "mock_example",
  summary: "範例網站適合先強化首頁標題、聯絡 CTA、社群信任感與手機版資訊排序。",
  scores: { clarity: 86, cta: 81, seo: 84, trust: 88, mobile: 79 },
  sections: [
    { title: "首頁標題", finding: "標題有方向，但還可以更直接說明服務價值。", suggestion: "改成「讓網站真的幫你接單」或「讓你的服務被看懂」。" },
    { title: "首頁文案", finding: "目前描述偏完整，但手機版可再縮短。", suggestion: "副標控制在 1～2 行，把細節放到服務區。" },
    { title: "CTA", finding: "主要 CTA 需要比其他連結更突出。", suggestion: "第一屏放「聊聊需求」，第二 CTA 放「看作品」。" },
    { title: "SEO", finding: "title 需要包含地區與服務。", suggestion: "建議使用「台灣網站製作、AI 工具與 LINE Bot 開發」。" },
    { title: "信任感", finding: "作品展示可再加強技術與流程證據。", suggestion: "每個案例加上 mockup、技術架構和可互動 Demo。" },
    { title: "手機版", finding: "若首屏資訊太多，使用者會滑走。", suggestion: "保留短標題、短副標、兩個按鈕與一個產品 mockup。" },
  ],
  nextSteps: ["縮短 Hero 文案", "把 CTA 移到第一屏", "作品卡補 Demo 入口", "確認 sitemap 與 OG metadata"],
}

function scrollToSection(id) {
  if (typeof document === "undefined") return
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function Shell({ title, desc, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ded8cb] bg-white shadow-sm">
      <div className="border-b border-[#eee9df] bg-[#faf8f3] p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Product Demo</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
        </div>
        <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">{desc}</p>
      </div>
      </div>
      <div className="p-4 md:p-6">
      {children}
      </div>
    </div>
  )
}

function Progress({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#e4e9e6]">
      <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${value}%` }} />
    </div>
  )
}

function MiniCard({ title, children, tone = "light" }) {
  const dark = tone === "dark"
  return (
    <div className={`rounded-xl border p-4 ${dark ? "border-[#26343b] bg-[#111c22] text-white" : "border-[#e3ded3] bg-[#faf8f3]"}`}>
      <p className={`text-sm font-black ${dark ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function LoadingBars() {
  return (
    <div className="grid gap-2">
      {[82, 64, 74].map((width, index) => (
        <div key={width} className="h-2 overflow-hidden rounded-full bg-[#e4e9e6]">
          <div
            className="h-full rounded-full bg-[#0d6b62] transition-all duration-500"
            style={{ width: `${width - index * 8}%` }}
          />
        </div>
      ))}
    </div>
  )
}

function AiAuditDemo() {
  return <AiAuditProductDemo />
}

export function LegacyAiAuditDemo() {
  const [target, setTarget] = useState("小型店家想做一頁式網站，主要靠 LINE 接洽客戶。")
  const [report, setReport] = useState({
    source: "mock",
    summary: "這個網站方向可以成立，但首頁需要更快說清楚服務、客群與聯絡方式。",
    scores: { clarity: 82, cta: 74, seo: 78, trust: 86, mobile: 80 },
    sections: [
      { title: "首頁標題", finding: "標題需要在 5 秒內說清楚服務。", suggestion: "使用短標題，再用副標補充服務範圍。" },
      { title: "首頁文案", finding: "副標需要說清楚服務對象與下一步。", suggestion: "用 1～2 句補充服務對象、可做項目與聯絡方式。" },
      { title: "CTA", finding: "聯絡入口可以更明顯。", suggestion: "第一屏保留主要 CTA「聊聊需求」。" },
      { title: "SEO", finding: "需要包含地區、服務與客群。", suggestion: "title 可加入「台灣網站製作、AI 工具、LINE Bot」。" },
      { title: "信任感", finding: "小型客戶會先看案例與流程。", suggestion: "補作品、流程、價格方向與聯絡方式。" },
    ],
    nextSteps: ["收斂首頁主標題", "補清楚 CTA", "整理精選作品", "確認手機版第一屏"],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [chatInput, setChatInput] = useState("我的網站適合做哪種方案？")
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "這是 Demo 顧問助理。你可以問網站方案、LINE Bot、AI 工具或工程系統方向。",
    },
  ])

  const checks = [
    ["標題清楚", "clarity"],
    ["首頁文案", "copy"],
    ["CTA 明顯", "cta"],
    ["SEO 建議", "seo"],
    ["信任感", "trust"],
    ["手機版", "mobile"],
  ]

  async function runAudit() {
    if (!target.trim()) {
      setError("請先輸入網站網址或需求描述。")
      return
    }

    setLoading(true)
    setError("")
    try {
      await wait(900)
      const response = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: target }),
      })
      const data = await response.json()
      if (!response.ok && !data.fallback) throw new Error(data.error || "分析失敗")
      setReport(data.fallback || data)
    } catch (requestError) {
      setError(requestError.message || "AI 暫時無法分析，已保留 mock report。")
    } finally {
      setLoading(false)
    }
  }

  async function showExampleReport() {
    setTarget("範例：台灣小型店家，想做一頁式網站，主要希望客戶能看懂服務並透過 LINE 詢問。")
    setError("")
    setLoading(true)
    await wait(650)
    setReport(aiExampleReport)
    setLoading(false)
  }

  async function sendChat() {
    const message = chatInput.trim()
    if (!message) return

    const nextMessages = [...chatMessages, { role: "user", content: message }]
    setChatMessages(nextMessages)
    setChatInput("")
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: chatMessages }),
      })
      const data = await response.json()
      setChatMessages([...nextMessages, { role: "assistant", content: data.reply || "目前先用 Demo 回覆，請稍後再試。" }])
    } catch {
      setChatMessages([...nextMessages, { role: "assistant", content: "AI 助理暫時無法連線，這裡先顯示 Demo fallback 回覆。" }])
    }
  }

  return (
    <Shell title="AI 網站健檢工具" desc="前端送到 /api/ai-audit，由 serverless function 呼叫 OpenAI；沒有 key 時自動回 mock report。">
      <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <MiniCard title="Input｜網址 / 需求輸入">
          <div className="mb-3 grid grid-cols-3 gap-2 text-center text-[11px] font-black text-[#52605c]">
            {["需求", "分析", "報告"].map((item) => (
              <span key={item} className="rounded-md border border-[#e3ded3] bg-white py-2">{item}</span>
            ))}
          </div>
          <textarea
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="min-h-32 w-full resize-none rounded-lg border border-[#d8d2c5] bg-white p-3 text-sm font-bold leading-7 outline-none focus:border-[#0d6b62]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={runAudit} disabled={loading} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white disabled:opacity-60">
              {loading ? "分析中..." : "開始分析"}
            </button>
            <button type="button" onClick={showExampleReport} disabled={loading} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] disabled:opacity-60">
              查看範例報告
            </button>
            <button type="button" onClick={() => scrollToSection("tech")} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              技術拆解
            </button>
          </div>
          {loading ? <div className="mt-4"><LoadingBars /></div> : null}
          {error ? <p className="mt-3 text-xs font-black text-[#b45309]">{error}</p> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {["OpenAI API", "Prompt Flow", "Report UI", "SEO Check"].map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">{tag}</span>
            ))}
          </div>
        </MiniCard>
        <div className="grid gap-4">
          <MiniCard title="Report UI｜健檢總分" tone="dark">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">{Math.round(Object.values(report.scores || {}).reduce((sum, value) => sum + value, 0) / Math.max(Object.values(report.scores || {}).length, 1))}</p>
                <p className="mt-1 text-sm font-bold text-white/65">{report.summary}</p>
              </div>
              <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">
                {report.source === "openai" ? "OpenAI" : "Mock fallback"}
              </span>
            </div>
          </MiniCard>
          <div className="grid gap-3 sm:grid-cols-5">
            {Object.entries(report.scores || {}).map(([key, value]) => (
              <div key={key} className="rounded-xl border border-[#e3ded3] bg-white p-3">
                <p className="text-[11px] font-black uppercase text-[#0d6b62]">{key}</p>
                <p className="mt-2 text-2xl font-black text-[#111c22]">{value}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {checks.map(([label, key]) => (
              <MiniCard key={label} title={label}>
                <p className="min-h-12 text-sm font-bold leading-6 text-[#52605c]">
                  {findReportSuggestion(report.sections || [], label) || "依目前內容產生可執行優化建議。"}
                </p>
                <div className="mt-3">
                  <Progress value={report.scores?.[key] || (key === "copy" ? report.scores?.clarity : 70) || 70} />
                </div>
              </MiniCard>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <MiniCard title="下一步優化清單">
          <ul className="grid gap-2 text-sm font-bold leading-7 text-[#52605c]">
            {(report.nextSteps || []).map((item) => <li key={item}>・{item}</li>)}
          </ul>
        </MiniCard>
        <MiniCard title="聊天式 AI 助理 Demo">
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg bg-white p-3">
            {chatMessages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`rounded-lg p-2 text-sm font-bold leading-6 ${item.role === "assistant" ? "bg-[#eef7f4] text-[#23413d]" : "bg-[#111c22] text-white"}`}>
                {item.content}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendChat()
              }}
              className="min-w-0 flex-1 rounded-md border border-[#d8d2c5] bg-white px-3 text-sm font-bold outline-none focus:border-[#0d6b62]"
              placeholder="問網站、LINE Bot 或 AI 工具..."
            />
            <button type="button" onClick={sendChat} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              送出
            </button>
          </div>
        </MiniCard>
      </div>
    </Shell>
  )
}

function findReportSuggestion(sections, label) {
  if (label.includes("標題")) return sections.find((item) => item.title.includes("標題"))?.suggestion
  if (label.includes("文案")) return sections.find((item) => item.title.includes("文案"))?.suggestion
  if (label.includes("CTA")) return sections.find((item) => item.title.includes("CTA"))?.suggestion
  if (label.includes("SEO")) return sections.find((item) => item.title.includes("SEO"))?.suggestion
  if (label.includes("信任")) return sections.find((item) => item.title.includes("信任"))?.suggestion
  if (label.includes("手機")) return sections.find((item) => item.title.includes("手機"))?.suggestion
  return ""
}

const cleanAiAuditFallback = {
  source: "mock_fallback",
  score: 82,
  summary: "這份 Demo 會檢查首頁是否讓台灣客戶快速看懂服務、信任你，並知道下一步要怎麼聯絡。",
  seo: ["title 建議包含服務、地區與主要客群，例如：台灣網站製作、作品集、一頁式網站。"],
  cta: ["主要 CTA 建議只保留一個明確動作，例如「免費網站健檢」或「聊聊需求」。"],
  copywriting: ["首頁標題要先說清楚你能幫誰解決什麼事，不要一開始堆滿技術詞。"],
  trust: ["加入作品案例、製作流程、聯絡方式與交付內容，會比單純說自己會技術更有信任感。"],
  mobile: ["手機版第一屏要先看到標題、短描述與 CTA，避免過多卡片讓訪客滑不到重點。"],
  nextSteps: ["重寫首頁第一屏標題與 CTA", "把作品案例放到 CTA 後方", "補上 SEO title / description", "檢查手機版按鈕是否容易點擊"],
}

const cleanAiAuditExampleInput =
  "我是台灣小型工作室，想做一個能介紹服務、放作品、讓客戶填表或加 LINE 的網站。希望手機版清楚，也想知道 SEO 和首頁文案怎麼寫。"

const auditIndustries = ["店家", "個人品牌", "工作室", "工程服務", "學生作品集"]
const auditGoals = ["增加詢問", "提升信任", "改善手機版", "SEO", "作品展示"]
const auditTabs = [
  ["seo", "SEO"],
  ["cta", "CTA"],
  ["copywriting", "文案"],
  ["trust", "信任感"],
  ["mobile", "手機版"],
]

function normalizeAiAuditReport(data) {
  if (!data || typeof data !== "object") return cleanAiAuditFallback

  if (Array.isArray(data.seo) || Array.isArray(data.cta) || Array.isArray(data.copywriting)) {
    return {
      source: data.source || "api",
      score: Number.isFinite(Number(data.score)) ? Math.max(0, Math.min(100, Math.round(Number(data.score)))) : cleanAiAuditFallback.score,
      summary: data.summary || cleanAiAuditFallback.summary,
      seo: normalizeList(data.seo, cleanAiAuditFallback.seo),
      cta: normalizeList(data.cta, cleanAiAuditFallback.cta),
      copywriting: normalizeList(data.copywriting, cleanAiAuditFallback.copywriting),
      trust: normalizeList(data.trust, cleanAiAuditFallback.trust),
      mobile: normalizeList(data.mobile, cleanAiAuditFallback.mobile),
      nextSteps: normalizeList(data.nextSteps, cleanAiAuditFallback.nextSteps),
    }
  }

  const scores = data.scores || {}
  const sections = Array.isArray(data.sections) ? data.sections : []
  const findText = (keyword, fallback) => {
    const section = sections.find((item) => String(item.title || "").toLowerCase().includes(keyword.toLowerCase()))
    return normalizeList([section?.suggestion || section?.finding], fallback)
  }

  return {
    source: data.source || "mock_fallback",
    score: scores.seo ? Math.round(((scores.seo || 0) + (scores.cta || 0) + (scores.trust || 0) + (scores.mobile || 0)) / 4) : cleanAiAuditFallback.score,
    summary: data.summary || cleanAiAuditFallback.summary,
    seo: findText("seo", cleanAiAuditFallback.seo),
    cta: findText("cta", cleanAiAuditFallback.cta),
    copywriting: findText("標題", cleanAiAuditFallback.copywriting),
    trust: findText("信任", cleanAiAuditFallback.trust),
    mobile: findText("mobile", cleanAiAuditFallback.mobile),
    nextSteps: normalizeList(data.nextSteps, cleanAiAuditFallback.nextSteps),
  }
}

function normalizeList(value, fallback) {
  if (!Array.isArray(value)) return fallback
  const items = value.map((item) => String(item || "").trim()).filter(Boolean)
  return items.length ? items : fallback
}

function reportText(report) {
  return [
    `AI 網站健檢總分：${report.score}`,
    `摘要：${report.summary}`,
    `SEO：${report.seo.join(" ")}`,
    `CTA：${report.cta.join(" ")}`,
    `首頁文案：${report.copywriting.join(" ")}`,
    `信任感：${report.trust.join(" ")}`,
    `手機版：${report.mobile.join(" ")}`,
    `下一步：${report.nextSteps.join(" / ")}`,
  ].join("\n")
}

function AiAuditProductDemo() {
  const [input, setInput] = useState("")
  const [industry, setIndustry] = useState(auditIndustries[0])
  const [goal, setGoal] = useState(auditGoals[0])
  const [report, setReport] = useState(null)
  const [activeTab, setActiveTab] = useState("seo")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function runAudit(useExample = false) {
    const value = useExample ? cleanAiAuditExampleInput : input.trim()
    if (!value) {
      setError("請先輸入網站網址、服務內容，或按「查看範例報告」。")
      setReport(null)
      return
    }

    if (useExample) {
      setInput(cleanAiAuditExampleInput)
      setIndustry("工作室")
      setGoal("增加詢問")
    }
    setLoading(true)
    setError("")
    setCopied(false)

    try {
      await wait(900)
      const response = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: `${value}\n產業：${industry}\n目標：${goal}` }),
      })
      const data = await response.json().catch(() => null)
      setReport(normalizeAiAuditReport(response.ok ? data : null))
      if (!response.ok) setError("API 暫時無法分析，已顯示 Demo mock 報告。")
    } catch {
      setReport(cleanAiAuditFallback)
      setError("目前沒有連線到 AI 服務，已使用前端 mock fallback。")
    } finally {
      setLoading(false)
    }
  }

  async function copyAdvice() {
    const current = report || cleanAiAuditFallback
    const text = reportText(current)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError("")
    } catch {
      setCopied(false)
      setError("瀏覽器目前不允許複製，請手動選取報告內容。")
    }
  }

  function clearAudit() {
    setInput("")
    setIndustry(auditIndustries[0])
    setGoal(auditGoals[0])
    setReport(null)
    setActiveTab("seo")
    setError("")
    setCopied(false)
    setLoading(false)
  }

  const displayedReport = report || cleanAiAuditFallback
  const tabItems = displayedReport[activeTab] || []
  const scoreStyle = {
    background: `conic-gradient(#0d6b62 ${displayedReport.score * 3.6}deg, #e4e9e6 0deg)`,
  }

  return (
    <Shell
      title="AI 網站健檢"
      desc="輸入網站或需求，快速產生首頁文案、CTA、SEO 與信任感建議。"
    >
      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <MiniCard title="網站網址 / 需求輸入">
          <textarea
            id="ai-audit-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-40 w-full resize-none rounded-lg border border-[#d8d2c5] bg-white p-3 text-sm font-bold leading-7 text-[#111c22] outline-none transition focus:border-[#0d6b62] focus:ring-2 focus:ring-[#0d6b62]/10"
            placeholder="貼上網站網址，或描述你的產業、服務、客群與目前卡住的地方。"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-black text-[#52605c]">
              產業選擇
              <select
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="min-h-10 rounded-md border border-[#d8d2c5] bg-white px-3 text-sm font-black text-[#111c22] outline-none focus:border-[#0d6b62]"
              >
                {auditIndustries.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label className="grid gap-2 text-xs font-black text-[#52605c]">
              目標選擇
              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                className="min-h-10 rounded-md border border-[#d8d2c5] bg-white px-3 text-sm font-black text-[#111c22] outline-none focus:border-[#0d6b62]"
              >
                {auditGoals.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => runAudit(false)} disabled={loading} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "分析中..." : "開始分析"}
            </button>
            <button type="button" onClick={() => runAudit(true)} disabled={loading} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60">
              查看範例報告
            </button>
            <button type="button" onClick={copyAdvice} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              {copied ? "已複製" : "複製建議"}
            </button>
            <button type="button" onClick={clearAudit} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              清空
            </button>
            <button type="button" onClick={() => scrollToSection("tech")} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              技術拆解
            </button>
          </div>
          {loading ? (
            <div className="mt-4 rounded-lg border border-[#e3ded3] bg-white p-3">
              <p className="mb-3 text-xs font-black text-[#0d6b62]">正在檢查 SEO、CTA、信任感與手機版...</p>
              <LoadingBars />
            </div>
          ) : null}
          {error ? <p className="mt-3 rounded-lg bg-[#fff7ed] px-3 py-2 text-xs font-black text-[#b45309]">{error}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {["Client form", "Serverless API", "OpenAI-ready", "Mock fallback"].map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">{tag}</span>
            ))}
          </div>
        </MiniCard>

        <div className="grid gap-4">
          <MiniCard title="AI 健檢報告" tone="dark">
            <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
              <div className="grid h-32 w-32 place-items-center rounded-full p-2" style={scoreStyle}>
                <div className="grid h-full w-full place-items-center rounded-full bg-[#111c22]">
                  <div className="text-center">
                    <p className="text-4xl font-black">{displayedReport.score}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/45">score</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">
                    {displayedReport.source === "openai" ? "OpenAI result" : "Mock result"}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">{industry}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/70">{goal}</span>
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-white/72">{displayedReport.summary}</p>
              </div>
            </div>
          </MiniCard>

          <div className="overflow-x-auto rounded-xl border border-[#e3ded3] bg-white p-2">
            <div className="flex min-w-max gap-2">
              {auditTabs.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`min-h-10 rounded-lg px-4 text-sm font-black transition ${activeTab === key ? "bg-[#111c22] text-white" : "bg-[#faf8f3] text-[#52605c] hover:text-[#111c22]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <MiniCard title={`${auditTabs.find(([key]) => key === activeTab)?.[1]}建議清單`}>
            <div className="grid gap-2">
              {tabItems.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-lg bg-white px-3 py-2 text-sm font-bold leading-6 text-[#52605c]">
                  <span className="font-black text-[#0d6b62]">0{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </MiniCard>

          <MiniCard title="下一步 CTA">
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-2">
                {displayedReport.nextSteps.slice(0, 4).map((item, index) => (
                  <p key={item} className="text-sm font-bold leading-6 text-[#52605c]">
                    <span className="mr-2 font-black text-[#0d6b62]">0{index + 1}</span>
                    {item}
                  </p>
                ))}
              </div>
              <a href="/contact" className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]">
                找我討論
              </a>
            </div>
          </MiniCard>
        </div>
      </div>
    </Shell>
  )
}

function LineBotDemo() {
  return <LineBotProductDemo />
}

export function LegacyLineBotDemo() {
  const [activePanel, setActivePanel] = useState("chat")
  const [selectedId, setSelectedId] = useState("REQ-001")
  const [webhookStatus, setWebhookStatus] = useState(null)
  const [webhookLoading, setWebhookLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: "customer", text: "你好，我想預約店內諮詢" },
    { role: "bot", text: "可以，請問方便留下姓名、服務類型與希望時間嗎？" },
    { role: "customer", text: "王小姐，想做形象網站，週三下午可以" },
    { role: "bot", text: "已建立詢價紀錄，店家會收到通知。" },
  ])
  const [inboxItems, setInboxItems] = useState([
    {
      id: "REQ-001",
      customer: "王小姐",
      need: "形象網站",
      detail: "想做一個能介紹服務、放作品、並讓客戶加 LINE 的形象網站。",
      status: "待店家確認",
      source: "LINE",
      createdAt: "09:42",
    },
  ])
  const flowSteps = [
    ["User", "Received"],
    ["LINE", "Received"],
    ["Webhook", "Processing"],
    ["OpenAI", "AI Reply"],
    ["Reply API", "Sent"],
    ["Dashboard", "Saved"],
  ]
  const isFlowActive = activePanel === "flow" || activePanel === "dashboard"
  const selectedItem = inboxItems.find((item) => item.id === selectedId) || inboxItems[0]

  function addSimulatedInquiry() {
    const demoInquiry = {
      id: "REQ-002",
      customer: "LINE 使用者",
      need: "店家網站",
      detail: "使用者想做店家網站，需要判斷適合一般網站、LINE Bot 或小型管理系統。",
      status: "新需求",
      source: "LINE",
      createdAt: "剛剛",
    }
    setInboxItems((current) => (
      current.some((item) => item.id === demoInquiry.id) ? current : [demoInquiry, ...current]
    ))
    setSelectedId(demoInquiry.id)
  }

  function simulateConversation() {
    setActivePanel("chat")
    setMessages((current) => {
      if (current.some((message) => message.text === "我想做店家網站")) return current
      return [
        ...current,
        { role: "customer", text: "我想做店家網站" },
        { role: "bot", text: "可以，我先幫你判斷適合網站、LINE Bot 還是小系統。請提供產業、功能、預算、上線時間。" },
      ]
    })
    addSimulatedInquiry()
  }

  function showWebhookFlow() {
    setActivePanel("flow")
    addSimulatedInquiry()
  }

  function showDashboard() {
    setActivePanel("dashboard")
    addSimulatedInquiry()
  }

  async function testWebhook() {
    setWebhookLoading(true)
    setWebhookStatus(null)
    try {
      const response = await fetch("/api/line-webhook")
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(data?.error || "Webhook health check failed")
      setWebhookStatus({
        ok: true,
        message: data?.message || "LINE webhook endpoint ready",
        openAI: data?.modes?.openAI || "demo fallback mode",
        line: data?.modes?.line || "webhook mock mode",
      })
    } catch (error) {
      setWebhookStatus({
        ok: false,
        message: error.message || "Webhook health check failed",
        openAI: "demo fallback mode",
        line: "webhook mock mode",
      })
    } finally {
      setWebhookLoading(false)
    }
  }

  return (
    <Shell title="LINE Bot 詢價 / 預約系統" desc="用前端 mock 展示 LINE 對話、Webhook 流程、AI 回覆與後台收件，不會在前端放 LINE token。">
      <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <MiniCard title="LINE 手機對話 mockup">
          <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-[#b6d8ca] bg-[#e9f4ee] shadow-inner">
            <div className="bg-[#06c755] px-4 py-3 text-center text-sm font-black text-white">Qingyu 詢價助理</div>
            <div className="min-h-96 space-y-3 p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${message.text}-${index}`} className={`flex ${message.role === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[84%] break-words rounded-2xl px-3 py-2 text-sm font-bold leading-6 ${message.role === "customer" ? "bg-[#0d6b62] text-white" : "bg-white text-[#111c22]"}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={simulateConversation} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]">
              模擬對話
            </button>
            <button type="button" onClick={showWebhookFlow} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              Webhook 流程
            </button>
            <button type="button" onClick={showDashboard} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              查看後台
            </button>
          </div>
        </MiniCard>

        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-6">
            {flowSteps.map(([name, status], index) => (
              <div
                key={name}
                className={`rounded-xl border p-3 transition ${isFlowActive ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white"}`}
              >
                <p className="text-xs font-black text-[#0d6b62]">0{index + 1}</p>
                <p className="mt-2 text-sm font-black text-[#111c22]">{name}</p>
                <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${isFlowActive ? "bg-[#0d6b62] text-white" : "bg-[#faf8f3] text-[#52605c]"}`}>
                  {isFlowActive ? status : "Waiting"}
                </span>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <MiniCard title="後台案件列表" tone={activePanel === "dashboard" ? "dark" : "light"}>
              <div className="grid gap-3">
                {inboxItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id)
                      setActivePanel("dashboard")
                    }}
                    className={`rounded-lg border p-3 text-left transition ${selectedId === item.id ? "border-[#8fd6cc] bg-white/10 text-white" : activePanel === "dashboard" ? "border-white/10 bg-white/5 text-white" : "border-[#e3ded3] bg-white text-[#111c22]"}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className={`text-xs font-black ${activePanel === "dashboard" ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{item.id}・{item.source}</p>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-black ${activePanel === "dashboard" ? "bg-white text-[#111c22]" : "bg-[#eef7f4] text-[#0d6b62]"}`}>{item.status}</span>
                    </div>
                    <p className="mt-2 text-sm font-black">{item.customer}｜{item.need}</p>
                  </button>
                ))}
              </div>
            </MiniCard>

            <MiniCard title="需求詳情卡">
              <div className="grid gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-2xl font-black text-[#111c22]">{selectedItem.id}</p>
                  <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{selectedItem.status}</span>
                </div>
                <div className="grid gap-2 text-sm font-bold leading-7 text-[#52605c]">
                  <p><span className="font-black text-[#111c22]">來源：</span>{selectedItem.source}</p>
                  <p><span className="font-black text-[#111c22]">需求：</span>{selectedItem.need}</p>
                  <p><span className="font-black text-[#111c22]">建立時間：</span>{selectedItem.createdAt}</p>
                  <p><span className="font-black text-[#111c22]">內容：</span>{selectedItem.detail}</p>
                </div>
              </div>
            </MiniCard>
          </div>

          <MiniCard title="技術標籤">
            <div className="flex flex-wrap gap-2">
              {["LINE Messaging API", "Webhook", "OpenAI API", "Vercel Function", "Supabase", "Dashboard UI"].map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">
                  {tag}
                </span>
              ))}
            </div>
          </MiniCard>

          <MiniCard title="Webhook 測試狀態">
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
                <p><span className="font-black text-[#111c22]">Endpoint：</span>/api/line-webhook</p>
                <p><span className="font-black text-[#111c22]">OpenAI：</span>{webhookStatus?.openAI || "demo fallback mode"}</p>
                <p><span className="font-black text-[#111c22]">LINE：</span>{webhookStatus?.line || "webhook mock mode"}</p>
                {webhookStatus ? (
                  <p className={webhookStatus.ok ? "font-black text-[#0d6b62]" : "font-black text-[#b45309]"}>
                    {webhookStatus.ok ? "Ready：" : "Error："}{webhookStatus.message}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={testWebhook}
                disabled={webhookLoading}
                className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {webhookLoading ? "測試中..." : "測試 Webhook"}
              </button>
            </div>
          </MiniCard>
        </div>
      </div>
    </Shell>
  )
}

const lineBotInitialMessages = [
  {
    role: "bot",
    text: "你好，我是 Qingyu 詢價助理。你可以直接說想做什麼網站、LINE Bot 或小系統。",
  },
]

const lineBotFlowSteps = [
  { label: "User", status: "Received" },
  { label: "LINE", status: "Verified" },
  { label: "Webhook", status: "Processing" },
  { label: "AI Reply", status: "Replied" },
  { label: "LINE Reply API", status: "Sent" },
  { label: "Dashboard", status: "Saved" },
]

function LineBotProductDemo() {
  const [messages, setMessages] = useState(lineBotInitialMessages)
  const [cases, setCases] = useState([])
  const [selectedCaseId, setSelectedCaseId] = useState("")
  const [activeView, setActiveView] = useState("chat")
  const [flowStep, setFlowStep] = useState(-1)
  const [flowPlaying, setFlowPlaying] = useState(false)
  const [webhookStatus, setWebhookStatus] = useState(null)
  const [webhookLoading, setWebhookLoading] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const selectedCase = cases.find((item) => item.id === selectedCaseId) || cases[0]

  function createBaseCase(status = "新需求") {
    return {
      id: "REQ-001",
      customer: "LINE 使用者",
      summary: "想做店家網站",
      source: "LINE",
      status,
      createdAt: "剛剛",
      suggestedService: "待判斷",
      note: "Bot 已收到初步需求，等待補齊產業、功能、預算與上線時間。",
      history: [
        "我想做店家網站",
        "Bot 已引導客戶補充產業、功能、預算、上線時間。",
      ],
      nextSteps: ["確認產業與功能", "整理預算區間", "安排初步討論"],
    }
  }

  function upsertCase(nextCase) {
    setCases((current) => {
      const exists = current.some((item) => item.id === nextCase.id)
      return exists ? current.map((item) => (item.id === nextCase.id ? { ...item, ...nextCase } : item)) : [nextCase, ...current]
    })
    setSelectedCaseId(nextCase.id)
  }

  function simulateConversation() {
    const nextCase = createBaseCase("新需求")
    setMessages([
      ...lineBotInitialMessages,
      { role: "user", text: "我想做店家網站" },
      {
        role: "bot",
        text: "可以，我先幫你判斷適合網站、LINE Bot 還是小系統。請提供產業、功能、預算、上線時間。",
      },
    ])
    upsertCase(nextCase)
    setActiveView("dashboard")
  }

  function nextConversation() {
    const nextCase = {
      ...createBaseCase("已整理需求"),
      customer: "咖啡店業主",
      summary: "咖啡店預約與菜單查詢",
      suggestedService: "LINE Bot + 表單 + 小型後台",
      note: "需求已整理成店家 LINE Bot 與網站流程，可進一步確認預約欄位與菜單資料來源。",
      history: [
        "我想做店家網站",
        "我是咖啡店，想做預約和菜單查詢",
        "Bot 已記錄為店家 LINE Bot + 網站需求。",
      ],
      nextSteps: ["確認預約欄位", "整理菜單資料", "規劃後台狀態與通知"],
    }
    setMessages([
      ...lineBotInitialMessages,
      { role: "user", text: "我想做店家網站" },
      {
        role: "bot",
        text: "可以，我先幫你判斷適合網站、LINE Bot 還是小系統。請提供產業、功能、預算、上線時間。",
      },
      { role: "user", text: "我是咖啡店，想做預約和菜單查詢" },
      { role: "bot", text: "了解，我會記錄為店家 LINE Bot + 網站需求。" },
    ])
    upsertCase(nextCase)
    setActiveView("dashboard")
  }

  function resetLineBotDemo() {
    setMessages(lineBotInitialMessages)
    setCases([])
    setSelectedCaseId("")
    setActiveView("chat")
    setFlowStep(-1)
    setWebhookStatus(null)
    setDetailOpen(false)
  }

  function playWebhookFlow() {
    setActiveView("flow")
    setFlowPlaying(true)
    setFlowStep(-1)
    lineBotFlowSteps.forEach((_, index) => {
      window.setTimeout(() => setFlowStep(index), 280 * (index + 1))
    })
    window.setTimeout(() => setFlowPlaying(false), 280 * (lineBotFlowSteps.length + 2))
  }

  async function testWebhook() {
    setWebhookLoading(true)
    setWebhookStatus(null)
    try {
      const response = await fetch("/api/line-webhook")
      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.ok) throw new Error("Webhook health check failed")
      setWebhookStatus({
        ok: true,
        message: data.message || "LINE webhook endpoint ready",
        items: [
          "Endpoint Ready",
          "Demo fallback mode",
          "Signature verify supported",
          "OpenAI reply optional",
          "LINE Reply API optional",
        ],
      })
    } catch (error) {
      setWebhookStatus({
        ok: false,
        message: error?.message || "Webhook health check failed",
        items: ["Endpoint error", "Demo fallback mode", "No secret exposed"],
      })
    } finally {
      setWebhookLoading(false)
    }
  }

  return (
    <Shell
      title="LINE Bot 詢價助理"
      desc="讓客戶在 LINE 裡提出需求，Bot 自動引導填寫資訊，並同步到後台追蹤。"
    >
      <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
        <MiniCard title="LINE 手機對話 mockup">
          <div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-[#a6d5c6] bg-[#e9f5ee] shadow-inner">
            <div className="flex items-center justify-between bg-[#06c755] px-4 py-3 text-white">
              <span className="text-xs font-black">Qingyu 詢價助理</span>
              <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-black">LINE</span>
            </div>
            <div className="min-h-[26rem] space-y-3 p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[86%] break-words rounded-2xl px-3 py-2 text-sm font-bold leading-6 shadow-sm ${
                      message.role === "user" ? "bg-[#0d6b62] text-white" : "bg-white text-[#111c22]"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <button type="button" onClick={simulateConversation} className="min-h-11 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]">
              模擬對話
            </button>
            <button type="button" onClick={nextConversation} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              下一步對話
            </button>
            <button type="button" onClick={resetLineBotDemo} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62]">
              重置 Demo
            </button>
          </div>
        </MiniCard>

        <div className="grid gap-5">
          <MiniCard title="後台案件面板" tone={activeView === "dashboard" ? "dark" : "light"}>
            <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="grid gap-3">
                {cases.length ? (
                  cases.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedCaseId(item.id)
                        setActiveView("dashboard")
                      }}
                      className={`rounded-xl border p-3 text-left transition ${
                        selectedCaseId === item.id
                          ? "border-[#8fd6cc] bg-white/10"
                          : activeView === "dashboard"
                            ? "border-white/10 bg-white/5 hover:bg-white/10"
                            : "border-[#e3ded3] bg-white hover:border-[#0d6b62]"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-black text-[#8fd6cc]">{item.id} · {item.source}</p>
                        <span className="rounded-full bg-[#0d6b62] px-3 py-1 text-[11px] font-black text-white">{item.status}</span>
                      </div>
                      <p className="mt-2 text-sm font-black">{item.customer}</p>
                      <p className={`mt-1 text-xs font-bold leading-5 ${activeView === "dashboard" ? "text-white/70" : "text-[#52605c]"}`}>{item.summary}</p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-[#cfd7d3] bg-white/5 p-4 text-sm font-bold leading-7 text-[#52605c]">
                    尚未收到需求。按「模擬對話」後，LINE 訊息會同步成後台案件。
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-[#e3ded3] bg-white p-4 text-[#111c22]">
                {selectedCase ? (
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-2xl font-black">{selectedCase.id}</p>
                      <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{selectedCase.status}</span>
                    </div>
                    <div className="grid gap-2 text-sm font-bold leading-7 text-[#52605c]">
                      <p><span className="font-black text-[#111c22]">客戶：</span>{selectedCase.customer}</p>
                      <p><span className="font-black text-[#111c22]">需求：</span>{selectedCase.summary}</p>
                      <p><span className="font-black text-[#111c22]">來源：</span>{selectedCase.source}</p>
                      <p><span className="font-black text-[#111c22]">建立時間：</span>{selectedCase.createdAt}</p>
                      <p><span className="font-black text-[#111c22]">建議服務：</span>{selectedCase.suggestedService}</p>
                      <p><span className="font-black text-[#111c22]">備註：</span>{selectedCase.note}</p>
                    </div>
                    <button type="button" onClick={() => setDetailOpen(true)} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62]">
                      查看詳情
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-3 text-sm font-bold leading-7 text-[#52605c]">
                    <p className="text-lg font-black text-[#111c22]">等待 LINE 需求</p>
                    <p>後台會顯示客戶名稱、需求摘要、來源、狀態、建議服務與追蹤備註。</p>
                  </div>
                )}
              </div>
            </div>
          </MiniCard>

          <MiniCard title="訊息怎麼被處理">
            <div className="grid gap-3 md:grid-cols-6">
              {lineBotFlowSteps.map((step, index) => {
                const active = flowStep >= index
                return (
                  <div key={step.label} className={`rounded-xl border p-3 transition ${active ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white"}`}>
                    <p className="text-xs font-black text-[#0d6b62]">0{index + 1}</p>
                    <p className="mt-2 text-sm font-black text-[#111c22]">{step.label}</p>
                    <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${active ? "bg-[#0d6b62] text-white" : "bg-[#faf8f3] text-[#52605c]"}`}>
                      {active ? step.status : "Waiting"}
                    </span>
                  </div>
                )
              })}
            </div>
            <button type="button" onClick={playWebhookFlow} disabled={flowPlaying} className="mt-4 min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60">
              {flowPlaying ? "流程播放中..." : "播放流程"}
            </button>
          </MiniCard>

          <MiniCard title="Webhook 測試狀態">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
                <p><span className="font-black text-[#111c22]">Endpoint：</span>/api/line-webhook</p>
                {webhookStatus ? (
                  <>
                    <p className={webhookStatus.ok ? "font-black text-[#0d6b62]" : "font-black text-[#b45309]"}>
                      {webhookStatus.message}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {webhookStatus.items.map((item) => (
                        <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{item}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>按下測試後會檢查 endpoint，僅顯示安全狀態，不顯示任何 secret 或 token。</p>
                )}
              </div>
              <button type="button" onClick={testWebhook} disabled={webhookLoading} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60">
                {webhookLoading ? "測試中..." : "測試 Webhook"}
              </button>
            </div>
          </MiniCard>

          <MiniCard title="技術拆解">
            <div className="flex flex-wrap gap-2">
              {[
                "Frontend: React / Tailwind",
                "Webhook: Vercel Serverless Function",
                "LINE: Messaging API / Reply API",
                "AI: OpenAI API optional",
                "Database: Supabase optional",
                "Dashboard: 案件狀態 UI",
                "Fallback: Mock mode",
              ].map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl bg-[#111c22] p-4 text-xs font-black text-white">
              LINE User → LINE Platform → /api/line-webhook → OpenAI / Mock → LINE Reply → Dashboard
            </div>
          </MiniCard>
        </div>
      </div>

      {detailOpen && selectedCase ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#111c22]/55 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Request Detail</p>
                <h3 className="mt-2 text-2xl font-black">{selectedCase.customer}</h3>
              </div>
              <button type="button" onClick={() => setDetailOpen(false)} className="rounded-md border border-[#d8d2c5] px-3 py-2 text-sm font-black">
                關閉
              </button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <MiniCard title="客戶訊息紀錄">
                <div className="grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
                  {selectedCase.history.map((item) => <p key={item}>・{item}</p>)}
                </div>
              </MiniCard>
              <MiniCard title="Bot 整理後需求">
                <div className="grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
                  <p>需求摘要：{selectedCase.summary}</p>
                  <p>建議方案：{selectedCase.suggestedService}</p>
                  <p>狀態：{selectedCase.status}</p>
                </div>
              </MiniCard>
            </div>
            <MiniCard title="後續追蹤事項">
              <div className="flex flex-wrap gap-2">
                {selectedCase.nextSteps.map((item) => (
                  <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{item}</span>
                ))}
              </div>
            </MiniCard>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}

function BuildFlowDemo() {
  const fallbackApiCases = [
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
  const statusProgress = {
    "待估價": 25,
    "已報價": 55,
    "施工中": 75,
    "完工": 100,
  }
  const statusFlow = ["待估價", "已報價", "施工中", "完工"]
  const lineMessageByStatus = {
    "待估價": "已收到您的案件需求，我們會先整理照片與問題描述，接著安排初步估價。",
    "已報價": "已完成初步報價，您可以查看報價明細，確認後即可安排施工時間。",
    "施工中": "案件目前施工中，如有現場照片或進度更新，會同步整理在系統紀錄。",
    "完工": "案件已完工，請安排驗收。若有後續保固或維修需求，也可透過 LINE 回報。",
  }
  const [selected, setSelected] = useState("BF-001")
  const [showDetail, setShowDetail] = useState(false)
  const [showQuote, setShowQuote] = useState(false)
  const [copied, setCopied] = useState("")
  const [cases, setCases] = useState(() => fallbackApiCases.map(mapApiCaseToUi))
  const [apiMode, setApiMode] = useState("Loading")
  const [apiResponse, setApiResponse] = useState(null)
  const [showResponse, setShowResponse] = useState(false)
  const [apiError, setApiError] = useState("")
  const [lastLineMessage, setLastLineMessage] = useState(lineMessageByStatus["待估價"])
  const current = cases.find((item) => item.id === selected) || cases[0]
  const metrics = [
    ["今日新案", cases.filter((item) => item.createdAt.includes("2026-06-20") || item.createdAt.includes("剛剛")).length],
    ["待估價", cases.filter((item) => item.status === "待估價" || item.status === "估價中").length],
    ["施工中", cases.filter((item) => item.status === "施工中").length],
    ["已完工", cases.filter((item) => item.status === "完工" || item.status === "待驗收").length],
  ]

  function normalizeLineLog(log) {
    return log.startsWith("LINE：") ? log : `LINE：${log}`
  }

  function mapApiCaseToUi(apiCase) {
    const status = apiCase.status || "待估價"
    const logs = Array.isArray(apiCase.logs) && apiCase.logs.length ? apiCase.logs : [lineMessageByStatus[status]]
    const photos = Array.isArray(apiCase.photos) && apiCase.photos.length ? apiCase.photos : ["site-photo-1", "site-photo-2"]

    return {
      id: apiCase.id,
      name: `${apiCase.type || "工程案件"}案件`,
      customer: apiCase.customer || "未填客戶",
      phone: apiCase.source === "LINE" ? "LINE user" : "未填電話",
      type: apiCase.type || "工程案件",
      status,
      progress: statusProgress[status] || 25,
      budget: apiCase.budget || "未填預算",
      createdAt: apiCase.createdAt || "剛剛",
      source: apiCase.source || "LINE",
      issue: apiCase.description || "未填問題描述",
      quoteStatus: status === "待估價" ? "待估價" : status === "已報價" ? "已報價" : "業主已確認",
      construction: status === "施工中" ? "案件已排入施工中。" : status === "完工" ? "完工照已上傳，準備驗收。" : lineMessageByStatus[status] || "等待下一步。",
      notes: "可延伸接 Supabase、LINE Messaging API 與報價單 PDF。",
      photos: photos.map((photo, index) => `${photo}｜照片 ${index + 1}`),
      reports: logs.map(normalizeLineLog),
    }
  }

  function createFallbackCase() {
    return mapApiCaseToUi({
      id: `BF-MOCK-${Date.now().toString().slice(-4)}`,
      customer: "王小姐",
      type: "地坪修繕",
      status: "待估價",
      budget: "NT$35,000",
      createdAt: "剛剛",
      source: "LINE",
      description: "倉庫地面破損，需要修補。",
      photos: ["floor-1", "floor-2"],
      logs: [lineMessageByStatus["待估價"]],
    })
  }

  function parseBudget(value) {
    const numeric = Number(String(value).replace(/[^\d]/g, ""))
    return Number.isFinite(numeric) && numeric > 0 ? numeric : 28000
  }

  function splitBudget(value, ratio) {
    return `NT$${Math.round(parseBudget(value) * ratio).toLocaleString("zh-TW")}`
  }

  function quoteItems(caseItem = current) {
    const total = parseBudget(caseItem?.budget)
    const items = [
      ["現場整理與防護", "1 式", Math.round(total * 0.16)],
      [`${caseItem?.type || "工程"}主要工項`, "1 式", Math.round(total * 0.58)],
      ["材料與耗材", "1 式", Math.round(total * 0.18)],
      ["完工清潔與拍照", "1 式", Math.round(total * 0.08)],
    ]
    return items.map(([name, qty, subtotal]) => ({ name, qty, unitPrice: subtotal, subtotal }))
  }

  async function copyLineReport() {
    const text = current?.reports?.[0]?.replace("LINE：", "") || lastLineMessage
    try {
      await navigator.clipboard.writeText(text)
      setCopied("已複製")
    } catch {
      setCopied("已選取回報文字")
    }
    window.setTimeout(() => setCopied(""), 1600)
  }

  function nextStatus(status) {
    const index = statusFlow.indexOf(status)
    return statusFlow[(Math.max(index, 0) + 1) % statusFlow.length]
  }

  async function loadCases() {
    try {
      setApiMode("Loading")
      const response = await fetch("/api/buildflow-cases")
      const data = await response.json()
      if (!response.ok || !data.ok) throw new Error(data.error || "API request failed")
      const mappedCases = data.cases.map(mapApiCaseToUi)
      setCases(mappedCases)
      setSelected(mappedCases[0]?.id || "BF-001")
      setApiMode("Connected")
      setApiResponse(data)
      setApiError("")
    } catch (error) {
      console.warn("buildflow cases demo fallback", error.message)
      const fallback = fallbackApiCases.map(mapApiCaseToUi)
      setCases(fallback)
      setSelected(fallback[0].id)
      setApiMode("Mock fallback")
      setApiResponse({ ok: true, source: "frontend_fallback", cases: fallbackApiCases })
      setApiError("API 暫時無法連線，已使用前端 mock fallback。")
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadCases()
    }, 0)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyCaseUpdate(nextCase, response) {
    const mapped = mapApiCaseToUi(nextCase)
    setCases((currentCases) => {
      const exists = currentCases.some((item) => item.id === mapped.id)
      return exists ? currentCases.map((item) => (item.id === mapped.id ? mapped : item)) : [mapped, ...currentCases]
    })
    setSelected(mapped.id)
    setApiResponse(response)
    setLastLineMessage(response.lineMessage || mapped.reports[0]?.replace("LINE：", "") || "")
  }

  async function addDemoCase() {
    const payload = {
      customer: "王小姐",
      type: "地坪修繕",
      description: "倉庫地面破損，需要修補。",
      budget: "NT$35,000",
      source: "LINE",
    }
    try {
      const response = await fetch("/api/buildflow-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) throw new Error(data.error || "API request failed")
      setApiMode("Connected")
      setApiError("")
      applyCaseUpdate(data.case, data)
    } catch (error) {
      console.warn("buildflow add case fallback", error.message)
      const fallbackCase = createFallbackCase()
      setCases((currentCases) => [fallbackCase, ...currentCases])
      setSelected(fallbackCase.id)
      setApiMode("Mock fallback")
      setApiError("新增案件 API 暫時無法連線，已用前端 mock fallback 新增。")
      setApiResponse({ ok: true, source: "frontend_fallback", case: fallbackCase })
      setLastLineMessage(lineMessageByStatus["待估價"])
    }
  }

  async function updateConstructionStatus() {
    if (!current) return
    const status = nextStatus(current.status)
    try {
      const response = await fetch("/api/buildflow-cases", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: current.id, status }),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) throw new Error(data.error || "API request failed")
      setApiMode("Connected")
      setApiError("")
      applyCaseUpdate(data.case, data)
    } catch (error) {
      console.warn("buildflow update case fallback", error.message)
      const lineMessage = lineMessageByStatus[status]
      setCases((currentCases) => currentCases.map((item) => (
        item.id === current.id ? {
          ...item,
          status,
          progress: statusProgress[status],
          quoteStatus: status === "待估價" ? "待估價" : status === "已報價" ? "已報價" : "業主已確認",
          construction: lineMessage,
          reports: [`LINE：${lineMessage}`, ...item.reports],
        } : item
      )))
      setApiMode("Mock fallback")
      setApiError("更新狀態 API 暫時無法連線，已用前端 mock fallback 更新。")
      setApiResponse({ ok: true, source: "frontend_fallback", lineMessage, caseId: current.id, status })
      setLastLineMessage(lineMessage)
    }
  }

  function resetDemo() {
    const fallback = fallbackApiCases.map(mapApiCaseToUi)
    setCases(fallback)
    setSelected(fallback[0].id)
    setShowDetail(false)
    setShowQuote(false)
    setApiMode("Mock fallback")
    setApiResponse({ ok: true, source: "frontend_reset", cases: fallbackApiCases })
    setApiError("Demo 已重置為前端 mock 初始資料。")
    setLastLineMessage(lineMessageByStatus["待估價"])
  }

  return (
    <Shell title="BuildFlow 案件管理" desc="把工程行的客戶需求、現場照片、報價狀態、施工進度與 LINE 回報整理成一套後台流程。">
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#d8d2c5] bg-white p-4">
        <span className={`rounded-full px-3 py-1 text-xs font-black ${apiMode === "Connected" ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#fff7ed] text-[#b45309]"}`}>
          API 狀態：{apiMode}
        </span>
        <span className="rounded-full bg-[#faf7ef] px-3 py-1 text-xs font-black text-[#52605c]">Endpoint：/api/buildflow-cases</span>
        <span className="rounded-full bg-[#faf7ef] px-3 py-1 text-xs font-black text-[#52605c]">最近 LINE：{lastLineMessage}</span>
        {apiError ? <p className="w-full text-xs font-black text-[#b45309]">{apiError}</p> : null}
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        {metrics.map(([label, value]) => (
          <MiniCard key={label} title={label}>
            <p className="text-3xl font-black text-[#111c22]">{value}</p>
          </MiniCard>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[0.72fr_1.05fr_0.78fr]">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={loadCases} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              重新載入案件
            </button>
            <button type="button" onClick={addDemoCase} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              新增案件 Demo
            </button>
            <button type="button" onClick={updateConstructionStatus} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              更新施工狀態
            </button>
            <button type="button" onClick={() => setShowDetail(true)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看照片 / 報價
            </button>
            <button type="button" onClick={() => setShowQuote(true)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              產生報價單
            </button>
            <button type="button" onClick={copyLineReport} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              複製 LINE 回報
            </button>
            <button type="button" onClick={() => setShowResponse((currentValue) => !currentValue)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 API Response
            </button>
            <button type="button" onClick={resetDemo} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              重置 Demo
            </button>
          </div>
          {showResponse ? (
            <pre className="overflow-x-auto rounded-xl bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
              {JSON.stringify(apiResponse || { message: "尚未呼叫 BuildFlow API。" }, null, 2)}
            </pre>
          ) : null}
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className={`rounded-xl border p-4 text-left ${selected === item.id ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white"}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-black">{item.id}｜{item.name}</p>
                  <p className="mt-1 text-xs font-bold text-[#52605c]">{item.customer}・{item.type}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">{item.status}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-[#52605c]">
                <span>預估：{item.budget}</span>
                <span>建立：{item.createdAt}</span>
                <span>來源：{item.source}</span>
              </div>
              <div className="mt-3"><Progress value={item.progress} /></div>
            </button>
          ))}
        </div>
        <MiniCard title="案件詳情 / Dashboard UI" tone="dark">
          <div className="grid gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-black">{current.id} {current.name}</h3>
                <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">{current.status}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-white/65">客戶：{current.customer}</p>
              <p className="mt-1 text-sm font-bold text-white/65">工程類型：{current.type}</p>
              <p className="mt-1 text-sm font-bold text-white/65">預估金額：{current.budget}</p>
              <p className="mt-1 text-sm font-bold text-white/65">來源：{current.source}</p>
              <div className="mt-4"><Progress value={current.progress} /></div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {current.photos.map((item) => (
                  <div key={item} className="aspect-square rounded-lg bg-white/10 p-2 text-[11px] font-black text-white/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2 text-sm font-black">
              {[
                ["客戶資料", `${current.customer}｜${current.phone}`],
                ["問題描述", current.issue],
                ["報價資訊", `${current.budget}｜${current.quoteStatus}`],
                ["施工狀態", current.construction],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white/10 p-3">
                  <p className="text-xs text-[#8fd6cc]">{label}</p>
                  <p className="mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </MiniCard>
        <div className="grid gap-4">
          <MiniCard title="LINE 回報 / 報價資訊">
            <div className="grid gap-3">
              <div className="rounded-xl border border-[#d8d2c5] bg-[#faf7ef] p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">LINE Message</p>
                  {copied ? <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{copied}</span> : null}
                </div>
                <p className="text-sm font-bold leading-7 text-[#52605c]">{current.reports[0]?.replace("LINE：", "")}</p>
              </div>
              <div className="rounded-xl border border-[#e3ded3] bg-white p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Quotation Card</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-2xl font-black text-[#111c22]">{current.budget}</p>
                    <p className="mt-1 text-xs font-bold text-[#52605c]">{current.quoteStatus}</p>
                  </div>
                  <span className="rounded-full bg-[#111c22] px-3 py-1 text-xs font-black text-white">Demo Preview</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {quoteItems(current).slice(0, 3).map((item) => (
                    <div key={item.name} className="flex justify-between gap-3 rounded-lg bg-[#faf7ef] px-3 py-2 text-xs font-bold text-[#52605c]">
                      <span>{item.name}</span>
                      <span>NT${item.subtotal.toLocaleString("zh-TW")}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[#e3ded3] bg-white p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Status Timeline</p>
                <div className="mt-3 grid gap-2">
                  {statusFlow.map((status) => {
                    const active = statusFlow.indexOf(status) <= statusFlow.indexOf(current.status)
                    return (
                      <div key={status} className="flex items-center gap-2 text-xs font-black text-[#52605c]">
                        <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[#0d6b62]" : "bg-[#d8d2c5]"}`} />
                        {status}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </MiniCard>
        </div>
      </div>
      {showDetail ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#111c22]/55 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[#0d6b62]">案件詳情</p>
                <h3 className="text-2xl font-black">{current.id}｜{current.name}</h3>
              </div>
              <button type="button" onClick={() => setShowDetail(false)} className="rounded-md border border-[#d8d2c5] px-3 py-2 text-sm font-black">
                關閉
              </button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <MiniCard title="照片區">
                <div className="grid grid-cols-3 gap-2">
                  {current.photos.map((item) => <div key={item} className="aspect-square rounded-lg bg-[#eef7f4] p-2 text-xs font-black text-[#0d6b62]">{item}</div>)}
                </div>
              </MiniCard>
              <MiniCard title="報價欄位">
                <p className="text-sm font-black">{current.budget}</p>
                <p className="mt-2 text-sm font-bold text-[#52605c]">狀態：{current.quoteStatus}</p>
                <div className="mt-3 grid gap-2 text-xs font-bold text-[#52605c]">
                  <span>材料 / 工資：{splitBudget(current.budget, 0.72)}</span>
                  <span>管理 / 清潔：{splitBudget(current.budget, 0.18)}</span>
                  <span>預備金：{splitBudget(current.budget, 0.1)}</span>
                </div>
              </MiniCard>
              <MiniCard title="施工備註">
                <p className="text-sm font-bold leading-7 text-[#52605c]">{current.construction}</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">{current.notes}</p>
              </MiniCard>
              <MiniCard title="LINE 回報紀錄">
                <div className="grid gap-2">
                  {current.reports.map((report, index) => (
                    <p key={`${report}-${index}`} className="rounded-lg bg-[#faf7ef] p-3 text-sm font-bold leading-7 text-[#52605c]">{report}</p>
                  ))}
                </div>
              </MiniCard>
            </div>
          </div>
        </div>
      ) : null}
      {showQuote ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#111c22]/55 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#fdfbf6] p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-[#e3ded3] pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Qingyu Web Studio Demo</p>
                <h3 className="mt-2 text-3xl font-black">工程報價單 Preview</h3>
                <p className="mt-2 text-sm font-bold text-[#52605c]">狀態：Demo Preview｜報價日期：2026-06-20</p>
              </div>
              <button type="button" onClick={() => setShowQuote(false)} className="rounded-md border border-[#d8d2c5] bg-white px-3 py-2 text-sm font-black">關閉</button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["案件編號", current.id],
                ["客戶名稱", current.customer],
                ["工程類型", current.type],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#e3ded3] bg-white p-4">
                  <p className="text-xs font-black text-[#0d6b62]">{label}</p>
                  <p className="mt-2 text-sm font-black text-[#111c22]">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 overflow-x-auto rounded-xl border border-[#e3ded3] bg-white">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-[#111c22] text-white">
                  <tr>
                    {["工項", "數量", "單價", "小計"].map((head) => (
                      <th key={head} className="px-4 py-3 font-black">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quoteItems(current).map((item) => (
                    <tr key={item.name} className="border-b border-[#e3ded3]">
                      <td className="px-4 py-3 font-bold">{item.name}</td>
                      <td className="px-4 py-3 font-bold">{item.qty}</td>
                      <td className="px-4 py-3 font-bold">NT${item.unitPrice.toLocaleString("zh-TW")}</td>
                      <td className="px-4 py-3 font-black">NT${item.subtotal.toLocaleString("zh-TW")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div className="rounded-xl border border-[#e3ded3] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">報價備註</p>
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">本報價為 Demo Preview，實際金額需依現場尺寸、材料與施工條件調整。未來可延伸 PDF 匯出與業主線上確認。</p>
              </div>
              <div className="rounded-xl bg-[#111c22] p-5 text-white">
                <p className="text-xs font-black text-white/60">總額</p>
                <p className="mt-2 text-3xl font-black">{current.budget}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}

function ApiAutomationDemo() {
  const initialForm = {
    name: "王小姐",
    industry: "咖啡店",
    service: "LINE Bot",
    budget: "15,000～30,000",
    note: "想做預約、菜單查詢，也希望後台可以看到客戶需求。",
  }
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [flowStep, setFlowStep] = useState(-1)
  const [flowRunning, setFlowRunning] = useState(false)
  const [showPayload, setShowPayload] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [apiError, setApiError] = useState("")
  const [dashboardItems, setDashboardItems] = useState([])
  const [detailLead, setDetailLead] = useState(null)
  const flow = ["Form", "API", "Validation", "Database", "Notification", "Dashboard"]

  function normalizeBudget(value) {
    if (value === "30,000 以上") return "30000+"
    if (value === "還不確定") return "undecided"
    return value.replaceAll(",", "").replace("～", "-")
  }

  const apiPayload = {
    name: form.name.trim(),
    industry: form.industry.trim(),
    service: form.service,
    budget: normalizeBudget(form.budget),
    note: form.note.trim(),
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: "" }))
  }

  function validateForm() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = "請填寫姓名。"
    if (!form.industry.trim()) nextErrors.industry = "請填寫產業。"
    if (!form.service) nextErrors.service = "請選擇需求類型。"
    if (!form.budget) nextErrors.budget = "請選擇預算區間。"
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function createFallbackResponse() {
    return {
      ok: true,
      leadId: `mock_${Date.now()}`,
      status: "mock_fallback",
      notification: "mock_sent",
      message: "Demo mode: frontend fallback simulated",
      dashboardItem: {
        ...apiPayload,
        status: "新需求",
        source: "Frontend Mock Fallback",
        createdAt: new Date().toISOString(),
      },
    }
  }

  function formatTime(value) {
    if (!value) return "剛剛"
    return new Intl.DateTimeFormat("zh-TW", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value))
  }

  function addDashboardItem(response) {
    const item = response.dashboardItem || {}
    const nextItem = {
      id: response.leadId || `REQ-${Date.now()}`,
      name: item.name || apiPayload.name,
      industry: item.industry || apiPayload.industry,
      service: item.service || apiPayload.service,
      budget: item.budget || apiPayload.budget,
      note: item.note || apiPayload.note,
      status: item.status || "新需求",
      source: item.source || "API Demo",
      createdAt: formatTime(item.createdAt),
      apiStatus: response.status || "received",
      notificationStatus: response.notification || "mock_sent",
      apiMessage: response.message || "Demo mode: notification simulated",
      payload: apiPayload,
      response,
      nextStep: "確認需求欄位，安排初步討論。",
    }
    setDashboardItems((current) => [nextItem, ...current])
  }

  async function postLead() {
    try {
      const response = await fetch("/api/automation-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) throw new Error(data.error || "API request failed")
      setApiError("")
      return data
    } catch (error) {
      console.warn("automation lead demo fallback", error.message)
      setApiError("API 暫時無法連線，已使用前端 mock fallback 完成展示。")
      return createFallbackResponse()
    }
  }

  async function playFlowAnimation() {
    for (let index = 0; index < flow.length; index += 1) {
      await new Promise((resolve) => {
        window.setTimeout(() => {
          setFlowStep(index)
          resolve()
        }, 260)
      })
    }
  }

  async function runFlow() {
    if (!validateForm()) return
    setShowPayload(false)
    setShowResponse(false)
    setApiResponse(null)
    setApiError("")
    setFlowStep(-1)
    setFlowRunning(true)
    const [response] = await Promise.all([postLead(), playFlowAnimation()])
    setApiResponse(response)
    setShowResponse(true)
    addDashboardItem(response)
    setFlowRunning(false)
  }

  async function resendFlow() {
    if (!validateForm()) return
    setFlowStep(-1)
    setFlowRunning(false)
    window.setTimeout(runFlow, 120)
  }

  async function replayFlow() {
    if (flowRunning) return
    setFlowStep(-1)
    setFlowRunning(true)
    await playFlowAnimation()
    setFlowRunning(false)
  }

  function clearDemo() {
    setForm({ name: "", industry: "", service: "", budget: "", note: "" })
    setErrors({})
    setFlowStep(-1)
    setFlowRunning(false)
    setShowPayload(false)
    setShowResponse(false)
    setApiResponse(null)
    setApiError("")
    setDashboardItems([])
    setDetailLead(null)
  }

  function flowStatus(index) {
    if (flowStep > index) return "Done"
    if (flowStep === index) return flowRunning ? "Processing" : "Done"
    return "Waiting"
  }

  return (
    <Shell title="API 自動化流程" desc="把客戶表單、API、資料驗證、通知與後台串成一條完整流程。">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <MiniCard title="客戶需求表單">
          <div className="mb-4 rounded-xl border border-[#d8d2c5] bg-[#faf7ef] p-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Live API Demo</p>
            <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">送出後會 POST 到 /api/automation-lead，回傳 leadId、通知狀態與 dashboardItem。</p>
          </div>
          <div className="grid gap-3">
            <label className="grid gap-2 text-sm font-black text-[#111c22]">
              姓名
              <input value={form.name} onChange={(event) => updateField("name", event.target.value)} className="min-h-11 rounded-lg border border-[#d8d2c5] px-3 text-sm font-bold outline-none focus:border-[#0d6b62]" />
              {errors.name ? <span className="text-xs font-black text-[#b45309]">{errors.name}</span> : null}
            </label>
            <label className="grid gap-2 text-sm font-black text-[#111c22]">
              產業
              <input value={form.industry} onChange={(event) => updateField("industry", event.target.value)} className="min-h-11 rounded-lg border border-[#d8d2c5] px-3 text-sm font-bold outline-none focus:border-[#0d6b62]" />
              {errors.industry ? <span className="text-xs font-black text-[#b45309]">{errors.industry}</span> : null}
            </label>
            <label className="grid gap-2 text-sm font-black text-[#111c22]">
              需求類型
              <select value={form.service} onChange={(event) => updateField("service", event.target.value)} className="min-h-11 rounded-lg border border-[#d8d2c5] px-3 text-sm font-bold outline-none focus:border-[#0d6b62]">
                {["網站", "LINE Bot", "AI 工具", "小型系統"].map((item) => <option key={item}>{item}</option>)}
              </select>
              {errors.service ? <span className="text-xs font-black text-[#b45309]">{errors.service}</span> : null}
            </label>
            <label className="grid gap-2 text-sm font-black text-[#111c22]">
              預算區間
              <select value={form.budget} onChange={(event) => updateField("budget", event.target.value)} className="min-h-11 rounded-lg border border-[#d8d2c5] px-3 text-sm font-bold outline-none focus:border-[#0d6b62]">
                {["6,000～12,000", "15,000～30,000", "30,000 以上", "還不確定"].map((item) => <option key={item}>{item}</option>)}
              </select>
              {errors.budget ? <span className="text-xs font-black text-[#b45309]">{errors.budget}</span> : null}
            </label>
            <label className="grid gap-2 text-sm font-black text-[#111c22]">
              備註
              <textarea value={form.note} onChange={(event) => updateField("note", event.target.value)} rows={4} className="rounded-lg border border-[#d8d2c5] px-3 py-2 text-sm font-bold leading-6 outline-none focus:border-[#0d6b62]" />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={runFlow} disabled={flowRunning} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60">
              {flowRunning ? "傳送中..." : "送出表單"}
            </button>
            <button type="button" onClick={() => setShowPayload((current) => !current)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 API Payload
            </button>
            <button type="button" onClick={() => setShowResponse((current) => !current)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 API Response
            </button>
            <button type="button" onClick={resendFlow} disabled={flowRunning} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] disabled:cursor-not-allowed disabled:opacity-60">
              重送一次
            </button>
            <button type="button" onClick={replayFlow} disabled={flowRunning} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] disabled:cursor-not-allowed disabled:opacity-60">
              重播流程
            </button>
            <button type="button" onClick={() => scrollToSection("tech")} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              技術拆解
            </button>
            <button type="button" onClick={clearDemo} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              清空
            </button>
          </div>
          {showPayload ? (
            <pre className="mt-3 overflow-x-auto rounded-lg bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
              {JSON.stringify(apiPayload, null, 2)}
            </pre>
          ) : null}
          {showResponse ? (
            <div className="mt-3 rounded-xl border border-[#d8d2c5] bg-[#faf7ef] p-3">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-black text-[#52605c]">
                <span className="rounded-full bg-white px-3 py-1">API: {apiResponse?.status || "尚未送出"}</span>
                <span className="rounded-full bg-white px-3 py-1">Notification: {apiResponse?.notification || "尚未模擬"}</span>
              </div>
              {apiError ? <p className="mb-2 text-xs font-black text-[#b45309]">{apiError}</p> : null}
              <pre className="overflow-x-auto rounded-lg bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
                {JSON.stringify(apiResponse || { message: "送出表單後會顯示 API response。" }, null, 2)}
              </pre>
            </div>
          ) : null}
        </MiniCard>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {flow.map((item, index) => {
              const status = flowStatus(index)
              const active = status !== "Waiting"
              return (
                <MiniCard key={item} title={`0${index + 1}`}>
                  <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${active ? "bg-[#0d6b62] text-white" : "bg-white text-[#52605c]"}`}>
                    {index + 1}
                  </div>
                  <p className="text-sm font-black leading-6">{item}</p>
                  <p className={`mt-2 text-xs font-black ${status === "Processing" ? "text-[#b45309]" : active ? "text-[#0d6b62]" : "text-[#52605c]"}`}>{status}</p>
                </MiniCard>
              )
            })}
          </div>
          <MiniCard title="API 回應狀態">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["ok", apiResponse?.ok ? "true" : "waiting"],
                ["leadId", apiResponse?.leadId || "尚未建立"],
                ["notification", apiResponse?.notification || "尚未通知"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#e3ded3] bg-[#faf7ef] p-3">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0d6b62]">{label}</p>
                  <p className="mt-2 break-words text-sm font-black text-[#111c22]">{value}</p>
                </div>
              ))}
            </div>
            {apiError ? <p className="mt-3 text-xs font-black text-[#b45309]">{apiError}</p> : null}
          </MiniCard>
          <MiniCard title="Dashboard 更新結果" tone="dark">
            <div className="grid gap-3">
              {dashboardItems.length ? (
                dashboardItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => setDetailLead(item)} className="rounded-xl border border-white/10 bg-white/10 p-3 text-left transition hover:bg-white/15">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-black text-white">{item.name}</p>
                      <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#111c22]">{item.status}</span>
                    </div>
                    <div className="mt-3 grid gap-2 text-xs font-bold leading-5 text-white/72 sm:grid-cols-2">
                      <span>Lead ID：{item.id}</span>
                      <span>產業：{item.industry}</span>
                      <span>需求：{item.service}</span>
                      <span>預算：{item.budget}</span>
                      <span>通知：{item.notificationStatus}</span>
                      <span>建立：{item.createdAt}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">來源：{item.source}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">待追蹤</span>
                    </div>
                    <span className="mt-3 inline-flex rounded-md bg-white px-3 py-1 text-xs font-black text-[#111c22]">查看詳情</span>
                  </button>
                ))
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/10 p-4 text-sm font-bold leading-7 text-white/72">
                  表單送出後，資料會在這裡變成 dashboard 紀錄。
                </div>
              )}
            </div>
          </MiniCard>
        </div>
      </div>
      {detailLead ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#111c22]/55 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Request Detail</p>
                <h3 className="mt-2 text-2xl font-black">{detailLead.name}</h3>
              </div>
              <button type="button" onClick={() => setDetailLead(null)} className="rounded-md border border-[#d8d2c5] px-3 py-2 text-sm font-black">關閉</button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <MiniCard title="原始表單資料">
                <div className="grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
                  <p>產業：{detailLead.industry}</p>
                  <p>需求：{detailLead.service}</p>
                  <p>預算：{detailLead.budget}</p>
                  <p>備註：{detailLead.note || "未填"}</p>
                  <p>來源：{detailLead.source}</p>
                </div>
              </MiniCard>
              <MiniCard title="通知紀錄">
                <div className="grid gap-2 text-sm font-bold leading-6 text-[#52605c]">
                  <p>通知狀態：{detailLead.notificationStatus}</p>
                  <p>API 狀態：{detailLead.apiStatus}</p>
                  <p>{detailLead.apiMessage}</p>
                  <p>Mock Notification Log：LINE / Email optional 已模擬送出。</p>
                  <p>後台：已新增 lead 並標記待追蹤。</p>
                </div>
              </MiniCard>
            </div>
            <MiniCard title="API Payload">
              <pre className="overflow-x-auto rounded-lg bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
                {JSON.stringify(detailLead.payload, null, 2)}
              </pre>
            </MiniCard>
            <MiniCard title="API Response">
              <pre className="overflow-x-auto rounded-lg bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
                {JSON.stringify(detailLead.response, null, 2)}
              </pre>
            </MiniCard>
            <MiniCard title="下一步處理建議">
              <p className="text-sm font-bold leading-7 text-[#52605c]">{detailLead.nextStep}</p>
            </MiniCard>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}

function QingyuWebDemo() {
  const siteBlocks = [
    ["Hero", "讓服務被看懂，第一屏放清楚定位與 CTA。"],
    ["服務分類", "品牌網站、作品集、小型系統、AI 工具、LINE Bot。"],
    ["Demo Lab / 精選作品", "把技術作品變成可點、可看的案例入口。"],
    ["需求診斷 CTA", "引導客戶用 Project Planner 整理需求。"],
    ["技術能力", "展示 React、Vercel、SEO、API 串接能力。"],
    ["聯絡轉換", "把訪客導到 contact 與需求討論。"],
    ["SEO / sitemap / robots", "讓搜尋引擎讀懂主站與作品頁。"],
  ]
  const rwdDevices = [
    {
      name: "Desktop",
      width: "lg:col-span-2",
      preview: ["Hero + CTA", "Demo Lab 作品列", "技術能力 / 服務分類"],
    },
    {
      name: "Tablet",
      width: "",
      preview: ["作品卡雙欄", "Project Planner CTA", "Contact CTA"],
    },
    {
      name: "Mobile",
      width: "",
      preview: ["短標題", "一張一張好滑", "按鈕好點"],
    },
  ]
  const seoPanel = [
    ["title", "Qingyu Web Studio｜台灣網站製作、AI 工具與 LINE Bot 開發"],
    ["description", "網站、作品集、AI 工具、LINE Bot、API 串接與簡易管理系統。"],
    ["Open Graph", "社群分享標題、描述與預覽圖。"],
    ["sitemap.xml", "收錄首頁、作品頁、工具頁。"],
    ["robots.txt", "允許搜尋引擎索引公開頁面。"],
    ["canonical", "每頁指向正式網址。"],
    ["structured data", "提供網站服務與組織資訊。"],
  ]
  const techTags = ["React", "Vite", "Tailwind", "React Router", "Vercel", "SEO", "Open Graph", "sitemap", "robots"]

  return (
    <Shell title="Qingyu Web Studio 主站" desc="一個為台灣個人品牌、小型店家、工作室與學生設計的網站服務主站，整合服務介紹、作品展示、需求診斷、SEO 與聯絡轉換。">
      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <MiniCard title="主站架構圖" tone="dark">
          <div className="grid gap-3">
            {siteBlocks.map(([title, text], index) => (
              <div key={title} className="grid gap-3 rounded-xl border border-white/10 bg-white/10 p-3 sm:grid-cols-[auto_1fr] sm:items-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8fd6cc] text-xs font-black text-[#0b2724]">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-black text-white">{title}</p>
                  <p className="mt-1 text-xs font-bold leading-5 text-white/68">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/" className="inline-flex min-h-10 items-center rounded-md bg-white px-4 text-sm font-black text-[#111c22]">
              查看首頁
            </a>
            <a href="/tools/project-planner" className="inline-flex min-h-10 items-center rounded-md border border-white/20 px-4 text-sm font-black text-white">
              查看需求診斷
            </a>
            <button type="button" onClick={() => scrollToSection("tech")} className="inline-flex min-h-10 items-center rounded-md border border-white/20 px-4 text-sm font-black text-white">
              技術拆解
            </button>
          </div>
        </MiniCard>
        <div className="grid gap-4">
          <MiniCard title="RWD 展示">
            <div className="grid gap-3 lg:grid-cols-2">
              {rwdDevices.map((device) => (
                <div key={device.name} className={`rounded-2xl border border-[#e3ded3] bg-[#faf7ef] p-3 ${device.width}`}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{device.name}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-[#52605c]">RWD</span>
                  </div>
                  <div className="grid gap-2 rounded-xl bg-white p-3">
                    {device.preview.map((item) => (
                      <div key={item} className="rounded-lg bg-[#eef7f4] px-3 py-2 text-xs font-black text-[#0d6b62]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MiniCard>
          <MiniCard title="入口連結">
            <div className="flex flex-wrap gap-2">
              <a href="/sitemap.xml" className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 py-2 text-sm font-black text-[#111c22]">
                查看 sitemap
              </a>
              <a href="/robots.txt" className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 py-2 text-sm font-black text-[#111c22]">
                查看 robots
              </a>
              <a href="/contact" className="min-h-10 rounded-md bg-[#111c22] px-4 py-2 text-sm font-black text-white">
                聯絡 CTA
              </a>
            </div>
          </MiniCard>
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <MiniCard title="SEO Panel">
          <div className="grid gap-2">
            {seoPanel.map(([label, value]) => (
              <div key={label} className="rounded-xl border border-[#e3ded3] bg-white p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{label}</p>
                <p className="mt-2 break-words text-sm font-bold leading-6 text-[#52605c]">{value}</p>
              </div>
            ))}
          </div>
        </MiniCard>
        <MiniCard title="產品導流流程">
          <div className="grid gap-3">
            {["Visitor", "Homepage", "Demo Lab", "Project Planner", "Contact", "Case Study"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-[#e3ded3] bg-[#faf7ef] p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111c22] text-xs font-black text-white">{index + 1}</span>
                <div>
                  <p className="text-sm font-black text-[#111c22]">{item}</p>
                  <p className="mt-1 text-xs font-bold text-[#52605c]">導向下一個更明確的委託行動。</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {techTags.map((item) => (
              <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">
                {item}
              </span>
            ))}
          </div>
        </MiniCard>
      </div>
    </Shell>
  )
}

function XinjiangDemo() {
  return (
    <Shell title="鑫匠工程網站案例" desc="工程服務網站與估價入口，作為 Qingyu Web Studio 的垂直產業案例，而不是主品牌。">
      <div className="grid gap-4 lg:grid-cols-3">
        {["工程服務網站", "估價入口", "施工案例", "管理後台概念"].map((item) => (
          <MiniCard key={item} title={item}>
            <p className="text-sm font-bold leading-6 text-[#52605c]">展示工程服務如何從網站入口銜接到後台流程。</p>
          </MiniCard>
        ))}
      </div>
    </Shell>
  )
}

function WorkDemoPanel({ project }) {
  const panel = useMemo(() => {
    if (project.slug === "ai-audit") return <AiAuditDemo />
    if (project.slug === "linebot") return <LineBotDemo />
    if (project.slug === "buildflow") return <BuildFlowDemo />
    if (project.slug === "api-automation") return <ApiAutomationDemo />
    if (project.slug === "qingyu-web") return <QingyuWebDemo />
    if (project.slug === "xinjiang") return <XinjiangDemo />
    return null
  }, [project.slug])

  return panel
}

export default WorkDemoPanel
