function Input({ label, name, type = "text", placeholder = "", required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
      />
    </label>
  )
}

export default Input