import { useState } from "react"
import Card from "../shared/Card"
import Info from "../shared/Info"
import Metric from "../shared/Metric"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { projectStatuses, subcontractStatuses, changeStatuses } from "../data/demoData"
import { TaskList } from "./TasksPanel"
import { formatMoney } from "../utils/helpers"

function ProjectDetailPanel({
  project,
  subcontracts,
  bids,
  changeOrders,
  tasks,
  updateProjectStatus,
  updateSubcontractStatus,
  updateChangeStatus,
  toggleTaskComplete,
  updateTaskReport,
  generateConfirmText,
  onBack,
}) {
  const [copiedId, setCopiedId] = useState("")

  if (!project) {
    return (
      <div className="grid gap-5">
        <SectionTitle title="找不到案件" desc="這個案件可能已經被刪除。" />
        <button
          onClick={onBack}
          className="w-fit rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
        >
          回案件列表
        </button>
      </div>
    )
  }

  const projectSubcontracts = subcontracts.filter((item) => item.projectId === project.id)
  const projectBids = bids.filter((item) => item.projectId === project.id)
  const projectChanges = changeOrders.filter((item) => item.projectId === project.id)
  const projectTasks = tasks.filter((item) => item.projectId === project.id)
  const pendingChanges = projectChanges.filter((item) => !item.confirmedByClient)
  const totalSubcontract = projectSubcontracts.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  )
  const totalChange = projectChanges.reduce((sum, item) => sum + Number(item.amount || 0), 0)

  async function copyOrder(order) {
    const text = generateConfirmText(order)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
    setCopiedId(order.id)
    window.setTimeout(() => setCopiedId(""), 1400)
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <SectionTitle
          title={project.name}
          desc="案件中心：集中查看基本資料、發包、批價、追加減項與任務。"
        />
        <button
          onClick={onBack}
          className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700"
        >
          ← 回案件列表
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="案件預算" value={`NT$${formatMoney(project.budget)}`} />
        <Metric label="發包合計" value={`NT$${formatMoney(totalSubcontract)}`} />
        <Metric label="追加合計" value={`NT$${formatMoney(totalChange)}`} danger />
        <Metric
          label="待確認追加"
          value={pendingChanges.length}
          danger={pendingChanges.length > 0}
        />
      </div>

      <Card>
        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <div>
            <h3 className="text-xl font-black">基本資料</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Info label="業主" value={project.client} />
              <Info label="地址" value={project.address} />
              <Info label="類型" value={project.type} />
              <Info label="負責人" value={project.manager} />
              <Info label="開始日期" value={project.startDate} />
              <Info label="預計完工" value={project.dueDate} />
            </div>
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {project.note || "沒有備註。"}
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-500">案件狀態</p>
            <select
              value={project.status}
              onChange={(event) => updateProjectStatus(project.id, event.target.value)}
              className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              {projectStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {pendingChanges.length > 0
                ? `目前有 ${pendingChanges.length} 筆追加尚未完成業主確認。`
                : "目前沒有待確認追加。"}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案發包項目</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">項目</th>
                <th>工種</th>
                <th>負責人</th>
                <th>金額</th>
                <th>期限</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectSubcontracts.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 font-black">{item.item}</td>
                  <td>{item.trade}</td>
                  <td>{item.workerName}</td>
                  <td>NT${formatMoney(item.price)}</td>
                  <td>{item.dueDate}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
          {!projectSubcontracts.length && (
            <p className="py-4 text-sm text-slate-500">本案目前沒有發包項目。</p>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案批價紀錄</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">項目</th>
                <th>廠商</th>
                <th>金額</th>
                <th>狀態</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projectBids.map((bid) => (
                <tr key={bid.id}>
                  <td className="py-4">{bid.item}</td>
                  <td className="font-black">{bid.vendor}</td>
                  <td>NT${formatMoney(bid.amount)}</td>
                  <td>{bid.selected ? "採用" : "未採用"}</td>
                  <td>{bid.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!projectBids.length && (
            <p className="py-4 text-sm text-slate-500">本案目前沒有批價紀錄。</p>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案追加減項</h3>
        <div className="mt-4 grid gap-3">
          {projectChanges.map((order) => (
            <div key={order.id} className="rounded-xl bg-slate-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-black">
                    {order.type}｜{order.item}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {order.reason}｜NT${formatMoney(order.amount)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={order.status}
                    onChange={(event) => updateChangeStatus(order.id, event.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"
                  >
                    {changeStatuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                  <SmallButton onClick={() => copyOrder(order)}>
                    {copiedId === order.id ? "已複製" : "複製確認"}
                  </SmallButton>
                </div>
              </div>
            </div>
          ))}
          {!projectChanges.length && (
            <p className="text-sm text-slate-500">本案目前沒有追加減項。</p>
          )}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案任務</h3>
        <TaskList
          tasks={projectTasks}
          toggleTaskComplete={toggleTaskComplete}
          updateTaskReport={updateTaskReport}
          showWorker
        />
      </Card>
    </div>
  )
}

export default ProjectDetailPanel
