import { lineBotRoleLabels } from "../../data/lineBotScenarios"

const roleStyles = {
  customer: "border-slate-200 bg-white text-slate-800",
  boss: "border-amber-200 bg-amber-50 text-amber-950",
  foreman: "border-orange-200 bg-orange-50 text-orange-950",
  worker: "border-sky-200 bg-sky-50 text-sky-950",
  bot: "border-emerald-200 bg-emerald-50 text-emerald-950",
  admin: "border-indigo-200 bg-indigo-50 text-indigo-950",
}

const rightSideRoles = new Set(["bot", "admin"])

function ChatMessage({ message, isActive, onSelect }) {
  const alignRight = rightSideRoles.has(message.role)
  const label = lineBotRoleLabels[message.role] || message.role

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex w-full min-w-0 ${alignRight ? "justify-end" : "justify-start"}`}
    >
      <span
        className={`max-w-[88%] break-words rounded-2xl border px-4 py-3 text-left shadow-sm transition duration-200 ${
          roleStyles[message.role] || roleStyles.customer
        } ${alignRight ? "rounded-br-md" : "rounded-bl-md"} ${
          isActive ? "ring-2 ring-slate-950 ring-offset-2" : "group-hover:border-slate-400"
        }`}
      >
        <span className="mb-1 flex items-center justify-between gap-3 text-[11px] font-black text-slate-500">
          <span>{label}</span>
          <span>{message.time}</span>
        </span>
        <span className="block whitespace-pre-wrap text-sm font-bold leading-7">{message.text}</span>
        {message.analysis && (
          <span className="mt-2 inline-flex rounded-full bg-white/75 px-2 py-1 text-[11px] font-black text-slate-500">
            可解析
          </span>
        )}
      </span>
    </button>
  )
}

export default ChatMessage
