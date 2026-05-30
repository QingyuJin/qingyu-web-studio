import { useEffect, useMemo, useState } from "react"

import { STORAGE_KEY, adminTabs, workerTabs } from "./data/demoData"
import { SESSION_KEY, loadInitialSession } from "./auth/session"
import {
  today,
  formatMoney,
  createId,
  textValue,
  numberValue,
  cloneDemoData,
  loadInitialData,
} from "./utils/helpers"
import BuildFlowLogin from "./components/BuildFlowLogin"
import BuildFlowContent from "./components/BuildFlowContent"
import BuildFlowHeader from "./components/BuildFlowHeader"
import BuildFlowSidebar from "./components/BuildFlowSidebar"
import EditModal from "./shared/EditModal"

function BuildFlow() {
  const [data, setData] = useState(loadInitialData)
  const [session, setSession] = useState(loadInitialSession)
  const [activeTab, setActiveTab] = useState(session?.role === "worker" ? "worker" : "dashboard")
  const [activeProjectId, setActiveProjectId] = useState("")
  const [editModal, setEditModal] = useState(null)

  const { users, projects, subcontracts, bids, changeOrders, vendors, tasks } = data
  const savedAt = new Date().toLocaleTimeString("zh-TW", { hour12: false })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
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
      (item) =>
        item.username.toLowerCase() === username.trim().toLowerCase() && item.password === password
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
    setEditModal({
      title: `Edit user: ${user.name}`,
      fields: [
        { name: "name", label: "Name", value: user.name },
        { name: "phone", label: "Phone", value: user.phone },
        { name: "password", label: "Password", value: user.password },
      ],
      onSubmit(values) {
        const nextName = values.name || user.name

        setData((current) => ({
          ...current,
          users: current.users.map((item) =>
            item.id === user.id
              ? {
                  ...item,
                  name: nextName,
                  phone: values.phone,
                  password: values.password || item.password,
                }
              : item
          ),
          subcontracts: current.subcontracts.map((item) =>
            item.workerId === user.id ? { ...item, workerName: nextName } : item
          ),
          tasks: current.tasks.map((item) =>
            item.workerId === user.id ? { ...item, workerName: nextName } : item
          ),
        }))

        if (session?.id === user.id) {
          setSession((current) =>
            current ? { ...current, name: nextName, phone: values.phone } : current
          )
        }
      },
    })
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
    setEditModal({
      title: `Edit project: ${project.name}`,
      fields: [
        { name: "name", label: "Project name", value: project.name },
        { name: "client", label: "Client", value: project.client },
        { name: "budget", label: "Budget", type: "number", value: String(project.budget) },
        { name: "note", label: "Note", value: project.note, multiline: true },
      ],
      onSubmit(values) {
        const nextName = values.name || project.name

        setData((current) => ({
          ...current,
          projects: current.projects.map((item) =>
            item.id === project.id
              ? {
                  ...item,
                  name: nextName,
                  client: values.client || item.client,
                  budget: Number(values.budget) || 0,
                  note: values.note,
                }
              : item
          ),
          subcontracts: current.subcontracts.map((item) =>
            item.projectId === project.id ? { ...item, projectName: nextName } : item
          ),
          bids: current.bids.map((item) =>
            item.projectId === project.id ? { ...item, projectName: nextName } : item
          ),
          changeOrders: current.changeOrders.map((item) =>
            item.projectId === project.id ? { ...item, projectName: nextName } : item
          ),
          tasks: current.tasks.map((item) =>
            item.projectId === project.id ? { ...item, projectName: nextName } : item
          ),
        }))
      },
    })
  }

  function deleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId)
    const confirmed = window.confirm(
      `確定刪除「${project?.name || "這個案件"}」嗎？相關發包、批價、追加減項、任務也會一起移除。`
    )
    if (!confirmed) return
    const subcontractIds = subcontracts
      .filter((item) => item.projectId === projectId)
      .map((item) => item.id)

    setData((current) => ({
      ...current,
      projects: current.projects.filter((item) => item.id !== projectId),
      subcontracts: current.subcontracts.filter((item) => item.projectId !== projectId),
      bids: current.bids.filter(
        (item) => item.projectId !== projectId && !subcontractIds.includes(item.subcontractId)
      ),
      changeOrders: current.changeOrders.filter((item) => item.projectId !== projectId),
      tasks: current.tasks.filter((item) => item.projectId !== projectId),
    }))

    if (activeProjectId === projectId) {
      setActiveProjectId("")
      setActiveTab("projects")
    }
  }

  function updateProjectStatus(projectId, status) {
    setData((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId ? { ...project, status } : project
      ),
    }))
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

    setData((current) => ({
      ...current,
      subcontracts: [newItem, ...current.subcontracts],
      tasks: [newTask, ...current.tasks],
    }))
    event.currentTarget.reset()
  }

  function editSubcontract(subcontract) {
    setEditModal({
      title: `Edit subcontract: ${subcontract.item}`,
      fields: [
        { name: "item", label: "Item", value: subcontract.item },
        { name: "price", label: "Price", type: "number", value: String(subcontract.price) },
        { name: "note", label: "Note", value: subcontract.note, multiline: true },
      ],
      onSubmit(values) {
        const nextItem = values.item || subcontract.item

        setData((current) => ({
          ...current,
          subcontracts: current.subcontracts.map((target) =>
            target.id === subcontract.id
              ? { ...target, item: nextItem, price: Number(values.price) || 0, note: values.note }
              : target
          ),
          bids: current.bids.map((bid) =>
            bid.subcontractId === subcontract.id ? { ...bid, item: nextItem } : bid
          ),
          tasks: current.tasks.map((task) =>
            task.subcontractId === subcontract.id
              ? { ...task, title: `完成：${nextItem}`, note: values.note }
              : task
          ),
        }))
      },
    })
  }

  function deleteSubcontract(subcontractId) {
    const subcontract = subcontracts.find((item) => item.id === subcontractId)
    const confirmed = window.confirm(
      `確定刪除「${subcontract?.item || "這個發包項目"}」嗎？相關批價與任務也會一起移除。`
    )
    if (!confirmed) return

    setData((current) => ({
      ...current,
      subcontracts: current.subcontracts.filter((item) => item.id !== subcontractId),
      bids: current.bids.filter((item) => item.subcontractId !== subcontractId),
      tasks: current.tasks.filter((item) => item.subcontractId !== subcontractId),
    }))
  }

  function updateSubcontractStatus(subcontractId, status) {
    setData((current) => ({
      ...current,
      subcontracts: current.subcontracts.map((item) =>
        item.id === subcontractId ? { ...item, status } : item
      ),
    }))
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
        ...current.bids.map((bid) =>
          selected && bid.subcontractId === newBid.subcontractId ? { ...bid, selected: false } : bid
        ),
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
      bids: current.bids.map((bid) =>
        bid.subcontractId === target.subcontractId ? { ...bid, selected: bid.id === bidId } : bid
      ),
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
    setEditModal({
      title: `Edit change: ${order.item}`,
      fields: [
        { name: "item", label: "Item", value: order.item },
        { name: "amount", label: "Amount", type: "number", value: String(order.amount) },
        { name: "reason", label: "Reason", value: order.reason, multiline: true },
      ],
      onSubmit(values) {
        setData((current) => ({
          ...current,
          changeOrders: current.changeOrders.map((target) =>
            target.id === order.id
              ? {
                  ...target,
                  item: values.item || target.item,
                  amount: Number(values.amount) || 0,
                  reason: values.reason,
                }
              : target
          ),
        }))
      },
    })
  }

  function deleteChangeOrder(orderId) {
    if (!window.confirm("確定刪除這筆追加 / 減項紀錄嗎？")) return
    setData((current) => ({
      ...current,
      changeOrders: current.changeOrders.filter((item) => item.id !== orderId),
    }))
  }

  function updateChangeStatus(changeId, status) {
    setData((current) => ({
      ...current,
      changeOrders: current.changeOrders.map((item) =>
        item.id === changeId
          ? {
              ...item,
              status,
              confirmedByClient: ["業主已確認", "已施工", "已收款"].includes(status),
            }
          : item
      ),
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
    setEditModal({
      title: `Edit vendor: ${vendor.name}`,
      fields: [
        { name: "phone", label: "Phone", value: vendor.phone },
        { name: "note", label: "Note", value: vendor.note, multiline: true },
      ],
      onSubmit(values) {
        setData((current) => ({
          ...current,
          vendors: current.vendors.map((item) =>
            item.id === vendor.id ? { ...item, phone: values.phone, note: values.note } : item
          ),
        }))
      },
    })
  }

  function deleteVendor(vendorId) {
    if (!window.confirm("確定刪除這筆廠商資料嗎？")) return
    setData((current) => ({
      ...current,
      vendors: current.vendors.filter((item) => item.id !== vendorId),
    }))
  }

  function toggleTaskComplete(taskId) {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "已完成" ? "待完成" : "已完成" }
          : task
      ),
    }))
  }

  function updateTaskReport(taskId, report) {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) => (task.id === taskId ? { ...task, report } : task)),
    }))
  }

  function deleteTask(taskId) {
    if (!window.confirm("確定刪除這個任務嗎？")) return
    setData((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== taskId),
    }))
  }

  function generateConfirmText(order) {
    return `【追加工程確認】\n\n案件：${order.projectName}\n類型：${order.type}\n項目：${order.item}\n原因：${order.reason}\n金額：NT$${formatMoney(order.amount)}\n\n請業主確認後，我們再安排後續施工。`
  }

  if (!session) return <BuildFlowLogin users={users} onLogin={handleLogin} />

  const actions = {
    addBid,
    addChangeOrder,
    addProject,
    addSubcontract,
    addUser,
    addVendor,
    closeProjectDetail,
    deleteBid,
    deleteChangeOrder,
    deleteProject,
    deleteSubcontract,
    deleteTask,
    deleteUser,
    deleteVendor,
    editChangeOrder,
    editProject,
    editSubcontract,
    editUser,
    editVendor,
    generateConfirmText,
    openProjectDetail,
    selectBid,
    toggleTaskComplete,
    updateChangeStatus,
    updateProjectStatus,
    updateSubcontractStatus,
    updateTaskReport,
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <BuildFlowHeader
        session={session}
        savedAt={savedAt}
        isAdmin={isAdmin}
        onResetDemo={resetDemoData}
        onLogout={handleLogout}
      />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <BuildFlowSidebar
          tabs={tabs}
          activeTab={activeTab}
          session={session}
          isAdmin={isAdmin}
          onSelectTab={(tabId) => {
            setActiveProjectId("")
            setActiveTab(tabId)
          }}
        />

        <BuildFlowContent
          activeTab={activeTab}
          activeProject={activeProject}
          actions={actions}
          bids={bids}
          changeOrders={changeOrders}
          isAdmin={isAdmin}
          isWorker={isWorker}
          metrics={metrics}
          projects={projects}
          session={session}
          subcontracts={subcontracts}
          tasks={tasks}
          users={users}
          vendors={vendors}
          workerTasks={workerTasks}
        />
      </section>
      <EditModal config={editModal} onClose={() => setEditModal(null)} />
    </main>
  )
}

export default BuildFlow
