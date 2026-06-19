function BuildFlowCaseBoard({ cases, activeCaseId, highlightedCaseId, emptyMessage = "目前沒有可顯示的工程案件。" }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-normal text-slate-400">BuildFlow Cases</p>
        <h3 className="mt-1 text-lg font-black text-slate-950">案件資料</h3>
      </div>

      {cases.length ? (
        <div className="grid gap-3">
          {cases.map((item) => {
          const isActive = item.id === activeCaseId
          const isHighlighted = item.id === highlightedCaseId

          return (
            <article
              key={item.id}
              className={`rounded-xl border p-4 transition ${
                isActive ? "border-emerald-300 bg-emerald-50/70 shadow-md" : "border-slate-200 bg-slate-50"
              } ${
                isHighlighted ? "ring-2 ring-emerald-400 ring-offset-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-black text-slate-950">{item.name}</h4>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    {item.customer} · {item.location}
                  </p>
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700">
                  {item.status}
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-black text-slate-500">
                <span>{item.projectType}</span>
                <span>{item.progress}%</span>
              </div>

              <div className="mt-3 grid gap-2 text-sm font-bold leading-6 text-slate-700">
                <p>來源：LineBot</p>
                <p>最近更新：{item.lastUpdated}</p>
                <p>今日摘要：{item.dailySummary}</p>
                <p>照片狀態：{item.photoStatus}</p>
                <p>追加工程狀態：{item.hasChangeOrder ? "有，待確認" : "無"}</p>
              </div>

              {item.missingFields.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.missingFields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-800"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">
                  缺少資料：目前資料完整
                </p>
              )}

              <p className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-500">
                {item.sourceNote}
              </p>
            </article>
          )
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-bold leading-7 text-slate-500">
          {emptyMessage}
        </div>
      )}
    </section>
  )
}

export default BuildFlowCaseBoard
