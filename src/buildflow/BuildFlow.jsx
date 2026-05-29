import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import {
  STORAGE_KEY,
  adminTabs,
  workerTabs,
  projectStatuses,
  subcontractStatuses,
  changeStatuses,
} from "./data/demoData"
import { SESSION_KEY, loadInitialSession } from "./auth/session"
import {
  today,
  includesKeyword,
  formatMoney,
  createId,
  textValue,
  numberValue,
  cloneDemoData,
  copyByTextarea,
  loadInitialData,
} from "./utils/helpers"
import Card from "./shared/Card"
import Input from "./shared/Input"
import Metric from "./shared/Metric"
import Status from "./shared/Status"
import SmallButton from "./shared/SmallButton"
import SectionTitle from "./shared/SectionTitle"
import Info from "./shared/Info"
import BuildFlowLogin from "./components/BuildFlowLogin"
import Dashboard from "./components/DashboardPanel"
import LineBotPanel from "./components/LineBotPanel"

function BuildFlow() {
  const [data, setData] = useState(loadInitialData)
  const [session, setSession] = useState(loadInitialSession)
  const [activeTab, setActiveTab] = useState(session?.role === "worker" ? "worker" : "dashboard")
  const [activeProjectId, setActiveProjectId] = useState("")
  const [savedAt, setSavedAt] = useState("")

  const { users, projects, subcontracts, bids, changeOrders, vendors, tasks } = data

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSavedAt(new Date().toLocaleTimeString("zh-TW", { hour12: false }))
  }, [data])

  useEffect(() => {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else localStorage.removeItem(SESSION_KEY)
  }, [session])

  const isAdmin = session?.role === "admin"
  const isWorker = session?.role === "worker"
  const tabs = isAdmin ? adminTabs : workerTabs
  const activeProject = projects.find((project) => project.id === activeProjectId)

  const metrics = useMemo(() => {
    return {
      projectCount: projects.length,
      runningCount: projects.filter((item) => item.status === "施工中").length,
      waitingChangeCount: changeOrders.filter((item) => !item.confirmedByClient).length,
      taskTodoCount: tasks.filter((item) => item.status !== "已完成").length,
      totalBudget: projects.reduce((sum, item) => sum + Number(item.budget || 0), 0),
      totalChangeAmount: changeOrders.reduce((sum, item) => sum + Number(item.amount || 0), 0),
      vendorCount: vendors.length,
      userCount: users.length,
    }
  }, [projects, changeOrders, tasks, vendors, users])

  const workerTasks = tasks.filter((task) => task.workerId === session?.id)

  function handleLogin(username, password) {
    const user = users.find(
      (item) => item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password
    )

    if (!user) return { ok: false, message: "帳號或密碼錯誤" }

    const nextSession = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      phone: user.phone,
      loginAt: new Date().toISOString(),
    }

    setSession(nextSession)
    setActiveProjectId("")
    setActiveTab(user.role === "admin" ? "dashboard" : "worker")
    return { ok: true }
  }

  function handleLogout() {
    setSession(null)
    setActiveProjectId("")
    setActiveTab("dashboard")
  }

  function resetDemoData() {
    const confirmed = window.confirm("確定要重置 BuildFlow Demo 資料嗎？目前新增的資料會被清除。")
    if (!confirmed) return
    localStorage.removeItem(STORAGE_KEY)
    setActiveProjectId("")
    setActiveTab(isAdmin ? "dashboard" : "worker")
    setData(cloneDemoData())
  }

  function openProjectDetail(projectId) {
    if (!isAdmin) return
    setActiveProjectId(projectId)
    setActiveTab("projectDetail")
  }

  function closeProjectDetail() {
    setActiveProjectId("")
    setActiveTab("projects")
  }

  function addUser(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = textValue(form, "username")

    if (!username) {
      window.alert("請輸入帳號。")
      return
    }

    const exists = users.some((user) => user.username.toLowerCase() === username.toLowerCase())
    if (exists) {
      window.alert("這個帳號已經存在，請換一個帳號。")
      return
    }

    const newUser = {
      id: createId("u"),
      username,
      password: textValue(form, "password") || "1234",
      name: textValue(form, "name") || username,
      role: textValue(form, "role") || "worker",
      phone: textValue(form, "phone"),
    }

    setData((current) => ({ ...current, users: [newUser, ...current.users] }))
    event.currentTarget.reset()
  }

  function editUser(user) {
    const name = window.prompt("姓名", user.name)
    if (name === null) return
    const phone = window.prompt("電話", user.phone)
    if (phone === null) return
    const password = window.prompt("密碼", user.password)
    if (password === null) return

    setData((current) => ({
      ...current,
      users: current.users.map((item) =>
        item.id === user.id
          ? { ...item, name: name.trim() || item.name, phone, password: password || item.password }
          : item
      ),
      subcontracts: current.subcontracts.map((item) =>
        item.workerId === user.id ? { ...item, workerName: name.trim() || user.name } : item
      ),
      tasks: current.tasks.map((item) =>
        item.workerId === user.id ? { ...item, workerName: name.trim() || user.name } : item
      ),
    }))

    if (session?.id === user.id) {
      setSession((current) => current ? { ...current, name: name.trim() || current.name, phone } : current)
    }
  }

  function deleteUser(userId) {
    const user = users.find((item) => item.id === userId)
    if (!user) return

    if (user.id === session?.id) {
      window.alert("不能刪除目前登入中的帳號。")
      return
    }

    if (user.role === "admin") {
      window.alert("Demo 版不允許刪除管理者帳號，避免系統無法登入。")
      return
    }

    const relatedTasks = tasks.filter((task) => task.workerId === user.id).length
    const confirmed = window.confirm(
      `確定刪除「${user.name}」嗎？相關 ${relatedTasks} 個任務會改成未指派。`
    )
    if (!confirmed) return

    setData((current) => ({
      ...current,
      users: current.users.filter((item) => item.id !== userId),
      subcontracts: current.subcontracts.map((item) =>
        item.workerId === userId ? { ...item, workerId: "", workerName: "未指派" } : item
      ),
      tasks: current.tasks.map((task) =>
        task.workerId === userId ? { ...task, workerId: "", workerName: "未指派" } : task
      ),
    }))
  }

  function addProject(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newProject = {
      id: createId("p"),
      name: textValue(form, "name"),
      client: textValue(form, "client"),
      address: textValue(form, "address"),
      type: textValue(form, "type"),
      budget: numberValue(form, "budget"),
      status: "估價中",
      manager: session?.name || "管理者",
      startDate: textValue(form, "startDate") || today,
      dueDate: textValue(form, "dueDate") || today,
      note: textValue(form, "note"),
    }
    setData((current) => ({ ...current, projects: [newProject, ...current.projects] }))
    event.currentTarget.reset()
  }

  function editProject(project) {
    const name = window.prompt("案件名稱", project.name)
    if (name === null) return
    const client = window.prompt("業主名稱", project.client)
    if (client === null) return
    const budgetInput = window.prompt("預算", String(project.budget))
    if (budgetInput === null) return
    const note = window.prompt("備註", project.note)
    if (note === null) return
    const nextName = name.trim() || project.name

    setData((current) => ({
      ...current,
      projects: current.projects.map((item) => item.id === project.id ? { ...item, name: nextName, client: client.trim() || item.client, budget: Number(budgetInput) || 0, note } : item),
      subcontracts: current.subcontracts.map((item) => item.projectId === project.id ? { ...item, projectName: nextName } : item),
      bids: current.bids.map((item) => item.projectId === project.id ? { ...item, projectName: nextName } : item),
      changeOrders: current.changeOrders.map((item) => item.projectId === project.id ? { ...item, projectName: nextName } : item),
      tasks: current.tasks.map((item) => item.projectId === project.id ? { ...item, projectName: nextName } : item),
    }))
  }

  function deleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId)
    const confirmed = window.confirm(`確定刪除「${project?.name || "這個案件"}」嗎？相關發包、批價、追加減項、任務也會一起移除。`)
    if (!confirmed) return
    const subcontractIds = subcontracts.filter((item) => item.projectId === projectId).map((item) => item.id)

    setData((current) => ({
      ...current,
      projects: current.projects.filter((item) => item.id !== projectId),
      subcontracts: current.subcontracts.filter((item) => item.projectId !== projectId),
      bids: current.bids.filter((item) => item.projectId !== projectId && !subcontractIds.includes(item.subcontractId)),
      changeOrders: current.changeOrders.filter((item) => item.projectId !== projectId),
      tasks: current.tasks.filter((item) => item.projectId !== projectId),
    }))

    if (activeProjectId === projectId) {
      setActiveProjectId("")
      setActiveTab("projects")
    }
  }

  function updateProjectStatus(projectId, status) {
    setData((current) => ({ ...current, projects: current.projects.map((project) => project.id === projectId ? { ...project, status } : project) }))
  }

  function addSubcontract(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const project = projects.find((item) => item.id === textValue(form, "projectId"))
    const worker = users.find((item) => item.id === textValue(form, "workerId"))

    const newItem = {
      id: createId("s"),
      projectId: project?.id || "",
      projectName: project?.name || "未指定案件",
      trade: textValue(form, "trade"),
      item: textValue(form, "item"),
      qty: numberValue(form, "qty") || 1,
      unit: textValue(form, "unit") || "式",
      price: numberValue(form, "price"),
      workerId: worker?.id || "",
      workerName: worker?.name || "未指派",
      status: "未發包",
      dueDate: textValue(form, "dueDate") || today,
      note: textValue(form, "note"),
    }

    const newTask = {
      id: createId("t"),
      projectId: newItem.projectId,
      subcontractId: newItem.id,
      projectName: newItem.projectName,
      title: `完成：${newItem.item}`,
      workerId: newItem.workerId,
      workerName: newItem.workerName,
      status: "待完成",
      dueDate: newItem.dueDate,
      note: newItem.note,
      report: "",
    }

    setData((current) => ({ ...current, subcontracts: [newItem, ...current.subcontracts], tasks: [newTask, ...current.tasks] }))
    event.currentTarget.reset()
  }

  function editSubcontract(subcontract) {
    const item = window.prompt("發包項目", subcontract.item)
    if (item === null) return
    const priceInput = window.prompt("金額", String(subcontract.price))
    if (priceInput === null) return
    const note = window.prompt("備註", subcontract.note)
    if (note === null) return
    const nextItem = item.trim() || subcontract.item

    setData((current) => ({
      ...current,
      subcontracts: current.subcontracts.map((target) => target.id === subcontract.id ? { ...target, item: nextItem, price: Number(priceInput) || 0, note } : target),
      bids: current.bids.map((bid) => bid.subcontractId === subcontract.id ? { ...bid, item: nextItem } : bid),
      tasks: current.tasks.map((task) => task.subcontractId === subcontract.id ? { ...task, title: `完成：${nextItem}`, note } : task),
    }))
  }

  function deleteSubcontract(subcontractId) {
    const subcontract = subcontracts.find((item) => item.id === subcontractId)
    const confirmed = window.confirm(`確定刪除「${subcontract?.item || "這個發包項目"}」嗎？相關批價與任務也會一起移除。`)
    if (!confirmed) return

    setData((current) => ({
      ...current,
      subcontracts: current.subcontracts.filter((item) => item.id !== subcontractId),
      bids: current.bids.filter((item) => item.subcontractId !== subcontractId),
      tasks: current.tasks.filter((item) => item.subcontractId !== subcontractId),
    }))
  }

  function updateSubcontractStatus(subcontractId, status) {
    setData((current) => ({ ...current, subcontracts: current.subcontracts.map((item) => item.id === subcontractId ? { ...item, status } : item) }))
  }

  function addBid(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const subcontract = subcontracts.find((item) => item.id === textValue(form, "subcontractId"))
    const selected = textValue(form, "selected") === "yes"

    const newBid = {
      id: createId("b"),
      projectId: subcontract?.projectId || "",
      subcontractId: subcontract?.id || "",
      projectName: subcontract?.projectName || "未指定案件",
      item: subcontract?.item || "未指定項目",
      vendor: textValue(form, "vendor"),
      amount: numberValue(form, "amount"),
      selected,
      note: textValue(form, "note"),
    }

    setData((current) => ({
      ...current,
      bids: [
        newBid,
        ...current.bids.map((bid) => selected && bid.subcontractId === newBid.subcontractId ? { ...bid, selected: false } : bid),
      ],
    }))
    event.currentTarget.reset()
  }

  function deleteBid(bidId) {
    if (!window.confirm("確定刪除這筆批價紀錄嗎？")) return
    setData((current) => ({ ...current, bids: current.bids.filter((item) => item.id !== bidId) }))
  }

  function selectBid(bidId) {
    const target = bids.find((item) => item.id === bidId)
    if (!target) return
    setData((current) => ({
      ...current,
      bids: current.bids.map((bid) => bid.subcontractId === target.subcontractId ? { ...bid, selected: bid.id === bidId } : bid),
    }))
  }

  function addChangeOrder(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const project = projects.find((item) => item.id === textValue(form, "projectId"))
    const newItem = {
      id: createId("c"),
      projectId: project?.id || "",
      projectName: project?.name || "未指定案件",
      type: textValue(form, "type"),
      item: textValue(form, "item"),
      reason: textValue(form, "reason"),
      amount: numberValue(form, "amount"),
      status: "待確認",
      confirmedByClient: false,
      date: textValue(form, "date") || today,
    }
    setData((current) => ({ ...current, changeOrders: [newItem, ...current.changeOrders] }))
    event.currentTarget.reset()
  }

  function editChangeOrder(order) {
    const item = window.prompt("追加 / 減項名稱", order.item)
    if (item === null) return
    const amountInput = window.prompt("金額", String(order.amount))
    if (amountInput === null) return
    const reason = window.prompt("原因", order.reason)
    if (reason === null) return

    setData((current) => ({
      ...current,
      changeOrders: current.changeOrders.map((target) => target.id === order.id ? { ...target, item: item.trim() || target.item, amount: Number(amountInput) || 0, reason } : target),
    }))
  }

  function deleteChangeOrder(orderId) {
    if (!window.confirm("確定刪除這筆追加 / 減項紀錄嗎？")) return
    setData((current) => ({ ...current, changeOrders: current.changeOrders.filter((item) => item.id !== orderId) }))
  }

  function updateChangeStatus(changeId, status) {
    setData((current) => ({
      ...current,
      changeOrders: current.changeOrders.map((item) => item.id === changeId ? { ...item, status, confirmedByClient: ["業主已確認", "已施工", "已收款"].includes(status) } : item),
    }))
  }

  function addVendor(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const newVendor = {
      id: createId("v"),
      name: textValue(form, "name"),
      trade: textValue(form, "trade"),
      phone: textValue(form, "phone"),
      area: textValue(form, "area"),
      note: textValue(form, "note"),
    }
    setData((current) => ({ ...current, vendors: [newVendor, ...current.vendors] }))
    event.currentTarget.reset()
  }

  function editVendor(vendor) {
    const phone = window.prompt("電話", vendor.phone)
    if (phone === null) return
    const note = window.prompt("備註", vendor.note)
    if (note === null) return
    setData((current) => ({ ...current, vendors: current.vendors.map((item) => item.id === vendor.id ? { ...item, phone, note } : item) }))
  }

  function deleteVendor(vendorId) {
    if (!window.confirm("確定刪除這筆廠商資料嗎？")) return
    setData((current) => ({ ...current, vendors: current.vendors.filter((item) => item.id !== vendorId) }))
  }

  function toggleTaskComplete(taskId) {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) => task.id === taskId ? { ...task, status: task.status === "已完成" ? "待完成" : "已完成" } : task),
    }))
  }

  function updateTaskReport(taskId, report) {
    setData((current) => ({ ...current, tasks: current.tasks.map((task) => task.id === taskId ? { ...task, report } : task) }))
  }

  function deleteTask(taskId) {
    if (!window.confirm("確定刪除這個任務嗎？")) return
    setData((current) => ({ ...current, tasks: current.tasks.filter((task) => task.id !== taskId) }))
  }

  function generateConfirmText(order) {
    return `【追加工程確認】\n\n案件：${order.projectName}\n類型：${order.type}\n項目：${order.item}\n原因：${order.reason}\n金額：NT$${formatMoney(order.amount)}\n\n請業主確認後，我們再安排後續施工。`
  }

  if (!session) return <BuildFlowLogin users={users} onLogin={handleLogin} />

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin" className="text-sm font-bold text-slate-500">← 回管理入口</Link>
            <h1 className="mt-2 text-2xl font-black">BuildFlow</h1>
            <p className="text-sm text-slate-500">工程行發包、批價與追加減項管理系統 v1.5</p>
            <p className="mt-1 text-xs text-slate-400">
              登入身份：{session.name}｜{session.role === "admin" ? "管理者" : "使用者"}｜最後保存：{savedAt || "尚未保存"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {isAdmin && (
              <button onClick={resetDemoData} className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-600">
                重置 Demo
              </button>
            )}
            <button onClick={handleLogout} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white">登出</button>
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
                onClick={() => {
                  setActiveProjectId("")
                  setActiveTab(tab.id)
                }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-bold ${activeTab === tab.id ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
              >
                {tab.label}
              </button>
            ))}
            {activeTab === "projectDetail" && isAdmin && (
              <button className="rounded-xl bg-slate-950 px-4 py-3 text-left text-sm font-bold text-white">案件詳情</button>
            )}
          </nav>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            <p className="font-black text-slate-950">目前身份</p>
            <p className="mt-1">{session.name}</p>
            <p className="mt-3 text-xs text-slate-400">
              {isAdmin ? "管理者可看金額、批價、追加減項與所有任務。" : "使用者只看自己的任務與回報，不顯示金額與批價。"}
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          {activeTab === "dashboard" && isAdmin && (
            <Dashboard metrics={metrics} projects={projects} changeOrders={changeOrders} tasks={tasks} openProjectDetail={openProjectDetail} />
          )}

          {activeTab === "projects" && isAdmin && (
            <ProjectsPanel projects={projects} addProject={addProject} editProject={editProject} deleteProject={deleteProject} updateProjectStatus={updateProjectStatus} openProjectDetail={openProjectDetail} />
          )}

          {activeTab === "projectDetail" && isAdmin && (
            <ProjectDetailPanel project={activeProject} subcontracts={subcontracts} bids={bids} changeOrders={changeOrders} tasks={tasks} updateProjectStatus={updateProjectStatus} updateSubcontractStatus={updateSubcontractStatus} updateChangeStatus={updateChangeStatus} toggleTaskComplete={toggleTaskComplete} updateTaskReport={updateTaskReport} generateConfirmText={generateConfirmText} onBack={closeProjectDetail} />
          )}

          {activeTab === "subcontracts" && isAdmin && (
            <SubcontractsPanel projects={projects} users={users} subcontracts={subcontracts} addSubcontract={addSubcontract} editSubcontract={editSubcontract} deleteSubcontract={deleteSubcontract} updateSubcontractStatus={updateSubcontractStatus} openProjectDetail={openProjectDetail} />
          )}

          {activeTab === "bids" && isAdmin && (
            <BidsPanel bids={bids} subcontracts={subcontracts} addBid={addBid} deleteBid={deleteBid} selectBid={selectBid} />
          )}

          {activeTab === "changes" && isAdmin && (
            <ChangeOrdersPanel projects={projects} changeOrders={changeOrders} addChangeOrder={addChangeOrder} editChangeOrder={editChangeOrder} deleteChangeOrder={deleteChangeOrder} updateChangeStatus={updateChangeStatus} generateConfirmText={generateConfirmText} />
          )}

          {activeTab === "vendors" && isAdmin && (
            <VendorsPanel vendors={vendors} addVendor={addVendor} editVendor={editVendor} deleteVendor={deleteVendor} />
          )}

          {activeTab === "users" && isAdmin && (
            <UsersPanel users={users} tasks={tasks} subcontracts={subcontracts} currentUserId={session.id} addUser={addUser} editUser={editUser} deleteUser={deleteUser} />
          )}

          {activeTab === "tasks" && isAdmin && (
            <TasksPanel tasks={tasks} toggleTaskComplete={toggleTaskComplete} updateTaskReport={updateTaskReport} deleteTask={deleteTask} />
          )}

          {activeTab === "worker" && isWorker && (
            <WorkerPanel worker={session} tasks={workerTasks} toggleTaskComplete={toggleTaskComplete} updateTaskReport={updateTaskReport} />
          )}

          {activeTab === "linebot" && (
            <LineBotPanel vendors={vendors} changeOrders={isAdmin ? changeOrders : []} tasks={isAdmin ? tasks : workerTasks} session={session} />
          )}
        </section>
      </section>
    </main>
  )
}

function UsersPanel({ users, tasks, subcontracts, currentUserId, addUser, editUser, deleteUser }) {
  const [keyword, setKeyword] = useState("")
  const [roleFilter, setRoleFilter] = useState("全部")

  function taskCount(userId) {
    return tasks.filter((task) => task.workerId === userId).length
  }

  function subcontractCount(userId) {
    return subcontracts.filter((item) => item.workerId === userId).length
  }

  const filteredUsers = users.filter((user) => {
    const matchRole = roleFilter === "全部" || user.role === roleFilter
    const matchKeyword = includesKeyword(
      `${user.name} ${user.username} ${user.phone} ${user.role}`,
      keyword
    )
    return matchRole && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle title="使用者管理" desc="管理者可以新增師傅帳號，新增後可直接登入，並可被指派發包項目與任務。" />

      <Card>
        <h3 className="text-xl font-black">新增使用者</h3>
        <form onSubmit={addUser} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" label="姓名" required />
          <Input name="username" label="帳號" required />
          <Input name="password" label="密碼" placeholder="預設可用 1234" />
          <Input name="phone" label="電話" />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">角色</span>
            <select name="role" className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="worker">worker 使用者 / 師傅</option>
              <option value="admin">admin 管理者</option>
            </select>
          </label>
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增使用者</button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">使用者列表</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredUsers.length} / {users.length} 位使用者</p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px]">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜尋姓名 / 帳號 / 電話"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              <option>全部</option>
              <option value="admin">admin</option>
              <option value="worker">worker</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">姓名</th>
                <th>帳號</th>
                <th>密碼</th>
                <th>角色</th>
                <th>電話</th>
                <th>發包數</th>
                <th>任務數</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-4 font-black">{user.name}{user.id === currentUserId ? "（目前登入）" : ""}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>{subcontractCount(user.id)}</td>
                  <td>{taskCount(user.id)}</td>
                  <td>
                    <div className="flex gap-2">
                      <SmallButton onClick={() => editUser(user)}>編輯</SmallButton>
                      <SmallButton danger onClick={() => deleteUser(user.id)}>刪除</SmallButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredUsers.length && <p className="py-4 text-sm text-slate-500">沒有符合條件的使用者。</p>}
        </div>
      </Card>
    </div>
  )
}
function ProjectDetailPanel({ project, subcontracts, bids, changeOrders, tasks, updateProjectStatus, updateSubcontractStatus, updateChangeStatus, toggleTaskComplete, updateTaskReport, generateConfirmText, onBack }) {
  const [copiedId, setCopiedId] = useState("")

  if (!project) {
    return (
      <div className="grid gap-5">
        <SectionTitle title="找不到案件" desc="這個案件可能已經被刪除。" />
        <button onClick={onBack} className="w-fit rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">回案件列表</button>
      </div>
    )
  }

  const projectSubcontracts = subcontracts.filter((item) => item.projectId === project.id)
  const projectBids = bids.filter((item) => item.projectId === project.id)
  const projectChanges = changeOrders.filter((item) => item.projectId === project.id)
  const projectTasks = tasks.filter((item) => item.projectId === project.id)
  const pendingChanges = projectChanges.filter((item) => !item.confirmedByClient)
  const totalSubcontract = projectSubcontracts.reduce((sum, item) => sum + Number(item.price || 0), 0)
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
        <SectionTitle title={project.name} desc="案件中心：集中查看基本資料、發包、批價、追加減項與任務。" />
        <button onClick={onBack} className="w-fit rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700">← 回案件列表</button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="案件預算" value={`NT$${formatMoney(project.budget)}`} />
        <Metric label="發包合計" value={`NT$${formatMoney(totalSubcontract)}`} />
        <Metric label="追加合計" value={`NT$${formatMoney(totalChange)}`} danger />
        <Metric label="待確認追加" value={pendingChanges.length} danger={pendingChanges.length > 0} />
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
            <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">{project.note || "沒有備註。"}</p>
          </div>

          <div>
            <p className="text-sm font-bold text-slate-500">案件狀態</p>
            <select value={project.status} onChange={(event) => updateProjectStatus(project.id, event.target.value)} className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              {projectStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
              {pendingChanges.length > 0 ? `目前有 ${pendingChanges.length} 筆追加尚未完成業主確認。` : "目前沒有待確認追加。"}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案發包項目</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-3">項目</th><th>工種</th><th>負責人</th><th>金額</th><th>期限</th><th>狀態</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {projectSubcontracts.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 font-black">{item.item}</td>
                  <td>{item.trade}</td>
                  <td>{item.workerName}</td>
                  <td>NT${formatMoney(item.price)}</td>
                  <td>{item.dueDate}</td>
                  <td>
                    <select value={item.status} onChange={(event) => updateSubcontractStatus(item.id, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                      {subcontractStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!projectSubcontracts.length && <p className="py-4 text-sm text-slate-500">本案目前沒有發包項目。</p>}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案批價紀錄</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-3">項目</th><th>廠商</th><th>金額</th><th>狀態</th><th>備註</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {projectBids.map((bid) => <tr key={bid.id}><td className="py-4">{bid.item}</td><td className="font-black">{bid.vendor}</td><td>NT${formatMoney(bid.amount)}</td><td>{bid.selected ? "採用" : "未採用"}</td><td>{bid.note}</td></tr>)}
            </tbody>
          </table>
          {!projectBids.length && <p className="py-4 text-sm text-slate-500">本案目前沒有批價紀錄。</p>}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案追加減項</h3>
        <div className="mt-4 grid gap-3">
          {projectChanges.map((order) => (
            <div key={order.id} className="rounded-xl bg-slate-50 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div><p className="font-black">{order.type}｜{order.item}</p><p className="mt-1 text-sm leading-6 text-slate-500">{order.reason}｜NT${formatMoney(order.amount)}</p></div>
                <div className="flex flex-wrap gap-2">
                  <select value={order.status} onChange={(event) => updateChangeStatus(order.id, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                    {changeStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <SmallButton onClick={() => copyOrder(order)}>{copiedId === order.id ? "已複製" : "複製確認"}</SmallButton>
                </div>
              </div>
            </div>
          ))}
          {!projectChanges.length && <p className="text-sm text-slate-500">本案目前沒有追加減項。</p>}
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-black">本案任務</h3>
        <TaskList tasks={projectTasks} toggleTaskComplete={toggleTaskComplete} updateTaskReport={updateTaskReport} showWorker />
      </Card>
    </div>
  )
}

function ProjectsPanel({ projects, addProject, editProject, deleteProject, updateProjectStatus, openProjectDetail }) {
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
      <SectionTitle title="案件管理" desc="新增案件、編輯資料、調整工程狀態。" />
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
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增案件</button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">案件列表</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredProjects.length} / {projects.length} 件案件</p>
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
              {projectStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1080px] text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-3">案件</th><th>業主</th><th>類型</th><th>預算</th><th>期限</th><th>狀態</th><th>操作</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td className="py-4"><p className="font-black">{project.name}</p><p className="mt-1 text-xs text-slate-500">{project.address}</p></td>
                  <td>{project.client}</td><td>{project.type}</td><td>NT${formatMoney(project.budget)}</td><td>{project.dueDate}</td>
                  <td>
                    <select value={project.status} onChange={(event) => updateProjectStatus(project.id, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">
                      {projectStatuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                  </td>
                  <td><div className="flex gap-2"><SmallButton onClick={() => openProjectDetail(project.id)}>查看</SmallButton><SmallButton onClick={() => editProject(project)}>編輯</SmallButton><SmallButton danger onClick={() => deleteProject(project.id)}>刪除</SmallButton></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredProjects.length && <p className="py-4 text-sm text-slate-500">沒有符合條件的案件。</p>}
        </div>
      </Card>
    </div>
  )
}
function SubcontractsPanel({ projects, users, subcontracts, addSubcontract, editSubcontract, deleteSubcontract, updateSubcontractStatus, openProjectDetail }) {
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
      <SectionTitle title="發包項目" desc="建立工種、項目、金額與負責師傅。新增使用者後，會自動出現在指派清單。" />
      <Card>
        <h3 className="text-xl font-black">新增發包項目</h3>
        <form onSubmit={addSubcontract} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2"><span className="text-sm font-bold text-slate-600">所屬案件</span><select name="projectId" className="rounded-xl border border-slate-200 px-4 py-3">{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
          <label className="grid gap-2"><span className="text-sm font-bold text-slate-600">負責人</span><select name="workerId" className="rounded-xl border border-slate-200 px-4 py-3"><option value="">未指派</option>{workers.map((worker) => <option key={worker.id} value={worker.id}>{worker.name}</option>)}</select></label>
          <Input name="trade" label="工種" placeholder="防水 / 木作 / 水電" />
          <Input name="item" label="項目名稱" required />
          <Input name="qty" label="數量" type="number" />
          <Input name="unit" label="單位" placeholder="式 / 坪 / 米" />
          <Input name="price" label="金額" type="number" />
          <Input name="dueDate" label="預計日期" type="date" />
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增發包項目</button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">發包列表</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredSubcontracts.length} / {subcontracts.length} 筆發包</p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px_160px]">
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋案件 / 項目 / 工種" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              <option>全部</option>
              {subcontractStatuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <select value={workerFilter} onChange={(event) => setWorkerFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              <option>全部</option>
              <option value="">未指派</option>
              {workers.map((worker) => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-3">案件</th><th>項目</th><th>工種</th><th>負責人</th><th>金額</th><th>狀態</th><th>期限</th><th>操作</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubcontracts.map((item) => (
                <tr key={item.id}>
                  <td className="py-4"><button type="button" onClick={() => openProjectDetail(item.projectId)} className="font-bold text-slate-700 underline underline-offset-4">{item.projectName}</button></td>
                  <td className="font-black">{item.item}</td><td>{item.trade}</td><td>{item.workerName}</td><td>NT${formatMoney(item.price)}</td>
                  <td><select value={item.status} onChange={(event) => updateSubcontractStatus(item.id, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">{subcontractStatuses.map((status) => <option key={status}>{status}</option>)}</select></td>
                  <td>{item.dueDate}</td>
                  <td><div className="flex gap-2"><SmallButton onClick={() => editSubcontract(item)}>編輯</SmallButton><SmallButton danger onClick={() => deleteSubcontract(item.id)}>刪除</SmallButton></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredSubcontracts.length && <p className="py-4 text-sm text-slate-500">沒有符合條件的發包項目。</p>}
        </div>
      </Card>
    </div>
  )
}
function BidsPanel({ bids, subcontracts, addBid, deleteBid, selectBid }) {
  const [keyword, setKeyword] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("全部")

  const filteredBids = bids.filter((bid) => {
    const matchSelected = selectedFilter === "全部" || (selectedFilter === "採用" ? bid.selected : !bid.selected)
    const matchKeyword = includesKeyword(`${bid.projectName} ${bid.item} ${bid.vendor} ${bid.note}`, keyword)
    return matchSelected && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle title="批價紀錄" desc="比較不同廠商報價，記錄採用原因。" />
      <Card>
        <h3 className="text-xl font-black">新增批價</h3>
        <form onSubmit={addBid} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2"><span className="text-sm font-bold text-slate-600">發包項目</span><select name="subcontractId" className="rounded-xl border border-slate-200 px-4 py-3">{subcontracts.map((item) => <option key={item.id} value={item.id}>{item.projectName}｜{item.item}</option>)}</select></label>
          <Input name="vendor" label="報價廠商" required />
          <Input name="amount" label="報價金額" type="number" required />
          <label className="grid gap-2"><span className="text-sm font-bold text-slate-600">是否採用</span><select name="selected" className="rounded-xl border border-slate-200 px-4 py-3"><option value="no">未採用</option><option value="yes">採用</option></select></label>
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增批價</button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">報價比較</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredBids.length} / {bids.length} 筆報價</p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px]">
            <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋案件 / 廠商 / 項目" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500" />
            <select value={selectedFilter} onChange={(event) => setSelectedFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
              <option>全部</option>
              <option>採用</option>
              <option>未採用</option>
            </select>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-3">案件</th><th>項目</th><th>廠商</th><th>金額</th><th>狀態</th><th>備註</th><th>操作</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBids.map((bid) => (
                <tr key={bid.id}>
                  <td className="py-4">{bid.projectName}</td><td>{bid.item}</td><td className="font-black">{bid.vendor}</td><td>NT${formatMoney(bid.amount)}</td><td>{bid.selected ? "採用" : "未採用"}</td><td>{bid.note}</td>
                  <td><div className="flex gap-2">{!bid.selected && <SmallButton onClick={() => selectBid(bid.id)}>設為採用</SmallButton>}<SmallButton danger onClick={() => deleteBid(bid.id)}>刪除</SmallButton></div></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredBids.length && <p className="py-4 text-sm text-slate-500">沒有符合條件的批價紀錄。</p>}
        </div>
      </Card>
    </div>
  )
}
function ChangeOrdersPanel({ projects, changeOrders, addChangeOrder, editChangeOrder, deleteChangeOrder, updateChangeStatus, generateConfirmText }) {
  const [selectedOrder, setSelectedOrder] = useState(changeOrders[0]?.id || "")
  const [copied, setCopied] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")

  const filteredOrders = changeOrders.filter((order) => {
    const matchStatus = statusFilter === "全部" || order.status === statusFilter
    const matchKeyword = includesKeyword(`${order.projectName} ${order.item} ${order.reason} ${order.type}`, keyword)
    return matchStatus && matchKeyword
  })

  const currentOrder =
    changeOrders.find((item) => item.id === selectedOrder) || changeOrders[0]

  async function copyText() {
    if (!currentOrder) return
    const text = generateConfirmText(currentOrder)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      copyByTextarea(text)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="grid gap-5">
      <SectionTitle title="追加減項" desc="記錄追加原因、金額、確認狀態，並產生業主確認文字。" />
      <Card>
        <h3 className="text-xl font-black">新增追加 / 減項</h3>
        <form onSubmit={addChangeOrder} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2"><span className="text-sm font-bold text-slate-600">所屬案件</span><select name="projectId" className="rounded-xl border border-slate-200 px-4 py-3">{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></label>
          <label className="grid gap-2"><span className="text-sm font-bold text-slate-600">類型</span><select name="type" className="rounded-xl border border-slate-200 px-4 py-3"><option>追加</option><option>減項</option></select></label>
          <Input name="item" label="項目名稱" required />
          <Input name="amount" label="金額" type="number" />
          <Input name="date" label="提出日期" type="date" />
          <Input name="reason" label="原因" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增追加減項</button>
        </form>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-xl font-black">追加減項列表</h3>
              <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredOrders.length} / {changeOrders.length} 筆追加減項</p>
            </div>
            <div className="grid gap-2 md:grid-cols-[220px_150px]">
              <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋案件 / 項目 / 原因" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500" />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
                <option>全部</option>
                {changeStatuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {filteredOrders.map((order) => (
              <div key={order.id} className="rounded-xl bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div><p className="font-black">{order.projectName}｜{order.item}</p><p className="mt-1 text-sm text-slate-500">{order.reason}｜NT${formatMoney(order.amount)}</p></div>
                  <div className="flex flex-wrap gap-2">
                    <select value={order.status} onChange={(event) => updateChangeStatus(order.id, event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold">{changeStatuses.map((status) => <option key={status}>{status}</option>)}</select>
                    <SmallButton onClick={() => editChangeOrder(order)}>編輯</SmallButton>
                    <SmallButton danger onClick={() => deleteChangeOrder(order.id)}>刪除</SmallButton>
                  </div>
                </div>
              </div>
            ))}
            {!filteredOrders.length && <p className="text-sm text-slate-500">沒有符合條件的追加減項。</p>}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">業主確認文字</h3>
          <select value={selectedOrder} onChange={(event) => setSelectedOrder(event.target.value)} className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold">
            {changeOrders.map((order) => <option key={order.id} value={order.id}>{order.projectName}｜{order.item}</option>)}
          </select>
          {currentOrder ? <><pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{generateConfirmText(currentOrder)}</pre><button onClick={copyText} className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">{copied ? "已複製" : "複製確認文字"}</button></> : <p className="mt-4 text-sm text-slate-500">目前沒有追加減項。</p>}
        </Card>
      </div>
    </div>
  )
}
function VendorsPanel({ vendors, addVendor, editVendor, deleteVendor }) {
  const [keyword, setKeyword] = useState("")
  const filteredVendors = vendors.filter((vendor) =>
    includesKeyword(`${vendor.name} ${vendor.trade} ${vendor.phone} ${vendor.area} ${vendor.note}`, keyword)
  )

  return (
    <div className="grid gap-5">
      <SectionTitle title="廠商資料" desc="集中管理師傅、工種、電話與合作備註。" />
      <Card>
        <h3 className="text-xl font-black">新增廠商</h3>
        <form onSubmit={addVendor} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" label="廠商 / 師傅名稱" required />
          <Input name="trade" label="工種" />
          <Input name="phone" label="電話" />
          <Input name="area" label="合作地區" />
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增廠商</button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">廠商列表</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredVendors.length} / {vendors.length} 筆廠商資料</p>
          </div>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋廠商 / 工種 / 地區" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500 md:w-[260px]" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {filteredVendors.map((vendor) => <Card key={vendor.id}><p className="text-sm font-bold text-slate-500">{vendor.trade}</p><h3 className="mt-2 text-xl font-black">{vendor.name}</h3><p className="mt-3 font-black">{vendor.phone}</p><p className="mt-2 text-sm text-slate-500">{vendor.area}</p><p className="mt-4 text-sm leading-7 text-slate-600">{vendor.note}</p><div className="mt-5 flex gap-2"><SmallButton onClick={() => editVendor(vendor)}>編輯</SmallButton><SmallButton danger onClick={() => deleteVendor(vendor.id)}>刪除</SmallButton></div></Card>)}
          {!filteredVendors.length && <p className="text-sm text-slate-500">沒有符合條件的廠商。</p>}
        </div>
      </Card>
    </div>
  )
}
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

export default BuildFlow
