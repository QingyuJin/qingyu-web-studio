import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

const navItems = [
  ["top", "頂部"],
  ["about", "關於項目"],
  ["features", "項目特色"],
  ["stories", "醫生故事"],
  ["events", "公益講座"],
  ["company", "關於我們"],
]

const features = [
  {
    title: "個人品牌口播短影",
    text: "用短影音呈現醫師觀點，讓專業更容易被理解與分享。",
    icon: "video",
  },
  {
    title: "個人品牌深度專訪",
    text: "透過長訪談建立醫師個人品牌與信任感。",
    icon: "mic",
  },
  {
    title: "專業知識衛教圖文",
    text: "把艱深醫療知識整理成可閱讀、可收藏的社群內容。",
    icon: "note",
  },
  {
    title: "醫療領域整合行銷",
    text: "協助醫療人員、診所與機構建立長期內容資產。",
    icon: "network",
  },
]

const stories = [
  {
    title: "急診醫師的一天",
    text: "在高壓現場裡，看見判斷、溝通與照護的重量。",
    tag: "急診故事",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80",
    author: "急診醫學科 · 林醫師",
    readTime: "6 分鐘",
    body: [
      "早上七點半交班，白板上是一夜累積的三十七床。急診的節奏不是快，而是「同時」：判斷、溝通、安撫與決策，常常在同一分鐘內發生。",
      "「我們最常做的不是急救，而是翻譯。」把檢查數字翻譯成家屬聽得懂的語言，把焦慮翻譯成可以一起做的下一步。",
      "這一天的最後，是一位獨居長輩的回診安排。醫療的重量不只在搶救瞬間，更在每一次確認有人接住他之後，才放心讓病人離開的守備範圍。",
    ],
  },
  {
    title: "牙科醫師的品牌經營",
    text: "從診間溝通到內容經營，讓專業被溫柔理解。",
    tag: "品牌專訪",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
    author: "牙科 · 陳醫師",
    readTime: "5 分鐘",
    body: [
      "「病人在診療椅上只有二十分鐘，但他的疑問存在三百六十五天。」陳醫師開始經營衛教內容的起點，是發現同樣的問題每天要回答十次。",
      "把常見問題整理成圖文，把治療流程拍成短影音，診間溝通的起跑點就完全不同——病人帶著理解進來，而不是帶著恐懼。",
      "品牌經營對醫師而言不是行銷，是把專業翻譯成日常語言的長期練習。信任感是內容累積出來的複利。",
    ],
  },
  {
    title: "醫美醫師的溝通哲學",
    text: "將美感、期待與風險，轉化成清楚可信任的對話。",
    tag: "溝通哲學",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    author: "醫美 · 張醫師",
    readTime: "5 分鐘",
    body: [
      "醫美診間最難的不是技術，是期待管理。「我會先花一半的時間，確認我們想像的是同一件事。」",
      "張醫師堅持在療程前把風險說滿：能改善多少、恢復期多長、哪些狀況不適合做。「說清楚風險不會趕走客人，只會留下對的客人。」",
      "美感是主觀的，但溝通可以是有結構的。清楚的對話本身，就是一種專業。",
    ],
  },
]

const eventSessions = [
  { id: "online", label: "線上場", note: "Zoom 直播 + 回放", seats: 200, taken: 168 },
  { id: "taipei", label: "台北現場", note: "信義區會議中心", seats: 80, taken: 74 },
]

const eventInfo = {
  date: "09.18",
  title: "醫療品牌內容經營講座",
  place: "線上講座 / 台北同步轉播",
  note: "從醫師故事、衛教內容到品牌信任感。",
}

const heroImage = "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=82"
const aboutImage = "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=82"
const eventImage = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=82"
const backgroundImage = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=2200&q=70"

function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("name", name)
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", content)
}

function setPropertyMeta(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute("property", property)
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", content)
}

function FeatureIcon({ type }) {
  const common = "h-6 w-6 stroke-current"
  const paths = {
    video: (
      <>
        <rect x="3" y="6" width="12" height="12" rx="3" />
        <path d="M15 10.5 21 7v10l-6-3.5" />
      </>
    ),
    mic: (
      <>
        <path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3Z" />
        <path d="M5 11a7 7 0 0 0 14 0" />
        <path d="M12 18v3" />
      </>
    ),
    note: (
      <>
        <path d="M7 4h8l3 3v13H7z" />
        <path d="M15 4v4h4" />
        <path d="M10 12h6M10 16h5" />
      </>
    ),
    network: (
      <>
        <circle cx="7" cy="8" r="3" />
        <circle cx="17" cy="8" r="3" />
        <circle cx="12" cy="17" r="3" />
        <path d="m9.5 10 2 4M14.5 10l-2 4" />
      </>
    ),
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[type]}
    </svg>
  )
}

function SoftBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7f1e6]">
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        className="absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] scale-105 object-cover opacity-[0.14] blur-2xl saturate-[0.72]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,246,0.93),rgba(243,248,243,0.88)_42%,rgba(246,239,226,0.94))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.9),transparent_27rem),radial-gradient(circle_at_88%_16%,rgba(196,218,206,0.56),transparent_32rem),radial-gradient(circle_at_44%_100%,rgba(226,199,151,0.36),transparent_34rem)]" />
    </div>
  )
}

function SectionShell({ id, children, className = "" }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.16 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`biomed-section mx-auto max-w-7xl px-4 py-16 transition duration-500 ease-out md:px-8 md:py-24 ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </section>
  )
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8d7a52]">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,4.35rem)] font-black leading-[1] tracking-[-0.045em] text-[#243a32]">{title}</h2>
      {text ? <p className="mt-4 max-w-xl text-sm font-semibold leading-7 text-[#66786f] md:text-[15px]">{text}</p> : null}
    </div>
  )
}

function BiomedHeader({ activeId }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/55 bg-[#fbf6ec]/74 shadow-[0_10px_35px_rgba(55,58,47,0.05)] backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#243a32] font-serif text-lg font-black text-[#e9cf9b]">LC</span>
          <div>
            <p className="font-serif text-lg font-black leading-none tracking-[-0.03em] text-[#243a32]">LightCare BioMed</p>
            <p className="mt-1 text-[10px] font-black tracking-[0.16em] text-[#8d7a52]">醫療人文誌</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${activeId === id ? "bg-[#243a32] text-white" : "text-[#5f7168] hover:bg-white/55 hover:text-[#243a32]"}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/56 text-[#243a32] shadow-sm backdrop-blur lg:hidden"
          aria-label="切換選單"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="grid gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/60 bg-[#fbf6ec]/94 px-4 py-3 backdrop-blur-2xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navItems.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-2xl px-4 py-3 text-sm font-black ${activeId === id ? "bg-[#243a32] text-white" : "bg-white/52 text-[#5f7168]"}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function BiomedHero() {
  return (
    <section id="top" className="biomed-section mx-auto grid min-h-[100svh] max-w-7xl gap-8 px-4 pb-16 pt-28 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="relative z-10 max-w-3xl">
        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#8d7a52]">Medical Humanity Journal</p>
        <h1 className="mt-5 text-balance font-serif text-[clamp(3.25rem,7vw,7.4rem)] font-black leading-[0.9] tracking-[-0.065em] text-[#243a32]">
          屬於醫療人員的故事
        </h1>
        <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-[#65776e] md:text-lg">
          記錄醫療現場裡，那些溫暖、專業與被看見的時刻。
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#about" className="inline-flex min-h-12 items-center rounded-full bg-[#243a32] px-6 text-sm font-black text-white shadow-xl shadow-[#243a32]/15">
            了解項目
          </a>
          <a href="#stories" className="inline-flex min-h-12 items-center rounded-full border border-white/70 bg-white/58 px-6 text-sm font-black text-[#243a32] backdrop-blur">
            觀看醫生故事
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 rounded-[3rem] bg-[#e7d1a4]/24 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-white/45 p-4 shadow-[0_24px_90px_rgba(50,68,58,0.12)] backdrop-blur-2xl">
          <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem]">
            <img src={heroImage} alt="醫療人員訪談形象照" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(27,50,42,0.46))]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/50 bg-white/64 p-5 backdrop-blur-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#8d7a52]">Current Feature</p>
              <h2 className="mt-2 font-serif text-3xl font-black tracking-[-0.04em] text-[#243a32]">急診醫師的一天</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#65776e]">從現場判斷、病人溝通到照護選擇，留下真實而克制的敘事。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BiomedAbout() {
  return (
    <SectionShell id="about">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionTitle
          eyebrow="About"
          title="醫療的本質，是對人文的關懷"
          text="LightCare BioMed 以訪談、衛教與活動紀錄，讓醫療專業不只被理解，也被溫柔保存。"
        />
        <div className="overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/48 p-4 shadow-[0_20px_70px_rgba(50,68,58,0.09)] backdrop-blur-2xl">
          <div className="relative min-h-[24rem] overflow-hidden rounded-[1.8rem]">
            <img src={aboutImage} alt="醫療人員討論內容" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.78),rgba(255,255,255,0.08))]" />
            <div className="absolute left-5 top-5 max-w-xs rounded-[1.4rem] border border-white/70 bg-white/68 p-5 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8d7a52]">Editorial Note</p>
              <p className="mt-3 text-sm font-semibold leading-7 text-[#526b61]">我們相信，好的醫療內容應該清楚、節制，也保留人的溫度。</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function BiomedFeatures() {
  return (
    <SectionShell id="features">
      <SectionTitle eyebrow="Features" title="項目特色" text="從短影音、專訪到衛教內容，建立可以長期累積的醫療品牌資產。" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item) => (
          <article
            key={item.title}
            className="group rounded-[1.5rem] border border-white/70 bg-white/52 p-5 shadow-[0_16px_50px_rgba(50,68,58,0.07)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/68"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#d9cba8]/70 bg-[#f8f1df] text-[#8d6e3d]">
              <FeatureIcon type={item.icon} />
            </div>
            <h3 className="mt-6 font-serif text-[1.45rem] font-black leading-tight tracking-[-0.03em] text-[#243a32]">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-[#65776e]">{item.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}

function BiomedStories() {
  const [activeStory, setActiveStory] = useState(null)

  return (
    <SectionShell id="stories">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionTitle eyebrow="Stories" title="醫生故事" text="像品牌媒體一樣上架人物、觀點與專業內容。點擊卡片可閱讀全文。" />
        <span className="w-fit rounded-full border border-white/70 bg-white/52 px-4 py-2 text-xs font-black text-[#61766c] backdrop-blur">Editorial Series</span>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.title}
            className="cursor-pointer overflow-hidden rounded-[1.7rem] border border-white/70 bg-white/52 p-4 shadow-[0_18px_55px_rgba(50,68,58,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/68"
            onClick={() => setActiveStory(story)}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem]">
              <img src={story.image} alt={story.title} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-white/74 px-3 py-1 text-[10px] font-black tracking-[0.14em] text-[#61766c] backdrop-blur">{story.tag}</span>
            </div>
            <div className="px-2 pb-1 pt-5">
              <h3 className="font-serif text-[1.55rem] font-black tracking-[-0.035em] text-[#243a32]">{story.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-[#65776e]">{story.text}</p>
              <p className="mt-3 text-xs font-black text-[#8d7a52]">
                {story.author} · {story.readTime} · 閱讀全文 →
              </p>
            </div>
          </article>
        ))}
      </div>

      {activeStory ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-[#1b2a24]/55 p-4 backdrop-blur-sm"
          onClick={() => setActiveStory(null)}
        >
          <article
            className="max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/70 bg-[#fdfaf3] p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-[#f0e7d3] px-3 py-1 text-[10px] font-black tracking-[0.14em] text-[#8d6e3d]">{activeStory.tag}</span>
                <h3 className="mt-4 font-serif text-4xl font-black tracking-[-0.04em] text-[#243a32]">{activeStory.title}</h3>
                <p className="mt-2 text-xs font-black text-[#8d7a52]">
                  {activeStory.author} · {activeStory.readTime}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                aria-label="關閉全文"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dcd2bd] text-[#61766c] hover:bg-[#f0e7d3]"
              >
                ✕
              </button>
            </div>
            <div className="mt-5 overflow-hidden rounded-[1.4rem]">
              <img src={activeStory.image} alt={activeStory.title} className="aspect-[16/8] w-full object-cover" />
            </div>
            <div className="mt-6 grid gap-4">
              {activeStory.body.map((paragraph) => (
                <p key={paragraph.slice(0, 12)} className="text-[15px] font-semibold leading-8 text-[#4e6157]">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-[#e5dcc8] pt-5">
              <p className="text-xs font-black text-[#8d7a52]">LightCare BioMed · 醫療人文誌</p>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                className="rounded-full bg-[#243a32] px-5 py-2.5 text-xs font-black text-white"
              >
                回到故事列表
              </button>
            </div>
          </article>
        </div>
      ) : null}
    </SectionShell>
  )
}

function BiomedEvents() {
  const [sessions, setSessions] = useState(eventSessions)
  const [sessionId, setSessionId] = useState(eventSessions[0].id)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [ticket, setTicket] = useState(null)

  const selectedSession = sessions.find((session) => session.id === sessionId)

  function submitRegistration(event) {
    event.preventDefault()
    if (!name.trim()) {
      setError("請填寫姓名。")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("請填寫正確的 Email。")
      return
    }
    if (selectedSession.taken >= selectedSession.seats) {
      setError("此場次已額滿，請改選其他場次。")
      return
    }
    setError("")
    setSessions((current) =>
      current.map((session) => (session.id === sessionId ? { ...session, taken: session.taken + 1 } : session))
    )
    setTicket({
      code: `LC-${String(Math.floor(1000 + Math.random() * 9000))}`,
      name: name.trim(),
      session: selectedSession.label,
    })
  }

  function resetRegistration() {
    setTicket(null)
    setName("")
    setEmail("")
  }

  return (
    <SectionShell id="events">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionTitle eyebrow="Events" title="公益講座" text="活動資訊、場次名額與報名流程整理在同一個入口，可直接操作。" />
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/54 p-4 shadow-[0_22px_75px_rgba(50,68,58,0.1)] backdrop-blur-2xl">
          <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr]">
            <div className="relative min-h-[18rem] overflow-hidden rounded-[1.6rem]">
              <img src={eventImage} alt="公益講座現場" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(36,58,50,0.42))]" />
              <span className="absolute left-4 top-4 rounded-full bg-white/74 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-[#61766c] backdrop-blur">OPEN EVENT</span>
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.2rem] border border-white/50 bg-white/70 p-4 backdrop-blur">
                <p className="font-serif text-4xl font-black tracking-[-0.05em] text-[#8d6e3d]">{eventInfo.date}</p>
                <h3 className="mt-2 font-serif text-xl font-black leading-tight tracking-[-0.03em] text-[#243a32]">{eventInfo.title}</h3>
                <p className="mt-1 text-xs font-black text-[#8d7a52]">{eventInfo.place}</p>
              </div>
            </div>

            <div className="p-2 md:p-4">
              {ticket ? (
                <div className="flex h-full flex-col justify-between">
                  <div className="rounded-[1.4rem] border-2 border-dashed border-[#c9b98f] bg-[#fdfaf3] p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8d7a52]">Registration Confirmed</p>
                    <p className="mt-3 font-serif text-4xl font-black tracking-[-0.03em] text-[#243a32]">{ticket.code}</p>
                    <div className="mt-4 grid gap-2 text-sm font-semibold text-[#4e6157]">
                      <p>報名人：{ticket.name}</p>
                      <p>場次：{ticket.session}</p>
                      <p>活動：{eventInfo.title}</p>
                    </div>
                    <p className="mt-4 text-xs font-bold text-[#8d7a52]">報名確認信已寄出（示範流程），講座前三天會再提醒。</p>
                  </div>
                  <button
                    type="button"
                    onClick={resetRegistration}
                    className="mt-4 inline-flex min-h-11 w-fit items-center rounded-full border border-[#c9b98f] px-5 text-xs font-black text-[#243a32] hover:bg-white"
                  >
                    再報名一位
                  </button>
                </div>
              ) : (
                <form onSubmit={submitRegistration} className="grid gap-3">
                  <p className="text-sm font-semibold leading-7 text-[#65776e]">{eventInfo.note}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {sessions.map((session) => {
                      const remaining = session.seats - session.taken
                      const active = sessionId === session.id
                      return (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => setSessionId(session.id)}
                          className={`rounded-2xl border p-3 text-left transition ${
                            active ? "border-[#243a32] bg-[#243a32] text-white" : "border-[#d8cfba] bg-white/70 text-[#243a32] hover:border-[#8d7a52]"
                          }`}
                        >
                          <p className="text-sm font-black">{session.label}</p>
                          <p className={`mt-1 text-xs font-bold ${active ? "text-white/70" : "text-[#65776e]"}`}>{session.note}</p>
                          <p className={`mt-2 text-xs font-black ${remaining <= 10 ? (active ? "text-[#e9cf9b]" : "text-[#b3562e]") : active ? "text-[#e9cf9b]" : "text-[#8d7a52]"}`}>
                            剩餘 {remaining} 位
                          </p>
                        </button>
                      )
                    })}
                  </div>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="姓名"
                    className="min-h-12 rounded-2xl border border-[#d8cfba] bg-white px-4 text-sm font-semibold text-[#243a32] outline-none placeholder:text-[#a4b0a4] focus:border-[#243a32]"
                  />
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email（寄送報名確認）"
                    className="min-h-12 rounded-2xl border border-[#d8cfba] bg-white px-4 text-sm font-semibold text-[#243a32] outline-none placeholder:text-[#a4b0a4] focus:border-[#243a32]"
                  />
                  {error ? <p className="text-xs font-black text-[#b3562e]">{error}</p> : null}
                  <button
                    type="submit"
                    className="inline-flex min-h-12 w-fit items-center rounded-full bg-[#243a32] px-6 text-sm font-black text-white shadow-lg shadow-[#243a32]/14"
                  >
                    確認報名{selectedSession ? `（${selectedSession.label}）` : ""}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function BiomedSubscribe() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const [subscribeError, setSubscribeError] = useState("")

  function submitSubscribe(event) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubscribeError("請輸入正確的 Email 格式。")
      setSent(false)
      return
    }
    setSubscribeError("")
    setSent(true)
  }

  return (
    <SectionShell id="subscribe" className="py-10 md:py-16">
      <div className="rounded-[2rem] border border-white/70 bg-[#243a32] p-6 text-white shadow-[0_24px_80px_rgba(36,58,50,0.16)] md:p-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#e9cf9b]">Subscribe</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,5vw,4rem)] font-black leading-none tracking-[-0.045em]">訂閱我們</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/72">追蹤最新醫療故事與健康內容。</p>
          </div>
          <form onSubmit={submitSubscribe} className="flex flex-col gap-3 rounded-[1.3rem] border border-white/12 bg-white/8 p-3 backdrop-blur md:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="min-h-12 flex-1 rounded-full border border-white/12 bg-white px-5 text-sm font-semibold text-[#243a32] outline-none placeholder:text-[#8aa096]"
            />
            <button type="submit" className="min-h-12 rounded-full bg-[#e9cf9b] px-6 text-sm font-black text-[#243a32]">
              訂閱
            </button>
          </form>
        </div>
        {subscribeError ? <p className="mt-4 text-sm font-black text-[#f0b3a0]">{subscribeError}</p> : null}
        {sent ? <p className="mt-4 text-sm font-black text-[#e9cf9b]">感謝訂閱，之後的醫療故事會寄到 {email.trim()}。</p> : null}
      </div>
    </SectionShell>
  )
}

function BiomedFooter() {
  return (
    <footer id="company" className="biomed-section mx-auto max-w-7xl px-4 pb-10 pt-14 md:px-8">
      <div className="rounded-[2rem] border border-white/70 bg-white/50 p-6 shadow-[0_18px_55px_rgba(50,68,58,0.08)] backdrop-blur-2xl md:p-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="font-serif text-2xl font-black tracking-[-0.03em] text-[#243a32]">LightCare BioMed</p>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-[#65776e]">
              以醫療故事、健康內容與公益活動，建立可信任的醫療內容品牌。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Facebook", "Instagram", "YouTube"].map((item) => (
              <span key={item} className="rounded-full border border-white/70 bg-white/58 px-4 py-2 text-xs font-black text-[#61766c]">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/70 pt-5 text-xs font-black tracking-[0.12em] text-[#87988f] md:flex-row md:items-center md:justify-between">
          <span>© 2026 LightCare BioMed. Privacy Policy.</span>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="text-[#61766c]">返回作品集</Link>
            <span>Demo by Qingyu Web Studio</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function BiomedBrandSite() {
  const [activeId, setActiveId] = useState("top")

  useEffect(() => {
    const title = "醫療人文誌｜屬於醫療人員的故事"
    const description = "記錄醫療人員的專業、溫度與健康知識，打造可信任的醫療內容品牌。"

    document.title = title
    setMetaTag("description", description)
    setPropertyMeta("og:title", title)
    setPropertyMeta("og:description", description)
    setPropertyMeta("og:type", "website")
  }, [])

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveId(visible.target.id)
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.16, 0.32, 0.56],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden text-[#243a32]">
      <style>{`
        html { scroll-behavior: smooth; }
        .biomed-section { scroll-margin-top: 96px; }
      `}</style>
      <SoftBackground />
      <BiomedHeader activeId={activeId} />
      <BiomedHero />
      <BiomedAbout />
      <BiomedFeatures />
      <BiomedStories />
      <BiomedEvents />
      <BiomedSubscribe />
      <BiomedFooter />
    </main>
  )
}

export default BiomedBrandSite
