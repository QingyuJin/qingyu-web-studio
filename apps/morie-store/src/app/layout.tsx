import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { brand } from "@/data/brand";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.qingyuweb.com/demo/morie";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${brand.name}｜循著植物的緩慢時間`, template: `%s｜${brand.name}` },
  description: brand.description,
  keywords: ["MORIÉ", "植萃保養", "台灣保養品牌", "香氛", "植物配方"],
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.qingyuweb.com/works/ecommerce-platform-redesign" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: brand.name,
    title: `${brand.name}｜循著植物的緩慢時間`,
    description: brand.description,
    images: [{ url: "/og.png", width: 1730, height: 909, alt: "MORIÉ｜循著植物的緩慢時間" }],
  },
  twitter: { card: "summary_large_image", title: brand.name, description: brand.description, images: ["/og.png"] },
  icons: { icon: "/demo/morie/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#ece5d6", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body><script src="/demo/demo-analytics.js" data-demo="morie" defer /><SiteChrome>{children}</SiteChrome></body></html>;
}
