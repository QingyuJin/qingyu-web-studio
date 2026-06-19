function QuickReplyBar({ replies, onReply }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {replies.map((reply) => (
        <button
          key={reply}
          type="button"
          onClick={() => onReply(reply)}
          className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
        >
          {reply}
        </button>
      ))}
    </div>
  )
}

export default QuickReplyBar
