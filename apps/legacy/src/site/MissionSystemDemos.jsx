import { useEffect, useMemo, useRef, useState } from "react"
import { DemoStep, useDemoMission } from "./DemoMission"

const seedOrder = {
  id: "QY-0820-01",
  customer: "王小姐",
  company: "ABC 餐廳",
  product: "舒肥雞胸肉",
  quantity: 5,
  amount: 3280,
}

function money(value) {
  return `NT$${value.toLocaleString("zh-TW")}`
}

function StatusNotice({ children, tone = "success" }) {
  return <p className={`rounded-xl px-4 py-3 text-sm font-bold ${tone === "success" ? "bg-[#e4f1ec] text-[#1d6659]" : "bg-[#f4efe2] text-[#765f24]"}`}>{children}</p>
}

function DemoPage({ eyebrow, title, text, children }) {
  return (
    <main className="demo-task-page mx-auto min-h-[calc(100svh-7rem)] max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 max-w-2xl sm:mb-8">
        <div className="flex flex-wrap items-center gap-3"><p className="text-[10px] font-bold tracking-[.15em] text-[#48766c]">{eyebrow}</p><span className="rounded-full border border-[#cbd4cf] px-2 py-1 text-[9px] font-bold text-[#70807a]">展示資料</span></div>
        <h1 className="mt-2 text-[clamp(1.55rem,4vw,2.3rem)] font-semibold tracking-[-.035em] text-[#17211f]">{title}</h1>
        <p className="mt-3 text-sm font-medium leading-6 text-[#61706b] sm:text-[15px]">{text}</p>
      </header>
      {children}
    </main>
  )
}

function WholesaleDemo() {
  const mission = useDemoMission()
  const [selected, setSelected] = useState(false)
  const [cart, setCart] = useState(false)
  const [orderSent, setOrderSent] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [shipped, setShipped] = useState(false)
  const [monthlyOpen, setMonthlyOpen] = useState(false)

  if (mission.roleId === "owner") {
    return (
      <DemoPage eyebrow="批發訂貨系統" title="今天只處理一筆新訂單" text="王小姐剛替 ABC 餐廳送出訂單 你只要確認 出貨 再看月結">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-2xl border border-[#d8d4ca] bg-white p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#68746f]">新訂單 {seedOrder.id}</p>
                <h2 className="mt-2 text-xl font-semibold text-[#17211f]">{seedOrder.company}</h2>
                <p className="mt-1 text-sm font-medium text-[#64716d]">{seedOrder.customer} · {money(seedOrder.amount)}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${shipped ? "bg-[#e4f1ec] text-[#1d6659]" : "bg-[#f4ead6] text-[#8a6526]"}`}>{shipped ? "已出貨" : "待出貨"}</span>
            </div>

            {!orderOpen ? (
              <DemoStep id="open-order" className="mt-6">
                <button type="button" onClick={() => { setOrderOpen(true); mission.completeStep("open-order", "訂單已開啟") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">查看這筆訂單</button>
              </DemoStep>
            ) : (
              <div className="mt-6 border-t border-[#e2dfd6] pt-5">
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <p><span className="block text-xs font-bold text-[#78837f]">商品</span><span className="mt-1 block font-semibold">{seedOrder.product}</span></p>
                  <p><span className="block text-xs font-bold text-[#78837f]">數量</span><span className="mt-1 block font-semibold">{seedOrder.quantity} 盒</span></p>
                </div>
                {!shipped ? (
                  <DemoStep id="ship-order" className="mt-5">
                    <button type="button" onClick={() => { setShipped(true); mission.completeStep("ship-order", "狀態已更新為已出貨") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">設為已出貨</button>
                  </DemoStep>
                ) : <div className="mt-5"><StatusNotice>展示狀態已更新 未對外傳送通知</StatusNotice></div>}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-[#d8d4ca] bg-[#17211f] p-5 text-white sm:p-6">
            <p className="text-xs font-bold text-[#95bcb2]">本月 ABC 餐廳</p>
            <p className="mt-3 text-3xl font-semibold">{monthlyOpen ? money(18640) : "—"}</p>
            <p className="mt-2 text-sm font-medium text-white/65">{monthlyOpen ? "4 筆訂單 全部已出貨" : "完成出貨後查看月結"}</p>
            {shipped && !monthlyOpen ? (
              <DemoStep id="view-monthly" className="mt-8">
                <button type="button" onClick={() => { setMonthlyOpen(true); mission.completeStep("view-monthly", "月結結果已產生") }} className="min-h-12 w-full rounded-xl bg-[#d7c89f] px-5 text-sm font-bold text-[#17211f]">查看本月月結</button>
              </DemoStep>
            ) : null}
          </section>
        </div>
      </DemoPage>
    )
  }

  return (
    <DemoPage eyebrow="批發訂貨系統" title="替 ABC 餐廳下 1 筆訂單" text="商品與價格已經設定好 只要選商品 加入購物車 送出">
      <div className="grid gap-5 lg:grid-cols-[1fr_.82fr]">
        <section>
          <DemoStep id="pick-product">
            <button type="button" aria-pressed={selected} onClick={() => { setSelected(true); mission.completeStep("pick-product", "已選擇雞胸肉 5 盒") }} className={`w-full rounded-2xl border p-5 text-left transition sm:p-6 ${selected ? "border-[#2d6d62] bg-[#eef5f2] ring-4 ring-[#8cb8ad]/15" : "border-[#d8d4ca] bg-white hover:border-[#6a958a]"}`}>
              <span className="text-xs font-bold text-[#48766c]">冷藏食品</span>
              <span className="mt-3 block text-xl font-semibold text-[#17211f]">{seedOrder.product}</span>
              <span className="mt-2 block text-sm font-medium text-[#61706b]">5 盒 · ABC 餐廳專屬價格</span>
              <span className="mt-5 block text-2xl font-semibold text-[#17211f]">{money(seedOrder.amount)}</span>
            </button>
          </DemoStep>
          {selected && !cart ? (
            <DemoStep id="add-cart" className="mt-4">
              <button type="button" onClick={() => { setCart(true); mission.completeStep("add-cart", "已加入購物車") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">加入購物車</button>
            </DemoStep>
          ) : null}
        </section>

        <aside className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#17211f]">這次訂單</h2>
            <span className="text-xs font-bold text-[#68746f]">ABC 餐廳</span>
          </div>
          {cart ? (
            <>
              <div className="mt-5 flex items-start justify-between gap-4 border-y border-[#e2dfd6] py-4 text-sm">
                <div><p className="font-semibold">{seedOrder.product}</p><p className="mt-1 text-[#68746f]">{seedOrder.quantity} 盒</p></div>
                <p className="font-semibold">{money(seedOrder.amount)}</p>
              </div>
              {!orderSent ? (
                <DemoStep id="submit-order" className="mt-5">
                  <button type="button" onClick={() => { setOrderSent(true); mission.completeStep("submit-order", "展示訂單已建立") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">送出訂單 {money(seedOrder.amount)}</button>
                </DemoStep>
              ) : <div className="mt-5"><StatusNotice>展示訂單已建立 後台顯示 1 筆待出貨資料</StatusNotice></div>}
            </>
          ) : <p className="mt-5 rounded-xl bg-[#f1f1ed] p-4 text-sm font-medium leading-6 text-[#697570]">選好商品後 這裡會顯示訂單金額</p>}
        </aside>
      </div>
    </DemoPage>
  )
}

const botQuestions = ["我想做網站", "網站大概多少錢", "我想做預約系統"]

function LineBotDemo() {
  const mission = useDemoMission()
  const [question, setQuestion] = useState("")
  const [size, setSize] = useState("")
  const [view, setView] = useState("chat")
  const [confirmed, setConfirmed] = useState(false)

  function chooseQuestion(value) {
    setQuestion(value)
    mission.completeStep("choose-message", "Bot 已收到訊息")
  }

  function chooseSize(value) {
    setSize(value)
    mission.completeStep("answer-followup", "Bot 已經整理好你的需求")
  }

  function openOwnerView() {
    if (!mission.completeStep("open-owner-view", "切換到展示後台")) return
    setView("owner")
    window.setTimeout(() => {
      const target = document.querySelector('[data-demo-step="confirm-lead"]')
      target?.scrollIntoView({ behavior: "smooth", block: "center" })
      target?.classList.add("demo-step-highlight")
      window.setTimeout(() => target?.classList.remove("demo-step-highlight"), 1800)
    }, 80)
  }

  if (view === "owner") {
    return (
      <DemoPage eyebrow="老闆後台" title="這筆就是你剛才傳的資料" text="客戶的問題與 Bot 追問結果已經整理成一筆可以跟進的詢價">
        <DemoStep id="confirm-lead">
          <section className={`rounded-2xl border bg-white p-5 sm:p-7 ${confirmed ? "border-[#d8d4ca]" : "border-[#2d6d62] ring-4 ring-[#8cb8ad]/20"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#48766c]">剛剛 · LINE 詢價</p>
                <h2 className="mt-2 text-xl font-semibold text-[#17211f]">新客戶 網站需求</h2>
              </div>
              <span className="rounded-full bg-[#f4ead6] px-3 py-1 text-xs font-bold text-[#8a6526]">待聯絡</span>
            </div>
            <dl className="mt-6 grid gap-4 border-y border-[#e2dfd6] py-5 text-sm sm:grid-cols-2">
              <div><dt className="text-xs font-bold text-[#78837f]">客戶問題</dt><dd className="mt-1 font-semibold">{question}</dd></div>
              <div><dt className="text-xs font-bold text-[#78837f]">需求規模</dt><dd className="mt-1 font-semibold">{size}</dd></div>
              <div><dt className="text-xs font-bold text-[#78837f]">建議下一步</dt><dd className="mt-1 font-semibold">安排 20 分鐘需求確認</dd></div>
              <div><dt className="text-xs font-bold text-[#78837f]">來源</dt><dd className="mt-1 font-semibold">LINE 自動詢價</dd></div>
            </dl>
            {!confirmed ? <button type="button" onClick={() => { setConfirmed(true); mission.completeStep("confirm-lead", "展示後台已確認這筆詢價") }} className="mt-5 min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">確認已收到這筆詢價</button> : <div className="mt-5"><StatusNotice>展示狀態已更新 可以安排聯絡</StatusNotice></div>}
          </section>
        </DemoStep>
      </DemoPage>
    )
  }

  return (
    <DemoPage eyebrow="LINE 詢價助手" title="假裝你是一位來詢價的客戶" text="不用自己想訊息 點一個常見問題就開始">
      <div className="mx-auto max-w-2xl rounded-[1.6rem] border border-[#ccd7d1] bg-[#dfeee8] p-4 sm:p-6">
        <div className="rounded-full bg-white px-4 py-3 text-center text-sm font-bold text-[#17211f]">晴宇 LINE 助手</div>
        <div className="mt-5 space-y-3">
          {!question ? (
            <DemoStep id="choose-message" className="grid gap-3">
              {botQuestions.map((item) => <button key={item} type="button" onClick={() => chooseQuestion(item)} className="min-h-12 rounded-xl bg-white px-4 text-left text-sm font-bold text-[#17211f] shadow-sm">{item}</button>)}
            </DemoStep>
          ) : (
            <>
              <p className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-[#173c37] px-4 py-3 text-sm font-semibold text-white">{question}</p>
              <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#17211f]">收到 我先幫你整理 這次需求大約是什麼規模</p>
            </>
          )}
          {question && !size ? (
            <DemoStep id="answer-followup" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {["單頁介紹網站", "完整企業網站", "網站加預約功能"].map((item) => <button key={item} type="button" onClick={() => chooseSize(item)} className="min-h-12 rounded-xl border border-white bg-white/80 px-3 text-sm font-bold text-[#245249]">{item}</button>)}
            </DemoStep>
          ) : null}
          {size ? (
            <>
              <p className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-[#173c37] px-4 py-3 text-sm font-semibold text-white">{size}</p>
              <StatusNotice>Bot 已經整理好你的需求</StatusNotice>
              <DemoStep id="open-owner-view"><button type="button" onClick={openOwnerView} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">查看老闆收到什麼</button></DemoStep>
            </>
          ) : null}
        </div>
      </div>
    </DemoPage>
  )
}

const knowledgeAnswers = {
  "這份合約什麼時候到期": {
    answer: "目前的店面租約會在 2027 年 6 月 30 日到期 需在到期前 90 天決定是否續約",
    file: "店面租賃合約 2024.pdf",
    quote: "租賃期間自 2024 年 7 月 1 日起至 2027 年 6 月 30 日止 續約意願應於期滿前九十日提出",
  },
  "退貨規定是什麼": {
    answer: "未拆封商品可在到貨後 7 天內申請退貨 客製與冷藏商品不適用",
    file: "客戶服務規定.md",
    quote: "一般商品到貨七日內且包裝完整可申請退貨 客製商品與冷藏食品不接受退貨",
  },
  "員工請假流程怎麼走": {
    answer: "一般請假最晚在前一工作日提出 臨時病假需先通知主管並在三日內補證明",
    file: "員工手冊 2026.pdf",
    quote: "事假應於前一工作日完成申請 病假應先通知直屬主管並於三日內補交就醫證明",
  },
}

function KnowledgeDemo() {
  const mission = useDemoMission()
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [sourceOpen, setSourceOpen] = useState(false)
  const frameRef = useRef(null)

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), [])

  function ask(value) {
    setQuestion(value)
    setLoading(true)
    setResult(null)
    setSourceOpen(false)
    const answer = knowledgeAnswers[value]
    if (answer) mission.completeStep("ask-question", "正在比對範例文件")
    else mission.announce("目前文件找不到這個答案")
    frameRef.current = window.requestAnimationFrame(() => {
      setResult(answer || { notFound: true })
      setLoading(false)
      if (answer) mission.announce("範例來源已找到")
    })
  }

  return (
    <DemoPage eyebrow="AI 公司知識庫" title="把公司文件交給 AI 以後直接問" text="範例文件已經放好 你不需要上傳任何東西">
      <div className="grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-4 sm:p-6">
          <p className="text-xs font-bold text-[#68746f]">選一個問題</p>
          <DemoStep id="ask-question" className="mt-4 grid gap-3">
            {Object.keys(knowledgeAnswers).map((item) => <button key={item} type="button" onClick={() => ask(item)} aria-pressed={question === item} className={`min-h-12 rounded-xl border px-4 text-left text-sm font-bold ${question === item ? "border-[#2d6d62] bg-[#eef5f2] text-[#1d6659]" : "border-[#dedbd2] bg-white text-[#273532]"}`}>{item}</button>)}
          </DemoStep>
          <button type="button" onClick={() => ask("今年年終獎金有多少")} className="mt-3 min-h-11 text-left text-xs font-bold text-[#697570] underline underline-offset-4">測試找不到資料</button>
          <details className="mt-5 border-t border-[#e2dfd6] pt-4 text-xs text-[#697570]">
            <summary className="min-h-11 cursor-pointer font-bold">技術拆解</summary>
            <p className="mt-2 leading-6">文件切分 語意搜尋與來源引用都在背景完成</p>
          </details>
        </section>

        <section className="min-h-64 rounded-2xl border border-[#d8d4ca] bg-[#17211f] p-5 text-white sm:p-7">
          {!question ? <p className="text-sm font-medium leading-7 text-white/60">點左邊一個問題 答案會顯示在這裡</p> : null}
          {loading ? (
            <div aria-live="polite">
              <p className="text-sm font-bold text-[#a8ccc3]">正在比對範例文件</p>
              <div className="mt-5 space-y-3"><span className="block h-3 w-4/5 animate-pulse rounded bg-white/12" /><span className="block h-3 w-full animate-pulse rounded bg-white/12" /><span className="block h-3 w-2/3 animate-pulse rounded bg-white/12" /></div>
            </div>
          ) : null}
          {result?.notFound ? <div><p className="text-xs font-bold text-[#a8ccc3]">查詢結果</p><h2 className="mt-3 text-xl font-semibold">目前文件找不到這個答案</h2><p className="mt-4 text-sm font-medium leading-7 text-white/65">AI 不會自行補答案 請改問左側已有資料的問題</p></div> : null}
          {result && !result.notFound ? (
            <div>
              <p className="text-xs font-bold text-[#a8ccc3]">答案</p>
              <p className="mt-3 text-lg font-semibold leading-8">{result.answer}</p>
              <p className="mt-5 rounded-xl bg-white/8 px-4 py-3 text-sm font-semibold text-white/75">答案不是亂猜 這裡是它找到的公司資料</p>
              {!sourceOpen ? (
                <DemoStep id="open-source" className="mt-5">
                  <button type="button" onClick={() => { setSourceOpen(true); mission.completeStep("open-source", "引用段落已展開") }} className="min-h-12 w-full rounded-xl bg-[#d7c89f] px-5 text-sm font-bold text-[#17211f]">查看來源文件</button>
                </DemoStep>
              ) : (
                <div className="mt-5 rounded-xl bg-white p-4 text-[#17211f]">
                  <p className="text-xs font-bold text-[#48766c]">來源文件</p>
                  <p className="mt-2 text-sm font-semibold">{result.file}</p>
                  <p className="mt-4 text-xs font-bold text-[#78837f]">對應引用段落</p>
                  <blockquote className="mt-2 border-l-2 border-[#6a958a] pl-3 text-sm font-medium leading-6 text-[#53615d]">{result.quote}</blockquote>
                  <DemoStep id="finish-answer" className="mt-5">
                    <button type="button" onClick={() => mission.completeStep("finish-answer", "答案與來源已確認")} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">答案與原文一致</button>
                  </DemoStep>
                </div>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </DemoPage>
  )
}

function RestaurantDemo() {
  const mission = useDemoMission()
  const [tableSelected, setTableSelected] = useState(false)
  const [mealAdded, setMealAdded] = useState(false)
  const [sent, setSent] = useState(false)
  const [cooking, setCooking] = useState(false)
  const [served, setServed] = useState(false)

  return (
    <DemoPage eyebrow="餐廳點餐系統" title="替 8 號桌完成一筆餐點" text="桌號 售罄 餐點與廚房狀態都在同一條展示流程">
      <div className="grid gap-5 lg:grid-cols-[1fr_.9fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-7">
          <p className="text-xs font-bold text-[#48766c]">外場點餐</p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f3f2ed] p-4">
            <div><p className="text-xs font-bold text-[#75817d]">桌號</p><p className="mt-1 text-lg font-semibold text-[#17211f]">8 號桌</p></div>
            <span className="text-xs font-bold text-[#61706b]">2 位客人</span>
          </div>
          {!tableSelected ? <DemoStep id="choose-table" className="mt-4"><button type="button" onClick={() => { setTableSelected(true); mission.completeStep("choose-table", "已選擇 8 號桌") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">選擇 8 號桌</button></DemoStep> : null}
          {tableSelected ? <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between rounded-xl border border-[#dedbd2] p-4"><div><p className="font-semibold text-[#17211f]">鮮蝦蒸餃</p><p className="mt-1 text-xs font-bold text-[#9b5545]">今日售罄</p></div><button type="button" disabled className="min-h-11 rounded-lg bg-[#ebe9e3] px-4 text-xs font-bold text-[#8a918e]">無法加入</button></div>
            <div className="flex items-center justify-between rounded-xl border border-[#dedbd2] p-4"><div><p className="font-semibold text-[#17211f]">招牌牛肉麵</p><p className="mt-1 text-xs font-bold text-[#61706b]">NT$280</p></div>{!mealAdded ? <DemoStep id="add-meal"><button type="button" onClick={() => { setMealAdded(true); mission.completeStep("add-meal", "招牌牛肉麵已加入") }} className="min-h-11 rounded-lg bg-[#173c37] px-4 text-xs font-bold text-white">加入餐點</button></DemoStep> : <span className="text-xs font-bold text-[#1d6659]">已加入</span>}</div>
          </div> : null}
          {mealAdded && !sent ? <DemoStep id="send-kitchen" className="mt-5"><button type="button" onClick={() => { setSent(true); mission.completeStep("send-kitchen", "展示廚房已收到新單") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">送到展示廚房</button></DemoStep> : null}
        </section>

        <aside className="rounded-2xl border border-[#d8d4ca] bg-[#17211f] p-5 text-white sm:p-6">
          <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold text-[#95bcb2]">廚房單 K08</p><h2 className="mt-2 text-xl font-semibold">8 號桌</h2></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">{served ? "已出餐" : cooking ? "製作中" : sent ? "待接單" : "等待送單"}</span></div>
          {sent ? <div className="mt-5 border-y border-white/15 py-5"><p className="font-semibold">招牌牛肉麵 × 1</p><p className="mt-2 text-xs font-medium text-white/60">無售罄品項 無備註</p></div> : <p className="mt-5 rounded-xl bg-white/8 p-4 text-sm font-medium leading-6 text-white/60">外場送出後 這裡會立即出現新單</p>}
          {sent && !cooking ? <DemoStep id="start-cooking" className="mt-5"><button type="button" onClick={() => { setCooking(true); mission.completeStep("start-cooking", "展示廚房開始製作") }} className="min-h-12 w-full rounded-xl bg-[#d7c89f] px-5 text-sm font-bold text-[#17211f]">開始製作</button></DemoStep> : null}
          {cooking && !served ? <DemoStep id="serve-order" className="mt-5"><button type="button" onClick={() => { setServed(true); mission.completeStep("serve-order", "展示餐點已出餐") }} className="min-h-12 w-full rounded-xl bg-[#d7c89f] px-5 text-sm font-bold text-[#17211f]">完成出餐</button></DemoStep> : null}
          {served ? <div className="mt-5"><StatusNotice>展示狀態已更新 外場可立即查看</StatusNotice></div> : null}
        </aside>
      </div>
    </DemoPage>
  )
}

function BuildFlowDemo() {
  const mission = useDemoMission()
  const [opened, setOpened] = useState(false)
  const [taskDone, setTaskDone] = useState(false)
  const [photoAdded, setPhotoAdded] = useState(false)
  const [progress, setProgress] = useState(false)
  const [reported, setReported] = useState(false)

  return (
    <DemoPage eyebrow="工程案件管理" title="更新王小姐住家的施工進度" text="待辦 現場照片 進度與驗收回報集中在同一個展示案件">
      <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold text-[#48766c]">案件 BF-026</p><h2 className="mt-2 text-xl font-semibold text-[#17211f]">王小姐住家翻修</h2><p className="mt-1 text-sm font-medium text-[#66736f]">展示地址 台北市中山區</p></div><span className="rounded-full bg-[#f4ead6] px-3 py-1 text-xs font-bold text-[#8a6526]">{progress ? "油漆施工" : "油漆前置"}</span></div>
          {!opened ? <DemoStep id="open-project" className="mt-6"><button type="button" onClick={() => { setOpened(true); mission.completeStep("open-project", "案件資料已開啟") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">查看案件</button></DemoStep> : <>
            <div className="mt-6 border-t border-[#e2dfd6] pt-5"><p className="text-xs font-bold text-[#78837f]">今日待辦</p><div className="mt-3 flex items-center justify-between gap-4 rounded-xl bg-[#f3f2ed] p-4"><div><p className="font-semibold text-[#17211f]">完成牆面補土與防護</p><p className="mt-1 text-xs font-medium text-[#66736f]">完成後才能進入油漆施工</p></div>{!taskDone ? <DemoStep id="complete-task"><button type="button" onClick={() => { setTaskDone(true); mission.completeStep("complete-task", "油漆前置待辦已完成") }} className="min-h-11 shrink-0 rounded-lg bg-[#173c37] px-4 text-xs font-bold text-white">完成</button></DemoStep> : <span className="text-xs font-bold text-[#1d6659]">已完成</span>}</div></div>
            {taskDone && !photoAdded ? <DemoStep id="add-photo" className="mt-4"><button type="button" onClick={() => { setPhotoAdded(true); mission.completeStep("add-photo", "展示現場照片已加入") }} className="min-h-12 w-full rounded-xl border border-[#2d6d62] px-5 text-sm font-bold text-[#1d6659]">加入現場照片</button></DemoStep> : null}
            {photoAdded ? <figure className="mt-4 overflow-hidden rounded-xl bg-[#eeeae1]"><img src="/project-photos/335950_0.jpg" alt="工程現場展示照片" width="960" height="600" className="aspect-[16/9] w-full object-cover" /><figcaption className="px-4 py-3 text-xs font-bold text-[#61706b]">現場照片 1 張 展示使用</figcaption></figure> : null}
            {photoAdded && !progress ? <DemoStep id="update-progress" className="mt-4"><button type="button" onClick={() => { setProgress(true); mission.completeStep("update-progress", "進度已更新為油漆施工") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">更新為油漆施工</button></DemoStep> : null}
            {progress && !reported ? <DemoStep id="send-update" className="mt-4"><button type="button" onClick={() => { setReported(true); mission.completeStep("send-update", "展示進度回報已產生") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">產生客戶進度回報</button></DemoStep> : null}
          </>}
        </section>

        <aside className="rounded-2xl border border-[#d8d4ca] bg-[#f7f6f1] p-5 sm:p-6"><p className="text-xs font-bold text-[#48766c]">驗收與回報</p><ul className="mt-4 grid gap-3 text-sm font-semibold text-[#293633]"><li className="rounded-xl bg-white p-4">牆面補土 {taskDone ? "已完成" : "待完成"}</li><li className="rounded-xl bg-white p-4">現場照片 {photoAdded ? "已附上" : "待附上"}</li><li className="rounded-xl bg-white p-4">客戶驗收 完工後安排</li></ul>{reported ? <div className="mt-5"><StatusNotice>展示回報已產生 包含進度 照片與驗收項目</StatusNotice></div> : <p className="mt-5 text-xs font-medium leading-6 text-[#697570]">完成左側工作後 系統會整理一份可核對的回報</p>}</aside>
      </div>
    </DemoPage>
  )
}

function ApiAutomationDemo() {
  const mission = useDemoMission()
  const [inspected, setInspected] = useState(false)
  const [validated, setValidated] = useState(false)
  const [failed, setFailed] = useState(false)
  const [synced, setSynced] = useState(false)
  const [deduped, setDeduped] = useState(false)

  return (
    <DemoPage eyebrow="訂單自動同步" title="把新訂單送到出貨系統" text="此原型展示驗證 失敗 重試與去重 未連外部出貨帳號">
      <div className="grid gap-5 lg:grid-cols-[1fr_.9fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-7"><p className="text-xs font-bold text-[#48766c]">來源訂單 QY-0820-18</p><h2 className="mt-2 text-xl font-semibold text-[#17211f]">ABC 餐廳 雞胸肉 5 盒</h2><p className="mt-2 text-sm font-medium text-[#66736f]">NT$3,280</p>
          {!inspected ? <DemoStep id="inspect-data" className="mt-6"><button type="button" onClick={() => { setInspected(true); mission.completeStep("inspect-data", "訂單資料已開啟") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">查看訂單資料</button></DemoStep> : <div className="mt-6 grid gap-2 rounded-xl bg-[#f3f2ed] p-4 text-xs font-semibold text-[#52605c]"><p>customer_name → 收件客戶</p><p>items → 出貨品項</p><p>source_id → 去重識別</p></div>}
          {inspected && !validated ? <DemoStep id="validate-map" className="mt-4"><button type="button" onClick={() => { setValidated(true); mission.completeStep("validate-map", "必要欄位與格式已確認") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">確認欄位映射</button></DemoStep> : null}
          {validated && !failed ? <DemoStep id="run-sync" className="mt-4"><button type="button" onClick={() => { setFailed(true); mission.completeStep("run-sync", "展示同步失敗 等待重試") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">執行第一次同步</button></DemoStep> : null}
          {failed && !synced ? <DemoStep id="retry-sync" className="mt-4"><button type="button" onClick={() => { setSynced(true); mission.completeStep("retry-sync", "展示重試成功") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">修正後重新同步</button></DemoStep> : null}
          {synced && !deduped ? <DemoStep id="verify-duplicate" className="mt-4"><button type="button" onClick={() => { setDeduped(true); mission.completeStep("verify-duplicate", "重送沿用原展示紀錄") }} className="min-h-12 w-full rounded-xl border border-[#2d6d62] px-5 text-sm font-bold text-[#1d6659]">模擬重送一次</button></DemoStep> : null}
        </section>
        <aside className="rounded-2xl border border-[#d8d4ca] bg-[#17211f] p-5 text-white sm:p-6"><p className="text-xs font-bold text-[#95bcb2]">同步紀錄</p><div className="mt-4 grid gap-3">{validated ? <StatusNotice>欄位驗證通過</StatusNotice> : null}{failed ? <StatusNotice tone="warning">第一次同步失敗 503 連線暫時不可用</StatusNotice> : null}{synced ? <StatusNotice>重試完成 建立展示出貨單 SHIP-3280</StatusNotice> : null}{deduped ? <StatusNotice>相同 source_id 已存在 沿用 SHIP-3280</StatusNotice> : null}{!validated ? <p className="rounded-xl bg-white/8 p-4 text-sm font-medium leading-6 text-white/60">先核對來源欄位 再執行展示同步</p> : null}</div></aside>
      </div>
    </DemoPage>
  )
}

function AnalyticsDemo() {
  const mission = useDemoMission()
  const [periodOpen, setPeriodOpen] = useState(false)
  const [channelOpen, setChannelOpen] = useState(false)
  const [summaryReady, setSummaryReady] = useState(false)

  const metrics = [
    ["廣告花費", "NT$48,000", "本月範例廣告支出"],
    ["有效詢問", "92", "表單與 LINE 詢問"],
    ["成立訂單", "21", "人工確認成立的訂單"],
  ]

  const channels = [
    ["LINE 廣告", "NT$22,000", "51 詢問", "14 訂單"],
    ["搜尋廣告", "NT$18,000", "28 詢問", "5 訂單"],
    ["Instagram", "NT$8,000", "13 詢問", "2 訂單"],
  ]

  return (
    <DemoPage eyebrow="廣告成效看板" title="找出本月最有效的廣告" text="範例期間 指標定義與來源都寫清楚 未連接正式廣告帳號">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-xs font-bold text-[#48766c]">展示期間</p><h2 className="mt-2 text-xl font-semibold text-[#17211f]">2026 年 8 月</h2><p className="mt-1 text-xs font-medium text-[#66736f]">範例 GA4 與廣告資料</p></div>
            {!periodOpen ? <DemoStep id="choose-period"><button type="button" onClick={() => { setPeriodOpen(true); mission.completeStep("choose-period", "本月展示資料已開啟") }} className="min-h-11 rounded-xl bg-[#173c37] px-4 text-xs font-bold text-white">查看本月</button></DemoStep> : <span className="rounded-full bg-[#e4f1ec] px-3 py-1 text-xs font-bold text-[#1d6659]">本月</span>}
          </div>

          {periodOpen ? <>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {metrics.map(([label, value, note]) => <article key={label} className="rounded-xl bg-[#f3f2ed] p-4"><p className="text-xs font-bold text-[#66736f]">{label}</p><p className="mt-2 text-2xl font-semibold text-[#17211f]">{value}</p><p className="mt-2 text-[11px] font-medium leading-5 text-[#78837f]">{note}</p></article>)}
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-[#dedbd2]">
              {channels.map(([name, spend, leads, orders], index) => <div key={name} className={`grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-4 ${index ? "border-t border-[#e2dfd6]" : ""}`}><div><p className="text-sm font-semibold text-[#17211f]">{name}</p><p className="mt-1 text-xs font-medium text-[#66736f]">{spend} {leads} {orders}</p></div>{index === 0 && !channelOpen ? <DemoStep id="open-channel"><button type="button" onClick={() => { setChannelOpen(true); mission.completeStep("open-channel", "LINE 廣告明細已開啟") }} className="min-h-11 rounded-lg border border-[#2d6d62] px-3 text-xs font-bold text-[#1d6659]">查看明細</button></DemoStep> : index === 0 ? <span className="self-center text-xs font-bold text-[#1d6659]">表現最佳</span> : null}</div>)}
            </div>
          </> : <p className="mt-6 rounded-xl bg-[#f3f2ed] p-4 text-sm font-medium leading-6 text-[#697570]">先開啟展示月份再比較廣告來源</p>}
        </section>

        <aside className="rounded-2xl border border-[#d8d4ca] bg-[#17211f] p-5 text-white sm:p-6">
          <p className="text-xs font-bold text-[#95bcb2]">老闆摘要</p>
          {channelOpen ? <><h2 className="mt-3 text-xl font-semibold">LINE 廣告帶來最多成立訂單</h2><dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-white/8 p-4"><dt className="text-xs font-bold text-white/55">每筆詢問成本</dt><dd className="mt-2 text-lg font-semibold">NT$431</dd></div><div className="rounded-xl bg-white/8 p-4"><dt className="text-xs font-bold text-white/55">詢問轉訂單</dt><dd className="mt-2 text-lg font-semibold">27%</dd></div></dl><p className="mt-5 text-sm font-medium leading-7 text-white/70">先保留 LINE 預算 再測試搜尋頁內容</p>{!summaryReady ? <DemoStep id="save-report" className="mt-5"><button type="button" onClick={() => { setSummaryReady(true); mission.completeStep("save-report", "展示老闆摘要已產生") }} className="min-h-12 w-full rounded-xl bg-[#d7c89f] px-5 text-sm font-bold text-[#17211f]">產生展示摘要</button></DemoStep> : <div className="mt-5"><StatusNotice>展示摘要已產生 未寫入正式報表</StatusNotice></div>}</> : <p className="mt-4 rounded-xl bg-white/8 p-4 text-sm font-medium leading-6 text-white/60">查看最佳廣告後 這裡會顯示可採取的決策</p>}
        </aside>
      </div>
    </DemoPage>
  )
}

function AiAuditDemo() {
  const mission = useDemoMission()
  const [siteSelected, setSiteSelected] = useState(false)
  const [checked, setChecked] = useState(false)
  const [fixesOpen, setFixesOpen] = useState(false)

  const findings = [
    { priority: "優先 1", title: "第一眼看不出餐廳特色", evidence: "手機主標只有歡迎光臨", fix: "改成台北晚餐與包廂訂位" },
    { priority: "優先 1", title: "訂位入口太晚出現", evidence: "手機要滑過四個區塊才看到按鈕", fix: "主視覺加入訂位按鈕並固定底部入口" },
    { priority: "優先 2", title: "搜尋摘要沒有重點", evidence: "目前只顯示餐廳官方網站", fix: "補上料理地點與訂位資訊" },
  ]

  return (
    <DemoPage eyebrow="網站健檢助手" title="檢查一個餐廳網站" text="這是指定範例檢查 不會掃描真實網址">
      <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-7">
          <p className="text-xs font-bold text-[#48766c]">範例網站</p>
          <div className={`mt-4 rounded-2xl border p-4 ${siteSelected ? "border-[#2d6d62] bg-[#eef5f2]" : "border-[#dedbd2] bg-[#f7f6f1]"}`}><div className="mx-auto max-w-[15rem] overflow-hidden rounded-xl border border-[#d7d4cb] bg-white shadow-sm"><div className="h-2 bg-[#283832]" /><div className="p-4"><p className="text-[9px] font-bold tracking-[.14em] text-[#74807b]">ABC RESTAURANT</p><p className="mt-8 font-serif text-2xl font-semibold text-[#17211f]">歡迎光臨</p><div className="mt-8 h-16 rounded-lg bg-[#e6dfd1]" /><div className="mt-3 h-2 w-4/5 rounded bg-[#e7e8e3]" /><div className="mt-2 h-2 w-3/5 rounded bg-[#e7e8e3]" /></div></div>{!siteSelected ? <DemoStep id="choose-site" className="mt-4"><button type="button" onClick={() => { setSiteSelected(true); mission.completeStep("choose-site", "餐廳範例網站已選擇") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">選擇這個網站</button></DemoStep> : null}</div>
          {siteSelected && !checked ? <DemoStep id="run-check" className="mt-4"><button type="button" onClick={() => { setChecked(true); mission.completeStep("run-check", "範例首頁檢查完成") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">開始健檢</button></DemoStep> : null}
          {checked && !fixesOpen ? <DemoStep id="open-fixes" className="mt-4"><button type="button" onClick={() => { setFixesOpen(true); mission.completeStep("open-fixes", "三項優先改善已展開") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">查看三個優先改善</button></DemoStep> : null}
        </section>

        <aside className="rounded-2xl border border-[#d8d4ca] bg-[#f7f6f1] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4"><h2 className="text-base font-semibold text-[#17211f]">改善清單</h2><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#61706b]">{fixesOpen ? "3 項" : "等待檢查"}</span></div>
          {fixesOpen ? <div className="mt-5 grid gap-3">{findings.map((item) => <article key={item.title} className="rounded-xl bg-white p-4"><p className="text-[10px] font-bold tracking-[.08em] text-[#9b5545]">{item.priority}</p><h3 className="mt-2 text-sm font-semibold text-[#17211f]">{item.title}</h3><dl className="mt-3 grid gap-2 text-xs leading-5"><div><dt className="font-bold text-[#78837f]">看到的證據</dt><dd className="mt-1 font-medium text-[#4f5c58]">{item.evidence}</dd></div><div><dt className="font-bold text-[#78837f]">建議修改</dt><dd className="mt-1 font-semibold text-[#1d6659]">{item.fix}</dd></div></dl></article>)}</div> : <p className="mt-5 rounded-xl bg-white p-4 text-sm font-medium leading-6 text-[#697570]">完成範例檢查後 這裡會顯示證據與修改方式</p>}
        </aside>
      </div>
    </DemoPage>
  )
}

const genericFlows = {
  "ai-tech": {
    eyebrow: "AI 客服技術實驗",
    title: "處理一個客戶常見問題",
    text: "客戶問題 公司規定與回覆結果都能清楚核對",
    seedTitle: "客戶問 退貨怎麼辦",
    seedMeta: "網站聊天 · 剛剛收到",
    amount: "公司規定 7 天內可退貨",
    steps: [
      ["查看客戶問題", "客戶問題已開啟"],
      ["讓 AI 查公司規定", "已找到客戶服務規定"],
      ["確認回覆內容", "展示回覆已確認"],
    ],
  },
}

function GenericFlowDemo({ slug }) {
  const mission = useDemoMission()
  const flow = genericFlows[slug]
  const [events, setEvents] = useState([])

  const visibleEvents = useMemo(() => events.slice().reverse(), [events])
  if (!flow) return null
  const current = flow.steps[mission.stepIndex]

  function runStep() {
    if (!current || !mission.currentStep) return
    setEvents((items) => [...items, current[1]])
    mission.completeStep(mission.currentStep.action, current[1])
  }

  return (
    <DemoPage eyebrow={flow.eyebrow} title={flow.title} text={flow.text}>
      <div className="grid gap-5 lg:grid-cols-[1fr_.78fr]">
        <section className="rounded-2xl border border-[#d8d4ca] bg-white p-5 sm:p-7">
          <p className="text-xs font-bold text-[#48766c]">現在處理</p>
          <h2 className="mt-3 text-xl font-semibold text-[#17211f]">{flow.seedTitle}</h2>
          <p className="mt-2 text-sm font-medium text-[#66736f]">{flow.seedMeta}</p>
          <p className="mt-6 border-y border-[#e2dfd6] py-5 text-2xl font-semibold text-[#17211f]">{flow.amount}</p>
          {current ? (
            <DemoStep id={mission.currentStep.id} className="mt-6">
              <button type="button" onClick={runStep} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">{current[0]}</button>
            </DemoStep>
          ) : null}
        </section>
        <aside className="rounded-2xl border border-[#d8d4ca] bg-[#f7f6f1] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-[#17211f]">展示紀錄</h2>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#61706b]">{events.length} 筆更新</span>
          </div>
          <div className="mt-5 grid gap-3">
            {visibleEvents.length ? visibleEvents.map((item, index) => <StatusNotice key={`${item}-${index}`}>{item}</StatusNotice>) : <p className="rounded-xl bg-white p-4 text-sm font-medium leading-6 text-[#697570]">完成左側操作後 這裡會立即顯示結果</p>}
          </div>
        </aside>
      </div>
    </DemoPage>
  )
}

export default function MissionSystemDemo({ slug }) {
  if (slug === "wholesale-ordering") return <WholesaleDemo />
  if (slug === "linebot") return <LineBotDemo />
  if (slug === "rag-consultant") return <KnowledgeDemo />
  if (slug === "restaurant-ordering") return <RestaurantDemo />
  if (slug === "buildflow") return <BuildFlowDemo />
  if (slug === "api-automation") return <ApiAutomationDemo />
  if (slug === "analytics-dashboard") return <AnalyticsDemo />
  if (slug === "ai-audit") return <AiAuditDemo />
  return <GenericFlowDemo slug={slug} />
}
