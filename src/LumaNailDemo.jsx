import { useState } from "react"
import { Link } from "react-router-dom"

const services = [
  {
    name: "Basic Gel",
    zh: "基礎凝膠單色",
    price: "NT$899 起",
    time: "90 min",
    note: "適合日常、上班、簡約乾淨風格。可依膚色與穿搭推薦色系。",
  },
  {
    name: "Design Gel",
    zh: "設計款美甲",
    price: "NT$1,280 起",
    time: "120–150 min",
    note: "可依參考圖、季節、婚禮、拍照或約會需求客製設計。",
  },
  {
    name: "Care Treatment",
    zh: "手足基礎保養",
    price: "NT$680 起",
    time: "60 min",
    note: "修型、甘皮整理、保濕護理，適合定期維持手足狀態。",
  },
  {
    name: "Removal & Repair",
    zh: "卸甲與甲面修護",
    price: "NT$300 起",
    time: "30–45 min",
    note: "溫和卸除舊甲，檢查甲面狀態並提供後續修護建議。",
  },
]

const signatureStyles = [
  {
    name: "Everyday Nude",
    zh: "日常裸色設計",
    price: "NT$1,280 起",
    time: "120 min",
    bestFor: "上班、日常、第一次做美甲",
    desc: "低飽和奶茶、裸粉與柔霧色系，乾淨耐看，不會太浮誇。",
  },
  {
    name: "Clean French",
    zh: "乾淨法式款",
    price: "NT$1,480 起",
    time: "120–150 min",
    bestFor: "約會、婚禮、拍照、正式場合",
    desc: "自然延伸感、乾淨線條與微細節，適合喜歡精緻感的客人。",
  },
  {
    name: "Pearl Bridal",
    zh: "珍珠婚禮款",
    price: "NT$1,680 起",
    time: "150 min",
    bestFor: "婚紗、生日、重要紀念日",
    desc: "加入珍珠、貝殼、細閃與局部裝飾，適合重要場合與拍照。",
  },
]

const addOns = [
  ["卸甲", "+ NT$300 起"],
  ["延甲", "+ NT$800 起"],
  ["單指補強", "+ NT$80 / 指"],
  ["特殊素材", "+ NT$100 起"],
  ["手繪設計", "依複雜度估價"],
  ["足部凝膠", "另行估價"],
]

const works = [
  {
    no: "01",
    title: "Soft Nude",
    subtitle: "裸粉、奶茶、低飽和",
    desc: "適合上班、日常、約會與第一次嘗試美甲的客人。",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1100&q=85",
  },
  {
    no: "02",
    title: "Pearl Detail",
    subtitle: "珍珠、貝殼、細閃",
    desc: "適合婚禮、拍照、生日與想要精緻細節的客人。",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1100&q=85",
  },
  {
    no: "03",
    title: "Clean French",
    subtitle: "乾淨法式、自然延伸",
    desc: "適合喜歡乾淨、俐落、不浮誇風格的客人。",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1100&q=85",
  },
]

const prepList = [
  "想做的款式參考圖 1–3 張",
  "是否需要卸甲或延甲",
  "希望預約的日期與時段",
  "偏好的色系、風格與預算範圍",
]

const bookingSteps = [
  {
    step: "01",
    title: "傳送款式與需求",
    desc: "先透過 LINE / IG 傳喜歡的款式、預算、日期與是否需要卸甲。",
  },
  {
    step: "02",
    title: "初步估價與確認時段",
    desc: "依款式複雜度、素材與甲況評估時間及價格區間。",
  },
  {
    step: "03",
    title: "到店溝通與施作",
    desc: "現場依膚色、甲型與實際甲況微調色系與細節。",
  },
  {
    step: "04",
    title: "完成後保養提醒",
    desc: "提供居家保養方式、維持時間與下次回訪建議。",
  },
]

const studioDetails = [
  ["Location", "台中市西區，近勤美商圈"],
  ["Open", "Tue–Sun 11:00–20:00"],
  ["Booking", "LINE / Instagram 預約制"],
  ["Payment", "現金 / 轉帳"],
]

const policies = [
  "設計款請提前傳參考圖，方便估價與安排施作時間。",
  "若需卸甲、延甲、特殊素材，請預約時先告知。",
  "遲到可能影響施作內容，超過 15 分鐘請先私訊確認。",
  "臨時取消或改期，建議提前一天聯繫。",
]

const reviews = [
  {
    name: "Yun",
    text: "網站上先看到價格、風格和注意事項，第一次預約也不會不知道怎麼問。",
  },
  {
    name: "Mina",
    text: "作品分類很清楚，我直接截圖喜歡的款式傳給設計師，溝通快很多。",
  },
  {
    name: "Claire",
    text: "地址、預約方式、取消規則都放在同一頁，不用一直翻 IG 貼文。",
  },
]

const faqs = [
  {
    q: "第一次做美甲需要先想好款式嗎？",
    a: "不用完全想好，可以先提供喜歡的照片或說明想要的感覺，現場會依膚色、甲型與預算協助調整。",
  },
  {
    q: "設計款為什麼價格會浮動？",
    a: "設計款會依照複雜度、手繪、素材、延甲與特殊裝飾調整，預約前可以先提供圖片估價。",
  },
  {
    q: "凝膠大概可以維持多久？",
    a: "依個人指甲生長速度與生活習慣不同，通常約 3–5 週，實際狀況會因人而異。",
  },
]

const conversionItems = [
  {
    title: "LINE 預約",
    desc: "讓客人點擊後直接進入最主要的預約入口。",
  },
  {
    title: "IG 作品集",
    desc: "把網站訪客導回社群，讓客人查看更多近期作品。",
  },
  {
    title: "Google Map",
    desc: "讓客人快速確認位置、交通與附近地標。",
  },
  {
    title: "Email / 合作",
    desc: "適合品牌合作、攝影合作或其他非預約需求。",
  },
]

const caseNotes = [
  "把 IG 上分散的價格、作品、預約流程、地址與注意事項集中整理。",
  "讓新客人不用反覆私訊詢問基本問題，可以直接理解服務並預約。",
  "同樣架構可延伸為美睫、美容、霧眉、攝影、健身教練與個人工作室網站。",
]

const bookingMessage = `你好，我想預約 Luma Nail Studio 的美甲服務。

想做的項目：設計款美甲
想做的風格：裸色 / 法式 / 珍珠細節
是否需要卸甲：需要
希望日期與時段：6/10 下午或 6/12 晚上
預算範圍：約 NT$1,500 左右
目前甲況：原本有凝膠，想重新設計

我可以再傳參考圖給你，謝謝。`

function LumaNailDemo() {
  return (
    <main className="min-h-screen bg-[#fbf7f2] text-[#2d2723]">
      <header className="sticky top-0 z-50 border-b border-[#eaded6] bg-[#fbf7f2]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            ← Qingyu Web Studio
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-[#7c6258] md:flex">
            <a href="#menu" className="hover:text-[#2d2723]">
              Service
            </a>
            <a href="#signature" className="hover:text-[#2d2723]">
              Styles
            </a>
            <a href="#works" className="hover:text-[#2d2723]">
              Works
            </a>
            <a href="#booking" className="hover:text-[#2d2723]">
              Booking
            </a>
            <a
              href="#contact"
              className="rounded-full bg-[#2d2723] px-4 py-2 text-white hover:bg-[#493b35]"
            >
              預約諮詢
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 md:grid-cols-[0.95fr_1.05fr] md:items-center md:pb-28 md:pt-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#b58a79]">
            Luma Nail Studio
          </p>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            溫柔裸色、乾淨法式與日常設計款。
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-[#6d574f]">
            Luma Nail Studio 是一間預約制美甲工作室，專注於乾淨、耐看、
            適合日常生活的凝膠設計。網站將作品風格、服務價格、預約流程與注意事項整理在同一頁，
            讓客人在私訊前就能先了解基本資訊。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#works"
              className="rounded-full bg-[#2d2723] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#493b35]"
            >
              查看作品風格
            </a>
            <a
              href="#menu"
              className="rounded-full border border-[#d8c5bb] bg-white/70 px-6 py-3 text-sm font-semibold transition hover:border-[#2d2723]"
            >
              查看服務價格
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <MiniStat value="預約制" label="LINE / IG" />
            <MiniStat value="3–5 週" label="維持時間" />
            <MiniStat value="RWD" label="手機版友善" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 -top-8 h-44 w-44 rounded-full bg-[#f4c7b8] opacity-60 blur-3xl" />
          <div className="absolute -bottom-10 -right-8 h-52 w-52 rounded-full bg-[#ead7ff] opacity-70 blur-3xl" />

          <div className="relative grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
            <div className="order-2 flex flex-col justify-between rounded-[2rem] border border-[#eadbd4] bg-white/70 p-6 shadow-sm md:order-1">
              <div>
                <p className="text-sm font-medium text-[#b58a79]">Studio Note</p>
                <p className="mt-4 text-2xl font-semibold leading-tight">
                  不追求誇張款式，而是做出能陪你生活的指尖細節。
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {studioDetails.map(([label, value]) => (
                  <div key={label} className="border-t border-[#eadbd4] pt-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#b58a79]">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-[2.4rem] bg-[#2d2723] p-3 shadow-2xl shadow-[#d8b9a9]/40 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85"
                alt="Luma Nail Studio 美甲作品"
                className="h-[560px] w-full rounded-[2rem] object-cover"
              />

              <div className="relative -mt-36 mb-5 ml-5 mr-5 rounded-[1.6rem] bg-white/88 p-5 shadow-xl backdrop-blur">
                <p className="text-sm font-medium text-[#b58a79]">Monthly Pick</p>
                <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-2xl font-semibold">Soft Nude Design</p>
                    <p className="mt-1 text-sm text-[#7c6258]">
                      日常裸粉・奶茶色・微閃細節
                    </p>
                  </div>
                  <p className="text-xl font-semibold">NT$1,280 起</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              Service Menu
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              讓價格、時間與服務內容在預約前就清楚。
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#6d574f]">
            預約制工作室最常被詢問的是價格、時間、是否需要卸甲、設計款怎麼估價。
            把這些資訊整理出來，可以減少重複私訊，也讓新客戶更安心。
          </p>
        </div>

        <div className="divide-y divide-[#eadbd4] overflow-hidden rounded-[2.4rem] border border-[#eadbd4] bg-white/75 shadow-sm">
          {services.map((item) => (
            <div
              key={item.name}
              className="grid gap-4 p-6 md:grid-cols-[1fr_1.2fr_180px] md:items-center md:p-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b58a79]">
                  {item.name}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{item.zh}</h3>
              </div>

              <p className="leading-8 text-[#6d574f]">{item.note}</p>

              <div className="md:text-right">
                <p className="text-xl font-semibold">{item.price}</p>
                <p className="mt-1 text-sm text-[#9b7869]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="signature" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              Signature Styles
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              把熱門款式做成清楚的方案展示。
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#6d574f]">
            美甲工作室不一定需要購物車，但需要讓客人快速理解「我適合哪一種款式」。
            這類方案展示可以讓服務更像產品，提升預約前的理解度。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {signatureStyles.map((item) => (
            <div
              key={item.name}
              className="group rounded-[2.4rem] border border-[#eadbd4] bg-white/80 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b58a79]">
                {item.name}
              </p>

              <h3 className="mt-4 text-3xl font-semibold">{item.zh}</h3>

              <div className="mt-6 flex items-end justify-between gap-4 border-y border-[#eadbd4] py-5">
                <div>
                  <p className="text-sm text-[#9b7869]">Price</p>
                  <p className="mt-1 text-xl font-semibold">{item.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#9b7869]">Time</p>
                  <p className="mt-1 font-semibold">{item.time}</p>
                </div>
              </div>

              <p className="mt-5 rounded-2xl bg-[#fbf5f1] p-4 text-sm leading-7 text-[#6d574f]">
                適合：{item.bestFor}
              </p>

              <p className="mt-5 leading-8 text-[#6d574f]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              Style Lookbook
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              不只是放照片，而是讓客人快速找到喜歡的風格。
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#6d574f]">
            美甲、美睫、美容這類服務，客人通常先看作品風格再決定是否預約。
            因此作品區需要有分類、說明與可截圖溝通的資訊。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12">
          {works.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-[2.4rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                index === 0 ? "md:col-span-5" : "md:col-span-7"
              } ${index === 2 ? "md:col-span-12" : ""}`}
            >
              <div
                className={`grid gap-0 ${
                  index === 2 ? "md:grid-cols-[1.1fr_0.9fr]" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover ${
                    index === 2 ? "h-[360px] md:h-[460px]" : "h-[420px]"
                  }`}
                />

                <div className="p-7">
                  <p className="text-sm font-semibold text-[#b58a79]">
                    No. {item.no}
                  </p>
                  <h3 className="mt-4 text-3xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-[#9b7869]">
                    {item.subtitle}
                  </p>
                  <p className="mt-5 leading-8 text-[#6d574f]">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.4rem] bg-[#2d2723] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#e9c7ba]">
                Add-ons
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                加購項目先列清楚，預約估價更有效率。
              </h2>
              <p className="mt-6 leading-8 text-white/65">
                這種資訊很像真實工作室會需要的內容。它能減少客人一直私訊問：
                「卸甲多少？延甲多少？手繪怎麼算？」
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {addOns.map(([name, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-5"
                >
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-[#e9c7ba]">{price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-[2.4rem] bg-[#2d2723] p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#e9c7ba]">
              Before Booking
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              預約前請先準備這些資訊。
            </h2>
            <p className="mt-6 leading-8 text-white/65">
              這類清單能幫工作室減少來回詢問，也能讓客人更快得到估價。
            </p>

            <div className="mt-8 space-y-3">
              {prepList.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 leading-7 text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-[#eadbd4] bg-white/75 p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              Booking Flow
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              預約流程清楚，客人才會放心私訊。
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {bookingSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-[1.6rem] bg-[#fbf5f1] p-5"
                >
                  <p className="text-sm font-semibold text-[#b58a79]">
                    {item.step}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6d574f]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReservationMessageSection />

      <ConversionSection />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.4rem] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
                Studio Policy
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                把規則說清楚，能減少後續溝通成本。
              </h2>
            </div>

            <div className="grid gap-3">
              {policies.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#fbf5f1] p-5 leading-7 text-[#6d574f]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              Reviews
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              讓新客戶有更多安心感。
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#6d574f]">
            評價、作品照、價格與注意事項，都是預約制工作室建立信任感的重要內容。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] border border-[#eadbd4] bg-white/75 p-7 shadow-sm"
            >
              <p className="text-5xl leading-none text-[#b58a79]">“</p>
              <p className="mt-4 leading-8 text-[#6d574f]">{item.text}</p>
              <p className="mt-6 font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.4rem] bg-[#2d2723] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#e9c7ba]">
                Website Case Note
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                這類網站真正解決什麼問題？
              </h2>
              <p className="mt-6 leading-8 text-white/65">
                這是概念案例，用來展示預約制工作室網站可以如何整理資訊。
                實際製作時可依店家風格、照片、價格與預約規則重新調整。
              </p>
            </div>

            <div className="grid gap-3">
              {caseNotes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-5 leading-7 text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              預約前常見問題
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#6d574f]">
            FAQ 可以減少重複私訊，也讓第一次預約的客人更容易理解流程。
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[2rem] border border-[#eadbd4] bg-white/75 p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{item.q}</h3>
              <p className="mt-4 leading-8 text-[#6d574f]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-20 pb-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#b58a79] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/65">
                Contact
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                想讓你的工作室有一個正式預約入口？
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/75">
                這個版型可延伸為美甲、美睫、美容、霧眉、攝影、健身教練、
                形象顧問與其他預約制個人品牌網站。
              </p>
            </div>

            <div className="grid gap-3">
              <a
                href="mailto:a0988874324@gmail.com"
                className="rounded-3xl bg-white p-5 text-[#2d2723] transition hover:bg-[#fff7f3]"
              >
                <p className="text-sm text-[#8a6758]">Email</p>
                <p className="mt-2 font-semibold">a0988874324@gmail.com</p>
              </a>

              <div className="rounded-3xl bg-white/15 p-5">
                <p className="text-sm text-white/60">LINE</p>
                <p className="mt-2 font-semibold">mulavuc</p>
              </div>

              <Link
                to="/"
                className="rounded-3xl bg-[#2d2723] p-5 transition hover:bg-[#493b35]"
              >
                <p className="text-sm text-white/50">Portfolio</p>
                <p className="mt-2 font-semibold">回到接案首頁 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <a
          href="#contact"
          className="flex items-center justify-center rounded-full bg-[#2d2723] px-6 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#b58a79]/30"
        >
          預約 / 討論網站需求
        </a>
      </div>
    </main>
  )
}

function ReservationMessageSection() {
  const [copied, setCopied] = useState(false)

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(bookingMessage)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2.4rem] border border-[#eadbd4] bg-white/75 p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
            Message Template
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            客人不知道怎麼問，就直接給他範例。
          </h2>
          <p className="mt-6 leading-8 text-[#6d574f]">
            預約制工作室常遇到的問題是：客人只傳「請問還有空嗎？」，
            但沒有款式、時間、預算、是否卸甲等資訊。把範例訊息放在網站上，
            可以讓客人一次提供比較完整的資訊。
          </p>

          <div className="mt-8 grid gap-3">
            <InfoLine label="減少來回詢問" value="讓客人一次提供基本資料" />
            <InfoLine label="提高估價效率" value="設計款、卸甲、時段更清楚" />
            <InfoLine label="提升預約轉換" value="客人知道下一步該怎麼做" />
          </div>
        </div>

        <div className="overflow-hidden rounded-[2.4rem] bg-[#2d2723] text-white shadow-xl">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
            <div>
              <p className="text-sm text-[#e9c7ba]">可複製預約訊息</p>
              <p className="mt-1 font-semibold">LINE / IG Booking Message</p>
            </div>

            <button
              type="button"
              onClick={copyMessage}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#2d2723] transition hover:bg-[#fff7f3]"
            >
              {copied ? "已複製" : "複製"}
            </button>
          </div>

          <pre className="whitespace-pre-wrap p-6 text-sm leading-8 text-white/75">
            {bookingMessage}
          </pre>
        </div>
      </div>
    </section>
  )
}

function ConversionSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="rounded-[2.4rem] bg-white p-8 shadow-sm md:p-12">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b58a79]">
              Conversion
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              網站的重點不是只被看到，而是讓客人完成下一步。
            </h2>
          </div>
          <p className="max-w-xl leading-8 text-[#6d574f]">
            對小型工作室來說，網站通常承接 IG、LINE、Google 商家或朋友轉發進來的流量。
            重要的是讓訪客快速找到作品、價格、位置和預約入口。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {conversionItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] bg-[#fbf5f1] p-6 transition hover:-translate-y-1"
            >
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#2d2723] text-sm font-semibold text-white">
                ↗
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#6d574f]">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-[#2d2723] p-6 text-white">
          <p className="text-sm font-semibold text-[#e9c7ba]">
            真實接案時可以進一步做
          </p>
          <p className="mt-3 leading-8 text-white/70">
            可依需求協助設定 LINE、IG、Email、Google Map、表單等主要按鈕，
            並提供基本點擊追蹤建議。這不是保證流量暴增，而是讓已經進來的訪客更容易完成詢問或預約。
          </p>
        </div>
      </div>
    </section>
  )
}

function InfoLine({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#fbf5f1] p-4">
      <p className="text-sm font-semibold text-[#b58a79]">{label}</p>
      <p className="mt-1 text-sm leading-6 text-[#6d574f]">{value}</p>
    </div>
  )
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-[#eadbd4] bg-white/70 p-4 shadow-sm">
      <p className="font-semibold">{value}</p>
      <p className="mt-1 text-xs text-[#8a6758]">{label}</p>
    </div>
  )
}

export default LumaNailDemo