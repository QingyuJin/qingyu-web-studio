import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"
import { seo } from "./content"

const profiles = ["學生", "店家", "工作室", "工程行", "個人品牌"]
const goals = ["網站", "系統", "AI 工具", "LINE Bot"]
const features = ["表單", "後台", "預約", "通知", "SEO"]
const budgets = ["NT$3,000～5,000", "NT$6,000～12,000", "NT$15,000 起", "先討論方向"]
const timelines = ["1～2 週", "1 個月內", "有活動日期", "先規劃 MVP"]

function ToggleGroup({ title, options, selected, onSelect, multi = false }) {
  return (
    <div>
      <p className="text-sm font-black text-[#111c22]">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = multi ? selected.includes(option) : selected === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`min-h-10 rounded-full border px-4 text-sm font-black transition ${
                active ? "border-[#0d6b62] bg-[#eef7f4] text-[#0d6b62]" : "border-[#ddd6c9] bg-white text-[#52605c]"
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProjectPlanner() {
  const [profile, setProfile] = useState("店家")
  const [goal, setGoal] = useState("網站")
  const [selectedFeatures, setSelectedFeatures] = useState(["表單", "SEO"])
  const [budget, setBudget] = useState("NT$6,000～12,000")
  const [timeline, setTimeline] = useState("1 個月內")
  const [submitted, setSubmitted] = useState(true)

  const result = useMemo(() => {
    const needsSystem = goal === "系統" || selectedFeatures.includes("後台")
    const needsAutomation = goal === "LINE Bot" || selectedFeatures.includes("通知")
    const needsAi = goal === "AI 工具"
    const plan = needsAi
      ? "AI 工具 MVP"
      : needsAutomation
        ? "LINE Bot / API 串接方案"
        : needsSystem
          ? "小型系統方案"
          : "品牌網站 / 一頁式網站"
    const complexity = needsAi || needsAutomation || needsSystem ? "中～高" : "低～中"
    return {
      plan,
      complexity,
      features: selectedFeatures.length ? selectedFeatures : ["首頁", "聯絡 CTA", "RWD"],
      next: `${profile}適合先做「${plan}」，預算可從 ${budget} 開始討論，時程建議抓 ${timeline}。`,
    }
  }, [budget, goal, profile, selectedFeatures, timeline])

  function toggleFeature(option) {
    setSelectedFeatures((current) => (
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    ))
  }

  return (
    <SiteLayout>
      <Seo page={seo.planner} />
      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Project Planner</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.35rem,8vw,4.7rem)] font-black leading-[1.04] tracking-tight">
            網站類型診斷
          </h1>
          <p className="mt-5 max-w-3xl text-base font-bold leading-8 text-[#52605c]">
            用幾個問題快速判斷適合做網站、系統、AI 工具還是 LINE Bot。這是前端 Demo，不會送出資料。
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 lg:grid-cols-[1fr_0.85fr]">
        <div className="grid gap-6 rounded-2xl border border-[#e3ded3] bg-white p-5 md:p-6">
          <ToggleGroup title="你是誰" options={profiles} selected={profile} onSelect={setProfile} />
          <ToggleGroup title="想做什麼" options={goals} selected={goal} onSelect={setGoal} />
          <ToggleGroup title="需要功能" options={features} selected={selectedFeatures} onSelect={toggleFeature} multi />
          <ToggleGroup title="預算區間" options={budgets} selected={budget} onSelect={setBudget} />
          <ToggleGroup title="預計上線時間" options={timelines} selected={timeline} onSelect={setTimeline} />
          <button type="button" onClick={() => setSubmitted(true)} className="min-h-11 rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
            產生建議方案
          </button>
        </div>

        <aside className="rounded-2xl border border-[#233139] bg-[#111c22] p-5 text-white md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Result</p>
          <h2 className="mt-3 text-3xl font-black">{submitted ? result.plan : "尚未產生建議"}</h2>
          <div className="mt-6 grid gap-3">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">預估複雜度</p>
              <p className="mt-2 text-xl font-black">{result.complexity}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs font-black text-[#8fd6cc]">適合功能</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.features.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm font-bold leading-7 text-white/75">{result.next}</p>
            </div>
          </div>
          <Link to="/contact" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22]">
            聊聊需求
          </Link>
        </aside>
      </section>
    </SiteLayout>
  )
}

export default ProjectPlanner
