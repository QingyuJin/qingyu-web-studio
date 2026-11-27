import {useEffect,useState,useRef,useId} from "react"
import {Link,useParams} from "react-router-dom"
import Seo from "./Seo"
import {products as beautyProducts} from "../beauty-shopline/beautyShoplineData"
import "./PortfolioFlagships.css"
import {SpaceIllustration,ProductScreen,DiningArt} from "./PortfolioVisuals"

export const flagships=[
 {id:"ma",name:"MA STUDIO",zh:"間序空間設計",group:"brand",kind:"品牌概念作品",desc:"以光與材質建立有溫度的品牌體驗",to:"/works/industry/interior",image:"/project-photos/335941_0.jpg",tone:"ma"},
 {id:"aurel",name:"AUREL",zh:"肌膚日常",group:"brand",kind:"品牌電商概念",desc:"讓商品選擇與日常保養成為舒服的體驗",to:"/showcase/aurel",image:"/beauty-preview/serum-ritual.jpg",tone:"aurel"},
 {id:"gloss",name:"GLOSS",zh:"曜面車體美容",group:"brand",kind:"互動品牌概念",desc:"以光澤與細節呈現車體美容的價值",to:"/showcase/gloss",tone:"gloss"},
 {id:"qingyu-ai",name:"QINGYU AI",zh:"企業知識工作台",group:"ai",kind:"本機文件檢索工具",desc:"匯入自己的文件並搜尋可核對的原文",to:"/showcase/qingyu-ai",image:"/demo-covers/rag-knowledge.svg",tone:"ai"},
 {id:"floworder",name:"FlowOrder",zh:"批發營運平台",group:"product",kind:"本機可操作系統",desc:"從訂貨到庫存與出貨的完整操作流程",to:"/showcase/floworder",image:"/demo-covers/wholesale-ordering.svg",tone:"flow"},
 {id:"tableflow",name:"TableFlow",zh:"餐飲品牌與營運",group:"product",kind:"本機可操作系統",desc:"從餐桌點餐到廚房出單的數位體驗",to:"/showcase/tableflow",image:"/demo-products/short-rib-rice.svg",tone:"table"},
 {id:"xinjiang",name:"XINJIANG",zh:"鑫匠工程",group:"live",kind:"既有上線案例",desc:"品牌形象與工程詢價管理",to:"/works/xinjiang",image:"/project-photos/335941_0.jpg",tone:"xin"},
]
const fmt=n=>new Intl.NumberFormat("zh-TW",{style:"currency",currency:"TWD",maximumFractionDigits:0}).format(n)
function useStored(key,initial){
 const [value,setValue]=useState(()=>{try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):initial}catch{return initial}})
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}},[key,value])
 return [value,setValue]
}
function saveFile(name,content,type="text/plain"){
 const url=URL.createObjectURL(new Blob([content],{type:type+";charset=utf-8"}))
 const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)
}
const csvCell=x=>'"'+String(x??"").replaceAll('"','""')+'"'
function exportRows(name,rows){saveFile(name,"\ufeff"+rows.map(row=>row.map(csvCell).join(",")).join("\n"),"text/csv")}
function Car({clean=true}){
 const id=useId()
 const metal=clean?["#e6f1f8","#91acbf","#354b5e","#b7cfda","#263b4b"]:["#8b979c","#69747a","#424b52","#82898c","#30383d"]
 return <svg viewBox="0 0 960 480" className="pf-car" role="img" aria-label={clean?"光澤車體原創插畫":"養護前車體原創插畫"}><defs>
 <linearGradient id={id+"body"} x2="0" y2="1"><stop stopColor={metal[0]}/><stop offset=".22" stopColor={metal[1]}/><stop offset=".47" stopColor={metal[2]}/><stop offset=".53" stopColor={metal[3]}/><stop offset=".85" stopColor={metal[4]}/><stop offset="1" stopColor="#131b23"/></linearGradient>
 <linearGradient id={id+"glass"} x2=".3" y2="1"><stop stopColor="#9aaeba"/><stop offset=".28" stopColor="#38536b"/><stop offset="1" stopColor="#101b25"/></linearGradient>
 <radialGradient id={id+"rim"}><stop stopColor="#d2dbe0"/><stop offset=".42" stopColor="#566471"/><stop offset=".78" stopColor="#26343e"/><stop offset=".84" stopColor="#d1d9dd"/><stop offset="1" stopColor="#697a85"/></radialGradient>
 <linearGradient id={id+"light"}><stop stopColor="#a8d8ee"/><stop offset=".5" stopColor="#f5fbff"/><stop offset="1" stopColor="#82bfd6"/></linearGradient>
 <filter id={id+"blur"}><feGaussianBlur stdDeviation="13"/></filter>
 </defs>
 <ellipse cx="478" cy="399" rx="405" ry="45" fill="#060a0e" opacity=".75" filter={"url(#"+id+"blur)"}/><ellipse cx="480" cy="410" rx="380" ry="17" fill="#9ec9e2" opacity={clean?.13:.04}/>
 <path d="M53 325Q61 290 91 276L225 236Q273 222 314 184L378 127Q406 105 456 105L548 105Q589 105 628 128L718 199Q745 218 791 234L870 265Q902 278 909 321L896 367 62 367Z" fill={"url(#"+id+"body)"} stroke={clean?"#9fb6c6":"#66757e"} strokeWidth="1.8"/>
 <path d="M278 222L395 135Q421 121 458 121H548Q579 121 608 140L690 212Z" fill={"url(#"+id+"glass)"} stroke="#9cadba" strokeWidth="2"/>
 <path d="M479 122L465 217M596 134L624 214M298 211L686 211" fill="none" stroke="#18232e" strokeWidth="8"/>
 <path d="M319 202L402 142Q425 130 451 130H548Q584 129 608 148L656 188" fill="none" stroke="#c9e0eb" strokeWidth="1.7" opacity=".54"/>
 <path d="M89 276Q214 247 292 242L710 235Q810 243 871 271" fill="none" stroke={metal[0]} strokeWidth="3.8" opacity={clean?.9:.24}/>
 <path d="M89 290Q217 270 347 277T682 265L870 286" fill="none" stroke="#e9f5fc" strokeWidth="1.8" opacity={clean?.5:.12}/>
 <path d="M318 227L302 273 315 337H658L686 270 666 218M482 226V337" fill="none" stroke="#172630" strokeWidth="2.6" opacity=".9"/>
 <path d="M401 248h42M572 246h40" stroke="#dce8ef" strokeOpacity={clean?.75:.3} strokeWidth="4" strokeLinecap="round"/>
 <path d="M280 228L316 220 332 230 316 244H286Z" fill={metal[1]} stroke="#17242d"/>
 <path d="M674 222L711 221 732 231 711 240 676 234Z" fill={metal[2]}/>
 <path d="M75 301L133 287 180 288 164 307 77 318Z" fill="#101b24"/><path d="M78 302L137 289H170" fill="none" stroke={"url(#"+id+"light)"} strokeWidth={clean?6:3} opacity={clean?1:.55}/>
 <path d="M813 270L872 281 895 296 831 291Z" fill="#451e23"/><path d="M819 273L870 284 889 294" fill="none" stroke="#df8584" strokeWidth="4" opacity=".85"/>
 <path d="M62 346H157L169 362H59ZM802 343H900L896 363H796Z" fill="#111b23"/>
 <path d="M263 354Q471 369 690 353L682 368H270Z" fill="#18242d"/><path d="M281 349H679" stroke="#a2b8c7" strokeWidth="2" opacity={clean?.75:.22}/>
 {[210,747].map((x)=><g key={x}><path d={"M"+(x-77)+" 361 A77 77 0 0 1 "+(x+77)+" 361V369H"+(x-77)+"Z"} fill="#111923" stroke="#3b4b58" strokeWidth="2"/><circle cx={x} cy="365" r="68" fill="#151b20" stroke="#26333d" strokeWidth="5"/><circle cx={x} cy="365" r="55" fill="#070c10" stroke="#6b7c89" strokeWidth="2"/><circle cx={x} cy="365" r="48" fill={"url(#"+id+"rim)"}/><circle cx={x} cy="365" r="38" fill="#283743"/>{Array.from({length:10},(_,i)=><path key={i} d={"M"+(x-4)+" 355L"+(x-8)+" 322H"+(x+4)+"L"+(x+7)+" 353Z"} transform={"rotate("+(i*36)+" "+x+" 365)"} fill={clean?"#b4c4d0":"#77848d"} stroke="#35444f" strokeWidth="1"/>)}<circle cx={x} cy="365" r="13" fill="#536572" stroke="#c1ccd3" strokeWidth="3"/><circle cx={x} cy="365" r="5" fill="#243541"/></g>)}
 {!clean&&Array.from({length:35},(_,i)=><path key={i} d={"M"+(100+(i*71)%750)+" "+(285+(i*19)%51)+"l"+(12+i%5*5)+" -8"} stroke="#b7b9b5" strokeOpacity=".24" strokeWidth=".9"/>)}
 </svg>
}
function Cover({item,hero=false}){
 return <div className={"pf-cover pf-cover-"+item.tone+(hero?" pf-cover-hero":"")}><div className="pf-cover-art">
 {item.id==="ma"?<SpaceIllustration/>:item.id==="gloss"?<><div className="pv-car-halo"/><div className="pv-car-lines"/><Car/></>:item.id==="qingyu-ai"?<ProductScreen type="ai"/>:item.id==="floworder"?<ProductScreen type="flow"/>:item.id==="tableflow"?<DiningArt/>:<img src={item.image} alt="" loading={hero?"eager":"lazy"} decoding="async"/>}</div>
 <span className="pv-cover-word">{item.name}</span><small className="pv-cover-caption">{item.id==="ma"?"SPATIAL DESIGN":item.id==="aurel"?"DAILY RITUALS":item.id==="gloss"?"DETAILING STUDIO":item.id==="tableflow"?"DINING EXPERIENCE":item.id==="qingyu-ai"?"KNOWLEDGE WORKSPACE":item.id==="floworder"?"BUSINESS OPERATIONS":"SELECTED PROJECT"}</small></div>
}
const chapters={
 aurel:[["01","清潔","讓每一天從柔和的清潔開始"],["02","補水","用簡單步驟照顧日常膚觸"],["03","柔潤","將保養留在舒服的節奏"]],
 gloss:[["01","車身清潔","從每一道縫隙開始"],["02","漆面整理","讓細節重新顯現"],["03","光澤養護","為車體保留乾淨質感"]],
 "qingyu-ai":[["01","文件匯入","使用自己的文字資料"],["02","內容檢索","查看命中的原文段落"],["03","資訊匯出","將找到的資料帶回工作"]],
 floworder:[["01","客戶訂貨","選擇商品與數量"],["02","庫存管理","依本機訂單扣除庫存"],["03","出貨紀錄","確認狀態與匯出報表"]],
 tableflow:[["01","餐桌體驗","從菜單選擇喜歡的餐點"],["02","廚房接單","切換工作台掌握狀態"],["03","營運紀錄","將本機訂單匯出保存"]]
}
function EditorialChapter({id}){
 const rows=chapters[id]
 return <section className="pv-chapter"><div className="pv-chapter-intro"><small>THE EXPERIENCE</small><h2>{id==="aurel"?"把日常留給自己":id==="gloss"?"從細節開始的專注":id==="qingyu-ai"?"清楚的知識工作流程":id==="floworder"?"讓營運回到簡單": "讓餐桌與廚房連在一起"}</h2></div><div className="pv-chapter-grid">{rows.map(([no,title,desc])=><article key={no}><span>{no}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
}
export function FlagshipGallery({compact=false}){
 const [filter,setFilter]=useState("all")
 const groups=[["all","全部作品"],["brand","品牌網站"],["product","數位產品"],["ai","AI 解決方案"],["live","真實案例"],["lab","創意實驗室"]]
 const lab=[{id:"coach",name:"FORM",zh:"日常進化健身教練",group:"lab",kind:"課程試算概念",desc:"課程方案與體驗費用試算",to:"/works/industry/coach",image:"/demo-covers/product-landing.svg",tone:"flow"},{id:"quiz",name:"INTERACTIVE QUIZ",zh:"互動測驗",group:"lab",kind:"互動工具",desc:"作答與結果呈現",to:"/works/assessment-system",image:"/demo-covers/rag-knowledge.svg",tone:"ai"},{id:"analytics",name:"InsightFlow",zh:"網站成效管理",group:"lab",kind:"資料介面展示",desc:"網站成效與報表操作",to:"/works/analytics-dashboard",image:"/demo-covers/analytics-dashboard.svg",tone:"flow"}];const entries=filter==="lab"?lab:flagships.filter(x=>filter==="all"||x.group===filter)
 return <section className={"pf-gallery "+(compact?"pf-gallery-compact":"")}><div className="pf-gallery-head"><div><small>SELECTED WORKS</small><h2>值得被看見的作品</h2></div><p>每件作品都有自己的品牌與使用體驗</p></div><div className="pf-tabs" aria-label="作品分類">{groups.map(([id,name])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{name}</button>)}</div><div className="pf-gallery-grid">{entries.map(item=><Link className="pf-card" key={item.id} to={item.to}><Cover item={item}/><div className="pf-card-meta"><span>{item.kind}</span><span className="pv-card-arrow" aria-hidden="true">↗</span></div><h3>{item.zh}</h3><p>{item.desc}</p></Link>)}</div>{compact&&<Link className="pf-all" to="/works">探索全部作品 <span aria-hidden="true">↗</span></Link>}</section>
}
const details={
 aurel:{label:"SKINCARE AND DAILY RITUALS",headline:["日常的保養","剛剛好的美"],intro:"以簡單的步驟與舒服的選購體驗 建立屬於自己的保養節奏",action:"探索保養系列",theme:"aurel",existing:"/works/beauty-shopline-preview",existingLabel:"探索完整美容服務與品牌提案"},
 gloss:{label:"DETAILING STUDIO",headline:["光澤之下","每個細節都重要"],intro:"從清潔到漆面養護 讓每一台車都有適合自己的保養方案",action:"規劃車體養護",theme:"gloss",existing:null},
 "qingyu-ai":{label:"KNOWLEDGE WORKSPACE",headline:["讓企業知識","成為工作的力量"],intro:"真正匯入自己的文字文件 搜尋相關段落並核對原始來源",action:"開啟知識工作台",theme:"ai",existing:"/rag-consultant",existingLabel:"查看原有 RAG 流程展示"},
 floworder:{label:"WHOLESALE OPERATIONS",headline:["每一筆訂單","都有清楚的去向"],intro:"客戶訂貨 庫存追蹤 出貨及報表 在同一個工作流程完成",action:"進入營運工作台",theme:"flow",existing:"/wholesale-ordering",existingLabel:"探索原有完整批發介面"},
 tableflow:{label:"DINING AND OPERATIONS",headline:["從一張餐桌","到完整的營運"],intro:"讓點餐更自然 讓廚房與服務流程清楚可見",action:"開始點餐",theme:"table",existing:"/restaurant-ordering",existingLabel:"探索原有餐飲管理介面"}
}
function Aurel(){
 const [cart,setCart]=useStored("pf-aurel-cart-v1",{})
 const [goal,setGoal]=useState("保濕")
 const [open,setOpen]=useState(null)
 const [service,setService]=useState("基礎保養諮詢")
 const [date,setDate]=useState("")
 const [time,setTime]=useState("14:00")
 const [plans,setPlans]=useStored("pf-aurel-plans-v1",[])
 const total=beautyProducts.reduce((sum,p)=>sum+(cart[p.id]||0)*p.price,0)
 const change=(id,n)=>setCart(old=>({...old,[id]:Math.max(0,Math.min(99,(old[id]||0)+n))}))
 const suggestion=goal==="清潔"?beautyProducts[1]:goal==="柔潤"?beautyProducts[2]:beautyProducts[0]
 return <><div className="pf-tool-head"><small>01 THE COLLECTION</small><h2>你的日常保養</h2><p>選擇偏好的保養步驟並查看商品詳情</p></div><div className="pf-products">{beautyProducts.map(p=><article key={p.id}><button className="pf-product-image" onClick={()=>setOpen(p)}><img src={p.image} alt={p.name}/></button><small>{p.englishName}</small><h3>{p.name}</h3><p>{p.size}　{fmt(p.price)}</p><div className="pf-inline"><button onClick={()=>setOpen(p)}>商品詳情</button><button className="pf-solid" onClick={()=>change(p.id,1)}>加入購物袋</button></div></article>)}</div>
 <div className="pf-split"><section className="pf-panel"><h3>保養偏好</h3><p>非醫療診斷 僅依選擇展示保養商品</p><div className="pf-tabs">{["清潔","保濕","柔潤"].map(x=><button key={x} aria-pressed={goal===x} onClick={()=>setGoal(x)}>{x}</button>)}</div><div className="pf-recommend"><img src={suggestion.image} alt=""/><div><small>YOUR ROUTINE</small><h3>{suggestion.name}</h3><p>{suggestion.short}</p><button onClick={()=>change(suggestion.id,1)}>加入購物袋</button></div></div></section><section className="pf-panel"><h3>購物袋</h3>{beautyProducts.filter(p=>cart[p.id]>0).map(p=><div className="pf-orderline" key={p.id}><span>{p.name}</span><button aria-label={"減少"+p.name} onClick={()=>change(p.id,-1)}>−</button><span>{cart[p.id]}</span><button aria-label={"增加"+p.name} onClick={()=>change(p.id,1)}>+</button><b>{fmt(p.price*cart[p.id])}</b></div>)}{total===0&&<p>購物袋目前是空的</p>}<div className="pf-total"><span>商品合計</span><strong>{fmt(total)}</strong></div><button disabled={!total} className="pf-solid" onClick={()=>exportRows("aurel-shopping-list.csv",[["商品","數量","單價"],...beautyProducts.filter(p=>cart[p.id]>0).map(p=>[p.name,cart[p.id],p.price])])}>下載購物清單</button><p>購物袋儲存在此瀏覽器 未串接付款與出貨</p></section></div>
 <section className="pf-panel pf-book"><h3>規劃護膚服務</h3><form onSubmit={e=>{e.preventDefault();setPlans(old=>[...old,{service,date,time,id:Date.now()}])}}><label>服務<select value={service} onChange={e=>setService(e.target.value)}>{["基礎保養諮詢","日常補水護理","個人保養規劃"].map(s=><option key={s}>{s}</option>)}</select></label><label>日期<input type="date" required min={new Date().toLocaleDateString("sv-SE")} value={date} onChange={e=>setDate(e.target.value)}/></label><label>時間<select value={time} onChange={e=>setTime(e.target.value)}>{["10:00","14:00","16:00"].map(s=><option key={s}>{s}</option>)}</select></label><button className="pf-solid" type="submit">儲存個人規劃</button></form>{plans.map(p=><div key={p.id} className="pf-orderline"><span>{p.service}　{p.date}　{p.time}</span><button onClick={()=>setPlans(old=>old.filter(x=>x.id!==p.id))}>移除</button></div>)}<p>僅個人規劃記錄 不會建立商家預約</p></section>
 {open&&<Modal title={open.name} close={()=>setOpen(null)}><img className="pf-modal-image" src={open.detailImage||open.image} alt={open.name}/><p>{open.description}</p><p>{open.usage}</p><button className="pf-solid" onClick={()=>{change(open.id,1);setOpen(null)}}>加入購物袋　{fmt(open.price)}</button></Modal>}</>
}
function Modal({title,close,children}){const ref=useRef(null);useEffect(()=>{const el=ref.current;el?.showModal();return()=>el?.close()},[]);return <dialog className="pf-modal" ref={ref} onCancel={close} onClick={e=>{if(e.target===ref.current)close()}}><div><button className="pf-close" aria-label="關閉" onClick={close}>×</button><h3>{title}</h3>{children}</div></dialog>}
function Gloss(){
 const [reveal,setReveal]=useState(55),[vehicle,setVehicle]=useState("轎車"),[plan,setPlan]=useState(1),[date,setDate]=useState(""),[draft,setDraft]=useStored("pf-gloss-plan-v1",null)
 const plans=[["精緻清潔",900,"車身清潔與內裝整理"],["漆面美容",4500,"漆面清潔及拋光規劃"],["鍍膜養護",12000,"漆面整備及保護方案"]]
 const total=plans[plan][1]+(vehicle==="休旅車"?500:vehicle==="大型車"?1000:0)
 return <><div className="pf-tool-head"><small>01 THE FINISH</small><h2>細節的差異</h2><p>拖曳比較原創示意插圖的光澤表現</p></div><div className="pf-compare"><div className="pf-compare-inner"><Car clean={false}/><div className="pf-compare-clean" style={{clipPath:"inset(0 "+(100-reveal)+"% 0 0)"}}><Car/></div><span className="pf-compare-rule" style={{left:reveal+"%"}}/><div className="pf-compare-labels"><span>養護後示意</span><span>養護前示意</span></div></div><input aria-label="前後效果比較" type="range" min="0" max="100" value={reveal} onChange={e=>setReveal(+e.target.value)}/></div>
 <div className="pf-tool-head"><small>02 PERSONAL PLAN</small><h2>為你的車選擇方案</h2></div><div className="pf-products pf-plan-grid">{plans.map(([name,price,desc],i)=><button key={name} aria-pressed={plan===i} onClick={()=>setPlan(i)}><small>0{i+1}</small><h3>{name}</h3><p>{desc}</p><b>{fmt(price)} 起</b></button>)}</div><section className="pf-panel pf-book"><form onSubmit={e=>{e.preventDefault();setDraft({vehicle,plan:plans[plan][0],total,date})}}><label>車型<select value={vehicle} onChange={e=>setVehicle(e.target.value)}>{["轎車","休旅車","大型車"].map(x=><option key={x}>{x}</option>)}</select></label><label>希望日期<input type="date" value={date} required min={new Date().toLocaleDateString("sv-SE")} onChange={e=>setDate(e.target.value)}/></label><div className="pf-total"><span>規劃試算</span><strong>{fmt(total)}</strong></div><button className="pf-solid" type="submit">儲存養護規劃</button></form>{draft&&<div className="pf-saved"><p>{draft.vehicle}　{draft.plan}　{draft.date}　{fmt(draft.total)}</p><button onClick={()=>saveFile("gloss-plan.txt",Object.entries(draft).map(([k,v])=>k+" "+v).join("\n"))}>下載規劃</button><button onClick={()=>setDraft(null)}>清除</button></div>}<p>費用為概念範例 規劃只存在本機 不代表商家已確認預約</p></section></>
}
const seedDocs=[{id:"example",name:"範例服務規範.txt",text:"服務詢問應先確認需求範圍與預算。\n\n專案交付前需確認功能與手機版測試。\n\n保固範圍應依雙方確認的合約內容為準。"}]
function Knowledge(){
 const [docs,setDocs]=useState(seedDocs),[query,setQuery]=useState(""),[results,setResults]=useState(null),[notice,setNotice]=useState("")
 async function upload(e){const list=Array.from(e.target.files||[]);let accepted=[];for(const f of list){if(!/\.(txt|md|csv)$/i.test(f.name)||f.size>1000000){setNotice("只接受 1 MB 以內的 TXT MD CSV 檔");continue}try{accepted.push({id:crypto.randomUUID(),name:f.name,text:await f.text()})}catch{setNotice("有文件無法讀取")}}setDocs(old=>[...old,...accepted]);setResults(null);e.target.value=""}
 function search(e){e.preventDefault();const q=query.trim().toLowerCase();if(!q)return;const terms=q.split(/\s+/).filter(Boolean);const matches=docs.flatMap(d=>d.text.split(/\n\s*\n|\n/).filter(x=>x.trim()).map((text,index)=>({name:d.name,index,text,score:terms.reduce((s,t)=>s+(text.toLowerCase().includes(t)?t.length:0),0)}))).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,12);setResults(matches)}
 return <><div className="pf-tool-head"><small>01 KNOWLEDGE WORKSPACE</small><h2>從你的文件找到答案</h2><p>本機真實文字檢索 不將文件送往外部服務 不冒充生成式 AI</p></div><div className="pf-split pf-knowledge"><section className="pf-panel"><h3>文件庫</h3><label className="pf-upload">匯入文字文件<input type="file" accept=".txt,.md,.csv" multiple onChange={upload}/></label><p>{notice}</p>{docs.map(d=><div className="pf-orderline" key={d.id}><span>{d.name}<small>{d.text.length} 字元</small></span><button onClick={()=>{setDocs(old=>old.filter(x=>x.id!==d.id));setResults(null)}}>移除</button></div>)}<p>文件僅保留於本次頁面工作階段</p></section><section className="pf-panel"><h3>搜尋文件</h3><form className="pf-search" onSubmit={search}><input aria-label="搜尋關鍵字" value={query} onChange={e=>setQuery(e.target.value)} placeholder="例如 專案交付 或 保固" required/><button className="pf-solid">搜尋</button></form>{results===null?<p>輸入關鍵字後即可查看原文來源</p>:results.length===0?<p role="status">找不到符合的段落 請嘗試較短關鍵字</p>:<div aria-live="polite">{results.map((x,i)=><article className="pf-result" key={i}><small>{x.name}　段落 {x.index+1}</small><p>{x.text}</p></article>)}<button onClick={()=>saveFile("knowledge-results.txt",results.map(x=>x.name+" 段落 "+(x.index+1)+"\n"+x.text).join("\n\n"))}>匯出檢索結果</button></div>}</section></div><div className="pf-note">正式 AI 產品還需要模型 API 語意向量檢索 資料庫與企業權限管理 目前未連線</div></>
}
const wholesale=[{id:"tea",name:"原葉紅茶",price:360,stock:40},{id:"rice",name:"台灣米 5kg",price:420,stock:30},{id:"bean",name:"精選咖啡豆",price:680,stock:25},{id:"oil",name:"冷壓橄欖油",price:520,stock:18}]
const menu=[{id:"rice",name:"炭烤牛小排飯",price:280,image:"/demo-products/short-rib-rice.svg"},{id:"risotto",name:"蕈菇燉飯",price:240,image:"/demo-products/mushroom-risotto.svg"},{id:"soda",name:"梅子氣泡飲",price:95,image:"/demo-products/plum-soda.svg"}]
function Operations({restaurant=false}){
 const items=restaurant?menu:wholesale,key=restaurant?"pf-table-v1":"pf-flow-v1"
 const [data,setData]=useStored(key,{orders:[],stock:Object.fromEntries(wholesale.map(p=>[p.id,p.stock]))})
 const [cart,setCart]=useState({}),[tab,setTab]=useState("customer"),[table,setTable]=useState("1"),[msg,setMsg]=useState("")
 const stages=restaurant?["新單","備餐中","已送達"]:["待確認","備貨中","已出貨"]
 const total=items.reduce((sum,p)=>sum+(cart[p.id]||0)*p.price,0)
 const quantity=(p,delta)=>setCart(old=>({...old,[p.id]:Math.max(0,Math.min(restaurant?30:data.stock[p.id]||0,(old[p.id]||0)+delta))}))
 function submit(){if(!total)return;const lines=items.filter(p=>cart[p.id]>0).map(p=>({id:p.id,name:p.name,qty:cart[p.id],price:p.price}));if(!restaurant&&lines.some(l=>l.qty>data.stock[l.id])){setMsg("庫存不足 請重新調整");return}setData(old=>({orders:[{id:Date.now(),table,lines,total,status:0},...old.orders],stock:restaurant?old.stock:Object.fromEntries(Object.entries(old.stock).map(([id,n])=>[id,n-(cart[id]||0)]))}));setCart({});setMsg("已儲存本機訂單 可切換管理端查看");}
 function next(id){setData(old=>({...old,orders:old.orders.map(o=>o.id===id?{...o,status:Math.min(stages.length-1,o.status+1)}:o)}))}
 function reset(){if(window.confirm("清除這個展示的本機訂單與庫存紀錄？")){setData({orders:[],stock:Object.fromEntries(wholesale.map(p=>[p.id,p.stock]))});setCart({});setMsg("")}}
 return <><div className="pf-tool-head"><small>01 OPERATIONS WORKSPACE</small><h2>{restaurant?"餐桌與廚房":"訂貨與出貨"}</h2><p>在客戶端建立訂單 再切換管理端處理 本機資料刷新後仍保留</p></div><div className="pf-tabs pv-workspace-tabs"><button aria-pressed={tab==="customer"} onClick={()=>setTab("customer")}>{restaurant?"餐桌點餐":"客戶訂貨"}</button><button aria-pressed={tab==="admin"} onClick={()=>setTab("admin")}>{restaurant?"廚房管理":"營運後台"}</button></div>{tab==="customer"?<div className="pf-split pf-operations"><div className="pf-products pf-operation-items">{items.map(p=><article key={p.id}>{p.image?<img src={p.image} alt={p.name}/>:<div className="pf-stock-art"><span>{p.name.slice(0,1)}</span><small>WHOLESALE</small></div>}<h3>{p.name}</h3><p>{fmt(p.price)} {!restaurant&&"　庫存 "+data.stock[p.id]}</p><div className="pf-inline"><button aria-label={"減少"+p.name} onClick={()=>quantity(p,-1)}>−</button><span>{cart[p.id]||0}</span><button aria-label={"增加"+p.name} onClick={()=>quantity(p,1)}>+</button></div></article>)}</div><section className="pf-panel"><h3>本次訂單</h3>{restaurant&&<label>桌號<select value={table} onChange={e=>setTable(e.target.value)}>{Array.from({length:12},(_,i)=><option key={i}>{i+1}</option>)}</select></label>}{items.filter(p=>cart[p.id]>0).map(p=><div className="pf-orderline" key={p.id}><span>{p.name} × {cart[p.id]}</span><b>{fmt(p.price*cart[p.id])}</b></div>)}<div className="pf-total"><span>合計</span><strong>{fmt(total)}</strong></div><button className="pf-solid" disabled={!total} onClick={submit}>建立本機訂單</button><p role="status">{msg}</p></section></div>:<section className="pf-panel"><div className="pf-metrics">{stages.map((s,i)=><div key={s}><small>{s}</small><strong>{data.orders.filter(o=>o.status===i).length}</strong></div>)}</div>{data.orders.length===0&&<p>目前沒有訂單 請從客戶端新增</p>}{data.orders.map(o=><div className="pf-ord" key={o.id}><div><small>#{String(o.id).slice(-6)}　{restaurant?"桌號 "+o.table:"批發訂單"}</small><h3>{stages[o.status]}</h3><p>{o.lines.map(l=>l.name+" × "+l.qty).join("　")}</p></div><strong>{fmt(o.total)}</strong><button disabled={o.status===stages.length-1} onClick={()=>next(o.id)}>{o.status===stages.length-1?"已完成":"下一階段"}</button></div>)}<div className="pf-inline"><button onClick={()=>exportRows((restaurant?"tableflow":"floworder")+"-orders.csv",[["訂單編號","品項","數量","單價","狀態"],...data.orders.flatMap(o=>o.lines.map(l=>[o.id,l.name,l.qty,l.price,stages[o.status]]))])}>匯出訂單 CSV</button><button onClick={reset}>重設本機資料</button></div></section>}<div className="pf-note">本機操作版本 未串接真實金流 多裝置同步或正式廚房設備 不會建立真實商業訂單</div></>
}
export default function PortfolioFlagship(){
 const {id}=useParams(), item=flagships.find(x=>x.id===id),d=details[id]
 useEffect(()=>{window.scrollTo(0,0)},[id])
 if(!item||!d)return <div className="pf-fallback"><Link to="/works">返回作品集</Link></div>
 return <main className={"pf-site pf-theme-"+d.theme}><Seo page={{path:item.to,title:item.name+" "+item.zh+" Qingyu Studio",description:item.desc}}/><header className="pf-header"><Link to="/works" className="pf-back"><span aria-hidden="true">←</span> QINGYU STUDIO</Link><span>{item.name}</span><nav aria-label="作品導覽"><a href="#experience">品牌體驗</a><a href="#workspace">開始體驗 <span aria-hidden="true">↘</span></a></nav></header><section className="pf-hero"><div className="pf-hero-copy"><small>{d.label}</small><h1>{d.headline.map(x=><span key={x}>{x}</span>)}</h1><p>{d.intro}</p><a className="pf-hero-button" href="#workspace">{d.action} <span>↘</span></a></div><div className="pf-hero-art"><Cover item={item} hero/></div><div className="pf-hero-footer"><span>{item.kind}</span><span>INDEPENDENT DESIGN BY QINGYU STUDIO</span></div></section><div id="experience"><EditorialChapter id={id}/></div><section id="workspace" className="pf-workspace">{id==="aurel"?<Aurel/>:id==="gloss"?<Gloss/>:id==="qingyu-ai"?<Knowledge/>:<Operations key={id} restaurant={id==="tableflow"}/>}</section><section className="pf-end"><small>DESIGN WITH PURPOSE</small><h2>讓下一個作品<br/>為你的品牌而做</h2><p>由 Qingyu Studio 獨立設計與開發<br/>概念品牌與本機操作體驗 非正式商用服務</p><div className="pf-inline"><Link className="pf-hero-button" to={"/contact?case="+encodeURIComponent(item.name)}>委託類似網站 ↗</Link>{d.existing&&<Link className="pf-more" to={d.existing}>{d.existingLabel} ↗</Link>}<Link className="pf-more" to="/works">返回全部作品 ↗</Link></div></section></main>
}
