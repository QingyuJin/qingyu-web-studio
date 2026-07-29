import { useEffect, useMemo, useRef, useState } from "react"
import { campaigns, type Artwork, type Campaign } from "./data/campaigns"
import { Reveal } from "./components/Reveal"

type GalleryItem = {
  id: string
  src: string
  filename: string
  alt: string
  eyebrow: string
  title: string
}

const categories = [
  "品牌主視覺",
  "Banner 設計",
  "影像合成",
  "電商美工",
  "網站視覺",
]

function DownloadLink({
  href,
  filename,
  light = false,
}: {
  href: string
  filename: string
  light?: boolean
}) {
  return (
    <a
      className={`download-link${light ? " download-link--light" : ""}`}
      href={href}
      download={filename}
    >
      下載高解析 PNG
      <span aria-hidden="true">↓</span>
    </a>
  )
}

function ArtworkFigure({
  campaign,
  artwork,
  variant,
  eager,
  onOpen,
}: {
  campaign: Campaign
  artwork: Artwork
  variant: "desktop" | "mobile" | "social"
  eager?: boolean
  onOpen: () => void
}) {
  const isDark = campaign.id === "interior" || campaign.id === "operations"

  return (
    <figure className={`artwork artwork--${variant}`}>
      <button
        className="artwork__open"
        type="button"
        onClick={onOpen}
        aria-label={`放大查看 ${campaign.brand} ${artwork.kind}`}
      >
        <span className="artwork__image">
          <img
            src={artwork.src}
            alt={artwork.alt}
            width={
              artwork.size === "1920 × 720"
                ? 1920
                : artwork.size === "750 × 900"
                  ? 750
                  : 1080
            }
            height={
              artwork.size === "1920 × 720"
                ? 720
                : artwork.size === "750 × 900"
                  ? 900
                  : 1080
            }
            loading="eager"
            fetchPriority={eager ? "high" : "auto"}
            decoding="async"
          />
          <span className="artwork__view" aria-hidden="true">
            VIEW <b>＋</b>
          </span>
        </span>
      </button>
      <figcaption className={isDark ? "is-dark" : ""}>
        <span>
          {artwork.kind} / {artwork.size}
        </span>
        <DownloadLink
          href={artwork.src}
          filename={artwork.filename}
          light={isDark}
        />
      </figcaption>
    </figure>
  )
}

function ProcessFigure({
  campaign,
  onOpen,
}: {
  campaign: Campaign
  onOpen: () => void
}) {
  const isDark = campaign.id === "interior" || campaign.id === "operations"

  return (
    <figure className="process-proof" id={`${campaign.id}-process`}>
      <div className="process-proof__heading">
        <div>
          <span>Process Proof</span>
          <h3>原始素材 → 合成過程 → 最終成品</h3>
        </div>
        <p>去背合成、調色、排版、品牌視覺皆為自行製作</p>
      </div>
      <button
        className="process-proof__open"
        type="button"
        onClick={onOpen}
        aria-label={`放大查看 ${campaign.brand} 製作過程`}
      >
        <img
          src={campaign.process.src}
          alt={campaign.process.alt}
          width="1800"
          height="1080"
          loading="lazy"
          decoding="async"
        />
        <span aria-hidden="true">VIEW PROCESS ＋</span>
      </button>
      <DownloadLink
        href={campaign.process.src}
        filename={campaign.process.filename}
        light={isDark}
      />
    </figure>
  )
}

function CampaignSection({
  campaign,
  campaignIndex,
  openItem,
}: {
  campaign: Campaign
  campaignIndex: number
  openItem: (id: string) => void
}) {
  const [desktop, mobile, social] = campaign.artworks

  return (
    <section
      className={`campaign campaign--${campaign.id}`}
      id={campaign.id}
      style={{ "--campaign-accent": campaign.accent } as React.CSSProperties}
    >
      <div className="campaign__shell">
        <Reveal>
          <header className="campaign__heading">
            <div className="campaign__identity">
              <span>{campaign.index}</span>
              <p>{campaign.industry}</p>
            </div>
            <div className="campaign__title">
              <h2>{campaign.brand}</h2>
              <strong>{campaign.focus}</strong>
            </div>
            <p className="campaign__description">{campaign.description}</p>
          </header>
        </Reveal>

        <Reveal className="campaign__artworks">
          <ArtworkFigure
            campaign={campaign}
            artwork={desktop}
            variant="desktop"
            eager={campaignIndex === 0}
            onOpen={() => openItem(`${campaign.id}-desktop`)}
          />
          <div className="campaign__secondary" id={`${campaign.id}-formats`}>
            <ArtworkFigure
              campaign={campaign}
              artwork={mobile}
              variant="mobile"
              onOpen={() => openItem(`${campaign.id}-mobile`)}
            />
            <ArtworkFigure
              campaign={campaign}
              artwork={social}
              variant="social"
              onOpen={() => openItem(`${campaign.id}-social`)}
            />
          </div>
        </Reveal>

        <Reveal>
          <ProcessFigure
            campaign={campaign}
            onOpen={() => openItem(`${campaign.id}-process`)}
          />
        </Reveal>
      </div>
    </section>
  )
}

function Lightbox({
  item,
  index,
  total,
  onClose,
  onNavigate,
}: {
  item: GalleryItem
  index: number
  total: number
  onClose: () => void
  onNavigate: (direction: number) => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") onNavigate(-1)
      if (event.key === "ArrowRight") onNavigate(1)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose, onNavigate])

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`作品放大檢視：${item.title}`}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const end = event.changedTouches[0]?.clientX ?? touchStart.current
        const distance = end - touchStart.current
        if (Math.abs(distance) > 55) onNavigate(distance > 0 ? -1 : 1)
        touchStart.current = null
      }}
    >
      <button
        ref={closeRef}
        className="lightbox__close"
        type="button"
        onClick={onClose}
        aria-label="關閉放大檢視"
      >
        關閉 <span aria-hidden="true">×</span>
      </button>

      <button
        className="lightbox__nav lightbox__nav--previous"
        type="button"
        onClick={() => onNavigate(-1)}
        aria-label="上一張作品"
      >
        ←
      </button>

      <div className="lightbox__stage">
        <img src={item.src} alt={item.alt} />
      </div>

      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        onClick={() => onNavigate(1)}
        aria-label="下一張作品"
      >
        →
      </button>

      <div className="lightbox__caption">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div>
          <small>{item.eyebrow}</small>
          <p>{item.title}</p>
        </div>
        <a href={item.src} download={item.filename}>
          下載 PNG ↓
        </a>
      </div>
      <p className="lightbox__gesture">可左右滑動瀏覽</p>
    </div>
  )
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [lineCopied, setLineCopied] = useState(false)

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      campaigns.flatMap((campaign) => [
        ...campaign.artworks.map((artwork, artworkIndex) => ({
          id: `${campaign.id}-${["desktop", "mobile", "social"][artworkIndex]}`,
          src: artwork.src,
          filename: artwork.filename,
          alt: artwork.alt,
          eyebrow: `${artwork.kind} / ${artwork.size}`,
          title: campaign.brand,
        })),
        {
          id: `${campaign.id}-process`,
          src: campaign.process.src,
          filename: campaign.process.filename,
          alt: campaign.process.alt,
          eyebrow: "Process Proof / 1800 × 1080",
          title: `${campaign.brand}｜製作過程`,
        },
      ]),
    [],
  )

  const openItem = (id: string) => {
    const index = galleryItems.findIndex((item) => item.id === id)
    if (index >= 0) setLightboxIndex(index)
  }

  const closeLightbox = () => setLightboxIndex(null)
  const navigateLightbox = (direction: number) => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return (current + direction + galleryItems.length) % galleryItems.length
    })
  }

  const copyLineId = async () => {
    const lineId = "mulavuc"
    try {
      await navigator.clipboard.writeText(lineId)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = lineId
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      textarea.remove()
    }
    setLineCopied(true)
    window.setTimeout(() => setLineCopied(false), 2200)
  }

  return (
    <>
      <header className="site-header" id="top">
        <a href="#top" className="site-header__brand">
          Commercial Visual Design
        </a>
        <nav aria-label="主要導覽">
          <a href="#beauty">商業作品</a>
          <a href="#beauty-process">製作證明</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>

      <main>
        <section className="portfolio-intro" aria-labelledby="page-title">
          <div className="portfolio-intro__headline">
            <span>Selected Commercial Campaigns</span>
            <h1 id="page-title">Commercial Visual Design</h1>
            <p>品牌網站・電商・廣告 Banner 視覺設計</p>
          </div>
          <div className="portfolio-intro__position">
            <p>
              為品牌與行銷團隊製作可直接上線的網站主視覺、活動 Banner
              與多尺寸廣告素材。
            </p>
            <strong>
              所有視覺皆包含自行排版、修圖、合成與多尺寸延伸設計
            </strong>
            <div className="portfolio-intro__actions">
              <a href="#beauty">查看平面作品 ↓</a>
              <a href="#contact">洽談設計合作 ↗</a>
            </div>
          </div>
          <div className="discipline-list" aria-label="作品分類">
            {categories.map((category, index) => (
              <span key={category}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {category}
              </span>
            ))}
          </div>
        </section>

        <div className="campaigns" id="works">
          {campaigns.map((campaign, index) => (
            <CampaignSection
              key={campaign.id}
              campaign={campaign}
              campaignIndex={index}
              openItem={openItem}
            />
          ))}
        </div>

        <section className="capabilities" id="capabilities">
          <div>
            <span>Ongoing Visual Support</span>
            <h2>可配合行銷團隊持續交付</h2>
            <p>
              可依既有品牌規範製作，也可從零建立單次 Campaign 視覺方向。
            </p>
          </div>
          <ol>
            <li>網站首頁主視覺</li>
            <li>電商活動 Banner</li>
            <li>Meta／Google 廣告素材</li>
            <li>Desktop／Mobile 多尺寸延伸</li>
          </ol>
        </section>
      </main>

      <footer className="contact" id="contact">
        <div className="contact__topline">
          <span>Project Inquiry</span>
          <a href="#top">回到頂部 ↑</a>
        </div>
        <div className="contact__content">
          <div>
            <h2>需要穩定配合的視覺設計夥伴？</h2>
            <p>
              可承接數位行銷公司、網站公司與品牌端的 Banner、
              網站主視覺及多尺寸廣告素材製作。
            </p>
          </div>
          <div className="contact__details">
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:a0988874324@gmail.com?subject=設計合作需求">
                    a0988874324@gmail.com
                  </a>
                </dd>
              </div>
              <div>
                <dt>LINE ID</dt>
                <dd>mulavuc</dd>
              </div>
            </dl>
            <div className="contact__actions">
              <a href="mailto:a0988874324@gmail.com?subject=設計合作需求">
                寄送合作需求 <span aria-hidden="true">↗</span>
              </a>
              <button type="button" onClick={copyLineId}>
                {lineCopied ? "已複製 LINE ID" : "複製 LINE ID"}
                <span aria-hidden="true">{lineCopied ? "✓" : "＋"}</span>
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {lineCopied ? "LINE ID「mulavuc」已複製。" : ""}
            </p>
          </div>
        </div>
        <div className="contact__foot">
          <span>Commercial Visual Design</span>
          <span>Brand Visual · Image Composite · Campaign Banner</span>
        </div>
      </footer>

      {lightboxIndex !== null ? (
        <Lightbox
          item={galleryItems[lightboxIndex]}
          index={lightboxIndex}
          total={galleryItems.length}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      ) : null}
    </>
  )
}

export default App
