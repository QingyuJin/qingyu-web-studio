import { useMemo, useState } from "react"
import Card from "../shared/Card"
import SectionTitle from "../shared/SectionTitle"
import Status from "../shared/Status"

const lineCommands = [
  {
    label: "健康檢查",
    command: "測試",
    reply: "系統在線。輸入「選單」開始測試。",
  },
  {
    label: "互動選單",
    command: "選單",
    reply:
      "BuildFlow 工程助理\n\n你可以直接測：\n1. 案例：看工程照片與項目\n2. 報價：產生需求摘要\n3. 流程：了解接案步驟\n4. 綁定碼：取得測試帳號\n\nLINE Bot：@550oexzn",
  },
  {
    label: "案例導覽",
    command: "案例",
    reply:
      "近期工程案例\n\n- 室內木地板整理\n- 屋頂防水整理\n- 室內地坪施工\n- 外牆修繕評估\n\n到網站可看照片案例。",
  },
  {
    label: "報價格式",
    command: "報價",
    reply:
      "需求摘要格式\n\n姓名：\n電話 / LINE：\n案場地區：\n工程類型：\n目前狀況：\n希望時間：\n照片：可先傳 LINE\n\n前台可轉成 BuildFlow 案件。",
  },
  {
    label: "完整測試",
    command: "工程測試",
    reply:
      "推薦測試順序\n\n1. 測試\n2. 選單\n3. 案例\n4. 綁定 BF-AMING-1234\n5. 今日任務\n6. 回報 t-001 現場已完成第一道防水\n7. 完成 t-001\n8. 今日任務",
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
        desc="公開選單可先玩，綁定後可查任務、回報進度與完成任務。"
      />

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-black">可測指令</h3>
              <p className="mt-1 text-sm text-slate-500">LINE Bot：@550oexzn</p>
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
            訪客可測「選單、案例、報價、流程、綁定碼」。師傅綁定後，LINE 端可直接查任務與寫回
            Supabase。
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
