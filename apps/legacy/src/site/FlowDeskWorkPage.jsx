import SiteLayout from "./SiteLayout"
import "./FlowDeskWorkPage.css"
export default function FlowDeskWorkPage() {
  return (
    <SiteLayout
      meta={{
        path: "/works/flowdesk",
        title: "FlowDesk 企業流程中心｜晴宇 Qingyu Web",
        description: "重複的工作，系統先做。資料整理、判斷、建單，確認後再執行。",
      }}
    >
      <div className="fdw" data-preserve-text>
        <section className="fdw-hero">
          <div className="fdw-wrap fdw-hero-grid">
            <div>
              <p className="fdw-eyebrow">
                <span /> FLOWDESK · 企業流程中心
              </p>
              <h1>
                重複的工作
                <br />
                <em>系統先做。</em>
              </h1>
              <p className="fdw-intro">
                資料整理、判斷、建單，
                <br />
                確認後再執行。
              </p>
              <a className="fdw-primary" href="/works/flowdesk/app">
                直接體驗 <span>↗</span>
              </a>
              <p className="fdw-note">獨立工作區 · 真實保存 · 重要動作由你確認</p>
            </div>
            <div className="fdw-preview">
              <div className="fdw-top">
                <strong>
                  <i>f·</i>FlowDesk
                </strong>
                <small>北辰電商有限公司</small>
                <span>●</span>
              </div>
              <div className="fdw-tabs">
                <b>
                  今天 <small>6</small>
                </b>
                <span>流程</span>
                <span>紀錄</span>
              </div>
              <div className="fdw-preview-body">
                <p className="fdw-tiny">把時間，留給重要的事</p>
                <h2>
                  今天<span>。</span>
                </h2>
                <p className="fdw-muted">6 件工作已整理好，等你確認。</p>
                {[
                  ["↗", "供應商價格更新", "18 項價格有變化", "供應商 9 月價目表.xlsx"],
                  ["≡", "客戶訂單", "明盛餐飲 · X200 × 20", "客戶訊息"],
                  ["“", "客服回覆草稿", "價格與庫存已查好，等待傳送", "客服問題"],
                ].map(([icon, title, sub, source]) => (
                  <div className="fdw-task" key={title}>
                    <i>{icon}</i>
                    <div>
                      <h3>{title}</h3>
                      <p>{sub}</p>
                      <small>{source}</small>
                    </div>
                    <span>查看 ↗</span>
                  </div>
                ))}
                <p className="fdw-safe">◉ 確認前，不會更動你的資料。</p>
              </div>
              <div className="fdw-caption">畫面示意 · 點選直接體驗可操作真實資料</div>
            </div>
          </div>
        </section>
        <section className="fdw-how fdw-wrap">
          <div>
            <p className="fdw-eyebrow">先整理，再決定</p>
            <h2>AI 不直接亂做。</h2>
            <p>
              系統把資料與建議準備好。
              <br />
              最後一步，留給最了解工作的人。
            </p>
          </div>
          <ol>
            {["收到資料", "整理", "建議", "你確認", "執行"].map((s, i) => (
              <li key={s} className={i === 3 ? "fdw-human" : ""}>
                <small>0{i + 1}</small>
                <span>{s}</span>
                {i !== 4 && <b>→</b>}
              </li>
            ))}
          </ol>
        </section>
        <section className="fdw-features">
          <div className="fdw-wrap">
            <p className="fdw-eyebrow">每天少做一點重複的事</p>
            <div className="fdw-feature-grid">
              {[
                [
                  "01",
                  "先幫你整理",
                  "大量資料先處理好。從供應商價目表到客戶訊息，變成清楚的待辦。",
                ],
                [
                  "02",
                  "重要動作要確認",
                  "先看新舊差異，再決定套用。成本、訂單與回覆，都由你確認。",
                ],
                ["03", "系統直接接起來", "沿用公司的商品、客戶與庫存。確認後交給原本的系統處理。"],
                [
                  "04",
                  "每一步都有紀錄",
                  "來源、判斷、操作者與結果都留著。未完成的工作可以追查與重試。",
                ],
              ].map(([n, t, p]) => (
                <article key={n}>
                  <span>{n}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="fdw-wrap fdw-more">
          <details>
            <summary>
              了解更多 <span>＋</span>
            </summary>
            <div>
              <h3>以確認為起點的流程</h3>
              <p>
                支援手動輸入、檔案上傳、排程與簽章 Webhook。每次處理會保存 Flow
                Run、來源與結構化建議；需要人工確認的內容建立任務。
              </p>
              <h3>資料真的改變，歷史也留著</h3>
              <p>
                成本更新會保留前後值，並檢查是否有其他人同時修改。FlowOrder
                訂單沿用原本的庫存交易；重試會避開已成功的項目。
              </p>
              <h3>連接如實呈現</h3>
              <p>
                外部 Email、LINE 與 AI
                服務需要公司配置。未連接時不顯示傳送成功；體驗中的訊息只保存於隔離工作區。
              </p>
              <h3>從北辰電商開始體驗</h3>
              <p>
                虛構企業提供 10 種流程與 200
                次執行範例。工作、確認與執行都寫入資料庫，重新整理後仍保留。體驗存取權限於 24
                小時後到期。
              </p>
            </div>
          </details>
        </section>
        <section className="fdw-bottom">
          <p className="fdw-eyebrow">今天，就從一件工作開始</p>
          <h2>
            讓事情先整理好。
            <br />
            你只需要做決定。
          </h2>
          <a className="fdw-primary" href="/works/flowdesk/app">
            直接體驗 <span>↗</span>
          </a>
        </section>
      </div>
    </SiteLayout>
  )
}
