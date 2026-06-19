import { Link, NavLink } from "react-router-dom"
import { contact } from "./siteData"

const navItems = [
  ["作品", "/works"],
  ["服務", "/services"],
  ["價格", "/pricing"],
  ["健檢", "/free-audit"],
  ["聯絡", "/contact"],
]

function SiteLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#172026]">
      <header className="sticky top-0 z-40 border-b border-[#e5e1d7] bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16">
          <Link to="/" className="shrink-0 text-sm font-black tracking-tight md:text-base">
            Qingyu Web Studio
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-bold text-[#5d6863] md:flex">
            {navItems.map(([label, path]) => (
              <NavLink key={path} to={path} className={({ isActive }) => (isActive ? "text-[#0f766e]" : "hover:text-[#0f766e]")}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/free-audit"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#172026] px-3 text-xs font-black text-white hover:bg-[#26343b] md:px-4 md:text-sm"
          >
            免費健檢
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#e5e1d7] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-black">Qingyu Web Studio</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-7 text-[#5d6863]">
              台灣小型網站製作工作室。作品集、一頁式網站、形象網站、RWD、表單與 LINE 連結整合。
            </p>
          </div>
          <a href={`mailto:${contact.email}`} className="text-sm font-black text-[#0f766e]">
            {contact.email}
          </a>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
