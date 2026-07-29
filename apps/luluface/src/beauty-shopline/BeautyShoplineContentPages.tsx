import { Link } from "react-router-dom"
import {
  brandValues,
  careJourney,
  cases,
  faqs,
  getProductPurchaseConfig,
  imageAssets,
  policyDrafts,
  productCatalogCapacity,
  products,
  serviceDetails,
  siteConfig,
  sitePath,
  trainingDetails,
} from "./beautyShoplineData"

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function AssetImage({ image, loading = "lazy" }) {
  return (
    <img
      className={image.sourceType === "placeholder" ? "lf-image--placeholder" : undefined}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={loading === "eager" ? "eager" : "lazy"}
      decoding="async"
    />
  )
}

function PlaceholderBadge({ label = "提案示意" }) {
  return <span className="lf-placeholder-badge">{label}</span>
}

function InnerHero({ eyebrow, title, description, image = imageAssets.hero }) {
  return (
    <section className="lf-page-hero" aria-labelledby="lf-page-title">
      <div className="lf-page-hero-copy" data-reveal>
        <p className="lf-eyebrow">{eyebrow}</p>
        <h1 id="lf-page-title">{title}</h1>
        <p>{description}</p>
        <div className="lf-page-hero-actions">
          <a
            className="lf-button lf-button--dark"
            href={siteConfig.links.line}
            target="_blank"
            rel="noreferrer"
          >
            LINE 預約與詢問 <ArrowIcon />
          </a>
          <Link className="lf-text-link" to={siteConfig.route}>
            回到首頁 <ArrowIcon />
          </Link>
        </div>
      </div>
      <figure className="lf-page-hero-visual" data-reveal>
        <AssetImage image={image} loading="eager" />
        {image.sourceType === "placeholder" ? <PlaceholderBadge /> : null}
      </figure>
    </section>
  )
}

function DataStatus({ title = "上線資料狀態", children }) {
  return (
    <aside className="lf-data-status" data-reveal>
      <div>
        <span aria-hidden="true">i</span>
        <strong>{title}</strong>
      </div>
      <p>{children}</p>
    </aside>
  )
}

function LineCta({
  title = "想先了解適合自己的照護方式？",
  text = "透過 LINE 告訴我們你的需求，實際項目與可預約時間以門市回覆為準。",
}) {
  return (
    <section className="lf-inner-line-cta" aria-label="LINE 諮詢">
      <div>
        <p className="lf-eyebrow">TALK WITH LULUFACE</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
        加入 LINE {siteConfig.contact.lineLabel} <ArrowIcon />
      </a>
    </section>
  )
}

function BrandPage() {
  return (
    <>
      <InnerHero
        eyebrow="ABOUT LULUFACE"
        title="讓專業護膚，成為可以持續的日常。"
        description="LULUFACE 以「平價消費，高端體驗」為品牌主張，從了解肌膚開始，減少不必要的複雜與壓力。"
        image={imageAssets.ritual}
      />

      <section className="lf-inner-section">
        <div className="lf-shell lf-brand-intro">
          <div data-reveal>
            <p className="lf-eyebrow">OUR BELIEF</p>
            <h2>每一次護膚，都從了解肌膚開始。</h2>
          </div>
          <div data-reveal>
            <p>
              我們相信，好的照護不是堆疊越多步驟，而是先看見每個人的膚況、生活習慣與真正需求，再給出清楚、安心的服務與居家保養方向。
            </p>
            <p>
              品牌希望以洗練、穩定且舒緩的方式，讓專業不顯得有距離，也讓高品質體驗回到日常可以負擔、可以持續的位置。
            </p>
          </div>
        </div>
      </section>

      <section className="lf-inner-section lf-inner-section--cream">
        <div className="lf-shell">
          <div className="lf-inner-heading" data-reveal>
            <p className="lf-eyebrow">BRAND VALUES</p>
            <h2>我們重視的四件事</h2>
          </div>
          <div className="lf-inner-value-grid">
            {brandValues.map((value) => (
              <article key={value.number} data-reveal>
                <span>{value.number}</span>
                <p>{value.english}</p>
                <h3>{value.title}</h3>
                <div>{value.text}</div>
              </article>
            ))}
          </div>
          <DataStatus title="我們的服務承諾">
            以清楚溝通、尊重膚況與穩定流程為原則，不堆疊不必要的項目，也不做未經確認的效果保證。
          </DataStatus>
        </div>
      </section>
      <LineCta />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <InnerHero
        eyebrow="FACIAL SERVICES"
        title="先了解膚況，再安排剛剛好的照護。"
        description="做臉護膚、問題肌管理與美容課程皆採預約制。服務內容、時間與價格會依當次需求由門市說明。"
        image={imageAssets.service}
      />
      <section className="lf-inner-section">
        <div className="lf-shell">
          <div className="lf-service-detail-list">
            {serviceDetails.map((service, index) => (
              <article key={service.title} data-reveal>
                <div className="lf-service-detail-index">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{service.english}</p>
                </div>
                <div>
                  <h2>{service.title}</h2>
                  <p className="lf-service-detail-lead">{service.summary}</p>
                  <div className="lf-service-detail-columns">
                    <div>
                      <h3>適合先來了解</h3>
                      <ul>
                        {service.suitableFor.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>服務說明</h3>
                      <ul>
                        {service.confirmed.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                    LINE 詢問此服務 <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="lf-inner-section lf-inner-section--pink">
        <div className="lf-shell">
          <div className="lf-inner-heading" data-reveal>
            <p className="lf-eyebrow">YOUR FIRST VISIT</p>
            <h2>從預約到後續追蹤</h2>
          </div>
          <ol className="lf-inner-journey">
            {careJourney.map((step) => (
              <li key={step.number} data-reveal>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <LineCta />
    </>
  )
}

function ProductsPage() {
  return (
    <>
      <InnerHero
        eyebrow="DAILY SKINCARE"
        title="把門市照護，延續到每天的保養。"
        description="精選適合延續門市照護的居家保養商品。售價、庫存與取貨方式請透過 LINE 向門市確認。"
        image={imageAssets.ritual}
      />
      <section className="lf-inner-section">
        <div className="lf-shell">
          <div className="lf-inner-heading lf-inner-heading--split" data-reveal>
            <div>
              <p className="lf-eyebrow">PRODUCT COLLECTION</p>
              <h2>居家保養選品</h2>
            </div>
            <p>依照日常照護需求，選擇簡單、容易持續的保養品項；實際使用方式可先向門市詢問。</p>
          </div>
          <div className="lf-catalog-grid">
            {products.map((product) => (
              <article key={product.id} data-reveal>
                <Link className="lf-catalog-image" to={sitePath(`products/${product.id}`)}>
                  <AssetImage image={product.image} />
                  <PlaceholderBadge label="商品示意" />
                </Link>
                <div>
                  <p className="lf-eyebrow">{product.label}</p>
                  <h2>{product.name}</h2>
                  <span>{product.englishName}</span>
                  <p>{product.summary}</p>
                  <footer>
                    <strong>
                      {product.size} · {product.price ? `NT$ ${product.price}` : "售價待品牌確認"}
                    </strong>
                    <Link to={sitePath(`products/${product.id}`)}>
                      查看商品資料 <ArrowIcon />
                    </Link>
                  </footer>
                </div>
              </article>
            ))}
          </div>
          <DataStatus title="目前購買方式">
            商品資料結構已預留約 {productCatalogCapacity} 項容量與 Shopline
            購買欄位；目前提供商品資訊與 LINE 諮詢，售價、庫存及取貨方式以門市最新回覆為準。
          </DataStatus>
        </div>
      </section>
      <LineCta
        title="想先詢問目前可購買的商品？"
        text="可透過 LINE 詢問品項、售價、庫存與取貨方式，我們會依你的需求提供說明。"
      />
    </>
  )
}

function ProductDetailPage({ productId }) {
  const product = products.find((item) => item.id === productId)

  if (!product) {
    return (
      <section className="lf-not-found">
        <p className="lf-eyebrow">PRODUCT NOT FOUND</p>
        <h1>找不到這項商品</h1>
        <p>商品可能尚未上架，或網址已更新。</p>
        <Link className="lf-button lf-button--dark" to={sitePath("products")}>
          返回商品總覽 <ArrowIcon />
        </Link>
      </section>
    )
  }

  const purchase = getProductPurchaseConfig(product)

  return (
    <>
      <section className="lf-product-detail">
        <figure data-reveal>
          <AssetImage image={product.image} loading="eager" />
          <PlaceholderBadge label="商品示意" />
        </figure>
        <div className="lf-product-detail-copy" data-reveal>
          <nav aria-label="麵包屑">
            <Link to={siteConfig.route}>首頁</Link>
            <span>/</span>
            <Link to={sitePath("products")}>商品選購</Link>
            <span>/</span>
            <span aria-current="page">{product.name}</span>
          </nav>
          <p className="lf-eyebrow">{product.label}</p>
          <h1>{product.name}</h1>
          <p className="lf-product-detail-english">{product.englishName}</p>
          <strong className="lf-product-detail-size">{product.size}</strong>
          <p className="lf-product-price">
            {product.price ? `NT$ ${product.price.toLocaleString("zh-TW")}` : "售價待品牌確認"}
          </p>
          <p className="lf-product-detail-summary">{product.summary}</p>
          <div className="lf-product-detail-facts">
            <h2>商品資訊</h2>
            <ul>
              {product.benefits.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>
          <div className="lf-product-information-grid">
            <div>
              <h2>完整成分</h2>
              <p>{product.ingredients || "資料待品牌確認"}</p>
            </div>
            <div>
              <h2>使用方法</h2>
              <p>{product.usage || "資料待品牌確認"}</p>
            </div>
            <div>
              <h2>注意事項</h2>
              <p>{product.cautions || "資料待品牌確認"}</p>
            </div>
            <div>
              <h2>庫存狀態</h2>
              <p>{product.stockStatus === "pending" ? "資料待品牌確認" : product.stockStatus}</p>
            </div>
          </div>
          <p className="lf-data-note">不提供未經品牌確認的功效、成分或使用宣稱。</p>
          <a
            className="lf-button lf-button--dark lf-button--wide"
            href={purchase.href}
            target="_blank"
            rel="noreferrer"
            data-purchase-mode={purchase.mode}
          >
            {purchase.label} <ArrowIcon />
          </a>
        </div>
      </section>
      <section className="lf-inner-section lf-inner-section--cream">
        <div className="lf-shell lf-product-template-note" data-reveal>
          <p className="lf-eyebrow">SHOPLINE READY</p>
          <h2>選購前先確認適合自己的方式</h2>
          <p>
            售價、完整成分、使用方式、注意事項與供貨狀態請透過 LINE
            確認，實際資訊以商品標示與門市回覆為準。
          </p>
        </div>
      </section>
    </>
  )
}

function CasesPage() {
  return (
    <>
      <InnerHero
        eyebrow="SKIN STORIES"
        title="每一段照護，都從理解肌膚開始。"
        description="以下為服務情境與照護方向示意，不代表特定顧客成果；實際安排會依個人膚況與門市評估而不同。"
        image={imageAssets.hero}
      />
      <section className="lf-inner-section">
        <div className="lf-shell">
          <DataStatus title="案例與圖片說明">
            下方為服務情境示意，並非特定顧客的前後對照或效果保證；顧客紀錄只會在取得本人授權後公開。
          </DataStatus>
          <div className="lf-case-page-grid">
            {cases.map((caseItem) => (
              <article key={caseItem.number} data-reveal>
                <figure>
                  <AssetImage image={caseItem.image} />
                  <PlaceholderBadge label="案例版型示意" />
                  <div className="lf-case-compare" aria-label="Before 與 After 素材待授權">
                    <span>
                      <b>BEFORE</b>
                      <small>待授權素材</small>
                    </span>
                    <span>
                      <b>AFTER</b>
                      <small>待授權素材</small>
                    </span>
                  </div>
                </figure>
                <div>
                  <p className="lf-eyebrow">{caseItem.number}</p>
                  <h2>{caseItem.title}</h2>
                  <p>{caseItem.text}</p>
                  <dl>
                    <div>
                      <dt>膚況困擾</dt>
                      <dd>{caseItem.concern}</dd>
                    </div>
                    <div>
                      <dt>服務方式</dt>
                      <dd>{caseItem.serviceMethod}</dd>
                    </div>
                    <div>
                      <dt>紀錄期間</dt>
                      <dd>{caseItem.carePeriod}</dd>
                    </div>
                    <div>
                      <dt>授權狀態</dt>
                      <dd>{caseItem.authorizationStatus}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LineCta />
    </>
  )
}

function TrainingPage() {
  return (
    <>
      <InnerHero
        eyebrow="GROW WITH LULUFACE"
        title="從技術到經營，保留一條清楚的成長路徑。"
        description="提供美容技術培訓、創業培訓與加盟合作諮詢；課程梯次與合作條件請透過 LINE 洽詢。"
        image={imageAssets.training}
      />
      <section className="lf-inner-section">
        <div className="lf-shell lf-training-list">
          {trainingDetails.map((item) => (
            <article key={item.number} data-reveal>
              <div>
                <span>{item.number}</span>
                <p className="lf-eyebrow">PROGRAM</p>
              </div>
              <h2>{item.title}</h2>
              <p>{item.lead}</p>
              <ul>
                {item.outline.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                LINE 詢問{item.title} <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>
      <LineCta
        title="想了解培訓或合作方向？"
        text="先透過 LINE 留下你的經驗、所在地與想了解的方案，正式內容以品牌回覆與書面文件為準。"
      />
    </>
  )
}

function EquipmentPage() {
  const process = [
    ["01", "服務前確認", "先了解需求與膚況，實際使用項目與是否適合由門市現場說明。"],
    ["02", "流程中溝通", "依當次狀況安排服務節奏，若有不適可即時提出並調整。"],
    ["03", "服務後說明", "提供居家保養與後續方向，實際追蹤方式由門市確認。"],
  ]
  return (
    <>
      <InnerHero
        eyebrow="EQUIPMENT & PROCESS"
        title="專業不只在設備，也在每一步是否清楚。"
        description="我們重視服務前的理解、流程中的溝通與服務後的說明；實際使用項目由門市依膚況評估。"
        image={imageAssets.service}
      />
      <section className="lf-inner-section">
        <div className="lf-shell">
          <div className="lf-equipment-layout">
            <figure data-reveal>
              <AssetImage image={imageAssets.studio} />
              <PlaceholderBadge />
            </figure>
            <div data-reveal>
              <p className="lf-eyebrow">TRANSPARENT INFORMATION</p>
              <h2>每項服務都以清楚說明為前提</h2>
              <p>
                若服務包含儀器或特定品項，門市會依實際需求說明用途、注意事項與是否適合，不以單一設備取代完整的膚況溝通。
              </p>
              <DataStatus title="資訊透明原則">
                網站不宣稱未經確認的效果，也不把一般美容服務描述為醫療行為；實際服務內容以門市說明為準。
              </DataStatus>
            </div>
          </div>
          <div className="lf-process-grid">
            {process.map(([number, title, text]) => (
              <article key={number} data-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <LineCta title="想確認門市目前提供的項目？" />
    </>
  )
}

function FaqPage() {
  return (
    <>
      <InnerHero
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="預約前，先把常見問題說清楚。"
        description="目前能確認的預約、商品與案例資料都整理在這裡；服務價格與細節請以門市 LINE 回覆為準。"
        image={imageAssets.ritual}
      />
      <section className="lf-inner-section">
        <div className="lf-shell lf-faq-page">
          <div data-reveal>
            <p className="lf-eyebrow">BEFORE YOUR VISIT</p>
            <h2>常見問題</h2>
            <p>找不到答案時，可直接透過 LINE 詢問門市。</p>
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
      <LineCta />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="VISIT LULUFACE"
        title="從一次清楚的溝通，開始了解你的肌膚。"
        description="目前採預約制。請透過 LINE 確認希望日期、時段與想了解的內容，再依門市回覆安排。"
        image={imageAssets.studio}
      />
      <section className="lf-inner-section">
        <div className="lf-shell lf-contact-page">
          <div className="lf-contact-panel" data-reveal>
            <p className="lf-eyebrow">CONTACT INFORMATION</p>
            <h2>{siteConfig.contact.storeName}</h2>
            <dl>
              <div>
                <dt>門市地址</dt>
                <dd>
                  <a href={siteConfig.links.map} target="_blank" rel="noreferrer">
                    {siteConfig.contact.address}
                  </a>
                </dd>
              </div>
              <div>
                <dt>預約電話</dt>
                <dd>
                  <a href={siteConfig.links.phone}>{siteConfig.contact.phoneLabel}</a>
                </dd>
              </div>
              <div>
                <dt>營業方式</dt>
                <dd>{siteConfig.contact.hours}</dd>
              </div>
              <div>
                <dt>LINE</dt>
                <dd>
                  <a href={siteConfig.links.line} target="_blank" rel="noreferrer">
                    {siteConfig.contact.lineLabel}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd>
                  <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
                    {siteConfig.contact.instagramLabel}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="lf-contact-page-actions">
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
          <aside className="lf-contact-social" data-reveal>
            <p className="lf-eyebrow">FOLLOW US</p>
            <h2>從社群了解近期消息</h2>
            <a href={siteConfig.links.facebook} target="_blank" rel="noreferrer">
              <span>Facebook</span>
              <ArrowIcon />
            </a>
            <a href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
              <span>Instagram</span>
              <ArrowIcon />
            </a>
            <DataStatus title="預約提醒">
              門市採預約制，來店前請先透過 LINE 或電話確認日期與時段，避免久候或撲空。
            </DataStatus>
          </aside>
        </div>
      </section>
    </>
  )
}

function PoliciesPage() {
  return (
    <>
      <InnerHero
        eyebrow="POLICIES"
        title="把購物與資料使用方式，清楚寫在交易之前。"
        description="了解本站的資料使用、商品詢問、付款配送與售後處理原則；交易前請以門市提供的最新資訊為準。"
        image={imageAssets.ritual}
      />
      <section className="lf-inner-section">
        <div className="lf-shell lf-policy-layout">
          <DataStatus title="本站服務範圍">
            本站目前不提供線上結帳或站內表單。透過 LINE、Facebook 或 Instagram
            聯絡時，亦適用各平台的隱私政策與服務條款。
          </DataStatus>
          <nav aria-label="政策頁章節">
            {policyDrafts.map((policy) => (
              <a key={policy.id} href={`#${policy.id}`}>
                {policy.title}
              </a>
            ))}
          </nav>
          <div>
            {policyDrafts.map((policy, index) => (
              <section id={policy.id} key={policy.id} data-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{policy.title}</h2>
                {policy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function BeautyShoplineContentPage({ pageKey, productId = "" }) {
  switch (pageKey) {
    case "brand":
      return <BrandPage />
    case "services":
      return <ServicesPage />
    case "products":
      return productId ? <ProductDetailPage productId={productId} /> : <ProductsPage />
    case "cases":
      return <CasesPage />
    case "training":
      return <TrainingPage />
    case "equipment":
      return <EquipmentPage />
    case "faq":
      return <FaqPage />
    case "contact":
      return <ContactPage />
    case "policies":
      return <PoliciesPage />
    default:
      return (
        <section className="lf-not-found">
          <p className="lf-eyebrow">PAGE NOT FOUND</p>
          <h1>找不到這個頁面</h1>
          <p>網址可能已更新，請從網站首頁重新瀏覽。</p>
          <Link className="lf-button lf-button--dark" to={siteConfig.route}>
            返回 LULUFACE 首頁 <ArrowIcon />
          </Link>
        </section>
      )
  }
}
