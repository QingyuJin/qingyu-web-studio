import type { DirectionId, PageData, ViewMode } from "../types"
import { ClientHeader } from "./ClientHeader"
import { PageContent } from "./PageContent"
import { SubpageBanner } from "./SubpageBanner"

interface FullPagePreviewProps {
  direction: DirectionId
  page: PageData
  mode: ViewMode
}

export function FullPagePreview({ direction, page, mode }: FullPagePreviewProps) {
  return (
    <div className={`page-preview mode-${mode}`} id="preview-top">
      <ClientHeader />
      <SubpageBanner direction={direction} page={page} />
      <PageContent page={page} />
    </div>
  )
}
