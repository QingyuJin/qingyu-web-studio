import { useState } from "react"
import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { includesKeyword, formatMoney } from "../utils/helpers"

function BidsPanel({ bids, subcontracts, addBid, deleteBid, selectBid }) {
  const [keyword, setKeyword] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("全部")

  const filteredBids = bids.filter((bid) => {
    const matchSelected =
      selectedFilter === "全部" || (selectedFilter === "採用" ? bid.selected : !bid.selected)
    const matchKeyword = includesKeyword(
      `${bid.projectName} ${bid.item} ${bid.vendor} ${bid.note}`,
      keyword
    )
    return matchSelected && matchKeyword
  })

  return (
    <div className="grid gap-5">
      <SectionTitle title="批價紀錄" desc="比較不同廠商報價，記錄採用原因。" />
      <Card>
        <h3 className="text-xl font-black">新增批價</h3>
        <form onSubmit={addBid} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">發包項目</span>
            <select name="subcontractId" className="rounded-xl border border-slate-200 px-4 py-3">
              {subcontracts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.projectName}｜{item.item}
                </option>
              ))}
            </select>
          </label>
          <Input name="vendor" label="報價廠商" required />
          <Input name="amount" label="報價金額" type="number" required />
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">是否採用</span>
            <select name="selected" className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="no">未採用</option>
              <option value="yes">採用</option>
            </select>
          </label>
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增批價
          </button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">報價比較</h3>
            <p className="mt-1 text-sm text-slate-500">
              目前顯示 {filteredBids.length} / {bids.length} 筆報價
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-[220px_150px]">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜尋案件 / 廠商 / 項目"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500"
            />
            <select
              value={selectedFilter}
              onChange={(event) => setSelectedFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold"
            >
              <option>全部</option>
              <option>採用</option>
              <option>未採用</option>
            </select>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-3">案件</th>
                <th>項目</th>
                <th>廠商</th>
                <th>金額</th>
                <th>狀態</th>
                <th>備註</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBids.map((bid) => (
                <tr key={bid.id}>
                  <td className="py-4">{bid.projectName}</td>
                  <td>{bid.item}</td>
                  <td className="font-black">{bid.vendor}</td>
                  <td>NT${formatMoney(bid.amount)}</td>
                  <td>{bid.selected ? "採用" : "未採用"}</td>
                  <td>{bid.note}</td>
                  <td>
                    <div className="flex gap-2">
                      {!bid.selected && (
                        <SmallButton onClick={() => selectBid(bid.id)}>設為採用</SmallButton>
                      )}
                      <SmallButton danger onClick={() => deleteBid(bid.id)}>
                        刪除
                      </SmallButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredBids.length && (
            <p className="py-4 text-sm text-slate-500">沒有符合條件的批價紀錄。</p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default BidsPanel
