import { useMemo, useState } from "react"
import Card from "../shared/Card"
import SectionTitle from "../shared/SectionTitle"
import Status from "../shared/Status"

const lineCommands = [
  {
    label: "健康檢查",
    command: "測試",
    reply: "BuildFlow LINE webhook with Supabase v2 is alive.",
  },
  {
    label: "綁定師傅",
    command: "綁定 BF-AMING-1234",
    reply: "綁定成功：阿明師傅\n之後可輸入「今日任務」查詢你的任務。",
  },
  {
    label: "查今日任務",
    command: "今日任務",
    reply:
      "今日任務｜阿明師傅\n\nt-001｜屏東住宅防水工程\n完成浴室牆面防水第一道\n期限：2026-05-31\n狀態：待完成\n備註：施工前先拍照。",
  },
  {
    label: "送出回報",
    command: "回報 t-001 現場已完成第一道防水",
    reply: "已收到回報：t-001\n屏東住宅防水工程\n完成浴室牆面防水第一道\n\n現場已完成第一道防水",
  },
  {
    label: "完成任務",
    command: "完成 t-001",
    reply: "已完成任務：t-001\n屏東住宅防水工程\n完成浴室牆面防水第一道",
  },
]

function LineBotPanel({ tasks, session }) {
  const [activeCommand, setActiveCommand] = useState(lineCommands[1])
  const reportedTasks = useMemo(() => tasks.filter((task) => task.report?.trim()), [tasks])
  const completedTasks = useMemo(() => tasks.filter((task) => task.status === "已完成"), [tasks])
  const visibleTasks =
    session?.role === "admin" ? tasks : tasks.filter((task) => task.workerId === session?.id)

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="LINE Bot 串接"
        desc="LINE webhook 已可連到 Supabase，支援綁定、查今日任務、回報進度與完成任務。"
      />

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-black">可測指令</h3>
              <p className="mt-1 text-sm text-slate-500">點指令可切換右側對話預覽。</p>
            </div>
            <Status>Supabase v2</Status>
          </div>

          <div className="mt-4 grid gap-3">
            {lineCommands.map((item) => {
              const isActive = activeCommand.command === item.command
              return (
                <button
                  key={item.command}
                  type="button"
                  onClick={() => setActiveCommand(item)}
                  className={`rounded-xl border p-4 text-left shadow-sm transition active:translate-y-px ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400 hover:bg-white"
                  }`}
                >
                  <span className="block text-xs font-black uppercase tracking-wide opacity-70">
                    {item.label}
                  </span>
                  <span className="mt-1 block font-black">{item.command}</span>
                </button>
              )
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">LINE 對話預覽</h3>
          <div className="mt-4 grid gap-4">
            <div className="ml-auto max-w-[88%] rounded-2xl bg-green-500 px-4 py-3 text-sm font-bold leading-7 text-white shadow-sm">
              {activeCommand.command}
            </div>
            <div className="max-w-[92%] whitespace-pre-line rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold leading-7 text-slate-700 shadow-sm">
              {activeCommand.reply}
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            Webhook 使用 `line_profiles`、`line_tasks`、`line_task_reports` 三張最小測試表。 Vercel
            健康檢查通過後，LINE 端就能直接查任務與寫回 Supabase。
          </div>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <h3 className="text-lg font-black">任務狀態</h3>
          <p className="mt-2 text-3xl font-black text-slate-950">{visibleTasks.length}</p>
          <p className="mt-1 text-sm text-slate-500">目前 BuildFlow 顯示的任務數</p>
        </Card>
        <Card>
          <h3 className="text-lg font-black">已有回報</h3>
          <p className="mt-2 text-3xl font-black text-slate-950">{reportedTasks.length}</p>
          <p className="mt-1 text-sm text-slate-500">師傅從任務或 LINE 回填的內容</p>
        </Card>
        <Card>
          <h3 className="text-lg font-black">已完成</h3>
          <p className="mt-2 text-3xl font-black text-slate-950">{completedTasks.length}</p>
          <p className="mt-1 text-sm text-slate-500">完成後不再出現在今日待辦</p>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-black">LINE 回報紀錄</h3>
            <p className="mt-1 text-sm text-slate-500">
              目前先顯示本機任務回報，下一步可接 Supabase 即時資料。
            </p>
          </div>
          <Status>{reportedTasks.length ? "有回報" : "等待回報"}</Status>
        </div>

        <div className="mt-4 grid gap-3">
          {reportedTasks.map((task) => (
            <div key={task.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                    {task.id}
                  </p>
                  <h4 className="mt-1 font-black text-slate-950">{task.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {task.projectName}｜{task.workerName}
                  </p>
                </div>
                <Status>{task.status}</Status>
              </div>
              <p className="mt-3 rounded-lg bg-white p-3 text-sm font-bold leading-7 text-slate-700">
                {task.report}
              </p>
            </div>
          ))}

          {!reportedTasks.length && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              還沒有任務回報。可以在 LINE 測試 `回報 t-001
              現場已完成第一道防水`，或在「我的任務」填寫回報。
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default LineBotPanel
