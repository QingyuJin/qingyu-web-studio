import { Link } from "react-router-dom"

const features = [
  ["醫療故事", "把專業經歷、理念與臨床觀察整理成大眾看得懂的故事。"],
  ["衛教內容", "文章、圖卡與短影音企劃，建立長期信任感。"],
  ["專家訪談", "人物專訪、品牌形象與專業觀點，適合醫師與團隊展示。"],
  ["講座活動", "公益講座、活動報名與合作資訊，讓品牌能持續被看見。"],
]

const works = [
  ["醫師人物專訪", "人物故事 / 品牌形象"],
  ["診所衛教專欄", "內容經營 / SEO"],
  ["公益講座頁", "活動資訊 / 報名 CTA"],
  ["專業團隊介紹", "團隊形象 / 信任感"],
  ["醫療品牌手冊", "視覺整理 / 內容架構"],
  ["健康知識圖卡", "社群延伸 / 圖文素材"],
]

const lectures = [
  ["07.12", "慢性照護與家庭支持", "示範講座，適合串接報名表單。"],
  ["08.03", "精準醫療與生活習慣", "可放講師、地點、席次與報名 CTA。"],
  ["09.18", "醫療品牌內容經營", "適合診所、醫師與醫療團隊。"],
]

function PlaceholderImage({ label, tall = false }) {
  return (
    <div className={`grid ${tall ? "min-h-80" : "aspect-[4/3]"} place-items-center overflow-hidden rounded-[1.8rem] border border-[#d8e2dc] bg-[radial-gradient(circle_at_18%_18%,rgba(158,197,180,0.48),transparent_26%),linear-gradient(135deg,#f8f5ec,#e9f1ec_54%,#d4e3dd)]`}>
      <div className="rounded-full border border-white/70 bg-white/62 px-5 py-2 text-xs font-black tracking-[0.14em] text-[#567167] shadow-sm backdrop-blur">
        {label}
      </div>
    </div>
  )
}

function SectionLabel({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#759486]">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[clamp(2rem,6vw,4.5rem)] font-black leading-[0.98] tracking-[-0.045em] text-[#20342d]">{title}</h2>
      {text ? <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#61766c] md:text-base">{text}</p> : null}
    </div>
  )
}

function BiomedBrandSite() {
  return (
    <main className="min-h-screen bg-[#f6f2e9] text-[#20342d]">
      <header className="sticky top-0 z-40 border-b border-[#dfded4] bg-[#f8f4eb]/86 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#20342d] font-serif text-lg font-black text-[#e8cf9d]">L</span>
            <div>
              <p className="font-serif text-xl font-black leading-none tracking-[-0.03em]">Liora Biomed</p>
              <p className="mt-1 text-[11px] font-black tracking-[0.14em] text-[#789184]">生醫品牌故事網站範例</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-black text-[#526960] lg:flex">
            <a href="#about" className="hover:text-[#20342d]">關於項目</a>
            <a href="#features" className="hover:text-[#20342d]">內容特色</a>
            <a href="#works" className="hover:text-[#20342d]">作品案例</a>
            <a href="#lectures" className="hover:text-[#20342d]">公益講座</a>
          </nav>

          <Link to="/contact" className="inline-flex min-h-11 items-center rounded-full bg-[#20342d] px-5 text-sm font-black text-white shadow-lg shadow-[#20342d]/12">
            我想做類似的
          </Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[#dfded4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(172,205,190,0.48),transparent_28rem),radial-gradient(circle_at_84%_12%,rgba(223,199,151,0.34),transparent_26rem),linear-gradient(180deg,#fbf8ef,#eef3ef)]" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl gap-8 px-4 py-12 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#759486]">Medical Story Website</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,8vw,7.25rem)] font-black leading-[0.9] tracking-[-0.065em] text-[#20342d]">
              醫療專業，也能被溫柔看見。
            </h1>
            <p className="mt-6 max-w-2xl text-base font-bold leading-8 text-[#61766c] md:text-lg">
              適合醫師、診所、醫療團隊與生醫品牌，展示故事、專業內容、案例與講座活動。
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#works" className="inline-flex min-h-12 items-center rounded-full bg-[#20342d] px-6 text-sm font-black text-white shadow-xl shadow-[#20342d]/14">
                查看作品案例
              </a>
              <Link to="/contact" className="inline-flex min-h-12 items-center rounded-full border border-[#c9d5cf] bg-white/62 px-6 text-sm font-black text-[#20342d] backdrop-blur">
                我想做類似的
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <PlaceholderImage label="範例主視覺 / 空圖片" tall />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["24", "品牌內容"],
                ["6", "講座活動"],
                ["4", "特色模組"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.4rem] border border-[#d8e2dc] bg-white/68 p-4 shadow-sm backdrop-blur">
                  <p className="font-serif text-4xl font-black text-[#8b6f3d]">{value}</p>
                  <p className="mt-2 text-xs font-black text-[#61766c]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionLabel eyebrow="About" title="把專業整理成品牌內容。" text="這個範例頁示範如何把醫療團隊的專業、理念與公益活動，用乾淨舒服的方式呈現。" />
        <div className="grid gap-4 sm:grid-cols-2">
          {["品牌故事", "醫療內容", "人物專訪", "活動講座"].map((item) => (
            <div key={item} className="rounded-[1.4rem] border border-[#d8e2dc] bg-white p-5 shadow-sm">
              <p className="font-serif text-2xl font-black text-[#20342d]">{item}</p>
              <p className="mt-3 text-sm font-bold leading-7 text-[#61766c]">短文案、清楚區塊、可延伸圖片與影片素材。</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-y border-[#dfded4] bg-[#eef3ef]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionLabel eyebrow="Features" title="內容特色" text="用四個模組，把專業內容變成訪客願意閱讀的品牌頁。" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map(([title, text]) => (
              <article key={title} className="rounded-[1.6rem] border border-[#d8e2dc] bg-white p-5 shadow-sm">
                <span className="inline-flex rounded-full bg-[#edf6f1] px-3 py-1 text-[11px] font-black text-[#557165]">CONTENT</span>
                <h3 className="mt-5 font-serif text-2xl font-black text-[#20342d]">{title}</h3>
                <p className="mt-3 text-sm font-bold leading-7 text-[#61766c]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionLabel eyebrow="Works" title="作品案例" text="圖片可換成診所、醫師、團隊、活動、講座與衛教素材。" />
          <Link to="/contact" className="inline-flex min-h-11 w-fit items-center rounded-full border border-[#c9d5cf] bg-white px-5 text-sm font-black text-[#20342d]">
            客製這類網站
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {works.map(([title, meta], index) => (
            <article key={title} className={`${index === 0 ? "md:col-span-2" : ""} overflow-hidden rounded-[1.8rem] border border-[#d8e2dc] bg-white shadow-sm`}>
              <PlaceholderImage label="範例圖片 / 空圖片" />
              <div className="p-5">
                <p className="text-xs font-black text-[#759486]">{meta}</p>
                <h3 className="mt-2 font-serif text-2xl font-black text-[#20342d]">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="lectures" className="border-y border-[#dfded4] bg-[#20342d] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c4dccf]">Public Lecture</p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,6vw,5rem)] font-black leading-[0.95] tracking-[-0.05em]">
              公益講座與活動報名
            </h2>
            <p className="mt-5 text-sm font-bold leading-7 text-white/70">可放活動介紹、報名 CTA、講師資訊與席次狀態。</p>
          </div>
          <div className="grid gap-3">
            {lectures.map(([date, title, text]) => (
              <article key={title} className="grid gap-4 rounded-[1.4rem] border border-white/12 bg-white/8 p-5 backdrop-blur md:grid-cols-[5rem_1fr_auto] md:items-center">
                <p className="font-serif text-3xl font-black text-[#e8cf9d]">{date}</p>
                <div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-2 text-sm font-bold text-white/66">{text}</p>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#20342d]">報名示意</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="rounded-[2rem] border border-[#d8e2dc] bg-white p-6 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#759486]">Next</p>
              <h2 className="mt-3 font-serif text-4xl font-black tracking-[-0.04em] text-[#20342d]">想做類似的生醫品牌網站？</h2>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-[#61766c]">可以先用這個範例換成你的品牌、內容、講座與案例素材。</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex min-h-12 items-center rounded-full bg-[#20342d] px-6 text-sm font-black text-white">
                我想做類似的
              </Link>
              <Link to="/" className="inline-flex min-h-12 items-center rounded-full border border-[#c9d5cf] px-6 text-sm font-black text-[#20342d]">
                回主頁
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfded4] px-4 py-8 text-center text-xs font-black tracking-[0.14em] text-[#759486]">
        Liora Biomed Website Sample / Qingyu Web Studio
      </footer>
    </main>
  )
}

export default BiomedBrandSite
