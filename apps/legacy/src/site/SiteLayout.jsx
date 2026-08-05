import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { contact } from "./content"

const navItems = [
  ["服務", "/services"],
  ["作品", "/works"],
  ["SEO／廣告", "/seo-ads"],
  ["價格", "/pricing"],
]

function NavItem({ label, path, onClick, className = "" }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => `${isActive ? "text-[#285f57]" : "text-[#52615c] hover:text-[#285f57]"} ${className}`}
    >
      {label}
    </NavLink>
  )
}

function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f7f6f1] text-[#111c22]">
      <header className="sticky top-0 z-50 border-b border-[#dfe4dd] bg-[#f7f6f1]/94 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <Link to="/" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3" aria-label="Qingyu Web Studio 首頁">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#12211e] text-[10px] font-black tracking-[-.08em] text-[#d5f26b] transition group-hover:rotate-6">QY</span>
            <span className="leading-tight"><span className="block text-sm font-black tracking-tight text-[#13211e]">Qingyu Web Studio</span><span className="hidden text-[9px] font-black uppercase tracking-[.18em] text-[#78847f] sm:block">Brand · Web · Growth</span></span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-black lg:flex" aria-label="主要導覽">
            {navItems.map(([label, path]) => <NavItem key={path} label={label} path={path} />)}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" onClick={() => setMenuOpen(false)} data-track="contact" data-placement="header" className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#14231f] px-4 text-xs font-black text-white hover:bg-[#285f57] md:px-5 md:text-sm">
              開始專案
            </Link>
            <button type="button" aria-label="切換選單" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8dfd8] bg-white text-[#14231f] lg:hidden">
              <span className="grid gap-1.5" aria-hidden="true"><span className={`block h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "translate-y-1 rotate-45" : ""}`} /><span className={`block h-0.5 w-4 rounded-full bg-current transition ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} /></span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-navigation" className="border-t border-[#dfe4dd] bg-[#f7f6f1] px-4 py-4 lg:hidden" aria-label="手機導覽">
            <div className="mx-auto grid max-w-7xl gap-1 text-sm font-black">
              {[...navItems, ["聯絡", "/contact"]].map(([label, path]) => <NavItem key={path} label={label} path={path} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-white" />)}
            </div>
          </nav>
        ) : null}
      </header>

      {children}

      <footer className="border-t border-white/10 bg-[#081115] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#d5f26b] text-[10px] font-black text-[#14231f]">QY</span><div><p className="text-lg font-black">Qingyu Web Studio</p><p className="text-[10px] font-black uppercase tracking-[.18em] text-white/36">Brand · Web · Growth</p></div></div>
              <p className="mt-5 max-w-md text-sm font-bold leading-7 text-white/52">品牌網站、電商、SEO、廣告落地頁與 LINE／客製系統，從第一次被看見到有效詢問。</p>
              <div className="mt-5 flex flex-wrap gap-3"><a href={`mailto:${contact.email}`} data-track="contact" data-placement="footer_email" className="text-sm font-black text-[#8ed2c7]">{contact.email}</a><span className="text-white/20">·</span><a href={`https://line.me/R/ti/p/~${contact.lineId}`} target="_blank" rel="noreferrer" data-track="contact" data-placement="footer_line" className="text-sm font-black text-[#d5f26b]">LINE {contact.lineId}</a></div>
            </div>
            <nav aria-label="服務導覽"><p className="text-xs font-black uppercase tracking-[.18em] text-white/35">Services</p><div className="mt-4 grid gap-3 text-sm font-bold text-white/62"><Link to="/services" className="hover:text-white">網站與電商</Link><Link to="/seo-ads" className="hover:text-white">SEO 與廣告</Link><Link to="/works" className="hover:text-white">LINE／後台／AI</Link><Link to="/free-audit" className="hover:text-white">網站健檢</Link></div></nav>
            <nav aria-label="網站導覽"><p className="text-xs font-black uppercase tracking-[.18em] text-white/35">Explore</p><div className="mt-4 grid gap-3 text-sm font-bold text-white/62"><Link to="/works" className="hover:text-white">作品案例</Link><Link to="/pricing" className="hover:text-white">參考價格</Link><Link to="/tools/project-planner" className="hover:text-white">需求診斷</Link><Link to="/contact" className="hover:text-white">聯絡</Link></div></nav>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[.14em] text-white/30 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Qingyu Web Studio</span><span>Designed and built in Taiwan</span></div>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
