import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const STORAGE_KEY = "coachflow_product_case_v1"
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
      note: "下肢優先。",
    },
    {
      id: "stu-002",
      name: "Amy",
      goal: "體態",
      level: "初階",
      line: "amy_fit",
      note: "重量保守。",
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
  checkins: [{ id: "ck-001", studentName: "Kevin", condition: "正常", note: "可照表訓練。" }],
}

const modules = [
  { id: "overview", title: "總覽", hint: "狀態" },
  { id: "students", title: "學員", hint: "資料" },
  { id: "workouts", title: "課表", hint: "追蹤" },
  { id: "reports", title: "回報", hint: "紀錄" },
  { id: "robot", title: "Robot", hint: "測試" },
]

const robotCommands = ["選單", "今日課表", "回報 w-001 深蹲完成，膝蓋正常", "完成 w-001", "狀態"]

function CoachFlow() {
  const [data, setData] = useState(loadData)
  const [activeModule, setActiveModule] = useState("overview")
  const [activeStudentId, setActiveStudentId] = useState("stu-001")
  const [robotInput, setRobotInput] = useState("今日課表")
  const [robotReply, setRobotReply] = useState("點指令即可測 Robot 回覆。")

  const activeStudent =
    data.students.find((student) => student.id === activeStudentId) || data.students[0]
  const activeWorkouts = data.workouts.filter((item) => item.studentId === activeStudent.id)

  const metrics = useMemo(
    () => [
      ["學員", data.students.length],
      ["課表", data.workouts.length],
      ["完成", data.workouts.filter((item) => item.status === "已完成").length],
      ["回報", data.workouts.filter((item) => item.report).length],
    ],
    [data]
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function resetData() {
    localStorage.removeItem(STORAGE_KEY)
    setData(cloneSeed())
    setRobotInput("今日課表")
    setRobotReply("測試資料已重置。")
  }

  function runRobot(command) {
    const text = command.trim()
    setRobotInput(text)

    if (text === "選單") {
      setRobotReply(
        `CoachFlow\n\n今日課表\n回報 w-001 內容\n完成 w-001\n狀態\n\nLINE Bot：${lineBotId}`
      )
      return
    }

    if (text === "今日課表") {
      const tasks = activeWorkouts.filter((task) => task.status !== "已完成")
      setRobotReply(
        tasks.length
          ? `${activeStudent.name}｜今日課表\n\n${tasks
              .map((task) => `${task.id}｜${task.title}\n${task.focus}\n${task.status}`)
              .join("\n\n")}`
          : `${activeStudent.name} 目前沒有待完成課表。`
      )
      return
    }

    if (text.startsWith("回報 ")) {
      const [, taskId, ...parts] = text.split(/\s+/)
      const content = parts.join(" ").trim() || "已回報"
      const target = data.workouts.find((task) => task.id === taskId)
      if (!target) {
        setRobotReply(`找不到課表：${taskId}`)
        return
      }
      setData((current) => ({
        ...current,
        workouts: current.workouts.map((task) =>
          task.id === taskId ? { ...task, report: content, status: "有回報" } : task
        ),
      }))
      setRobotReply(`已收到回報\n${target.studentName}｜${target.title}\n\n${content}`)
      return
    }

    if (text.startsWith("完成 ")) {
      const taskId = text.split(/\s+/)[1]
      const target = data.workouts.find((task) => task.id === taskId)
      if (!target) {
        setRobotReply(`找不到課表：${taskId}`)
        return
      }
      setData((current) => ({
        ...current,
        workouts: current.workouts.map((task) =>
          task.id === taskId ? { ...task, status: "已完成" } : task
        ),
      }))
      setRobotReply(`已完成\n${target.studentName}｜${target.title}`)
      return
    }

    if (text === "狀態") {
      setRobotReply(
        `${activeStudent.name}｜狀態\n待完成：${activeWorkouts.filter((task) => task.status === "待完成").length}\n已完成：${
          activeWorkouts.filter((task) => task.status === "已完成").length
        }\n有回報：${activeWorkouts.filter((task) => task.report).length}`
      )
      return
    }

    setRobotReply("可用指令：選單 / 今日課表 / 回報 w-001 內容 / 完成 w-001 / 狀態")
  }

  return (
    <main className="min-h-screen bg-[#0b111b] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0b111b]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/" className="text-sm font-bold text-cyan-300">
              ← 系統作品集
            </Link>
            <h1 className="mt-2 text-2xl font-black text-white">CoachFlow</h1>
            <p className="text-sm font-bold text-slate-400">課表、回報、Robot 測試。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={activeStudentId}
              onChange={(event) => setActiveStudentId(event.target.value)}
              className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-white"
            >
              {data.students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={resetData}
              className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950"
            >
              重置測試資料
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          <div className="col-span-2 rounded-[24px] border border-white/10 bg-white/[0.045] p-5 lg:col-span-1">
            <p className="text-xs font-black uppercase text-cyan-300">Training Flow</p>
            <h2 className="mt-3 text-3xl font-black text-white">教練工作流</h2>
            <p className="mt-3 text-sm font-bold leading-7 text-slate-300">
              學員、課表、回報，一次看清楚。
            </p>
            <p className="mt-4 rounded-xl bg-[#111827] px-4 py-3 font-mono text-sm font-black text-cyan-200">
              LINE {lineBotId}
            </p>
          </div>

          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              onClick={() => setActiveModule(module.id)}
              className={`aspect-square rounded-[22px] border p-4 text-left transition lg:aspect-auto lg:min-h-24 ${
                activeModule === module.id
                  ? "border-cyan-300 bg-cyan-300 text-slate-950"
                  : "border-white/10 bg-white/[0.045] text-slate-100 hover:border-cyan-300/40"
              }`}
            >
              <span className="block text-xl font-black">{module.title}</span>
              <span className="mt-2 block text-xs font-bold opacity-65">{module.hint}</span>
            </button>
          ))}
        </aside>

        <section className="min-w-0 rounded-[28px] border border-white/10 bg-white/[0.045] p-5 md:p-6">
          {activeModule === "overview" && <Overview metrics={metrics} data={data} />}
          {activeModule === "students" && (
            <Students
              data={data}
              activeStudent={activeStudent}
              setActiveStudentId={setActiveStudentId}
            />
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

function Overview({ metrics, data }) {
  return (
    <div className="grid gap-5">
      <PanelTitle title="總覽" desc="只看狀態，細節展開。" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-[#111827] p-4">
            <p className="text-sm font-black text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>
      <MiniList
        title="今日課表"
        items={data.workouts.map((item) => `${item.id}｜${item.studentName}｜${item.title}`)}
      />
    </div>
  )
}

function Students({ data, activeStudent, setActiveStudentId }) {
  return (
    <div className="grid gap-5">
      <PanelTitle title="學員" desc="點姓名切換資料。" />
      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="grid gap-2">
          {data.students.map((student) => (
            <button
              key={student.id}
              type="button"
              onClick={() => setActiveStudentId(student.id)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-black ${
                activeStudent.id === student.id
                  ? "bg-cyan-300 text-slate-950"
                  : "bg-[#111827] text-slate-300"
              }`}
            >
              {student.name}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-[#111827] p-4">
          <p className="text-sm font-black text-cyan-300">資料</p>
          <h3 className="mt-2 text-2xl font-black text-white">{activeStudent.name}</h3>
          <div className="mt-4 grid gap-2 text-sm font-bold text-slate-300">
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
      <PanelTitle title="課表" desc="列表簡短，點開看內容。" />
      <div className="grid gap-3">
        {data.workouts.map((task) => (
          <details key={task.id} className="minimal-detail bg-[#111827]">
            <summary>
              <span>
                {task.id}｜{task.studentName}｜{task.title}
              </span>
              <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{task.status}</span>
            </summary>
            <div className="minimal-detail-body text-sm font-bold leading-7 text-slate-300">
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
      <PanelTitle title="回報" desc="Robot 寫入後會出現在這裡。" />
      <MiniList
        title="課表回報"
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
      <PanelTitle title="Robot" desc={`可用 ${lineBotId} 測，這裡先看回覆邏輯。`} />
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm font-black text-slate-400">指令</p>
          <div className="mt-3 grid gap-2">
            {robotCommands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => runRobot(command)}
                className="rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-left text-sm font-black text-slate-200 hover:border-cyan-300/40"
              >
                {command}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#080d14] p-4 text-white">
          <p className="text-sm font-black text-slate-400">對話 / {activeStudent.name}</p>
          <div className="mt-4 grid gap-3">
            <div className="ml-auto max-w-[86%] rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-black text-slate-950">
              {robotInput}
            </div>
            <div className="max-w-[92%] whitespace-pre-line rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold leading-7">
              {robotReply}
            </div>
          </div>
        </div>
      </div>
      <p className="rounded-xl border border-white/10 bg-[#111827] p-4 text-sm font-bold leading-7 text-slate-300">
        測試：今日課表 → 回報 w-001 內容 → 完成 w-001 → 狀態。
      </p>
    </div>
  )
}

function MiniList({ title, items, empty = "目前沒有資料。" }) {
  return (
    <div className="rounded-2xl bg-[#111827] p-4">
      <h3 className="font-black text-white">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.length ? (
          items.map((item) => (
            <div
              key={item}
              className="rounded-xl bg-white/[0.055] px-3 py-2 text-sm font-bold text-slate-300"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">{empty}</p>
        )}
      </div>
    </div>
  )
}

function PanelTitle({ title, desc }) {
  return (
    <div>
      <p className="text-xs font-black uppercase text-cyan-300">CoachFlow</p>
      <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
      <p className="mt-1 text-sm font-bold leading-6 text-slate-400">{desc}</p>
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
