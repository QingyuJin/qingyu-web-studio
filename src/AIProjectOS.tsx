import { useEffect, useMemo, useState } from "react"
import ActivityFeed from "./ai-project-os/ActivityFeed"
import CategoryTabs from "./ai-project-os/CategoryTabs"
import Header from "./ai-project-os/Header"
import HeroStatus from "./ai-project-os/HeroStatus"
import ProjectCard from "./ai-project-os/ProjectCard"
import ProjectDetailPanel from "./ai-project-os/ProjectDetailPanel"
import { activity, categories, projects, type ProjectCategory } from "./ai-project-os/data"
import Seo from "./site/Seo"

const pageSeo = {
  path: "/",
  title: "AI Project OS｜作品展示管理系統｜Qingyu Web Studio",
  description: "以高級 SaaS 後台形式展示 AI 工具、作品狀態、KPI、技術棧與 Live Demo 的產品型前端。",
}

function getTimeLabel() {
  return new Intl.DateTimeFormat("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  }).format(new Date())
}

export default function AIProjectOS() {
  const [mode, setMode] = useState<"Studio" | "Ops">("Studio")
  const [category, setCategory] = useState<ProjectCategory>("All")
  const [selectedId, setSelectedId] = useState(projects[0].id)
  const [darkPreview, setDarkPreview] = useState(true)
  const [autoDemo, setAutoDemo] = useState(false)
  const [now, setNow] = useState(getTimeLabel())

  const visibleProjects = useMemo(() => {
    return category === "All" ? projects : projects.filter((project) => project.category === category)
  }, [category])

  const selectedProject = projects.find((project) => project.id === selectedId) || projects[0]

  useEffect(() => {
    const timer = window.setInterval(() => setNow(getTimeLabel()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!autoDemo) return undefined
    const timer = window.setInterval(() => {
      setSelectedId((current) => {
        const index = projects.findIndex((project) => project.id === current)
        return projects[(index + 1) % projects.length].id
      })
    }, 2200)
    return () => window.clearInterval(timer)
  }, [autoDemo])

  useEffect(() => {
    if (!visibleProjects.some((project) => project.id === selectedId)) {
      setSelectedId(visibleProjects[0]?.id || projects[0].id)
    }
  }, [selectedId, visibleProjects])

  return (
    <main className="min-h-screen bg-[#f6ead9] text-[#2b1c16]">
      <Seo page={pageSeo} />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(255,255,255,0.72),transparent_26rem),radial-gradient(circle_at_86%_16%,rgba(230,87,46,0.16),transparent_24rem),linear-gradient(180deg,#f7ecd9,#f3e2ce_54%,#ead2bc)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.5),transparent)]" />
      <div className="relative">
        <Header
          mode={mode}
          onModeChange={() => setMode((value) => (value === "Studio" ? "Ops" : "Studio"))}
          now={now}
          autoDemo={autoDemo}
          onAutoDemoChange={() => setAutoDemo((value) => !value)}
        />

        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-6 md:px-6 md:py-8">
          <HeroStatus selectedProject={selectedProject} mode={mode} />

          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="grid gap-5">
              <div className="flex flex-col gap-4 rounded-[1.6rem] border border-[#eadbca] bg-[#fff8ee]/72 p-4 shadow-sm backdrop-blur-xl md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#b94722]">Project Table</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#2b1c16]">作品 / AI 專案管理</h2>
                </div>
                <CategoryTabs categories={categories} active={category} onChange={setCategory} />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {visibleProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    selected={project.id === selectedProject.id}
                    onSelect={() => setSelectedId(project.id)}
                  />
                ))}
              </div>

              <ActivityFeed items={activity} />
            </div>

            <ProjectDetailPanel
              project={selectedProject}
              darkPreview={darkPreview}
              onDarkPreviewChange={() => setDarkPreview((value) => !value)}
            />
          </section>
        </div>
      </div>
    </main>
  )
}
