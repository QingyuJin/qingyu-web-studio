import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import { localizedBrandName } from "../i18n/translations"
import { contact } from "./content"

const navItems = [
  ["系統", "/#systems"],
  ["網站", "/#websites"],
  ["作品", "/works"],
  ["價格", "/pricing"],
]

const serviceItems = [
  ["企業系統", "/services#web-systems", "管理後台與工作流程"],
  ["品牌網站", "/services#business-website", "高質感網站與電商體驗"],
  ["Landing Page", "/services#landing-page", "廣告與轉換頁面"],
  ["LINE 與 API", "/services#line-api", "串接通知與資料流程"],
  ["AI 與 RAG", "/services#ai-rag", "知識庫與流程自動化"],
  ["SEO 與 Analytics", "/services#analytics-dashboard", "搜尋能見度與成效追蹤"],
]

function NavItem({ label, path, onClick, className = "" }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) => `${isActive && !path.includes("#") ? "text-[#17473f]" : "text-[#5e6965] hover:text-[#17473f]"} transition-colors ${className}`}
    >
      {label}
    </NavLink>
  )
}

function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { locale } = useLocale()
  const brandName = localizedBrandName(locale)
  const homeLabel = locale === "zh-Hant" ? `${brandName}首頁` : `${brandName} Home`

  function closeMenus() {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  return (
    <main className="studio-shell min-h-screen bg-[#f7f5f0] text-[#101b1d]">
      <header className="sticky top-0 z-50 border-b border-[#162321]/10 bg-[#f7f5f0]/94 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-7 lg:px-9">
          <Link to="/" onClick={closeMenus} className="group flex shrink-0 items-center gap-3" aria-label={homeLabel}>
            <span className="h-px w-6 bg-[#9b8e69] transition-all group-hover:w-8" aria-hidden="true" />
            <span className="leading-none">
              <span translate="no" data-preserve-text className="notranslate block text-[12px] font-semibold tracking-[-.02em] text-[#14211f]">{brandName}</span>
              <span className="mt-1 hidden text-[7px] font-medium uppercase tracking-[.23em] text-[#7c8580] sm:block">Web Systems · Digital Experiences</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[11px] font-semibold tracking-[.02em] lg:flex xl:gap-8" aria-label="主要導覽">
            {navItems.slice(0, 3).map(([label, path]) => <NavItem key={path} label={label} path={path} />)}
            <div className="relative">
              <button type="button" aria-expanded={servicesOpen} aria-controls="service-navigation" onClick={() => setServicesOpen((current) => !current)} className="inline-flex items-center gap-1.5 text-[#5e6965] transition hover:text-[#17473f]">
                服務 <span className={`text-[8px] transition ${servicesOpen ? "rotate-180" : ""}`} aria-hidden="true">⌄</span>
              </button>
              {servicesOpen ? (
                <div id="service-navigation" className="absolute left-1/2 top-[calc(100%+1rem)] w-[34rem] -translate-x-1/2 rounded-2xl border border-[#d8ddd6] bg-[#fbfaf6] p-3 shadow-[0_24px_70px_rgba(20,37,34,.14)]">
                  <div className="grid grid-cols-2 gap-1">
                    {serviceItems.map(([label, path, description]) => (
                      <Link key={path} to={path} onClick={closeMenus} className="rounded-xl px-3.5 py-3 transition hover:bg-[#eef0ea]">
                        <span className="block text-[11px] font-semibold text-[#14211f]">{label}</span>
                        <span className="mt-1 block text-[9px] font-medium text-[#7d8782]">{description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {navItems.slice(3).map(([label, path]) => <NavItem key={path} label={label} path={path} />)}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact?type=business-system" onClick={closeMenus} data-track="contact" data-placement="header" className="inline-flex min-h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#132321] px-4 text-[10px] font-semibold tracking-[.035em] text-[#f7f5f0] transition hover:bg-[#285f57] sm:px-5">
              啟動專案
            </Link>
            <button type="button" aria-label="切換選單" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((current) => !current)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#162321]/12 bg-white/60 text-[#14231f] lg:hidden">
              <span className="grid gap-1.5" aria-hidden="true"><span className={`block h-px w-4 bg-current transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} /><span className={`block h-px w-4 bg-current transition ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} /></span>
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-navigation" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#162321]/10 bg-[#f7f5f0] px-5 py-3 lg:hidden" aria-label="手機導覽">
            <div className="mx-auto grid max-w-7xl gap-0.5 text-[13px] font-semibold">
              {navItems.slice(0, 3).map(([label, path]) => <NavItem key={path} label={label} path={path} onClick={closeMenus} className="rounded-xl px-4 py-3 hover:bg-white/70" />)}
              <p className="px-4 pb-1 pt-4 text-[9px] uppercase tracking-[.16em] text-[#8b958f]">Services</p>
              <div className="grid grid-cols-2 gap-1">
                {serviceItems.map(([label, path]) => <Link key={path} to={path} onClick={closeMenus} className="rounded-xl px-4 py-3 text-[11px] text-[#5d6964] hover:bg-white/70 hover:text-[#17473f]">{label}</Link>)}
              </div>
              {navItems.slice(3).map(([label, path]) => <NavItem key={path} label={label} path={path} onClick={closeMenus} className="rounded-xl px-4 py-3 hover:bg-white/70" />)}
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
              <p className="mt-4 max-w-sm text-[12px] font-medium leading-6 tracking-[.01em] text-white/52">企業 Web 系統與高質感網站開發</p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium">
                <a href={`mailto:${contact.email}`} data-track="contact" data-placement="footer_email" className="text-[#9bc3b9] transition hover:text-white">Email</a>
                <a href={`https://line.me/R/ti/p/~${contact.lineId}`} target="_blank" rel="noreferrer" data-track="contact" data-placement="footer_line" className="text-[#d6c899] transition hover:text-white">LINE {contact.lineId}</a>
              </div>
            </div>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-[11px] font-medium text-white/54 sm:flex sm:flex-wrap" aria-label="網站導覽">
              <Link to="/#systems" className="transition hover:text-white">系統</Link>
              <Link to="/#websites" className="transition hover:text-white">網站</Link>
              <Link to="/works" className="transition hover:text-white">作品</Link>
              <Link to="/services" className="transition hover:text-white">服務</Link>
              <Link to="/pricing" className="transition hover:text-white">價格</Link>
              <Link to="/contact" className="transition hover:text-white">聯絡</Link>
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-5 text-[8px] font-medium uppercase tracking-[.18em] text-white/25 sm:flex-row sm:items-center sm:justify-between"><span translate="no" data-preserve-text className="notranslate">© 2026 {brandName}</span><span>Built to work · Designed to impress</span></div>
        </div>
      </footer>
    </main>
  )
}

export default SiteLayout
