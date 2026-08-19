/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { demoContactPath, getDemo } from "./demoRegistry"

const DemoMissionContext = createContext(null)

export function DemoMission({ definition, slug, children }) {
  const [roleId, setRoleId] = useState("")
  const [stepIndex, setStepIndex] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [resetKey, setResetKey] = useState(0)
  const feedbackTimer = useRef(null)

  const role = definition.roles.find((item) => item.id === roleId) ?? null
  const steps = role?.steps ?? []
  const completed = Boolean(role && stepIndex >= steps.length)
  const currentStep = completed ? null : steps[stepIndex] ?? null

  function announce(message) {
    setFeedback(message)
    window.clearTimeout(feedbackTimer.current)
    feedbackTimer.current = window.setTimeout(() => setFeedback(""), 2200)
  }

  function chooseRole(nextRoleId) {
    setRoleId(nextRoleId)
    setStepIndex(0)
    setResetKey((value) => value + 1)
    window.setTimeout(() => {
      document.querySelector("[data-demo-step]")?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 80)
  }

  function completeStep(action, message = "操作完成") {
    if (!currentStep || currentStep.action !== action) return false
    announce(message)
    setStepIndex((value) => value + 1)
    return true
  }

  function bringToStep() {
    if (!currentStep) return
    const target = document.querySelector(`[data-demo-step="${currentStep.id}"]`)
    if (!target) {
      announce("正在準備下一個操作")
      return
    }
    target.scrollIntoView({ behavior: "smooth", block: "center" })
    target.classList.remove("demo-step-highlight")
    window.requestAnimationFrame(() => target.classList.add("demo-step-highlight"))
    window.setTimeout(() => target.classList.remove("demo-step-highlight"), 1800)
  }

  function reset() {
    setStepIndex(0)
    setFeedback("")
    setResetKey((value) => value + 1)
    window.dispatchEvent(new CustomEvent("qingyu:demo-reset", { detail: { slug } }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function exitMission() {
    setRoleId("")
    reset()
  }

  useEffect(() => () => window.clearTimeout(feedbackTimer.current), [])

  const value = {
    slug,
    definition,
    role,
    roleId,
    currentStep,
    stepIndex,
    steps,
    completed,
    resetKey,
    chooseRole,
    completeStep,
    bringToStep,
    reset,
    exitMission,
    announce,
  }

  return (
    <DemoMissionContext.Provider value={value}>
      {!role ? <DemoRoleSelector /> : completed ? <DemoCompletion /> : (
        <>
          <DemoGuide />
          <div key={`${roleId}-${resetKey}`} className="demo-mission-content pb-36 sm:pb-8">{children}</div>
        </>
      )}
      <div aria-live="polite" aria-atomic="true" className={`demo-feedback ${feedback ? "is-visible" : ""}`}>
        {feedback}
      </div>
    </DemoMissionContext.Provider>
  )
}

export function useDemoMission() {
  const context = useContext(DemoMissionContext)
  if (!context) throw new Error("useDemoMission must be used inside DemoMission")
  return context
}

export function DemoRoleSelector() {
  const { definition, chooseRole } = useDemoMission()
  return (
    <main className="grid min-h-[calc(100svh-3rem)] place-items-center px-4 py-8 sm:px-6">
      <section className="w-full max-w-3xl rounded-[1.5rem] border border-[#d8d4ca] bg-[#fbfaf7] p-5 shadow-[0_28px_80px_rgba(16,28,28,.12)] sm:p-8">
        <p className="text-[11px] font-bold tracking-[.15em] text-[#48766c]">30 秒任務體驗</p>
        <h1 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,5vw,2.65rem)] font-semibold tracking-[-.04em] text-[#13201f]">{definition.title}</h1>
        <p className="mt-4 max-w-xl text-[15px] font-medium leading-7 text-[#56635f] sm:text-base">{definition.problem}</p>
        <div className={`mt-7 grid gap-3 ${definition.roles.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {definition.roles.map((role) => (
            <button key={role.id} type="button" onClick={() => chooseRole(role.id)} className="group min-h-28 rounded-2xl border border-[#d8d4ca] bg-white p-5 text-left transition hover:border-[#6a958a] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#8cb8ad]/25">
              <span className="text-sm font-bold text-[#1c5a50]">{role.label}</span>
              <span className="mt-3 block text-xl font-semibold tracking-[-.025em] text-[#17211f]">{role.goal}</span>
              <span className="mt-3 inline-flex items-center text-xs font-bold text-[#52605c]">開始體驗 <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
            </button>
          ))}
        </div>
        <p className="mt-5 text-xs font-semibold text-[#7b8581]">{definition.duration} 不需要帳號 資料可一鍵重設</p>
      </section>
    </main>
  )
}

export function DemoGuide() {
  const { role, stepIndex, steps, currentStep, bringToStep, reset } = useDemoMission()
  return (
    <aside className="demo-guide fixed inset-x-0 bottom-0 z-[95] border-t border-[#d5d2c8] bg-[#fbfaf7]/[.98] p-3 shadow-[0_-16px_40px_rgba(19,32,31,.12)] backdrop-blur-xl sm:sticky sm:top-12 sm:border-b sm:border-t-0 sm:px-5 sm:py-3 sm:shadow-sm" aria-label="體驗任務">
      <div className="mx-auto flex max-w-6xl items-center gap-3 sm:gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[.08em] text-[#60706b]">
            <span className="truncate">目前角色 {role.label}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{`任務 ${stepIndex + 1} / ${steps.length}`}</span>
          </div>
          <p className="mt-1 truncate text-sm font-bold text-[#17211f] sm:text-[15px]">{currentStep.instruction}</p>
          <div className="mt-2 flex gap-1" aria-hidden="true">
            {steps.map((step, index) => <span key={step.id} className={`h-1 flex-1 rounded-full ${index <= stepIndex ? "bg-[#2d6d62]" : "bg-[#d8ddd9]"}`} />)}
          </div>
        </div>
        <button type="button" onClick={bringToStep} className="min-h-11 shrink-0 rounded-full bg-[#173c37] px-3 text-[11px] font-bold text-white sm:px-5 sm:text-xs">帶我去</button>
        <DemoReset onReset={reset} compact />
      </div>
    </aside>
  )
}

export function DemoStep({ id, as: Component = "div", className = "", children }) {
  return <Component data-demo-step={id} className={`demo-step-target ${className}`}>{children}</Component>
}

export function DemoReset({ onReset, compact = false }) {
  const mission = useContext(DemoMissionContext)
  const handleReset = onReset ?? mission?.reset
  return (
    <button type="button" onClick={handleReset} className={`${compact ? "inline-flex px-3 text-[10px] sm:px-4 sm:text-xs" : "inline-flex px-4 text-xs"} min-h-11 shrink-0 items-center rounded-full border border-[#c8cfca] bg-white font-bold text-[#44524e]`}>
      重新開始
    </button>
  )
}

function DemoCompletion() {
  const { definition, role, reset, exitMission, slug } = useDemoMission()
  const demo = getDemo(slug)
  return (
    <main className="grid min-h-[calc(100svh-3rem)] place-items-center px-4 py-8 sm:px-6">
      <section className="w-full max-w-2xl rounded-[1.5rem] border border-[#d8d4ca] bg-[#fbfaf7] p-6 shadow-[0_28px_80px_rgba(16,28,28,.12)] sm:p-9">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-[#dfeee9] text-xl font-black text-[#1d6659]">✓</span>
        <p className="mt-5 text-xs font-bold tracking-[.13em] text-[#48766c]">任務完成</p>
        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-[-.035em] text-[#17211f] sm:text-3xl">{role.result}</h1>
        <div className="mt-6 grid gap-3 border-y border-[#dedbd2] py-5">
          {role.checklist.map((item) => <p key={item} className="flex items-center gap-3 text-sm font-semibold text-[#44524e]"><span className="text-[#1d6659]">✓</span>{item}</p>)}
        </div>
        <p className="mt-6 text-[15px] font-semibold leading-7 text-[#3f4e4a]">{definition.businessResult}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
          <Link to={demo ? demoContactPath(demo) : "/contact?type=business-system"} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#173c37] px-6 text-sm font-bold text-white">我也想做類似系統</Link>
          <button type="button" onClick={reset} className="min-h-12 rounded-full border border-[#c8cfca] bg-white px-5 text-sm font-bold text-[#44524e]">再玩一次</button>
        </div>
        {definition.roles.length > 1 ? <button type="button" onClick={exitMission} className="mt-4 min-h-11 w-full text-xs font-bold text-[#697570] underline underline-offset-4">切換體驗角色</button> : null}
      </section>
    </main>
  )
}
