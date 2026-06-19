function AdminActionBar({ actions, onRunAction, actionNote = "Demo 只更新本機展示資料" }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">Quick Actions</p>
          <h3 className="mt-1 text-lg font-black text-slate-950">一鍵轉成後台資料</h3>
        </div>
        <span className="text-xs font-bold text-slate-500">{actionNote}</span>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {actions.map((action) => (
          <button
            key={`${action.id}-${action.label}`}
            type="button"
            onClick={() => onRunAction(action)}
            className="shrink-0 rounded-full border border-slate-200 bg-slate-950 px-4 py-2 text-xs font-black text-white shadow-sm transition hover:bg-emerald-600"
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default AdminActionBar
