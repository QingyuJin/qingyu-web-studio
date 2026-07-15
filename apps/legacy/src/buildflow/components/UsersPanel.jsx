import { useState } from "react"
import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { includesKeyword } from "../utils/helpers"

function UsersPanel({ users, tasks, subcontracts, currentUserId, addUser, editUser, deleteUser }) {
  const [keyword, setKeyword] = useState("")
  const [roleFilter, setRoleFilter] = useState("全部")

  function taskCount(userId) {
    return tasks.filter((task) => task.workerId === userId).length
  }

  function subcontractCount(userId) {
    return subcontracts.filter((item) => item.workerId === userId).length
  }

  const filteredUsers = users.filter((user) => {
    const matchRole = roleFilter === "全部" || user.role === roleFilter
    const matchKeyword = includesKeyword(
      `${user.name} ${user.username} ${user.phone} ${user.role}`,
      keyword
    )
    return matchRole && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="使用者管理"
        desc="管理者可以新增師傅帳號 新增後可直接登入 並可被指派發包項目與任務"
      />

      <Card>
        <h3 className="text-xl font-black">新增使用者</h3>
        <form onSubmit={addUser} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" label="姓名" required />
          <Input name="username" label="帳號" required />
          <Input name="password" label="密碼" placeholder="預設可用 1234" />
          <Input name="phone" label="電話" />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">角色</span>
            <select name="role" className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="worker">worker 使用者 / 師傅</option>
              <option value="admin">admin 管理者</option>
            </select>
          </label>
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增使用者
          </button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">使用者列表</h3>
            <p className="mt-1 text-sm text-slate-500">
              目前顯示 {filteredUsers.length} / {users.length} 位使用者
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px]">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜尋姓名 / 帳號 / 電話"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              <option>全部</option>
              <option value="admin">admin</option>
              <option value="worker">worker</option>
            </select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">姓名</th>
                <th>帳號</th>
                <th>密碼</th>
                <th>角色</th>
                <th>電話</th>
                <th>發包數</th>
                <th>任務數</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-4 font-black">
                    {user.name}
                    {user.id === currentUserId ? "（目前登入）" : ""}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>{subcontractCount(user.id)}</td>
                  <td>{taskCount(user.id)}</td>
                  <td>
                    <div className="flex gap-2">
                      <SmallButton onClick={() => editUser(user)}>編輯</SmallButton>
                      <SmallButton danger onClick={() => deleteUser(user.id)}>
                        刪除
                      </SmallButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredUsers.length && (
            <p className="py-4 text-sm text-slate-500">沒有符合條件的使用者</p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default UsersPanel
