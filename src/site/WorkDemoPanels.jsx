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
  const [hasRun, setHasRun] = useState(true)
  const score = hasRun ? 82 : 0
  const checks = [
    ["SEO", "標題可加入地區與服務關鍵字", 78],
    ["CTA", "首頁第一屏需要更明確的聯絡入口", 74],
    ["信任感", "建議補作品案例、客戶常見問題與流程", 86],
    ["手機版", "按鈕可加大，服務重點需提前", 80],
  ]

  return (
    <Shell title="AI 網站健檢工具" desc="前端先用 mock analysis 模擬 OpenAI 報告流程，讓客戶理解未來可擴充成真正 AI 工具。">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <MiniCard title="Input｜網址 / 需求輸入">
          <textarea
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="min-h-32 w-full resize-none rounded-lg border border-[#d8d2c5] bg-white p-3 text-sm font-bold leading-7 outline-none focus:border-[#0d6b62]"
          />
          <button type="button" onClick={() => setHasRun(true)} className="mt-3 min-h-10 rounded-md bg-[#111c22] px-4 text-sm font-black text-white">
            重新分析
          </button>
        </MiniCard>
        <div className="grid gap-4">
          <MiniCard title="Report UI｜健檢總分" tone="dark">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-black">{score}</p>
                <p className="mt-1 text-sm font-bold text-white/65">需要優先修 CTA 與首頁說明</p>
              </div>
              <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b2724]">Mock OpenAI Flow</span>
            </div>
          </MiniCard>
          <div className="grid gap-3 sm:grid-cols-2">
            {checks.map(([label, text, value]) => (
              <MiniCard key={label} title={label}>
                <p className="min-h-12 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
                <div className="mt-3">
                  <Progress value={value} />
                </div>
              </MiniCard>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  )
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
    <Shell title="LINE Bot 詢價 / 預約系統" desc="模擬 LINE 對話、Webhook 解析、後台收件與店家通知，展示完整訊息到案件流程。">
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
            {["Webhook", "Parse", "Inbox", "通知店家"].map((item, index) => (
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
