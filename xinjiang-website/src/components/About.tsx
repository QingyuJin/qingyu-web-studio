import { SectionTitle } from "./SectionTitle"

export function About() {
  const points = ["屏東在地工程", "40 年以上泥作經驗", "年輕團隊協助溝通", "現場判斷與清楚報價"]

  return (
    <section id="about" className="bg-[#f0e2cd] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionTitle
          eyebrow="About"
          title="關於鑫匠"
          text="鑫匠工程以老師父經驗做現場判斷，由年輕團隊協助溝通、整理與回覆，讓施工前後更清楚。"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((item) => (
            <div key={item} className="rounded-[1.35rem] border border-[#e1ceb4] bg-white/72 p-5">
              <p className="text-lg font-black text-[#2b2118]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
