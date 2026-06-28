import { Link, NavLink } from "react-router-dom"
import { contact } from "./content"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

const navItems = [
  ["首頁", "/"],
  ["服務", "/services"],
  ["價格", "/pricing"],
  ["案例", "/works"],
  ["BuildFlow", "/buildflow"],
  ["聯絡", "/contact"],
]

function NavItem({ label, path }) {
  if (isExternalUrl(path)) {
    return (
      <a href={path} target="_blank" rel="noreferrer" className="text-[#0d6b62] hover:text-[#0a514b]">
        {label}
      </a>
    )
  }

  return (
    <NavLink key={path} to={path} className={({ isActive }) => (isActive ? "text-[#0d6b62]" : "hover:text-[#0d6b62]")}>
      {label}
    </NavLink>
  )
}

function SiteLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#111c22]">
      <header className="sticky top-0 z-40 border-b border-[#e6e0d5] bg-[#faf8f3]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16">
          <Link to="/" className="shrink-0 text-sm font-black md:text-base">
            Qingyu Web Studio
          </Link>
          <nav className="hidden items-center gap-4 text-xs font-bold text-[#5a6461] lg:flex lg:gap-5 lg:text-sm">
            {navItems.map(([label, path]) => (
              <NavItem key={path} label={label} path={path} />
            ))}
          </nav>
          <Link
            to="/contact"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#111c22] px-3 text-xs font-black text-white hover:bg-[#26343b] md:px-4 md:text-sm"
          >
            聯絡
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#e6e0d5] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-black">Qingyu Web Studio</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-7 text-[#5a6461]">
              漂亮網站，也能把 LINE、AI、表單與後台流程接起來。
            </p>
          </div>
          <a href={`mailto:${contact.email}`} className="text-sm font-black text-[#0d6b62]">
            {contact.email}
          </a>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
