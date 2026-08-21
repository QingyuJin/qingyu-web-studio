import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const plans = [
  [
    "企業 Web 系統",
    "35,000 元起",
    "依流程評估",
    "訂單 客戶 案件與權限管理",
    "/works/wholesale-ordering",
  ],
  ["企業品牌網站", "25,000 元起", "約 2 至 4 週", "正式品牌入口與詢價動線", "/showcase"],
  ["Landing Page", "12,000 元起", "約 1 至 2 週", "聚焦單一服務或活動轉換", "/showcase"],
  ["技術開發協作", "需求估價", "依需求估時", "前後端 LINE API 與 AI 功能", "/works"],
]

export default function PricingPage() {
  return (
    <SiteLayout>
      <Seo
        page={{
          path: "/pricing",
          title: "網站與系統價格｜晴宇 Qingyu Web",
          description: "企業系統 品牌網站 Landing Page 與開發協作參考起價",
        }}
      />
      <header className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-7 md:py-24">
          <p className="text-[10px] font-semibold tracking-[.18em] text-[#557b72]">Pricing</p>
          <h1 className="mt-5 font-['Noto_Serif_TC',serif] text-[clamp(2.3rem,5vw,4rem)] font-semibold tracking-[-.05em] text-[#10211f]">
            清楚的合作起點
          </h1>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-[#65716d]">
            先確認商業目標與必要流程 再依範圍與整合深度報價
          </p>
        </div>
      </header>
      <main className="bg-[#f7f5f0]">
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {plans.map(([name, price, time, fit, path]) => (
              <article
                key={name}
                className="flex flex-col border border-[#d9ddd6] bg-[#fbfaf6] p-6 sm:p-7"
              >
                <p className="text-xs font-semibold text-[#6c7974]">{time}</p>
                <h2 className="mt-4 font-['Noto_Serif_TC',serif] text-2xl font-semibold tracking-[-.035em] text-[#12211f]">
                  {name}
                </h2>
                <p className="mt-3 text-sm font-medium leading-7 text-[#65716d]">{fit}</p>
                <p className="mt-7 text-xl font-semibold text-[#286258]">{price}</p>
                <div className="mt-auto flex flex-wrap gap-4 pt-7 text-xs font-semibold">
                  <Link to={path} className="text-[#173b35]">
                    查看案例 →
                  </Link>
                  <Link to={`/contact?case=${encodeURIComponent(name)}`} className="text-[#7e8985]">
                    詢問報價
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 border-t border-[#d9ddd6] pt-7 text-sm font-medium leading-7 text-[#596762]">
            {[
              "正式範圍與付款方式會在報價或合約確認",
              "網域 主機 付費服務與第三方串接另計",
              "驗收範圍內提供錯誤修正",
              "新增功能與後續維護另外安排",
            ].map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#173c37] px-6 text-sm font-bold text-white"
          >
            說明需求
          </Link>
        </section>
      </main>
    </SiteLayout>
  )
}
