import Card from "../shared/Card"
import Metric from "../shared/Metric"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import Status from "../shared/Status"
import { formatMoney } from "../utils/helpers"

function Dashboard({ metrics, projects, changeOrders, tasks, openProjectDetail }) {
  const waitingChanges = changeOrders.filter((item) => !item.confirmedByClient)
  const openTasks = tasks.filter((task) => task.status !== "已完成").slice(0, 4)

  return (
    <div className="grid gap-5">
      <SectionTitle title="總覽" desc="今天要看的事。" />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        <Metric label="案件" value={metrics.projectCount} />
        <Metric label="施工" value={metrics.runningCount} />
        <Metric label="報價" value={metrics.quotePendingCount} danger />
        <Metric label="待辦" value={metrics.taskTodoCount} />
        <Metric label="毛利" value={`NT$${formatMoney(metrics.grossProfit)}`} />
        <Metric label="預算" value={`NT$${formatMoney(metrics.totalBudget)}`} />
        <Metric label="成本" value={`NT$${formatMoney(metrics.totalCost)}`} />
        <Metric label="追加" value={metrics.waitingChangeCount} danger />
        <Metric label="廠商" value={metrics.vendorCount} />
        <Metric label="人員" value={metrics.userCount} />
        <Metric label="增減" value={`NT$${formatMoney(metrics.totalChangeAmount)}`} danger />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-black">案件</h3>
            <span className="text-sm font-bold text-slate-500">點開看細節</span>
          </div>
          <div className="mt-4 grid gap-3">
            {projects.map((project) => (
              <details key={project.id} className="minimal-detail bg-slate-50">
                <summary>
                  <span>{project.name}</span>
                  <Status>{project.status}</Status>
                </summary>
                <div className="minimal-detail-body">
                  <p className="text-sm font-bold leading-7 text-slate-600">
                    {project.client}｜{project.type}｜{project.address}
                  </p>
                  <SmallButton onClick={() => openProjectDetail(project.id)}>查看案件</SmallButton>
                </div>
              </details>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">待處理</h3>
          <div className="mt-4 grid gap-3">
            {waitingChanges.map((item) => (
              <div key={item.id} className="rounded-xl border border-rose-100 bg-rose-50 p-4">
                <p className="font-black text-rose-700">{item.projectName}</p>
                <p className="mt-1 text-sm font-bold text-rose-700/80">{item.item} 待確認</p>
              </div>
            ))}
            {openTasks.map((task) => (
              <div key={task.id} className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="font-black text-amber-800">{task.title}</p>
                <p className="mt-1 text-sm font-bold text-amber-700/80">
                  {task.workerName}｜{task.dueDate}
                </p>
              </div>
            ))}
            {!waitingChanges.length && !openTasks.length ? (
              <p className="rounded-xl bg-slate-50 p-4 text-sm font-bold text-slate-500">
                目前沒有待處理事項。
              </p>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
