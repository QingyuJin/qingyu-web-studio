import { useMemo, useState } from "react"
import AiToolModal from "./ai-tools/AiToolModal"
import ExamCraftTool from "./ai-tools/ExamCraftTool"
import SeedlingVisionTool from "./ai-tools/SeedlingVisionTool"
import StockTrendLabTool from "./ai-tools/StockTrendLabTool"
import { aiToolsDemoContent } from "../data/aiToolsDemoContent"

const toolIds = {
  seedling: "seedling",
  exam: "exam",
  stock: "stock",
}

function AiToolsSection() {
  const { seedlingVision, examCraft, stockTrendLab } = aiToolsDemoContent
  const [activeTool, setActiveTool] = useState("")

  const tools = useMemo(
    () => [
      {
        id: toolIds.seedling,
        data: seedlingVision,
        cta: "開始分類 Demo",
        preview: <SeedlingPreview data={seedlingVision} />,
        panel: <SeedlingVisionTool data={seedlingVision} />,
      },
      {
        id: toolIds.exam,
        data: examCraft,
        cta: "產生題庫草稿",
        preview: <ExamPreview data={examCraft} />,
        panel: <ExamCraftTool data={examCraft} />,
        featured: true,
      },
      {
        id: toolIds.stock,
        data: stockTrendLab,
        cta: "分析 CSV Demo",
        preview: <StockPreview data={stockTrendLab} />,
        panel: <StockTrendLabTool data={stockTrendLab} />,
      },
    ],
    [examCraft, seedlingVision, stockTrendLab],
  )

  const activeToolConfig = tools.find((tool) => tool.id === activeTool)

  return (
    <section id="ai-projects" className="border-y border-[#dedbd1] bg-[#111f24] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#83d4c8]">AI Tools</p>
            <h2 className="mt-3 text-[clamp(1.75rem,7vw,2.25rem)] font-black tracking-tight md:text-4xl">AI 工具實驗室</h2>
          </div>
          <p className="max-w-2xl text-sm font-bold leading-7 text-white/72 lg:justify-self-end">
            把圖片、PDF、CSV 變成可理解的分類、題庫與分析報告。
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Client-only MVP", "Mock workflow", "No AI API", "不會上傳檔案"].map((item) => (
            <span key={item} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-black text-white/80">
              {item}
            </span>
          ))}
        </div>

        <p className="mt-4 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-black leading-6 text-white/78">
          Demo 版只在瀏覽器本機處理，不會上傳檔案。
        </p>

        <div className="mt-6 grid gap-4 md:mt-8 xl:grid-cols-3">
          {tools.map((tool) => (
            <AiToolCard key={tool.id} tool={tool} onOpen={() => setActiveTool(tool.id)} />
          ))}
        </div>
      </div>

      <AiToolModal title={activeToolConfig?.data.name || ""} open={Boolean(activeToolConfig)} onClose={() => setActiveTool("")}>
        {activeToolConfig?.panel}
      </AiToolModal>
    </section>
  )
}

function AiToolCard({ tool, onOpen }) {
  const { data } = tool

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen()
        }
      }}
      className={`grid min-w-0 cursor-pointer overflow-hidden rounded-[1.35rem] border bg-[#f8f7f2] text-[#172026] shadow-xl shadow-black/18 transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#83d4c8]/20 ${
        tool.featured ? "border-[#83d4c8] shadow-[#83d4c8]/10" : "border-white/16"
      }`}
    >
      <div className={`border-b p-4 md:p-5 ${tool.featured ? "border-[#263943] bg-[#172026] text-white" : "border-[#e5e1d7] bg-[#f8f7f2]"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={`text-xs font-black uppercase tracking-[0.18em] ${tool.featured ? "text-[#83d4c8]" : "text-[#0f766e]"}`}>
              {data.name}
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight">{data.positioning}</h3>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-black ${tool.featured ? "bg-white/12 text-[#f0c36a]" : "bg-[#eef7f4] text-[#0f766e]"}`}>
            {data.status}
          </span>
        </div>
        <p className={`mt-3 text-sm font-bold leading-6 ${tool.featured ? "text-white/75" : "text-[#5d6863]"}`}>{data.description}</p>
      </div>

      <div className="grid gap-3 p-4 md:gap-4 md:p-5">
        <DemoStageRail />
        {tool.preview}
        <WorkflowStrip items={tool.data.workflow.slice(0, 3)} />
        <div className="flex flex-wrap gap-2">
          {data.tech.map((item) => (
            <span key={item} className="rounded-lg bg-[#172026] px-2.5 py-1 text-[0.68rem] font-black text-white">
              {item}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onOpen()
          }}
          className="min-h-11 rounded-xl bg-[#172026] px-4 text-sm font-black text-white transition hover:bg-[#27404a]"
        >
          {tool.cta}
        </button>
      </div>
    </article>
  )
}

function DemoStageRail() {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#e5e1d7] bg-[#fbfaf6] p-2">
      {["Input", "Process", "Result"].map((item, index) => (
        <div key={item} className="rounded-xl bg-white px-2 py-2 text-center">
          <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-[#172026] text-[0.65rem] font-black text-[#f0c36a]">
            {index + 1}
          </span>
          <p className="mt-1 text-[0.68rem] font-black text-[#40514f]">{item}</p>
        </div>
      ))}
    </div>
  )
}

function WorkflowStrip({ items }) {
  return (
    <div className="rounded-2xl border border-[#e5e1d7] bg-[#fbfaf6] p-3">
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, index) => (
          <div key={item} className="min-w-0 rounded-xl bg-white px-2.5 py-2 text-center">
            <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-[#eef7f4] text-[0.65rem] font-black text-[#0f766e]">
              {index + 1}
            </span>
            <p className="mt-1 truncate text-[0.68rem] font-black text-[#40514f]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SeedlingPreview({ data }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr] xl:grid-cols-1">
      <div className="relative overflow-hidden rounded-2xl border border-[#c7d8d2] bg-[#eef7f4]">
        <img src={data.sampleImage} alt="SeedlingVision sample" className="h-44 w-full object-cover sm:h-full xl:h-48" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-[#0f766e]">sample preview</span>
        <span className="absolute bottom-3 right-3 rounded-full bg-[#172026]/88 px-3 py-1 text-xs font-black text-white">Input image</span>
      </div>
      <div className="rounded-2xl border border-[#e5e1d7] bg-[#fbfaf6] p-3 md:p-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">Result</p>
            <p className="mt-1 text-xl font-black text-[#172026]">{data.result.label} {data.result.confidence}%</p>
          </div>
          <p className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-800">Mock AI</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#dfe7e3]">
          <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${data.result.confidence}%` }} />
        </div>
        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[#66716d]">Top-3 classes</p>
        <div className="mt-3 grid gap-2">
          {data.topClasses.map((item) => (
            <ScoreRow key={item.label} label={item.label} value={item.score} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[0.68rem] font-black text-[#40514f]">
          <span className="rounded-xl bg-white px-3 py-2">人工複查</span>
          <span className="rounded-xl bg-white px-3 py-2">品質標註</span>
        </div>
      </div>
    </div>
  )
}

function ExamPreview({ data }) {
  const question = data.questionTypes[0]

  return (
    <div className="grid gap-3">
      <div className="rounded-2xl border border-[#e5e1d7] bg-[#fbfaf6] p-3 md:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-black text-[#172026]">PDF parsing {data.parsing.progress}%</p>
          <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">{data.parsing.progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#dfe7e3]">
          <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${data.parsing.progress}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-[#40514f]">
          <span className="rounded-full bg-white px-3 py-1">{data.parsing.pages} pages</span>
          <span className="rounded-full bg-white px-3 py-1">{data.parsing.chunks} chunks</span>
        </div>
      </div>
      <div className="rounded-2xl border border-[#e5e1d7] bg-white p-3 md:p-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {data.questionTypes.map((item) => (
            <span key={item.id} className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${item.id === "single" ? "bg-[#0f766e] text-white" : "bg-[#eef7f4] text-[#0f766e]"}`}>
              {item.label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm font-black leading-6 text-[#172026]">{question.title}</p>
        <div className="mt-3 grid gap-2">
          {question.options.slice(0, 2).map((option) => (
            <p key={option} className="rounded-xl bg-[#f8f7f2] px-3 py-2 text-xs font-bold text-[#40514f]">
              {option}
            </p>
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-800">
          可人工修改：題幹、選項、答案
        </p>
      </div>
    </div>
  )
}

function StockPreview({ data }) {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Metric label="CSV" value="120 rows" />
        <Metric label="Columns" value="8 columns" />
      </div>
      <div className="rounded-2xl border border-[#e5e1d7] bg-[#10242a] p-3 text-white md:p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-black">Accuracy 79.26%</p>
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black text-[#f0c36a]">AdaBoost</span>
        </div>
        <div className="mt-4 grid gap-3">
          {data.modelResults.map((item) => (
            <div key={item.estimators} className="grid grid-cols-[88px_minmax(0,1fr)_48px] items-center gap-2 text-xs font-black text-white/75">
              <span>n = {item.estimators}</span>
              <span className="h-2 overflow-hidden rounded-full bg-white/12">
                <span className="block h-full rounded-full bg-[#f0c36a]" style={{ width: `${Math.round(item.testAccuracy * 100)}%` }} />
              </span>
              <span className="text-right">{item.testAccuracy.toFixed(4)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-lg bg-amber-400/12 px-3 py-2 text-xs font-black text-amber-100">
          Generalization gap warning
        </p>
      </div>
      <p className="rounded-2xl border border-[#e5e1d7] bg-[#fbfaf6] p-4 text-sm font-bold leading-6 text-[#40514f]">
        {data.conclusion}
      </p>
    </div>
  )
}

function ScoreRow({ label, value }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2">
      <div className="flex items-center justify-between gap-3 text-xs font-black text-[#40514f]">
        <span className="min-w-0 truncate">{label}</span>
        <span className="shrink-0 text-[#0f766e]">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5eee9]">
        <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#e5e1d7] bg-[#fbfaf6] p-4">
      <p className="text-xs font-black text-[#66716d]">{label}</p>
      <p className="mt-1 break-words text-lg font-black text-[#172026]">{value}</p>
    </div>
  )
}

export default AiToolsSection
