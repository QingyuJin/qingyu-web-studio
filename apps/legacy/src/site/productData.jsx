/* eslint-disable react-refresh/only-export-components */
import { useEffect, useMemo, useState } from "react"

/* ---------- shared mock frames ---------- */

function Chrome({ label = "example.com", tone = "light", children }) {
  const dark = tone === "dark"
  return (
    <div className={`overflow-hidden rounded-xl border ${dark ? "border-white/10 bg-[#0f1518]" : "border-[#e3ded3] bg-white"} shadow-sm`}>
      <div className={`flex items-center gap-2 border-b px-3 py-2 ${dark ? "border-white/10 bg-[#141c20]" : "border-[#eee9df] bg-[#f6f3ec]"}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#f0655c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f4c15f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#69cf7d]" />
        <span className={`ml-2 truncate rounded-md px-3 py-0.5 text-[11px] font-black ${dark ? "bg-white/8 text-white/55" : "bg-white text-[#8a938f]"}`}>
          {label}
        </span>
      </div>
      <div className={`${dark ? "text-white" : "text-[#111c22]"}`}>{children}</div>
    </div>
  )
}

function Phone({ children }) {
  return (
    <div className="mx-auto w-full max-w-[300px] rounded-[2rem] border border-[#e3ded3] bg-[#111c22] p-2.5 shadow-xl">
      <div className="overflow-hidden rounded-[1.5rem] bg-[#e8f0ea]">
        <div className="flex items-center justify-between bg-[#06c755] px-4 py-2 text-[11px] font-black text-white">
          <span>{"< "}官方帳號</span>
          <span>⋯</span>
        </div>
        {children}
      </div>
    </div>
  )
}

function statusPill(status) {
  const map = {
    新訂單: "bg-[#eef2ff] text-[#3d54c4]",
    已出貨: "bg-[#e9f5ec] text-[#2f7a3f]",
    處理中: "bg-[#fff2d9] text-[#a4701a]",
    待報價: "bg-[#fff2d9] text-[#a4701a]",
    已聯絡: "bg-[#e9f5ec] text-[#2f7a3f]",
    新詢問: "bg-[#eef2ff] text-[#3d54c4]",
    完成: "bg-[#e9f5ec] text-[#2f7a3f]",
  }
  return map[status] || "bg-[#f0f0ee] text-[#66716d]"
}

/* ---------- 1. company landing ---------- */

function CompanyFront() {
  return (
    <Chrome label="www.your-brand.com">
      <div className="bg-white">
        <div className="flex items-center justify-between border-b border-[#eee9df] px-4 py-3">
          <span className="text-sm font-black">你的品牌</span>
          <div className="hidden gap-4 text-[11px] font-black text-[#66716d] sm:flex">
            <span>服務</span>
            <span>案例</span>
            <span>聯絡</span>
          </div>
          <span className="rounded-md bg-[#111c22] px-3 py-1 text-[11px] font-black text-white">聯絡我們</span>
        </div>
        <div className="bg-[#faf8f3] px-5 py-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0d6b62]">Professional Service</p>
          <h4 className="mt-3 font-['Noto_Serif_TC',serif] text-2xl font-black leading-snug">把專業 說成客戶聽得懂的樣子</h4>
          <p className="mx-auto mt-3 max-w-xs text-xs font-bold leading-6 text-[#66716d]">一頁講清楚你是誰、提供什麼、為什麼值得信任</p>
          <span className="mt-4 inline-flex rounded-lg bg-[#111c22] px-5 py-2 text-xs font-black text-white">預約諮詢</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4">
          {["服務項目", "成功案例", "團隊介紹"].map((t) => (
            <div key={t} className="rounded-lg border border-[#eadfd1] bg-[#f6efe4] p-3 text-center text-[11px] font-black text-[#5b6663]">
              {t}
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

function CompanyBack() {
  return (
    <Chrome label="admin · 內容管理" tone="dark">
      <div className="grid grid-cols-[80px_1fr] gap-0">
        <div className="border-r border-white/10 p-2 text-[10px] font-black text-white/60">
          {["首頁", "服務", "案例", "聯絡"].map((t, i) => (
            <p key={t} className={`rounded-md px-2 py-2 ${i === 0 ? "bg-[#eac46f] text-[#111c22]" : ""}`}>{t}</p>
          ))}
        </div>
        <div className="p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#eac46f]">編輯首頁</p>
          <div className="mt-3 grid gap-2">
            <div>
              <p className="text-[10px] font-bold text-white/45">主標題</p>
              <div className="mt-1 rounded-md border border-white/12 bg-white/8 px-2.5 py-1.5 text-[11px] font-black">把專業 說成客戶聽得懂的樣子</div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-white/45">副標</p>
              <div className="mt-1 rounded-md border border-white/12 bg-white/8 px-2.5 py-1.5 text-[11px] font-bold text-white/80">一頁講清楚你是誰、提供什麼⋯</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-md bg-[#eac46f] px-3 py-1.5 text-[11px] font-black text-[#111c22]">儲存並發布</span>
            <span className="rounded-full bg-[#69cf7d]/18 px-2 py-1 text-[10px] font-black text-[#8fe0a1]">● 已發布</span>
          </div>
        </div>
      </div>
    </Chrome>
  )
}

/* ---------- 2. ecommerce ---------- */

function ShopFront() {
  const items = [
    ["職人手沖濾掛", "NT$320", "/demo-products/drip-coffee-bag.svg"],
    ["莊園咖啡豆", "NT$580", "/demo-products/coffee-beans.svg"],
    ["冷萃瓶裝", "NT$150", "/demo-products/cold-brew-bottle.svg"],
    ["禮盒組", "NT$880", "/demo-products/coffee-gift-box.svg"],
  ]
  return (
    <Chrome label="shop.your-store.com">
      <div className="bg-white">
        <div className="flex items-center justify-between border-b border-[#eee9df] px-4 py-2.5">
          <span className="text-sm font-black">你的商店</span>
          <span className="rounded-full bg-[#111c22] px-3 py-1 text-[11px] font-black text-white">🛒 2</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3">
          {items.map(([name, price, image]) => (
            <div key={name} className="rounded-lg border border-[#eadfd1] bg-white p-2">
              <img src={image} alt={name} loading="lazy" className="aspect-[4/3] w-full rounded-md bg-[#f6efe4] object-cover" />
              <p className="mt-2 text-[11px] font-black">{name}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-[11px] font-black text-[#b5651d]">{price}</span>
                <span className="rounded-md bg-[#111c22] px-2 py-1 text-[10px] font-black text-white">加入</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

function ShopBack() {
  const orders = [
    ["#1042", "陳先生", "NT$900", "新訂單"],
    ["#1041", "林小姐", "NT$1,460", "處理中"],
    ["#1040", "王先生", "NT$580", "已出貨"],
  ]
  return (
    <Chrome label="admin · 訂單管理" tone="dark">
      <div className="p-3">
        <div className="grid grid-cols-3 gap-2">
          {[["今日訂單", "12"], ["待出貨", "5"], ["今日營收", "NT$8,640"]].map(([l, v]) => (
            <div key={l} className="rounded-lg border border-white/10 bg-white/6 p-2">
              <p className="text-[10px] font-bold text-white/45">{l}</p>
              <p className="mt-0.5 text-base font-black text-[#eac46f]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
          {orders.map(([id, name, amt, status]) => (
            <div key={id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-white/8 px-3 py-2 last:border-0">
              <span className="font-mono text-[11px] font-black text-white/70">{id}</span>
              <span className="text-[11px] font-black">{name} · {amt}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${statusPill(status)}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  )
}

/* ---------- 3. assessment (interactive) ---------- */

const assessmentQuestions = [
  {
    id: "q1",
    type: "single",
    dim: "數位化",
    title: "你的品牌目前主要靠什麼被看見？",
    options: [
      ["只有口碑與名片", 20],
      ["社群（FB / IG）", 55],
      ["有官網或線上型錄", 85],
      ["官網＋廣告＋SEO", 100],
    ],
  },
  {
    id: "q2",
    type: "multi",
    dim: "工具",
    title: "你已經在用哪些線上工具？（可複選）",
    options: [
      ["官方網站", 25],
      ["LINE 官方帳號", 25],
      ["線上表單 / 預約", 25],
      ["後台 / 訂單管理", 25],
    ],
  },
  {
    id: "q3",
    type: "scale",
    dim: "流程",
    title: "客戶從詢問到成交 資料整理的順暢程度？",
    hint: "1＝很亂 常漏訊息　5＝很順 全部追得到",
  },
  {
    id: "q4",
    type: "scale",
    dim: "行銷",
    title: "你對目前的客戶開發與回購狀況滿意嗎？",
    hint: "1＝很被動　5＝有穩定來源",
  },
]

function Radar({ scores }) {
  const dims = Object.keys(scores)
  const n = dims.length
  const cx = 90
  const cy = 88
  const r = 62
  const point = (i, value) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    const rr = (value / 100) * r
    return [cx + rr * Math.cos(angle), cy + rr * Math.sin(angle)]
  }
  const axis = (i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
  }
  const poly = dims.map((d, i) => point(i, scores[d]).join(",")).join(" ")
  return (
    <svg viewBox="0 0 180 176" className="w-full max-w-[240px]">
      {[0.33, 0.66, 1].map((f) => (
        <polygon
          key={f}
          points={dims.map((_, i) => {
            const [x, y] = axis(i)
            return [cx + (x - cx) * f, cy + (y - cy) * f].join(",")
          }).join(" ")}
          fill="none"
          stroke="#e3ded3"
          strokeWidth="1"
        />
      ))}
      {dims.map((d, i) => {
        const [x, y] = axis(i)
        return <line key={d} x1={cx} y1={cy} x2={x} y2={y} stroke="#e3ded3" strokeWidth="1" />
      })}
      <polygon points={poly} fill="rgba(13,107,98,0.18)" stroke="#0d6b62" strokeWidth="2" />
      {dims.map((d, i) => {
        const [x, y] = axis(i)
        const lx = cx + (x - cx) * 1.22
        const ly = cy + (y - cy) * 1.22
        return (
          <text key={d} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="900" fill="#5b6663">
            {d}
          </text>
        )
      })}
    </svg>
  )
}

function AssessmentDemo() {
  const [step, setStep] = useState(0) // 0=info, 1..n=questions, then result
  const [info, setInfo] = useState({ name: "", email: "" })
  const [answers, setAnswers] = useState({})
  const total = assessmentQuestions.length

  const scores = useMemo(() => {
    const s = { 數位化: 0, 工具: 0, 流程: 0, 行銷: 0 }
    assessmentQuestions.forEach((q) => {
      const a = answers[q.id]
      if (a === undefined) return
      if (q.type === "single") s[q.dim] = a
      if (q.type === "multi") {
        const picked = a || []
        s[q.dim] = Math.min(
          100,
          q.options.filter(([label]) => picked.includes(label)).reduce((sum, [, v]) => sum + v, 0)
        )
      }
      if (q.type === "scale") s[q.dim] = a * 20
    })
    return s
  }, [answers])

  const totalScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4)
  const tier = totalScore >= 75 ? ["成熟型", "數位基礎穩 適合強化行銷與回購"] : totalScore >= 45 ? ["發展型", "有基礎 補齊官網或後台就能明顯升級"] : ["打底型", "先把官網與聯絡入口做起來 效益最快"]

  function setSingle(q, value) {
    setAnswers((c) => ({ ...c, [q.id]: value }))
  }
  function toggleMulti(q, label) {
    setAnswers((c) => {
      const cur = c[q.id] || []
      return { ...c, [q.id]: cur.includes(label) ? cur.filter((v) => v !== label) : [...cur, label] }
    })
  }

  const inQuestions = step >= 1 && step <= total
  const q = inQuestions ? assessmentQuestions[step - 1] : null
  const answered = q ? (q.type === "multi" ? (answers[q.id] || []).length > 0 : answers[q.id] !== undefined) : true

  return (
    <Chrome label="assessment.your-brand.com">
      <div className="bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0d6b62]">數位健檢測驗</p>
          <span className="text-[10px] font-black text-[#8a938f]">
            {step === 0 ? "基本資料" : step > total ? "完成" : `第 ${step} / ${total} 題`}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eee9df]">
          <div className="h-full rounded-full bg-[#0d6b62] transition-all" style={{ width: `${(Math.min(step, total) / total) * 100}%` }} />
        </div>

        {step === 0 ? (
          <div className="mt-4">
            <h4 className="text-base font-black">先留下基本資料 開始測驗</h4>
            <div className="mt-3 grid gap-2">
              <input
                value={info.name}
                onChange={(e) => setInfo((c) => ({ ...c, name: e.target.value }))}
                placeholder="姓名 / 公司"
                className="min-h-10 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 text-xs font-bold outline-none focus:border-[#0d6b62]"
              />
              <input
                value={info.email}
                onChange={(e) => setInfo((c) => ({ ...c, email: e.target.value }))}
                placeholder="Email"
                className="min-h-10 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 text-xs font-bold outline-none focus:border-[#0d6b62]"
              />
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-3 min-h-10 w-full rounded-lg bg-[#111c22] text-xs font-black text-white"
            >
              開始測驗
            </button>
          </div>
        ) : null}

        {inQuestions ? (
          <div className="mt-4">
            <h4 className="text-sm font-black leading-relaxed">{q.title}</h4>
            {q.hint ? <p className="mt-1 text-[10px] font-bold text-[#8a938f]">{q.hint}</p> : null}

            {q.type === "single" ? (
              <div className="mt-3 grid gap-2">
                {q.options.map(([label, value]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setSingle(q, value)}
                    className={`min-h-10 rounded-lg border px-3 text-left text-xs font-black ${answers[q.id] === value ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62]" : "border-[#e3ded3] bg-white"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : null}

            {q.type === "multi" ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {q.options.map(([label]) => {
                  const on = (answers[q.id] || []).includes(label)
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleMulti(q, label)}
                      className={`min-h-10 rounded-lg border px-3 text-xs font-black ${on ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62]" : "border-[#e3ded3] bg-white"}`}
                    >
                      {on ? "✓ " : ""}{label}
                    </button>
                  )
                })}
              </div>
            ) : null}

            {q.type === "scale" ? (
              <div className="mt-3 flex justify-between gap-1.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSingle(q, v)}
                    className={`grid h-10 flex-1 place-items-center rounded-lg border text-xs font-black ${answers[q.id] === v ? "border-[#0d6b62] bg-[#0d6b62] text-white" : "border-[#e3ded3] bg-white"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="min-h-10 rounded-lg border border-[#e3ded3] px-4 text-xs font-black text-[#66716d]"
              >
                上一步
              </button>
              <button
                type="button"
                disabled={!answered}
                onClick={() => setStep((s) => s + 1)}
                className="min-h-10 flex-1 rounded-lg bg-[#111c22] text-xs font-black text-white disabled:opacity-40"
              >
                {step === total ? "看結果報告" : "下一題"}
              </button>
            </div>
          </div>
        ) : null}

        {step > total ? (
          <div className="mt-4">
            <div className="flex items-center justify-between rounded-xl bg-[#111c22] p-4 text-white">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#8fd6cc]">你的數位化分數</p>
                <p className="mt-1 text-4xl font-black">{totalScore}<span className="text-base text-white/50"> / 100</span></p>
                <p className="mt-1 text-xs font-black text-[#eac46f]">{tier[0]}</p>
              </div>
              <div className="w-28"><Radar scores={scores} /></div>
            </div>
            <p className="mt-3 rounded-lg bg-[#faf8f3] p-3 text-xs font-bold leading-6 text-[#52605c]">
              {info.name ? `${info.name} ` : ""}{tier[1]}報告已同步到後台填答紀錄
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Object.entries(scores).map(([d, v]) => (
                <div key={d} className="rounded-lg border border-[#e3ded3] bg-white p-2">
                  <p className="text-[10px] font-black text-[#8a938f]">{d}</p>
                  <p className="text-sm font-black text-[#0d6b62]">{v} 分</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => { setStep(0); setAnswers({}) }}
              className="mt-3 min-h-10 w-full rounded-lg border border-[#e3ded3] text-xs font-black text-[#66716d]"
            >
              重新測驗
            </button>
          </div>
        ) : null}
      </div>
    </Chrome>
  )
}

function AssessmentBack() {
  const [toast, setToast] = useState("")
  const rows = [
    ["陳先生", "82", "成熟型", "07-06"],
    ["林小姐", "58", "發展型", "07-06"],
    ["王先生", "34", "打底型", "07-05"],
    ["張太太", "61", "發展型", "07-05"],
  ]
  return (
    <Chrome label="admin · 填答紀錄" tone="dark">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#eac46f]">填答紀錄</p>
          <button
            type="button"
            onClick={() => { setToast("已匯出 assessment_records.xlsx（示範）"); window.setTimeout(() => setToast(""), 1800) }}
            className="rounded-md bg-[#69cf7d] px-2.5 py-1 text-[10px] font-black text-[#0b2a15]"
          >
            匯出 Excel
          </button>
        </div>
        <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 border-b border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-white/45">
            <span>填答人</span><span>分數</span><span>分級</span><span>日期</span>
          </div>
          {rows.map((r) => (
            <div key={r[0]} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 border-b border-white/8 px-3 py-2 text-[11px] font-black last:border-0">
              <span>{r[0]}</span>
              <span className="text-[#eac46f]">{r[1]}</span>
              <span className="text-white/70">{r[2]}</span>
              <span className="text-white/40">{r[3]}</span>
            </div>
          ))}
        </div>
        {toast ? <p className="mt-2 rounded-md bg-[#69cf7d]/18 px-3 py-2 text-[10px] font-black text-[#8fe0a1]">{toast}</p> : null}
      </div>
    </Chrome>
  )
}

/* ---------- 4. line bot ---------- */

function LineFront() {
  return (
    <Phone>
      <div className="min-h-[280px] space-y-2 p-3">
        <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-sm bg-[#06c755] px-3 py-2 text-[11px] font-bold text-white">
          請問營業時間？
        </div>
        <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] font-bold text-[#333]">
          您好！營業時間為 週一至週六 10:00–20:00 週日公休 🙌
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["預約", "價目表", "地址", "真人客服"].map((t) => (
            <span key={t} className="rounded-full border border-[#06c755]/50 bg-white px-2.5 py-1 text-[10px] font-black text-[#06a548]">{t}</span>
          ))}
        </div>
        <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-[#06c755] px-3 py-2 text-[11px] font-bold text-white">預約</div>
        <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[11px] font-bold text-[#333]">
          好的 請問想預約哪一天呢？我幫您記錄到後台 📝
        </div>
      </div>
    </Phone>
  )
}

function LineBack() {
  const rules = [
    ["營業時間 / 幾點", "回覆營業時間"],
    ["預約 / 訂位", "啟動預約流程"],
    ["價格 / 多少", "回覆價目表"],
    ["地址 / 在哪", "回覆地圖連結"],
  ]
  return (
    <Chrome label="admin · 自動回覆規則" tone="dark">
      <div className="p-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#eac46f]">關鍵字規則</p>
        <div className="mt-3 grid gap-2">
          {rules.map(([kw, action]) => (
            <div key={kw} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border border-white/10 bg-white/6 px-3 py-2">
              <span className="text-[11px] font-black">{kw}</span>
              <span className="text-white/30">→</span>
              <span className="text-right text-[11px] font-bold text-[#8fd6cc]">{action}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-[#eac46f]/30 bg-[#eac46f]/10 px-3 py-2 text-[10px] font-black text-[#eac46f]">
          🔔 收到 1 筆預約需求 已進收件匣
        </div>
      </div>
    </Chrome>
  )
}

/* ---------- 5. CRM (interactive) ---------- */

const crmStatusFlow = { "新詢問": "已聯絡", "已聯絡": "成交", "成交": "新詢問" }

const crmStore = { records: [
  { id: 1, name: "林小姐", source: "官網表單", status: "新詢問" },
  { id: 2, name: "陳先生", source: "LINE", status: "已聯絡" },
  { id: 3, name: "王先生", source: "FB 私訊", status: "待報價" },
], nextId: 4, listeners: new Set() }

function useCrmStore() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const fn = () => setTick((t) => t + 1)
    crmStore.listeners.add(fn)
    return () => crmStore.listeners.delete(fn)
  }, [])
}

function CrmFront() {
  useCrmStore()
  const [fields, setFields] = useState({ name: "", contact: "", type: "", message: "" })
  const [sent, setSent] = useState(false)

  function update(k, v) { setFields((f) => ({ ...f, [k]: v })) }

  function submit(e) {
    e.preventDefault()
    if (!fields.name.trim()) return
    crmStore.records.push({
      id: crmStore.nextId++,
      name: fields.name,
      source: fields.type || "官網表單",
      status: "新詢問",
    })
    crmStore.listeners.forEach((fn) => fn())
    setFields({ name: "", contact: "", type: "", message: "" })
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <Chrome label="form.your-brand.com/contact">
      <div className="bg-white p-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#0d6b62]">聯絡我們</p>
        <h4 className="mt-2 text-base font-black">留下需求 我們主動與你聯絡</h4>
        <form onSubmit={submit} className="mt-3 grid gap-2">
          <input value={fields.name} onChange={(e) => update("name", e.target.value)} placeholder="姓名" className="min-h-10 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 text-xs font-bold outline-none focus:border-[#0d6b62]" />
          <input value={fields.contact} onChange={(e) => update("contact", e.target.value)} placeholder="電話 / LINE" className="min-h-10 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 text-xs font-bold outline-none focus:border-[#0d6b62]" />
          <input value={fields.type} onChange={(e) => update("type", e.target.value)} placeholder="需求類型（選填）" className="min-h-10 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 text-xs font-bold outline-none focus:border-[#0d6b62]" />
          <textarea value={fields.message} onChange={(e) => update("message", e.target.value)} placeholder="想詢問的內容⋯" className="min-h-20 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 py-2 text-xs font-bold outline-none focus:border-[#0d6b62]" />
          <button type="submit" className="min-h-10 rounded-lg bg-[#111c22] text-xs font-black text-white transition hover:bg-[#2a3a42]">送出需求</button>
          {sent ? <p className="text-center text-[10px] font-black text-[#0d6b62]">✓ 已送出 可到後台查看</p> : null}
        </form>
        <div className="mt-3 rounded-lg bg-[#eef7f4] px-3 py-2 text-[10px] font-bold text-[#0d6b62]">
          ＊目前 {crmStore.records.length} 筆紀錄（可送出測試）
        </div>
      </div>
    </Chrome>
  )
}

function CrmBack() {
  useCrmStore()
  const [filter, setFilter] = useState("全部")

  const statuses = ["全部", "新詢問", "已聯絡", "成交", "待報價"]
  const filtered = filter === "全部" ? crmStore.records : crmStore.records.filter((r) => r.status === filter)

  function toggleStatus(id) {
    const r = crmStore.records.find((r) => r.id === id)
    if (r && crmStatusFlow[r.status]) r.status = crmStatusFlow[r.status]
    crmStore.listeners.forEach((fn) => fn())
  }

  function removeRecord(id) {
    crmStore.records = crmStore.records.filter((r) => r.id !== id)
    crmStore.listeners.forEach((fn) => fn())
  }

  return (
    <Chrome label="admin · 客戶管理 CRM" tone="dark">
      <div className="p-3">
        <div className="flex gap-1.5">
          {statuses.map((t) => (
            <button key={t} type="button" onClick={() => setFilter(t)}
              className={`rounded-full px-2.5 py-1 text-[10px] font-black transition ${t === filter ? "bg-[#eac46f] text-[#111c22]" : "bg-white/8 text-white/55 hover:bg-white/15"}`}
            >{t}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-6 text-center text-[11px] font-bold text-white/40">尚無此狀態的客戶</p>
        ) : (
          <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
            <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 border-b border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-white/45">
              <span>客戶</span><span>來源</span><span>狀態</span><span />
            </div>
            {filtered.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-2 border-b border-white/8 px-3 py-2 text-[11px] font-black last:border-0">
                <span>{r.name}</span>
                <span className="text-white/60">{r.source}</span>
                <button type="button" onClick={() => toggleStatus(r.id)}
                  className={`rounded-full px-2 py-0.5 text-[10px] transition hover:opacity-80 ${statusPill(r.status)}`}
                >{r.status} {crmStatusFlow[r.status] ? "→" : ""}</button>
                <button type="button" onClick={() => removeRecord(r.id)} className="text-[10px] text-white/30 hover:text-red-400">✕</button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-[10px] font-bold text-white/30">點擊狀態切換：新詢問 → 已聯絡 → 成交</p>
      </div>
    </Chrome>
  )
}

/* ---------- 6. contractor (interactive) ---------- */

const contractorCols = ["詢價", "報價", "施工", "完成"]
const contractorNextCol = { "詢價": "報價", "報價": "施工", "施工": "完成", "完成": "詢價" }

const contractorStore = { cards: {
  詢價: ["浴室防水", "外牆抓漏"],
  報價: ["店面地坪"],
  施工: ["透天翻新"],
  完成: ["磁磚修補"],
}, listeners: new Set() }

const serviceDetails = {
  "防水抓漏": "屋頂、外牆、浴室、陽台各類防水施工與抓漏檢測 使用 PU、彈性水泥、防水砂漿等材料",
  "地坪工程": "Epoxy 環氧樹脂地坪、金剛砂地坪、硬化地坪、停車場與廠房地坪規劃",
  "泥作磁磚": "磁磚鋪貼、抿石子、洗石子、清水模、磚牆砌築、水泥粉光等各類泥作工程",
}

function useContractorStore() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const fn = () => setTick((t) => t + 1)
    contractorStore.listeners.add(fn)
    return () => contractorStore.listeners.delete(fn)
  }, [])
}

function ContractorFront() {
  const [expanded, setExpanded] = useState(null)
  const [inquiry, setInquiry] = useState("")

  return (
    <Chrome label="www.your-service.com">
      <div className="bg-white">
        <div className="bg-[#10242a] px-5 py-7 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#8bd8cc]">工程 / 服務業</p>
          <h4 className="mt-2 font-['Noto_Serif_TC',serif] text-xl font-black">現場評估後 實在報價</h4>
          <span className="mt-3 inline-flex rounded-lg bg-[#f0c36a] px-4 py-2 text-[11px] font-black text-[#10242a]">線上詢價</span>
        </div>
        <div className="grid gap-2 p-3">
          {["防水抓漏", "地坪工程", "泥作磁磚"].map((t) => (
            <div key={t} className="overflow-hidden rounded-lg border border-[#eadfd1] bg-[#f6efe4]">
              <button
                type="button"
                onClick={() => setExpanded(expanded === t ? null : t)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left"
              >
                <span className="text-[11px] font-black text-[#5b6663]">{t}</span>
                <span className="text-[10px] font-black text-[#8a938f] transition duration-200" style={{ transform: expanded === t ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
              </button>
              {expanded === t ? (
                <div className="border-t border-[#eadfd1] bg-white px-3 py-2.5">
                  <p className="text-[10px] font-bold leading-5 text-[#66716d]">{serviceDetails[t]}</p>
                  <span className="mt-2 inline-flex rounded-md bg-[#10242a] px-2.5 py-1 text-[10px] font-black text-white">詢問此服務</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        <div className="border-t border-[#eee9df] p-3">
          <p className="text-[10px] font-bold text-[#8a938f]">快速詢價</p>
          <div className="mt-2 flex gap-2">
            <input value={inquiry} onChange={(e) => setInquiry(e.target.value)} placeholder="輸入需求⋯" className="min-h-9 flex-1 rounded-lg border border-[#e3ded3] bg-[#faf8f3] px-3 text-[11px] font-bold outline-none focus:border-[#0d6b62]" />
            <button type="button" onClick={() => { if (inquiry.trim()) { setInquiry(""); contractorStore.cards["詢價"].push(inquiry.trim()); contractorStore.listeners.forEach((fn) => fn()) }}}
              className="min-h-9 rounded-lg bg-[#10242a] px-3 text-[11px] font-black text-white">送出</button>
          </div>
        </div>
      </div>
    </Chrome>
  )
}

function ContractorBack() {
  useContractorStore()
  const [highlight, setHighlight] = useState(null)

  function advanceCard(col, cardName) {
    const idx = contractorStore.cards[col].indexOf(cardName)
    if (idx === -1) return
    contractorStore.cards[col].splice(idx, 1)
    const next = contractorNextCol[col]
    contractorStore.cards[next].push(cardName)
    setHighlight({ col: next, name: cardName })
    setTimeout(() => setHighlight(null), 1200)
    contractorStore.listeners.forEach((fn) => fn())
  }

  return (
    <Chrome label="admin · 案件看板" tone="dark">
      <div className="grid grid-cols-4 gap-2 p-3">
        {contractorCols.map((title) => (
          <div key={title} className="rounded-lg bg-white/5 p-1.5">
            <p className="px-1 pb-1.5 text-[10px] font-black text-white/50">{title}（{contractorStore.cards[title].length}）</p>
            <div className="grid gap-1.5">
              {contractorStore.cards[title].map((c) => {
                const isHighlighted = highlight && highlight.col === title && highlight.name === c
                return (
                  <button
                    key={c + title}
                    type="button"
                    onClick={() => advanceCard(title, c)}
                    className={`w-full rounded-md border px-2 py-1.5 text-left text-[10px] font-black transition duration-300 ${
                      isHighlighted ? "border-[#eac46f] bg-[#eac46f]/20 text-[#eac46f] scale-105" : "border-white/10 bg-white/8 hover:border-white/25 hover:bg-white/12"
                    }`}
                  >
                    {c}
                    <span className="ml-1 text-[9px] text-white/30">{contractorNextCol[title] !== title ? `→ ${contractorNextCol[title]}` : ""}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="px-3 pb-2 text-[9px] font-bold text-white/25">點擊卡片推進階段：詢價 → 報價 → 施工 → 完成</p>
    </Chrome>
  )
}

/* ---------- catalog ---------- */

export const products = {
  "company-landing": {
    name: "公司一頁式官網",
    tagline: "一頁講清楚你是誰 做什麼 怎麼聯絡",
    forWho: "新公司、工作室、專業服務、想要正式門面的店家",
    solves: "只有 FB / IG 或名片 客戶搜不到你、也看不懂你在做什麼",
    priceFrom: "12,000 元起",
    priceRange: "12,000–20,000 元",
    duration: "5–10 天",
    live: { path: "/works/biomed-brand-site", label: "看生醫品牌官網成品" },
    Front: CompanyFront,
    Back: CompanyBack,
    overview: [
      "把公司的專業 濃縮成一頁就能看懂的品牌門面訪客不用滑很久 就知道你是誰、能幫他解決什麼、怎麼聯絡你",
      "含品牌 Hero、服務介紹、案例或特色、聯絡 CTA 與手機版 RWD 並可自行更新內容",
    ],
    features: ["品牌 Hero 主視覺", "服務 / 特色介紹", "案例或見證", "聯絡表單與 CTA", "手機版 RWD", "基本 SEO 與分享預覽"],
    flow: [
      ["訪客進站", "從搜尋、名片 QR、社群連結進到官網"],
      ["快速理解", "一頁看懂服務、信任感與聯絡方式"],
      ["主動聯絡", "點擊 CTA 或表單 直接找到你"],
    ],
    tech: ["React / Vite", "Tailwind CSS", "RWD 響應式", "SEO / Open Graph", "Vercel 部署"],
    pricing: [
      ["基本一頁式", "12,000 元起", "單頁、素材齊全、修改 1–2 次"],
      ["加內容區塊 / 多語系", "＋3,000 元起", "每增加主要區塊或語系"],
      ["內容自行編輯後台", "＋8,000 元起", "可自己改文字與圖片"],
    ],
  },
  "ecommerce-ordering": {
    name: "電商 / 商品訂購系統",
    tagline: "商品 購物車 訂單與出貨狀態 一套顧好",
    forWho: "小型電商、食品 / 農產、批發商、想線上收單的店家",
    solves: "訂單靠 LINE、私訊和手寫記 容易漏單、算錯、對帳累",
    priceFrom: "25,000 元起",
    priceRange: "25,000 元起",
    duration: "14–25 天",
    live: { path: "/works/wholesale-ordering", label: "直接操作批發訂貨系統" },
    Front: ShopFront,
    Back: ShopBack,
    overview: [
      "從商品展示、購物車到送出訂單 客戶在手機上就能下單；老闆在後台看訂單、改狀態、對帳 不再靠訊息一筆筆記",
      "可依規模做成一般電商 或 B2B 批發（客戶分級報價、月結對帳）",
    ],
    features: ["商品列表與分類", "購物車與結帳", "訂單後台管理", "出貨狀態流程", "分級報價 / 月結（B2B）", "營收與訂單統計"],
    flow: [
      ["客戶下單", "手機瀏覽商品、加入購物車、送出訂單"],
      ["進入後台", "訂單即時進管理後台 含品項與金額"],
      ["處理出貨", "改狀態、備貨、出貨 客戶可查進度"],
      ["對帳結算", "彙整訂單金額 月結或匯出"],
    ],
    tech: ["React / Vite", "Tailwind CSS", "Supabase / 資料庫", "Serverless API", "Vercel 部署"],
    pricing: [
      ["基本訂購系統", "25,000 元起", "商品、購物車、訂單後台"],
      ["B2B 批發版", "35,000 元起", "分級報價、出貨修量、月結對帳"],
      ["金流 / 物流串接", "依需求估價", "綠界 / 藍新 / 超商等"],
    ],
  },
  "assessment-system": {
    name: "互動測驗 / 問卷評分系統",
    interactive: true,
    tagline: "線上測驗 自動計分 結果報告與後台紀錄",
    forWho: "教育訓練、顧問、講師、活動導流、想收名單的品牌",
    solves: "測驗散在紙本或表單 算分靠人工 也留不下客戶名單",
    priceFrom: "6,000 元起",
    priceRange: "6,000–15,000 元",
    duration: "3–8 天",
    live: { path: "/works/interactive-quiz", label: "看另一款測驗成品" },
    Front: AssessmentDemo,
    Back: AssessmentBack,
    overview: [
      "右邊就是真的可以作答的測驗：填基本資料、單選 / 多選 / 量表題、自動計分 最後產生分數卡與雷達圖結果報告",
      "每一筆填答都會進後台紀錄 可統計、可匯出 Excel 很適合當作收名單與導流工具",
    ],
    features: ["基本資料填寫", "單選 / 多選 / 量表題", "自動計分", "結果報告與分數卡", "雷達圖視覺化", "後台填答紀錄與 Excel 匯出"],
    flow: [
      ["填寫測驗", "留基本資料、逐題作答"],
      ["自動計分", "依權重即時算出各維度分數"],
      ["結果報告", "分數卡 + 雷達圖 + 建議"],
      ["後台收集", "填答紀錄進後台 可統計與匯出"],
    ],
    tech: ["React / Vite", "Tailwind CSS", "JSON / Google Sheet 題庫", "SVG 圖表", "Excel 匯出"],
    pricing: [
      ["互動測驗頁", "6,000 元起", "題目、計分、結果頁"],
      ["含後台題庫 / 紀錄", "10,000 元起", "Google Sheet 題庫、填答紀錄、匯出"],
      ["客製報告 / 導流", "依需求估價", "PDF 報告、名單串接、行銷導流"],
    ],
  },
  "line-bot": {
    name: "LINE Bot / 自動回覆",
    tagline: "常見問題自動回 需求自動收 人力省一半",
    forWho: "用 LINE 接客、預約、收單的店家與服務業",
    solves: "同樣的問題每天回十次 訊息一多就漏 客人等太久跑掉",
    priceFrom: "8,000 元起",
    priceRange: "8,000–20,000 元",
    duration: "3–7 天",
    live: { path: "/tools/linebot-mission", label: "看 LINE Bot 接待模擬" },
    Front: LineFront,
    Back: LineBack,
    overview: [
      "把營業時間、價目、地址、預約這些常被問的問題 設成關鍵字自動回覆；需要真人的再轉給你 並把需求收進後台",
      "從整理 FAQ、設定關鍵字 到需求進收件匣 一次規劃好",
    ],
    features: ["關鍵字自動回覆", "圖文選單 / 快速回覆", "預約 / 需求引導", "需求收進後台", "真人接手切換", "FAQ 整理"],
    flow: [
      ["客人提問", "在 LINE 詢問營業、價格、預約等"],
      ["自動回覆", "命中關鍵字即時回答"],
      ["收集需求", "引導填必要資訊 進後台收件匣"],
      ["真人接手", "重要對話轉給你處理"],
    ],
    tech: ["LINE Messaging API", "Webhook", "Serverless Function", "Supabase / 資料庫", "後台介面"],
    pricing: [
      ["基本自動回覆", "8,000 元起", "FAQ、關鍵字、圖文選單"],
      ["含需求收集後台", "15,000 元起", "預約 / 需求進後台收件匣"],
      ["串現有系統", "依需求估價", "訂單、CRM、預約系統串接"],
    ],
  },
  "crm-admin": {
    name: "小型後台 / CRM 管理系統",
    tagline: "客戶 需求 狀態集中管理 不再散在各處",
    forWho: "工作室、服務團隊、業務、需要追客戶的小公司",
    solves: "客戶資料散在表單、LINE、Excel 跟進靠記憶 容易漏",
    priceFrom: "20,000 元起",
    priceRange: "20,000 元起",
    duration: "7–14 天",
    live: { path: "/buildflow", label: "看 BuildFlow 後台成品" },
    Front: CrmFront,
    Back: CrmBack,
    overview: [
      "前台表單收客戶需求 後台自動變成一筆可追蹤的客戶紀錄：來源、狀態、跟進進度一目了然 篩選、搜尋都很快",
      "適合把「詢問 → 跟進 → 成交」的流程系統化",
    ],
    features: ["前台需求表單", "客戶列表與搜尋", "狀態 / 跟進管理", "來源標記", "篩選與統計", "權限與備註"],
    flow: [
      ["收到需求", "官網表單 / LINE / 私訊進來"],
      ["建立客戶", "自動成為可追蹤的客戶紀錄"],
      ["跟進管理", "更新狀態、備註、負責人"],
      ["成交分析", "依來源與狀態統計成效"],
    ],
    tech: ["React / Vite", "Tailwind CSS", "Supabase / 資料庫", "權限管理", "Vercel 部署"],
    pricing: [
      ["基本 CRM 後台", "20,000 元起", "表單、客戶列表、狀態管理"],
      ["多人 / 權限版", "30,000 元起", "多帳號、權限、負責人分派"],
      ["自動化 / 通知", "依需求估價", "Email / LINE 通知、報表"],
    ],
  },
  "contractor-system": {
    name: "工程行 / 服務業接案系統",
    tagline: "官網詢價直接進後台 案件從詢價追到完工",
    forWho: "工程行、裝修、清潔、維修等到府服務業",
    solves: "詢價、報價、派工、回報全靠 LINE 和口頭 案子一多就亂",
    priceFrom: "30,000 元起",
    priceRange: "30,000 元起",
    duration: "14–25 天",
    live: { path: "/contractor-site", label: "看鑫匠工程接案系統" },
    Front: ContractorFront,
    Back: ContractorBack,
    overview: [
      "品牌官網 + 線上詢價 + 案件後台一條龍：客戶在官網詢價 需求直接進後台收件匣 一鍵轉成案件 接著報價、派工、回報、完工",
      "這就是鑫匠工程實際上線的系統 前後台已經真的串起來",
    ],
    features: ["品牌官網與服務展示", "線上詢價表單", "詢價收件匣", "案件看板管理", "報價 / 派工 / 回報", "LINE 通知概念"],
    flow: [
      ["客戶詢價", "官網或 LINE 送出工程需求"],
      ["進收件匣", "需求即時進後台 含聯絡與內容"],
      ["轉成案件", "一鍵建立案件 開始追蹤"],
      ["施工回報", "報價、派工、進度到完工驗收"],
    ],
    tech: ["React / Vite", "Tailwind CSS", "Supabase / 資料庫", "Serverless API", "Vercel 部署"],
    pricing: [
      ["官網 + 詢價", "18,000 元起", "品牌官網與線上詢價表單"],
      ["含案件後台", "30,000 元起", "收件匣、案件看板、狀態管理"],
      ["完整營運版", "依需求估價", "報價單、派工、通知、多角色"],
    ],
  },
}

export const productOrder = [
  "company-landing",
  "ecommerce-ordering",
  "assessment-system",
  "line-bot",
  "crm-admin",
  "contractor-system",
]
