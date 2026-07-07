import { craftShots, projects } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

export function Projects() {
  const featured = projects.find((project) => project.featured) ?? projects[0]
  const rest = projects.filter((project) => project !== featured)

  return (
    <section id="projects" className="bg-[#2b2118] px-4 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionTitle eyebrow="Works" title="工程案例" text="每一張都是實際施工與完工現場，看得到工，也看得到收尾。" light />
          <span className="font-kai w-fit rounded-full border border-[#ffd45a]/35 bg-[#ffd45a]/10 px-4 py-2 text-sm font-bold tracking-[0.18em] text-[#ffd45a]">
            實景實拍
          </span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="group relative overflow-hidden rounded-[1.8rem] border border-white/12">
            <div className="photo-zoom">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[30rem]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(17,16,14,0),rgba(17,16,14,0.9))] p-6 pt-20 md:p-8">
              <p className="text-xs font-black tracking-[0.2em] text-[#ffd45a]">{featured.type}</p>
              <h3 className="font-kai mt-2 text-3xl font-bold md:text-4xl">{featured.title}</h3>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-7 text-white/78">{featured.content}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/12 px-3 py-1 text-xs font-black text-white/85 backdrop-blur">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {rest.slice(0, 4).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(4).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d7b45c]">On Site</p>
              <h3 className="font-kai mt-2 text-3xl font-bold md:text-4xl">現場實況</h3>
            </div>
            <p className="hidden max-w-sm text-sm font-semibold leading-6 text-white/55 md:block">
              好看的完工照背後，是每天現場的基本功。
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {craftShots.map((shot) => (
              <figure key={shot.image} className="photo-zoom overflow-hidden rounded-[1.2rem] border border-white/10">
                <img src={shot.image} alt={shot.label} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="bg-white/[0.06] px-3 py-2 text-xs font-black text-white/68">{shot.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-[#ffd45a]/25 bg-[#ffd45a]/8 p-5">
          <p className="font-kai text-xl font-bold text-[#ffd45a] md:text-2xl">你家的工程，也想這樣被認真對待？</p>
          <a
            href="#inquiry"
            className="inline-flex min-h-12 items-center rounded-full bg-[#ffd45a] px-6 text-sm font-black text-[#11100e] hover:bg-[#ffe07d]"
          >
            填線上詢價
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.07] transition duration-300 hover:-translate-y-1 hover:border-[#ffd45a]/35">
      <div className="photo-zoom">
        <img src={project.image} alt={project.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-xs font-black text-[#e8bd6d]">{project.type}</p>
        <h3 className="font-kai mt-1.5 text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/72">{project.content}</p>
        <p className="mt-3 text-xs font-black text-white/58">適合：{project.fit}</p>
      </div>
    </article>
  )
}
