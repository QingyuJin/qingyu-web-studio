import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useLocale } from "../i18n/LocaleContext"
import LocaleSwitcher from "../i18n/LocaleSwitcher"
import { ENABLE_MULTILINGUAL } from "./features"
import { contact } from "./siteConfig"
import { studioWords } from "./studioWords"
import { getTemplateEntryCopy } from "../onepage/templateEntry"
import "./studio.css"
import "./visual-refinement.css"

const paths = ["/works", "/services", "/about", "/contact"]
export default function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const { locale } = useLocale()
  const c = studioWords[locale] ?? studioWords["zh-Hant"]
  const location = useLocation()
  useEffect(() => {
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: "instant" })
  }, [location.pathname, location.hash])
  function close() {
    setMenuOpen(false)
  }
  function escape(event) {
    if (event.key === "Escape") {
      close()
      menuButton.current?.focus()
    }
  }
  return (
    <div
      className="studio-shell qy-studio"
      data-preserve-text
      data-skip-experience-polish
      data-skip-interaction-feedback
    >
      <a className="qy-skip" href="#main-content">
        {c.skip}
      </a>
      <header className="qy-header" onKeyDown={escape}>
        <div className="qy-wrap qy-header-inner">
          <Link className="qy-brand" to="/" onClick={close}>
            <span className="qy-brand-mark" aria-hidden="true">
              <i />
              <i />
            </span>
            <span>
              {c.brand}
              <small>{c.kickers[0]}</small>
            </span>
          </Link>
          <nav className="qy-desktop-nav" aria-label={c.menu}>
            {paths.map((path, i) => (
              <NavLink key={path} to={path}>
                {c.nav[i]}
              </NavLink>
            ))}
          </nav>
          <div className="qy-header-actions">
            {ENABLE_MULTILINGUAL && <LocaleSwitcher inline />}
            <Link
              to="/contact"
              className="qy-button qy-header-cta"
              onClick={close}
              data-track="contact"
              data-placement="header"
            >
              {c.talk}
              <span aria-hidden="true">↗</span>
            </Link>
            <button
              ref={menuButton}
              className="qy-menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="qy-mobile-nav"
              aria-label={menuOpen ? c.closeMenu : c.menu}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="qy-mobile-nav" className="qy-mobile-nav qy-wrap" aria-label={c.menu}>
            {paths.map((path, i) => (
              <NavLink key={path} to={path} onClick={close}>
                {c.nav[i]}
                <span aria-hidden="true">↗</span>
              </NavLink>
            ))}
            <Link to="/contact" className="qy-button" onClick={close}>
              {c.talk}
            </Link>
            {ENABLE_MULTILINGUAL && <LocaleSwitcher inline />}
          </nav>
        )}
      </header>
      <div id="main-content" tabIndex="-1">
        {children}
      </div>
      <footer className="qy-footer">
        <div className="qy-wrap">
          <div className="qy-footer-grid">
            <div>
              <Link to="/" className="qy-footer-brand">
                {c.brand}
              </Link>
              <p>{c.footer}</p>
              <div className="qy-footer-contact">
                <a
                  href={`mailto:${contact.email}`}
                  data-track="contact"
                  data-placement="footer_email"
                >
                  {contact.email}
                </a>
                <a
                  href={contact.lineUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-track="contact"
                  data-placement="footer_line"
                >
                  LINE ↗
                </a>
              </div>
            </div>
            <nav aria-label={c.menu}>
              {paths.map((path, i) => (
                <Link key={path} to={path}>
                  {c.nav[i]}
                </Link>
              ))}
              <Link to={`/showcase?lang=${locale}`}>{getTemplateEntryCopy(locale).label}</Link>
            </nav>
          </div>
          <div className="qy-footer-bottom">
            <span>© {new Date().getFullYear()} {c.brand}</span>
            <span>{c.footerNote}</span>
            {ENABLE_MULTILINGUAL && <LocaleSwitcher inline />}
          </div>
        </div>
      </footer>
    </div>
  )
}
