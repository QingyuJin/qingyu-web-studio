import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const STORAGE_KEY = "coachflow_robot_minimal_v1"
const today = new Date().toISOString().slice(0, 10)
const lineBotId = "@550oexzn"

const seedData = {
  students: [
    {
      id: "stu-001",
      name: "Kevin",
      goal: "增肌",
      level: "中階",
      line: "kevin_power",
      note: "下肢優先，週二回報。",
    },
    {
      id: "stu-002",
      name: "Amy",
      goal: "體態",
      level: "初階",
      line: "amy_fit",
      note: "動作穩定，重量保守。",
    },
  ],
  workouts: [
    {
      id: "w-001",
      studentId: "stu-001",
      studentName: "Kevin",
      date: today,
      title: "下肢力量",
      focus: "深蹲 / 硬舉",
      status: "待完成",
      report: "",
    },
    {
      id: "w-002",
      studentId: "stu-002",
      studentName: "Amy",
      date: today,
      title: "上肢基礎",
      focus: "推 / 拉",
      status: "待完成",
      report: "",
    },
  ],
  checkins: [
    {
      id: "ck-001",
      studentId: "stu-001",
      studentName: "Kevin",
      date: today,
      sleep: "7h",
      condition: "正常",
      note: "可照表訓練。",
    },
  ],
}

const modules = [
  { id: "dashboard", title: "總覽", hint: "今日狀態" },
  { id: "students", title: "學員", hint: "名單與目標" },
  { id: "workouts", title: "課表", hint: "排程與完成" },
  { id: "reports", title: "回報", hint: "紀錄與狀態" },
  { id: "robot", title: "Robot", hint: "可直接測" },
]

const robotCommands = [
  { label: "選單", command: "選單" },
  { label: "今日課表", command: "今日課表" },
  { label: "完成", command: "完成 w-001" },
  { label: "回報", command: "回報 w-001 深蹲完成，膝蓋正常" },
  { label: "狀態", command: "狀態" },
]

function CoachFlow() {
  const [data, setData] = useState(loadData)
  const [activeModule, setActiveModule] = useState("dashboard")
  const [activeStudentId, setActiveStudentId] = useState("stu-001")
  const [robotInput, setRobotInput] = useState("今日課表")
  const [robotReply, setRobotReply] = useState("點一個指令，右側會顯示 Robot 回覆。")

  const activeStudent = data.students.find((student) => student.id === activeStudentId) || data.students[0]
  const activeTasks = data.workouts.filter((task) => task.studentId === activeStudent?.id)

  const metrics = useMemo(
    () => [
      ["學員", data.students.length],
      ["今日", data.workouts.filter((item) => item.date === today).length],
      ["完成", data.workouts.filter((item) => item.status === "已完成").length],
      ["回報", data.workouts.filter((item) => item.report).length],
    ],
    [data],
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function resetDemo() {
    localStorage.removeItem(STORAGE_KEY)
    setData(cloneSeed())
    setRobotInput("今日課表")
    setRobotReply("Demo 已重置。")
  }

  function runRobot(command) {
    const text = command.trim()
    setRobotInput(text)

    if (text === "選單") {
      setRobotReply(`CoachFlow Robot\n\n今日課表\n完成 w-001\n回報 w-001 內容\n狀態\n\nLINE Bot：${lineBotId}`)
      return
    }

    if (text === "今日課表") {
      const tasks = activeTasks.filter((task) => task.status !== "已完成")
      setRobotReply(
        tasks.length
          ? `今日課表｜${activeStudent.name}\n\n${tasks
              .map((task) => `${task.id}｜${task.title}\n${task.focus}\n狀態：${task.status}`)
              .join("\n\n")}`
          : `${activeStudent.name} 目前沒有待完成課表。`,
      )
      return
    }

    if (text.startsWith("完成 ")) {
      const taskId = text.split(/\s+/)[1]
      const task = data.workouts.find((item) => item.id === taskId)
      if (!task) {
        setRobotReply(`找不到課表：${taskId}`)
        return
      }
      setData((current) => ({
        ...current,
        workouts: current.workouts.map((item) =>
          item.id === taskId ? { ...item, status: "已完成" } : item,
        ),
      }))
      setRobotReply(`已完成：${task.id}\n${task.studentName}｜${task.title}`)
      return
    }

    if (text.startsWith("回報 ")) {
      const [, taskId, ...contentParts] = text.split(/\s+/)
      const content = contentParts.join(" ").trim()
      const task = data.workouts.find((item) => item.id === taskId)
      if (!task) {
        setRobotReply(`找不到課表：${taskId}`)
        return
      }
      setData((current) => ({
        ...current,
        workouts: current.workouts.map((item) =>
          item.id === taskId ? { ...item, report: content || "已回報", status: "有回報" } : item,
        ),
      }))
      setRobotReply(`已收到回報：${task.id}\n${task.studentName}｜${task.title}\n\n${content || "已回報"}`)
      return
    }

    if (text === "狀態") {
      setRobotReply(
        `狀態｜${activeStudent.name}\n待完成：${activeTasks.filter((item) => item.status === "待完成").length}\n已完成：${
          activeTasks.filter((item) => item.status === "已完成").length
        }\n有回報：${activeTasks.filter((item) => item.report).length}`,
      )
      return
    }

    setRobotReply("可用指令：選單 / 今日課表 / 完成 w-001 / 回報 w-001 內容 / 狀態")
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin" className="text-sm font-bold text-slate-500">
              返回系統入口
            </Link>
            <h1 className="mt-2 text-2xl font-black">CoachFlow</h1>
            <p className="text-sm text-slate-500">課表、回報、Robot 測試。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={activeStudentId}
              onChange={(event) => setActiveStudentId(event.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
            >
              {data.students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white active:translate-y-px"
            >
              重置 Demo
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => setActiveModule(module.id)}
              className={`minimal-motion aspect-square rounded-2xl border p-4 text-left lg:aspect-auto lg:min-h-24 ${
                activeModule === module.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-950 hover:border-slate-400"
              }`}
            >
              <span className="block text-xl font-black">{module.title}</span>
              <span className="mt-2 block text-xs font-bold opacity-60">{module.hint}</span>
            </button>
          ))}
        </aside>

        <section className="minimal-motion min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
          {activeModule === "dashboard" && <Dashboard metrics={metrics} data={data} />}
          {activeModule === "students" && (
            <Students data={data} activeStudent={activeStudent} setActiveStudentId={setActiveStudentId} />
          )}
          {activeModule === "workouts" && <Workouts data={data} />}
          {activeModule === "reports" && <Reports data={data} />}
          {activeModule === "robot" && (
            <Robot
              activeStudent={activeStudent}
              robotCommands={robotCommands}
              robotInput={robotInput}
              robotReply={robotReply}
              runRobot={runRobot}
            />
          )}
        </section>
      </section>
    </main>
  )
}

function Dashboard({ metrics, data }) {
  return (
    <div className="grid gap-5">
      <PanelTitle title="總覽" desc="只看今天需要處理的事。" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-black text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>
      <MiniList title="今日課表" items={data.workouts.map((item) => `${item.id}｜${item.studentName}｜${item.title}`)} />
    </div>
  )
}

function Students({ data, activeStudent, setActiveStudentId }) {
  return (
    <div className="grid gap-5">
      <PanelTitle title="學員" desc="點名單，右側換資料。" />
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="grid gap-2">
          {data.students.map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => setActiveStudentId(student.id)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-black active:translate-y-px ${
                activeStudent.id === student.id ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700"
              }`}
            >
              {student.name}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-black text-slate-500">學員資料</p>
          <h3 className="mt-2 text-2xl font-black">{activeStudent.name}</h3>
          <div className="mt-4 grid gap-2 text-sm font-bold text-slate-600">
            <p>目標：{activeStudent.goal}</p>
            <p>程度：{activeStudent.level}</p>
            <p>LINE：{activeStudent.line}</p>
            <p>備註：{activeStudent.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Workouts({ data }) {
  return (
    <div className="grid gap-5">
      <PanelTitle title="課表" desc="外層只顯示課表狀態，細節點開看。" />
      <div className="grid gap-3">
        {data.workouts.map((task) => (
          <details key={task.id} className="minimal-detail bg-slate-50">
            <summary>
              <span>{task.id}｜{task.studentName}｜{task.title}</span>
              <span className="rounded-full bg-white px-2 py-1 text-xs">{task.status}</span>
            </summary>
            <div className="minimal-detail-body text-sm leading-7 text-slate-600">
              <p>日期：{task.date}</p>
              <p>重點：{task.focus}</p>
              <p>回報：{task.report || "尚未回報"}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

function Reports({ data }) {
  const reported = data.workouts.filter((task) => task.report)

  return (
    <div className="grid gap-5">
      <PanelTitle title="回報" desc="Robot 或學員送出的紀錄。" />
      <MiniList
        title="回報紀錄"
        items={reported.map((item) => `${item.id}｜${item.studentName}｜${item.report}`)}
        empty="目前沒有回報。"
      />
      <MiniList
        title="身體狀態"
        items={data.checkins.map((item) => `${item.studentName}｜${item.condition}｜${item.note}`)}
      />
    </div>
  )
}

function Robot({ activeStudent, robotCommands, robotInput, robotReply, runRobot }) {
  return (
    <div className="grid gap-5">
      <PanelTitle title="Robot" desc={`LINE Bot：${lineBotId}。這裡可直接測。`} />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black text-slate-500">測試指令</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {robotCommands.map((item) => (
              <button
                key={item.command}
                type="button"
                onClick={() => runRobot(item.command)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-black hover:border-slate-500 active:translate-y-px"
              >
                <span className="block text-xs text-slate-500">{item.label}</span>
                <span className="mt-1 block">{item.command}</span>
              </button>
            ))}
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault()
              const form = new FormData(event.currentTarget)
              runRobot(String(form.get("command") || ""))
            }}
          >
            <input
              name="command"
              defaultValue={robotInput}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm"
            />
            <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
              送出
            </button>
          </form>
        </div>
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <p className="text-sm font-black text-slate-400">對話預覽｜{activeStudent.name}</p>
          <div className="mt-4 grid gap-3">
            <div className="ml-auto max-w-[86%] rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-bold">
              {robotInput}
            </div>
            <div className="max-w-[92%] whitespace-pre-line rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold leading-7">
              {robotReply}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
        測試方式：點「今日課表」看待辦，點「回報」寫入紀錄，點「完成」同步狀態。
      </div>
    </div>
  )
}

function MiniList({ title, items, empty = "目前沒有資料。" }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <h3 className="font-black">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.length ? (
          items.map((item) => (
            <div key={item} className="rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-700">
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">{empty}</p>
        )}
      </div>
    </div>
  )
}

function PanelTitle({ title, desc }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">CoachFlow</p>
      <h2 className="mt-2 text-2xl font-black">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
    </div>
  )
}

function cloneSeed() {
  return JSON.parse(JSON.stringify(seedData))
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneSeed()
    const parsed = JSON.parse(raw)
    return {
      students: Array.isArray(parsed.students) ? parsed.students : seedData.students,
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : seedData.workouts,
      checkins: Array.isArray(parsed.checkins) ? parsed.checkins : seedData.checkins,
    }
  } catch {
    return cloneSeed()
  }
}

export default CoachFlow
