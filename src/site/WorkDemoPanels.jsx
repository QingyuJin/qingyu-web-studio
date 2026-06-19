import { useMemo, useState } from "react"

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

function BuildFlowDemo() {
  const [selected, setSelected] = useState("q-001")
  const [statusIndex, setStatusIndex] = useState(-1)
  const [showDetail, setShowDetail] = useState(false)
  const [cases, setCases] = useState([
    { id: "q-001", name: "屋頂防水工程", customer: "LINE 業主", status: "施工回報中", progress: 75 },
    { id: "b-014", name: "店面地坪工程", customer: "張先生", status: "估價中", progress: 45 },
    { id: "c-022", name: "浴室漏水修繕", customer: "王小姐", status: "待驗收", progress: 90 },
  ])
  const statusFlow = [
    { status: "待估價", progress: 25, line: "LINE 回報：已收到客戶照片，等待估價。" },
    { status: "已報價", progress: 55, line: "LINE 回報：報價已送出，等待業主確認。" },
    { status: "施工中", progress: 75, line: "LINE 回報：今日 2 人出工，完成底層清潔。" },
    { status: "完工", progress: 100, line: "LINE 回報：完工照已上傳，準備驗收。" },
  ]
  const [lineReport, setLineReport] = useState(statusFlow[0].line)
  const current = cases.find((item) => item.id === selected) || cases[0]

  function addDemoCase() {
    const demoCase = { id: "d-033", name: "陽台漏水檢修", customer: "林先生", status: "待估價", progress: 25 }
    setCases((currentCases) => (
      currentCases.some((item) => item.id === demoCase.id) ? currentCases : [demoCase, ...currentCases]
    ))
    setSelected(demoCase.id)
    setStatusIndex(-1)
    setLineReport("LINE 回報：新增案件，客戶已補照片，待估價。")
  }

  function updateConstructionStatus() {
    const nextIndex = (statusIndex + 1) % statusFlow.length
    const next = statusFlow[nextIndex]
    setStatusIndex(nextIndex)
    setCases((currentCases) => currentCases.map((item) => (
      item.id === selected ? { ...item, status: next.status, progress: next.progress } : item
    )))
    setLineReport(next.line)
  }

  return (
    <Shell title="BuildFlow 工程行案件管理系統" desc="用前端 Dashboard 展示案件、報價、照片、施工狀態與 LINE 回報如何被整理。">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={addDemoCase} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              新增案件 Demo
            </button>
            <button type="button" onClick={updateConstructionStatus} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              更新施工狀態
            </button>
            <button type="button" onClick={() => setShowDetail(true)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看照片 / 報價
            </button>
          </div>
          {cases.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className={`rounded-xl border p-4 text-left ${selected === item.id ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white"}`}
            >
              <p className="text-sm font-black">{item.id}｜{item.name}</p>
              <p className="mt-1 text-xs font-bold text-[#52605c]">{item.customer}・{item.status}</p>
              <div className="mt-3"><Progress value={item.progress} /></div>
            </button>
          ))}
        </div>
        <MiniCard title="案件詳情 / Dashboard UI" tone="dark">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-2xl font-black">{current.id} {current.name}</h3>
                <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">{current.status}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-white/65">客戶：{current.customer}</p>
              <p className="mt-1 text-sm font-bold text-white/65">工程類型：防水 / 修繕</p>
              <div className="mt-4"><Progress value={current.progress} /></div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["施工前", "施工中", "完工照"].map((item) => (
                  <div key={item} className="aspect-square rounded-lg bg-white/10 p-2 text-[11px] font-black text-white/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2 text-sm font-black">
              {[
                ["照片區", "施工前 3 張，完工照待補"],
                ["報價區", "NT$53,900，業主已確認"],
                ["施工狀態", "今日 2 人出工，底層清潔完成"],
                ["LINE 回報", lineReport],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-white/10 p-3">
                  <p className="text-xs text-[#8fd6cc]">{label}</p>
                  <p className="mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </MiniCard>
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
                  {["施工前", "施工中", "完工照"].map((item) => <div key={item} className="aspect-square rounded-lg bg-[#eef7f4] p-2 text-xs font-black text-[#0d6b62]">{item}</div>)}
                </div>
              </MiniCard>
              <MiniCard title="報價欄位">
                <p className="text-sm font-black">NT$53,900</p>
                <p className="mt-2 text-sm font-bold text-[#52605c]">狀態：業主已確認</p>
              </MiniCard>
              <MiniCard title="施工備註">
                <p className="text-sm font-bold leading-7 text-[#52605c]">底層清潔完成，明天施作防水底漆。</p>
              </MiniCard>
              <MiniCard title="LINE 回報紀錄">
                <p className="text-sm font-bold leading-7 text-[#52605c]">{lineReport}</p>
              </MiniCard>
            </div>
          </div>
        </div>
      ) : null}
    </Shell>
  )
}

function ApiAutomationDemo() {
  const [submitted, setSubmitted] = useState(false)
  const [flowStep, setFlowStep] = useState(-1)
  const [showPayload, setShowPayload] = useState(false)
  const flow = ["Form", "API", "Database", "Notification", "Dashboard"]
  const payload = {
    name: "測試客戶",
    service: "LINE Bot",
    budget: "10000-30000",
    status: "new",
  }

  function runFlow() {
    setSubmitted(true)
    setShowPayload(false)
    setFlowStep(-1)
    flow.forEach((_, index) => {
      window.setTimeout(() => setFlowStep(index), 260 * (index + 1))
    })
  }

  function replayFlow() {
    setSubmitted(false)
    setFlowStep(-1)
    window.setTimeout(runFlow, 120)
  }

  return (
    <Shell title="API 串接 / 自動化流程" desc="用流程圖與 UI mockup 展示從表單到 API、資料庫、後台與通知的完整自動化。">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <MiniCard title="表單送出">
          <div className="grid gap-3">
            {["姓名：陳小姐", "需求：預約諮詢", "通知：LINE + Email"].map((item) => (
              <div key={item} className="rounded-lg border border-[#e3ded3] bg-white p-3 text-sm font-bold text-[#52605c]">{item}</div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={runFlow} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              送出表單
            </button>
            <button type="button" onClick={replayFlow} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              重播流程
            </button>
            <button type="button" onClick={() => setShowPayload((current) => !current)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 API Payload
            </button>
          </div>
          {showPayload ? (
            <pre className="mt-3 overflow-x-auto rounded-lg bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
              {JSON.stringify(payload, null, 2)}
            </pre>
          ) : null}
        </MiniCard>
        <div className="grid gap-3 md:grid-cols-5">
          {flow.map((item, index) => (
            <MiniCard key={item} title={`0${index + 1}`}>
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${flowStep >= index ? "bg-[#0d6b62] text-white" : "bg-white text-[#52605c]"}`}>
                {index + 1}
              </div>
              <p className="text-sm font-black leading-6">{item}</p>
              <p className="mt-2 text-xs font-bold text-[#52605c]">{flowStep >= index ? "synced" : submitted ? "processing" : "waiting"}</p>
            </MiniCard>
          ))}
        </div>
        <MiniCard title="Dashboard 更新結果" tone="dark">
          <div className="grid gap-3 sm:grid-cols-3">
            {(flowStep >= 4 ? ["新需求 #1042", "通知已排程", "狀態 synced"] : ["等待資料", "等待通知", "尚未同步"]).map((item) => (
              <div key={item} className="rounded-lg bg-white/10 p-3 text-sm font-black">{item}</div>
            ))}
          </div>
        </MiniCard>
      </div>
    </Shell>
  )
}

function QingyuWebDemo() {
  const metrics = [
    ["SEO metadata", "title / description / canonical"],
    ["Open Graph", "社群預覽圖與描述"],
    ["RWD", "手機第一屏與 CTA"],
    ["Vercel", "靜態部署與 sitemap"],
  ]

  return (
    <Shell title="Qingyu Web Studio 主站" desc="這個網站本身也是作品：展示定位、服務分類、作品入口、SEO 與聯絡轉換。">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <MiniCard title="首頁架構" tone="dark">
          <div className="grid gap-2">
            {["Hero：讓服務被看懂", "服務分類", "精選作品", "技術能力", "聯絡 CTA"].map((item) => (
              <div key={item} className="rounded-lg bg-white/10 p-3 text-sm font-black">{item}</div>
            ))}
          </div>
        </MiniCard>
        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map(([title, text]) => (
            <MiniCard key={title} title={title}>
              <p className="text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </MiniCard>
          ))}
        </div>
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
