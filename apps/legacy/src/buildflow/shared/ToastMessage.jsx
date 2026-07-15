function ToastMessage({ message, tone = "info", onClose }) {
  if (!message) return null

  const toneClass =
    tone === "error"
      ? "border-rose-200 bg-rose-50 text-rose-900"
      : "border-emerald-200 bg-emerald-50 text-emerald-900"

  return (
    <div className="fixed right-4 top-4 z-[70] w-[calc(100%-2rem)] max-w-sm">
      <div className={`rounded-2xl border p-4 shadow-xl ${toneClass}`}>
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-bold leading-6">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-black opacity-70 transition hover:bg-white/70 hover:opacity-100 active:translate-y-px"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToastMessage
