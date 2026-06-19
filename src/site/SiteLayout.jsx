import { Link, NavLink } from "react-router-dom"
import { contactInfo } from "./siteContent"

const navItems = [
  ["作品", "/works"],
  ["服務", "/services"],
  ["價格", "/pricing"],
  ["健檢", "/free-audit"],
  ["文章", "/blog"],
  ["聯絡", "/contact"],
]

function SiteLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#172026]">
      <header className="sticky top-0 z-40 border-b border-[#dedbd1] bg-[#f8f7f2]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:py-4">
          <Link to="/" className="shrink-0 text-sm font-black tracking-tight md:text-base">
            Qingyu Web Studio
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-black text-[#5d6863] md:flex">
            {navItems.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => (isActive ? "text-[#0f766e]" : "hover:text-[#0f766e]")}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/free-audit"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#172026] px-3 text-xs font-black text-white hover:bg-[#27404a] md:min-h-10 md:px-4 md:text-sm"
          >
            免費健檢
          </Link>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 text-xs font-black text-[#5d6863] md:hidden">
          {navItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `shrink-0 rounded-full border px-3 py-1.5 ${
                  isActive ? "border-[#0f766e] bg-[#eef7f4] text-[#0f766e]" : "border-[#dedbd1] bg-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {children}

      <footer className="border-t border-[#dedbd1] bg-[#172026] text-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xl font-black">Qingyu Web Studio</p>
            <p className="mt-3 max-w-xl text-sm font-bold leading-7 text-white/70">
              小型網站、作品集、工程行接案網站、表單與 LINE 串接，從乾淨手機版開始，之後再擴充成後台或小系統。
            </p>
          </div>
          <div className="grid gap-2 text-sm font-bold text-white/75 md:text-right">
            <a href={`mailto:${contactInfo.email}`} className="hover:text-[#f0c36a]">
              {contactInfo.email}
            </a>
            <a href={contactInfo.github} className="hover:text-[#f0c36a]">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
