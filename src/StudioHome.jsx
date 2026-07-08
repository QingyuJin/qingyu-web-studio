import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import SiteLayout from "./site/SiteLayout"
import { pricing, pricingNote, seo } from "./site/content"

function isExternalUrl(to) {
  return typeof to === "string" && /^https?:\/\//.test(to)
}

function SmartLink({ to, children, ...props }) {
  if (isExternalUrl(to)) {
    return (
      <a href={to} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  )
}

const plans = [
  {
    name: "品牌官網專案",
    range: pricing[0][1],
    text: "客製設計、內容架構、案例展示、RWD 與 SEO。讓客戶第一眼就決定信任你。",
    fit: "專業服務、工程行、診所、成長中的公司",
    to: "/works/xinjiang",
    linkLabel: "看真實案例",
  },
  {
    name: "接單流程系統",
    range: pricing[1][1],
    text: "官網＋線上詢價＋後台收件匣＋LINE 導流。詢價不再散在訊息裡，每一筆都追得到。",
    fit: "靠詢價、報價成交的服務業",
    to: "/contractor-site#inquiry",
    linkLabel: "實際操作流程",
  },
  {
    name: "營運系統",
    range: pricing[2][1],
    text: "訂貨、點餐、案件派工等客製後台。把每天重複的流程做成系統，少漏單、好對帳。",
    fit: "批發商、餐飲、工程與服務團隊",
    to: "/works/wholesale-ordering",
    linkLabel: "操作訂貨系統",
  },
  {
    name: "AI 導入",
    range: pricing[3][1],
    text: "文件知識庫、引用問答、自動回覆與用量權限管理。適合搭配數位轉型補助申請。",
    fit: "公司、協會、工廠、想導入 AI 的團隊",
    to: "/ai-transformation",
    linkLabel: "看導入方案",
  },
]

const productCards = [
  {
    id: "wholesale",
    title: "批發訂貨系統",
    text: "B2B 訂貨、專屬報價、出貨與月結。",
    to: "/works/wholesale-ordering",
    tone: "dark",
  },
  {
    id: "rag",
    title: "RAG 企業顧問",
    text: "文件知識庫、引用回答、用量與權限控管。",
    to: "/works/rag-consultant",
    tone: "dark",
  },
  {
    id: "buildflow",
    title: "BuildFlow 工程後台",
    text: "案件、報價、發包、任務與網站詢價收件匣。",
    to: "/buildflow",
    tone: "dark",
  },
  {
    id: "restaurant",
    title: "點餐系統",
    text: "客戶端點餐、服務端控單、桌況與廚房佇列。",
    to: "/works/restaurant-ordering",
  },
  {
    id: "biomed",
    title: "生醫品牌網站",
    text: "醫療品牌、專業內容、案例與講座報名。",
    to: "/works/biomed-brand-site",
  },
  {
    id: "quiz",
    title: "互動測驗頁",
    text: "題庫、作答、解析與結果頁。",
    to: "/works/interactive-quiz",
  },
]

const processSteps = [
  ["01", "需求訪談", "30 分鐘聊清楚目標、預算與時程，不合適我會直說。"],
  ["02", "提案與報價", "範圍、頁面、功能、金額白紙黑字，不追加隱藏費用。"],
  ["03", "設計與實作", "每週看得到進度，用真的畫面討論，不用想像。"],
  ["04", "上線驗收", "部署正式網址，實際資料跑一輪才算完成。"],
  ["05", "交付與維護", "操作教學與文件，上線後我不會消失。"],
]

const whyMe = [
  [
    "設計與開發是同一個人",
    "不經過業務轉手、不外包拆件。跟你開會的人，就是動手做的人，溝通成本最低。",
  ],
  [
    "交付的是會運作的系統",
    "不是設計稿或展示頁。詢價會進後台、訂單能追蹤、AI 有引用來源——上線第一天就能用。",
  ],
  [
    "上線之後不消失",
    "教學、文件、維護方案都有。網站是生意的一部分，需要有人一直顧著。",
  ],
]

function StudioHome() {
  return (
    <SiteLayout>
      <Seo page={seo.home} />

      <HeroSection />
      <TrustBar />
      <FeaturedCase />
      <PlansSection />
      <LiveShowcase />
      <ProcessSection />
      <WhySection />
      <FinalCta />
    </SiteLayout>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(234,196,111,0.14),transparent_32rem),radial-gradient(circle_at_5%_90%,rgba(13,107,98,0.08),transparent_28rem)]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.26em] text-[#0d6b62]">Qingyu Web Studio</p>
          <h1 className="mt-6 font-['Noto_Serif_TC',serif] text-[clamp(2.3rem,6.5vw,4.3rem)] font-black leading-[1.12] tracking-tight text-[#111c22]">
            不只把網站做漂亮，
            <br />
            把<span className="text-[#0d6b62]">接單流程</span>一次做好。
          </h1>
          <p className="mt-7 max-w-xl text-base font-bold leading-8 text-[#52605c] md:text-lg">
            品牌官網、線上詢價、後台管理到 AI 導入——從客戶看到你的第一眼，到需求進到你手上，整條路一個人替你負責到底。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#case"
              className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#111c22] px-7 text-sm font-black text-white shadow-lg shadow-[#111c22]/15 transition hover:bg-[#1f3032]"
            >
              看真實上線案例
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[#111c22]/20 bg-white px-7 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"
            >
              預約 30 分鐘需求訪談
            </Link>
          </div>
          <p className="mt-6 text-sm font-bold text-[#7a857f]">
            多數委託落在 NT$80,000–150,000，訪談與報價不收費。
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[#eac46f]/12 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-[#e0d8cc] bg-white p-3 shadow-2xl shadow-[#c8bba9]/30">
            <img
              src="/project-photos/335941_0.jpg"
              alt="鑫匠工程完工作品：透天厝立面整體翻新"
              className="aspect-[5/3.4] w-full rounded-2xl object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-[#111c22]/82 p-4 backdrop-blur-md">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#eac46f]">Live Client</p>
              <p className="mt-1 text-base font-black text-white">鑫匠工程｜品牌官網＋接單系統，真實營運中</p>
            </div>
          </div>

          <div className="absolute -left-3 top-8 hidden rounded-2xl border border-[#e0d8cc] bg-white p-4 shadow-xl shadow-[#c8bba9]/30 md:block">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7a857f]">BuildFlow 收件匣</p>
            <p className="mt-1.5 text-sm font-black text-[#111c22]">🔔 1 筆新詢價：磁磚修補</p>
            <p className="mt-1 text-xs font-bold text-[#0d6b62]">→ 一鍵轉為案件</p>
          </div>

          <div className="absolute -right-2 -bottom-5 hidden rounded-2xl border border-[#e0d8cc] bg-white p-4 shadow-xl shadow-[#c8bba9]/30 md:block">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#7a857f]">AI 知識庫</p>
            <p className="mt-1.5 text-sm font-black text-[#111c22]">已回答，附 2 個引用來源</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  const items = ["真實客戶，真實上線", "設計到後台，一人交付", "可直接操作的成品", "上線後持續維護"]
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 text-sm font-black text-[#3d4c48]">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eef7f4] text-xs text-[#0d6b62]">✓</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturedCase() {
  const photos = [
    ["/project-photos/pro360-6.jpg", "洗石子地坪工藝"],
    ["/project-photos/335941_0.jpg", "透天立面整體翻新"],
    ["/project-photos/pro360-8.jpg", "浴室磁磚翻新"],
  ]
  const pipeline = [
    ["品牌官網", "黑金水墨書法品牌，服務與案例一頁看懂"],
    ["線上詢價", "客戶手機填單，急件直接撥號"],
    ["後台收件", "需求即時進 BuildFlow，一鍵轉成案件追蹤"],
  ]

  return (
    <section id="case" className="scroll-mt-20 border-b border-[#1c2d2e] bg-[#111c22] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Featured Case</p>
            <h2 className="mt-4 font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,5vw,3.2rem)] font-black leading-snug">
              鑫匠工程：
              <br />
              從一張名片，到會接單的網站系統。
            </h2>
            <p className="mt-5 max-w-xl text-sm font-bold leading-8 text-white/72 md:text-base">
              屏東 40 年泥作工程行，原本只有電話和 Pro360。我替他們打造書法品牌官網、整理完工案例，
              並把線上詢價直接串進後台——現在每一筆需求都進資料庫、可追蹤、可轉案件。
            </p>
            <div className="mt-7 grid gap-3">
              {pipeline.map(([title, text], index) => (
                <div key={title} className="grid grid-cols-[2.5rem_1fr] items-start gap-3 rounded-2xl bg-white/[0.07] p-4">
                  <span className="font-mono text-sm font-black text-[#eac46f]">0{index + 1}</span>
                  <div>
                    <p className="text-base font-black">{title}</p>
                    <p className="mt-1 text-sm font-bold leading-6 text-white/62">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://xinjiang-website.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center rounded-xl bg-[#eac46f] px-6 text-sm font-black text-[#111c22] transition hover:bg-[#f2d38a]"
              >
                打開鑫匠官網
              </a>
              <Link
                to="/works/xinjiang"
                className="inline-flex min-h-12 items-center rounded-xl border border-white/25 px-6 text-sm font-black text-white transition hover:bg-white/10"
              >
                看完整案例拆解
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            <figure className="group relative overflow-hidden rounded-3xl border border-white/12">
              <img
                src={photos[1][0]}
                alt={photos[1][1]}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-[#111c22]/78 px-4 py-1.5 text-xs font-black text-[#eac46f] backdrop-blur">
                {photos[1][1]}
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-3">
              {[photos[0], photos[2]].map(([src, label]) => (
                <figure key={src} className="group relative overflow-hidden rounded-2xl border border-white/12">
                  <img
                    src={src}
                    alt={label}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <figcaption className="absolute bottom-3 left-3 rounded-full bg-[#111c22]/78 px-3 py-1 text-[11px] font-black text-[#eac46f] backdrop-blur">
                    {label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlansSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="委託方案"
          title="你想解決什麼，決定我們從哪裡開始"
          text="四種常見委託與參考預算。範圍談清楚之後，報價白紙黑字。"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="flex flex-col rounded-3xl border border-[#e3ded3] bg-[#faf8f3] p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c8bba9]/20"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-['Noto_Serif_TC',serif] text-2xl font-black text-[#111c22]">{plan.name}</h3>
                <p className="text-lg font-black text-[#0d6b62]">{plan.range}</p>
              </div>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{plan.text}</p>
              <p className="mt-3 text-xs font-black text-[#7a857f]">適合：{plan.fit}</p>
              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                <SmartLink
                  to={plan.to}
                  className="inline-flex min-h-11 items-center rounded-xl bg-[#111c22] px-5 text-sm font-black text-white transition hover:bg-[#1f3032]"
                >
                  {plan.linkLabel}
                </SmartLink>
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center rounded-xl border border-[#cfd7d3] bg-white px-5 text-sm font-black text-[#111c22] transition hover:border-[#0d6b62] hover:text-[#0d6b62]"
                >
                  詢問這類專案
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5 text-sm font-bold leading-7 text-[#52605c]">
          {pricingNote}
        </p>
      </div>
    </section>
  )
}

function LiveShowcase() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="不是效果圖"
          title="每一個系統，都能直接點開操作"
          text="委託之前，先自己玩一遍。你看到的互動、後台、AI 問答，全部是真的在跑的程式。"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productCards.map((item) => (
            <SmartLink
              key={item.title}
              to={item.to}
              className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-xl ${
                item.tone === "dark"
                  ? "border-[#1c2d2e] bg-[#111c22] text-white shadow-[#111c22]/10"
                  : "border-[#e0d8cc] bg-white text-[#111c22] shadow-[#c8bba9]/10"
              }`}
            >
              <div className={`mb-5 h-36 overflow-hidden rounded-xl border ${item.tone === "dark" ? "border-white/10 bg-white/8" : "border-[#eadfd1] bg-[#f6efe4]"}`}>
                <CardPreview id={item.id} dark={item.tone === "dark"} />
              </div>
              <h3 className="text-xl font-black">{item.title}</h3>
              <p className={`mt-2 text-sm font-bold leading-6 ${item.tone === "dark" ? "text-white/70" : "text-[#52605c]"}`}>
                {item.text}
              </p>
              <span className={`mt-5 inline-flex min-h-10 items-center rounded-lg px-4 text-sm font-black ${item.tone === "dark" ? "bg-white text-[#111c22]" : "bg-[#111c22] text-white"}`}>
                直接操作 →
              </span>
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

function CardPreview({ id, dark }) {
  const chipClass = dark ? "bg-white/10 text-white/72" : "bg-white text-[#66716d]"
  const rowClass = dark ? "bg-white/10" : "bg-white"
  const mutedText = dark ? "text-white/60" : "text-[#66716d]"
  const strongText = dark ? "text-white/92" : "text-[#111c22]"

  if (id === "wholesale") {
    return (
      <div className="flex h-full flex-col justify-between p-3 text-[10px] font-black">
        <div className="flex items-center justify-between">
          <span className={strongText}>本週訂單</span>
          <span className={`rounded-full px-2 py-0.5 ${chipClass}`}>月結客戶</span>
        </div>
        {[
          ["#1042 高麗菜 x20", "待出貨", "text-[#eac46f]"],
          ["#1041 蘋果 x8 箱", "已出貨", "text-[#7fd4a2]"],
        ].map(([label, status, tone]) => (
          <div key={label} className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 ${rowClass}`}>
            <span className={mutedText}>{label}</span>
            <span className={tone}>{status}</span>
          </div>
        ))}
        <div className="flex items-center justify-between px-1">
          <span className={mutedText}>本月累計</span>
          <span className={strongText}>NT$42,180</span>
        </div>
      </div>
    )
  }

  if (id === "rag") {
    return (
      <div className="flex h-full flex-col justify-between p-3 text-[10px] font-black">
        <div className={`self-end rounded-lg rounded-tr-sm px-2.5 py-1.5 ${dark ? "bg-[#eac46f] text-[#14201f]" : "bg-[#111c22] text-white"}`}>
          保固多久？範圍有哪些？
        </div>
        <div className={`rounded-lg rounded-tl-sm px-2.5 py-1.5 ${rowClass}`}>
          <span className={mutedText}>油漆一年、防水三年，非人為剝落免費修補⋯</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 font-mono ${chipClass}`}>保固政策.md · v1</span>
          <span className="rounded-full bg-[#7fd4a2]/20 px-2 py-0.5 text-[#7fd4a2]">Grounded</span>
        </div>
      </div>
    )
  }

  if (id === "buildflow") {
    return (
      <div className="flex h-full flex-col justify-between p-3 text-[10px] font-black">
        <div className="flex items-center justify-between">
          <span className={strongText}>網站詢價收件匣</span>
          <span className="rounded-full bg-[#eac46f]/20 px-2 py-0.5 text-[#eac46f]">1 筆新需求</span>
        </div>
        {[
          ["浴室防水修繕", 72, "施工中"],
          ["磁磚修補（王先生）", 8, "估價中"],
        ].map(([name, progress, status]) => (
          <div key={name} className={`rounded-lg px-2.5 py-1.5 ${rowClass}`}>
            <div className="flex items-center justify-between">
              <span className={strongText}>{name}</span>
              <span className={mutedText}>{status}</span>
            </div>
            <div className={`mt-1 h-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-[#eadfd1]"}`}>
              <div className="h-full rounded-full bg-[#eac46f]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (id === "restaurant") {
    return (
      <div className="flex h-full gap-2 p-3 text-[10px] font-black">
        <div className="flex flex-1 flex-col justify-between">
          {[
            ["炭烤牛小排飯", "$280"],
            ["松露野菇燉飯", "$240"],
            ["烏梅氣泡飲", "$120"],
          ].map(([name, price]) => (
            <div key={name} className={`flex items-center justify-between rounded-lg px-2.5 py-1 ${rowClass}`}>
              <span className={mutedText}>{name}</span>
              <span className="text-[#c75d2c]">{price}</span>
            </div>
          ))}
        </div>
        <div className="grid w-16 grid-cols-2 content-center gap-1">
          {["A07", "B12", "C03", "D08"].map((table, index) => (
            <span
              key={table}
              className={`grid h-6 place-items-center rounded-md text-[8px] ${
                index < 2 ? "bg-[#c75d2c] text-white" : `${rowClass} ${mutedText}`
              }`}
            >
              {table}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (id === "biomed") {
    return (
      <div className="flex h-full flex-col justify-between p-3 text-[10px] font-black">
        <div className="rounded-lg bg-gradient-to-r from-[#0d6b62] to-[#8fd6cc] px-2.5 py-2 text-white">
          <p>專業，值得被看懂。</p>
          <p className="mt-0.5 text-[8px] font-bold opacity-80">品牌故事 · 衛教內容 · 講座報名</p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {["案例", "專欄", "講座"].map((label) => (
            <span key={label} className={`rounded-lg py-1.5 text-center ${rowClass} ${mutedText}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (id === "quiz") {
    return (
      <div className="flex h-full flex-col justify-between p-3 text-[10px] font-black">
        <div className="flex items-center justify-between">
          <span className={strongText}>Q3 · 品牌經營</span>
          <span className={`rounded-full px-2 py-0.5 ${chipClass}`}>3 / 5</span>
        </div>
        {[
          ["先做官網再想內容", false],
          ["先定位受眾與服務", true],
          ["先買廣告衝流量", false],
        ].map(([option, correct]) => (
          <div
            key={option}
            className={`flex items-center justify-between rounded-lg px-2.5 py-1 ${
              correct ? "bg-[#0d6b62] text-white" : `${rowClass} ${mutedText}`
            }`}
          >
            <span>{option}</span>
            {correct ? <span>✓</span> : null}
          </div>
        ))}
      </div>
    )
  }

  return null
}

function ProcessSection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading
          eyebrow="合作流程"
          title="十萬的案子，值得十萬的做事方式"
          text="從第一次談話到上線後維護，每一步你都知道現在在哪裡、接下來會發生什麼。"
        />
        <div className="grid gap-3 md:grid-cols-5">
          {processSteps.map(([no, title, text]) => (
            <article key={no} className="rounded-2xl border border-[#e3ded3] bg-[#faf8f3] p-5">
              <p className="font-mono text-xs font-black text-[#0d6b62]">{no}</p>
              <h3 className="mt-3 text-lg font-black text-[#111c22]">{title}</h3>
              <p className="mt-2 text-sm font-bold leading-6 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhySection() {
  return (
    <section className="border-b border-[#e6e0d5] bg-[#faf8f3]">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <SectionHeading eyebrow="為什麼找我" title="一個人，反而是優勢" />
        <div className="grid gap-4 md:grid-cols-3">
          {whyMe.map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-[#e3ded3] bg-white p-6">
              <h3 className="font-['Noto_Serif_TC',serif] text-xl font-black text-[#111c22]">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-7 text-[#52605c]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="bg-[#111c22] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8fd6cc]">Start a Project</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-['Noto_Serif_TC',serif] text-[clamp(1.9rem,5vw,3.2rem)] font-black leading-snug">
          先聊 30 分鐘，
          <br />
          搞清楚你的網站該做什麼。
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm font-bold leading-7 text-white/72">
          帶著你的產業、目前卡住的地方、預算與時程來。訪談不收費，如果我不適合，也會告訴你該找什麼樣的人。
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-white px-8 text-sm font-black text-[#111c22] transition hover:bg-[#f5f1e9]"
          >
            預約需求訪談
          </Link>
          <Link
            to="/works"
            className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/25 px-8 text-sm font-black text-white transition hover:bg-white/10"
          >
            再看看其他作品
          </Link>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="mb-9 max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0d6b62]">{eyebrow}</p>
      <h2 className="mt-3 font-['Noto_Serif_TC',serif] text-[clamp(1.7rem,4.5vw,2.9rem)] font-black leading-snug text-[#111c22]">
        {title}
      </h2>
      {text ? <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#52605c] md:text-base">{text}</p> : null}
    </div>
  )
}

export default StudioHome
