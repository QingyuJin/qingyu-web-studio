import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { seo } from "./content"

const profileOptions = ["學生 / 作品集", "小型店家", "個人品牌", "工作室", "工程行", "想導入 AI 的團隊"]
const goalOptions = ["網站", "作品集", "小型系統", "AI 工具", "LINE Bot", "API 串接", "不確定，想先請你判斷"]
const featureOptions = [
  "手機版 RWD",
  "聯絡表單",
  "LINE 連結",
  "LINE Bot",
  "後台管理",
  "預約 / 詢價",
  "AI 回覆",
  "API 串接",
  "SEO",
  "作品展示",
]
const budgetOptions = ["3,000～5,000", "6,000～12,000", "15,000～30,000", "30,000 以上", "還不確定"]
const timelineOptions = ["一週內", "兩週內", "一個月內", "不急，想慢慢規劃"]

const steps = [
  { key: "profile", title: "你是誰？", type: "single", options: profileOptions },
  { key: "goal", title: "你想做什麼？", type: "single", options: goalOptions },
  { key: "features", title: "你需要哪些功能？", type: "multi", options: featureOptions },
  { key: "budget", title: "預算區間", type: "single", options: budgetOptions },
  { key: "timeline", title: "希望什麼時候上線？", type: "single", options: timelineOptions },
]

const emptyAnswers = {
  profile: "",
  goal: "",
  features: [],
  budget: "",
  timeline: "",
}

const exampleAnswers = {
  profile: "小型店家",
  goal: "LINE Bot",
  features: ["手機版 RWD", "LINE Bot", "預約 / 詢價", "後台管理", "LINE 連結"],
  budget: "15,000～30,000",
  timeline: "一個月內",
}

function scrollToSection(id) {
  if (typeof document === "undefined") return
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function OptionButton({ option, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full border px-4 text-sm font-black transition ${
        active ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62]" : "border-[#ddd6c9] bg-white text-[#52605c] hover:border-[#0d6b62]"
      }`}
    >
      {option}
    </button>
  )
}

function buildRecommendation(answers) {
  const features = answers.features
  const wantsLine = answers.goal === "LINE Bot" || features.includes("LINE Bot")
  const wantsAi = answers.goal === "AI 工具" || features.includes("AI 回覆") || answers.profile === "想導入 AI 的團隊"
  const wantsSystem = answers.goal === "小型系統" || features.includes("後台管理") || features.includes("API 串接")
  const wantsPortfolio = answers.goal === "作品集" || answers.profile === "學生 / 作品集"
  const wantsBrandSite = answers.goal === "網站" || ["小型店家", "個人品牌", "工作室", "工程行"].includes(answers.profile)

  let planName = "品牌網站方案"
  let complexity = "低"
  let direction = "先把首頁、服務內容、聯絡 CTA 與手機版整理好，讓客戶能快速看懂並留下需求。"
  let recommendedFeatures = ["手機版 RWD", "聯絡表單", "LINE 連結", "SEO"]
  let tech = ["React", "Tailwind", "Vercel"]

  if (wantsAi) {
    planName = "AI 工具 Demo 方案"
    complexity = "高"
    direction = "先做可操作的前端 Demo 與報告 UI，再視需求接 OpenAI API、紀錄資料與管理後台。"
    recommendedFeatures = ["AI 回覆", "Report UI", "表單輸入", "後台紀錄"]
    tech = ["React", "Tailwind", "Vercel", "OpenAI API"]
  } else if (wantsLine) {
    planName = "LINE Bot 詢價方案"
    complexity = "高"
    direction = "把 LINE 詢問、預約或報價需求整理成可追蹤案件，適合店家、工作室與服務業。"
    recommendedFeatures = ["LINE Bot", "預約 / 詢價", "後台管理", "LINE 連結"]
    tech = ["React", "Tailwind", "Vercel", "LINE Messaging API", "Supabase"]
  } else if (wantsSystem) {
    planName = "小型系統方案"
    complexity = "中"
    direction = "先建立表單、列表、狀態管理與簡易後台，讓日常流程可以被搜尋、追蹤與管理。"
    recommendedFeatures = ["後台管理", "聯絡表單", "API 串接", "資料列表"]
    tech = ["React", "Tailwind", "Vercel", "Supabase"]
  } else if (wantsPortfolio) {
    planName = "作品集網站方案"
    complexity = "低"
    direction = "整理個人介紹、作品分類、專題說明、GitHub / 履歷連結與聯絡入口。"
    recommendedFeatures = ["作品展示", "手機版 RWD", "SEO", "聯絡表單"]
    tech = ["React", "Tailwind", "Vercel", "SEO"]
  } else if (wantsBrandSite) {
    planName = "品牌網站方案"
    complexity = features.includes("預約 / 詢價") || features.includes("後台管理") ? "中" : "低"
    direction = "用乾淨首頁、服務分類、案例展示與明確 CTA，建立第一眼信任並引導客戶聯絡。"
    recommendedFeatures = ["手機版 RWD", "聯絡表單", "LINE 連結", "SEO"]
    tech = ["React", "Tailwind", "Vercel", "SEO"]
  }

  if (answers.goal === "不確定，想先請你判斷") {
    planName = wantsLine ? "LINE Bot 詢價方案" : "品牌網站起步方案"
    direction = "可以先從最小可展示版本開始，確認客戶會怎麼詢問，再決定是否加 LINE Bot、AI 或後台。"
  }

  const nextSteps = [
    "整理目前服務與主要客戶來源",
    "列出最重要的 1～2 個轉換動作",
    "先做可上線版本，再逐步加後台或自動化",
  ]

  return {
    planName,
    complexity,
    recommendedFeatures: Array.from(new Set([...recommendedFeatures, ...features])).slice(0, 8),
    tech,
    direction,
    nextSteps,
  }
}

function ProjectPlanner() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(emptyAnswers)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const currentStep = steps[stepIndex]
  const progress = ((stepIndex + 1) / steps.length) * 100

  const previewResult = useMemo(() => result || buildRecommendation({
    ...answers,
    features: answers.features.length ? answers.features : ["手機版 RWD", "聯絡表單"],
    profile: answers.profile || "小型店家",
    goal: answers.goal || "網站",
    budget: answers.budget || "還不確定",
    timeline: answers.timeline || "不急，想慢慢規劃",
  }), [answers, result])

  function setSingleAnswer(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }))
    setMessage("")
    setCopied(false)
  }

  function toggleFeature(feature) {
    setAnswers((current) => {
      const exists = current.features.includes(feature)
      return {
        ...current,
        features: exists ? current.features.filter((item) => item !== feature) : [...current.features, feature],
      }
    })
    setMessage("")
    setCopied(false)
  }

  function isStepComplete(index = stepIndex) {
    const step = steps[index]
    const value = answers[step.key]
    return Array.isArray(value) ? value.length > 0 : Boolean(value)
  }

  function nextStep() {
    if (!isStepComplete()) {
      setMessage(`請先完成「${currentStep.title}」，我才能繼續判斷。`)
      return
    }
    setStepIndex((current) => Math.min(current + 1, steps.length - 1))
    setMessage("")
  }

  function previousStep() {
    setStepIndex((current) => Math.max(current - 1, 0))
    setMessage("")
  }

  function validateAll() {
    const missing = steps.find((step) => {
      const value = answers[step.key]
      return Array.isArray(value) ? value.length === 0 : !value
    })
    if (missing) {
      setStepIndex(steps.findIndex((step) => step.key === missing.key))
      setMessage(`請先選擇「${missing.title}」。`)
      return false
    }
    return true
  }

  function generatePlan() {
    if (!validateAll()) return
    setResult(buildRecommendation(answers))
    setMessage("已產生建議方案。")
    setCopied(false)
  }

  function loadExample() {
    setAnswers(exampleAnswers)
    setStepIndex(4)
    setResult(buildRecommendation(exampleAnswers))
    setMessage("已載入小型店家 + LINE Bot + 預約詢價範例。")
    setCopied(false)
    scrollToSection("demo")
  }

  function resetPlanner() {
    setAnswers(emptyAnswers)
    setStepIndex(0)
    setResult(null)
    setMessage("已清空，可以重新選擇。")
    setCopied(false)
  }

  async function copyRecommendation() {
    const target = result || previewResult
    const text = [
      `推薦方案：${target.planName}`,
      `技術複雜度：${target.complexity}`,
      `適合功能：${target.recommendedFeatures.join("、")}`,
      `建議技術：${target.tech.join(" / ")}`,
      `製作方向：${target.direction}`,
      `下一步：${target.nextSteps.join("；")}`,
    ].join("\n")

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      }
      setCopied(true)
      setMessage("建議內容已複製。")
    } catch {
      setCopied(false)
      setMessage("目前瀏覽器不支援自動複製，可以手動選取右側建議。")
    }
  }

  return (
    <SiteLayout>
      <Seo page={seo.planner} />
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Project Planner</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.35rem,8vw,4.7rem)] font-black leading-[1.04] tracking-tight">
              需求診斷工具
            </h1>
            <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#52605c]">
              回答幾個問題，我會幫你判斷適合做網站、系統、AI 工具還是 LINE Bot。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                開始診斷
              </button>
              <button type="button" onClick={loadExample} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                查看範例
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-[#111c22] p-5 text-white shadow-xl shadow-[#111c22]/10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Instant Result</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["推薦方案", "複雜度", "下一步"].map((item) => (
                <div key={item} className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm font-black">{item}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-white/15">
                    <div className="h-full w-3/4 rounded-full bg-[#8fd6cc]" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-white p-4 text-[#111c22]">
              <p className="text-xs font-black text-[#0d6b62]">Preview</p>
              <p className="mt-2 text-lg font-black">{previewResult.planName}</p>
              <p className="mt-2 text-xs font-bold leading-5 text-[#52605c]">{previewResult.direction}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto grid max-w-6xl scroll-mt-24 gap-5 px-4 py-16 lg:grid-cols-[1fr_0.88fr]">
        <div className="rounded-2xl border border-[#e3ded3] bg-white p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Step {stepIndex + 1} / {steps.length}</p>
              <h2 className="mt-2 text-2xl font-black">{currentStep.title}</h2>
            </div>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">{Math.round(progress)}%</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e4e9e6]">
            <div className="h-full rounded-full bg-[#0d6b62] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {currentStep.options.map((option) => {
              const active = currentStep.type === "multi" ? answers.features.includes(option) : answers[currentStep.key] === option
              return (
                <OptionButton
                  key={option}
                  option={option}
                  active={active}
                  onClick={() => {
                    if (currentStep.type === "multi") {
                      toggleFeature(option)
                    } else {
                      setSingleAnswer(currentStep.key, option)
                    }
                  }}
                />
              )
            })}
          </div>

          {message ? (
            <p className={`mt-5 rounded-lg px-4 py-3 text-sm font-black ${message.includes("請先") ? "bg-[#fff7ed] text-[#b45309]" : "bg-[#eef7f4] text-[#0d6b62]"}`}>
              {message}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" onClick={previousStep} disabled={stepIndex === 0} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] disabled:cursor-not-allowed disabled:opacity-40">
              上一步
            </button>
            {stepIndex < steps.length - 1 ? (
              <button type="button" onClick={nextStep} className="min-h-11 rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                下一步
              </button>
            ) : (
              <button type="button" onClick={generatePlan} className="min-h-11 rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                產生建議
              </button>
            )}
            <button type="button" onClick={resetPlanner} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              重新選擇
            </button>
            <button type="button" onClick={copyRecommendation} className="min-h-11 rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              {copied ? "已複製" : "複製建議"}
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-[#233139] bg-[#111c22] p-5 text-white md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Result</p>
          <h2 className="mt-3 text-3xl font-black">{result ? result.planName : "完成選項後產生建議"}</h2>
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">技術複雜度</p>
              <p className="mt-2 text-xl font-black">{result ? result.complexity : previewResult.complexity}</p>
              <div className="mt-3 h-2 rounded-full bg-white/15">
                <div className="h-full rounded-full bg-[#8fd6cc]" style={{ width: (result || previewResult).complexity === "高" ? "86%" : (result || previewResult).complexity === "中" ? "62%" : "38%" }} />
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">適合功能</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(result || previewResult).recommendedFeatures.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">建議技術</p>
              <p className="mt-2 text-sm font-bold leading-7 text-white/80">{(result || previewResult).tech.join(" / ")}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">預估製作方向</p>
              <p className="mt-2 text-sm font-bold leading-7 text-white/80">{(result || previewResult).direction}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">下一步建議</p>
              <div className="mt-3 grid gap-2 text-sm font-bold leading-6 text-white/80">
                {(result || previewResult).nextSteps.map((item) => (
                  <span key={item}>・{item}</span>
                ))}
              </div>
            </div>
          </div>
          <Link to="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22]">
            聊聊需求
          </Link>
        </aside>
      </section>

      <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Tech</p>
            <h2 className="mt-3 text-3xl font-black">診斷邏輯怎麼做</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
              這版是前端 rule-based recommendation，未來可以升級成 OpenAI API 顧問，或改造成你的店家需求表單。
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Frontend", "React / Tailwind"],
              ["Logic", "Rule-based Recommendation"],
              ["Future", "OpenAI API 可升級成 AI 顧問"],
              ["Deploy", "Vercel"],
              ["CTA", "可客製成你的店家需求表單"],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-xl border border-[#ddd6c9] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default ProjectPlanner
