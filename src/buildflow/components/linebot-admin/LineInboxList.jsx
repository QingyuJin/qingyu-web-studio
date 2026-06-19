import { lineBotRoleLabels } from "../../data/lineBotScenarios"

function LineInboxList({ messages, activeMessageId, messageStatuses, onSelect }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">Inbox</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">LINE 後台收件匣</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {messages.length} 筆
        </span>
      </div>

      <div className="grid max-h-[560px] gap-2 overflow-y-auto pr-1">
        {messages.map((message) => {
          const isActive = activeMessageId === message.id
          const status = messageStatuses[message.id] || message.status

          return (
            <button
              key={message.id}
              type="button"
              onClick={() => onSelect(message.id)}
              className={`rounded-xl border p-3 text-left transition ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white shadow-md"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400"
              }`}
            >
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-black ${isActive ? "text-slate-200" : "text-slate-500"}`}>
                  {lineBotRoleLabels[message.senderRole]} · {message.time}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-black ${
                    isActive ? "bg-white/15 text-white" : "bg-white text-slate-600"
                  }`}
                >
                  {status}
                </span>
              </span>
              <span className="mt-2 block break-words text-sm font-black leading-6">{message.message}</span>
              <span
                className={`mt-2 block break-words text-xs font-bold ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {message.scenarioTitle} · {message.intent}
              </span>
              <span className="mt-3 flex flex-wrap gap-1">
                {message.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full px-2 py-1 text-[11px] font-black ${
                      isActive ? "bg-white/10 text-slate-100" : "bg-white text-slate-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default LineInboxList
