import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const menuItems = [
  { id: "m1", name: "炙燒牛排飯", price: 260, category: "主餐", note: "範例圖片", color: "from-[#fbe6d5] to-[#fffaf4]" },
  { id: "m2", name: "松露野菇燉飯", price: 220, category: "主餐", note: "範例圖片", color: "from-[#f2e2ce] to-[#fffaf4]" },
  { id: "m3", name: "柚香氣泡飲", price: 120, category: "飲品", note: "空圖片", color: "from-[#ffe8d8] to-[#fffaf4]" },
  { id: "m4", name: "焦糖布丁", price: 95, category: "甜點", note: "空圖片", color: "from-[#f8d1b6] to-[#fffaf4]" },
]

const initialOrders = [
  {
    id: "A07",
    table: "A07",
    guest: "中島",
    status: "製作中",
    items: ["炙燒牛排飯", "柚香氣泡飲"],
    total: 380,
    minutes: 12,
  },
  {
    id: "B12",
    table: "B12",
    guest: "包廂",
    status: "待送餐",
    items: ["松露野菇燉飯", "焦糖布丁"],
    total: 315,
    minutes: 18,
  },
  {
    id: "C03",
    table: "C03",
    guest: "靠窗",
    status: "新單",
    items: ["炙燒牛排飯"],
    total: 260,
    minutes: 4,
  },
]

const tables = [
  ["A02", "窗邊", "用餐中"],
  ["A07", "中島", "可入座"],
  ["B12", "包廂", "用餐中"],
  ["C03", "靠窗", "清桌中"],
  ["D08", "吧台", "候位中"],
  ["F01", "戶外", "可入座"],
]

const statusOrder = ["新單", "製作中", "待送餐", "已送達"]

function money(value) {
  return `$${value.toLocaleString("en-US")}`
}

function StatusBadge({ children }) {
  const tone =
    children === "已送達"
      ? "bg-[#f1efe8] text-[#8a6b5a]"
      : children === "待送餐"
        ? "bg-[#fff1dd] text-[#a7602d]"
        : children === "製作中"
          ? "bg-[#ffe6d9] text-[#df3b25]"
          : "bg-[#e93823] text-white"

  return <span className={`rounded-full px-3 py-1 text-xs font-black ${tone}`}>{children}</span>
}

function Header({ mode, setMode, time, onAddOrder }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#ead9ca] bg-[#fffaf3]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 md:h-20 md:px-7">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e93823] text-xl font-black text-white shadow-lg shadow-[#e93823]/20">
            L
          </div>
          <div>
            <p className="font-serif text-xl font-black leading-none tracking-[-0.03em] text-[#3a2117] md:text-2xl">Luma Table</p>
            <p className="text-xs font-black tracking-[0.12em] text-[#8a6b5a]">點餐與出餐系統</p>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-[#ead9ca] bg-[#fffdf8] p-1 md:flex">
          {["客戶端", "服務端"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-xl px-5 text-sm font-black ${mode === item ? "bg-[#e93823] text-white shadow-lg shadow-[#e93823]/20" : "text-[#3a2117] hover:bg-[#f7efe6]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-xl border border-[#ead9ca] bg-[#fffdf8] px-4 py-2 text-sm font-black text-[#3a2117] lg:inline-flex">{time}</span>
          <button type="button" onClick={onAddOrder} className="min-h-11 rounded-xl bg-[#3a2117] px-4 text-sm font-black text-white shadow-lg shadow-[#3a2117]/12">
            模擬新單
          </button>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] gap-2 px-4 pb-3 md:hidden">
        {["客戶端", "服務端"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`min-h-11 flex-1 rounded-xl text-sm font-black ${mode === item ? "bg-[#e93823] text-white shadow-lg shadow-[#e93823]/20" : "border border-[#ead9ca] bg-[#fffdf8] text-[#3a2117]"}`}
          >
            {item}
          </button>
        ))}
      </div>
    </header>
  )
}

function HeroStatus({ orders, revenue }) {
  const openOrders = orders.filter((order) => order.status !== "已送達").length
  const kitchenLoad = orders.filter((order) => order.status === "製作中").length * 8 + 42

  return (
    <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
      <article className="rounded-[1.35rem] border border-[#ead9ca] bg-[#fffdf8]/88 p-6 shadow-xl shadow-[#3a2117]/6 backdrop-blur md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e93823]">Restaurant OS</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.7rem,7vw,5rem)] font-black leading-[0.96] tracking-[-0.055em] text-[#3a2117]">
          午餐尖峰，桌邊單已進入廚房節奏。
        </h1>
        <p className="mt-5 text-sm font-bold leading-7 text-[#8a6b5a] md:text-base">
          A07 已開桌，吧台先清飲品；熱食維持 16 分鐘內，甜點延後。
        </p>
        <div className="mt-7 flex items-center gap-4">
          <div className="h-2 w-48 max-w-[46vw] overflow-hidden rounded-full bg-[#eee4db]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#f59b45] to-[#e93823]" style={{ width: "100%" }} />
          </div>
          <p className="text-sm font-black text-[#e93823]">100% flow</p>
          <p className="hidden text-sm font-bold text-[#8a6b5a] sm:block">炭烤時蔬鷹嘴豆盤 正在成為下一波熱門餐點。</p>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
        <Kpi title="未完成單" value={openOrders} note="1 單待送餐" />
        <Kpi title="廚房負載" value={kitchenLoad} note="份餐點製作中" suffix="" />
        <Kpi title="目前營收" value={money(revenue)} note="含現場與新增點單" money />
      </div>
    </section>
  )
}

function Kpi({ title, value, note, money = false }) {
  return (
    <article className="rounded-[1.25rem] border border-[#ead9ca] bg-[#fffdf8]/88 p-5 shadow-sm backdrop-blur">
      <p className="font-serif text-lg font-black text-[#8a6b5a]">{title}</p>
      <p className={`mt-10 font-serif font-black leading-none text-[#e93823] ${money ? "text-5xl" : "text-6xl"}`}>{value}</p>
      <p className="mt-7 text-sm font-black text-[#8a6b5a]">{note}</p>
      <div className="mt-8 h-2 rounded-full bg-[#eee4db]">
        <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[#f59b45] to-[#e93823]" />
      </div>
    </article>
  )
}

function ClientView({ cart, setCart, submitted, onSubmit }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addItem(item) {
    setCart((current) => {
      const found = current.find((entry) => entry.id === item.id)
      if (found) return current.map((entry) => (entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry))
      return [...current, { ...item, qty: 1 }]
    })
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="rounded-[1.35rem] border border-[#ead9ca] bg-[#fffdf8]/9 p-5 shadow-sm">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e93823]">Customer Menu</p>
            <h2 className="mt-2 font-serif text-4xl font-black tracking-[-0.04em] text-[#3a2117]">桌邊點餐</h2>
          </div>
          <span className="rounded-full bg-[#fff1dd] px-4 py-2 text-xs font-black text-[#a7602d]">範例圖片模式</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {menuItems.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[#ead9ca] bg-white p-4">
              <div className={`grid aspect-[4/2.4] place-items-center rounded-xl bg-gradient-to-br ${item.color}`}>
                <span className="text-sm font-black text-[#a77a62]">{item.note}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-2xl font-black text-[#3a2117]">{item.name}</p>
                  <p className="mt-1 text-sm font-bold text-[#8a6b5a]">{item.category}</p>
                </div>
                <p className="font-serif text-2xl font-black text-[#e93823]">${item.price}</p>
              </div>
              <button type="button" onClick={() => addItem(item)} className="mt-4 min-h-11 w-full rounded-xl bg-[#e93823] text-sm font-black text-white">
                加入點單
              </button>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-[1.35rem] border border-[#ead9ca] bg-[#fffdf8] p-5 shadow-xl shadow-[#3a2117]/8">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e93823]">Cart</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-[#3a2117]">A07 點單</h2>
        <div className="mt-5 grid gap-3">
          {submitted ? <div className="rounded-2xl bg-[#eef7e9] p-4 text-sm font-black text-[#526828]">已送出到服務端，廚房佇列已更新。</div> : null}
          {cart.length === 0 ? (
            <div className="rounded-2xl bg-[#fff5ea] p-4 text-sm font-bold text-[#8a6b5a]">尚未加入餐點。</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl bg-[#fff5ea] px-4 py-3">
                <div>
                  <p className="text-sm font-black text-[#3a2117]">{item.name}</p>
                  <p className="text-xs font-bold text-[#8a6b5a]">x {item.qty}</p>
                </div>
                <p className="font-black text-[#e93823]">${item.price * item.qty}</p>
              </div>
            ))
          )}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#ead9ca] pt-5">
          <span className="text-sm font-black text-[#8a6b5a]">小計</span>
          <span className="font-serif text-4xl font-black text-[#3a2117]">{money(total)}</span>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={cart.length === 0}
          className="mt-5 min-h-12 w-full rounded-xl bg-[#3a2117] text-sm font-black text-white disabled:opacity-50"
        >
          送出範例點單
        </button>
      </aside>
    </section>
  )
}

function ServiceView({ orders, onAdvance }) {
  const [filter, setFilter] = useState("全部")
  const shown = filter === "全部" ? orders : orders.filter((order) => order.status === filter)

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_460px]">
      <div className="rounded-[1.35rem] border border-[#ead9ca] bg-[#fffdf8]/9 p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e93823]">Kitchen Rail</p>
            <h2 className="mt-2 font-serif text-4xl font-black tracking-[-0.04em] text-[#3a2117]">廚房佇列</h2>
          </div>
          <button type="button" onClick={onAdvance} className="min-h-12 rounded-xl bg-[#e93823] px-5 text-sm font-black text-white">
            推進出餐
          </button>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#ead9ca] bg-white p-2">
          {["全部", "新單", "製作中", "待送餐", "已送達"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`min-h-11 shrink-0 rounded-xl px-4 text-sm font-black ${filter === item ? "bg-[#e93823] text-white" : "bg-[#fffaf3] text-[#3a2117]"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((order) => (
            <article key={order.id} className="rounded-2xl border border-[#ead9ca] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-2xl font-black text-[#3a2117]">{order.table}</p>
                  <p className="mt-1 text-sm font-bold text-[#8a6b5a]">{order.guest}</p>
                </div>
                <StatusBadge>{order.status}</StatusBadge>
              </div>
              <div className="mt-5 grid gap-2">
                {order.items.map((item) => (
                  <div key={item} className="rounded-xl bg-[#fff5ea] px-3 py-2 text-sm font-black text-[#6f4633]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-sm font-black">
                <span className="text-[#8a6b5a]">{order.minutes} 分鐘</span>
                <span className="text-[#e93823]">{money(order.total)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <FloorPanel />
    </section>
  )
}

function FloorPanel() {
  return (
    <aside className="rounded-[1.35rem] border border-[#ead9ca] bg-[#fffdf8]/9 p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e93823]">Floor</p>
      <h2 className="mt-2 font-serif text-4xl font-black tracking-[-0.04em] text-[#3a2117]">桌況</h2>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {tables.map(([id, place, status]) => (
          <div key={id} className={`rounded-2xl border p-4 ${status === "可入座" ? "border-[#ead9ca] bg-white" : "border-[#f08b78] bg-[#fff3ed]"}`}>
            <p className="font-serif text-3xl font-black text-[#3a2117]">{id}</p>
            <p className="mt-3 text-sm font-black text-[#8a6b5a]">{place}</p>
            <p className="mt-1 text-sm font-black text-[#8a6b5a]">{status}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}

function RestaurantOrdering() {
  const [mode, setMode] = useState("服務端")
  const [orders, setOrders] = useState(initialOrders)
  const [cart, setCart] = useState([])
  const [submitted, setSubmitted] = useState(false)

  const time = useMemo(
    () =>
      new Intl.DateTimeFormat("zh-TW", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date()),
    []
  )

  const revenue = orders.reduce((sum, order) => sum + order.total, 0) + cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addOrder() {
    const next = orders.length + 1
    setOrders((current) => [
      {
        id: `N${next}`,
        table: `N${next}`,
        guest: "現場新客",
        status: "新單",
        items: ["柚香氣泡飲", "焦糖布丁"],
        total: 215,
        minutes: 1,
      },
      ...current,
    ])
    setMode("服務端")
  }

  function submitCart() {
    if (cart.length === 0) return
    setOrders((current) => [
      {
        id: `A${current.length + 8}`,
        table: "A07",
        guest: "桌邊點餐",
        status: "新單",
        items: cart.map((item) => `${item.name} x${item.qty}`),
        total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
        minutes: 0,
      },
      ...current,
    ])
    setSubmitted(true)
    window.setTimeout(() => setMode("服務端"), 650)
  }

  function advanceOrders() {
    setOrders((current) =>
      current.map((order, index) => {
        if (index > 1) return order
        const currentIndex = statusOrder.indexOf(order.status)
        return { ...order, status: statusOrder[Math.min(currentIndex + 1, statusOrder.length - 1)] }
      })
    )
  }

  return (
    <main className="min-h-screen bg-[#f7efe6] text-[#3a2117]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.92),transparent_24rem),radial-gradient(circle_at_88%_2%,rgba(233,56,35,0.12),transparent_24rem),linear-gradient(180deg,#fffaf3,#f3e6d9_52%,#ead8c6)]" />
      <div className="relative">
        <Header mode={mode} setMode={setMode} time={time} onAddOrder={addOrder} />
        <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-6 md:px-7 md:py-8">
          <HeroStatus orders={orders} revenue={revenue} />
          {mode === "客戶端" ? <ClientView cart={cart} setCart={setCart} submitted={submitted} onSubmit={submitCart} /> : <ServiceView orders={orders} onAdvance={advanceOrders} />}
          <div className="flex flex-col gap-3 rounded-[1.35rem] border border-[#ead9ca] bg-[#fffdf8]/86 p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-2xl font-black text-[#3a2117]">餐飲點餐系統 Demo</p>
              <p className="mt-1 text-sm font-bold text-[#8a6b5a]">客戶端點餐、服務端控單、桌況與出餐節奏一次展示。</p>
            </div>
            <Link to="/" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#ead9ca] bg-white px-5 text-sm font-black text-[#3a2117]">
              回主頁
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RestaurantOrdering
