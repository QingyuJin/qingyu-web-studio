import sharp from "sharp"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")
const sourceDir = join(root, "src-assets")
const outputDir = join(root, "public", "images")

const images = [
  ["somme-beauty.png", "somme-beauty.webp"],
  ["xusuo-interior.png", "xusuo-interior.webp"],
  ["mur-pastry.png", "mur-pastry.webp"],
]

await mkdir(outputDir, { recursive: true })

await Promise.all(
  images.map(([source, output]) =>
    sharp(join(sourceDir, source))
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 88, smartSubsample: true })
      .toFile(join(outputDir, output)),
  ),
)

await sharp(join(sourceDir, "commercial-visual-og.png"))
  .resize(1200, 630, { fit: "cover", position: "center" })
  .png({ compressionLevel: 9 })
  .toFile(join(root, "public", "og.png"))

console.log(`Optimized ${images.length} campaign images and the social preview.`)
