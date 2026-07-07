import { SectionTitle } from "./SectionTitle"

export function About() {
  const points = ["屏東在地工程", "40 年以上泥作經驗", "老師父帶年輕學徒", "到場評估後報價"]

  return (
    <section id="about" className="bg-[#f0e2cd] px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionTitle
            eyebrow="About"
            title="關於鑫匠"
            text="鑫匠工程以老師父經驗判斷現場，由年輕學徒協助溝通、整理與回覆，讓施工前後更清楚。"
          />
          <blockquote className="font-kai mt-7 border-l-4 border-[#b95e2f]/50 pl-5 text-xl font-bold leading-relaxed tracking-[0.08em] text-[#5c4d3c] md:text-2xl">
            「工在手上，話說清楚——
            <br />
            看過現場，才敢跟你講價錢。」
          </blockquote>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map((item) => (
              <div key={item} className="rounded-[1.35rem] border border-[#e1ceb4] bg-white/72 p-5">
                <p className="text-lg font-black text-[#2b2118]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <figure className="photo-zoom relative overflow-hidden rounded-[1.8rem] border border-[#e1ceb4] shadow-[0_24px_70px_rgba(58,45,31,0.14)]">
            <img
              src="/project-photos/pro360-4.jpg"
              alt="屏東三地門在地建築，石板與磁磚立面透天"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#11100e]/72 px-4 py-2 text-xs font-black text-[#ffd45a] backdrop-blur">
              屏東縣三地門鄉｜我們生活與施工的地方
            </figcaption>
          </figure>
          <figure className="photo-zoom relative overflow-hidden rounded-[1.8rem] border border-[#e1ceb4] shadow-[0_24px_70px_rgba(58,45,31,0.14)]">
            <img
              src="/project-photos/pro360-1.jpg"
              alt="鑫匠師傅牆面粉光施工中"
              loading="lazy"
              className="aspect-[16/7] w-full object-cover object-[center_38%]"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#11100e]/72 px-4 py-2 text-xs font-black text-[#ffd45a] backdrop-blur">
              手上的功夫，做了四十年
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
