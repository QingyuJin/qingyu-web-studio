import { contactInfo, proofPoints } from "../data/siteData"

export function Hero() {
  return (
    <section id="top" className="ink-wash relative isolate overflow-hidden pt-24 text-white md:pt-28">
      <div className="ink-splash pointer-events-none absolute -left-24 top-10 h-[34rem] w-[34rem] opacity-55 blur-sm" />
      <div className="ink-splash pointer-events-none absolute -right-40 bottom-0 h-[38rem] w-[38rem] rotate-45 opacity-50 blur-sm" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,16,14,0.12),rgba(17,16,14,0.64))]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-['DFKai-SB','KaiTi',serif] text-[28vw] font-black leading-none tracking-[-0.16em] text-white/[0.035] md:text-[19rem]">
        鑫匠
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl gap-8 px-4 py-12 md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d7b45c]">Pingtung Masonry Works</p>
          <h1 className="brush-title mt-5 max-w-3xl text-[5.4rem] font-black leading-[0.82] tracking-[-0.08em] text-[#ffd45a] md:text-[9.5rem]">
            鑫匠
          </h1>
          <p className="mt-6 max-w-2xl font-['DFKai-SB','KaiTi',serif] text-2xl font-black leading-relaxed tracking-[0.12em] text-white md:text-4xl">
            瓦刀執手砌日月
            <br />
            匠心巧思鑄千秋
          </p>
          <p className="mt-6 max-w-2xl text-sm font-semibold leading-8 text-white/68 md:text-base">
            屏東在地泥作裝修工程。40 年老師父經驗，泥作、磁磚、洗石子、牆地面、水泥、油漆、拆除整修，到場評估後實在報價。
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`tel:${contactInfo.phone}`} className="inline-flex min-h-12 items-center rounded-full bg-[#ffd45a] px-6 text-sm font-black text-[#11100e] shadow-xl shadow-[#ffd45a]/16">
              電話諮詢
            </a>
            <a href="#services" className="inline-flex min-h-12 items-center rounded-full border border-white/16 bg-white/8 px-6 text-sm font-black text-white backdrop-blur">
              查看服務
            </a>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofPoints.map(([value, label]) => (
              <div key={value} className="rounded-[1.1rem] border border-white/12 bg-white/[0.07] p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-black tracking-[-0.04em] text-[#ffd45a]">{value}</p>
                <p className="mt-1 text-xs font-black text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#ffd45a]/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.055] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.34)] backdrop-blur">
            <img src="/project-photos/pro360-1.jpg" alt="泥作牆面施工現場" className="aspect-[5/4] w-full rounded-[1.55rem] object-cover object-center grayscale-[0.22] contrast-110 md:aspect-[5/3]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[1.35rem] border border-white/14 bg-[#11100e]/72 p-5 backdrop-blur-xl">
              <p className="text-xs font-black tracking-[0.2em] text-[#ffd45a]">現場評估後報價</p>
              <p className="mt-2 text-lg font-black text-white">老師父看工法，年輕學徒協助溝通與整理。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
