import { Link } from "react-router-dom"

function BuildFlowHeader({ session, savedAt, isAdmin, onResetDemo, onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/admin" className="text-sm font-bold text-slate-500">
            ← 回管理入口
          </Link>
          <h1 className="mt-2 text-2xl font-black">BuildFlow</h1>
          <p className="text-sm text-slate-500">工程行發包、批價與追加減項管理系統 v1.5</p>
          <p className="mt-1 text-xs text-slate-400">
            登入身份：{session.name}｜{session.role === "admin" ? "管理者" : "使用者"}｜最後保存：
            {savedAt || "尚未保存"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <button
              onClick={onResetDemo}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-600"
            >
              重置 Demo
            </button>
          )}
          <button
            onClick={onLogout}
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white"
          >
            登出
          </button>
        </div>
      </div>
    </header>
  )
}

export default BuildFlowHeader
