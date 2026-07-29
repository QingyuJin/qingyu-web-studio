import type { CSSProperties } from "react"
import type { DirectionId, PageData } from "../types"

interface SubpageBannerProps {
  direction: DirectionId
  page: PageData
  compact?: boolean
}

export function SubpageBanner({
  direction,
  page,
  compact = false,
}: SubpageBannerProps) {
  const titleId = `banner-title-${direction}-${page.id}${compact ? "-compact" : ""}`
  const isOriginal = direction === "original"

  return (
    <section
      className={`subpage-banner direction-${direction.toLowerCase()}${
        compact ? " is-compact" : ""
      }`}
      aria-labelledby={titleId}
      style={{ "--banner-focus": page.bannerFocus } as CSSProperties}
    >
      {isOriginal ? (
        <img
          className="subpage-banner__art subpage-banner__art--original"
          src="/assets/banner-system/original-banner.webp"
          alt=""
          aria-hidden="true"
          width="1920"
          height="400"
        />
      ) : (
        <div className="subpage-banner__frame" aria-hidden="true">
          <img
            className="subpage-banner__art subpage-banner__art--desktop"
            src={`/assets/banner-system/page-${page.id}.webp`}
            alt=""
            width="900"
            height="600"
            loading={compact ? "lazy" : "eager"}
            decoding="async"
          />
          <img
            className="subpage-banner__art subpage-banner__art--mobile"
            src={`/assets/banner-system/page-${page.id}-mobile.webp`}
            alt=""
            width="560"
            height="420"
            loading={compact ? "lazy" : "eager"}
            decoding="async"
          />
        </div>
      )}

      <div className="subpage-banner__inner">
        <div className="subpage-banner__title">
          <span>{page.englishName}</span>
          <i aria-hidden="true" />
          <h2 id={titleId}>{page.chineseName}</h2>
        </div>
      </div>
    </section>
  )
}
