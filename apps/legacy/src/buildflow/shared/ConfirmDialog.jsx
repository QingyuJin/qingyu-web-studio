function ConfirmDialog({ config, onCancel, onConfirm }) {
  if (!config) return null

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/55 px-4 py-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-rose-500">
          Confirm action
        </p>
        <h2 className="mt-2 text-2xl font-black">{config.title || "確定要繼續嗎？"}</h2>
        {config.message ? <p className="mt-3 leading-7 text-slate-600">{config.message}</p> : null}

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-200 active:translate-y-px"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-rose-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-rose-500 active:translate-y-px"
          >
            {config.confirmLabel || "確認"}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmDialog
