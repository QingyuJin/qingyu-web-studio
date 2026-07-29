import type { DirectionId, PageData } from "../types"

interface SubpageBannerProps {
  direction: DirectionId
  page: PageData
  compact?: boolean
}

function Photo({ page }: { page: PageData }) {
  return (
    <>
      <img
        className="banner-photo banner-photo--desktop"
        src={`/assets/banner-system/page-${page.id}.webp`}
        alt=""
        width="900"
        height="600"
        loading="lazy"
        decoding="async"
      />
      <img
        className="banner-photo banner-photo--mobile"
        src={`/assets/banner-system/page-${page.id}-mobile.webp`}
        alt=""
        width="560"
        height="420"
        loading="lazy"
        decoding="async"
      />
    </>
  )
}

export function SubpageBanner({
  direction,
  page,
  compact = false,
}: SubpageBannerProps) {
  const titleId = `banner-title-${direction}-${page.id}${compact ? "-compact" : ""}`

  const title = (
    <div className="subpage-banner__title">
      <span>{page.englishName}</span>
      <i aria-hidden="true" />
      <h2 id={titleId}>{page.chineseName}</h2>
    </div>
  )

  const className = `subpage-banner direction-${direction.toLowerCase()}${
    compact ? " is-compact" : ""
  }`

  if (direction === "original") {
    return (
      <section className={className} aria-labelledby={titleId}>
        <img
          className="banner-photo banner-photo--original"
          src="/assets/banner-system/original-banner.webp"
          alt=""
          aria-hidden="true"
          width="1920"
          height="400"
        />
        <div className="subpage-banner__inner">{title}</div>
      </section>
    )
  }

  return (
    <section className={className} aria-labelledby={titleId}>
      {/* D paints its own black-to-paper steps behind everything else. */}
      {direction === "B" ? (
        // The sheet runs past the bottom of the banner so its white joins the
        // white of the body copy — the grey reads as a collar, not a lid.
        <div className="banner-sheet">
          <div className="banner-sheet__inner">
            {title}
            <div className="banner-sheet__frame">
              <Photo page={page} />
            </div>
          </div>
        </div>
      ) : direction === "C" ? (
        <div className="subpage-banner__inner banner-grid">
          {title}
          <div className="banner-grid__frame">
            <Photo page={page} />
          </div>
          {/* An empty block, held open on purpose. */}
          <div className="banner-grid__void" aria-hidden="true" />
        </div>
      ) : (
        <>
          <div className={direction === "A" ? "banner-plate" : "banner-column"}>
            <div className="banner-plate__frame">
              <Photo page={page} />
            </div>
          </div>
          <div className="subpage-banner__inner">{title}</div>
        </>
      )}
    </section>
  )
}
