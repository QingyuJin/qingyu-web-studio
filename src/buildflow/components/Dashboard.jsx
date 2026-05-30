import Card from "../shared/Card"
import Metric from "../shared/Metric"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import Status from "../shared/Status"
import { formatMoney } from "../utils/helpers"

function Dashboard({ metrics, projects, changeOrders, tasks, openProjectDetail }) {
  const redChanges = changeOrders.filter((item) => !item.confirmedByClient)

  return (
    <div className="grid gap-5">
      <SectionTitle title="管理者總覽" desc="查看案件、使用者、追加減項、待完成任務與工程風險。" />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-8">
        <Metric label="總案件" value={metrics.projectCount} />
        <Metric label="施工中" value={metrics.runningCount} />
        <Metric label="使用者" value={metrics.userCount} />
        <Metric label="待確認追加" value={metrics.waitingChangeCount} danger />
        <Metric label="待完成任務" value={metrics.taskTodoCount} />
        <Metric label="廠商數" value={metrics.vendorCount} />
        <Metric label="案件預算" value={`NT$${formatMoney(metrics.totalBudget)}`} />
        <Metric label="追加金額" value={`NT$${formatMoney(metrics.totalChangeAmount)}`} danger />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h3 className="text-xl font-black">最近案件</h3>
          <div className="mt-4 grid gap-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-black">{project.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{project.client}｜{project.type}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Status>{project.status}</Status>
                    <SmallButton onClick={() => openProjectDetail(project.id)}>查看案件</SmallButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">風險提醒</h3>
          <div className="mt-4 grid gap-3">
            {redChanges.map((item) => (
              <div key={item.id} className="rounded-xl bg-red-50 p-4">
                <p className="font-black text-red-700">{item.projectName}</p>
                <p className="mt-1 text-sm leading-6 text-red-700/80">{item.item} 尚未完成業主確認。</p>
              </div>
            ))}
            {tasks.filter((task) => task.status !== "已完成").slice(0, 3).map((task) => (
              <div key={task.id} className="rounded-xl bg-amber-50 p-4">
                <p className="font-black text-amber-700">{task.title}</p>
                <p className="mt-1 text-sm text-amber-700/80">負責人：{task.workerName}｜期限：{task.dueDate}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
