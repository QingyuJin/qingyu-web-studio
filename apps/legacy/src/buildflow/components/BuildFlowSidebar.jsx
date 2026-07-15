function BuildFlowSidebar({ tabs, activeTab, session, isAdmin, onSelectTab }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-5 lg:self-start">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">Menu</p>
      <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`rounded-xl px-4 py-3 text-left text-sm font-black ${
              activeTab === tab.id
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-slate-950"
            }`}
          >
            {tab.label}
          </button>
        ))}
        {activeTab === "projectDetail" && isAdmin && (
          <button
            type="button"
            className="rounded-xl bg-slate-950 px-4 py-3 text-left text-sm font-black text-white"
          >
            案件詳情
          </button>
        )}
      </nav>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        <p className="font-black text-slate-950">{session.name}</p>
        <p className="mt-1 text-xs font-bold text-slate-500">
          {isAdmin ? "老闆視角：金額、毛利、追加" : "師傅視角：任務、回報、完成"}
        </p>
      </div>
    </aside>
  )
}

export default BuildFlowSidebar
