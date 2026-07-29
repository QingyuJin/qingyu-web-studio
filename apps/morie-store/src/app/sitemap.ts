import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://morie-taiwan.vercel.app";
  const staticRoutes = ["", "/products", "/story", "/stores", "/journal"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .8 })),
    ...products.map((product) => ({ url: `${base}/products/${product.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 })),
    ...articles.map((article) => ({ url: `${base}/journal/${article.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .6 })),
  ];
}
