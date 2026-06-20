import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { seo } from "./content"

const baseScore = 42

const rescueIssues = [
  {
    id: "headline",
    title: "首頁標題太長",
    points: 8,
    preview: "標題改短，第一眼看得懂服務。",
    options: [
      ["把標題縮成一句清楚承諾", true],
      ["再塞更多服務關鍵字", false],
      ["不處理", false],
    ],
    report: "首頁標題已縮短，訪客更快知道你能幫他解決什麼。",
  },
  {
    id: "cta",
    title: "CTA 不明顯",
    points: 10,
    preview: "第一屏加入主要行動按鈕。",
    options: [
      ["加上「聯絡我」", true],
      ["加上「開始需求診斷」", true],
      ["不處理", false],
    ],
    report: "CTA 已放到第一屏，訪客看完能直接行動。",
  },
  {
    id: "mobile",
    title: "手機版按鈕太小",
    points: 8,
    preview: "按鈕變大，手機更好點。",
    options: [
      ["提高按鈕高度與間距", true],
      ["把按鈕縮成小字連結", false],
      ["不處理", false],
    ],
    report: "手機按鈕與間距已優化，降低誤觸與放棄率。",
  },
  {
    id: "line",
    title: "沒有 LINE 聯絡入口",
    points: 9,
    preview: "加入 LINE 與 Email 聯絡卡。",
    options: [
      ["加入 LINE ID 與複製按鈕", true],
      ["只留表單，不放 LINE", false],
      ["不處理", false],
    ],
    report: "聯絡入口更直覺，台灣客戶能用熟悉的 LINE 開始詢問。",
  },
  {
    id: "seo",
    title: "SEO description 太空泛",
    points: 7,
    preview: "搜尋摘要說清楚服務與對象。",
    options: [
      ["補上服務、對象與地區描述", true],
      ["只寫歡迎來到本站", false],
      ["不處理", false],
    ],
    report: "SEO 摘要已具體化，搜尋結果更容易讓人點進來。",
  },
  {
    id: "works",
    title: "缺少作品案例",
    points: 8,
    preview: "作品區加入產品 mockup。",
    options: [
      ["放大作品 mockup 與 Demo 入口", true],
      ["只放文字清單", false],
      ["不處理", false],
    ],
    report: "作品案例變成可理解的產品展示，而不是純文字介紹。",
  },
  {
    id: "trust",
    title: "缺少信任元素",
    points: 8,
    preview: "加入流程、技術與聯絡方式。",
    options: [
      ["補上流程、技術標籤與聯絡 CTA", true],
      ["只放漂亮背景圖", false],
      ["不處理", false],
    ],
    report: "信任元素已補強，訪客能看見你的能力、流程與下一步。",
  },
]

function getLevel(score) {
  if (score <= 50) return "需要整理"
  if (score <= 75) return "可以上線但還能更好"
  if (score <= 90) return "具備成交基礎"
  return "高轉換網站雛形"
}

function scrollToSection(id) {
  if (typeof document === "undefined") return
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function WebsiteRescue() {
  const [fixedIds, setFixedIds] = useState([])
  const [activeIssueId, setActiveIssueId] = useState(rescueIssues[1].id)
  const [toast, setToast] = useState("")
  const [report, setReport] = useState([])

  const activeIssue = rescueIssues.find((issue) => issue.id === activeIssueId) || rescueIssues[0]
  const fixedIssues = rescueIssues.filter((issue) => fixedIds.includes(issue.id))
  const remainingIssues = rescueIssues.filter((issue) => !fixedIds.includes(issue.id))
  const score = Math.min(100, baseScore + fixedIssues.reduce((sum, issue) => sum + issue.points, 0))
  const level = getLevel(score)
  const progress = Math.round((fixedIds.length / rescueIssues.length) * 100)

  const previewState = useMemo(() => {
    const has = (id) => fixedIds.includes(id)
    return {
      title: has("headline") ? "讓你的服務被看懂" : "我們提供完整多元跨平台專業服務方案",
      cta: has("cta") ? "開始需求診斷" : "更多資訊",
      mobile: has("mobile"),
      line: has("line"),
      seo: has("seo") ? "台灣小型網站、LINE Bot 與後台系統製作" : "這是一個網站",
      works: has("works"),
      trust: has("trust"),
    }
  }, [fixedIds])

  function chooseFix(option) {
    const [, isCorrect] = option
    if (!isCorrect) {
      setToast("這個選項不會改善轉換，試試更直接的修法。")
      return
    }
    if (fixedIds.includes(activeIssue.id)) {
      setToast("這個問題已經修好了。")
      return
    }
    setFixedIds((current) => [...current, activeIssue.id])
    setReport((current) => [...current, activeIssue.report])
    setToast(`改善成功：${activeIssue.preview}`)
  }

  function resetGame() {
    setFixedIds([])
    setActiveIssueId(rescueIssues[1].id)
    setToast("")
    setReport([])
  }

  return (
    <SiteLayout>
      <Seo page={seo.websiteRescue} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Interactive Demo</p>
            <h1 className="mt-4 text-[clamp(2.4rem,8vw,4.8rem)] font-black leading-[1.04] tracking-tight">網站救援小遊戲</h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:line-clamp-2">
              點出爛網站問題，修復 CTA、SEO、手機版與信任感，看看網站分數能提升多少。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                開始救援
              </button>
              <button type="button" onClick={() => scrollToSection("tech")} className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                查看技術拆解
              </button>
            </div>
          </div>
          <RescueHeroPreview score={score} level={level} progress={progress} />
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.86fr_0.88fr]">
          <WebsitePreview state={previewState} />

          <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Issues</p>
                <h2 className="mt-2 text-2xl font-black">點一個問題修復</h2>
              </div>
              <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{fixedIds.length} / {rescueIssues.length}</span>
            </div>
            <div className="mt-5 grid gap-2">
              {rescueIssues.map((issue) => {
                const fixed = fixedIds.includes(issue.id)
                const active = activeIssueId === issue.id
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => setActiveIssueId(issue.id)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm font-black transition ${
                      active ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62]" : fixed ? "border-[#d8e2dc] bg-[#f7fbf8] text-[#52605c]" : "border-[#e3ded3] bg-white text-[#111c22] hover:border-[#0d6b62]"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{issue.title}</span>
                      <span className="text-xs">{fixed ? "已修復" : `+${issue.points}`}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-4">
              <p className="text-sm font-black">{activeIssue.title}</p>
              <div className="mt-3 grid gap-2">
                {activeIssue.options.map((option) => (
                  <button key={option[0]} type="button" onClick={() => chooseFix(option)} className="min-h-11 rounded-lg border border-[#ddd6c9] bg-white px-4 text-left text-sm font-bold text-[#40504c] hover:border-[#0d6b62]">
                    {option[0]}
                  </button>
                ))}
              </div>
              {toast ? <p className="mt-3 rounded-lg bg-[#eef7f4] px-3 py-2 text-sm font-black text-[#0d6b62]">{toast}</p> : null}
            </div>
          </div>

          <ScoreReport
            score={score}
            level={level}
            report={report}
            remainingIssues={remainingIssues}
            completed={fixedIds.length === rescueIssues.length}
            onReset={resetGame}
          />
        </div>
      </section>

      <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Tech</p>
            <h2 className="mt-3 text-3xl font-black">互動邏輯怎麼做</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c] md:line-clamp-2">
              用前端狀態管理，把網站問題、修復選項、分數與結果報告串成一個可展示的網站健檢體驗。
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Frontend", "React / Tailwind"],
              ["Interaction", "State Machine"],
              ["Scoring", "Rule-based Scoring"],
              ["UX", "Before / After Preview"],
              ["Conversion", "Result Report + CTA"],
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
                {["Issue Select", "Fix Option", "Score Update", "Preview Change", "Report CTA"].map((item) => (
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

function RescueHeroPreview({ score, level, progress }) {
  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-2xl shadow-[#111c22]/15">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Rescue Score</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">Interactive</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[0.72fr_1fr]">
        <div className="rounded-2xl bg-white p-4 text-[#111c22]">
          <p className="text-xs font-black text-[#0d6b62]">目前分數</p>
          <p className="mt-2 text-5xl font-black">{score}</p>
          <p className="mt-2 text-xs font-black text-[#52605c]">{level}</p>
          <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
            <div className="h-full rounded-full bg-[#0d6b62]" style={{ width: `${score}%` }} />
          </div>
        </div>
        <div className="grid gap-2">
          {["CTA 修復", "SEO 摘要", "手機按鈕", "LINE 入口"].map((item, index) => (
            <div key={item} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-black text-white/86">
              <span className="text-[#8fd6cc]">0{index + 1}</span> {item}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/15">
        <div className="h-full rounded-full bg-[#8fd6cc]" style={{ width: `${progress || 12}%` }} />
      </div>
    </div>
  )
}

function WebsitePreview({ state }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Website Preview</p>
          <h2 className="mt-2 text-2xl font-black">問題網站</h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${state.trust ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#fff7ed] text-[#b45309]"}`}>
          {state.trust ? "信任感提升" : "待整理"}
        </span>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#e3ded3] bg-[#faf8f3]">
        <div className="flex items-center justify-between border-b border-[#e3ded3] bg-white px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4a2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
          </div>
          <span className="text-xs font-black text-[#52605c]">{state.seo}</span>
        </div>
        <div className="p-5">
          <p className="text-xs font-black text-[#0d6b62]">Hero</p>
          <h3 className="mt-2 text-3xl font-black leading-tight">{state.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`inline-flex min-h-10 items-center rounded-md px-4 text-sm font-black ${state.mobile ? "bg-[#111c22] text-white" : "bg-[#d8d2c5] text-[#52605c]"}`}>
              {state.cta}
            </span>
            {state.line ? <span className="inline-flex min-h-10 items-center rounded-md border border-[#0d6b62] bg-white px-4 text-sm font-black text-[#0d6b62]">LINE 聯絡</span> : null}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-black">{state.works ? "作品案例" : "關於我們"}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-[#52605c]">{state.works ? "Demo / 案例 / 技術拆解" : "文字很多，但不知道能做什麼"}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm font-black">{state.trust ? "信任元素" : "缺少證據"}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-[#52605c]">{state.trust ? "流程、技術、聯絡方式清楚" : "沒有案例、流程或明確下一步"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreReport({ score, level, report, remainingIssues, completed, onReset }) {
  return (
    <aside className="rounded-2xl border border-[#233139] bg-[#111c22] p-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8fd6cc]">Report</p>
          <h2 className="mt-2 text-2xl font-black">改善報告</h2>
        </div>
        <button type="button" onClick={onReset} className="rounded-md border border-white/20 px-3 py-2 text-xs font-black text-white/82 hover:bg-white/10">
          重置
        </button>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-4 text-[#111c22]">
        <p className="text-xs font-black text-[#0d6b62]">目前分數</p>
        <div className="mt-2 flex items-end gap-3">
          <p className="text-5xl font-black">{score}</p>
          <p className="pb-2 text-xs font-black text-[#52605c]">/ 100</p>
        </div>
        <p className="mt-2 text-sm font-black text-[#52605c]">{level}</p>
      </div>

      <div className="mt-5 grid gap-3">
        <ReportBlock title="修復項目" items={report.length ? report : ["先點選中間的問題，選擇正確修法。"]} />
        <ReportBlock title="剩餘問題" items={remainingIssues.length ? remainingIssues.slice(0, 3).map((issue) => issue.title) : ["所有核心問題都已修復。"]} />
        <ReportBlock title="適合服務" items={["一頁式網站", "品牌網站", "LINE 串接", "SEO 基礎", "Project Planner"]} />
      </div>

      {completed ? (
        <div className="mt-5 rounded-2xl bg-[#eef7f4] p-4 text-[#111c22]">
          <p className="text-sm font-black text-[#0d6b62]">你的網站救援結果</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#40504c]">已具備成交基礎，可以進一步規劃實際網站或流程系統。</p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center rounded-md bg-white px-5 text-sm font-black text-[#111c22]">
          開始需求診斷
        </Link>
        <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md border border-white/20 px-5 text-sm font-black text-white hover:bg-white/10">
          找我做類似網站
        </Link>
      </div>
    </aside>
  )
}

function ReportBlock({ title, items }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs font-black text-[#8fd6cc]">{title}</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold leading-5 text-white/82">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default WebsiteRescue
