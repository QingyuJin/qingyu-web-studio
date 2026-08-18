import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { localizedBrandName } from "../i18n/translations"
import { contact } from "./content"

const navItems = [
  ["服務", "/services"],
  ["一頁式", "/onepage"],
  ["作品", "/works"],
  ["SEO／廣告", "/seo-ads"],
  ["價格", "/pricing"],
]

function NavItem({ label, path, onClick, className = "" }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => `${isActive ? "text-[#1c5149]" : "text-[#59655f] hover:text-[#1c5149]"} transition-colors ${className}`}
    >
      {label}
    </NavLink>
  )
}

function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { locale } = useLocale()
  const brandName = localizedBrandName(locale)
  const homeLabel = locale === "zh-Hant" ? `${brandName}首頁` : `${brandName} Home`

  return (
    <main className="studio-shell min-h-screen bg-[#f7f5f0] text-[#101b1d]">
      <header className="sticky top-0 z-50 border-b border-[#162321]/10 bg-[#f7f5f0]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-7 lg:px-9">
          <Link to="/" onClick={() => setMenuOpen(false)} className="group flex shrink-0 items-center gap-3" aria-label={homeLabel}>
            <span className="h-px w-6 bg-[#9b8e69] transition-all group-hover:w-9" aria-hidden="true" />
            <span className="leading-none">
              <span translate="no" data-preserve-text className="notranslate block text-[13px] font-semibold tracking-[-.02em] text-[#14211f]">{brandName}</span>
              <span className="mt-1 hidden text-[8px] font-medium uppercase tracking-[.24em] text-[#7c8580] sm:block">Brand · Web · Growth</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[12px] font-semibold tracking-[.02em] xl:flex xl:gap-8" aria-label="主要導覽">
            {navItems.map(([label, path]) => <NavItem key={path} label={label} path={path} />)}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" onClick={() => setMenuOpen(false)} data-track="contact" data-placement="header" className="inline-flex min-h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#132321] px-4 text-[11px] font-semibold tracking-[.04em] text-[#f7f5f0] transition hover:bg-[#285f57] sm:px-5">
              洽談專案
            </Link>
            <button type="button" aria-label="切換選單" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#162321]/12 bg-white/60 text-[#14231f] xl:hidden">
              <span className="grid gap-1.5" aria-hidden="true"><span className={`block h-px w-4 bg-current transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} /><span className={`block h-px w-4 bg-current transition ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} /></span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-navigation" className="border-t border-[#162321]/10 bg-[#f7f5f0] px-5 py-3 xl:hidden" aria-label="手機導覽">
            <div className="mx-auto grid max-w-7xl gap-0.5 text-[13px] font-semibold">
              {[...navItems, ["聯絡", "/contact"]].map(([label, path]) => <NavItem key={path} label={label} path={path} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 hover:bg-white/70" />)}
            </div>
          </nav>
        ) : null}
      </header>

      {children}

      <footer className="border-t border-white/8 bg-[#0b1517] text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 md:py-14 lg:px-9">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-3"><span className="h-px w-7 bg-[#c6b98e]" aria-hidden="true" /><p translate="no" data-preserve-text className="notranslate text-sm font-semibold tracking-[-.01em]">{brandName}</p></div>
              <p className="mt-4 text-[13px] font-medium tracking-[.02em] text-white/52">品牌、網站與成長</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium">
                <a href={`mailto:${contact.email}`} data-track="contact" data-placement="footer_email" className="text-[#9bc3b9] transition hover:text-white">Email</a>
                <a href={`https://line.me/R/ti/p/~${contact.lineId}`} target="_blank" rel="noreferrer" data-track="contact" data-placement="footer_line" className="text-[#d6c899] transition hover:text-white">LINE {contact.lineId}</a>
              </div>
            </div>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-[12px] font-medium text-white/54 sm:flex sm:flex-wrap" aria-label="網站導覽">
              <Link to="/services" className="transition hover:text-white">服務</Link>
              <Link to="/onepage" className="transition hover:text-white">一頁式</Link>
              <Link to="/works" className="transition hover:text-white">作品</Link>
              <Link to="/seo-ads" className="transition hover:text-white">SEO／廣告</Link>
              <Link to="/pricing" className="transition hover:text-white">價格</Link>
              <Link to="/contact" className="transition hover:text-white">聯絡</Link>
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-5 text-[9px] font-medium uppercase tracking-[.18em] text-white/25 sm:flex-row sm:items-center sm:justify-between"><span translate="no" data-preserve-text className="notranslate">© 2026 {brandName}</span><span>Designed in Taiwan</span></div>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
