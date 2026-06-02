import { useState } from "react"
import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { projectStatuses } from "../data/demoData"
import { includesKeyword, formatMoney } from "../utils/helpers"

function ProjectsPanel({
  projects,
  addProject,
  editProject,
  deleteProject,
  updateProjectStatus,
  openProjectDetail,
}) {
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")

  const filteredProjects = projects.filter((project) => {
    const matchStatus = statusFilter === "全部" || project.status === statusFilter
    const matchKeyword = includesKeyword(
      `${project.name} ${project.client} ${project.address} ${project.type} ${project.note}`,
      keyword
    )
    return matchStatus && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle title="案件管理" desc="新增、搜尋、改狀態。點進去看細節。" />
      <Card>
        <h3 className="text-xl font-black">新增案件</h3>
        <form onSubmit={addProject} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" label="案件名稱" required />
          <Input name="client" label="業主名稱" required />
          <Input name="address" label="地址" />
          <Input name="type" label="案件類型" placeholder="防水 / 泥作 / 水電" />
          <Input name="budget" label="預算" type="number" />
          <Input name="startDate" label="開始日期" type="date" />
          <Input name="dueDate" label="預計完工日" type="date" />
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增案件
          </button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">案件列表</h3>
            <p className="mt-1 text-sm text-slate-500">
              目前顯示 {filteredProjects.length} / {projects.length} 件案件
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_170px]">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜尋案件 / 業主 / 地點"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              <option>全部</option>
              {projectStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[920px] table-fixed text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="w-[28%] py-3">案件</th>
                <th className="w-[12%]">業主</th>
                <th className="w-[12%]">類型</th>
                <th className="w-[12%]">預算</th>
                <th className="w-[12%]">期限</th>
                <th className="w-[12%]">狀態</th>
                <th className="w-[12%]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="py-4">
                    <p className="font-black leading-6">{project.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{project.address}</p>
                  </td>
                  <td className="pr-2">{project.client}</td>
                  <td className="pr-2">{project.type}</td>
                  <td className="pr-2">NT${formatMoney(project.budget)}</td>
                  <td className="pr-2">{project.dueDate}</td>
                  <td>
                    <select
                      value={project.status}
                      onChange={(event) => updateProjectStatus(project.id, event.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"
                    >
                      {projectStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <SmallButton onClick={() => openProjectDetail(project.id)}>查看</SmallButton>
                      <SmallButton onClick={() => editProject(project)}>編輯</SmallButton>
                      <SmallButton danger onClick={() => deleteProject(project.id)}>
                        刪除
                      </SmallButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredProjects.length && (
            <p className="py-4 text-sm text-slate-500">沒有符合條件的案件。</p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default ProjectsPanel
