import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { getPageMetadata, prerenderRoutes, render } from "../dist-server/entry-server.js"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputRoot = path.join(projectRoot, "dist")
const template = await readFile(path.join(outputRoot, "index.html"), "utf8")
const baseUrl = (process.env.VITE_LULUFACE_SITE_URL || "https://luluface.vercel.app").replace(
  /\/$/,
  ""
)
const allowIndexing = process.env.VITE_LULUFACE_ALLOW_INDEXING === "true"

if (!template.includes("<!-- luluface-static-meta:start -->")) {
  throw new Error("Static SEO marker is missing from dist/index.html")
}

if (!template.includes('<div id="root"></div>')) {
  throw new Error("Empty React root is missing from dist/index.html")
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function createMetaMarkup(meta) {
  const structuredData = meta.structuredData
    ? `<script id="luluface-structured-data" type="application/ld+json">${JSON.stringify(meta.structuredData).replaceAll("<", "\\u003c")}</script>`
    : ""

  return `<!-- luluface-static-meta:start -->
    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="robots" content="${escapeHtml(meta.robots)}" />
    <meta name="googlebot" content="${escapeHtml(meta.robots)}" />
    <link rel="canonical" href="${escapeHtml(meta.canonical)}" />
    <meta property="og:type" content="${escapeHtml(meta.ogType)}" />
    <meta property="og:site_name" content="LULUFACE 嚕嚕臉" />
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${escapeHtml(meta.canonical)}" />
    <meta property="og:image" content="${escapeHtml(meta.image)}" />
    <meta property="og:image:width" content="1600" />
    <meta property="og:image:height" content="1067" />
    <meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${escapeHtml(meta.image)}" />
    ${structuredData}
    <!-- luluface-static-meta:end -->`
}

function createHtml(route) {
  const meta = getPageMetadata(route, baseUrl, allowIndexing)
  const html = template
    .replace(
      /<!-- luluface-static-meta:start -->[\s\S]*?<!-- luluface-static-meta:end -->/,
      createMetaMarkup(meta)
    )
    .replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)

  if (!html.includes('<div id="root"><')) {
    throw new Error(`Prerendered markup was not inserted for ${route}`)
  }

  return html
}

for (const route of prerenderRoutes) {
  const destination =
    route === "/"
      ? path.join(outputRoot, "index.html")
      : path.join(outputRoot, route.replace(/^\//, ""), "index.html")
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, createHtml(route), "utf8")
}

await writeFile(path.join(outputRoot, "404.html"), createHtml("/404"), "utf8")

const robots = allowIndexing
  ? `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`
  : "User-agent: *\nDisallow: /\n"
await writeFile(path.join(outputRoot, "robots.txt"), robots, "utf8")

const sitemapUrls = prerenderRoutes
  .map((route) => `  <url><loc>${escapeHtml(new URL(route, `${baseUrl}/`).href)}</loc></url>`)
  .join("\n")
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`
await writeFile(path.join(outputRoot, "sitemap.xml"), sitemap, "utf8")
