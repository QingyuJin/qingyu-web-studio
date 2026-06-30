import { Link } from "react-router-dom"

const satelliteSites = [
  ["醫師人物誌", "人物專訪、理念、專業觀點。", "Story", "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1100&q=80"],
  ["衛教知識庫", "疾病知識、照護提醒、文章分類。", "Library", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=80"],
  ["公益講座頁", "活動資訊、講師介紹、報名入口。", "Event", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80"],
  ["案例作品集", "短影音、圖文、品牌專題。", "Works", "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1100&q=80"],
  ["團隊介紹頁", "醫師、顧問、內容團隊。", "Team", "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1100&q=80"],
  ["內容專欄頁", "文章、圖卡、Podcast 摘要。", "Journal", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80"],
]

const modules = [
  ["品牌故事", "一句話說清楚理念。"],
  ["專業內容", "衛教與專訪分流。"],
  ["案例展示", "圖片、影片、文章整理。"],
  ["講座活動", "活動資訊與報名入口。"],
]

const cases = [
  ["精準醫療專題", "內容專欄", "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1300&q=80"],
  ["診所品牌故事", "形象頁", "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1100&q=80"],
  ["醫師人物訪談", "人物誌", "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1100&q=80"],
  ["衛教圖文系列", "知識庫", "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1100&q=80"],
  ["公益講座活動", "活動頁", "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1100&q=80"],
  ["團隊介紹專頁", "團隊頁", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=80"],
]

const backdropImage = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1800&q=80"
const heroImage = "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1400&q=80"

const lectures = [
  ["07.12", "慢性照護與家庭支持"],
  ["08.03", "精準醫療與生活方式"],
  ["09.18", "醫療品牌內容經營"],
]

function SoftBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f6f1e7]">
      <img
        src={backdropImage}
        alt=""
        aria-hidden="true"
        className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] scale-105 object-cover opacity-[0.18] blur-2xl saturate-[0.78]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,252,244,0.88),rgba(239,247,241,0.82)_44%,rgba(245,238,224,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.86),transparent_28rem),radial-gradient(circle_at_82%_22%,rgba(198,220,209,0.56),transparent_30rem),radial-gradient(circle_at_50%_100%,rgba(225,204,160,0.42),transparent_34rem)]" />
      <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-[#bfd8ca]/42 blur-3xl" />
      <div className="absolute right-[-8rem] top-24 h-[28rem] w-[28rem] rounded-full bg-[#e9d2a2]/34 blur-3xl" />
    </div>
  )
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-[1.65rem] border border-white/64 bg-white/48 shadow-[0_18px_60px_rgba(42,64,55,0.08)] backdrop-blur-2xl ${className}`}>
      {children}
    </div>
  )
}

function ImageBlock({ label, src, tall = false }) {
  return (
    <div className={`${tall ? "min-h-[24rem]" : "aspect-[4/3]"} relative grid place-items-center overflow-hidden rounded-[1.5rem] border border-white/58 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.92),transparent_32%),linear-gradient(135deg,#e3efe8,#f8f2e6_55%,#c9ddd4)]`}>
      {src ? (
        <img
          src={src}
          alt={label}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(20,54,43,0.18))]" />
      <span className="relative rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[10px] font-black tracking-[0.18em] text-[#5f796d] shadow-sm backdrop-blur">
        {label}
      </span>
    </div>
  )
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#789486]">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[clamp(1.8rem,4.5vw,3.55rem)] font-black leading-[1.02] tracking-[-0.04em] text-[#213a31]">{title}</h2>
      {text ? <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-[#63776e]">{text}</p> : null}
    </div>
  )
}

function BiomedBrandSite() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[#213a31]">
      <SoftBackdrop />

      <header className="sticky top-0 z-40 border-b border-white/50 bg-[#f7f2e8]/62 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#213a31] font-serif text-lg font-black text-[#dec896]">L</span>
            <div>
              <p className="font-serif text-lg font-black leading-none tracking-[-0.03em]">Liora Biomed</p>
              <p className="mt-1 text-[10px] font-black tracking-[0.14em] text-[#789486]">MEDICAL STORY SITE</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-black text-[#5e7469] lg:flex">
            <a href="#pages" className="hover:text-[#213a31]">附加網站</a>
            <a href="#modules" className="hover:text-[#213a31]">內容模組</a>
            <a href="#cases" className="hover:text-[#213a31]">案例</a>
            <a href="#lectures" className="hover:text-[#213a31]">講座</a>
          </nav>

          <Link to="/" className="inline-flex min-h-10 items-center rounded-full border border-white/60 bg-white/42 px-4 text-xs font-black text-[#213a31] backdrop-blur">
            回主站
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl gap-7 px-4 py-10 md:px-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
        <div className="rounded-[2rem] border border-white/54 bg-white/28 p-5 shadow-[0_18px_70px_rgba(42,64,55,0.06)] backdrop-blur-xl md:p-7">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#789486]">Biomed Content Platform</p>
          <h1 className="mt-5 max-w-3xl text-balance font-serif text-[clamp(2.55rem,6.2vw,5.65rem)] font-black leading-[0.96] tracking-[-0.055em] text-[#213a31]">
            醫療內容，安靜而清楚地被看見。
          </h1>
          <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-[#64766d] md:text-[15px]">
            品牌故事、衛教知識、人物專訪與公益講座，整理成一個舒服的內容入口。
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["醫療品牌", "內容平台", "講座活動"].map((item) => (
              <span key={item} className="rounded-full border border-white/64 bg-white/50 px-4 py-2 text-[11px] font-black text-[#5d756a] backdrop-blur">
                {item}
              </span>
            ))}
          </div>
        </div>

        <GlassCard className="p-4 md:p-5">
          <ImageBlock label="範例主視覺" src={heroImage} tall />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Story", "醫療人物"],
              ["Library", "衛教內容"],
              ["Event", "公益講座"],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-white/58 bg-white/54 p-4">
                <p className="font-serif text-[1.45rem] font-black text-[#8b7448]">{title}</p>
                <p className="mt-1 text-[11px] font-black text-[#64766d]">{text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section id="pages" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <SectionTitle eyebrow="Satellite Pages" title="附加網站" text="點進主站後，可以延伸成多個專題頁與內容入口。" />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {satelliteSites.map(([title, text, label, image]) => (
            <GlassCard key={title} className="group overflow-hidden p-4 transition hover:-translate-y-1">
              <ImageBlock label={label} src={image} />
              <div className="p-2 pt-4">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#789486]">{label}</p>
                <h3 className="mt-2 font-serif text-[1.55rem] font-black tracking-[-0.03em] text-[#213a31]">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#64766d]">{text}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="modules" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <GlassCard className="p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <SectionTitle eyebrow="Modules" title="內容模組" text="短、清楚、可持續更新。" />
            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map(([title, text]) => (
                <div key={title} className="rounded-[1.25rem] border border-white/58 bg-white/48 p-5">
                  <h3 className="font-serif text-[1.55rem] font-black text-[#213a31]">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#64766d]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      <section id="cases" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle eyebrow="Works" title="案例展示" text="圖片可換成診所、醫師、活動、專題與衛教素材。" />
          <span className="rounded-full border border-white/64 bg-white/42 px-4 py-2 text-xs font-black text-[#64766d] backdrop-blur">Sample Gallery</span>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {cases.map(([title, meta, image], index) => (
            <GlassCard key={title} className={`${index === 0 ? "md:col-span-2" : ""} overflow-hidden p-4`}>
              <ImageBlock label="範例圖片" src={image} />
              <div className="px-2 pt-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#789486]">{meta}</p>
                <h3 className="mt-2 font-serif text-[1.55rem] font-black tracking-[-0.03em] text-[#213a31]">{title}</h3>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section id="lectures" className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <GlassCard className="overflow-hidden p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionTitle eyebrow="Events" title="公益講座" text="講座資訊、主題、日期與報名入口可獨立成頁。" />
            <div className="grid gap-3">
              {lectures.map(([date, title]) => (
                <div key={title} className="grid gap-3 rounded-[1.25rem] border border-white/58 bg-white/48 p-4 md:grid-cols-[5rem_1fr_auto] md:items-center">
                  <p className="font-serif text-3xl font-black text-[#8b7448]">{date}</p>
                  <div>
                    <h3 className="text-base font-black text-[#213a31]">{title}</h3>
                    <p className="mt-1 text-xs font-bold text-[#64766d]">講師、地點、席次與報名狀態。</p>
                  </div>
                  <span className="rounded-full bg-[#213a31] px-4 py-2 text-xs font-black text-white">報名示意</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      <footer className="mx-auto max-w-7xl px-4 py-10 text-xs font-black tracking-[0.14em] text-[#789486] md:px-8">
        <div className="flex flex-col gap-3 border-t border-white/70 pt-6 md:flex-row md:items-center md:justify-between">
          <span>Liora Biomed / Sample Site</span>
          <Link to="/" className="w-fit rounded-full border border-white/64 bg-white/42 px-4 py-2 text-[#213a31] backdrop-blur">
            Qingyu Web Studio
          </Link>
        </div>
      </footer>
    </main>
  )
}

export default BiomedBrandSite
