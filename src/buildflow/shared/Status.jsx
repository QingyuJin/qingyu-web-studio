function Status({ children }) {
  return (
    <span className="inline-flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-black text-slate-800 shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
      {children}
    </span>
  )
}

export default Status
