import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import { contact } from "./site/content"
import "./StudioRebrand.css"

const works = [
  {id:"01",title:"間序 MA / SPACE STUDIO",type:"品牌概念作品",desc:"把室內設計的質感與互動預算規劃，整合成完整的品牌網站。",to:"/works/industry/interior",kind:"ma",tags:"品牌策略 / 網頁設計 / 互動開發"},
  {id:"02",title:"鑫匠工程",type:"真實上線案例",desc:"讓在地工程品牌有自己的形象網站，將詢價導入案件管理流程。",to:"/works/xinjiang",kind:"xin",tags:"品牌官網 / 詢價流程"},
  {id:"03",title:"企業 AI 知識庫",type:"互動技術作品",desc:"從企業文件搜尋到附來源的問答，將知識轉化為可以使用的工具。",to:"/works/rag-consultant",kind:"ai",tags:"AI / RAG / 企業工具"},
  {id:"04",title:"批發訂貨系統",type:"可操作系統",desc:"將訂單、專屬價格、出貨與對帳，整理成一致的工作流程。",to:"/works/wholesale-ordering",kind:"sys",tags:"企業系統 / 前後台 / 自動化"}
]
const services = [
  ["01","品牌網站與電商","Brand & commerce","從品牌定位、視覺設計，到手機版、購物與洽詢流程。","/services"],
  ["02","企業系統與流程","Business systems","把報價、訂單、預約、客戶資料整合成日常使用的工具。","/works/wholesale-ordering"],
  ["03","AI 與自動化","AI & automation","LINE 接待、文件問答、資料整理與企業流程串接。","/ai-transformation"],
]
function Orbit(){
  return <svg className="sr-orbit" viewBox="0 0 600 600" aria-hidden="true"><defs><radialGradient id="srglow"><stop stopColor="#c9ff45" stopOpacity=".16"/><stop offset="1" stopColor="#c9ff45" stopOpacity="0"/></radialGradient></defs><circle cx="300" cy="300" r="265" fill="url(#srglow)"/><g className="sr-spin">{Array.from({length:36},(_,i)=><ellipse key={i} cx="300" cy="300" rx={234-i*.65} ry={67+i*1.1} transform={"rotate("+i*5+" 300 300)"} fill="none" stroke={i%6===0?"#d6ff57":"#a1ba62"} opacity={i%6===0?.87:.35} strokeWidth={i%6===0?1.5:.8}/>)}</g><circle cx="300" cy="300" r="4" fill="#d6ff57"/><circle cx="300" cy="300" r="267" fill="none" stroke="#b4cc88" strokeOpacity=".15" strokeDasharray="2 8"/><path d="M300 22v20M300 558v20M22 300h20M558 300h20" stroke="#d6ff57" strokeOpacity=".6"/><text x="300" y="16" textAnchor="middle" fill="#a2aa91" fontSize="9" letterSpacing="3">FORM / FUNCTION</text></svg>
}
function WorkVisual({kind}){
 if(kind==="ma")return <div className="sr-cover sr-ma"><div className="sr-ma-scene"><div className="sr-ma-window"/><div className="sr-ma-wall"/><div className="sr-ma-bench"/><div className="sr-ma-table"/></div><div className="sr-ma-type"><small>MA / SPACE STUDIO</small><strong>讓光，<br/>成為空間。</strong><span>DESIGN FOR EVERYDAY LIFE</span></div><span className="sr-visual-label">品牌視覺概念</span></div>
 if(kind==="xin")return <div className="sr-cover sr-xin"><span className="sr-visual-label">案例視覺示意</span><div className="sr-architecture"><i/><i/><i/><i/><i/></div><div className="sr-xin-type"><small>XINJIANG / CONSTRUCTION</small><strong>鑫匠<span>工程</span></strong><p>用專業，築起每一份信任。</p></div></div>
 if(kind==="ai")return <div className="sr-cover sr-ai"><span className="sr-visual-label">介面概念</span><div className="sr-mock"><div className="sr-mock-top"><span>✳ KNOWLEDGE</span><i>AI WORKSPACE</i></div><div className="sr-chat"><span>企業文件 · 智慧問答</span><b>如何查詢公司內部流程？</b><div className="sr-chat-answer"><i/>依據知識庫中的文件，整理相關資訊與來源。</div><div className="sr-sources"><span>▤ 文件來源 01</span><span>▤ 文件來源 02</span></div></div></div></div>
 return <div className="sr-cover sr-system"><span className="sr-visual-label">介面概念</span><div className="sr-mock"><div className="sr-mock-top"><span>◈ ORDER / SYSTEM</span><i>BUSINESS OPERATIONS</i></div><div className="sr-board"><div><small>訂單管理</small><b>Orders</b><span>▤ 待處理　　→</span><span>▤ 已確認　　→</span><span>▤ 出貨中　　→</span></div><div className="sr-bars">{[36,63,48,82,66,95,76].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div></div></div></div>
}
export default function StudioRebrand(){
 const [menu,setMenu]=useState(false)
 const root=useRef(null)
 const hero=useRef(null)
 useEffect(()=>{const el=root.current;if(!el||!window.IntersectionObserver||matchMedia("(prefers-reduced-motion: reduce)").matches)return; const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("sr-in");obs.unobserve(e.target)}}),{threshold:.08});el.querySelectorAll("[data-reveal]").forEach(e=>{e.classList.add("sr-reveal");obs.observe(e)});return()=>obs.disconnect()},[])
 useEffect(()=>{window.scrollTo(0,0)},[])
 const move=e=>{if(e.pointerType!=="mouse"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const b=e.currentTarget.getBoundingClientRect();hero.current?.style.setProperty("--mx",((e.clientX-b.left)/b.width-.5)*24+"px");hero.current?.style.setProperty("--my",((e.clientY-b.top)/b.height-.5)*24+"px")}
 return <div className="sr" ref={root}><Seo page={{path:"/",title:"Qingyu Web Studio｜品牌網站、企業系統與 AI 自動化",description:"獨立數位設計與技術工作室。打造有辨識度的品牌網站、互動體驗、企業系統與 AI 自動化。"}}/>
 <a className="sr-skip" href="#sr-work">跳至精選作品</a>
 <header className="sr-header"><Link to="/" className="sr-logo">qingyu<span>✳</span><small>STUDIO</small></Link><nav className={menu?"sr-nav sr-open":"sr-nav"} aria-label="主要導覽"><a href="#sr-work" onClick={()=>setMenu(false)}>精選作品</a><a href="#sr-services" onClick={()=>setMenu(false)}>服務</a><a href="#sr-about" onClick={()=>setMenu(false)}>關於</a><Link to="/pricing">合作預算</Link></nav><div className="sr-head-actions"><Link to="/contact" className="sr-button sr-small">開始專案 <span>↗</span></Link><button className="sr-menu" aria-expanded={menu} aria-label="選單" onClick={()=>setMenu(v=>!v)}>{menu?"×":"☰"}</button></div></header>
 <main><section className="sr-hero" ref={hero} onPointerMove={move} onPointerLeave={()=>{hero.current?.style.setProperty("--mx","0px");hero.current?.style.setProperty("--my","0px")}}><div className="sr-hero-grid"/><Orbit/><div className="sr-hero-copy"><div className="sr-kicker"><i/> INDEPENDENT DIGITAL STUDIO · TAIWAN</div><h1><span>不只讓品牌</span><span>被看見<span className="sr-period">.</span></span><span className="sr-accent">更讓生意運轉。</span></h1><p>從第一眼的設計，到每一天的使用。<br/>為品牌打造有辨識度的網站，為企業開發真正好用的數位系統。</p><div className="sr-actions"><a className="sr-button" href="#sr-work">探索精選作品 <span>↘</span></a><Link to="/contact" className="sr-button sr-outline">聊聊你的需求 <span>↗</span></Link></div></div><div className="sr-hero-foot"><span>DESIGN WITH INTENT. BUILD WITH PURPOSE.</span><span>SCROLL TO EXPLORE ↓</span></div></section>
 <div className="sr-ticker" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>DESIGN <b>✳</b> DEVELOPMENT <b>✳</b> AUTOMATION <b>✳</b> </span>)}</div></div>
 <section id="sr-work" className="sr-works sr-section"><div className="sr-section-head" data-reveal><div><div className="sr-kicker">01 / SELECTED WORK</div><h2>不是模板。<br/>是完整的作品<span>.</span></h2></div><p>每個專案都是不同的問題、不同的品牌。<br/>從視覺到流程，親自打開來看。</p></div><div className="sr-work-grid">{works.map(w=><Link key={w.id} className={"sr-project sr-project-"+w.kind} to={w.to} data-reveal><WorkVisual kind={w.kind}/><div className="sr-project-meta"><span>{w.id} / {w.type}</span><span>查看作品 ↗</span></div><h3>{w.title}</h3><p>{w.desc}</p><small>{w.tags}</small></Link>)}</div><Link className="sr-textlink" to="/works">探索全部作品 <span>↗</span></Link></section>
 <section id="sr-services" className="sr-services sr-section"><div className="sr-kicker">02 / WHAT I DO</div><div className="sr-section-head" data-reveal><h2>好看只是起點。<br/>好用才是價值<span>.</span></h2><p>從網站開始，也能一路整合到企業日常的工作流程。依需求規劃，而不是套入固定方案。</p></div><div className="sr-service-list">{services.map(([n,title,en,desc,to])=><Link key={n} to={to} data-reveal><span className="sr-service-no">{n}</span><div><h3>{title}</h3><small>{en}</small></div><p>{desc}</p><span className="sr-arrow">↗</span></Link>)}</div></section>
 <section id="sr-about" className="sr-about sr-section"><div className="sr-about-mark" aria-hidden="true">q<span>✳</span></div><div data-reveal><div className="sr-kicker">03 / BEHIND THE STUDIO</div><h2>設計與程式。<br/>不必二選一<span>.</span></h2><p>我是獨立網站開發者，以設計、全端開發與 AI 整合為核心，直接與客戶討論需求、製作、測試與交付。重視使用體驗，也重視後續維護。</p><div className="sr-process"><div><b>01</b> 需求討論</div><div><b>02</b> 設計提案</div><div><b>03</b> 開發交付</div></div><Link className="sr-textlink" to="/contact">認識合作方式 ↗</Link></div></section>
 <section className="sr-cta sr-section" data-reveal><div className="sr-kicker">04 / LET'S BUILD SOMETHING</div><h2>有個想法？<br/>讓它<span>真的發生。</span></h2><p>不需要先準備完整規格。告訴我你的產業、目標與目前遇到的問題。</p><div className="sr-actions"><Link to="/contact" className="sr-button sr-dark-button">開始你的專案 ↗</Link><a className="sr-button sr-cta-outline" href={"mailto:"+contact.email}>寄信給我 ↗</a></div></section></main>
 <footer className="sr-footer"><Link to="/" className="sr-logo">qingyu<span>✳</span><small>STUDIO</small></Link><span>© {new Date().getFullYear()} QINGYU WEB STUDIO</span><div><Link to="/works">作品</Link><Link to="/services">服務</Link><Link to="/pricing">預算</Link><Link to="/contact">聯絡</Link></div></footer></div>
}
