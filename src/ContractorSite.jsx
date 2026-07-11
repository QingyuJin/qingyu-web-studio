import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import { createContactRequest } from "./lib/contactRequests"

const lineBotId = "@550oexzn"

const services = ["防水抓漏", "地坪工程", "磁磚泥作", "油漆修繕", "木作裝修", "工程管理"]

const cases = [
  {
    title: "屋頂防水修繕",
    type: "防水抓漏",
    image: "/project-photos/335950_0.jpg",
    brief: "五樓公寓頂層長期滲水，天花板壁癌嚴重。全面刨除舊防水層後，重新施作PU防水塗層與隔熱漆，並加裝落水頭檢修口。",
    detail: "施工面積 42 坪，工期 5 天。完工後測試蓄水 72 小時無滲漏，提供 3 年保固。業主回饋：原本每逢大雨就要拿水桶接水，現在完全不用擔心了。",
  },
  {
    title: "Epoxy 地坪整理",
    type: "地坪工程",
    image: "/project-photos/335953_0.jpg",
    brief: "汽車維修廠地坪長期受油污與重壓，地面凹凸不平且粉塵嚴重。全面研磨整平後，施作環氧樹脂砂漿中塗與面塗。",
    detail: "施作面積 85 坪，採用 3mm 環氧砂漿系統，耐重壓、耐油污、防滑係數達 0.6。完工後廠房明亮整潔，業主表示工作效率明顯提升。",
  },
  {
    title: "木地板與室內修繕",
    type: "木作裝修",
    image: "/project-photos/335949_0.jpg",
    brief: "30 年老屋室內翻新，原磁磚地板膨拱、木作櫃體老舊。拆除全室地壁磚後重新隔間，鋪設超耐磨木地板。",
    detail: "室內 28 坪，含兩房一廳。全室管線重配、天花板輕鋼架、地板採用 EGGER 超耐磨木地板。整合廚房開放式設計，從拆除到完工共 18 天。",
  },
  {
    title: "外牆與立面工程",
    type: "油漆修繕",
    image: "/project-photos/335945_0.jpg",
    brief: "透天厝外牆磁磚剝落，部分區域滲水導致室內壁癌。採用鷹架施工，全面刨除鬆動磁磚後進行防水砂漿粉光。",
    detail: "4 層樓透天，外牆面積約 120 坪。使用德國 Sto 塗料系統，具耐候性與自潔效果。搭配滴水線與窗框收邊，完工後整體立面煥然一新。",
  },
  {
    title: "住宅門面翻新",
    type: "工程管理",
    image: "/project-photos/335941_0.jpg",
    brief: "老舊公寓一樓門面與騎樓整修，含鐵捲門更換、地坪修補、燈光規劃與店面招牌整合。",
    detail: "從丈量、設計規劃、施工排程到驗收，整合鐵工、泥作、水電與招牌廠商。總工期 12 天。完工後業主表示來客詢問度明顯增加。",
  },
  {
    title: "室內明亮化整理",
    type: "磁磚泥作",
    image: "/project-photos/335942_0.jpg",
    brief: "狹長老屋中間區域完全無採光，且天花滴水、地磚破損。拆除部分隔間牆引光，全室天花板更新與地磚重鋪。",
    detail: "採用 60x60 霧面石英磚，搭配 LED 嵌燈與鏡面反射設計，讓室內亮度提升 3 倍以上。壁面以白色抿石子點綴，保留老屋韻味。",
  },
]

const quoteSteps = [
  ["需求整理", "先用表單收集地點、照片、尺寸與預算。"],
  ["初步報價", "用固定欄位建立可追蹤的報價草稿。"],
  ["施工追蹤", "把進度、變更、付款與驗收集中管理。"],
]

const formFields = [
  ["name", "姓名"],
  ["contact", "電話 / LINE"],
  ["source", "來源", "LINE / Google / Pro360"],
  ["area", "施工地區"],
  ["trade", "工程類型", "防水 / 地坪 / 泥作"],
  ["item", "需求項目"],
  ["material", "指定材料"],
  ["size", "坪數 / 尺寸"],
  ["date", "期望施工日期"],
  ["budget", "預算範圍"],
  ["note", "補充說明"],
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, inView]
}

function FadeInSection({ children, className = "" }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}>
      {children}
    </div>
  )
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = "" }
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-white/15 px-3 py-1 text-sm font-black text-white hover:bg-white/30">✕ 關閉</button>
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-xl font-black text-white hover:bg-white/30">‹</button>
      <button onClick={(e) => { e.stopPropagation(); onNext() }} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-2 text-xl font-black text-white hover:bg-white/30">›</button>
      <img
        src={images[currentIndex].image}
        alt={images[currentIndex].title}
        className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-black text-white">
        {images[currentIndex].title}（{currentIndex + 1} / {images.length}）
      </p>
    </div>
  )
}

function ContractorSite() {
  const [activeCase, setActiveCase] = useState(cases[0])
  const [activeType, setActiveType] = useState("全部")
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [form, setForm] = useState(Object.fromEntries(formFields.map(([key]) => [key, ""])))
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [autoPlay, setAutoPlay] = useState(true)

  const filteredCases = useMemo(() => {
    if (activeType === "全部") return cases
    return cases.filter((item) => item.type === activeType)
  }, [activeType])

  useEffect(() => {
    if (!autoPlay || lightboxIndex !== null) return
    const timer = setInterval(() => {
      setActiveCase((prev) => cases[(cases.indexOf(prev) + 1) % cases.length])
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, lightboxIndex])

  const inquiryText = `工程需求詢價
姓名：${form.name || "待填"}
電話 / LINE：${form.contact || "待填"}
來源：${form.source || "待填"}
施工地區：${form.area || "待填"}
工程類型：${form.trade || "待填"}
需求項目：${form.item || "待填"}
指定材料：${form.material || "待填"}
坪數 / 尺寸：${form.size || "待填"}
期望施工日期：${form.date || "待填"}
預算範圍：${form.budget || "待填"}
補充說明：${form.note || "待填"}
LINE Bot：${lineBotId}`

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryText)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = inquiryText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  async function submitInquiry(event) {
    event.preventDefault()
    setSubmitting(true)
    setSubmitMessage("")

    const result = await createContactRequest({
      name: form.name || "未填姓名",
      contact: form.contact || "未填聯絡方式",
      company: form.area,
      service_type: form.trade || form.item || "工程需求",
      budget_range: form.budget,
      message: inquiryText,
      source: "contractor-site",
      status: "new",
    })

    setSubmitting(false)

    if (!result.ok) {
      setSubmitMessage(`尚未送出到後台：${result.reason}`)
      return
    }

    setSubmitMessage("需求已送出，已同步到 BuildFlow 後台的「網站詢價」收件匣。")
    setForm(Object.fromEntries(formFields.map(([key]) => [key, ""])))
  }

  const goToPrev = useCallback(() => {
    setActiveCase((prev) => {
      const idx = cases.indexOf(prev)
      return cases[(idx - 1 + cases.length) % cases.length]
    })
  }, [])

  const goToNext = useCallback(() => {
    setActiveCase((prev) => {
      const idx = cases.indexOf(prev)
      return cases[(idx + 1) % cases.length]
    })
  }, [])

  function openLightbox(index) {
    setLightboxIndex(index)
    setAutoPlay(false)
  }

  function closeLightbox() {
    setLightboxIndex(null)
    setAutoPlay(true)
  }

  return (
    <main className="min-h-screen bg-[#0c1518] text-slate-100">
      <Seo
        page={{
          path: "/contractor-site",
          title: "工程接案頁｜防水、地坪、修繕與詢價表單｜Qingyu Web Studio",
          description: "工程服務接案落地頁展示：服務分類、施工案例、詢價表單與 BuildFlow 後台串接。",
        }}
      />
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c1518]/92 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link to="/" className="text-sm font-bold text-[#8bd8cc]">
              Qingyu Web Studio
            </Link>
            <p className="mt-1 font-black">鑫匠工程 · 接案頁展示</p>
          </div>
          <div className="flex gap-2">
            <a href="#inquiry" className="rounded-md bg-[#f0c36a] px-4 py-2 text-sm font-black text-[#0c1518]">
              填寫需求
            </a>
            <a
              href="https://xinjiang-website.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-md border border-white/12 px-4 py-2 text-sm font-black sm:inline-flex"
            >
              鑫匠官網
            </a>
            <Link to="/buildflow" className="rounded-md border border-white/12 px-4 py-2 text-sm font-black">
              BuildFlow
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <FadeInSection>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#8bd8cc]">Xinjiang Masonry Works</p>
          <h1 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">
            瓦刀執手砌日月，
            <br />
            匠心巧思鑄千秋。
          </h1>
          <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-slate-300 md:text-base">
            鑫匠工程——屏東在地泥作裝修。40 年老師父經驗，泥作、磁磚、洗石子、油漆、拆除與增建，到場評估後實在報價。此頁同時展示需求表單如何直接進到 BuildFlow 後台。
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-black text-slate-300">
            <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5">電話 0909-169-088</span>
            <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5">屏東縣三地門鄉｜屏東、高雄、南部可討論</span>
            <span className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5">週一至週六 09:00–17:00</span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {quoteSteps.map(([title, desc], index) => (
              <div key={title} className="group rounded-lg border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:border-[#f0c36a]/40 hover:bg-white/[0.085]">
                <span className="font-mono text-xs font-black text-[#f0c36a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-lg font-black text-white">{title}</h2>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection className="grid gap-3">
          <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => openLightbox(cases.indexOf(activeCase))}
              className="w-full text-left"
            >
              <img
                src={activeCase.image}
                alt={activeCase.title}
                className="aspect-[5/3] w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/30">
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-black text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                  點擊放大
                </span>
              </div>
            </button>
            <div className="absolute bottom-3 right-3 flex gap-1">
              <button onClick={goToPrev} className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-black text-white backdrop-blur-sm transition hover:bg-black/60">‹</button>
              <button onClick={goToNext} className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-black text-white backdrop-blur-sm transition hover:bg-black/60">›</button>
            </div>
            <div className="absolute bottom-3 left-3 flex gap-1">
              {cases.map((c) => (
                <button
                  key={c.title}
                  onClick={() => { setActiveCase(c); setAutoPlay(false) }}
                  className={`h-1.5 rounded-full transition-all ${
                    activeCase.title === c.title ? "w-6 bg-[#f0c36a]" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 transition duration-300 hover:border-white/20">
            <p className="text-xs font-black text-[#8bd8cc]">{activeCase.type}</p>
            <h2 className="mt-2 text-2xl font-black">{activeCase.title}</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{activeCase.brief}</p>
          </div>
        </FadeInSection>
      </section>

      <FadeInSection>
        <section id="cases" className="mx-auto max-w-6xl px-4 py-12">
          <SectionHeader label="Cases" title="案例展示" desc="用照片與明確描述建立信任，讓客戶知道你做過什麼、適合處理什麼。" />
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {["全部", ...services].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveType(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition duration-200 ${
                  activeType === item ? "bg-[#f0c36a] text-[#0c1518]" : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCases.map((item) => (
              <article
                key={item.title}
                className="group rounded-lg border border-white/10 bg-white/[0.055] p-3 transition duration-300 hover:border-[#f0c36a]/30 hover:bg-white/[0.085]"
              >
                <button
                  type="button"
                  onClick={() => { setActiveCase(item); setAutoPlay(false) }}
                  className="block w-full overflow-hidden rounded-md bg-white/5 text-left"
                >
                  <img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                </button>
                <div className="p-3">
                  <p className="text-xs font-black text-[#8bd8cc]">{item.type}</p>
                  <h3 className="mt-2 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{item.brief}</p>
                  <button
                    onClick={() => { setActiveCase(item); setAutoPlay(false); document.getElementById("cases").scrollIntoView({ behavior: "smooth" }) }}
                    className="mt-4 rounded-md bg-[#f0c36a]/10 px-3 py-1.5 text-xs font-black text-[#f0c36a] opacity-0 transition duration-300 group-hover:opacity-100"
                  >
                    設為主要案例 →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
        <section id="inquiry" className="border-t border-white/10 bg-[#111d22]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionHeader
              label="Inquiry"
              title="線上詢價表單"
              desc="送出後需求會直接進到 BuildFlow 後台的「網站詢價」收件匣，一鍵轉成案件；也可以複製成文字轉貼 LINE。"
            />
            <div className="grid gap-4">
              <form
                className="grid gap-4 rounded-lg border border-white/10 bg-[#0c1518] p-5"
                onSubmit={submitInquiry}
              >
                <div className="grid gap-3 md:grid-cols-2">
                  {formFields.map(([key, label, placeholder]) => (
                    <Input
                      key={key}
                      label={label}
                      value={form[key]}
                      onChange={(value) => updateForm(key, value)}
                      placeholder={placeholder}
                    />
                  ))}
                </div>
                {submitMessage ? (
                  <div className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold leading-6 text-slate-200">
                    {submitMessage}
                    {submitMessage.includes("BuildFlow") ? (
                      <Link to="/buildflow" className="ml-2 font-black text-[#f0c36a] underline underline-offset-4">
                        打開 BuildFlow 查看
                      </Link>
                    ) : null}
                  </div>
                ) : null}

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    disabled={submitting}
                    className="rounded-md bg-[#f0c36a] px-4 py-3 text-sm font-black text-[#0c1518] transition hover:bg-[#e0b35a] disabled:opacity-60"
                  >
                    {submitting ? "送出中..." : "送出需求到後台"}
                  </button>
                  <button
                    type="button"
                    onClick={copyInquiry}
                    className="rounded-md border border-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    {copied ? "已複製需求內容" : "複製詢價內容"}
                  </button>
                </div>
              </form>
              <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-[#0c1518] p-5 text-sm font-bold leading-7 text-slate-300">
                {inquiryText}
              </pre>
            </div>
          </div>
        </section>
      </FadeInSection>

      {lightboxIndex !== null && (
        <Lightbox
          images={cases}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={() => setLightboxIndex((i) => (i - 1 + cases.length) % cases.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % cases.length)}
        />
      )}
    </main>
  )
}

function SectionHeader({ label, title, desc }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8bd8cc]">{label}</p>
      <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-400">{desc}</p>
    </div>
  )
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#f0c36a]"
      />
    </label>
  )
}

export default ContractorSite
