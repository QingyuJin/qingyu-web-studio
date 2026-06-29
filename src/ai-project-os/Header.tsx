type HeaderProps = {
  mode: "Studio" | "Ops"
  onModeChange: () => void
  now: string
  autoDemo: boolean
  onAutoDemoChange: () => void
}

export default function Header({ mode, onModeChange, now, autoDemo, onAutoDemoChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#eadbca] bg-[#f7efe3]/86 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#2b1c16] text-sm font-black text-[#ff7a3d] shadow-lg shadow-[#2b1c16]/12">
            Q
          </div>
          <div>
            <p className="text-sm font-black tracking-[-0.02em] text-[#2b1c16]">AI Project OS</p>
            <p className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c6f60] sm:block">Showcase Console</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-[#eadbca] bg-[#fff8ee]/80 p-1 text-xs font-black text-[#6f5143] md:flex">
          {["Studio", "Ops"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={item === mode ? undefined : onModeChange}
              className={`min-h-9 rounded-full px-4 ${item === mode ? "bg-[#2b1c16] text-white shadow-sm" : "hover:bg-white"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-[#eadbca] bg-[#fff8ee]/75 px-4 py-2 text-xs font-black text-[#6f5143] lg:block">
            {now}
          </div>
          <button
            type="button"
            onClick={onAutoDemoChange}
            className={`min-h-10 rounded-full px-4 text-xs font-black shadow-sm transition ${autoDemo ? "bg-[#e6572e] text-white" : "border border-[#eadbca] bg-[#fff8ee] text-[#2b1c16]"}`}
          >
            {autoDemo ? "Auto Demo On" : "Demo"}
          </button>
        </div>
      </div>
    </header>
  )
}
