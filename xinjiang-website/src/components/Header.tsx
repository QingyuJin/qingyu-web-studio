import { useState } from "react"
import { navItems } from "../data/siteData"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e4d5bf] bg-[#f7efe2]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2b2118] text-lg font-black text-[#e8bd6d]">
            匠
          </span>
          <div>
            <p className="text-xl font-black leading-none tracking-[-0.04em] text-[#2b2118]">鑫匠</p>
            <p className="mt-1 text-xs font-bold tracking-[0.18em] text-[#8f7d68]">鑫匠工程</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-black text-[#584a3d] hover:bg-white/70 hover:text-[#2b2118]">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="hidden min-h-11 items-center rounded-full bg-[#b95e2f] px-5 text-sm font-black text-white shadow-lg shadow-[#b95e2f]/18 md:inline-flex">
          立即諮詢
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-[#dfcdb3] bg-white/64 text-[#2b2118] lg:hidden"
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
        <nav className="border-t border-[#e4d5bf] bg-[#f7efe2]/96 px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl bg-white/72 px-4 py-3 text-sm font-black text-[#584a3d]">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
