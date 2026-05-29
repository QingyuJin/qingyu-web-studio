import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const STORAGE_KEY = "coachflow_v1_data"
const today = new Date().toISOString().slice(0, 10)

const demoData = {
  students: [
    {
      id: "stu-001",
      name: "Kevin",
      goal: "力量提升",
      level: "Intermediate",
      contact: "LINE: kevin_power",
      note: "深蹲卡關，想提升下肢力量。",
    },
    {
      id: "stu-002",
      name: "Amy",
      goal: "增肌與體態",
      level: "Beginner",
      contact: "LINE: amy_fit",
      note: "一週可訓練 3 天，想建立穩定習慣。",
    },
    {
      id: "stu-003",
      name: "Ryan",
      goal: "減脂與體能",
      level: "Beginner",
      contact: "LINE: ryan_run",
      note: "外食多，睡眠不固定，需要先建立紀律。",
    },
  ],

  workouts: [
    {
      id: "w-001",
      studentId: "stu-001",
      studentName: "Kevin",
      date: today,
      title: "Lower Strength Day",
      focus: "深蹲主項 / 下肢力量",
      status: "待完成",
      note: "主項不要硬衝，保持動作品質。",
      exercises: [
        { id: "e-001", name: "Back Squat", sets: 5, reps: 5, load: "140kg", rpe: "7", done: false },
        { id: "e-002", name: "Romanian Deadlift", sets: 4, reps: 8, load: "90kg", rpe: "7", done: false },
        { id: "e-003", name: "Leg Press", sets: 3, reps: 12, load: "Moderate", rpe: "8", done: false },
      ],
    },
    {
      id: "w-002",
      studentId: "stu-002",
      studentName: "Amy",
      date: today,
      title: "Upper Hypertrophy",
      focus: "上肢肌肥大",
      status: "待完成",
      note: "每組保留 1–2 下，不用做到爆。",
      exercises: [
        { id: "e-004", name: "Machine Chest Press", sets: 4, reps: 10, load: "輕中等", rpe: "7", done: false },
        { id: "e-005", name: "Lat Pulldown", sets: 4, reps: 12, load: "輕中等", rpe: "7", done: false },
        { id: "e-006", name: "DB Shoulder Press", sets: 3, reps: 10, load: "輕", rpe: "7", done: false },
      ],
    },
  ],

  checkins: [
    {
      id: "ck-001",
      studentId: "stu-001",
      studentName: "Kevin",
      date: today,
      sleep: "7 小時",
      fatigue: "普通",
      pain: "左膝微緊",
      note: "深蹲熱身要拉長。",
    },
    {
      id: "ck-002",
      studentId: "stu-002",
      studentName: "Amy",
      date: today,
      sleep: "6 小時",
      fatigue: "偏累",
      pain: "無",
      note: "今天重量保守一點。",
    },
  ],
}

const coachTabs = [
  { id: "dashboard", label: "總覽" },
  { id: "students", label: "學生管理" },
  { id: "workouts", label: "課表管理" },
  { id: "checkins", label: "狀態回報" },
  { id: "linebot", label: "LINE Bot" },
]

const studentTabs = [
  { id: "student", label: "今日課表" },
  { id: "linebot", label: "LINE Bot" },
]

function CoachFlow() {
  const [data, setData] = useState(loadInitialData)
  const [viewRole, setViewRole] = useState("coach")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [activeStudentId, setActiveStudentId] = useState("stu-001")
  const [savedAt, setSavedAt] = useState("")

  const { students, workouts, checkins } = data
  const activeStudent = students.find((student) => student.id === activeStudentId)
  const tabs = viewRole === "coach" ? coachTabs : studentTabs

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSavedAt(new Date().toLocaleTimeString("zh-TW", { hour12: false }))
  }, [data])

  const metrics = useMemo(() => {
    const todayWorkouts = workouts.filter((item) => item.date === today)
    const completed = workouts.filter((item) => item.status === "已完成")
    const pending = workouts.filter((item) => item.status !== "已完成")

    return {
      studentCount: students.length,
      todayWorkoutCount: todayWorkouts.length,
      completedCount: completed.length,
      pendingCount: pending.length,
      checkinCount: checkins.length,
    }
  }, [students, workouts, checkins])

  const activeStudentWorkouts = workouts.filter(
    (workout) => workout.studentId === activeStudentId
  )

  const activeStudentCheckins = checkins.filter(
    (checkin) => checkin.studentId === activeStudentId
  )

  function switchRole(role) {
    setViewRole(role)
    setActiveTab(role === "coach" ? "dashboard" : "student")
  }

  function resetDemoData() {
    const confirmed = window.confirm("確定要重置 CoachFlow Demo 資料嗎？")
    if (!confirmed) return

    localStorage.removeItem(STORAGE_KEY)
    setData(cloneDemoData())
  }

  function addStudent(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const newStudent = {
      id: createId("stu"),
      name: textValue(form, "name"),
      goal: textValue(form, "goal"),
      level: textValue(form, "level"),
      contact: textValue(form, "contact"),
      note: textValue(form, "note"),
    }

    setData((current) => ({
      ...current,
      students: [newStudent, ...current.students],
    }))

    event.currentTarget.reset()
  }

  function deleteStudent(studentId) {
    const student = students.find((item) => item.id === studentId)
    const confirmed = window.confirm(
      `確定刪除「${student?.name || "這位學生"}」嗎？相關課表與回報也會移除。`
    )
    if (!confirmed) return

    setData((current) => ({
      ...current,
      students: current.students.filter((item) => item.id !== studentId),
      workouts: current.workouts.filter((item) => item.studentId !== studentId),
      checkins: current.checkins.filter((item) => item.studentId !== studentId),
    }))

    if (activeStudentId === studentId) {
      const nextStudent = students.find((item) => item.id !== studentId)
      if (nextStudent) setActiveStudentId(nextStudent.id)
    }
  }

  function addWorkout(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const student = students.find((item) => item.id === textValue(form, "studentId"))

    const newWorkout = {
      id: createId("w"),
      studentId: student?.id || "",
      studentName: student?.name || "未指定學生",
      date: textValue(form, "date") || today,
      title: textValue(form, "title"),
      focus: textValue(form, "focus"),
      status: "待完成",
      note: textValue(form, "note"),
      exercises: [
        {
          id: createId("e"),
          name: textValue(form, "exercise1") || "Main Lift",
          sets: numberValue(form, "sets1") || 3,
          reps: numberValue(form, "reps1") || 8,
          load: textValue(form, "load1") || "依狀態調整",
          rpe: textValue(form, "rpe1") || "7",
          done: false,
        },
        {
          id: createId("e"),
          name: textValue(form, "exercise2") || "Accessory",
          sets: numberValue(form, "sets2") || 3,
          reps: numberValue(form, "reps2") || 10,
          load: textValue(form, "load2") || "依狀態調整",
          rpe: textValue(form, "rpe2") || "7",
          done: false,
        },
      ],
    }

    setData((current) => ({
      ...current,
      workouts: [newWorkout, ...current.workouts],
    }))

    event.currentTarget.reset()
  }

  function deleteWorkout(workoutId) {
    const confirmed = window.confirm("確定刪除這份課表嗎？")
    if (!confirmed) return

    setData((current) => ({
      ...current,
      workouts: current.workouts.filter((item) => item.id !== workoutId),
    }))
  }

  function toggleExercise(workoutId, exerciseId) {
    setData((current) => ({
      ...current,
      workouts: current.workouts.map((workout) => {
        if (workout.id !== workoutId) return workout

        const nextExercises = workout.exercises.map((exercise) =>
          exercise.id === exerciseId ? { ...exercise, done: !exercise.done } : exercise
        )

        const allDone = nextExercises.every((exercise) => exercise.done)

        return {
          ...workout,
          exercises: nextExercises,
          status: allDone ? "已完成" : "進行中",
        }
      }),
    }))
  }

  function markWorkoutComplete(workoutId) {
    setData((current) => ({
      ...current,
      workouts: current.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              status: workout.status === "已完成" ? "待完成" : "已完成",
              exercises: workout.exercises.map((exercise) => ({
                ...exercise,
                done: workout.status !== "已完成",
              })),
            }
          : workout
      ),
    }))
  }

  function addCheckin(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const student = students.find((item) => item.id === textValue(form, "studentId"))

    const newCheckin = {
      id: createId("ck"),
      studentId: student?.id || "",
      studentName: student?.name || "未指定學生",
      date: textValue(form, "date") || today,
      sleep: textValue(form, "sleep"),
      fatigue: textValue(form, "fatigue"),
      pain: textValue(form, "pain"),
      note: textValue(form, "note"),
    }

    setData((current) => ({
      ...current,
      checkins: [newCheckin, ...current.checkins],
    }))

    event.currentTarget.reset()
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin" className="text-sm font-bold text-slate-500">
              ← 回管理入口
            </Link>
            <h1 className="mt-2 text-2xl font-black">CoachFlow</h1>
            <p className="text-sm text-slate-500">
              健身教練課表、完成回報與 LINE Bot 系統骨架
            </p>
            <p className="mt-1 text-xs text-slate-400">
              本機資料保存中｜最後保存：{savedAt || "尚未保存"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => switchRole("coach")}
              className={`rounded-xl px-4 py-2 text-sm font-black ${
                viewRole === "coach"
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              教練視角
            </button>

            <button
              onClick={() => switchRole("student")}
              className={`rounded-xl px-4 py-2 text-sm font-black ${
                viewRole === "student"
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              學生視角
            </button>

            {viewRole === "student" && (
              <select
                value={activeStudentId}
                onChange={(event) => setActiveStudentId(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
              >
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={resetDemoData}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-black text-red-600"
            >
              重置 Demo
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-black text-slate-500">功能選單</p>

          <nav className="grid gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-bold ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
            <p className="font-black text-slate-950">目前身份</p>
            <p className="mt-1">
              {viewRole === "coach" ? "教練 / 管理者" : activeStudent?.name}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              教練可管理學生與課表；學生只看自己的訓練與回報。
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          {activeTab === "dashboard" && (
            <CoachDashboard
              metrics={metrics}
              students={students}
              workouts={workouts}
              checkins={checkins}
            />
          )}

          {activeTab === "students" && (
            <StudentsPanel
              students={students}
              addStudent={addStudent}
              deleteStudent={deleteStudent}
            />
          )}

          {activeTab === "workouts" && (
            <WorkoutsPanel
              students={students}
              workouts={workouts}
              addWorkout={addWorkout}
              deleteWorkout={deleteWorkout}
              markWorkoutComplete={markWorkoutComplete}
              toggleExercise={toggleExercise}
            />
          )}

          {activeTab === "checkins" && (
            <CheckinsPanel
              students={students}
              checkins={checkins}
              addCheckin={addCheckin}
            />
          )}

          {activeTab === "student" && (
            <StudentPanel
              student={activeStudent}
              workouts={activeStudentWorkouts}
              checkins={activeStudentCheckins}
              toggleExercise={toggleExercise}
              markWorkoutComplete={markWorkoutComplete}
            />
          )}

          {activeTab === "linebot" && (
            <LineBotPanel
              activeStudent={activeStudent}
              workouts={activeStudentWorkouts}
              checkins={activeStudentCheckins}
            />
          )}
        </section>
      </section>
    </main>
  )
}

function CoachDashboard({ metrics, students, workouts, checkins }) {
  const pendingWorkouts = workouts.filter((item) => item.status !== "已完成")

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="教練總覽"
        desc="查看學生、今日課表、完成狀態與身體狀態回報。"
      />

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        <Metric label="學生數" value={metrics.studentCount} />
        <Metric label="今日課表" value={metrics.todayWorkoutCount} />
        <Metric label="已完成課表" value={metrics.completedCount} />
        <Metric label="待完成課表" value={metrics.pendingCount} danger />
        <Metric label="狀態回報" value={metrics.checkinCount} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="text-xl font-black">學生列表</h3>
          <div className="mt-4 grid gap-3">
            {students.map((student) => (
              <div key={student.id} className="rounded-xl bg-slate-50 p-4">
                <p className="font-black">{student.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {student.goal}｜{student.level}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-black">待完成課表</h3>
          <div className="mt-4 grid gap-3">
            {pendingWorkouts.map((workout) => (
              <div key={workout.id} className="rounded-xl bg-amber-50 p-4">
                <p className="font-black text-amber-700">{workout.studentName}</p>
                <p className="mt-1 text-sm text-amber-700/80">
                  {workout.title}｜{workout.date}
                </p>
              </div>
            ))}

            {!pendingWorkouts.length && (
              <p className="text-sm text-slate-500">目前沒有待完成課表。</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

function StudentsPanel({ students, addStudent, deleteStudent }) {
  return (
    <div className="grid gap-5">
      <SectionTitle title="學生管理" desc="新增學生、記錄目標、程度與聯絡方式。" />

      <Card>
        <h3 className="text-xl font-black">新增學生</h3>

        <form onSubmit={addStudent} className="mt-4 grid gap-3 md:grid-cols-2">
          <Input name="name" label="學生姓名" required />
          <Input name="goal" label="目標" placeholder="力量提升 / 增肌 / 減脂" />
          <Input name="level" label="程度" placeholder="Beginner / Intermediate" />
          <Input name="contact" label="聯絡方式" placeholder="LINE / Email" />
          <Input name="note" label="備註" />

          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增學生
          </button>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {students.map((student) => (
          <Card key={student.id}>
            <p className="text-sm font-bold text-slate-500">{student.level}</p>
            <h3 className="mt-2 text-xl font-black">{student.name}</h3>
            <p className="mt-3 font-black">{student.goal}</p>
            <p className="mt-2 text-sm text-slate-500">{student.contact}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{student.note}</p>

            <button
              onClick={() => deleteStudent(student.id)}
              className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-xs font-black text-red-600"
            >
              刪除學生
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}

function WorkoutsPanel({
  students,
  workouts,
  addWorkout,
  deleteWorkout,
  markWorkoutComplete,
  toggleExercise,
}) {
  return (
    <div className="grid gap-5">
      <SectionTitle title="課表管理" desc="建立學生課表、安排日期、追蹤完成狀態。" />

      <Card>
        <h3 className="text-xl font-black">新增課表</h3>

        <form onSubmit={addWorkout} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">學生</span>
            <select name="studentId" className="rounded-xl border border-slate-200 px-4 py-3">
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>

          <Input name="date" label="訓練日期" type="date" />
          <Input name="title" label="課表名稱" placeholder="Lower Strength Day" required />
          <Input name="focus" label="訓練重點" placeholder="深蹲主項 / 上肢肌肥大" />
          <Input name="exercise1" label="動作 1" placeholder="Back Squat" />
          <Input name="sets1" label="組數 1" type="number" />
          <Input name="reps1" label="次數 1" type="number" />
          <Input name="load1" label="重量 1" placeholder="140kg / 中等" />
          <Input name="rpe1" label="RPE 1" placeholder="7" />
          <Input name="exercise2" label="動作 2" placeholder="Romanian Deadlift" />
          <Input name="sets2" label="組數 2" type="number" />
          <Input name="reps2" label="次數 2" type="number" />
          <Input name="load2" label="重量 2" placeholder="90kg / 中等" />
          <Input name="rpe2" label="RPE 2" placeholder="7" />
          <Input name="note" label="備註" />

          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增課表
          </button>
        </form>
      </Card>

      <WorkoutList
        workouts={workouts}
        deleteWorkout={deleteWorkout}
        markWorkoutComplete={markWorkoutComplete}
        toggleExercise={toggleExercise}
        showStudent
      />
    </div>
  )
}

function CheckinsPanel({ students, checkins, addCheckin }) {
  return (
    <div className="grid gap-5">
      <SectionTitle
        title="狀態回報"
        desc="記錄睡眠、疲勞、疼痛與訓練前狀態，讓課表調整更有依據。"
      />

      <Card>
        <h3 className="text-xl font-black">新增狀態回報</h3>

        <form onSubmit={addCheckin} className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600">學生</span>
            <select name="studentId" className="rounded-xl border border-slate-200 px-4 py-3">
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>

          <Input name="date" label="日期" type="date" />
          <Input name="sleep" label="睡眠" placeholder="7 小時" />
          <Input name="fatigue" label="疲勞程度" placeholder="低 / 普通 / 高" />
          <Input name="pain" label="疼痛狀態" placeholder="無 / 肩膀緊 / 膝蓋不適" />
          <Input name="note" label="備註" />

          <button className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white md:col-span-2">
            新增回報
          </button>
        </form>
      </Card>

      <div className="grid gap-3">
        {checkins.map((item) => (
          <Card key={item.id}>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">{item.date}</p>
                <h3 className="mt-2 text-xl font-black">{item.studentName}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  睡眠：{item.sleep}｜疲勞：{item.fatigue}｜疼痛：{item.pain}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.note}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StudentPanel({ student, workouts, checkins, toggleExercise, markWorkoutComplete }) {
  return (
    <div className="grid gap-5">
      <SectionTitle
        title={`${student?.name || "學生"}的今日課表`}
        desc="學生只能查看自己的課表、完成動作與回報狀態。"
      />

      <Card>
        <h3 className="text-xl font-black">我的訓練目標</h3>
        <p className="mt-3 leading-7 text-slate-600">
          目標：{student?.goal}｜程度：{student?.level}
        </p>
        <p className="mt-2 leading-7 text-slate-600">{student?.note}</p>
      </Card>

      <WorkoutList
        workouts={workouts}
        markWorkoutComplete={markWorkoutComplete}
        toggleExercise={toggleExercise}
        studentMode
      />

      <Card>
        <h3 className="text-xl font-black">最近狀態回報</h3>
        <div className="mt-4 grid gap-3">
          {checkins.map((item) => (
            <div key={item.id} className="rounded-xl bg-slate-50 p-4">
              <p className="font-black">{item.date}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                睡眠：{item.sleep}｜疲勞：{item.fatigue}｜疼痛：{item.pain}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.note}</p>
            </div>
          ))}

          {!checkins.length && <p className="text-sm text-slate-500">目前沒有回報。</p>}
        </div>
      </Card>
    </div>
  )
}

function WorkoutList({
  workouts,
  deleteWorkout,
  markWorkoutComplete,
  toggleExercise,
  showStudent = false,
  studentMode = false,
}) {
  return (
    <div className="grid gap-4">
      {workouts.map((workout) => (
        <Card key={workout.id}>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">
                {workout.date}
                {showStudent ? `｜${workout.studentName}` : ""}
              </p>
              <h3 className="mt-2 text-xl font-black">{workout.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{workout.focus}</p>
              <p className="mt-1 text-sm text-slate-500">{workout.note}</p>
            </div>

            <Status>{workout.status}</Status>
          </div>

          <div className="mt-5 grid gap-3">
            {workout.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-black">{exercise.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {exercise.sets} 組 x {exercise.reps} 下｜{exercise.load}｜RPE {exercise.rpe}
                  </p>
                </div>

                <button
                  onClick={() => toggleExercise(workout.id, exercise.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-black ${
                    exercise.done
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {exercise.done ? "已完成" : "標記完成"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => markWorkoutComplete(workout.id)}
              className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
            >
              {workout.status === "已完成" ? "取消完成" : "整份課表完成"}
            </button>

            {!studentMode && deleteWorkout && (
              <button
                onClick={() => deleteWorkout(workout.id)}
                className="rounded-xl bg-red-50 px-4 py-3 text-sm font-black text-red-600"
              >
                刪除課表
              </button>
            )}
          </div>
        </Card>
      ))}

      {!workouts.length && (
        <Card>
          <p className="text-slate-500">目前沒有課表。</p>
        </Card>
      )}
    </div>
  )
}

function LineBotPanel({ activeStudent, workouts, checkins }) {
  const todayWorkout = workouts.find((item) => item.date === today) || workouts[0]
  const latestCheckin = checkins[0]

  const examples = [
    {
      user: "今日課表",
      bot: todayWorkout
        ? `${activeStudent?.name || "學生"} 今天的課表：${todayWorkout.title}｜${todayWorkout.focus}`
        : "今天尚未安排課表。",
    },
    {
      user: "完成 今日課表",
      bot: "已收到完成回報，教練端會看到你的課表完成狀態。",
    },
    {
      user: "回報 疲勞高 左膝緊",
      bot: "已建立狀態回報：疲勞高、左膝緊。建議訓練前多做熱身並回報教練。",
    },
    {
      user: "查狀態",
      bot: latestCheckin
        ? `最近回報：睡眠 ${latestCheckin.sleep}｜疲勞 ${latestCheckin.fatigue}｜疼痛 ${latestCheckin.pain}`
        : "目前沒有狀態回報。",
    },
  ]

  return (
    <div className="grid gap-5">
      <SectionTitle
        title="LINE Bot 模擬"
        desc="未來可串接 LINE Messaging API，讓學生查課表、回報完成與回報身體狀態。"
      />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h3 className="text-xl font-black">可支援指令</h3>

          <div className="mt-4 grid gap-3">
            {["今日課表", "完成 今日課表", "回報 疲勞 / 疼痛", "查狀態", "提醒訓練"].map((item) => (
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
            目前為模擬流程。之後接真 API 時，會從資料庫查詢學生、課表、完成紀錄與身體狀態回報。
          </div>
        </Card>
      </div>
    </div>
  )
}

function SectionTitle({ title, desc }) {
  return (
    <div>
      <h2 className="text-3xl font-black tracking-[-0.04em]">{title}</h2>
      {desc && <p className="mt-2 leading-7 text-slate-600">{desc}</p>}
    </div>
  )
}

function Card({ children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </section>
  )
}

function Metric({ label, value, danger = false }) {
  return (
    <Card>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className={`mt-3 text-2xl font-black ${danger ? "text-red-600" : "text-slate-950"}`}>
        {value}
      </p>
    </Card>
  )
}

function Input({ label, name, type = "text", placeholder = "", required = false }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-500"
      />
    </label>
  )
}

function Status({ children }) {
  return (
    <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
      {children}
    </span>
  )
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function textValue(form, key) {
  return String(form.get(key) || "").trim()
}

function numberValue(form, key) {
  return Number(form.get(key)) || 0
}

function cloneDemoData() {
  return JSON.parse(JSON.stringify(demoData))
}

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneDemoData()

    const parsed = JSON.parse(raw)

    return {
      students: Array.isArray(parsed.students) ? parsed.students : demoData.students,
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : demoData.workouts,
      checkins: Array.isArray(parsed.checkins) ? parsed.checkins : demoData.checkins,
    }
  } catch {
    return cloneDemoData()
  }
}

export default CoachFlow