import { contactInfo } from "../data/siteData"

export function Footer() {
  return (
    <footer className="border-t border-[#e5d6be] px-4 py-10 text-center">
      <p className="font-kai text-lg font-bold tracking-[0.22em] text-[#5c4d3c]">瓦刀執手砌日月，匠心巧思鑄千秋</p>
      <p className="mt-3 text-xs font-black tracking-[0.12em] text-[#8f7d68]">
        © 2026 鑫匠工程. 屏東泥作、水泥、磁磚、油漆裝修工程.
      </p>
      <a href={`tel:${contactInfo.phone}`} className="mt-2 inline-block text-sm font-black text-[#a05c2e]">
        {contactInfo.phoneDisplay}
      </a>
      <p className="mt-5">
        <a href="/works" className="text-[11px] font-semibold tracking-[0.08em] text-[#8f7d68] hover:text-[#5c4d3c]">
          網站設計與系統｜晴宇 Qingyu Web
        </a>
      </p>
    </footer>
  )
}
