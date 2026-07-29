import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const publicDir = path.join(projectDir, "public");
const sourceDir = path.join(publicDir, "campaigns", "sources");
const finalDir = path.join(publicDir, "campaigns", "final");
const processDir = path.join(publicDir, "campaigns", "process");

const assets = {
  beautyPhoto: path.join(publicDir, "images", "somme-beauty.webp"),
  interiorPhoto: path.join(publicDir, "images", "xusuo-interior.webp"),
  pastryPhoto: path.join(publicDir, "images", "mur-pastry.webp"),
  beautyCutout: path.join(sourceDir, "somme-products-cutout.png"),
  beautyChroma: path.join(sourceDir, "somme-products-chroma.png"),
  pastryCutout: path.join(sourceDir, "mur-packaging-cutout.png"),
  pastryChroma: path.join(sourceDir, "mur-packaging-chroma.png"),
};

const colors = {
  beauty: {
    paper: "#eee6da",
    cream: "#f7f1e8",
    sand: "#c7aa8d",
    cocoa: "#33261f",
    brown: "#72513e",
    line: "#a78d75",
  },
  interior: {
    ink: "#171715",
    warmBlack: "#211f1b",
    stone: "#b9b0a3",
    paper: "#eee9df",
    copper: "#a57a54",
  },
  pastry: {
    paper: "#f2e7d4",
    cream: "#fff5e6",
    cocoa: "#3a241d",
    caramel: "#ad7441",
    gold: "#c89c65",
    ink: "#261813",
  },
  ordo: {
    bone: "#eeeae0",
    paper: "#faf8f2",
    charcoal: "#252522",
    terracotta: "#b34931",
    rust: "#873521",
    sage: "#737d68",
    line: "#d1cbc0",
  },
};

const sans = `"Microsoft JhengHei","Noto Sans TC","PingFang TC",Arial,sans-serif`;
const serif = `"Noto Serif TC","Songti TC","PMingLiU","Times New Roman",serif`;
const latin = `"Helvetica Neue",Arial,sans-serif`;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svg(width, height, body) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <style>
        text { text-rendering: geometricPrecision; }
        .sans { font-family: ${sans}; }
        .serif { font-family: ${serif}; }
        .latin { font-family: ${latin}; }
      </style>
      ${body}
    </svg>`,
  );
}

function text({
  x,
  y,
  lines,
  size,
  fill,
  family = "sans",
  weight = 400,
  lineHeight = 1.25,
  anchor = "start",
  letterSpacing = 0,
  opacity = 1,
}) {
  const safeLines = Array.isArray(lines) ? lines : [lines];
  return `<text x="${x}" y="${y}" class="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${letterSpacing}" opacity="${opacity}">
    ${safeLines
      .map(
        (line, index) =>
          `<tspan x="${x}" dy="${index === 0 ? 0 : size * lineHeight}">${esc(line)}</tspan>`,
      )
      .join("")}
  </text>`;
}

function smallLabel({
  x,
  y,
  label,
  fill,
  stroke,
  textFill,
  width,
  height = 34,
  size = 13,
}) {
  return `<g>
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="1" fill="${fill}" stroke="${stroke}" stroke-width="1"/>
    ${text({
      x: x + width / 2,
      y: y + height * 0.67,
      lines: label,
      size,
      fill: textFill,
      family: "latin",
      weight: 600,
      anchor: "middle",
      letterSpacing: 1.4,
    })}
  </g>`;
}

async function cover(input, width, height, options = {}) {
  let image = sharp(input).resize(width, height, {
    fit: "cover",
    position: options.position ?? "centre",
  });
  if (options.modulate) image = image.modulate(options.modulate);
  if (options.tint) image = image.tint(options.tint);
  if (options.blur) image = image.blur(options.blur);
  return image.png().toBuffer();
}

async function contain(input, width, height) {
  return sharp(input)
    .resize(width, height, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function shadowFor(buffer, opacity = 0.34, blur = 22) {
  const metadata = await sharp(buffer).metadata();
  const alpha = await sharp(buffer)
    .ensureAlpha()
    .extractChannel("alpha")
    .blur(blur)
    .linear(opacity)
    .png()
    .toBuffer();
  return sharp({
    create: {
      width: metadata.width,
      height: metadata.height,
      channels: 3,
      background: { r: 39, g: 24, b: 16 },
    },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

async function writeCampaign(filename, width, height, background, composites) {
  const output = path.join(finalDir, filename);
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background,
    },
  })
    .composite(composites)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);
  return output;
}

async function renderBeautyDesktop() {
  const width = 1920;
  const height = 720;
  const photo = await cover(assets.beautyPhoto, 1030, 720, {
    position: "north",
    modulate: { brightness: 1.03, saturation: 0.72 },
  });
  const products = await contain(assets.beautyCutout, 440, 630);
  const productShadow = await shadowFor(products, 0.34, 26);

  const overlay = svg(
    width,
    height,
    `
      <rect width="${width}" height="${height}" fill="${colors.beauty.cream}"/>
      <rect x="60" y="52" width="780" height="616" fill="${colors.beauty.paper}"/>
      <circle cx="111" cy="676" r="255" fill="#d2b99f" opacity=".48"/>
      <path d="M864 0H1048L832 720H676Z" fill="${colors.beauty.sand}" opacity=".42"/>
      <rect x="895" y="0" width="1025" height="720" fill="none" stroke="#dacbbb"/>
      <rect x="1450" y="0" width="470" height="720" fill="#382c26" opacity=".23"/>
      <line x1="120" y1="154" x2="780" y2="154" stroke="${colors.beauty.line}" stroke-width="1"/>
      ${text({ x: 120, y: 110, lines: "SOMME", size: 48, fill: colors.beauty.cocoa, family: "latin", weight: 500, letterSpacing: 8 })}
      ${text({ x: 122, y: 139, lines: "SKIN STUDIO · TAIPEI", size: 12, fill: colors.beauty.brown, family: "latin", weight: 600, letterSpacing: 2.1 })}
      ${smallLabel({ x: 120, y: 194, label: "BARRIER REPAIR / 02", fill: colors.beauty.cocoa, stroke: colors.beauty.cocoa, textFill: "#fffaf3", width: 216 })}
      ${text({ x: 120, y: 310, lines: ["讓肌膚，", "回到最好的狀態"], size: 60, fill: colors.beauty.cocoa, family: "serif", lineHeight: 1.28 })}
      ${text({ x: 124, y: 476, lines: "專業肌膚管理 × 居家保養", size: 18, fill: colors.beauty.brown, family: "sans", weight: 600, letterSpacing: 1.3 })}
      ${text({ x: 124, y: 527, lines: ["神經醯胺 NP · Ectoin · Squalane", "穩定屏障精華 30 mL"], size: 14, fill: colors.beauty.brown, family: "sans", lineHeight: 1.8, letterSpacing: .6 })}
      <rect x="120" y="595" width="174" height="48" fill="${colors.beauty.cocoa}"/>
      ${text({ x: 207, y: 626, lines: "立即預約", size: 15, fill: "#fffaf3", family: "sans", weight: 700, anchor: "middle", letterSpacing: 1.2 })}
      ${text({ x: 325, y: 625, lines: "探索產品  →", size: 15, fill: colors.beauty.cocoa, family: "sans", weight: 700, letterSpacing: .8 })}
      <line x1="325" y1="641" x2="449" y2="641" stroke="${colors.beauty.cocoa}" stroke-width="1"/>
      ${text({ x: 1774, y: 664, lines: "NT$ 1,680", size: 22, fill: "#fffaf3", family: "latin", weight: 500, anchor: "end", letterSpacing: 1.2 })}
      ${text({ x: 1774, y: 692, lines: "ONLINE EXCLUSIVE · 2026", size: 11, fill: "#fffaf3", family: "latin", anchor: "end", letterSpacing: 1.8, opacity: .8 })}
      <ellipse cx="1444" cy="666" rx="230" ry="24" fill="#20140f" opacity=".27"/>
      <circle cx="1718" cy="110" r="54" fill="#efe4d6" opacity=".9"/>
      ${text({ x: 1718, y: 105, lines: ["02", "SERIES"], size: 12, fill: colors.beauty.cocoa, family: "latin", weight: 700, lineHeight: 1.45, anchor: "middle", letterSpacing: 1.6 })}
    `,
  );

  const productMark = svg(
    width,
    height,
    `
      ${text({ x: 1340, y: 486, lines: "SOMME", size: 17, fill: "#3b2b23", family: "latin", weight: 700, anchor: "middle", letterSpacing: 2.6 })}
      ${text({ x: 1340, y: 505, lines: "BARRIER SERUM", size: 7, fill: "#5c4639", family: "latin", anchor: "middle", letterSpacing: 1.2 })}
    `,
  );

  return writeCampaign("somme-desktop-1920x720.png", width, height, colors.beauty.cream, [
    { input: overlay, left: 0, top: 0 },
    { input: photo, left: 890, top: 0 },
    { input: svg(width, height, `<rect x="890" width="1030" height="720" fill="#6a4b3a" opacity=".07"/>`), left: 0, top: 0 },
    { input: productShadow, left: 1174, top: 134 },
    { input: products, left: 1158, top: 107 },
    { input: productMark, left: 0, top: 0 },
  ]);
}

async function renderBeautyMobile() {
  const width = 750;
  const height = 900;
  const photo = await cover(assets.beautyPhoto, 750, 530, {
    position: "north",
    modulate: { brightness: 1.05, saturation: 0.76 },
  });
  const products = await contain(assets.beautyCutout, 255, 390);
  const productShadow = await shadowFor(products, 0.34, 22);
  const overlay = svg(
    width,
    height,
    `
      <path d="M0 0H750V530H0Z" fill="#7d5b47" opacity=".05"/>
      <rect x="0" y="530" width="750" height="370" fill="${colors.beauty.paper}"/>
      <path d="M0 530H265L165 900H0Z" fill="#cbb297" opacity=".55"/>
      ${text({ x: 48, y: 65, lines: "SOMME", size: 38, fill: "#fffaf3", family: "latin", weight: 500, letterSpacing: 7 })}
      ${smallLabel({ x: 49, y: 100, label: "BARRIER REPAIR / 02", fill: "#30251f", stroke: "#30251f", textFill: "#fffaf3", width: 204, height: 32, size: 12 })}
      ${text({ x: 48, y: 249, lines: ["讓肌膚，", "回到最好的狀態"], size: 50, fill: "#fffaf3", family: "serif", lineHeight: 1.3 })}
      ${text({ x: 50, y: 388, lines: "專業肌膚管理 × 居家保養", size: 16, fill: "#fffaf3", family: "sans", weight: 600, letterSpacing: 1 })}
      <rect x="48" y="434" width="154" height="44" fill="#f3e7d9"/>
      ${text({ x: 125, y: 463, lines: "立即預約", size: 14, fill: colors.beauty.cocoa, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      ${text({ x: 46, y: 604, lines: ["神經醯胺 NP", "Ectoin · Squalane"], size: 14, fill: colors.beauty.brown, family: "sans", weight: 600, lineHeight: 1.7, letterSpacing: .5 })}
      ${text({ x: 47, y: 687, lines: "穩定屏障精華", size: 33, fill: colors.beauty.cocoa, family: "serif" })}
      ${text({ x: 49, y: 726, lines: "30 mL  /  NT$ 1,680", size: 14, fill: colors.beauty.brown, family: "latin", weight: 600, letterSpacing: 1.2 })}
      <line x1="48" y1="765" x2="286" y2="765" stroke="${colors.beauty.line}"/>
      ${text({ x: 49, y: 798, lines: "01  CALM  ·  02  REPAIR  ·  03  GLOW", size: 11, fill: colors.beauty.brown, family: "latin", weight: 600, letterSpacing: 1.1 })}
      <ellipse cx="560" cy="857" rx="143" ry="17" fill="#39241c" opacity=".24"/>
      ${text({ x: 694, y: 862, lines: "ONLINE EXCLUSIVE", size: 10, fill: colors.beauty.brown, family: "latin", anchor: "end", letterSpacing: 1.4 })}
    `,
  );
  const productMark = svg(
    width,
    height,
    `${text({ x: 554, y: 700, lines: "SOMME", size: 13, fill: "#3b2b23", family: "latin", weight: 700, anchor: "middle", letterSpacing: 2 })}`,
  );
  return writeCampaign("somme-mobile-750x900.png", width, height, colors.beauty.cream, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: productShadow, left: 425, top: 510 },
    { input: products, left: 412, top: 490 },
    { input: productMark, left: 0, top: 0 },
  ]);
}

async function renderBeautySquare() {
  const width = 1080;
  const height = 1080;
  const photo = await cover(assets.beautyPhoto, 650, 1080, {
    position: "north",
    modulate: { brightness: 1.04, saturation: 0.72 },
  });
  const products = await contain(assets.beautyCutout, 390, 600);
  const productShadow = await shadowFor(products, 0.36, 28);
  const overlay = svg(
    width,
    height,
    `
      <rect x="0" width="640" height="1080" fill="${colors.beauty.paper}"/>
      <rect x="640" width="440" height="1080" fill="${colors.beauty.cocoa}" opacity=".68"/>
      <circle cx="198" cy="940" r="245" fill="#ceb599" opacity=".56"/>
      ${text({ x: 68, y: 90, lines: "SOMME", size: 43, fill: colors.beauty.cocoa, family: "latin", weight: 500, letterSpacing: 8 })}
      ${text({ x: 70, y: 125, lines: "SKIN STUDIO · TAIPEI", size: 12, fill: colors.beauty.brown, family: "latin", weight: 600, letterSpacing: 2 })}
      ${smallLabel({ x: 70, y: 184, label: "NEW / BARRIER REPAIR 02", fill: colors.beauty.cocoa, stroke: colors.beauty.cocoa, textFill: "#fffaf3", width: 249, height: 36 })}
      ${text({ x: 70, y: 342, lines: ["穩定，", "才是肌膚真正的光。"], size: 53, fill: colors.beauty.cocoa, family: "serif", lineHeight: 1.3 })}
      ${text({ x: 72, y: 505, lines: ["神經醯胺 NP × Ectoin", "穩定屏障精華 30 mL"], size: 16, fill: colors.beauty.brown, family: "sans", lineHeight: 1.8, letterSpacing: .8 })}
      <rect x="70" y="585" width="190" height="50" fill="${colors.beauty.cocoa}"/>
      ${text({ x: 165, y: 618, lines: "探索產品", size: 15, fill: "#fffaf3", family: "sans", weight: 700, anchor: "middle", letterSpacing: 1.2 })}
      ${text({ x: 70, y: 1007, lines: "NT$ 1,680", size: 28, fill: colors.beauty.cocoa, family: "latin", weight: 500, letterSpacing: 1.3 })}
      ${text({ x: 1008, y: 1010, lines: ["02", "SERIES"], size: 13, fill: "#fffaf3", family: "latin", weight: 700, lineHeight: 1.5, anchor: "end", letterSpacing: 1.5 })}
      <ellipse cx="741" cy="987" rx="190" ry="25" fill="#1a100d" opacity=".32"/>
    `,
  );
  const productMark = svg(
    width,
    height,
    `${text({ x: 730, y: 735, lines: "SOMME", size: 16, fill: "#3b2b23", family: "latin", weight: 700, anchor: "middle", letterSpacing: 2.5 })}`,
  );
  return writeCampaign("somme-social-1080x1080.png", width, height, colors.beauty.paper, [
    { input: photo, left: 430, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: productShadow, left: 548, top: 424 },
    { input: products, left: 530, top: 395 },
    { input: productMark, left: 0, top: 0 },
  ]);
}

function floorPlanSvg(width, height, x, y, scale, color, opacity = 1) {
  const s = scale;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${1.5 / s}" opacity="${opacity}">
    <path d="M0 0H310V220H0Z M112 0V92H0 M112 92H202V220 M202 92H310 M250 92V148H310"/>
    <path d="M18 18H94V74H18Z M220 18H292V74H220Z M220 111H292V202H220Z"/>
    <path d="M111 48A44 44 0 0 0 155 92 M202 132A40 40 0 0 1 242 92"/>
    <line x1="0" y1="-20" x2="310" y2="-20"/>
    <line x1="0" y1="-26" x2="0" y2="-14"/>
    <line x1="310" y1="-26" x2="310" y2="-14"/>
  </g>`;
}

async function renderInteriorDesktop() {
  const width = 1920;
  const height = 720;
  const photo = await cover(assets.interiorPhoto, width, height, {
    position: "centre",
    modulate: { brightness: 1.1, saturation: 0.72 },
  });
  const overlay = svg(
    width,
    height,
    `
      <defs>
        <linearGradient id="shade" x1="0" x2="1">
          <stop offset="0" stop-color="#141311" stop-opacity=".92"/>
          <stop offset=".38" stop-color="#141311" stop-opacity=".54"/>
          <stop offset=".62" stop-color="#141311" stop-opacity=".05"/>
          <stop offset="1" stop-color="#141311" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#shade)"/>
      <rect x="55" y="46" width="1810" height="628" fill="none" stroke="#e8e0d3" stroke-opacity=".45"/>
      ${text({ x: 92, y: 102, lines: "序所", size: 46, fill: colors.interior.paper, family: "serif", weight: 500, letterSpacing: 4 })}
      ${text({ x: 214, y: 98, lines: "XU SUO INTERIOR ARCHITECTURE", size: 12, fill: colors.interior.paper, family: "latin", weight: 600, letterSpacing: 2 })}
      ${smallLabel({ x: 92, y: 156, label: "RESIDENCE / 08", fill: "#ece6dc", stroke: "#ece6dc", textFill: colors.interior.ink, width: 176 })}
      ${text({ x: 92, y: 310, lines: ["讓空間，", "成為生活的一部分"], size: 60, fill: colors.interior.paper, family: "serif", lineHeight: 1.3 })}
      ${text({ x: 95, y: 484, lines: "住宅設計｜老屋翻新｜商業空間", size: 17, fill: colors.interior.paper, family: "sans", weight: 600, letterSpacing: 1.1 })}
      ${text({ x: 95, y: 532, lines: ["台北・大安  38 坪", "深色橡木／石灰牆／洞石地坪"], size: 13, fill: colors.interior.paper, family: "sans", lineHeight: 1.8, letterSpacing: .8, opacity: .86 })}
      <rect x="93" y="594" width="154" height="43" fill="${colors.interior.paper}"/>
      ${text({ x: 170, y: 622, lines: "查看案例", size: 14, fill: colors.interior.ink, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      <g transform="translate(1410 90)">
        <rect x="0" y="0" width="382" height="308" fill="${colors.interior.warmBlack}" fill-opacity=".68" stroke="#eee8de" stroke-opacity=".35"/>
        ${floorPlanSvg(width, height, 34, 54, 1, colors.interior.paper, .86)}
        ${text({ x: 34, y: 288, lines: "PLAN 01 / PUBLIC ZONE", size: 11, fill: colors.interior.paper, family: "latin", letterSpacing: 1.8 })}
      </g>
      <g transform="translate(1412 438)">
        <rect width="94" height="122" fill="#4c4035"/>
        <rect x="110" width="94" height="122" fill="#b8aa96"/>
        <rect x="220" width="94" height="122" fill="#8a8175"/>
        ${text({ x: 7, y: 145, lines: "M01  煙燻橡木", size: 11, fill: colors.interior.paper, family: "sans", letterSpacing: .8 })}
        ${text({ x: 117, y: 145, lines: "M02  石灰塗料", size: 11, fill: colors.interior.paper, family: "sans", letterSpacing: .8 })}
        ${text({ x: 227, y: 145, lines: "M03  洞石地坪", size: 11, fill: colors.interior.paper, family: "sans", letterSpacing: .8 })}
      </g>
      ${text({ x: 1826, y: 642, lines: "PRIVATE RESIDENCE · TAIPEI · 2026", size: 11, fill: colors.interior.paper, family: "latin", anchor: "end", letterSpacing: 1.8 })}
    `,
  );
  return writeCampaign("xusuo-desktop-1920x720.png", width, height, colors.interior.ink, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ]);
}

async function renderInteriorMobile() {
  const width = 750;
  const height = 900;
  const photo = await cover(assets.interiorPhoto, 750, 900, {
    position: "east",
    modulate: { brightness: 1.12, saturation: 0.7 },
  });
  const overlay = svg(
    width,
    height,
    `
      <defs>
        <linearGradient id="mobileShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#141311" stop-opacity=".64"/>
          <stop offset=".5" stop-color="#141311" stop-opacity=".05"/>
          <stop offset="1" stop-color="#141311" stop-opacity=".76"/>
        </linearGradient>
      </defs>
      <rect width="750" height="900" fill="url(#mobileShade)"/>
      <rect x="32" y="32" width="686" height="836" fill="none" stroke="${colors.interior.paper}" stroke-opacity=".45"/>
      ${text({ x: 55, y: 86, lines: "序所", size: 39, fill: colors.interior.paper, family: "serif", letterSpacing: 3 })}
      ${text({ x: 55, y: 120, lines: "RESIDENCE / 08 · TAIPEI", size: 11, fill: colors.interior.paper, family: "latin", weight: 600, letterSpacing: 1.8 })}
      <g transform="translate(382 80)">
        <rect width="298" height="246" fill="#171715" fill-opacity=".67" stroke="#eee9df" stroke-opacity=".35"/>
        ${floorPlanSvg(width, height, 24, 48, .78, colors.interior.paper, .86)}
      </g>
      ${text({ x: 56, y: 568, lines: ["讓空間，", "成為生活的一部分"], size: 49, fill: colors.interior.paper, family: "serif", lineHeight: 1.32 })}
      ${text({ x: 58, y: 711, lines: "住宅設計｜老屋翻新｜商業空間", size: 15, fill: colors.interior.paper, family: "sans", weight: 600, letterSpacing: .8 })}
      <rect x="56" y="760" width="160" height="44" fill="${colors.interior.paper}"/>
      ${text({ x: 136, y: 789, lines: "查看案例", size: 14, fill: colors.interior.ink, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      <g transform="translate(484 748)">
        <rect width="52" height="52" fill="#4c4035"/>
        <rect x="62" width="52" height="52" fill="#b8aa96"/>
        <rect x="124" width="52" height="52" fill="#8a8175"/>
        ${text({ x: 0, y: 75, lines: "M01   M02   M03", size: 10, fill: colors.interior.paper, family: "latin", letterSpacing: 1.3 })}
      </g>
      ${text({ x: 690, y: 847, lines: "38 PING · 2026", size: 10, fill: colors.interior.paper, family: "latin", anchor: "end", letterSpacing: 1.6 })}
    `,
  );
  return writeCampaign("xusuo-mobile-750x900.png", width, height, colors.interior.ink, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ]);
}

async function renderInteriorSquare() {
  const width = 1080;
  const height = 1080;
  const photo = await cover(assets.interiorPhoto, 1080, 650, {
    position: "centre",
    modulate: { brightness: 1.11, saturation: 0.72 },
  });
  const overlay = svg(
    width,
    height,
    `
      <rect width="1080" height="650" fill="${colors.interior.warmBlack}" opacity=".38"/>
      <rect x="0" y="650" width="1080" height="430" fill="${colors.interior.paper}"/>
      <rect x="46" y="44" width="988" height="592" fill="none" stroke="${colors.interior.paper}" stroke-opacity=".48"/>
      ${text({ x: 74, y: 104, lines: "序所", size: 42, fill: colors.interior.paper, family: "serif", letterSpacing: 4 })}
      ${text({ x: 74, y: 137, lines: "XU SUO / RESIDENCE 08", size: 11, fill: colors.interior.paper, family: "latin", weight: 600, letterSpacing: 1.8 })}
      <g transform="translate(675 78)">
        <rect width="310" height="250" fill="#171715" fill-opacity=".7" stroke="#eee9df" stroke-opacity=".38"/>
        ${floorPlanSvg(width, height, 25, 47, .78, colors.interior.paper, .88)}
      </g>
      ${text({ x: 72, y: 747, lines: ["光線進來，", "生活才有了時間。"], size: 50, fill: colors.interior.ink, family: "serif", lineHeight: 1.28 })}
      ${text({ x: 74, y: 900, lines: ["台北・大安  38 坪", "深色橡木／石灰牆／洞石地坪"], size: 15, fill: "#5f574e", family: "sans", lineHeight: 1.8, letterSpacing: .7 })}
      <g transform="translate(715 742)">
        <rect width="84" height="108" fill="#4c4035"/>
        <rect x="94" width="84" height="108" fill="#b8aa96"/>
        <rect x="188" width="84" height="108" fill="#8a8175"/>
        ${text({ x: 0, y: 135, lines: "M01", size: 10, fill: colors.interior.ink, family: "latin", letterSpacing: 1 })}
        ${text({ x: 94, y: 135, lines: "M02", size: 10, fill: colors.interior.ink, family: "latin", letterSpacing: 1 })}
        ${text({ x: 188, y: 135, lines: "M03", size: 10, fill: colors.interior.ink, family: "latin", letterSpacing: 1 })}
      </g>
      <rect x="74" y="995" width="170" height="43" fill="${colors.interior.ink}"/>
      ${text({ x: 159, y: 1023, lines: "查看完整案例", size: 13, fill: colors.interior.paper, family: "sans", weight: 700, anchor: "middle", letterSpacing: .8 })}
      ${text({ x: 1004, y: 1024, lines: "PRIVATE RESIDENCE · 2026", size: 10, fill: colors.interior.ink, family: "latin", anchor: "end", letterSpacing: 1.5 })}
    `,
  );
  return writeCampaign("xusuo-social-1080x1080.png", width, height, colors.interior.warmBlack, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
  ]);
}

async function renderPastryDesktop() {
  const width = 1920;
  const height = 720;
  const photo = await cover(assets.pastryPhoto, 1040, 720, {
    position: "west",
    modulate: { brightness: 0.93, saturation: 0.84 },
  });
  const packaging = await contain(assets.pastryCutout, 625, 530);
  const packagingShadow = await shadowFor(packaging, 0.4, 24);
  const overlay = svg(
    width,
    height,
    `
      <rect x="1040" width="880" height="720" fill="${colors.pastry.cream}"/>
      <rect x="0" width="1040" height="720" fill="#301b14" opacity=".17"/>
      <path d="M1039 0H1235L1085 720H938Z" fill="${colors.pastry.caramel}" opacity=".28"/>
      ${text({ x: 90, y: 91, lines: "MÛR", size: 48, fill: "#fff4e6", family: "serif", weight: 600, letterSpacing: 7 })}
      ${text({ x: 91, y: 124, lines: "HAND-FINISHED PÂTISSERIE", size: 11, fill: "#fff4e6", family: "latin", weight: 600, letterSpacing: 1.9 })}
      ${smallLabel({ x: 91, y: 172, label: "AUTUMN EDITION / NEW", fill: "#fff1de", stroke: "#fff1de", textFill: colors.pastry.cocoa, width: 220 })}
      ${text({ x: 90, y: 310, lines: ["每天，", "都值得一點好的"], size: 61, fill: "#fff5e9", family: "serif", lineHeight: 1.28 })}
      ${text({ x: 93, y: 480, lines: "焦糖榛果千層｜法國發酵奶油 × 雲林榛果", size: 16, fill: "#fff5e9", family: "sans", weight: 600, letterSpacing: .7 })}
      ${text({ x: 94, y: 523, lines: "期間限定 08.20 — 10.31", size: 13, fill: "#fff5e9", family: "latin", weight: 600, letterSpacing: 1.4 })}
      <rect x="92" y="574" width="156" height="46" fill="#fff1de"/>
      ${text({ x: 170, y: 604, lines: "立即訂購", size: 14, fill: colors.pastry.cocoa, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      ${text({ x: 1815, y: 95, lines: "NEW / 01", size: 12, fill: colors.pastry.cocoa, family: "latin", weight: 700, anchor: "end", letterSpacing: 2 })}
      ${text({ x: 1815, y: 152, lines: ["焦糖榛果千層", "6 入禮盒"], size: 27, fill: colors.pastry.ink, family: "serif", weight: 500, anchor: "end", lineHeight: 1.35 })}
      ${text({ x: 1815, y: 248, lines: "NT$ 1,280", size: 25, fill: colors.pastry.cocoa, family: "latin", weight: 600, anchor: "end", letterSpacing: 1.5 })}
      <ellipse cx="1482" cy="660" rx="330" ry="31" fill="#5c3828" opacity=".24"/>
      <circle cx="1552" cy="333" r="65" fill="${colors.pastry.cocoa}"/>
      ${text({ x: 1552, y: 326, lines: ["MÛR", "熟成菓製"], size: 15, fill: colors.pastry.cream, family: "serif", weight: 700, anchor: "middle", lineHeight: 1.45, letterSpacing: 1.5 })}
      <line x1="1120" y1="310" x2="1817" y2="310" stroke="${colors.pastry.gold}" stroke-width="1"/>
      ${text({ x: 1120, y: 344, lines: "ROASTED HAZELNUT · CULTURED BUTTER · CARAMEL", size: 10, fill: colors.pastry.cocoa, family: "latin", letterSpacing: 1.5 })}
    `,
  );
  return writeCampaign("mur-desktop-1920x720.png", width, height, colors.pastry.paper, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: packagingShadow, left: 1122, top: 180 },
    { input: packaging, left: 1106, top: 154 },
  ]);
}

async function renderPastryMobile() {
  const width = 750;
  const height = 900;
  const photo = await cover(assets.pastryPhoto, 750, 490, {
    position: "west",
    modulate: { brightness: 0.92, saturation: 0.86 },
  });
  const packaging = await contain(assets.pastryCutout, 470, 365);
  const packagingShadow = await shadowFor(packaging, 0.42, 22);
  const overlay = svg(
    width,
    height,
    `
      <rect x="0" y="0" width="750" height="490" fill="#2c1812" opacity=".18"/>
      ${text({ x: 46, y: 64, lines: "MÛR", size: 40, fill: "#fff4e6", family: "serif", weight: 600, letterSpacing: 6 })}
      ${text({ x: 48, y: 96, lines: "AUTUMN EDITION · NEW", size: 11, fill: "#fff4e6", family: "latin", weight: 600, letterSpacing: 1.8 })}
      ${text({ x: 47, y: 258, lines: ["每天，", "都值得一點好的"], size: 49, fill: "#fff5e9", family: "serif", lineHeight: 1.3 })}
      ${text({ x: 48, y: 399, lines: "焦糖榛果千層", size: 17, fill: "#fff5e9", family: "sans", weight: 700, letterSpacing: 1 })}
      ${text({ x: 49, y: 431, lines: "08.20 — 10.31 期間限定", size: 12, fill: "#fff5e9", family: "latin", weight: 600, letterSpacing: 1.2 })}
      <path d="M0 490H750V900H0Z" fill="${colors.pastry.paper}"/>
      <path d="M0 490H180L55 900H0Z" fill="#d9bd95" opacity=".52"/>
      ${smallLabel({ x: 47, y: 531, label: "NEW / 6 PIECES", fill: colors.pastry.cocoa, stroke: colors.pastry.cocoa, textFill: colors.pastry.cream, width: 174, height: 34, size: 12 })}
      ${text({ x: 48, y: 617, lines: ["法國發酵奶油", "雲林榛果 · 手工焦糖"], size: 15, fill: colors.pastry.cocoa, family: "sans", lineHeight: 1.75, letterSpacing: .5 })}
      ${text({ x: 48, y: 722, lines: "NT$ 1,280", size: 28, fill: colors.pastry.ink, family: "latin", weight: 600, letterSpacing: 1.4 })}
      <rect x="48" y="766" width="158" height="46" fill="${colors.pastry.cocoa}"/>
      ${text({ x: 127, y: 796, lines: "立即訂購", size: 14, fill: colors.pastry.cream, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      <ellipse cx="516" cy="846" rx="208" ry="24" fill="#5c3828" opacity=".25"/>
      <circle cx="531" cy="666" r="55" fill="${colors.pastry.cocoa}"/>
      ${text({ x: 531, y: 662, lines: ["MÛR", "熟成菓製"], size: 12, fill: colors.pastry.cream, family: "serif", weight: 700, anchor: "middle", lineHeight: 1.4, letterSpacing: 1.1 })}
      ${text({ x: 699, y: 866, lines: "HAND-FINISHED IN TAIWAN", size: 10, fill: colors.pastry.cocoa, family: "latin", anchor: "end", letterSpacing: 1.4 })}
    `,
  );
  return writeCampaign("mur-mobile-750x900.png", width, height, colors.pastry.paper, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: packagingShadow, left: 294, top: 515 },
    { input: packaging, left: 282, top: 497 },
  ]);
}

async function renderPastrySquare() {
  const width = 1080;
  const height = 1080;
  const photo = await cover(assets.pastryPhoto, 1080, 1080, {
    position: "west",
    modulate: { brightness: 0.82, saturation: 0.86 },
  });
  const packaging = await contain(assets.pastryCutout, 560, 455);
  const packagingShadow = await shadowFor(packaging, 0.45, 26);
  const overlay = svg(
    width,
    height,
    `
      <defs>
        <linearGradient id="pastryShade" x1="0" x2="1">
          <stop offset="0" stop-color="#25140f" stop-opacity=".78"/>
          <stop offset=".55" stop-color="#25140f" stop-opacity=".12"/>
          <stop offset="1" stop-color="#25140f" stop-opacity=".47"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#pastryShade)"/>
      <rect x="43" y="43" width="994" height="994" fill="none" stroke="#f9ead7" stroke-opacity=".47"/>
      ${text({ x: 73, y: 112, lines: "MÛR", size: 48, fill: "#fff2e1", family: "serif", weight: 600, letterSpacing: 7 })}
      ${smallLabel({ x: 73, y: 151, label: "NEW / AUTUMN EDITION", fill: "#fff0dc", stroke: "#fff0dc", textFill: colors.pastry.cocoa, width: 227, height: 35 })}
      ${text({ x: 72, y: 332, lines: ["焦糖榛果千層", "期間限定上市"], size: 52, fill: "#fff5e9", family: "serif", lineHeight: 1.3 })}
      ${text({ x: 74, y: 477, lines: "法國發酵奶油 × 雲林榛果", size: 16, fill: "#fff5e9", family: "sans", weight: 600, letterSpacing: .8 })}
      ${text({ x: 74, y: 523, lines: "08.20 — 10.31", size: 13, fill: "#fff5e9", family: "latin", weight: 600, letterSpacing: 1.6 })}
      <path d="M510 580H1037V1037H386Z" fill="${colors.pastry.paper}" opacity=".96"/>
      <ellipse cx="736" cy="974" rx="250" ry="29" fill="#4a2c20" opacity=".29"/>
      <circle cx="812" cy="662" r="62" fill="${colors.pastry.cocoa}"/>
      ${text({ x: 812, y: 656, lines: ["MÛR", "熟成菓製"], size: 14, fill: colors.pastry.cream, family: "serif", weight: 700, anchor: "middle", lineHeight: 1.45, letterSpacing: 1.2 })}
      ${text({ x: 73, y: 968, lines: "NT$ 1,280", size: 28, fill: "#fff5e9", family: "latin", weight: 600, letterSpacing: 1.4 })}
      <rect x="73" y="986" width="160" height="43" fill="#fff0dc"/>
      ${text({ x: 153, y: 1014, lines: "立即訂購", size: 14, fill: colors.pastry.cocoa, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      ${text({ x: 995, y: 1002, lines: "6 PIECES / GIFT BOX", size: 11, fill: colors.pastry.cocoa, family: "latin", anchor: "end", letterSpacing: 1.5 })}
    `,
  );
  return writeCampaign("mur-social-1080x1080.png", width, height, colors.pastry.cocoa, [
    { input: photo, left: 0, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: packagingShadow, left: 474, top: 595 },
    { input: packaging, left: 460, top: 572 },
  ]);
}

function uiDashboard(width, height, x, y, scale = 1) {
  const w = 820;
  const h = 420;
  const s = scale;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect width="${w}" height="${h}" rx="5" fill="#fbfaf6" stroke="#d3cec5" stroke-width="1"/>
    <rect width="72" height="${h}" fill="#262622"/>
    <text x="36" y="40" class="latin" fill="#f5f0e7" font-size="18" font-weight="700" text-anchor="middle">O</text>
    <circle cx="36" cy="92" r="4" fill="#b34931"/>
    <circle cx="36" cy="130" r="4" fill="#77756f"/>
    <circle cx="36" cy="168" r="4" fill="#77756f"/>
    <rect x="72" width="${w - 72}" height="66" fill="#f4f1e9"/>
    ${text({ x: 102, y: 31, lines: "營運工作台", size: 15, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
    ${text({ x: 102, y: 50, lines: "7 月 28 日・星期二", size: 9, fill: "#807a71", family: "sans" })}
    <rect x="692" y="18" width="100" height="31" fill="#b34931"/>
    ${text({ x: 742, y: 39, lines: "＋ 建立工作", size: 10, fill: "#fffaf2", family: "sans", weight: 700, anchor: "middle" })}
    <g transform="translate(102 94)">
      <rect width="205" height="78" fill="#f7f4ec" stroke="#d8d2c8"/>
      <rect x="213" width="205" height="78" fill="#f7f4ec" stroke="#d8d2c8"/>
      <rect x="426" width="205" height="78" fill="#f7f4ec" stroke="#d8d2c8"/>
      ${text({ x: 18, y: 26, lines: "01  新進訂單", size: 10, fill: "#756f66", family: "sans" })}
      ${text({ x: 181, y: 53, lines: "12", size: 24, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
      ${text({ x: 231, y: 26, lines: "02  製作確認", size: 10, fill: "#756f66", family: "sans" })}
      ${text({ x: 394, y: 53, lines: "08", size: 24, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
      ${text({ x: 444, y: 26, lines: "03  待交付", size: 10, fill: "#756f66", family: "sans" })}
      ${text({ x: 607, y: 53, lines: "05", size: 24, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
    </g>
    <g transform="translate(102 206)">
      ${text({ x: 0, y: 0, lines: "工作編號", size: 9, fill: "#8e877d", family: "sans" })}
      ${text({ x: 185, y: 0, lines: "客戶", size: 9, fill: "#8e877d", family: "sans" })}
      ${text({ x: 355, y: 0, lines: "目前階段", size: 9, fill: "#8e877d", family: "sans" })}
      ${text({ x: 535, y: 0, lines: "下一步", size: 9, fill: "#8e877d", family: "sans" })}
      <line x1="0" y1="18" x2="632" y2="18" stroke="#dad5cd"/>
      ${text({ x: 0, y: 53, lines: "SO-0728-042", size: 11, fill: colors.ordo.charcoal, family: "latin" })}
      ${text({ x: 185, y: 53, lines: "亦然選物", size: 11, fill: colors.ordo.charcoal, family: "sans" })}
      <rect x="355" y="31" width="82" height="31" fill="#efe2dd"/>
      ${text({ x: 396, y: 52, lines: "包裝確認", size: 10, fill: colors.ordo.rust, family: "sans", anchor: "middle" })}
      ${text({ x: 535, y: 53, lines: "今天 16:30", size: 11, fill: colors.ordo.charcoal, family: "sans" })}
      <line x1="0" y1="77" x2="632" y2="77" stroke="#e1ddd5"/>
      ${text({ x: 0, y: 112, lines: "SO-0728-041", size: 11, fill: colors.ordo.charcoal, family: "latin" })}
      ${text({ x: 185, y: 112, lines: "沐山餐飲", size: 11, fill: colors.ordo.charcoal, family: "sans" })}
      <rect x="355" y="90" width="100" height="31" fill="#efe2dd"/>
      ${text({ x: 405, y: 111, lines: "待客戶回覆", size: 10, fill: colors.ordo.rust, family: "sans", anchor: "middle" })}
      ${text({ x: 535, y: 112, lines: "明天 10:00", size: 11, fill: colors.ordo.charcoal, family: "sans" })}
    </g>
    <rect x="102" y="362" width="632" height="1" fill="#d8d2c8"/>
    ${text({ x: 102, y: 392, lines: "待處理 07    本週交付 14", size: 9, fill: "#817b72", family: "sans", letterSpacing: .6 })}
    <circle cx="711" cy="389" r="4" fill="#737d68"/>
    ${text({ x: 723, y: 392, lines: "系統同步完成", size: 9, fill: "#817b72", family: "sans" })}
  </g>`;
}

function phoneSummary(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect width="330" height="560" rx="36" fill="#1f201d"/>
    <rect x="12" y="12" width="306" height="536" rx="27" fill="#f7f4ec"/>
    <rect x="123" y="24" width="84" height="8" rx="4" fill="#2b2b28"/>
    ${text({ x: 34, y: 76, lines: "ORDO", size: 24, fill: colors.ordo.charcoal, family: "latin", weight: 800, letterSpacing: -1 })}
    ${text({ x: 34, y: 112, lines: "今日營運摘要", size: 14, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
    ${text({ x: 292, y: 111, lines: "07 / 28", size: 10, fill: "#807a71", family: "latin", anchor: "end", letterSpacing: 1 })}
    <line x1="34" y1="132" x2="294" y2="132" stroke="#d3cec5"/>
    <g transform="translate(34 158)">
      ${text({ x: 0, y: 0, lines: "新進訂單", size: 10, fill: "#807a71", family: "sans" })}
      ${text({ x: 0, y: 42, lines: "12", size: 30, fill: colors.ordo.charcoal, family: "latin" })}
      ${text({ x: 92, y: 0, lines: "待確認", size: 10, fill: "#807a71", family: "sans" })}
      ${text({ x: 92, y: 42, lines: "08", size: 30, fill: colors.ordo.charcoal, family: "latin" })}
      ${text({ x: 184, y: 0, lines: "本週交付", size: 10, fill: "#807a71", family: "sans" })}
      ${text({ x: 184, y: 42, lines: "05", size: 30, fill: colors.ordo.charcoal, family: "latin" })}
    </g>
    <rect x="34" y="235" width="260" height="108" fill="#fffdfa" stroke="#d3cec5"/>
    ${text({ x: 52, y: 263, lines: "下一步", size: 9, fill: colors.ordo.terracotta, family: "sans", weight: 700 })}
    ${text({ x: 52, y: 297, lines: "沐山餐飲", size: 15, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
    ${text({ x: 52, y: 321, lines: "回覆包裝規格・今天 16:30", size: 9, fill: "#817b72", family: "sans" })}
    <circle cx="267" cy="291" r="18" fill="#b34931"/>
    ${text({ x: 267, y: 298, lines: "→", size: 17, fill: "#fffaf2", family: "latin", anchor: "middle" })}
    ${text({ x: 34, y: 393, lines: "進行中工作", size: 11, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
    <line x1="34" y1="410" x2="294" y2="410" stroke="#d3cec5"/>
    ${text({ x: 34, y: 444, lines: "亦然選物", size: 12, fill: colors.ordo.charcoal, family: "sans" })}
    ${text({ x: 294, y: 444, lines: "包裝確認", size: 10, fill: colors.ordo.terracotta, family: "sans", anchor: "end" })}
    <line x1="34" y1="463" x2="294" y2="463" stroke="#e1ddd5"/>
    ${text({ x: 34, y: 497, lines: "晴禾選品", size: 12, fill: colors.ordo.charcoal, family: "sans" })}
    ${text({ x: 294, y: 497, lines: "排程確認", size: 10, fill: colors.ordo.terracotta, family: "sans", anchor: "end" })}
  </g>`;
}

async function renderOrdoDesktop() {
  const width = 1920;
  const height = 720;
  const overlay = svg(
    width,
    height,
    `
      <rect width="1920" height="720" fill="${colors.ordo.bone}"/>
      <rect x="0" y="0" width="710" height="720" fill="${colors.ordo.charcoal}"/>
      <rect x="710" y="0" width="1210" height="720" fill="${colors.ordo.terracotta}"/>
      <circle cx="1700" cy="78" r="210" fill="none" stroke="#efe9df" stroke-opacity=".18" stroke-width="2"/>
      <circle cx="1700" cy="78" r="118" fill="none" stroke="#efe9df" stroke-opacity=".18" stroke-width="2"/>
      ${text({ x: 84, y: 101, lines: "ORDO", size: 54, fill: colors.ordo.bone, family: "latin", weight: 800, letterSpacing: -2 })}
      ${text({ x: 86, y: 132, lines: "OPERATIONS, IN ORDER.", size: 10, fill: "#d9d5cc", family: "latin", weight: 600, letterSpacing: 1.7 })}
      ${smallLabel({ x: 86, y: 182, label: "BUSINESS OPERATIONS", fill: colors.ordo.terracotta, stroke: colors.ordo.terracotta, textFill: "#fff8ef", width: 220 })}
      ${text({ x: 84, y: 324, lines: ["把複雜的流程，", "變成簡單的系統"], size: 57, fill: colors.ordo.bone, family: "serif", lineHeight: 1.3 })}
      ${text({ x: 88, y: 495, lines: ["訂單、專案、客戶進度集中管理", "每個下一步都清楚可追蹤。"], size: 16, fill: "#d9d5cc", family: "sans", lineHeight: 1.8, letterSpacing: .7 })}
      <rect x="86" y="587" width="158" height="48" fill="${colors.ordo.bone}"/>
      ${text({ x: 165, y: 618, lines: "了解方案", size: 14, fill: colors.ordo.charcoal, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      <g transform="translate(785 142)">
        <path d="M0 0H965V468H0Z" fill="#292a27"/>
        <rect x="22" y="22" width="921" height="410" fill="#f6f2e9"/>
        ${uiDashboard(width, height, 47, 48, 1.01)}
        <path d="M-50 468H1015L915 525H50Z" fill="#d3cec4"/>
        <path d="M384 468H590L620 486H354Z" fill="#bcb6ad"/>
      </g>
      <g transform="translate(1490 393) rotate(-5)">
        <rect width="300" height="226" fill="#faf7ef" stroke="#d4cec4"/>
        ${text({ x: 30, y: 46, lines: "ORDO / WEEK 31", size: 11, fill: colors.ordo.charcoal, family: "latin", weight: 700, letterSpacing: 1.3 })}
        <rect x="30" y="72" width="240" height="4" fill="${colors.ordo.terracotta}"/>
        ${text({ x: 30, y: 116, lines: "本週交付", size: 12, fill: "#7d776f", family: "sans" })}
        ${text({ x: 268, y: 120, lines: "14", size: 30, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
        <line x1="30" y1="144" x2="270" y2="144" stroke="#d8d2c8"/>
        ${text({ x: 30, y: 178, lines: "準時率", size: 12, fill: "#7d776f", family: "sans" })}
        ${text({ x: 268, y: 182, lines: "96%", size: 30, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
      </g>
      ${text({ x: 1836, y: 670, lines: "DESKTOP / PRODUCT INTERFACE / BRAND SYSTEM", size: 10, fill: "#fff5ea", family: "latin", anchor: "end", letterSpacing: 1.6, opacity: .82 })}
    `,
  );
  return writeCampaign("ordo-desktop-1920x720.png", width, height, colors.ordo.bone, [
    { input: overlay, left: 0, top: 0 },
  ]);
}

async function renderOrdoMobile() {
  const width = 750;
  const height = 900;
  const overlay = svg(
    width,
    height,
    `
      <rect width="750" height="900" fill="${colors.ordo.charcoal}"/>
      <rect x="0" y="0" width="750" height="310" fill="${colors.ordo.terracotta}"/>
      <circle cx="662" cy="93" r="160" fill="none" stroke="#efe9df" stroke-opacity=".2" stroke-width="2"/>
      <circle cx="662" cy="93" r="82" fill="none" stroke="#efe9df" stroke-opacity=".2" stroke-width="2"/>
      ${text({ x: 46, y: 74, lines: "ORDO", size: 42, fill: colors.ordo.bone, family: "latin", weight: 800, letterSpacing: -1 })}
      ${text({ x: 48, y: 105, lines: "OPERATIONS, IN ORDER.", size: 10, fill: colors.ordo.bone, family: "latin", weight: 600, letterSpacing: 1.6 })}
      ${text({ x: 47, y: 195, lines: ["今天的營運，", "一眼就能掌握"], size: 43, fill: colors.ordo.bone, family: "serif", lineHeight: 1.3 })}
      ${phoneSummary(358, 246, .98)}
      ${text({ x: 48, y: 415, lines: "訂單、專案、客戶進度", size: 15, fill: colors.ordo.bone, family: "sans", weight: 700, letterSpacing: .7 })}
      ${text({ x: 48, y: 452, lines: "集中管理，每個下一步清楚可追蹤。", size: 14, fill: "#cfcac1", family: "sans", letterSpacing: .6 })}
      <g transform="translate(47 520)">
        <rect width="245" height="155" fill="#efeae0"/>
        ${text({ x: 24, y: 35, lines: "WORKFLOW / 01", size: 10, fill: colors.ordo.terracotta, family: "latin", weight: 700, letterSpacing: 1.2 })}
        ${text({ x: 24, y: 77, lines: "訂單狀態", size: 20, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
        <line x1="24" y1="100" x2="221" y2="100" stroke="#c8c2b7"/>
        ${text({ x: 24, y: 130, lines: "新進 12  /  待確認 08", size: 11, fill: "#6f6962", family: "sans" })}
      </g>
      <rect x="47" y="723" width="166" height="48" fill="${colors.ordo.bone}"/>
      ${text({ x: 130, y: 754, lines: "了解方案", size: 14, fill: colors.ordo.charcoal, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      ${text({ x: 47, y: 832, lines: "PROJECT · ORDER · CLIENT", size: 11, fill: colors.ordo.bone, family: "latin", weight: 600, letterSpacing: 1.7 })}
      ${text({ x: 702, y: 858, lines: "MOBILE OPERATIONS", size: 10, fill: "#cfcac1", family: "latin", anchor: "end", letterSpacing: 1.4 })}
    `,
  );
  return writeCampaign("ordo-mobile-750x900.png", width, height, colors.ordo.charcoal, [
    { input: overlay, left: 0, top: 0 },
  ]);
}

async function renderOrdoSquare() {
  const width = 1080;
  const height = 1080;
  const overlay = svg(
    width,
    height,
    `
      <rect width="1080" height="1080" fill="${colors.ordo.bone}"/>
      <rect x="0" y="0" width="1080" height="355" fill="${colors.ordo.charcoal}"/>
      <rect x="790" y="0" width="290" height="1080" fill="${colors.ordo.terracotta}"/>
      <circle cx="938" cy="155" r="170" fill="none" stroke="#f0e9de" stroke-opacity=".22" stroke-width="2"/>
      <circle cx="938" cy="155" r="88" fill="none" stroke="#f0e9de" stroke-opacity=".22" stroke-width="2"/>
      ${text({ x: 62, y: 92, lines: "ORDO", size: 48, fill: colors.ordo.bone, family: "latin", weight: 800, letterSpacing: -1.5 })}
      ${text({ x: 64, y: 125, lines: "OPERATIONS, IN ORDER.", size: 10, fill: "#d9d5cc", family: "latin", weight: 600, letterSpacing: 1.7 })}
      ${text({ x: 62, y: 241, lines: ["把複雜的流程，", "變成簡單的系統"], size: 50, fill: colors.ordo.bone, family: "serif", lineHeight: 1.28 })}
      <g transform="translate(60 398)">
        <path d="M0 0H734V410H0Z" fill="#292a27"/>
        <rect x="18" y="18" width="698" height="358" fill="#f6f2e9"/>
        ${uiDashboard(width, height, 40, 40, .78)}
        <path d="M-24 410H758L690 453H40Z" fill="#d2ccc2"/>
      </g>
      <g transform="translate(655 728) rotate(6)">
        <rect width="295" height="227" fill="#faf7ef" stroke="#d4cec4"/>
        ${text({ x: 28, y: 45, lines: "ORDO / WEEK 31", size: 10, fill: colors.ordo.charcoal, family: "latin", weight: 700, letterSpacing: 1.2 })}
        <rect x="28" y="70" width="239" height="4" fill="${colors.ordo.terracotta}"/>
        ${text({ x: 28, y: 117, lines: "本週交付", size: 12, fill: "#7d776f", family: "sans" })}
        ${text({ x: 266, y: 121, lines: "14", size: 30, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
        <line x1="28" y1="145" x2="267" y2="145" stroke="#d8d2c8"/>
        ${text({ x: 28, y: 182, lines: "準時率", size: 12, fill: "#7d776f", family: "sans" })}
        ${text({ x: 266, y: 186, lines: "96%", size: 30, fill: colors.ordo.charcoal, family: "latin", anchor: "end" })}
      </g>
      ${text({ x: 62, y: 941, lines: "訂單、專案、客戶進度集中管理", size: 17, fill: colors.ordo.charcoal, family: "sans", weight: 700, letterSpacing: .7 })}
      <rect x="62" y="980" width="165" height="46" fill="${colors.ordo.charcoal}"/>
      ${text({ x: 145, y: 1010, lines: "了解方案", size: 14, fill: colors.ordo.bone, family: "sans", weight: 700, anchor: "middle", letterSpacing: 1 })}
      ${text({ x: 1028, y: 1012, lines: ["PROJECT", "ORDER", "CLIENT"], size: 11, fill: colors.ordo.bone, family: "latin", weight: 700, lineHeight: 1.65, anchor: "end", letterSpacing: 1.4 })}
    `,
  );
  return writeCampaign("ordo-social-1080x1080.png", width, height, colors.ordo.bone, [
    { input: overlay, left: 0, top: 0 },
  ]);
}

function checkerboard(width, height, size = 24) {
  const cells = [];
  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      cells.push(
        `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${
          (x / size + y / size) % 2 === 0 ? "#ece9e3" : "#d9d5ce"
        }"/>`,
      );
    }
  }
  return svg(width, height, cells.join(""));
}

async function finalProcessPreview(finalImage, width, height, detailPosition = "centre") {
  const full = await contain(finalImage, width, 215);
  const detail = await cover(finalImage, width, height - 250, {
    position: detailPosition,
  });
  const labels = svg(
    width,
    height,
    `
      <rect x="0" y="215" width="${width}" height="35" fill="#24231f"/>
      ${text({ x: 18, y: 238, lines: "FULL LAYOUT / COMPOSITE DETAIL", size: 10, fill: "#f5efe5", family: "latin", weight: 700, letterSpacing: 1.3 })}
    `,
  );
  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#ddd8ce",
    },
  })
    .composite([
      { input: full, left: 0, top: 0 },
      { input: detail, left: 0, top: 250 },
      { input: labels, left: 0, top: 0 },
    ])
    .png()
    .toBuffer();
}

async function makeProcessSheet({
  filename,
  brand,
  category,
  sourceImage,
  sourcePosition = "centre",
  cutoutImage,
  finalImage,
  middleLabel,
  middleOverlay,
  accent,
  dark = "#22211f",
}) {
  const width = 1800;
  const height = 1080;
  const cellW = 520;
  const cellH = 620;
  const source = await cover(sourceImage, cellW, cellH, {
    position: sourcePosition,
    modulate: { brightness: 1.02, saturation: 0.84 },
  });
  const final = await finalProcessPreview(finalImage, cellW, cellH);
  let middle;
  if (cutoutImage) {
    const check = checkerboard(cellW, cellH);
    const cutout = await contain(cutoutImage, 450, 560);
    middle = await sharp(check)
      .composite([{ input: cutout, left: 35, top: 30 }])
      .png()
      .toBuffer();
  } else {
    middle = await cover(sourceImage, cellW, cellH, {
      position: sourcePosition,
      modulate: { brightness: 1.12, saturation: 0.66 },
    });
  }
  if (middleOverlay) {
    middle = await sharp(middle)
      .composite([{ input: svg(cellW, cellH, middleOverlay), left: 0, top: 0 }])
      .png()
      .toBuffer();
  }
  const base = svg(
    width,
    height,
    `
      <rect width="${width}" height="${height}" fill="#f3efe7"/>
      <rect x="0" y="0" width="${width}" height="12" fill="${accent}"/>
      ${text({ x: 70, y: 86, lines: brand, size: 37, fill: dark, family: "serif", weight: 600, letterSpacing: 1.5 })}
      ${text({ x: 1730, y: 82, lines: category, size: 12, fill: dark, family: "latin", weight: 700, anchor: "end", letterSpacing: 1.8 })}
      <line x1="70" y1="118" x2="1730" y2="118" stroke="#c7c0b5"/>
      ${text({ x: 70, y: 175, lines: "01", size: 12, fill: accent, family: "latin", weight: 700, letterSpacing: 1.5 })}
      ${text({ x: 70, y: 207, lines: "原始素材", size: 20, fill: dark, family: "sans", weight: 700 })}
      ${text({ x: 640, y: 175, lines: "02", size: 12, fill: accent, family: "latin", weight: 700, letterSpacing: 1.5 })}
      ${text({ x: 640, y: 207, lines: middleLabel, size: 20, fill: dark, family: "sans", weight: 700 })}
      ${text({ x: 1210, y: 175, lines: "03", size: 12, fill: accent, family: "latin", weight: 700, letterSpacing: 1.5 })}
      ${text({ x: 1210, y: 207, lines: "最終成品", size: 20, fill: dark, family: "sans", weight: 700 })}
      <rect x="70" y="235" width="520" height="620" fill="#ddd8ce"/>
      <rect x="640" y="235" width="520" height="620" fill="#ddd8ce"/>
      <rect x="1210" y="235" width="520" height="620" fill="#ddd8ce"/>
      <path d="M604 545H626" stroke="${accent}" stroke-width="2"/>
      <path d="M1174 545H1196" stroke="${accent}" stroke-width="2"/>
      ${text({ x: 70, y: 915, lines: "去背合成  /  調色  /  排版  /  品牌視覺皆為自行製作", size: 24, fill: dark, family: "sans", weight: 700, letterSpacing: .9 })}
      ${text({ x: 70, y: 962, lines: "SOURCE MATERIAL  →  ART DIRECTION & COMPOSITING  →  DELIVERY-READY CAMPAIGN", size: 12, fill: "#6d675f", family: "latin", weight: 600, letterSpacing: 1.5 })}
      ${text({ x: 1730, y: 1006, lines: "COMMERCIAL VISUAL DESIGN / 2026", size: 11, fill: "#6d675f", family: "latin", anchor: "end", letterSpacing: 1.6 })}
    `,
  );
  await sharp(base)
    .composite([
      { input: source, left: 70, top: 235 },
      { input: middle, left: 640, top: 235 },
      { input: final, left: 1210, top: 235 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(processDir, filename));
}

async function makeOrdoProcessSheet() {
  const width = 1800;
  const height = 1080;
  const wireframe = svg(
    520,
    620,
    `
      <rect width="520" height="620" fill="#eeece6"/>
      <rect x="44" y="70" width="432" height="300" fill="#fff" stroke="#aaa59c" stroke-width="2"/>
      <rect x="44" y="70" width="52" height="300" fill="#d0cdc6"/>
      <rect x="116" y="100" width="140" height="22" fill="#cbc7bf"/>
      <rect x="116" y="150" width="100" height="58" fill="#ddd9d2"/>
      <rect x="226" y="150" width="100" height="58" fill="#ddd9d2"/>
      <rect x="336" y="150" width="100" height="58" fill="#ddd9d2"/>
      <rect x="116" y="238" width="320" height="12" fill="#d0cdc6"/>
      <rect x="116" y="274" width="320" height="12" fill="#d0cdc6"/>
      <rect x="116" y="310" width="320" height="12" fill="#d0cdc6"/>
      ${text({ x: 44, y: 430, lines: "INFORMATION ARCHITECTURE", size: 11, fill: "#6d6962", family: "latin", weight: 700, letterSpacing: 1.3 })}
      ${text({ x: 44, y: 472, lines: ["訂單狀態", "工作列表", "下一步"], size: 21, fill: "#34332f", family: "sans", lineHeight: 1.65 })}
    `,
  );
  const uiStage = svg(
    520,
    620,
    `
      <rect width="520" height="620" fill="${colors.ordo.terracotta}"/>
      <g transform="translate(23 92)">
        ${uiDashboard(520, 620, 0, 0, .58)}
      </g>
      ${text({ x: 28, y: 52, lines: "ORDO / INTERFACE SYSTEM", size: 12, fill: colors.ordo.bone, family: "latin", weight: 700, letterSpacing: 1.4 })}
      ${text({ x: 28, y: 570, lines: "品牌色、層級、狀態與操作流程整合", size: 14, fill: colors.ordo.bone, family: "sans", weight: 600 })}
    `,
  );
  const final = await finalProcessPreview(
    path.join(finalDir, "ordo-desktop-1920x720.png"),
    520,
    620,
    "east",
  );
  const base = svg(
    width,
    height,
    `
      <rect width="1800" height="1080" fill="#f3efe7"/>
      <rect width="1800" height="12" fill="${colors.ordo.terracotta}"/>
      ${text({ x: 70, y: 86, lines: "ORDO 營運協作系統", size: 37, fill: colors.ordo.charcoal, family: "serif", weight: 600 })}
      ${text({ x: 1730, y: 82, lines: "ENTERPRISE VISUAL / UI SYSTEM", size: 12, fill: colors.ordo.charcoal, family: "latin", weight: 700, anchor: "end", letterSpacing: 1.8 })}
      <line x1="70" y1="118" x2="1730" y2="118" stroke="#c7c0b5"/>
      ${text({ x: 70, y: 175, lines: "01", size: 12, fill: colors.ordo.terracotta, family: "latin", weight: 700 })}
      ${text({ x: 70, y: 207, lines: "資訊架構草稿", size: 20, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
      ${text({ x: 640, y: 175, lines: "02", size: 12, fill: colors.ordo.terracotta, family: "latin", weight: 700 })}
      ${text({ x: 640, y: 207, lines: "介面與品牌系統", size: 20, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
      ${text({ x: 1210, y: 175, lines: "03", size: 12, fill: colors.ordo.terracotta, family: "latin", weight: 700 })}
      ${text({ x: 1210, y: 207, lines: "最終成品", size: 20, fill: colors.ordo.charcoal, family: "sans", weight: 700 })}
      <path d="M604 545H626M1174 545H1196" stroke="${colors.ordo.terracotta}" stroke-width="2"/>
      ${text({ x: 70, y: 915, lines: "介面設計  /  品牌幾何  /  裝置合成  /  印刷物延伸皆為自行製作", size: 24, fill: colors.ordo.charcoal, family: "sans", weight: 700, letterSpacing: .8 })}
      ${text({ x: 70, y: 962, lines: "INFORMATION ARCHITECTURE  →  VISUAL SYSTEM  →  DELIVERY-READY CAMPAIGN", size: 12, fill: "#6d675f", family: "latin", weight: 600, letterSpacing: 1.5 })}
      ${text({ x: 1730, y: 1006, lines: "COMMERCIAL VISUAL DESIGN / 2026", size: 11, fill: "#6d675f", family: "latin", anchor: "end", letterSpacing: 1.6 })}
    `,
  );
  await sharp(base)
    .composite([
      { input: wireframe, left: 70, top: 235 },
      { input: uiStage, left: 640, top: 235 },
      { input: final, left: 1210, top: 235 },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(processDir, "ordo-process-1800x1080.png"));
}

async function main() {
  await Promise.all([
    renderBeautyDesktop(),
    renderBeautyMobile(),
    renderBeautySquare(),
    renderInteriorDesktop(),
    renderInteriorMobile(),
    renderInteriorSquare(),
    renderPastryDesktop(),
    renderPastryMobile(),
    renderPastrySquare(),
    renderOrdoDesktop(),
    renderOrdoMobile(),
    renderOrdoSquare(),
  ]);

  await Promise.all([
    makeProcessSheet({
      filename: "somme-process-1800x1080.png",
      brand: "SOMME 肌理研究所",
      category: "SKINCARE / COMPOSITING",
      sourceImage: assets.beautyPhoto,
      sourcePosition: "north",
      cutoutImage: assets.beautyCutout,
      finalImage: path.join(finalDir, "somme-desktop-1920x720.png"),
      middleLabel: "去背商品與光影合成",
      accent: colors.beauty.brown,
      dark: colors.beauty.cocoa,
    }),
    makeProcessSheet({
      filename: "xusuo-process-1800x1080.png",
      brand: "序所空間",
      category: "INTERIOR / ART DIRECTION",
      sourceImage: assets.interiorPhoto,
      sourcePosition: "centre",
      cutoutImage: null,
      finalImage: path.join(finalDir, "xusuo-desktop-1920x720.png"),
      middleLabel: "調色與建築圖層",
      middleOverlay: `
        <rect width="520" height="620" fill="#171715" opacity=".28"/>
        <rect x="246" y="44" width="235" height="202" fill="#171715" opacity=".72" stroke="#eee9df" stroke-opacity=".5"/>
        ${floorPlanSvg(520, 620, 266, 84, .62, colors.interior.paper, .9)}
        <g transform="translate(52 466)">
          <rect width="74" height="96" fill="#4c4035"/>
          <rect x="88" width="74" height="96" fill="#b8aa96"/>
          <rect x="176" width="74" height="96" fill="#8a8175"/>
          ${text({ x: 0, y: 119, lines: "M01", size: 10, fill: colors.interior.paper, family: "latin", letterSpacing: 1 })}
          ${text({ x: 88, y: 119, lines: "M02", size: 10, fill: colors.interior.paper, family: "latin", letterSpacing: 1 })}
          ${text({ x: 176, y: 119, lines: "M03", size: 10, fill: colors.interior.paper, family: "latin", letterSpacing: 1 })}
        </g>
        ${text({ x: 52, y: 424, lines: "COLOR GRADE / PLAN / MATERIAL", size: 10, fill: colors.interior.paper, family: "latin", weight: 700, letterSpacing: 1.4 })}
      `,
      accent: colors.interior.copper,
      dark: colors.interior.ink,
    }),
    makeProcessSheet({
      filename: "mur-process-1800x1080.png",
      brand: "MÛR 熟成菓製",
      category: "PÂTISSERIE / COMPOSITING",
      sourceImage: assets.pastryPhoto,
      sourcePosition: "west",
      cutoutImage: assets.pastryCutout,
      finalImage: path.join(finalDir, "mur-desktop-1920x720.png"),
      middleLabel: "包裝、食材與陰影合成",
      accent: colors.pastry.caramel,
      dark: colors.pastry.ink,
    }),
    makeOrdoProcessSheet(),
  ]);

  const files = [
    "somme-desktop-1920x720.png",
    "somme-mobile-750x900.png",
    "somme-social-1080x1080.png",
    "xusuo-desktop-1920x720.png",
    "xusuo-mobile-750x900.png",
    "xusuo-social-1080x1080.png",
    "mur-desktop-1920x720.png",
    "mur-mobile-750x900.png",
    "mur-social-1080x1080.png",
    "ordo-desktop-1920x720.png",
    "ordo-mobile-750x900.png",
    "ordo-social-1080x1080.png",
  ];
  for (const file of files) {
    const metadata = await sharp(path.join(finalDir, file)).metadata();
    console.log(`${file}: ${metadata.width}x${metadata.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
