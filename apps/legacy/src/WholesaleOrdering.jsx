import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"

const modeCards = {
  client: {
    label: "客戶端",
    eyebrow: "Client App",
    title: "客戶自己下單",
    text: "手機看商品、專屬價格、歷史訂單與本月金額",
  },
  backend: {
    label: "後台端",
    eyebrow: "Back Office",
    title: "老闆管理訂單",
    text: "收單、改數量、報價、出貨、叫貨單一次處理",
  },
  billing: {
    label: "月結",
    eyebrow: "Monthly Close",
    title: "月底快速對帳",
    text: "依客戶彙整訂單、出貨狀態、明細與總額",
  },
}

const customers = [
  { id: "hotpot", name: "阿明火鍋店", area: "屏東市", monthlyBase: 86420 },
  { id: "brunch", name: "東港早午餐", area: "東港", monthlyBase: 52180 },
  { id: "bento", name: "屏東便當店", area: "潮州", monthlyBase: 73400 },
]

const baseProducts = [
  {
    id: "cabbage",
    name: "高麗菜",
    category: "葉菜",
    unit: "箱",
    spec: "20kg",
    vendor: "青禾農產",
    stock: "現貨",
    image: "/demo-products/cabbage.svg",
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
    image: "/demo-products/banana.svg",
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
    image: "/demo-products/tomato.svg",
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
    image: "/demo-products/lettuce.svg",
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
    image: "/demo-products/chicken-breast.svg",
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
    image: "/demo-products/almond-slices.svg",
    prices: { hotpot: 880, brunch: 920, bento: 860 },
    tone: "from-[#efd29b] via-[#fff8ee] to-[#f1eadc]",
  },
]

const categories = ["全部", "葉菜", "水果", "蔬果", "冷藏", "乾貨"]
const statuses = ["新訂單", "待確認", "待出貨", "已出貨"]
const valuePoints = ["少漏單", "價格統一", "出貨前修量", "缺貨有紀錄", "月底好對帳", "叫貨自動加總"]
const deliveryOptions = ["明天上午", "明天下午", "後天上午", "固定配送日"]
const stockOptions = ["現貨", "預訂", "低溫", "冷藏", "缺貨"]

const initialOrders = [
  {
    id: "B2B-2407",
    customerId: "hotpot",
    status: "待確認",
    source: "客戶端 APP",
    createdAt: "今日 09:18",
    items: [
      { productId: "cabbage", quantity: 2, shippedQuantity: 2, shortageNote: "" },
      { productId: "lettuce", quantity: 1, shippedQuantity: 1, shortageNote: "" },
      { productId: "chicken", quantity: 1, shippedQuantity: 1, shortageNote: "" },
    ],
    note: "明天 10:00 前到貨 葉菜可替代同級品",
  },
  {
    id: "B2B-2406",
    customerId: "brunch",
    status: "已出貨",
    source: "LINE 補單",
    createdAt: "昨日 15:42",
    items: [
      { productId: "banana", quantity: 2, shippedQuantity: 2, shortageNote: "" },
      { productId: "almond", quantity: 1, shippedQuantity: 1, shortageNote: "" },
    ],
    note: "已併入本月對帳",
  },
]

function money(value) {
  return `NT$${Number(value || 0).toLocaleString("zh-TW")}`
}

function getCustomer(customerId) {
  return customers.find((customer) => customer.id === customerId) || customers[0]
}

function getProduct(products, productId) {
  return products.find((product) => product.id === productId) || products[0]
}

function getPrice(products, productId, customerId) {
  const product = getProduct(products, productId)
  return product.prices[customerId] || Object.values(product.prices)[0]
}

function getOrderShipTotal(order, products) {
  return order.items.reduce((sum, item) => sum + getPrice(products, item.productId, order.customerId) * (item.shippedQuantity ?? item.quantity), 0)
}

function statusTone(status) {
  if (status === "已出貨") return "bg-[#e5f2df] text-[#2f6234]"
  if (status === "待出貨") return "bg-[#e6eef7] text-[#24567a]"
  if (status === "待確認") return "bg-[#fff0d6] text-[#985915]"
  return "bg-[#f1e7dc] text-[#715b45]"
}

function WholesaleOrdering() {
  const [mode, setMode] = useState("client")
  const [products, setProducts] = useState(baseProducts)
  const [customerId, setCustomerId] = useState(customers[0].id)
  const [category, setCategory] = useState("全部")
  const [cart, setCart] = useState({ cabbage: 1, tomato: 1 })
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrders[0].id)
  const [toast, setToast] = useState("")
  const [copied, setCopied] = useState("")
  const [deliveryTime, setDeliveryTime] = useState(deliveryOptions[0])
  const [cartNote, setCartNote] = useState("葉菜可替代同級品 出貨前請確認數量")
  const [backendSearch, setBackendSearch] = useState("")
  const [backendStatus, setBackendStatus] = useState("全部")
  const [purchasePreview, setPurchasePreview] = useState("LINE文字")
  const [statementDiscount, setStatementDiscount] = useState(0)
  const [statementNote, setStatementNote] = useState("月底對帳 未出貨項目不列入本期應收")
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deliverySlipOrderId, setDeliverySlipOrderId] = useState("")
  const [productAdminId, setProductAdminId] = useState(baseProducts[0].id)

  const selectedCustomer = getCustomer(customerId)
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0]
  const deliverySlipOrder = orders.find((order) => order.id === deliverySlipOrderId)
  const selectedOrderCustomer = getCustomer(selectedOrder.customerId)
  const activeProducts = products.filter((product) => product.active !== false)
  const shownProducts = category === "全部" ? activeProducts : activeProducts.filter((product) => product.category === category)
  const unshippedOrders = orders.filter((order) => order.status !== "已出貨")
  const shippedOrders = orders.filter((order) => order.status === "已出貨")
  const monthTotal = orders.reduce((sum, order) => sum + getOrderShipTotal(order, products), 0)

  const cartItems = useMemo(
    () =>
      activeProducts
        .map((product) => ({
          ...product,
          quantity: cart[product.id] || 0,
          price: getPrice(products, product.id, customerId),
        }))
        .filter((product) => product.quantity > 0),
    [activeProducts, cart, customerId, products],
  )

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const purchaseGroups = useMemo(() => {
    const groups = new Map()
    unshippedOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = getProduct(products, item.productId)
        const vendorGroup = groups.get(product.vendor) || []
        const existing = vendorGroup.find((row) => row.productId === product.id)
        if (existing) {
          existing.quantity += item.shippedQuantity ?? item.quantity
        } else {
          vendorGroup.push({
            productId: product.id,
            name: product.name,
            vendor: product.vendor,
            quantity: item.shippedQuantity ?? item.quantity,
            unit: product.unit,
          })
        }
        groups.set(product.vendor, vendorGroup)
      })
    })
    return Array.from(groups.entries()).map(([vendor, rows]) => ({ vendor, rows }))
  }, [products, unshippedOrders])

  function flash(message) {
    setToast(message)
    window.setTimeout(() => setToast(""), 1800)
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    flash(`已切換到${modeCards[nextMode].label}`)
  }

  function updateCart(productId, delta) {
    setCart((current) => ({ ...current, [productId]: Math.max(0, (current[productId] || 0) + delta) }))
  }

  function requestSubmitOrder() {
    if (cartItems.length === 0) {
      flash("請先加入商品")
      return
    }
    setConfirmOpen(true)
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
      deliveryTime,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        shippedQuantity: item.quantity,
        shortageNote: "",
      })),
      note: cartNote || "客戶端送出 後台可調整數量與出貨狀態",
    }
    setOrders((current) => [nextOrder, ...current])
    setSelectedOrderId(nextOrder.id)
    setCart({})
    setConfirmOpen(false)
    setMode("backend")
    flash("訂單已進入後台")
  }

  function repeatOrder(order) {
    const nextCart = {}
    order.items.forEach((item) => {
      nextCart[item.productId] = item.quantity
    })
    setCustomerId(order.customerId)
    setCart(nextCart)
    setMode("client")
    flash("已帶入上次訂單")
  }

  function setOrderStatus(status) {
    setOrders((current) =>
      current.map((order) => (order.id === selectedOrder.id ? { ...order, status } : order)),
    )
    flash(status === "已出貨" ? "出貨狀態已更新" : "訂單狀態已更新")
  }

  function updateOrderItem(productId, field, delta) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== selectedOrder.id) return order
        return {
          ...order,
          items: order.items.map((item) =>
            item.productId === productId ? { ...item, [field]: Math.max(0, (item[field] ?? item.quantity) + delta) } : item,
          ),
        }
      }),
    )
    flash(field === "quantity" ? "訂購數量已修正" : "實出數量已修正")
  }

  function setShortage(productId, shortageNote) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== selectedOrder.id) return order
        return {
          ...order,
          items: order.items.map((item) => (item.productId === productId ? { ...item, shortageNote } : item)),
        }
      }),
    )
    flash("缺貨備註已更新")
  }

  function updateCustomerPrice(productId, targetCustomerId, value) {
    const nextPrice = Number(value)
    if (!Number.isFinite(nextPrice) || nextPrice < 0) return
    setProducts((current) =>
      current.map((product) =>
        product.id === productId ? { ...product, prices: { ...product.prices, [targetCustomerId]: nextPrice } } : product,
      ),
    )
  }

  function updateProductField(productId, field, value) {
    setProducts((current) =>
      current.map((product) => (product.id === productId ? { ...product, [field]: value } : product)),
    )
    flash(field === "active" ? "商品狀態已更新" : "商品資料已更新")
  }

  function copyPurchaseList(type) {
    const content = purchaseGroups
      .map((group) => [`【${group.vendor}】`, ...group.rows.map((row) => `${row.name} ${row.quantity}${row.unit}`)].join("\n"))
      .join("\n\n")
    navigator.clipboard?.writeText(content)
    setCopied(type)
    setPurchasePreview(type)
    flash(`${type} 已整理`)
  }

  function copyStatement(orderCustomerId) {
    const customer = getCustomer(orderCustomerId)
    const customerOrders = orders.filter((order) => order.customerId === orderCustomerId)
    const total = customerOrders.reduce((sum, order) => sum + getOrderShipTotal(order, products), 0) + customer.monthlyBase - statementDiscount
    navigator.clipboard?.writeText(`${customer.name} 本月對帳金額 ${money(total)}${statementNote}`)
    flash("對帳文字已複製")
  }

  return (
    <main className="min-h-screen bg-[#f6efe3] text-[#26342c]">
      <Seo
        page={{
          path: "/works/wholesale-ordering",
          title: "批發訂貨系統｜B2B 訂貨、報價、叫貨與月結管理",
          description: "批發訂貨系統成品展示 包含客戶端下單、客戶分級報價、後台訂單管理、出貨狀態、採購叫貨單與月結對帳",
        }}
      />

      <Header mode={mode} setMode={changeMode} onSubmit={requestSubmitOrder} />
      <ModeHero mode={mode} openOrders={unshippedOrders.length} shippedOrders={shippedOrders.length} monthTotal={monthTotal} />
      <WholesaleProjectBrief />

      {mode === "client" ? (
        <ClientMode
          customerId={customerId}
          selectedCustomer={selectedCustomer}
          setCustomerId={setCustomerId}
          category={category}
          setCategory={setCategory}
          shownProducts={shownProducts}
          products={products}
          cart={cart}
          cartItems={cartItems}
          cartTotal={cartTotal}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
          cartNote={cartNote}
          setCartNote={setCartNote}
          updateCart={updateCart}
          onSubmit={requestSubmitOrder}
          orders={orders}
          onRepeat={repeatOrder}
        />
      ) : null}

      {mode === "backend" ? (
        <BackendMode
          orders={orders}
          products={products}
          selectedOrder={selectedOrder}
          selectedOrderCustomer={selectedOrderCustomer}
          backendSearch={backendSearch}
          setBackendSearch={setBackendSearch}
          backendStatus={backendStatus}
          setBackendStatus={setBackendStatus}
          setSelectedOrderId={setSelectedOrderId}
          updateOrderItem={updateOrderItem}
          setShortage={setShortage}
          setOrderStatus={setOrderStatus}
          onOpenSlip={(orderId) => setDeliverySlipOrderId(orderId)}
          purchaseGroups={purchaseGroups}
          purchasePreview={purchasePreview}
          copied={copied}
          onCopy={copyPurchaseList}
          onUpdatePrice={updateCustomerPrice}
          productAdminId={productAdminId}
          setProductAdminId={setProductAdminId}
          onUpdateProduct={updateProductField}
        />
      ) : null}

      {mode === "billing" ? (
        <BillingMode
          orders={orders}
          products={products}
          customerId={customerId}
          setCustomerId={setCustomerId}
          statementDiscount={statementDiscount}
          setStatementDiscount={setStatementDiscount}
          statementNote={statementNote}
          setStatementNote={setStatementNote}
          onCopyStatement={copyStatement}
        />
      ) : null}

      <ValuePanel />

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl bg-[#263f31] px-5 py-4 text-sm font-black text-white shadow-2xl shadow-[#263f31]/25">
          {toast}
        </div>
      ) : null}

      {confirmOpen ? (
        <OrderConfirmModal
          customer={selectedCustomer}
          cartItems={cartItems}
          deliveryTime={deliveryTime}
          cartNote={cartNote}
          cartTotal={cartTotal}
          onClose={() => setConfirmOpen(false)}
          onConfirm={submitOrder}
        />
      ) : null}

      {deliverySlipOrder ? (
        <DeliverySlipModal
          order={deliverySlipOrder}
          products={products}
          customer={getCustomer(deliverySlipOrder.customerId)}
          onClose={() => setDeliverySlipOrderId("")}
        />
      ) : null}
    </main>
  )
}

function WholesaleProjectBrief() {
  const facts = [
    ["適合", "批發商、團購、食材供應、B2B 電商"],
    ["客戶端", "手機看商品、專屬價格、歷史訂單、本月金額"],
    ["後台端", "訂單、數量修正、出貨狀態、缺貨備註"],
    ["月結", "依客戶彙整訂單與總額 月底對帳更快"],
  ]
  const flow = ["客戶下單", "後台收單", "出貨前修量", "產生叫貨單", "更新出貨", "月結對帳"]

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 md:px-7">
      <div className="rounded-[1.5rem] border border-[#decfb7] bg-[#fffaf2]/88 p-5 shadow-sm backdrop-blur">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">B2B Ordering Case</p>
            <h2 className="mt-2 font-serif text-2xl font-black text-[#2d231d] md:text-3xl">不是購物車 是批發流程系統</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-[#725f50]">
              客戶自行下單 老闆從後台統一修量、出貨、叫貨與月結
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {facts.map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-[#ead9bf] bg-white/70 p-4">
                <p className="text-[11px] font-black text-[#c76532]">{label}</p>
                <p className="mt-1 text-sm font-black leading-6 text-[#2d231d]">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {flow.map((item, index) => (
            <span key={item} className="rounded-full border border-[#ead9bf] bg-white px-3 py-1.5 text-[11px] font-black text-[#4f4035]">
              {index + 1}. {item}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/contact?case=批發訂貨系統" className="inline-flex min-h-10 items-center rounded-xl bg-[#263f31] px-4 text-sm font-black text-white">
            詢問批發系統
          </Link>
          <Link to="/works" className="inline-flex min-h-10 items-center rounded-xl border border-[#decfb7] bg-white px-4 text-sm font-black text-[#263f31]">
            回作品庫
          </Link>
        </div>
      </div>
    </section>
  )
}

function Header({ mode, setMode, onSubmit }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#decfb7] bg-[#f6efe3]/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:min-h-20 md:flex-nowrap md:px-7">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#263f31] text-sm font-black text-[#f1c66c]">B2B</span>
          <div>
            <p className="font-serif text-xl font-black leading-none text-[#2d231d] md:text-2xl">批發訂貨系統</p>
            <p className="mt-1 text-xs font-black tracking-[0.12em] text-[#8b735f]">訂貨 · 報價 · 叫貨 · 月結</p>
          </div>
        </Link>

        <div className="order-3 flex w-full rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-1 md:order-none md:w-auto">
          {Object.entries(modeCards).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`min-h-11 flex-1 rounded-xl px-4 text-sm font-black md:flex-none md:px-7 ${
                mode === key ? "bg-[#263f31] text-white shadow-lg shadow-[#263f31]/15" : "text-[#4f4035]"
              }`}
            >
              {item.label}
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

function ModeHero({ mode, openOrders, shippedOrders, monthTotal }) {
  const current = modeCards[mode]
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 md:grid-cols-[1.12fr_0.88fr] md:px-7 md:py-8">
      <div className="overflow-hidden rounded-[1.9rem] border border-[#decfb7] bg-[#fffaf2]/88 p-6 shadow-sm backdrop-blur md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-[#c76532]">{current.eyebrow}</p>
        <h1 className="mt-4 font-serif text-[clamp(2.2rem,7vw,5.15rem)] font-black leading-[0.98] text-[#2d231d]">{current.title}</h1>
        <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-[#725f50] md:text-base">{current.text}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
        <Metric title="未出貨" value={`${openOrders} 單`} />
        <Metric title="已出貨" value={`${shippedOrders} 單`} />
        <Metric title="本月訂單" value={money(monthTotal)} />
      </div>
    </section>
  )
}

function Metric({ title, value }) {
  return (
    <div className="rounded-[1.35rem] border border-[#decfb7] bg-white/84 p-5 shadow-sm">
      <p className="text-xs font-black text-[#8b735f]">{title}</p>
      <p className="mt-2 font-serif text-2xl font-black text-[#c76532]">{value}</p>
    </div>
  )
}

function ClientMode({
  customerId,
  selectedCustomer,
  setCustomerId,
  category,
  setCategory,
  shownProducts,
  products,
  cart,
  cartItems,
  cartTotal,
  deliveryTime,
  setDeliveryTime,
  cartNote,
  setCartNote,
  updateCart,
  onSubmit,
  orders,
  onRepeat,
}) {
  const customerOrders = orders.filter((order) => order.customerId === customerId)

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[0.82fr_1.18fr] md:px-7">
      <ClientPhone customer={selectedCustomer} products={products.slice(0, 4)} cartItems={cartItems} monthTotal={selectedCustomer.monthlyBase + customerOrders.reduce((sum, order) => sum + getOrderShipTotal(order, products), 0)} onSubmit={onSubmit} />

      <div className="grid gap-6">
        <ClientOrdering
          customerId={customerId}
          setCustomerId={setCustomerId}
          category={category}
          setCategory={setCategory}
          shownProducts={shownProducts}
          products={products}
          cart={cart}
          cartItems={cartItems}
          cartTotal={cartTotal}
          deliveryTime={deliveryTime}
          setDeliveryTime={setDeliveryTime}
          cartNote={cartNote}
          setCartNote={setCartNote}
          updateCart={updateCart}
          onSubmit={onSubmit}
        />
        <ClientHistory orders={customerOrders} products={products} onRepeat={onRepeat} />
      </div>
    </section>
  )
}

function ClientPhone({ customer, products, cartItems, monthTotal, onSubmit }) {
  return (
    <section className="rounded-[1.9rem] border border-[#decfb7] bg-[#263f31] p-5 text-white shadow-xl shadow-[#263f31]/15">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0c879]">Mobile Order</p>
          <h2 className="mt-2 font-serif text-3xl font-black">客戶手機畫面</h2>
        </div>
        <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black">{customer.name}</span>
      </div>

      <div className="mx-auto mt-5 max-w-[340px] rounded-[2rem] border border-white/18 bg-[#f7efe3] p-3 text-[#2d231d] shadow-2xl shadow-black/20">
        <div className="rounded-[1.55rem] bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black text-[#8b735f]">本月總額</p>
              <p className="font-serif text-2xl font-black text-[#c76532]">{money(monthTotal)}</p>
            </div>
            <span className="rounded-full bg-[#e5f2df] px-3 py-1 text-xs font-black text-[#2f6234]">專屬價</span>
          </div>

          <div className="mt-4 grid gap-2">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl bg-[#f7efe3] p-3">
                <div>
                  <p className="text-sm font-black">{product.name}</p>
                  <p className="mt-1 text-xs font-bold text-[#8b735f]">{product.spec} · {product.stock}</p>
                </div>
                <p className="text-sm font-black text-[#c76532]">{money(getPrice(products, product.id, customer.id))}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-3">
            <p className="text-xs font-black text-[#8b735f]">訂單確認</p>
            <p className="mt-1 text-sm font-black">{cartItems.length} 項商品 · 歷史訂單可再訂</p>
          </div>
          <button type="button" onClick={onSubmit} className="mt-4 min-h-11 w-full rounded-2xl bg-[#263f31] text-sm font-black text-white">
            送出訂單
          </button>
        </div>
      </div>
    </section>
  )
}

function ClientOrdering({
  customerId,
  setCustomerId,
  category,
  setCategory,
  shownProducts,
  products,
  cart,
  updateCart,
  cartItems,
  cartTotal,
  deliveryTime,
  setDeliveryTime,
  cartNote,
  setCartNote,
  onSubmit,
}) {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-4 shadow-sm backdrop-blur md:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Customer Order</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d] md:text-5xl">商品與專屬價</h2>
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

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {shownProducts.map((product) => {
          const quantity = cart[product.id] || 0
          return (
            <article key={product.id} className="overflow-hidden rounded-[1.4rem] border border-[#decfb7] bg-white shadow-sm">
              <div className="relative h-28 overflow-hidden bg-[#fffaf2] md:h-32">
                <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="rounded-full bg-white/84 px-3 py-1 text-xs font-black text-[#4c3a2c]">{product.category}</span>
                  <span className="rounded-full bg-[#263f31] px-3 py-1 text-xs font-black text-white">{product.stock}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-black text-[#8b735f]">{product.vendor} · {product.spec}</p>
                <h3 className="mt-2 text-xl font-black text-[#2d231d]">{product.name}</h3>
                <div className="mt-5 flex items-end justify-between gap-5">
                  <div className="min-w-0">
                    <p className="whitespace-nowrap font-serif text-[1.55rem] font-black leading-none text-[#c76532] md:text-[1.75rem]">
                      {money(getPrice(products, product.id, customerId))}
                    </p>
                    <p className="text-xs font-bold text-[#8b735f]">每 {product.unit}</p>
                  </div>
                  <div className="shrink-0">
                    <QuantityControl value={quantity} onMinus={() => updateCart(product.id, -1)} onPlus={() => updateCart(product.id, 1)} />
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-[#decfb7] bg-white p-4">
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr_auto] xl:items-end">
          <div>
            <p className="text-xs font-black text-[#8b735f]">訂單確認</p>
            <p className="mt-1 font-serif text-3xl font-black text-[#2d231d]">{money(cartTotal)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cartItems.slice(0, 4).map((item) => (
                <span key={item.id} className="rounded-full bg-[#f7efe3] px-3 py-2 text-xs font-black text-[#4f4035]">
                  {item.name} x{item.quantity}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <label className="grid gap-2">
              <span className="text-xs font-black text-[#8b735f]">希望配送</span>
              <select
                value={deliveryTime}
                onChange={(event) => setDeliveryTime(event.target.value)}
                className="min-h-11 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-3 text-sm font-black text-[#2d231d] outline-none focus:border-[#c76532]"
              >
                {deliveryOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-black text-[#8b735f]">出貨備註</span>
              <input
                value={cartNote}
                onChange={(event) => setCartNote(event.target.value)}
                className="min-h-11 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-3 text-sm font-bold text-[#2d231d] outline-none focus:border-[#c76532]"
              />
            </label>
          </div>
          <button type="button" onClick={onSubmit} className="min-h-11 rounded-xl bg-[#c76532] px-5 text-sm font-black text-white">
            確認送出
          </button>
        </div>
      </div>
    </section>
  )
}

function ClientHistory({ orders, products, onRepeat }) {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">History</p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">歷史訂單</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl bg-[#f7efe3] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-black text-[#2d231d]">{order.id}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(order.status)}`}>{order.status}</span>
            </div>
            <StatusRail status={order.status} />
            <p className="mt-3 text-xl font-black text-[#c76532]">{money(getOrderShipTotal(order, products))}</p>
            <button type="button" onClick={() => onRepeat(order)} className="mt-3 min-h-10 rounded-xl bg-white px-4 text-xs font-black text-[#2d231d]">
              再訂一次
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatusRail({ status }) {
  const currentIndex = statuses.indexOf(status)
  return (
    <div className="mt-3 grid grid-cols-4 gap-1">
      {statuses.map((item, index) => {
        const active = index <= currentIndex
        return (
          <div key={item} className={`h-1.5 rounded-full ${active ? "bg-[#c76532]" : "bg-[#decfb7]"}`} title={item} />
        )
      })}
    </div>
  )
}

function AdminOverview({ orders, products, purchaseGroups }) {
  const openOrders = orders.filter((order) => order.status !== "已出貨")
  const waiting = orders.filter((order) => order.status === "待確認")
  const shortageCount = orders.reduce(
    (sum, order) =>
      sum + order.items.filter((item) => (item.shippedQuantity ?? item.quantity) < item.quantity || item.shortageNote).length,
    0,
  )
  const total = orders.reduce((sum, order) => sum + getOrderShipTotal(order, products), 0)
  const cards = [
    { label: "今日訂單", value: `${orders.length} 單` },
    { label: "未出貨", value: `${openOrders.length} 單` },
    { label: "待確認", value: `${waiting.length} 單` },
    { label: "叫貨廠商", value: `${purchaseGroups.length} 家` },
    { label: "異常品項", value: `${shortageCount} 項` },
    { label: "今日金額", value: money(total) },
  ]

  return (
    <section className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-[1.35rem] border border-[#decfb7] bg-white p-4 shadow-sm">
          <p className="text-xs font-black text-[#8b735f]">{card.label}</p>
          <p className="mt-2 font-serif text-2xl font-black text-[#c76532]">{card.value}</p>
        </div>
      ))}
    </section>
  )
}

function BackendMode({
  orders,
  products,
  selectedOrder,
  selectedOrderCustomer,
  backendSearch,
  setBackendSearch,
  backendStatus,
  setBackendStatus,
  setSelectedOrderId,
  updateOrderItem,
  setShortage,
  setOrderStatus,
  onOpenSlip,
  purchaseGroups,
  purchasePreview,
  copied,
  onCopy,
  onUpdatePrice,
  productAdminId,
  setProductAdminId,
  onUpdateProduct,
}) {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:px-7">
      <AdminOverview orders={orders} products={products} purchaseGroups={purchaseGroups} />
      <BackOffice
        orders={orders}
        products={products}
        selectedOrder={selectedOrder}
        selectedOrderCustomer={selectedOrderCustomer}
        backendSearch={backendSearch}
        setBackendSearch={setBackendSearch}
        backendStatus={backendStatus}
        setBackendStatus={setBackendStatus}
        setSelectedOrderId={setSelectedOrderId}
        updateOrderItem={updateOrderItem}
        setShortage={setShortage}
        setOrderStatus={setOrderStatus}
        onOpenSlip={onOpenSlip}
      />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-6">
          <PriceEditor products={products} onUpdatePrice={onUpdatePrice} />
          <ProductAdminPanel
            products={products}
            productAdminId={productAdminId}
            setProductAdminId={setProductAdminId}
            onUpdateProduct={onUpdateProduct}
          />
        </div>
        <PurchaseList purchaseGroups={purchaseGroups} copied={copied} previewType={purchasePreview} onCopy={onCopy} />
      </div>
    </section>
  )
}

function BackOffice({
  orders,
  products,
  selectedOrder,
  selectedOrderCustomer,
  backendSearch,
  setBackendSearch,
  backendStatus,
  setBackendStatus,
  setSelectedOrderId,
  updateOrderItem,
  setShortage,
  setOrderStatus,
  onOpenSlip,
}) {
  const filteredOrders = orders.filter((order) => {
    const customer = getCustomer(order.customerId)
    const productNames = order.items.map((item) => getProduct(products, item.productId).name).join(" ")
    const matchesSearch = `${order.id} ${customer.name} ${productNames}`.toLowerCase().includes(backendSearch.trim().toLowerCase())
    const matchesStatus = backendStatus === "全部" || order.status === backendStatus
    return matchesSearch && matchesStatus
  })

  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Back Office</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d] md:text-5xl">今日訂單</h2>
        </div>
        <span className="rounded-full bg-[#f1e7dc] px-3 py-1 text-xs font-black text-[#715b45]">可修量 / 實出</span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          value={backendSearch}
          onChange={(event) => setBackendSearch(event.target.value)}
          placeholder="搜尋客戶、訂單或商品"
          className="min-h-11 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-4 text-sm font-bold text-[#2d231d] outline-none focus:border-[#c76532]"
        />
        <div className="flex gap-2 overflow-x-auto rounded-xl border border-[#decfb7] bg-[#fffaf2] p-1">
          {["全部", ...statuses].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setBackendStatus(status)}
              className={`min-h-9 shrink-0 rounded-lg px-3 text-xs font-black ${backendStatus === status ? "bg-[#263f31] text-white" : "text-[#4f4035]"}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="grid gap-3">
          {filteredOrders.map((order) => {
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
                  <p className="mt-3 text-xs font-bold text-[#725f50]">{order.items.length} 項 · {money(getOrderShipTotal(order, products))}</p>
                </article>
              </button>
            )
          })}
          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#decfb7] bg-[#fffaf2] p-4 text-sm font-black text-[#8b735f]">
              沒有符合條件的訂單
            </div>
          ) : null}
        </div>

        <article className="rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black text-[#8b735f]">{selectedOrder.source}</p>
              <h3 className="mt-1 text-2xl font-black text-[#2d231d]">{selectedOrderCustomer.name}</h3>
              <p className="mt-1 text-sm font-bold text-[#725f50]">{selectedOrder.note}</p>
              <p className="mt-2 text-xs font-black text-[#c76532]">配送：{selectedOrder.deliveryTime || "固定配送日"}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(selectedOrder.status)}`}>{selectedOrder.status}</span>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {statuses.map((status) => {
              const currentIndex = statuses.indexOf(selectedOrder.status)
              const stepIndex = statuses.indexOf(status)
              const active = stepIndex <= currentIndex
              return (
                <div key={status} className={`rounded-2xl border p-3 ${active ? "border-[#c76532] bg-[#fff3e8]" : "border-[#decfb7] bg-white"}`}>
                  <p className={`text-xs font-black ${active ? "text-[#c76532]" : "text-[#8b735f]"}`}>{status}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-4 grid gap-3">
            {selectedOrder.items.map((item) => {
              const product = getProduct(products, item.productId)
              const shipped = item.shippedQuantity ?? item.quantity
              const shortage = Math.max(0, item.quantity - shipped)
              return (
                <div key={item.productId} className="rounded-2xl bg-white p-3">
                  <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
                    <div>
                      <p className="text-sm font-black text-[#2d231d]">{product.name}</p>
                      <p className="mt-1 text-xs font-bold text-[#8b735f]">
                        {product.vendor} · {money(getPrice(products, product.id, selectedOrder.customerId))}
                      </p>
                    </div>
                    <QuantityBlock label="訂購" value={item.quantity} onMinus={() => updateOrderItem(product.id, "quantity", -1)} onPlus={() => updateOrderItem(product.id, "quantity", 1)} />
                    <QuantityBlock label="實出" value={shipped} onMinus={() => updateOrderItem(product.id, "shippedQuantity", -1)} onPlus={() => updateOrderItem(product.id, "shippedQuantity", 1)} />
                  </div>
                  {shortage > 0 ? <p className="mt-3 text-xs font-black text-[#c76532]">缺貨 {shortage}{product.unit}</p> : null}
                  <input
                    value={item.shortageNote || ""}
                    onChange={(event) => setShortage(product.id, event.target.value)}
                    placeholder="缺貨 / 替代品備註"
                    className="mt-3 min-h-10 w-full rounded-xl border border-[#decfb7] bg-[#fffaf2] px-3 text-sm font-bold text-[#2d231d] outline-none focus:border-[#c76532]"
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#decfb7] pt-4">
            <div>
              <p className="text-xs font-black text-[#8b735f]">實出金額</p>
              <p className="font-serif text-3xl font-black text-[#c76532]">{money(getOrderShipTotal(selectedOrder, products))}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onOpenSlip(selectedOrder.id)}
                className="min-h-10 rounded-xl bg-[#c76532] px-4 text-xs font-black text-white"
              >
                出貨單 Preview
              </button>
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

function PriceEditor({ products, onUpdatePrice }) {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Customer Pricing</p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">客戶分級報價</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#decfb7] text-xs font-black text-[#8b735f]">
              <th className="py-3">商品</th>
              {customers.map((customer) => (
                <th key={customer.id} className="px-3 py-3">{customer.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 5).map((product) => (
              <tr key={product.id} className="border-b border-[#eee3d4]">
                <td className="py-3 font-black text-[#2d231d]">{product.name}</td>
                {customers.map((customer) => (
                  <td key={customer.id} className="px-3 py-3">
                    <input
                      type="number"
                      value={product.prices[customer.id]}
                      onChange={(event) => onUpdatePrice(product.id, customer.id, event.target.value)}
                      className="min-h-10 w-24 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-3 text-sm font-black text-[#2d231d] outline-none focus:border-[#c76532]"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ProductAdminPanel({ products, productAdminId, setProductAdminId, onUpdateProduct }) {
  const product = products.find((item) => item.id === productAdminId) || products[0]

  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Product Admin</p>
      <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">商品管理</h2>
      <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#decfb7] bg-white p-2">
        {products.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setProductAdminId(item.id)}
            className={`min-h-10 shrink-0 rounded-xl px-4 text-xs font-black ${
              product.id === item.id ? "bg-[#263f31] text-white" : "bg-[#f7efe3] text-[#4f4035]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-xs font-black text-[#8b735f]">規格</span>
          <input
            value={product.spec}
            onChange={(event) => onUpdateProduct(product.id, "spec", event.target.value)}
            className="min-h-11 rounded-xl border border-[#decfb7] bg-white px-3 text-sm font-black text-[#2d231d] outline-none focus:border-[#c76532]"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-xs font-black text-[#8b735f]">庫存狀態</span>
          <select
            value={product.stock}
            onChange={(event) => onUpdateProduct(product.id, "stock", event.target.value)}
            className="min-h-11 rounded-xl border border-[#decfb7] bg-white px-3 text-sm font-black text-[#2d231d] outline-none focus:border-[#c76532]"
          >
            {stockOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-xs font-black text-[#8b735f]">廠商</span>
          <input
            value={product.vendor}
            onChange={(event) => onUpdateProduct(product.id, "vendor", event.target.value)}
            className="min-h-11 rounded-xl border border-[#decfb7] bg-white px-3 text-sm font-black text-[#2d231d] outline-none focus:border-[#c76532]"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={() => onUpdateProduct(product.id, "active", product.active === false)}
        className={`mt-4 min-h-11 rounded-xl px-5 text-sm font-black ${
          product.active === false ? "bg-[#263f31] text-white" : "border border-[#decfb7] bg-white text-[#2d231d]"
        }`}
      >
        {product.active === false ? "啟用商品" : "暫停顯示"}
      </button>
    </section>
  )
}

function PurchaseList({ purchaseGroups, copied, previewType, onCopy }) {
  return (
    <section className="rounded-[1.75rem] border border-[#decfb7] bg-[#263f31] p-5 text-white shadow-xl shadow-[#263f31]/12">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f0c879]">Purchase List</p>
          <h2 className="mt-2 font-serif text-3xl font-black">廠商叫貨單</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Excel", "PDF", "LINE文字"].map((type) => (
            <button key={type} type="button" onClick={() => onCopy(type)} className="min-h-10 rounded-xl bg-white/12 px-4 text-xs font-black text-white">
              {copied === type ? "已整理" : `匯出 ${type}`}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {purchaseGroups.map((group) => (
          <article key={group.vendor} className="rounded-2xl bg-white/10 p-4">
            <p className="text-sm font-black text-[#f0c879]">{group.vendor}</p>
            <div className="mt-3 grid gap-2">
              {group.rows.map((row) => (
                <div key={row.name} className="flex items-center justify-between rounded-xl bg-white/10 p-3">
                  <p className="text-sm font-black">{row.name}</p>
                  <p className="font-serif text-2xl font-black text-[#f0c879]">{row.quantity}{row.unit}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-white/12 bg-white p-4 text-[#2d231d]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c76532]">Document Preview</p>
            <h3 className="mt-1 text-xl font-black">廠商叫貨單 Preview</h3>
          </div>
          <span className="rounded-full bg-[#f7efe3] px-3 py-1 text-xs font-black text-[#715b45]">{previewType}</span>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#decfb7]">
          <div className="grid grid-cols-[1fr_0.45fr] bg-[#fffaf2] px-4 py-3 text-xs font-black text-[#8b735f]">
            <span>廠商 / 商品</span>
            <span className="text-right">叫貨數量</span>
          </div>
          {purchaseGroups.flatMap((group) =>
            group.rows.map((row) => (
              <div key={`${group.vendor}-${row.name}`} className="grid grid-cols-[1fr_0.45fr] border-t border-[#eee3d4] px-4 py-3 text-sm font-bold">
                <span>{group.vendor}｜{row.name}</span>
                <span className="text-right font-black text-[#c76532]">{row.quantity}{row.unit}</span>
              </div>
            )),
          )}
        </div>
        <p className="mt-3 text-xs font-bold leading-5 text-[#725f50]">
          可整理成 LINE 文字、Excel 表格或 PDF 版型；目前先用畫面預覽與複製文字呈現
        </p>
      </div>
    </section>
  )
}

function BillingMode({
  orders,
  products,
  customerId,
  setCustomerId,
  statementDiscount,
  setStatementDiscount,
  statementNote,
  setStatementNote,
  onCopyStatement,
}) {
  const activeCustomer = getCustomer(customerId)
  const customerOrders = orders.filter((order) => order.customerId === customerId)
  const beforeDiscount = customerOrders.reduce((sum, order) => sum + getOrderShipTotal(order, products), 0) + activeCustomer.monthlyBase
  const customerTotal = Math.max(0, beforeDiscount - statementDiscount)
  const shipped = customerOrders.filter((order) => order.status === "已出貨").length + 24
  const unshipped = customerOrders.filter((order) => order.status !== "已出貨").length

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 md:grid-cols-[0.9fr_1.1fr] md:px-7">
      <section className="rounded-[1.75rem] border border-[#decfb7] bg-white p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Monthly Close</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">月結對帳</h2>
        <div className="mt-5 flex gap-2 overflow-x-auto rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-2">
          {customers.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => setCustomerId(customer.id)}
              className={`min-h-10 shrink-0 rounded-xl px-4 text-sm font-black ${customerId === customer.id ? "bg-[#263f31] text-white" : "bg-white text-[#4f4035]"}`}
            >
              {customer.name}
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl bg-[#f7efe3] p-5">
          <p className="text-sm font-black text-[#2d231d]">{activeCustomer.name}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <SmallStat label="本月訂單" value={`${customerOrders.length + 26} 筆`} />
            <SmallStat label="已出貨" value={`${shipped} 筆`} />
            <SmallStat label="未出貨" value={`${unshipped} 筆`} />
            <SmallStat label="本月總額" value={money(customerTotal)} />
          </div>
        </div>
        <div className="mt-4 grid gap-3">
          <label className="grid gap-2">
            <span className="text-xs font-black text-[#8b735f]">折讓 / 調整</span>
            <input
              type="number"
              value={statementDiscount}
              onChange={(event) => setStatementDiscount(Number(event.target.value) || 0)}
              className="min-h-11 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-4 text-sm font-black text-[#2d231d] outline-none focus:border-[#c76532]"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-black text-[#8b735f]">對帳備註</span>
            <input
              value={statementNote}
              onChange={(event) => setStatementNote(event.target.value)}
              className="min-h-11 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-4 text-sm font-bold text-[#2d231d] outline-none focus:border-[#c76532]"
            />
          </label>
        </div>
        <button type="button" onClick={() => onCopyStatement(customerId)} className="mt-5 min-h-11 rounded-xl bg-[#263f31] px-5 text-sm font-black text-white">
          複製對帳文字
        </button>
      </section>

      <section className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-5 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Statement Preview</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">月結單 Preview</h2>
        <div className="mt-5 rounded-2xl bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#decfb7] pb-4">
            <div>
              <p className="text-xs font-black text-[#8b735f]">批發月結單</p>
              <h3 className="mt-1 text-2xl font-black text-[#2d231d]">{activeCustomer.name}</h3>
              <p className="mt-1 text-sm font-bold text-[#725f50]">期間：2026 / 07</p>
            </div>
            <p className="font-serif text-3xl font-black text-[#c76532]">{money(customerTotal)}</p>
          </div>
          <div className="mt-4 grid gap-3">
            {customerOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#2d231d]">{order.id}</p>
                    <p className="mt-1 text-xs font-bold text-[#8b735f]">{order.createdAt} · {order.items.length} 項</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(order.status)}`}>{order.status}</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {order.items.map((item) => {
                    const product = getProduct(products, item.productId)
                    const shippedQty = item.shippedQuantity ?? item.quantity
                    return (
                      <div key={item.productId} className="grid grid-cols-[1fr_auto_auto] gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#725f50]">
                        <span>{product.name}</span>
                        <span>實出 {shippedQty}{product.unit}</span>
                        <span className="font-black text-[#c76532]">{money(getPrice(products, product.id, order.customerId) * shippedQty)}</span>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-3 text-xl font-black text-[#c76532]">{money(getOrderShipTotal(order, products))}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl bg-[#263f31] p-4 text-white">
            <div className="flex items-center justify-between gap-3 text-sm font-black">
              <span>折讓調整</span>
              <span>- {money(statementDiscount)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/15 pt-3">
              <span className="text-xs font-black text-white/60">應收總額</span>
              <span className="font-serif text-3xl font-black text-[#f0c879]">{money(customerTotal)}</span>
            </div>
            <p className="mt-3 text-xs font-bold leading-5 text-white/68">{statementNote}</p>
          </div>
        </div>
      </section>
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
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-7">
      <div className="rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2]/88 p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Business Value</p>
            <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">導入後改善</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/tools/project-planner#demo" className="inline-flex min-h-11 items-center rounded-xl bg-[#263f31] px-5 text-sm font-black text-white">
              開始需求診斷
            </Link>
            <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl border border-[#decfb7] bg-white px-5 text-sm font-black text-[#2d231d]">
              聯絡我
            </Link>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {valuePoints.map((item) => (
            <div key={item} className="rounded-2xl border border-[#decfb7] bg-white p-4 text-sm font-black text-[#2d231d]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrderConfirmModal({ customer, cartItems, deliveryTime, cartNote, cartTotal, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b1410]/45 px-4 py-6 backdrop-blur-sm">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-[#decfb7] bg-[#fffaf2] p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Order Confirm</p>
            <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">確認訂單</h2>
            <p className="mt-2 text-sm font-bold text-[#725f50]">{customer.name} · {deliveryTime}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-black text-[#2d231d]">
            ×
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          {cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl bg-white p-4">
              <div>
                <p className="text-sm font-black text-[#2d231d]">{item.name}</p>
                <p className="mt-1 text-xs font-bold text-[#8b735f]">{item.spec} · 每 {item.unit}</p>
              </div>
              <p className="text-sm font-black text-[#725f50]">x{item.quantity}</p>
              <p className="font-serif text-xl font-black text-[#c76532]">{money(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-[#decfb7] bg-white p-4">
          <p className="text-xs font-black text-[#8b735f]">出貨備註</p>
          <p className="mt-2 text-sm font-bold leading-6 text-[#4f4035]">{cartNote || "無備註"}</p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-3xl font-black text-[#c76532]">{money(cartTotal)}</p>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="min-h-11 rounded-xl border border-[#decfb7] bg-white px-5 text-sm font-black text-[#2d231d]">
              返回修改
            </button>
            <button type="button" onClick={onConfirm} className="min-h-11 rounded-xl bg-[#c76532] px-5 text-sm font-black text-white">
              確認送出
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function DeliverySlipModal({ order, products, customer, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#1b1410]/45 px-4 py-6 backdrop-blur-sm">
      <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-[#decfb7] bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76532]">Delivery Slip</p>
            <h2 className="mt-2 font-serif text-3xl font-black text-[#2d231d]">出貨單 Preview</h2>
            <p className="mt-2 text-sm font-bold text-[#725f50]">{order.id} · {customer.name} · {order.deliveryTime || "固定配送日"}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#f7efe3] text-sm font-black text-[#2d231d]">
            ×
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#decfb7]">
          <div className="grid grid-cols-[1fr_0.45fr_0.45fr_0.5fr] bg-[#fffaf2] px-4 py-3 text-xs font-black text-[#8b735f]">
            <span>商品</span>
            <span className="text-right">訂購</span>
            <span className="text-right">實出</span>
            <span className="text-right">金額</span>
          </div>
          {order.items.map((item) => {
            const product = getProduct(products, item.productId)
            const shippedQty = item.shippedQuantity ?? item.quantity
            return (
              <div key={item.productId} className="grid grid-cols-[1fr_0.45fr_0.45fr_0.5fr] border-t border-[#eee3d4] px-4 py-3 text-sm font-bold text-[#4f4035]">
                <span>{product.name}</span>
                <span className="text-right">{item.quantity}{product.unit}</span>
                <span className="text-right">{shippedQty}{product.unit}</span>
                <span className="text-right font-black text-[#c76532]">{money(getPrice(products, product.id, order.customerId) * shippedQty)}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="rounded-2xl bg-[#f7efe3] p-4">
            <p className="text-xs font-black text-[#8b735f]">備註</p>
            <p className="mt-2 text-sm font-bold leading-6 text-[#4f4035]">{order.note}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-[#8b735f]">出貨金額</p>
            <p className="mt-1 font-serif text-3xl font-black text-[#c76532]">{money(getOrderShipTotal(order, products))}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={() => window.print()} className="min-h-11 rounded-xl border border-[#decfb7] bg-[#fffaf2] px-5 text-sm font-black text-[#2d231d]">
            列印
          </button>
          <button type="button" onClick={onClose} className="min-h-11 rounded-xl bg-[#263f31] px-5 text-sm font-black text-white">
            關閉
          </button>
        </div>
      </section>
    </div>
  )
}

function QuantityControl({ value, onMinus, onPlus }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={onMinus} className="grid h-9 w-9 place-items-center rounded-full border border-[#decfb7] bg-[#fffaf2] font-black">
        -
      </button>
      <span className="min-w-7 text-center text-sm font-black">{value}</span>
      <button type="button" onClick={onPlus} className="grid h-9 w-9 place-items-center rounded-full bg-[#263f31] font-black text-white">
        +
      </button>
    </div>
  )
}

function QuantityBlock({ label, value, onMinus, onPlus }) {
  return (
    <div className="rounded-2xl border border-[#decfb7] bg-[#fffaf2] p-3">
      <p className="mb-2 text-center text-[11px] font-black text-[#8b735f]">{label}</p>
      <QuantityControl value={value} onMinus={onMinus} onPlus={onPlus} />
    </div>
  )
}

export default WholesaleOrdering
