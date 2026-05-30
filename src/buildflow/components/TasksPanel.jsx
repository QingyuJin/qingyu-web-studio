import { useState } from "react"
import Card from "../shared/Card"
import SectionTitle from "../shared/SectionTitle"
import Status from "../shared/Status"
import SmallButton from "../shared/SmallButton"
import { includesKeyword } from "../utils/helpers"

function TasksPanel({ tasks, toggleTaskComplete, updateTaskReport, deleteTask }) {
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")
  const [workerFilter, setWorkerFilter] = useState("全部")
  const workers = Array.from(new Map(tasks.map((task) => [task.workerId || "", task.workerName || "未指派"]))).filter(([id]) => id !== "")

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = statusFilter === "全部" || task.status === statusFilter
    const matchWorker = workerFilter === "全部" || task.workerId === workerFilter
    const matchKeyword = includesKeyword(`${task.projectName} ${task.title} ${task.workerName} ${task.note} ${task.report}`, keyword)
    return matchStatus && matchWorker && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle title="任務管理" desc="查看所有師傅與使用者的任務狀態。" />
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">任務列表</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredTasks.length} / {tasks.length} 個任務</p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px_160px]">
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋案件 / 任務 / 回報" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              <option>全部</option>
              <option>待完成</option>
              <option>已完成</option>
            </select>
            <select value={workerFilter} onChange={(event) => setWorkerFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              <option>全部</option>
              {workers.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
            </select>
          </div>
        </div>
      </Card>
      <TaskList tasks={filteredTasks} toggleTaskComplete={toggleTaskComplete} updateTaskReport={updateTaskReport} deleteTask={deleteTask} showWorker showAdminActions />
    </div>
  )
}

function WorkerPanel({ worker, tasks, toggleTaskComplete, updateTaskReport }) {
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = statusFilter === "全部" || task.status === statusFilter
    const matchKeyword = includesKeyword(`${task.projectName} ${task.title} ${task.note} ${task.report}`, keyword)
    return matchStatus && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle title={`${worker?.name || "使用者"}的任務`} desc="使用者只能看到自己負責的項目，並回報完成或問題。" />
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600 shadow-sm">使用者視角不顯示批價、預算與完整案件資料，只保留任務、期限、備註與問題回報。</div>
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">我的任務</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredTasks.length} / {tasks.length} 個任務</p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px]">
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋案件 / 任務" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              <option>全部</option>
              <option>待完成</option>
              <option>已完成</option>
            </select>
          </div>
        </div>
      </Card>
      <TaskList tasks={filteredTasks} toggleTaskComplete={toggleTaskComplete} updateTaskReport={updateTaskReport} />
    </div>
  )
}

function TaskList({ tasks, toggleTaskComplete, updateTaskReport, deleteTask, showWorker = false, showAdminActions = false }) {
  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <Card key={task.id}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div><p className="text-sm font-bold text-slate-500">{task.projectName}</p><h3 className="mt-2 text-xl font-black">{task.title}</h3><p className="mt-2 text-sm text-slate-500">期限：{task.dueDate}{showWorker ? `｜負責人：${task.workerName}` : ""}</p><p className="mt-3 text-sm leading-7 text-slate-600">{task.note}</p></div>
            <Status>{task.status}</Status>
          </div>
          <textarea value={task.report} onChange={(event) => updateTaskReport(task.id, event.target.value)} placeholder="填寫備註或問題回報" className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500" rows={3} />
          <div className="mt-3 flex flex-wrap gap-2"><button onClick={() => toggleTaskComplete(task.id)} className={`rounded-xl px-4 py-3 text-sm font-black ${task.status === "已完成" ? "bg-slate-200 text-slate-700" : "bg-slate-950 text-white"}`}>{task.status === "已完成" ? "取消完成" : "標記完成"}</button>{showAdminActions && <SmallButton danger onClick={() => deleteTask(task.id)}>刪除任務</SmallButton>}</div>
        </Card>
      ))}
      {!tasks.length && <Card><p className="text-slate-500">目前沒有任務。</p></Card>}
    </div>
  )
}

export { WorkerPanel, TaskList }
export default TasksPanel
