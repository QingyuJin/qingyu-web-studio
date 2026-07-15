import { useState } from "react"
import { contactInfo, navItems } from "../data/siteData"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11100e]/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="seal h-11 w-11 text-base font-bold" aria-hidden="true">
            匠
          </span>
          <div>
            <p className="brush-title gold-text text-2xl font-bold leading-none tracking-[0.06em]">鑫匠</p>
            <p className="font-kai mt-1 text-xs font-bold tracking-[0.24em] text-white/52">屏東泥作裝修工程</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-black text-white/68 hover:bg-white/10 hover:text-[#ffd45a]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${contactInfo.phone}`}
          className="hidden min-h-11 items-center rounded-full bg-[#ffd45a] px-5 text-sm font-black text-[#11100e] shadow-lg shadow-[#ffd45a]/14 hover:bg-[#ffe07d] md:inline-flex"
        >
          {contactInfo.phoneDisplay}
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/8 text-[#ffd45a] lg:hidden"
          aria-label="切換選單"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="grid gap-1.5">
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 rounded-full bg-current transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-[#11100e]/96 px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-white/8 px-4 py-3 text-sm font-black text-white/76"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${contactInfo.phone}`}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-[#ffd45a] px-4 py-3 text-center text-sm font-black text-[#11100e]"
            >
              電話諮詢 {contactInfo.phoneDisplay}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
