import { mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const appRoot = path.resolve(import.meta.dirname, "..")
const sourceDir = path.join(appRoot, "assets", "source")
const publicDir = path.join(appRoot, "public", "assets")
const clientDir = path.join(publicDir, "client")
const bannerDir = path.join(publicDir, "banner-system")

await Promise.all([
  mkdir(clientDir, { recursive: true }),
  mkdir(bannerDir, { recursive: true }),
])

const source = (name) => path.join(sourceDir, `${name}.bin`)

// A few of the client's assets are SVG wrappers around a single full-size
// bitmap. Pulling that bitmap out gives us the native pixels — rasterising the
// wrapper would resample them for no reason.
const embedded = async (name) => {
  const svg = await readFile(source(name), "utf8")
  const match = svg.match(/base64,([A-Za-z0-9+/=]+)/)
  if (!match) throw new Error(`No embedded bitmap in ${name}`)
  return Buffer.from(match[1], "base64")
}

// `about-press` and `about-process` are two-photo collages with a visible seam
// running through them, so the content demo uses self-contained shots instead.
const contentAssets = [
  ["about-press", "app-equipment", "centre"],
  ["core-process", "app-machinery", "centre"],
  ["scope-material", "scope-material", "centre"],
  ["techniques-press", "core-techniques", "centre"],
  ["quality-inspection", "core-quality", "centre"],
]

for (const [output, input, position] of contentAssets) {
  await sharp(source(input), { density: 156 })
    .rotate()
    .resize(960, 720, {
      fit: "cover",
      position,
      kernel: sharp.kernel.lanczos3,
    })
    .webp({ quality: 86, effort: 5 })
    .toFile(path.join(clientDir, `${output}.webp`))
  console.log(`Created client/${output}.webp`)
}

// Banner photography: one treated crop per page, shared by all four directions.
// The crop stays monochrome and is exposed up to sit on the paper background so
// the page title always stays the darkest thing in the banner.
// `about` uses the 1920px press-shop photograph embedded in the client's own
// home-page hero — the only shot of the real factory at full resolution. Its
// top strip is a solid black vignette, so trim that before cropping.
const pressShop = await sharp(await embedded("home-philosophy"))
  .extract({ left: 0, top: 92, width: 1920, height: 500 })
  .png()
  .toBuffer()

const bannerPhotos = [
  ["about", pressShop, "centre"],
  ["core", source("core-process"), "centre"],
  ["scope", source("core-scope"), "centre"],
  ["techniques", source("core-techniques"), "right bottom"],
  ["quality", source("core-quality"), "centre"],
]

// Every banner photo lands in the same tonal window. Matching average brightness
// is the wrong target: pinning the mean high forces a contrasty photo's shadows
// up off the floor and clips its highlights, which is what left the first pass
// looking simultaneously washed out and blown. Anchoring the two ends instead
// gives the whole set one black point and one white point, and lets each photo
// keep its own distribution in between.
//
// WHITE sits a touch above the paper (#f4f3f0) so highlights read as lit metal
// rather than holes in the page; BLACK stays well off zero so the page title
// remains the darkest thing in the banner. MEAN keeps the overall weight of
// every banner equal — without it a dark workshop interior reads as a grey slab
// next to a bright studio shot even when their endpoints agree.
const BLACK = 100
const WHITE = 248
const MEAN = 198
// Where the set as a whole should sit for contrast. The close-ups reach this on
// their own; the wide workshop shot needs the S-curve below to get there.
const SPREAD = 32

// Steepens the middle of the range while pinning both ends, so contrast can be
// recovered without disturbing the shared black and white points. Monotonic for
// any strength up to 1/0.5 — the search below never goes near that.
const sCurve = (value, strength) =>
  value + strength * value * (1 - value) * (2 * value - 1)

// Solve the tone mapping for this photo: an S-curve strength that reaches the
// target contrast, and an exponent that puts the average on MEAN. Endpoints come
// from the window, weight from the exponent, contrast from the S-curve, and
// whatever is left over is the photograph's own character.
const toneMapping = (histogram, pixels) => {
  const targetMean = (MEAN - BLACK) / (WHITE - BLACK)
  const shaped = new Float64Array(256)

  const moments = (power) => {
    let sum = 0
    let sumSquares = 0
    for (let i = 0; i < 256; i += 1) {
      if (!histogram[i]) continue
      const value = shaped[i] ** power
      sum += histogram[i] * value
      sumSquares += histogram[i] * value * value
    }
    const mean = sum / pixels
    return { mean, stdev: Math.sqrt(Math.max(sumSquares / pixels - mean ** 2, 0)) }
  }

  const solvePower = () => {
    let low = 0.3
    let high = 3.2
    for (let step = 0; step < 40; step += 1) {
      const mid = (low + high) / 2
      // Larger exponents darken, so the search runs the other way round.
      if (moments(mid).mean > targetMean) low = mid
      else high = mid
    }
    return (low + high) / 2
  }

  // Search both directions: positive strengths steepen a hazy wide shot, and
  // negative ones settle a high-contrast studio close-up back down, so no single
  // page arrives louder or softer than the rest of the set.
  let best = null
  for (let candidate = -0.6; candidate <= 0.601; candidate += 0.05) {
    for (let i = 0; i < 256; i += 1) shaped[i] = sCurve(i / 255, candidate)
    const power = solvePower()
    const miss = Math.abs(moments(power).stdev * (WHITE - BLACK) - SPREAD)
    if (!best || miss < best.miss) best = { power, strength: candidate, miss }
  }

  return best
}

// Sized to what the layout actually paints: direction A is the widest frame at
// 46% of a 1920px page, so ~880 CSS px. Generating larger than this bought no
// sharpness, it only raised the upscale factor from the client's small originals.
const DESKTOP = [900, 600]
const MOBILE = [560, 420]

// A whisper of grain. Interpolated pixels are unnaturally smooth, and that
// smoothness is what reads as "low resolution"; a little texture reads as print.
const grain = (width, height, amount = 8) => {
  const pixels = Buffer.allocUnsafe(width * height)
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i] = 128 + Math.round((Math.random() * 2 - 1) * amount)
  }
  return sharp(pixels, { raw: { width, height, channels: 1 } }).png().toBuffer()
}

const toneBanner = async (input, [width, height], position) => {
  // Stretch each photo to the full range on its own 1st/99th percentiles, so a
  // hazy factory interior and a bright studio shot arrive with the same amount
  // of tone to give. Taken to raw bytes because the tone mapping below is a
  // lookup table, which sharp has no operator for.
  const stretched = await sharp(input, { density: 300 })
    .rotate()
    .resize(width, height, {
      fit: "cover",
      position,
      kernel: sharp.kernel.lanczos3,
    })
    .grayscale()
    .removeAlpha()
    // Pin the colourspace, or raw output comes back as RGB(A) and the histogram
    // below would count colour and alpha bytes as if they were pixels.
    .toColourspace("b-w")
    .normalise({ lower: 1, upper: 99 })
    .raw()
    .toBuffer()

  if (stretched.length !== width * height) {
    throw new Error(
      `Expected ${width * height} single-channel samples, got ${stretched.length}`,
    )
  }

  const histogram = new Float64Array(256)
  for (let i = 0; i < stretched.length; i += 1) histogram[stretched[i]] += 1

  const { power, strength } = toneMapping(histogram, stretched.length)
  const lut = new Uint8Array(256)
  for (let i = 0; i < 256; i += 1) {
    const shaped = sCurve(i / 255, strength) ** power
    lut[i] = Math.round(BLACK + (WHITE - BLACK) * shaped)
  }

  const toned = Buffer.allocUnsafe(stretched.length)
  for (let i = 0; i < stretched.length; i += 1) toned[i] = lut[stretched[i]]

  return sharp(toned, { raw: { width, height, channels: 1 } })
    .tint({ r: 229, g: 226, b: 220 })
    .sharpen({ sigma: 0.9, m1: 0.4, m2: 0.9 })
    .composite([{ input: await grain(width, height), blend: "overlay" }])
}

for (const [page, input, position] of bannerPhotos) {
  await (await toneBanner(input, DESKTOP, position))
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(bannerDir, `page-${page}.webp`))
  console.log(`Created banner-system/page-${page}.webp`)

  await (await toneBanner(input, MOBILE, position))
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(bannerDir, `page-${page}-mobile.webp`))
  console.log(`Created banner-system/page-${page}-mobile.webp`)
}

await sharp(source("inner-hero"))
  .resize(1920, 430, { fit: "cover", position: "centre" })
  .webp({ quality: 88, effort: 5 })
  .toFile(path.join(bannerDir, "original-banner.webp"))
console.log("Created banner-system/original-banner.webp")
