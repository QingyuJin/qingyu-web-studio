import { useState } from "react"
import Seo from "../site/Seo"
import "./onepage.css"
import {
  LeadForm,
  LightboxImage,
  MobileContactBar,
  TemplateFooter,
  TemplateHeader,
} from "./OnePageShared"
import { createTemplateSeo, getOnepageTemplate, onepageContact } from "./onepageData"
import useResetScroll from "./useResetScroll"

const manufacturing = getOnepageTemplate("manufacturing")
const saas = getOnepageTemplate("saas")

export function ManufacturingTemplate() {
  useResetScroll()
  const [hero, inspection, cnc, quality, products, factory] = manufacturing.images

  return (
    <main className="op-template manufacturing-page" id="top">
      <Seo page={createTemplateSeo(manufacturing)} />
      <TemplateHeader
        template={manufacturing}
        navItems={[["加工能力", "#capability"], ["設備流程", "#production"], ["品質", "#quality"], ["詢價", "#quote"]]}
        ctaLabel="取得加工評估"
        ctaHref="#quote"
        dark
      />

      <section className="manufacturing-hero">
        <img src={hero} alt="精密加工人員檢視剛完成的金屬零件" width="1680" height="945" fetchPriority="high" />
        <div className="manufacturing-hero-shade" />
        <div className="manufacturing-coordinate"><span>X 025.400</span><span>Y 018.650</span><span>Z 004.200</span></div>
        <div className="manufacturing-hero-copy"><p>PRECISION IN EVERY CUT</p><h1>從圖面到量產<br />每一道公差都有依據</h1><span>整合 CNC 加工、製程規劃、精密量測與批次管理讓採購與工程端清楚掌握交付條件</span><div><a href="#quote">上傳圖面詢價</a><a href="#capability">查看加工能力 ↓</a></div></div>
        <div className="manufacturing-hero-stats"><div><b>METAL</b><span>鋁、鋼、銅與指定材料</span></div><div><b>PROTO</b><span>打樣至批次量產</span></div><div><b>QC</b><span>依圖面要求規劃量測</span></div></div>
      </section>

      <section className="manufacturing-capability" id="capability">
        <div className="manufacturing-heading"><span>02 / CAPABILITIES</span><h2>製程能力<br />用工程語言說清楚</h2><p>以下規格為網站內容架構示意；正式網站應填入工廠真實設備、行程、精度與材料能力</p></div>
        <div className="manufacturing-capability-table" role="table" aria-label="加工能力示意">
          {[["CNC MILLING", "銑削加工", "3 / 4 AXIS", "依實際設備填入"], ["CNC TURNING", "車削加工", "BAR / CHUCK", "依實際設備填入"], ["SECONDARY", "二次加工", "TAP / GRIND", "依工件需求評估"], ["FINISHING", "表面處理", "ANODIZE / PLATE", "委外或自有流程註明"]].map(([code, title, type, note], index) => <div role="row" key={code}><span role="cell">0{index + 1}</span><b role="cell">{code}<small>{title}</small></b><strong role="cell">{type}</strong><p role="cell">{note}</p><a role="cell" href="#quote" aria-label={`詢問${title}`}>詢問 ↗</a></div>)}
        </div>
      </section>

      <section className="manufacturing-products">
        <LightboxImage src={products} alt="不同形狀與材質的精密金屬加工零件" className="manufacturing-products-image" />
        <div className="manufacturing-products-copy"><span>03 / PRODUCT RANGE</span><h2>從單件治具<br />到穩定批次零組件</h2><p>以產品類別、材質、用途與交付型態幫助採購快速判斷適配度</p><ul><li><b>機構零件</b><span>設備支架、連接件與客製結構件</span></li><li><b>精密治具</b><span>定位、檢測與製程輔助工具</span></li><li><b>旋削零件</b><span>軸套、接頭與同軸結構件</span></li><li><b>小批量打樣</b><span>設計驗證與量產前製程確認</span></li></ul></div>
      </section>

      <section className="manufacturing-cnc" id="production">
        <div className="manufacturing-cnc-copy"><span>04 / CNC CELL</span><h2>設備只是起點<br />穩定來自製程安排</h2><p>刀具選擇、夾治具、基準、加工順序與換線紀錄共同影響結果正式網站可加入真實設備清單與可加工尺寸</p><dl><div><dt>PROGRAM</dt><dd>程式與版本管理</dd></div><div><dt>FIXTURE</dt><dd>定位與夾持規劃</dd></div><div><dt>TOOLING</dt><dd>刀具壽命與補正</dd></div></dl></div>
        <LightboxImage src={cnc} alt="CNC 工具機進行精密金屬切削加工" className="manufacturing-cnc-image" />
      </section>

      <section className="manufacturing-process">
        <div className="manufacturing-heading"><span>05 / PRODUCTION FLOW</span><h2>每個交付節點都能回到同一張圖面</h2></div>
        <ol>{[["RFQ", "圖面與需求確認", "材質、數量、公差、表面與交期"], ["DFM", "可製造性評估", "基準、刀具、夾持與風險討論"], ["SETUP", "首件與參數確認", "程式、治具、首件尺寸核對"], ["RUN", "批次生產", "製程中抽檢與異常隔離"], ["SHIP", "終檢與交付", "依約定整理報告與包裝"]].map(([code, title, text], index) => <li key={code}><span>0{index + 1}</span><b>{code}</b><h3>{title}</h3><p>{text}</p></li>)}</ol>
      </section>

      <section className="manufacturing-inspection">
        <LightboxImage src={inspection} alt="技術人員使用量測設備檢查精密零件尺寸" className="manufacturing-inspection-image" />
        <div className="manufacturing-inspection-copy"><span>06 / METROLOGY</span><h2>量測不是最後一關<br />而是製程的一部分</h2><p>依關鍵尺寸與功能需求安排首件、巡檢與終檢；設備與報告格式應在正式詢價時確認</p><div><article><b>FIRST ARTICLE</b><p>首件確認後再進入批次生產</p></article><article><b>IN-PROCESS</b><p>製程中監控關鍵尺寸與趨勢</p></article><article><b>FINAL CHECK</b><p>依抽樣或全檢條件完成交付確認</p></article></div></div>
      </section>

      <section className="manufacturing-quality" id="quality">
        <div className="manufacturing-quality-copy"><span>07 / QUALITY CONTROL</span><h2>發現異常時<br />先隔離再追到原因</h2><p>本範本不宣稱任何未提供的認證正式網站可依工廠實際制度呈現追溯、量測、異常處理與持續改善方式</p><ul><li><span>01</span><b>批次識別</b><p>工單、材料與加工版本保持關聯</p></li><li><span>02</span><b>異常隔離</b><p>避免待確認品混入正常交付</p></li><li><span>03</span><b>原因與對策</b><p>以製程資料確認改善位置</p></li></ul></div>
        <LightboxImage src={quality} alt="精密製造品質管理與零件檢驗流程" className="manufacturing-quality-image" />
      </section>

      <section className="manufacturing-factory">
        <img src={factory} alt="整潔有序的精密加工工廠與生產設備" width="1680" height="945" loading="lazy" />
        <div className="manufacturing-factory-card"><span>08 / FACTORY CAPACITY</span><h2>把產能與限制<br />在接單前說明白</h2><p>正式網站可揭露廠房設備、班別、最大工件、常用材料與批量範圍讓有效詢價更快進入工程評估</p><a href="#quote">提供圖面與數量 →</a></div>
      </section>

      <section className="manufacturing-quote" id="quote">
        <div className="manufacturing-quote-intro"><span>09 / REQUEST FOR QUOTE</span><h2>提供圖面、材質、數量與交期<br />先確認能不能做</h2><p>表單送至 Qingyu Web Studio用於體驗製造業詢價版型與洽詢網站製作請勿上傳機密圖面</p><dl><div><dt>LINE</dt><dd>聯絡洽詢</dd></div><div><dt>EMAIL</dt><dd>直接寄信</dd></div></dl></div>
        <LeadForm source="onepage-manufacturing" title="RFQ 流程體驗" description="留下產業、加工服務與網站需求由 Qingyu Web Studio 回覆" services={["精密製造一頁式網站", "金屬加工能力整理", "RFQ 詢價表單", "B2B 中英文網站規劃"]} submitLabel="送出加工網站需求" compact />
      </section>

      <TemplateFooter template={manufacturing} dark />
      <MobileContactBar primaryLabel="加工詢價" primaryHref="#quote" />
    </main>
  )
}

const dashboardData = {
  "7D": { revenue: "NT$ 486K", orders: "128", rate: "68%", bars: [42, 55, 48, 72, 64, 83, 76] },
  "30D": { revenue: "NT$ 1.92M", orders: "514", rate: "73%", bars: [48, 62, 58, 76, 71, 88, 82] },
  "90D": { revenue: "NT$ 5.76M", orders: "1,482", rate: "79%", bars: [52, 58, 67, 63, 74, 81, 91] },
}

function SaasDashboard() {
  const [range, setRange] = useState("30D")
  const data = dashboardData[range]

  return (
    <div className="saas-dashboard" aria-label="可操作營運 Dashboard 示意">
      <aside><div className="saas-dash-logo">N</div>{["總覽", "訂單", "流程", "客戶", "報表"].map((item, index) => <button type="button" key={item} aria-pressed={index === 0}><span>{index === 0 ? "●" : "○"}</span>{item}</button>)}</aside>
      <div className="saas-dash-main">
        <header><div><small>營運總覽</small><h3>早安營運團隊</h3></div><div className="saas-range">{Object.keys(dashboardData).map((item) => <button type="button" key={item} aria-pressed={range === item} onClick={() => setRange(item)}>{item}</button>)}</div></header>
        <div className="saas-metrics"><article><span>完成營收</span><b>{data.revenue}</b><small>依選擇期間更新</small></article><article><span>處理訂單</span><b>{data.orders}</b><small>含自動與人工流程</small></article><article><span>自動完成率</span><b>{data.rate}</b><small>示意互動數據</small></article></div>
        <div className="saas-chart"><div><span>流程完成趨勢</span><b>{range}</b></div><div className="saas-bars">{data.bars.map((height, index) => <i key={`${range}-${index}`} style={{ height: `${height}%` }}><span>{height}</span></i>)}</div></div>
        <div className="saas-activity"><span>即時流程</span>{[["新訂單建立", "剛剛", "完成"], ["庫存同步", "4 分鐘前", "完成"], ["付款例外", "12 分鐘前", "待處理"]].map(([title, time, status]) => <div key={title}><i className={status === "完成" ? "ok" : "wait"} /><b>{title}</b><small>{time}</small><em>{status}</em></div>)}</div>
      </div>
    </div>
  )
}

export function SaasTemplate() {
  useResetScroll()
  const [hero, workflow, integrations, security, team] = saas.images

  return (
    <main className="op-template saas-page" id="top">
      <Seo page={createTemplateSeo(saas)} />
      <TemplateHeader
        template={saas}
        navItems={[["Dashboard", "#dashboard"], ["功能", "#features"], ["方案", "#pricing"], ["試用", "#trial"]]}
        ctaLabel="申請試用"
        ctaHref="#trial"
      />

      <section className="saas-hero">
        <div className="saas-hero-copy"><span>OPERATIONS, ORCHESTRATED</span><h1>把分散流程<br />收進同一個<br />營運工作台</h1><p>訂單、任務、客戶與報表不再來回複製用一套可追蹤的流程讓團隊知道現在該做什麼</p><div><a href="#trial">免費申請試用</a><a href="#dashboard">觀看產品操作 ↓</a></div><small>此為軟體產品一頁式網站提案範本不代表實際 SaaS 服務</small></div>
        <div className="saas-hero-visual"><img src={hero} alt="以暖琥珀線條串連模組的企業軟體概念視覺" width="1680" height="945" fetchPriority="high" /><div className="saas-floating-flow"><span>ORDER</span><i>→</i><span>CHECK</span><i>→</i><span>DONE</span></div></div>
      </section>

      <section className="saas-pain">
        <div className="saas-section-title"><span>02 · THE FRICTION</span><h2>真正拖慢團隊的<br />是資訊一直在搬家</h2></div>
        <div className="saas-pain-grid">{[["重複輸入", "同一筆資料在表單、試算表與系統間複製"], ["狀態不一致", "每個人看到的版本不同交接只能再問一次"], ["例外沒人接", "正常流程能跑但異常卡住時沒有清楚負責人"]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><div><i /><i /><i /></div></article>)}</div>
      </section>

      <section className="saas-dashboard-section" id="dashboard">
        <div className="saas-section-title"><span>03 · LIVE DASHBOARD</span><h2>數字不是截圖<br />點選期間就會更新</h2><p>下方介面完全以 React、HTML 與 CSS 製作切換 7D、30D、90D查看指標與圖表變化</p></div>
        <SaasDashboard />
      </section>

      <section className="saas-features" id="features">
        <div className="saas-section-title"><span>04 · CORE MODULES</span><h2>從接收到完成<br />每個節點都有狀態</h2></div>
        <div className="saas-feature-grid">{[["01", "統一收件", "表單、Email、LINE 與 API 進入同一個待辦入口", ["自動分類", "欄位驗證", "來源標記"]], ["02", "流程編排", "依條件分派負責人、期限、通知與下一步動作", ["條件分支", "逾時提醒", "核准節點"]], ["03", "營運視圖", "依角色看到待辦、例外、負載與完成狀態", ["角色權限", "即時篩選", "進度摘要"]], ["04", "分析追蹤", "回到來源、處理時間與卡點持續調整流程", ["趨勢比較", "自訂報表", "操作紀錄"]]].map(([number, title, text, tags]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ul>{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
      </section>

      <section className="saas-workflow">
        <div className="saas-workflow-visual"><img src={workflow} alt="企業軟體自動化工作流程的模組概念視覺" width="1680" height="945" loading="lazy" /><div className="saas-workflow-ui"><div><span>觸發</span><b>收到訂單</b></div><i>↓</i><div><span>判斷</span><b>庫存是否足夠？</b></div><i>↓</i><div className="accent"><span>動作</span><b>分派出貨任務</b></div></div></div>
        <div className="saas-workflow-copy"><span>05 · AUTOMATION</span><h2>把規則寫進流程<br />把判斷留給團隊</h2><p>常規步驟自動完成；需要決策、確認或例外處理時才把工作送到對的人面前</p><ol><li><b>WHEN</b><span>定義什麼事件啟動流程</span></li><li><b>IF</b><span>依欄位與狀態判斷路徑</span></li><li><b>THEN</b><span>建立任務、通知或呼叫 API</span></li></ol></div>
      </section>

      <section className="saas-integrations">
        <div className="saas-integrations-copy"><span>06 · INTEGRATIONS</span><h2>接上正在使用的工具<br />不必一次全部換掉</h2><p>透過 API、Webhook 與既有匯入流程逐步串接品牌與工具名稱在正式網站應依真實整合能力揭露</p><div className="saas-integration-chips">{["ERP", "CRM", "LINE", "Email", "Sheets", "Webhook", "REST API", "Storage"].map((item) => <span key={item}>{item}</span>)}</div></div>
        <LightboxImage src={integrations} alt="以不同模組節點呈現系統整合的概念視覺" className="saas-integrations-image" />
      </section>

      <section className="saas-industries">
        <LightboxImage src={team} alt="企業團隊共同檢視營運流程與系統資訊" className="saas-team-image" />
        <div className="saas-industry-copy"><span>07 · BUILT FOR OPERATIONS</span><h2>不同產業<br />從不同流程開始</h2><div>{[["批發與製造", "報價、訂單、出貨與對帳"], ["連鎖與服務", "門市需求、排程與異常回報"], ["專業團隊", "案件、文件、核准與交付"], ["電商營運", "訂單、庫存、客服與退換貨"]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p><a href="#trial">查看適用流程 →</a></article>)}</div></div>
      </section>

      <section className="saas-security">
        <div className="saas-security-copy"><span>08 · SECURITY BY DESIGN</span><h2>權限、紀錄與資料邊界<br />從架構開始整理</h2><p>以下是資安內容版型不宣稱未驗證的認證正式產品頁應依實際架構、稽核與合規狀態揭露</p><div><article><b>角色權限</b><p>依職務與範圍控制讀取、編輯與核准</p></article><article><b>操作紀錄</b><p>保留重要狀態與欄位變更的時間線</p></article><article><b>資料隔離</b><p>依租戶與環境設計清楚的存取邊界</p></article></div></div>
        <LightboxImage src={security} alt="企業軟體資安與資料隔離的抽象架構視覺" className="saas-security-image" />
      </section>

      <section className="saas-pricing" id="pricing">
        <div className="saas-section-title"><span>09 · PLANS</span><h2>先從一條核心流程開始<br />再隨團隊擴充</h2><p>價格與規格為版型結構示意並非真實軟體報價</p></div>
        <div className="saas-price-grid">{[["START", "單一團隊", ["1 條核心流程", "基本角色權限", "Email 通知", "標準報表"]], ["GROW", "跨部門協作", ["多條自動流程", "條件與核准節點", "API / Webhook", "進階營運報表"]], ["SCALE", "企業整合", ["多組織與權限", "客製整合", "稽核與操作紀錄", "導入與教育訓練"]]].map(([plan, note, items], index) => <article key={plan} className={index === 1 ? "featured" : ""}><span>{index === 1 ? "MOST FLEXIBLE" : `PLAN 0${index + 1}`}</span><h3>{plan}</h3><p>{note}</p><ul>{items.map((item) => <li key={item}>✓ {item}</li>)}</ul><a href="#trial">選擇 {plan}</a></article>)}</div>
      </section>

      <section className="saas-trial" id="trial">
        <div className="saas-trial-intro"><span>10 · START A WORKFLOW</span><h2>選一條最耗時間的流程<br />先做成看得見的版本</h2><p>表單送至 Qingyu Web Studio用於體驗 SaaS 試用版型與洽詢網站、Dashboard 或系統製作</p><div><a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE</a><a href={`mailto:${onepageContact.email}`}>EMAIL</a></div></div>
        <LeadForm source="onepage-saas" title="申請試用流程體驗" description="留下產品類型與網站／系統需求由 Qingyu Web Studio 回覆" services={["SaaS 產品一頁式網站", "互動 Dashboard", "AI／ERP 產品介紹", "企業流程系統"]} submitLabel="送出試用諮詢" compact />
      </section>

      <TemplateFooter template={saas} />
      <MobileContactBar primaryLabel="申請試用" primaryHref="#trial" />
    </main>
  )
}
