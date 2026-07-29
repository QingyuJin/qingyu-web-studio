import { useState } from "react"

const navItems = ["關於全泰", "核心能力", "加工範圍", "沖壓方式", "品質控管"]

export function ClientHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`client-header${menuOpen ? " menu-open" : ""}`}>
      <div className="client-header__inner">
        <a className="client-header__brand" href="#preview-top" aria-label="全泰工業首頁">
          <img
            src="/assets/brand/trainthai-logo.svg"
            width="226"
            height="51"
            alt="全泰工業 TRAIN THAI"
          />
        </a>

        <nav className="client-header__nav" aria-label="次分頁導覽">
          {navItems.map((item) => (
            <a key={item} href="#page-content">
              {item}
            </a>
          ))}
        </nav>

        <button
          className="client-header__menu"
          type="button"
          aria-label={menuOpen ? "關閉導覽" : "開啟導覽"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="client-header__mobile-nav" aria-label="手機版次分頁導覽">
          {navItems.map((item) => (
            <a key={item} href="#page-content" onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
