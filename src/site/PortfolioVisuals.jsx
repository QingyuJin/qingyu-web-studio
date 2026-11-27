import {useId} from "react"

export function SpaceIllustration({variant=0}){
 const uid=useId(), colors=[["#d9cbb5","#9d8b72","#d8d6bc","#475348"],["#c7b39a","#755b45","#c9bba1","#555e49"],["#d5d7ce","#92978b","#e8e1d0","#6c8170"],["#c6b898","#8d7657","#d9e1bf","#53634c"]][variant%4]
 const [wall,wood,light,green]=colors
 return <svg viewBox="0 0 1200 780" preserveAspectRatio="xMidYMid slice" role="img" aria-label="原創空間概念插畫"><defs>
 <linearGradient id={uid+"wall"} x2=".8" y2="1"><stop stopColor={wall}/><stop offset="1" stopColor={wood}/></linearGradient>
 <linearGradient id={uid+"floor"} x2=".4" y2="1"><stop stopColor={wall}/><stop offset="1" stopColor={wood}/></linearGradient>
 <linearGradient id={uid+"window"} x2="0" y2="1"><stop stopColor={light}/><stop offset="1" stopColor={green}/></linearGradient>
 <linearGradient id={uid+"sofa"} x2=".2" y2="1"><stop stopColor="#f3e9d6"/><stop offset="1" stopColor="#b4a68f"/></linearGradient>
 <radialGradient id={uid+"sun"}><stop stopColor="#fff9df" stopOpacity=".75"/><stop offset="1" stopColor="#fff9df" stopOpacity="0"/></radialGradient>
 <filter id={uid+"shadow"}><feGaussianBlur stdDeviation="12"/></filter>
 <filter id={uid+"grain"}><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/></filter>
 </defs><rect width="1200" height="780" fill={"url(#"+uid+"wall)"}/><path d="M0 0H835L1200 138V780H0Z" fill={wall}/><path d="M835 0L1200 138V780L835 495Z" fill={wood}/><path d="M0 495H835L1200 780H0Z" fill={"url(#"+uid+"floor)"}/>
 <path d="M0 0H835L1200 138L1070 181L830 57H0Z" fill="#f4ead7" opacity=".36"/>
 <rect x="79" y="53" width="506" height="442" fill="#343a32"/><rect x="93" y="67" width="478" height="414" fill={"url(#"+uid+"window)"}/>
 {Array.from({length:17},(_,i)=><g key={i} opacity={.25+i%3*.1}><path d={"M"+(95+i*27)+" 481q"+(i%2?22:-28)+" -180 4 -258"} stroke={green} strokeWidth={3+i%5} fill="none"/><ellipse cx={105+i*28} cy={155+(i*37)%170} rx={19+i%5*3} ry={37+i%4*8} fill={green}/></g>)}
 <path d="M251 67V481M411 67V481M93 273H571" stroke="#43473d" strokeWidth="9"/><path d="M93 481H571L941 780H271Z" fill="#fff4c9" opacity=".31"/><path d="M250 481H258L538 780H526ZM409 481H419L742 780H730Z" fill="#4b493c" opacity=".16"/>
 {Array.from({length:13},(_,i)=><path key={i} d={"M"+(850+i*26)+" "+(i*10)+"V"+(507+i*21)} stroke="#ebd6b0" strokeWidth="3" opacity=".23"/>)}
 {Array.from({length:7},(_,i)=><path key={i} d={"M"+(i*190)+" 780L"+(150+i*99)+" 495"} stroke="#f0ddbb" strokeWidth="1.6" opacity=".36"/>)}
 <rect x="648" y="150" width="127" height="170" fill="#574a3b"/><rect x="656" y="158" width="111" height="154" fill="#e7d7bc"/><path d="M658 287Q696 190 724 235T765 211V310H658Z" fill={green} opacity=".78"/><circle cx="735" cy="195" r="14" fill="#b08758"/>
 <ellipse cx="680" cy="634" rx="348" ry="68" fill="#534635" opacity=".25" filter={"url(#"+uid+"shadow)"}/><ellipse cx="665" cy="618" rx="350" ry="71" fill="#a89983"/><ellipse cx="665" cy="618" rx="330" ry="62" fill="none" stroke="#e2d6c0" strokeWidth="1.2"/>
 <rect x="335" y="431" width="540" height="135" rx="35" fill="#a99a84"/><rect x="361" y="367" width="237" height="148" rx="38" fill={"url(#"+uid+"sofa)"}/><rect x="606" y="367" width="242" height="148" rx="38" fill={"url(#"+uid+"sofa)"}/><rect x="329" y="466" width="557" height="86" rx="31" fill={"url(#"+uid+"sofa)"}/><path d="M365 546V580M844 546V580" stroke="#524538" strokeWidth="10"/><path d="M451 386Q470 380 490 392L501 459Q471 480 443 459Z" fill={green}/><path d="M742 383Q780 374 803 391L799 464Q762 472 729 455Z" fill="#b98f65"/>
 <ellipse cx="717" cy="614" rx="172" ry="43" fill="#574a38" opacity=".3" filter={"url(#"+uid+"shadow)"}/><path d="M617 591V664M809 591V664" stroke="#594738" strokeWidth="18"/><ellipse cx="716" cy="586" rx="173" ry="42" fill="#5f4d3d"/><ellipse cx="716" cy="575" rx="173" ry="38" fill="#92785b"/><ellipse cx="690" cy="571" rx="35" ry="9" fill="#d0bba0"/><path d="M676 572L679 536Q691 527 702 536L705 572Z" fill="#d8c8af"/>
 <path d="M1008 518V646M980 646H1036" stroke="#504437" strokeWidth="9"/><path d="M956 464H1060L1080 517H936Z" fill="#dac29d"/><ellipse cx="1008" cy="517" rx="72" ry="10" fill="#ecdfbc" opacity=".55"/>
 <path d="M110 565L133 650H204L224 565Z" fill="#73644e"/>{[0,1,2,3,4,5,6].map(i=><g key={i} transform={"rotate("+(i*19-57)+" 167 565)"}><path d="M167 565V430" stroke="#51634c" strokeWidth="4"/><ellipse cx="167" cy="443" rx="15" ry="37" fill={green}/></g>)}<ellipse cx="340" cy="197" rx="380" ry="295" fill={"url(#"+uid+"sun)"}/><rect width="1200" height="780" opacity=".045" filter={"url(#"+uid+"grain)"}/>
 </svg>
}

export function ProductScreen({type}){
 const ai=type==="ai",flow=type==="flow";
 const data=ai?[["文件庫","原始文件"],["檢索","段落來源"],["工作區","匯出紀錄"]]:flow?[["客戶訂貨","商品選擇"],["庫存管理","數量追蹤"],["出貨流程","訂單狀態"]]:[["餐桌點餐","選擇餐點"],["廚房管理","出單流程"],["營運紀錄","訂單匯出"]];
 return <div className={"pv-screen pv-screen-"+type} aria-hidden="true"><div className="pv-screen-top"><span className="pv-screen-brand"><i/>{ai?"QINGYU AI":flow?"FlowOrder":"TableFlow"}</span><span className="pv-screen-tag">WORKSPACE</span></div><div className="pv-screen-body"><aside><span>WORKSPACE</span>{data.map(([x],i)=><div className={i===0?"pv-screen-active":""} key={x}><i/>{x}</div>)}<span className="pv-screen-bottom">LOCAL EXPERIENCE</span></aside><div className="pv-screen-content"><small>{ai?"KNOWLEDGE LIBRARY":flow?"ORDER MANAGEMENT":"KITCHEN WORKSPACE"}</small><h3>{ai?"企業知識":flow?"營運工作台":"餐飲工作台"}</h3>{ai?<><div className="pv-screen-search"><span>⌕</span> 搜尋你的文件</div><div className="pv-screen-document"><b>服務規範</b><span>文件段落與引用來源</span><i/><i/><i/></div><div className="pv-screen-chips"><span>原文來源</span><span>搜尋紀錄</span></div></>:<><div className="pv-screen-stats">{data.map(([x,y],i)=><div key={x}><small>0{i+1}</small><b>{x}</b><span>{y}</span></div>)}</div><div className="pv-screen-table"><b>{flow?"訂貨到出貨":"點餐到出餐"}</b>{data.map(([x,y])=><div key={x}><i/><span>{x}</span><small>{y}</small></div>)}</div></>}</div></div><div className="pv-screen-foot">介面設計示意　開啟作品實際操作</div></div>
}
export function DiningArt(){
 const uid=useId()
 return <svg className="pv-dining-art" viewBox="0 0 960 700" role="img" aria-label="原創餐桌擺設插畫"><defs><radialGradient id={uid+"plate"}><stop stopColor="#ece2d1"/><stop offset=".82" stopColor="#e8ddc9"/><stop offset=".86" stopColor="#bcb09a"/><stop offset=".9" stopColor="#f2e9d9"/><stop offset="1" stopColor="#d0c2ac"/></radialGradient><radialGradient id={uid+"table"}><stop stopColor="#66523d"/><stop offset="1" stopColor="#2b241c"/></radialGradient><filter id={uid+"grain"}><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" stitchTiles="stitch"/></filter><filter id={uid+"shadow"}><feGaussianBlur stdDeviation="13"/></filter></defs>
 <rect width="960" height="700" fill={"url(#"+uid+"table)"}/>{Array.from({length:15},(_,i)=><path key={i} d={"M0 "+(i*51)+"Q480 "+(i*51+10)+" 960 "+(i*51-5)} stroke="#d1b38b" strokeOpacity=".08" fill="none"/>)}
 <path d="M-20 90L236 18 338 510 82 586Z" fill="#b1a28d" opacity=".8"/><path d="M-20 103L223 36M82 568L322 495" stroke="#e1d5c1" strokeWidth="2" opacity=".6"/>
 <ellipse cx="513" cy="375" rx="260" ry="258" fill="#17130e" opacity=".5" filter={"url(#"+uid+"shadow)"}/><circle cx="505" cy="352" r="250" fill={"url(#"+uid+"plate)"}/><circle cx="505" cy="352" r="180" fill="none" stroke="#b7a98f" strokeWidth="1.5"/>
 <path d="M384 275Q450 241 525 265T613 376Q586 447 490 452T382 407Q347 350 384 275Z" fill="#67503b"/>{Array.from({length:12},(_,i)=><path key={i} d={"M"+(395+i*17)+" "+(287+(i%4)*5)+"q-30 52 2 116"} fill="none" stroke={i%2?"#ad7950":"#3e2b21"} strokeWidth="7" opacity=".75"/>)}
 {Array.from({length:19},(_,i)=><g key={i} transform={"rotate("+(i*39)+" 505 352)"}><ellipse cx="505" cy={194+i%5*9} rx={8+i%3*3} ry="24" fill={["#64794c","#8b985d","#394e31"][i%3]}/></g>)}
 {Array.from({length:8},(_,i)=><circle key={i} cx={389+(i*57)%227} cy={255+(i*73)%195} r={5+i%3} fill="#c08b48"/>)}
 <g transform="rotate(16 790 340)" fill="#bdb6a5"><rect x="780" y="160" width="14" height="390" rx="7"/><path d="M774 160H801V235H774Z"/><path d="M778 158V201M785 158V201M792 158V201M799 158V201" stroke="#473b2d" strokeWidth="3"/></g>
 <circle cx="808" cy="118" r="69" fill="#100d09" opacity=".4" filter={"url(#"+uid+"shadow)"}/><circle cx="799" cy="108" r="65" fill="#c6b294" opacity=".6"/><circle cx="799" cy="108" r="56" fill="#785239"/><circle cx="799" cy="108" r="50" fill="#916447"/><ellipse cx="780" cy="85" rx="17" ry="6" fill="#e9d1aa" opacity=".35"/><rect width="960" height="700" opacity=".05" filter={"url(#"+uid+"grain)"}/></svg>
}
