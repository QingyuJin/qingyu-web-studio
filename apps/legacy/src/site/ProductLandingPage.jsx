import { useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"

const GREEN = "#1e6e4e"

const plans = [
  { id: "single", name: "嘗鮮盒", spec: "6 瓶裝", price: 480, note: "第一次喝 先試一盒" },
  { id: "triple", name: "三盒組", spec: "18 瓶裝", price: 1260, note: "最多人選 現省 $180", hot: true },
  { id: "monthly", name: "月訂閱", spec: "每月 1 盒", price: 399, suffix: "/月", note: "隨時暫停 免運直送" },
]

const pains = [
  ["咖啡喝了心悸手抖", "但不喝又醒不過來 只能硬撐"],
  ["能量飲太甜太化學", "一罐糖快 30 克 提神完更疲倦"],
  ["下午三點準時斷電", "會議開到一半 腦袋直接關機"],
]

const sellingPoints = [
  ["緩釋提神 4 小時", "綠茶咖啡因＋L-茶胺酸 清醒但不心悸 不會猛然升起又摔落"],
  ["0 糖 0 香精", "羅漢果天然甜 一瓶只有 12 大卡 喝完沒有罪惡感"],
  ["喝得出植物", "綠茶、薄荷、檸檬馬鞭草冷萃 味道乾淨 不是化學糖水"],
]

const specs = [
  ["容量", "330ml / 瓶"],
  ["咖啡因", "80mg（約一杯手沖）"],
  ["熱量", "12 kcal"],
  ["甜味來源", "羅漢果萃取"],
  ["成分", "全素・無防腐劑"],
  ["產地", "台灣製造・SGS 檢驗"],
]

const scenes = [
  ["💻", "上班午後", "兩點開會前一瓶 撐過整個下午"],
  ["🏋️", "健身前 30 分", "乾淨的能量 不加糖不脹氣"],
  ["🚗", "長途開車", "比咖啡溫和 專注不緊繃"],
  ["📖", "趕稿讀書", "安靜的清醒 一路到收尾"],
]

const reviews = [
  ["Amber", "行銷企劃", "戒掉每天兩杯拿鐵的人是我下午一瓶 開會不再放空 也沒有咖啡的心悸感"],
  ["志豪", "健身教練", "訓練前半小時喝 體感很順成分乾淨這點對我的學員很重要"],
  ["Kelly", "接案設計師", "趕稿救星味道像好喝的冷泡茶 不是那種假假的能量飲味"],
]

const faqs = [
  ["喝了會心悸嗎？", "一瓶咖啡因 80mg 約等於一杯手沖 搭配 L-茶胺酸緩釋 多數人體感是「清醒但平穩」對咖啡因敏感者建議從半瓶開始"],
  ["什麼時候喝最有感？", "需要專注前 20–30 分鐘喝 效果約可持續 3–4 小時建議下午三點前飲用 避免影響睡眠"],
  ["孕婦、小孩可以喝嗎？", "孕哺期與 12 歲以下兒童不建議飲用含咖啡因飲品 請先詢問醫師"],
  ["怎麼配送？多久到貨？", "常溫配送 下單後 2–3 個工作天到貨；三盒組與訂閱方案免運"],
]

function BottleArt({ className = "" }) {
  return (
    <div className={`relative mx-auto h-64 w-36 overflow-hidden rounded-[2.6rem] shadow-2xl shadow-[#14503a]/40 md:h-80 md:w-44 ${className}`}>
      <img
        src="/demo-products/plant-energy-bottle.svg"
        alt="植感能量飲"
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 rounded-[2.6rem] ring-1 ring-inset ring-white/20" />
    </div>
  )
}

function ProductLandingPage() {
  const [planId, setPlanId] = useState("triple")
  const [ordered, setOrdered] = useState(false)
  const plan = plans.find((p) => p.id === planId)

  function selectPlan(id) {
    setPlanId(id)
    setOrdered(false)
  }

  function order() {
    setOrdered(true)
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <main className="min-h-screen bg-[#f7f6f1] pb-24 text-[#111c22]">
      <Seo
        page={{
          path: "/works/product-landing-page",
          title: "植感能量飲｜電商商品銷售頁 Demo｜Qingyu Web Studio",
          description: "完整商品 Landing Page 示範：商品 Hero、痛點、賣點、規格、見證、FAQ 與訂購方案適合保健品、食品、保養品與選物商品",
        }}
      />

      {/* 頂欄 */}
      <header className="sticky top-0 z-40 border-b border-[#e4e0d4] bg-[#f7f6f1]/92 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <p className="flex items-center gap-2 font-black">
            <span aria-hidden="true">🌿</span> 植感能量飲
          </p>
          <a href="#order" className="inline-flex min-h-9 items-center rounded-full px-4 text-sm font-black text-white" style={{ background: GREEN }}>
            立即訂購
          </a>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="border-b border-[#e4e0d4] bg-white">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div>
            <span className="rounded-full px-3 py-1 text-xs font-black text-white" style={{ background: GREEN }}>新上市 · 免運中</span>
            <h1 className="mt-5 font-['Noto_Serif_TC',serif] text-[clamp(2.2rem,6vw,3.8rem)] font-black leading-[1.12] tracking-tight">
              下午三點 
              <br />
              還有電
            </h1>
            <p className="mt-5 max-w-md text-base font-bold leading-8 text-[#52605c]">
              植物基能量飲綠茶咖啡因緩釋提神 4 小時 0 糖 0 香精——清醒 但不心悸
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#order" className="inline-flex min-h-12 items-center rounded-xl px-6 text-sm font-black text-white shadow-lg" style={{ background: GREEN }}>
                選購方案 NT$399 起
              </a>
              <a href="#points" className="inline-flex min-h-12 items-center rounded-xl border border-[#d4cfc0] bg-white px-6 text-sm font-black">
                為什麼不心悸？
              </a>
            </div>
            <p className="mt-4 text-xs font-bold text-[#8a938f]">SGS 檢驗 ・ 全素 ・ 台灣製造</p>
          </div>
          <BottleArt />
        </div>
      </section>

      {/* 2. 痛點 */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">提神這件事 你可能一直在將就</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {pains.map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-[#e4e0d4] bg-white p-5">
              <p className="text-base font-black">{title}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-[#66716d]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 三大賣點 */}
      <section id="points" className="scroll-mt-16 border-y border-[#14503a] bg-[#123f2e] text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">三個理由 換掉你的第二杯咖啡</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {sellingPoints.map(([title, text], i) => (
              <div key={title} className="rounded-2xl border border-white/12 bg-white/[0.06] p-5">
                <span className="font-mono text-sm font-black text-[#8fd6b0]">0{i + 1}</span>
                <p className="mt-2 text-lg font-black">{title}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-white/72">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 特色 / 規格 */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">成分乾淨到可以唸完</h2>
            <p className="mt-3 max-w-sm text-sm font-bold leading-7 text-[#52605c]">
              冷萃綠茶、薄荷、檸檬馬鞭草、羅漢果、L-茶胺酸、氣泡水就這樣 沒有了
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#e4e0d4] bg-white">
            {specs.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[6rem_1fr] gap-3 px-5 py-3 ${i > 0 ? "border-t border-[#efece2]" : ""}`}>
                <span className="text-sm font-black text-[#8a938f]">{k}</span>
                <span className="text-sm font-black">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 使用情境 */}
      <section className="border-y border-[#e4e0d4] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">什麼時候喝</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {scenes.map(([emoji, title, text]) => (
              <div key={title} className="rounded-2xl border border-[#e4e0d4] bg-[#f7f6f1] p-4">
                <span className="text-2xl" aria-hidden="true">{emoji}</span>
                <p className="mt-2 text-sm font-black">{title}</p>
                <p className="mt-1 text-xs font-bold leading-5 text-[#66716d]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 見證 */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">喝過的人怎麼說</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {reviews.map(([name, role, text]) => (
            <figure key={name} className="rounded-2xl border border-[#e4e0d4] bg-white p-5">
              <p className="text-sm text-[#d9a441]" aria-label="五顆星">★★★★★</p>
              <blockquote className="mt-3 text-sm font-bold leading-7 text-[#3d4c48]">「{text}」</blockquote>
              <figcaption className="mt-3 text-xs font-black text-[#8a938f]">{name}・{role}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 7. 訂購方案 */}
      <section id="order" className="scroll-mt-20 border-y border-[#e4e0d4] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">選一個方案</h2>
          <p className="mt-2 text-sm font-bold text-[#66716d]">點選方案 下方按「立即訂購」就完成</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {plans.map((p) => {
              const active = p.id === planId
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectPlan(p.id)}
                  className={`relative rounded-2xl border-2 p-5 text-left transition ${
                    active ? "border-[#1e6e4e] bg-[#eef7f1] shadow-lg shadow-[#1e6e4e]/10" : "border-[#e4e0d4] bg-[#f7f6f1] hover:border-[#1e6e4e]/50"
                  }`}
                >
                  {p.hot ? (
                    <span className="absolute -top-3 left-5 rounded-full px-3 py-1 text-[11px] font-black text-white" style={{ background: GREEN }}>
                      最多人選
                    </span>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black">{p.name}</p>
                    <span className={`grid h-5 w-5 place-items-center rounded-full border-2 text-[10px] font-black ${active ? "border-[#1e6e4e] bg-[#1e6e4e] text-white" : "border-[#c9c4b5]"}`}>
                      {active ? "✓" : ""}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#8a938f]">{p.spec}</p>
                  <p className="mt-3 text-3xl font-black" style={{ color: GREEN }}>
                    NT${p.price.toLocaleString()}
                    {p.suffix ? <span className="text-base">{p.suffix}</span> : null}
                  </p>
                  <p className="mt-2 text-xs font-bold text-[#66716d]">{p.note}</p>
                </button>
              )
            })}
          </div>

          {ordered ? (
            <div className="mt-5 rounded-2xl border border-[#1e6e4e]/30 bg-[#eef7f1] p-5 text-center">
              <p className="text-lg font-black" style={{ color: GREEN }}>✓ 已收到你的訂購（示範）</p>
              <p className="mt-1 text-sm font-bold text-[#52605c]">
                {plan.name}・NT${plan.price.toLocaleString()}{plan.suffix || ""}正式版會在這裡接金流與出貨通知
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h2 className="font-['Noto_Serif_TC',serif] text-2xl font-black md:text-3xl">常見問題</h2>
        <div className="mt-6 grid gap-2">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-[#e4e0d4] bg-white px-5 py-4">
              <summary className="flex items-center justify-between text-sm font-black">
                {q}
                <span className="text-[#8a938f] transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 9. 聯絡 CTA（品牌） */}
      <section className="border-t border-[#14503a] bg-[#123f2e] text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center md:py-16">
          <h2 className="font-['Noto_Serif_TC',serif] text-3xl font-black md:text-4xl">今天下午 試一瓶</h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-7 text-white/72">
            嘗鮮盒 NT$480 不合口味 7 天內免費退有問題加 LINE 直接問
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#order" className="inline-flex min-h-12 items-center rounded-xl bg-white px-7 text-sm font-black" style={{ color: GREEN }}>
              立即訂購
            </a>
            <span className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-7 text-sm font-black text-white">
              LINE：@plantfuel（示範）
            </span>
          </div>
        </div>
      </section>

      {/* Studio 條 */}
      <div className="border-t border-[#e4e0d4] bg-[#f7f6f1]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-bold text-[#66716d]">
            這一頁是<span className="font-black text-[#111c22]">銷售頁示範</span>（虛構商品）想幫你的商品做一頁？
            <span className="font-black text-[#0d6b62]"> 12,000 元起・5–10 天</span>
          </p>
          <div className="flex gap-2">
            <Link to="/contact" className="inline-flex min-h-10 items-center rounded-lg bg-[#111c22] px-4 text-sm font-black text-white">
              詢問報價
            </Link>
            <Link to="/" className="inline-flex min-h-10 items-center rounded-lg border border-[#d4cfc0] bg-white px-4 text-sm font-black">
              回首頁
            </Link>
          </div>
        </div>
      </div>

      {/* 手機置底訂購列 */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e4e0d4] bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black text-[#8a938f]">{plan.name}・{plan.spec}</p>
            <p className="text-lg font-black" style={{ color: GREEN }}>NT${plan.price.toLocaleString()}{plan.suffix || ""}</p>
          </div>
          <button type="button" onClick={order} className="inline-flex min-h-11 items-center rounded-xl px-6 text-sm font-black text-white" style={{ background: GREEN }}>
            {ordered ? "✓ 已訂購" : "立即訂購"}
          </button>
        </div>
      </div>
    </main>
  )
}

export default ProductLandingPage
