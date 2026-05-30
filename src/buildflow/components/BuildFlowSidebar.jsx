function BuildFlowSidebar({ tabs, activeTab, session, isAdmin, onSelectTab }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-black text-slate-500">功能選單</p>
      <nav className="grid gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`rounded-xl px-4 py-3 text-left text-sm font-bold ${
              activeTab === tab.id
                ? "bg-slate-950 text-white"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
        {activeTab === "projectDetail" && isAdmin && (
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-left text-sm font-bold text-white">
            案件詳情
          </button>
        )}
      </nav>

      <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        <p className="font-black text-slate-950">目前身份</p>
        <p className="mt-1">{session.name}</p>
        <p className="mt-3 text-xs text-slate-400">
          {isAdmin
            ? "管理者可看金額、批價、追加減項與所有任務。"
            : "使用者只看自己的任務與回報，不顯示金額與批價。"}
        </p>
      </div>
    </aside>
  )
}

export default BuildFlowSidebar
