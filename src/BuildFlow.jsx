import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const today = new Date().toISOString().slice(0, 10)

const initialUsers = [
  { id: "u-admin", name: "管理者", role: "admin", phone: "09xx-000-000" },
  { id: "u-aming", name: "阿明師傅", role: "worker", phone: "09xx-123-456" },
  { id: "u-along", name: "阿龍師傅", role: "worker", phone: "09xx-456-789" },
  { id: "u-ming", name: "小明水電", role: "worker", phone: "09xx-888-666" },
]

const initialProjects = [
  {
    id: "p-001",
    name: "屏東住宅防水工程",
    client: "林先生",
    address: "屏東市住宅案",
    type: "防水 / 泥作",
    budget: 125000,
    status: "施工中",
    manager: "管理者",
    startDate: "2026-06-01",
    dueDate: "2026-06-18",
    note: "浴室與陽台防水，拆除後發現追加需求。",
  },
  {
    id: "p-002",
    name: "高雄店面整修",
    client: "陳小姐",
    address: "高雄市店面",
    type: "木作 / 油漆",
    budget: 238000,
    status: "待確認追加",
    manager: "管理者",
    startDate: "2026-06-06",
    dueDate: "2026-06-25",
    note: "業主追加天花板燈槽與牆面修補。",
  },
]

const initialSubcontracts = [
  {
    id: "s-001",
    projectId: "p-001",
    projectName: "屏東住宅防水工程",
    trade: "防水",
    item: "浴室牆面防水",
    qty: 1,
    unit: "式",
    price: 35000,
    workerId: "u-aming",
    workerName: "阿明師傅",
    status: "施工中",
    dueDate: "2026-06-15",
    note: "等業主確認追加範圍。",
  },
  {
    id: "s-002",
    projectId: "p-002",
    projectName: "高雄店面整修",
    trade: "木作",
    item: "展示牆與燈槽",
    qty: 1,
    unit: "式",
    price: 78000,
    workerId: "u-along",
    workerName: "阿龍師傅",
    status: "待確認",
    dueDate: "2026-06-20",
    note: "需先確認追加燈槽價格。",
  },
]

const initialBids = [
  {
    id: "b-001",
    subcontractId: "s-001",
    projectName: "屏東住宅防水工程",
    item: "浴室牆面防水",
    vendor: "阿明工程行",
    amount: 35000,
    selected: true,
    note: "熟悉案場，品質穩定。",
  },
  {
    id: "b-002",
    subcontractId: "s-001",
    projectName: "屏東住宅防水工程",
    item: "浴室牆面防水",
    vendor: "宏誠防水",
    amount: 32000,
    selected: false,
    note: "價格較低，但時間較晚。",
  },
]

const initialChangeOrders = [
  {
    id: "c-001",
    projectId: "p-001",
    projectName: "屏東住宅防水工程",
    type: "追加",
    item: "浴室牆面追加防水",
    reason: "拆除後發現原防水層失效。",
    amount: 12000,
    status: "待確認",
    confirmedByClient: false,
    date: "2026-06-12",
  },
  {
    id: "c-002",
    projectId: "p-002",
    projectName: "高雄店面整修",
    type: "追加",
    item: "天花板新增燈槽",
    reason: "業主臨時增加展示燈需求。",
    amount: 18000,
    status: "已傳 LINE",
    confirmedByClient: false,
    date: "2026-06-13",
  },
]

const initialVendors = [
  {
    id: "v-001",
    name: "阿明工程行",
    trade: "防水 / 泥作",
    phone: "09xx-123-456",
    area: "屏東 / 高雄",
    note: "防水細節穩，適合重要案場。",
  },
  {
    id: "v-002",
    name: "阿龍木作",
    trade: "木作",
    phone: "09xx-456-789",
    area: "高雄 / 屏東",
    note: "店面木作經驗多，需提前確認追加。",
  },
  {
    id: "v-003",
    name: "小明水電",
    trade: "水電",
    phone: "09xx-888-666",
    area: "屏東",
    note: "水電配合度高，適合浴室與廚房案。",
  },
]

const initialTasks = [
  {
    id: "t-001",
    projectId: "p-001",
    projectName: "屏東住宅防水工程",
    title: "完成浴室牆面防水第一道",
    workerId: "u-aming",
    workerName: "阿明師傅",
    status: "待完成",
    dueDate: "2026-06-15",
    note: "施工前先拍照。",
    report: "",
  },
  {
    id: "t-002",
    projectId: "p-002",
    projectName: "高雄店面整修",
    title: "確認展示牆尺寸與燈槽位置",
    workerId: "u-along",
    workerName: "阿龍師傅",
    status: "待完成",
    dueDate: "2026-06-16",
    note: "等業主最後尺寸。",
    report: "",
  },
]

const adminTabs = [
  { id: "dashboard", label: "總覽" },
  { id: "projects", label: "案件管理" },
  { id: "subcontracts", label: "發包項目" },
  { id: "bids", label: "批價紀錄" },
  { id: "changes", label: "追加減項" },
  { id: "vendors", label: "廠商資料" },
  { id: "tasks", label: "任務管理" },
  { id: "linebot", label: "LINE Bot" },
]

const workerTabs = [
  { id: "worker", label: "我的任務" },
  { id: "linebot", label: "LINE Bot" },
]

function BuildFlow() {
  const [viewRole, setViewRole] = useState("admin")
  const [activeWorkerId, setActiveWorkerId] = useState("u-aming")
  const [activeTab, setActiveTab] = useState("dashboard")

  const [projects, setProjects] = useState(initialProjects)
  const [subcontracts, setSubcontracts] = useState(initialSubcontracts)
  const [bids] = useState(initialBids)
  const [changeOrders, setChangeOrders] = useState(initialChangeOrders)
  const [vendors] = useState(initialVendors)
  const [tasks, setTasks] = useState(initialTasks)

  const currentWorker = initialUsers.find((user) => user.id === activeWorkerId)
  const tabs = viewRole === "admin" ? adminTabs : workerTabs

  const metrics = useMemo(() => {
    return {
      projectCount: projects.length,
      runningCount: projects.filter((item) => item.status === "施工中").length,
      waitingChangeCount: changeOrders.filter((item) => !item.confirmedByClient).length,
      taskTodoCount: tasks.filter((item) => item.status !== "已完成").length,
      totalBudget: projects.reduce((sum, item) => sum + Number(item.budget || 0), 0),
      totalChangeAmount: changeOrders.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    }
  }, [projects, changeOrders, tasks])

  const workerTasks = tasks.filter((task) => task.workerId === activeWorkerId)

  function addProject(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const newProject = {
      id: `p-${Date.now()}`,
      name: form.get("name"),
      client: form.get("client"),
      address: form.get("address"),
      type: form.get("type"),
      budget: Number(form.get("budget")) || 0,
      status: "估價中",
      manager: "管理者",
      startDate: form.get("startDate") || today,
      dueDate: form.get("dueDate") || today,
      note: form.get("note"),
    }

    setProjects((current) => [newProject, ...current])
    event.currentTarget.reset()
  }

  function addSubcontract(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const project = projects.find((item) => item.id === form.get("projectId"))
    const worker = initialUsers.find((item) => item.id === form.get("workerId"))

    const newItem = {
      id: `s-${Date.now()}`,
      projectId: project?.id || "",
      projectName: project?.name || "未指定案件",
      trade: form.get("trade"),
      item: form.get("item"),
      qty: Number(form.get("qty")) || 1,
      unit: form.get("unit") || "式",
      price: Number(form.get("price")) || 0,
      workerId: worker?.id || "",
      workerName: worker?.name || "未指定",
      status: "未發包",
      dueDate: form.get("dueDate") || today,
      note: form.get("note"),
    }

    const newTask = {
      id: `t-${Date.now()}`,
      projectId: newItem.projectId,
      projectName: newItem.projectName,
      title: `完成：${newItem.item}`,
      workerId: newItem.workerId,
      workerName: newItem.workerName,
      status: "待完成",
      dueDate: newItem.dueDate,
      note: newItem.note,
      report: "",
    }

    setSubcontracts((current) => [newItem, ...current])
    setTasks((current) => [newTask, ...current])
    event.currentTarget.reset()
  }

  function addChangeOrder(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const project = projects.find((item) => item.id === form.get("projectId"))

    const newItem = {
      id: `c-${Date.now()}`,
      projectId: project?.id || "",
      projectName: project?.name || "未指定案件",
      type: form.get("type"),
      item: form.get("item"),
      reason: form.get("reason"),
      amount: Number(form.get("amount")) || 0,
      status: "待確認",
      confirmedByClient: false,
      date: form.get("date") || today,
    }

    setChangeOrders((current) => [newItem, ...current])
    event.currentTarget.reset()
  }

  function updateProjectStatus(projectId, status) {
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId ? { ...project, status } : project
      )
    )
  }

  function updateChangeStatus(changeId, status) {
    setChangeOrders((current) =>
      current.map((item) =>
        item.id === changeId
          ? {
              ...item,
              status,
              confirmedByClient: status === "業主已確認" || status === "已施工" || status === "已收款",
            }
          : item
      )
    )
  }

  function completeTask(taskId) {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status: "已完成" } : task
      )
    )
  }

  function updateTaskReport(taskId, report) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, report } : task))
    )
  }

  function generateConfirmText(order) {
    return `【追加工程確認】

案件：${order.projectName}
項目：${order.item}
原因：${order.reason}
金額：NT$${formatMoney(order.amount)}

請業主確認後，我們再安排後續施工。`
  }

  function switchRole(role) {
    setViewRole(role)
    setActiveTab(role === "admin" ? "dashboard" : "worker")
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin" className="text-sm font-bold text-slate-500">
              ← 回管理入口
            </Link>
            <h1 className="mt-2 text-2xl font-black">BuildFlow</h1>
            <p className="text-sm text-slate-500">
              工程行發包、批價與追加減項管理系統 v1
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => switchRole("admin")}
              className={`rounded-xl px-4 py-2 text-sm font-black ${
                viewRole === "admin"
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              管理者視角
            </button>

            <button
              onClick={() => switchRole("worker")}
              className={`rounded-xl px-4 py-2 text-sm font-black ${
                viewRole === "worker"
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              使用者視角
            </button>

            {viewRole === "worker" && (
              <select
                value={activeWorkerId}
                onChange={(event) => setActiveWorkerId(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
              >
                {initialUsers
                  .filter((user) => user.role === "worker")
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-black text-slate-500">功能選單</p>

          <nav className="grid gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-bold ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            <p className="font-black text-slate-950">目前身份</p>
            <p className="mt-1">
              {viewRole === "admin" ? "管理者" : currentWorker?.name}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              這版是前端假資料，之後可接 Supabase Auth 與資料庫。
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          {activeTab === "dashboard" && (
            <Dashboard metrics={metrics} projects={projects} changeOrders={changeOrders} tasks={tasks} />
          )}

          {activeTab === "projects" && (
            <ProjectsPanel
              projects={projects}
              addProject={addProject}
              updateProjectStatus={updateProjectStatus}
            />
          )}

          {activeTab === "subcontracts" && (
            <SubcontractsPanel
              projects={projects}
              users={initialUsers}
              subcontracts={subcontracts}
              addSubcontract={addSubcontract}
            />
          )}

          {activeTab === "bids" && <BidsPanel bids={bids} />}

          {activeTab === "changes" && (
            <ChangeOrdersPanel
              projects={projects}
              changeOrders={changeOrders}
              addChangeOrder={addChangeOrder}
              updateChangeStatus={updateChangeStatus}
              generateConfirmText={generateConfirmText}
            />
          )}

          {activeTab === "vendors" && <VendorsPanel vendors={vendors} />}

          {activeTab === "tasks" && (
            <TasksPanel tasks={tasks} completeTask={completeTask} updateTaskReport={updateTaskReport} />
          )}

          {activeTab === "worker" && (
            <WorkerPanel
              worker={currentWorker}
              tasks={workerTasks}
              completeTask={completeTask}
              updateTaskReport={updateTaskReport}
            />
          )}

          {activeTab === "linebot" && (
            <LineBotPanel vendors={vendors} changeOrders={changeOrders} />
          )}
        </section>
      </section>
    </main>
  )
}

function Dashboard({ metrics, projects, changeOrders, tasks }) {
  const redChanges = changeOrders.filter((item) => !item.confirmedByClient)

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="管理者總覽"
        desc="快速查看案件、追加減項、待完成任務與工程風險。"
      />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Metric label="總案件" value={metrics.projectCount} />
        <Metric label="施工中" value={metrics.runningCount} />
        <Metric label="待確認追加" value={metrics.waitingChangeCount} danger />
        <Metric label="待完成任務" value={metrics.taskTodoCount} />
        <Metric label="案件預算" value={`NT$${formatMoney(metrics.totalBudget)}`} />
        <Metric label="追加金額" value={`NT$${formatMoney(metrics.totalChangeAmount)}`} danger />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h3 className="text-xl font-black">最近案件</h3>
          <div className="mt-4 grid gap-3">
            {projects.map((project) => (
              <div key={project.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-black">{project.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {project.client}｜{project.type}
                    </p>
                  </div>
                  <Status>{project.status}</Status>
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
                <p className="mt-1 text-sm leading-6 text-red-700/80">
                  {item.item} 尚未完成業主確認。
                </p>
              </div>
            ))}

            {tasks
              .filter((task) => task.status !== "已完成")
              .slice(0, 2)
              .map((task) => (
                <div key={task.id} className="rounded-xl bg-amber-50 p-4">
                  <p className="font-black text-amber-700">{task.title}</p>
                  <p className="mt-1 text-sm text-amber-700/80">
                    負責人：{task.workerName}｜期限：{task.dueDate}
                  </p>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function ProjectsPanel({ projects, addProject, updateProjectStatus }) {
  return (
    <div className="grid gap-5">
      <SectionTitle title="案件管理" desc="新增案件、查看狀態、調整工程進度。" />

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
        <h3 className="text-xl font-black">案件列表</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">案件</th>
                <th>業主</th>
                <th>類型</th>
                <th>預算</th>
                <th>期限</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="py-4 font-black">{project.name}</td>
                  <td>{project.client}</td>
                  <td>{project.type}</td>
                  <td>NT${formatMoney(project.budget)}</td>
                  <td>{project.dueDate}</td>
                  <td>
                    <select
                      value={project.status}
                      onChange={(event) => updateProjectStatus(project.id, event.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"
                    >
                      {["估價中", "已報價", "已發包", "施工中", "待確認追加", "完工", "待收款", "已結案"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

function SubcontractsPanel({ projects, users, subcontracts, addSubcontract }) {
  const workers = users.filter((user) => user.role === "worker")

  return (
    <div className="grid gap-5">
      <SectionTitle title="發包項目" desc="建立工種、項目、金額與負責師傅。" />

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

      <SimpleTable
        title="發包列表"
        headers={["案件", "項目", "工種", "負責人", "金額", "狀態", "期限"]}
        rows={subcontracts.map((item) => [
          item.projectName,
          item.item,
          item.trade,
          item.workerName,
          `NT$${formatMoney(item.price)}`,
          item.status,
          item.dueDate,
        ])}
      />
    </div>
  )
}

function BidsPanel({ bids }) {
  return (
    <div className="grid gap-5">
      <SectionTitle title="批價紀錄" desc="同一項目可比較不同廠商報價與選用原因。" />
      <SimpleTable
        title="報價比較"
        headers={["案件", "項目", "廠商", "金額", "是否採用", "備註"]}
        rows={bids.map((bid) => [
          bid.projectName,
          bid.item,
          bid.vendor,
          `NT$${formatMoney(bid.amount)}`,
          bid.selected ? "採用" : "未採用",
          bid.note,
        ])}
      />
    </div>
  )
}

function ChangeOrdersPanel({
  projects,
  changeOrders,
  addChangeOrder,
  updateChangeStatus,
  generateConfirmText,
}) {
  const [selectedOrder, setSelectedOrder] = useState(changeOrders[0]?.id || "")

  const currentOrder =
    changeOrders.find((item) => item.id === selectedOrder) || changeOrders[0]

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="追加減項"
        desc="記錄追加原因、金額、確認狀態，並產生業主確認文字。"
      />

      <Card>
        <h3 className="text-xl font-black">新增追加 / 減項</h3>
        <form onSubmit={addChangeOrder} className="mt-4 grid gap-3 md:grid-cols-2">
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
            <span className="text-sm font-bold text-slate-600">類型</span>
            <select name="type" className="rounded-xl border border-slate-200 px-4 py-3">
              <option>追加</option>
              <option>減項</option>
            </select>
          </label>

          <Input name="item" label="項目名稱" required />
          <Input name="amount" label="金額" type="number" />
          <Input name="date" label="提出日期" type="date" />
          <Input name="reason" label="原因" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增追加減項
          </button>
        </form>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <h3 className="text-xl font-black">追加減項列表</h3>
          <div className="mt-4 grid gap-3">
            {changeOrders.map((order) => (
              <div key={order.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-black">
                      {order.projectName}｜{order.item}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {order.reason}｜NT${formatMoney(order.amount)}
                    </p>
                  </div>

                  <select
                    value={order.status}
                    onChange={(event) => updateChangeStatus(order.id, event.target.value)}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold"
                  >
                    {["待確認", "已傳 LINE", "業主已確認", "已施工", "已收款", "取消"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">業主確認文字</h3>

          <select
            value={selectedOrder}
            onChange={(event) => setSelectedOrder(event.target.value)}
            className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
          >
            {changeOrders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.projectName}｜{order.item}
              </option>
            ))}
          </select>

          {currentOrder && (
            <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {generateConfirmText(currentOrder)}
            </pre>
          )}
        </Card>
      </div>
    </div>
  )
}

function VendorsPanel({ vendors }) {
  return (
    <div className="grid gap-5">
      <SectionTitle title="廠商資料" desc="集中管理師傅、工種、電話與合作備註。" />

      <div className="grid gap-4 md:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <p className="text-sm font-bold text-slate-500">{vendor.trade}</p>
            <h3 className="mt-2 text-xl font-black">{vendor.name}</h3>
            <p className="mt-3 font-black">{vendor.phone}</p>
            <p className="mt-2 text-sm text-slate-500">{vendor.area}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{vendor.note}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TasksPanel({ tasks, completeTask, updateTaskReport }) {
  return (
    <div className="grid gap-5">
      <SectionTitle title="任務管理" desc="查看所有師傅與使用者的任務狀態。" />

      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        updateTaskReport={updateTaskReport}
        showWorker
      />
    </div>
  )
}

function WorkerPanel({ worker, tasks, completeTask, updateTaskReport }) {
  return (
    <div className="grid gap-5">
      <SectionTitle
        title={`${worker?.name || "使用者"}的任務`}
        desc="使用者只能看到自己負責的項目，並回報完成或問題。"
      />

      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        updateTaskReport={updateTaskReport}
      />
    </div>
  )
}

function TaskList({ tasks, completeTask, updateTaskReport, showWorker = false }) {
  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <Card key={task.id}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">{task.projectName}</p>
              <h3 className="mt-2 text-xl font-black">{task.title}</h3>
              <p className="mt-2 text-sm text-slate-500">
                期限：{task.dueDate}
                {showWorker ? `｜負責人：${task.workerName}` : ""}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{task.note}</p>
            </div>

            <Status>{task.status}</Status>
          </div>

          <textarea
            value={task.report}
            onChange={(event) => updateTaskReport(task.id, event.target.value)}
            placeholder="填寫備註或問題回報"
            className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            rows={3}
          />

          <button
            onClick={() => completeTask(task.id)}
            disabled={task.status === "已完成"}
            className="mt-3 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:bg-slate-300"
          >
            {task.status === "已完成" ? "已完成" : "標記完成"}
          </button>
        </Card>
      ))}

      {!tasks.length && (
        <Card>
          <p className="text-slate-500">目前沒有任務。</p>
        </Card>
      )}
    </div>
  )
}

function LineBotPanel({ vendors, changeOrders }) {
  const examples = [
    {
      user: "查案件 屏東住宅",
      bot: "屏東住宅防水工程｜狀態：施工中｜待確認追加：浴室牆面追加防水。",
    },
    {
      user: "查廠商 阿明",
      bot: `${vendors[0].name}｜${vendors[0].trade}｜${vendors[0].phone}｜${vendors[0].area}`,
    },
    {
      user: "追加 浴室牆面防水 12000",
      bot: "已建立追加項目：浴室牆面防水｜NT$12,000。是否產生給業主的確認文字？",
    },
    {
      user: "今日任務",
      bot: "你今天有 2 個待完成項目：浴室牆面防水第一道、現場施工前照片。",
    },
  ]

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="LINE Bot 模擬"
        desc="未來可串接 LINE Messaging API，讓現場用 LINE 查案件、新增追加、查廠商與回報任務。"
      />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h3 className="text-xl font-black">可支援指令</h3>
          <div className="mt-4 grid gap-3">
            {["查案件", "查廠商", "新增追加", "今日任務", "產生確認文字", "提醒收款"].map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 p-4 font-bold">
                {item}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">對話範例</h3>
          <div className="mt-4 grid gap-4">
            {examples.map((example) => (
              <div key={example.user} className="grid gap-2">
                <div className="ml-auto max-w-[85%] rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold text-white">
                  {example.user}
                </div>
                <div className="max-w-[90%] rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold leading-7 text-slate-700">
                  {example.bot}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            目前為模擬流程。之後接真 API 時，會從 Supabase 查詢案件、廠商、任務與追加減項資料。
          </div>
        </Card>
      </div>
    </div>
  )
}

function SimpleTable({ title, headers, rows }) {
  return (
    <Card>
      <h3 className="text-xl font-black">{title}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-slate-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="py-4 pr-5">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function SectionTitle({ title, desc }) {
  return (
    <div>
      <h2 className="text-3xl font-black tracking-[-0.04em]">{title}</h2>
      {desc && <p className="mt-2 leading-7 text-slate-600">{desc}</p>}
    </div>
  )
}

function Card({ children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </section>
  )
}

function Metric({ label, value, danger = false }) {
  return (
    <Card>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-3 text-2xl font-black ${danger ? "text-red-600" : "text-slate-950"}`}>
        {value}
      </p>
    </Card>
  )
}

function Input({ label, name, type = "text", placeholder = "", required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
      />
    </label>
  )
}

function Status({ children }) {
  return (
    <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
      {children}
    </span>
  )
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-TW").format(Number(value || 0))
}

export default BuildFlow