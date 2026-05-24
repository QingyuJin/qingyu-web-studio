import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const QG_TOTAL_TARGET = 630

const profileStats = [
  { label: "Squat", value: "240kg", sub: "Lower body force" },
  { label: "Bench", value: "140kg", sub: "Upper body press" },
  { label: "Deadlift", value: "250kg", sub: "Posterior chain power" },
  { label: "Total", value: "630kg", sub: "Strength signature" },
]

const painPoints = [
  {
    title: "學員私訊資訊太少",
    desc: "很多人只問「我想變壯，怎麼收費？」但沒有目標、年資、傷病史、訓練頻率與飲食資訊。",
  },
  {
    title: "教練重複回答一樣問題",
    desc: "方案、訓練方向、適合對象、課前準備、注意事項，常常都在私訊裡重複說明。",
  },
  {
    title: "卡關原因不一定是課表",
    desc: "重量停滯可能來自技術、恢復、睡眠、飲食、壓力或負荷配置，不只是再加訓練量。",
  },
  {
    title: "成果與專業難被整理",
    desc: "教練有經驗和案例，但如果只散在 IG、限動和聊天紀錄裡，新學員很難快速理解。",
  },
]

const storyCards = [
  {
    title: "12+ years under the bar",
    desc: "從很早就開始訓練，累積力量舉、多功能訓練、肌肥大規劃與健身房現場觀察。",
  },
  {
    title: "630kg total strength base",
    desc: "深蹲 240kg、臥推 140kg、傳統硬舉 250kg，不是只做健身主題，而是有真實力量背景。",
  },
  {
    title: "Built through recovery",
    desc: "曾經歷腳踝、肩膀與旋轉肌問題，讓訓練思維更重視負荷管理、動作品質與長期回歸。",
  },
]

const principles = [
  {
    title: "力量不是每天硬幹",
    desc: "訓練需要壓力，也需要恢復。真正能長期進步的課表，必須考慮強度、容量、動作品質與恢復能力。",
  },
  {
    title: "肌肥大不是只靠感覺",
    desc: "肌肉成長需要訓練量、漸進超負荷、飲食配合與足夠睡眠，而不是每次練到崩潰才算有效。",
  },
  {
    title: "傷後回歸要更理解身體",
    desc: "受傷回歸不是急著加重量，而是重新理解關節、肌肉、控制、恢復與訓練節奏。",
  },
]

const programs = [
  {
    title: "Foundation Strength",
    subtitle: "新手力量基礎",
    desc: "適合剛開始重訓、想學會深蹲、臥推、硬舉與基本訓練觀念的人。",
    items: ["動作基礎", "訓練頻率安排", "漸進式加重", "基礎飲食建議"],
  },
  {
    title: "Hypertrophy Build",
    subtitle: "肌肥大與體態規劃",
    desc: "適合想變壯、增加肌肉量、改善體態，並建立穩定訓練習慣的人。",
    items: ["肌群分配", "訓練容量規劃", "飲食習慣檢查", "週期性調整"],
    featured: true,
  },
  {
    title: "Strength Breakthrough",
    subtitle: "力量突破與卡關調整",
    desc: "適合訓練一段時間，但重量、動作品質、恢復或課表安排遇到瓶頸的人。",
    items: ["卡關分析", "弱點補強", "主項週期安排", "恢復管理"],
  },
  {
    title: "Online Review",
    subtitle: "線上課表與動作回饋",
    desc: "適合已有訓練經驗，希望透過課表、影片回饋與紀錄追蹤持續進步的人。",
    items: ["線上課表", "影片回饋", "訓練紀錄", "階段調整"],
  },
]

const coachTestQuestions = [
  "如果學員私訊前先填這份評估表，你會不會比較好判斷？",
  "你平常最常重複回答學員哪些問題？",
  "你會不會想要這種接案頁 + 學員表單 + PR 紀錄工具？",
  "如果要變成真的產品，還需要加入預約、付款、課表或影片回饋嗎？",
]

const intakeSteps = [
  { key: "goal", label: "目標", title: "你目前最主要的訓練目標是什麼？" },
  { key: "body", label: "身體狀態", title: "先了解你的基本狀態與健康狀況。" },
  { key: "training", label: "訓練經驗", title: "你目前怎麼練？一週可以練幾天？" },
  { key: "lifts", label: "力量數據", title: "如果你有深蹲、臥推、硬舉數字，可以先填。" },
  { key: "lifestyle", label: "生活習慣", title: "恢復、飲食、睡眠與壓力會影響訓練結果。" },
  { key: "summary", label: "摘要", title: "產生學員版與教練版摘要。" },
]

const goalOptions = [
  "增肌",
  "減脂",
  "力量提升",
  "三項入門",
  "力量舉備賽",
  "體態改善",
  "傷後回歸訓練",
  "建立穩定運動習慣",
]

const trainingAgeOptions = [
  "完全新手",
  "3 個月以下",
  "3–12 個月",
  "1–3 年",
  "3 年以上",
  "曾經練過但中斷很久",
]

const daysOptions = [
  "每週 1–2 天",
  "每週 3 天",
  "每週 4 天",
  "每週 5 天以上",
  "目前不固定",
]

const dietOptions = [
  "沒有特別控制",
  "大概知道熱量和蛋白質",
  "有固定記錄飲食",
  "常外食",
  "正在減脂",
  "正在增肌",
]

const motivationOptions = [
  "想變強",
  "想變壯",
  "想改善體態",
  "想恢復自信",
  "想比賽",
  "想改善健康",
  "朋友影響",
  "想建立紀律",
]

const initialIntake = {
  goals: [],
  age: "",
  height: "",
  weight: "",
  health: "",
  trainingAge: "",
  days: "",
  currentPlan: "",
  squat: "",
  bench: "",
  deadlift: "",
  sleep: "",
  diet: [],
  motivation: [],
  note: "",
  contact: "",
}

function FitnessCoachDemo() {
  const [intake, setIntake] = useState(initialIntake)
  const [stepIndex, setStepIndex] = useState(0)
  const [copiedLabel, setCopiedLabel] = useState("")
  const [pr, setPr] = useState({
    bodyweight: "",
    squat: "",
    bench: "",
    deadlift: "",
  })

  const activeStep = intakeSteps[stepIndex]
  const intakeEstimate = useMemo(() => getIntakeEstimate(intake), [intake])
  const studentSummary = useMemo(
    () => buildStudentSummary(intake, intakeEstimate),
    [intake, intakeEstimate]
  )
  const coachSummary = useMemo(
    () => buildCoachSummary(intake, intakeEstimate),
    [intake, intakeEstimate]
  )
  const prResult = useMemo(() => calculatePr(pr), [pr])

  function updateIntake(key, value) {
    setIntake((current) => ({
      ...current,
      [key]: value,
    }))
  }

  function toggleIntake(key, value) {
    setIntake((current) => {
      const list = current[key]
      const exists = list.includes(value)

      return {
        ...current,
        [key]: exists ? list.filter((item) => item !== value) : [...list, value],
      }
    })
  }

  function updatePr(key, value) {
    setPr((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function copyText(label, text) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLabel(label)
      window.setTimeout(() => setCopiedLabel(""), 1400)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopiedLabel(label)
      window.setTimeout(() => setCopiedLabel(""), 1400)
    }
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#030408] text-white">
      <StormStyles />
      <StormBackground />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030408]/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <Link
            to="/"
            className="max-w-[46vw] truncate rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-sky-200/45 hover:bg-white/10 sm:max-w-none"
          >
            ← 回首頁
          </Link>

          <a
            href="#intake"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-black shadow-[0_0_26px_rgba(255,255,255,0.20)] transition hover:bg-sky-100"
          >
            學員評估
          </a>
        </div>
      </header>

      <section className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-16 pt-12 sm:px-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)] md:items-center md:gap-10 md:pb-24 md:pt-24">
        <div className="min-w-0">
          <p className="inline-flex max-w-full rounded-full border border-sky-100/25 bg-sky-100/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 sm:tracking-[0.18em]">
            Strength / Sports Science / Thunder Mode
          </p>

          <h1 className="mt-6 max-w-4xl break-words text-[2.8rem] font-black leading-[1] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl">
            QG Strength Lab
          </h1>

          <p className="mt-6 max-w-2xl break-words text-base leading-8 text-white/82 sm:text-lg sm:leading-9">
            力量不是硬撐，是可追蹤、可調整、可長期進步的系統。
            這個概念案結合教練接案頁、學員初步評估與三項力量追蹤工具。
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:max-w-2xl">
            {profileStats.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-[1.6rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition hover:-translate-y-1 hover:border-red-300/35 hover:bg-white/[0.11] hover:shadow-[0_0_30px_rgba(239,68,68,0.12)]"
              >
                <p className="break-words text-sm uppercase tracking-[0.18em] text-white/55">
                  {item.label}
                </p>
                <p className="mt-2 break-words text-4xl font-black text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.26)]">
                  {item.value}
                </p>
                <p className="mt-2 break-words text-sm text-white/55">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#intake"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-[0_0_28px_rgba(255,255,255,0.22)] transition hover:bg-sky-100"
            >
              填學員初步評估
            </a>
            <a
              href="#tracker"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-sky-100/50 hover:bg-sky-100/10"
            >
              計算三項總和
            </a>
            <a
              href="#programs"
              className="rounded-full border border-red-400/35 bg-red-500/12 px-6 py-3 text-sm font-bold text-red-100 transition hover:bg-red-500/22"
            >
              查看訓練方案
            </a>
          </div>
        </div>

        <HeroPanel />
      </section>

      <ProblemSection />
      <StorySection />
      <PrinciplesSection />
      <ProgramsSection />

      <IntakeSection
        activeStep={activeStep}
        stepIndex={stepIndex}
        setStepIndex={setStepIndex}
        intake={intake}
        updateIntake={updateIntake}
        toggleIntake={toggleIntake}
        studentSummary={studentSummary}
        coachSummary={coachSummary}
        estimate={intakeEstimate}
        copiedLabel={copiedLabel}
        copyText={copyText}
      />

      <TrackerSection
        pr={pr}
        updatePr={updatePr}
        result={prResult}
        copiedLabel={copiedLabel}
        copyText={copyText}
      />

      <CoachTestSection />
      <SafetySection />

      <section className="mx-auto max-w-7xl px-4 py-16 pb-28 sm:px-5">
        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#0b111b] p-7 text-white shadow-[0_0_70px_rgba(0,0,0,0.26)] sm:rounded-[2.8rem] md:p-12">
          <div className="absolute right-[-140px] top-[-140px] h-[320px] w-[320px] rounded-full bg-sky-200/16 blur-[90px]" />
          <div className="absolute left-[-100px] bottom-[-100px] h-[260px] w-[260px] rounded-full bg-red-500/22 blur-[85px]" />
          <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:items-end">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-red-100/80">
                Next
              </p>
              <h2 className="mt-4 max-w-3xl break-words text-4xl font-black tracking-[-0.05em] md:text-6xl">
                這不是普通健身頁，而是教練和學員溝通工具。
              </h2>
              <p className="mt-6 max-w-2xl break-words leading-8 text-white/76">
                可以拿給健身教練、私教、力量舉選手或小型工作室測試，看他們是否需要這種接案頁與學員評估流程。
              </p>
            </div>

            <div className="grid min-w-0 gap-3">
              <a
                href="#intake"
                className="rounded-3xl bg-white p-5 text-black transition hover:bg-sky-100"
              >
                <p className="text-sm text-black/55">Student Intake</p>
                <p className="mt-2 font-black">填學員初步評估 →</p>
              </a>

              <Link
                to="/"
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-white transition hover:bg-white/10"
              >
                <p className="text-sm text-white/50">Back Home</p>
                <p className="mt-2 font-black">回作品集首頁 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function HeroPanel() {
  return (
    <div className="min-w-0 overflow-hidden rounded-[2.1rem] border border-white/10 bg-white/[0.05] p-3 shadow-[0_0_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:rounded-[2.7rem] sm:p-4">
      <div className="storm-panel relative flex min-h-[540px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#07101b] p-5 sm:min-h-[590px] sm:rounded-[2rem] sm:p-7">
        <div className="storm-flash" />
        <div className="storm-red-flash" />
        <div className="lightning-main absolute right-[-4px] top-4 h-64 w-24 opacity-95 sm:right-10 sm:top-6 sm:h-72 sm:w-28" />
        <div className="lightning-side absolute right-20 top-28 h-40 w-14 opacity-72 sm:right-32 sm:h-48 sm:w-16" />
        <div className="lightning-thread absolute right-14 top-14 h-52 w-7 opacity-85 sm:right-24 sm:h-60 sm:w-8" />
        <div className="lightning-thread lightning-thread-two absolute right-36 top-20 h-44 w-5 opacity-72 sm:right-48 sm:h-52 sm:w-6" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/10 to-transparent" />

        <div className="relative z-10 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 break-words text-xs font-bold uppercase tracking-[0.2em] text-white/55 sm:tracking-[0.26em]">
              Night Session
            </p>
            <span className="shrink-0 rounded-full border border-white/30 bg-white px-3 py-1 text-xs font-black text-black shadow-[0_0_30px_rgba(255,255,255,0.32)]">
              630 Total
            </span>
          </div>

          <div className="mt-8 rounded-[1.7rem] border border-white/15 bg-black/35 p-4 backdrop-blur sm:rounded-[2rem] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words text-xs font-bold uppercase tracking-[0.18em] text-sky-100/75 sm:tracking-[0.22em]">
                  Strength Core
                </p>
                <div className="mt-4 flex min-w-0 items-end gap-3">
                  <span className="break-words text-[4.6rem] font-black leading-none tracking-[-0.08em] text-white drop-shadow-[0_0_34px_rgba(255,255,255,0.34)] sm:text-8xl">
                    630
                  </span>
                  <span className="mb-3 shrink-0 text-2xl font-black text-red-200 drop-shadow-[0_0_20px_rgba(248,113,113,0.30)]">
                    kg
                  </span>
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-red-300/24 bg-red-500/12 px-3 py-2 text-left sm:text-right">
                <p className="break-words text-[11px] uppercase tracking-[0.16em] text-red-100/75">
                  Peak State
                </p>
                <p className="mt-1 break-words text-base font-black text-white sm:text-lg">
                  Thunder Ready
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["SQ", "240"],
                ["BP", "140"],
                ["DL", "250"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.08] p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  <p className="break-words text-xs font-semibold text-white/45">{label}</p>
                  <p className="mt-1 break-words text-xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 min-w-0">
          <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="storm-meter h-full w-[72%] rounded-full bg-white" />
          </div>

          <h2 className="break-words text-3xl font-black leading-tight tracking-[-0.05em] text-white sm:text-5xl sm:tracking-[-0.06em]">
            Built through recovery, discipline, and strength.
          </h2>
          <p className="mt-5 break-words leading-8 text-white/78">
            先理解目標、年資、健康狀況、恢復能力與動力來源，再談訓練安排。
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-bold text-white/85">
              Powerlifting
            </span>
            <span className="rounded-full border border-sky-100/20 bg-sky-100/10 px-3 py-2 text-xs font-bold text-sky-100">
              Sports Science
            </span>
            <span className="rounded-full border border-red-300/24 bg-red-500/12 px-3 py-2 text-xs font-bold text-red-100">
              Recovery Aware
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <SectionHeader
        eyebrow="Why This Exists"
        title="不是先問你想變壯嗎，而是先理解你目前在哪裡。"
        desc="這個 Demo 的重點，是讓教練和學員在正式開始前，先有一份可討論的訓練摘要。"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {painPoints.map((item, index) => (
          <div
            key={item.title}
            className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:border-red-300/30 hover:bg-white/[0.10]"
          >
            <p className="text-sm font-black text-red-100">0{index + 1}</p>
            <h3 className="mt-5 break-words text-xl font-black text-white">{item.title}</h3>
            <p className="mt-4 break-words leading-8 text-white/72">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b111b] p-7 shadow-[0_0_55px_rgba(0,0,0,0.24)] sm:rounded-[2.8rem] md:p-12">
        <div className="absolute right-[-140px] top-[-140px] h-[320px] w-[320px] rounded-full bg-sky-200/14 blur-[95px]" />
        <div className="absolute left-[-100px] bottom-[-100px] h-[260px] w-[260px] rounded-full bg-red-500/20 blur-[90px]" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <p className="break-words text-sm font-black uppercase tracking-[0.22em] text-red-100">
              Built from the platform
            </p>
            <h2 className="mt-4 break-words text-4xl font-black tracking-[-0.05em] md:text-6xl">
              這不是憑空想像的健身網站。
            </h2>
            <p className="mt-6 break-words leading-8 text-white/76">
              這個 Demo 來自長期力量訓練、受傷回歸、健身房現場觀察，以及教練與學員之間真實的溝通問題。
            </p>
          </div>

          <div className="grid min-w-0 gap-4">
            {storyCards.map((item) => (
              <div key={item.title} className="min-w-0 rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5">
                <h3 className="break-words text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 break-words leading-8 text-white/72">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PrinciplesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b111b] p-7 text-white shadow-[0_0_55px_rgba(0,0,0,0.24)] sm:rounded-[2.8rem] md:p-12">
        <div className="absolute right-[-160px] top-[-160px] h-[360px] w-[360px] rounded-full bg-sky-200/14 blur-[100px]" />
        <div className="absolute left-[-120px] bottom-[-120px] h-[280px] w-[280px] rounded-full bg-red-500/18 blur-[90px]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="min-w-0">
            <p className="break-words text-sm font-black uppercase tracking-[0.22em] text-sky-100/85">
              Training Philosophy
            </p>
            <h2 className="mt-4 break-words text-4xl font-black tracking-[-0.05em] md:text-6xl">
              硬派不是亂練，科學也不是紙上談兵。
            </h2>
            <p className="mt-6 break-words leading-8 text-white/72">
              你的背景適合呈現成「有力量成績，也重視動作品質與長期進步」的訓練系統。
            </p>
          </div>

          <div className="grid min-w-0 gap-4">
            {principles.map((item, index) => (
              <div
                key={item.title}
                className="min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"
              >
                <p className="text-sm font-black text-red-100">0{index + 1}</p>
                <h3 className="mt-4 break-words text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 break-words leading-8 text-white/72">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProgramsSection() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <SectionHeader
        eyebrow="Programs"
        title="方案不是先賣課，而是讓學員知道自己適合哪種方向。"
        desc="第一版先做概念方案，未來可以依真實教練或工作室調整內容與價格。"
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {programs.map((item) => (
          <div
            key={item.title}
            className={`min-w-0 rounded-[2rem] border p-6 transition hover:-translate-y-1 ${
              item.featured
                ? "border-red-300/40 bg-red-500/16 text-white shadow-[0_0_38px_rgba(239,68,68,0.13)]"
                : "border-white/10 bg-white/[0.06] text-white hover:border-sky-100/25 hover:bg-white/[0.10]"
            }`}
          >
            <p
              className={`break-words text-sm font-black ${
                item.featured ? "text-red-100" : "text-sky-100"
              }`}
            >
              {item.title}
            </p>
            <h3 className="mt-3 break-words text-2xl font-black">{item.subtitle}</h3>
            <p className="mt-4 break-words leading-7 text-white/74">{item.desc}</p>

            <div className="mt-6 grid gap-2">
              {item.items.map((line) => (
                <div key={line} className="flex min-w-0 gap-3 text-sm">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      item.featured ? "bg-red-200" : "bg-sky-100"
                    }`}
                  />
                  <span className="min-w-0 break-words text-white/78">{line}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IntakeSection({
  activeStep,
  stepIndex,
  setStepIndex,
  intake,
  updateIntake,
  toggleIntake,
  studentSummary,
  coachSummary,
  estimate,
  copiedLabel,
  copyText,
}) {
  const [summaryMode, setSummaryMode] = useState("student")
  const activeSummary = summaryMode === "student" ? studentSummary : coachSummary

  return (
    <section id="intake" className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <SectionHeader
        eyebrow="Student Intake Builder"
        title="讓學員先把狀態講清楚，教練才知道怎麼判斷。"
        desc="這不是醫療診斷，而是訓練前的初步資訊整理工具。"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(280px,0.32fr)]">
        <div className="min-w-0 rounded-[2.2rem] border border-white/10 bg-[#08121d] p-5 shadow-[0_0_60px_rgba(0,0,0,0.32)] md:p-8">
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
            {intakeSteps.map((step, index) => (
              <button
                key={step.key}
                type="button"
                onClick={() => setStepIndex(index)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  stepIndex === index
                    ? "bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.16)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {index + 1}. {step.label}
              </button>
            ))}
          </div>

          <p className="mt-8 text-sm font-black text-sky-100">
            STEP {stepIndex + 1} / {intakeSteps.length}
          </p>
          <h3 className="mt-3 break-words text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
            {activeStep.title}
          </h3>

          <div className="mt-8 min-w-0">
            {activeStep.key === "goal" && (
              <MultiChoice
                options={goalOptions}
                selected={intake.goals}
                onToggle={(value) => toggleIntake("goals", value)}
              />
            )}

            {activeStep.key === "body" && (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input label="年齡" value={intake.age} onChange={(value) => updateIntake("age", value)} />
                  <Input label="身高 cm" value={intake.height} onChange={(value) => updateIntake("height", value)} />
                  <Input label="體重 kg" value={intake.weight} onChange={(value) => updateIntake("weight", value)} />
                </div>

                <Textarea
                  label="目前健康狀況 / 疼痛 / 舊傷"
                  value={intake.health}
                  onChange={(value) => updateIntake("health", value)}
                  placeholder="例如：肩膀卡卡、膝蓋不舒服、曾經腳踝受傷、目前沒有明顯疼痛……"
                />
              </div>
            )}

            {activeStep.key === "training" && (
              <div className="grid gap-6">
                <ChoiceGroup
                  title="訓練年資"
                  options={trainingAgeOptions}
                  value={intake.trainingAge}
                  onChange={(value) => updateIntake("trainingAge", value)}
                />
                <ChoiceGroup
                  title="每週可訓練天數"
                  options={daysOptions}
                  value={intake.days}
                  onChange={(value) => updateIntake("days", value)}
                />
                <Textarea
                  label="目前課表或訓練方式"
                  value={intake.currentPlan}
                  onChange={(value) => updateIntake("currentPlan", value)}
                  placeholder="例如：胸背腿、PPL、三項主項、有氧為主、沒有固定課表……"
                />
              </div>
            )}

            {activeStep.key === "lifts" && (
              <div className="grid gap-4 sm:grid-cols-3">
                <Input label="深蹲 kg" value={intake.squat} onChange={(value) => updateIntake("squat", value)} />
                <Input label="臥推 kg" value={intake.bench} onChange={(value) => updateIntake("bench", value)} />
                <Input label="硬舉 kg" value={intake.deadlift} onChange={(value) => updateIntake("deadlift", value)} />
              </div>
            )}

            {activeStep.key === "lifestyle" && (
              <div className="grid gap-6">
                <Input
                  label="平均睡眠"
                  value={intake.sleep}
                  onChange={(value) => updateIntake("sleep", value)}
                  placeholder="例如：每天 6 小時、作息不固定、睡眠品質差……"
                />
                <div>
                  <h4 className="mb-3 break-words text-xl font-black text-white">飲食狀況</h4>
                  <MultiChoice
                    options={dietOptions}
                    selected={intake.diet}
                    onToggle={(value) => toggleIntake("diet", value)}
                  />
                </div>
                <div>
                  <h4 className="mb-3 break-words text-xl font-black text-white">你的健身動力來源</h4>
                  <MultiChoice
                    options={motivationOptions}
                    selected={intake.motivation}
                    onToggle={(value) => toggleIntake("motivation", value)}
                  />
                </div>
                <Textarea
                  label="其他補充"
                  value={intake.note}
                  onChange={(value) => updateIntake("note", value)}
                  placeholder="可以補充你的卡關點、目標期限、比賽計畫、工作型態、生活壓力等。"
                />
                <Input
                  label="聯絡方式"
                  value={intake.contact}
                  onChange={(value) => updateIntake("contact", value)}
                  placeholder="LINE / IG / Email"
                />
              </div>
            )}

            {activeStep.key === "summary" && (
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSummaryMode("student")}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      summaryMode === "student"
                        ? "bg-white text-black"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    學員版摘要
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryMode("coach")}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      summaryMode === "coach"
                        ? "bg-red-500 text-white"
                        : "bg-red-500/12 text-red-100 hover:bg-red-500/22"
                    }`}
                  >
                    教練版摘要
                  </button>
                </div>

                <p className="mt-6 text-sm font-black text-sky-100">目前初步判斷</p>
                <h4 className="mt-2 break-words text-3xl font-black text-white">{estimate.title}</h4>
                <p className="mt-3 break-words leading-8 text-white/76">{estimate.desc}</p>

                <pre className="mt-5 max-h-[380px] max-w-full overflow-y-auto whitespace-pre-wrap break-all rounded-[1.5rem] border border-white/8 bg-black/35 p-4 text-sm leading-7 text-white/82">
                  {activeSummary}
                </pre>

                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      summaryMode === "student" ? "studentSummary" : "coachSummary",
                      activeSummary
                    )
                  }
                  className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-sky-100"
                >
                  {copiedLabel === "studentSummary" || copiedLabel === "coachSummary"
                    ? "已複製摘要"
                    : "複製目前摘要"}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
              disabled={stepIndex === 0}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white disabled:opacity-30"
            >
              上一步
            </button>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => copyText("coachSummary", coachSummary)}
                className="rounded-full border border-red-300/35 bg-red-500/12 px-6 py-3 text-sm font-bold text-red-100 transition hover:bg-red-500/24"
              >
                {copiedLabel === "coachSummary" ? "已複製教練版" : "複製教練版"}
              </button>

              {stepIndex < intakeSteps.length - 1 && (
                <button
                  type="button"
                  onClick={() => setStepIndex(Math.min(intakeSteps.length - 1, stepIndex + 1))}
                  className="rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-sky-100"
                >
                  下一步 →
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="min-w-0 rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.8rem] border border-red-300/24 bg-red-500/14 p-5 text-white">
            <p className="text-sm font-black text-red-100/85">目前判斷</p>
            <h4 className="mt-2 break-words text-3xl font-black">{estimate.title}</h4>
            <p className="mt-3 break-words leading-7 text-white/74">{estimate.desc}</p>
          </div>

          <div className="mt-5 grid gap-3">
            <Mini label="目標" value={intake.goals.length ? `${intake.goals.length} 項` : "未填"} />
            <Mini label="年資" value={intake.trainingAge || "未填"} />
            <Mini label="天數" value={intake.days || "未填"} />
            <Mini label="體重" value={intake.weight ? `${intake.weight}kg` : "未填"} />
            <Mini label="三項" value={getTotalText(intake)} />
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-white/8 bg-black/25 p-4">
            <p className="text-sm font-black text-white/52">核心提醒</p>
            <p className="mt-3 break-words leading-7 text-white/72">
              若有明確疼痛、舊傷或醫療限制，應先尋求醫師、物理治療師或合格專業人員評估。
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function TrackerSection({ pr, updatePr, result, copiedLabel, copyText }) {
  const shareText = `【QG Strength Lab｜三項力量紀錄】

體重：${pr.bodyweight || "未填"}kg
深蹲：${pr.squat || "未填"}kg
臥推：${pr.bench || "未填"}kg
硬舉：${pr.deadlift || "未填"}kg

三項總和：${result.total}kg
體重倍率：${result.ratioText}
力量等級：${result.level}
目前強項：${result.strongest}
相對弱項：${result.weakest}
距離 QG 630kg 原型：${result.gapText}

下一階段建議：
${result.note}`

  return (
    <section id="tracker" className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <SectionHeader
        eyebrow="PR Tracker"
        title="輸入三項數字，快速產生力量概況。"
        desc="這個工具適合力量訓練族群，也可以做成教練網站裡的互動亮點。"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)]">
        <div className="min-w-0 rounded-[2.2rem] border border-white/10 bg-[#08121d] p-6 md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="體重 kg" value={pr.bodyweight} onChange={(value) => updatePr("bodyweight", value)} />
            <Input label="深蹲 kg" value={pr.squat} onChange={(value) => updatePr("squat", value)} />
            <Input label="臥推 kg" value={pr.bench} onChange={(value) => updatePr("bench", value)} />
            <Input label="硬舉 kg" value={pr.deadlift} onChange={(value) => updatePr("deadlift", value)} />
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-5">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="break-words text-sm font-bold text-white/55">Progress to QG 630kg</p>
                <p className="mt-1 text-2xl font-black text-white">
                  {result.progress}%
                </p>
              </div>
              <p className="break-words text-sm leading-7 text-white/72 sm:text-right">{result.gapText}</p>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-white via-sky-100 to-red-400 shadow-[0_0_24px_rgba(255,255,255,0.42)] transition-all duration-500"
                style={{ width: `${Math.min(100, result.progress)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative min-w-0 overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0b111b] p-6 text-white shadow-[0_0_55px_rgba(0,0,0,0.22)] md:p-8">
          <div className="absolute right-[-120px] top-[-120px] h-[260px] w-[260px] rounded-full bg-sky-200/16 blur-[80px]" />
          <div className="absolute left-[-70px] bottom-[-70px] h-[200px] w-[200px] rounded-full bg-red-500/24 blur-[70px]" />
          <div className="relative min-w-0">
            <p className="break-words text-sm font-black uppercase tracking-[0.2em] text-red-100/85">
              Strength Profile
            </p>
            <h3 className="mt-4 break-words text-6xl font-black tracking-[-0.08em]">
              {result.total}kg
            </h3>
            <p className="mt-2 font-semibold text-white/55">Total</p>

            <div className="mt-6 grid gap-3">
              <Mini label="力量等級" value={result.level} />
              <Mini label="體重倍率" value={result.ratioText} />
              <Mini label="目前強項" value={result.strongest} />
              <Mini label="相對弱項" value={result.weakest} />
              <Mini label="下一門檻" value={result.nextMilestone} />
            </div>

            <p className="mt-6 break-words leading-8 text-white/74">{result.note}</p>

            <button
              type="button"
              onClick={() => copyText("prShare", shareText)}
              className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-sky-100"
            >
              {copiedLabel === "prShare" ? "已複製分享文字" : "複製分享文字"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CoachTestSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_0_50px_rgba(0,0,0,0.20)] sm:rounded-[2.8rem] md:p-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <p className="break-words text-sm font-black uppercase tracking-[0.22em] text-red-100">
              Real Client Test
            </p>
            <h2 className="mt-4 break-words text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
              這頁可以直接拿去問教練朋友。
            </h2>
            <p className="mt-6 break-words leading-8 text-white/76">
              這個區塊的目的，是讓 Demo 變成可驗證的產品概念。不是只展示畫面，而是測試真實教練會不會需要。
            </p>
          </div>

          <div className="grid min-w-0 gap-4">
            {coachTestQuestions.map((question, index) => (
              <div key={question} className="min-w-0 rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-sm font-black text-red-100">Question 0{index + 1}</p>
                <p className="mt-3 break-words text-lg font-black leading-8 text-white/88">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SafetySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5">
      <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-7 shadow-[0_0_40px_rgba(0,0,0,0.18)] sm:p-8">
        <p className="break-words text-sm font-black uppercase tracking-[0.22em] text-red-100">
          Safety Note
        </p>
        <h2 className="mt-4 break-words text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">
          這是訓練資訊整理工具，不是醫療診斷。
        </h2>
        <p className="mt-5 max-w-3xl break-words leading-8 text-white/76">
          本頁內容用於展示健身教練接案與學員初步評估流程。若有明確疼痛、舊傷、疾病或醫療限制，
          應先諮詢醫師、物理治療師或合格專業人員，再進行訓練安排。
        </p>
      </div>
    </section>
  )
}

function MultiChoice({ options, selected, onToggle }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const active = selected.includes(option)

        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`flex min-w-0 items-start gap-3 rounded-2xl border p-4 text-left transition ${
              active
                ? "border-red-300/40 bg-red-500/20 text-white shadow-[0_0_24px_rgba(239,68,68,0.10)]"
                : "border-white/10 bg-white/[0.06] text-white hover:border-sky-100/30 hover:bg-white/[0.10]"
            }`}
          >
            <span
              className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-xs ${
                active ? "border-red-200 bg-red-500 text-white" : "border-white/25"
              }`}
            >
              {active ? "✓" : ""}
            </span>
            <span className="min-w-0 break-words text-white/78">
              {option}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function ChoiceGroup({ title, options, value, onChange }) {
  return (
    <div className="min-w-0">
      <h4 className="mb-3 break-words text-xl font-black text-white">{title}</h4>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`break-words rounded-2xl border p-4 text-left font-bold transition ${
              value === option
                ? "border-red-300/40 bg-red-500/20 text-white"
                : "border-white/10 bg-white/[0.06] text-white/74 hover:border-sky-100/30 hover:text-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block min-w-0">
      <span className="break-words text-sm font-bold text-white/68">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full max-w-full rounded-[1.3rem] border border-white/10 bg-white/[0.06] px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-sky-100/55 focus:bg-white/[0.08]"
      />
    </label>
  )
}

function Textarea({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block min-w-0">
      <span className="break-words text-sm font-bold text-white/68">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="mt-3 w-full max-w-full resize-none rounded-[1.3rem] border border-white/10 bg-white/[0.06] px-5 py-4 leading-8 text-white outline-none transition placeholder:text-white/30 focus:border-sky-100/55 focus:bg-white/[0.08]"
      />
    </label>
  )
}

function Mini({ label, value }) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
      <span className="shrink-0 text-sm font-semibold text-white/48">{label}</span>
      <span className="min-w-0 break-words text-right text-sm font-black text-white/88">
        {value}
      </span>
    </div>
  )
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-10 min-w-0">
      <p className="break-words text-sm font-black uppercase tracking-[0.2em] text-red-100 sm:tracking-[0.26em]">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl break-words text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl break-words leading-8 text-white/76">{desc}</p>}
    </div>
  )
}

function getIntakeEstimate(intake) {
  if (intake.goals.includes("傷後回歸訓練") || intake.health.trim()) {
    return {
      title: "先做風險與動作評估",
      desc: "你有傷病或疼痛資訊，建議先確認身體限制與動作品質，再安排強度與訓練量。",
    }
  }

  if (intake.goals.includes("力量提升") || intake.goals.includes("力量舉備賽")) {
    return {
      title: "力量週期規劃",
      desc: "你比較適合以主項進步、弱點補強、恢復配置與週期化訓練作為核心。",
    }
  }

  if (intake.goals.includes("增肌") || intake.goals.includes("體態改善")) {
    return {
      title: "肌肥大與體態規劃",
      desc: "你比較適合先建立穩定訓練頻率、肌群容量配置、飲食習慣與追蹤方式。",
    }
  }

  if (intake.goals.includes("減脂")) {
    return {
      title: "減脂與習慣建立",
      desc: "你比較適合先處理飲食習慣、活動量、訓練頻率與可持續的熱量控制。",
    }
  }

  return {
    title: "需要初步諮詢",
    desc: "目前資訊還不完整，建議先補上目標、年資、訓練頻率與身體狀態。",
  }
}

function buildStudentSummary(intake, estimate) {
  return `【QG Strength Lab｜學員版初步摘要】

目前初步方向：${estimate.title}
${estimate.desc}

一、你的訓練目標
${formatList(intake.goals)}

二、你的基本狀態
年齡：${intake.age || "未填"}
身高：${intake.height || "未填"} cm
體重：${intake.weight || "未填"} kg
健康 / 疼痛 / 舊傷：${intake.health || "未填"}

三、你的訓練經驗
訓練年資：${intake.trainingAge || "未填"}
每週可訓練天數：${intake.days || "未填"}
目前課表：${intake.currentPlan || "未填"}

四、你的力量數據
深蹲：${intake.squat || "未填"} kg
臥推：${intake.bench || "未填"} kg
硬舉：${intake.deadlift || "未填"} kg
三項總和：${getTotalText(intake)}

五、生活習慣
睡眠：${intake.sleep || "未填"}
飲食狀況：
${formatList(intake.diet)}

六、健身動力來源
${formatList(intake.motivation)}

七、補充說明
${intake.note || "未填"}

提醒：這份摘要是訓練前資訊整理，不是醫療診斷。若有疼痛或舊傷，應先尋求專業評估。`
}

function buildCoachSummary(intake, estimate) {
  return `【QG Strength Lab｜教練版學員初步評估】

初步判斷：${estimate.title}
${estimate.desc}

一、學員目標
${formatList(intake.goals)}

二、基本資料
年齡：${intake.age || "未填"}
身高：${intake.height || "未填"} cm
體重：${intake.weight || "未填"} kg
聯絡方式：${intake.contact || "未填"}

三、健康 / 風險資訊
${intake.health || "未填"}

四、訓練背景
訓練年資：${intake.trainingAge || "未填"}
每週可訓練天數：${intake.days || "未填"}
目前課表或訓練方式：${intake.currentPlan || "未填"}

五、力量資料
深蹲：${intake.squat || "未填"} kg
臥推：${intake.bench || "未填"} kg
硬舉：${intake.deadlift || "未填"} kg
三項總和：${getTotalText(intake)}

六、恢復與生活習慣
睡眠：${intake.sleep || "未填"}
飲食：
${formatList(intake.diet)}

七、動機與心理因素
${formatList(intake.motivation)}

八、補充說明
${intake.note || "未填"}

教練可追問：
- 目前最想改善的是外型、力量、健康，還是比賽表現？
- 是否有需要避開的動作或醫療限制？
- 飲食與睡眠是否願意一起調整？
- 是否能穩定執行每週訓練頻率？`
}

function calculatePr(pr) {
  const squat = Number(pr.squat) || 0
  const bench = Number(pr.bench) || 0
  const deadlift = Number(pr.deadlift) || 0
  const bodyweight = Number(pr.bodyweight) || 0
  const total = squat + bench + deadlift

  const lifts = [
    { name: "深蹲", value: squat },
    { name: "臥推", value: bench },
    { name: "硬舉", value: deadlift },
  ].filter((item) => item.value > 0)

  const strongest = lifts.length
    ? lifts.reduce((max, item) => (item.value > max.value ? item : max), lifts[0]).name
    : "尚未輸入"

  const weakest = lifts.length
    ? lifts.reduce((min, item) => (item.value < min.value ? item : min), lifts[0]).name
    : "尚未輸入"

  const ratio = bodyweight > 0 ? total / bodyweight : 0
  const progress = total > 0 ? Math.round((total / QG_TOTAL_TARGET) * 100) : 0
  const gap = QG_TOTAL_TARGET - total

  let level = "未輸入"
  let nextMilestone = "先輸入三項數字"
  let note = "先輸入體重與三項數字，就能看到初步力量概況。"

  if (total > 0) {
    if (total >= 630) {
      level = "Storm Level"
      nextMilestone = "維持健康與長期週期"
      note = "你已經達到或超過 QG 630kg 原型。下一階段重點不是盲目堆重量，而是弱點補強、恢復配置、技術穩定與長期週期管理。"
    } else if (total >= 500) {
      level = "Advanced"
      nextMilestone = "挑戰 600kg+"
      note = "你已經具備相當不錯的力量基礎。接下來可以更精細地規劃主項週期、輔助項、弱點補強與恢復。"
    } else if (total >= 350) {
      level = "Intermediate"
      nextMilestone = "挑戰 450–500kg"
      note = "你已經有基礎力量。建議優先穩定課表、修正技術、提高訓練品質，再逐步拉高總和。"
    } else {
      level = "Foundation"
      nextMilestone = "建立基礎肌力"
      note = "目前可以先建立動作品質、訓練頻率和基礎肌力，不需要急著追求高強度。"
    }
  }

  return {
    total,
    ratioText: bodyweight > 0 && total > 0 ? `${ratio.toFixed(2)} × BW` : "未計算",
    strongest,
    weakest,
    level,
    nextMilestone,
    progress,
    gapText:
      total <= 0
        ? "尚未輸入"
        : gap > 0
          ? `還差 ${gap}kg`
          : `已超越 ${Math.abs(gap)}kg`,
    note,
  }
}

function getTotalText(data) {
  const squat = Number(data.squat) || 0
  const bench = Number(data.bench) || 0
  const deadlift = Number(data.deadlift) || 0
  const total = squat + bench + deadlift

  return total > 0 ? `${total}kg` : "未填"
}

function formatList(list) {
  if (!list.length) return "未填"
  return list.map((item) => `- ${item}`).join("\n")
}

function StormBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030408]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.11),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(186,230,253,0.14),transparent_24%),radial-gradient(circle_at_75%_72%,rgba(248,113,113,0.14),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.035),transparent_34%)]" />
      <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-sky-200/9 blur-[130px] sm:h-[520px] sm:w-[520px]" />
      <div className="absolute right-[-260px] top-[180px] h-[500px] w-[500px] rounded-full bg-cyan-400/9 blur-[160px] sm:h-[620px] sm:w-[620px]" />
      <div className="absolute bottom-[-260px] left-[8%] h-[520px] w-[520px] rounded-full bg-red-500/10 blur-[170px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>
  )
}

function StormStyles() {
  return (
    <style>{`
      .storm-panel {
        box-shadow:
          inset 0 0 80px rgba(255, 255, 255, 0.05),
          inset 0 -80px 100px rgba(239, 68, 68, 0.10),
          0 0 60px rgba(0, 0, 0, 0.35);
      }

      .storm-flash {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 72% 14%, rgba(255,255,255,0.66), transparent 20%),
          radial-gradient(circle at 84% 30%, rgba(224,242,254,0.34), transparent 24%);
        opacity: 0;
        animation: storm-flash 4.8s infinite;
      }

      .storm-red-flash {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at 78% 56%, rgba(248,113,113,0.24), transparent 22%),
          radial-gradient(circle at 65% 88%, rgba(239,68,68,0.18), transparent 28%);
        opacity: 0.4;
      }

      .lightning-main,
      .lightning-side,
      .lightning-thread,
      .lightning-thread-two {
        pointer-events: none;
      }

      .lightning-main {
        background:
          linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,0.94), rgba(186,230,253,0.76), rgba(59,130,246,0.06));
        clip-path: polygon(62% 0%, 38% 34%, 56% 33%, 28% 100%, 82% 30%, 60% 31%);
        filter:
          drop-shadow(0 0 10px rgba(255,255,255,0.92))
          drop-shadow(0 0 26px rgba(224,242,254,0.82))
          drop-shadow(0 0 42px rgba(96,165,250,0.35));
        animation: lightning-pulse 4.8s infinite;
      }

      .lightning-side {
        background:
          linear-gradient(180deg, rgba(255,255,255,0.86), rgba(224,242,254,0.78), rgba(96,165,250,0.06));
        clip-path: polygon(58% 0%, 40% 28%, 55% 28%, 32% 100%, 76% 36%, 58% 36%);
        filter:
          drop-shadow(0 0 8px rgba(255,255,255,0.78))
          drop-shadow(0 0 20px rgba(224,242,254,0.48));
        animation: lightning-pulse 4.8s infinite;
        animation-delay: 0.25s;
      }

      .lightning-thread {
        background:
          linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,0.82), rgba(255,255,255,0));
        clip-path: polygon(50% 0%, 42% 18%, 57% 20%, 40% 44%, 55% 45%, 34% 72%, 58% 100%, 52% 76%, 64% 54%, 49% 52%, 68% 24%, 53% 22%);
        filter:
          drop-shadow(0 0 5px rgba(255,255,255,0.9))
          drop-shadow(0 0 14px rgba(255,255,255,0.66));
        animation: lightning-thread 4.8s infinite;
      }

      .lightning-thread-two {
        animation-delay: 0.5s;
      }

      .storm-meter {
        box-shadow:
          0 0 20px rgba(255,255,255,0.62),
          0 0 34px rgba(186,230,253,0.40),
          0 0 54px rgba(248,113,113,0.22);
      }

      @keyframes storm-flash {
        0%, 70%, 76%, 100% {
          opacity: 0;
        }
        71% {
          opacity: 0.72;
        }
        72% {
          opacity: 0.11;
        }
        74% {
          opacity: 0.52;
        }
      }

      @keyframes lightning-pulse {
        0%, 70%, 76%, 100% {
          opacity: 0.42;
          transform: translateY(0) scale(1);
        }
        71% {
          opacity: 1;
          transform: translateY(-3px) scale(1.03);
        }
        72% {
          opacity: 0.48;
        }
        74% {
          opacity: 0.92;
          transform: translateY(1px) scale(1.015);
        }
      }

      @keyframes lightning-thread {
        0%, 70%, 76%, 100% {
          opacity: 0.20;
          transform: scaleY(1);
        }
        71% {
          opacity: 0.9;
          transform: scaleY(1.04);
        }
        73% {
          opacity: 0.42;
        }
        74% {
          opacity: 0.82;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .storm-flash,
        .lightning-main,
        .lightning-side,
        .lightning-thread,
        .lightning-thread-two {
          animation: none;
        }
      }
    `}</style>
  )
}

export default FitnessCoachDemo