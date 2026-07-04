import { useState } from "react"
import { contactInfo, navItems } from "../data/siteData"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11100e]/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d9aa3d]/45 bg-[#1a1916] text-lg font-black text-[#ffd45a] shadow-lg shadow-black/30">
            匠
          </span>
          <div>
            <p className="brush-title text-xl font-black leading-none tracking-[-0.04em] text-[#ffd45a]">鑫匠</p>
            <p className="mt-1 text-xs font-bold tracking-[0.18em] text-white/52">鑫匠工程</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-black text-white/68 hover:bg-white/10 hover:text-[#ffd45a]">
              {item.label}
            </a>
          ))}
        </nav>

        <a href={`tel:${contactInfo.phone}`} className="hidden min-h-11 items-center rounded-full bg-[#ffd45a] px-5 text-sm font-black text-[#11100e] shadow-lg shadow-[#ffd45a]/14 md:inline-flex">
          電話諮詢
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/8 text-[#ffd45a] lg:hidden"
          aria-label="切換選單"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="grid gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-[#11100e]/96 px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl bg-white/8 px-4 py-3 text-sm font-black text-white/76">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
