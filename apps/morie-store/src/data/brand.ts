export const brand = {
  name: "MORIÉ",
  legalName: "森映植萃研究所",
  tagline: "循著植物的緩慢時間",
  description:
    "以台灣山林氣息與日常肌理為靈感，調製克制、感官而清晰的植物保養配方。",
  colors: {
    paper: "#ece5d6",
    parchment: "#f4efe5",
    ink: "#1e1f1b",
    olive: "#60634b",
    amber: "#8d5d36",
  },
  contact: {
    email: "atelier@morie.example",
    phone: "02 2771 1936",
  },
  shippingThreshold: 2200,
} as const;

export const navigation = [
  { label: "全系列", href: "/products" },
  { label: "肌膚保養", href: "/products?category=肌膚保養" },
  { label: "身體", href: "/products?category=身體" },
  { label: "香氛", href: "/products?category=香氛" },
  { label: "居家", href: "/products?category=居家" },
  { label: "禮盒", href: "/products?category=禮盒" },
] as const;
