import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07090f",
        panel: "rgba(12, 18, 32, 0.66)",
        line: "rgba(255, 255, 255, 0.12)",
        electric: "#6ee7f9",
        mint: "#4ade80",
        coral: "#fb7185",
        solar: "#facc15"
      },
      boxShadow: {
        glow: "0 0 48px rgba(110, 231, 249, 0.18)",
        lift: "0 24px 80px rgba(0, 0, 0, 0.38)"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

export default config;
