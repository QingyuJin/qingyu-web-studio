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
        <p className="text-[10px] font-bold tracking-[.15em] text-[#48766c]">{eyebrow}</p>
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
                ) : <div className="mt-5"><StatusNotice>狀態已更新 倉庫與客戶同步收到通知</StatusNotice></div>}
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
                  <button type="button" onClick={() => { setOrderSent(true); mission.completeStep("submit-order", "訂單已送出 後台已收到") }} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">送出訂單 {money(seedOrder.amount)}</button>
                </DemoStep>
              ) : <div className="mt-5"><StatusNotice>訂單已送出 後台新增 1 筆待出貨訂單</StatusNotice></div>}
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
    setView("owner")
    mission.announce("已切換到老闆後台")
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
            {!confirmed ? <button type="button" onClick={() => { setConfirmed(true); mission.completeStep("confirm-lead", "資料已同步到後台") }} className="mt-5 min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">確認已收到這筆詢價</button> : <div className="mt-5"><StatusNotice>資料已同步 可以直接安排聯絡</StatusNotice></div>}
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
              <button type="button" onClick={openOwnerView} className="min-h-12 w-full rounded-xl bg-[#173c37] px-5 text-sm font-bold text-white">查看老闆收到什麼</button>
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
    if (answer) mission.completeStep("ask-question", "AI 正在查找公司資料")
    else mission.announce("目前文件找不到這個答案")
    frameRef.current = window.requestAnimationFrame(() => {
      setResult(answer || { notFound: true })
      setLoading(false)
      if (answer) mission.announce("來源已找到")
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
              <p className="text-sm font-bold text-[#a8ccc3]">AI 正在查找</p>
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

const genericFlows = {
  "restaurant-ordering": {
    eyebrow: "餐廳點餐系統",
    title: "替 8 號桌送出餐點",
    text: "桌號 餐點與廚房狀態都在同一條流程",
    seedTitle: "8 號桌",
    seedMeta: "2 位客人 · 尚未點餐",
    amount: "NT$280",
    steps: [
      ["選擇 8 號桌", "已選擇 8 號桌"],
      ["加入招牌牛肉麵", "餐點已加入"],
      ["送到廚房", "廚房已收到新單"],
    ],
  },
  buildflow: {
    eyebrow: "工程案件管理",
    title: "更新王小姐住家的施工進度",
    text: "現場回報與客戶通知不再散落在聊天紀錄",
    seedTitle: "王小姐住家翻修",
    seedMeta: "台北市中山區 · 施工中",
    amount: "本週進度 65%",
    steps: [
      ["查看案件", "案件資料已開啟"],
      ["更新為油漆施工", "進度已更新"],
      ["通知王小姐", "客戶已收到最新進度"],
    ],
  },
  "analytics-dashboard": {
    eyebrow: "廣告成效看板",
    title: "找出本月最有效的廣告",
    text: "只保留老闆真正需要的花費 詢問與訂單",
    seedTitle: "本月廣告",
    seedMeta: "花費 NT$18,600 · 43 筆詢問",
    amount: "LINE 廣告 18 筆訂單",
    steps: [
      ["查看本月", "已切換到本月成效"],
      ["查看 LINE 廣告", "已找到最佳廣告來源"],
      ["儲存老闆摘要", "摘要已儲存"],
    ],
  },
  "commerce-platform": {
    eyebrow: "品牌購物系統",
    title: "完成一筆舒緩精華訂單",
    text: "商品內容與購買行動保持清楚 不讓客戶迷路",
    seedTitle: "植萃舒緩精華",
    seedMeta: "30 ml · 現貨",
    amount: "NT$1,680",
    steps: [
      ["選擇舒緩精華", "商品已選擇"],
      ["加入購物袋", "已加入購物袋"],
      ["送出訂單", "訂單已送出"],
    ],
  },
  "ai-audit": {
    eyebrow: "網站健檢助手",
    title: "檢查一個餐廳網站",
    text: "直接找出最影響客戶看懂與詢問的問題",
    seedTitle: "ABC 餐廳官網",
    seedMeta: "手機首頁 · 每月約 1,200 次瀏覽",
    amount: "目前詢問率 1.8%",
    steps: [
      ["選擇這個網站", "範例網站已選擇"],
      ["開始健檢", "正在檢查手機首頁"],
      ["查看三個優先改善", "改善清單已產生"],
    ],
  },
  "api-automation": {
    eyebrow: "訂單自動同步",
    title: "把新訂單送到出貨系統",
    text: "你只需要確認一次 剩下的資料整理交給系統",
    seedTitle: "新訂單 QY-0820-18",
    seedMeta: "ABC 餐廳 · 雞胸肉 5 盒",
    amount: "NT$3,280",
    steps: [
      ["查看訂單資料", "訂單資料已確認"],
      ["啟動自動同步", "資料已整理並送出"],
      ["確認出貨系統收到", "同步完成"],
    ],
  },
  "ai-tech": {
    eyebrow: "AI 客服流程",
    title: "處理一個客戶常見問題",
    text: "客戶問題 公司規定與回覆結果都能清楚核對",
    seedTitle: "客戶問 退貨怎麼辦",
    seedMeta: "網站聊天 · 剛剛收到",
    amount: "公司規定 7 天內可退貨",
    steps: [
      ["查看客戶問題", "客戶問題已開啟"],
      ["讓 AI 查公司規定", "已找到客戶服務規定"],
      ["確認回覆內容", "正確回覆已送出"],
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
            <h2 className="text-base font-semibold text-[#17211f]">即時紀錄</h2>
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
  return <GenericFlowDemo slug={slug} />
}
