import { useMemo, useState } from "react"
import Card from "../shared/Card"
import SectionTitle from "../shared/SectionTitle"
import Status from "../shared/Status"

const lineBotId = "@550oexzn"

const lineCommands = [
  {
    label: "狀態",
    command: "測試",
    reply: "BuildFlow LINE webhook 已上線。\n可測：選單 / 報價 / 綁定 / 今日任務 / 回報 / 完成",
  },
  {
    label: "選單",
    command: "選單",
    reply:
      `BuildFlow 選單\n\n1. 案例\n2. 報價\n3. 綁定 BF-AMING-1234\n4. 今日任務\n5. 回報 t-001 內容\n6. 完成 t-001\n\nLINE Bot：${lineBotId}`,
  },
  {
    label: "報價",
    command: "報價",
    reply:
      "請提供報價資料：\n\n姓名\n電話 / LINE\n案場地區\n工程類型\n預計施工日\n大約尺寸\n備註\n\n收到後可整理成暫存報價。",
  },
  {
    label: "綁定",
    command: "綁定 BF-AMING-1234",
    reply: "綁定成功：阿明師傅\n之後可輸入「今日任務」查詢。",
  },
  {
    label: "任務",
    command: "今日任務",
    reply:
      "今日任務｜阿明師傅\n\nt-001｜屏東住宅防水工程\n完成浴室牆面防水第一道\n期限：2026-05-31\n狀態：待完成",
  },
  {
    label: "回報",
    command: "回報 t-001 現場已完成第一道防水",
    reply: "已收到回報：t-001\n屏東住宅防水工程\n完成浴室牆面防水第一道\n\n現場已完成第一道防水",
  },
  {
    label: "完成",
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
      <SectionTitle title="LINE Bot" desc={`帳號 ${lineBotId}。點指令即可預覽回覆。`} />

      <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <Card>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black">測試指令</h3>
              <p className="mt-1 text-sm text-slate-500">功能導向，少文字。</p>
            </div>
            <Status>Supabase</Status>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {lineCommands.map((item) => {
              const isActive = activeCommand.command === item.command
              return (
                <button
                  key={item.command}
                  type="button"
                  onClick={() => setActiveCommand(item)}
                  className={`minimal-motion rounded-xl border p-4 text-left ${
                    isActive
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400"
                  }`}
                >
                  <span className="block text-xs font-black opacity-60">{item.label}</span>
                  <span className="mt-2 block text-sm font-black leading-6">{item.command}</span>
                </button>
              )
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">對話預覽</h3>
          <div className="mt-4 grid gap-4">
            <div className="ml-auto max-w-[88%] rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold leading-7 text-white shadow-sm">
              {activeCommand.command}
            </div>
            <div className="max-w-[92%] whitespace-pre-line rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold leading-7 text-slate-700 shadow-sm">
              {activeCommand.reply}
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            建議測試順序：綁定 → 今日任務 → 回報 → 完成 → 今日任務。
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricBox label="任務" value={visibleTasks.length} />
        <MetricBox label="回報" value={reportedTasks.length} />
        <MetricBox label="完成" value={completedTasks.length} />
      </div>

      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-black">回報紀錄</h3>
            <p className="mt-1 text-sm text-slate-500">LINE 或任務面板寫入。</p>
          </div>
          <Status>{reportedTasks.length ? "有資料" : "等待回報"}</Status>
        </div>

        <div className="mt-4 grid gap-3">
          {reportedTasks.map((task) => (
            <details key={task.id} className="minimal-detail bg-slate-50">
              <summary>
                <span>{task.id}｜{task.title}</span>
                <Status>{task.status}</Status>
              </summary>
              <div className="minimal-detail-body">
                <p className="text-sm font-bold text-slate-500">
                  {task.projectName}｜{task.workerName}
                </p>
                <p className="mt-3 rounded-lg bg-white p-3 text-sm font-bold leading-7 text-slate-700">
                  {task.report}
                </p>
              </div>
            </details>
          ))}

          {!reportedTasks.length && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              測試「回報 t-001 現場已完成第一道防水」，或在「我的任務」填寫回報。
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function MetricBox({ label, value }) {
  return (
    <Card>
      <p className="text-sm font-black text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </Card>
  )
}

export default LineBotPanel
