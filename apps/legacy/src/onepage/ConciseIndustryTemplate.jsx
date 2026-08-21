import { useState } from "react"
import { Link } from "react-router-dom"
import Seo from "../site/Seo"
import { createTemplateSeo, getOnepageTemplate } from "./onepageData"
import useResetScroll from "./useResetScroll"
import "./onepage.css"

const configs = {
  beauty: {
    intro: "從膚況理解到療程預約 保留真正需要的資訊",
    nav: [["療程", "#services"], ["方式", "#process"], ["空間", "#space"]],
    sectionTitle: "三種照護方向",
    services: [["舒緩保濕", "補充水分並穩定乾燥"], ["平衡淨化", "整理毛孔與油水平衡"], ["亮采管理", "改善疲憊與暗沉感"]],
    process: ["了解膚況", "確認療程", "開始照護"],
    featureTitle: "先看懂現在的膚況",
    featureText: "照護方向與居家建議集中在同一頁",
    featureItems: ["乾燥緊繃", "敏感不適", "疲憊暗沉"],
  },
  clinic: {
    intro: "先看懂療程與醫師 再安心完成預約",
    nav: [["診療", "#services"], ["流程", "#process"], ["環境", "#space"]],
    sectionTitle: "四項常見診療",
    services: [["初診檢查", "確認口腔與牙齒狀況"], ["牙周照護", "建立日常清潔計畫"], ["美學修復", "依需求規劃療程"], ["植牙評估", "完整影像與說明"]],
    process: ["預約與報到", "檢查與說明", "確認治療計畫"],
    featureTitle: "把專業說清楚 讓第一次來的人也安心",
    featureText: "醫師 診療與環境資訊維持清楚層級",
  },
  restaurant: {
    intro: "用料理 空間與訂位入口說清楚一間餐廳",
    nav: [["料理", "#services"], ["主廚", "#process"], ["空間", "#space"]],
    sectionTitle: "三道代表料理",
    services: [["炭香牛小排", "以炭火保留肉汁與香氣"], ["季節鮮魚", "依當日漁獲調整做法"], ["焦糖布丁", "以微苦焦糖收尾"]],
    processTitle: "料理跟著季節走",
    process: ["當季食材", "恰好的火候", "完整的用餐節奏"],
    featureTitle: "讓照片帶路 文字只留下必要資訊",
    featureText: "菜色 品牌與訂位行動在手機上連成一條路徑",
  },
  construction: {
    intro: "把工程能力 案例與估價流程整理清楚",
    nav: [["服務", "#services"], ["流程", "#process"], ["案例", "#space"]],
    sectionTitle: "四項工程服務",
    services: [["現場評估", "確認空間與需求"], ["工程規劃", "整理項目與工期"], ["施工管理", "同步進度與責任"], ["驗收保固", "完成交付與後續處理"]],
    process: ["現勘", "提案與報價", "施工管理", "驗收交付"],
    featureTitle: "案例與工法並列 讓屋主知道下一步",
    featureText: "減少來回詢問 先取得足夠資訊再安排現勘",
  },
  manufacturing: {
    intro: "讓採購快速確認加工能力 品質與詢價方式",
    nav: [["能力", "#services"], ["流程", "#process"], ["設備", "#space"]],
    sectionTitle: "四項加工能力",
    services: [["CNC 車削", "少量試作到穩定量產"], ["CNC 銑削", "複雜輪廓與精密孔位"], ["精密量測", "關鍵尺寸完整記錄"], ["零件整合", "依圖面提供加工評估"]],
    process: ["圖面確認", "可製造性評估", "生產與首件確認", "終檢交付"],
    featureTitle: "採購需要的資料直接看見",
    featureText: "加工範圍 品質流程與詢價入口不再分散",
  },
  saas: {
    intro: "把分散流程收進同一個營運工作台",
    nav: [["功能", "#services"], ["流程", "#process"], ["工作台", "#space"]],
    sectionTitle: "三個最常見的營運問題",
    services: [["重複輸入", "同一筆資料需要抄到不同工具"], ["狀態不一致", "每個人看到的進度不同"], ["例外沒人處理", "重要問題容易沉在訊息裡"]],
    process: ["統一收件", "自動分派", "狀態追蹤", "數據彙整"],
    featureTitle: "用一次操作看懂產品價值",
    featureText: "保留可切換工作台 移除重複功能說明",
  },
}

function ConciseIndustryTemplate({ slug }) {
  useResetScroll()
  const template = getOnepageTemplate(slug)
  const config = configs[slug]
  const [dashboard, setDashboard] = useState("訂單")
  const dark = ["restaurant", "manufacturing", "saas"].includes(slug)
  if (!template || !config) return null

  return (
    <main id="top" className={`opx-page opx-${slug} ${dark ? "is-dark" : ""}`}>
      <Seo page={createTemplateSeo(template)} />
      <div className="opx-notice">產業概念展示 非實際品牌</div>
      <header className="opx-header">
        <a href="#top" className="opx-brand"><small>{template.eyebrow}</small><strong>{template.brand}</strong></a>
        <nav>{config.nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <Link to={`/contact?case=${slug}`} className="opx-header-cta">{template.primaryCta}</Link>
      </header>

      <section className="opx-hero">
        <img src={template.hero} alt={`${template.industry}網站主視覺`} width="1680" height="945" fetchPriority="high" />
        <div className="opx-hero-shade" />
        <div className="opx-hero-copy"><p>{template.industry}</p><h1>{template.title}</h1><span>{config.intro}</span><Link to={`/contact?case=${slug}`}>{template.primaryCta}</Link></div>
      </section>

      <section id="services" className="opx-section">
        <div className="opx-heading"><p>WHAT WE OFFER</p><h2>{config.sectionTitle || "先看最需要的服務"}</h2><span>{template.summary}</span></div>
        <div className="opx-card-grid">{config.services.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section id="process" className="opx-section opx-process">
        <div className="opx-heading"><p>HOW IT WORKS</p><h2>{config.processTitle || `${config.process.length} 步完成下一個行動`}</h2></div>
        <ol>{config.process.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong></li>)}</ol>
      </section>

      <section id="space" className="opx-section opx-feature">
        <div className="opx-feature-image"><img src={template.images[2]} alt={`${template.industry}服務情境`} width="1680" height="945" loading="lazy" /></div>
        <div className="opx-feature-copy"><p>BUILT FOR ACTION</p><h2>{config.featureTitle}</h2><span>{config.featureText}</span><ul>{(config.featureItems || ["手機優先", "重點好讀", "行動明確"]).map((item) => <li key={item}>{item}</li>)}</ul></div>
      </section>

      <section className="opx-section opx-showcase">
        {slug === "saas" ? <Dashboard value={dashboard} onChange={setDashboard} /> : <><div className="opx-heading"><p>VISUAL STORY</p><h2>用畫面建立第一眼信任</h2></div><div className="opx-image-grid"><img src={template.images[3]} alt={`${template.industry}細節`} width="1680" height="945" loading="lazy" /><img src={template.images[4]} alt={`${template.industry}空間`} width="1680" height="945" loading="lazy" /></div></>}
      </section>

      <section className="opx-cta">
        <p>QINGYU WEB STUDIO</p><h2>想做一個適合你產業的網站</h2><div><Link to={`/contact?case=${slug}`}>洽詢類似網站</Link><Link to="/showcase">返回展示空間</Link></div>
      </section>
    </main>
  )
}

function Dashboard({ value, onChange }) {
  const data = {
    訂單: ["今天待處理", "18 筆", "已完成 42 筆"],
    客戶: ["需要跟進", "7 位", "本週新增 12 位"],
    報表: ["本月營收", "NT$428K", "較上月增加 18%"],
  }
  return <div className="opx-dashboard"><div className="opx-heading"><p>LIVE WORKSPACE</p><h2>切換工作台 看見需要的資訊</h2></div><div className="opx-dashboard-tabs">{Object.keys(data).map((item) => <button key={item} type="button" aria-pressed={value === item} onClick={() => onChange(item)}>{item}</button>)}</div><div className="opx-dashboard-card"><span>{data[value][0]}</span><strong>{data[value][1]}</strong><p>{data[value][2]}</p></div></div>
}

export default ConciseIndustryTemplate
