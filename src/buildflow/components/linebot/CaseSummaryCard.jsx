import Status from "../../shared/Status"

function CaseSummaryCard({ scenario }) {
  const detail = scenario.parsedCase
  const missingData = detail.missingData || []

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">Case Summary</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">{detail.caseName}</h3>
        </div>
        <Status>{detail.status}</Status>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${detail.progress}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs font-black text-slate-500">
        <span>案件進度</span>
        <span>{detail.progress}%</span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Info label="客戶" value={detail.customer} />
        <Info label="工程類型" value={detail.type} />
        <Info label="地點" value={detail.location} />
        <Info label="下一步" value={detail.nextStep} wide />
      </dl>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">工程標籤</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {scenario.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-black text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">缺少資料</p>
        {missingData.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {missingData.map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-800"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">
            目前資料完整，可以進入下一步。
          </p>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">對應後台動作</p>
        <ul className="mt-2 grid gap-2">
          {scenario.backendActions.map((action) => (
            <li
              key={action}
              className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900"
            >
              {action}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">已建立的後台紀錄</p>
        <ul className="mt-2 grid gap-2">
          {detail.backendRecords.map((record) => (
            <li
              key={record}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700"
            >
              {record}
            </li>
          ))}
        </ul>
      </div>

      {scenario.warranty && (
        <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
          <p className="text-xs font-black text-emerald-700">保固查詢結果</p>
          <div className="mt-2 grid gap-1 text-sm font-bold text-emerald-950">
            <p>{scenario.warranty.caseName}</p>
            <p>完工日：{scenario.warranty.completedAt}</p>
            <p>保固至：{scenario.warranty.warrantyUntil}</p>
            <p>狀態：{scenario.warranty.status}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Info({ label, value, wide = false }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <dt className="text-xs font-black text-slate-400">{label}</dt>
      <dd className="mt-1 font-bold leading-6 text-slate-800">{value}</dd>
    </div>
  )
}

export default CaseSummaryCard
