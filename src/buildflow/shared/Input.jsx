function Input({ label, name, type = "text", placeholder = "", required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-slate-300 px-4 py-3 text-slate-950 shadow-sm outline-none placeholder:text-slate-500 hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
      />
    </label>
  )
}

export default Input
