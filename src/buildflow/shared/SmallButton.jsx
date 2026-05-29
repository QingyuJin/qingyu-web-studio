function SmallButton({ children, onClick, danger = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-xs font-black ${
        danger ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-700"
      }`}
    >
      {children}
    </button>
  )
}

export default SmallButton
