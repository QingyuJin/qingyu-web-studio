import { useEffect, useId, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import "./InteriorFlagship.css"

const spaces = [
  { title: "光之居所", en: "THE QUIET HOUSE", type: "住宅空間", area: "30 坪・住宅概念", image: "https://images.unsplash.com/photo-1771371097061-3befd4b71b59?auto=format&fit=crop&w=2200&q=86", source: "https://unsplash.com/photos/yQvGZRrnk30", credit: "GoodLifeConstruction", description: "以自然色系、開放動線與溫潤木質，讓生活回到最舒服的節奏。", story: "以採光為主軸，將客廳、餐廳與日常動線串成一個自然流動的空間。材質選擇偏向淺色木皮、天然石材與低飽和織物，讓視線停留在光線的變化。", materials: "橡木 / 淺色石材 / 亞麻" },
  { title: "木的日常", en: "A HOUSE OF WOOD", type: "商業空間", area: "38 坪・商空概念", image: "https://images.unsplash.com/photo-1766802981819-602e8f93b0de?auto=format&fit=crop&w=1800&q=84", source: "https://unsplash.com/photos/FjUQO5Oe9HI", credit: "Neon Wang", description: "木質與留白之間，找出空間獨有的秩序。", story: "以連續木質表面串聯座席、展示和服務動線，讓顧客在不被打擾的節奏中停留。照明強調材質的細節，留白則讓品牌主角自然浮現。", materials: "實木 / 礦物塗料 / 暖光" },
  { title: "無聲之間", en: "BETWEEN LIGHT", type: "住宅空間", area: "24 坪・住宅概念", image: "https://images.unsplash.com/photo-1774516534097-76eb46de7229?auto=format&fit=crop&w=1800&q=84", source: "https://unsplash.com/photos/fUsxJC1KVGQ", credit: "Neon Wang", description: "讓光線沿著材質流動，留下不被填滿的日常。", story: "以清水模、木地板與開窗的比例構成空間語言。家具採低重心，減少遮擋，讓室外景色與光影成為室內的一部分。", materials: "清水模 / 木地板 / 霧面金屬" },
  { title: "樹影長廊", en: "UNDER THE CANOPY", type: "商業空間", area: "52 坪・公共空間概念", image: "https://images.unsplash.com/photo-1778514253619-df9f9fd1e3a1?auto=format&fit=crop&w=1800&q=84", source: "https://unsplash.com/photos/fddXBFZy0L8", credit: "Timur Seyfelmlyukov", description: "以幾何秩序、自然光與庭園視線，創造舒適的停留場景。", story: "公共區域以自然採光與明確的行走路徑規劃，延伸室內與庭園之間的視覺關係。木質構件形成溫暖的尺度與節奏。", materials: "木質格柵 / 玻璃 / 混凝土" },
]
const plans = [
  { name: "局部改造", min: 12000, max: 22000, detail: "軟裝、局部收納與材質更新" },
  { name: "新成屋", min: 35000, max: 55000, detail: "全室規劃、木作、基本工程" },
  { name: "老屋翻新", min: 55000, max: 85000, detail: "格局、水電與全室整修" },
]
const money = n => Math.round(n / 10000).toLocaleString("zh-TW")

function SpaceArt({ className = "" }) {
  const id = useId()
  return <svg className={className} viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id={id+"-mawall"} x2="1" y2="1"><stop stopColor="#b9ad96"/><stop offset="1" stopColor="#78634d"/></linearGradient><linearGradient id={id+"-mafloor"} x2="0" y2="1"><stop stopColor="#bda78a"/><stop offset="1" stopColor="#5a4735"/></linearGradient><linearGradient id={id+"-malight"}><stop stopColor="#fcf4dc"/><stop offset="1" stopColor="#9eab9a"/></linearGradient></defs><path fill={"url(#"+id+"-mawall)"} d="M0 0H1200V760H0Z"/><path fill="#d5c7b0" d="M0 0H850V470H0Z"/><path fill="#79634b" d="M850 0L1200 155V760L850 470Z"/><path fill={"url(#"+id+"-mafloor)"} d="M0 470H850L1200 760H0Z"/><path fill="#4d463c" d="M70 45H490V430H70Z"/><path fill={"url(#"+id+"-malight)"} d="M84 60H476V416H84Z"/><path d="M280 60V416M84 240H476" stroke="#746b5c" strokeWidth="6"/><path fill="#f6e9c7" opacity=".35" d="M84 416H476L860 760H280Z"/><path d="M900 10V510M940 30V545M980 50V580M1020 70V615M1060 90V650M1100 110V685M1140 130V720" stroke="#ad9677" strokeWidth="5"/><rect x="575" y="160" width="160" height="195" fill="#433c34"/><rect x="587" y="172" width="136" height="171" fill="#c2b397"/><path d="M590 300Q660 170 720 265V340H590Z" fill="#907c65"/><ellipse cx="680" cy="612" rx="345" ry="67" fill="#8e7e68"/><rect x="350" y="402" width="515" height="143" rx="38" fill="#b9a58a"/><rect x="365" y="365" width="235" height="129" rx="30" fill="#e5d9c2"/><rect x="610" y="365" width="235" height="129" rx="30" fill="#d6c7ae"/><rect x="320" y="447" width="580" height="105" rx="28" fill="#d4c3a6"/><ellipse cx="735" cy="595" rx="170" ry="38" fill="#4f4335"/><path d="M635 598V654M825 598V654" stroke="#4f4335" strokeWidth="16"/><ellipse cx="735" cy="582" rx="170" ry="36" fill="#847057"/><path d="M1000 493V615M975 615H1025" stroke="#4e4331" strokeWidth="10"/><path fill="#c6af88" d="M958 458L1042 458L1060 510H940Z"/><path d="M125 760L560 470M410 760L690 470M900 760L800 470" stroke="#e5ccaa" strokeWidth="2" opacity=".3"/></svg>
}

function Photo({ space, className = "", eager = false }) {
  const [failed, setFailed] = useState(false)
  return <div className={"ma-photo " + className}><SpaceArt className="ma-art"/>{!failed && <img src={space.image} alt={space.title + "，空間攝影示意"} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)}/>}</div>
}

export function InteriorFeature() {
  return <Link to="/works/industry/interior" className="ma-feature" aria-label="體驗間序室內設計概念官網"><Photo space={spaces[0]} className="ma-feature-photo"/><div className="ma-feature-shade"/><div className="ma-feature-content"><span className="ma-kicker">FEATURED WORK / 01</span><span className="ma-feature-title">間序<span>.</span></span><span className="ma-feature-en">MA — SPACE STUDIO</span><span className="ma-feature-caption">室內設計・沉浸式品牌網站・互動預算試算</span><span className="ma-feature-cta">體驗完整網站 <span aria-hidden="true">↗</span></span></div><span className="ma-feature-tag">原創概念作品</span></Link>
}

export default function InteriorFlagship() {
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState("全部")
  const [plan, setPlan] = useState(1)
  const [area, setArea] = useState(25)
  const [extra, setExtra] = useState(false)
  const [menu, setMenu] = useState(false)
  const [selected, setSelected] = useState(null)
  const dialog = useRef(null)
  const lastFocus = useRef(null)
  const page = useRef(null)
  const hero = useRef(null)
  const current = spaces[active]
  const range = plans[plan]
  useEffect(() => { if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" }) }, [])
  const low = range.min * area + (extra ? 120000 : 0)
  const high = range.max * area + (extra ? 240000 : 0)
  useEffect(() => {
    const root = page.current
    if (!root || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("ma-visible"); observer.unobserve(entry.target) } }), { threshold: .08 })
    const nodes = root.querySelectorAll("[data-ma-reveal]")
    nodes.forEach(node => observer.observe(node))
    root.classList.add("ma-motion")
    return () => { observer.disconnect(); root.classList.remove("ma-motion") }
  }, [filter])
  useEffect(() => {
    const root = page.current
    let frame = 0
    const update = () => {
      frame = 0
      if (!root) return
      const max = Math.max(1, root.scrollHeight - window.innerHeight)
      root.style.setProperty("--ma-progress", Math.min(1, Math.max(0, -root.getBoundingClientRect().top / max)))
    }
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", scroll, { passive: true })
    window.addEventListener("resize", scroll)
    return () => { window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); if (frame) cancelAnimationFrame(frame) }
  }, [])
  function openProject(space, event) {
    lastFocus.current = event.currentTarget
    setSelected(space)
    dialog.current?.showModal()
  }
  function closeProject() {
    dialog.current?.close()
    lastFocus.current?.focus()
  }
  function downloadPlan() {
    const lines = ["間序 MA / 空間規劃摘要", "此為概念試算，非正式裝修報價。", "工程類型：" + range.name, "坪數：" + area, "家具與軟裝：" + (extra ? "包含" : "不包含"), "預算區間：NT$ " + low.toLocaleString("zh-TW") + " – " + high.toLocaleString("zh-TW"), "下一步：準備平面圖、現況照片及希望的完工日期。"].join("\n")
    const url = URL.createObjectURL(new Blob(["\ufeff" + lines], { type: "text/plain;charset=utf-8" }))
    const a = document.createElement("a")
    a.href = url
    a.download = "MA-space-planning.txt"
    document.body.append(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  function pointer(e) {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    hero.current?.style.setProperty("--ma-x", ((e.clientX - rect.left) / rect.width - .5) * 16 + "px")
    hero.current?.style.setProperty("--ma-y", ((e.clientY - rect.top) / rect.height - .5) * 12 + "px")
  }
  return <main className="ma-site" ref={page}>
    <Seo page={{path:"/works/industry/interior",title:"間序 MA — SPACE STUDIO｜Qingyu Web 原創概念作品",description:"沉浸式室內設計品牌官網，包含設計作品、互動預算試算與真實網站委託入口。"}}/>
    <div className="ma-progress" aria-hidden="true"/>
    <a className="ma-skip" href="#ma-projects">跳至主要內容</a>
    <header className="ma-header"><a className="ma-logo" href="#ma-top" aria-label="間序首頁">間序<span>.</span><small>MA / SPACE STUDIO</small></a><button className="ma-menu-toggle" aria-expanded={menu} aria-controls="ma-nav" onClick={()=>setMenu(v=>!v)}>{menu?"關閉 −":"選單 +"}</button><nav id="ma-nav" className={menu?"ma-nav is-open":"ma-nav"} aria-label="網站選單"><a href="#ma-projects" onClick={()=>setMenu(false)}>設計作品</a><a href="#ma-about" onClick={()=>setMenu(false)}>關於間序</a><a href="#ma-services" onClick={()=>setMenu(false)}>服務流程</a><a className="ma-nav-cta" href="#ma-estimate" onClick={()=>setMenu(false)}>開始規劃 ↗</a></nav></header>
    <section id="ma-top" className="ma-hero" ref={hero} onPointerMove={pointer} onPointerLeave={()=>{hero.current?.style.setProperty("--ma-x","0px");hero.current?.style.setProperty("--ma-y","0px")}}>
      <div className="ma-hero-image" key={active}><Photo space={current} eager/></div><div className="ma-hero-shade"/>
      <div className="ma-hero-copy"><span className="ma-kicker">TAIWAN / INTERIOR & SPATIAL DESIGN</span><h1>讓生活，<br/>留一點<span>空間。</span></h1><p>Spaces for the way you live.</p><a className="ma-round-link" href="#ma-projects"><span>探索設計作品</span><span aria-hidden="true">↘</span></a></div>
      <div className="ma-hero-bottom"><div><span className="ma-index">0{active+1} / 0{spaces.length}</span><span className="ma-current">{current.en}</span></div><div className="ma-controls"><button aria-label="上一張空間" onClick={()=>setActive(i=>(i+spaces.length-1)%spaces.length)}>←</button><button aria-label="下一張空間" onClick={()=>setActive(i=>(i+1)%spaces.length)}>→</button></div></div>
    </section>
    <div className="ma-strip"><span>DESIGNED TO BE LIVED IN.</span><span>光・材質・生活</span><span>ARCHITECTURE OF EVERYDAY.</span></div><section className="ma-intro ma-section" data-ma-reveal><span className="ma-kicker">MA / THE ART OF LIVING</span><h2>空間不只是形式，<br/>而是日常的<span>容器。</span></h2><div><p>我們相信，好的空間不必大聲說話。它讓光找到落點，讓材質保留溫度，讓每一個生活片刻都有自己的位置。</p><a href="#ma-about" className="ma-text-link">認識間序 ↗</a></div></section>
    <section id="ma-projects" className="ma-section"><div className="ma-section-heading" data-ma-reveal><div><span className="ma-kicker">01 / SELECTED SPACES</span><h2>空間的<span>故事。</span></h2></div><p>不同的生活方式，值得不同的空間答案。<br/>以下皆為概念提案與攝影示意。</p></div><div className="ma-filters" aria-label="作品類型">{["全部","住宅空間","商業空間"].map(t=><button key={t} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t}</button>)}</div><div className="ma-project-grid">{spaces.filter(s=>filter==="全部"||s.type===filter).map((s,i)=><article key={s.en} className="ma-project" data-ma-reveal><button className="ma-project-open" type="button" onClick={e=>openProject(s,e)} aria-label={"閱讀 "+s.title+" 設計詳情"}><Photo space={s}/><span className="ma-project-arrow" aria-hidden="true">↗</span></button><div className="ma-project-meta"><span>0{spaces.indexOf(s)+1} / {s.type}</span><span>{s.area}</span></div><h3>{s.title}<span>{s.en}</span></h3><p>{s.description}</p><button className="ma-text-link" onClick={e=>openProject(s,e)}>閱讀設計詳情 ↗</button><a className="ma-credit" href={s.source} target="_blank" rel="noreferrer">攝影：{s.credit} / Unsplash ↗</a><span className="ma-project-number" aria-hidden="true">0{i+1}</span></article>)}</div></section>
    <section id="ma-about" className="ma-manifesto"><div className="ma-manifesto-grid"><div data-ma-reveal><span className="ma-kicker">02 / PHILOSOPHY</span><h2>不是填滿空間，<br/>而是讓<span>生活發生。</span></h2><p>我們從人的需求出發，尋找光線、材質與動線之間的平衡。每一道細節，都是為了日常而存在。</p><a className="ma-text-link" href="#ma-services">探索我們的服務 ↘</a></div><Photo space={spaces[2]} className="ma-manifesto-image"/></div><div className="ma-process">{[["01","理解","需求訪談與現場條件"],["02","設計","風格、動線與平面規劃"],["03","實現","工程規劃與驗收"]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section id="ma-services" className="ma-section ma-services"><div className="ma-section-heading" data-ma-reveal><div><span className="ma-kicker">03 / SERVICES & PROCESS</span><h2>設計，始於<span>理解。</span></h2></div><p>從最初的想法，到可執行的空間規劃，每個階段都以清楚的溝通建立共識。</p></div><div className="ma-service-grid"><Photo space={spaces[1]} className="ma-service-photo"/><div>{[["01","住宅空間規劃","新成屋、老屋與局部更新；從生活習慣、採光、收納到家具配置。"],["02","商業空間設計","從品牌定位、顧客體驗與動線出發，規劃店面、工作室和公共區域。"],["03","材質與軟裝選配","整合色彩、光源、家具與材質，讓空間語言完整一致。"],["04","工程與預算規劃","以階段性項目拆解、預算區間與工期討論，建立可執行的計畫。"]].map(([n,t,d],i)=><details key={n} open={i===0}><summary><span>{n}</span><strong>{t}</strong><span aria-hidden="true">+</span></summary><p>{d}</p></details>)}</div></div><div className="ma-timeline">{[["01","初次對談","理解需求與現況"],["02","概念提案","平面、材質與風格"],["03","設計確認","細部與工程規劃"],["04","實現與驗收","逐階段確認品質"]].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section><section id="ma-estimate" className="ma-section ma-estimate"><div className="ma-section-heading" data-ma-reveal><div><span className="ma-kicker">04 / BUDGET ESTIMATOR</span><h2>你的空間，<br/>從<span>預算開始。</span></h2></div><p>選擇需求與坪數，即時查看概念預算。<br/>示範計算，不代表實際裝修行情或報價。</p></div><div className="ma-calculator"><div className="ma-inputs"><fieldset><legend>01 / 選擇工程類型</legend><div className="ma-plans">{plans.map((p,i)=><button type="button" key={p.name} aria-pressed={plan===i} onClick={()=>setPlan(i)}><strong>{p.name}</strong><small>{p.detail}</small></button>)}</div></fieldset><fieldset><legend>02 / 空間坪數 <output>{area} 坪</output></legend><input aria-label="空間坪數" type="range" min="5" max="80" value={area} onChange={e=>setArea(Number(e.target.value))}/><div className="ma-range-label"><span>5 坪</span><span>80 坪</span></div></fieldset><label className="ma-extra"><input type="checkbox" checked={extra} onChange={e=>setExtra(e.target.checked)}/> 包含家具與軟裝示意預算</label></div><div className="ma-result"><span className="ma-kicker">YOUR ESTIMATED BUDGET</span><span className="ma-result-label">概念預算區間</span><div className="ma-amount" aria-live="polite">{money(low)}–{money(high)}<small> 萬元</small></div><p>{range.name} / {area} 坪{extra?" / 含軟裝":""}</p><button className="ma-primary" type="button" onClick={downloadPlan}>下載空間規劃摘要 <span>↓</span></button><small>摘要會直接下載至裝置，不收集個人資料。此為概念規劃工具，非實際裝修報價。</small></div></div></section>
    <section className="ma-section ma-faq"><div data-ma-reveal><span className="ma-kicker">05 / FREQUENTLY ASKED</span><h2>常見<span>問題。</span></h2></div><div>{[["第一次規劃，需要準備什麼？","建議準備平面圖、現況照片、生活需求及大致預算。如果還沒有明確方向，也可以從喜歡的空間風格開始。"],["如何估算裝修費用？","實際費用取決於屋況、坪數、工程範圍、材質及工期。上方試算僅作規劃示意，非正式報價。"],["這個網站可以委託實際室內設計嗎？","間序是 Qingyu Web Studio 製作的原創概念品牌網站，並非營業中的室內設計公司。若想委託類似的網站、設計與互動系統，請使用下方真實網站洽詢入口。"]].map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
    <footer className="ma-footer"><div><span className="ma-kicker">A DIGITAL EXPERIENCE BY QINGYU WEB</span><h2>讓想像，<br/>成為生活的空間。</h2><p>MA / SPACE STUDIO — A concept by Qingyu Web Studio.</p></div><div className="ma-footer-actions"><a className="ma-primary" href="https://www.qingyuweb.com/contact" target="_blank" rel="noreferrer">委託類似網站 ↗</a><a className="ma-back" href="https://www.qingyuweb.com/works">Qingyu Web 作品集 →</a></div><div className="ma-footer-note">間序為原創虛構品牌；照片為 Unsplash 授權示意素材，非實際委託作品。© Qingyu Web Studio.</div></footer>
    <dialog className="ma-dialog" ref={dialog} onClose={()=>lastFocus.current?.focus()} onClick={e=>{if(e.target===dialog.current)closeProject()}}>{selected&&<article><button className="ma-dialog-close" onClick={closeProject} aria-label="關閉作品詳情">×</button><Photo key={selected.en} space={selected} eager className="ma-dialog-photo"/><div className="ma-dialog-copy"><span className="ma-kicker">{selected.en} / {selected.type}</span><h2>{selected.title}</h2><p>{selected.story}</p><dl><dt>空間設定</dt><dd>{selected.area}</dd><dt>材質提案</dt><dd>{selected.materials}</dd></dl><a className="ma-credit" href={selected.source} target="_blank" rel="noreferrer">攝影示意：{selected.credit} / Unsplash ↗</a><button className="ma-primary" onClick={()=>{closeProject();document.getElementById("ma-estimate")?.scrollIntoView({behavior:"smooth"})}}>開始我的空間規劃 ↘</button></div></article>}</dialog>
  </main>
}
