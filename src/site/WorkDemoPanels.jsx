import { useState } from "react"

function Shell({ title, desc, children }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ded8cb] bg-white shadow-sm">
      <div className="border-b border-[#eee9df] bg-[#faf8f3] p-4 md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Product Preview</p>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
          </div>
          <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">{desc}</p>
        </div>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  )
}

function MiniCard({ title, children, dark = false }) {
  return (
    <div className={`rounded-xl border p-4 ${dark ? "border-[#26343b] bg-[#111c22] text-white" : "border-[#e3ded3] bg-[#faf8f3]"}`}>
      <p className={`text-sm font-black ${dark ? "text-[#8fd6cc]" : "text-[#0d6b62]"}`}>{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function Progress({ value }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#e4e9e6]">
      <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-500" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  )
}

const staticDemoMap = {
  "company-site": {
    title: "公司一頁式官網",
    panels: ["主視覺", "服務項目", "合作流程", "案例優勢", "聯絡表單", "手機版 RWD"],
    stat: "一頁完成品牌入口",
  },
  "tracking-system": {
    title: "貨運查件系統",
    panels: ["單號查詢", "狀態顯示", "更新時間", "備註", "後台新增", "資料修改"],
    stat: "TRK-1024 配送中",
  },
  memberhub: {
    title: "會員專區系統",
    panels: ["會員登入", "公告", "檔案下載", "留言區", "管理員後台"],
    stat: "會員資料集中",
  },
  "quiz-page": {
    title: "互動測驗頁",
    panels: ["題目", "選項", "答案解析", "結果頁", "題庫更新"],
    stat: "一題一互動",
  },
  buildflow: {
    title: "工程行接案系統",
    panels: ["案件列表", "案件詳情", "照片", "報價狀態", "施工狀態", "LINE 回報"],
    stat: "案件可追蹤",
  },
  xinjiang: {
    title: "鑫匠工程案例",
    panels: ["網站首頁", "估價入口", "服務分類", "案件進後台", "LINE 回報"],
    stat: "案例情境",
  },
  "qingyu-web": {
    title: "Qingyu Web 主站案例",
    panels: ["首頁", "成品庫", "需求診斷", "聯絡表單", "SEO"],
    stat: "接案動線",
  },
  "ai-tech-quest": {
    title: "AI 技術任務",
    panels: ["RAG", "ML 評估", "AI Assistant", "Report UI"],
    stat: "AI Showcase",
  },
  "tw-civic-rag": {
    title: "文件問答 RAG",
    panels: ["文件切分", "檢索片段", "問答", "引用"],
    stat: "RAG Flow",
  },
  "unity-ai-tutor": {
    title: "Unity AI Tutor",
    panels: ["WebGL", "互動操作", "AI 提示", "結果回饋"],
    stat: "Interactive Tutor",
  },
  "interactive-quiz": {
    title: "互動測驗頁",
    panels: ["題目", "選項", "解析", "結果"],
    stat: "Quiz Demo",
  },
  "ai-business-assistant": {
    title: "AI FAQ 助理",
    panels: ["FAQ", "關鍵字", "AI 回覆", "分類"],
    stat: "FAQ Assistant",
  },
}

function StaticProductDemo({ project }) {
  const demo = staticDemoMap[project.slug] || { title: project.title, panels: project.demo || [], stat: project.category }

  return (
    <Shell title={demo.title} desc={project.summary}>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-[#111c22] p-5 text-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black text-[#8fd6cc]">Preview</p>
              <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black">{demo.stat}</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {demo.panels.slice(0, 6).map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/8 p-4 text-sm font-black">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <MiniCard title="可改內容">
            <div className="flex flex-wrap gap-2">
              {(project.customizable || []).slice(0, 6).map((item) => (
                <span key={item} className="rounded-md bg-white px-3 py-2 text-xs font-black text-[#40504c]">
                  {item}
                </span>
              ))}
            </div>
          </MiniCard>
          <MiniCard title="參考價">
            <p className="text-3xl font-black text-[#111c22]">{project.price}</p>
          </MiniCard>
        </div>
      </div>
    </Shell>
  )
}

function AiAuditDemo() {
  const [input, setInput] = useState("我有一個工作室網站，想讓客戶更容易聯絡。")
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState(null)

  async function runAudit() {
    setLoading(true)
    try {
      const response = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: input, industry: "工作室", goal: "增加詢問" }),
      })
      const data = response.ok ? await response.json() : null
      setReport(data?.score ? data : mockAuditReport())
    } catch {
      setReport(mockAuditReport())
    } finally {
      setLoading(false)
    }
  }

  return (
    <Shell title="AI 網站健檢" desc="輸入網站或需求，產生短報告。">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <MiniCard title="輸入">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-40 w-full rounded-xl border border-[#e3ded3] bg-white px-4 py-3 text-sm font-bold leading-7 outline-none focus:border-[#0d6b62]"
          />
          <button type="button" onClick={runAudit} disabled={loading} className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white disabled:opacity-60">
            {loading ? "分析中..." : "開始分析"}
          </button>
        </MiniCard>
        <MiniCard title="報告結果" dark>
          {loading ? (
            <div className="grid gap-3">
              <Progress value={72} />
              <Progress value={56} />
              <Progress value={86} />
            </div>
          ) : report ? (
            <ReportView report={report} />
          ) : (
            <p className="text-sm font-bold leading-7 text-white/72">按下開始分析後，這裡會顯示分數與建議。</p>
          )}
        </MiniCard>
      </div>
    </Shell>
  )
}

function mockAuditReport() {
  return {
    score: 82,
    summary: "首頁方向清楚，但 CTA 與聯絡入口可以更集中。",
    seo: ["title 加上服務與地區", "description 保留聯絡價值"],
    cta: ["主按鈕改成我想做類似的", "手機版固定主要 CTA"],
    copywriting: ["標題縮短", "服務說明改成成品範例"],
    trust: ["加入案例預覽", "補上 LINE / Email"],
    mobile: ["按鈕高度至少 44px", "卡片減少 tags"],
    nextSteps: ["挑一個成品當主推", "整理聯絡表單", "補 sitemap"],
  }
}

function ReportView({ report }) {
  const groups = [
    ["SEO", report.seo],
    ["CTA", report.cta],
    ["文案", report.copywriting],
    ["信任感", report.trust],
    ["手機版", report.mobile],
  ]
  return (
    <div>
      <div className="flex items-end gap-3">
        <p className="text-5xl font-black">{report.score}</p>
        <p className="pb-2 text-sm font-black text-white/58">/ 100</p>
      </div>
      <p className="mt-3 text-sm font-bold leading-7 text-white/78">{report.summary}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {groups.map(([title, items]) => (
          <div key={title} className="rounded-xl bg-white/10 p-3">
            <p className="text-xs font-black text-[#8fd6cc]">{title}</p>
            <p className="mt-2 text-sm font-bold leading-6 text-white/78">{items?.[0]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineBotDemo() {
  const [messages, setMessages] = useState([{ role: "user", text: "請問營業時間？" }])
  const [leads, setLeads] = useState([])

  function simulateReply() {
    const nextLead = {
      id: `LINE-${String(leads.length + 1).padStart(2, "0")}`,
      type: leads.length % 2 === 0 ? "預約詢問" : "價目表詢問",
      status: "已整理",
    }
    setMessages((current) => [
      ...current,
      { role: "bot", text: "您好，我可以先提供營業時間、價目表，也可以協助留下預約需求。" },
    ])
    setLeads((current) => [nextLead, ...current])
  }

  return (
    <Shell title="LINE 自動回覆" desc="模擬 FAQ、預約說明與後台收件。">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white">
          <p className="text-center text-sm font-black text-[#8fd6cc]">LINE</p>
          <div className="mt-4 grid gap-3">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm font-bold leading-6 ${message.role === "bot" ? "justify-self-start bg-white/10" : "justify-self-end bg-[#8fd6cc] text-[#111c22]"}`}>
                {message.text}
              </div>
            ))}
          </div>
          <button type="button" onClick={simulateReply} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22]">
            模擬自動回覆
          </button>
        </div>
        <MiniCard title="後台收件">
          <div className="grid gap-3">
            {(leads.length ? leads : [{ id: "LINE-00", type: "等待訊息", status: "待觸發" }]).map((lead) => (
              <div key={lead.id} className="rounded-xl border border-[#e3ded3] bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black">{lead.id}</p>
                  <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{lead.status}</span>
                </div>
                <p className="mt-2 text-sm font-bold text-[#52605c]">{lead.type}</p>
              </div>
            ))}
          </div>
        </MiniCard>
      </div>
    </Shell>
  )
}

function ApiAutomationDemo() {
  const [form, setForm] = useState({ name: "測試客戶", service: "LINE Bot", budget: "30,000～60,000" })
  const [payloadVisible, setPayloadVisible] = useState(false)
  const [response, setResponse] = useState(null)
  const [items, setItems] = useState([])
  const [step, setStep] = useState(-1)
  const steps = ["Form", "API", "Database", "Notification", "Dashboard"]

  async function submitLead() {
    const payload = { ...form, industry: "服務業", note: "想做自動回覆與後台整理" }
    for (let index = 0; index < steps.length; index += 1) {
      setStep(index)
      await wait(160)
    }
    try {
      const result = await fetch("/api/automation-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = result.ok ? await result.json() : fallbackResponse(payload)
      setResponse(data)
      setItems((current) => [data.dashboardItem || fallbackResponse(payload).dashboardItem, ...current])
    } catch {
      const data = fallbackResponse(payload)
      setResponse(data)
      setItems((current) => [data.dashboardItem, ...current])
    }
  }

  return (
    <Shell title="API 自動化流程" desc="表單送出後，進 API、通知與後台。">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <MiniCard title="客戶表單">
          <div className="grid gap-3">
            {Object.entries(form).map(([key, value]) => (
              <input
                key={key}
                value={value}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="min-h-11 rounded-md border border-[#e3ded3] bg-white px-3 text-sm font-bold outline-none focus:border-[#0d6b62]"
              />
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" onClick={submitLead} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
              送出表單
            </button>
            <button type="button" onClick={() => setPayloadVisible((current) => !current)} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-4 text-sm font-black text-[#111c22]">
              查看 Payload
            </button>
          </div>
        </MiniCard>
        <div className="grid gap-4">
          <MiniCard title="流程監控">
            <div className="grid gap-2 sm:grid-cols-5">
              {steps.map((item, index) => (
                <div key={item} className={`rounded-xl border px-3 py-3 text-center text-xs font-black ${index <= step ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62]" : "border-[#e3ded3] bg-white text-[#6b6258]"}`}>
                  {item}
                </div>
              ))}
            </div>
          </MiniCard>
          {payloadVisible ? <CodeBlock title="API Payload" data={{ ...form, industry: "服務業", note: "想做自動回覆與後台整理" }} /> : null}
          {response ? <CodeBlock title="API Response" data={response} /> : null}
          <MiniCard title="Dashboard">
            <div className="grid gap-3">
              {(items.length ? items : [{ name: "尚未送出", service: "等待資料", status: "待處理" }]).map((item, index) => (
                <div key={`${item.name}-${index}`} className="rounded-xl border border-[#e3ded3] bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black">{item.name}</p>
                    <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{item.status}</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#52605c]">{item.service}</p>
                </div>
              ))}
            </div>
          </MiniCard>
        </div>
      </div>
    </Shell>
  )
}

function fallbackResponse(payload) {
  return {
    ok: true,
    leadId: `lead_${Date.now()}`,
    status: "received",
    notification: "mock_sent",
    message: "Demo mode: notification simulated",
    dashboardItem: {
      name: payload.name,
      industry: payload.industry,
      service: payload.service,
      budget: payload.budget,
      status: "新需求",
      source: "API Demo",
      createdAt: new Date().toLocaleString("zh-TW"),
    },
  }
}

function CodeBlock({ title, data }) {
  return (
    <div className="rounded-xl border border-[#233139] bg-[#111c22] p-4 text-white">
      <p className="text-xs font-black text-[#8fd6cc]">{title}</p>
      <pre className="mt-3 overflow-x-auto text-xs font-bold leading-6 text-white/78">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function GenericDemo({ project }) {
  return <StaticProductDemo project={project} />
}

export default function WorkDemoPanel({ project }) {
  if (project.slug === "ai-audit") return <AiAuditDemo />
  if (project.slug === "linebot") return <LineBotDemo />
  if (project.slug === "api-automation") return <ApiAutomationDemo />
  return <GenericDemo project={project} />
}
