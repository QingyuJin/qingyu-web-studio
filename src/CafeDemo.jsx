import { Link } from "react-router-dom"

const problems = [
  "菜單、營業時間、地點、社群貼文分散在不同地方。",
  "客人常問今天有沒有開、怎麼去、菜單在哪裡。",
  "小店需要一個比社群更穩定、方便分享的入口。",
  "手機訪客通常只想快速找到菜單、地點和營業資訊。",
]

const menu = [
  {
    name: "House Latte",
    price: "NT$120",
    desc: "柔和奶香與中焙咖啡。",
  },
  {
    name: "Amber Toast",
    price: "NT$160",
    desc: "蜂蜜奶油厚片與季節水果。",
  },
  {
    name: "Daily Dessert",
    price: "NT$140",
    desc: "每日手作甜點，依現場供應。",
  },
]

const sections = [
  {
    title: "品牌氛圍",
    desc: "用照片、色彩與一句定位讓訪客快速感受到店的個性。",
  },
  {
    title: "菜單精簡",
    desc: "先放主打品項與價格，完整菜單可再用連結或圖片補充。",
  },
  {
    title: "營業資訊",
    desc: "營業時間、地址、Google Map、社群連結要放在好找的位置。",
  },
  {
    title: "到店 CTA",
    desc: "小店網站最重要的是讓訪客知道今天能不能去、怎麼去、要看哪個社群。",
  },
]

const beforeAfter = [
  {
    before: "客人要從 IG 貼文找菜單，再去 Google Map 找地址。",
    after: "網站集中放菜單、營業時間、地圖、社群和主打品項。",
  },
  {
    before: "社群貼文有氛圍，但新客不一定找得到基本資訊。",
    after: "首頁先說品牌、主打、位置和營業狀態，降低查找成本。",
  },
  {
    before: "每次更新菜單都只發限動，過幾天就找不到。",
    after: "網站保留穩定資訊，社群負責即時活動與新品更新。",
  },
]

const faqs = [
  {
    q: "小店真的需要網站嗎？",
    a: "不一定每間都需要，但如果常被問菜單、地址、營業時間，網站可以當作穩定入口。",
  },
  {
    q: "網站會取代 IG 嗎？",
    a: "不會。IG 適合更新日常與新品，網站適合放固定資訊、菜單、地圖與聯絡方式。",
  },
  {
    q: "可以串 Google Map 嗎？",
    a: "可以。小店網站很適合把 Google Map、營業時間和社群連結放在明顯位置。",
  },
]

function CafeDemo() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#2a1d14] text-[#fff7ed]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#2a1d14]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            ← 回首頁
          </Link>

          <Link
            to="/brief"
            className="rounded-full bg-[#f5c16c] px-4 py-2 text-sm font-semibold text-[#2a1d14] transition hover:bg-[#ffd98f]"
          >
            整理需求
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 md:grid-cols-[1fr_0.9fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <p className="inline-flex rounded-full border border-[#f5c16c]/30 bg-[#f5c16c]/10 px-4 py-2 text-xs font-semibold text-[#f5c16c]">
            Concept Case Study / 小店形象網站
          </p>

          <h1 className="mt-6 max-w-4xl text-[3rem] font-semibold leading-[1.03] tracking-[-0.06em] sm:text-6xl md:text-7xl">
            Amber Cafe
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-white/65">
            咖啡小店概念案例——展示如何把品牌氛圍、菜單、營業時間、Google Map 與社群連結，整理成一頁手機好讀、客人直接能找到的網站。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-[#f5c16c] px-6 py-3 text-sm font-semibold text-[#2a1d14] transition hover:bg-[#ffd98f]"
            >
              看菜單區塊
            </a>
            <a
              href="#case"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              看案例分析
            </a>
          </div>
        </div>

        <div className="rounded-[2.6rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/30">
          <div className="flex min-h-[540px] flex-col justify-between rounded-[2rem] bg-gradient-to-br from-amber-200 via-orange-300 to-stone-900 p-7 text-[#2a1d14]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-black/45">
                Cafe / Local Shop
              </p>
              <div className="mt-6 inline-flex rounded-full bg-white/60 px-4 py-2 text-sm font-semibold">
                Small Shop Demo
              </div>
            </div>

            <div>
              <h2 className="text-5xl font-semibold leading-tight tracking-[-0.05em]">
                Coffee, menu, map — clear.
              </h2>
              <p className="mt-5 max-w-sm leading-7 text-black/65">
                菜單、營業時間、Google Map 與社群連結集中整理。
              </p>

              <div className="mt-6 rounded-3xl bg-white/70 p-5">
                <div className="flex justify-between font-semibold">
                  <span>House Latte</span>
                  <span>NT$120</span>
                </div>
                <div className="mt-3 flex justify-between font-semibold">
                  <span>Daily Dessert</span>
                  <span>NT$140</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro
        id="case"
        eyebrow="Case Background"
        title="小店不需要複雜網站，但需要一個比社群更穩定的入口。"
        desc="客人常問的那些問題——菜單在哪、幾點開、怎麼去——一個好的網站可以幫你回答完。"
      />

      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-4">
          {problems.map((item, index) => (
            <Card key={item}>
              <p className="text-sm font-semibold text-[#f5c16c]">0{index + 1}</p>
              <p className="mt-5 leading-8 text-white/65">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-5 py-16">
        <SectionHeader
          eyebrow="Menu"
          title="菜單放主打就夠，不用全部列完。"
          desc="手機使用者通常只想快速看到有什麼、多少錢，精簡反而更好點擊。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {menu.map((item) => (
            <div key={item.name} className="rounded-[2rem] bg-[#fff7ed] p-7 text-[#2a1d14]">
              <p className="text-sm font-semibold text-black/45">Signature</p>
              <h3 className="mt-4 text-3xl font-semibold">{item.name}</h3>
              <p className="mt-4 text-2xl font-semibold text-[#9a5b24]">{item.price}</p>
              <p className="mt-4 leading-7 text-black/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.8rem] bg-[#fff7ed] p-8 text-[#2a1d14] md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Structure
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                小店網站要短、溫暖、好查。
              </h2>
              <p className="mt-6 leading-8 text-black/60">
                不是取代社群，而是把固定資訊放穩，讓客人不用每次都問你。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6"
                >
                  <p className="text-sm font-semibold text-[#9a5b24]">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeforeAfter />
      <Faq />

      <section className="mx-auto max-w-7xl px-5 py-16 pb-28">
        <div className="rounded-[2.8rem] bg-[#f5c16c] p-8 text-[#2a1d14] md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                Next
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                你的小店，也可以有一個清楚的入口。
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-black/65">
                先整理菜單、照片、營業時間、地址和社群連結，再來規劃版面。不用準備完整，先把現有的東西傳給我看。
              </p>
            </div>

            <div className="grid gap-3">
              <Link
                to="/brief"
                className="rounded-3xl bg-[#2a1d14] p-5 text-white transition hover:bg-black"
              >
                <p className="text-sm text-white/50">Website Brief</p>
                <p className="mt-2 font-semibold">填需求整理器 →</p>
              </Link>

              <Link
                to="/"
                className="rounded-3xl bg-white/60 p-5 text-[#2a1d14] transition hover:bg-white"
              >
                <p className="text-sm text-black/45">Back Home</p>
                <p className="mt-2 font-semibold">回作品集首頁 →</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function BeforeAfter() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeader
        eyebrow="Before / After"
        title="把社群上的固定資訊整理成穩定入口。"
        desc="社群適合更新日常，網站適合放固定資訊。"
      />

      <div className="grid gap-5">
        {beforeAfter.map((item, index) => (
          <div
            key={item.before}
            className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 md:grid-cols-2"
          >
            <div className="rounded-[1.5rem] bg-white/[0.06] p-5">
              <p className="text-sm font-semibold text-white/45">
                Before 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-white/65">{item.before}</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#fff7ed] p-5 text-[#2a1d14]">
              <p className="text-sm font-semibold text-black/45">
                After 0{index + 1}
              </p>
              <p className="mt-3 leading-8 text-black/70">{item.after}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-[2.8rem] bg-[#fff7ed] p-8 text-[#2a1d14] md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              小店網站常見問題
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-[1.8rem] bg-[#2a1d14]/5 p-6">
                <h3 className="text-xl font-semibold">{item.q}</h3>
                <p className="mt-3 leading-8 text-black/65">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionIntro({ id, eyebrow, title, desc }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeader eyebrow={eyebrow} title={title} desc={desc} />
    </section>
  )
}

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f5c16c]">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl leading-8 text-white/62">{desc}</p>}
    </div>
  )
}

function Card({ children }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
      {children}
    </div>
  )
}

export default CafeDemo