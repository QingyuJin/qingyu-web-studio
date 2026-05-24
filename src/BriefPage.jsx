import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const ownerEmail = "a0988874324@gmail.com"
const lineId = "mulavuc"
const instagram = "qingyu.jin"

const steps = [
  {
    key: "type",
    label: "網站類型",
    title: "你想做哪一種網站？",
    desc: "先不用想功能，先選最接近你的情境。",
  },
  {
    key: "goal",
    label: "主要目的",
    title: "網站最重要的目的是什麼？",
    desc: "這會影響首頁內容、CTA 和整體架構。",
  },
  {
    key: "features",
    label: "需要功能",
    title: "你希望網站包含哪些東西？",
    desc: "可以多選。功能越多，製作範圍和時間通常也會增加。",
  },
  {
    key: "content",
    label: "素材狀態",
    title: "你目前有哪些素材？",
    desc: "有素材會比較快，沒有也可以先從整理開始。",
  },
  {
    key: "style",
    label: "風格偏好",
    title: "你喜歡什麼樣的網站感覺？",
    desc: "不用很專業，用直覺選就可以。",
  },
  {
    key: "budget",
    label: "預算時程",
    title: "你的預算和希望完成時間？",
    desc: "這不是最終報價，只是先判斷適不適合做。",
  },
  {
    key: "contact",
    label: "聯絡方式",
    title: "最後留下聯絡方式和補充說明。",
    desc: "填完後可以複製摘要傳給我，或直接用 Email 開啟。",
  },
]

const siteTypes = [
  {
    id: "studio",
    title: "工作室 / 預約制網站",
    desc: "美甲、美睫、攝影、美容、健身教練、個人工作室。",
    example: "服務、價格、作品、預約流程、LINE / IG / Map",
  },
  {
    id: "portfolio",
    title: "個人作品集 / 履歷網站",
    desc: "學生、求職者、創作者、接案者、設計師。",
    example: "個人介紹、技能、專案、履歷、GitHub / Email",
  },
  {
    id: "service",
    title: "服務介紹 / 顧問網站",
    desc: "課程老師、顧問、家教、自由工作者、小型團隊。",
    example: "服務內容、方案比較、合作流程、FAQ、需求表",
  },
  {
    id: "shop",
    title: "小店 / 品牌形象頁",
    desc: "咖啡廳、小餐飲、小品牌、手作、地方店家。",
    example: "菜單、地點、營業時間、品牌介紹、社群入口",
  },
  {
    id: "event",
    title: "活動宣傳頁",
    desc: "講座、社團活動、工作坊、課程招生、成果展。",
    example: "活動資訊、時間表、報名表、注意事項、FAQ",
  },
  {
    id: "other",
    title: "還不確定 / 其他",
    desc: "還沒有明確方向，想先整理需求。",
    example: "先從用途、素材、預算和時程判斷。",
  },
]

const goals = [
  "讓人快速了解我 / 我的品牌",
  "展示作品或專案",
  "讓客戶預約或聯絡",
  "整理服務和價格",
  "放在 IG / LINE / Google Map 上當正式入口",
  "活動報名或資訊公告",
  "求職或申請用",
  "舊網站重新整理 / 手機版修正",
]

const features = [
  "首頁主視覺",
  "服務 / 價格區",
  "作品展示",
  "專案案例",
  "預約流程",
  "活動時間表",
  "FAQ 常見問題",
  "LINE / IG / Email 連結",
  "Google Map",
  "Google Form / Tally 表單連結",
  "OG 分享圖",
  "SEO 基本設定",
  "自訂網域",
  "部署上線",
  "舊網站改版",
]

const contentStatus = [
  "已有 Logo / 品牌名稱",
  "已有照片或作品圖",
  "已有價格表",
  "已有服務介紹文字",
  "已有 IG / LINE / Google Map",
  "已有參考網站",
  "還沒有素材，需要一起整理",
  "只有想法，還沒整理過",
]

const styleOptions = [
  {
    id: "clean",
    title: "乾淨簡約",
    desc: "留白多、清楚、少裝飾，適合作品集和服務頁。",
  },
  {
    id: "warm",
    title: "溫暖質感",
    desc: "柔和、自然、有生活感，適合工作室、小店、個人品牌。",
  },
  {
    id: "tech",
    title: "科技俐落",
    desc: "深色、明確、專業，適合工程、顧問、SaaS、作品展示。",
  },
  {
    id: "bold",
    title: "強烈吸睛",
    desc: "大標題、強烈對比、活動感，適合活動頁、宣傳頁。",
  },
  {
    id: "notSure",
    title: "還不確定",
    desc: "可以先給參考網站，我再幫你整理方向。",
  },
]

const budgetOptions = [
  "NT$2,000 以下",
  "NT$2,000–4,000",
  "NT$4,000–8,000",
  "NT$8,000–15,000",
  "NT$15,000 以上",
  "還不確定",
]

const timelineOptions = [
  "一週內",
  "兩週內",
  "一個月內",
  "不急，可以慢慢做",
  "還不確定",
]

const initialBrief = {
  type: "",
  goals: [],
  features: [],
  contentStatus: [],
  style: "",
  budget: "",
  timeline: "",
  name: "",
  contact: "",
  reference: "",
  note: "",
}

function BriefPage() {
  const [brief, setBrief] = useState(initialBrief)
  const [stepIndex, setStepIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const savedBrief = localStorage.getItem("qingyu-brief")
      if (savedBrief) {
        setBrief({ ...initialBrief, ...JSON.parse(savedBrief) })
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("qingyu-brief", JSON.stringify(brief))
      setSaved(true)
      const timer = window.setTimeout(() => setSaved(false), 800)
      return () => window.clearTimeout(timer)
    } catch {
      return undefined
    }
  }, [brief])

  const activeStep = steps[stepIndex]
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100)

  const selectedType = siteTypes.find((item) => item.id === brief.type)
  const selectedStyle = styleOptions.find((item) => item.id === brief.style)

  const estimate = useMemo(() => getEstimate(brief), [brief])
  const summaryText = useMemo(
    () => buildSummary({ brief, selectedType, selectedStyle, estimate }),
    [brief, selectedType, selectedStyle, estimate]
  )

  const mailHref = `mailto:${ownerEmail}?subject=${encodeURIComponent(
    "網站需求初步整理"
  )}&body=${encodeURIComponent(summaryText)}`

  function updateField(key, value) {
    setBrief((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function toggleArrayValue(key, value) {
    setBrief((current) => {
      const list = current[key]
      const exists = list.includes(value)

      return {
        ...current,
        [key]: exists ? list.filter((item) => item !== value) : [...list, value],
      }
    })
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = summaryText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    }
  }

  function resetBrief() {
    const confirmed = window.confirm("確定要清空目前填寫的內容嗎？")
    if (!confirmed) return

    setBrief(initialBrief)
    setStepIndex(0)

    try {
      localStorage.removeItem("qingyu-brief")
    } catch {
      // ignore
    }
  }

  function goNext() {
    setStepIndex((current) => Math.min(current + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function goPrev() {
    setStepIndex((current) => Math.max(current - 1, 0))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#08090d] text-white">
      <Background />

      <header className="sticky top-0 z-50 w-full max-w-full border-b border-white/10 bg-[#08090d]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <Link
            to="/"
            className="min-w-0 shrink rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            ← 回首頁
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden rounded-full bg-white/5 px-4 py-2 text-xs text-white/50 sm:inline-flex">
              {saved ? "已暫存" : "自動暫存"}
            </span>
            <button
              type="button"
              onClick={resetBrief}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/65 transition hover:border-red-300/50 hover:text-red-200"
            >
              清空
            </button>
          </div>
        </div>
      </header>

      <section className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pb-20 pt-8 sm:px-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)] lg:gap-6 lg:pt-14">
        <div className="min-w-0">
          <div className="mb-6 w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:rounded-[2rem]">
            <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0">
                <p className="text-safe text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm sm:tracking-[0.28em]">
                  Website Brief Builder
                </p>
                <h1 className="text-safe mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  先把網站需求整理清楚。
                </h1>
                <p className="text-safe mt-4 max-w-2xl leading-8 text-white/58">
                  不用一開始就懂網站規格。照步驟選完後，系統會幫你整理一份可以直接傳給我的需求摘要。
                </p>
              </div>

              <div className="w-full shrink-0 rounded-3xl bg-cyan-300 p-5 text-black sm:w-auto">
                <p className="text-sm font-semibold text-black/55">完成進度</p>
                <p className="mt-1 text-4xl font-semibold">{progress}%</p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-300 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-5 flex max-w-full gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
              {steps.map((step, index) => (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => setStepIndex(index)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    stepIndex === index
                      ? "bg-white text-black"
                      : index < stepIndex
                        ? "bg-cyan-300/15 text-cyan-200"
                        : "bg-white/5 text-white/45 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {index + 1}. {step.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#11141d]/90 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:rounded-[2.4rem] md:p-8">
            <p className="text-sm font-semibold text-cyan-300">
              STEP {stepIndex + 1} / {steps.length}
            </p>
            <h2 className="text-safe mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {activeStep.title}
            </h2>
            <p className="text-safe mt-4 max-w-2xl leading-8 text-white/58">
              {activeStep.desc}
            </p>

            <div className="mt-8 min-w-0">
              {activeStep.key === "type" && (
                <TypeStep
                  value={brief.type}
                  onChange={(value) => updateField("type", value)}
                />
              )}

              {activeStep.key === "goal" && (
                <MultiChoiceStep
                  options={goals}
                  selected={brief.goals}
                  onToggle={(value) => toggleArrayValue("goals", value)}
                />
              )}

              {activeStep.key === "features" && (
                <MultiChoiceStep
                  options={features}
                  selected={brief.features}
                  onToggle={(value) => toggleArrayValue("features", value)}
                />
              )}

              {activeStep.key === "content" && (
                <MultiChoiceStep
                  options={contentStatus}
                  selected={brief.contentStatus}
                  onToggle={(value) => toggleArrayValue("contentStatus", value)}
                />
              )}

              {activeStep.key === "style" && (
                <StyleStep
                  value={brief.style}
                  onChange={(value) => updateField("style", value)}
                />
              )}

              {activeStep.key === "budget" && (
                <BudgetStep
                  budget={brief.budget}
                  timeline={brief.timeline}
                  onBudget={(value) => updateField("budget", value)}
                  onTimeline={(value) => updateField("timeline", value)}
                />
              )}

              {activeStep.key === "contact" && (
                <ContactStep brief={brief} updateField={updateField} />
              )}
            </div>

            <div className="mt-10 flex min-w-0 flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goPrev}
                disabled={stepIndex === 0}
                className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
              >
                上一步
              </button>

              <div className="grid w-full grid-cols-1 gap-3 sm:w-auto sm:grid-cols-2">
                <button
                  type="button"
                  onClick={copySummary}
                  className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300 hover:text-black"
                >
                  {copied ? "已複製摘要" : "複製摘要"}
                </button>

                {stepIndex < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
                  >
                    下一步 →
                  </button>
                ) : (
                  <a
                    href={mailHref}
                    className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-cyan-200"
                  >
                    用 Email 傳給我
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <SummaryPanel
            brief={brief}
            selectedType={selectedType}
            selectedStyle={selectedStyle}
            estimate={estimate}
            summaryText={summaryText}
            copied={copied}
            copySummary={copySummary}
            mailHref={mailHref}
          />
        </aside>
      </section>
    </main>
  )
}

function TypeStep({ value, onChange }) {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2">
      {siteTypes.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`group min-w-0 rounded-[1.6rem] border p-5 text-left transition hover:-translate-y-1 sm:rounded-[2rem] ${
            value === item.id
              ? "border-cyan-300 bg-cyan-300 text-black shadow-2xl shadow-cyan-300/15"
              : "border-white/10 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.09]"
          }`}
        >
          <div className="flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-safe text-xl font-semibold">{item.title}</h3>
              <p
                className={`text-safe mt-3 leading-7 ${
                  value === item.id ? "text-black/65" : "text-white/58"
                }`}
              >
                {item.desc}
              </p>
            </div>
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm ${
                value === item.id ? "border-black bg-black text-cyan-300" : "border-white/20"
              }`}
            >
              {value === item.id ? "✓" : ""}
            </span>
          </div>

          <div
            className={`text-safe mt-5 rounded-2xl p-4 text-sm leading-7 ${
              value === item.id ? "bg-black/8 text-black/65" : "bg-white/5 text-white/45"
            }`}
          >
            {item.example}
          </div>
        </button>
      ))}
    </div>
  )
}

function MultiChoiceStep({ options, selected, onToggle }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = selected.includes(option)

        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`flex min-w-0 items-start gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
              active
                ? "border-cyan-300 bg-cyan-300 text-black"
                : "border-white/10 bg-white/[0.06] text-white hover:border-white/30"
            }`}
          >
            <span
              className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs ${
                active ? "border-black bg-black text-cyan-300" : "border-white/25"
              }`}
            >
              {active ? "✓" : ""}
            </span>
            <span
              className={`text-safe min-w-0 leading-7 ${
                active ? "text-black/75" : "text-white/62"
              }`}
            >
              {option}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function StyleStep({ value, onChange }) {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2">
      {styleOptions.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`min-w-0 rounded-[1.6rem] border p-5 text-left transition hover:-translate-y-1 sm:rounded-[2rem] ${
            value === item.id
              ? "border-cyan-300 bg-cyan-300 text-black"
              : "border-white/10 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.09]"
          }`}
        >
          <div className="flex min-w-0 items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-safe text-xl font-semibold">{item.title}</h3>
              <p
                className={`text-safe mt-3 leading-7 ${
                  value === item.id ? "text-black/65" : "text-white/58"
                }`}
              >
                {item.desc}
              </p>
            </div>
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm ${
                value === item.id ? "border-black bg-black text-cyan-300" : "border-white/20"
              }`}
            >
              {value === item.id ? "✓" : ""}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

function BudgetStep({ budget, timeline, onBudget, onTimeline }) {
  return (
    <div className="grid min-w-0 gap-6">
      <div className="min-w-0">
        <h3 className="text-safe text-xl font-semibold">預算範圍</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {budgetOptions.map((item) => (
            <OptionButton key={item} active={budget === item} onClick={() => onBudget(item)}>
              {item}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <h3 className="text-safe text-xl font-semibold">希望完成時間</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {timelineOptions.map((item) => (
            <OptionButton key={item} active={timeline === item} onClick={() => onTimeline(item)}>
              {item}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  )
}

function OptionButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-safe min-w-0 rounded-2xl border p-4 text-left font-semibold transition hover:-translate-y-0.5 ${
        active
          ? "border-cyan-300 bg-cyan-300 text-black"
          : "border-white/10 bg-white/[0.06] text-white/62 hover:border-white/30 hover:text-white"
      }`}
    >
      {children}
    </button>
  )
}

function ContactStep({ brief, updateField }) {
  return (
    <div className="grid min-w-0 gap-5">
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <InputBox
          label="你的稱呼 / 名字"
          value={brief.name}
          placeholder="例如：晴宇 / 某某工作室"
          onChange={(value) => updateField("name", value)}
        />

        <InputBox
          label="聯絡方式"
          value={brief.contact}
          placeholder="LINE、IG、Email 都可以"
          onChange={(value) => updateField("contact", value)}
        />
      </div>

      <InputBox
        label="參考網站或社群連結"
        value={brief.reference}
        placeholder="可以貼 IG、舊網站、喜歡的網站、Google Map"
        onChange={(value) => updateField("reference", value)}
      />

      <label className="block min-w-0">
        <span className="text-sm font-semibold text-white/60">補充說明</span>
        <textarea
          value={brief.note}
          onChange={(event) => updateField("note", event.target.value)}
          placeholder="例如：目前只有 IG、想放價格表、希望手機版好看、想要兩週內完成……"
          rows={7}
          className="mt-3 w-full max-w-full resize-none rounded-[1.5rem] border border-white/10 bg-white/[0.06] px-5 py-4 leading-8 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:bg-white/[0.08]"
        />
      </label>
    </div>
  )
}

function InputBox({ label, value, placeholder, onChange }) {
  return (
    <label className="block min-w-0">
      <span className="text-sm font-semibold text-white/60">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full max-w-full rounded-[1.3rem] border border-white/10 bg-white/[0.06] px-5 py-4 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/60 focus:bg-white/[0.08]"
      />
    </label>
  )
}

function SummaryPanel({
  brief,
  selectedType,
  selectedStyle,
  estimate,
  summaryText,
  copied,
  copySummary,
  mailHref,
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/35 backdrop-blur-xl sm:rounded-[2.2rem] sm:p-5">
      <div className="rounded-[1.5rem] bg-cyan-300 p-5 text-black sm:rounded-[1.7rem]">
        <p className="text-sm font-semibold text-black/55">系統初步判斷</p>
        <h3 className="text-safe mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {estimate.title}
        </h3>
        <p className="text-safe mt-3 leading-7 text-black/65">{estimate.desc}</p>
      </div>

      <div className="mt-5 grid min-w-0 gap-3">
        <MiniRow label="網站類型" value={selectedType?.title || "尚未選擇"} />
        <MiniRow
          label="主要目的"
          value={brief.goals.length ? `${brief.goals.length} 項` : "尚未選擇"}
        />
        <MiniRow
          label="需要功能"
          value={brief.features.length ? `${brief.features.length} 項` : "尚未選擇"}
        />
        <MiniRow label="風格" value={selectedStyle?.title || "尚未選擇"} />
        <MiniRow label="預算" value={brief.budget || "尚未選擇"} />
        <MiniRow label="時程" value={brief.timeline || "尚未選擇"} />
      </div>

      <div className="mt-5 min-w-0 overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/25 p-4">
        <p className="text-sm font-semibold text-white/45">需求摘要預覽</p>
        <pre className="mt-3 max-h-[300px] max-w-full overflow-y-auto whitespace-pre-wrap break-all text-sm leading-7 text-white/68">
          {summaryText}
        </pre>
      </div>

      <div className="mt-5 grid gap-3">
        <button
          type="button"
          onClick={copySummary}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-200"
        >
          {copied ? "已複製，可以貼給我" : "複製需求摘要"}
        </button>

        <a
          href={mailHref}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-white/40"
        >
          用 Email 傳送
        </a>

        <div className="min-w-0 rounded-[1.5rem] bg-white/5 p-4">
          <p className="text-sm font-semibold text-white/45">也可以私訊</p>
          <p className="text-safe mt-2 text-sm leading-7 text-white/65">
            LINE：{lineId}
            <br />
            IG：{instagram}
          </p>
        </div>
      </div>
    </div>
  )
}

function MiniRow({ label, value }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4 rounded-2xl bg-white/5 p-4">
      <span className="shrink-0 text-sm text-white/40">{label}</span>
      <span className="text-safe min-w-0 text-right text-sm font-semibold text-white/75">
        {value}
      </span>
    </div>
  )
}

function getEstimate(brief) {
  let score = 0

  if (brief.type) score += 2
  if (brief.type === "portfolio") score += 1
  if (brief.type === "studio" || brief.type === "service") score += 2
  if (brief.type === "shop" || brief.type === "event") score += 2
  if (brief.type === "other") score += 1

  score += Math.min(brief.goals.length, 4)
  score += Math.min(brief.features.length, 7)
  score += brief.contentStatus.includes("還沒有素材，需要一起整理") ? 2 : 0
  score += brief.contentStatus.includes("只有想法，還沒整理過") ? 2 : 0

  if (brief.timeline === "一週內") score += 3
  if (brief.timeline === "兩週內") score += 1

  if (brief.features.includes("自訂網域")) score += 1
  if (brief.features.includes("舊網站改版")) score += 2
  if (brief.features.includes("SEO 基本設定")) score += 1
  if (brief.features.includes("Google Form / Tally 表單連結")) score += 1

  if (score <= 6) {
    return {
      title: "小型簡單頁",
      desc: "看起來適合從簡單一頁式或作品集開始，範圍可以控制得比較輕。",
    }
  }

  if (score <= 12) {
    return {
      title: "標準一頁式網站",
      desc: "需求已有一定內容，適合做成完整一頁式網站，包含區塊規劃、RWD 和部署。",
    }
  }

  if (score <= 18) {
    return {
      title: "進階整理型網站",
      desc: "內容與功能較多，需要先整理架構，可能會有較多修改與溝通。",
    }
  }

  return {
    title: "需要拆範圍評估",
    desc: "需求較多，建議先拆成第一版可上線範圍，避免一次做太大導致超出預算或時間。",
  }
}

function buildSummary({ brief, selectedType, selectedStyle, estimate }) {
  const line = "--------------------------------"

  return `【網站需求初步整理】

${line}

一、基本方向
稱呼 / 名字：${brief.name || "未填"}
聯絡方式：${brief.contact || "未填"}
網站類型：${selectedType?.title || "未選擇"}
風格偏好：${selectedStyle?.title || "未選擇"}

二、主要目的
${formatList(brief.goals)}

三、需要功能
${formatList(brief.features)}

四、目前素材狀態
${formatList(brief.contentStatus)}

五、預算與時程
預算：${brief.budget || "未選擇"}
時程：${brief.timeline || "未選擇"}

六、參考資料
${brief.reference || "未填"}

七、補充說明
${brief.note || "未填"}

${line}

系統初步判斷：${estimate.title}
${estimate.desc}

我想請你先幫我判斷這個需求適不適合做成小型網站，並給我初步建議。`
}

function formatList(list) {
  if (!list.length) return "未選擇"
  return list.map((item) => `- ${item}`).join("\n")
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#08090d]">
      <div className="absolute left-[-220px] top-[-200px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px] sm:h-[520px] sm:w-[520px]" />
      <div className="absolute right-[-260px] top-[180px] h-[480px] w-[480px] rounded-full bg-violet-500/10 blur-[150px] sm:h-[620px] sm:w-[620px]" />
      <div className="absolute bottom-[-260px] left-[10%] h-[480px] w-[480px] rounded-full bg-amber-300/8 blur-[160px] sm:h-[620px] sm:w-[620px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>
  )
}

export default BriefPage