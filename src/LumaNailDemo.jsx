import { Link } from "react-router-dom"

const services = [
  {
    title: "凝膠單色",
    price: "NT$899 起",
    desc: "適合喜歡乾淨、簡約風格的客人，可依膚色與日常穿搭推薦色系。",
  },
  {
    title: "設計款美甲",
    price: "NT$1,280 起",
    desc: "可依照參考圖、季節、婚禮、拍照或日常需求客製設計。",
  },
  {
    title: "手足保養",
    price: "NT$680 起",
    desc: "基礎修型、甘皮整理與保濕護理，適合定期保養與改善手足狀態。",
  },
  {
    title: "卸甲與修護",
    price: "NT$300 起",
    desc: "溫和卸除舊甲，協助檢查甲面狀態並提供後續修護建議。",
  },
]

const gallery = [
  {
    title: "Soft Nude",
    desc: "裸粉、奶茶、低飽和色系，適合上班與日常。",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Pearl Detail",
    desc: "珍珠、貝殼、細閃元素，適合婚禮與約會。",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Clean French",
    desc: "乾淨法式與自然延伸感，適合喜歡精緻但不浮誇的客人。",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=900&q=85",
  },
]

const reasons = [
  {
    title: "預約資訊集中",
    desc: "把服務項目、價格、預約流程、地址與社群連結整理在同一頁。",
  },
  {
    title: "手機版好閱讀",
    desc: "客人多半從 IG 或 LINE 點進網站，因此手機版排版是主要設計重點。",
  },
  {
    title: "風格能客製",
    desc: "可依店家風格調整成溫柔、韓系、極簡、高級感或活潑可愛風格。",
  },
]

const steps = [
  {
    title: "選擇服務",
    desc: "先確認想做單色、設計款、手足保養或卸甲修護。",
  },
  {
    title: "傳送參考",
    desc: "可先提供喜歡的款式、顏色、場合與預算範圍。",
  },
  {
    title: "確認時間",
    desc: "透過 LINE 或 IG 確認可預約時段與注意事項。",
  },
  {
    title: "到店施作",
    desc: "依照現場甲況與需求微調設計，完成後提供保養提醒。",
  },
]

const faqs = [
  {
    q: "第一次預約需要準備什麼？",
    a: "可以先傳喜歡的款式、顏色或參考圖，也可以只說明想要的感覺，由設計師協助推薦。",
  },
  {
    q: "設計款價格怎麼計算？",
    a: "會依照複雜度、素材、延甲與特殊裝飾調整，預約前可先大致估價。",
  },
  {
    q: "需要提前多久預約？",
    a: "建議提前 3–7 天預約，假日與熱門時段建議更早確認。",
  },
]

const casePoints = [
  "適合放在 IG 個人檔案、LINE 官方帳號、Google 商家連結中",
  "讓客人不用翻貼文，也能快速看到價格、服務、風格與預約方式",
  "可延伸為美睫、美容、霧眉、攝影、健身教練與個人工作室網站",
]

function LumaNailDemo() {
  return (
    <main className="min-h-screen bg-[#fbf5f1] text-[#2f2723]">
      <div className="mx-auto max-w-7xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex rounded-full border border-[#d7c7be] bg-white/70 px-5 py-2 text-sm font-medium text-[#5f4b42] shadow-sm hover:border-[#2f2723]"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 md:grid-cols-[1fr_0.95fr] md:items-center md:pb-28 md:pt-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-[#e6d6ce] bg-white/70 px-4 py-2 text-sm font-medium text-[#8a6758] shadow-sm">
            Concept Case｜Beauty Studio Website
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight text-[#2f2723] md:text-7xl">
            Luma Nail Studio
            <span className="block text-[#b58a79]">溫柔、乾淨、有預約感的美甲工作室網站。</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-[#6f5a51]">
            這是一個為美甲 / 美容 / 個人工作室設計的一頁式網站案例。
            重點是把服務項目、價格、作品風格、預約流程與聯絡方式整理清楚，
            讓客人從 IG 點進來後，可以快速理解並完成預約。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="rounded-full bg-[#2f2723] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a3a34]"
            >
              查看預約流程
            </a>
            <a
              href="#services"
              className="rounded-full border border-[#d8c5bb] bg-white/70 px-6 py-3 text-sm font-semibold text-[#2f2723] transition hover:border-[#2f2723]"
            >
              查看服務價格
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <MiniStat value="1 Page" label="一頁式網站" />
            <MiniStat value="RWD" label="手機版友善" />
            <MiniStat value="CTA" label="預約導向" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#ffd8c7] blur-3xl" />
          <div className="absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-[#ead7ff] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2f2723] p-4 shadow-2xl shadow-[#d8b9a9]/40">
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85"
              alt="Luma Nail Studio 美甲形象照"
              className="h-[520px] w-full rounded-[2rem] object-cover"
            />

            <div className="absolute bottom-8 left-8 right-8 rounded-[2rem] bg-white/88 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-medium text-[#9a7667]">本月主打</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-[#2f2723]">
                    Soft Nude Design
                  </p>
                  <p className="mt-1 text-sm text-[#7a6258]">
                    適合日常、上班、約會與拍照
                  </p>
                </div>
                <p className="text-xl font-semibold text-[#2f2723]">
                  NT$1,280 起
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-[#eadbd4] bg-white/75 p-7 shadow-sm"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-[#6f5a51]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="Services"
          title="服務項目與價格"
          desc="這類網站可以讓客人在預約前先了解服務內容與大致價格，減少私訊來回詢問。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-[#eadbd4] bg-white/80 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-5">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="shrink-0 rounded-full bg-[#f4e6df] px-4 py-2 text-sm font-semibold text-[#8a6758]">
                  {item.price}
                </p>
              </div>
              <p className="mt-4 leading-8 text-[#6f5a51]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#b58a79]">
              Gallery
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              用作品照片建立第一眼信任感。
            </h2>
            <p className="mt-6 leading-8 text-[#6f5a51]">
              美甲、美睫、美容這類預約制服務，客人很重視風格是否符合自己。
              因此網站需要清楚展示作品類型、價格區間、預約流程與聯絡方式。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {gallery.map((item, index) => (
              <div
                key={item.title}
                className={`overflow-hidden rounded-[2rem] bg-white shadow-sm ${
                  index === 1 ? "md:translate-y-8" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6f5a51]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.5rem] bg-[#2f2723] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#e8c7ba]">
                Booking Flow
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                預約流程清楚，客人才會放心私訊。
              </h2>
              <p className="mt-6 leading-8 text-white/65">
                對預約制工作室來說，網站不只是展示漂亮作品，也要讓客人知道如何預約、
                需要準備什麼、價格怎麼算、到店前有哪些注意事項。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {steps.map((item, index) => (
                <div key={item.title} className="rounded-[2rem] bg-white/10 p-6">
                  <p className="text-sm text-[#e8c7ba]">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#b58a79]">
                Case Study
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                這個網站解決什麼問題？
              </h2>
              <p className="mt-6 leading-8 text-[#6f5a51]">
                很多個人工作室只靠 IG 經營，客人需要自己翻貼文找價格、地址、
                作品、預約方式與注意事項。這類網站會把常用資訊集中整理，
                成為社群之外更正式的服務入口。
              </p>
            </div>

            <div className="grid gap-3">
              {casePoints.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#fbf5f1] p-5 leading-7 text-[#5f4b42]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionTitle
          eyebrow="FAQ"
          title="常見問題"
          desc="FAQ 可以減少重複私訊，也能讓客人在預約前先了解基本規則。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[2rem] border border-[#eadbd4] bg-white/80 p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{item.q}</h3>
              <p className="mt-4 leading-8 text-[#6f5a51]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 pb-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#b58a79] p-8 text-white md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">
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
                className="rounded-3xl bg-white p-5 text-[#2f2723] transition hover:bg-[#fff7f3]"
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
                className="rounded-3xl bg-[#2f2723] p-5 transition hover:bg-[#4a3a34]"
              >
                <p className="text-sm text-white/50">Portfolio</p>
                <p className="mt-2 font-semibold">回到接案首頁 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#b58a79]">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="max-w-md leading-8 text-[#6f5a51]">{desc}</p>
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