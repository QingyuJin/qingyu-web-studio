import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { seo } from "./content"

const initialMetrics = {
  automation: 35,
  satisfaction: 60,
  cases: 0,
  savedMinutes: 0,
  risk: 45,
}

const strategyLabels = {
  auto: "自動回覆",
  ask: "追問需求",
  case: "建立後台案件",
  human: "轉人工處理",
}

const scenarios = [
  {
    id: "price",
    customer: "請問做一個網站大概多少？",
    category: "網站詢價",
    best: "ask",
    replies: {
      auto: "可以，網站會依頁面數、內容與功能估價，我可以先給你方向。",
      ask: "可以，我先了解產業、頁面數、是否需要表單或 LINE 連結，再幫你判斷方案。",
      case: "我先把你記成網站詢價需求，後台會整理預算、功能與上線時間。",
      human: "我會轉給本人回覆，你也可以先留下產業與預算區間。",
    },
  },
  {
    id: "booking",
    customer: "我想預約明天下午討論可以嗎？",
    category: "預約諮詢",
    best: "case",
    replies: {
      auto: "可以，請先留下方便的時間與聯絡方式。",
      ask: "可以，請提供明天下午大約幾點、想討論的項目與聯絡方式。",
      case: "已整理成預約諮詢，後台會標記時間與需求，方便後續追蹤。",
      human: "我會轉人工確認時間，避免預約時間衝突。",
    },
  },
  {
    id: "estimate",
    customer: "我有一個工程案想先估價。",
    category: "工程估價",
    best: "case",
    replies: {
      auto: "可以，工程估價通常需要照片、位置與問題描述。",
      ask: "可以，請先提供工程類型、現場照片、地點與希望處理時間。",
      case: "已建立工程估價案件，後台會同步照片、描述與報價狀態。",
      human: "我會轉人工協助初步判斷，也可以先傳現場照片。",
    },
  },
  {
    id: "works",
    customer: "你們有案例可以看嗎？",
    category: "作品查詢",
    best: "auto",
    replies: {
      auto: "有，可以先看 AI Audit、LINE Bot、BuildFlow 與 API Automation 這幾個互動 Demo。",
      ask: "有，你比較想看網站、LINE Bot、AI 工具還是後台系統案例？",
      case: "已記錄為作品查詢，後台會標記你偏好的案例類型。",
      human: "我可以人工推薦適合你的案例。",
    },
  },
  {
    id: "unclear",
    customer: "我也不知道自己要做網站還是系統。",
    category: "需求診斷",
    best: "ask",
    replies: {
      auto: "沒問題，可以先從網站需求診斷開始。",
      ask: "沒關係，我先問幾個問題：你的產業、想解決的流程、預算與希望上線時間？",
      case: "已建立需求診斷案件，後台會整理成網站、LINE Bot 或小系統方向。",
      human: "我可以人工協助你拆需求，再判斷適合的方案。",
    },
  },
]

const effects = {
  auto: { automation: 9, satisfaction: 5, savedMinutes: 5, risk: -5, cases: 0, badge: "已回覆" },
  ask: { automation: 12, satisfaction: 8, savedMinutes: 7, risk: -8, cases: 1, badge: "已整理" },
  case: { automation: 15, satisfaction: 7, savedMinutes: 8, risk: -10, cases: 1, badge: "已建立案件" },
  human: { automation: -2, satisfaction: 4, savedMinutes: 2, risk: -4, cases: 1, badge: "需人工" },
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function scrollToSection(id) {
  if (typeof document === "undefined") return
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function getMood(metrics) {
  const score = Math.round(metrics.automation * 0.38 + metrics.satisfaction * 0.38 + (100 - metrics.risk) * 0.24)
  if (score <= 50) return { score, mark: "(><)", label: "仍依賴人工回覆" }
  if (score <= 75) return { score, mark: "(._.)", label: "具備自動化雛形" }
  if (score <= 90) return { score, mark: "○v○", label: "高效率接待流程" }
  return { score, mark: "○✨", label: "接近完整 LINE Bot 系統" }
}

function LineBotMission() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [metrics, setMetrics] = useState(initialMetrics)
  const [messages, setMessages] = useState([{ role: "customer", text: scenarios[0].customer, tag: "新訊息" }])
  const [cases, setCases] = useState([])
  const [status, setStatus] = useState("選擇一種 Bot 處理方式，觀察 LINE 對話與後台如何同步。")
  const [history, setHistory] = useState([])
  const [mobileTab, setMobileTab] = useState("chat")
  const [lastStrategy, setLastStrategy] = useState("")

  const currentScenario = scenarios[scenarioIndex]
  const completed = scenarioIndex >= scenarios.length
  const mood = getMood(metrics)
  const progress = Math.round((Math.min(scenarioIndex, scenarios.length) / scenarios.length) * 100)

  const suggestedFeatures = useMemo(() => {
    const items = ["LINE Webhook", "需求分類", "自動回覆", "後台案件同步"]
    if (metrics.risk > 20) items.push("人工接手")
    if (metrics.automation >= 70) items.push("AI 回覆輔助")
    items.push("Email / 表單通知")
    return items
  }, [metrics])

  function handleStrategy(key) {
    if (completed || !currentScenario) return
    const effect = effects[key]
    const reply = currentScenario.replies[key]
    const nextMetrics = {
      automation: clamp(metrics.automation + effect.automation, 0, 100),
      satisfaction: clamp(metrics.satisfaction + effect.satisfaction, 0, 100),
      cases: metrics.cases + effect.cases,
      savedMinutes: metrics.savedMinutes + effect.savedMinutes,
      risk: clamp(metrics.risk + effect.risk, 0, 100),
    }
    const shouldCreateCase = key !== "auto" || currentScenario.best === "case"
    const nextCase = {
      id: `LINE-${String(cases.length + 1).padStart(3, "0")}`,
      title: currentScenario.category,
      status: effect.badge,
      source: "LINE Bot",
      summary: currentScenario.customer,
      suggestion: key === "human" ? "人工確認細節" : "整理需求並安排下一步",
    }

    setMetrics(nextMetrics)
    setMessages((current) => [
      ...current,
      { role: "bot", text: reply, tag: effect.badge },
      { role: "system", text: `${currentScenario.category}｜${effect.badge}` },
    ])
    if (shouldCreateCase) setCases((current) => [nextCase, ...current])
    setHistory((current) => [
      ...current,
      `${currentScenario.category} → ${strategyLabels[key]} → ${effect.badge}`,
    ])
    setStatus(key === currentScenario.best ? `處理順暢 ${getMood(nextMetrics).mark}` : `可用，但還能更精準 ${getMood(nextMetrics).mark}`)
    setLastStrategy(key)
    setMobileTab("chat")

    const nextIndex = scenarioIndex + 1
    setScenarioIndex(nextIndex)
    if (nextIndex < scenarios.length) {
      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          { role: "customer", text: scenarios[nextIndex].customer, tag: scenarios[nextIndex].category },
        ])
      }, 260)
    }
  }

  function resetDemo() {
    setScenarioIndex(0)
    setMetrics(initialMetrics)
    setMessages([{ role: "customer", text: scenarios[0].customer, tag: "新訊息" }])
    setCases([])
    setStatus("選擇一種 Bot 處理方式，觀察 LINE 對話與後台如何同步。")
    setHistory([])
    setMobileTab("chat")
    setLastStrategy("")
  }

  return (
    <SiteLayout>
      <Seo page={seo.lineBotMission} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Interactive Demo</p>
            <h1 className="mt-4 text-[clamp(1.75rem,8vw,2rem)] font-black leading-[1.08] tracking-tight md:text-[clamp(2.4rem,8vw,4.8rem)] md:leading-[1.04]">
              LINE Bot 接待模擬
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#52605c]">
              模擬 LINE 客戶訊息，看看 Bot 如何回覆、整理需求並同步到後台。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                開始模擬
              </button>
              <button type="button" onClick={() => scrollToSection("tech")} className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                技術拆解
              </button>
              <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md border border-[#0d6b62] bg-[#eef7f4] px-5 text-sm font-black text-[#0d6b62]">
                找我做類似系統
              </Link>
            </div>
          </div>
          <ReceptionHero metrics={metrics} mood={mood} />
        </div>
      </section>

      <section id="demo" className="mx-auto min-h-svh max-w-6xl scroll-mt-24 px-4 py-8 md:min-h-0 md:py-16">
        <div className="mb-5 rounded-2xl border border-[#e3ded3] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Reception Flow</p>
              <h2 className="mt-2 text-2xl font-black">{completed ? "接待流程完成" : currentScenario.category}</h2>
            </div>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">Step {Math.min(scenarioIndex + 1, scenarios.length)} / {scenarios.length}</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
            <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-300" style={{ width: `${completed ? 100 : progress}%` }} />
          </div>
        </div>

        <div className="lg:hidden">
          <div className="sticky top-[64px] z-20 -mx-4 border-y border-[#e6e0d5] bg-[#faf8f3]/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0d6b62]">Status</p>
                <p className="text-sm font-black text-[#111c22]">{status}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0d6b62]">
                {mood.score} {mood.mark}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                ["chat", "對話"],
                ["handle", "處理"],
                ["dashboard", "後台"],
                ["result", "結果"],
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
          <div className="mt-5">
            {mobileTab === "chat" ? (
              <div className="grid gap-3">
                <LinePhone messages={messages} />
                <div className="rounded-2xl border border-[#e3ded3] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-[#111c22]">{completed ? "接待已完成" : "選擇處理方式"}</p>
                    <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">
                      {completed ? "○✨" : "○v○"}
                    </span>
                  </div>
                  {completed ? (
                    <button type="button" onClick={() => setMobileTab("result")} className="mt-3 min-h-11 w-full rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
                      查看結果
                    </button>
                  ) : (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {Object.entries(strategyLabels).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          data-pressed={lastStrategy === key ? "true" : undefined}
                          aria-pressed={lastStrategy === key}
                          onClick={() => handleStrategy(key)}
                          className={`min-h-11 rounded-xl border px-3 text-xs font-black transition ${lastStrategy === key ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62] shadow-sm" : "border-[#d8d2c5] bg-white text-[#40504c]"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {mobileTab === "handle" ? <StrategyPanel scenario={currentScenario} completed={completed} status={status} lastStrategy={lastStrategy} onChoose={handleStrategy} onReset={resetDemo} /> : null}
            {mobileTab === "dashboard" || mobileTab === "result" ? (
              <DashboardPanel
                metrics={metrics}
                mood={mood}
                cases={cases}
                history={history}
                suggestedFeatures={suggestedFeatures}
                completed={completed}
                onReset={resetDemo}
              />
            ) : null}
          </div>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-[0.9fr_0.92fr_1fr]">
          <LinePhone messages={messages} />
          <StrategyPanel scenario={currentScenario} completed={completed} status={status} lastStrategy={lastStrategy} onChoose={handleStrategy} onReset={resetDemo} />
          <DashboardPanel
            metrics={metrics}
            mood={mood}
            cases={cases}
            history={history}
            suggestedFeatures={suggestedFeatures}
            completed={completed}
            onReset={resetDemo}
          />
        </div>
      </section>

      <TechSection />
    </SiteLayout>
  )
}

function ReceptionHero({ metrics, mood }) {
  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-2xl shadow-[#111c22]/15">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">LINE Reception</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">{mood.mark}</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[0.74fr_1fr]">
        <div className="rounded-2xl bg-[#dff1e8] p-4 text-[#111c22]">
          <Bubble role="customer" text="請問網站大概多少？" />
          <Bubble role="bot" text="我先幫你整理需求。" />
          <Bubble role="system" text="已分類：網站詢價" />
        </div>
        <div className="grid gap-2">
          <HeroMetric label="自動處理率" value={`${metrics.automation}%`} />
          <HeroMetric label="客戶滿意度" value={metrics.satisfaction} />
          <HeroMetric label="漏接風險" value={`${metrics.risk}%`} />
        </div>
      </div>
      <div className="mt-4 rounded-2xl bg-white p-4 text-[#111c22]">
        <p className="text-xs font-black text-[#0d6b62]">接待狀態</p>
        <p className="mt-2 text-xl font-black">{mood.label}</p>
        <div className="mt-3 h-2 rounded-full bg-[#e4e9e6]">
          <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-500" style={{ width: `${mood.score}%` }} />
        </div>
      </div>
    </div>
  )
}

function HeroMetric({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2">
      <div className="flex justify-between gap-3 text-sm font-black">
        <span>{label}</span>
        <span className="text-[#8fd6cc]">{value}</span>
      </div>
    </div>
  )
}

function LinePhone({ messages }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-4 md:p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">LINE Mockup</p>
      <div className="mt-4 rounded-[2rem] border border-[#d8e2dc] bg-[#dff1e8] p-4 shadow-xl shadow-[#111c22]/10">
        <div className="mb-4 flex items-center justify-between rounded-full bg-white px-4 py-2">
          <span className="text-sm font-black text-[#111c22]">Qingyu Bot</span>
          <span className="text-xs font-black text-[#0d6b62]">online</span>
        </div>
        <div className="max-h-[42svh] min-h-[250px] space-y-3 overflow-y-auto pr-1 sm:min-h-[420px] lg:max-h-[560px]">
          {messages.map((message, index) => (
            <div key={`${message.text}-${index}`}>
              <Bubble role={message.role} text={message.text} />
              {message.tag ? <p className={`mt-1 text-[11px] font-black ${message.role === "bot" ? "text-right text-[#0d6b62]" : "text-[#52605c]"}`}>{message.tag}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Bubble({ role, text }) {
  if (role === "system") {
    return <div className="mx-auto max-w-[86%] rounded-full bg-white/70 px-3 py-1 text-center text-[11px] font-black text-[#52605c] transition message-slide-in">{text}</div>
  }
  return (
    <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm font-bold leading-6 shadow-sm transition duration-300 message-slide-in ${role === "bot" ? "ml-auto bg-[#0d6b62] text-white" : "bg-white text-[#111c22]"}`}>
      {text}
    </div>
  )
}

function StrategyPanel({ scenario, completed, status, lastStrategy, onChoose, onReset }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Bot Handling</p>
          <h2 className="mt-2 text-2xl font-black">{completed ? "接待完成" : "選擇處理方式"}</h2>
        </div>
        <button type="button" onClick={onReset} className="rounded-md border border-[#cfd7d3] px-3 py-2 text-xs font-black text-[#111c22] hover:border-[#0d6b62]">
          重置
        </button>
      </div>
      {completed ? (
        <div className="mt-5 rounded-2xl bg-[#eef7f4] p-4">
          <p className="text-sm font-black text-[#0d6b62]">5 則訊息已處理 ○✨</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#40504c]">可以把這套接待流程改成你的店家、工作室或工程行 LINE Bot。</p>
        </div>
      ) : (
        <>
          <div className="mt-5 rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
            <p className="text-sm font-black text-[#0d6b62]">{scenario.category}</p>
            <p className="mt-2 text-lg font-black leading-7">{scenario.customer}</p>
          </div>
          <div className="mt-5 grid gap-3">
            {Object.entries(strategyLabels).map(([key, label]) => (
              <button key={key} type="button" data-pressed={lastStrategy === key ? "true" : undefined} aria-pressed={lastStrategy === key} onClick={() => onChoose(key)} className={`rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-md ${lastStrategy === key ? "border-[#0d6b62] bg-[#eef7f4] shadow-sm" : "border-[#e3ded3] bg-white"}`}>
                <span className="text-xs font-black text-[#0d6b62]">{key === scenario.best ? "建議" : lastStrategy === key ? "已選" : "選項"}</span>
                <span className="mt-1 block text-sm font-black text-[#111c22]">{label}</span>
                <span className="mt-2 block text-xs font-bold leading-5 text-[#52605c]">
                  {key === "auto" ? "快速回覆，適合簡單問題。" : key === "ask" ? "先收集產業、功能與預算。" : key === "case" ? "同步建立後台案件。" : "保留人味，交給人工確認。"}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      <p key={status} className="mt-5 rounded-2xl bg-[#faf8f3] px-4 py-3 text-sm font-black leading-6 text-[#40504c] interaction-pop">{status}</p>
    </div>
  )
}

function DashboardPanel({ metrics, mood, cases, history, suggestedFeatures, completed, onReset }) {
  return (
    <aside className="rounded-2xl border border-[#233139] bg-[#111c22] p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">Dashboard</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Metric label="自動處理率" value={`${metrics.automation}%`} />
        <Metric label="客戶滿意度" value={metrics.satisfaction} />
        <Metric label="後台案件" value={cases.length} />
        <Metric label="節省時間" value={`${metrics.savedMinutes} 分`} />
        <Metric label="漏接風險" value={`${metrics.risk}%`} wide />
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4 text-[#111c22]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black text-[#0d6b62]">接待狀態</p>
            <p className="mt-2 text-xl font-black">{mood.label}</p>
          </div>
          <p className="text-4xl font-black">{mood.score}</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-black text-[#8fd6cc]">最新同步</p>
        <p className="mt-2 text-sm font-bold leading-6 text-white/78">
          {cases[0] ? `${cases[0].title} 已同步到後台，狀態：${cases[0].status}` : "選擇處理方式後，這裡會顯示同步結果。"}
        </p>
      </div>

      <div className="mt-5 rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-black text-[#8fd6cc]">案件列表</p>
        <div className="mt-3 grid gap-2">
          {cases.length ? cases.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-xl bg-white px-3 py-3 text-[#111c22] interaction-pop">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{item.title}</p>
                <span className="rounded-full bg-[#eef7f4] px-2 py-1 text-[11px] font-black text-[#0d6b62]">{item.status}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-[#52605c]">來源：{item.source}｜{item.suggestion}</p>
            </div>
          )) : (
            <p className="rounded-xl bg-white/10 px-3 py-3 text-sm font-bold text-white/75">選擇處理方式後，案件會同步到這裡。</p>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-black text-[#8fd6cc]">處理紀錄</p>
        <div className="mt-3 grid gap-2">
          {history.length ? history.slice(-3).map((item) => (
            <span key={item} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold leading-5 text-white/80 interaction-pop">
              {item}
            </span>
          )) : <span className="text-sm font-bold text-white/70">尚未處理客戶訊息。</span>}
        </div>
      </div>

      {completed ? (
        <div className="mt-5 rounded-2xl bg-[#eef7f4] p-4 text-[#111c22]">
          <p className="text-sm font-black text-[#0d6b62]">建議導入功能</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedFeatures.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#40504c]">{item}</span>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/tools/project-planner#demo" className="inline-flex min-h-10 items-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              開始需求診斷
            </Link>
            <Link to="/contact" className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              找我做 LINE Bot
            </Link>
            <button type="button" onClick={onReset} className="inline-flex min-h-10 items-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              重新模擬
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function Metric({ label, value, wide = false }) {
  return (
    <div className={`rounded-2xl bg-white/10 p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-xs font-black text-[#8fd6cc]">{label}</p>
      <p key={value} className="mt-2 text-2xl font-black score-pulse">{value}</p>
    </div>
  )
}

function TechSection() {
  const tech = [
    ["Frontend", "React / Tailwind"],
    ["Interaction", "Conversation state"],
    ["Logic", "Rule-based decision engine"],
    ["LINE", "Webhook flow concept"],
    ["Backend", "Dashboard sync"],
    ["AI", "AI reply optional"],
    ["Conversion", "Result + CTA"],
    ["Deploy", "Vercel"],
  ]
  return (
    <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Tech</p>
          <h2 className="mt-3 text-3xl font-black">接待流程怎麼動</h2>
          <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
            LINE 訊息、Bot 回覆、需求分類與後台案件同步，用前端狀態先做成可展示的產品 Demo。
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {tech.map(([label, text]) => (
            <div key={label} className="rounded-2xl border border-[#ddd6c9] bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{label}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-[#ddd6c9] bg-[#111c22] p-4 text-white md:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">Flow</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
              {["LINE Message", "Bot Handling", "Demand Classify", "Dashboard Case", "Contact CTA"].map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-white/84">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LineBotMission
