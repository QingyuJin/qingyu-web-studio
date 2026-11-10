import { LanguageSelector, useCopy } from "./i18n";
import { useEffect, useMemo, useRef, useState } from "react"
import { campaigns, type Artwork, type Campaign } from "./data/campaigns"
import { Reveal } from "./components/Reveal"
import studioContact from "../../legacy/src/site/studioContact.json"

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
  const t = useCopy();
  return (
    <a
      className={`download-link${light ? " download-link--light" : ""}`}
      href={href}
      download={filename}
    >{t("下載高解析 PNG")}<span aria-hidden="true">↓</span>
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
  const t = useCopy();
  const isDark = campaign.id === "interior" || campaign.id === "operations"

  return (
    <figure className={`artwork artwork--${variant}`}>
      <button
        className="artwork__open"
        type="button"
        onClick={onOpen}
        aria-label={t("放大查看 {0} {1}", [campaign.brand, artwork.kind])}
      >
        <span className="artwork__image">
          <img
            src={artwork.src}
            alt={t(artwork.alt)}
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
          <span className="artwork__view" aria-hidden="true">{t("VIEW")}<b>＋</b>
          </span>
        </span>
      </button>
      <figcaption className={isDark ? "is-dark" : ""}>
        <span>
          {t(artwork.kind)} / {t(artwork.size)}
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
  const t = useCopy();
  const isDark = campaign.id === "interior" || campaign.id === "operations"

  return (
    <figure className="process-proof" id={`${campaign.id}-process`}>
      <div className="process-proof__heading">
        <div>
          <span>{t("Process Proof")}</span>
          <h3>{t("原始素材 → 合成過程 → 最終成品")}</h3>
        </div>
        <p>{t("去背合成、調色、排版、品牌視覺皆為自行製作")}</p>
      </div>
      <button
        className="process-proof__open"
        type="button"
        onClick={onOpen}
        aria-label={t("放大查看 {0} 製作過程", [campaign.brand])}
      >
        <img
          src={campaign.process.src}
          alt={t(campaign.process.alt)}
          width="1800"
          height="1080"
          loading="lazy"
          decoding="async"
        />
        <span aria-hidden="true">{t("VIEW PROCESS ＋")}</span>
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
  const t = useCopy();
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
              <span>{t(campaign.index)}</span>
              <p>{t(campaign.industry)}</p>
            </div>
            <div className="campaign__title">
              <h2>{t(campaign.brand)}</h2>
              <strong>{t(campaign.focus)}</strong>
            </div>
            <p className="campaign__description">{t(campaign.description)}</p>
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
  const t = useCopy();
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
      aria-label={t("作品放大檢視：{0}", [item.title])}
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
        aria-label={t("關閉放大檢視")}
      >{t("關閉")}<span aria-hidden="true">×</span>
      </button>

      <button
        className="lightbox__nav lightbox__nav--previous"
        type="button"
        onClick={() => onNavigate(-1)}
        aria-label={t("上一張作品")}
      >
        ←
      </button>

      <div className="lightbox__stage">
        <img key={item.src} src={item.src} alt={t(item.alt)} />
      </div>

      <button
        className="lightbox__nav lightbox__nav--next"
        type="button"
        onClick={() => onNavigate(1)}
        aria-label={t("下一張作品")}
      >
        →
      </button>

      <div className="lightbox__caption">
        <span>
          {t(String(index + 1).padStart(2, "0"))} / {t(String(total).padStart(2, "0"))}
        </span>
        <div>
          <small>{t(item.eyebrow)}</small>
          <p>{t(item.title)}</p>
        </div>
        <a href={item.src} download={item.filename}>{t("下載 PNG ↓")}</a>
      </div>
      <p className="lightbox__gesture">{t("可左右滑動瀏覽")}</p>
    </div>
  )
}

function App() {
  const t = useCopy();
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
          eyebrow: `${t(artwork.kind)} ${artwork.size}`,
          title: t(campaign.brand),
        })),
        {
          id: `${campaign.id}-process`,
          src: campaign.process.src,
          filename: campaign.process.filename,
          alt: campaign.process.alt,
          eyebrow: t("Process Proof / 1800 × 1080"),
          title: t("{0}｜製作過程", [campaign.brand]),
        },
      ]),
    [t],
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
    const { lineId } = studioContact
    try {
      await navigator.clipboard.writeText(lineId)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = lineId
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      const copied = document.execCommand("copy")
      textarea.remove()
      if (!copied) return
    }
    setLineCopied(true)
    window.setTimeout(() => setLineCopied(false), 2200)
  }

  return (
    <>
      <header className="site-header" id="top">
        <a href="#top" className="site-header__brand">{t("Commercial Visual Design")}</a>
        <nav aria-label={t("主要導覽")}>
          <LanguageSelector />
          <a href="#beauty">{t("商業作品")}</a>
          <a href="#beauty-process">{t("製作證明")}</a>
          <a href="#contact">{t("聯絡")}</a>
        </nav>
      </header>

      <main>
        <p className="portfolio-disclosure">{t("概念作品 品牌與情境為展示使用 影像皆由本作品生成")}</p>
        <section className="portfolio-intro" aria-labelledby="page-title">
          <div className="portfolio-intro__headline">
            <span>{t("Selected Commercial Campaigns")}</span>
            <h1 id="page-title">{t("Commercial Visual Design")}</h1>
            <p>{t("品牌網站・電商・廣告 Banner 視覺設計")}</p>
          </div>
          <div className="portfolio-intro__position">
            <p>{t("為品牌與行銷團隊製作可直接上線的網站主視覺、活動 Banner 與多尺寸廣告素材。")}</p>
            <strong>{t("所有視覺皆包含自行排版、修圖、合成與多尺寸延伸設計")}</strong>
            <div className="portfolio-intro__actions">
              <a href="#beauty">{t("查看平面作品 ↓")}</a>
              <a href="#contact">{t("洽談設計合作 ↗")}</a>
            </div>
          </div>
          <div className="discipline-list" aria-label={t("作品分類")}>
            {categories.map((category, index) => (
              <span key={category}>
                <b>{t(String(index + 1).padStart(2, "0"))}</b>
                {t(category)}
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
            <span>{t("Ongoing Visual Support")}</span>
            <h2>{t("可配合行銷團隊持續交付")}</h2>
            <p>{t("可依既有品牌規範製作，也可從零建立單次 Campaign 視覺方向。")}</p>
          </div>
          <ol>
            <li>{t("網站首頁主視覺")}</li>
            <li>{t("電商活動 Banner")}</li>
            <li>{t("Meta／Google 廣告素材")}</li>
            <li>{t("Desktop／Mobile 多尺寸延伸")}</li>
          </ol>
        </section>
      </main>

      <footer className="contact" id="contact">
        <div className="contact__topline">
          <span>{t("Project Inquiry")}</span>
          <a href="#top">{t("回到頂部 ↑")}</a>
        </div>
        <div className="contact__content">
          <div>
            <h2>{t("需要穩定配合的視覺設計夥伴？")}</h2>
            <p>{t("可承接數位行銷公司、網站公司與品牌端的 Banner、 網站主視覺及多尺寸廣告素材製作。")}</p>
          </div>
          <div className="contact__details">
            <dl>
              <div>
                <dt>{t("Email")}</dt>
                <dd>
                  <a href={`mailto:a0988874324@gmail.com?subject=${encodeURIComponent(t("設計合作需求"))}`}>{t("a0988874324@gmail.com")}</a>
                </dd>
              </div>
              <div>
                <dt>{t("LINE ID")}</dt>
                <dd><a href={`https://line.me/R/ti/p/~${studioContact.lineId}`} translate="no">{studioContact.lineId}</a></dd>
              </div>
            </dl>
            <div className="contact__actions">
              <a href={`mailto:a0988874324@gmail.com?subject=${encodeURIComponent(t("設計合作需求"))}`}>{t("寄送合作需求")}<span aria-hidden="true">↗</span>
              </a>
              <button type="button" onClick={copyLineId}>
                {t(lineCopied ? "已複製 LINE ID" : "複製 LINE ID")}
                <span aria-hidden="true">{t(lineCopied ? "✓" : "＋")}</span>
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {lineCopied && t("已複製 LINE ID")}
            </p>
          </div>
        </div>
        <div className="contact__foot">
          <span>{t("Commercial Visual Design")}</span>
          <span>{t("Brand Visual · Image Composite · Campaign Banner")}</span>
        </div>
      </footer>

      {lightboxIndex !== null ? (
        <Lightbox
          key={galleryItems[lightboxIndex].id}
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
