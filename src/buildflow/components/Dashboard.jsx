import Card from "../shared/Card"
import Metric from "../shared/Metric"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import Status from "../shared/Status"
import { formatMoney } from "../utils/helpers"

function Dashboard({ metrics, projects, changeOrders, tasks, openProjectDetail, goToTab }) {
  const waitingChanges = changeOrders.filter((item) => !item.confirmedByClient)
  const openTasks = tasks.filter((task) => task.status !== "已完成").slice(0, 4)
  const runningProjects = projects.filter((project) => project.status === "施工中")
  const priorityCards = [
    {
      title: "先收口",
      value: `${metrics.quotePendingCount} 張`,
      desc: "報價待業主確認",
      action: "看報價",
      onClick: () => goToTab("quoteDrafts"),
      danger: metrics.quotePendingCount > 0,
    },
    {
      title: "先追工",
      value: `${metrics.taskTodoCount} 件`,
      desc: "師傅任務未完成",
      action: "看任務",
      onClick: () => goToTab("tasks"),
      danger: metrics.taskTodoCount > 0,
    },
    {
      title: "先看錢",
      value: `NT$${formatMoney(metrics.grossProfit)}`,
      desc: "粗估毛利",
      action: "看案件",
      onClick: () => goToTab("projects"),
      danger: metrics.grossProfit < 0,
    },
  ]

  return (
    <div className="grid gap-5">
      <SectionTitle title="今日總覽" desc="先處理會影響收款的事" />

      <div className="grid gap-4 lg:grid-cols-3">
        {priorityCards.map((item) => (
          <Card key={item.title}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-500">{item.title}</p>
                <p
                  className={`mt-3 text-3xl font-black ${
                    item.danger ? "text-rose-700" : "text-slate-950"
                  }`}
                >
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-500">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={item.onClick}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              >
                {item.action}
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="施工中" value={metrics.runningCount} />
        <Metric label="預算" value={`NT$${formatMoney(metrics.totalBudget)}`} />
        <Metric label="成本" value={`NT$${formatMoney(metrics.totalCost)}`} />
        <Metric label="追加待確認" value={metrics.waitingChangeCount} danger />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-black">施工案件</h3>
              <p className="mt-1 text-sm text-slate-500">點開看內容</p>
            </div>
            <Status>{runningProjects.length || projects.length} 案</Status>
          </div>
          <div className="mt-4 grid gap-3">
            {(runningProjects.length ? runningProjects : projects).map((project) => (
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
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black">待處理</h3>
              <p className="mt-1 text-sm text-slate-500">追加與任務優先</p>
            </div>
            <button
              type="button"
              onClick={() => goToTab("linebot")}
              className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white hover:bg-slate-800"
            >
              測 LINE
            </button>
          </div>
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
                目前沒有待處理事項
              </p>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
