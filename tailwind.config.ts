import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080D17",
        panel: "#101827",
        line: "#202B3C",
        muted: "#8995A8",
        gold: "#D6B36A",
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"], mono: ["ui-monospace", "SFMono-Regular", "monospace"] },
    },
  },
  plugins: [],
};

export default config;
