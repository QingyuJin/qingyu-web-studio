import { Link } from "react-router-dom"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const platformUrl = String(import.meta.env.VITE_FLOWORDER_APP_URL ?? "").replace(/\/$/, "")

const roles = [
  ["customer", "我是客戶", "傳送訂單訊息並追蹤自己的訂單"],
  ["sales", "我是業務", "確認訊息、核對商品並建立正式訂單"],
  ["admin", "我是老闆", "查看待辦、庫存與完整稽核紀錄"],
]

function ExperienceLink({ role, children, className = "" }) {
  if (!platformUrl) {
    return <span className={`cursor-not-allowed opacity-55 ${className}`} title="尚未設定 FlowOrder 平台網址">{children}</span>
  }
  return <a className={className} href={`${platformUrl}/works/floworder/app/${role}`}>{children}</a>
}

function FlowOrderWorkPage() {
  return (
    <SiteLayout>
      <Seo page={{
        path: "/works/floworder",
        title: "FlowOrder 智慧訂單中心｜晴宇 Qingyu Web",
        description: "把 LINE 與文字訊息訂單轉成可確認、可追蹤、可稽核的訂單與庫存流程。",
        image: "/floworder-og.png",
        imageWidth: 1731,
        imageHeight: 909,
        imageAlt: "FlowOrder 訊息轉訂單與庫存流程",
        themeColor: "#173f37",
        structuredData: {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "FlowOrder 智慧訂單中心",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: "企業訊息訂單、客戶價格、庫存交易與訂單稽核管理系統",
          url: "https://www.qingyuweb.com/works/floworder",
        },
      }} />
      <section className="border-b border-[#d9ddd6] bg-[#f4f1e9]">
        <div className="mx-auto grid min-h-[72vh] max-w-7xl content-center gap-12 px-5 py-16 sm:px-7 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:px-9">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#557b72]">FlowOrder 智慧訂單中心</p>
            <h1 className="mt-5 max-w-4xl font-['Noto_Serif_TC',serif] text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.98] tracking-[-.065em] text-[#10211f]">LINE 訂單，<br />不再人工抄寫</h1>
            <p className="mt-7 max-w-xl text-base font-medium leading-8 text-[#65716d]">客戶照原本方式下單。系統幫你整理、確認、建單、追蹤。</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ExperienceLink role="customer" className="inline-flex min-h-12 items-center rounded-full bg-[#173f37] px-6 text-sm font-semibold text-white">直接操作</ExperienceLink>
              <a className="text-sm font-semibold text-[#274942] underline-offset-4 hover:underline" href="#capabilities">先了解怎麼運作</a>
            </div>
            {!platformUrl ? <p className="mt-4 text-xs font-semibold text-[#9a5d23]">正式體驗網址尚未設定；部署平台 Preview 後即會開放。</p> : null}
          </div>
          <div className="rounded-[2rem] border border-[#d5dbd5] bg-[#fbfaf6] p-6 shadow-[0_24px_70px_rgba(20,37,34,.08)]">
            <div className="flex items-center justify-between border-b border-[#e2e5e0] pb-5"><div><p className="text-xs font-semibold text-[#758078]">今天</p><p className="mt-1 text-2xl font-semibold tracking-[-.04em]">3 件事待處理</p></div><span className="rounded-full bg-[#e5f0ec] px-3 py-1.5 text-xs font-semibold text-[#286458]">資料庫同步</span></div>
            {["新營佳味餐飲｜牛五花 15 箱、雞腿排 8 箱","府城日光飯店｜澳洲牛腱 6 箱","安平海味食堂｜商品與日期待核對"].map((item, index) => <div className="border-b border-[#e8eae6] py-5 last:border-0" key={item}><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold leading-6">{item}</p><span className="shrink-0 text-[10px] font-semibold text-[#557b72]">{index === 0 ? "未讀" : "待確認"}</span></div></div>)}
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9ddd6] bg-[#fbfaf6]" id="capabilities">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 md:py-20 lg:px-9">
          <p className="text-[10px] font-semibold tracking-[.16em] text-[#557b72]">三種工作視角</p>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,3.2rem)] font-semibold tracking-[-.05em]">同一筆訂單，從客戶一路走到庫存</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {roles.map(([role, title, description], index) => <ExperienceLink key={role} role={role} className="group rounded-2xl border border-[#d9ddd6] bg-white p-6 transition hover:border-[#7c9a91]"><span className="text-[10px] font-semibold text-[#84908a]">0{index + 1}</span><h3 className="mt-8 text-xl font-semibold">{title}</h3><p className="mt-2 min-h-12 text-sm font-medium leading-6 text-[#65716d]">{description}</p><span className="mt-5 block text-xs font-semibold text-[#286458]">進入體驗 →</span></ExperienceLink>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-7 md:py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-9">
          <div><p className="text-[10px] font-semibold tracking-[.16em] text-[#557b72]">正式營運規格</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.045em]">不是展示資料，<br />每一步都有依據</h2></div>
          <div className="divide-y divide-[#d9ddd6] border-y border-[#d9ddd6]">
            {[
              ["訊息持久化", "送出後寫入資料庫，重新整理與重新登入仍然存在。"],
              ["人工確認 AI", "AI 只產生結構化建議；低信心或商品不明時必須人工處理。"],
              ["交易式庫存", "確認、修改與取消訂單都產生庫存交易，並用資料庫鎖避免超賣。"],
              ["租戶與角色隔離", "客戶、業務、管理員由後端再次驗證，不只是在前端隱藏功能。"],
              ["完整稽核", "訊息、解析、人工修改、確認與庫存異動都有時間與操作者。"],
            ].map(([title, description]) => <div className="grid gap-2 py-6 sm:grid-cols-[10rem_1fr]" key={title}><h3 className="text-sm font-semibold">{title}</h3><p className="text-sm font-medium leading-7 text-[#65716d]">{description}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#10211f] text-white"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-5 py-14 sm:px-7 md:flex-row md:items-center lg:px-9"><div><h2 className="text-3xl font-semibold tracking-[-.045em]">想把自己的接單流程接進來？</h2><p className="mt-3 text-sm font-medium text-white/58">建立商品、客戶、價格、帳號與第三方憑證後即可開始營運。</p></div><Link className="inline-flex min-h-12 items-center rounded-full bg-[#d7c89f] px-6 text-sm font-semibold text-[#14211f]" to="/contact?type=business-system&product=floworder">討論導入</Link></div></section>
    </SiteLayout>
  )
}

export default FlowOrderWorkPage
