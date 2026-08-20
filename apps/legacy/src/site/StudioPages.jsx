import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const studioCopy = "晴宇 Qingyu Web 為個人開發工作室，由晴宇負責需求整理、介面設計、前後端開發與部署。依專案需求，可與設計、內容或行銷夥伴共同協作。"

function PageHero({ eyebrow, title, text, children }) {
  return (
    <section className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 md:py-20 lg:px-9">
        <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-[#557b72]">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(2rem,5vw,4.15rem)] font-semibold leading-[1.08] tracking-[-.05em] text-[#10211f]">{title}</h1>
        <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#65716d] sm:text-base sm:leading-8">{text}</p>
        {children}
      </div>
    </section>
  )
}

export function AboutPage() {
  const details = [
    ["合作範圍", "企業系統 品牌網站 單頁網站與技術協作"],
    ["專案確認", "功能 時程 費用與交付內容會先以報價或合約確認"],
    ["原始碼與帳號", "依專案約定交付 原則上正式帳號由客戶持有"],
    ["修改與維護", "錯誤修正與新增功能分開 維護可按次或按月安排"],
  ]

  return (
    <SiteLayout>
      <Seo page={{ path: "/about", title: "關於晴宇｜晴宇 Qingyu Web", description: "認識晴宇 Qingyu Web 個人開發工作室的工作方式 合作範圍與交付原則" }} />
      <PageHero eyebrow="About" title="把需求整理清楚 再把產品做完整" text={studioCopy} />
      <section className="bg-[#f7f5f0]">
        <div className="mx-auto grid max-w-7xl gap-px bg-[#d9ddd6] px-5 py-14 sm:px-7 md:grid-cols-2 md:py-20 lg:px-9">
          {details.map(([title, text]) => (
            <article key={title} className="bg-[#fbfaf6] p-6 sm:p-8">
              <h2 className="text-base font-semibold text-[#14211f]">{title}</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#65716d]">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-[#d7c89f]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-9">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-semibold tracking-[-.04em] text-[#14211f]">有一個流程想做得更好</h2>
          <Link to="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#14211f] px-6 text-xs font-bold text-white">聊聊需求</Link>
        </div>
      </section>
    </SiteLayout>
  )
}

export function CollaborationPage() {
  const models = [
    ["代理商與顧問", "由你維持客戶關係與策略 我負責技術評估 開發 測試與交付"],
    ["設計與內容團隊", "依既有設計或內容架構完成前後端與正式上線"],
    ["企業內部團隊", "補足特定功能 API LINE AI 或階段性開發量能"],
  ]

  return (
    <SiteLayout>
      <Seo page={{ path: "/collaboration", title: "技術開發協作｜晴宇 Qingyu Web", description: "提供代理商 顧問 設計團隊與企業內部團隊的前後端開發 API 串接 測試與交付協作" }} />
      <PageHero eyebrow="Collaboration" title="你負責客戶與策略 我負責技術實作與交付" text="適合已經有客戶關係 策略或設計方向 需要穩定技術實作的合作夥伴">
        <Link to="/contact?type=agency" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#14211f] px-6 text-xs font-bold text-white">討論協作</Link>
      </PageHero>
      <section className="bg-[#0b1517] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-7 md:py-20 lg:px-9">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {models.map(([title, text], index) => (
              <article key={title} className="bg-[#101c1c] p-6 sm:p-8">
                <p className="text-[9px] font-semibold tracking-[.16em] text-[#d7c89f]">0{index + 1}</p>
                <h2 className="mt-5 text-lg font-semibold">{title}</h2>
                <p className="mt-4 text-sm font-medium leading-7 text-white/55">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 border-t border-white/10 pt-8 md:grid-cols-2">
            <div><h2 className="text-base font-semibold">合作會先確認</h2><p className="mt-3 text-sm leading-7 text-white/55">範圍 時程 費用 溝通窗口 驗收方式與帳號權限</p></div>
            <div><h2 className="text-base font-semibold">交付保持清楚</h2><p className="mt-3 text-sm leading-7 text-white/55">測試環境 正式部署 操作說明 原始碼與後續維護依約定處理</p></div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
