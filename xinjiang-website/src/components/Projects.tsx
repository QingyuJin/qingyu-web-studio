import { projects } from "../data/siteData"
import { SectionTitle } from "./SectionTitle"

export function Projects() {
  return (
    <section id="projects" className="bg-[#2b2118] px-4 py-16 text-white md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Works" title="工程案例" text="先放實際施工照片與案例類型，後續可替換成正式完工照。" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-3">
              <img src={project.image} alt={project.title} loading="lazy" className="aspect-[4/3] w-full rounded-[1.1rem] object-cover" />
              <div className="p-3">
                <p className="text-xs font-black text-[#e8bd6d]">{project.type}</p>
                <h3 className="mt-2 text-xl font-black">{project.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-white/72">{project.content}</p>
                <p className="mt-3 text-xs font-black text-white/58">適合：{project.fit}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
