import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Seo from "./site/Seo"
import { contact } from "./site/content"
import "./StudioRebrand.css"

const works = [
  {id:"01",title:"間序 MA SPACE STUDIO",type:"品牌概念作品",desc:"以自然光與材質建立空間品牌的數位體驗",to:"/works/industry/interior",kind:"ma",tags:"品牌網站　互動體驗"},
  {id:"02",title:"鑫匠工程",type:"真實上線案例",desc:"從品牌形象到詢價與案件管理的一站式服務",to:"/works/xinjiang",kind:"xin",tags:"品牌官網　詢價流程"},
  {id:"03",title:"企業 AI 知識庫",type:"互動技術作品",desc:"讓企業文件成為可搜尋且附來源的知識工具",to:"/works/rag-consultant",kind:"ai",tags:"人工智慧　知識管理"},
  {id:"04",title:"批發訂貨系統",type:"可操作系統",desc:"將訂貨出貨與對帳整合成清楚的工作流程",to:"/works/wholesale-ordering",kind:"sys",tags:"企業系統　流程整合"}
]
const services = [
  ["01","品牌網站與電商","Brand and commerce","讓品牌留下印象並讓購物與詢問更自然","/services"],
  ["02","企業系統與流程","Business systems","整合訂單預約與客戶資料減少重複工作","/works/wholesale-ordering"],
  ["03","AI 與自動化","AI and automation","讓文件知識與日常工作透過 AI 創造更多可能","/ai-transformation"],
]
function Orbit(){
 const canvas=useRef(null)
 useEffect(()=>{
  const el=canvas.current, ctx=el?.getContext("2d")
  if(!ctx)return
  const reduce=matchMedia("(prefers-reduced-motion: reduce)")
  let frame=0,last=0,visible=true,w=0,h=0,dpr=1
  function resize(){const rect=el.getBoundingClientRect();w=rect.width;h=rect.height;dpr=Math.min(devicePixelRatio||1,1.6);el.width=Math.max(1,Math.round(w*dpr));el.height=Math.max(1,Math.round(h*dpr));ctx.setTransform(dpr,0,0,dpr,0,0)}
  function render(time){
   if(!w||!h)return
   ctx.clearRect(0,0,w,h)
   const t=reduce.matches?0:time*.00024, scale=Math.min(w,h)*.177, cx=w*.51,cy=h*.49
   const rotX=.53+Math.sin(t*.65)*.18,rotY=t*.62+.32
   const cosX=Math.cos(rotX),sinX=Math.sin(rotX),cosY=Math.cos(rotY),sinY=Math.sin(rotY)
   const seg=[]
   function point(u,v){
    const r=1.31+.54*Math.cos(3*u), x=r*Math.cos(2*u), y=r*Math.sin(2*u), z=.54*Math.sin(3*u)
    const ax=x+.28*Math.cos(v)*Math.cos(2*u),ay=y+.28*Math.cos(v)*Math.sin(2*u),az=z+.28*Math.sin(v)
    const px=ax*cosY+az*sinY,pz=-ax*sinY+az*cosY,py=ay*cosX-pz*sinX,depth=ay*sinX+pz*cosX
    const p=5/(5-depth)
    return [cx+px*scale*p,cy+py*scale*p,depth]
   }
   const rings=36,steps=144
   for(let j=0;j<rings;j++){
    const v=j*Math.PI*2/rings
    let a=point(0,v)
    for(let i=1;i<=steps;i++){const b=point(i*Math.PI*2/steps,v);seg.push([a,b,(a[2]+b[2])*.5]);a=b}
   }
   seg.sort((a,b)=>a[2]-b[2])
   ctx.lineCap="round"
   for(const [a,b,z] of seg){
    const q=Math.max(0,Math.min(1,(z+2.3)/4.6))
    const r=Math.round(57+q*170),g=Math.round(72+q*166),bl=Math.round(44+q*120)
    ctx.strokeStyle="rgba("+r+","+g+","+bl+","+(0.28+q*.62)+")"
    ctx.lineWidth=.48+q*.84;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke()
   }
  }
  function tick(now){if(visible&&now-last>38){render(now);last=now}frame=requestAnimationFrame(tick)}
  resize();render(0)
  const ro=new ResizeObserver(()=>{resize();if(reduce.matches)render(0)});ro.observe(el)
  const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting});io.observe(el)
  function motion(){cancelAnimationFrame(frame);if(reduce.matches)render(0);else frame=requestAnimationFrame(tick)}
  reduce.addEventListener("change",motion);motion()
  return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();reduce.removeEventListener("change",motion)}
 },[])
 return <div className="sr-orbit" aria-hidden="true"><div className="sr-orbit-halo"/><canvas ref={canvas}/><span className="sr-orbit-index">FORM IN MOTION</span><span className="sr-orbit-caption">A STUDY IN DIGITAL CRAFT</span></div>
}
function WorkVisual({kind}){
 if(kind==="ma")return <div className="sr-cover sr-ma"><div className="sr-ma-scene"><div className="sr-ma-window"/><div className="sr-ma-wall"/><div className="sr-ma-bench"/><div className="sr-ma-table"/></div><img className="sr-ma-photo" src="https://images.unsplash.com/photo-1771371097061-3befd4b71b59?auto=format&fit=crop&w=1800&q=82" alt="" loading="lazy" onError={e=>{e.currentTarget.style.display="none"}}/><div className="sr-ma-type"><small>MA SPACE STUDIO</small><strong>讓光<br/>成為空間</strong><span>DESIGN FOR EVERYDAY LIFE</span></div><span className="sr-visual-label">概念攝影 GoodLifeConstruction</span></div>
 if(kind==="xin")return <div className="sr-cover sr-xin"><span className="sr-visual-label">案例視覺示意</span><div className="sr-architecture"><i/><i/><i/><i/><i/></div><img className="sr-xin-photo" src="/project-photos/335941_0.jpg" alt="" loading="lazy"/><div className="sr-xin-type"><small>XINJIANG CONSTRUCTION</small><strong>鑫匠<span>工程</span></strong><p>用專業築起每一份信任</p></div></div>
 if(kind==="ai")return <div className="sr-cover sr-ai"><span className="sr-visual-label">介面概念</span><div className="sr-mock"><div className="sr-mock-top"><span>✳ KNOWLEDGE</span><i>AI WORKSPACE</i></div><div className="sr-chat"><span>企業文件智慧問答</span><b>查詢公司內部流程</b><div className="sr-chat-answer"><i/>依據知識庫文件整理相關資訊與來源</div><div className="sr-sources"><span>▤ 文件來源 01</span><span>▤ 文件來源 02</span></div></div></div></div>
 return <div className="sr-cover sr-system"><span className="sr-visual-label">介面概念</span><div className="sr-mock"><div className="sr-mock-top"><span>◈ ORDER SYSTEM</span><i>BUSINESS OPERATIONS</i></div><div className="sr-board"><div><small>訂單管理</small><b>Orders</b><span>▤ 待處理　　→</span><span>▤ 已確認　　→</span><span>▤ 出貨中　　→</span></div><div className="sr-bars">{[36,63,48,82,66,95,76].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div></div></div></div>
}
export default function StudioRebrand(){
 const [menu,setMenu]=useState(false)
 const root=useRef(null)
 const hero=useRef(null)
 useEffect(()=>{const el=root.current;if(!el||!window.IntersectionObserver||matchMedia("(prefers-reduced-motion: reduce)").matches)return; const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("sr-in");obs.unobserve(e.target)}}),{threshold:.08});el.querySelectorAll("[data-reveal]").forEach(e=>{e.classList.add("sr-reveal");obs.observe(e)});return()=>obs.disconnect()},[])
 useEffect(()=>{window.scrollTo(0,0)},[])
 const move=e=>{if(e.pointerType!=="mouse"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const b=e.currentTarget.getBoundingClientRect();hero.current?.style.setProperty("--mx",((e.clientX-b.left)/b.width-.5)*24+"px");hero.current?.style.setProperty("--my",((e.clientY-b.top)/b.height-.5)*24+"px")}
 return <div className="sr" ref={root}><Seo page={{path:"/",title:"Qingyu Web Studio 品牌網站與 AI 數位設計",description:"獨立數位設計與技術工作室 為品牌打造有辨識度的網站 為企業開發好用的數位系統"}}/>
 <a className="sr-skip" href="#sr-work">跳至精選作品</a>
 <header className="sr-header"><Link to="/" className="sr-logo">qingyu<span>✳</span><small>STUDIO</small></Link><nav className={menu?"sr-nav sr-open":"sr-nav"} aria-label="主要導覽"><a href="#sr-work" onClick={()=>setMenu(false)}>精選作品</a><a href="#sr-services" onClick={()=>setMenu(false)}>服務</a><a href="#sr-about" onClick={()=>setMenu(false)}>關於</a><Link to="/pricing">合作預算</Link></nav><div className="sr-head-actions"><Link to="/contact" className="sr-button sr-small">開始專案 <span>↗</span></Link><button className="sr-menu" aria-expanded={menu} aria-label="選單" onClick={()=>setMenu(v=>!v)}>{menu?"×":"☰"}</button></div></header>
 <main><section className="sr-hero" ref={hero} onPointerMove={move} onPointerLeave={()=>{hero.current?.style.setProperty("--mx","0px");hero.current?.style.setProperty("--my","0px")}}><div className="sr-hero-grid"/><Orbit/><div className="sr-hero-copy"><div className="sr-kicker"><i/> INDEPENDENT DIGITAL STUDIO</div><h1><span>讓好品牌</span><span>被更多人<span className="sr-accent">看見</span></span></h1><p>為品牌打造有辨識度的網站<br/>為企業開發真正好用的數位系統</p><div className="sr-actions"><a className="sr-button" href="#sr-work">探索精選作品 <span>↘</span></a><Link to="/contact" className="sr-button sr-outline">聊聊你的需求 <span>↗</span></Link></div></div><div className="sr-hero-foot"><span>DESIGN WITH INTENT   BUILD WITH PURPOSE</span><span>SCROLL TO EXPLORE ↓</span></div></section>
 <div className="sr-specialties"><span>01 品牌網站</span><span>02 企業系統</span><span>03 AI 自動化</span><span>DESIGN TO DEVELOPMENT</span></div>
 <section id="sr-work" className="sr-works sr-section"><div className="sr-section-head" data-reveal><div><div className="sr-kicker">01 SELECTED WORK</div><h2>每一件作品<br/>都有自己的<span>個性</span></h2></div><p>從品牌形象到完整的數位體驗<br/>每一件作品都可以親自探索</p></div><div className="sr-work-grid">{works.map(w=><Link key={w.id} className={"sr-project sr-project-"+w.kind} to={w.to} data-reveal><WorkVisual kind={w.kind}/><div className="sr-project-meta"><span>{w.id}　{w.type}</span><span>查看作品 ↗</span></div><h3>{w.title}</h3><p>{w.desc}</p><small>{w.tags}</small></Link>)}</div><Link className="sr-textlink" to="/works">探索全部作品 <span>↗</span></Link></section>
 <section id="sr-services" className="sr-services sr-section"><div className="sr-kicker">02 WHAT I DO</div><div className="sr-section-head" data-reveal><h2>設計與技術<br/>讓生意<span>更有可能</span></h2><p>從品牌網站到企業日常工作流程<br/>每個專案都從你的需求出發</p></div><div className="sr-service-list">{services.map(([n,title,en,desc,to])=><Link key={n} to={to} data-reveal><span className="sr-service-no">{n}</span><div><h3>{title}</h3><small>{en}</small></div><p>{desc}</p><span className="sr-arrow">↗</span></Link>)}</div></section>
 <section id="sr-about" className="sr-about sr-section"><div className="sr-about-mark" aria-hidden="true">q<span>✳</span></div><div data-reveal><div className="sr-kicker">03 BEHIND THE STUDIO</div><h2>讓好的設計<br/>遇見好的<span>技術</span></h2><p>獨立網站開發者與數位設計工作室<br/>從需求討論到設計開發與交付<br/>在意每一次使用也在意每一次合作</p><div className="sr-process"><div><b>01</b> 需求討論</div><div><b>02</b> 設計提案</div><div><b>03</b> 開發交付</div></div><Link className="sr-textlink" to="/contact">認識合作方式 ↗</Link></div></section>
 <section className="sr-cta sr-section" data-reveal><div className="sr-kicker">04 START SOMETHING</div><h2>下一個作品<br/>為你<span>而做</span></h2><p>從一個想法開始<br/>一起找到適合你的數位解決方案</p><div className="sr-actions"><Link to="/contact" className="sr-button sr-dark-button">開始你的專案 ↗</Link><a className="sr-button sr-cta-outline" href={"https://line.me/R/ti/p/~"+contact.lineId} target="_blank" rel="noreferrer">LINE 聯絡 ↗</a><a className="sr-email" href={"mailto:"+contact.email}>Email 聯絡</a></div></section></main>
 <footer className="sr-footer"><Link to="/" className="sr-logo">qingyu<span>✳</span><small>STUDIO</small></Link><span>© {new Date().getFullYear()} QINGYU WEB STUDIO</span><div><Link to="/works">作品</Link><Link to="/services">服務</Link><Link to="/pricing">預算</Link><Link to="/contact">聯絡</Link></div></footer></div>
}
