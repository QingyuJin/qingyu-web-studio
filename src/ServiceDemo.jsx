import { useState } from "react"
import { Link } from "react-router-dom"

// ─── 你的真實資料，直接改這裡 ───────────────────────────────
const CONTACT = {
  email: "a0988874324@gmail.com",
  line: "mulavuc",
  instagram: "qingyu.jin",
}

const packages = [
  {
    id: "starter",
    title: "Starter",
    subtitle: "個人 / 學生",
    price: "NT$2,000",
    priceNote: "– 4,000",
    timeline: "5–10 天",
    desc: "履歷網站、個人作品集、簡單介紹頁。把你的資訊整理成手機也好看的頁面。",
    items: [
      "單頁式架構",
      "RWD 手機版",
      "基本 SEO 設定",
      "Vercel 部署上線",
      "原始碼交付",
    ],
    cta: "詢問 Starter",
  },
  {
    id: "standard",
    title: "Standard",
    subtitle: "小店 / 工作室",
    price: "NT$3,000",
    priceNote: "– 8,000",
    timeline: "7–14 天",
    desc: "一頁式官網、工作室形象頁、服務介紹。最多人選，把服務、價格、聯絡整理清楚。",
    items: [
      "完整一頁式網站",
      "服務 / 價格 / 作品區",
      "LINE / IG / Map 入口",
      "OGP 分享圖設定",
      "Google Form 表單串接",
      "自訂網域協助",
    ],
    featured: true,
    cta: "詢問 Standard",
  },
  {
    id: "custom",
    title: "Custom",
    subtitle: "依需求規劃",
    price: "討論",
    priceNote: "",
    timeline: "依範圍",
    desc: "多頁結構、複雜互動、舊網站改版或長期維護合作，先聊需求再報價。",
    items: [
      "多頁規劃",
      "客製化互動區塊",
      "舊網站手機版修正",
      "長期維護合約",
      "優先排程",
    ],
    cta: "先聊需求",
  },
]

const whatIDo = [
  {
    num: "01",
    title: "內容整理",
    desc: "把 IG、LINE、Google Map、價格、作品、FAQ 從四散的地方整理成清楚的網站架構。不用你先準備好，邊聊邊整理。",
  },
  {
    num: "02",
    title: "RWD 前端開發",
    desc: "手機、平板、桌機都能正常閱讀與點擊。手機版優先設計，不是把電腦版縮小。",
  },
  {
    num: "03",
    title: "部署上線",
    desc: "GitHub + Vercel 部署、自訂網域設定、HTTPS、OGP 分享預覽。上線後你可以把網址放在 IG bio 和 Google 商家。",
  },
  {
    num: "04",
    title: "交付 & 說明",
    desc: "交付原始碼、部署設定說明與使用教學。小改動你也可以自己來，不用每次找我。",
  },
]

const notGoodFor = [
  "大型後台系統 / 會員管理",
  "金流串接 / 完整電商",
  "需要資料庫的複雜應用",
  "企業級大型網站",
]

const process = [
  { step: "01", title: "傳訊息", desc: "用 LINE、IG 或 Email 說你想做什麼、目前有什麼素材。不用準備完整，想到什麼說什麼。" },
  { step: "02", title: "確認範圍", desc: "我整理你的需求，確認適不適合小型網站，給初步報價和時程估算。" },
  { step: "03", title: "製作中", desc: "開始做頁面，會給你一個預覽連結，可以隨時看進度、提意見。" },
  { step: "04", title: "上線交付", desc: "測試完成後部署上線，交付原始碼，給簡單說明文件。" },
]

const faqs = [
  {
    q: "我沒有素材可以嗎？",
    a: "可以。很多人一開始只有想法或一個 IG 帳號。我們可以從整理你現有的內容開始，邊做邊補充。",
  },
  {
    q: "我不懂網站，怎麼跟你溝通？",
    a: "不需要懂。你只要說想要什麼感覺、給幾個你喜歡的網站參考，剩下的我來規劃。",
  },
  {
    q: "做完我自己改得了嗎？",
    a: "簡單的文字和圖片替換，有我的說明文件基本上可以自己改。比較大的改動再找我討論。",
  },
  {
    q: "報價會變嗎？",
    a: "確認範圍後報價就固定。中途追加功能才會另外計算，但我會事先說清楚不會偷改。",
  },
  {
    q: "我急，可以更快嗎？",
    a: "視當時排程而定。如果有急件需求可以提前說，我評估後看能不能調整。",
  },
]

// ─── 主元件 ────────────────────────────────────────────────
function ServiceDemo() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [copiedLine, setCopiedLine] = useState("")

  async function copyText(label, text) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    } finally {
      setCopiedLine(label)
      window.setTimeout(() => setCopiedLine(""), 1600)
    }
  }

  const mailSubject = encodeURIComponent("網站需求詢問")
  const mailBody = encodeURIComponent("你好，我想詢問網站製作，以下是我的基本需求：\n\n網站類型：\n目前有的素材：\n預算範圍：\n希望完成時間：")

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#08090d] text-white">
      <Background />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090d]/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
          <Link
            to="/"
            className="min-w-0 shrink rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            ← 回首頁
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/50 md:flex">
            <a href="#what" className="transition hover:text-white">我做什麼</a>
            <a href="#packages" className="transition hover:text-white">方案</a>
            <a href="#process" className="transition hover:text-white">流程</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <a
            href="#contact"
            className="shrink-0 rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-200"
          >
            直接聯絡我
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-16 sm:px-5 md:pb-28 md:pt-32">
        <div className="min-w-0 max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            資訊工程學生接案・台灣・目前可接
          </div>

          <h1 className="break-words text-[2.65rem] font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl md:text-[5.5rem] md:leading-[1.0]">
            把你散落的資訊，<br />
            <span className="text-cyan-300">做成一個真正的網站。</span>
          </h1>

          <p className="mt-8 max-w-2xl break-words text-base leading-8 text-white/62 sm:text-lg sm:leading-9">
            協助學生、小型店家、工作室與個人品牌——把 IG、LINE、Google Map、價格表、作品集整理成手機好讀、可以被搜尋到、客人進來就知道怎麼聯絡你的網站。
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-cyan-300 px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan-200"
            >
              免費詢價，不用客氣
            </a>
            <a
              href="#packages"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40"
            >
              看方案與費用
            </a>
            <Link
              to="/brief"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40"
            >
              先整理需求
            </Link>
          </div>
        </div>

        {/* Hero stats bar */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "主打服務", value: "一頁式 / 作品集 / 工作室" },
            { label: "技術", value: "React · Vite · Tailwind" },
            { label: "部署", value: "Vercel / 自訂網域" },
            { label: "聯絡", value: "LINE · IG · Email" },
          ].map((item) => (
            <div key={item.label} className="min-w-0 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs text-white/40">{item.label}</p>
              <p className="mt-1.5 break-words text-sm font-semibold text-white/85">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT I DO */}
      <section id="what" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-5 md:py-20">
        <SectionHeader
          eyebrow="What I Do"
          title="我真正做的四件事。"
          desc="不是只生一張漂亮圖，而是讓你的網站能被找到、能被點、能被分享。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {whatIDo.map((item) => (
            <div
              key={item.num}
              className="group min-w-0 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07] sm:p-8"
            >
              <p className="font-mono text-sm text-cyan-300">{item.num}</p>
              <h3 className="mt-4 break-words text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 break-words leading-8 text-white/58">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Honest scope */}
        <div className="mt-8 rounded-[2rem] bg-white p-6 text-black md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/40">Honest Scope</p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-4xl">
                我不做的，也講清楚。
              </h3>
              <p className="mt-4 leading-8 text-black/60">
                目前專注在小型前端網站，範圍講清楚，對雙方都安全。以下這些超出現有能力，不接。
              </p>
            </div>
            <div className="grid gap-3">
              {notGoodFor.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-black/[0.04] px-5 py-4">
                  <span className="text-black/30">✕</span>
                  <p className="text-sm font-semibold text-black/65">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-5 md:py-20">
        <SectionHeader
          eyebrow="Pricing"
          title="報價透明，沒有隱藏費用。"
          desc="以下是參考範圍。實際報價在確認需求後決定，不會事後追加。"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.id}
              className={`relative flex min-w-0 flex-col rounded-[2rem] border p-6 transition sm:p-7 ${
                item.featured
                  ? "border-cyan-300/60 bg-cyan-300/10 shadow-[0_0_60px_rgba(103,232,249,0.08)]"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              {item.featured && (
                <div className="absolute -top-3 left-7">
                  <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-black">
                    最多人選
                  </span>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {item.subtitle}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-semibold ${item.featured ? "text-cyan-300" : "text-white"}`}>
                    {item.price}
                  </span>
                  {item.priceNote && (
                    <span className="text-xl text-white/40">{item.priceNote}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-white/40">約 {item.timeline}</p>
                <p className="mt-4 break-words leading-7 text-white/58">{item.desc}</p>
              </div>

              <div className="mt-6 flex-1">
                <div className="h-px bg-white/10" />
                <ul className="mt-5 grid gap-2.5">
                  {item.items.map((line) => (
                    <li key={line} className="flex min-w-0 items-start gap-3 text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/70" />
                      <span className="min-w-0 break-words">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`網站需求詢問 – ${item.title}`)}&body=${mailBody}`}
                className={`mt-8 block rounded-2xl py-3 text-center text-sm font-semibold transition ${
                  item.featured
                    ? "bg-cyan-300 text-black hover:bg-cyan-200"
                    : "border border-white/15 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                }`}
              >
                {item.cta} →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-white/35">
          不確定選哪個？先傳訊息聊，我幫你判斷。
        </p>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-5 md:py-20">
        <div className="rounded-[2.8rem] border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <SectionHeader
            eyebrow="Process"
            title="合作流程，四步驟。"
            desc="不需要你準備完整規格。說說你想做什麼，剩下的我來規劃。"
          />

          <div className="relative grid gap-5 md:grid-cols-4">
            <div className="pointer-events-none absolute left-[2.75rem] top-[1.375rem] hidden h-px w-[calc(100%-5.5rem)] border-t border-dashed border-white/15 md:block" />
            {process.map((item) => (
              <div key={item.step} className="relative rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300 font-mono text-sm font-bold text-black">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-5 md:py-20">
        <SectionHeader
          eyebrow="FAQ"
          title="常見問題。"
          desc=""
        />
        <div className="grid gap-3 max-w-3xl">
          {faqs.map((item, index) => (
            <div
              key={item.q}
              className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04]"
            >
              <button
                type="button"
                aria-expanded={activeFaq === index}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
              >
                <span className="font-semibold leading-7">{item.q}</span>
                <span className={`shrink-0 text-cyan-300 transition-transform ${activeFaq === index ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {activeFaq === index && (
                <div className="border-t border-white/10 px-7 pb-6 pt-5">
                  <p className="leading-8 text-white/62">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto w-full max-w-7xl px-4 py-16 pb-32 sm:px-5 md:py-20 md:pb-32">
        <div className="overflow-hidden rounded-[2.4rem] bg-cyan-300 p-6 text-black sm:rounded-[2.8rem] md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">Contact</p>
              <h2 className="mt-4 break-words text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                有想法就傳給我，<br />不用客氣。
              </h2>
              <p className="mt-6 max-w-lg break-words leading-8 text-black/65">
                不需要一開始就準備完整規格。說說網站用途、你喜歡的感覺、手上有什麼素材、預算大概多少——我先判斷適不適合做，再給你初步建議。
              </p>
              <Link
                to="/brief"
                className="mt-8 inline-flex max-w-full items-center gap-2 rounded-full border border-black/20 bg-black/10 px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/15"
              >
                或先用需求表整理想法 →
              </Link>
            </div>

            <div className="grid gap-3">
              <a
                href={`mailto:${CONTACT.email}?subject=${mailSubject}&body=${mailBody}`}
                className="group rounded-3xl bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white"
              >
                <p className="text-sm text-black/45">Email</p>
                <p className="mt-2 break-all font-semibold">{CONTACT.email}</p>
              </a>

              <button
                type="button"
                onClick={() => copyText("line", CONTACT.line)}
                className="rounded-3xl bg-white/70 p-5 text-left transition hover:-translate-y-1 hover:bg-white"
              >
                <p className="text-sm text-black/45">LINE ID（點擊複製）</p>
                <p className="mt-2 font-semibold">
                  {copiedLine === "line" ? "✓ 已複製！" : CONTACT.line}
                </p>
              </button>

              <a
                href={`https://www.instagram.com/${CONTACT.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl bg-white/70 p-5 transition hover:-translate-y-1 hover:bg-white"
              >
                <p className="text-sm text-black/45">Instagram</p>
                <p className="mt-2 break-all font-semibold">@{CONTACT.instagram}</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <a
          href="#contact"
          className="breathing-cta flex items-center justify-center rounded-full bg-cyan-300 px-4 py-3.5 text-sm font-semibold text-black shadow-2xl shadow-black/40"
        >
          直接聯絡我，免費詢價 →
        </a>
      </div>
    </main>
  )
}

// ─── 共用元件 ──────────────────────────────────────────────
function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-10 min-w-0 md:mb-12">
      <p className="break-words text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:tracking-[0.28em]">{eyebrow}</p>
      <h2 className="mt-4 max-w-4xl break-words text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl md:text-6xl">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl break-words leading-8 text-white/55">{desc}</p>}
    </div>
  )
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#08090d]">
      <div className="absolute left-[-160px] top-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="absolute right-[-220px] top-[280px] h-[560px] w-[560px] rounded-full bg-blue-500/10 blur-[150px]" />
      <div className="absolute bottom-[-220px] left-[30%] h-[520px] w-[520px] rounded-full bg-violet-500/10 blur-[140px]" />
    </div>
  )
}

export default ServiceDemo
