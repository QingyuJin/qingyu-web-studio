import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { seo } from "./content"

const baseScore = 42

const improvements = [
  {
    id: "cta",
    title: "改善 CTA",
    short: "把模糊按鈕改成明確行動。",
    points: 10,
    after: "主按鈕改為「開始需求診斷」，客戶知道下一步要做什麼。",
    report: "CTA 從普通連結改成明確行動，降低客戶猶豫。",
  },
  {
    id: "line",
    title: "加入 LINE 聯絡入口",
    short: "讓客戶不用找半天才知道怎麼聯絡。",
    points: 9,
    after: "首頁加入 LINE ID 與 Email 入口，聯絡路徑更短。",
    report: "聯絡入口前移，讓台灣客戶可以直接用熟悉的 LINE 詢問。",
  },
  {
    id: "mobile",
    title: "優化手機版按鈕",
    short: "按鈕放大、間距加開，手機更好點。",
    points: 8,
    after: "手機版 CTA 高度與間距提升，第一屏更容易操作。",
    report: "手機版操作阻力降低，適合從社群或 LINE 點進來的客戶。",
  },
  {
    id: "works",
    title: "加入作品案例",
    short: "用案例讓客戶知道你真的做得出來。",
    points: 8,
    after: "新增作品 mockup 與 Demo 入口，技術能力變得可視化。",
    report: "作品案例補上後，客戶更容易理解服務成果。",
  },
  {
    id: "seo",
    title: "補 SEO 描述",
    short: "搜尋摘要從空泛改成具體服務。",
    points: 7,
    after: "描述改成網站、LINE Bot、AI 工具與後台流程。",
    report: "SEO 描述更清楚，搜尋結果不再像一般模板站。",
  },
  {
    id: "trust",
    title: "加入信任元素",
    short: "補上流程、聯絡方式與技術標籤。",
    points: 8,
    after: "加入製作流程、技術標籤與聯絡 CTA。",
    report: "信任元素補齊後，客戶更能判斷是否適合合作。",
  },
]

function scrollToSection(id) {
  if (typeof document === "undefined") return
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function getMood(score) {
  if (score <= 50) return { mark: "(><)", label: "需要整理" }
  if (score <= 75) return { mark: "(._.)", label: "可以上線，但還能更好" }
  if (score <= 90) return { mark: "○v○", label: "具備成交基礎" }
  return { mark: "○✨", label: "高轉換網站雛形" }
}

function WebsiteRescue() {
  const [fixedIds, setFixedIds] = useState([])
  const [activeId, setActiveId] = useState("cta")
  const [toast, setToast] = useState("")
  const [mobileTab, setMobileTab] = useState("preview")

  const fixedItems = improvements.filter((item) => fixedIds.includes(item.id))
  const activeItem = improvements.find((item) => item.id === activeId) || improvements[0]
  const score = Math.min(100, baseScore + fixedItems.reduce((sum, item) => sum + item.points, 0))
  const progress = Math.round((fixedIds.length / improvements.length) * 100)
  const mood = getMood(score)
  const latestItem = fixedItems[fixedItems.length - 1]

  const preview = useMemo(() => {
    const has = (id) => fixedIds.includes(id)
    return {
      title: has("cta") ? "讓你的服務被看懂" : "我們提供專業服務與完整解決方案",
      cta: has("cta") ? "開始需求診斷" : "了解更多",
      line: has("line"),
      mobile: has("mobile"),
      works: has("works"),
      seo: has("seo"),
      trust: has("trust"),
    }
  }, [fixedIds])

  function applyImprovement(item) {
    setActiveId(item.id)
    if (fixedIds.includes(item.id)) {
      setToast("這項已改善，狀態維持穩定 ○w○")
      setMobileTab("report")
      return
    }
    setFixedIds((current) => [...current, item.id])
    setToast(`${item.title} 已套用，網站狀態改善中 ○v○`)
    setMobileTab("preview")
  }

  function resetDemo() {
    setFixedIds([])
    setActiveId("cta")
    setToast("")
    setMobileTab("preview")
  }

  return (
    <SiteLayout>
      <Seo page={seo.websiteRescue} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Interactive Demo</p>
            <h1 className="mt-4 text-[clamp(1.75rem,8vw,2rem)] font-black leading-[1.08] tracking-tight md:text-[clamp(2.4rem,8vw,4.8rem)] md:leading-[1.04]">
              網站救援互動 Demo
            </h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-8 text-[#52605c]">
              點選改善項目，觀察 CTA、SEO、手機版與信任感如何改變網站狀態。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                開始改善
              </button>
              <button type="button" onClick={() => scrollToSection("tech")} className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                查看技術拆解
              </button>
            </div>
          </div>
          <RescueHero score={score} progress={progress} mood={mood} fixedIds={fixedIds} latestItem={latestItem} />
        </div>
      </section>

      <section id="demo" className="mx-auto min-h-svh max-w-6xl scroll-mt-24 px-4 py-8 md:min-h-0 md:py-16">
        <div className="lg:hidden">
          <div className="sticky top-[64px] z-20 -mx-4 border-y border-[#e6e0d5] bg-[#faf8f3]/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#0d6b62]">Score</p>
                <p className="text-xl font-black text-[#111c22]">
                  {score} <span className="text-sm text-[#52605c]">{mood.mark}</span>
                </p>
              </div>
              <div className="w-32">
                <div className="h-2 rounded-full bg-[#e4e9e6]">
                  <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-1 text-right text-[11px] font-black text-[#52605c]">{fixedIds.length} / {improvements.length}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["preview", "預覽"],
                ["improve", "改善"],
                ["report", "報告"],
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
            {mobileTab === "preview" ? (
              <div className="grid gap-4">
                <WebsitePreview preview={preview} activeItem={activeItem} fixedCount={fixedIds.length} />
                <button
                  type="button"
                  onClick={() => setMobileTab("improve")}
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white"
                >
                  選擇改善項目
                </button>
              </div>
            ) : null}
            {mobileTab === "improve" ? (
              <ImprovementPanel
                items={improvements}
                activeId={activeId}
                fixedIds={fixedIds}
                toast={toast}
                onApply={applyImprovement}
              />
            ) : null}
            {mobileTab === "report" ? (
              <ScorePanel
                score={score}
                mood={mood}
                progress={progress}
                fixedItems={fixedItems}
                activeItem={activeItem}
                onReset={resetDemo}
              />
            ) : null}
          </div>
        </div>

        <div className="hidden gap-5 lg:grid lg:grid-cols-[1fr_0.9fr_0.88fr]">
          <WebsitePreview preview={preview} activeItem={activeItem} fixedCount={fixedIds.length} />
          <ImprovementPanel
            items={improvements}
            activeId={activeId}
            fixedIds={fixedIds}
            toast={toast}
            onApply={applyImprovement}
          />
          <ScorePanel
            score={score}
            mood={mood}
            progress={progress}
            fixedItems={fixedItems}
            activeItem={activeItem}
            onReset={resetDemo}
          />
        </div>
      </section>

      <TechSection />
    </SiteLayout>
  )
}

function RescueHero({ score, progress, mood, fixedIds, latestItem }) {
  const heroChecks = [
    ["cta", "CTA"],
    ["line", "LINE 聯絡"],
    ["mobile", "手機版"],
    ["seo", "SEO 摘要"],
  ]

  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-[#111c22] p-4 text-white shadow-2xl shadow-[#111c22]/15">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">Website Status</span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">{mood.mark}</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[0.72fr_1fr]">
        <div className="rounded-2xl bg-white p-4 text-[#111c22]">
          <p className="text-xs font-black text-[#0d6b62]">目前分數</p>
          <p className="mt-2 text-5xl font-black">{score}</p>
          <p className="mt-2 text-xs font-black text-[#52605c]">{mood.label}</p>
          <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
            <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-500" style={{ width: `${score}%` }} />
          </div>
        </div>
        <div className="grid gap-2">
          {heroChecks.map(([id, item], index) => {
            const done = fixedIds.includes(id)
            return (
            <div key={item} className={`rounded-xl px-3 py-2 text-sm font-black transition ${done ? "bg-[#8fd6cc] text-[#0b2724]" : "bg-white/10 text-white/86"}`}>
              <span className={done ? "text-[#0b2724]/55" : "text-[#8fd6cc]"}>0{index + 1}</span> {item}
            </div>
            )
          })}
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white/75">
          最近改善：<span className="text-[#8fd6cc]">{latestItem?.title || "尚未開始"}</span>
        </div>
        <div className="rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white/75">
          狀態：<span className="text-[#8fd6cc]">{mood.label}</span>
        </div>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/15">
        <div className="h-full rounded-full bg-[#8fd6cc] transition-all duration-500" style={{ width: `${Math.max(progress, 10)}%` }} />
      </div>
    </div>
  )
}

function WebsitePreview({ preview, activeItem, fixedCount }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Before / After</p>
          <h2 className="mt-2 text-xl font-black md:text-2xl">網站 Preview</h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${preview.trust ? "bg-[#eef7f4] text-[#0d6b62]" : "bg-[#fff7ed] text-[#b45309]"}`}>
          {preview.trust ? "○w○ 穩定" : "(><) 待整理"}
        </span>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-[#e3ded3] bg-[#faf8f3] shadow-sm transition duration-300">
        <div className="flex items-center justify-between border-b border-[#e3ded3] bg-white px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4a2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
          </div>
          <span className="truncate text-xs font-black text-[#52605c]">
            {preview.seo ? "台灣網站製作、LINE Bot 與後台系統" : "專業服務與解決方案"}
          </span>
        </div>
        <div className="p-4 md:p-5">
          <p className="text-xs font-black text-[#0d6b62]">Hero</p>
          <h3 className="mt-2 text-xl font-black leading-tight md:text-3xl">{preview.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`inline-flex min-h-10 items-center rounded-md px-4 text-sm font-black transition ${preview.mobile || activeItem?.id === "cta" ? "bg-[#111c22] text-white shadow-md shadow-[#111c22]/12" : "bg-[#d8d2c5] text-[#52605c]"}`}>
              {preview.cta}
            </span>
            {preview.line ? <span className="inline-flex min-h-10 items-center rounded-md border border-[#0d6b62] bg-white px-4 text-sm font-black text-[#0d6b62] shadow-sm">LINE 聯絡</span> : null}
          </div>
          <div className="mt-5 hidden gap-2 sm:grid sm:grid-cols-2">
            <PreviewCard title={preview.works ? "作品案例" : "服務介紹"} text={preview.works ? "Demo / 系統 / 技術拆解" : "內容還不夠像成果展示"} />
            <PreviewCard title={preview.trust ? "信任元素" : "缺少信任感"} text={preview.trust ? "流程、技術與聯絡入口完整" : "客戶還不知道能不能放心詢問"} />
          </div>
          <div className="mt-3 hidden gap-2 sm:grid sm:grid-cols-2">
            <div className={`rounded-xl border p-3 transition ${preview.seo ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white"}`}>
              <p className="text-xs font-black text-[#0d6b62]">SEO 摘要</p>
              <p className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-[#52605c]">
                {preview.seo ? "台灣網站製作、LINE Bot、AI 工具與後台流程。" : "目前摘要太空泛，搜尋結果不夠清楚。"}
              </p>
            </div>
            <div className={`rounded-xl border p-3 transition ${preview.mobile ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white"}`}>
              <p className="text-xs font-black text-[#0d6b62]">手機操作</p>
              <p className="mt-1 text-xs font-bold leading-5 text-[#52605c]">
                {preview.mobile ? "按鈕高度與間距已調整，手機更好點。" : "按鈕偏小，容易降低詢問率。"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-black text-[#52605c]">
            <span>已改善 {fixedCount} 項</span>
            <span>{activeItem?.title || "選擇改善項目"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewCard({ title, text }) {
  return (
    <div className="rounded-xl bg-white p-4">
      <p className="text-sm font-black">{title}</p>
      <p className="mt-2 text-xs font-bold leading-5 text-[#52605c]">{text}</p>
    </div>
  )
}

function ImprovementPanel({ items, activeId, fixedIds, toast, onApply }) {
  return (
    <div className="rounded-2xl border border-[#e3ded3] bg-white p-4 md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">Improve Panel</p>
          <h2 className="mt-2 text-xl font-black md:text-2xl">改善項目</h2>
        </div>
        <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{fixedIds.length} / {items.length}</span>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((item) => {
          const fixed = fixedIds.includes(item.id)
          const active = activeId === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onApply(item)}
              className={`rounded-2xl border p-3 text-left transition duration-200 md:p-4 ${fixed ? "border-[#0d6b62] bg-[#eef7f4] shadow-sm" : active ? "border-[#0d6b62] bg-[#eef7f4]" : "border-[#e3ded3] bg-white hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-md"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-sm font-black text-[#111c22]">{item.title}</span>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${fixed ? "bg-[#0d6b62] text-white" : "bg-[#faf8f3] text-[#52605c]"}`}>
                  {fixed ? "已改善 ○w○" : `+${item.points}`}
                </span>
              </span>
              <span className="mt-2 hidden text-xs font-bold leading-5 text-[#52605c] md:block">{item.short}</span>
            </button>
          )
        })}
      </div>
      {toast ? <p className="mt-4 rounded-xl bg-[#eef7f4] px-4 py-3 text-sm font-black text-[#0d6b62] shadow-sm">{toast}</p> : null}
    </div>
  )
}

function ScorePanel({ score, mood, progress, fixedItems, activeItem, onReset }) {
  const completed = fixedItems.length === improvements.length
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
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black text-[#0d6b62]">目前分數</p>
            <p className="mt-2 text-5xl font-black">{score}</p>
          </div>
          <p className="pb-2 text-sm font-black text-[#52605c]">{mood.mark}</p>
        </div>
        <p className="mt-2 text-sm font-black text-[#52605c]">{mood.label}</p>
        <div className="mt-4 h-2 rounded-full bg-[#e4e9e6]">
          <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-black text-[#8fd6cc]">目前觀察</p>
        <p className="mt-2 text-sm font-bold leading-6 text-white/82">{activeItem.after}</p>
      </div>
      <div className="mt-5 grid gap-3">
        {fixedItems.length ? fixedItems.map((item) => (
          <div key={item.id} className="rounded-xl bg-white/10 px-3 py-3 text-xs font-bold leading-5 text-white/82 transition">
            {item.report}
          </div>
        )) : (
          <div className="rounded-xl bg-white/10 px-3 py-3 text-xs font-bold leading-5 text-white/82">
            先點一個改善項目，報告會即時更新。
          </div>
        )}
      </div>
      {completed ? (
        <div className="mt-5 rounded-2xl bg-[#eef7f4] p-4 text-[#111c22]">
          <p className="text-sm font-black text-[#0d6b62]">網站狀態已完成 ○✨</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#40504c]">可以進一步規劃一頁式網站、品牌網站、LINE 串接或 SEO 基礎整理。</p>
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

function TechSection() {
  const tech = [
    ["Frontend", "React / Tailwind"],
    ["Interaction", "State-driven improvement panel"],
    ["Scoring", "Rule-based scoring"],
    ["UX", "Before / After preview"],
    ["Conversion", "Result report + CTA"],
    ["Deploy", "Vercel"],
  ]
  return (
    <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Tech</p>
          <h2 className="mt-3 text-3xl font-black">互動怎麼做</h2>
          <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
            用狀態管理把「點選改善」轉成 Preview、分數、報告與 CTA，讓客戶直接感受到網站優化價值。
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
              {["Select issue", "Apply improvement", "Score update", "Preview change", "Report CTA"].map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-white/84">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebsiteRescue
