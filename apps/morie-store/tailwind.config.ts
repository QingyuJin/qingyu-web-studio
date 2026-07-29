import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ece5d6",
        parchment: "#f4efe5",
        ink: "#1e1f1b",
        olive: "#60634b",
        amber: "#8d5d36",
        line: "#b7ae9e",
      },
      fontFamily: {
        display: ["Iowan Old Style", "Palatino Linotype", "Noto Serif TC", "serif"],
        sans: ["Inter", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.32em",
      },
    },
  },
  plugins: [],
} satisfies Config;
