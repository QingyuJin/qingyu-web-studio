import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { contact, seo } from "./site/content"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function SmartLink({ to, children, ...props }) {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}
const pathCards = [
  {
    title: "我要看 AI 技術任務",
    text: "直接試玩 RAG、ML 與店家 AI 助手任務。",
    to: "/works",
    label: "看 AI 作品入口",
    preview: ["RAG", "ML", "AI 助手"],
  },
  {
    title: "我要做網站",
    text: "看網站整理、版面優化與主站案例。",
    to: "/tools/website-rescue#demo",
    label: "看網站展示",
    preview: ["Website Rescue", "Qingyu Web"],
  },
  {
    title: "我要接 LINE 客戶",
    text: "看 LINE Bot 如何回覆、整理需求與同步後台。",
    to: "/tools/linebot-mission#demo",
    label: "看 LINE Bot",
    preview: ["LINE Chat", "Dashboard"],
  },
  {
    title: "我要管理案件",
    text: "看案件、報價、照片與 LINE 回報流程。",
    to: "/works/buildflow#demo",
    label: "看 BuildFlow",
    preview: ["Case", "Quote", "LINE"],
  },
  {
    title: "我要 AI 或 API 工具",
    text: "看 AI 分析、API 串接與自動化流程。",
    to: "/works/ai-audit#demo",
    label: "看 AI / API",
    preview: ["AI Audit", "API Flow"],
  },
]

const interactiveDemos = [
  {
    slug: "ai-tech-quest",
    title: "AI 技術任務",
    label: "AI Product Quest",
    summary: "用任務形式體驗文件問答、模型分類與店家 AI 助手。",
    livePath: "https://ai-tech-quest.vercel.app",
    techPath: "https://github.com/QingyuJin/ai-tech-quest",
    liveLabel: "線上實測",
    techLabel: "GitHub 原始碼",
    tone: "quest",
  },
  {
    slug: "website-rescue",
    title: "網站救援互動 Demo",
    label: "Website Rescue",
    summary: "點選改善項目，查看網站狀態變化。",
    livePath: "/tools/website-rescue#demo",
    techPath: "/tools/website-rescue#tech",
    liveLabel: "開始體驗",
    tone: "rescue",
  },
  {
    slug: "linebot-mission",
    title: "LINE Bot 接待模擬",
    label: "LINE Bot Reception",
    summary: "模擬 LINE 客戶訊息與後台同步。",
    livePath: "/tools/linebot-mission#demo",
    techPath: "/tools/linebot-mission#tech",
    liveLabel: "開始體驗",
    tone: "line",
  },
]

const serviceCards = [
  ["網站製作", "把服務、作品與聯絡入口整理清楚。"],
  ["LINE Bot", "讓 LINE 詢問變成可追蹤需求。"],
  ["AI 工具", "把分析、產出與報告包成好用介面。"],
  ["小型後台 / API", "把表單、通知與資料流程接起來。"],
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto grid min-h-[calc(76svh-56px)] max-w-6xl gap-8 px-4 py-9 md:min-h-0 md:grid-cols-[1fr_0.78fr] md:items-center md:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-3xl text-[clamp(1.75rem,8vw,2rem)] font-black leading-[1.1] tracking-tight md:text-[clamp(2.65rem,7vw,5rem)] md:leading-[1.08]">
              網站、LINE Bot、AI 工具與小型後台
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-lg md:leading-8">
              <span className="md:hidden">把你的服務整理成漂亮、清楚、可以聯絡的網站。</span>
              <span className="hidden md:inline">把你的服務整理成漂亮、清楚、可以聯絡的線上入口。</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/works" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b] md:hidden">
                查看作品
              </Link>
              <Link to="/#interactive-lab" className="hidden min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b] md:inline-flex">
                查看互動展示
              </Link>
              <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62]">
                聯絡我
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <HeroMockup />
          </div>
        </div>
      </section>

      <PathNavigation />
      <InteractiveLab />
      <CompleteCase />
      <ServiceAbility />
      <ContactCta />
    </SiteLayout>
  )
}

function PathNavigation() {
  return (
    <section className="hidden border-b border-[#e6e0d5] bg-[#faf8f3] md:block">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <SectionHeading eyebrow="Start Here" title="你想看哪一種？" text="先選方向，再進互動 Demo 或完整案例。" />
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {pathCards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group rounded-xl border border-[#e3ded3] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#0d6b62] hover:shadow-lg"
            >
              <div className="mb-4 grid grid-cols-2 gap-2">
                {card.preview.map((item) => (
                  <span key={item} className="rounded-lg bg-[#faf8f3] px-3 py-2 text-[11px] font-black text-[#40504c]">
                    {item}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-black text-[#111c22]">{card.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[#52605c]">{card.text}</p>
              <span className="mt-4 inline-flex text-sm font-black text-[#0d6b62]">{card.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function InteractiveLab() {
  return (
    <section id="interactive-lab" className="scroll-mt-20 border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading
          eyebrow="Interactive Lab"
          title="互動實驗室"
          text="直接操作小型 Demo，看看網站、LINE Bot 與後台流程怎麼動起來。"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {interactiveDemos.map((demo) => (
            <InteractiveDemoCard key={demo.slug} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CompleteCase() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[0.82fr_1.18fr] md:items-center md:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Full Case</p>
          <h2 className="mt-3 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-tight md:text-[clamp(2rem,6vw,3.2rem)]">從網站詢價到後台管理</h2>
          <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-[#52605c]">
            以工程行情境展示案件、報價、照片、施工狀態與 LINE 回報流程。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/works/buildflow#demo" className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white">
              查看 BuildFlow
            </Link>
            <Link to="/works/xinjiang" className="hidden min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] md:inline-flex">
              查看鑫匠案例
            </Link>
          </div>
        </div>
        <BuildFlowCaseMockup />
      </div>
    </section>
  )
}

function ServiceAbility() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SectionHeading eyebrow="Services" title="服務能力" text="從網站到後台流程，先做清楚、再做漂亮、最後做得能被使用。" />
        <div className="grid gap-3 md:grid-cols-4">
          {serviceCards.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#e3ded3] bg-white p-5">
              <div className="mb-4 h-10 w-10 rounded-xl bg-[#eef7f4]" />
              <h3 className="text-lg font-black">{title}</h3>
              <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-[1fr_auto] md:items-end md:py-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Contact</p>
          <h2 className="mt-3 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-tight md:text-[clamp(2rem,6vw,3.2rem)]">想做網站、LINE Bot、AI 工具或小系統？</h2>
          <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-white/70">
            可以先聊聊方向，我會幫你判斷適合哪一種做法。
          </p>
        </div>
        <div className="grid gap-3">
          <Link to="/contact" className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-black text-[#111c22] hover:bg-[#f3efe7]">
            聯絡我
          </Link>
          <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-5 text-sm font-black text-white hover:bg-white/10">
            開始需求診斷
          </Link>
          <a href={`mailto:${contact.email}`} className="text-sm font-black text-white/70 hover:text-white">
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.35rem,6vw,1.5rem)] font-black tracking-tight md:text-[clamp(2rem,6vw,3.2rem)]">{title}</h2>
      {text ? <p className="mt-3 line-clamp-2 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

function InteractiveDemoCard({ demo }) {
  return (
    <article className="group overflow-hidden rounded-[1.65rem] border border-[#ded8cb] bg-white shadow-xl shadow-[#111c22]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#111c22]/10">
      <div className="grid gap-0 md:grid-cols-[1.02fr_0.98fr]">
        <div className="p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{demo.label}</p>
          <h3 className="mt-3 text-xl font-black tracking-tight md:text-3xl">{demo.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm font-bold leading-7 text-[#52605c]">{demo.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <SmartLink to={demo.livePath} className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#111c22] px-5 text-sm font-black text-white hover:bg-[#26343b]">
              {demo.liveLabel}
            </SmartLink>
            <SmartLink to={demo.techPath} className="hidden min-h-11 items-center justify-center rounded-md border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] hover:border-[#0d6b62] hover:text-[#0d6b62] md:inline-flex">
              {demo.techLabel || "技術拆解"}
            </SmartLink>
          </div>
        </div>
        <div className="min-h-48 bg-[#111c22] p-4 text-white md:min-h-80 md:p-5">
          {demo.tone === "quest" ? <AiQuestPreview /> : demo.tone === "rescue" ? <WebsiteRescuePreview /> : <LineMissionPreview />}
        </div>
      </div>
    </article>
  )
}
function AiQuestPreview() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">AI Quest</span>
        <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b171b]">5 missions</span>
      </div>
      <div className="mt-5 grid gap-3">
        {["文件問答調查員", "模型分類挑戰", "店家 AI 助手"].map((item, index) => (
          <div key={item} className="rounded-xl bg-white p-3 text-[#111c22]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-black text-[#0d6b62]">Level {index + 1}</p>
              <span className="h-2 w-16 rounded-full bg-[#dce7e2]">
                <span className="block h-full rounded-full bg-[#0d6b62]" style={{ width: `${58 + index * 14}%` }} />
              </span>
            </div>
            <p className="mt-2 text-sm font-black">{item}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-black text-white/78">
        Vercel 實測版已上線，可從主站直接開啟。
      </div>
    </div>
  )
}
function WebsiteRescuePreview() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd6cc]">Website Status</span>
        <span className="rounded-full bg-[#8fd6cc] px-3 py-1 text-xs font-black text-[#0b171b]">○v○ 82</span>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-4 text-[#111c22]">
        <div className="flex items-center justify-between">
          <div className="h-3 w-2/3 rounded-full bg-[#111c22]" />
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-[11px] font-black text-[#0d6b62]">CTA</span>
        </div>
        <div className="mt-3 h-2 w-1/2 rounded-full bg-[#d8d2c5]" />
        <div className="mt-5 grid gap-2">
          <div className="rounded-xl border border-[#e3ded3] bg-[#faf8f3] p-3">
            <p className="text-xs font-black text-[#0d6b62]">改善項目</p>
            <div className="mt-2 h-2 rounded-full bg-[#dce7e2]">
              <div className="h-full w-[82%] rounded-full bg-[#0d6b62]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-black text-[#40504c]">
            <span className="rounded-lg bg-[#eef7f4] px-3 py-2">LINE 入口</span>
            <span className="rounded-lg bg-[#eef7f4] px-3 py-2">SEO 摘要</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-black text-white/80">
        {["Preview", "Fix", "Report"].map((item) => (
          <span key={item} className="rounded-lg bg-white/10 py-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function LineMissionPreview() {
  return (
    <div className="grid h-full gap-3 sm:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3">
        <div className="rounded-[1.15rem] bg-[#e9f7ef] p-3 text-[#10201c]">
          <div className="mb-3 flex justify-center">
            <span className="rounded-full bg-[#08bf5b] px-3 py-1 text-[11px] font-black text-white">LINE</span>
          </div>
          <div className="grid gap-2 text-[11px] font-black">
            <div className="rounded-2xl bg-white px-3 py-2">想做預約功能</div>
            <div className="ml-auto rounded-2xl bg-[#9bf4b6] px-3 py-2">我先整理需求</div>
            <div className="rounded-2xl bg-white px-3 py-2">需要菜單查詢</div>
          </div>
        </div>
      </div>
      <div className="grid content-between gap-3">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="flex items-center justify-between text-xs font-black">
            <span>自動處理率</span>
            <span className="text-[#8fd6cc]">82%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/15">
            <div className="h-full w-[82%] rounded-full bg-[#8fd6cc]" />
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 text-[#111c22]">
          <p className="text-xs font-black text-[#0d6b62]">後台案件</p>
          <p className="mt-2 text-sm font-black">店家 LINE Bot 需求</p>
          <p className="mt-1 text-xs font-bold text-[#52605c]">狀態：已整理</p>
        </div>
      </div>
    </div>
  )
}

function BuildFlowCaseMockup() {
  return (
    <div className="rounded-[1.75rem] border border-[#d8d2c5] bg-white p-4 shadow-xl shadow-[#111c22]/8">
      <div className="rounded-[1.35rem] bg-[#111c22] p-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black">BuildFlow Dashboard</p>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#111c22]">施工中</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-2">
            {["BF-001 屋頂防水", "BF-002 地坪修繕", "BF-003 外牆補漏"].map((item, index) => (
              <div key={item} className={`rounded-xl px-3 py-3 text-xs font-black ${index === 0 ? "bg-[#8fd6cc] text-[#0b2724]" : "bg-white/10 text-white/78"}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white p-4 text-[#111c22]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black">鑫匠工程案例</p>
              <span className="text-xs font-black text-[#0d6b62]">75%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[#e4e9e6]">
              <div className="h-full w-3/4 rounded-full bg-[#0d6b62]" />
            </div>
            <div className="mt-4 grid gap-2 text-xs font-black text-[#52605c]">
              <span>報價單 Preview</span>
              <span>LINE 回報已同步</span>
              <span>現場照片 3 張</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroMockup() {
  return (
    <div className="rounded-[1.75rem] border border-[#e3ded3] bg-[#faf8f3] p-3 shadow-2xl shadow-[#111c22]/10 md:p-4">
      <div className="overflow-hidden rounded-[1.35rem] border border-[#d8d2c5] bg-white">
        <div className="flex items-center justify-between border-b border-[#eee9df] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffb4a2]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#8fd6cc]" />
          </div>
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0d6b62]">Digital Flow</span>
        </div>
        <div className="grid gap-3 p-4">
          {[
            ["被看到", "網站 / SEO"],
            ["被詢問", "表單 / LINE"],
            ["留下需求", "AI / API"],
            ["後台管理", "Dashboard"],
            ["回覆客戶", "LINE / Email"],
          ].map(([title, text], index) => (
            <div key={title} className={`rounded-2xl p-4 ${index === 3 ? "bg-[#111c22] text-white" : "border border-[#eee9df] bg-[#faf8f3]"}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black">{title}</p>
                <span className={`rounded-full px-3 py-1 text-[11px] font-black ${index === 3 ? "bg-white/10 text-[#8fd6cc]" : "bg-white text-[#0d6b62]"}`}>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudioHome
