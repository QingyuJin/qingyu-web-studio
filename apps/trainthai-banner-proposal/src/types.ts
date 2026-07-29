export type ViewMode = "desktop" | "mobile"

export type DirectionId = "original" | "A" | "B" | "C" | "D"

export type PageId = "about" | "core" | "scope" | "techniques" | "quality"

export interface Direction {
  id: DirectionId
  name: string
  label: string
  description: string
}

export interface PageData {
  id: PageId
  englishName: string
  chineseName: string
  contentEyebrow: string
  contentTitle: string
  contentParagraphs: string[]
  image: string
  imageAlt: string
  /** CSS object-position for the banner photograph, e.g. "62% 40%". */
  bannerFocus: string
}
