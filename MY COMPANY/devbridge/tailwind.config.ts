import type { Config } from "tailwindcss";

// Luxury palette: warm near-black surfaces + champagne gold accents + ivory text.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0a0907", 900: "#100e0a", 800: "#17140e", 700: "#221d13" },
        gold: {
          300: "#f0dfae",
          400: "#e4c97f",
          500: "#c9a24b",
          600: "#a8822f",
          700: "#7d611f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: { fadeUp: "fadeUp .6s ease-out both" },
    },
  },
  plugins: [],
};
export default config;
