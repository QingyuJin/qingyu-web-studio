import { useMemo, useState } from "react"

function Shell({ title, desc, children }) {
  return (
    <div className="rounded-2xl border border-[#ded8cb] bg-white p-4 shadow-sm md:p-6">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Product Demo</p>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
        </div>
        <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">{desc}</p>
      </div>
      {children}
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

function AiAuditDemo() {
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
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <MiniCard title="Input｜網址 / 需求輸入">
          <textarea
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="min-h-32 w-full resize-none rounded-lg border border-[#d8d2c5] bg-white p-3 text-sm font-bold leading-7 outline-none focus:border-[#0d6b62]"
          />
          <button type="button" onClick={runAudit} disabled={loading} className="mt-3 min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white disabled:opacity-60">
            {loading ? "分析中..." : "開始 AI 健檢"}
          </button>
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

function LineBotDemo() {
  const [step, setStep] = useState(1)
  const messages = [
    ["customer", "你好，我想預約店內諮詢"],
    ["bot", "可以，請問方便留下姓名、服務類型與希望時間嗎？"],
    ["customer", "王小姐，想做形象網站，週三下午可以"],
    ["bot", "已建立詢價紀錄，店家會收到通知。"],
  ]
  const visibleMessages = messages.slice(0, step + 1)

  return (
    <Shell title="LINE Bot 詢價 / 預約系統" desc="展示 User → LINE → /api/line-webhook → OpenAI → LINE Reply，實際 token 只放後端環境變數。">
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <MiniCard title="LINE 對話 mockup">
          <div className="rounded-2xl bg-[#e9f4ee] p-4">
            <div className="space-y-3">
              {visibleMessages.map(([role, text], index) => (
                <div key={`${role}-${text}`} className={`flex ${role === "customer" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm font-bold leading-6 ${role === "customer" ? "bg-[#0d6b62] text-white" : "bg-white text-[#111c22]"}`}>
                    {text}
                  </div>
                  {index === visibleMessages.length - 1 ? null : null}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3].map((item) => (
              <button key={item} type="button" onClick={() => setStep(item)} className="min-h-9 rounded-md border border-[#d8d2c5] px-3 text-xs font-black text-[#111c22]">
                Step {item}
              </button>
            ))}
          </div>
        </MiniCard>
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-4">
            {["LINE", "/api/line-webhook", "OpenAI", "LINE Reply"].map((item, index) => (
              <MiniCard key={item} title={item}>
                <p className="text-xs font-black text-[#52605c]">{index < step + 1 ? "已同步" : "待處理"}</p>
              </MiniCard>
            ))}
          </div>
          <MiniCard title="後台收到案件" tone="dark">
            <div className="grid gap-3 sm:grid-cols-3">
              {["王小姐", "形象網站", "週三下午"].map((item) => (
                <div key={item} className="rounded-lg bg-white/10 p-3 text-sm font-black">
                  {item}
                </div>
              ))}
            </div>
          </MiniCard>
          <MiniCard title="技術標籤">
            <div className="flex flex-wrap gap-2">
              {["LINE Messaging API", "Webhook", "OpenAI API", "Vercel Function", "Dashboard UI"].map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">
                  {tag}
                </span>
              ))}
            </div>
          </MiniCard>
        </div>
      </div>
    </Shell>
  )
}

function BuildFlowDemo() {
  const [selected, setSelected] = useState("q-001")
  const cases = [
    { id: "q-001", name: "屋頂防水工程", customer: "LINE 業主", status: "施工回報中", progress: 75 },
    { id: "b-014", name: "店面地坪工程", customer: "張先生", status: "估價中", progress: 45 },
    { id: "c-022", name: "浴室漏水修繕", customer: "王小姐", status: "待驗收", progress: 90 },
  ]
  const current = cases.find((item) => item.id === selected) || cases[0]

  return (
    <Shell title="BuildFlow 工程行案件管理系統" desc="用前端 Dashboard 展示案件、報價、照片、施工狀態與 LINE 回報如何被整理。">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3">
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
              <h3 className="text-2xl font-black">{current.id} {current.name}</h3>
              <p className="mt-2 text-sm font-bold text-white/65">客戶：{current.customer}</p>
              <p className="mt-1 text-sm font-bold text-white/65">工程類型：防水 / 修繕</p>
              <div className="mt-4"><Progress value={current.progress} /></div>
            </div>
            <div className="grid gap-2 text-sm font-black">
              {["照片區：施工前 3 張", "報價狀態：已確認", "LINE 回報：今日 2 人出工", "下一步：驗收 / 請款"].map((item) => (
                <div key={item} className="rounded-lg bg-white/10 p-3">{item}</div>
              ))}
            </div>
          </div>
        </MiniCard>
      </div>
    </Shell>
  )
}

function ApiAutomationDemo() {
  const [submitted, setSubmitted] = useState(false)
  const flow = submitted ? ["表單已送出", "API 已接收", "資料已入庫", "後台已更新", "通知已送出"] : ["表單待送出", "API 待接收", "資料待入庫", "後台待更新", "通知待送出"]

  return (
    <Shell title="API 串接 / 自動化流程" desc="用流程圖與 UI mockup 展示從表單到 API、資料庫、後台與通知的完整自動化。">
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <MiniCard title="表單送出">
          <div className="grid gap-3">
            {["姓名：陳小姐", "需求：預約諮詢", "通知：LINE + Email"].map((item) => (
              <div key={item} className="rounded-lg border border-[#e3ded3] bg-white p-3 text-sm font-bold text-[#52605c]">{item}</div>
            ))}
          </div>
          <button type="button" onClick={() => setSubmitted(true)} className="mt-3 min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
            送出測試需求
          </button>
        </MiniCard>
        <div className="grid gap-3 md:grid-cols-5">
          {flow.map((item, index) => (
            <MiniCard key={item} title={`0${index + 1}`}>
              <p className="text-sm font-black leading-6">{item}</p>
              <p className="mt-2 text-xs font-bold text-[#52605c]">{submitted ? "synced" : "waiting"}</p>
            </MiniCard>
          ))}
        </div>
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
