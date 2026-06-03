import Card from "../shared/Card"
import Input from "../shared/Input"
import SectionTitle from "../shared/SectionTitle"
import SmallButton from "../shared/SmallButton"
import Status from "../shared/Status"
import { quoteStages } from "../data/sampleData"
import { formatMoney } from "../utils/helpers"

function quoteTotal(quote) {
  return quote.items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0), 0)
}

function quoteCost(quote) {
  return quote.items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.cost || 0), 0)
}

function QuoteDraftsPanel({
  quoteDrafts,
  addQuoteDraft,
  updateQuoteDraftStage,
  updateQuoteOwnerStatus,
  createProjectFromQuoteDraft,
  printQuoteDraftPdf,
}) {
  const stageCounts = quoteStages.map((stage) => ({
    stage,
    count: quoteDrafts.filter((quote) => quote.stage === stage).length,
  }))

  return (
    <div className="grid gap-5">
      <SectionTitle title="報價單" desc="需求整理、PDF、業主確認。" />

      <div className="grid gap-4 md:grid-cols-3">
        {stageCounts.map((item, index) => (
          <Card key={item.stage}>
            <p className="text-sm font-black text-slate-500">STEP {index + 1}</p>
            <h3 className="mt-2 text-xl font-black">{item.stage}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.count} 筆報價</p>
          </Card>
        ))}
      </div>

      <Card>
        <details className="minimal-detail bg-slate-50">
          <summary>
            <span>新增報價單</span>
            <Status>展開填寫</Status>
          </summary>
          <form onSubmit={addQuoteDraft} className="minimal-detail-body grid gap-3 md:grid-cols-2">
            <Input name="title" label="案件名稱" required placeholder="例：屋頂防水估價" />
            <Input name="client" label="業主名稱" required />
            <Input name="phone" label="電話 / LINE" />
            <Input name="source" label="來源" placeholder="LINE / Pro360 / 紙本" />
            <Input name="address" label="案場地址" />
            <Input name="type" label="工程類型" placeholder="防水 / 地坪 / 木作" />
            <Input name="quoteDate" label="報價日期" type="date" />
            <Input name="validUntil" label="有效日期" type="date" />
            <Input name="expectedDate" label="預計施工日" type="date" />
            <Input
              name="sizeNote"
              label="尺寸 / 大小張"
              placeholder="例：18 坪 / 大小張照片 8 張"
            />
            <QuoteLine index="1" />
            <QuoteLine index="2" />
            <label className="grid gap-2 md:col-span-2">
              <span className="text-sm font-bold text-slate-600">備註</span>
              <textarea
                name="note"
                rows={3}
                className="rounded-xl border border-slate-300 px-4 py-3 text-slate-950 shadow-sm outline-none placeholder:text-slate-500 hover:border-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
            <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
              建立報價單
            </button>
          </form>
        </details>
      </Card>

      <div className="grid gap-4">
        {quoteDrafts.map((quote) => (
          <Card key={quote.id}>
            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                      {quote.type}｜{quote.source || "未填來源"}｜{quote.address}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{quote.title}</h3>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {quote.client}｜{quote.phone || "未填電話"}
                    </p>
                  </div>
                  <Status>{quote.stage}</Status>
                </div>

                <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 md:grid-cols-3">
                  <p>
                    <span className="font-black text-slate-950">報價日：</span>
                    {quote.quoteDate}
                  </p>
                  <p>
                    <span className="font-black text-slate-950">有效日：</span>
                    {quote.validUntil || "未填"}
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

                <details className="minimal-detail mt-4">
                  <summary>工項、材料與備註</summary>
                  <div className="minimal-detail-body">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[560px] text-left text-sm">
                        <thead className="text-slate-500">
                          <tr>
                            <th className="w-[18%] py-2">工種</th>
                            <th className="w-[24%]">工項</th>
                            <th>材料 / 工具</th>
                            <th>數量</th>
                            <th>單價</th>
                            <th>小計</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {quote.items.map((item) => (
                            <tr key={`${quote.id}-${item.name}`}>
                              <td className="py-3 font-black">{item.trade || "工項"}</td>
                              <td>{item.name}</td>
                              <td>
                                {item.material || "未填"} / {item.tool || "未填"}
                              </td>
                              <td>
                                {item.qty} {item.unit}
                              </td>
                              <td>NT${formatMoney(item.price)}</td>
                              <td>
                                NT${formatMoney(Number(item.qty || 0) * Number(item.price || 0))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                      {quote.note || "尚未填寫備註。"}
                    </p>
                  </div>
                </details>
              </div>

              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-black text-slate-500">報價總額</p>
                <p className="mt-2 text-2xl font-black">NT${formatMoney(quoteTotal(quote))}</p>
                <div className="mt-3 grid gap-2 rounded-xl bg-white p-3 text-sm font-bold text-slate-600">
                  <p>預估成本：NT${formatMoney(quoteCost(quote))}</p>
                  <p>粗估毛利：NT${formatMoney(quoteTotal(quote) - quoteCost(quote))}</p>
                  <p>業主確認：{quote.ownerStatus || "待確認"}</p>
                </div>

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
                  <SmallButton onClick={() => printQuoteDraftPdf(quote)}>PDF</SmallButton>
                  <SmallButton onClick={() => updateQuoteOwnerStatus(quote.id, "已確認")}>
                    業主確認
                  </SmallButton>
                  <SmallButton onClick={() => updateQuoteOwnerStatus(quote.id, "需修改")}>
                    需修改
                  </SmallButton>
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
            <p className="text-sm text-slate-500">目前沒有報價單。</p>
          </Card>
        )}
      </div>
    </div>
  )
}

function QuoteLine({ index }) {
  return (
    <fieldset className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2 md:grid-cols-3">
      <legend className="px-2 text-sm font-black text-slate-500">工項 {index}</legend>
      <Input name={`trade${index}`} label="工種" placeholder="泥作 / 磁磚 / 油漆" />
      <Input name={`item${index}`} label="工項" placeholder="例：屋頂防水" />
      <Input name={`material${index}`} label="材料" placeholder="例：PU 防水材" />
      <Input name={`tool${index}`} label="工具" placeholder="例：打石機" />
      <Input name={`qty${index}`} label="數量" type="number" placeholder="1" />
      <Input name={`unit${index}`} label="單位" placeholder="坪 / 米 / 式" />
      <Input name={`price${index}`} label="單價" type="number" />
      <Input name={`cost${index}`} label="預估成本" type="number" />
    </fieldset>
  )
}

export default QuoteDraftsPanel
