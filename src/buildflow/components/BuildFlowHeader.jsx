import { Link } from "react-router-dom"

function BuildFlowHeader({ session, savedAt, isAdmin, onResetTestData, onLogout }) {
  return (
    <header className="border-b border-slate-800 bg-[#0f172a] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/" className="text-sm font-bold text-emerald-300">
            ← 回首頁
          </Link>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <h1 className="text-2xl font-black">BuildFlow</h1>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
              工程行營運後台
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-slate-300">
            報價、發包、任務、追加、毛利，一頁收斂。
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {session.name}｜{session.role === "admin" ? "管理者" : "師傅"}｜保存 {savedAt || "尚未保存"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <button
              type="button"
              onClick={onResetTestData}
              className="rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-2 text-sm font-black text-rose-100 hover:bg-rose-500/20"
            >
              重置資料
            </button>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-950"
          >
            登出
          </button>
        </div>
      </div>
    </header>
  )
}

export default BuildFlowHeader
