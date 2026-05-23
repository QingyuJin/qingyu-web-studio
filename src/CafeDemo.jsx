import { Link } from "react-router-dom"

const menuItems = [
  {
    name: "晨霧拿鐵",
    price: "NT$130",
    desc: "使用中深焙濃縮與鮮奶，口感溫和順口，適合第一次來店的客人。",
  },
  {
    name: "單品手沖",
    price: "NT$180",
    desc: "依每日豆單提供不同產區選擇，風味以乾淨、明亮、層次感為主。",
  },
  {
    name: "黑糖肉桂拿鐵",
    price: "NT$150",
    desc: "黑糖香氣搭配肉桂尾韻，適合喜歡甜感與香氣層次的客人。",
  },
  {
    name: "焦糖布丁",
    price: "NT$95",
    desc: "每日限量手作，口感綿密，搭配微苦焦糖醬。",
  },
  {
    name: "檸檬磅蛋糕",
    price: "NT$110",
    desc: "帶有清爽檸檬香氣，適合搭配手沖或美式咖啡。",
  },
  {
    name: "季節甜點",
    price: "NT$120 起",
    desc: "依季節水果與當日備料製作，每週不定期更換。",
  },
]

const features = [
  {
    title: "安靜座位",
    desc: "適合閱讀、工作、簡單會議與午後休息。",
  },
  {
    title: "手沖咖啡",
    desc: "每日提供不同產區豆單，風味乾淨清楚。",
  },
  {
    title: "手作甜點",
    desc: "店內每日少量製作，適合搭配咖啡享用。",
  },
]

const faqs = [
  {
    q: "可以訂位嗎？",
    a: "平日可透過 LINE 預約座位，假日依現場狀況安排。",
  },
  {
    q: "可以帶筆電工作嗎？",
    a: "可以，店內提供部分插座座位，尖峰時段建議提前詢問。",
  },
  {
    q: "甜點每天都有一樣嗎？",
    a: "甜點會依當日備料與季節調整，實際品項可參考 IG 限動。",
  },
]

function CafeDemo() {
  return (
    <main className="min-h-screen bg-[#f6efe4] text-stone-950">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-full border border-stone-300 bg-white/60 px-5 py-2 text-sm font-medium text-stone-700 shadow-sm hover:border-stone-950"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-amber-900">
            Wuchiu Coffee
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            巷弄裡的一杯咖啡，留給慢下來的人。
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-stone-650">
            霧丘咖啡是一間位於台南巷弄中的小型咖啡店，提供手沖咖啡、
            義式飲品與每日手作甜點。網站設計重點放在品牌印象、菜單資訊、
            營業時間與預約動線，讓顧客能快速了解並聯絡店家。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              查看菜單
            </a>
            <a
              href="#visit"
              className="rounded-full border border-stone-400 bg-white/40 px-6 py-3 text-sm font-medium transition hover:border-stone-950"
            >
              查看營業資訊
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 text-sm">
            <InfoMini number="10:00" label="開始營業" />
            <InfoMini number="6+" label="人氣品項" />
            <InfoMini number="RWD" label="手機版支援" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-amber-200/70 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-orange-200/60 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.2rem] bg-stone-900 p-3 shadow-2xl shadow-stone-400/30">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85"
              alt="霧丘咖啡店形象照"
              className="h-[520px] w-full rounded-[1.8rem] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/85 p-5 shadow-lg backdrop-blur">
              <p className="text-sm font-medium text-stone-500">今日推薦</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold">晨霧拿鐵</p>
                  <p className="mt-1 text-sm text-stone-600">
                    溫和奶香與中深焙尾韻
                  </p>
                </div>
                <p className="text-xl font-semibold">NT$130</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-stone-200 bg-white/75 p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-900">
              About
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              讓顧客在進店前，就先感受到品牌氛圍。
            </h2>
            <p className="mt-6 leading-9 text-stone-600">
              這個一頁式網站適合小型餐飲店、甜點店、早午餐店或個人工作室。
              頁面會把品牌介紹、服務內容、商品資訊、店內環境與聯絡方式整理在同一頁，
              讓顧客不需要滑很多社群貼文，也能快速找到想知道的資訊。
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
              alt="咖啡店內部座位"
              className="h-72 w-full rounded-[2rem] object-cover shadow-sm"
            />
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85"
              alt="咖啡沖煮過程"
              className="h-72 w-full rounded-[2rem] object-cover shadow-sm sm:mt-10"
            />
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-900">
              Menu
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              人氣品項
            </h2>
          </div>
          <p className="max-w-md leading-8 text-stone-600">
            菜單區塊可以依客戶需求放價格、品項說明、分類與季節限定內容。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] border border-stone-200 bg-white/80 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                <p className="shrink-0 font-semibold text-amber-900">{item.price}</p>
              </div>
              <p className="mt-4 leading-8 text-stone-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-stone-950 p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-400">
                Website Goal
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                這個網站解決什麼問題？
              </h2>
              <p className="mt-6 leading-8 text-stone-300">
                很多小店只使用社群平台，顧客需要自己翻貼文找菜單、價格、
                營業時間與地址。這類一頁式網站可以把常用資訊集中整理，
                讓顧客快速完成「了解 → 查看菜單 → 找到地點 → 聯絡預約」。
              </p>
            </div>

            <div className="grid gap-4">
              <Goal text="清楚呈現品牌與店內氛圍" />
              <Goal text="整理菜單、價格與人氣品項" />
              <Goal text="放置營業時間、地址與 Google Map" />
              <Goal text="整合 LINE / IG / 預約按鈕" />
              <Goal text="支援手機版瀏覽，適合社群導流" />
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-900">
              Visit
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight">
              營業資訊
            </h2>

            <div className="mt-8 space-y-4">
              <VisitInfo label="地址" value="台南市中西區霧丘街 18 號" />
              <VisitInfo label="營業時間" value="週一至週日 10:00–19:00" />
              <VisitInfo label="預約方式" value="LINE：@wuchiucoffee" />
              <VisitInfo label="適合需求" value="閱讀、工作、朋友聚會、午後甜點" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
              >
                查看 Google Map
              </a>
              <a
                href="#"
                className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium hover:border-stone-950"
              >
                LINE 預約
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-stone-200 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85"
              alt="咖啡店外觀與座位"
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-900">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            常見問題
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[2rem] border border-stone-200 bg-white/80 p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{item.q}</h3>
              <p className="mt-4 leading-8 text-stone-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] bg-amber-900 p-8 text-white md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">
            Call To Action
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            想讓小店有一個清楚正式的介紹頁？
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-amber-50/90">
            這類網站適合放在 Instagram 個人檔案、LINE 官方帳號、自 Google 商家頁面導流，
            讓顧客可以快速了解服務、價格、地點與預約方式。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-950 hover:bg-amber-50"
            >
              回到接案首頁
            </Link>
            <a
              href="mailto:a0988874324@gmail.com"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              聯絡製作網站
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoMini({ number, label }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white/70 p-4 shadow-sm">
      <p className="font-semibold">{number}</p>
      <p className="mt-1 text-xs text-stone-500">{label}</p>
    </div>
  )
}

function Goal({ text }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 text-stone-200">
      {text}
    </div>
  )
}

function VisitInfo({ label, value }) {
  return (
    <div className="rounded-2xl bg-stone-100 p-5">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 font-medium">{value}</p>
    </div>
  )
}

export default CafeDemo