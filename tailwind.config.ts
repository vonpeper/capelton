import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        apple: {
          black: "#1d1d1f",
          dark: "#1d1d1f",
          surface: "#fbfbfd",
          card: "#ffffff",
          border: "rgba(0, 0, 0, 0.08)",
          subtext: "#6e6e73",
          light: "#f5f5f7",
        },
        capelton: {
          green: "#00b140",
          glow: "#3ac05e",
          darkgreen: "#006424",
          accent: "#22c55e",
        },
      },
      fontFamily: {
        kanit: ["Kanit", "var(--font-kanit)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["Kanit", "var(--font-kanit)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
