import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const aiExampleReport = {
  source: "mock_example",
  summary: "範例網站適合先強化首頁標題、聯絡 CTA、社群信任感與手機版資訊排序。",
  scores: { clarity: 86, cta: 81, seo: 84, trust: 88, mobile: 79 },
  sections: [
    { title: "首頁標題", finding: "標題有方向，但還可以更直接說明服務價值。", suggestion: "改成「讓網站真的幫你接單」或「讓你的服務被看懂」。" },
    { title: "首頁文案", finding: "目前描述偏完整，但手機版可再縮短。", suggestion: "副標控制在 1～2 行，把細節放到服務區。" },
    { title: "CTA", finding: "主要 CTA 需要比其他連結更突出。", suggestion: "第一屏放「聊聊需求」，第二 CTA 放「看作品」。" },
    { title: "SEO", finding: "title 需要包含地區與服務。", suggestion: "建議使用「台灣網站製作、AI 工具與 LINE Bot 開發」。" },
    { title: "信任感", finding: "作品展示可再加強技術與流程證據。", suggestion: "每個案例加上 mockup、技術架構和可操作成品。" },
    { title: "手機版", finding: "若首屏資訊太多，使用者會滑走。", suggestion: "保留短標題、短副標、兩個按鈕與一個產品 mockup。" },
  ],
  nextSteps: ["縮短 Hero 文案", "把 CTA 移到第一屏", "作品卡補成品入口", "確認 sitemap 與 OG metadata"],
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
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Product Preview</p>
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
  const [target, setTarget] = useState("店家想做服務入口網站，主要靠 LINE 接洽客戶。")
  const [report, setReport] = useState({
    source: "mock",
    summary: "這個網站方向可以成立，但首頁需要更快說清楚服務、客群與聯絡方式。",
    scores: { clarity: 82, cta: 74, seo: 78, trust: 86, mobile: 80 },
    sections: [
      { title: "首頁標題", finding: "標題需要在 5 秒內說清楚服務。", suggestion: "使用短標題，再用副標補充服務範圍。" },
      { title: "首頁文案", finding: "副標需要說清楚服務對象與下一步。", suggestion: "用 1～2 句補充服務對象、可做項目與聯絡方式。" },
      { title: "CTA", finding: "聯絡入口可以更明顯。", suggestion: "第一屏保留主要 CTA「聊聊需求」。" },
      { title: "SEO", finding: "需要包含地區、服務與客群。", suggestion: "title 可加入「台灣網站製作、AI 工具、LINE Bot」。" },
      { title: "信任感", finding: "客戶會先看案例與流程。", suggestion: "補作品、流程、價格方向與聯絡方式。" },
    ],
    nextSteps: ["收斂首頁主標題", "補清楚 CTA", "整理精選作品", "確認手機版第一屏"],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [chatInput, setChatInput] = useState("我的網站適合做哪種方案？")
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "這是顧問助理。你可以問網站方案、LINE Bot、AI 工具或工程系統方向。",
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
      setError(requestError.message || "AI 暫時無法分析，已保留範例報告。")
    } finally {
      setLoading(false)
    }
  }

  async function showExampleReport() {
    setTarget("範例：台灣店家，想做服務入口網站，主要希望客戶能看懂服務並透過 LINE 詢問。")
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
      setChatMessages([...nextMessages, { role: "assistant", content: data.reply || "目前先用展示回覆，請稍後再試。" }])
    } catch {
      setChatMessages([...nextMessages, { role: "assistant", content: "AI 助理暫時無法連線，這裡先顯示展示回覆。" }])
    }
  }

  return (
    <Shell title="AI 網站健檢工具" desc="輸入網站或需求後，產生首頁文案、CTA、SEO 與信任感建議。">
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
                {report.source === "openai" ? "OpenAI" : "展示模式"}
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
        <MiniCard title="聊天式 AI 助理">
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
  source: "demo_mode",
  score: 82,
  summary: "這份報告會檢查首頁是否讓台灣客戶快速看懂服務、信任你，並知道下一步要怎麼聯絡。",
  seo: ["title 建議包含服務、地區與主要客群，例如：台灣網站製作、作品集、一頁式網站。"],
  cta: ["主要 CTA 建議只保留一個明確動作，例如「免費網站健檢」或「聊聊需求」。"],
  copywriting: ["首頁標題要先說清楚你能幫誰解決什麼事，不要一開始堆滿技術詞。"],
  trust: ["加入作品案例、製作流程、聯絡方式與交付內容，會比單純說自己會技術更有信任感。"],
  mobile: ["手機版第一屏要先看到標題、短描述與 CTA，避免過多卡片讓訪客滑不到重點。"],
  nextSteps: ["重寫首頁第一屏標題與 CTA", "把作品案例放到 CTA 後方", "補上 SEO title / description", "檢查手機版按鈕是否容易點擊"],
}

const cleanAiAuditExampleInput =
  "我是台灣工作室，想做一個能介紹服務、放作品、讓客戶填表或加 LINE 的網站。希望手機版清楚，也想知道 SEO 和首頁文案怎麼寫。"

const auditIndustries = ["店家", "個人品牌", "工作室", "工程服務", "作品展示"]
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
    source: data.source || "demo_mode",
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
  const [auditNotice, setAuditNotice] = useState("輸入網站或需求，報告會分成 SEO、CTA、文案與手機版建議。")

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
      const nextReport = normalizeAiAuditReport(response.ok ? data : null)
      setReport(nextReport)
      setAuditNotice(`報告已產生，分數 ${nextReport.score}。`)
      if (!response.ok) setError("API 暫時無法分析，已顯示範例報告。")
    } catch {
      setReport(cleanAiAuditFallback)
      setAuditNotice(`範例報告已載入，分數 ${cleanAiAuditFallback.score}。`)
      setError("目前沒有連線到 AI 服務，已使用範例資料。")
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
      setAuditNotice("報告摘要已複製。")
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
    setAuditNotice("輸入網站或需求，報告會分成 SEO、CTA、文案與手機版建議。")
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
          <div className="mt-4 grid grid-cols-2 gap-2 md:flex md:flex-wrap">
            <button type="button" onClick={() => runAudit(false)} disabled={loading} className="min-h-11 rounded-md bg-[#111c22] px-4 text-sm font-black text-white transition hover:bg-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "分析中..." : "開始分析"}
            </button>
            <button type="button" onClick={() => runAudit(true)} disabled={loading} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] disabled:cursor-not-allowed disabled:opacity-60">
              查看範例報告
            </button>
            <button type="button" onClick={copyAdvice} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] md:inline-flex md:items-center">
              {copied ? "已複製" : "複製建議"}
            </button>
            <button type="button" onClick={clearAudit} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] md:inline-flex md:items-center">
              清空
            </button>
            <button type="button" onClick={() => scrollToSection("tech")} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] md:inline-flex md:items-center">
              技術拆解
            </button>
          </div>
          {loading ? (
            <div className="mt-4 rounded-lg border border-[#e3ded3] bg-white p-3 interaction-pop">
              <p className="mb-3 text-xs font-black text-[#0d6b62]">正在檢查 SEO、CTA、信任感與手機版...</p>
              <LoadingBars />
            </div>
          ) : null}
          {error ? <p className="mt-3 rounded-lg bg-[#fff7ed] px-3 py-2 text-xs font-black text-[#b45309]">{error}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            {["需求輸入", "Serverless API", "OpenAI-ready", "範例資料"].map((tag) => (
              <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">{tag}</span>
            ))}
          </div>
          <p key={auditNotice} className="mt-4 rounded-lg bg-[#eef7f4] px-3 py-2 text-xs font-black text-[#0d6b62] interaction-pop">{auditNotice}</p>
        </MiniCard>

        <div className="grid gap-4">
          <MiniCard title="AI 健檢報告" tone="dark">
            <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
              <div className="grid h-32 w-32 place-items-center rounded-full p-2" style={scoreStyle}>
                <div className="grid h-full w-full place-items-center rounded-full bg-[#111c22]">
                  <div className="text-center">
                    <p key={displayedReport.score} className="text-4xl font-black score-pulse">{displayedReport.score}</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/45">score</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">
                    {displayedReport.source === "openai" ? "OpenAI result" : "Preview result"}
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
                <div key={item} className="flex gap-3 rounded-lg bg-white px-3 py-2 text-sm font-bold leading-6 text-[#52605c] interaction-pop">
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
      detail: "使用者想做店家網站，需要判斷適合一般網站、LINE Bot 或後台流程。",
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
        { role: "bot", text: "可以。請提供產業、功能、預算、時程。" },
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
        openAI: data?.modes?.openAI || "展示回覆模式",
        line: data?.modes?.line || "展示 webhook 模式",
      })
    } catch (error) {
      setWebhookStatus({
        ok: false,
        message: error.message || "Webhook health check failed",
        openAI: "展示回覆模式",
        line: "展示 webhook 模式",
      })
    } finally {
      setWebhookLoading(false)
    }
  }

  return (
    <Shell title="LINE Bot 詢價 / 預約系統" desc="展示客戶在 LINE 留需求後，如何整理成後台案件與追蹤狀態。">
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
                <p><span className="font-black text-[#111c22]">Webhook 路徑：</span>/api/line-webhook</p>
                <p><span className="font-black text-[#111c22]">AI 回覆：</span>{webhookStatus?.openAI || "展示回覆模式"}</p>
                <p><span className="font-black text-[#111c22]">LINE 回覆：</span>{webhookStatus?.line || "展示 webhook 模式"}</p>
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
    text: "你好，我是 Qingyu 詢價助理。你可以直接說想做什麼網站、LINE Bot 或後台流程。",
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
        text: "可以。請提供產業、功能、預算、時程。",
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
      suggestedService: "LINE Bot + 表單 + 後台流程",
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
        text: "可以。請提供產業、功能、預算、時程。",
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
          "Webhook Ready",
          "展示回覆模式",
          "Signature verify supported",
          "OpenAI reply optional",
          "LINE Reply API optional",
        ],
      })
    } catch (error) {
      setWebhookStatus({
        ok: false,
        message: error?.message || "Webhook health check failed",
        items: ["Webhook 暫時無法連線", "展示回覆模式", "不顯示任何金鑰"],
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
              重置
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
                <p><span className="font-black text-[#111c22]">Webhook 路徑：</span>/api/line-webhook</p>
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
                "展示回覆模式",
              ].map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 overflow-x-auto rounded-xl bg-[#111c22] p-4 text-xs font-black text-white">
              LINE User → LINE Platform → /api/line-webhook → OpenAI / 展示回覆 → LINE Reply → Dashboard
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
  const [mobileTab, setMobileTab] = useState("cases")
  const [actionNotice, setActionNotice] = useState("案件流程已載入，可以新增案件或更新狀態。")
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

  function createXinjiangCaseId() {
    return `BF-XJ-${Date.now().toString().slice(-4)}`
  }

  function mapXinjiangCaseToUi(apiCase) {
    return {
      ...mapApiCaseToUi({
        ...apiCase,
        source: apiCase.source || "鑫匠工程網站表單",
        photos: ["xinjiang-roof-1", "quote-form", "site-waterproof"],
        logs: ["已收到來自鑫匠工程網站的估價需求，等待初步估價。"],
      }),
      name: "鑫匠工程範例案件",
      quoteStatus: "待估價",
      construction: "網站估價需求已進入 BuildFlow，等待整理照片與初步估價。",
      notes: "網站估價進 BuildFlow，後續接 LINE 回報與報價單。",
    }
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
      setActionNotice("LINE 回報文字已複製，可以直接貼給客戶。")
    } catch {
      setCopied("已選取回報文字")
      setActionNotice("瀏覽器未開放剪貼簿權限，請手動選取 LINE 回報。")
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
      setActionNotice("案件列表已重新載入。")
    } catch (error) {
      console.warn("buildflow cases demo fallback", error.message)
      const fallback = fallbackApiCases.map(mapApiCaseToUi)
      setCases(fallback)
      setSelected(fallback[0].id)
      setApiMode("展示模式")
      setApiResponse({ ok: true, source: "demo_mode", cases: fallbackApiCases })
      setApiError("API 暫時無法連線，已使用展示模式顯示。")
      setActionNotice("展示模式已載入案件列表。")
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
      setActionNotice("新案件已進入 BuildFlow，右側詳情已同步更新。")
      setMobileTab("detail")
    } catch (error) {
      console.warn("buildflow add case fallback", error.message)
      const fallbackCase = createFallbackCase()
      setCases((currentCases) => [fallbackCase, ...currentCases])
      setSelected(fallbackCase.id)
      setApiMode("展示模式")
      setApiError("新增案件 API 暫時無法連線，已用展示模式新增。")
      setApiResponse({ ok: true, source: "demo_mode", case: fallbackCase })
      setLastLineMessage(lineMessageByStatus["待估價"])
      setActionNotice("展示模式新增案件完成，已切到案件詳情。")
      setMobileTab("detail")
    }
  }

  async function simulateXinjiangCase() {
    const payload = {
      customer: "陳先生",
      type: "屋頂防水",
      description: "下雨後屋頂滲水，想先估價",
      budget: "NT$28,000",
      source: "鑫匠工程網站表單",
    }
    try {
      const response = await fetch("/api/buildflow-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) throw new Error(data.error || "API request failed")
      const mapped = mapXinjiangCaseToUi(data.case)
      setCases((currentCases) => [mapped, ...currentCases])
      setSelected(mapped.id)
      setApiMode("Connected")
      setApiError("")
      setApiResponse({
        ...data,
        scenario: "xinjiang_case",
        lineMessage: "已收到來自鑫匠工程網站的估價需求，等待初步估價。",
      })
      setLastLineMessage("已收到來自鑫匠工程網站的估價需求，等待初步估價。")
      setActionNotice("鑫匠工程估價需求已進入 BuildFlow。")
      setMobileTab("detail")
    } catch (error) {
      console.warn("buildflow xinjiang case fallback", error.message)
      const fallbackCase = mapXinjiangCaseToUi({
        id: createXinjiangCaseId(),
        customer: "陳先生",
        type: "屋頂防水",
        status: "待估價",
        budget: "NT$28,000",
        createdAt: "剛剛",
        source: "鑫匠工程網站表單",
        description: "下雨後屋頂滲水，想先估價",
      })
      setCases((currentCases) => [fallbackCase, ...currentCases])
      setSelected(fallbackCase.id)
      setApiMode("展示模式")
      setApiError("鑫匠案例 API 暫時無法連線，已用展示模式新增。")
      setApiResponse({ ok: true, source: "demo_mode", scenario: "xinjiang_case", case: fallbackCase })
      setLastLineMessage("已收到來自鑫匠工程網站的估價需求，等待初步估價。")
      setActionNotice("展示模式新增鑫匠案例完成。")
      setMobileTab("detail")
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
      setActionNotice(`案件狀態已更新為「${status}」，LINE 回報已同步。`)
      setMobileTab("line")
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
      setApiMode("展示模式")
      setApiError("更新狀態 API 暫時無法連線，已用展示模式更新。")
      setApiResponse({ ok: true, source: "demo_mode", lineMessage, caseId: current.id, status })
      setLastLineMessage(lineMessage)
      setActionNotice(`展示模式更新為「${status}」，LINE 回報已新增。`)
      setMobileTab("line")
    }
  }

  function resetDemo() {
    const fallback = fallbackApiCases.map(mapApiCaseToUi)
    setCases(fallback)
    setSelected(fallback[0].id)
    setShowDetail(false)
    setShowQuote(false)
    setApiMode("展示模式")
    setApiResponse({ ok: true, source: "frontend_reset", cases: fallbackApiCases })
    setApiError("已重置為初始資料。")
    setLastLineMessage(lineMessageByStatus["待估價"])
    setActionNotice("已重置。")
    setMobileTab("cases")
  }

  return (
    <Shell title="BuildFlow 案件管理" desc="需求、照片、報價、進度與 LINE 回報進後台。">
      <section className="mb-5 rounded-2xl border border-[#d8d2c5] bg-[#faf7ef] p-5">
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Applied Case</p>
            <h3 className="mt-2 text-2xl font-black text-[#111c22]">實際案例：鑫匠工程</h3>
            <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">
              鑫匠工程是案例，BuildFlow 是系統。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["估價入口", "案件進後台", "報價單 Preview", "LINE 回報紀錄"].map((item) => (
                <span key={item} className="rounded-full border border-[#d8d2c5] bg-white px-3 py-1 text-xs font-black text-[#40504c]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/works/xinjiang" className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
                查看鑫匠案例
              </Link>
              <button type="button" onClick={simulateXinjiangCase} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                在 BuildFlow 中模擬此案例
              </button>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-xl border border-[#e3ded3] bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-[#111c22]">鑫匠工程網站 mockup</p>
                <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">Quote Entry</span>
              </div>
              <div className="mt-4 grid gap-2">
                {["屋頂防水", "地坪修繕", "我要估價"].map((item) => (
                  <div key={item} className="rounded-lg bg-[#faf7ef] px-3 py-2 text-xs font-black text-[#40504c]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-[#111c22] p-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">BuildFlow 後台</p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">待估價</span>
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  ["客戶", "陳先生"],
                  ["工程", "屋頂防水"],
                  ["預估", "NT$28,000"],
                  ["來源", "鑫匠工程網站表單"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold">
                    <span className="text-[#8fd6cc]">{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-2 md:grid-cols-7">
          {[
            ["鑫匠工程網站", "客戶看服務與案例"],
            ["我要估價", "送出屋頂防水需求"],
            ["/api/buildflow-cases", "建立案件資料"],
            ["BuildFlow 案件列表", "進入待估價"],
            ["報價單 Preview", "整理工項與金額"],
            ["LINE 回報", "同步狀態文案"],
            ["完工紀錄", "後續可追蹤"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-xl border border-[#e3ded3] bg-white p-3">
              <p className="text-xs font-black text-[#0d6b62]">{title}</p>
              <p className="mt-2 text-[11px] font-bold leading-5 text-[#52605c]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#d8d2c5] bg-white p-4">
        <span className={`rounded-full px-3 py-1 text-xs font-black ${apiMode === "Connected" ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#fff7ed] text-[#b45309]"}`}>
          API 狀態：{apiMode}
        </span>
        <span className="rounded-full bg-[#faf7ef] px-3 py-1 text-xs font-black text-[#52605c]">案件資料流程</span>
        <span className="hidden rounded-full bg-[#faf7ef] px-3 py-1 text-xs font-black text-[#52605c] md:inline-flex">最近 LINE：{lastLineMessage}</span>
        <span key={actionNotice} className="line-clamp-2 w-full rounded-lg bg-[#eef7f4] px-3 py-2 text-xs font-black text-[#0d6b62] interaction-pop">最新操作：{actionNotice}</span>
        {apiError ? <p className="w-full text-xs font-black text-[#b45309]">{apiError}</p> : null}
      </div>
      <div className="mb-4 hidden gap-3 xl:grid xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <MiniCard key={label} title={label}>
            <p key={value} className="text-3xl font-black text-[#111c22] score-pulse">{value}</p>
          </MiniCard>
        ))}
      </div>
      <div className="xl:hidden">
        <div className="sticky top-[64px] z-20 -mx-4 border-y border-[#e6e0d5] bg-[#faf8f3]/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0d6b62]">BuildFlow</p>
              <p className="text-sm font-black text-[#111c22]">{current.id}｜{current.status}</p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${apiMode === "Connected" ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#fff7ed] text-[#b45309]"}`}>
              {apiMode}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[
              ["cases", "案件"],
              ["detail", "詳情"],
              ["quote", "報價"],
              ["line", "LINE"],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMobileTab(key)}
                className={`min-h-10 rounded-full text-xs font-black transition ${mobileTab === key ? "bg-[#111c22] text-white" : "border border-[#d8d2c5] bg-white text-[#40504c]"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 max-h-[calc(100svh-188px)] overflow-y-auto pr-1">
          {mobileTab === "cases" ? (
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={loadCases} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-3 text-sm font-black text-[#111c22]">
                  重新載入
                </button>
                <button type="button" onClick={addDemoCase} className="min-h-11 rounded-md bg-[#111c22] px-3 text-sm font-black text-white">
                  新增案件
                </button>
              </div>
              <div className="hidden grid-cols-2 gap-2">
                {metrics.map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[#e3ded3] bg-white p-3">
                    <p className="text-xs font-black text-[#0d6b62]">{label}</p>
                    <p className="mt-1 text-2xl font-black text-[#111c22]">{value}</p>
                  </div>
                ))}
              </div>
              {cases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelected(item.id)
                    setMobileTab("detail")
                  }}
                  className={`rounded-xl border p-4 text-left transition ${selected === item.id ? "border-[#0d6b62] bg-[#eef7f4] shadow-sm interaction-pop" : "border-[#e3ded3] bg-white hover:border-[#0d6b62]"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black">{item.id}｜{item.name}</p>
                      <p className="mt-1 truncate text-xs font-bold text-[#52605c]">{item.customer}・{item.type}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">{item.status}</span>
                  </div>
                  <div className="mt-3"><Progress value={item.progress} /></div>
                </button>
              ))}
            </div>
          ) : null}

          {mobileTab === "detail" ? (
            <MiniCard title="案件詳情 / Dashboard UI" tone="dark">
              <div className="grid gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black">{current.id}</h3>
                  <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">{current.status}</span>
                </div>
                <div className="grid gap-2 text-sm font-black text-white/75">
                  <p>客戶：{current.customer}</p>
                  <p>工程：{current.type}</p>
                  <p>預估：{current.budget}</p>
                  <p>來源：{current.source}</p>
                </div>
                <Progress value={current.progress} />
                <div className="grid grid-cols-3 gap-2">
                  {current.photos.map((item) => (
                    <div key={item} className="aspect-square rounded-lg bg-white/10 p-2 text-[11px] font-black text-white/70">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={updateConstructionStatus} className="min-h-11 rounded-md bg-white px-3 text-sm font-black text-[#111c22]">
                    更新狀態
                  </button>
                  <button type="button" onClick={() => { setShowDetail(true); setActionNotice("已開啟照片與報價詳情。") }} className="min-h-11 rounded-md border border-white/20 px-3 text-sm font-black text-white">
                    查看詳情
                  </button>
                </div>
              </div>
            </MiniCard>
          ) : null}

          {mobileTab === "quote" ? (
            <MiniCard title="報價 Preview">
              <div className="grid gap-3">
                <div className="rounded-xl border border-[#e3ded3] bg-white p-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Quotation</p>
                  <p className="mt-2 text-3xl font-black text-[#111c22]">{current.budget}</p>
                  <p className="mt-1 text-xs font-bold text-[#52605c]">{current.quoteStatus}</p>
                </div>
                {quoteItems(current).slice(0, 3).map((item) => (
                  <div key={item.name} className="flex justify-between gap-3 rounded-lg bg-[#faf7ef] px-3 py-2 text-xs font-bold text-[#52605c]">
                    <span>{item.name}</span>
                    <span>NT${item.subtotal.toLocaleString("zh-TW")}</span>
                  </div>
                ))}
                <button type="button" onClick={() => { setShowQuote(true); setActionNotice("報價單 Preview 已開啟。") }} className="min-h-11 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                  產生報價單
                </button>
              </div>
            </MiniCard>
          ) : null}

          {mobileTab === "line" ? (
            <MiniCard title="LINE 回報">
              <div className="grid gap-3">
                <div className="rounded-xl border border-[#d8d2c5] bg-[#faf7ef] p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">LINE Message</p>
                    {copied ? <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{copied}</span> : null}
                  </div>
                  <p className="text-sm font-bold leading-7 text-[#52605c]">{current.reports[0]?.replace("LINE：", "")}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={copyLineReport} className="min-h-11 rounded-md bg-[#111c22] px-3 text-sm font-black text-white">
                    複製回報
                  </button>
                  <button type="button" onClick={() => setShowResponse((currentValue) => !currentValue)} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-3 text-sm font-black text-[#111c22]">
                    API 回應
                  </button>
                </div>
                {showResponse ? (
                  <pre className="max-h-[42svh] overflow-auto rounded-xl bg-[#111c22] p-3 text-xs font-bold leading-6 text-white">
                    {JSON.stringify(apiResponse || { message: "尚未呼叫 BuildFlow API。" }, null, 2)}
                  </pre>
                ) : null}
              </div>
            </MiniCard>
          ) : null}
        </div>
      </div>

      <div className="hidden gap-4 xl:grid xl:grid-cols-[0.72fr_1.05fr_0.78fr]">
        <div className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={loadCases} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              重新載入案件
            </button>
            <button type="button" onClick={addDemoCase} className="min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              新增案件
            </button>
            <button type="button" onClick={updateConstructionStatus} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              更新施工狀態
            </button>
            <button type="button" onClick={() => { setShowDetail(true); setActionNotice("已開啟照片與報價詳情。") }} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看照片 / 報價
            </button>
            <button type="button" onClick={() => { setShowQuote(true); setActionNotice("報價單 Preview 已開啟。") }} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              產生報價單
            </button>
            <button type="button" onClick={copyLineReport} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              複製 LINE 回報
            </button>
            <button type="button" onClick={() => setShowResponse((currentValue) => !currentValue)} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 API Response
            </button>
            <button type="button" onClick={resetDemo} className="min-h-10 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              重置
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
                  className={`rounded-xl border p-4 text-left transition ${selected === item.id ? "border-[#0d6b62] bg-[#eef7f4] shadow-sm interaction-pop" : "border-[#e3ded3] bg-white hover:border-[#0d6b62]"}`}
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
                  <span className="rounded-full bg-[#111c22] px-3 py-1 text-xs font-black text-white">Preview</span>
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
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Qingyu Web Studio Preview</p>
                <h3 className="mt-2 text-3xl font-black">工程報價單 Preview</h3>
                <p className="mt-2 text-sm font-bold text-[#52605c]">狀態：Preview｜報價日期：2026-06-20</p>
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
                <p className="mt-2 text-sm font-bold leading-7 text-[#52605c]">報價單預覽。未來可接 PDF 與線上確認。</p>
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
  const [automationNotice, setAutomationNotice] = useState("填寫表單後，流程會依序進入 API、通知與後台。")
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
      status: "preview_mode",
      notification: "通知已模擬送出",
      message: "展示模式：已模擬通知流程",
      dashboardItem: {
        ...apiPayload,
        status: "新需求",
        source: "展示模式",
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
      source: item.source || "API Preview",
      createdAt: formatTime(item.createdAt),
      apiStatus: response.status || "received",
      notificationStatus: response.notification || "通知已模擬送出",
      apiMessage: response.message || "展示模式：已模擬通知流程",
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
      setApiError("API 暫時無法連線，已使用展示模式完成。")
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
    setAutomationNotice(`已建立 ${response.leadId || "demo lead"}，Dashboard 新增一筆需求。`)
    setFlowRunning(false)
  }

  async function resendFlow() {
    if (!validateForm()) return
    setFlowStep(-1)
    setFlowRunning(false)
    setAutomationNotice("正在用同一筆資料重送流程。")
    window.setTimeout(runFlow, 120)
  }

  async function replayFlow() {
    if (flowRunning) return
    setFlowStep(-1)
    setFlowRunning(true)
    await playFlowAnimation()
    setAutomationNotice("流程動畫已重播，未重新送出 API。")
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
    setAutomationNotice("已清空，可以重新填寫。")
  }

  function flowStatus(index) {
    if (flowStep > index) return "Done"
    if (flowStep === index) return flowRunning ? "Processing" : "Done"
    return "Waiting"
  }

  return (
    <Shell title="API 自動化流程" desc="表單、API、通知、後台串起來。">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <MiniCard title="客戶需求表單">
          <div className="mb-4 rounded-xl border border-[#d8d2c5] bg-[#faf7ef] p-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">Live API Flow</p>
            <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{automationNotice}</p>
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
                {["網站", "LINE Bot", "AI 工具", "後台流程"].map((item) => <option key={item}>{item}</option>)}
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
          <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <button type="button" onClick={runFlow} disabled={flowRunning} className="min-h-11 rounded-md bg-[#111c22] px-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60">
              {flowRunning ? "傳送中..." : "送出表單"}
            </button>
            <button type="button" onClick={() => setShowPayload((current) => !current)} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 API Payload
            </button>
            <button type="button" onClick={() => setShowResponse((current) => !current)} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] sm:inline-flex sm:items-center">
              查看 API Response
            </button>
            <button type="button" onClick={resendFlow} disabled={flowRunning} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] disabled:cursor-not-allowed disabled:opacity-60 sm:inline-flex sm:items-center">
              重送一次
            </button>
            <button type="button" onClick={replayFlow} disabled={flowRunning} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] disabled:cursor-not-allowed disabled:opacity-60 sm:inline-flex sm:items-center">
              重播流程
            </button>
            <button type="button" onClick={() => scrollToSection("tech")} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] sm:inline-flex sm:items-center">
              技術拆解
            </button>
            <button type="button" onClick={clearDemo} className="hidden min-h-11 rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22] sm:inline-flex sm:items-center">
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
                <MiniCard key={`${item}-${status}`} title={`0${index + 1}`}>
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
                  <p key={value} className="mt-2 break-words text-sm font-black text-[#111c22] score-pulse">{value}</p>
                </div>
              ))}
            </div>
            {apiError ? <p className="mt-3 text-xs font-black text-[#b45309]">{apiError}</p> : null}
          </MiniCard>
          <MiniCard title="Dashboard 更新結果" tone="dark">
            <div className="grid gap-3">
              {dashboardItems.length ? (
                dashboardItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => setDetailLead(item)} className="rounded-xl border border-white/10 bg-white/10 p-3 text-left transition hover:bg-white/15 interaction-pop">
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
                  <p>通知紀錄：LINE / Email optional 已模擬送出。</p>
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
    ["服務分類", "品牌網站、作品展示、後台流程、AI 工具、LINE Bot。"],
    ["成品展示區 / 精選作品", "把技術作品變成可點、可看的案例入口。"],
    ["需求診斷 CTA", "引導客戶用 Project Planner 整理需求。"],
    ["技術能力", "展示 React、Vercel、SEO、API 串接能力。"],
    ["聯絡轉換", "把訪客導到 contact 與需求討論。"],
    ["SEO / sitemap / robots", "讓搜尋引擎讀懂主站與作品頁。"],
  ]
  const rwdDevices = [
    {
      name: "Desktop",
      width: "lg:col-span-2",
      preview: ["Hero + CTA", "成品展示區", "技術能力 / 服務分類"],
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
    ["description", "網站、作品展示、AI 工具、LINE Bot、API 串接與後台流程。"],
    ["Open Graph", "社群分享標題、描述與預覽圖。"],
    ["sitemap.xml", "收錄首頁、作品頁、工具頁。"],
    ["robots.txt", "允許搜尋引擎索引公開頁面。"],
    ["canonical", "每頁指向正式網址。"],
    ["structured data", "提供網站服務與組織資訊。"],
  ]
  const techTags = ["React", "Vite", "Tailwind", "React Router", "Vercel", "SEO", "Open Graph", "sitemap", "robots"]

  return (
    <Shell title="Qingyu Web Studio 主站" desc="服務、作品、工具、SEO 與聯絡轉換。">
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
            {["Visitor", "Homepage", "成品展示區", "Project Planner", "Contact", "Case Study"].map((item, index) => (
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
    <Shell title="鑫匠工程案例" desc="工程網站 + BuildFlow 案件流程。">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <MiniCard title="專案背景">
            <p className="text-sm font-bold leading-7 text-[#52605c]">
              鑫匠是 BuildFlow 案例，不是主品牌。
            </p>
          </MiniCard>
          <MiniCard title="估價入口">
            <div className="grid gap-2">
              {["服務類型：屋頂防水 / 地坪 / 修繕", "現場狀況：照片與問題描述", "下一步：送進 BuildFlow 案件列表"].map((item) => (
                <div key={item} className="rounded-lg bg-white px-3 py-2 text-xs font-black text-[#40504c]">{item}</div>
              ))}
            </div>
          </MiniCard>
          <div className="flex flex-wrap gap-3">
            <Link to="/contractor-site" className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看鑫匠網站
            </Link>
            <Link to="/works/buildflow#demo" className="inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              查看 BuildFlow 系統
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-[#d8d2c5] bg-[#111c22] p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">Case Flow</p>
          <h3 className="mt-3 text-2xl font-black">如何串到 BuildFlow</h3>
          <div className="mt-5 grid gap-3">
            {[
              ["網站首頁展示", "服務、案例、聯絡 CTA 先建立信任"],
              ["估價入口", "客戶送出屋頂防水或地坪修繕需求"],
              ["BuildFlow 案件", "轉成案件列表、客戶資料、照片與報價狀態"],
              ["LINE 回報", "狀態更新時產生可回覆客戶的訊息"],
            ].map(([title, desc], index) => (
              <div key={title} className="rounded-xl bg-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black">{title}</p>
                  <span className="text-xs font-black text-[#8fd6cc]">0{index + 1}</span>
                </div>
                <p className="mt-2 text-xs font-bold leading-5 text-white/70">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-white p-4 text-[#111c22]">
            <p className="text-xs font-black text-[#0d6b62]">案件管理流程</p>
            <p className="mt-2 text-sm font-black">詢價 → 待估價 → 報價單 Preview → 施工狀態 → LINE 回報</p>
          </div>
        </div>
      </div>
    </Shell>
  )
}

const quizBanks = {
  basic: {
    label: "基礎題庫",
    questions: [
      {
        id: "q1",
        type: "單選",
        topic: "網站 CTA",
        question: "首頁第一屏最應該讓訪客先看懂什麼？",
        options: ["公司成立年份", "你能解決什麼問題", "完整技術清單", "所有服務細項"],
        answer: 1,
        explanation: "第一屏要先說清楚價值與下一步。細節可以放到下方或技術拆解。",
      },
      {
        id: "q2",
        type: "單選",
        topic: "手機版",
        question: "手機版互動頁最適合的呈現方式是？",
        options: ["全部資訊一次攤開", "一屏一重點", "字越大越好", "只保留桌機截圖"],
        answer: 1,
        explanation: "手機版應該像 App 操作，一次完成一件事，避免 Preview、Dashboard、Report 全部塞在同一屏。",
      },
      {
        id: "q3",
        type: "單選",
        topic: "LINE 接待",
        question: "LINE Bot 最適合先自動整理哪一類資訊？",
        options: ["客戶需求與聯絡方式", "網站背景色", "開發者版本號", "所有私密資料"],
        answer: 0,
        explanation: "LINE Bot 的價值是協助收需求、分類、同步到後台，再讓人工接手重要對話。",
      },
      {
        id: "q4",
        type: "單選",
        topic: "SEO",
        question: "搜尋摘要最需要避免哪一種寫法？",
        options: ["清楚說明服務", "包含主要關鍵字", "空泛又看不出業務", "描述聯絡方式"],
        answer: 2,
        explanation: "摘要要讓搜尋者快速知道你提供什麼、適合誰，而不是泛泛地說專業服務。",
      },
    ],
  },
  advanced: {
    label: "進階題庫",
    questions: [
      {
        id: "a1",
        type: "單選",
        topic: "後台流程",
        question: "客戶需求進來後，最重要的第一步是什麼？",
        options: ["直接開工再說", "建立案件並記錄需求", "等客戶自己再問", "先報一個最高價"],
        answer: 1,
        explanation: "先把需求變成可追蹤的案件，後續報價、派工與驗收才有依據。",
      },
      {
        id: "a2",
        type: "單選",
        topic: "AI 導入",
        question: "導入 AI 問答系統前，最應該先準備什麼？",
        options: ["買最貴的模型", "整理好內部文件與 FAQ", "先做一支 App", "加入大量動畫"],
        answer: 1,
        explanation: "RAG 系統的回答品質取決於知識庫內容，文件整理是第一步。",
      },
      {
        id: "a3",
        type: "單選",
        topic: "表單設計",
        question: "詢價表單的欄位設計原則是？",
        options: ["欄位越多越完整", "只收能幫助報價的必要欄位", "全部設成選填", "不需要手機版"],
        answer: 1,
        explanation: "欄位太多會流失客戶，先收產業、需求、預算、時程等關鍵欄位即可。",
      },
      {
        id: "a4",
        type: "單選",
        topic: "上線檢查",
        question: "網站上線前最應該確認哪一項？",
        options: ["動畫夠不夠炫", "手機版與聯絡入口正常", "顏色種類夠多", "字型超過五種"],
        answer: 1,
        explanation: "多數訪客用手機開啟，手機版正常、聯絡得到你，才是上線的底線。",
      },
    ],
  },
}

function InteractiveQuizDemo() {
  const [bankId, setBankId] = useState("basic")
  const [questions, setQuestions] = useState(quizBanks.basic.questions)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [activePanel, setActivePanel] = useState("quiz")
  const question = questions[index]
  const currentAnswer = answers.find((item) => item.id === question.id)
  const locked = selected !== null || Boolean(currentAnswer)
  const chosen = selected ?? currentAnswer?.selected
  const correctCount = answers.filter((item) => item.correct).length
  const progress = finished ? 100 : Math.round((index / questions.length) * 100)
  const score = Math.round((correctCount / questions.length) * 100)
  const wrongQuestions = questions.filter((item) => answers.find((entry) => entry.id === item.id && !entry.correct))

  function chooseOption(optionIndex) {
    if (locked) return
    const correct = optionIndex === question.answer
    setSelected(optionIndex)
    setAnswers((current) => [
      ...current.filter((item) => item.id !== question.id),
      { id: question.id, selected: optionIndex, correct, topic: question.topic },
    ])
    setActivePanel("quiz")
  }

  function goNext() {
    if (!locked) return
    if (index >= questions.length - 1) {
      setFinished(true)
      setActivePanel("result")
      return
    }
    setIndex((value) => value + 1)
    setSelected(null)
    setActivePanel("quiz")
  }

  function jumpTo(targetIndex) {
    if (finished) return
    setIndex(targetIndex)
    setSelected(null)
    setActivePanel("quiz")
  }

  function startQuiz(nextQuestions) {
    setQuestions(nextQuestions)
    setIndex(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
    setActivePanel("quiz")
  }

  function resetQuiz() {
    startQuiz(quizBanks[bankId].questions)
  }

  function retryWrong() {
    if (wrongQuestions.length === 0) return
    startQuiz(wrongQuestions)
  }

  function switchBank(nextBankId) {
    setBankId(nextBankId)
    startQuiz(quizBanks[nextBankId].questions)
    setActivePanel("bank")
  }

  return (
    <Shell title="互動測驗頁" desc="題目、作答、解析與結果頁一次展示。">
      <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-2xl border border-[#e3ded3] bg-[#111c22] p-4 text-white shadow-xl shadow-[#111c22]/12 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Quiz Preview</p>
              <h3 className="mt-2 text-2xl font-black md:text-3xl">{finished ? "結果頁" : `第 ${index + 1} 題`}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/76">{quizBanks[bankId].label}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">{finished ? "完成" : question.type}</span>
            </div>
          </div>

          <div className="mt-5 rounded-[1.4rem] bg-[#f9f5ec] p-4 text-[#111c22] md:p-5">
            {finished ? (
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Result</p>
                <div className="mt-4 flex items-end gap-3">
                  <p className="font-serif text-6xl font-black leading-none">{score}</p>
                  <p className="pb-2 text-sm font-black text-[#52605c]">/ 100</p>
                </div>
                <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
                  {score >= 75 ? "觀念清楚，適合進入進階題或留下名單。" : "可以用解析補強，再引導到服務介紹。"}
                </p>
                <div className="mt-5 grid gap-2">
                  {answers.map((item, itemIndex) => (
                    <div key={item.id} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-black">
                      <span>
                        Q{itemIndex + 1} · {item.topic}
                      </span>
                      <span className={item.correct ? "text-[#0d6b62]" : "text-[#c85d2c]"}>{item.correct ? "答對" : "需複習"}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {wrongQuestions.length > 0 ? (
                    <button type="button" onClick={retryWrong} className="min-h-10 rounded-xl bg-[#c85d2c] px-4 text-sm font-black text-white">
                      重測答錯的 {wrongQuestions.length} 題
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => switchBank(bankId === "basic" ? "advanced" : "basic")}
                      className="min-h-10 rounded-xl bg-[#0d6b62] px-4 text-sm font-black text-white"
                    >
                      挑戰{bankId === "basic" ? "進階" : "基礎"}題庫
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{question.topic}</span>
                  <span className="text-xs font-black text-[#52605c]">
                    {index + 1} / {questions.length}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-black leading-snug">{question.question}</h3>
                <div className="mt-5 grid gap-3">
                  {question.options.map((option, optionIndex) => {
                    const isChosen = chosen === optionIndex
                    const isAnswer = question.answer === optionIndex
                    const revealed = locked
                    const tone = revealed && isAnswer ? "border-[#0d6b62] bg-[#eef7f4]" : revealed && isChosen ? "border-[#d46b3a] bg-[#fff1e8]" : isChosen ? "border-[#111c22] bg-white" : "border-[#e3ded3] bg-white hover:border-[#0d6b62]"
                    return (
                      <button key={option} type="button" onClick={() => chooseOption(optionIndex)} className={`min-h-12 rounded-xl border px-4 py-3 text-left text-sm font-black transition ${tone}`}>
                        {option}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <div className="flex items-center gap-1.5">
              {questions.map((item, dotIndex) => {
                const entry = answers.find((answerItem) => answerItem.id === item.id)
                const tone = entry ? (entry.correct ? "bg-[#8fd6cc]" : "bg-[#e29a6d]") : dotIndex === index && !finished ? "bg-white" : "bg-white/25"
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpTo(dotIndex)}
                    aria-label={`第 ${dotIndex + 1} 題`}
                    className={`h-2.5 w-2.5 rounded-full transition ${tone} ${finished ? "cursor-default" : "hover:scale-125"}`}
                  />
                )
              })}
            </div>
            <Progress value={progress} />
            <div className="flex gap-2">
              <button type="button" onClick={resetQuiz} className="min-h-11 rounded-xl border border-white/15 px-4 text-sm font-black text-white/86">
                重新測驗
              </button>
              <button type="button" onClick={goNext} disabled={!locked && !finished} className="min-h-11 rounded-xl bg-[#8fd6cc] px-4 text-sm font-black text-[#0b2724] disabled:opacity-45">
                {finished ? "已完成" : index === questions.length - 1 ? "看結果" : "下一題"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex gap-2 overflow-x-auto rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-2">
            {[
              ["quiz", "解析"],
              ["result", "結果"],
              ["bank", "題庫"],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => setActivePanel(id)} className={`min-h-10 shrink-0 rounded-xl px-4 text-sm font-black ${activePanel === id ? "bg-[#111c22] text-white" : "bg-white text-[#111c22]"}`}>
                {label}
              </button>
            ))}
          </div>

          {activePanel === "quiz" ? (
            <MiniCard title="答案解析">
              {locked ? (
                <div className="grid gap-3">
                  <div className={`rounded-xl px-4 py-3 text-sm font-black ${chosen === question.answer ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#fff1e8] text-[#b44d24]"}`}>
                    {chosen === question.answer ? "答對，解析已展開。" : `正確答案：${question.options[question.answer]}`}
                  </div>
                  <p className="text-sm font-bold leading-7 text-[#52605c]">{question.explanation}</p>
                </div>
              ) : (
                <p className="text-sm font-bold leading-7 text-[#52605c]">選擇答案後，這裡會顯示解析與下一步。</p>
              )}
            </MiniCard>
          ) : null}

          {activePanel === "result" ? (
            <MiniCard title="結果頁設定">
              <div className="grid gap-3">
                {[
                  ["結果分級", "依分數顯示不同文案。"],
                  ["CTA", "導向報名、聯絡或下載。"],
                  ["分享頁", "可做品牌活動分享圖。"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-xl bg-white px-4 py-3">
                    <p className="text-sm font-black text-[#111c22]">{title}</p>
                    <p className="mt-1 text-xs font-bold text-[#52605c]">{text}</p>
                  </div>
                ))}
              </div>
            </MiniCard>
          ) : null}

          {activePanel === "bank" ? (
            <MiniCard title="題庫管理">
              <div className="grid gap-3">
                <div className="flex gap-2">
                  {Object.entries(quizBanks).map(([id, bank]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => switchBank(id)}
                      className={`min-h-10 flex-1 rounded-xl text-sm font-black ${bankId === id ? "bg-[#0d6b62] text-white" : "border border-[#d7dfdb] bg-white text-[#111c22]"}`}
                    >
                      {bank.label}
                    </button>
                  ))}
                </div>
                {quizBanks[bankId].questions.map((item, itemIndex) => (
                  <div key={item.id} className="rounded-xl bg-white px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-[#111c22]">
                        Q{itemIndex + 1} · {item.topic}
                      </p>
                      <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">已上架</span>
                    </div>
                    <p className="mt-2 truncate text-xs font-bold text-[#52605c]">{item.question}</p>
                  </div>
                ))}
                <p className="text-xs font-bold leading-5 text-[#52605c]">
                  切換題庫會直接換一組題目重新開始，實際交付可接 JSON 或 Google Sheet 維護。
                </p>
              </div>
            </MiniCard>
          ) : null}

          <MiniCard title="可交付內容" tone="dark">
            <div className="grid gap-2 sm:grid-cols-2">
              {["題目流程", "答案解析", "結果頁", "題庫格式"].map((item) => (
                <div key={item} className="rounded-lg bg-white/10 px-3 py-2 text-sm font-black text-white/82">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/contact" className="inline-flex min-h-10 items-center rounded-md bg-white px-4 text-sm font-black text-[#111c22]">
                我想做類似的
              </Link>
              <Link to="/tools/project-planner#demo" className="inline-flex min-h-10 items-center rounded-md border border-white/15 px-4 text-sm font-black text-white">
                開始需求診斷
              </Link>
            </div>
          </MiniCard>
        </div>
      </div>
    </Shell>
  )
}

function WorkDemoPanel({ project }) {
  const panel = useMemo(() => {
    if (project.slug === "ai-audit") return <AiAuditDemo />
    if (project.slug === "linebot") return <LineBotDemo />
    if (project.slug === "buildflow") return <BuildFlowDemo />
    if (project.slug === "interactive-quiz") return <InteractiveQuizDemo />
    if (project.slug === "api-automation") return <ApiAutomationDemo />
    if (project.slug === "qingyu-web") return <QingyuWebDemo />
    if (project.slug === "xinjiang") return <XinjiangDemo />
    return null
  }, [project.slug])

  return panel
}

export default WorkDemoPanel
