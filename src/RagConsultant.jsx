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

const knowledgeBaseDocs = [
  ["報價規則.md", "v2", "Active"],
  ["油漆工程服務說明.md", "v3", "Active"],
  ["施工前注意事項.md", "v1", "Active"],
  ["保固政策.md", "v1", "Active"],
]

const ragCitations = [
  "報價規則.md · v2 · chunk 3",
  "油漆工程服務說明.md · v3 · chunk 1",
  "施工前注意事項.md · v1 · chunk 2",
]

const engineeringCards = [
  {
    title: "Token Usage",
    rows: [
      ["Prompt tokens", "720"],
      ["Completion tokens", "180"],
      ["Total tokens", "900"],
      ["Estimated cost", "$0.0042 USD"],
    ],
  },
  {
    title: "Rate Limit",
    rows: [
      ["/chat", "12 / 30 requests per minute"],
      ["/documents", "3 / 20 uploads per hour"],
      ["Status", "Healthy"],
      ["Retry-after", "none"],
    ],
  },
  {
    title: "Document Version",
    rows: [
      ["Current document", "報價規則.md"],
      ["Current version", "v2"],
      ["Previous version", "v1"],
      ["Search policy", "active version only"],
    ],
  },
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

const billingStats = [
  ["Input tokens", "18,420"],
  ["Output tokens", "3,180"],
  ["估算費用", "NT$2.58"],
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

function RagConsultant() {
  return (
    <main className="min-h-screen bg-[#f3efe7] text-[#14201f]">
      <Seo
        page={{
          path: "/works/rag-consultant",
          title: "RAG 企業顧問｜文件知識庫、引用回答與聊天 Widget｜Qingyu Web Studio",
          description: "RAG 企業顧問系統展示，包含文件上傳、切片、向量搜尋、引用回答、多租戶 API Key、短期 Widget JWT 與用量 metrics。",
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
                  把內部文件、SOP、FAQ 建成知識庫，讓員工或客戶用聊天方式查答案，並保留引用來源。
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href="#demo" className="inline-flex min-h-12 items-center rounded-xl bg-[#14201f] px-5 text-sm font-black text-white">
                  查看系統
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
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-white/76">Prototype / Product Preview</span>
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

            <div className="mt-5 grid gap-4 xl:grid-cols-[0.85fr_1.25fr_1fr]">
              <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#eac46f]">Knowledge Base</p>
                    <h3 className="mt-1 text-xl font-black">文件列表</h3>
                  </div>
                  <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-[11px] font-black text-[#2f6234]">4 active</span>
                </div>
                <div className="mt-5 grid gap-3">
                  {knowledgeBaseDocs.map(([name, version, status]) => (
                    <article key={name} className="rounded-2xl border border-white/10 bg-black/16 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-black leading-5">{name}</p>
                        <span className="rounded-full bg-[#eac46f]/16 px-2.5 py-1 font-mono text-[11px] font-black text-[#eac46f]">{version}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-black text-white/70">markdown</span>
                        <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-[11px] font-black text-[#2f6234]">{status}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-white/70 bg-white p-4 text-[#14201f] shadow-xl shadow-black/10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#bf6536]">RAG AI</p>
                    <h3 className="mt-1 text-2xl font-black">問答介面</h3>
                  </div>
                  <span className="rounded-full bg-[#f3efe7] px-3 py-1 text-[11px] font-black text-[#59635d]">引用回答</span>
                </div>

                <div className="mt-5 rounded-2xl border border-[#e4d9ca] bg-[#fdfbf7] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a7c6d]">Question</p>
                  <p className="mt-2 text-lg font-black">油漆工程怎麼估價？</p>
                </div>

                <div className="mt-4 rounded-2xl bg-[#f3efe7] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#bf6536]">Answer</p>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-[#59635d]">Mock response</span>
                  </div>
                  <p className="mt-3 text-sm font-bold leading-7 text-[#34403c]">
                    根據目前知識庫資料，油漆工程會依照坪數、牆面狀況、是否需要批土、油漆品牌與施工難度估價。若現場有壁癌、漏水或嚴重剝落，可能需要先處理基底，才適合進行油漆施工。
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a7c6d]">Citations</p>
                  <div className="mt-2 grid gap-2">
                    {ragCitations.map((item) => (
                      <div key={item} className="rounded-xl border border-[#d7cbbb] bg-white px-3 py-2 font-mono text-[12px] font-black text-[#59635d]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.08] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#eac46f]">Engineering Panel</p>
                    <h3 className="mt-1 text-xl font-black">工程監控</h3>
                  </div>
                  <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-[11px] font-black text-[#2f6234]">Healthy</span>
                </div>
                <div className="mt-5 grid gap-3">
                  {engineeringCards.map((card) => (
                    <EngineeringCard key={card.title} title={card.title} rows={card.rows} />
                  ))}
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
              問答時記錄 input / output tokens，自動換算成本，可做月結與租戶用量報表。
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {billingStats.map(([label, value]) => (
                <MiniStat key={label} label={label} value={value} />
              ))}
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
