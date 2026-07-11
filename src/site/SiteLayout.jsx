import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { contact } from "./content"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

const navItems = [
  ["首頁", "/"],
  ["服務方案", "/services"],
  ["作品案例", "/works"],
  ["價格", "/pricing"],
  ["合作流程", "/services"],
  ["聯絡", "/contact"],
]

function NavItem({ label, path, onClick, className = "" }) {
  if (isExternalUrl(path)) {
    return (
      <a href={path} target="_blank" rel="noreferrer" onClick={onClick} className={`text-[#0d6b62] hover:text-[#0a514b] ${className}`}>
        {label}
      </a>
    )
  }

  return (
    <NavLink
      key={path}
      to={path}
      onClick={onClick}
      className={({ isActive }) => `${isActive ? "text-[#0d6b62]" : "hover:text-[#0d6b62]"} ${className}`}
    >
      {label}
    </NavLink>
  )
}

function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#111c22]">
      <header className="sticky top-0 z-40 border-b border-[#e6e0d5] bg-[#faf8f3]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16">
          <Link to="/" className="min-w-0 truncate text-sm font-black md:text-base">
            Qingyu Web Studio
          </Link>
          <nav className="hidden items-center gap-4 text-xs font-bold text-[#5a6461] lg:flex lg:gap-5 lg:text-sm">
            {navItems.map(([label, path]) => (
              <NavItem key={path} label={label} path={path} />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#111c22] px-3 text-xs font-black text-white hover:bg-[#26343b] md:px-4 md:text-sm"
            >
              聯絡
            </Link>
            <button
              type="button"
              aria-label="切換選單"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#e6e0d5] bg-white text-[#111c22] lg:hidden"
            >
              <span className="grid gap-1.5">
                <span className={`block h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "translate-y-1 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="border-t border-[#e6e0d5] bg-[#faf8f3] px-4 py-3 lg:hidden">
            <div className="mx-auto grid max-w-6xl gap-1 text-sm font-black text-[#40514f]">
              {navItems.map(([label, path]) => (
                <NavItem
                  key={path}
                  label={label}
                  path={path}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 hover:bg-white"
                />
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-[#e6e0d5] bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="text-lg font-black">Qingyu Web Studio</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-7 text-[#5a6461]">
              漂亮網站，串接 LINE、AI、表單與後台。
            </p>
            <a href={`mailto:${contact.email}`} className="mt-3 inline-block text-sm font-black text-[#0d6b62]">
              {contact.email}
            </a>
          </div>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-bold text-[#5a6461] md:text-right">
            {navItems
              .filter(([, path]) => path !== "/")
              .map(([label, path]) => (
                <Link key={path} to={path} className="hover:text-[#0d6b62]">
                  {label}
                </Link>
              ))}
          </nav>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
