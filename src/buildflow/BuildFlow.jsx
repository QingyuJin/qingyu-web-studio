import { useEffect, useMemo, useState } from "react"

import { adminTabs, workerTabs } from "./data/demoData"
import { today, formatMoney, createId, textValue, numberValue } from "./utils/helpers"
import BuildFlowLogin from "./components/BuildFlowLogin"
import BuildFlowContent from "./components/BuildFlowContent"
import BuildFlowHeader from "./components/BuildFlowHeader"
import BuildFlowSidebar from "./components/BuildFlowSidebar"
import useBuildFlowActions from "./hooks/useBuildFlowActions"
import useBuildFlowAuth from "./hooks/useBuildFlowAuth"
import useBuildFlowData from "./hooks/useBuildFlowData"
import ConfirmDialog from "./shared/ConfirmDialog"
import EditModal from "./shared/EditModal"
import ToastMessage from "./shared/ToastMessage"

function BuildFlow() {
  const { data, resetData, setData } = useBuildFlowData()
  const { session, setSession } = useBuildFlowAuth()
  const [activeTab, setActiveTab] = useState(session?.role === "worker" ? "worker" : "dashboard")
  const [activeProjectId, setActiveProjectId] = useState("")
  const [editModal, setEditModal] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState(null)
  const [toast, setToast] = useState(null)

  const { users, projects, subcontracts, bids, changeOrders, quoteDrafts, vendors, tasks } = data
  const savedAt = new Date().toLocaleTimeString("zh-TW", { hour12: false })

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  const isAdmin = session?.role === "admin"
  const isWorker = session?.role === "worker"
  const tabs = isAdmin ? adminTabs : workerTabs
  const activeProject = projects.find((project) => project.id === activeProjectId)

  function showToast(message, tone = "info") {
    setToast({ message, tone })
  }

  function confirmAction(config) {
    return new Promise((resolve) => {
      setConfirmDialog({ ...config, resolve })
    })
  }

  function resolveConfirm(confirmed) {
    confirmDialog?.resolve(confirmed)
    setConfirmDialog(null)
  }

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

  async function resetDemoData() {
    const confirmed = await confirmAction({
      title: "重置 BuildFlow Demo",
      message: "目前新增的資料會被清除，並回到預設展示資料。",
      confirmLabel: "重置資料",
    })
    if (!confirmed) return
    setActiveProjectId("")
    setActiveTab(isAdmin ? "dashboard" : "worker")
    resetData()
    showToast("BuildFlow Demo 資料已重置。")
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
      showToast("請輸入帳號。", "error")
      return
    }

    const exists = users.some((user) => user.username.toLowerCase() === username.toLowerCase())
    if (exists) {
      showToast("這個帳號已經存在，請換一個帳號。", "error")
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

  async function deleteUser(userId) {
    const user = users.find((item) => item.id === userId)
    if (!user) return

    if (user.id === session?.id) {
      showToast("不能刪除目前登入中的帳號。", "error")
      return
    }

    if (user.role === "admin") {
      showToast("Demo 版不允許刪除管理者帳號，避免系統無法登入。", "error")
      return
    }

    const relatedTasks = tasks.filter((task) => task.workerId === user.id).length
    const confirmed = await confirmAction({
      title: `刪除使用者：${user.name}`,
      message: `相關 ${relatedTasks} 個任務會改成未指派。`,
      confirmLabel: "刪除使用者",
    })
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

  function addQuoteDraft(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const firstItem = textValue(form, "item1")
    const secondItem = textValue(form, "item2")
    const items = [
      firstItem
        ? {
            name: firstItem,
            qty: 1,
            unit: "式",
            price: numberValue(form, "amount1"),
          }
        : null,
      secondItem
        ? {
            name: secondItem,
            qty: 1,
            unit: "式",
            price: numberValue(form, "amount2"),
          }
        : null,
    ].filter(Boolean)

    const newQuote = {
      id: createId("q"),
      title: textValue(form, "title"),
      client: textValue(form, "client"),
      phone: textValue(form, "phone"),
      address: textValue(form, "address"),
      type: textValue(form, "type") || "工程估價",
      stage: "確認",
      quoteDate: textValue(form, "quoteDate") || today,
      expectedDate: textValue(form, "expectedDate") || today,
      sizeNote: textValue(form, "sizeNote"),
      note: textValue(form, "note"),
      items: items.length ? items : [{ name: "現場估價工項", qty: 1, unit: "式", price: 0 }],
    }

    setData((current) => ({ ...current, quoteDrafts: [newQuote, ...current.quoteDrafts] }))
    event.currentTarget.reset()
    showToast("暫存報價已建立。")
  }

  function updateQuoteDraftStage(quoteId, stage) {
    setData((current) => ({
      ...current,
      quoteDrafts: current.quoteDrafts.map((quote) =>
        quote.id === quoteId ? { ...quote, stage } : quote
      ),
    }))
  }

  function createProjectFromQuoteDraft(quote) {
    const total = quote.items.reduce(
      (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
      0
    )
    const newProject = {
      id: createId("p"),
      name: quote.title,
      client: quote.client,
      address: quote.address,
      type: quote.type,
      budget: total,
      status: quote.stage === "發包" ? "已發包" : "已報價",
      manager: session?.name || "管理者",
      startDate: quote.expectedDate || today,
      dueDate: quote.expectedDate || today,
      note: `由暫存報價 ${quote.id} 建立。${quote.note || ""}`,
    }

    setData((current) => ({
      ...current,
      projects: [newProject, ...current.projects],
      quoteDrafts: current.quoteDrafts.map((item) =>
        item.id === quote.id ? { ...item, stage: "發包" } : item
      ),
    }))
    showToast("已由暫存報價建立正式案件。")
  }

  function printQuoteDraftPdf(quote) {
    const total = quote.items.reduce(
      (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
      0
    )
    const rows = quote.items
      .map(
        (item) => `<tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${item.unit}</td>
          <td>NT$${formatMoney(item.price)}</td>
          <td>NT$${formatMoney(Number(item.qty || 0) * Number(item.price || 0))}</td>
        </tr>`
      )
      .join("")
    const printWindow = window.open("", "_blank", "width=900,height=720")
    if (!printWindow) {
      showToast("瀏覽器封鎖列印視窗，請允許彈出視窗。", "error")
      return
    }

    printWindow.document.write(`<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${quote.title} 報價單</title>
          <style>
            body { font-family: Arial, "Microsoft JhengHei", sans-serif; color: #0f172a; padding: 32px; }
            h1 { margin: 0 0 8px; font-size: 28px; }
            .muted { color: #64748b; }
            .box { border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin: 18px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border-bottom: 1px solid #e2e8f0; padding: 12px; text-align: left; }
            th { color: #475569; font-size: 13px; }
            .total { text-align: right; font-size: 24px; font-weight: 900; margin-top: 18px; }
            @media print { button { display: none; } body { padding: 16px; } }
          </style>
        </head>
        <body>
          <h1>工程報價單</h1>
          <p class="muted">BuildFlow Quote｜${quote.id}</p>
          <div class="box">
            <p><strong>案件：</strong>${quote.title}</p>
            <p><strong>業主：</strong>${quote.client}｜${quote.phone || "未填電話"}</p>
            <p><strong>地址：</strong>${quote.address || "未填地址"}</p>
            <p><strong>報價日期：</strong>${quote.quoteDate}</p>
            <p><strong>預計施工日：</strong>${quote.expectedDate}</p>
            <p><strong>尺寸 / 大小張：</strong>${quote.sizeNote || "未填"}</p>
          </div>
          <table>
            <thead>
              <tr><th>工項</th><th>數量</th><th>單位</th><th>單價</th><th>小計</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <p class="total">總計 NT$${formatMoney(total)}</p>
          <div class="box">
            <strong>備註</strong>
            <p>${quote.note || "無"}</p>
          </div>
          <button onclick="window.print()">列印 / 另存 PDF</button>
        </body>
      </html>`)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
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

  async function deleteProject(projectId) {
    const project = projects.find((item) => item.id === projectId)
    const confirmed = await confirmAction({
      title: `刪除案件：${project?.name || "這個案件"}`,
      message: "相關發包、批價、追加減項、任務也會一起移除。",
      confirmLabel: "刪除案件",
    })
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

  async function deleteSubcontract(subcontractId) {
    const subcontract = subcontracts.find((item) => item.id === subcontractId)
    const confirmed = await confirmAction({
      title: `刪除發包項目：${subcontract?.item || "這個發包項目"}`,
      message: "相關批價與任務也會一起移除。",
      confirmLabel: "刪除項目",
    })
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

  async function deleteBid(bidId) {
    if (
      !(await confirmAction({
        title: "刪除批價紀錄",
        message: "這筆批價紀錄會從 Demo 資料中移除。",
        confirmLabel: "刪除紀錄",
      }))
    )
      return
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

  async function deleteChangeOrder(orderId) {
    if (
      !(await confirmAction({
        title: "刪除追加 / 減項",
        message: "這筆追加 / 減項紀錄會從 Demo 資料中移除。",
        confirmLabel: "刪除紀錄",
      }))
    )
      return
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

  async function deleteVendor(vendorId) {
    if (
      !(await confirmAction({
        title: "刪除廠商資料",
        message: "這筆廠商資料會從 Demo 資料中移除。",
        confirmLabel: "刪除廠商",
      }))
    )
      return
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

  async function deleteTask(taskId) {
    if (
      !(await confirmAction({
        title: "刪除任務",
        message: "這個任務會從 Demo 資料中移除。",
        confirmLabel: "刪除任務",
      }))
    )
      return
    setData((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== taskId),
    }))
  }

  function generateConfirmText(order) {
    return `【追加工程確認】\n\n案件：${order.projectName}\n類型：${order.type}\n項目：${order.item}\n原因：${order.reason}\n金額：NT$${formatMoney(order.amount)}\n\n請業主確認後，我們再安排後續施工。`
  }

  const actions = useBuildFlowActions({
    addBid,
    addChangeOrder,
    addProject,
    addQuoteDraft,
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
    createProjectFromQuoteDraft,
    printQuoteDraftPdf,
    selectBid,
    toggleTaskComplete,
    updateChangeStatus,
    updateProjectStatus,
    updateQuoteDraftStage,
    updateSubcontractStatus,
    updateTaskReport,
  })

  if (!session) return <BuildFlowLogin users={users} onLogin={handleLogin} />

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
          quoteDrafts={quoteDrafts}
          session={session}
          subcontracts={subcontracts}
          tasks={tasks}
          users={users}
          vendors={vendors}
          workerTasks={workerTasks}
        />
      </section>
      <EditModal config={editModal} onClose={() => setEditModal(null)} />
      <ConfirmDialog
        config={confirmDialog}
        onCancel={() => resolveConfirm(false)}
        onConfirm={() => resolveConfirm(true)}
      />
      <ToastMessage message={toast?.message} tone={toast?.tone} onClose={() => setToast(null)} />
    </main>
  )
}

export default BuildFlow
