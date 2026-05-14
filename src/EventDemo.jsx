import { Link } from "react-router-dom"

const schedule = [
  {
    time: "13:00",
    title: "報到入場",
    desc: "完成報到、領取活動資料與入場識別。",
  },
  {
    time: "13:30",
    title: "開場介紹",
    desc: "介紹活動流程、講者與參與方式。",
  },
  {
    time: "14:00",
    title: "主題講座",
    desc: "分享實用經驗與案例，幫助參與者快速理解主題。",
  },
  {
    time: "15:30",
    title: "實作工作坊",
    desc: "分組練習、討論與現場協助。",
  },
  {
    time: "17:00",
    title: "交流與 Q&A",
    desc: "自由交流、提問與活動總結。",
  },
]

const features = [
  {
    title: "清楚活動資訊",
    desc: "適合放時間、地點、報名方式、活動對象與注意事項。",
  },
  {
    title: "手機版友善",
    desc: "讓學生或參加者用手機也能快速看懂活動內容。",
  },
  {
    title: "報名連結整合",
    desc: "可放 Google Form、KKTIX、Accupass 或學校表單連結。",
  },
]

function EventDemo() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-block rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:border-white"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
        <div>
          <p className="mb-4 text-sm font-medium tracking-widest text-cyan-300">
            CAMPUS WORKSHOP 2026
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            校園創意工作坊
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            這是一個活動宣傳頁 Demo，適合社團招生、講座、營隊、比賽與校園活動。
            透過清楚的活動資訊、流程安排與報名按鈕，讓參與者快速了解並完成報名。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#signup"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
            >
              立即報名
            </a>
            <a
              href="#schedule"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-white"
            >
              查看流程
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-sm backdrop-blur">
          <div className="rounded-[1.5rem] bg-slate-900 p-6">
            <p className="text-sm text-slate-400">活動資訊</p>

            <div className="mt-6 space-y-4">
              <Info label="日期" value="2026 / 03 / 21" />
              <Info label="時間" value="13:00 – 17:30" />
              <Info label="地點" value="校園活動中心 2F" />
              <Info label="對象" value="大學生、社團成員、對設計與創意有興趣者" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/10 p-7"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10">
          <img
            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80"
            alt="活動現場"
            className="h-[420px] w-full object-cover opacity-90"
          />
        </div>
      </section>

      <section id="schedule" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-widest text-cyan-300">
            SCHEDULE
          </p>
          <h2 className="mt-2 text-4xl font-semibold">活動流程</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            活動頁可以清楚列出時間表，讓參與者知道每個階段會做什麼。
          </p>
        </div>

        <div className="space-y-4">
          {schedule.map((item) => (
            <div
              key={item.time}
              className="grid gap-4 rounded-3xl border border-white/10 bg-white/10 p-6 md:grid-cols-[120px_1fr]"
            >
              <p className="text-xl font-semibold text-cyan-300">{item.time}</p>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Stat number="80+" label="預計參與人數" />
          <Stat number="5" label="活動段落" />
          <Stat number="1 Day" label="完整工作坊" />
        </div>
      </section>

      <section id="signup" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2rem] bg-cyan-300 p-8 text-slate-950 md:p-12">
          <p className="text-sm font-semibold tracking-widest text-slate-700">
            SIGN UP
          </p>
          <h2 className="mt-2 text-4xl font-semibold">準備好參加活動了嗎？</h2>
          <p className="mt-5 max-w-2xl leading-8 text-slate-700">
            這裡可以放 Google Form、KKTIX、Accupass 或學校報名系統連結。
            也可以放聯絡窗口、注意事項與報名截止時間。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              前往報名表
            </a>
            <a
              href="#"
              className="rounded-full border border-slate-950/20 px-6 py-3 text-sm font-semibold hover:border-slate-950"
            >
              聯絡主辦單位
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-7 text-center">
      <p className="text-4xl font-semibold text-cyan-300">{number}</p>
      <p className="mt-3 text-slate-300">{label}</p>
    </div>
  )
}

export default EventDemo