function Info({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-black text-slate-400">{label}</p>
      <p className="mt-2 font-bold text-slate-700">{value || "未填"}</p>
    </div>
  )
}

export default Info