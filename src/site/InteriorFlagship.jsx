import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import "./InteriorFlagship.css"

const spaces = [
  { title: "光之居所", en: "THE QUIET HOUSE", type: "住宅空間", area: "30 坪・概念設計", image: "https://images.unsplash.com/photo-1771888703723-01d85da1dae1?auto=format&fit=crop&w=2000&q=82", source: "https://unsplash.com/photos/e0oJLc5FYsg", credit: "GoodLifeConstruction", description: "以自然色系與柔和的曲線，讓生活回到最舒服的節奏。" },
  { title: "木的日常", en: "A HOUSE OF WOOD", type: "商業空間", area: "38 坪・概念設計", image: "https://images.unsplash.com/photo-1632378207821-81b303eba993?auto=format&fit=crop&w=1800&q=82", source: "https://unsplash.com/photos/5MYtqTJh5Nc", credit: "Ryunosuke Kikuno", description: "木質與留白之間，找出空間獨有的秩序。" },
  { title: "無聲之間", en: "BETWEEN LIGHT", type: "住宅空間", area: "24 坪・概念設計", image: "https://images.unsplash.com/photo-1774516534097-76eb46de7229?auto=format&fit=crop&w=1800&q=82", source: "https://unsplash.com/photos/fUsxJC1KVGQ", credit: "Neon Wang", description: "讓光線沿著材質流動，留下不被填滿的日常。" },
]
const plans = [
  { name: "局部改造", min: 12000, max: 22000, detail: "軟裝、局部收納與材質更新" },
  { name: "新成屋", min: 35000, max: 55000, detail: "全室規劃、木作、基本工程" },
  { name: "老屋翻新", min: 55000, max: 85000, detail: "格局、水電與全室整修" },
]
const money = n => Math.round(n / 10000).toLocaleString("zh-TW")

function SpaceArt({ className = "" }) {
  return <svg className={className} viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="mawall" x2="1" y2="1"><stop stopColor="#b9ad96"/><stop offset="1" stopColor="#78634d"/></linearGradient><linearGradient id="mafloor" x2="0" y2="1"><stop stopColor="#bda78a"/><stop offset="1" stopColor="#5a4735"/></linearGradient><linearGradient id="malight"><stop stopColor="#fcf4dc"/><stop offset="1" stopColor="#9eab9a"/></linearGradient></defs><path fill="url(#mawall)" d="M0 0H1200V760H0Z"/><path fill="#d5c7b0" d="M0 0H850V470H0Z"/><path fill="#79634b" d="M850 0L1200 155V760L850 470Z"/><path fill="url(#mafloor)" d="M0 470H850L1200 760H0Z"/><path fill="#4d463c" d="M70 45H490V430H70Z"/><path fill="url(#malight)" d="M84 60H476V416H84Z"/><path d="M280 60V416M84 240H476" stroke="#746b5c" strokeWidth="6"/><path fill="#f6e9c7" opacity=".35" d="M84 416H476L860 760H280Z"/><path d="M900 10V510M940 30V545M980 50V580M1020 70V615M1060 90V650M1100 110V685M1140 130V720" stroke="#ad9677" strokeWidth="5"/><rect x="575" y="160" width="160" height="195" fill="#433c34"/><rect x="587" y="172" width="136" height="171" fill="#c2b397"/><path d="M590 300Q660 170 720 265V340H590Z" fill="#907c65"/><ellipse cx="680" cy="612" rx="345" ry="67" fill="#8e7e68"/><rect x="350" y="402" width="515" height="143" rx="38" fill="#b9a58a"/><rect x="365" y="365" width="235" height="129" rx="30" fill="#e5d9c2"/><rect x="610" y="365" width="235" height="129" rx="30" fill="#d6c7ae"/><rect x="320" y="447" width="580" height="105" rx="28" fill="#d4c3a6"/><ellipse cx="735" cy="595" rx="170" ry="38" fill="#4f4335"/><path d="M635 598V654M825 598V654" stroke="#4f4335" strokeWidth="16"/><ellipse cx="735" cy="582" rx="170" ry="36" fill="#847057"/><path d="M1000 493V615M975 615H1025" stroke="#4e4331" strokeWidth="10"/><path fill="#c6af88" d="M958 458L1042 458L1060 510H940Z"/><path d="M125 760L560 470M410 760L690 470M900 760L800 470" stroke="#e5ccaa" strokeWidth="2" opacity=".3"/></svg>
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
  const page = useRef(null)
  const hero = useRef(null)
  const current = spaces[active]
  const range = plans[plan]
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
  function pointer(e) {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    hero.current?.style.setProperty("--ma-x", ((e.clientX - rect.left) / rect.width - .5) * 16 + "px")
    hero.current?.style.setProperty("--ma-y", ((e.clientY - rect.top) / rect.height - .5) * 12 + "px")
  }
  return <main className="ma-site" ref={page}>
    <Seo page={{path:"/works/industry/interior",title:"間序 MA — SPACE STUDIO｜Qingyu Web 原創概念作品",description:"沉浸式室內設計品牌官網，包含設計作品、互動預算試算與真實網站委託入口。"}}/>
    <div className="ma-progress" aria-hidden="true"/>
    <div className="ma-demo-bar"><Link to="/works">← QINGYU WEB / 作品集</Link><span>01 / 原創概念・非客戶委託</span></div>
    <header className="ma-header"><a className="ma-logo" href="#ma-top" aria-label="間序首頁">間序<span>.</span><small>MA / SPACE STUDIO</small></a><button className="ma-menu-toggle" aria-expanded={menu} aria-controls="ma-nav" onClick={()=>setMenu(v=>!v)}>{menu?"關閉 −":"選單 +"}</button><nav id="ma-nav" className={menu?"ma-nav is-open":"ma-nav"} aria-label="網站選單"><a href="#ma-projects" onClick={()=>setMenu(false)}>設計作品</a><a href="#ma-about" onClick={()=>setMenu(false)}>設計理念</a><a href="#ma-estimate" onClick={()=>setMenu(false)}>預算試算 ↗</a></nav></header>
    <section id="ma-top" className="ma-hero" ref={hero} onPointerMove={pointer} onPointerLeave={()=>{hero.current?.style.setProperty("--ma-x","0px");hero.current?.style.setProperty("--ma-y","0px")}}>
      <div className="ma-hero-image" key={active}><Photo space={current} eager/></div><div className="ma-hero-shade"/>
      <div className="ma-hero-copy"><span className="ma-kicker">TAIWAN / INTERIOR & SPATIAL DESIGN</span><h1>讓生活，<br/>留一點<span>空間。</span></h1><p>Spaces for the way you live.</p><a className="ma-round-link" href="#ma-projects"><span>探索設計作品</span><span aria-hidden="true">↘</span></a></div>
      <div className="ma-hero-bottom"><div><span className="ma-index">0{active+1} / 0{spaces.length}</span><span className="ma-current">{current.en}</span></div><div className="ma-controls"><button aria-label="上一張空間" onClick={()=>setActive(i=>(i+spaces.length-1)%spaces.length)}>←</button><button aria-label="下一張空間" onClick={()=>setActive(i=>(i+1)%spaces.length)}>→</button></div></div>
    </section>
    <div className="ma-strip"><span>DESIGNED TO BE LIVED IN.</span><span>光・材質・生活</span><span>ARCHITECTURE OF EVERYDAY.</span></div>
    <section id="ma-projects" className="ma-section"><div className="ma-section-heading" data-ma-reveal><div><span className="ma-kicker">01 / SELECTED SPACES</span><h2>空間的<span>故事。</span></h2></div><p>不同的生活方式，值得不同的空間答案。<br/>以下皆為概念提案與攝影示意。</p></div><div className="ma-filters" aria-label="作品類型">{["全部","住宅空間","商業空間"].map(t=><button key={t} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t}</button>)}</div><div className="ma-project-grid">{spaces.filter(s=>filter==="全部"||s.type===filter).map((s,i)=><article key={s.en} className="ma-project" data-ma-reveal><Photo space={s}/><div className="ma-project-meta"><span>0{spaces.indexOf(s)+1} / {s.type}</span><span>{s.area}</span></div><h3>{s.title}<span>{s.en}</span></h3><p>{s.description}</p><a className="ma-credit" href={s.source} target="_blank" rel="noreferrer">攝影：{s.credit} / Unsplash ↗</a><span className="ma-project-number" aria-hidden="true">0{i+1}</span></article>)}</div></section>
    <section id="ma-about" className="ma-manifesto"><div data-ma-reveal><span className="ma-kicker">02 / PHILOSOPHY</span><h2>不是填滿空間，<br/>而是讓<span>生活發生。</span></h2><p>我們從人的需求出發，尋找光線、材質與動線之間的平衡。每一道細節，都是為了日常而存在。</p></div><div className="ma-process">{[["01","理解","需求訪談與現場條件"],["02","設計","風格、動線與平面規劃"],["03","實現","工程規劃與驗收"]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section id="ma-estimate" className="ma-section ma-estimate"><div className="ma-section-heading" data-ma-reveal><div><span className="ma-kicker">03 / BUDGET ESTIMATOR</span><h2>你的空間，<br/>從<span>預算開始。</span></h2></div><p>選擇需求與坪數，即時查看概念預算。<br/>示範計算，不代表實際裝修行情或報價。</p></div><div className="ma-calculator"><div className="ma-inputs"><fieldset><legend>01 / 選擇工程類型</legend><div className="ma-plans">{plans.map((p,i)=><button type="button" key={p.name} aria-pressed={plan===i} onClick={()=>setPlan(i)}><strong>{p.name}</strong><small>{p.detail}</small></button>)}</div></fieldset><fieldset><legend>02 / 空間坪數 <output>{area} 坪</output></legend><input aria-label="空間坪數" type="range" min="5" max="80" value={area} onChange={e=>setArea(Number(e.target.value))}/><div className="ma-range-label"><span>5 坪</span><span>80 坪</span></div></fieldset><label className="ma-extra"><input type="checkbox" checked={extra} onChange={e=>setExtra(e.target.checked)}/> 包含家具與軟裝示意預算</label></div><div className="ma-result"><span className="ma-kicker">YOUR ESTIMATED BUDGET</span><span className="ma-result-label">概念預算區間</span><div className="ma-amount" aria-live="polite">{money(low)}–{money(high)}<small> 萬元</small></div><p>{range.name} / {area} 坪{extra?" / 含軟裝":""}</p><Link className="ma-primary" to="/contact?case=interior-website">我也想做這樣的網站 <span>↗</span></Link><small>前往 Qingyu Web 真實委託洽詢。此處不接受裝修訂單。</small></div></div></section>
    <footer className="ma-footer"><div><span className="ma-kicker">A DIGITAL EXPERIENCE BY QINGYU WEB</span><h2>你的品牌，<br/>也可以這樣被看見。</h2><p>品牌官網 / 互動設計 / 商業流程整合</p></div><div className="ma-footer-actions"><Link className="ma-primary" to="/contact">洽詢網站設計 ↗</Link><Link className="ma-back" to="/works">返回全部作品 →</Link></div><div className="ma-footer-note">間序為原創虛構品牌；照片為 Unsplash 授權示意素材，非實際委託作品。© Qingyu Web Studio.</div></footer>
  </main>
}
