import { Link } from "react-router-dom"

const features = [
  {
    title: "活動資訊集中",
    desc: "把時間、地點、講者、流程、報名方式與注意事項整理在同一頁。",
  },
  {
    title: "報名動線清楚",
    desc: "透過明確 CTA 按鈕，讓參與者可以快速前往 Google Form 或報名平台。",
  },
  {
    title: "手機版好閱讀",
    desc: "適合從 IG、LINE、社團貼文導流，讓使用者在手機上也能快速看懂。",
  },
]

const schedule = [
  {
    time: "13:00",
    title: "報到與入場",
    desc: "完成報到、領取活動資料，並認識現場工作人員與活動空間。",
  },
  {
    time: "13:30",
    title: "活動開場",
    desc: "介紹活動主題、流程安排、分組方式與當天實作目標。",
  },
  {
    time: "14:00",
    title: "主題分享",
    desc: "由講者分享創意企劃、作品整理與簡報表達的實用方法。",
  },
  {
    time: "15:20",
    title: "分組實作",
    desc: "參與者依照題目進行小組討論、企劃發想與初步成果製作。",
  },
  {
    time: "16:40",
    title: "成果交流與 Q&A",
    desc: "各組分享成果，講者回饋並開放現場提問。",
  },
]

const outcomes = [
  "了解活動企劃與內容整理方式",
  "練習將想法轉成簡報與展示頁",
  "完成一份小組企劃初稿",
  "認識同校不同科系的參與者",
]

const faqs = [
  {
    q: "沒有設計或企劃經驗可以參加嗎？",
    a: "可以，活動會從基礎開始引導，適合對創意、活動企劃或作品整理有興趣的人。",
  },
  {
    q: "需要自備電腦嗎？",
    a: "建議攜帶筆電或平板，方便分組實作與查找資料。若沒有設備，也可以與組員共同完成。",
  },
  {
    q: "報名後可以取消嗎？",
    a: "若臨時無法參加，請於活動前一天透過主辦單位聯絡方式告知，方便釋出名額。",
  },
]

const audience = [
  "大學生與研究生",
  "社團幹部與活動組",
  "想練習企劃與簡報的人",
  "想整理作品或參與實作的人",
]

function EventDemo() {
  return (
    <main className="min-h-screen bg-[#08111f] text-white">
      <div className="mx-auto max-w-6xl px-5 pt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur hover:border-white"
        >
          ← 回到作品集
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pb-24 md:pt-24">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Campus Workshop
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            校園創意工作坊：把想法變成可展示的企劃。
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-slate-300">
            這是一個活動宣傳頁案例，適合社團招生、講座、營隊、比賽與校園工作坊。
            網站重點放在活動資訊、參加對象、流程安排與報名動線，讓參與者能快速了解並完成報名。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#signup"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              立即報名
            </a>
            <a
              href="#schedule"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white"
            >
              查看活動流程
            </a>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 text-sm">
            <InfoMini number="3/21" label="活動日期" />
            <InfoMini number="80" label="名額上限" />
            <InfoMini number="Free" label="免費參加" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-36 w-36 rounded-full bg-cyan-400/30 blur-3xl" />
          <div className="absolute -bottom-8 -right-8 h-44 w-44 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="relative rounded-[2.2rem] border border-white/10 bg-white/10 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur">
            <div className="overflow-hidden rounded-[1.8rem] bg-slate-950">
              <img
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=85"
                alt="校園活動工作坊現場"
                className="h-[430px] w-full object-cover opacity-90"
              />

              <div className="p-6">
                <p className="text-sm text-slate-400">活動資訊</p>
                <div className="mt-5 grid gap-3">
                  <EventInfo label="日期" value="2026 / 03 / 21" />
                  <EventInfo label="時間" value="13:00 – 17:30" />
                  <EventInfo label="地點" value="校園活動中心 2F" />
                  <EventInfo label="對象" value="對企劃、簡報、創意實作有興趣的學生" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-7 backdrop-blur"
            >
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-8 text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              About Event
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              讓參與者在報名前，就能快速理解活動價值。
            </h2>
            <p className="mt-6 leading-9 text-slate-300">
              很多活動只把資訊放在社群貼文或圖片海報裡，參與者容易漏看時間、地點、
              流程或報名方式。活動頁可以把資訊整理成清楚的網站，適合放在社群連結、
              LINE 群組、報名表說明或活動公告中。
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 backdrop-blur">
            <p className="text-sm font-medium text-slate-400">適合對象</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {audience.map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-5 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="schedule" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Schedule
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              活動流程
            </h2>
          </div>
          <p className="max-w-md leading-8 text-slate-300">
            流程區塊能讓參與者快速掌握當天安排，也能降低報名前的不確定感。
          </p>
        </div>

        <div className="space-y-4">
          {schedule.map((item) => (
            <div
              key={item.time}
              className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur md:grid-cols-[120px_1fr]"
            >
              <p className="text-2xl font-semibold text-cyan-300">{item.time}</p>
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-8 text-slate-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[2.2rem] bg-cyan-300 p-8 text-slate-950 md:p-12">
          <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">
                Outcomes
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                參加後可以帶走什麼？
              </h2>
              <p className="mt-6 leading-8 text-slate-700">
                活動頁不只要告訴大家時間地點，也要讓參與者知道自己為什麼要報名。
                這個區塊適合放活動收穫、學習成果或參與亮點。
              </p>
            </div>

            <div className="grid gap-4">
              {outcomes.map((item) => (
                <div key={item} className="rounded-2xl bg-white/60 p-5 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Stat number="80" label="預計參與人數" />
          <Stat number="5" label="活動段落" />
          <Stat number="1 Day" label="完整工作坊" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            FAQ
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            常見問題
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-7 backdrop-blur"
            >
              <h3 className="text-xl font-semibold">{item.q}</h3>
              <p className="mt-4 leading-8 text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="signup" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2.2rem] border border-white/10 bg-white/10 p-8 backdrop-blur md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Sign Up
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            準備好參加活動了嗎？
          </h2>
          <p className="mt-6 max-w-2xl leading-8 text-slate-300">
            這裡可以放 Google Form、KKTIX、Accupass 或學校報名系統連結，
            也可以放聯絡窗口、報名截止時間與注意事項。
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
            >
              前往報名表
            </a>
            <Link
              to="/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-white"
            >
              回到接案首頁
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoMini({ number, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
      <p className="font-semibold">{number}</p>
      <p className="mt-1 text-xs text-slate-400">{label}</p>
    </div>
  )
}

function EventInfo({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-medium text-white">{value}</p>
    </div>
  )
}

function Stat({ number, label }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur">
      <p className="text-5xl font-semibold text-cyan-300">{number}</p>
      <p className="mt-4 text-slate-300">{label}</p>
    </div>
  )
}

export default EventDemo