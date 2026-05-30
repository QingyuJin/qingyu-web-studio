import { useState } from "react"
import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { changeStatuses } from "../data/demoData"
import { includesKeyword, formatMoney, copyByTextarea } from "../utils/helpers"

function ChangeOrdersPanel({
  projects,
  changeOrders,
  addChangeOrder,
  editChangeOrder,
  deleteChangeOrder,
  updateChangeStatus,
  generateConfirmText,
}) {
  const [selectedOrder, setSelectedOrder] = useState(changeOrders[0]?.id || "")
  const [copied, setCopied] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [statusFilter, setStatusFilter] = useState("全部")

  const filteredOrders = changeOrders.filter((order) => {
    const matchStatus = statusFilter === "全部" || order.status === statusFilter
    const matchKeyword = includesKeyword(
      `${order.projectName} ${order.item} ${order.reason} ${order.type}`,
      keyword
    )
    return matchStatus && matchKeyword
  })

  const currentOrder = changeOrders.find((item) => item.id === selectedOrder) || changeOrders[0]

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
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-xl font-black">追加減項列表</h3>
              <p className="mt-1 text-sm text-slate-500">
                目前顯示 {filteredOrders.length} / {changeOrders.length} 筆追加減項
              </p>
            </div>
            <div className="grid gap-2 md:grid-cols-[220px_150px]">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="搜尋案件 / 項目 / 原因"
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
              >
                <option>全部</option>
                {changeStatuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {filteredOrders.map((order) => (
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
                    <SmallButton onClick={() => editChangeOrder(order)}>編輯</SmallButton>
                    <SmallButton danger onClick={() => deleteChangeOrder(order.id)}>
                      刪除
                    </SmallButton>
                  </div>
                </div>
              </div>
            ))}
            {!filteredOrders.length && (
              <p className="text-sm text-slate-500">沒有符合條件的追加減項。</p>
            )}
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
          {currentOrder ? (
            <>
              <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                {generateConfirmText(currentOrder)}
              </pre>
              <button
                onClick={copyText}
                className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
              >
                {copied ? "已複製" : "複製確認文字"}
              </button>
            </>
          ) : (
            <p className="mt-4 text-sm text-slate-500">目前沒有追加減項。</p>
          )}
        </Card>
      </div>
    </div>
  )
}

export default ChangeOrdersPanel
