import { Component } from "react"
import { siteConfig } from "../beauty-shopline/beautyShoplineData"

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("LULUFACE page error", error, info)
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <main className="lf-error-page">
        <p>WE WILL BE RIGHT BACK</p>
        <h1>頁面暫時無法顯示</h1>
        <p>請重新整理頁面，或先透過 LINE 與 LULUFACE 聯絡。</p>
        <div>
          <button type="button" onClick={() => window.location.reload()}>
            重新整理
          </button>
          <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
            LINE 聯絡
          </a>
        </div>
      </main>
    )
  }
}
