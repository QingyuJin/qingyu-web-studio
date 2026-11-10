import SiteLayout from "./SiteLayout"
import "./DocOpsWorkPage.css"

const entry = "/works/docops/app/employee"
export default function DocOpsWorkPage() {
  return (
    <SiteLayout
      meta={{
        path: "/works/docops",
        title: "DocOps 文件・企業知識中心｜晴宇 Qingyu Web",
        description:
          "公司資料，直接問。答案找得到，來源也看得到。文件、版本、權限與詢問紀錄，一起留著。",
      }}
    >
      <div className="docops-work" data-preserve-text>
        <section className="dw-hero dw-wrap">
          <div>
            <p className="dw-eyebrow">
              <span className="dw-mark">D</span> DOCOPS / 企業知識中心
            </p>
            <h1>
              公司資料
              <br />
              <em>直接問。</em>
            </h1>
            <p className="dw-lead">
              答案找得到，
              <br />
              來源也看得到。
            </p>
            <a className="dw-button" href={entry}>
              直接體驗 <span>↗</span>
            </a>
            <p className="dw-note">
              原文搜尋模式 · 不使用付費 AI
              <br />
              森曜設備有限公司 · 虛構企業，真實操作
            </p>
          </div>
          <div className="dw-paper">
            <header>
              <b>DocOps</b>
              <span>問公司資料</span>
              <span className="dw-dot">●</span>
            </header>
            <div className="dw-example">
              <small>文件原文範例 · 非 AI 生成</small>
              <p className="dw-question">X200 冷凍櫃保固多久？</p>
              <div className="dw-answer">
                <span>符合關鍵字的文件摘錄</span>
                <h2>24 個月。</h2>
                <p>
                  X200 主機標準保固 24 個月，
                  <br />
                  自安裝驗收完成日起算。
                </p>
                <a href={entry}>
                  保固政策 v4.2 · 第 8 頁 <span>↗</span>
                </a>
              </div>
              <div className="dw-source">
                <span>08 / 保固範圍</span>
                <p>
                  <mark>X200 主機標準保固 24 個月，自安裝驗收完成日起算。</mark>
                </p>
                <small>示範原文 · 進入工作區查看完整文件</small>
              </div>
            </div>
            <footer>
              摘錄原文，保留出處。<span>01 — 03</span>
            </footer>
          </div>
        </section>
        <section className="dw-story">
          <div className="dw-wrap">
            <p className="dw-eyebrow">從問題，到依據</p>
            <h2>
              不只回答。
              <br />
              還告訴你答案在哪。
            </h2>
            <div className="dw-flow">
              <div>
                <small>01 / QUESTION</small>
                <h3>直接問</h3>
                <p>輸入產品名稱、代碼或關鍵字。</p>
              </div>
              <span>→</span>
              <div>
                <small>02 / ANSWER</small>
                <h3>先看重點</h3>
                <p>先看符合關鍵字的摘錄，需要時再展開。</p>
              </div>
              <span>→</span>
              <div>
                <small>03 / SOURCE</small>
                <h3>回到原文</h3>
                <p>打開對應版本，找到支持答案的段落。</p>
              </div>
            </div>
          </div>
        </section>
        <section className="dw-wrap dw-features">
          {[
            ["01", "有來源", "每段摘錄都能回到原文。"],
            ["02", "不亂答", "直接顯示原文，不生成未記載的答案。"],
            ["03", "有權限", "不同部門看到不同資料。"],
            ["04", "文件會更新", "新版生效，舊版仍留著。"],
          ].map(([n, title, text]) => (
            <article key={n}>
              <small>{n}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>
        <section className="dw-wrap dw-bottom">
          <div>
            <p className="dw-eyebrow">把找資料的時間，留給工作。</p>
            <h2>從一個問題開始。</h2>
            <div className="dw-actions">
              <a className="dw-button" href={entry}>
                我是員工 ↗
              </a>
              <a className="dw-secondary" href="/works/docops/app/admin">
                我是管理員 →
              </a>
            </div>
            <p className="dw-note">每位訪客使用獨立體驗工作區；請勿上傳真實機密資料。</p>
          </div>
          <details>
            <summary>
              了解架構 <span>＋</span>
            </summary>
            <p>
              沿用 Qingyu Core
              的身分、租戶、角色、資料庫與私有檔案。檢索前先檢查文件權限，預設只搜尋生效版本。背景工作處理文件、分段與全文索引；查詢、來源與回饋真正存回資料庫。目前關閉
              AI 生成與語意向量搜尋，不呼叫付費模型；以關鍵字尋找原文，不保證理解改寫或推論問題。
            </p>
          </details>
        </section>
      </div>
    </SiteLayout>
  )
}
