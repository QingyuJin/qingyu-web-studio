import { Link, NavLink } from "react-router-dom"
import { contact } from "./content"

const navItems = [
  ["首頁", "/"],
  ["成品", "/works"],
  ["服務", "/services"],
  ["價格", "/pricing"],
  ["BuildFlow", "/buildflow"],
  ["聯絡", "/contact"],
]

function NavItem({ label, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `rounded-full px-3 py-2 transition ${isActive ? "bg-white text-[#0d6b62] shadow-sm" : "text-[#5a6461] hover:bg-white/70 hover:text-[#0d6b62]"}`
      }
    >
      {label}
    </NavLink>
  )
}

function SiteLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#111c22]">
      <header className="sticky top-0 z-40 border-b border-[#ede5d9] bg-[#fbfaf7]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16">
          <Link to="/" className="shrink-0 text-sm font-black tracking-[-0.01em] md:text-base">
            Qingyu Web Studio
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-[#eee6da] bg-[#f7f2ea]/80 p-1 text-xs font-black lg:flex">
            {navItems.map(([label, path]) => (
              <NavItem key={path} label={label} path={path} />
            ))}
          </nav>
          <Link
            to="/contact"
            className="inline-flex min-h-9 items-center justify-center rounded-full bg-[#111c22] px-3 text-xs font-black text-white shadow-sm hover:bg-[#26343b] md:px-4 md:text-sm"
          >
            我想做類似的
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#ece4d8] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-black">Qingyu Web Studio</p>
            <p className="mt-2 max-w-xl text-sm font-bold leading-7 text-[#5a6461]">
              看成品，選一個像你要的網站或系統。
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
