function Status({ children }) {
  return (
    <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
      {children}
    </span>
  )
}

export default Status