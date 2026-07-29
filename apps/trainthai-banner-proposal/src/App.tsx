import { useEffect, useMemo, useState } from "react"
import { FullPagePreview } from "./components/FullPagePreview"
import { QuickCompare } from "./components/QuickCompare"
import { directions, pages } from "./data/systemData"
import type { DirectionId, PageId, ViewMode } from "./types"

function App() {
  const [directionId, setDirectionId] = useState<DirectionId>("A")
  const [pageId, setPageId] = useState<PageId>("about")
  const [mode, setMode] = useState<ViewMode>(() =>
    window.matchMedia("(max-width: 620px)").matches ? "mobile" : "desktop",
  )
  const [fullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)

  const direction = useMemo(
    () => directions.find((item) => item.id === directionId) ?? directions[1],
    [directionId],
  )
  const page = useMemo(
    () => pages.find((item) => item.id === pageId) ?? pages[0],
    [pageId],
  )

  useEffect(() => {
    if (!fullscreen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false)
    }
    document.body.classList.add("preview-open")
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.classList.remove("preview-open")
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [fullscreen])

  const copySelection = async () => {
    const text =
      direction.id === "original"
        ? "原版"
        : `選${direction.id}｜${direction.name}`

    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      textarea.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const selectFromComparison = (id: DirectionId) => {
    setDirectionId(id)
    document.querySelector(".proposal-controls")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    })
  }

  return (
    <>
      <header className="proposal-intro">
        <div>
          <span>TRAIN THAI / SUBPAGE BANNER SYSTEM</span>
          <h1>全泰工業｜次分頁 Banner 美術提案</h1>
          <p>
            四款方向都以全泰自有的產線、模具與材料實拍為主體，不使用任何裝飾圖形。
            差別只在照片露出多少、邊緣切得多硬。切換頁面即可預覽整套系統套用後的樣子。
          </p>
        </div>
      </header>

      <main className="proposal-main">
        <section className="proposal-controls" aria-label="提案切換">
          <div className="control-group control-group--directions">
            <span className="control-label">視覺方向</span>
            <div className="tab-list">
              {directions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={directionId === item.id ? "is-active" : ""}
                  aria-pressed={directionId === item.id}
                  onClick={() => setDirectionId(item.id)}
                >
                  {item.id === "original" ? "原版" : `${item.id} ${item.name}`}
                </button>
              ))}
            </div>
          </div>

          <div className="proposal-controls__secondary">
            <div className="control-group control-group--pages">
              <span className="control-label">套用頁面</span>
              <div className="tab-list tab-list--pages">
                {pages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={pageId === item.id ? "is-active" : ""}
                    aria-pressed={pageId === item.id}
                    onClick={() => setPageId(item.id)}
                  >
                    {item.chineseName.replace("工業", "")}
                  </button>
                ))}
              </div>
            </div>

            <div className="preview-actions">
              <div className="device-switch" aria-label="預覽尺寸">
                <button
                  type="button"
                  className={mode === "desktop" ? "is-active" : ""}
                  aria-pressed={mode === "desktop"}
                  onClick={() => setMode("desktop")}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  className={mode === "mobile" ? "is-active" : ""}
                  aria-pressed={mode === "mobile"}
                  onClick={() => setMode("mobile")}
                >
                  Mobile
                </button>
              </div>
              <button className="text-action" type="button" onClick={copySelection}>
                {copied ? "已複製" : "複製方案名稱"}
              </button>
              <button
                className="text-action text-action--dark"
                type="button"
                onClick={() => setFullscreen(true)}
              >
                全螢幕預覽
              </button>
            </div>
          </div>
        </section>

        <div className="active-direction">
          <strong>{direction.label}</strong>
          <span>{direction.description}</span>
        </div>

        <section
          className={`main-preview main-preview--${mode}`}
          aria-label={`${direction.label}完整頁面預覽`}
        >
          <FullPagePreview direction={directionId} page={page} mode={mode} />
        </section>

        <QuickCompare
          page={pages[0]}
          activeDirection={directionId}
          onSelect={selectFromComparison}
        />
      </main>

      <footer className="proposal-footer">
        <p>請直接回覆「選 A、B、C 或 D」，即可確認偏好的次分頁 Banner 方向。</p>
        <span>TRAIN THAI CO., LTD. / SUBPAGE BANNER VISUAL PROPOSAL</span>
      </footer>

      {fullscreen && (
        <div
          className="fullscreen-preview"
          role="dialog"
          aria-modal="true"
          aria-label={`${direction.label}全螢幕預覽`}
        >
          <div className="fullscreen-preview__bar">
            <div>
              <strong>{direction.label}</strong>
              <span>{page.chineseName}</span>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setMode((current) => (current === "desktop" ? "mobile" : "desktop"))}
              >
                切換至 {mode === "desktop" ? "Mobile" : "Desktop"}
              </button>
              <button type="button" onClick={copySelection}>
                {copied ? "已複製" : "複製方案名稱"}
              </button>
              <button type="button" onClick={() => setFullscreen(false)}>
                關閉 Esc
              </button>
            </div>
          </div>
          <div
            className={`fullscreen-preview__canvas mode-${mode}`}
            onClick={(event) => {
              if (event.currentTarget === event.target) setFullscreen(false)
            }}
          >
            <FullPagePreview direction={directionId} page={page} mode={mode} />
          </div>
        </div>
      )}
    </>
  )
}

export default App
