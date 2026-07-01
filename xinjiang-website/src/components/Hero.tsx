export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(231,190,111,0.24),transparent_32rem),linear-gradient(180deg,#fbf4e7,#efe1cc)]" />
      <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl gap-8 px-4 py-12 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#a05c2e]">Pingtung Local Contractor</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#2b2118] md:text-7xl">
            屏東在地泥作裝修工程
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#6e604f] md:text-lg">
            40 年老師父經驗，從磁磚、水泥、油漆、防水到拆除整修，到場評估、實在報價。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex min-h-12 items-center rounded-full bg-[#b95e2f] px-6 text-sm font-black text-white shadow-xl shadow-[#b95e2f]/20">
              立即諮詢
            </a>
            <a href="#services" className="inline-flex min-h-12 items-center rounded-full border border-[#d6c4aa] bg-white/70 px-6 text-sm font-black text-[#2b2118]">
              查看服務
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#d78a3b]/18 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#e3d3bc] bg-white/64 p-3 shadow-[0_28px_90px_rgba(58,45,31,0.14)]">
            <img src="/project-photos/335950_0.jpg" alt="屋頂與泥作工程現場" className="aspect-[5/4] w-full rounded-[1.55rem] object-cover md:aspect-[5/3]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.35rem] border border-white/60 bg-[#fbf4e7]/82 p-5 backdrop-blur-xl">
              <p className="text-xs font-black tracking-[0.2em] text-[#a05c2e]">現場評估後報價</p>
              <p className="mt-2 text-lg font-black text-[#2b2118]">老師父判斷工法，年輕團隊協助溝通整理。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
