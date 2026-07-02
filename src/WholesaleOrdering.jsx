import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"

const categories = ["全部", "水果", "蔬菜", "冷藏", "乾貨"]

const products = [
  {
    id: "apple",
    name: "富士蘋果",
    category: "水果",
    spec: "10kg / 箱",
    price: 980,
    unit: "箱",
    origin: "青森",
    stock: "現貨",
    tone: "from-[#f7d7c4] via-[#fff7ef] to-[#eef5df]",
  },
  {
    id: "grape",
    name: "巨峰葡萄",
    category: "水果",
    spec: "2kg / 盒",
    price: 620,
    unit: "盒",
    origin: "苗栗",
    stock: "低溫",
    tone: "from-[#d6c5ea] via-[#fff7ef] to-[#eef5df]",
  },
  {
    id: "lettuce",
    name: "蘿蔓生菜",
    category: "蔬菜",
    spec: "12入 / 箱",
    price: 460,
    unit: "箱",
    origin: "雲林",
    stock: "現貨",
    tone: "from-[#cfe8c2] via-[#fff7ef] to-[#f4ead7]",
  },
  {
    id: "tomato",
    name: "牛番茄",
    category: "蔬菜",
    spec: "8kg / 箱",
    price: 720,
    unit: "箱",
    origin: "高雄",
    stock: "預訂",
    tone: "from-[#fac5ad] via-[#fff7ef] to-[#f3e7d7]",
  },
  {
    id: "chicken",
    name: "舒肥雞胸",
    category: "冷藏",
    spec: "30包 / 箱",
    price: 1350,
    unit: "箱",
    origin: "台灣",
    stock: "冷藏",
    tone: "from-[#ead8c2] via-[#fff7ef] to-[#e7f0ef]",
  },
  {
    id: "almond",
    name: "烘焙杏仁",
    category: "乾貨",
    spec: "3kg / 包",
    price: 880,
    unit: "包",
    origin: "美國",
    stock: "現貨",
    tone: "from-[#f2d7a7] via-[#fff7ef] to-[#eef5df]",
  },
]

const initialOrders = [
  {
    id: "B2B-2407",
    customer: "晨禾早午餐",
    status: "待報價",
    source: "客戶端",
    total: 3180,
    items: ["富士蘋果 x2", "蘿蔓生菜 x1", "舒肥雞胸 x1"],
    note: "明天 10:00 前到貨",
  },
  {
    id: "B2B-2406",
    customer: "巷口咖啡",
    status: "已出貨",
    source: "LINE",
    total: 2120,
    items: ["巨峰葡萄 x2", "烘焙杏仁 x1"],
    note: "本月累計 18,420",
  },
]

function money(value) {
  return `NT$${value.toLocaleString("zh-TW")}`
}

function statusTone(status) {
  if (status === "已出貨") return "bg-[#e7f3df] text-[#2d5a33]"
  if (status === "已報價") return "bg-[#fff1d6] text-[#9b5a13]"
  return "bg-[#f1e8dc] text-[#725d48]"
}

function WholesaleOrdering() {
  const [activeCategory, setActiveCategory] = useState("全部")
  const [view, setView] = useState("商品訂貨")
  const [cart, setCart] = useState({ apple: 1, lettuce: 1 })
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrders[0].id)
  const [toast, setToast] = useState("")

  const shownProducts = useMemo(() => {
    if (activeCategory === "全部") return products
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  const cartItems = useMemo(
    () =>
      products
        .map((product) => ({ ...product, quantity: cart[product.id] || 0 }))
        .filter((product) => product.quantity > 0),
    [cart],
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0]
  const openOrders = orders.filter((order) => order.status !== "已出貨").length
  const monthTotal = orders.reduce((sum, order) => sum + order.total, 0)

  function flash(message) {
    setToast(message)
    window.setTimeout(() => setToast(""), 1800)
  }

  function updateCart(productId, amount) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[productId] || 0) + amount)
      return { ...current, [productId]: nextQuantity }
    })
  }

  function submitOrder() {
    if (cartItems.length === 0) {
      flash("請先選擇商品")
      return
    }

    const order = {
      id: `B2B-${Math.floor(2500 + Math.random() * 400)}`,
      customer: "新客戶訂貨單",
      status: "待報價",
      source: "商品頁",
      total: subtotal,
      items: cartItems.map((item) => `${item.name} x${item.quantity}`),
      note: "後台可調整報價與出貨數量",
    }
    setOrders((current) => [order, ...current])
    setSelectedOrderId(order.id)
    setView("後台報價")
    flash("訂單已送到後台")
  }

  function advanceOrder(status) {
    setOrders((current) =>
      current.map((order) => (order.id === selectedOrder.id ? { ...order, status } : order)),
    )
    setView(status === "已出貨" ? "出貨狀態" : "後台報價")
    flash(status === "已報價" ? "報價已更新" : "出貨狀態已更新")
  }

  return (
    <main className="min-h-screen bg-[#f7efe2] text-[#27312b]">
      <Seo
        page={{
          path: "/works/wholesale-ordering",
          title: "批發訂貨系統｜商品訂購、報價與出貨管理 Demo",
          description: "批發訂貨系統成品頁，展示客戶選品下單、後台報價、叫貨單、出貨狀態與歷史訂單統計。",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-[#dcccb5] bg-[#f7efe2]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-7">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#253f31] text-sm font-black text-[#f3c46b]">
              W
            </span>
            <div>
              <p className="font-serif text-xl font-black text-[#2c241f] md:text-2xl">批發訂貨系統</p>
              <p className="text-xs font-black tracking-[0.14em] text-[#8a735f]">商品訂購 · 報價 · 出貨</p>
            </div>
          </Link>

          <div className="hidden rounded-2xl border border-[#dcccb5] bg-[#fffaf2] p-1 md:flex">
            {["商品訂貨", "後台報價", "出貨狀態"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setView(item)}
                className={`min-h-11 rounded-xl px-5 text-sm font-black ${
                  view === item ? "bg-[#253f31] text-white shadow-lg shadow-[#253f31]/15" : "text-[#47362b]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={submitOrder}
            className="min-h-11 rounded-xl bg-[#c9622f] px-4 text-sm font-black text-white shadow-lg shadow-[#c9622f]/18"
          >
            送出訂單
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 md:grid-cols-[1.05fr_0.95fr] md:gap-6 md:px-7 md:py-8">
        <HeroPanel subtotal={subtotal} openOrders={openOrders} monthTotal={monthTotal} />
        <DashboardPanel orders={orders} selectedOrderId={selectedOrderId} setSelectedOrderId={setSelectedOrderId} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[1.2fr_0.8fr] md:px-7">
        <div className="rounded-[1.75rem] border border-[#dcccb5] bg-[#fffaf2]/86 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c9622f]">Product Page</p>
              <h1 className="mt-2 font-serif text-3xl font-black text-[#2c241f] md:text-5xl">商品訂貨</h1>
            </div>
            <div className="flex gap-2 overflow-x-auto rounded-2xl border border-[#dcccb5] bg-white p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-10 shrink-0 rounded-xl px-4 text-sm font-black ${
                    activeCategory === category ? "bg-[#253f31] text-white" : "bg-[#f7efe2] text-[#4f4035]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shownProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[1.4rem] border border-[#dcccb5] bg-white shadow-sm">
                <div className={`h-32 bg-gradient-to-br ${product.tone} p-4`}>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/82 px-3 py-1 text-xs font-black text-[#4c3a2c]">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-[#253f31] px-3 py-1 text-xs font-black text-white">
                      {product.stock}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-black text-[#8a735f]">{product.origin} · {product.spec}</p>
                  <h2 className="mt-2 text-xl font-black text-[#2c241f]">{product.name}</h2>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="font-serif text-2xl font-black text-[#c9622f]">{money(product.price)}</p>
                      <p className="text-xs font-bold text-[#8a735f]">每 {product.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => updateCart(product.id, -1)} className="grid h-9 w-9 place-items-center rounded-full border border-[#dcccb5] bg-[#fffaf2] font-black">
                        -
                      </button>
                      <span className="min-w-6 text-center text-sm font-black">{cart[product.id] || 0}</span>
                      <button type="button" onClick={() => updateCart(product.id, 1)} className="grid h-9 w-9 place-items-center rounded-full bg-[#253f31] font-black text-white">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-5">
          <CartPanel cartItems={cartItems} subtotal={subtotal} onSubmit={submitOrder} />
          <AdminPanel selectedOrder={selectedOrder} onQuote={() => advanceOrder("已報價")} onShip={() => advanceOrder("已出貨")} view={view} />
        </aside>
      </section>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl bg-[#253f31] px-5 py-4 text-sm font-black text-white shadow-2xl shadow-[#253f31]/25">
          {toast}
        </div>
      ) : null}
    </main>
  )
}

function HeroPanel({ subtotal, openOrders, monthTotal }) {
  return (
    <section className="overflow-hidden rounded-[1.9rem] border border-[#dcccb5] bg-[#fffaf2]/86 p-6 shadow-sm backdrop-blur md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.26em] text-[#c9622f]">Wholesale OS</p>
      <h1 className="mt-4 font-serif text-[clamp(2.1rem,7vw,5rem)] font-black leading-[0.98] text-[#2c241f]">
        批發訂貨，
        <br />
        報價到出貨。
      </h1>
      <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-[#715f50] md:text-base">
        客戶選商品下單，後台整理報價與叫貨單，出貨後同步狀態與歷史金額。
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Metric title="本張訂單" value={money(subtotal)} />
        <Metric title="待處理" value={`${openOrders} 單`} />
        <Metric title="本月累計" value={money(monthTotal)} />
      </div>
    </section>
  )
}

function Metric({ title, value }) {
  return (
    <div className="rounded-2xl border border-[#dcccb5] bg-white/82 p-4">
      <p className="text-xs font-black text-[#8a735f]">{title}</p>
      <p className="mt-2 font-serif text-2xl font-black text-[#c9622f]">{value}</p>
    </div>
  )
}

function DashboardPanel({ orders, selectedOrderId, setSelectedOrderId }) {
  return (
    <section className="rounded-[1.9rem] border border-[#dcccb5] bg-[#253f31] p-5 text-white shadow-xl shadow-[#253f31]/15">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0c879]">Backend</p>
          <h2 className="mt-2 font-serif text-3xl font-black">叫貨單</h2>
        </div>
        <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black">報價中</span>
      </div>
      <div className="mt-5 grid gap-3">
        {orders.slice(0, 4).map((order) => (
          <button key={order.id} type="button" onClick={() => setSelectedOrderId(order.id)} className="text-left">
            <article className={`rounded-2xl border p-4 transition ${order.id === selectedOrderId ? "border-[#f0c879] bg-white/12" : "border-white/10 bg-white/[0.06]"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black">{order.customer}</p>
                  <p className="mt-1 text-xs font-bold text-white/62">{order.id} · {order.source}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(order.status)}`}>{order.status}</span>
              </div>
              <p className="mt-3 text-sm font-bold text-white/72">{order.items.slice(0, 2).join("、")}</p>
            </article>
          </button>
        ))}
      </div>
    </section>
  )
}

function CartPanel({ cartItems, subtotal, onSubmit }) {
  return (
    <section className="rounded-[1.75rem] border border-[#dcccb5] bg-[#fffaf2]/92 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c9622f]">Order</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-[#2c241f]">訂貨單</h2>
        </div>
        <span className="rounded-full bg-[#f1e8dc] px-3 py-1 text-xs font-black text-[#725d48]">{cartItems.length} 項</span>
      </div>
      <div className="mt-5 grid gap-3">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl bg-white p-4">
              <div>
                <p className="text-sm font-black text-[#2c241f]">{item.name}</p>
                <p className="mt-1 text-xs font-bold text-[#8a735f]">
                  {item.quantity} {item.unit} · {item.spec}
                </p>
              </div>
              <p className="text-sm font-black text-[#c9622f]">{money(item.price * item.quantity)}</p>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-white p-4 text-sm font-bold text-[#8a735f]">尚未加入商品。</p>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#dcccb5] pt-5">
        <div>
          <p className="text-xs font-black text-[#8a735f]">小計</p>
          <p className="font-serif text-3xl font-black text-[#2c241f]">{money(subtotal)}</p>
        </div>
        <button type="button" onClick={onSubmit} className="min-h-12 rounded-xl bg-[#c9622f] px-5 text-sm font-black text-white">
          送出訂單
        </button>
      </div>
    </section>
  )
}

function AdminPanel({ selectedOrder, onQuote, onShip, view }) {
  return (
    <section className="rounded-[1.75rem] border border-[#dcccb5] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c9622f]">{view}</p>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-3xl font-black text-[#2c241f]">{selectedOrder.customer}</h2>
          <p className="mt-1 text-sm font-bold text-[#8a735f]">{selectedOrder.id}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(selectedOrder.status)}`}>{selectedOrder.status}</span>
      </div>
      <div className="mt-5 rounded-2xl bg-[#f7efe2] p-4">
        <p className="text-xs font-black text-[#8a735f]">商品明細</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedOrder.items.map((item) => (
            <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#4f4035]">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold leading-6 text-[#715f50]">{selectedOrder.note}</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button type="button" onClick={onQuote} className="min-h-11 rounded-xl border border-[#dcccb5] bg-[#fffaf2] text-sm font-black text-[#2c241f]">
          產生報價
        </button>
        <button type="button" onClick={onShip} className="min-h-11 rounded-xl bg-[#253f31] text-sm font-black text-white">
          更新出貨
        </button>
      </div>
    </section>
  )
}

export default WholesaleOrdering
