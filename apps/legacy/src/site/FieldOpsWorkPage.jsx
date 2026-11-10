import SiteLayout from "./SiteLayout"
import "./FieldOpsWorkPage.css"
const meta = {
  path: "/works/fieldops",
  title: "FieldOps 現場工單・派工系統｜晴宇 Qingyu Web",
  description: "現場做完，公司馬上知道。派工、照片、材料、簽名，一張工單全部留著。",
}
export default function FieldOpsWorkPage() {
  return (
    <SiteLayout meta={meta}>
      <div className="fow" data-preserve-text>
        <section className="fow-hero">
          <div className="fow-container fow-hero-grid">
            <div>
              <p className="fow-eyebrow">FIELDOPS · 現場工單・派工系統</p>
              <h1>
                現場做完
                <br />
                <span>公司馬上知道。</span>
              </h1>
              <p className="fow-description">
                派工、照片、材料、簽名，
                <br />
                一張工單全部留著。
              </p>
              <a className="fow-primary" href="/works/fieldops/app/dispatcher">
                直接體驗 <span>↗</span>
              </a>
              <div className="fow-roles">
                <a href="/works/fieldops/app/dispatcher">我是公司</a>
                <a href="/works/fieldops/app/technician">我是師傅</a>
                <a href="/works/fieldops/app/customer">我是客戶</a>
              </div>
              <p className="fow-small">獨立工作區，真實操作。重新整理，紀錄還在。</p>
            </div>
            <div className="fow-product">
              <div className="fow-phone">
                <div className="fow-phone-top">
                  <strong>FieldOps</strong>
                  <span>維森冷氣設備</span>
                </div>
                <p className="fow-phone-date">8 月 28 日 · 星期五</p>
                <h2>今天</h2>
                <p className="fow-phone-sub">陳師傅，今天有 3 個地方要去。</p>
                <div className="fow-phone-job">
                  <time>10:00</time>
                  <div>
                    <strong>新味餐廳</strong>
                    <p>冷藏櫃保養</p>
                    <small>已完成 ✓</small>
                  </div>
                </div>
                <div className="fow-phone-job current">
                  <time>14:00</time>
                  <div>
                    <strong>富利餐廳</strong>
                    <p>冷凍櫃異常</p>
                    <small>WO-260821</small>
                  </div>
                  <span>查看 →</span>
                </div>
                <div className="fow-phone-job">
                  <time>17:30</time>
                  <div>
                    <strong>大禾食品</strong>
                    <p>冰水機檢查</p>
                    <small>待接單</small>
                  </div>
                </div>
                <div className="fow-phone-nav">
                  <span>◷ 今天</span>
                  <span>▤ 工單</span>
                  <span>✓ 完成</span>
                </div>
              </div>
              <div className="fow-receipt">
                <span className="fow-check">✓</span>
                <div>
                  <strong>現場紀錄已收到</strong>
                  <p>富利餐廳 · 已完成</p>
                  <div>
                    <span>4 張照片</span>
                    <span>客戶已簽名</span>
                  </div>
                </div>
              </div>
              <p className="fow-product-note">流程示意 · 進入體驗後，每次操作會真正保存。</p>
            </div>
          </div>
        </section>
        <section className="fow-flow">
          <div className="fow-container">
            <p className="fow-eyebrow">ONE WORK ORDER. ONE COMPLETE STORY.</p>
            <h2>一張工單，走完整個現場。</h2>
            <div className="fow-flow-steps">
              {["派工", "到場", "施工", "簽名", "完成"].map((label, index) => (
                <div key={label}>
                  <small>0{index + 1}</small>
                  <strong>{label}</strong>
                  <span>{index === 4 ? "✓" : "→"}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="fow-features">
          <div className="fow-container">
            <div className="fow-feature-grid">
              {[
                [
                  "01",
                  "今天做什麼",
                  "師傅打開手機就知道。",
                  "今天去哪裡、幾點到、要做什麼，不必翻找聊天紀錄。",
                ],
                [
                  "02",
                  "現場留得住",
                  "照片、材料、時間都有紀錄。",
                  "施工前後的變化與使用材料，一張工單完整保存。",
                ],
                [
                  "03",
                  "客戶直接確認",
                  "完成後直接簽名。",
                  "現場簽名或稍後打開安全連結，確認同一份服務摘要。",
                ],
                [
                  "04",
                  "公司不用追問",
                  "進度即時回到後台。",
                  "從接單到完工，所有關鍵進度都有時間與操作歷史。",
                ],
              ].map(([n, title, lead, description]) => (
                <article key={n}>
                  <small>{n}</small>
                  <h3>{title}</h3>
                  <p>{lead}</p>
                  <span>{description}</span>
                </article>
              ))}
            </div>
            <details className="fow-more">
              <summary>
                了解更多 <span>＋</span>
              </summary>
              <div>
                <p>
                  <strong>不只冷氣維修。</strong>
                  <br />
                  水電、消防、弱電、設備維修、清潔與工程施工，共用客戶、設備與工單模型。每台設備都有自己的服務履歷。
                </p>
                <p>
                  <strong>現場斷線，也能先留紀錄。</strong>
                  <br />
                  已載入的今日工作可離線查看。紀錄與照片暫存在装置，恢復連線後以同一操作 ID
                  同步，明確區分尚未同步與已保存。
                </p>
                <p>
                  <strong>接進同一套 Qingyu Core。</strong>
                  <br />
                  沿用 Auth、RBAC、Tenant、Audit、Storage
                  與通知紀錄。技師只能查看自己的工作；簽名、照片與 PDF 為私有檔案。
                </p>
                <p>
                  <strong>企業工作區與體驗分開。</strong>
                  <br />
                  維森冷氣設備是虛構企業。每位訪客有隔離的 24 小時
                  Sandbox，三種角色共享同一次體驗，不會寄出外部通知。
                </p>
              </div>
            </details>
            <div className="fow-bottom">
              <div>
                <h2>下一張工單，從這裡開始。</h2>
                <p>把現場的事，完整帶回公司。</p>
              </div>
              <a href="/works/fieldops/app/dispatcher" className="fow-primary">
                直接體驗 ↗
              </a>
            </div>
            <a className="fow-company-login" href="/works/fieldops/app/login">
              已有公司帳號？登入工作區 →
            </a>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}
