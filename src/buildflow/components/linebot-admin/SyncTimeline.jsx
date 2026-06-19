function SyncTimeline({ records }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-normal text-slate-400">Sync Timeline</p>
        <h3 className="mt-1 text-lg font-black text-slate-950">同步紀錄 Timeline</h3>
      </div>

      {records.length ? (
        <div className="grid gap-3">
          {records.map((record) => (
            <article key={record.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-black text-slate-950">
                  {record.time}｜{record.sourceMessage} → {record.actionLabel}
                </p>
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  {record.status}
                </span>
              </div>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-500">
                Bot 判斷：{formatIntentLabel(record.intent)}｜影響案件：{record.caseName}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-bold leading-7 text-slate-500">
          尚未有同步紀錄。點擊 quick reply 或後台 action 後，這裡會出現 LineBot 寫入 BuildFlow 的紀錄。
        </div>
      )}
    </section>
  )
}

function formatIntentLabel(intent) {
  const labels = {
    quote_view_pdf: "查看報價",
    quote_approved: "業主同意報價",
    quote_change_request: "報價需修改",
    quote_convert_project: "轉正式案件",
    schedule_construction: "安排施工日",
    pre_construction_ready: "施工前準備完成",
    start_construction: "開始施工",
    construction_daily_report: "每日施工回報",
    completion_acceptance: "完工試水回報",
    notify_acceptance: "通知業主驗收",
    acceptance_confirmed: "業主驗收確認",
    create_payment_request: "建立請款",
    payment_confirmed: "付款確認結案",
    request_missing_info: "缺資料提醒",
    mark_quotation: "報價追蹤",
    mark_site_survey: "場勘安排",
    add_daily_report: "施工日誌",
    add_change_order: "追加工程",
    update_status: "狀態更新",
    mark_acceptance: "驗收標記",
  }

  return labels[intent] || intent || "已同步"
}

export default SyncTimeline
