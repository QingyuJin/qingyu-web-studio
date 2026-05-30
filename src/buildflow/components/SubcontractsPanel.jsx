import { useState } from "react"
import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { subcontractStatuses } from "../data/demoData"
import { includesKeyword, formatMoney } from "../utils/helpers"

function SubcontractsPanel({
  projects,
  users,
  subcontracts,
  addSubcontract,
  editSubcontract,
  deleteSubcontract,
  updateSubcontractStatus,
  openProjectDetail,
}) {
  const workers = users.filter((user) => user.role === "worker")
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")
  const [workerFilter, setWorkerFilter] = useState("全部")

  const filteredSubcontracts = subcontracts.filter((item) => {
    const matchStatus = statusFilter === "全部" || item.status === statusFilter
    const matchWorker = workerFilter === "全部" || item.workerId === workerFilter
    const matchKeyword = includesKeyword(
      `${item.projectName} ${item.item} ${item.trade} ${item.workerName} ${item.note}`,
      keyword
    )
    return matchStatus && matchWorker && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="發包項目"
        desc="建立工種、項目、金額與負責師傅。新增使用者後，會自動出現在指派清單。"
      />
      <Card>
        <h3 className="text-xl font-black">新增發包項目</h3>
        <form onSubmit={addSubcontract} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">所屬案件</span>
            <select name="projectId" className="rounded-xl border border-slate-200 px-4 py-3">
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">負責人</span>
            <select name="workerId" className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="">未指派</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.name}
                </option>
              ))}
            </select>
          </label>
          <Input name="trade" label="工種" placeholder="防水 / 木作 / 水電" />
          <Input name="item" label="項目名稱" required />
          <Input name="qty" label="數量" type="number" />
          <Input name="unit" label="單位" placeholder="式 / 坪 / 米" />
          <Input name="price" label="金額" type="number" />
          <Input name="dueDate" label="預計日期" type="date" />
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增發包項目
          </button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">發包列表</h3>
            <p className="mt-1 text-sm text-slate-500">
              目前顯示 {filteredSubcontracts.length} / {subcontracts.length} 筆發包
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px_160px]">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜尋案件 / 項目 / 工種"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              <option>全部</option>
              {subcontractStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <select
              value={workerFilter}
              onChange={(event) => setWorkerFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              <option>全部</option>
              <option value="">未指派</option>
              {workers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">案件</th>
                <th>項目</th>
                <th>工種</th>
                <th>負責人</th>
                <th>金額</th>
                <th>狀態</th>
                <th>期限</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubcontracts.map((item) => (
                <tr key={item.id}>
                  <td className="py-4">
                    <button
                      type="button"
                      onClick={() => openProjectDetail(item.projectId)}
                      className="font-bold text-slate-700 underline underline-offset-4"
                    >
                      {item.projectName}
                    </button>
                  </td>
                  <td className="font-black">{item.item}</td>
                  <td>{item.trade}</td>
                  <td>{item.workerName}</td>
                  <td>NT${formatMoney(item.price)}</td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(event) => updateSubcontractStatus(item.id, event.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"
                    >
                      {subcontractStatuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>{item.dueDate}</td>
                  <td>
                    <div className="flex gap-2">
                      <SmallButton onClick={() => editSubcontract(item)}>編輯</SmallButton>
                      <SmallButton danger onClick={() => deleteSubcontract(item.id)}>
                        刪除
                      </SmallButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredSubcontracts.length && (
            <p className="py-4 text-sm text-slate-500">沒有符合條件的發包項目。</p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default SubcontractsPanel
