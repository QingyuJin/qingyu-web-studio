function BotAnalysisPanel({ analysis, scenario }) {
  const entities = analysis?.entities || {}
  const suggestedActions = analysis?.suggestedActions || []

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-normal text-slate-400">Bot Analysis</p>
      <h3 className="mt-1 text-lg font-black text-slate-950">解析能力展示</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        點選左側對話泡泡，可以看到 Bot 將自然語句整理成欄位與後台動作。
      </p>

      {analysis ? (
        <div className="mt-4 grid gap-4">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
            <p className="text-xs font-black text-emerald-700">intent</p>
            <p className="mt-1 text-sm font-black text-emerald-950">{analysis.intent}</p>
          </div>

          <div>
            <p className="text-xs font-black text-slate-500">entities</p>
            <div className="mt-2 grid gap-2">
              {Object.entries(entities).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="font-black text-slate-500">{key}</span>
                  <span className="text-right font-bold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-black text-slate-500">suggestedActions</p>
            <ul className="mt-2 grid gap-2">
              {suggestedActions.map((action) => (
                <li
                  key={action}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm font-bold leading-7 text-slate-600">
          這則訊息沒有額外解析資料。此情境目前會建立：
          {scenario.parsedCase.backendRecords.join("、")}。
        </div>
      )}
    </div>
  )
}

export default BotAnalysisPanel
