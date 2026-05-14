function CafeDemo() {
  return (
    <main className="min-h-screen bg-[#f8f3ec] text-stone-900">
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
        <div>
          <p className="mb-4 text-sm font-medium tracking-widest text-amber-800">
            QING COFFEE
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            一杯咖啡，留住安靜的午後。
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Qing Coffee 是一間位於城市角落的咖啡店，提供手沖咖啡、
            甜點與舒適的閱讀空間。適合獨處、工作、聊天，也適合慢慢生活。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
            >
              查看菜單
            </a>
            <a
              href="#contact"
              className="rounded-full border border-stone-400 px-6 py-3 text-sm font-medium hover:border-stone-950"
            >
              預約座位
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-stone-200 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
            alt="咖啡店形象照"
            className="h-[420px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <InfoCard title="手沖咖啡" text="每日精選不同產區咖啡豆，提供乾淨、細緻的風味。" />
          <InfoCard title="手作甜點" text="搭配咖啡的蛋糕、司康與季節限定甜點。" />
          <InfoCard title="安靜空間" text="適合閱讀、工作、朋友聚會與午後休息。" />
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-widest text-amber-800">MENU</p>
          <h2 className="mt-2 text-4xl font-semibold">人氣菜單</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <MenuCard name="經典拿鐵" price="NT$120" desc="濃縮咖啡搭配綿密奶泡，順口溫和。" />
          <MenuCard name="單品手沖" price="NT$160" desc="依當日豆單提供不同風味選擇。" />
          <MenuCard name="焦糖布丁" price="NT$90" desc="手作布丁搭配微苦焦糖醬。" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
            alt="咖啡店內部"
            className="h-80 w-full rounded-[2rem] object-cover"
          />
          <div className="rounded-[2rem] bg-white p-8 shadow-sm">
            <p className="text-sm font-medium tracking-widest text-amber-800">ABOUT</p>
            <h2 className="mt-2 text-4xl font-semibold">關於我們</h2>
            <p className="mt-5 leading-8 text-stone-600">
              我們希望咖啡不只是飲料，而是一段可以慢下來的時間。
              店內提供舒適座位、插座與自然光，無論是工作、讀書或與朋友相聚，
              都能找到自己的位置。
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-16 pb-24">
        <div className="rounded-[2rem] bg-stone-950 p-8 text-white md:p-12">
          <p className="text-sm font-medium tracking-widest text-stone-400">VISIT US</p>
          <h2 className="mt-2 text-4xl font-semibold">營業資訊</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">地址</p>
              <p className="mt-1">台北市中山區咖啡路 16 號</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">營業時間</p>
              <p className="mt-1">週一至週日 10:00–19:00</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-stone-400">聯絡方式</p>
              <p className="mt-1">LINE：@qingcoffee</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-950"
            >
              查看 Google Map
            </a>
            <a
              href="#"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white"
            >
              LINE 預約
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 leading-7 text-stone-600">{text}</p>
    </div>
  )
}

function MenuCard({ name, price, desc }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="font-semibold text-amber-800">{price}</p>
      </div>
      <p className="mt-3 leading-7 text-stone-600">{desc}</p>
    </div>
  )
}

export default CafeDemo