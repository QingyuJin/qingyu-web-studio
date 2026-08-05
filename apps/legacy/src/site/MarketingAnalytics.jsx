import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import {
  captureAttribution,
  getMarketingConsent,
  hasMarketingTags,
  initializeMarketing,
  setMarketingConsent,
  trackEvent,
} from "./marketing"

function MarketingAnalytics() {
  const location = useLocation()
  const [consent, setConsent] = useState(() =>
    typeof window === "undefined" ? null : getMarketingConsent()
  )

  useEffect(() => {
    captureAttribution(location.search)
    initializeMarketing()
  }, [location.search])

  useEffect(() => {
    trackEvent("page_view", {
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
      page_title: document.title,
    })
  }, [location.pathname, location.search])

  useEffect(() => {
    function handleClick(event) {
      const element = event.target.closest?.("[data-track]")
      if (!element) return
      trackEvent(element.dataset.track, {
        link_text: element.textContent?.trim().slice(0, 80),
        link_url: element.getAttribute("href") || undefined,
        placement: element.dataset.placement || undefined,
      })
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  if (!hasMarketingTags || consent) return null

  function choose(value) {
    setMarketingConsent(value)
    if (value === "granted") {
      trackEvent("page_view", {
        page_location: window.location.href,
        page_path: `${location.pathname}${location.search}`,
        page_title: document.title,
      })
    }
    setConsent(value)
  }

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#101b20]/96 p-4 text-white shadow-2xl backdrop-blur md:flex md:items-center md:gap-5 md:p-5" aria-label="Cookie 與成效衡量選擇">
      <div className="flex-1">
        <p className="text-sm font-black">讓網站持續變得更好</p>
        <p className="mt-1 text-xs font-bold leading-6 text-white/65">
          同意後會使用匿名成效資料了解哪些內容真正有幫助，也用於廣告成效衡量
        </p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 md:mt-0 md:shrink-0">
        <button type="button" onClick={() => choose("denied")} className="min-h-10 rounded-lg border border-white/20 px-4 text-xs font-black text-white">
          僅必要功能
        </button>
        <button type="button" onClick={() => choose("granted")} className="min-h-10 rounded-lg bg-[#d5f26b] px-4 text-xs font-black text-[#122017]">
          同意衡量
        </button>
      </div>
    </aside>
  )
}

export default MarketingAnalytics
