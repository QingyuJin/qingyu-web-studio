import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import Status from "../shared/Status"
import { quoteStages } from "../data/demoData"
import { formatMoney } from "../utils/helpers"

function quoteTotal(quote) {
  return quote.items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0)
}

function QuoteDraftsPanel({
  quoteDrafts,
  addQuoteDraft,
  updateQuoteDraftStage,
  createProjectFromQuoteDraft,
  printQuoteDraftPdf,
}) {
  const stageCounts = quoteStages.map((stage) => ({
    stage,
    count: quoteDrafts.filter((quote) => quote.stage === stage).length,
  }))

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="暫存報價"
        desc="先暫存客戶需求，再走確認、報價、發包。報價單可直接列印成 PDF。"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {stageCounts.map((item, index) => (
          <Card key={item.stage}>
            <p className="text-sm font-black text-slate-500">STEP {index + 1}</p>
            <h3 className="mt-2 text-2xl font-black">{item.stage}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.count} 筆暫存案</p>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-xl font-black">新增暫存案</h3>
        <form onSubmit={addQuoteDraft} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="title" label="案件名稱" required placeholder="例：屋頂防水估價" />
          <Input name="client" label="業主名稱" required />
          <Input name="phone" label="電話 / LINE" />
          <Input name="address" label="案場地址" />
          <Input name="type" label="工程類型" placeholder="防水 / 地坪 / 木作" />
          <Input name="quoteDate" label="報價日期" type="date" />
          <Input name="expectedDate" label="預計施工日" type="date" />
          <Input name="sizeNote" label="尺寸 / 大小張" placeholder="例：18 坪 / 大小張照片 8 張" />
          <Input name="item1" label="工項 1" placeholder="例：屋頂防水" />
          <Input name="amount1" label="金額 1" type="number" />
          <Input name="item2" label="工項 2" placeholder="例：女兒牆補強" />
          <Input name="amount2" label="金額 2" type="number" />
          <label className="grid gap-2 md:col-span-2">
            <span className="text-sm font-bold text-slate-600">備註</span>
            <textarea
              name="note"
              rows={3}
              className="rounded-xl border border-slate-300 px-4 py-3 text-slate-950 shadow-sm outline-none placeholder:text-slate-500 hover:border-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </label>
          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            加入暫存報價
          </button>
        </form>
      </Card>

      <div className="grid gap-4">
        {quoteDrafts.map((quote) => (
          <Card key={quote.id}>
            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                      {quote.type}｜{quote.address}
                    </p>
                    <h3 className="mt-2 text-2xl font-black">{quote.title}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {quote.client}｜{quote.phone || "未填電話"}
                    </p>
                  </div>
                  <Status>{quote.stage}</Status>
                </div>

                <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 md:grid-cols-3">
                  <p>
                    <span className="font-black text-slate-950">報價日：</span>
                    {quote.quoteDate}
                  </p>
                  <p>
                    <span className="font-black text-slate-950">施工日：</span>
                    {quote.expectedDate}
                  </p>
                  <p>
                    <span className="font-black text-slate-950">尺寸：</span>
                    {quote.sizeNote || "未填"}
                  </p>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left text-sm">
                    <thead className="text-slate-500">
                      <tr>
                        <th className="py-2">工項</th>
                        <th>數量</th>
                        <th>單位</th>
                        <th>單價</th>
                        <th>小計</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quote.items.map((item) => (
                        <tr key={`${quote.id}-${item.name}`}>
                          <td className="py-3 font-black">{item.name}</td>
                          <td>{item.qty}</td>
                          <td>{item.unit}</td>
                          <td>NT${formatMoney(item.price)}</td>
                          <td>NT${formatMoney(Number(item.qty || 0) * Number(item.price || 0))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                  {quote.note || "尚未填寫備註。"}
                </p>
              </div>

              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-500">報價總額</p>
                <p className="mt-2 text-3xl font-black">NT${formatMoney(quoteTotal(quote))}</p>

                <div className="mt-5 grid gap-2">
                  {quoteStages.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => updateQuoteDraftStage(quote.id, stage)}
                      className={`rounded-xl border px-4 py-3 text-sm font-black active:translate-y-px ${
                        quote.stage === stage
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <SmallButton onClick={() => printQuoteDraftPdf(quote)}>產生 PDF</SmallButton>
                  <SmallButton onClick={() => createProjectFromQuoteDraft(quote)}>
                    轉案件
                  </SmallButton>
                </div>
              </aside>
            </div>
          </Card>
        ))}

        {!quoteDrafts.length && (
          <Card>
            <p className="text-sm text-slate-500">目前沒有暫存報價。</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default QuoteDraftsPanel
