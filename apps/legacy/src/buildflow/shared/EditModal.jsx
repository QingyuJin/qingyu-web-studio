function EditModal({ config, onClose }) {
  if (!config) return null

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values = Object.fromEntries(
      config.fields.map((field) => [field.name, String(form.get(field.name) || "").trim()])
    )

    config.onSubmit(values)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Edit</p>
            <h2 className="mt-2 text-2xl font-black">{config.title}</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-black text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          {config.fields.map((field) => (
            <label key={field.name} className="grid gap-2">
              <span className="text-sm font-bold text-slate-600">{field.label}</span>
              {field.multiline ? (
                <textarea
                  name={field.name}
                  defaultValue={field.value || ""}
                  rows={4}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              ) : (
                <input
                  name={field.name}
                  type={field.type || "text"}
                  defaultValue={field.value || ""}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-950 shadow-sm outline-none hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              )}
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-sm hover:bg-slate-800 active:translate-y-px">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditModal
