import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.qingyuweb.com/demo/morie";
  return { rules: { userAgent: "*", disallow: "/" }, sitemap: `${base}/sitemap.xml` };
}
