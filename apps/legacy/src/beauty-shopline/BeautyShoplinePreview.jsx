import { useEffect, useMemo, useState } from "react"
import Seo from "../site/Seo"
import {
  assetCredits,
  beautyBrand,
  brandPillars,
  faqs,
  footerInformation,
  heroMetrics,
  ingredientFocus,
  instagramTiles,
  navigation,
  products,
  routineSteps,
  services,
  skinConcerns,
  testimonials,
  trainingCurriculum,
  trainingHighlights,
} from "./beautyShoplineData"
import "./beauty-shopline-preview.css"

const formatPrice = (value) => `NT$ ${value.toLocaleString("zh-TW")}`

function useRevealAnimations() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll(".beauty-preview [data-reveal]")]
    if (!nodes.length) return undefined

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function SectionHeading({ eyebrow, title, text, align = "left" }) {
  return (
    <div className={`beauty-section-heading beauty-section-heading--${align}`} data-reveal>
      <p className="beauty-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p className="beauty-section-intro">{text}</p> : null}
    </div>
  )
}

function BeautyShoplinePreview() {
  useRevealAnimations()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [quickProduct, setQuickProduct] = useState(null)
  const [quickQuantity, setQuickQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const [cartMessage, setCartMessage] = useState("")
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [infoPanel, setInfoPanel] = useState(null)

  const cartItems = useMemo(
    () =>
      cart.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.id),
      })),
    [cart]
  )
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  )

  const hasOverlay = cartOpen || Boolean(quickProduct) || Boolean(infoPanel) || mobileOpen

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.key !== "Escape") return
      setMobileOpen(false)
      setCartOpen(false)
      setQuickProduct(null)
      setInfoPanel(null)
    }
    document.addEventListener("keydown", closeWithEscape)
    document.body.style.overflow = hasOverlay ? "hidden" : ""
    return () => {
      document.removeEventListener("keydown", closeWithEscape)
      document.body.style.overflow = ""
    }
  }, [hasOverlay])

  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...current, { id: product.id, quantity }]
    })
    setCartMessage(`${product.name} 已加入提案購物車`)
    setQuickProduct(null)
    setCartOpen(true)
  }

  const updateCart = (id, quantity) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
    setCartMessage("")
  }

  const openQuickView = (product) => {
    setQuickQuantity(1)
    setQuickProduct(product)
  }

  const moveTestimonial = (direction) => {
    setTestimonialIndex(
      (current) => (current + direction + testimonials.length) % testimonials.length
    )
  }

  const activeTestimonial = testimonials[testimonialIndex]

  return (
    <main className="beauty-preview" id="top">
      <Seo
        page={{
          path: "/works/beauty-shopline-preview",
          title: "美容保養品牌電商提案預覽｜Qingyu Web Studio",
          description: "美容保養品牌、商品電商、美容服務與專業培訓整合的高完成度前端提案預覽。",
        }}
      />

      <div className="beauty-announcement">
        <p>夏日保濕提案｜全館滿 NT$ 2,000 享免運 · 新客護膚諮詢預約中</p>
        <a href="#services">查看預約</a>
      </div>

      <header className="beauty-header">
        <a className="beauty-logo" href="#top" aria-label={`${beautyBrand.name} 回到頁首`}>
          <span>{beautyBrand.name}</span>
          <small>SKIN LAB &amp; STUDIO</small>
        </a>

        <nav className="beauty-nav" aria-label="品牌主選單">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="beauty-header-actions">
          <button
            type="button"
            className="beauty-cart-trigger"
            onClick={() => setCartOpen(true)}
            aria-label={`開啟購物車，目前 ${cartCount} 件商品`}
          >
            BAG <span>{cartCount}</span>
          </button>
          <button
            type="button"
            className="beauty-menu-trigger"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="beauty-mobile-menu"
          >
            <span aria-hidden="true">{mobileOpen ? "×" : "☰"}</span>
            <span className="sr-only">{mobileOpen ? "關閉選單" : "開啟選單"}</span>
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="beauty-mobile-menu" id="beauty-mobile-menu">
          <p>{beautyBrand.proposalLabel}</p>
          <nav aria-label="手機版品牌選單">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="beauty-button beauty-button--dark beauty-button--wide"
            href={beautyBrand.lineUrl}
            target="_blank"
            rel="noreferrer"
          >
            LINE 預約體驗 ↗
          </a>
        </div>
      ) : null}

      <section className="beauty-hero">
        <div className="beauty-hero-copy" data-reveal>
          <p className="beauty-proposal-tag">{beautyBrand.proposalLabel}</p>
          <p className="beauty-eyebrow">SKIN IN ITS OWN RHYTHM</p>
          <h1>
            溫柔理解肌膚，
            <br />
            留下剛好的光。
          </h1>
          <p className="beauty-hero-description">{beautyBrand.description}</p>
          <div className="beauty-hero-actions">
            <a className="beauty-button beauty-button--dark" href="#products">
              選購商品
            </a>
            <a className="beauty-button beauty-button--outline" href="#services">
              預約體驗
            </a>
          </div>
          <div className="beauty-hero-note">
            <span aria-hidden="true">◎</span>
            <p>溫和配方 · 專業護膚 · 美容職人培訓</p>
          </div>
        </div>

        <div className="beauty-hero-visual" data-reveal>
          <img
            src="/beauty-preview/serum-ritual.jpg"
            alt="女性在自然光中使用保養精華的示意畫面"
            fetchPriority="high"
          />
          <div className="beauty-hero-card">
            <span>THE DAILY EDIT</span>
            <p>保養不必很多，選擇真正適合自己的節奏。</p>
          </div>
          <p className="beauty-hero-vertical">FORMULA · RITUAL · EDUCATION</p>
        </div>
      </section>

      <section className="beauty-metrics" aria-label="品牌特色數據">
        {heroMetrics.map((metric) => (
          <div key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </section>

      <section className="beauty-section beauty-philosophy">
        <div className="beauty-container">
          <SectionHeading
            eyebrow="OUR PHILOSOPHY"
            title="少一點負擔，多一點真正理解"
            text="我們從肌膚每天面對的環境與生活節奏出發，把產品、護膚服務與專業知識整理成一套清楚、舒服的選擇。"
          />
          <div className="beauty-pillar-grid">
            {brandPillars.map((pillar) => (
              <article key={pillar.number} className="beauty-pillar" data-reveal>
                <div className="beauty-pillar-number">{pillar.number}</div>
                <p>{pillar.eyebrow}</p>
                <h3>{pillar.title}</h3>
                <span>{pillar.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beauty-section beauty-products" id="products">
        <div className="beauty-container">
          <div className="beauty-products-heading">
            <SectionHeading
              eyebrow="SKIN ESSENTIALS"
              title="每天都會想用的三件事"
              text="從清潔、補水到柔潤收尾，三項核心單品可以單獨使用，也能組成簡潔的日常流程。"
            />
            <a href="#signature" className="beauty-text-link">
              深入認識明星精華 <span>↘</span>
            </a>
          </div>

          <div className="beauty-product-grid">
            {products.map((product) => (
              <article className="beauty-product-card" key={product.id} data-reveal>
                <button
                  type="button"
                  className="beauty-product-image"
                  onClick={() => openQuickView(product)}
                  aria-label={`快速查看 ${product.name}`}
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span>QUICK VIEW</span>
                </button>
                <div className="beauty-product-meta">
                  <p>{product.label}</p>
                  <button type="button" onClick={() => openQuickView(product)}>
                    <h3>{product.name}</h3>
                    <span>{product.englishName}</span>
                  </button>
                  <p className="beauty-product-short">{product.short}</p>
                  <div className="beauty-product-buy">
                    <strong>{formatPrice(product.price)}</strong>
                    <button type="button" onClick={() => addToCart(product)}>
                      加入購物車 <span>＋</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beauty-signature" id="signature">
        <div className="beauty-signature-image" data-reveal>
          <img
            src="/beauty-preview/product-detail.jpg"
            alt="白色保養霜與棉棒的產品細節示意"
            loading="lazy"
          />
          <div>
            <span>01</span>
            <p>CLARITY BEFORE COMPLEXITY</p>
          </div>
        </div>

        <div className="beauty-signature-content">
          <SectionHeading
            eyebrow="SIGNATURE FORMULA"
            title="潤序屏護精華，把補水做得簡單而準確"
            text="不是一夜改變肌膚的承諾，而是一瓶願意每天陪伴的精華。清爽水感適合疊擦，在乾燥與忙碌之間，留下穩定的保養節奏。"
          />
          <div className="beauty-concern-grid">
            {skinConcerns.map((concern) => (
              <div key={concern.title} data-reveal>
                <span aria-hidden="true">—</span>
                <h3>{concern.title}</h3>
                <p>{concern.text}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="beauty-button beauty-button--light"
            onClick={() => openQuickView(products[0])}
          >
            查看商品與成分
          </button>
        </div>
      </section>

      <section className="beauty-section beauty-formula">
        <div className="beauty-container">
          <SectionHeading
            eyebrow="FORMULA FOCUS"
            title="每一項成分，都有清楚的角色"
            text="以保濕、柔潤與舒適膚觸為核心，不用誇張數字，把配方語言說得簡單透明。"
            align="center"
          />
          <div className="beauty-ingredient-grid">
            {ingredientFocus.map((ingredient) => (
              <article key={ingredient.code} data-reveal>
                <p>{ingredient.code}</p>
                <div className="beauty-ingredient-orbit" aria-hidden="true">
                  <span />
                </div>
                <h3>{ingredient.title}</h3>
                <span>{ingredient.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beauty-routine">
        <div className="beauty-routine-visual" data-reveal>
          <img
            src="/beauty-preview/product-collection.jpg"
            alt="簡潔白色保養品系列陳列示意"
            loading="lazy"
          />
        </div>
        <div className="beauty-routine-content">
          <SectionHeading
            eyebrow="3-STEP RITUAL"
            title="三個步驟，留給每天的自己"
            text="早晚不需要相同的複雜程序。依照當天膚況調整用量，保留能長久維持的核心步驟。"
          />
          <ol>
            {routineSteps.map((item) => (
              <li key={item.step} data-reveal>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="beauty-text-link beauty-text-link--dark" href="#products">
            回到全系列商品 <span>↗</span>
          </a>
        </div>
      </section>

      <section className="beauty-section beauty-services" id="services">
        <div className="beauty-container">
          <div className="beauty-service-intro">
            <div>
              <SectionHeading
                eyebrow="SKIN STUDIO"
                title="不急著改變，先好好看見肌膚"
                text="每項服務都從諮詢開始，依當日狀態安排清潔、保濕與放鬆流程；不推銷、不做醫療式承諾。"
              />
              <img
                src="/beauty-preview/service-detail.jpg"
                alt="美容師進行專業臉部保養服務的示意"
                loading="lazy"
                data-reveal
              />
            </div>
            <div className="beauty-service-image" data-reveal>
              <img
                src="/beauty-preview/service-treatment.jpg"
                alt="顧客接受溫和敷護美容服務的示意"
                loading="lazy"
              />
              <span>TAIPEI · BY APPOINTMENT</span>
            </div>
          </div>

          <div className="beauty-service-list">
            {services.map((service, index) => (
              <article key={service.title} data-reveal>
                <span className="beauty-service-number">0{index + 1}</span>
                <div>
                  <p>{service.englishName}</p>
                  <h3>{service.title}</h3>
                  <span>{service.text}</span>
                </div>
                <div className="beauty-service-price">
                  <p>{service.time}</p>
                  <strong>{service.price}</strong>
                </div>
                <a href={beautyBrand.lineUrl} target="_blank" rel="noreferrer">
                  LINE 預約 ↗
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beauty-training" id="training">
        <div className="beauty-training-copy">
          <SectionHeading
            eyebrow="PROFESSIONAL EDUCATION"
            title="把溫柔的專業，變成可以被信任的服務"
            text="為美容新手、個人工作室與品牌團隊設計的實務培訓。從安全界線、標準流程到顧客溝通，建立能真正落地的服務系統。"
          />
          <div className="beauty-training-for">
            <p>THIS PROGRAM IS FOR</p>
            <ul>
              {trainingHighlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <a
            className="beauty-button beauty-button--sand"
            href={beautyBrand.lineUrl}
            target="_blank"
            rel="noreferrer"
          >
            LINE 諮詢課程
          </a>
        </div>

        <div className="beauty-training-detail">
          <img
            src="/beauty-preview/training-session.jpg"
            alt="美容師示範護膚流程的專業培訓示意"
            loading="lazy"
            data-reveal
          />
          <div className="beauty-curriculum">
            {trainingCurriculum.map((item) => (
              <article key={item.number} data-reveal>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beauty-section beauty-voices" id="reviews">
        <div className="beauty-container">
          <SectionHeading
            eyebrow="SKIN NOTES"
            title="真實感受，不需要誇張對比"
            text="以下為提案用情境文字，正式網站應改用品牌取得同意的真實顧客回饋；個人使用感受會因膚況與習慣而異。"
          />

          <div className="beauty-testimonial" data-reveal>
            <div className="beauty-testimonial-image">
              <img src={activeTestimonial.image} alt="顧客保養情境示意" loading="lazy" />
              <p>
                {String(testimonialIndex + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </p>
            </div>
            <div className="beauty-testimonial-copy">
              <p className="beauty-eyebrow">{activeTestimonial.phase}</p>
              <blockquote>“{activeTestimonial.quote}”</blockquote>
              <p className="beauty-testimonial-name">{activeTestimonial.name}</p>
              <div className="beauty-progress-notes">
                <span>{activeTestimonial.before}</span>
                <span aria-hidden="true">→</span>
                <span>{activeTestimonial.after}</span>
              </div>
              <div className="beauty-carousel-controls">
                <button
                  type="button"
                  onClick={() => moveTestimonial(-1)}
                  aria-label="上一則顧客回饋"
                >
                  ←
                </button>
                <div role="tablist" aria-label="選擇顧客回饋">
                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={index === testimonialIndex}
                      aria-label={`顯示第 ${index + 1} 則回饋`}
                      onClick={() => setTestimonialIndex(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => moveTestimonial(1)}
                  aria-label="下一則顧客回饋"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="beauty-story" id="story">
        <div className="beauty-story-image" data-reveal>
          <img
            src="/beauty-preview/brand-story.jpg"
            alt="品牌顧客拿著保養霜的自然人物示意"
            loading="lazy"
          />
        </div>
        <div className="beauty-story-copy">
          <SectionHeading eyebrow="OUR STORY" title="從一張總是太滿的梳妝台開始" />
          <p>
            VELINÉA
            是一個為提案而生的示意品牌。故事設定來自創辦人多年在美容服務現場看到的共同困惑：產品越買越多，肌膚卻沒有更容易被理解。
          </p>
          <p>
            因此我們把品牌核心定義為「清楚、克制、可持續」。每個配方有明確角色，每次服務先聽再做，每堂課都回到安全與信任。不是追求完美肌膚，而是找到能長久相處的日常。
          </p>
          <div className="beauty-story-signature">
            <span>VELINÉA</span>
            <p>Founder’s note · Brand proposal 2026</p>
          </div>
        </div>
      </section>

      <section className="beauty-section beauty-faq" id="faq">
        <div className="beauty-container beauty-faq-layout">
          <SectionHeading
            eyebrow="QUESTIONS, ANSWERED"
            title="購買、預約與課程常見問題"
            text="正式上線前，可依品牌實際商品規格、門市流程與 SHOPLINE 規則替換。"
          />
          <div className="beauty-faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} data-reveal>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{faq.question}</strong>
                  <i aria-hidden="true">＋</i>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="beauty-instagram" id="instagram">
        <div className="beauty-instagram-heading" data-reveal>
          <div>
            <p className="beauty-eyebrow">FOLLOW THE RITUAL</p>
            <h2>@VELINEA.SKIN</h2>
          </div>
          <a href="#top">回到頁首 ↑</a>
        </div>
        <div className="beauty-instagram-grid">
          {instagramTiles.map((tile, index) => (
            <a
              href="#story"
              key={`${tile.label}-${index}`}
              aria-label={`${tile.label}，前往品牌故事`}
              data-reveal
            >
              <img src={tile.image} alt={tile.label} loading="lazy" />
              <span>VIEW STORY ↗</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="beauty-footer">
        <div className="beauty-footer-main">
          <div>
            <a className="beauty-logo beauty-logo--footer" href="#top">
              <span>{beautyBrand.name}</span>
              <small>SKIN LAB &amp; STUDIO</small>
            </a>
            <p>{beautyBrand.tagline}</p>
          </div>
          <div>
            <p className="beauty-footer-title">CONTACT</p>
            <a href={beautyBrand.lineUrl} target="_blank" rel="noreferrer">
              LINE 官方帳號 ↗
            </a>
            <a href={`mailto:${beautyBrand.contactEmail}`}>{beautyBrand.contactEmail}</a>
            <span>服務採完全預約制</span>
          </div>
          <div>
            <p className="beauty-footer-title">EXPLORE</p>
            <a href="#products">全系列商品</a>
            <a href="#services">美容服務</a>
            <a href="#training">專業培訓</a>
            <a href="#instagram">Instagram 圖片牆</a>
          </div>
          <div>
            <p className="beauty-footer-title">INFORMATION</p>
            <button type="button" onClick={() => setInfoPanel(footerInformation.shipping)}>
              購物與配送說明
            </button>
            <button type="button" onClick={() => setInfoPanel(footerInformation.privacy)}>
              隱私政策
            </button>
            <a href="#faq">常見問題</a>
          </div>
        </div>
        <div className="beauty-footer-bottom">
          <p>© 2026 VELINÉA · BRAND PROPOSAL PREVIEW</p>
          <p>示意照片來源：{assetCredits.join("、")}</p>
        </div>
      </footer>

      <p className="beauty-live-region" aria-live="polite">
        {cartMessage}
      </p>

      {quickProduct ? (
        <div
          className="beauty-overlay"
          role="presentation"
          onMouseDown={() => setQuickProduct(null)}
        >
          <section
            className="beauty-quick-view"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="beauty-overlay-close"
              onClick={() => setQuickProduct(null)}
              aria-label="關閉商品快速檢視"
            >
              ×
            </button>
            <div className="beauty-quick-image">
              <img src={quickProduct.detailImage} alt={quickProduct.name} />
            </div>
            <div className="beauty-quick-copy">
              <p className="beauty-eyebrow">{quickProduct.label}</p>
              <h2 id="quick-view-title">{quickProduct.name}</h2>
              <p className="beauty-quick-english">
                {quickProduct.englishName} · {quickProduct.size}
              </p>
              <strong>{formatPrice(quickProduct.price)}</strong>
              <p>{quickProduct.description}</p>
              <div className="beauty-quick-facts">
                <div>
                  <span>KEY BENEFITS</span>
                  <ul>
                    {quickProduct.benefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span>FORMULA FOCUS</span>
                  <ul>
                    {quickProduct.ingredients.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="beauty-quick-usage">
                <strong>使用方式</strong>
                {quickProduct.usage}
              </p>
              <div className="beauty-quick-buy">
                <QuantityControl
                  value={quickQuantity}
                  onChange={setQuickQuantity}
                  label={`${quickProduct.name} 數量`}
                />
                <button type="button" onClick={() => addToCart(quickProduct, quickQuantity)}>
                  加入購物車 · {formatPrice(quickProduct.price * quickQuantity)}
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {cartOpen ? (
        <div
          className="beauty-overlay beauty-overlay--cart"
          role="presentation"
          onMouseDown={() => setCartOpen(false)}
        >
          <aside
            className="beauty-cart"
            role="dialog"
            aria-modal="true"
            aria-labelledby="beauty-cart-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="beauty-cart-header">
              <div>
                <p className="beauty-eyebrow">YOUR EDIT</p>
                <h2 id="beauty-cart-title">購物車 · {cartCount} 件</h2>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="關閉購物車">
                ×
              </button>
            </div>
            <div className="beauty-cart-body">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <article key={item.id}>
                    <img src={item.product.image} alt={item.product.name} />
                    <div>
                      <p>{item.product.englishName}</p>
                      <h3>{item.product.name}</h3>
                      <strong>{formatPrice(item.product.price)}</strong>
                      <QuantityControl
                        value={item.quantity}
                        onChange={(quantity) => updateCart(item.id, quantity)}
                        label={`${item.product.name} 購物車數量`}
                        allowZero
                      />
                    </div>
                    <button type="button" onClick={() => updateCart(item.id, 0)}>
                      移除
                    </button>
                  </article>
                ))
              ) : (
                <div className="beauty-cart-empty">
                  <span aria-hidden="true">○</span>
                  <h3>購物車還是空的</h3>
                  <p>從三項核心保養開始，組合適合自己的日常流程。</p>
                  <button type="button" onClick={() => setCartOpen(false)}>
                    繼續選購
                  </button>
                </div>
              )}
            </div>
            <div className="beauty-cart-footer">
              <div>
                <span>商品小計</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </div>
              <p>此為前端提案購物車，不會建立訂單或收取款項。</p>
              <button
                type="button"
                disabled={!cartItems.length}
                onClick={() =>
                  setCartMessage("提案預覽不會進行付款；正式網站將串接 SHOPLINE 安全結帳流程。")
                }
              >
                前往結帳預覽
              </button>
              {cartMessage ? <span className="beauty-cart-message">{cartMessage}</span> : null}
            </div>
          </aside>
        </div>
      ) : null}

      {infoPanel ? (
        <div className="beauty-overlay" role="presentation" onMouseDown={() => setInfoPanel(null)}>
          <section
            className="beauty-info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="beauty-info-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button type="button" onClick={() => setInfoPanel(null)} aria-label="關閉說明">
              ×
            </button>
            <p className="beauty-eyebrow">BRAND PROPOSAL NOTE</p>
            <h2 id="beauty-info-title">{infoPanel.title}</h2>
            <p>{infoPanel.text}</p>
            <button
              type="button"
              className="beauty-button beauty-button--dark"
              onClick={() => setInfoPanel(null)}
            >
              我知道了
            </button>
          </section>
        </div>
      ) : null}
    </main>
  )
}

function QuantityControl({ value, onChange, label, allowZero = false }) {
  const minimum = allowZero ? 0 : 1
  return (
    <div className="beauty-quantity" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(minimum, value - 1))}
        aria-label={`${label}減少一件`}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label={`${label}增加一件`}>
        ＋
      </button>
    </div>
  )
}

export default BeautyShoplinePreview
