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
  { key: "profile", title: "你的身份", type: "single", options: profileOptions },
  { key: "goal", title: "想做的東西", type: "single", options: goalOptions },
  { key: "features", title: "需要的功能", type: "multi", options: featureOptions },
  { key: "budget", title: "預算區間", type: "single", options: budgetOptions },
  { key: "timeline", title: "上線時間", type: "single", options: timelineOptions },
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

function PlanList({ title, items = [] }) {
  return (
    <div className="rounded-xl bg-white/10 p-4">
      <p className="text-xs font-black text-[#8fd6cc]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">
            {item}
          </span>
        ))}
      </div>
    </div>
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
  const risks = [
    "需求一次放太多會拉長時程",
    "需要先確認最重要的轉換動作",
    "若要串接外部 API，需預留測試時間",
  ]

  return {
    planName,
    complexity,
    recommendedFeatures: Array.from(new Set([...recommendedFeatures, ...features])).slice(0, 8),
    tech,
    direction,
    risks,
    nextSteps,
  }
}

function ProjectPlanner() {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState(emptyAnswers)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [aiPlan, setAiPlan] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState("")
  const [aiCopied, setAiCopied] = useState(false)

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
    setAiPlan(null)
    setAiError("")
    setAiCopied(false)
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
    setAiPlan(null)
    setAiError("")
    setAiCopied(false)
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
    setAiPlan(null)
    setAiError("")
    setAiCopied(false)
  }

  function loadExample() {
    setAnswers(exampleAnswers)
    setStepIndex(4)
    setResult(buildRecommendation(exampleAnswers))
    setMessage("已載入小型店家 + LINE Bot + 預約詢價範例。")
    setCopied(false)
    setAiPlan(null)
    setAiError("")
    setAiCopied(false)
    scrollToSection("demo")
  }

  function resetPlanner() {
    setAnswers(emptyAnswers)
    setStepIndex(0)
    setResult(null)
    setMessage("已清空，可以重新選擇。")
    setCopied(false)
    setAiPlan(null)
    setAiError("")
    setAiCopied(false)
  }

  async function copyRecommendation() {
    const target = result || previewResult
    const text = [
      `推薦方案：${target.planName}`,
      `技術複雜度：${target.complexity}`,
      `適合功能：${target.recommendedFeatures.join("、")}`,
      `建議技術：${target.tech.join(" / ")}`,
      `製作方向：${target.direction}`,
      `風險提醒：${target.risks.join("；")}`,
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

  async function requestAiPlan() {
    if (!validateAll()) return
    const localResult = result || buildRecommendation(answers)
    if (!result) setResult(localResult)
    setAiLoading(true)
    setAiError("")
    setAiCopied(false)
    try {
      const response = await fetch("/api/project-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
          ruleBasedResult: localResult,
        }),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok) throw new Error(data?.error || "AI 規劃產生失敗")
      setAiPlan(data)
      setMessage("AI 完整規劃已產生。")
    } catch (error) {
      setAiError(error?.message || "AI 規劃產生失敗，請稍後再試。")
      setMessage("已保留本地快速建議。")
    } finally {
      setAiLoading(false)
    }
  }

  async function copyAiPlan() {
    if (!aiPlan) {
      setAiError("請先產生 AI 完整規劃。")
      return
    }
    const text = [
      `推薦方案：${aiPlan.recommendedPackage}`,
      `摘要：${aiPlan.summary}`,
      `建議功能：${aiPlan.features?.join("、")}`,
      `技術架構：${aiPlan.techStack?.join(" / ")}`,
      `製作時程：${aiPlan.timeline?.join("；")}`,
      `風險提醒：${aiPlan.risks?.join("；")}`,
      `下一步：${aiPlan.nextSteps?.join("；")}`,
      `技術複雜度：${aiPlan.estimatedComplexity}`,
    ].join("\n")

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      }
      setAiCopied(true)
      setMessage("AI 規劃已複製。")
    } catch {
      setAiCopied(false)
      setAiError("目前瀏覽器不支援自動複製，可以手動選取 AI 規劃內容。")
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
              網站需求診斷
            </h1>
            <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#52605c] md:line-clamp-2">
              回答幾個問題，產生適合的網站、LINE Bot 或系統方向。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
                查看互動 Demo
              </button>
              <button type="button" onClick={loadExample} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                查看範例
              </button>
              <button type="button" onClick={() => scrollToSection("tech")} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
                技術拆解
              </button>
              <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#0d6b62] bg-[#eef7f4] px-5 text-sm font-black text-[#0d6b62] transition hover:bg-[#dff1ec]">
                找我做類似系統
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-[#d8d2c5] bg-[#111c22] p-5 text-white shadow-xl shadow-[#111c22]/10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Instant Result</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["推薦方案", "技術複雜度", "建議功能", "下一步"].map((item) => (
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
              <p className="mt-2 line-clamp-2 text-xs font-bold leading-5 text-[#52605c]">{previewResult.direction}</p>
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
          <h2 className="mt-3 text-3xl font-black">快速建議</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-white/70">{result ? result.planName : "完成選項後產生建議"}</p>
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
              <p className="text-xs font-black text-[#8fd6cc]">風險提醒</p>
              <div className="mt-3 grid gap-2 text-sm font-bold leading-6 text-white/80">
                {(result || previewResult).risks.map((item) => (
                  <span key={item}>・{item}</span>
                ))}
              </div>
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
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={requestAiPlan}
              disabled={aiLoading}
              className="min-h-11 rounded-md bg-white px-5 text-sm font-black text-[#111c22] transition hover:bg-[#eef7f4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {aiLoading ? "AI 規劃中..." : "用 AI 產生完整規劃"}
            </button>
            <button
              type="button"
              onClick={copyAiPlan}
              disabled={!aiPlan}
              className="min-h-11 rounded-md border border-white/20 px-5 text-sm font-black text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiCopied ? "已複製 AI 規劃" : "複製 AI 規劃"}
            </button>
          </div>
          {aiError ? (
            <p className="mt-4 rounded-lg bg-[#fff7ed] px-4 py-3 text-sm font-black text-[#b45309]">{aiError}</p>
          ) : null}
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8fd6cc]">AI 完整規劃</p>
                <h3 className="mt-2 text-2xl font-black">{aiPlan ? aiPlan.recommendedPackage : "等待產生 AI 規劃"}</h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">
                {aiPlan ? aiPlan.estimatedComplexity : "API / Demo"}
              </span>
            </div>
            {aiLoading ? (
              <div className="mt-5 grid gap-2">
                {[82, 68, 76].map((width) => (
                  <div key={width} className="h-2 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-[#8fd6cc]" style={{ width: `${width}%` }} />
                  </div>
                ))}
              </div>
            ) : aiPlan ? (
              <div className="mt-5 grid gap-4">
                <p className="text-sm font-bold leading-7 text-white/78">{aiPlan.summary}</p>
                <PlanList title="建議功能" items={aiPlan.features} />
                <PlanList title="技術架構" items={aiPlan.techStack} />
                <PlanList title="製作時程" items={aiPlan.timeline} />
                <PlanList title="風險提醒" items={aiPlan.risks} />
                <PlanList title="下一步" items={aiPlan.nextSteps} />
              </div>
            ) : (
              <p className="mt-4 text-sm font-bold leading-7 text-white/70">
                完成診斷後，可產生更完整的規劃。
              </p>
            )}
          </div>
          <Link to="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22]">
            聊聊需求
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0d6b62]">Use Case</p>
              <h2 className="mt-2 text-2xl font-black">診斷結果可以怎麼用？</h2>
            </div>
            <p className="max-w-xl text-sm font-bold leading-7 text-[#52605c]">
              先整理方向，再決定要做網站、LINE Bot、AI 工具或小後台。
            </p>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["適合誰", "店家、工作室、個人品牌"],
              ["能做什麼", "分類需求、整理功能、產生建議"],
              ["下一步", "帶著結果到 Contact 頁討論實作"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-4">
                <p className="text-sm font-black text-[#0d6b62]">{title}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-xl border border-[#e3ded3] bg-white p-5">
          <h2 className="text-2xl font-black">想做類似網站或系統？</h2>
          <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">
            我可以先幫你判斷適合網站、LINE Bot、AI 工具還是小型後台。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={() => scrollToSection("demo")} className="inline-flex min-h-11 items-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              開始需求診斷
            </button>
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22]">
              找我做類似系統
            </Link>
          </div>
        </div>
      </section>

      <section id="tech" className="scroll-mt-24 border-y border-[#e6e0d5] bg-[#f2efe7]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Tech</p>
            <h2 className="mt-3 text-3xl font-black">診斷邏輯怎麼做</h2>
            <p className="mt-4 text-sm font-bold leading-7 text-[#52605c]">
              前端診斷邏輯，可升級 AI 顧問或客製成需求表單。
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Frontend", "React / Tailwind"],
              ["Logic", "Rule-based Recommendation"],
              ["API", "Vercel Serverless Function"],
              ["AI", "OpenAI API optional"],
              ["Prompt Flow", "台灣網站與小系統顧問語氣"],
              ["Fallback", "Demo Plan"],
              ["State UI", "React State UI"],
              ["Future", "OpenAI API 可升級成 AI 顧問"],
              ["Deploy", "Vercel"],
              ["CTA", "可客製成你的店家需求表單"],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-xl border border-[#ddd6c9] bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0d6b62]">{label}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{detail}</p>
              </div>
            ))}
            <div className="rounded-xl border border-[#ddd6c9] bg-[#111c22] p-4 text-white md:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">Flow</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
                {["User Input", "Rule Engine", "AI Planner optional", "Recommendation UI", "Contact CTA"].map((item) => (
                  <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-white/85">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

export default ProjectPlanner
