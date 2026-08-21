import ContactLeadSection from "../components/ContactLeadSection"
import Seo from "./Seo"
import SiteLayout from "./SiteLayout"

export default function ContactPage() {
  return <SiteLayout><Seo page={{ path: "/contact", title: "聯絡晴宇｜網站與企業系統需求", description: "說明目前的問題 取得適合的網站或系統做法" }} /><header className="border-b border-[#d9ddd6] bg-[#f4f1e9]"><div className="mx-auto max-w-6xl px-5 py-14 sm:px-7 md:py-20"><p className="text-[10px] font-semibold tracking-[.18em] text-[#557b72]">Contact</p><h1 className="mt-5 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,6vw,4.2rem)] font-semibold leading-[1.08] tracking-[-.05em] text-[#10211f]">先說明問題<br />再決定怎麼做</h1></div></header><ContactLeadSection /></SiteLayout>
}
