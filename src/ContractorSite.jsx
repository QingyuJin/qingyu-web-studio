import { useMemo, useState } from "react"
import { Link } from "react-router-dom"

const lineBotId = "@550oexzn"

const projectPhotos = {
  woodFloor: "/project-photos/335949_0.jpg",
  roofWaterproof: "/project-photos/335950_0.jpg",
  epoxyFloor: "/project-photos/335953_0.jpg",
  exteriorWall: "/project-photos/335945_0.jpg",
  houseFront: "/project-photos/335941_0.jpg",
  brightRoom: "/project-photos/335942_0.jpg",
  tileRoom: "/project-photos/335940_0.jpg",
}

const services = ["防水", "泥作", "油漆", "磁磚", "板模", "鋼筋", "地坪", "統包"]

const cases = [
  {
    title: "室內木地板整理",
    type: "木作",
    image: projectPhotos.woodFloor,
    brief: "地板、收納、牆面整理。",
    detail: "整理木地板、櫃體與牆面視覺，讓完工照片能直接作為接案案例。",
  },
  {
    title: "屋頂防水整理",
    type: "防水",
    image: projectPhotos.roofWaterproof,
    brief: "頂樓、女兒牆、防水層。",
    detail: "先確認積水與滲漏風險，再整理施作範圍與維護紀錄。",
  },
  {
    title: "室內地坪施工",
    type: "地坪",
    image: projectPhotos.epoxyFloor,
    brief: "地面整平、表面處理。",
    detail: "地坪施工進度可用照片、工項與日期回報給業主。",
  },
  {
    title: "外牆修繕評估",
    type: "泥作",
    image: projectPhotos.exteriorWall,
    brief: "外牆檢查、修補標示。",
    detail: "用照片記錄問題範圍，報價前先把不確定性說清楚。",
  },
  {
    title: "住宅外觀整理",
    type: "統包",
    image: projectPhotos.houseFront,
    brief: "立面、門面、局部整理。",
    detail: "將門面、牆面和現場狀態整理成可展示案例。",
  },
  {
    title: "採光空間整理",
    type: "油漆",
    image: projectPhotos.brightRoom,
    brief: "牆面、天花、採光區。",
    detail: "用簡單照片與工項說明，降低業主理解成本。",
  },
]

const workflow = [
  ["01", "確認", "需求、位置、照片"],
  ["02", "報價", "工項、日期、金額"],
  ["03", "發包", "師傅、任務、進度"],
]

const botCommands = [
  "選單",
  "估價",
  "業主 q-001",
  "老闆總覽",
  "PDF q-001",
  "綁定 BF-AMING-1234",
  "今日任務",
  "回報 t-001 + 照片",
]

function ContractorSite() {
  const [activeCase, setActiveCase] = useState(cases[0])
  const [activeType, setActiveType] = useState("全部")
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: "",
    contact: "",
    source: "",
    area: "",
    trade: "",
    item: "",
    material: "",
    tool: "",
    size: "",
    unitPrice: "",
    date: "",
    note: "",
  })

  const filteredCases = useMemo(() => {
    if (activeType === "全部") return cases
    return cases.filter((item) => item.type === activeType)
  }, [activeType])

  const inquiryText = `工程需求
姓名：${form.name || "未填"}
電話 / LINE：${form.contact || "未填"}
來源：${form.source || "LINE / 口頭 / Excel / 紙本 / Pro360"}
地區：${form.area || "未填"}
工種：${form.trade || "未填"}
工項：${form.item || "未填"}
材料：${form.material || "未填"}
工具：${form.tool || "未填"}
坪數 / 數量：${form.size || "未填"}
單價：${form.unitPrice || "未填"}
預計日期：${form.date || "未填"}
備註：${form.note || "未填"}
LINE Bot：${lineBotId}`

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryText)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = inquiryText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f172a]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link to="/" className="text-sm font-bold text-cyan-300">
              ← 系統作品集
            </Link>
            <p className="mt-1 font-black">Contractor Site</p>
          </div>
          <div className="flex gap-2">
            <a
              href="#inquiry"
              className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950"
            >
              詢問
            </a>
            <Link
              to="/buildflow"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-black"
            >
              後台
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:py-16">
        <div>
          <p className="text-xs font-black uppercase text-cyan-300">Contractor Flow</p>
          <h1 className="mt-5 text-3xl font-black leading-tight text-white md:text-6xl">
            工程接案，
            <span className="block text-cyan-200">先整理再報價。</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-slate-300 md:text-base">
            LINE、口頭、Excel、紙本、Pro360，統一整理成報價資料。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#inquiry"
              className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-slate-950"
            >
              我要估價
            </a>
            <a
              href="#line"
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-black"
            >
              測 LINE
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="aspect-[5/3] overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
            <img
              src={activeCase.image}
              alt={activeCase.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
            <p className="text-xs font-black text-cyan-300">{activeCase.type}</p>
            <h2 className="mt-2 text-2xl font-black">{activeCase.title}</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{activeCase.brief}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-3 md:grid-cols-6">
          {services.map((service) => (
            <div key={service} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <p className="font-black">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cases" className="mx-auto max-w-6xl px-4 py-12">
        <SectionHeader label="Cases" title="工程案例" desc="外層只看照片與工項，細節點開。" />
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {["全部", ...services].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveType(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                activeType === item ? "bg-cyan-300 text-slate-950" : "bg-white/5 text-slate-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((item) => (
            <article
              key={item.title}
              className="rounded-[24px] border border-white/10 bg-white/[0.045] p-3"
            >
              <button
                type="button"
                onClick={() => setActiveCase(item)}
                className="block w-full overflow-hidden rounded-[18px] bg-white/5 text-left"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
              <div className="p-3">
                <p className="text-xs font-black text-cyan-300">{item.type}</p>
                <h3 className="mt-2 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-300">{item.brief}</p>
                <details className="minimal-detail mt-4">
                  <summary>查看做法</summary>
                  <p className="minimal-detail-body text-sm font-bold leading-7 text-slate-300">
                    {item.detail}
                  </p>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111827]">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <SectionHeader label="Workflow" title="報價流程" desc="確認、報價、發包，一案到底。" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {workflow.map(([index, title, desc]) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-[#0f172a] p-5">
                <p className="font-mono text-xs font-black text-cyan-300">{index}</p>
                <h3 className="mt-3 text-2xl font-black">{title}</h3>
                <p className="mt-2 text-sm font-bold text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="line"
        className="mx-auto grid max-w-6xl gap-6 px-4 py-12 lg:grid-cols-[0.86fr_1.14fr]"
      >
        <div>
          <SectionHeader label="LINE Bot" title="可直接測" desc={`加 ${lineBotId}，輸入指令。`} />
          <p className="mt-5 font-mono text-sm font-black text-cyan-200">
            選單 → 估價 → 業主 q-001 → 老闆總覽 → 綁定 BF-AMING-1234
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {botCommands.map((command) => (
            <div key={command} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <p className="font-mono text-sm font-black text-slate-200">{command}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="inquiry" className="border-t border-white/10 bg-[#111827]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader label="Inquiry" title="估價整理器" desc="填完即可交給後台建報價。" />
          <div className="grid gap-4">
            <form
              className="grid gap-3 rounded-[24px] border border-white/10 bg-[#0f172a] p-5 md:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault()
                copyInquiry()
              }}
            >
              <Input
                label="姓名"
                value={form.name}
                onChange={(value) => updateForm("name", value)}
              />
              <Input
                label="電話 / LINE"
                value={form.contact}
                onChange={(value) => updateForm("contact", value)}
              />
              <Input
                label="來源"
                value={form.source}
                onChange={(value) => updateForm("source", value)}
                placeholder="LINE / Pro360"
              />
              <Input
                label="地區"
                value={form.area}
                onChange={(value) => updateForm("area", value)}
              />
              <Input
                label="工種"
                value={form.trade}
                onChange={(value) => updateForm("trade", value)}
                placeholder="泥作 / 油漆 / 鋼筋"
              />
              <Input
                label="工項"
                value={form.item}
                onChange={(value) => updateForm("item", value)}
                placeholder="屋頂防水"
              />
              <Input
                label="材料"
                value={form.material}
                onChange={(value) => updateForm("material", value)}
                placeholder="PU / 磁磚 / 水泥"
              />
              <Input
                label="工具"
                value={form.tool}
                onChange={(value) => updateForm("tool", value)}
                placeholder="吊車 / 打石機"
              />
              <Input
                label="坪數 / 數量"
                value={form.size}
                onChange={(value) => updateForm("size", value)}
              />
              <Input
                label="單價"
                value={form.unitPrice}
                onChange={(value) => updateForm("unitPrice", value)}
                placeholder="例：2200 / 坪"
              />
              <Input
                label="預計日期"
                value={form.date}
                onChange={(value) => updateForm("date", value)}
              />
              <Input
                label="備註 / 照片"
                value={form.note}
                onChange={(value) => updateForm("note", value)}
              />
              <button className="rounded-xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950 md:col-span-2">
                {copied ? "已複製摘要" : "產生報價資料"}
              </button>
            </form>
            <pre className="whitespace-pre-wrap rounded-[24px] border border-white/10 bg-[#0f172a] p-5 text-sm font-bold leading-7 text-slate-300">
              {inquiryText}
            </pre>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeader({ label, title, desc }) {
  return (
    <div>
      <p className="text-xs font-black uppercase text-cyan-300">{label}</p>
      <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-400">{desc}</p>
    </div>
  )
}

function Input({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
      />
    </label>
  )
}

export default ContractorSite
