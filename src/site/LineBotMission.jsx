import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { seo } from "./content"

const initialMetrics = {
  autoRate: 35,
  satisfaction: 60,
  cases: 0,
  savedMinutes: 0,
  risk: 45,
}

const strategies = {
  A: "直接簡短回覆",
  B: "追問需求並收集資料",
  C: "分類需求並建立後台案件",
  D: "轉人工處理",
}

const missions = [
  {
    id: "price",
    label: "客戶問價錢",
    message: "請問做一個網站大概多少？",
    best: "B",
    category: "網站詢價",
    nextStep: "收集頁數、功能與預算區間",
    replies: {
      A: "網站費用會依頁面與功能不同，我可以先給你大概方向。",
      B: "可以，我先幫你抓範圍。請問你想做一頁式、形象網站，還是需要表單 / 後台功能？",
      C: "我先幫你建立網站詢價案件，並整理需要確認的功能、預算與上線時間。",
      D: "這題我請人工協助你估價，稍後會回覆。",
    },
    effects: {
      A: { autoRate: 5, satisfaction: 3, cases: 0, savedMinutes: 3, risk: -2 },
      B: { autoRate: 12, satisfaction: 8, cases: 1, savedMinutes: 7, risk: -8 },
      C: { autoRate: 10, satisfaction: 6, cases: 1, savedMinutes: 6, risk: -7 },
      D: { autoRate: -2, satisfaction: 2, cases: 1, savedMinutes: 1, risk: -3 },
    },
  },
  {
    id: "booking",
    label: "客戶想預約",
    message: "我想預約明天下午討論可以嗎？",
    best: "B",
    category: "預約諮詢",
    nextStep: "確認可預約時段與聯絡方式",
    replies: {
      A: "可以，明天下午可以先討論。",
      B: "可以，請留下方便的時段、聯絡方式，以及想討論網站、LINE Bot 還是小系統。",
      C: "我已建立預約諮詢案件，會把時間、聯絡方式與需求整理到後台。",
      D: "我轉給人工確認時段，稍後回覆你。",
    },
    effects: {
      A: { autoRate: 4, satisfaction: 4, cases: 0, savedMinutes: 3, risk: -1 },
      B: { autoRate: 13, satisfaction: 9, cases: 1, savedMinutes: 8, risk: -9 },
      C: { autoRate: 12, satisfaction: 7, cases: 1, savedMinutes: 8, risk: -8 },
      D: { autoRate: -1, satisfaction: 3, cases: 1, savedMinutes: 1, risk: -4 },
    },
  },
  {
    id: "estimate",
    label: "客戶想估價",
    message: "我有一個工程案想先估價。",
    best: "C",
    category: "工程估價",
    nextStep: "建立估價案件並收照片 / 地點 / 工程類型",
    replies: {
      A: "可以，工程估價需要看現場狀況。",
      B: "可以，請先提供地點、照片、工程類型與希望處理時間。",
      C: "我先幫你建立工程估價案件，並整理需要補的照片、地點與工程類型。",
      D: "我轉給人工估價，稍後會聯絡你。",
    },
    effects: {
      A: { autoRate: 3, satisfaction: 2, cases: 0, savedMinutes: 2, risk: 2 },
      B: { autoRate: 10, satisfaction: 6, cases: 1, savedMinutes: 6, risk: -6 },
      C: { autoRate: 15, satisfaction: 8, cases: 1, savedMinutes: 8, risk: -10 },
      D: { autoRate: -2, satisfaction: 2, cases: 1, savedMinutes: 1, risk: -3 },
    },
  },
  {
    id: "works",
    label: "客戶問作品",
    message: "你們有案例可以看嗎？",
    best: "A",
    category: "作品查詢",
    nextStep: "導向作品案例與需求診斷",
    replies: {
      A: "有，可以先看 AI Audit、LINE Bot、BuildFlow 與 API Automation 這幾個互動 Demo。",
      B: "可以，請問你想看網站、LINE Bot、AI 工具還是後台系統案例？",
      C: "我先建立作品查詢案件，並標記你想看的案例類型。",
      D: "我請人工整理適合你的案例。",
    },
    effects: {
      A: { autoRate: 12, satisfaction: 9, cases: 0, savedMinutes: 5, risk: -7 },
      B: { autoRate: 9, satisfaction: 6, cases: 1, savedMinutes: 5, risk: -5 },
      C: { autoRate: 8, satisfaction: 4, cases: 1, savedMinutes: 4, risk: -4 },
      D: { autoRate: -1, satisfaction: 1, cases: 1, savedMinutes: 1, risk: -2 },
    },
  },
  {
    id: "unclear",
    label: "客戶需求不清楚",
    message: "我也不知道自己要做網站還是系統。",
    best: "B",
    category: "需求診斷",
    nextStep: "引導回答身份、功能、預算與上線時間",
    replies: {
      A: "可以先做網站，再看需不需要系統。",
      B: "沒關係，我可以先問幾個問題：你的產業、想解決的流程、預算區間與希望上線時間？",
      C: "我先建立需求診斷案件，並把你目前不確定的方向記錄下來。",
      D: "我轉人工協助你整理需求。",
    },
    effects: {
      A: { autoRate: 4, satisfaction: 1, cases: 0, savedMinutes: 2, risk: 3 },
      B: { autoRate: 14, satisfaction: 9, cases: 1, savedMinutes: 8, risk: -10 },
      C: { autoRate: 11, satisfaction: 7, cases: 1, savedMinutes: 7, risk: -8 },
      D: { autoRate: -1, satisfaction: 3, cases: 1, savedMinutes: 1, risk: -4 },
    },
  },
]

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

function getLevel(metrics) {
  const score = Math.round(metrics.autoRate * 0.4 + metrics.satisfaction * 0.4 + (100 - metrics.risk) * 0.2)
  if (score <= 50) return ["仍依賴人工回覆", score]
  if (score <= 75) return ["具備自動化雛形", score]
  if (score <= 90) return ["高效率接案流程", score]
  return ["接近完整 LINE Bot 系統", score]
}

function scrollToSection(id) {
  if (typeof document === "undefined") return
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function LineBotMission() {
  const [missionIndex, setMissionIndex] = useState(0)
  const [metrics, setMetrics] = useState(initialMetrics)
  const [messages, setMessages] = useState([{ role: "customer", text: missions[0].message, tag: "新訊息" }])
  const [cases, setCases] = useState([])
  const [feedback, setFeedback] = useState("選一個 Bot 策略，看看 LINE 對話與後台如何同步。")
  const [history, setHistory] = useState([])

  const currentMission = missions[missionIndex]
  const completed = missionIndex >= missions.length
  const [level, finalScore] = getLevel(metrics)

  const progress = Math.round((Math.min(missionIndex, missions.length) / missions.length) * 100)

  const latestCase = cases[0]
  const suggestedFeatures = useMemo(() => {
    const base = ["LINE Webhook", "需求分類", "自動回覆", "後台案件同步"]
    if (metrics.risk > 20) base.push("人工接手")
    if (metrics.autoRate >= 70) base.push("AI 回覆輔助")
    base.push("Email / 表單通知")
    return base
  }, [metrics])

  function applyStrategy(key) {
    if (completed || !currentMission) return
    const effect = currentMission.effects[key]
    const botReply = currentMission.replies[key]
    const isBest = key === currentMission.best
    const shouldCreateCase = key !== "A" || currentMission.id === "unclear"
    const caseItem = {
      id: `CASE-${String(cases.length + 1).padStart(3, "0")}`,
      title: currentMission.category,
      status: key === "D" ? "需人工處理" : isBest ? "已整理需求" : "待補資料",
      source: "LINE Bot",
      summary: currentMission.message,
      nextStep: currentMission.nextStep,
    }

    const nextMetrics = {
      autoRate: clamp(metrics.autoRate + effect.autoRate, 0, 100),
      satisfaction: clamp(metrics.satisfaction + effect.satisfaction, 0, 100),
      cases: metrics.cases + effect.cases,
      savedMinutes: metrics.savedMinutes + effect.savedMinutes,
      risk: clamp(metrics.risk + effect.risk, 0, 100),
    }

    setMetrics(nextMetrics)
    setMessages((current) => [
      ...current,
      { role: "bot", text: botReply, tag: isBest ? "最佳策略" : key === "D" ? "人工接手" : "可用策略" },
    ])
    setHistory((current) => [
      ...current,
      {
        mission: currentMission.label,
        strategy: strategies[key],
        result: isBest ? "處理漂亮" : key === "D" ? "保守但可追蹤" : "可用但還能更好",
      },
    ])
    if (shouldCreateCase) {
      setCases((current) => [caseItem, ...current])
    }
    setFeedback(isBest ? "策略漂亮：需求被分類，後台也同步更新。" : "已完成回覆，但還可以讓 Bot 多收一點資料。")

    const nextIndex = missionIndex + 1
    setMissionIndex(nextIndex)
    if (nextIndex < missions.length) {
      const nextMission = missions[nextIndex]
      window.setTimeout(() => {
        setMessages((current) => [...current, { role: "customer", text: nextMission.message, tag: nextMission.label }])
      }, 280)
    }
  }

  function resetMission() {
    setMissionIndex(0)
    setMetrics(initialMetrics)
    setMessages([{ role: "customer", text: missions[0].message, tag: "新訊息" }])
    setCases([])
    setFeedback("選一個 Bot 策略，看看 LINE 對話與後台如何同步。")
    setHistory([])
  }

  return (
    <SiteLayout>
      <Seo page={seo.lineBotMission} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Interactive Demo</p>
            <h1 className="mt-4 text-[clamp(2.4rem,8vw,4.8rem)] font-black leading-[1.04] tracking-tight">LINE Bot 任務模擬器</h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:line-clamp-2">
              模擬客戶從 LINE 詢問、預約、估價，看看 Bot 如何自動整理需求並同步到後台。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                開始任務
              </button>
              <button type="button" onClick={() => scrollToSection("tech")} className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                技術拆解
              </button>
              <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md border border-[#0d6b62] bg-[#eef7f4] px-5 text-sm font-black text-[#0d6b62]">
                找我做類似系統
              </Link>
            </div>
          </div>
          <MissionHeroPreview metrics={metrics} level={level} finalScore={finalScore} />
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <div className="mb-5 rounded-2xl border border-[#e3ded3] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Mission</p>
              <h2 className="mt-2 text-2xl font-black">{completed ? "任務完成" : currentMission.label}</h2>
            </div>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">Step {Math.min(missionIndex + 1, missions.length)} / {missions.length}</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
            <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-300" style={{ width: `${completed ? 100 : progress}%` }} />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_0.92fr_1fr]">
          <LinePhone messages={messages} />
          <StrategyPanel mission={currentMission} completed={completed} feedback={feedback} onChoose={applyStrategy} onReset={resetMission} />
          <DashboardPanel metrics={metrics} cases={cases} latestCase={latestCase} level={level} finalScore={finalScore} completed={completed} history={history} suggestedFeatures={suggestedFeatures} onReset={resetMission} />
        </div>
      </section>

      <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Tech</p>
            <h2 className="mt-3 text-3xl font-black">任務模擬怎麼做</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c] md:line-clamp-2">
              用對話狀態、策略分數與 Dashboard 同步，展示 LINE Bot 如何把客戶訊息變成可追蹤案件。
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Frontend", "React / Tailwind"],
              ["Interaction", "Conversation State Machine"],
              ["Logic", "Rule-based Decision Engine"],
              ["LINE", "Webhook Flow Concept"],
              ["Backend", "Case Dashboard Sync"],
              ["AI", "AI Reply Fallback Concept"],
              ["Conversion", "Mission Result + CTA"],
              ["Deploy", "Vercel"],
            ].map(([label, text]) => (
              <div key={label} className="rounded-2xl border border-[#ddd6c9] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
              </div>
            ))}
            <div className="rounded-2xl border border-[#ddd6c9] bg-[#111c22] p-4 text-white md:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">Flow</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
                {["LINE Message", "Bot Strategy", "Demand Classify", "Dashboard Case", "Mission Result"].map((item) => (
                  <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-white/84">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

function MissionHeroPreview({ metrics, level, finalScore }) {
  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-2xl shadow-[#111c22]/15">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">LINE Bot Mission</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">Interactive</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[0.72fr_1fr]">
        <div className="rounded-2xl bg-[#dff1e8] p-4 text-[#111c22]">
          <Bubble role="customer" text="請問網站大概多少？" />
          <Bubble role="bot" text="我先幫你抓範圍，請問需要哪些功能？" />
          <Bubble role="system" text="已分類：網站詢價" />
        </div>
        <div className="grid gap-2">
          {[
            ["自動處理率", `${metrics.autoRate}%`],
            ["客戶滿意度", metrics.satisfaction],
            ["漏接風險", `${metrics.risk}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white/10 px-3 py-2">
              <div className="flex justify-between gap-3 text-sm font-black">
                <span>{label}</span>
                <span className="text-[#8fd6cc]">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-2xl bg-white p-4 text-[#111c22]">
        <p className="text-xs font-black text-[#0d6b62]">任務等級</p>
        <p className="mt-2 text-xl font-black">{level}</p>
        <div className="mt-3 h-2 rounded-full bg-[#e4e9e6]">
          <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${finalScore}%` }} />
        </div>
      </div>
    </div>
  )
}

function LinePhone({ messages }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">LINE Mockup</p>
      <div className="mt-4 rounded-[2rem] border border-[#d8e2dc] bg-[#dff1e8] p-4 shadow-xl shadow-[#111c22]/10">
        <div className="mb-4 flex items-center justify-between rounded-full bg-white px-4 py-2">
          <span className="text-sm font-black text-[#111c22]">Qingyu Bot</span>
          <span className="text-xs font-black text-[#0d6b62]">online</span>
        </div>
        <div className="max-h-[560px] min-h-[420px] space-y-3 overflow-y-auto pr-1">
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
    return <div className="mx-auto max-w-[86%] rounded-full bg-white/70 px-3 py-1 text-center text-[11px] font-black text-[#52605c]">{text}</div>
  }
  return (
    <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm font-bold leading-6 ${role === "bot" ? "ml-auto bg-[#0d6b62] text-white" : "bg-white text-[#111c22]"}`}>
      {text}
    </div>
  )
}

function StrategyPanel({ mission, completed, feedback, onChoose, onReset }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Bot Strategy</p>
          <h2 className="mt-2 text-2xl font-black">{completed ? "任務已完成" : "選擇回覆策略"}</h2>
        </div>
        <button type="button" onClick={onReset} className="rounded-md border border-[#cfd7d3] px-3 py-2 text-xs font-black text-[#111c22] hover:border-[#0d6b62]">
          重新挑戰
        </button>
      </div>
      {completed ? (
        <div className="mt-5 rounded-2xl bg-[#eef7f4] p-4">
          <p className="text-sm font-black text-[#0d6b62]">5 輪任務完成</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#40504c]">右側已產生任務結果，可以開始需求診斷或聯絡我規劃 LINE Bot。</p>
        </div>
      ) : (
        <>
          <div className="mt-5 rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
            <p className="text-sm font-black text-[#0d6b62]">{mission.label}</p>
            <p className="mt-2 text-lg font-black leading-7">{mission.message}</p>
          </div>
          <div className="mt-5 grid gap-3">
            {Object.entries(strategies).map(([key, label]) => (
              <button key={key} type="button" onClick={() => onChoose(key)} className="rounded-2xl border border-[#e3ded3] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-md">
                <span className="text-xs font-black text-[#0d6b62]">策略 {key}</span>
                <span className="mt-1 block text-sm font-black text-[#111c22]">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
      <p className="mt-5 rounded-2xl bg-[#faf8f3] px-4 py-3 text-sm font-black leading-6 text-[#40504c]">{feedback}</p>
    </div>
  )
}

function DashboardPanel({ metrics, cases, latestCase, level, finalScore, completed, history, suggestedFeatures, onReset }) {
  return (
    <aside className="rounded-2xl border border-[#233139] bg-[#111c22] p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">Dashboard</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Metric label="自動處理率" value={`${metrics.autoRate}%`} />
        <Metric label="客戶滿意度" value={metrics.satisfaction} />
        <Metric label="後台案件" value={metrics.cases} />
        <Metric label="節省時間" value={`${metrics.savedMinutes} 分`} />
        <Metric label="漏接風險" value={`${metrics.risk}%`} wide />
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4 text-[#111c22]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black text-[#0d6b62]">任務等級</p>
            <p className="mt-2 text-xl font-black">{level}</p>
          </div>
          <p className="text-4xl font-black">{finalScore}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-black text-[#8fd6cc]">案件列表</p>
        <div className="mt-3 grid gap-2">
          {cases.length ? cases.slice(0, 4).map((item) => (
            <div key={item.id} className="rounded-xl bg-white px-3 py-3 text-[#111c22]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{item.title}</p>
                <span className="rounded-full bg-[#eef7f4] px-2 py-1 text-[11px] font-black text-[#0d6b62]">{item.status}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-[#52605c]">來源：{item.source}｜{item.nextStep}</p>
            </div>
          )) : (
            <p className="rounded-xl bg-white/10 px-3 py-3 text-sm font-bold text-white/75">選擇策略後，需求會同步到這裡。</p>
          )}
        </div>
      </div>

      {latestCase ? (
        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-black text-[#8fd6cc]">最新 Bot 摘要</p>
          <p className="mt-2 text-sm font-bold leading-6 text-white/80">{latestCase.summary}</p>
        </div>
      ) : null}

      {completed ? (
        <div className="mt-5 rounded-2xl bg-[#eef7f4] p-4 text-[#111c22]">
          <p className="text-sm font-black text-[#0d6b62]">你的 LINE Bot 任務結果</p>
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
              重新挑戰
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-black text-[#8fd6cc]">任務紀錄</p>
          <div className="mt-3 grid gap-2">
            {history.length ? history.slice(-3).map((item) => (
              <span key={`${item.mission}-${item.strategy}`} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold leading-5 text-white/80">
                {item.mission}：{item.result}
              </span>
            )) : <span className="text-sm font-bold text-white/70">尚未選擇策略。</span>}
          </div>
        </div>
      )}
    </aside>
  )
}

function Metric({ label, value, wide = false }) {
  return (
    <div className={`rounded-2xl bg-white/10 p-4 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-xs font-black text-[#8fd6cc]">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  )
}

export default LineBotMission
