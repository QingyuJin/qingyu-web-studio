function SmallButton({ children, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-xs font-black shadow-sm active:translate-y-px ${
        danger
          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  )
}

export default SmallButton
