import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

const roles = [
  ["customer", "我是顧客", "選服務，選時間，完成預約。"],
  ["staff", "我是員工", "看行程，報到，完成服務。"],
  ["manager", "我是店長", "預約、顧客與營運都在這裡。"],
]
const capabilities = [
  ["不撞時段", "班表、服務時間、設備一起計算。"],
  ["顧客記得住", "預約、消費、套票都留著。"],
  ["團隊看得懂", "每個人只看到需要的資訊。"],
  ["老闆掌握營運", "不用每天整理 Excel。"],
]
const description = "客人自己約，員工看行程，店家掌握全店。BookCRM 串起預約、會員、套票與營運。"

export default function BookCrmWorkPage() {
  return <SiteLayout>
    <Seo page={{path:"/works/bookcrm",title:"預約會員管理系統｜BookCRM｜晴宇 Qingyu Web",description,image:"/bookcrm-og.png",imageWidth:1200,imageHeight:630,imageAlt:"BookCRM 預約、會員、營運，一套就好。",themeColor:"#233c34",preserveText:true,
      structuredData:{"@context":"https://schema.org","@type":"SoftwareApplication",name:"BookCRM",applicationCategory:"BusinessApplication",operatingSystem:"Web",description,url:"https://www.qingyuweb.com/works/bookcrm"}}}/>
    <main data-preserve-text className="bg-[#f5f2eb] text-[#17201d]">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-7 md:py-24 lg:grid-cols-[1.15fr_.85fr] lg:px-9">
        <div><p className="text-[10px] font-semibold tracking-[.2em] text-[#687d72]">BookCRM</p>
          <h1 className="mt-6 font-['Noto_Serif_TC',serif] text-[clamp(2.8rem,6.6vw,6rem)] font-semibold leading-[1.1] tracking-[-.06em]">預約、會員、營運<br/>一套就好。</h1>
          <p className="mt-7 text-sm font-medium leading-8 text-[#66716c]">客人自己約。員工看行程。店家掌握全店。</p>
          <div className="mt-8 flex flex-wrap items-center gap-5"><a className="inline-flex min-h-12 items-center rounded-full bg-[#233c34] px-6 text-sm font-semibold text-white" href="/works/bookcrm/app/customer">直接體驗</a><a className="text-sm font-semibold text-[#41534c]" href="#bookcrm-roles">選擇視角</a></div>
        </div>
        <div className="overflow-hidden rounded-[1.5rem] border border-[#d4d9d2] bg-[#fbfaf6]"><img src="/bookcrm-og.png" alt="BookCRM 品牌視覺" width="1200" height="630" fetchPriority="high" className="block w-full"/><p className="border-t border-[#d4d9d2] px-6 py-5 text-xs leading-6 text-[#68736e]">沐里肌膚管理 MORI Skin Studio<br/>你的獨立體驗工作室。</p></div>
      </section>
      <section className="border-y border-[#d7dbd4] bg-[#fbfaf6]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-9">
        <p className="text-xs text-[#687d72]">一次預約</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">後面全部接起來。</h2>
        <ol className="mt-9 grid gap-px overflow-hidden rounded-xl border border-[#d7dbd4] bg-[#d7dbd4] sm:grid-cols-5">{["預約","報到","完成","會員紀錄","回訪"].map((step,index)=><li className="flex items-center gap-5 bg-[#fbfaf6] p-5 sm:block" key={step}><span className="text-xs text-[#89928d]">0{index+1}</span><p className="font-semibold sm:mt-6">{step}</p></li>)}</ol>
      </div></section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-9" id="bookcrm-roles">
        <h2 className="text-3xl font-semibold tracking-[-.04em]">你今天要做什麼？</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-3">{roles.map(([role,title,copy])=><a key={role} href={`/works/bookcrm/app/${role}`} className="rounded-xl border border-[#d4d9d2] bg-[#fbfaf6] p-6 transition hover:border-[#81968c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#233c34]"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#68736e]">{copy}</p><span className="mt-8 block text-xs font-semibold text-[#3d5c50]">進入 →</span></a>)}</div>
        <p className="mt-5 text-xs leading-6 text-[#7a847e]">三種視角使用同一個獨立工作區。體驗資料會定時清除，不會扣款或對外傳訊。</p>
      </section>
      <section className="bg-[#1b2d27] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-7 lg:px-9">
        <h2 className="text-3xl font-semibold tracking-[-.04em]">真正在運作</h2><div className="mt-8 grid gap-x-10 md:grid-cols-2">{capabilities.map(([title,copy])=><article className="border-b border-white/15 py-7" key={title}><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/65">{copy}</p></article>)}</div>
        <details className="mt-8 border-y border-white/15 py-4"><summary className="cursor-pointer text-sm font-semibold">了解系統架構</summary><p className="py-5 text-sm leading-8 text-white/65">PostgreSQL・身分驗證・角色權限・排程引擎・付款介面・LINE API・通知佇列・稽核紀錄・營運統計</p><p className="text-xs leading-6 text-white/65">核心操作持久化。LINE、Email 與線上訂金在未連接時，會明確標示。</p></details>
      </div></section>
    </main>
  </SiteLayout>
}
