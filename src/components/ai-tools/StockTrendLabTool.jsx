import { useMemo, useState } from "react"
import { analyzeCsvText, createFallbackAnalysis } from "../../lib/ai-tools/stockTrendAnalyzer"

function StockTrendLabTool() {
  const [fileName, setFileName] = useState("Demo ML result fallback")
  const [analysis, setAnalysis] = useState(() => createFallbackAnalysis())
  const [status, setStatus] = useState("使用 fallback demo result")

  const bestResult = useMemo(
    () => analysis.modelResults.reduce((best, item) => (item.testAccuracy > best.testAccuracy ? item : best), analysis.modelResults[0]),
    [analysis.modelResults],
  )

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : ""
      const nextAnalysis = analyzeCsvText(text)
      setAnalysis(nextAnalysis)
      setFileName(file.name)
      setStatus(nextAnalysis.source.includes("fallback") ? "CSV 欄位不足，已切回 demo fallback。" : "CSV 已在瀏覽器完成解析。")
    }
    reader.onerror = () => {
      setAnalysis(createFallbackAnalysis())
      setStatus("CSV 讀取失敗，已切回 demo fallback")
    }
    reader.readAsText(file)
  }

  function handleUseFallback() {
    setAnalysis(createFallbackAnalysis())
    setFileName("Demo ML result fallback")
    setStatus("已載入 demo ML result")
  }

  async function handleCopySummary() {
    try {
      await navigator.clipboard.writeText(analysis.summary)
      setStatus("已複製報告摘要")
    } catch {
      setStatus("瀏覽器未允許複製，請手動選取摘要")
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black text-[#172026]">CSV 匯入</p>
            <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">Client-side CSV analyzer</span>
          </div>
          <label className="mt-4 block">
            <input type="file" accept=".csv,text/csv" className="sr-only" onChange={handleFileChange} />
            <span className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl border border-[#172026] bg-white px-4 text-sm font-black text-[#172026] transition hover:bg-[#eef7f4]">
              選擇 CSV
            </span>
          </label>
          <button
            type="button"
            onClick={handleUseFallback}
            className="mt-3 min-h-11 w-full rounded-xl bg-[#172026] px-4 text-sm font-black text-white transition hover:bg-[#27404a]"
          >
            使用 Demo 結果
          </button>
          <p className="mt-3 truncate text-xs font-black text-[#66716d]">{fileName}</p>
          <p className="mt-1 text-xs font-bold leading-5 text-[#66716d]">{status}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Metric label="Rows" value={analysis.rows} />
          <Metric label="Columns" value={analysis.columns} />
          <Metric label="Missing" value={analysis.missingValues} />
          <Metric label="Best acc." value={bestResult.testAccuracy.toFixed(4)} />
        </div>

        <ColumnSummary analysis={analysis} />
      </div>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <p className="text-sm font-black text-[#172026]">資料預覽</p>
          <div className="mt-3 overflow-hidden rounded-xl border border-[#e5e1d7]">
            <div className="grid grid-cols-4 bg-[#f8f7f2] text-[0.68rem] font-black text-[#66716d]">
              {analysis.headers.slice(0, 4).map((header) => (
                <span key={header} className="truncate px-2 py-2">
                  {header}
                </span>
              ))}
            </div>
            {analysis.sampleRows.map((row, rowIndex) => (
              <div key={`${row.join("-")}-${rowIndex}`} className="grid grid-cols-4 border-t border-[#e5e1d7] text-xs font-bold text-[#40514f]">
                {row.slice(0, 4).map((cell, index) => (
                  <span key={`${cell}-${index}`} className="truncate px-2 py-2">
                    {cell || "-"}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dedbd1] bg-[#10242a] p-4 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-black">Accuracy comparison</p>
            <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black text-[#f0c36a]">ML result</span>
          </div>
          <div className="mt-4 grid gap-3">
            {analysis.modelResults.map((item) => (
              <AccuracyRow key={`${item.estimators}-${item.testAccuracy}`} item={item} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">自動報告摘要</p>
          <p className="mt-2 text-sm font-bold leading-7 text-[#40514f]">{analysis.summary}</p>
          <button
            type="button"
            onClick={handleCopySummary}
            className="mt-3 min-h-11 w-full rounded-xl border border-[#172026] bg-white px-4 text-sm font-black text-[#172026] transition hover:bg-[#eef7f4]"
          >
            複製摘要
          </button>
        </div>
      </div>
    </div>
  )
}

function ColumnSummary({ analysis }) {
  return (
    <div className="rounded-2xl border border-[#dedbd1] bg-white p-4">
      <p className="text-sm font-black text-[#172026]">欄位摘要</p>
      <div className="mt-3 grid gap-3">
        <ChipGroup title="Numeric" items={analysis.numericColumns} />
        <ChipGroup title="Categorical" items={analysis.categoricalColumns} />
      </div>
    </div>
  )
}

function ChipGroup({ title, items }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#66716d]">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(items.length ? items.slice(0, 8) : ["None detected"]).map((item) => (
          <span key={item} className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-black text-[#0f766e]">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function AccuracyRow({ item }) {
  const trainWidth = Math.round(item.trainAccuracy * 100)
  const testWidth = Math.round(item.testAccuracy * 100)

  return (
    <div className="rounded-xl bg-white/8 p-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black">
        <span>n_estimators = {item.estimators}</span>
        <span>gap {item.gap.toFixed(4)}</span>
      </div>
      <div className="mt-3 grid gap-2">
        <Bar label="train" value={trainWidth} color="#83d4c8" />
        <Bar label="test" value={testWidth} color="#f0c36a" />
      </div>
    </div>
  )
}

function Bar({ label, value, color }) {
  return (
    <div className="grid grid-cols-[44px_minmax(0,1fr)_48px] items-center gap-2 text-[0.68rem] font-black text-white/75">
      <span>{label}</span>
      <span className="h-2 overflow-hidden rounded-full bg-white/12">
        <span className="block h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </span>
      <span className="text-right">{value}%</span>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#dedbd1] bg-white p-4">
      <p className="text-xs font-black text-[#66716d]">{label}</p>
      <p className="mt-1 break-words text-lg font-black text-[#172026]">{value}</p>
    </div>
  )
}

export default StockTrendLabTool
