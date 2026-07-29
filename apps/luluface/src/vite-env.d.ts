/// <reference types="vite/client" />

interface ImportMetaEnv {
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
}
