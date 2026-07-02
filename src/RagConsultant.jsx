import { Link } from "react-router-dom"
import Seo from "./site/Seo"

const modules = [
  ["Ingestion", "txt / pdf / docx 上傳", "已具備"],
  ["Chunking", "遞迴切分 + overlap", "已具備"],
  ["Embedding", "本地版，可換雲端模型", "已具備"],
  ["Retrieval", "多租戶語意搜尋", "已具備"],
  ["Generation", "引用來源回答", "已具備"],
  ["Widget", "可嵌入網站的聊天元件", "已具備"],
]

const flow = [
  ["01", "上傳文件", "合約、SOP、FAQ、內訓資料。"],
  ["02", "建立索引", "切片、向量化、寫入知識庫。"],
  ["03", "員工提問", "Widget 取得短期 JWT 後問答。"],
  ["04", "引用回答", "回覆附來源，降低亂答風險。"],
]

const security = [
  ["API Key", "後端服務用", "長期，可撤銷"],
  ["Widget JWT", "瀏覽器問答用", "短期 15 分鐘"],
  ["Tenant ID", "租戶隔離", "由 token 解析"],
]

const roadmap = [
  "依 token 用量計費",
  "API Key rate limiting",
  "文件版本管理",
]

const sourceFiles = [
  "main.py",
  "auth/api_keys.py",
  "auth/jwt_tokens.py",
  "chunking",
  "embedding",
  "retrieval",
  "vectorstore",
  "metrics",
  "widget/qingyu-widget.js",
]

function RagConsultant() {
  return (
    <main className="min-h-screen bg-[#f3efe7] text-[#14201f]">
      <Seo
        page={{
          path: "/works/rag-consultant",
          title: "RAG 企業顧問｜文件知識庫、引用回答與聊天 Widget Demo｜Qingyu Web Studio",
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
            <a href="#demo" className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#14201f]">Demo</a>
            <a href="#engine" className="rounded-xl bg-white px-4 py-2 text-sm font-black text-[#14201f]">Engine</a>
            <Link to="/contact" className="rounded-xl bg-[#14201f] px-4 py-2 text-sm font-black text-white">聯絡我</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(211,142,79,0.22),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(41,82,75,0.18),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-7 md:py-14">
          <section className="rounded-[2rem] border border-white/60 bg-white/58 p-6 shadow-2xl shadow-[#3e2b1e]/10 backdrop-blur-xl md:p-8">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-[#bf6536]">Enterprise RAG OS</p>
            <h1 className="mt-5 font-serif text-[clamp(2.5rem,7vw,5.4rem)] font-black leading-[0.95]">
              企業文件，
              <br />
              變成可問答顧問。
            </h1>
            <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-[#59635d] md:text-base">
              把內部文件、SOP、FAQ 建成知識庫，讓員工或客戶用聊天方式查答案，並保留引用來源。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#demo" className="inline-flex min-h-12 items-center rounded-xl bg-[#14201f] px-5 text-sm font-black text-white">
                查看 Demo
              </a>
              <a href="#engine" className="inline-flex min-h-12 items-center rounded-xl border border-[#d7cbbb] bg-white px-5 text-sm font-black text-[#14201f]">
                看引擎架構
              </a>
            </div>
          </section>

          <section id="demo" className="scroll-mt-24 rounded-[2rem] border border-white/60 bg-[#14201f] p-5 text-white shadow-2xl shadow-[#14201f]/20">
            <div className="grid gap-4 lg:grid-cols-[0.72fr_1fr]">
              <div className="rounded-[1.5rem] bg-white/9 p-4">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#eac46f]">Knowledge Base</p>
                <h2 className="mt-2 font-serif text-3xl font-black">文件處理管線</h2>
                <div className="mt-4 grid gap-2">
                  {flow.map(([no, title, text]) => (
                    <div key={no} className="grid grid-cols-[2.6rem_1fr] gap-3 rounded-2xl bg-white/10 p-3">
                      <span className="font-mono text-xs font-black text-[#eac46f]">{no}</span>
                      <div>
                        <p className="text-sm font-black">{title}</p>
                        <p className="mt-1 text-xs font-bold text-white/58">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-white p-4 text-[#14201f]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-[#bf6536]">企業顧問 Widget</p>
                    <h3 className="mt-1 text-2xl font-black">合約付款條件怎麼查？</h3>
                  </div>
                  <span className="rounded-full bg-[#e9f2e9] px-3 py-1 text-xs font-black text-[#2f6234]">JWT 15 min</span>
                </div>
                <div className="mt-4 rounded-2xl bg-[#f3efe7] p-4">
                  <p className="text-sm font-bold leading-7">
                    依目前上傳的「採購合約 SOP」與「付款規範」，一般付款條件為驗收後 30 天。若金額超過 NT$300,000，需由主管簽核。
                  </p>
                  <div className="mt-4 grid gap-2">
                    {["採購合約 SOP.pdf · p.8", "付款規範.docx · section 3", "主管簽核規則.txt"].map((item) => (
                      <div key={item} className="rounded-xl border border-[#d7cbbb] bg-white px-3 py-2 text-xs font-black text-[#59635d]">
                        引用：{item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MiniStat label="indexed chunks" value="1,284" />
                  <MiniStat label="avg latency" value="812ms" />
                  <MiniStat label="tenant" value="isolated" />
                </div>
              </div>
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
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#bf6536]">Roadmap</p>
            <h2 className="mt-2 font-serif text-3xl font-black">下一階段</h2>
            <div className="mt-4 grid gap-2">
              {roadmap.map((item) => (
                <div key={item} className="rounded-2xl bg-[#f3efe7] px-4 py-3 text-sm font-black text-[#59635d]">
                  尚未實作：{item}
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
                rag-engine/qingyu-rag/{item}
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

export default RagConsultant
