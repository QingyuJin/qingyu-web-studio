import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"

const modules = [
  ["Ingestion", "txt / pdf / docx 上傳", "已具備"],
  ["Chunking", "遞迴切分 + overlap", "已具備"],
  ["Embedding", "本地版，可換雲端模型", "已具備"],
  ["Retrieval", "多租戶語意搜尋", "已具備"],
  ["Generation", "引用來源回答", "已具備"],
  ["Widget", "可嵌入網站的聊天元件", "已具備"],
  ["Billing", "token 用量估價", "已具備"],
  ["Rate Limit", "租戶每分鐘配額", "已具備"],
  ["Versioning", "文件版本與還原", "已具備"],
  ["Token Endpoint", "正式 widget token 交換", "已具備"],
]

const security = [
  ["API Key", "後端服務用", "長期，可撤銷"],
  ["Widget JWT", "瀏覽器問答用", "短期 15 分鐘"],
  ["Token Endpoint", "主站後端交換短期 token", "/api/widget-token"],
  ["Rate Limit", "避免單一租戶打爆服務", "429 保護"],
  ["Tenant ID", "租戶隔離", "由 token 解析"],
]

const productionReady = [
  ["Widget Token", "主站 serverless endpoint 已完成"],
  ["Billing", "token 用量估價已接上"],
  ["Rate Limit", "租戶配額保護已接上"],
  ["Versioning", "文件版本與還原已接上"],
]

const sourceFiles = [
  "api/widget-token.js",
  "rag-engine/qingyu-rag/main.py",
  "rag-engine/qingyu-rag/auth/api_keys.py",
  "rag-engine/qingyu-rag/auth/jwt_tokens.py",
  "rag-engine/qingyu-rag/auth/rate_limiter.py",
  "rag-engine/qingyu-rag/documents/version_store.py",
  "rag-engine/qingyu-rag/chunking",
  "rag-engine/qingyu-rag/embedding",
  "rag-engine/qingyu-rag/retrieval",
  "rag-engine/qingyu-rag/vectorstore",
  "rag-engine/qingyu-rag/metrics",
  "rag-engine/qingyu-rag/widget/qingyu-widget.js",
]

const initialDocs = [
  {
    id: "pricing",
    name: "報價規則.md",
    status: "active",
    version: 2,
    versions: [
      { v: 1, date: "2026-05-12", note: "初版報價規則" },
      { v: 2, date: "2026-06-03", note: "加入坪數級距與急件加價" },
    ],
    chunks: [
      {
        id: 1,
        keywords: ["估價", "報價", "價格", "多少錢", "費用", "怎麼算"],
        text: "報價依坪數、牆面狀況與施工難度計算：10 坪以下以基本出工費計價，10～30 坪採級距單價，30 坪以上另議整案價。",
      },
      {
        id: 2,
        keywords: ["急件", "加價", "假日", "夜間"],
        text: "急件（三日內進場）加收 15% 急件費；假日或夜間施工需另加 10%～20% 時段費用。",
      },
      {
        id: 3,
        keywords: ["訂金", "付款", "尾款", "月結"],
        text: "確認報價後收 30% 訂金排定工期，完工驗收後 7 日內付清尾款；長期合作客戶可申請月結。",
      },
    ],
  },
  {
    id: "paint",
    name: "油漆工程服務說明.md",
    status: "active",
    version: 3,
    versions: [
      { v: 1, date: "2026-04-02", note: "初版服務說明" },
      { v: 2, date: "2026-05-18", note: "補充批土與底漆流程" },
      { v: 3, date: "2026-06-21", note: "加入壁癌處理說明" },
    ],
    chunks: [
      {
        id: 1,
        keywords: ["油漆", "粉刷", "批土", "底漆", "面漆"],
        text: "油漆工程流程為：保護鋪設 → 批土整平 → 底漆 → 兩道面漆。牆面若有裂縫或不平整，會先批土處理再上漆。",
      },
      {
        id: 2,
        keywords: ["壁癌", "漏水", "剝落", "基底"],
        text: "若現場有壁癌、漏水或嚴重剝落，需先處理基底與防水，否則新漆容易再度剝落，此部分會列為前置工程另行報價。",
      },
      {
        id: 3,
        keywords: ["品牌", "得利", "虹牌", "乳膠漆", "水泥漆"],
        text: "常用漆料為得利與虹牌乳膠漆，可依預算改用水泥漆；特殊色或藝術漆需依色卡另外調色計價。",
      },
    ],
  },
  {
    id: "prep",
    name: "施工前注意事項.md",
    status: "active",
    version: 1,
    versions: [{ v: 1, date: "2026-05-30", note: "初版注意事項" }],
    chunks: [
      {
        id: 1,
        keywords: ["施工前", "準備", "傢俱", "淨空", "保護"],
        text: "施工前請盡量淨空作業區域的傢俱與雜物；無法移動的大型傢俱由施工團隊以防塵布與保護膜包覆。",
      },
      {
        id: 2,
        keywords: ["時間", "工期", "幾天", "多久", "進場"],
        text: "一般室內油漆 2～4 個工作天，含批土整平約 3～6 天；確切工期會在現場勘查後於報價單載明。",
      },
      {
        id: 3,
        keywords: ["管委會", "電梯", "社區", "申請"],
        text: "社區大樓施工前請先向管委會申請施工許可與電梯保護，相關文件可由我們提供施工證明協助申請。",
      },
    ],
  },
  {
    id: "warranty",
    name: "保固政策.md",
    status: "active",
    version: 1,
    versions: [{ v: 1, date: "2026-06-10", note: "初版保固政策" }],
    chunks: [
      {
        id: 1,
        keywords: ["保固", "保修", "多久", "一年", "維修"],
        text: "油漆工程提供一年保固；防水工程提供三年保固。保固期內非人為因素造成的剝落、起泡可免費修補。",
      },
      {
        id: 2,
        keywords: ["保固", "範圍", "人為", "排除", "地震"],
        text: "保固不含人為破壞、結構位移、地震災損與二次施工造成的損傷；判定爭議時會提供現場照片與書面說明。",
      },
    ],
  },
]

const uploadQueue = [
  {
    id: "waterproof",
    name: "防水工程服務說明.md",
    status: "active",
    version: 1,
    versions: [{ v: 1, date: "今天", note: "透過 Ingestion API 上傳" }],
    chunks: [
      {
        id: 1,
        keywords: ["防水", "抓漏", "屋頂", "外牆", "浴室"],
        text: "防水服務涵蓋屋頂、外牆與浴室：屋頂採 PU 防水層施作，外牆以彈性水泥與撥水劑處理，浴室翻修含防水層試水 48 小時。",
      },
      {
        id: 2,
        keywords: ["防水", "價格", "estimate", "估價", "坪"],
        text: "屋頂 PU 防水以每坪計價並依基底狀況調整；抓漏檢測可先安排現場勘查，勘查費於成交後折抵工程款。",
      },
    ],
  },
  {
    id: "faq",
    name: "常見問題FAQ.md",
    status: "active",
    version: 1,
    versions: [{ v: 1, date: "今天", note: "透過 Ingestion API 上傳" }],
    chunks: [
      {
        id: 1,
        keywords: ["聯絡", "line", "電話", "詢問", "預約"],
        text: "可透過網站表單或 LINE 官方帳號預約現場勘查，工作日 24 小時內回覆；勘查後 3 個工作天內提供正式報價單。",
      },
      {
        id: 2,
        keywords: ["發票", "統編", "收據", "報帳"],
        text: "工程款可開立發票並打統編，發票金額已含稅；需要分期請款的公司行號可於簽約時註明請款排程。",
      },
    ],
  },
]

const suggestedQuestions = [
  "油漆工程怎麼估價？",
  "施工前需要準備什麼？",
  "保固多久？範圍有哪些？",
  "有做屋頂防水嗎？",
]

const CHAT_LIMIT = 30
const UPLOAD_LIMIT = 20

function estimateTokens(text) {
  return Math.max(8, Math.round(text.length * 1.7))
}

function formatUsd(value) {
  return `$${value.toFixed(4)} USD`
}

function retrieve(question, docs) {
  const hits = []
  docs
    .filter((doc) => doc.status === "active")
    .forEach((doc) => {
      doc.chunks.forEach((chunk) => {
        const score = chunk.keywords.reduce(
          (sum, keyword) => (question.toLowerCase().includes(keyword.toLowerCase()) ? sum + keyword.length : sum),
          0
        )
        if (score > 0) hits.push({ doc, chunk, score })
      })
    })
  hits.sort((a, b) => b.score - a.score)
  const top = hits.slice(0, 3)
  const maxScore = top[0]?.score || 1
  return top.map((hit) => ({ ...hit, relevance: Math.min(98, Math.round((hit.score / maxScore) * 34 + 58)) }))
}

function buildAnswer(hits) {
  if (hits.length === 0) {
    return "目前知識庫中沒有找到與這個問題相關的內容，我不會憑空回答。建議補充文件到知識庫，或改問報價、施工流程、保固等主題。"
  }
  const body = hits.map((hit) => hit.chunk.text).join("")
  return `根據知識庫文件：${body}`
}

function RagConsultant() {
  const [docs, setDocs] = useState(initialDocs)
  const [selectedDocId, setSelectedDocId] = useState(initialDocs[0].id)
  const [uploadIndex, setUploadIndex] = useState(0)
  const [ingesting, setIngesting] = useState(null)
  const [question, setQuestion] = useState("")
  const [conversation, setConversation] = useState([])
  const [phase, setPhase] = useState("idle")
  const [usage, setUsage] = useState({ prompt: 0, completion: 0, queries: 0 })
  const [lastUsage, setLastUsage] = useState(null)
  const [chatTimestamps, setChatTimestamps] = useState([])
  const [uploadCount, setUploadCount] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const chatEndRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const timers = timersRef.current
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [conversation, phase])

  function later(fn, ms) {
    timersRef.current.push(window.setTimeout(fn, ms))
  }

  const selectedDoc = docs.find((doc) => doc.id === selectedDocId) || docs[0]
  const activeCount = docs.filter((doc) => doc.status === "active").length
  const chatUsed = chatTimestamps.filter((time) => now - time < 60_000).length
  const rateLimited = chatUsed >= CHAT_LIMIT
  const totalCost = (usage.prompt * 0.003 + usage.completion * 0.015) / 1000
  const totalCostTwd = totalCost * 32.5

  function askQuestion(rawQuestion) {
    const text = rawQuestion.trim()
    if (!text || phase !== "idle") return
    if (rateLimited) {
      setConversation((current) => [
        ...current,
        { role: "system", text: "429 Too Many Requests：已達每分鐘 30 次配額，請稍候再試。" },
      ])
      return
    }

    setQuestion("")
    setChatTimestamps((current) => [...current.filter((time) => Date.now() - time < 60_000), Date.now()])
    setConversation((current) => [...current, { role: "user", text }])
    setPhase("embedding")

    later(() => setPhase("searching"), 450)
    later(() => setPhase("generating"), 1000)
    later(() => {
      const hits = retrieve(text, docs)
      const answer = buildAnswer(hits)
      const prompt = 320 + estimateTokens(text) + hits.reduce((sum, hit) => sum + estimateTokens(hit.chunk.text), 0)
      const completion = estimateTokens(answer)
      setConversation((current) => [
        ...current,
        {
          role: "assistant",
          text: answer,
          latencyMs: 1650 + Math.round(Math.random() * 240),
          citations: hits.map((hit) => ({
            docId: hit.doc.id,
            relevance: hit.relevance,
            label: `${hit.doc.name} · v${hit.doc.version} · chunk ${hit.chunk.id}`,
          })),
          grounded: hits.length > 0,
        },
      ])
      setUsage((current) => ({
        prompt: current.prompt + prompt,
        completion: current.completion + completion,
        queries: current.queries + 1,
      }))
      setLastUsage({ prompt, completion })
      setPhase("idle")
    }, 1650)
  }

  function clearConversation() {
    setConversation([])
  }

  function uploadDocument() {
    if (ingesting || uploadIndex >= uploadQueue.length) return
    const doc = uploadQueue[uploadIndex]
    setUploadCount((current) => current + 1)
    setIngesting({ name: doc.name, stage: "chunking" })
    later(() => setIngesting({ name: doc.name, stage: "embedding" }), 700)
    later(() => setIngesting({ name: doc.name, stage: "indexing" }), 1400)
    later(() => {
      setDocs((current) => [...current, doc])
      setSelectedDocId(doc.id)
      setIngesting(null)
      setUploadIndex((current) => current + 1)
    }, 2100)
  }

  function uploadNewVersion(docId) {
    if (ingesting) return
    const target = docs.find((doc) => doc.id === docId)
    if (!target) return
    setUploadCount((current) => current + 1)
    setIngesting({ name: target.name, stage: "chunking" })
    later(() => setIngesting({ name: target.name, stage: "embedding" }), 600)
    later(() => {
      setDocs((current) =>
        current.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                version: doc.version + 1,
                versions: [...doc.versions, { v: doc.version + 1, date: "今天", note: "內容更新後重新索引" }],
              }
            : doc
        )
      )
      setIngesting(null)
    }, 1300)
  }

  function rollbackVersion(docId) {
    setDocs((current) =>
      current.map((doc) => {
        if (doc.id !== docId || doc.version <= 1) return doc
        const previous = doc.version - 1
        return {
          ...doc,
          version: previous,
          versions: [...doc.versions, { v: previous, date: "今天", note: `還原至 v${previous}，舊向量重新啟用` }],
        }
      })
    )
  }

  function toggleDocStatus(docId) {
    setDocs((current) =>
      current.map((doc) =>
        doc.id === docId ? { ...doc, status: doc.status === "active" ? "archived" : "active" } : doc
      )
    )
  }

  const phaseLabel = {
    embedding: "Embedding：把問題轉成向量⋯",
    searching: `Retrieval：在 ${activeCount} 份 active 文件中做語意搜尋⋯`,
    generating: "Generation：依引用來源組合回答⋯",
  }[phase]

  const engineeringCards = useMemo(
    () => [
      {
        title: "Token Usage",
        rows: [
          ["Prompt tokens", lastUsage ? String(lastUsage.prompt) : "—"],
          ["Completion tokens", lastUsage ? String(lastUsage.completion) : "—"],
          ["Total（累計）", String(usage.prompt + usage.completion)],
          ["Estimated cost", formatUsd(totalCost)],
        ],
      },
      {
        title: "Rate Limit",
        rows: [
          ["/chat", `${chatUsed} / ${CHAT_LIMIT} requests per minute`],
          ["/documents", `${uploadCount} / ${UPLOAD_LIMIT} uploads per hour`],
          ["Status", rateLimited ? "Throttled" : "Healthy"],
          ["Retry-after", rateLimited ? "60s" : "none"],
        ],
      },
      {
        title: "Document Version",
        rows: [
          ["Current document", selectedDoc.name],
          ["Current version", `v${selectedDoc.version}`],
          ["Version history", `${selectedDoc.versions.length} 筆`],
          ["Search policy", "active version only"],
        ],
      },
    ],
    [lastUsage, usage, totalCost, chatUsed, uploadCount, rateLimited, selectedDoc]
  )

  return (
    <main className="min-h-screen bg-[#f3efe7] text-[#14201f]">
      <Seo
        page={{
          path: "/works/rag-consultant",
          title: "RAG 企業顧問｜文件知識庫、引用回答與聊天 Widget｜Qingyu Web Studio",
          description: "可操作的 RAG 企業顧問系統展示，包含文件上傳、版本管理、向量搜尋、引用回答、租戶配額與用量 metrics。",
        }}
      />

      <header className="sticky top-0 z-40 border-b border-white/45 bg-[#f3efe7]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-7">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#14201f] text-sm font-black text-[#eac46f]">R</span>
            <div>
              <p className="font-serif text-xl font-black leading-none">RAG 企業顧問</p>
              <p className="mt-1 text-xs font-black text-[#68716b]">文件知識庫 · 引用回答 · Widget</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <a href="#demo" className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#14201f]">系統</a>
            <a href="#engine" className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#14201f]">Engine</a>
            <Link to="/contact" className="rounded-xl bg-[#14201f] px-4 py-2 text-sm font-black text-white">聯絡我</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(211,142,79,0.22),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(41,82,75,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-7 md:py-14">
          <section className="rounded-[2rem] border border-white/60 bg-white/58 p-6 shadow-2xl shadow-[#3e2b1e]/10 backdrop-blur-xl md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[#bf6536]">Enterprise RAG OS</p>
                <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.4rem)] font-black leading-[0.95]">
                  企業文件，
                  <br />
                  變成可問答顧問。
                </h1>
                <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-[#59635d] md:text-base">
                  把內部文件、SOP、FAQ 建成知識庫，讓員工或客戶用聊天方式查答案，並保留引用來源。下方系統可以直接操作。
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href="#demo" className="inline-flex min-h-12 items-center rounded-xl bg-[#14201f] px-5 text-sm font-black text-white">
                  直接操作系統
                </a>
                <a href="#engine" className="inline-flex min-h-12 items-center rounded-xl border border-[#d7cbbb] bg-white px-5 text-sm font-black text-[#14201f]">
                  看引擎架構
                </a>
              </div>
            </div>
          </section>

          <section id="demo" className="scroll-mt-24 rounded-[2rem] border border-white/60 bg-[#14201f] p-4 text-white shadow-2xl shadow-[#14201f]/20 md:p-5">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#eac46f]">RAG SaaS Dashboard</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-white/76">Live Simulation · 可直接操作</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl font-black md:text-4xl">企業知識庫問答中控台</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#engine" className="inline-flex min-h-11 items-center rounded-xl bg-white px-4 text-sm font-black text-[#14201f]">
                  查看架構
                </a>
                <Link to="/contact" className="inline-flex min-h-11 items-center rounded-xl bg-[#eac46f] px-4 text-sm font-black text-[#14201f]">
                  聯絡我做類似系統
                </Link>
              </div>
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-[0.95fr_1.25fr_0.95fr]">
              <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#eac46f]">Knowledge Base</p>
                    <h3 className="mt-1 text-xl font-black">文件列表</h3>
                  </div>
                  <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-[11px] font-black text-[#2f6234]">{activeCount} active</span>
                </div>

                <div className="mt-5 grid gap-3">
                  {docs.map((doc) => {
                    const isSelected = doc.id === selectedDocId
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`rounded-2xl border p-3 text-left transition ${
                          isSelected ? "border-[#eac46f]/70 bg-[#eac46f]/12" : "border-white/10 bg-black/16 hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-black leading-5">{doc.name}</p>
                          <span className="rounded-full bg-[#eac46f]/16 px-2.5 py-1 font-mono text-[11px] font-black text-[#eac46f]">
                            v{doc.version}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-white/70">
                            {doc.chunks.length} chunks
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-black ${
                              doc.status === "active" ? "bg-[#e9f2e9] text-[#2f6234]" : "bg-white/10 text-white/55"
                            }`}
                          >
                            {doc.status === "active" ? "Active" : "Archived"}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {ingesting ? (
                  <div className="mt-3 rounded-2xl border border-[#eac46f]/40 bg-[#eac46f]/10 p-3">
                    <p className="text-xs font-black text-[#eac46f]">Ingestion Pipeline</p>
                    <p className="mt-1 truncate text-sm font-black">{ingesting.name}</p>
                    <div className="mt-3 flex gap-2">
                      {["chunking", "embedding", "indexing"].map((stage) => {
                        const order = ["chunking", "embedding", "indexing"]
                        const done = order.indexOf(stage) < order.indexOf(ingesting.stage)
                        const current = stage === ingesting.stage
                        return (
                          <span
                            key={stage}
                            className={`rounded-full px-3 py-1 font-mono text-[11px] font-black ${
                              current ? "animate-pulse bg-[#eac46f] text-[#14201f]" : done ? "bg-[#e9f2e9] text-[#2f6234]" : "bg-white/10 text-white/45"
                            }`}
                          >
                            {stage}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={uploadDocument}
                    disabled={uploadIndex >= uploadQueue.length}
                    className="mt-3 min-h-11 w-full rounded-2xl border border-dashed border-white/25 text-sm font-black text-white/80 transition hover:border-[#eac46f]/60 hover:text-[#eac46f] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {uploadIndex >= uploadQueue.length ? "範例文件已全部上傳" : `+ 上傳文件（${uploadQueue[uploadIndex].name}）`}
                  </button>
                )}

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/16 p-3">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#eac46f]">Selected Document</p>
                  <p className="mt-2 text-sm font-black">{selectedDoc.name}</p>
                  <div className="mt-3 grid max-h-32 gap-1.5 overflow-y-auto pr-1">
                    {selectedDoc.chunks.map((chunk) => (
                      <div key={chunk.id} className="rounded-lg bg-white/6 px-2.5 py-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-black text-[#eac46f]">chunk {chunk.id}</span>
                          <span className="text-[9px] font-bold text-white/38">{chunk.text.length} 字</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-[11px] font-bold leading-4 text-white/60">{chunk.text}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#eac46f]">Version History</p>
                  <div className="mt-2 grid max-h-24 gap-1.5 overflow-y-auto pr-1">
                    {[...selectedDoc.versions].reverse().map((entry, index) => (
                      <div key={`${entry.v}-${index}`} className="flex items-center justify-between gap-2 rounded-lg bg-white/6 px-2.5 py-1.5">
                        <span className="font-mono text-[11px] font-black text-[#eac46f]">v{entry.v}</span>
                        <span className="flex-1 truncate text-[11px] font-bold text-white/60">{entry.note}</span>
                        <span className="text-[10px] font-bold text-white/40">{entry.date}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => uploadNewVersion(selectedDoc.id)}
                      disabled={Boolean(ingesting)}
                      className="min-h-9 rounded-lg bg-white/10 px-3 text-[12px] font-black text-white/85 transition hover:bg-white/20 disabled:opacity-40"
                    >
                      上傳新版本
                    </button>
                    <button
                      type="button"
                      onClick={() => rollbackVersion(selectedDoc.id)}
                      disabled={selectedDoc.version <= 1}
                      className="min-h-9 rounded-lg bg-white/10 px-3 text-[12px] font-black text-white/85 transition hover:bg-white/20 disabled:opacity-40"
                    >
                      還原上一版
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleDocStatus(selectedDoc.id)}
                      className="min-h-9 rounded-lg bg-white/10 px-3 text-[12px] font-black text-white/85 transition hover:bg-white/20"
                    >
                      {selectedDoc.status === "active" ? "封存（移出檢索）" : "重新啟用"}
                    </button>
                  </div>
                </div>
              </section>

              <section className="flex flex-col rounded-[1.5rem] border border-white/70 bg-white p-4 text-[#14201f] shadow-xl shadow-black/10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#bf6536]">RAG AI</p>
                    <h3 className="mt-1 text-2xl font-black">問答介面</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#f3efe7] px-3 py-1 text-[11px] font-black text-[#59635d]">引用回答 · 沒有依據就說不知道</span>
                    {conversation.length > 0 ? (
                      <button
                        type="button"
                        onClick={clearConversation}
                        className="rounded-full border border-[#d7cbbb] px-3 py-1 text-[11px] font-black text-[#8a7c6d] transition hover:border-[#bf6536] hover:text-[#bf6536]"
                      >
                        清除對話
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="mt-4 grid max-h-[26rem] min-h-[16rem] content-start gap-3 overflow-y-auto pr-1">
                  {conversation.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#d7cbbb] bg-[#fdfbf7] p-4">
                      <p className="text-sm font-black text-[#8a7c6d]">試著問知識庫一個問題</p>
                      <p className="mt-2 text-sm font-bold leading-6 text-[#59635d]">
                        回答只會根據左側 Active 文件產生，並附上引用來源。把文件封存後再問同一題，可以看到回答跟著改變。
                      </p>
                    </div>
                  ) : null}
                  {conversation.map((message, index) => {
                    if (message.role === "user") {
                      return (
                        <div key={index} className="justify-self-end rounded-2xl rounded-tr-md bg-[#14201f] px-4 py-3 text-sm font-bold leading-6 text-white">
                          {message.text}
                        </div>
                      )
                    }
                    if (message.role === "system") {
                      return (
                        <div key={index} className="rounded-2xl border border-[#e5b6a0] bg-[#fff1e8] px-4 py-3 font-mono text-[12px] font-black text-[#b44d24]">
                          {message.text}
                        </div>
                      )
                    }
                    const isLatest = index === conversation.length - 1
                    return (
                      <div key={index} className="rounded-2xl rounded-tl-md bg-[#f3efe7] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#bf6536]">Answer</p>
                            {message.latencyMs ? (
                              <span className="font-mono text-[10px] font-black text-[#8a7c6d]">{(message.latencyMs / 1000).toFixed(2)}s</span>
                            ) : null}
                          </div>
                          <span className={`rounded-full px-3 py-1 text-[11px] font-black ${message.grounded ? "bg-[#e9f2e9] text-[#2f6234]" : "bg-white text-[#b44d24]"}`}>
                            {message.grounded ? "Grounded" : "No source"}
                          </span>
                        </div>
                        <div className="mt-3 text-sm font-bold leading-7 text-[#34403c]">
                          {isLatest ? <Typewriter text={message.text} /> : message.text}
                        </div>
                        {message.citations?.length ? (
                          <div className="mt-3">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a7c6d]">Citations</p>
                            <div className="mt-2 grid gap-2">
                              {message.citations.map((citation) => (
                                <button
                                  key={citation.label}
                                  type="button"
                                  onClick={() => setSelectedDocId(citation.docId)}
                                  className="flex items-center justify-between gap-2 rounded-xl border border-[#d7cbbb] bg-white px-3 py-2 text-left font-mono text-[12px] font-black text-[#59635d] transition hover:border-[#bf6536] hover:text-[#bf6536]"
                                >
                                  <span className="truncate">{citation.label}</span>
                                  {citation.relevance ? (
                                    <span className="shrink-0 rounded-full bg-[#e9f2e9] px-2 py-0.5 text-[10px] text-[#2f6234]">{citation.relevance}%</span>
                                  ) : null}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                  {phase !== "idle" ? (
                    <div className="rounded-2xl bg-[#f3efe7] px-4 py-3 font-mono text-[12px] font-black text-[#bf6536]">
                      <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#bf6536]" />
                      {phaseLabel}
                    </div>
                  ) : null}
                  <div ref={chatEndRef} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestedQuestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => askQuestion(item)}
                      disabled={phase !== "idle"}
                      className="rounded-full border border-[#d7cbbb] bg-[#fdfbf7] px-3 py-1.5 text-[12px] font-black text-[#59635d] transition hover:border-[#bf6536] hover:text-[#bf6536] disabled:opacity-45"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <form
                  className="mt-3 flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault()
                    askQuestion(question)
                  }}
                >
                  <input
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="輸入問題，例如：油漆工程怎麼估價？"
                    className="min-h-12 flex-1 rounded-xl border border-[#d7cbbb] bg-[#fdfbf7] px-4 text-sm font-bold text-[#14201f] outline-none transition focus:border-[#bf6536]"
                  />
                  <button
                    type="submit"
                    disabled={phase !== "idle" || !question.trim()}
                    className="min-h-12 rounded-xl bg-[#14201f] px-5 text-sm font-black text-white transition hover:bg-[#22332f] disabled:opacity-45"
                  >
                    送出
                  </button>
                </form>
              </section>

              <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#eac46f]">Engineering Panel</p>
                    <h3 className="mt-1 text-xl font-black">工程監控</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-black ${rateLimited ? "bg-[#fff1e8] text-[#b44d24]" : "bg-[#e9f2e9] text-[#2f6234]"}`}>
                    {rateLimited ? "Throttled" : "Healthy"}
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  {engineeringCards.map((card) => (
                    <EngineeringCard key={card.title} title={card.title} rows={card.rows} />
                  ))}
                </div>
                <div className="mt-3 rounded-2xl border border-white/10 bg-black/16 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-black">Queries</h4>
                    <span className="font-mono text-2xl font-black text-[#eac46f]">{usage.queries}</span>
                  </div>
                  <p className="mt-2 text-[11px] font-bold leading-5 text-white/50">
                    每次提問都會累計 token 與費用，這裡的數字全部由左側操作即時產生。
                  </p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>

      <section id="engine" className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:px-7 lg:grid-cols-[1fr_0.82fr]">
        <section className="rounded-[2rem] border border-[#d7cbbb] bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#bf6536]">Engine Modules</p>
          <h2 className="mt-2 font-serif text-4xl font-black">已放入的 RAG 引擎</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {modules.map(([title, text, status]) => (
              <article key={title} className="rounded-2xl border border-[#e4d9ca] bg-[#faf7f1] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-black">{title}</h3>
                  <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-[11px] font-black text-[#2f6234]">{status}</span>
                </div>
                <p className="mt-2 text-sm font-bold leading-6 text-[#59635d]">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6">
          <div className="rounded-[2rem] border border-[#d7cbbb] bg-[#14201f] p-5 text-white shadow-xl shadow-[#14201f]/12">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#eac46f]">Auth Design</p>
            <h2 className="mt-2 font-serif text-3xl font-black">企業權限層</h2>
            <div className="mt-5 grid gap-3">
              {security.map(([title, text, tag]) => (
                <div key={title} className="rounded-2xl bg-white/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black">{title}</p>
                    <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-black text-[#eac46f]">{tag}</span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-white/62">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d7cbbb] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#bf6536]">Token Billing</p>
            <h2 className="mt-2 font-serif text-3xl font-black">依用量估價</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-[#59635d]">
              問答時記錄 input / output tokens，自動換算成本。下方數字會跟著上面系統的提問即時累計。
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniStat label="Input tokens" value={usage.prompt.toLocaleString("en-US")} />
              <MiniStat label="Output tokens" value={usage.completion.toLocaleString("en-US")} />
              <MiniStat label="估算費用" value={`NT$${totalCostTwd.toFixed(2)}`} />
            </div>
            <div className="mt-4 rounded-2xl bg-[#f3efe7] p-4">
              <p className="text-xs font-black text-[#bf6536]">Billing API</p>
              <p className="mt-2 font-mono text-sm font-black text-[#14201f]">GET /metrics/billing</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d7cbbb] bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#bf6536]">Production Ready</p>
            <h2 className="mt-2 font-serif text-3xl font-black">RAG 展示已收尾</h2>
            <div className="mt-4 grid gap-2">
              {productionReady.map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-[#f3efe7] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-[#14201f]">{title}</p>
                    <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-[11px] font-black text-[#2f6234]">完成</span>
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#59635d]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-7">
        <div className="rounded-[2rem] border border-[#d7cbbb] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#bf6536]">Imported Files</p>
              <h2 className="mt-2 font-serif text-3xl font-black">原始碼已放入 repo</h2>
            </div>
            <Link to="/contact" className="inline-flex min-h-11 w-fit items-center rounded-xl bg-[#14201f] px-5 text-sm font-black text-white">
              我想做企業知識庫
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {sourceFiles.map((item) => (
              <span key={item} className="rounded-xl bg-[#f3efe7] px-3 py-2 text-xs font-black text-[#59635d]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function Typewriter({ text }) {
  const [length, setLength] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          window.clearInterval(timer)
          return current
        }
        return current + 2
      })
    }, 18)
    return () => window.clearInterval(timer)
  }, [text])

  const done = length >= text.length
  return (
    <span>
      {text.slice(0, length)}
      {!done ? <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-[#bf6536] align-middle" /> : null}
    </span>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#d7cbbb] bg-white p-3">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8a7c6d]">{label}</p>
      <p className="mt-1 text-lg font-black text-[#14201f]">{value}</p>
    </div>
  )
}

function EngineeringCard({ title, rows }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-black/16 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-black">{title}</h4>
        <span className="h-2.5 w-2.5 rounded-full bg-[#eac46f]" />
      </div>
      <div className="mt-3 grid gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-3 border-t border-white/10 pt-2 first:border-t-0 first:pt-0">
            <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white/45">{label}</span>
            <span className="max-w-[11rem] text-right font-mono text-[12px] font-black leading-5 text-white/88">{value}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default RagConsultant
