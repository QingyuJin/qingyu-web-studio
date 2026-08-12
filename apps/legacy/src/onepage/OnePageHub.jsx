import { useState } from "react"
import { Link } from "react-router-dom"
import Seo from "../site/Seo"
import SiteLayout from "../site/SiteLayout"
import { onepageContact, onepageHubSeo, onepageTemplates } from "./onepageData"
import useResetScroll from "./useResetScroll"
import "./onepage.css"

function OnePageHub() {
  useResetScroll()
  const [previewMode, setPreviewMode] = useState("desktop")

  return (
    <SiteLayout>
      <Seo page={onepageHubSeo} />
      <div className="onepage-hub">
        <section className="op-hub-hero">
          <div className="op-hub-hero-copy">
            <p>ONE PAGE · CLEAR ACTION</p>
            <h1>一頁式網站設計</h1>
            <div className="op-hub-rule" />
            <p className="op-hub-lead">六套可操作產業範本</p>
            <div className="op-hub-actions">
              <a href="#templates">瀏覽六套範本</a>
              <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE 諮詢 ↗</a>
            </div>
          </div>
          <div className="op-hub-mosaic" aria-label="六大產業範本預覽">
            {onepageTemplates.map((template, index) => (
              <Link to={`/onepage/${template.slug}`} key={template.slug} className={`tile-${index + 1}`} aria-label={`查看${template.industry}範本`}>
                <img src={template.hero} alt={`${template.industry}一頁式網站範本`} width="1680" height="945" loading={index < 2 ? "eager" : "lazy"} />
                <span>{template.industry}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="op-spec-strip" aria-label="一頁式網站標準規格">
          <div><b>10</b><span>重點區塊</span></div>
          <div><b>RWD</b><span>全裝置</span></div>
          <div><b>SEO</b><span>搜尋架構</span></div>
          <div><b>CTA</b><span>轉換入口</span></div>
        </section>

        <section className="op-template-catalog" id="templates">
          <div className="op-catalog-head">
            <div>
              <p>SIX LIVE CONCEPTS</p>
              <h2>六套產業範本</h2>
              <span>版面 動態 表單 手機</span>
            </div>
            <div className="op-preview-switch" aria-label="預覽尺寸切換">
              <button type="button" aria-pressed={previewMode === "desktop"} onClick={() => setPreviewMode("desktop")}>桌機</button>
              <button type="button" aria-pressed={previewMode === "mobile"} onClick={() => setPreviewMode("mobile")}>手機</button>
            </div>
          </div>

          <div className={`op-catalog-grid preview-${previewMode}`}>
            {onepageTemplates.map((template, index) => (
              <article className="op-catalog-card" key={template.slug}>
                <div className="op-catalog-preview">
                  <div className="op-browser-bar"><i /><i /><i /><span>qingyuweb.com/onepage/{template.slug}</span></div>
                  <div className="op-preview-canvas">
                    <img src={template.hero} alt={`${template.industry}範本${previewMode === "desktop" ? "桌機" : "手機"}預覽`} width="1680" height="945" loading={index > 1 ? "lazy" : "eager"} />
                    <div className="op-preview-copy"><small>{template.eyebrow}</small><b>{template.brand}</b><span>{template.title}</span></div>
                  </div>
                </div>
                <div className="op-catalog-content">
                  <div className="op-card-index">0{index + 1}</div>
                  <div>
                    <p>{template.industry}</p>
                    <h3>{template.brand}</h3>
                  </div>
                  <Link to={`/onepage/${template.slug}`}>進入完整範本 <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="op-hub-contact">
          <p>START WITH ONE CLEAR PAGE</p>
          <h2>從一頁開始<br />讓品牌被看懂</h2>
          <div>
            <a href={onepageContact.lineUrl} target="_blank" rel="noreferrer">LINE 免費諮詢</a>
            <a href={`mailto:${onepageContact.email}`}>Email</a>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}

export default OnePageHub
