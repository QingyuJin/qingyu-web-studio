import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const sidebarItems = [
  "總覽 Dashboard",
  "案件管理",
  "發包項目",
  "追加減項",
  "廠商資料",
  "施工進度",
  "LINE Bot",
  "確認文字",
  "風險提醒",
]

const projects = [
  {
    id: "BF-001",
    name: "屏東住宅防水工程",
    client: "林先生",
    trade: "防水 / 泥作",
    vendor: "阿明工程行",
    status: "施工中",
    statusTone: "blue",
    budget: 125000,
    extra: 18000,
    date: "2026-06-18",
    risk: "紅燈",
    riskDesc: "浴室追加防水尚未取得業主確認文字。",
  },
  {
    id: "BF-002",
    name: "高雄店面整修",
    client: "陳小姐",
    trade: "木作 / 油漆",
    vendor: "宏誠裝修",
    status: "待確認追加",
    statusTone: "red",
    budget: 238000,
    extra: 32000,
    date: "2026-06-22",
    risk: "紅燈",
    riskDesc: "天花板改管與新增燈槽尚未簽認。",
  },
  {
    id: "BF-003",
    name: "潮州透天浴室翻修",
    client: "王太太",
    trade: "水電 / 磁磚",
    vendor: "正隆水電",
    status: "估價中",
    statusTone: "yellow",
    budget: 98000,
    extra: 0,
    date: "2026-07-02",
    risk: "黃燈",
    riskDesc: "等待材料報價，尚未正式發包。",
  },
  {
    id: "BF-004",
    name: "鹽埔老屋泥作修補",
    client: "黃先生",
    trade: "泥作",
    vendor: "阿源師傅",
    status: "待收款",
    statusTone: "green",
    budget: 76000,
    extra: 6000,
    date: "2026-05-29",
    risk: "綠燈",
    riskDesc: "完工照片已整理，等待尾款。",
  },
]

const changeOrders = [
  {
    id: "CO-01",
    project: "屏東住宅防水工程",
    item: "浴室牆面追加防水",
    reason: "拆除後發現原防水層失效",
    amount: 12000,
    confirmed: false,
    method: "LINE 待確認",
  },
  {
    id: "CO-02",
    project: "高雄店面整修",
    item: "天花板新增燈槽",
    reason: "業主臨時增加展示燈需求",
    amount: 18000,
    confirmed: false,
    method: "尚未確認",
  },
  {
    id: "CO-03",
    project: "鹽埔老屋泥作修補",
    item: "外牆裂縫補強",
    reason: "現場追加修補範圍",
    amount: 6000,
    confirmed: true,
    method: "LINE 已確認",
  },
]

const vendors = [
  {
    name: "阿明工程行",
    trade: "防水 / 泥作",
    phone: "09xx-123-456",
    area: "屏東 / 高雄",
    note: "防水細節穩，報價中高，適合重要案場。",
  },
  {
    name: "正隆水電",
    trade: "水電",
    phone: "09xx-666-889",
    area: "屏東",
    note: "配合度高，適合浴室、廚房翻修。",
  },
  {
    name: "宏誠裝修",
    trade: "木作 / 油漆",
    phone: "09xx-882-311",
    area: "高雄 / 屏東",
    note: "店面案經驗多，報價需提前確認追加項。",
  },
]

const botCommands = [
  {
    user: "新增案件 屏東住宅 防水工程",
    bot: "已建立案件：屏東住宅防水工程。請補充地址、業主、預計施工日。",
    tag: "新增案件",
  },
  {
    user: "查案件 屏東住宅",
    bot: "屏東住宅防水工程｜狀態：施工中｜負責：阿明工程行｜紅燈：浴室追加防水待確認。",
    tag: "查詢案件",
  },
  {
    user: "追加 浴室牆面防水 12000",
    bot: "已新增追加項目：浴室牆面防水｜NT$12,000。是否產生給業主的確認文字？",
    tag: "新增追加",
  },
  {
    user: "產生確認文字",
    bot: "確認文字已產生：因現場拆除後發現原防水層失效，需追加浴室牆面防水，金額 NT$12,000，請業主確認後施工。",
    tag: "確認文字",
  },
  {
    user: "查廠商 阿明",
    bot: "阿明工程行｜防水 / 泥作｜09xx-123-456｜常合作地區：屏東、高雄。",
    tag: "查廠商",
  },
  {
    user: "提醒 明天屏東住宅拍完工照",
    bot: "已建立提醒：明天 09:00 提醒屏東住宅防水工程拍攝完工照片。",
    tag: "推播提醒",
  },
]

const flowSteps = [
  {
    title: "LINE 現場輸入",
    desc: "師傅或管理者用 LINE 新增案件、追加項、查詢廠商或產生確認文字。",
  },
  {
    title: "BuildFlow 整理資料",
    desc: "把案件、廠商、發包、追加減項與風險狀態整理成 Dashboard。",
  },
  {
    title: "Google Sheet / 後台",
    desc: "第一版可先用假資料 Demo，商業 MVP 可串 Google Sheet 或 Supabase。",
  },
  {
    title: "輸出確認文字",
    desc: "快速產生可貼給業主或師傅的 LINE 文字，減少口頭講不清楚。",
  },
]

const fieldExperience = [
  "做過工地現場，知道很多資料不是一開始就進系統，而是先散在 LINE、電話和照片裡。",
  "認識師傅與工程行，理解發包、追加、收款與業主確認常常卡在溝通紀錄。",
  "這個 Demo 不是大型 ERP，而是先把最容易出錯的流程做成可用的第一版工具。",
]

function ContractorSystemDemo() {
  const [activeStatus, setActiveStatus] = useState("全部")
  const [activeBot, setActiveBot] = useState(0)
  const [copied, setCopied] = useState(false)

  const filteredProjects = useMemo(() => {
    if (activeStatus === "全部") return projects
    return projects.filter((project) => project.status === activeStatus)
  }, [activeStatus])

  const totalBudget = projects.reduce((sum, item) => sum + item.budget, 0)
  const totalExtra = projects.reduce((sum, item) => sum + item.extra, 0)
  const redRiskCount = projects.filter((item) => item.risk === "紅燈").length
  const waitingChange = changeOrders.filter((item) => !item.confirmed).length

  const confirmText = `【追加工程確認】

案件：屏東住宅防水工程
追加項目：浴室牆面追加防水
原因：現場拆除後發現原防水層失效，若不補強後續可能滲水。
追加金額：NT$12,000

請業主確認後，我們再安排後續施工。`

  async function copyConfirmText() {
    try {
      await navigator.clipboard.writeText(confirmText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = confirmText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef2f7] text-slate-950">
      <Background />

      <section className="mx-auto grid max-w-[1500px] grid-cols-1 gap-0 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-2rem)] rounded-[2rem] bg-[#10235c] p-5 text-white shadow-2xl shadow-slate-900/10 lg:block">
          <div>
            <p className="text-2xl font-black tracking-[-0.04em]">BuildFlow</p>
            <p className="mt-2 text-sm leading-6 text-white/58">
              工程行發包與追加減項管理 MVP
            </p>
          </div>

          <nav className="mt-8 grid gap-2">
            {sidebarItems.map((item, index) => (
              <a
                key={item}
                href={index === 6 ? "#line-bot" : index === 3 ? "#change-order" : "#dashboard"}
                className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  index === 0
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-950/20"
                    : "text-white/68 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-10 rounded-[1.5rem] border border-white/10 bg-white/8 p-4">
            <p className="text-sm font-bold text-white">系統定位</p>
            <p className="mt-3 text-sm leading-7 text-white/62">
              不是大型 ERP，而是幫小型工程行先整理最容易出錯的發包與追加減項流程。
            </p>
          </div>
        </aside>

        <section className="min-w-0 lg:pl-6">
          <header className="sticky top-0 z-40 -mx-4 border-b border-slate-200/70 bg-[#eef2f7]/85 px-4 py-4 backdrop-blur-xl lg:static lg:mx-0 lg:border-none lg:bg-transparent lg:px-0 lg:py-0">
            <div className="flex items-center justify-between gap-3">
              <Link
                to="/"
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:text-slate-950"
              >
                ← 回首頁
              </Link>

              <a
                href="#line-bot"
                className="rounded-full bg-[#10235c] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:bg-blue-700"
              >
                看 LINE Bot
              </a>
            </div>
          </header>

          <HeroSection />

          <section id="dashboard" className="mt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
                  Dashboard Preview
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 md:text-5xl">
                  從 LINE 和 Excel 裡，把工程狀態整理成可追蹤總覽。
                </h2>
              </div>

              <button className="w-fit rounded-2xl bg-amber-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-amber-500/20">
                + 新增案件
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
              <MetricCard label="總案件數" value={projects.length} />
              <MetricCard label="施工中" value={projects.filter((p) => p.status === "施工中").length} />
              <MetricCard label="待確認追加" value={waitingChange} tone="red" />
              <MetricCard label="待收款" value={projects.filter((p) => p.status === "待收款").length} />
              <MetricCard label="紅燈風險" value={redRiskCount} tone="red" />
              <MetricCard label="追加金額" value={`NT$${formatMoney(totalExtra)}`} tone="amber" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
              <ProjectTable
                filteredProjects={filteredProjects}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
              />

              <RiskPanel
                totalBudget={totalBudget}
                totalExtra={totalExtra}
                redRiskCount={redRiskCount}
              />
            </div>
          </section>

          <ProblemSection />
          <ChangeOrderSection copyConfirmText={copyConfirmText} copied={copied} confirmText={confirmText} />
          <LineBotSection activeBot={activeBot} setActiveBot={setActiveBot} />
          <VendorSection />
          <FlowSection />
          <FieldStorySection />

          <section className="py-16">
            <div className="rounded-[2rem] bg-[#10235c] p-7 text-white shadow-2xl shadow-slate-900/10 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1fr_0.72fr] md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-200">
                    Commercial Direction
                  </p>
                  <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">
                    網站、LINE Bot、表單與內部工具可以是同一套流程。
                  </h2>
                  <p className="mt-5 max-w-2xl leading-8 text-white/68">
                    BuildFlow 是一個系統案 Demo，用來展示如何從真實產業痛點出發，把工程行的資料整理成可使用的輕量 MVP。
                  </p>
                </div>

                <div className="grid gap-3">
                  <Link
                    to="/service"
                    className="rounded-3xl bg-white p-5 text-slate-950 transition hover:bg-blue-50"
                  >
                    <p className="text-sm font-bold text-slate-500">Service</p>
                    <p className="mt-2 font-black">查看服務範圍 →</p>
                  </Link>
                  <Link
                    to="/"
                    className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white transition hover:bg-white/15"
                  >
                    <p className="text-sm font-bold text-white/48">Portfolio</p>
                    <p className="mt-2 font-black">回作品集首頁 →</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}

function HeroSection() {
  return (
    <section className="mt-6 overflow-hidden rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-900/5 md:p-10 lg:mt-0">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-blue-700">
            Contractor System MVP
          </p>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.06em] text-slate-950 md:text-7xl">
            工程案不是只靠 LINE 記憶。
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg md:leading-9">
            BuildFlow 協助小型工程行把案件、發包、廠商、追加減項與業主確認流程，從 LINE 和 Excel 整理成可追蹤的輕量系統。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#change-order"
              className="rounded-full bg-[#10235c] px-6 py-3 text-sm font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-blue-700"
            >
              看追加減項流程
            </a>
            <a
              href="#line-bot"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-800 transition hover:border-slate-400"
            >
              看 LINE Bot Demo
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#f4f7fb] p-4">
          <div className="rounded-[1.5rem] bg-[#10235c] p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-white/50">BuildFlow Command</p>
                <p className="mt-1 text-xl font-black">LINE → Dashboard</p>
              </div>
              <span className="rounded-full bg-green-400 px-3 py-1 text-xs font-black text-green-950">
                Live Concept
              </span>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                ["新增案件", "建立案場與狀態"],
                ["追加減項", "產生業主確認文字"],
                ["查廠商", "快速找師傅電話"],
                ["推播提醒", "提醒拍照 / 收款 / 確認"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="font-black">{title}</p>
                  <p className="mt-1 text-sm text-white/58">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MetricCard({ label, value, tone = "blue" }) {
  const toneClass = {
    blue: "text-blue-700 bg-blue-50",
    red: "text-rose-700 bg-rose-50",
    amber: "text-amber-700 bg-amber-50",
  }[tone]

  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-900/5">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-3 w-fit rounded-xl px-3 py-1 text-2xl font-black ${toneClass}`}>
        {value}
      </p>
    </div>
  )
}

function ProjectTable({ filteredProjects, activeStatus, setActiveStatus }) {
  const statusOptions = ["全部", "施工中", "待確認追加", "估價中", "待收款"]

  return (
    <div className="min-w-0 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-100 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black tracking-[-0.03em]">案件與發包總表</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              管理案件、廠商、追加金額與風險狀態。
            </p>
          </div>

          <select
            value={activeStatus}
            onChange={(event) => setActiveStatus(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none"
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
            <tr>
              <th className="px-5 py-4">案件</th>
              <th className="px-5 py-4">工種</th>
              <th className="px-5 py-4">廠商</th>
              <th className="px-5 py-4">預算</th>
              <th className="px-5 py-4">追加</th>
              <th className="px-5 py-4">狀態</th>
              <th className="px-5 py-4">風險</th>
              <th className="px-5 py-4">日期</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="align-top">
                <td className="px-5 py-5">
                  <p className="font-black text-slate-950">{project.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {project.id}｜業主：{project.client}
                  </p>
                </td>
                <td className="px-5 py-5 font-bold text-slate-700">{project.trade}</td>
                <td className="px-5 py-5 text-slate-600">{project.vendor}</td>
                <td className="px-5 py-5 font-bold text-slate-700">NT${formatMoney(project.budget)}</td>
                <td className="px-5 py-5 font-bold text-rose-600">NT${formatMoney(project.extra)}</td>
                <td className="px-5 py-5">
                  <StatusBadge status={project.status} tone={project.statusTone} />
                </td>
                <td className="px-5 py-5">
                  <RiskBadge risk={project.risk} />
                  <p className="mt-2 max-w-[240px] text-xs leading-5 text-slate-500">
                    {project.riskDesc}
                  </p>
                </td>
                <td className="px-5 py-5 text-slate-500">{project.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RiskPanel({ totalBudget, totalExtra, redRiskCount }) {
  return (
    <aside className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/5">
      <h3 className="text-2xl font-black tracking-[-0.03em]">風險摘要</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        把最容易事後爭議的追加與確認狀態拉出來看。
      </p>

      <div className="mt-5 grid gap-3">
        <MiniStat label="總預算" value={`NT$${formatMoney(totalBudget)}`} />
        <MiniStat label="追加合計" value={`NT$${formatMoney(totalExtra)}`} tone="red" />
        <MiniStat label="紅燈風險" value={`${redRiskCount} 件`} tone="red" />
      </div>

      <div className="mt-5 rounded-[1.5rem] bg-rose-50 p-4">
        <p className="font-black text-rose-700">本日提醒</p>
        <p className="mt-2 text-sm leading-7 text-rose-700/75">
          高雄店面整修有 1 筆追加尚未確認，建議先產生 LINE 確認文字再施工。
        </p>
      </div>
    </aside>
  )
}

function ProblemSection() {
  const problems = [
    "追加減項常常口頭講，完工後容易爭議。",
    "廠商資料散在 LINE，臨時要找電話很麻煩。",
    "發包項目、報價和施工狀態常靠記憶。",
    "照片很多，但沒有沉澱成完工紀錄或案例。",
  ]

  return (
    <section className="py-16">
      <SectionHeader
        eyebrow="Core Problem"
        title="小型工程行最需要的，不一定是大型 ERP，而是先把會出事的流程記清楚。"
        desc="第一版 BuildFlow 主打追加減項，因為這通常是最容易造成業主、師傅與工程行爭議的地方。"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {problems.map((item, index) => (
          <div key={item} className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
            <p className="text-sm font-black text-blue-600">0{index + 1}</p>
            <p className="mt-5 text-lg font-black leading-8 text-slate-950">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ChangeOrderSection({ copyConfirmText, copied, confirmText }) {
  return (
    <section id="change-order" className="py-16">
      <SectionHeader
        eyebrow="Change Order Module"
        title="追加減項要留下確認紀錄，不要只靠口頭說。"
        desc="把日期、案件、原因、金額與是否業主確認整理清楚，必要時直接產生可貼到 LINE 的確認文字。"
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-900/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-4">編號</th>
                  <th className="px-5 py-4">案件</th>
                  <th className="px-5 py-4">追加項目</th>
                  <th className="px-5 py-4">金額</th>
                  <th className="px-5 py-4">確認狀態</th>
                  <th className="px-5 py-4">方式</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {changeOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-5 font-black text-slate-700">{order.id}</td>
                    <td className="px-5 py-5 text-slate-600">{order.project}</td>
                    <td className="px-5 py-5">
                      <p className="font-black text-slate-950">{order.item}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{order.reason}</p>
                    </td>
                    <td className="px-5 py-5 font-black text-rose-600">
                      NT${formatMoney(order.amount)}
                    </td>
                    <td className="px-5 py-5">
                      {order.confirmed ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                          已確認
                        </span>
                      ) : (
                        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">
                          待確認
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 text-slate-500">{order.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#10235c] p-6 text-white shadow-xl shadow-slate-900/10">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
            LINE Confirmation
          </p>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
            產生給業主的確認文字
          </h3>
          <pre className="mt-5 max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-[1.5rem] bg-white/10 p-4 text-sm leading-7 text-white/78">
            {confirmText}
          </pre>

          <button
            onClick={copyConfirmText}
            className="mt-5 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-[#10235c] transition hover:bg-blue-50"
          >
            {copied ? "已複製確認文字" : "複製確認文字"}
          </button>
        </div>
      </div>
    </section>
  )
}

function LineBotSection({ activeBot, setActiveBot }) {
  const active = botCommands[activeBot]

  return (
    <section id="line-bot" className="py-16">
      <SectionHeader
        eyebrow="LINE Bot Flow"
        title="工程現場不一定想登入後台，但一定會用 LINE。"
        desc="所以 BuildFlow 的商業版本可以先從 LINE Bot 開始，讓現場用自然語句新增案件、查詢案件、查廠商與建立追加項。"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid gap-3">
          {botCommands.map((item, index) => (
            <button
              key={item.tag}
              onClick={() => setActiveBot(index)}
              className={`rounded-[1.5rem] border p-4 text-left transition ${
                activeBot === index
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
              }`}
            >
              <p className="text-sm font-black">{item.tag}</p>
              <p className={`mt-2 text-sm leading-6 ${activeBot === index ? "text-white/68" : "text-slate-500"}`}>
                {item.user}
              </p>
            </button>
          ))}
        </div>

        <div className="rounded-[2rem] bg-[#10235c] p-5 text-white shadow-2xl shadow-slate-900/10">
          <div className="rounded-[1.5rem] bg-white p-4 text-slate-950">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-green-500 text-lg font-black text-white">
                B
              </div>
              <div>
                <p className="font-black">BuildFlow Bot</p>
                <p className="text-xs font-bold text-green-600">online</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="ml-auto max-w-[86%] rounded-[1.2rem] bg-green-500 px-4 py-3 text-sm font-bold leading-6 text-white">
                {active.user}
              </div>

              <div className="max-w-[88%] rounded-[1.2rem] bg-slate-100 px-4 py-3 text-sm font-bold leading-7 text-slate-800">
                {active.bot}
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/60">
            這是概念 Demo。第一版可用假資料展示，商業版再依需求串 Google Sheet、後台或資料庫。
          </p>
        </div>
      </div>
    </section>
  )
}

function VendorSection() {
  return (
    <section className="py-16">
      <SectionHeader
        eyebrow="Vendor Lookup"
        title="查廠商電話不該再翻半年前的 LINE。"
        desc="把師傅、工種、電話、合作地區與備註集中起來，現場要找人時可以快速查。"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {vendors.map((vendor) => (
          <div key={vendor.name} className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
            <p className="text-sm font-black text-blue-600">{vendor.trade}</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">{vendor.name}</h3>
            <p className="mt-3 font-black text-slate-700">{vendor.phone}</p>
            <p className="mt-2 text-sm font-bold text-slate-500">{vendor.area}</p>
            <p className="mt-4 leading-7 text-slate-600">{vendor.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FlowSection() {
  return (
    <section className="py-16">
      <SectionHeader
        eyebrow="Data Flow"
        title="從 LINE 指令到後台總覽，把資料流變簡單。"
        desc="第一版不追求大型系統，而是先把最常發生、最容易出錯、最需要被查詢的流程做成 MVP。"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {flowSteps.map((step, index) => (
          <div key={step.title} className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
            <p className="text-sm font-black text-blue-600">STEP {index + 1}</p>
            <h3 className="mt-4 text-xl font-black">{step.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FieldStorySection() {
  return (
    <section className="py-16">
      <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-slate-900/5 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              Field Background
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] md:text-6xl">
              這個系統案不是憑空想像。
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              你有工地現場與工程行接觸經驗，也做過 LINE Bot 與 API 串接。這讓 BuildFlow 比一般純後台 Demo 更有真實產業感。
            </p>
          </div>

          <div className="grid gap-4">
            {fieldExperience.map((item, index) => (
              <div key={item} className="rounded-[1.5rem] bg-slate-50 p-5">
                <p className="text-sm font-black text-blue-600">0{index + 1}</p>
                <p className="mt-3 leading-8 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-5xl text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-3xl leading-8 text-slate-600">{desc}</p>}
    </div>
  )
}

function StatusBadge({ status, tone }) {
  const toneClass = {
    blue: "bg-blue-50 text-blue-700",
    red: "bg-rose-50 text-rose-700",
    yellow: "bg-amber-50 text-amber-700",
    green: "bg-emerald-50 text-emerald-700",
  }[tone]

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${toneClass}`}>
      {status}
    </span>
  )
}

function RiskBadge({ risk }) {
  const toneClass =
    risk === "紅燈"
      ? "bg-rose-50 text-rose-700"
      : risk === "黃燈"
        ? "bg-amber-50 text-amber-700"
        : "bg-emerald-50 text-emerald-700"

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${toneClass}`}>{risk}</span>
}

function MiniStat({ label, value, tone = "blue" }) {
  const toneClass = tone === "red" ? "text-rose-700" : "text-blue-700"

  return (
    <div className="rounded-[1.3rem] bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-2 text-xl font-black ${toneClass}`}>{value}</p>
    </div>
  )
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute right-[-180px] top-[-180px] h-[520px] w-[520px] rounded-full bg-blue-200/45 blur-[130px]" />
      <div className="absolute bottom-[-220px] left-[-160px] h-[520px] w-[520px] rounded-full bg-amber-200/35 blur-[130px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>
  )
}

function formatMoney(number) {
  return new Intl.NumberFormat("zh-TW").format(number)
}

export default ContractorSystemDemo