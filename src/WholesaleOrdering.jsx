import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"

const customers = [
  { id: "hotpot", name: "阿明火鍋店", area: "屏東市", monthly: 86420 },
  { id: "brunch", name: "東港早午餐", area: "東港", monthly: 52180 },
  { id: "bento", name: "屏東便當店", area: "潮州", monthly: 73400 },
]

const products = [
  {
    id: "cabbage",
    name: "高麗菜",
    category: "葉菜",
    unit: "箱",
    spec: "20kg",
    vendor: "青禾農產",
    stock: "現貨",
    prices: { hotpot: 480, brunch: 500, bento: 460 },
    tone: "from-[#d9edc7] via-[#fff8ee] to-[#e7efe1]",
  },
  {
    id: "banana",
    name: "香蕉",
    category: "水果",
    unit: "籃",
    spec: "13kg",
    vendor: "南州果行",
    stock: "預訂",
    prices: { hotpot: 650, brunch: 680, bento: 620 },
    tone: "from-[#f8df99] via-[#fff8ee] to-[#f0ead9]",
  },
  {
    id: "tomato",
    name: "番茄",
    category: "蔬果",
    unit: "箱",
    spec: "8kg",
    vendor: "佳冬農場",
    stock: "現貨",
    prices: { hotpot: 900, brunch: 880, bento: 920 },
    tone: "from-[#f5b49b] via-[#fff8ee] to-[#f1e4d7]",
  },
  {
    id: "lettuce",
    name: "蘿蔓生菜",
    category: "葉菜",
    unit: "箱",
    spec: "12入",
    vendor: "青禾農產",
    stock: "低溫",
    prices: { hotpot: 520, brunch: 540, bento: 500 },
    tone: "from-[#cae8bf] via-[#fff8ee] to-[#edf4e6]",
  },
  {
    id: "chicken",
    name: "雞胸肉",
    category: "冷藏",
    unit: "箱",
    spec: "30包",
    vendor: "信安冷鏈",
    stock: "冷藏",
    prices: { hotpot: 1380, brunch: 1420, bento: 1350 },
    tone: "from-[#ead2bd] via-[#fff8ee] to-[#e7f0ef]",
  },
  {
    id: "almond",
    name: "杏仁片",
    category: "乾貨",
    unit: "包",
    spec: "3kg",
    vendor: "宏盛食品",
    stock: "現貨",
    prices: { hotpot: 880, brunch: 920, bento: 860 },
    tone: "from-[#efd29b] via-[#fff8ee] to-[#f1eadc]",
  },
]

const categories = ["全部", "葉菜", "水果", "蔬果", "冷藏", "乾貨"]
const statuses = ["新訂單", "待確認", "待出貨", "已出貨"]

const initialOrders = [
  {
    id: "B2B-2407",
    customerId: "hotpot",
    status: "待確認",
    source: "客戶端 APP",
    createdAt: "今日 09:18",
    items: [
      { productId: "cabbage", quantity: 2 },
      { productId: "lettuce", quantity: 1 },
      { productId: "chicken", quantity: 1 },
    ],
    note: "明天 10:00 前到貨，葉菜可替代同級品。",
  },
  {
    id: "B2B-2406",
    customerId: "brunch",
    status: "已出貨",
    source: "LINE 補單",
    createdAt: "昨日 15:42",
    items: [
      { productId: "banana", quantity: 2 },
      { productId: "almond", quantity: 1 },
    ],
    note: "已併入本月對帳。",
  },
]

const valuePoints = ["減少 LINE 訂單漏看", "客戶價目統一管理", "出貨前可修正數量", "月結對帳更快", "採購叫貨不用人工加總"]

function money(value) {
  return `NT$${value.toLocaleString("zh-TW")}`
}

function getCustomer(customerId) {
  return customers.find((customer) => customer.id === customerId) || customers[0]
}

function getProduct(productId) {
  return products.find((product) => product.id === productId) || products[0]
}

function getPrice(product, customerId) {
  return product.prices[customerId] || Object.values(product.prices)[0]
}

function getOrderTotal(order) {
  return order.items.reduce((sum, item) => {
    const product = getProduct(item.productId)
    return sum + getPrice(product, order.customerId) * item.quantity
  }, 0)
}

function statusTone(status) {
  if (status === "已出貨") return "bg-[#e5f2df] text-[#2f6234]"
  if (status === "待出貨") return "bg-[#e6eef7] text-[#24567a]"
  if (status === "待確認") return "bg-[#fff0d6] text-[#985915]"
  return "bg-[#f1e7dc] text-[#715b45]"
}

function WholesaleOrdering() {
  const [mode, setMode] = useState("客戶端")
  const [customerId, setCustomerId] = useState(customers[0].id)
  const [category, setCategory] = useState("全部")
  const [cart, setCart] = useState({ cabbage: 1, tomato: 1 })
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrders[0].id)
  const [toast, setToast] = useState("")
  const [copied, setCopied] = useState("")

  const selectedCustomer = getCustomer(customerId)
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0]
  const selectedOrderCustomer = getCustomer(selectedOrder.customerId)
  const shownProducts = category === "全部" ? products : products.filter((product) => product.category === category)

  const cartItems = useMemo(
    () =>
      products
        .map((product) => ({
          ...product,
          quantity: cart[product.id] || 0,
          price: getPrice(product, customerId),
        }))
        .filter((product) => product.quantity > 0),
    [cart, customerId],
  )

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const unshippedOrders = orders.filter((order) => order.status !== "已出貨")
  const shippedOrders = orders.filter((order) => order.status === "已出貨")
  const monthTotal = orders.reduce((sum, order) => sum + getOrderTotal(order), 0)

  const purchaseRows = useMemo(() => {
    const summary = new Map()
    unshippedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = getProduct(item.productId)
        const key = product.id
        const current = summary.get(key) || { name: product.name, vendor: product.vendor, quantity: 0, unit: product.unit }
        summary.set(key, { ...current, quantity: current.quantity + item.quantity })
      })
    })
    return Array.from(summary.values())
  }, [unshippedOrders])

  function flash(message) {
    setToast(message)
    window.setTimeout(() => setToast(""), 1800)
  }

  function updateCart(productId, delta) {
    setCart((current) => ({ ...current, [productId]: Math.max(0, (current[productId] || 0) + delta) }))
  }

  function submitOrder() {
    if (cartItems.length === 0) {
      flash("請先加入商品")
      return
    }

    const nextOrder = {
      id: `B2B-${2500 + orders.length + 1}`,
      customerId,
      status: "新訂單",
      source: "客戶端 APP",
      createdAt: "剛剛",
      items: cartItems.map((item) => ({ productId: item.id, quantity: item.quantity })),
      note: "客戶端送出，後台可調整數量與出貨狀態。",
    }
    setOrders((current) => [nextOrder, ...current])
    setSelectedOrderId(nextOrder.id)
    setMode("後台端")
    flash("訂單已進入後台")
  }

  function setOrderStatus(status) {
    setOrders((current) =>
      current.map((order) => (order.id === selectedOrder.id ? { ...order, status } : order)),
    )
    flash(status === "已出貨" ? "出貨狀態已更新" : "訂單狀態已更新")
  }

  function updateOrderItem(productId, delta) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== selectedOrder.id) return order
        return {
          ...order,
          items: order.items.map((item) =>
            item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
          ),
        }
      }),
    )
    flash("數量已修正")
  }

  function copyPurchaseList(type) {
    const content = purchaseRows.map((row) => `${row.vendor}｜${row.name} ${row.quantity}${row.unit}`).join("\n")
    navigator.clipboard?.writeText(content)
    setCopied(type)
    flash(`${type} 已整理`)
  }

  return (
    <main className="min-h-screen bg-[#f6efe3] text-[#26342c]">
      <Seo
        page={{
          path: "/works/wholesale-ordering",
          title: "批發訂貨系統｜B2B 訂貨、報價、叫貨與月結管理 Demo",
          description: "批發訂貨系統成品展示，包含客戶端下單、客戶分級報價、後台訂單管理、出貨狀態、採購叫貨單與月結對帳。",
        }}
      />

      <Header mode={mode} setMode={setMode} onSubmit={submitOrder} />

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 md:grid-cols-[1.08fr_0.92fr] md:px-7 md:py-8">
        <HeroPanel openOrders={unshippedOrders.length} shippedOrders={shippedOrders.length} monthTotal={monthTotal} />
        <ClientPhone
          customer={selectedCustomer}
          products={products.slice(0, 4)}
          cartItems={cartItems}
          monthTotal={selectedCustomer.monthly}
          onSubmit={submitOrder}
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 md:grid-cols-[1.04fr_0.96fr] md:px-7">
        <ClientOrdering
          customerId={customerId}
          setCustomerId={setCustomerId}
          category={category}
          setCategory={setCategory}
          shownProducts={shownProducts}
          cart={cart}
          updateCart={updateCart}
          cartItems={cartItems}
          cartTotal={cartTotal}
          onSubmit={submitOrder}
        />
        <BackOffice
          orders={orders}
          selectedOrder={selectedOrder}
          selectedOrderCustomer={selectedOrderCustomer}
          setSelectedOrderId={setSelectedOrderId}
          updateOrderItem={updateOrderItem}
          setOrderStatus={setOrderStatus}
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[0.9fr_1.1fr] md:px-7">
        <PriceMatrix />
        <WorkflowPanel purchaseRows={purchaseRows} copied={copied} onCopy={copyPurchaseList} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-[0.92fr_1.08fr] md:px-7">
        <MonthClose orders={orders} monthTotal={monthTotal} />
        <ValuePanel />
      </section>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl bg-[#253f31] px-5 py-4 text-sm font-black text-white shadow-2xl shadow-[#253f31]/25">
          {toast}
        </div>
      ) : null}
    </main>
  )
}

function Header({ mode, setMode, onSubmit }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#decfb7] bg-[#f6efe3]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:px-7">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#263f31] text-sm font-black text-[#f1c66c]">B2B</span>
          <div>
            <p className="font-serif text-xl font-black leading-none text-[#2d231d] md:text-2xl">批發訂貨系統</p>
            <p className="mt-1 text-xs font-black tracking-[0.12em] text-[#8b735f]">訂貨 · 報價 · 叫貨 · 月結</p>
          </div>
        </Link>

        <div className="hidden rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-1 md:flex">
          {["客戶端", "後台端", "月結"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`min-h-11 rounded-xl px-5 text-sm font-black ${
                mode === item ? "bg-[#263f31] text-white shadow-lg shadow-[#263f31]/15" : "text-[#4f4035]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button type="button" onClick={onSubmit} className="min-h-11 rounded-xl bg-[#c76532] px-4 text-sm font-black text-white shadow-lg shadow-[#c76532]/18">
          送出訂單
        </button>
      </div>
    </header>
  )
}

function HeroPanel({ openOrders, shippedOrders, monthTotal }) {
  return (
    <section className="overflow-hidden rounded-[1.9rem] border border-[#decfb7] bg-[#fffaf2]/88 p-6 shadow-sm backdrop-blur md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.26em] text-[#c76532]">B2B Wholesale OS</p>
      <h1 className="mt-4 font-serif text-[clamp(2.2rem,7vw,5.15rem)] font-black leading-[0.98] text-[#2d231d]">
        客戶下單，
        <br />
        後台出貨。
      </h1>
      <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-[#725f50] md:text-base">
        客戶用手機看商品與專屬價格，老闆在後台修正數量、產生叫貨單、追蹤出貨與月結。
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Metric title="未出貨" value={`${openOrders} 單`} />
        <Metric title="已出貨" value={`${shippedOrders} 單`} />
        <Metric title="本月訂單" value={money(monthTotal)} />
      </div>
    </section>
  )
}

function Metric({ title, value }) {
  return (
    <div className="rounded-2xl border border-[#decfb7] bg-white/84 p-4">
      <p className="text-xs font-black text-[#8b735f]">{title}</p>
      <p className="mt-2 font-serif text-2xl font-black text-[#c76532]">{value}</p>
    </div>
  )
}

function ClientPhone({ customer, products: phoneProducts, cartItems, monthTotal, onSubmit }) {
  return (
    <section className="rounded-[1.9rem] border border-[#decfb7] bg-[#263f31] p-5 text-white shadow-xl shadow-[#263f31]/15">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0c879]">Client App</p>
          <h2 className="mt-2 font-serif text-3xl font-black">手機下單</h2>
        </div>
        <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black">{customer.name}</span>
      </div>

      <div className="mx-auto mt-5 max-w-[330px] rounded-[2rem] border border-white/18 bg-[#f7efe3] p-3 text-[#2d231d] shadow-2xl shadow-black/20">
        <div className="rounded-[1.55rem] bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-[#8b735f]">本月總額</p>
              <p className="font-serif text-2xl font-black text-[#c76532]">{money(monthTotal)}</p>
            </div>
            <span className="rounded-full bg-[#e5f2df] px-3 py-1 text-xs font-black text-[#2f6234]">專屬價</span>
          </div>

          <div className="mt-4 grid gap-2">
            {phoneProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl bg-[#f7efe3] p-3">
                <div>
                  <p className="text-sm font-black">{product.name}</p>
                  <p className="mt-1 text-xs font-bold text-[#8b735f]">{product.spec} · {product.stock}</p>
                </div>
                <p className="text-sm font-black text-[#c76532]">{money(getPrice(product, customer.id))}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-3">
            <p className="text-xs font-black text-[#8b735f]">訂單確認</p>
            <p className="mt-1 text-sm font-black">{cartItems.length} 項商品 · 歷史訂單可查</p>
          </div>
          <button type="button" onClick={onSubmit} className="mt-4 min-h-11 w-full rounded-2xl bg-[#263f31] text-sm font-black text-white">
            送出訂單
          </button>
        </div>
      </div>
    </section>
  )
}

function ClientOrdering({ customerId, setCustomerId, category, setCategory, shownProducts, cart, updateCart, cartItems, cartTotal, onSubmit }) {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-4 shadow-sm backdrop-blur md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Customer Order</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d] md:text-5xl">客戶端下單</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-[#decfb7] bg-white p-2">
          {customers.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => setCustomerId(customer.id)}
              className={`min-h-10 shrink-0 rounded-xl px-4 text-sm font-black ${customerId === customer.id ? "bg-[#263f31] text-white" : "bg-[#f7efe3] text-[#4f4035]"}`}
            >
              {customer.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#decfb7] bg-white p-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`min-h-10 shrink-0 rounded-xl px-4 text-sm font-black ${category === item ? "bg-[#c76532] text-white" : "bg-[#f7efe3] text-[#4f4035]"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shownProducts.map((product) => {
          const quantity = cart[product.id] || 0
          return (
            <article key={product.id} className="overflow-hidden rounded-[1.4rem] border border-[#decfb7] bg-white shadow-sm">
              <div className={`h-28 bg-gradient-to-br ${product.tone} p-4`}>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/84 px-3 py-1 text-xs font-black text-[#4c3a2c]">{product.category}</span>
                  <span className="rounded-full bg-[#263f31] px-3 py-1 text-xs font-black text-white">{product.stock}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-black text-[#8b735f]">{product.vendor} · {product.spec}</p>
                <h3 className="mt-2 text-xl font-black text-[#2d231d]">{product.name}</h3>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="font-serif text-2xl font-black text-[#c76532]">{money(getPrice(product, customerId))}</p>
                    <p className="text-xs font-bold text-[#8b735f]">每 {product.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => updateCart(product.id, -1)} className="grid h-9 w-9 place-items-center rounded-full border border-[#decfb7] bg-[#fffaf2] font-black">
                      -
                    </button>
                    <span className="min-w-6 text-center text-sm font-black">{quantity}</span>
                    <button type="button" onClick={() => updateCart(product.id, 1)} className="grid h-9 w-9 place-items-center rounded-full bg-[#263f31] font-black text-white">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-[#decfb7] bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black text-[#8b735f]">訂單確認</p>
            <p className="mt-1 font-serif text-3xl font-black text-[#2d231d]">{money(cartTotal)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cartItems.slice(0, 3).map((item) => (
              <span key={item.id} className="rounded-full bg-[#f7efe3] px-3 py-2 text-xs font-black text-[#4f4035]">
                {item.name} x{item.quantity}
              </span>
            ))}
          </div>
          <button type="button" onClick={onSubmit} className="min-h-11 rounded-xl bg-[#c76532] px-5 text-sm font-black text-white">
            送出訂單
          </button>
        </div>
      </div>
    </section>
  )
}

function BackOffice({ orders, selectedOrder, selectedOrderCustomer, setSelectedOrderId, updateOrderItem, setOrderStatus }) {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Back Office</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d] md:text-5xl">後台管理</h2>
        </div>
        <span className="rounded-full bg-[#f1e7dc] px-3 py-1 text-xs font-black text-[#715b45]">今日訂單</span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="grid gap-3">
          {orders.map((order) => {
            const customer = getCustomer(order.customerId)
            return (
              <button key={order.id} type="button" onClick={() => setSelectedOrderId(order.id)} className="text-left">
                <article className={`rounded-2xl border p-4 transition ${order.id === selectedOrder.id ? "border-[#c76532] bg-[#fff7ec]" : "border-[#decfb7] bg-[#f7efe3]"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-[#2d231d]">{customer.name}</p>
                      <p className="mt-1 text-xs font-bold text-[#8b735f]">{order.id} · {order.createdAt}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(order.status)}`}>{order.status}</span>
                  </div>
                  <p className="mt-3 text-xs font-bold text-[#725f50]">{order.items.length} 項 · {money(getOrderTotal(order))}</p>
                </article>
              </button>
            )
          })}
        </div>

        <article className="rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black text-[#8b735f]">{selectedOrder.source}</p>
              <h3 className="mt-1 text-2xl font-black text-[#2d231d]">{selectedOrderCustomer.name}</h3>
              <p className="mt-1 text-sm font-bold text-[#725f50]">{selectedOrder.note}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(selectedOrder.status)}`}>{selectedOrder.status}</span>
          </div>

          <div className="mt-4 grid gap-3">
            {selectedOrder.items.map((item) => {
              const product = getProduct(item.productId)
              return (
                <div key={item.productId} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-white p-3">
                  <div>
                    <p className="text-sm font-black text-[#2d231d]">{product.name}</p>
                    <p className="mt-1 text-xs font-bold text-[#8b735f]">
                      {product.vendor} · {money(getPrice(product, selectedOrder.customerId))}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => updateOrderItem(product.id, -1)} className="grid h-8 w-8 place-items-center rounded-full border border-[#decfb7] bg-[#fffaf2] text-sm font-black">
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                    <button type="button" onClick={() => updateOrderItem(product.id, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-[#263f31] text-sm font-black text-white">
                      +
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#decfb7] pt-4">
            <p className="font-serif text-3xl font-black text-[#c76532]">{money(getOrderTotal(selectedOrder))}</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setOrderStatus(status)}
                  className={`min-h-10 rounded-xl px-4 text-xs font-black ${selectedOrder.status === status ? "bg-[#263f31] text-white" : "border border-[#decfb7] bg-white text-[#4f4035]"}`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function PriceMatrix() {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Customer Pricing</p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">客戶分級報價</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#decfb7] text-xs font-black text-[#8b735f]">
              <th className="py-3">商品</th>
              {customers.map((customer) => (
                <th key={customer.id} className="px-4 py-3">{customer.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 4).map((product) => (
              <tr key={product.id} className="border-b border-[#eee3d4]">
                <td className="py-3 font-black text-[#2d231d]">{product.name}</td>
                {customers.map((customer) => (
                  <td key={customer.id} className="px-4 py-3 font-bold text-[#4f4035]">{money(getPrice(product, customer.id))}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function WorkflowPanel({ purchaseRows, copied, onCopy }) {
  const flow = ["客戶下單", "後台收到訂單", "出貨前修正數量", "產生叫貨單", "出貨狀態更新", "月結對帳"]
  return (
    <section className="grid gap-6">
      <div className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Order Flow</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">訂單流程</h2>
        <div className="mt-5 grid gap-2 md:grid-cols-6">
          {flow.map((item, index) => (
            <div key={item} className="rounded-2xl border border-[#decfb7] bg-white p-3">
              <p className="text-xs font-black text-[#c76532]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-black text-[#2d231d]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#decfb7] bg-[#263f31] p-5 text-white shadow-xl shadow-[#263f31]/12">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0c879]">Purchase List</p>
            <h2 className="mt-2 font-serif text-3xl font-black">採購 / 叫貨單</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Excel", "PDF", "LINE文字"].map((type) => (
              <button key={type} type="button" onClick={() => onCopy(type)} className="min-h-10 rounded-xl bg-white/12 px-4 text-xs font-black text-white">
                {copied === type ? "已整理" : `匯出 ${type}`}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-2">
          {purchaseRows.map((row) => (
            <div key={row.name} className="flex items-center justify-between rounded-2xl bg-white/10 p-3">
              <div>
                <p className="text-sm font-black">{row.name}</p>
                <p className="mt-1 text-xs font-bold text-white/62">{row.vendor}</p>
              </div>
              <p className="font-serif text-2xl font-black text-[#f0c879]">{row.quantity}{row.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MonthClose({ orders, monthTotal }) {
  const currentCustomer = customers[0]
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Monthly Close</p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">月結對帳</h2>
      <div className="mt-5 rounded-2xl bg-[#f7efe3] p-5">
        <p className="text-sm font-black text-[#2d231d]">{currentCustomer.name}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <SmallStat label="本月訂單" value={`${orders.length + 24} 筆`} />
          <SmallStat label="已出貨" value={`${orders.filter((order) => order.status === "已出貨").length + 23} 筆`} />
          <SmallStat label="未出貨" value={`${orders.filter((order) => order.status !== "已出貨").length} 筆`} />
          <SmallStat label="本月總額" value={money(monthTotal + currentCustomer.monthly)} />
        </div>
      </div>
    </section>
  )
}

function SmallStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-black text-[#8b735f]">{label}</p>
      <p className="mt-2 text-xl font-black text-[#2d231d]">{value}</p>
    </div>
  )
}

function ValuePanel() {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Business Value</p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">導入後改善</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {valuePoints.map((item) => (
          <div key={item} className="rounded-2xl border border-[#decfb7] bg-white p-4 text-sm font-black text-[#2d231d]">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center rounded-xl bg-[#263f31] px-5 text-sm font-black text-white">
          開始需求診斷
        </Link>
        <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-[#decfb7] bg-white px-5 text-sm font-black text-[#2d231d]">
          聯絡我
        </Link>
      </div>
    </section>
  )
}

export default WholesaleOrdering
