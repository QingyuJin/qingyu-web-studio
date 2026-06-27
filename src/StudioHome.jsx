import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { seo } from "./site/content"

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

const artifactTiles = [
  {
    title: "BuildFlow",
    subtitle: "工程行接案與派工管理系統",
    to: "/buildflow",
    action: "打開系統",
    items: ["案件", "報價", "派工", "LINE 查詢"],
    featured: true,
  },
  {
    title: "工程行網站案例",
    subtitle: "工程服務網站與估價入口",
    to: "/contractor-site",
    action: "看網站",
    items: ["服務頁", "案例", "估價表單"],
  },
  {
    title: "LINE Bot / 自動回覆",
    subtitle: "店家訊息接待與後台同步 Demo",
    to: "/tools/linebot-mission#demo",
    action: "看 Demo",
    items: ["LINE 對話", "自動回覆", "後台"],
  },
  {
    title: "網站救援 Demo",
    subtitle: "直接看網站改善前後的互動展示",
    to: "/tools/website-rescue#demo",
    action: "看 Demo",
    items: ["CTA", "SEO", "手機版"],
  },
  {
    title: "AI 技術任務",
    subtitle: "文件問答、模型分類、店家 AI 助手",
    to: "https://ai-tech-quest.vercel.app",
    action: "去玩",
    items: ["RAG", "ML", "AI 助手"],
  },
  {
    title: "找我做",
    subtitle: "有想做的網站、LINE Bot 或小系統，直接留言",
    to: "/contact",
    action: "聯絡我",
    items: ["需求", "預算", "上線時間"],
  },
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <section className="border-b border-[#e6e0d5] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0d6b62]">Qingyu Web Studio</p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2rem,8vw,3.75rem)] font-black leading-[1.06] tracking-tight">
              直接看成品
            </h1>
            <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
              不用先看一堆說明。按一個方塊，直接看網站、系統、LINE Bot 或 AI Demo。
            </p>
          </div>
        </div>
      </section>

      <ArtifactEntryGrid />
    </SiteLayout>
  )
}

function ArtifactEntryGrid() {
  return (
    <section className="bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {artifactTiles.map((tile) => (
            <SmartLink
              key={tile.title}
              to={tile.to}
              className={`group flex min-h-64 flex-col justify-between rounded-xl border p-5 transition hover:-translate-y-0.5 hover:shadow-xl ${
                tile.featured
                  ? "border-[#0d6b62] bg-[#111c22] text-white shadow-lg shadow-[#111c22]/10"
                  : "border-[#e3ded3] bg-white text-[#111c22]"
              }`}
            >
              <div>
                <div className="mb-5 flex flex-wrap gap-2">
                  {tile.items.map((item) => (
                    <span
                      key={item}
                      className={`rounded-md px-2.5 py-1 text-xs font-black ${
                        tile.featured ? "bg-white/10 text-[#8fd6cc]" : "bg-[#eef7f4] text-[#0d6b62]"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-black tracking-tight">{tile.title}</h2>
                <p className={`mt-3 text-sm font-bold leading-7 ${tile.featured ? "text-white/72" : "text-[#52605c]"}`}>
                  {tile.subtitle}
                </p>
              </div>
              <span
                className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-black ${
                  tile.featured ? "bg-white text-[#111c22]" : "bg-[#111c22] text-white"
                }`}
              >
                {tile.action}
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StudioHome
