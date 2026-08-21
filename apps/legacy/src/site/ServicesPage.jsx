import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const services = [
  {
    title: "企業 Web 系統",
    text: "把訂單 客戶 案件與權限集中管理",
    points: ["核心工作流程", "前後台介面", "資料管理", "部署測試"],
  },
  {
    title: "企業品牌網站",
    text: "整理品牌 服務與詢價動線 讓客戶快速理解你",
    points: ["品牌與內容架構", "RWD", "基礎 SEO", "詢價與追蹤"],
    note: "單一服務或活動頁 12,000 元起",
  },
  {
    title: "技術開發協作",
    text: "支援既有團隊完成前後端 LINE API 與 AI 功能",
    points: ["技術評估", "前後端開發", "API 串接", "測試與交付"],
  },
]

const process = [
  ["確認問題", "先找出最影響營運的一條流程"],
  ["確認範圍與報價", "把必要功能 時程與費用寫清楚"],
  ["製作 測試與驗收", "依確認範圍完成並共同檢查"],
  ["上線與後續維護", "正式部署後再安排需要的支援"],
]

export default function ServicesPage() {
  return (
    <SiteLayout>
      <Seo
        page={{
          path: "/services",
          title: "網站與企業系統服務｜晴宇 Qingyu Web",
          description: "企業 Web 系統 品牌網站與技術開發協作",
        }}
      />
      <section className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-7 md:py-24">
          <p className="text-[10px] font-semibold tracking-[.18em] text-[#557b72]">Services</p>
          <h1 className="mt-5 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2.3rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-.05em] text-[#10211f]">
            先找出最需要改善的一條流程
          </h1>
          <p className="mt-6 max-w-xl text-sm font-medium leading-7 text-[#65716d]">
            先確認問題 再決定需要網站 管理後台或系統串接
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/works"
              className="inline-flex min-h-11 items-center rounded-full bg-[#173c37] px-5 text-xs font-bold text-white"
            >
              查看案例
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center rounded-full border border-[#bcc6c0] bg-white/50 px-5 text-xs font-bold text-[#29433e]"
            >
              說明需求
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20">
          <div className="grid gap-4 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="border border-[#d9ddd6] bg-[#fbfaf6] p-6 sm:p-7"
              >
                <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-semibold tracking-[-.035em] text-[#12211f]">
                  {service.title}
                </h2>
                <p className="mt-4 min-h-14 text-sm font-medium leading-7 text-[#65716d]">
                  {service.text}
                </p>
                <ul className="mt-6 grid gap-3 border-t border-[#e0e3de] pt-5 text-sm font-semibold text-[#344540]">
                  {service.points.map((point) => (
                    <li key={point}>✓ {point}</li>
                  ))}
                </ul>
                {service.note ? (
                  <p className="mt-5 text-xs font-semibold text-[#8b7040]">{service.note}</p>
                ) : null}
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["AI", "RAG", "LINE", "API", "SEO", "Analytics"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#cfd6d0] px-3 py-2 text-[10px] font-semibold text-[#60706b]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9ddd6] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20">
          <p className="text-[10px] font-semibold tracking-[.18em] text-[#557b72]">Process</p>
          <h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-.04em] text-[#12211f]">
            四步完成合作
          </h2>
          <div className="mt-8 grid gap-px overflow-hidden border border-[#d9ddd6] bg-[#d9ddd6] md:grid-cols-4">
            {process.map(([title, text], index) => (
              <article key={title} className="bg-[#fbfaf6] p-5">
                <span className="text-[10px] font-semibold text-[#668078]">0{index + 1}</span>
                <h3 className="mt-5 text-base font-semibold text-[#12211f]">{title}</h3>
                <p className="mt-3 text-xs font-medium leading-6 text-[#6e7975]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0]">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20">
          <p className="text-[10px] font-semibold tracking-[.18em] text-[#557b72]">Delivery</p>
          <h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-.04em] text-[#12211f]">
            交付與維護
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "功能與修改範圍先確認",
              "正式帳號原則上由客戶持有",
              "驗收範圍內處理錯誤",
              "新增功能與維護另外估價",
            ].map((item) => (
              <li
                key={item}
                className="border-b border-[#d9ddd6] py-4 text-sm font-semibold text-[#344540]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0d1917] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-7 px-5 py-16 sm:px-7 md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="font-['Noto_Serif_TC',serif] text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-.04em]">
            先說明目前最困擾的問題
          </h2>
          <Link
            to="/contact"
            className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-[#d7c89f] px-6 text-sm font-bold text-[#14211f]"
          >
            填寫需求
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}
