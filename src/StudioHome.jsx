import { Link } from "react-router-dom"

const works = [
  {
    title: "工程行作品集",
    tag: "Engineering",
    desc: "接案前台、BuildFlow 後台、LINE Bot 回報。",
    path: "/engineering",
    image: "/project-photos/335950_0.jpg",
  },
]

function StudioHome() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#141c20]">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="font-black tracking-tight" aria-label="Qingyu Web Studio">
          Qingyu Web Studio
        </Link>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#66736f]">Works</p>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl content-center gap-10 px-4 py-12">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#1d6f65]">
            Portfolio
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
            網站、系統、流程工具。
          </h1>
          <p className="mt-5 max-w-xl text-base font-bold leading-8 text-[#5f6b68]">
            先放一個主作品。其他作品整理中。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work) => (
            <Link
              key={work.title}
              to={work.path}
              className="group overflow-hidden rounded-lg border border-[#d9d1c4] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12212a]/10 active:translate-y-0"
            >
              <img src={work.image} alt={work.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1d6f65]">
                  {work.tag}
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight">{work.title}</h2>
                <p className="mt-3 text-sm font-bold leading-7 text-[#5f6b68]">{work.desc}</p>
                <p className="mt-5 text-sm font-black text-[#123f4a] group-hover:translate-x-1">
                  進入作品 →
                </p>
              </div>
            </Link>
          ))}

          <div className="rounded-lg border border-dashed border-[#cfc7b8] p-5 text-[#66736f]">
            <p className="text-xs font-black uppercase tracking-[0.18em]">Next</p>
            <p className="mt-3 text-lg font-black text-[#2a3438]">更多作品整理中</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default StudioHome
