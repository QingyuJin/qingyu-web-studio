import Status from "../../shared/Status"

function BotParsedResult({ message, messageStatus }) {
  const parsed = message.parsedResult

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">Bot Parsed Result</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">Bot 解析結果</h3>
        </div>
        <Status>{messageStatus}</Status>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Info label="intent" value={message.intent} />
        <Info label="confidence" value={`${message.confidence}%`} />
        <Info label="caseName" value={parsed.caseName} />
        <Info label="customerName" value={parsed.customerName} />
        <Info label="location" value={parsed.location} />
        <Info label="projectType" value={parsed.projectType} />
        <Info label="status" value={parsed.status} />
        <Info label="nextStep" value={parsed.nextStep} />
      </div>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">entities</p>
        <div className="mt-2 grid gap-2">
          {Object.entries(message.entities).map(([key, value]) => (
            <div
              key={key}
              className="grid gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm sm:grid-cols-[8rem_1fr] sm:gap-3"
            >
              <span className="font-black text-slate-500">{key}</span>
              <span className="break-words font-bold text-slate-800 sm:text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">missingFields</p>
        {parsed.missingFields.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {parsed.missingFields.map((field) => (
              <span
                key={field}
                className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-black text-amber-800"
              >
                {field}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">
            目前沒有缺少資料。
          </p>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-black text-slate-500">suggestedActions</p>
        <ul className="mt-2 grid gap-2">
          {message.suggestedActions.map((action) => (
            <li
              key={action}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"
            >
              {action}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-bold leading-6 text-slate-800">{value}</p>
    </div>
  )
}

export default BotParsedResult
