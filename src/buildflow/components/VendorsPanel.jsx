import { useState } from "react"
import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import { includesKeyword } from "../utils/helpers"

function VendorsPanel({ vendors, addVendor, editVendor, deleteVendor }) {
  const [keyword, setKeyword] = useState("")
  const filteredVendors = vendors.filter((vendor) =>
    includesKeyword(`${vendor.name} ${vendor.trade} ${vendor.phone} ${vendor.area} ${vendor.note}`, keyword)
  )

  return (
    <div className="grid gap-5">
      <SectionTitle title="廠商資料" desc="集中管理師傅、工種、電話與合作備註。" />
      <Card>
        <h3 className="text-xl font-black">新增廠商</h3>
        <form onSubmit={addVendor} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" label="廠商 / 師傅名稱" required />
          <Input name="trade" label="工種" />
          <Input name="phone" label="電話" />
          <Input name="area" label="合作地區" />
          <Input name="note" label="備註" />
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">新增廠商</button>
        </form>
      </Card>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-xl font-black">廠商列表</h3>
            <p className="mt-1 text-sm text-slate-500">目前顯示 {filteredVendors.length} / {vendors.length} 筆廠商資料</p>
          </div>
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜尋廠商 / 工種 / 地區" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-500 md:w-[260px]" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {filteredVendors.map((vendor) => <Card key={vendor.id}><p className="text-sm font-bold text-slate-500">{vendor.trade}</p><h3 className="mt-2 text-xl font-black">{vendor.name}</h3><p className="mt-3 font-black">{vendor.phone}</p><p className="mt-2 text-sm text-slate-500">{vendor.area}</p><p className="mt-4 text-sm leading-7 text-slate-600">{vendor.note}</p><div className="mt-5 flex gap-2"><SmallButton onClick={() => editVendor(vendor)}>編輯</SmallButton><SmallButton danger onClick={() => deleteVendor(vendor.id)}>刪除</SmallButton></div></Card>)}
          {!filteredVendors.length && <p className="text-sm text-slate-500">沒有符合條件的廠商。</p>}
        </div>
      </Card>
    </div>
  )
}

export default VendorsPanel
