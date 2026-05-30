import Card from "../shared/Card"
import SectionTitle from "../shared/SectionTitle"
import { formatMoney } from "../utils/helpers"

function LineBotPanel({ vendors, changeOrders, tasks, session }) {
  const firstVendor = vendors[0]
  const firstChange = changeOrders[0]
  const firstTask = tasks.find((task) => task.status !== "已完成") || tasks[0]
  const examples =
    session?.role === "admin"
      ? [
          {
            user: "查案件 屏東住宅",
            bot: "屏東住宅防水工程｜狀態：施工中｜待確認追加：浴室牆面追加防水。",
          },
          {
            user: "查廠商 阿明",
            bot: firstVendor
              ? `${firstVendor.name}｜${firstVendor.trade}｜${firstVendor.phone}｜${firstVendor.area}`
              : "目前沒有廠商資料。",
          },
          {
            user: "新增追加 浴室牆面防水 12000",
            bot: firstChange
              ? `已建立追加項目：${firstChange.item}｜NT$${formatMoney(firstChange.amount)}。是否產生給業主的確認文字？`
              : "目前沒有追加減項資料。",
          },
          {
            user: "今日任務",
            bot: firstTask
              ? `今日待處理任務：${firstTask.title}｜負責人：${firstTask.workerName}`
              : "目前沒有待完成任務。",
          },
        ]
      : [
          {
            user: "今日任務",
            bot: firstTask
              ? `${session.name} 今天的任務：${firstTask.title}｜案件：${firstTask.projectName}`
              : "你目前沒有待完成任務。",
          },
          { user: "回報 已完成第一道防水", bot: "已收到回報，管理者會在任務頁看到你的備註。" },
          { user: "標記完成", bot: "任務已標記完成。" },
        ]

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="LINE Bot 模擬"
        desc="未來可串接 LINE Messaging API，讓現場用 LINE 查案件、新增追加、查廠商與回報任務。"
      />
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h3 className="text-xl font-black">可支援指令</h3>
          <div className="mt-4 grid gap-3">
            {(session?.role === "admin"
              ? ["查案件", "查廠商", "新增追加", "今日任務", "產生確認文字", "提醒收款"]
              : ["今日任務", "回報進度", "標記完成", "查備註"]
            ).map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 p-4 font-bold">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-xl font-black">對話範例</h3>
          <div className="mt-4 grid gap-4">
            {examples.map((example) => (
              <div key={example.user} className="grid gap-2">
                <div className="ml-auto max-w-[85%] rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold text-white">
                  {example.user}
                </div>
                <div className="max-w-[90%] rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold leading-7 text-slate-700">
                  {example.bot}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            目前為模擬流程。之後接真 API 時，會從 Supabase 查詢案件、廠商、任務與追加減項資料。
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LineBotPanel
