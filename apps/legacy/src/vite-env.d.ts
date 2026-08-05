/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QINGYU_GA4_ID?: string
  readonly VITE_QINGYU_GOOGLE_ADS_ID?: string
  readonly VITE_QINGYU_GOOGLE_ADS_SEND_TO?: string
  readonly VITE_QINGYU_META_PIXEL_ID?: string
  readonly VITE_LULUFACE_SITE_URL?: string
  readonly VITE_LULUFACE_ALLOW_INDEXING?: string
  readonly VITE_LULUFACE_ANALYTICS_ENABLED?: string
  readonly VITE_LULUFACE_GA4_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void
    queue?: unknown[][]
    loaded?: boolean
    version?: string
  }
}
