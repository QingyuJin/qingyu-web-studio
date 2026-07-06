import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"

const MODES = ["客戶端", "服務端"]
const STATUS_FLOW = ["新單", "備餐中", "待送餐", "已送達"]

const menuItems = [
  {
    id: "m1",
    name: "炭烤牛小排飯",
    price: 280,
    category: "主餐",
    station: "熱線",
    time: "14 min",
    note: "範例圖片",
    color: "from-[#d8c2a4] via-[#f5ead8] to-[#fffaf2]",
    tags: ["人氣", "可加飯"],
  },
  {
    id: "m2",
    name: "松露野菇燉飯",
    price: 240,
    category: "主餐",
    station: "冷台",
    time: "12 min",
    note: "範例圖片",
    color: "from-[#becfaf] via-[#eee7d3] to-[#fffaf2]",
    tags: ["素食", "濃郁"],
  },
  {
    id: "m3",
    name: "烏梅氣泡飲",
    price: 120,
    category: "飲品",
    station: "吧台",
    time: "4 min",
    note: "空圖片",
    color: "from-[#cfdeda] via-[#f1eadc] to-[#fffaf2]",
    tags: ["冰飲", "先出"],
  },
  {
    id: "m4",
    name: "焦糖布丁",
    price: 95,
    category: "甜點",
    station: "甜點",
    time: "6 min",
    note: "空圖片",
    color: "from-[#e4b889] via-[#f6dfc0] to-[#fffaf2]",
    tags: ["飯後", "限量"],
  },
  {
    id: "m5",
    name: "時蔬鷹嘴豆盤",
    price: 180,
    category: "輕食",
    station: "冷台",
    time: "9 min",
    note: "範例圖片",
    color: "from-[#b8caa3] via-[#eee6d1] to-[#fffaf2]",
    tags: ["清爽", "分享"],
  },
  {
    id: "m6",
    name: "酥炸洋蔥圈",
    price: 130,
    category: "點心",
    station: "炸台",
    time: "8 min",
    note: "空圖片",
    color: "from-[#dfb06c] via-[#f7e2bb] to-[#fffaf2]",
    tags: ["小食", "熱賣"],
  },
]

const initialOrders = [
  {
    id: "ORD-1042",
    table: "A07",
    guest: "中島雙人",
    status: "備餐中",
    channel: "桌邊 QR",
    items: ["炭烤牛小排飯", "烏梅氣泡飲"],
    total: 400,
    minutes: 12,
    staff: "Mina",
    note: "飲品先出，主餐不要洋蔥。",
  },
  {
    id: "ORD-1041",
    table: "B12",
    guest: "包廂四人",
    status: "待送餐",
    channel: "服務員代點",
    items: ["松露野菇燉飯", "焦糖布丁"],
    total: 335,
    minutes: 18,
    staff: "Kai",
    note: "甜點延後 10 分鐘。",
  },
  {
    id: "ORD-1040",
    table: "C03",
    guest: "靠窗候位",
    status: "新單",
    channel: "櫃台新增",
    items: ["時蔬鷹嘴豆盤"],
    total: 180,
    minutes: 4,
    staff: "Nora",
    note: "確認是否需要加購飲品。",
  },
]

const tableMap = [
  ["A02", "窗邊", "用餐中", 2],
  ["A07", "中島", "可入座", 2],
  ["B12", "包廂", "可入座", 4],
  ["C03", "靠窗", "可入座", 2],
  ["D08", "吧台", "候位中", 1],
  ["F01", "戶外", "清桌中", 4],
]

const stationBase = [
  ["熱線", 46, "牛排飯 / 燉飯"],
  ["冷台", 30, "沙拉 / 前菜"],
  ["吧台", 38, "飲品先出"],
  ["甜點", 24, "飯後節奏"],
]

function computeStationLoads(orders) {
  const pendingOrders = orders.filter((order) => order.status === "新單" || order.status === "備餐中")
  return stationBase.map(([name, base, note]) => {
    const pendingItems = pendingOrders.reduce(
      (sum, order) =>
        sum +
        order.items.filter((entry) => {
          const menu = menuItems.find((item) => entry.includes(item.name))
          return menu?.station === name
        }).length,
      0
    )
    return [name, Math.min(99, base + pendingItems * 16), note, pendingItems]
  })
}

function tableStatus(tableId, fallback, orders) {
  const openOrder = orders.find((order) => order.table === tableId && order.status !== "已送達")
  return openOrder ? openOrder.status : fallback
}

function getTime() {
  return new Intl.DateTimeFormat("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date())
}

function money(value) {
  return `$${value.toLocaleString("en-US")}`
}

function nextStatus(status) {
  const index = STATUS_FLOW.indexOf(status)
  return STATUS_FLOW[Math.min(index + 1, STATUS_FLOW.length - 1)]
}

function statusTone(status) {
  if (status === "已送達") return "bg-[#ece9df] text-[#7a6a58]"
  if (status === "待送餐") return "bg-[#fff1d7] text-[#a15f24]"
  if (status === "備餐中") return "bg-[#e8f0dc] text-[#355a36]"
  return "bg-[#c75d2c] text-white"
}

function StatusBadge({ children }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(children)}`}>{children}</span>
}

function ShellCard({ children, className = "" }) {
  return <section className={`rounded-[1.55rem] border border-[#dfd0bc] bg-[#fffaf2]/88 shadow-sm backdrop-blur ${className}`}>{children}</section>
}

function Header({ mode, setMode, time, onAddOrder }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#dfd0bc] bg-[#f9f0e3]/92 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 md:h-20 md:px-7">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#244332] text-xl font-black text-[#f4b36d] shadow-lg shadow-[#244332]/18">
            R
          </div>
          <div>
            <p className="font-serif text-xl font-black leading-none tracking-[-0.03em] text-[#3a2419] md:text-2xl">Riviera Table</p>
            <p className="text-xs font-black tracking-[0.12em] text-[#8a705f]">點餐、出餐與桌況控台</p>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-[#dfd0bc] bg-[#fffaf2] p-1 md:flex">
          {MODES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-xl px-5 text-sm font-black ${mode === item ? "bg-[#244332] text-white shadow-lg shadow-[#244332]/18" : "text-[#3a2419] hover:bg-[#f3e7d7]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-xl border border-[#dfd0bc] bg-[#fffaf2] px-4 py-2 text-sm font-black text-[#3a2419] lg:inline-flex">{time}</span>
          <button type="button" onClick={onAddOrder} className="min-h-11 rounded-xl bg-[#c75d2c] px-4 text-sm font-black text-white shadow-lg shadow-[#c75d2c]/18">
            模擬新單
          </button>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] gap-2 px-4 pb-3 md:hidden">
        {MODES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`min-h-11 flex-1 rounded-xl text-sm font-black ${mode === item ? "bg-[#244332] text-white shadow-lg shadow-[#244332]/18" : "border border-[#dfd0bc] bg-[#fffaf2] text-[#3a2419]"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </header>
  )
}

function ToastBar({ message }) {
  if (!message) return null

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border border-[#dfd0bc] bg-[#244332] px-5 py-4 text-sm font-black text-white shadow-2xl shadow-[#244332]/25">
      {message}
    </div>
  )
}

function HeroStatus({ orders, revenue, selectedOrder }) {
  const openOrders = orders.filter((order) => order.status !== "已送達").length
  const kitchenLoad = Math.min(99, orders.filter((order) => order.status === "備餐中").length * 13 + 54)
  const avgWait = Math.round(orders.reduce((sum, order) => sum + order.minutes, 0) / Math.max(orders.length, 1))

  return (
    <section className="grid items-start gap-4 2xl:grid-cols-[1.35fr_0.9fr]">
      <ShellCard className="overflow-hidden p-5 shadow-xl shadow-[#3a2419]/6 md:p-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end 2xl:grid-cols-[minmax(0,1fr)_210px]">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Restaurant OS</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2.15rem,4.4vw,4.45rem)] font-black leading-[0.98] tracking-[-0.045em] text-[#3a2419]">
              午餐尖峰，廚房節奏穩定推進。
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#836855]">
              {selectedOrder.table} 正在處理 {selectedOrder.items[0]}，吧台先出飲品；平均等待 {avgWait} 分鐘。
            </p>
          </div>
          <div className="rounded-[1.15rem] bg-[#244332] p-4 text-white">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#f4b36d]">Selected Order</p>
            <p className="mt-4 font-serif text-3xl font-black">{selectedOrder.table}</p>
            <p className="mt-2 line-clamp-2 text-xs font-bold leading-5 text-white/68">{selectedOrder.note}</p>
            <div className="mt-4 flex items-center justify-between">
              <StatusBadge>{selectedOrder.status}</StatusBadge>
              <span className="text-xs font-black text-[#f4b36d]">{selectedOrder.minutes} min</span>
            </div>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <div className="h-2 w-56 max-w-[54vw] overflow-hidden rounded-full bg-[#e9dccb]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#f0a85f] via-[#c75d2c] to-[#244332]" style={{ width: `${kitchenLoad}%` }} />
          </div>
          <p className="text-sm font-black text-[#244332]">{kitchenLoad}% kitchen flow</p>
          <p className="text-sm font-bold text-[#836855]">今日推薦：時蔬鷹嘴豆盤。</p>
        </div>
      </ShellCard>

      <div className="grid self-start gap-4 sm:grid-cols-3 2xl:grid-cols-3">
        <Kpi title="未完成單" value={openOrders} note="需要追蹤" />
        <Kpi title="廚房負載" value={`${kitchenLoad}%`} note="目前節奏" />
        <Kpi title="目前營收" value={money(revenue)} note="含現場新增" money />
      </div>
    </section>
  )
}

function Kpi({ title, value, note, money: moneyStyle = false }) {
  return (
    <article className="rounded-[1.35rem] border border-[#dfd0bc] bg-[#fffaf2]/88 p-4 shadow-sm backdrop-blur md:p-5">
      <p className="font-serif text-base font-black text-[#806a59]">{title}</p>
      <p className={`mt-6 font-serif font-black leading-none text-[#c75d2c] ${moneyStyle ? "text-[2.65rem]" : "text-5xl"}`}>{value}</p>
      <p className="mt-5 text-xs font-black text-[#806a59]">{note}</p>
      <div className="mt-6 h-2 rounded-full bg-[#e9dccb]">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#f0a85f] to-[#244332]" />
      </div>
    </article>
  )
}

function QuantityControl({ value, onMinus, onPlus }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={onMinus} className="grid h-8 w-8 place-items-center rounded-full border border-[#dfd0bc] bg-white text-sm font-black text-[#3a2419]">
        -
      </button>
      <span className="w-5 text-center text-sm font-black text-[#3a2419]">{value}</span>
      <button type="button" onClick={onPlus} className="grid h-8 w-8 place-items-center rounded-full bg-[#244332] text-sm font-black text-white">
        +
      </button>
    </div>
  )
}

function ClientView({ cart, setCart, submitted, onSubmit, clientTable, setClientTable, orders }) {
  const [category, setCategory] = useState("全部")
  const [diningNote, setDiningNote] = useState("飲品先出，主餐正常。")
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const visibleMenu = category === "全部" ? menuItems : menuItems.filter((item) => item.category === category || item.station === category)
  const categories = ["全部", "主餐", "飲品", "甜點", "熱線", "吧台"]

  function addItem(item) {
    setCart((current) => {
      const found = current.find((entry) => entry.id === item.id)
      if (found) return current.map((entry) => (entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry))
      return [...current, { ...item, qty: 1 }]
    })
  }

  function decreaseItem(item) {
    setCart((current) =>
      current
        .map((entry) => (entry.id === item.id ? { ...entry, qty: entry.qty - 1 } : entry))
        .filter((entry) => entry.qty > 0)
    )
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_400px]">
      <ShellCard className="p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Customer Menu</p>
            <h2 className="mt-2 font-serif text-3xl font-black tracking-[-0.035em] text-[#3a2419] md:text-[2.15rem]">桌邊點餐</h2>
          </div>
          <span className="rounded-full bg-[#f3e7d7] px-4 py-2 text-xs font-black text-[#8a5a2d]">圖片為範例 / 佔位</span>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#dfd0bc] bg-[#fffaf2] p-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`min-h-10 shrink-0 rounded-xl px-4 text-xs font-black ${category === item ? "bg-[#244332] text-white" : "bg-white text-[#3a2419]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {visibleMenu.map((item) => (
            <article key={item.id} className="rounded-[1.25rem] border border-[#dfd0bc] bg-white p-4 shadow-sm">
              <div className={`grid aspect-[4/2.35] place-items-center rounded-2xl bg-gradient-to-br ${item.color}`}>
                <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[#806a59]">{item.note}</div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-xl font-black text-[#3a2419]">{item.name}</p>
                  <p className="mt-1 text-sm font-bold text-[#806a59]">
                    {item.station} · {item.time}
                  </p>
                </div>
                <p className="font-serif text-xl font-black text-[#c75d2c]">${item.price}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#f7efe5] px-3 py-1 text-xs font-black text-[#806a59]">
                    {tag}
                  </span>
                ))}
              </div>
              <button type="button" onClick={() => addItem(item)} className="mt-4 min-h-11 w-full rounded-xl bg-[#244332] text-sm font-black text-white shadow-lg shadow-[#244332]/12">
                加入點單
              </button>
            </article>
          ))}
        </div>
      </ShellCard>

      <aside className="rounded-[1.55rem] border border-[#dfd0bc] bg-[#fffaf2] p-5 shadow-xl shadow-[#3a2419]/8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Cart</p>
        <h2 className="mt-2 font-serif text-2xl font-black text-[#3a2419]">{clientTable} 點單</h2>
        <div className="mt-3">
          <span className="text-xs font-black text-[#806a59]">選擇桌位</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {tableMap.map(([id]) => {
              const occupied = orders.some((order) => order.table === id && order.status !== "已送達")
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setClientTable(id)}
                  className={`min-h-9 rounded-lg px-3 text-xs font-black transition ${
                    clientTable === id
                      ? "bg-[#244332] text-white"
                      : occupied
                        ? "border border-[#e5cdb4] bg-[#fff3e8] text-[#b07a4e]"
                        : "border border-[#dfd0bc] bg-white text-[#3a2419]"
                  }`}
                >
                  {id}
                  {occupied ? " ·用餐中" : ""}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {submitted ? <div className="rounded-2xl bg-[#e8f0dc] p-4 text-sm font-black text-[#355a36]">已送出到服務端，廚房佇列已更新。</div> : null}
          {cart.length === 0 ? (
            <div className="rounded-2xl bg-[#f7efe5] p-4 text-sm font-bold text-[#806a59]">尚未加入餐點。</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="rounded-2xl bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#3a2419]">{item.name}</p>
                    <p className="text-xs font-bold text-[#806a59]">
                      {item.station} · ${item.price}
                    </p>
                  </div>
                  <p className="font-black text-[#c75d2c]">${item.price * item.qty}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <QuantityControl value={item.qty} onMinus={() => decreaseItem(item)} onPlus={() => addItem(item)} />
                  <span className="text-xs font-black text-[#806a59]">{item.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-black text-[#806a59]">桌邊備註</span>
          <textarea
            value={diningNote}
            onChange={(event) => setDiningNote(event.target.value)}
            className="mt-2 min-h-20 w-full rounded-2xl border border-[#dfd0bc] bg-white px-4 py-3 text-sm font-bold text-[#3a2419] outline-none focus:border-[#244332]"
          />
        </label>
        <div className="mt-5 flex items-center justify-between border-t border-[#dfd0bc] pt-5">
          <span className="text-sm font-black text-[#806a59]">小計</span>
          <span className="font-serif text-4xl font-black text-[#3a2419]">{money(total)}</span>
        </div>
        <button
          type="button"
          onClick={() => onSubmit(diningNote)}
          disabled={cart.length === 0}
          className="mt-5 min-h-12 w-full rounded-xl bg-[#c75d2c] text-sm font-black text-white shadow-lg shadow-[#c75d2c]/14 disabled:opacity-50"
        >
          送出範例點單
        </button>
      </aside>
    </section>
  )
}

function ServiceView({ orders, selectedId, setSelectedId, onAdvance, onSettle }) {
  const [filter, setFilter] = useState("全部")
  const shown = filter === "全部" ? orders : orders.filter((order) => order.status === filter)
  const selected = orders.find((order) => order.id === selectedId) || orders[0] || initialOrders[0]

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_430px]">
      <div className="grid gap-5">
        <ShellCard className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Kitchen Rail</p>
              <h2 className="mt-2 font-serif text-4xl font-black tracking-[-0.04em] text-[#3a2419]">廚房佇列</h2>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={onAdvance} className="min-h-12 rounded-xl bg-[#244332] px-5 text-sm font-black text-white shadow-lg shadow-[#244332]/12">
                推進出餐
              </button>
              <button type="button" onClick={onSettle} className="min-h-12 rounded-xl border border-[#dfd0bc] bg-white px-5 text-sm font-black text-[#3a2419]">
                結帳 / 清桌
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#dfd0bc] bg-[#fffaf2] p-2">
            {["全部", ...STATUS_FLOW].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`min-h-11 shrink-0 rounded-xl px-4 text-sm font-black ${filter === item ? "bg-[#c75d2c] text-white" : "bg-white text-[#3a2419]"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {shown.length > 0 ? shown.map((order) => (
              <button key={order.id} type="button" onClick={() => setSelectedId(order.id)} className="text-left">
                <article className={`rounded-2xl border p-4 transition hover:-translate-y-0.5 ${selected.id === order.id ? "border-[#244332] bg-[#f3eee1] shadow-lg shadow-[#244332]/10" : "border-[#dfd0bc] bg-white"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-serif text-2xl font-black text-[#3a2419]">{order.table}</p>
                      <p className="mt-1 text-sm font-bold text-[#806a59]">{order.guest}</p>
                    </div>
                    <StatusBadge>{order.status}</StatusBadge>
                  </div>
                  <div className="mt-5 grid gap-2">
                    {order.items.slice(0, 3).map((item) => {
                      const station = menuItems.find((menu) => item.includes(menu.name))?.station
                      return (
                        <div key={item} className="flex items-center justify-between gap-2 rounded-xl bg-[#f7efe5] px-3 py-2 text-sm font-black text-[#5f4637]">
                          <span className="truncate">{item}</span>
                          {station ? <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-[#806a59]">{station}</span> : null}
                        </div>
                      )
                    })}
                    {order.items.length > 3 ? (
                      <p className="px-1 text-xs font-black text-[#806a59]">+{order.items.length - 3} 個品項</p>
                    ) : null}
                  </div>
                  <div className="mt-5 flex items-center justify-between text-sm font-black">
                    <span className="text-[#806a59]">{order.minutes} 分鐘</span>
                    <span className="text-[#c75d2c]">{money(order.total)}</span>
                  </div>
                </article>
              </button>
            )) : (
              <div className="rounded-2xl border border-dashed border-[#dfd0bc] bg-white/70 p-6 text-sm font-black text-[#806a59] md:col-span-2 xl:col-span-3">
                目前沒有符合篩選的訂單。可以切換狀態，或用「模擬新單」新增一筆。
              </div>
            )}
          </div>
        </ShellCard>

        <StationLoad orders={orders} />
      </div>

      <div className="grid gap-5">
        <OrderDetail order={selected} />
        <FloorPanel selectedTable={selected.table} orders={orders} onSelectTable={setSelectedId} />
      </div>
    </section>
  )
}

function StationLoad({ orders }) {
  const stations = computeStationLoads(orders)
  return (
    <ShellCard className="p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Station Load</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-[#3a2419]">出餐站別</h2>
        </div>
        <span className="rounded-full bg-[#f3e7d7] px-3 py-1 text-xs font-black text-[#8a5a2d]">依未出餐訂單即時計算</span>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {stations.map(([name, load, note, pendingItems]) => (
          <div key={name} className="rounded-2xl border border-[#dfd0bc] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-serif text-xl font-black text-[#3a2419]">{name}</p>
              {pendingItems > 0 ? (
                <span className="rounded-full bg-[#c75d2c] px-2 py-0.5 text-[11px] font-black text-white">{pendingItems} 品項</span>
              ) : null}
            </div>
            <p className="mt-1 text-xs font-bold text-[#806a59]">{note}</p>
            <p className="mt-5 font-serif text-4xl font-black text-[#c75d2c]">{load}%</p>
            <div className="mt-4 h-2 rounded-full bg-[#e9dccb]">
              <div className="h-full rounded-full bg-gradient-to-r from-[#f0a85f] to-[#244332] transition-all duration-500" style={{ width: `${load}%` }} />
            </div>
          </div>
        ))}
      </div>
    </ShellCard>
  )
}

function OrderDetail({ order }) {
  return (
    <aside className="rounded-[1.55rem] border border-[#dfd0bc] bg-[#fffaf2] p-5 shadow-xl shadow-[#3a2419]/8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Order Detail</p>
          <h2 className="mt-2 font-serif text-4xl font-black text-[#3a2419]">{order.table}</h2>
          <p className="mt-1 text-sm font-bold text-[#806a59]">
            {order.id} · {order.channel}
          </p>
        </div>
        <StatusBadge>{order.status}</StatusBadge>
      </div>
      <div className="mt-5 grid gap-3">
        {order.items.map((item) => {
          const station = menuItems.find((menu) => item.includes(menu.name))?.station
          return (
            <div key={item} className="flex items-center justify-between gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#5f4637]">
              <span className="truncate">{item}</span>
              {station ? <span className="shrink-0 rounded-full bg-[#f7efe5] px-2.5 py-1 text-[10px] font-black text-[#806a59]">{station}</span> : null}
            </div>
          )
        })}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#f7efe5] p-4">
          <p className="text-xs font-black text-[#806a59]">負責人</p>
          <p className="mt-2 text-xl font-black text-[#3a2419]">{order.staff}</p>
        </div>
        <div className="rounded-2xl bg-[#f7efe5] p-4">
          <p className="text-xs font-black text-[#806a59]">總額</p>
          <p className="mt-2 text-xl font-black text-[#c75d2c]">{money(order.total)}</p>
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-[#dfd0bc] bg-white p-4">
        <p className="text-xs font-black text-[#806a59]">備註</p>
        <p className="mt-2 text-sm font-bold leading-6 text-[#5f4637]">{order.note}</p>
      </div>
    </aside>
  )
}

function FloorPanel({ selectedTable, orders, onSelectTable }) {
  return (
    <aside className="rounded-[1.55rem] border border-[#dfd0bc] bg-[#fffaf2]/92 p-5 shadow-sm">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c75d2c]">Floor</p>
          <h2 className="mt-2 font-serif text-4xl font-black tracking-[-0.04em] text-[#3a2419]">桌況</h2>
        </div>
        <span className="rounded-full bg-[#f3e7d7] px-3 py-1 text-xs font-black text-[#8a5a2d]">點桌位可切換訂單</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {tableMap.map(([id, place, fallback, seats]) => {
          const status = tableStatus(id, fallback, orders)
          const tableOrder = orders.find((order) => order.table === id && order.status !== "已送達")
          return (
            <button
              key={id}
              type="button"
              onClick={() => tableOrder && onSelectTable(tableOrder.id)}
              disabled={!tableOrder}
              className={`rounded-2xl border p-4 text-left transition ${
                id === selectedTable
                  ? "border-[#244332] bg-[#eef1df]"
                  : status === "可入座"
                    ? "border-[#dfd0bc] bg-white"
                    : "border-[#d6a88a] bg-[#fff3e8]"
              } ${tableOrder ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md" : "cursor-default"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-serif text-3xl font-black text-[#3a2419]">{id}</p>
                <span className="rounded-full bg-white/70 px-2 py-1 text-[11px] font-black text-[#806a59]">{seats} 人</span>
              </div>
              <p className="mt-3 text-sm font-black text-[#806a59]">{place}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-sm font-black text-[#806a59]">{status}</p>
                {tableOrder ? <span className="rounded-full bg-[#244332] px-2 py-0.5 text-[10px] font-black text-white">{tableOrder.id}</span> : null}
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

function RestaurantOrdering() {
  const [mode, setMode] = useState("服務端")
  const [orders, setOrders] = useState(initialOrders)
  const [selectedId, setSelectedId] = useState(initialOrders[0].id)
  const [cart, setCart] = useState([])
  const [clientTable, setClientTable] = useState("C03")
  const [submitted, setSubmitted] = useState(false)
  const [time, setTime] = useState(getTime())
  const [message, setMessage] = useState("")

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTime()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOrders((current) =>
        current.map((order) => (order.status === "已送達" ? order : { ...order, minutes: order.minutes + 1 }))
      )
    }, 20000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!message) return undefined
    const timer = window.setTimeout(() => setMessage(""), 1800)
    return () => window.clearTimeout(timer)
  }, [message])

  const selectedOrder = orders.find((order) => order.id === selectedId) || orders[0]
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)

  function addOrder() {
    const staffPool = ["Mina", "Kai", "Nora"]
    const notePool = ["先確認是否需要外帶袋。", "客人趕時間，優先出餐。", "有兒童座椅需求。", "餐點分兩次上。"]
    const picked = [...menuItems].sort(() => Math.random() - 0.5).slice(0, 1 + Math.floor(Math.random() * 3))
    const occupied = new Set(orders.filter((order) => order.status !== "已送達").map((order) => order.table))
    const freeTables = tableMap.map(([id]) => id).filter((id) => !occupied.has(id))
    const table = freeTables[Math.floor(Math.random() * freeTables.length)] || `N${orders.length + 1}`
    const newOrder = {
      id: `ORD-${1042 + orders.length}`,
      table,
      guest: "現場新客",
      status: "新單",
      channel: "櫃台新增",
      items: picked.map((item) => item.name),
      total: picked.reduce((sum, item) => sum + item.price, 0),
      minutes: 0,
      staff: staffPool[Math.floor(Math.random() * staffPool.length)],
      note: notePool[Math.floor(Math.random() * notePool.length)],
    }
    setOrders((current) => [newOrder, ...current])
    setSelectedId(newOrder.id)
    setMode("服務端")
    setMessage(`已新增 ${table} 現場新單（${newOrder.items.length} 個品項）。`)
  }

  function submitCart(diningNote) {
    if (cart.length === 0) return
    const newOrder = {
      id: `ORD-${1042 + orders.length}`,
      table: clientTable,
      guest: "桌邊點餐",
      status: "新單",
      channel: "桌邊 QR",
      items: cart.map((item) => `${item.name} x${item.qty}`),
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      minutes: 0,
      staff: "Mina",
      note: diningNote || "客戶端送出，確認後進入備餐。",
    }
    setOrders((current) => [newOrder, ...current])
    setSelectedId(newOrder.id)
    setCart([])
    setSubmitted(true)
    setMessage(`${clientTable} 桌邊點單已送到服務端。`)
    window.setTimeout(() => setMode("服務端"), 650)
  }

  function advanceOrders() {
    const current = selectedOrder
    if (!current) {
      setMessage("目前沒有可更新的訂單。")
      return
    }
    const next = nextStatus(current.status)
    setOrders((items) =>
      items.map((order) =>
        order.id === selectedId ? { ...order, status: next, minutes: Math.max(0, order.minutes - 3) } : order
      )
    )
    setMessage(`${current.table} 已更新為「${next}」。`)
  }

  function settleOrder() {
    if (!selectedOrder) {
      setOrders(initialOrders)
      setSelectedId(initialOrders[0].id)
      setMessage("已重置範例佇列。")
      return
    }

    const nextOrders = orders.filter((order) => order.id !== selectedId)
    if (nextOrders.length === 0) {
      setOrders(initialOrders)
      setSelectedId(initialOrders[0].id)
      setMessage(`${selectedOrder.table} 已清桌，範例佇列已重置。`)
      return
    }

    setOrders(nextOrders)
    setSelectedId(nextOrders[0].id)
    setMessage(`${selectedOrder.table} 已結帳並清桌。`)
  }

  return (
    <main className="min-h-screen bg-[#f5eadb] text-[#3a2419]">
      <Seo
        page={{
          path: "/works/restaurant-ordering",
          title: "餐飲點餐系統｜桌邊點餐、廚房佇列與桌況控台｜Qingyu Web Studio",
          description: "可直接操作的點餐系統展示：客戶端選桌點餐、服務端控單、出餐站別負載與桌況即時連動。",
        }}
      />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_10%,rgba(255,255,255,0.9),transparent_26rem),radial-gradient(circle_at_88%_4%,rgba(36,67,50,0.14),transparent_24rem),radial-gradient(circle_at_78%_72%,rgba(199,93,44,0.12),transparent_24rem),linear-gradient(180deg,#fff8ec,#f2e1cd_54%,#e6d0b8)]" />
      <div className="relative">
        <Header mode={mode} setMode={setMode} time={time} onAddOrder={addOrder} />
        <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-6 md:px-7 md:py-8">
          <HeroStatus orders={orders} revenue={revenue} selectedOrder={selectedOrder || initialOrders[0]} />
          {mode === "客戶端" ? (
            <ClientView
              cart={cart}
              setCart={setCart}
              submitted={submitted}
              onSubmit={submitCart}
              clientTable={clientTable}
              setClientTable={setClientTable}
              orders={orders}
            />
          ) : (
            <ServiceView orders={orders} selectedId={selectedId} setSelectedId={setSelectedId} onAdvance={advanceOrders} onSettle={settleOrder} />
          )}
          <div className="flex flex-col gap-3 rounded-[1.35rem] border border-[#dfd0bc] bg-[#fffaf2]/86 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-2xl font-black text-[#3a2419]">餐飲點餐系統</p>
              <p className="mt-1 text-sm font-bold text-[#806a59]">客戶端點餐、服務端控單、桌況、站別負載與出餐節奏一次展示。</p>
            </div>
            <Link to="/" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dfd0bc] bg-white px-5 text-sm font-black text-[#3a2419]">
              回主頁
            </Link>
          </div>
        </div>
      </div>
      <ToastBar message={message} />
    </main>
  )
}

export default RestaurantOrdering
