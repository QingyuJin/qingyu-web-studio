import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const websiteTypes = [
  {
    id: "studio",
    title: "預約制工作室",
    examples: "美甲 / 美睫 / 美容 / 霧眉 / 攝影 / 健身教練",
    defaultFeatures: ["作品展示", "服務價格", "LINE / IG", "Google Map", "FAQ"],
    recommended: "一頁式工作室網站",
  },
  {
    id: "portfolio",
    title: "個人作品集 / 履歷網站",
    examples: "學生 / 求職者 / 創作者 / 設計師 / 攝影師",
    defaultFeatures: ["個人介紹", "作品展示", "經歷整理", "Email", "履歷連結"],
    recommended: "個人作品集網站",
  },
  {
    id: "service",
    title: "服務型網站",
    examples: "顧問 / 課程品牌 / 自由工作者 / 小型團隊",
    defaultFeatures: ["服務介紹", "方案比較", "合作流程", "需求表", "CTA"],
    recommended: "服務介紹網站",
  },
  {
    id: "event",
    title: "活動 / 報名頁",
    examples: "社團活動 / 講座 / 工作坊 / 營隊 / 比賽",
    defaultFeatures: ["活動資訊", "流程時間", "報名連結", "注意事項", "FAQ"],
    recommended: "活動報名頁",
  },
  {
    id: "repair",
    title: "舊網站修改",
    examples: "手機版跑版 / 文字圖片更新 / 連結修改 / 部署問題",
    defaultFeatures: ["RWD 修正", "內容更新", "連結檢查", "部署檢查"],
    recommended: "網站修改 / 優化",
  },
]

const goals = [
  "讓客人私訊 / 預約",
  "展示作品與經歷",
  "說明服務與價格",
  "活動報名",
  "改善手機版",
  "建立正式形象",
  "整理 IG / LINE 上分散資訊",
  "上線後方便分享",
]

const featureOptions = [
  "一頁式網站",
  "多區塊首頁",
  "作品展示",
  "服務價格",
  "方案比較",
  "FAQ",
  "預約流程",
  "LINE / IG",
  "Email",
  "Google Map",
  "Google Form / 報名連結",
  "基本 SEO meta",
  "社群分享 OGP",
  "GA4 點擊追蹤建議",
  "Google 商家 / 地圖連結整理",
  "Vercel 部署",
  "舊網站 RWD 修正",
]

const assetLevels = [
  {
    id: "idea",
    title: "只有想法",
    desc: "還沒有照片、文案、價格表，只有大概方向。",
    score: 25,
    advice: "需要先整理內容架構與文案方向，適合先做概念版。",
  },
  {
    id: "social",
    title: "有 IG / 照片",
    desc: "有社群、照片或作品，但文字與網站架構還沒整理。",
    score: 55,
    advice: "可以開始規劃網站，還需要補服務內容、價格、FAQ 與聯絡資訊。",
  },
  {
    id: "ready",
    title: "素材大致完整",
    desc: "已有照片、價格、文字、社群連結、參考風格。",
    score: 85,
    advice: "很適合進入製作，可以較快完成初版。",
  },
  {
    id: "oldsite",
    title: "已有舊網站",
    desc: "已有網站，需要修改、RWD、更新內容或部署檢查。",
    score: 70,
    advice: "適合先檢查現有網站問題，再決定是局部修改或重做。",
  },
]

const budgetOptions = [
  {
    id: "low",
    title: "NT$2,000–4,000",
    desc: "適合學生作品集、簡單個人頁、活動介紹頁。",
    package: "Basic",
  },
  {
    id: "standard",
    title: "NT$5,000–8,000",
    desc: "適合小型店家、工作室、服務介紹、預約制網站。",
    package: "Standard",
  },
  {
    id: "higher",
    title: "NT$8,000 以上",
    desc: "適合內容較完整、區塊較多、需要較多客製調整的網站。",
    package: "Custom",
  },
  {
    id: "discuss",
    title: "先討論",
    desc: "還不確定預算，需要先確認範圍。",
    package: "Discuss",
  },
]

const timelineOptions = [
  {
    id: "urgent",
    title: "1 週內",
    desc: "比較趕，適合內容已完整、範圍很小的案子。",
    risk: "時程較急，需先確認素材是否完整。",
  },
  {
    id: "two-weeks",
    title: "2 週內",
    desc: "小型一頁式網站比較合理的節奏。",
    risk: "適合大多數小型網站。",
  },
  {
    id: "month",
    title: "1 個月內",
    desc: "可以比較完整整理內容、修改與測試。",
    risk: "適合內容較多或需要多次討論。",
  },
  {
    id: "flexible",
    title: "不急",
    desc: "可慢慢整理資料與需求。",
    risk: "適合還在釐清方向的需求。",
  },
]

const styleOptions = [
  "簡約乾淨",
  "溫柔質感",
  "專業可信",
  "科技感",
  "生活感",
  "高級精品",
  "可愛活潑",
  "像真實店家，不要 AI 模板感",
]

const scopeCanDo = [
  "React / Vite 前端頁面",
  "RWD 手機版排版",
  "一頁式網站 / 作品集網站",
  "LINE / IG / Email / Google Map 整合",
  "Google Form / 報名連結整合",
  "Vercel 部署與 GitHub 原始碼管理",
  "基本 SEO meta / OGP 設定",
  "簡易交付與修改說明",
]

const scopeNotMain = [
  "大型後台系統",
  "會員登入",
  "金流付款",
  "完整電商購物車",
  "大型 CMS 內容管理系統",
  "保證 Google SEO 排名",
  "廣告投放成效保證",
  "高階品牌識別全套設計",
]

function BriefPage() {
  const [websiteType, setWebsiteType] = useState("studio")
  const [selectedGoals, setSelectedGoals] = useState([
    "讓客人私訊 / 預約",
    "整理 IG / LINE 上分散資訊",
  ])
  const [selectedFeatures, setSelectedFeatures] = useState([
    "作品展示",
    "服務價格",
    "LINE / IG",
    "Google Map",
    "FAQ",
  ])
  const [assetLevel, setAssetLevel] = useState("social")
  const [budget, setBudget] = useState("standard")
  const [timeline, setTimeline] = useState("two-weeks")
  const [styles, setStyles] = useState(["簡約乾淨", "像真實店家，不要 AI 模板感"])
  const [businessName, setBusinessName] = useState("")
  const [contact, setContact] = useState("")
  const [reference, setReference] = useState("")
  const [notes, setNotes] = useState("")
  const [copied, setCopied] = useState(false)

  const currentType = websiteTypes.find((item) => item.id === websiteType)
  const currentAsset = assetLevels.find((item) => item.id === assetLevel)
  const currentBudget = budgetOptions.find((item) => item.id === budget)
  const currentTimeline = timelineOptions.find((item) => item.id === timeline)

  const analysis = useMemo(() => {
    const featureCount = selectedFeatures.length
    const goalCount = selectedGoals.length
    const styleCount = styles.length

    let complexityScore = 20 + featureCount * 4 + goalCount * 3

    if (selectedFeatures.includes("GA4 點擊追蹤建議")) complexityScore += 8
    if (selectedFeatures.includes("Google 商家 / 地圖連結整理")) complexityScore += 6
    if (selectedFeatures.includes("舊網站 RWD 修正")) complexityScore += 8
    if (websiteType === "repair") complexityScore += 5
    if (timeline === "urgent") complexityScore += 8

    complexityScore = Math.min(complexityScore, 100)

    const textFilled = [businessName, contact, reference, notes].filter(
      (item) => item.trim().length > 0
    ).length

    let completenessScore = currentAsset.score + textFilled * 4 + styleCount * 2
    completenessScore = Math.min(completenessScore, 100)

    const complexityLabel =
      complexityScore >= 75
        ? "偏高"
        : complexityScore >= 48
          ? "標準"
          : "簡單"

    const completenessLabel =
      completenessScore >= 80
        ? "高"
        : completenessScore >= 55
          ? "中"
          : "低"

    let suggestedPackage = currentBudget.package

    if (complexityScore >= 75 && budget === "low") {
      suggestedPackage = "建議提高預算或縮小範圍"
    } else if (websiteType === "repair") {
      suggestedPackage = "Adjust"
    } else if (complexityScore < 45 && budget !== "higher") {
      suggestedPackage = "Basic / Standard"
    }

    const missing = []

    if (!businessName.trim()) missing.push("店名 / 個人名稱")
    if (!contact.trim()) missing.push("主要聯絡方式")
    if (!reference.trim()) missing.push("參考網站或喜歡的風格")
    if (assetLevel === "idea") {
      missing.push("照片 / 作品圖 / 價格表 / 服務內容")
    }
    if (!selectedFeatures.includes("LINE / IG") && !selectedFeatures.includes("Email")) {
      missing.push("至少一個主要聯絡入口")
    }

    return {
      complexityScore,
      complexityLabel,
      completenessScore,
      completenessLabel,
      suggestedPackage,
      missing,
    }
  }, [
    selectedFeatures,
    selectedGoals,
    styles,
    currentAsset,
    currentBudget,
    websiteType,
    timeline,
    budget,
    businessName,
    contact,
    reference,
    notes,
    assetLevel,
  ])

  const summaryText = useMemo(() => {
    return `【網站需求摘要】

店名 / 個人名稱：
${businessName || "尚未填寫"}

聯絡方式：
${contact || "尚未填寫"}

網站類型：
${currentType.title}

主要用途：
${selectedGoals.length ? selectedGoals.join("、") : "尚未選擇"}

需要功能：
${selectedFeatures.length ? selectedFeatures.join("、") : "尚未選擇"}

素材狀態：
${currentAsset.title}
${currentAsset.desc}

風格方向：
${styles.length ? styles.join("、") : "尚未選擇"}

參考網站 / 參考風格：
${reference || "尚未填寫"}

預算範圍：
${currentBudget.title}

希望完成時間：
${currentTimeline.title}

系統初步判斷：
資料完整度：${analysis.completenessLabel}（${analysis.completenessScore}/100）
需求複雜度：${analysis.complexityLabel}（${analysis.complexityScore}/100）
建議方案：${analysis.suggestedPackage}

下一步建議補充：
${analysis.missing.length ? analysis.missing.map((item) => `- ${item}`).join("\n") : "- 目前資料已足夠進行初步評估"}

補充說明：
${notes || "無"}`
  }, [
    businessName,
    contact,
    currentType,
    selectedGoals,
    selectedFeatures,
    currentAsset,
    styles,
    reference,
    currentBudget,
    currentTimeline,
    analysis,
    notes,
  ])

  function toggleArray(value, list, setList) {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value))
    } else {
      setList([...list, value])
    }
  }

  function handleTypeChange(type) {
    setWebsiteType(type.id)

    const merged = Array.from(new Set([...selectedFeatures, ...type.defaultFeatures]))
    setSelectedFeatures(merged)
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const mailHref = `mailto:a0988874324@gmail.com?subject=${encodeURIComponent(
    "網站需求初步評估"
  )}&body=${encodeURIComponent(summaryText)}`

  return (
    <main className="min-h-screen overflow-hidden bg-[#08090d] pb-20 text-white">
      <BackgroundGlow />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 pt-6">
        <Link
          to="/"
          className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur transition hover:border-white/40 hover:text-white"
        >
          ← 回到首頁
        </Link>

        <a
          href="#summary"
          className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-black md:hidden"
        >
          看摘要
        </a>
      </div>

      <section className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1.02fr_0.98fr] md:items-center md:pb-24 md:pt-20">
        <div>
          <div className="mb-5 inline-flex max-w-full rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs leading-5 text-cyan-100 backdrop-blur sm:text-sm">
            Interactive Website Brief / 互動式需求整理器
          </div>

          <h1 className="max-w-4xl text-[2.65rem] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-5xl sm:leading-[1.08] md:text-7xl md:leading-[1.02]">
            <span className="block">不知道怎麼說需求？</span>
            <span className="block">先讓表單幫你整理。</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg sm:leading-9">
            勾選網站類型、功能、素材狀態、預算與時程後，系統會自動產生一份需求摘要。
            你可以直接複製傳給我，方便我初步評估範圍與報價。
          </p>

          <div className="mt-8 rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm font-semibold text-amber-200">
              隱私提醒
            </p>
            <p className="mt-2 leading-7 text-white/65">
              這一版沒有後端，不會自動儲存你的資料。你填的內容只會在瀏覽器裡整理，
              需要你按「複製需求摘要」或「Email 傳給我」才會送出。
            </p>
          </div>
        </div>

        <AnalysisPanel analysis={analysis} />
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Step 01"
          title="你想做哪一種網站？"
          desc="真實接案一開始要先確認網站類型，因為預約制工作室、作品集、活動頁和舊網站修改，重點完全不同。"
        />

        <div className="grid gap-4 md:grid-cols-5">
          {websiteTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`rounded-[2rem] border p-5 text-left transition hover:-translate-y-1 ${
                websiteType === type.id
                  ? "border-cyan-300 bg-cyan-300 text-black"
                  : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
              }`}
            >
              <h3 className="text-xl font-semibold">{type.title}</h3>
              <p
                className={`mt-3 text-sm leading-7 ${
                  websiteType === type.id ? "text-black/65" : "text-white/55"
                }`}
              >
                {type.examples}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Step 02"
          title="網站主要要達成什麼？"
          desc="不要只說想做網站，要先確認它要幫你完成什麼事情。"
        />

        <CheckGrid
          options={goals}
          selected={selectedGoals}
          onToggle={(value) => toggleArray(value, selectedGoals, setSelectedGoals)}
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Step 03"
          title="需要哪些功能或內容？"
          desc="小型網站不是功能越多越好，應該先選真正能幫訪客理解、聯絡或預約的功能。"
        />

        <CheckGrid
          options={featureOptions}
          selected={selectedFeatures}
          onToggle={(value) =>
            toggleArray(value, selectedFeatures, setSelectedFeatures)
          }
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Step 04"
          title="目前素材準備到什麼程度？"
          desc="資料越完整，越容易估價與製作。這不是要你一次準備完，而是先知道還缺什麼。"
        />

        <div className="grid gap-4 md:grid-cols-4">
          {assetLevels.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setAssetLevel(item.id)}
              className={`rounded-[2rem] border p-6 text-left transition hover:-translate-y-1 ${
                assetLevel === item.id
                  ? "border-cyan-300 bg-cyan-300 text-black"
                  : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
              }`}
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p
                className={`mt-3 text-sm leading-7 ${
                  assetLevel === item.id ? "text-black/65" : "text-white/55"
                }`}
              >
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Step 05"
              title="預算範圍"
              desc="先用範圍討論即可，實際價格仍會依內容、功能、修改次數與時程調整。"
            />

            <div className="grid gap-4">
              {budgetOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBudget(item.id)}
                  className={`rounded-[2rem] border p-5 text-left transition hover:-translate-y-1 ${
                    budget === item.id
                      ? "border-cyan-300 bg-cyan-300 text-black"
                      : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
                  }`}
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p
                    className={`mt-2 text-sm leading-7 ${
                      budget === item.id ? "text-black/65" : "text-white/55"
                    }`}
                  >
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Step 06"
              title="希望完成時間"
              desc="越趕越需要素材完整、範圍清楚；如果需求還不清楚，建議不要排太緊。"
            />

            <div className="grid gap-4">
              {timelineOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTimeline(item.id)}
                  className={`rounded-[2rem] border p-5 text-left transition hover:-translate-y-1 ${
                    timeline === item.id
                      ? "border-cyan-300 bg-cyan-300 text-black"
                      : "border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"
                  }`}
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p
                    className={`mt-2 text-sm leading-7 ${
                      timeline === item.id ? "text-black/65" : "text-white/55"
                    }`}
                  >
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Step 07"
          title="希望網站是什麼風格？"
          desc="這可以幫我判斷要走工作室質感、工程可信、生活品牌、還是作品集風格。"
        />

        <CheckGrid
          options={styleOptions}
          selected={styles}
          onToggle={(value) => toggleArray(value, styles, setStyles)}
        />
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10">
        <SectionHeading
          eyebrow="Step 08"
          title="補充基本資料"
          desc="這些資料會被整理到摘要中，方便我初步評估。"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <InputCard
            label="店名 / 個人名稱"
            placeholder="例如：Luma Nail Studio / 王小明作品集"
            value={businessName}
            onChange={setBusinessName}
          />
          <InputCard
            label="主要聯絡方式"
            placeholder="例如：LINE ID、Email、IG 帳號"
            value={contact}
            onChange={setContact}
          />
          <InputCard
            label="參考網站 / 參考風格"
            placeholder="可以貼網址，或描述喜歡的風格"
            value={reference}
            onChange={setReference}
          />
          <TextAreaCard
            label="補充說明"
            placeholder="例如：目前只有 IG、想先做一頁式、希望手機版好看、之後可能加表單..."
            value={notes}
            onChange={setNotes}
          />
        </div>
      </section>

      <section id="summary" className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <AnalysisPanel analysis={analysis} compact />

            <div className="mt-6 rounded-[2.4rem] bg-white p-8 text-black shadow-2xl shadow-black/30">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Scope
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                先確認目前適合做什麼。
              </h2>

              <div className="mt-6 grid gap-5">
                <ScopeList title="目前適合承接" items={scopeCanDo} />
                <ScopeList title="目前不主打 / 不亂承諾" items={scopeNotMain} muted />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.06] backdrop-blur">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-cyan-300">Generated Brief</p>
                <h2 className="mt-1 text-2xl font-semibold">自動產生需求摘要</h2>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copySummary}
                  className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
                >
                  {copied ? "已複製" : "複製摘要"}
                </button>

                <a
                  href={mailHref}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Email
                </a>
              </div>
            </div>

            <pre className="max-h-[760px] overflow-auto whitespace-pre-wrap p-6 text-sm leading-8 text-white/72">
              {summaryText}
            </pre>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="overflow-hidden rounded-[2.8rem] bg-cyan-300 p-8 text-black md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/55">
                Next Step
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                複製摘要後傳給我，就能開始初步評估。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-black/65">
                這份摘要可以幫我更快了解你的網站用途、功能、素材完整度、預算與時程。
                不需要一次填得完美，先有方向就可以討論。
              </p>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                onClick={copySummary}
                className="rounded-3xl bg-black p-5 text-left text-white transition hover:bg-stone-800"
              >
                <p className="text-sm text-white/50">Copy Brief</p>
                <p className="mt-2 font-semibold">
                  {copied ? "已複製需求摘要" : "複製需求摘要"}
                </p>
              </button>

              <a
                href={mailHref}
                className="rounded-3xl bg-white/70 p-5 text-black transition hover:bg-white"
              >
                <p className="text-sm text-black/50">Email</p>
                <p className="mt-2 font-semibold">用 Email 傳給我</p>
              </a>

              <Link
                to="/luma-nail"
                className="rounded-3xl bg-white/50 p-5 text-black transition hover:bg-white/80"
              >
                <p className="text-sm text-black/50">Main Case</p>
                <p className="mt-2 font-semibold">查看 Luma 主打案例 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MobileSummaryCTA />
    </main>
  )
}

function AnalysisPanel({ analysis, compact = false }) {
  return (
    <div
      className={`rounded-[2.4rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl ${
        compact ? "" : "md:p-6"
      }`}
    >
      <p className="text-sm text-cyan-200">Live Estimate</p>
      <h2 className="mt-3 text-3xl font-semibold">初步需求判斷</h2>

      <div className="mt-6 grid gap-4">
        <Meter
          label="資料完整度"
          value={analysis.completenessScore}
          text={analysis.completenessLabel}
        />
        <Meter
          label="需求複雜度"
          value={analysis.complexityScore}
          text={analysis.complexityLabel}
        />
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
        <p className="text-sm font-semibold text-cyan-200">建議方案</p>
        <p className="mt-2 text-2xl font-semibold">{analysis.suggestedPackage}</p>
      </div>

      <div className="mt-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-semibold text-white/75">下一步要補充</p>
        <div className="mt-3 grid gap-2">
          {analysis.missing.length ? (
            analysis.missing.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-white/60">
                <span className="mt-2 h-2 w-2 rounded-full bg-amber-300" />
                <span>{item}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/60">目前資料已足夠進行初步評估。</p>
          )}
        </div>
      </div>
    </div>
  )
}

function Meter({ label, value, text }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-white/60">{label}</span>
        <span className="font-semibold text-cyan-300">
          {text} / {value}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-cyan-300 transition-all duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function CheckGrid({ options, selected, onToggle }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {options.map((item) => {
        const active = selected.includes(item)

        return (
          <button
            key={item}
            type="button"
            onClick={() => onToggle(item)}
            className={`rounded-2xl border p-4 text-left text-sm leading-6 transition hover:-translate-y-1 ${
              active
                ? "border-cyan-300 bg-cyan-300 text-black"
                : "border-white/10 bg-white/[0.06] text-white/70 hover:bg-white/[0.1]"
            }`}
          >
            <span
              className={`mb-3 flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
                active ? "border-black bg-black text-white" : "border-white/30"
              }`}
            >
              {active ? "✓" : ""}
            </span>
            {item}
          </button>
        )
      })}
    </div>
  )
}

function InputCard({ label, placeholder, value, onChange }) {
  return (
    <label className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
      <span className="text-sm font-semibold text-cyan-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan-300"
      />
    </label>
  )
}

function TextAreaCard({ label, placeholder, value, onChange }) {
  return (
    <label className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5">
      <span className="text-sm font-semibold text-cyan-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="mt-4 w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan-300"
      />
    </label>
  )
}

function ScopeList({ title, items, muted = false }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-black/65">
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                muted ? "bg-amber-500" : "bg-cyan-500"
              }`}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionHeading({ eyebrow, title, desc }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md leading-8 text-white/55">{desc}</p>
    </div>
  )
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute left-[-160px] top-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute right-[-220px] top-[280px] h-[560px] w-[560px] rounded-full bg-amber-400/10 blur-[150px]" />
      <div className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
    </div>
  )
}

function MobileSummaryCTA() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 grid grid-cols-2 gap-3 rounded-[1.6rem] border border-white/10 bg-[#08090d]/85 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
      <a
        href="#summary"
        className="flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
      >
        看摘要
      </a>
      <Link
        to="/luma-nail"
        className="flex items-center justify-center rounded-full bg-cyan-300 px-4 py-3 text-sm font-semibold text-black"
      >
        看案例
      </Link>
    </div>
  )
}

export default BriefPage