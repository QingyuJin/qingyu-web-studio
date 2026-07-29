import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Seo from "../site/Seo"
import { BeautyShoplineContentPage } from "./BeautyShoplineContentPages"
import {
  brandValues,
  careJourney,
  cases,
  faqs,
  growthPaths,
  imageAssets,
  pageSeo,
  products,
  reasons,
  reviewPlaceholders,
  services,
  siteNavigation,
  siteConfig,
  utilityNavigation,
} from "./beautyShoplineData"
import "./beauty-shopline-preview.css"

function useRevealAnimations(pagePath) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".luluface-site [data-reveal]"))
    if (!nodes.length) return undefined

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [pagePath])
}

const pageLabels = {
  brand: "品牌故事",
  services: "護膚服務",
  products: "商品選購",
  cases: "美容案例",
  training: "培訓加盟",
  equipment: "設備與流程",
  faq: "常見問題",
  contact: "聯絡我們",
  policies: "購物與隱私政策",
}

function useStructuredData(pagePath, pageKey, currentProduct, isNotFound) {
  useEffect(() => {
    const scriptId = "luluface-structured-data"
    const previous = document.getElementById(scriptId)
    previous?.remove()

    if (isNotFound) return undefined

    const baseUrl = siteConfig.seo.baseUrl || window.location.origin
    const normalizedBaseUrl = `${baseUrl.replace(/\/$/, "")}/`
    const pageUrl = new URL(pagePath, normalizedBaseUrl).href
    const homeUrl = new URL(siteConfig.route, normalizedBaseUrl).href
    const imageUrl = new URL(siteConfig.seo.image, normalizedBaseUrl).href
    const logoUrl = new URL(imageAssets.logo.src, normalizedBaseUrl).href
    const graph = []
    graph.push({
      "@type": "BeautySalon",
      "@id": `${homeUrl}#business`,
      name: siteConfig.contact.storeName,
      alternateName: siteConfig.brand.name,
      image: imageUrl,
      logo: logoUrl,
      url: homeUrl,
      telephone: siteConfig.contact.phoneLabel,
      address: {
        "@type": "PostalAddress",
        streetAddress: "上海路 235 號",
        addressLocality: "嘉義市西區",
        postalCode: siteConfig.contact.postalCode,
        addressCountry: "TW",
      },
      sameAs: [siteConfig.links.facebook, siteConfig.links.instagram],
    })

    if (pageKey !== "home") {
      const breadcrumbItems = [{ "@type": "ListItem", position: 1, name: "首頁", item: homeUrl }]

      if (currentProduct) {
        breadcrumbItems.push({
          "@type": "ListItem",
          position: 2,
          name: pageLabels.products,
          item: new URL(`${siteConfig.route}/products`, normalizedBaseUrl).href,
        })
        breadcrumbItems.push({
          "@type": "ListItem",
          position: 3,
          name: currentProduct.name,
          item: pageUrl,
        })
      } else {
        breadcrumbItems.push({
          "@type": "ListItem",
          position: 2,
          name: pageLabels[pageKey],
          item: pageUrl,
        })
      }

      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      })
    }

    if (pageKey === "faq") {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      })
    }

    if (currentProduct) {
      graph.push({
        "@type": "Product",
        name: currentProduct.name,
        alternateName: currentProduct.englishName,
        description: currentProduct.summary,
        image: [new URL(currentProduct.image.src, normalizedBaseUrl).href],
        url: pageUrl,
        brand: {
          "@type": "Brand",
          name: siteConfig.brand.name,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "規格",
            value: currentProduct.size,
          },
        ],
      })
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.type = "application/ld+json"
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    })
    document.head.appendChild(script)

    return () => script.remove()
  }, [currentProduct, isNotFound, pageKey, pagePath])
}

function useLulufaceAnalytics(pagePath) {
  useEffect(() => {
    const measurementId = siteConfig.analytics.ga4MeasurementId
    if (!siteConfig.analytics.enabled || !measurementId) return undefined

    const analyticsWindow = window
    const dataLayer = (analyticsWindow.dataLayer ||= [])

    const scriptId = "luluface-ga4"
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
      document.head.appendChild(script)
      dataLayer.push(["js", new Date()])
    }

    dataLayer.push(["config", measurementId, { page_path: pagePath, anonymize_ip: true }])

    const handleTrackedLink = (event) => {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest("a[href]")
      if (!(link instanceof HTMLAnchorElement)) return

      const href = link.getAttribute("href") || ""
      let eventName = "navigation_click"
      if (href.includes("line.me")) eventName = "line_click"
      else if (href.startsWith("tel:")) eventName = "phone_click"
      else if (href.includes("google.com/maps")) eventName = "map_click"
      else if (href.includes("facebook.com") || href.includes("instagram.com")) {
        eventName = "social_click"
      }

      dataLayer.push([
        "event",
        eventName,
        {
          link_url: link.href,
          link_text: link.textContent?.trim().slice(0, 80) || "",
        },
      ])
    }

    const site = document.querySelector(".luluface-site")
    site?.addEventListener("click", handleTrackedLink)
    return () => site?.removeEventListener("click", handleTrackedLink)
  }, [pagePath])
}

function SectionHeading({ eyebrow, title, description, light = false, align = "left" }) {
  return (
    <div
      className={`lf-section-heading lf-section-heading--${align}${light ? " lf-section-heading--light" : ""}`}
      data-reveal
    >
      <p className="lf-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="lf-section-description">{description}</p> : null}
    </div>
  )
}

function PlaceholderBadge({ compact = false }) {
  return (
    <span className={`lf-placeholder-badge${compact ? " lf-placeholder-badge--compact" : ""}`}>
      暫代圖<span aria-hidden="true">・</span>待換客戶實拍
    </span>
  )
}

function AssetImage({ image, className = "", loading = "lazy", fetchPriority = "auto" }) {
  return (
    <img
      className={className}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={loading === "eager" ? "eager" : "lazy"}
      fetchPriority={fetchPriority === "high" ? "high" : fetchPriority === "low" ? "low" : "auto"}
      decoding="async"
    />
  )
}

const lineIconPaths = {
  professional: [
    "M24 7c-8.5 0-14 6.5-14 15.5C10 33 17 41 24 41s14-8 14-18.5C38 13.5 32.5 7 24 7Z",
    "M18 23c1.7-1.8 3.5-2.7 6-2.7s4.3.9 6 2.7M19 29c3.2 2.5 6.8 2.5 10 0",
  ],
  attainable: ["M9 30c4-7 9-10 15-10s11 3 15 10", "M14 33h20M18 14h12M24 10v8"],
  steady: [
    "M24 8a16 16 0 1 0 0 32 16 16 0 0 0 0-32Z",
    "M24 15a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM24 21v6",
  ],
  essential: [
    "M24 7c5.5 7.2 10 12.6 10 19a10 10 0 0 1-20 0c0-6.4 4.5-11.8 10-19Z",
    "M18.5 28.5c1.6 3.5 7.8 5.2 11 0",
  ],
  facial: [
    "M13 10h22v9c0 12-5.6 20-11 22-5.4-2-11-10-11-22v-9Z",
    "M18 24c1.6-1.7 3.6-2.5 6-2.5s4.4.8 6 2.5M20 30h8",
  ],
  "skin-management": [
    "M10 17V9h8M30 9h8v8M38 31v8h-8M18 39h-8v-8",
    "M24 15a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 6v6m-3-3h6",
  ],
  "beauty-course": [
    "M9 13c6-3 11-2 15 2v25c-4-4-9-5-15-2V13Zm30 0c-6-3-11-2-15 2v25c4-4 9-5 15-2V13Z",
    "M24 15v25",
  ],
}

function LineIcon({ name }) {
  return (
    <span className="lf-line-icon" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        {lineIconPaths[name]?.map((path) => (
          <path d={path} key={path} />
        ))}
      </svg>
    </span>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function ProductDialog({ product, onClose }) {
  if (!product) return null

  return (
    <div className="lf-dialog-backdrop" onMouseDown={onClose}>
      <section
        className="lf-product-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lf-product-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          id="lf-product-dialog-close"
          className="lf-dialog-close"
          type="button"
          onClick={onClose}
          aria-label="關閉商品介紹"
        >
          <span aria-hidden="true">×</span>
        </button>

        <figure className="lf-dialog-image">
          <AssetImage image={product.image} />
          <PlaceholderBadge compact />
        </figure>

        <div className="lf-dialog-copy">
          <p className="lf-eyebrow">{product.label}</p>
          <h2 id="lf-product-dialog-title">{product.name}</h2>
          <p className="lf-product-english">{product.englishName}</p>
          <p className="lf-product-size">{product.size}</p>
          <p className="lf-dialog-summary">{product.summary}</p>

          <div className="lf-dialog-facts">
            <div>
              <h3>目前已確認</h3>
              <ul>
                {product.confirmedFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>正式上架前補齊</h3>
              <p>{product.pendingFacts}</p>
            </div>
          </div>

          <p className="lf-data-note">本頁不提供未經品牌確認的功效、成分或使用宣稱。</p>
          <a
            className="lf-button lf-button--dark lf-button--wide"
            href={siteConfig.links.line}
            target="_blank"
            rel="noreferrer"
          >
            LINE 詢問購買 <ArrowIcon />
          </a>
        </div>
      </section>
    </div>
  )
}

function BeautyShoplinePreview() {
  const location = useLocation()
  const relativePath = location.pathname.slice(siteConfig.route.length).replace(/^\/+|\/+$/g, "")
  const pathParts = relativePath ? relativePath.split("/") : []
  const pageKey = pathParts[0] || "home"
  const productId = pageKey === "products" ? (pathParts[1] ?? "") : ""
  const isHome = pathParts.length === 0
  const currentProduct = productId ? products.find((product) => product.id === productId) : null
  const hasKnownContentPage = Object.hasOwn(pageSeo, pageKey) && pathParts.length === 1
  const hasKnownProductPage =
    pageKey === "products" &&
    (pathParts.length === 1 || (pathParts.length === 2 && Boolean(currentProduct)))
  const isNotFound = !isHome && !hasKnownContentPage && !hasKnownProductPage
  const currentSeo = isNotFound
    ? {
        title: "找不到頁面｜LULUFACE 嚕嚕臉",
        description: "這個 LULUFACE 頁面不存在或網址已更新，請返回首頁重新瀏覽。",
      }
    : isHome
      ? siteConfig.seo
      : currentProduct
        ? {
            title: `${currentProduct.name}｜LULUFACE 嚕嚕臉`,
            description: `${currentProduct.summary} ${currentProduct.size}；正式售價與完整商品資料待品牌確認。`,
          }
        : pageSeo[pageKey]

  useRevealAnimations(location.pathname)
  useStructuredData(location.pathname, pageKey, currentProduct, isNotFound)
  useLulufaceAnalytics(location.pathname)

  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeProductId, setActiveProductId] = useState("")
  const [reviewIndex, setReviewIndex] = useState(0)
  const productTriggerRef = useRef(null)

  const activeProduct = products.find((product) => product.id === activeProductId)
  const activeReview = reviewPlaceholders[reviewIndex]
  const hasOverlay = mobileOpen || Boolean(activeProduct)

  const isCurrentPage = (path) =>
    location.pathname === path ||
    (path !== siteConfig.route && location.pathname.startsWith(`${path}/`))

  const openProduct = useCallback((productId) => {
    productTriggerRef.current = document.activeElement
    setActiveProductId(productId)
  }, [])

  const closeProduct = useCallback(() => {
    setActiveProductId("")
    window.setTimeout(() => productTriggerRef.current?.focus(), 0)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.pathname])

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key !== "Escape") return
      setMobileOpen(false)
      closeProduct()
    }

    document.addEventListener("keydown", closeWithEscape)
    document.body.style.overflow = hasOverlay ? "hidden" : ""

    return () => {
      document.removeEventListener("keydown", closeWithEscape)
      document.body.style.overflow = ""
    }
  }, [closeProduct, hasOverlay])

  useEffect(() => {
    if (!activeProduct) return

    const dialog = document.querySelector(".lf-product-dialog")
    const handleDialogKeys = (event) => {
      if (event.key !== "Tab" || !dialog) return
      const focusable = Array.from(
        dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((element) => element instanceof HTMLElement)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.setTimeout(() => document.getElementById("lf-product-dialog-close")?.focus(), 0)
    dialog?.addEventListener("keydown", handleDialogKeys)
    return () => dialog?.removeEventListener("keydown", handleDialogKeys)
  }, [activeProduct])

  useEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.slice(1))
    const pageContent = document.getElementById("main-content")
    if (!targetId || !pageContent) return undefined

    const alignTarget = () => document.getElementById(targetId)?.scrollIntoView()
    const resizeObserver = new ResizeObserver(alignTarget)
    const frameId = window.requestAnimationFrame(alignTarget)
    const stopId = window.setTimeout(() => {
      alignTarget()
      resizeObserver.disconnect()
    }, 1000)

    resizeObserver.observe(pageContent)
    document.fonts?.ready.then(alignTarget)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(stopId)
      resizeObserver.disconnect()
    }
  }, [isHome, location.hash])

  const moveReview = (direction) => {
    setReviewIndex(
      (current) => (current + direction + reviewPlaceholders.length) % reviewPlaceholders.length
    )
  }

  return (
    <main className="luluface-site" id="top">
      <Seo
        page={{
          path: location.pathname,
          title: currentSeo.title,
          description: currentSeo.description,
          image: siteConfig.seo.image,
          siteName: "LULUFACE 嚕嚕臉",
          baseUrl: siteConfig.seo.baseUrl,
          useCurrentOrigin: !siteConfig.seo.baseUrl,
          robots:
            siteConfig.seo.allowIndexing && !isNotFound
              ? "index, follow"
              : "noindex, nofollow, noarchive",
          ogType: currentProduct ? "product" : "website",
          themeColor: siteConfig.seo.themeColor,
        }}
      />

      <a className="lf-skip-link" href="#main-content">
        跳到主要內容
      </a>

      <header className="lf-header">
        <Link className="lf-logo" to={siteConfig.route} aria-label="LULUFACE 回到首頁">
          <AssetImage image={imageAssets.logo} loading="eager" fetchPriority="high" />
        </Link>

        <nav className="lf-desktop-nav" aria-label="主要選單">
          {siteNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isCurrentPage(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="lf-header-actions">
          <a
            className="lf-header-line"
            href={siteConfig.links.line}
            target="_blank"
            rel="noreferrer"
          >
            LINE 預約
          </a>
          <button
            className="lf-menu-button"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="lf-mobile-menu"
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span>{mobileOpen ? "CLOSE" : "MENU"}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="lf-mobile-menu" id="lf-mobile-menu">
          <p className="lf-eyebrow">LULUFACE NAVIGATION</p>
          <nav aria-label="手機版選單">
            {siteNavigation.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isCurrentPage(item.path) ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="lf-mobile-contact">
            <p>{siteConfig.contact.address}</p>
            <a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a>
            <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
              LINE {siteConfig.contact.lineLabel}
            </a>
          </div>
        </div>
      ) : null}

      {isHome ? (
        <div id="main-content" tabIndex={-1}>
          <section className="lf-hero" aria-labelledby="lf-hero-title">
            <div className="lf-hero-copy" data-reveal>
              <p className="lf-hero-location">CHIAYI · FACIAL CARE · SKIN RITUAL</p>
              <p className="lf-tagline">{siteConfig.brand.tagline}</p>
              <h1 id="lf-hero-title">{siteConfig.brand.heroTitle}</h1>
              <p className="lf-hero-description">{siteConfig.brand.heroDescription}</p>
              <div className="lf-hero-actions">
                <a
                  className="lf-button lf-button--dark"
                  href={siteConfig.links.line}
                  target="_blank"
                  rel="noreferrer"
                >
                  立即預約 <ArrowIcon />
                </a>
                <Link className="lf-button lf-button--ghost" to={`${siteConfig.route}/products`}>
                  選購產品 <ArrowIcon />
                </Link>
              </div>
              <div className="lf-hero-promise" aria-label="品牌服務特色">
                <span>先了解膚況</span>
                <span>清楚護膚流程</span>
                <span>居家保養延續</span>
              </div>
            </div>

            <figure className="lf-hero-visual" data-reveal>
              <AssetImage image={imageAssets.hero} loading="eager" fetchPriority="high" />
              <PlaceholderBadge />
              <figcaption>
                <span>SKIN FIRST</span>
                <p>每一次護膚，都從了解肌膚開始。</p>
              </figcaption>
            </figure>
          </section>

          <section className="lf-values" aria-labelledby="lf-values-title">
            <div className="lf-values-heading" data-reveal>
              <p className="lf-eyebrow">OUR VALUES</p>
              <h2 id="lf-values-title">溫柔有感，專業有據。</h2>
            </div>
            <div className="lf-value-grid">
              {brandValues.map((value) => (
                <article key={value.number} data-reveal>
                  <div className="lf-value-meta">
                    <span>{value.number}</span>
                    <LineIcon name={value.icon} />
                  </div>
                  <p>{value.english}</p>
                  <h3>{value.title}</h3>
                  <div className="lf-value-text">{value.text}</div>
                </article>
              ))}
            </div>
          </section>

          <section className="lf-section lf-services" id="services">
            <div className="lf-shell">
              <SectionHeading
                eyebrow="FACIAL SERVICES"
                title="從了解肌膚開始，安排剛剛好的照護。"
                description="護膚不是套用固定步驟。LULUFACE 會先理解你的肌膚需求，再陪你找到能安心持續的方式。"
              />

              <div className="lf-services-layout">
                <figure className="lf-services-image" data-reveal>
                  <AssetImage image={imageAssets.service} />
                  <PlaceholderBadge />
                  <figcaption>PROFESSIONAL · CALM · PERSONAL</figcaption>
                </figure>

                <div className="lf-service-list">
                  {services.map((service) => (
                    <article key={service.number} data-reveal>
                      <span className="lf-service-number">{service.number}</span>
                      <div>
                        <div className="lf-service-kicker">
                          <LineIcon name={service.icon} />
                          <p>{service.english}</p>
                        </div>
                        <h3>{service.title}</h3>
                        <div className="lf-service-text">{service.text}</div>
                        <ul>
                          {service.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                        預約諮詢 <ArrowIcon />
                      </a>
                    </article>
                  ))}
                </div>
              </div>

              <div className="lf-care-journey" aria-labelledby="lf-care-journey-title">
                <div className="lf-care-journey-heading" data-reveal>
                  <p className="lf-eyebrow">YOUR FIRST VISIT</p>
                  <h3 id="lf-care-journey-title">第一次來，也能清楚知道每一步。</h3>
                </div>
                <ol>
                  {careJourney.map((step) => (
                    <li key={step.number} data-reveal>
                      <span>{step.number}</span>
                      <h4>{step.title}</h4>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          <section className="lf-section lf-products" id="products">
            <div className="lf-shell">
              <SectionHeading
                eyebrow="DAILY SKINCARE"
                title="把專業護膚，延續到每天。"
                description="以下商品名稱與重點來自品牌目前公開資料；售價、完整規格與正式商品照仍待客戶確認。"
              />

              <div className="lf-product-grid">
                {products.map((product) => (
                  <article className="lf-product-card" key={product.id} data-reveal>
                    <button
                      className="lf-product-image"
                      type="button"
                      onClick={() => openProduct(product.id)}
                      aria-label={`查看${product.name}介紹`}
                    >
                      <AssetImage image={product.image} />
                      <PlaceholderBadge compact />
                      <span className="lf-product-view">查看產品介紹</span>
                    </button>
                    <div className="lf-product-card-copy">
                      <p>{product.label}</p>
                      <button type="button" onClick={() => openProduct(product.id)}>
                        <h3>{product.name}</h3>
                        <span>{product.englishName}</span>
                      </button>
                      <div>{product.summary}</div>
                      <footer>
                        <span>{product.size}</span>
                        <button type="button" onClick={() => openProduct(product.id)}>
                          查看與購買 <ArrowIcon />
                        </button>
                      </footer>
                    </div>
                  </article>
                ))}

                <aside className="lf-product-more" data-reveal>
                  <p className="lf-eyebrow">MORE ESSENTIALS</p>
                  <h3>更多日常保養品項</h3>
                  <p>目前網站規劃可擴充至 50 項商品；正式資料到齊後，可直接從集中資料檔加入。</p>
                  <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                    詢問現有商品 <ArrowIcon />
                  </a>
                </aside>
              </div>
            </div>
          </section>

          <section className="lf-why" id="why-luluface">
            <figure className="lf-why-image" data-reveal>
              <AssetImage image={imageAssets.ritual} />
              <PlaceholderBadge />
              <figcaption>CARE THAT CONTINUES AT HOME</figcaption>
            </figure>

            <div className="lf-why-copy">
              <SectionHeading
                eyebrow="WHY LULUFACE"
                title="每一次護膚，都從了解肌膚開始。"
                description="我們在意的不只是當下的服務，也希望你回到日常後，仍然知道如何照顧自己的肌膚。"
                light
              />
              <ol>
                {reasons.map((reason, index) => (
                  <li key={reason.title} data-reveal>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="lf-section lf-cases" id="cases">
            <div className="lf-shell">
              <SectionHeading
                eyebrow="SKIN STORIES"
                title="每一次護膚，都是重新認識自己的開始。"
                description="目前尚未取得經授權的顧客案例照片，因此第一版以清楚標示的示意版位呈現；正式版不會使用未經同意的前後對比照。"
              />
              <div className="lf-case-grid">
                {cases.map((caseItem) => (
                  <article key={caseItem.number} data-reveal>
                    <figure>
                      <AssetImage image={caseItem.image} />
                      <PlaceholderBadge compact />
                    </figure>
                    <div>
                      <p>{caseItem.number}</p>
                      <h3>{caseItem.title}</h3>
                      <span>{caseItem.text}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="lf-reviews" id="reviews" aria-labelledby="lf-reviews-title">
            <div className="lf-shell lf-reviews-layout">
              <div>
                <p className="lf-eyebrow">CUSTOMER VOICES</p>
                <h2 id="lf-reviews-title">真實回饋，會比廣告更有力量。</h2>
                <p>此區結構已完成，待客戶提供指定 Google 評論或授權內容後即可直接替換。</p>
              </div>

              <article className="lf-review-card" aria-live="polite" data-reveal>
                <span className="lf-review-label">{activeReview.label}</span>
                <p className="lf-review-mark" aria-hidden="true">
                  “
                </p>
                <h3>{activeReview.title}</h3>
                <blockquote>{activeReview.text}</blockquote>
                <footer>
                  <span>非真實顧客評論</span>
                  <div>
                    <button
                      type="button"
                      onClick={() => moveReview(-1)}
                      aria-label="上一則示意回饋"
                    >
                      ←
                    </button>
                    <span>
                      {String(reviewIndex + 1).padStart(2, "0")} /{" "}
                      {String(reviewPlaceholders.length).padStart(2, "0")}
                    </span>
                    <button type="button" onClick={() => moveReview(1)} aria-label="下一則示意回饋">
                      →
                    </button>
                  </div>
                </footer>
              </article>
            </div>
          </section>

          <section className="lf-section lf-growth" id="growth">
            <div className="lf-shell">
              <div className="lf-growth-heading">
                <SectionHeading
                  eyebrow="GROW WITH LULUFACE"
                  title="把累積的專業，分享給想走得更遠的人。"
                  description="從美容技術、創業經驗到加盟合作，第一版先建立清楚入口；課綱、費用與合作條件以客戶後續確認資料為準。"
                />
                <figure data-reveal>
                  <AssetImage image={imageAssets.training} />
                  <PlaceholderBadge compact />
                </figure>
              </div>

              <div className="lf-growth-grid">
                {growthPaths.map((path) => (
                  <article key={path.number} data-reveal>
                    <div>
                      <span>{path.number}</span>
                      <p>{path.eyebrow}</p>
                    </div>
                    <h3>{path.title}</h3>
                    <p>{path.text}</p>
                    <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                      {path.cta} <ArrowIcon />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="lf-section lf-faq" aria-labelledby="lf-faq-title">
            <div className="lf-shell lf-faq-layout">
              <div className="lf-faq-heading" data-reveal>
                <p className="lf-eyebrow">BEFORE YOUR VISIT</p>
                <h2 id="lf-faq-title">預約前，先把常見問題說清楚。</h2>
                <p>如果仍不確定適合哪一種照護，直接透過 LINE 描述目前的膚況即可。</p>
                <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                  LINE 詢問 <ArrowIcon />
                </a>
              </div>
              <div className="lf-faq-list">
                {faqs.map((faq, index) => (
                  <details key={faq.question} data-reveal open={index === 0}>
                    <summary>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {faq.question}
                      <i aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="lf-line-cta" aria-labelledby="lf-line-title">
            <div>
              <p className="lf-eyebrow">BOOK YOUR SKIN RITUAL</p>
              <h2 id="lf-line-title">想知道自己適合怎麼保養？先從一次安心的對話開始。</h2>
            </div>
            <div className="lf-line-cta-action">
              <span>LINE 官方帳號</span>
              <strong>{siteConfig.contact.lineLabel}</strong>
              <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                加入好友並預約 <ArrowIcon />
              </a>
            </div>
          </section>

          <section className="lf-section lf-contact" id="contact">
            <div className="lf-shell lf-contact-layout">
              <div className="lf-contact-copy" data-reveal>
                <p className="lf-eyebrow">VISIT LULUFACE</p>
                <h2>留一段時間，給肌膚，也給自己。</h2>
                <dl>
                  <div>
                    <dt>門市地址</dt>
                    <dd>{siteConfig.contact.address}</dd>
                  </div>
                  <div>
                    <dt>預約電話</dt>
                    <dd>
                      <a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>營業與預約</dt>
                    <dd>{siteConfig.contact.hours}</dd>
                  </div>
                </dl>
                <div className="lf-contact-actions">
                  <a
                    className="lf-button lf-button--dark"
                    href={siteConfig.links.line}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LINE 預約 <ArrowIcon />
                  </a>
                  <a
                    className="lf-button lf-button--ghost"
                    href={siteConfig.links.map}
                    target="_blank"
                    rel="noreferrer"
                  >
                    開啟地圖 <ArrowIcon />
                  </a>
                </div>
              </div>

              <figure className="lf-contact-image" data-reveal>
                <AssetImage image={imageAssets.studio} />
                <PlaceholderBadge />
                <figcaption>門市實景照片待客戶提供</figcaption>
              </figure>
            </div>
          </section>
        </div>
      ) : (
        <div id="main-content" tabIndex={-1}>
          <BeautyShoplineContentPage
            pageKey={isNotFound ? "not-found" : pageKey}
            productId={productId}
          />
        </div>
      )}

      <footer className="lf-footer">
        <div className="lf-footer-main">
          <div>
            <Link
              className="lf-logo lf-logo--footer"
              to={siteConfig.route}
              aria-label="LULUFACE 回到首頁"
            >
              <AssetImage image={imageAssets.logo} />
            </Link>
            <p>{siteConfig.brand.tagline}</p>
          </div>
          <div>
            <p className="lf-footer-title">聯絡我們</p>
            <a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a>
            <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
              LINE {siteConfig.contact.lineLabel}
            </a>
            <span>{siteConfig.contact.address}</span>
          </div>
          <div>
            <p className="lf-footer-title">網站導覽</p>
            <Link to={`${siteConfig.route}/brand`}>品牌故事</Link>
            <Link to={`${siteConfig.route}/services`}>護膚服務</Link>
            <Link to={`${siteConfig.route}/products`}>商品選購</Link>
            <Link to={`${siteConfig.route}/training`}>培訓與加盟</Link>
          </div>
          <div>
            <p className="lf-footer-title">網站資訊</p>
            {utilityNavigation.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
            <a href={siteConfig.links.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
        <div className="lf-footer-bottom">
          <p>© {new Date().getFullYear()} LULUFACE. Preview for client review.</p>
          <p>本頁為第一版提案，未開放線上付款與預約資料蒐集。</p>
        </div>
      </footer>

      <a
        className="lf-floating-line"
        href={siteConfig.links.line}
        target="_blank"
        rel="noreferrer"
        aria-label="使用 LINE 預約 LULUFACE"
      >
        <span>LINE</span>
        預約
      </a>

      <ProductDialog product={activeProduct} onClose={closeProduct} />
    </main>
  )
}

export default BeautyShoplinePreview
