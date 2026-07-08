import type { Config } from "tailwindcss";

/**
 * セマンティックカラーの値は tokens/sevendot.tokens.json がSSOT。
 * 変更する場合は必ずトークン側を先に更新すること。
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          300: "#a5b4fc",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        neutral: {
          0: "#ffffff",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          500: "#64748b",
          700: "#334155",
          900: "#0f172a",
        },
        success: { 100: "#dcfce7", 600: "#16a34a", 700: "#15803d" },
        warning: { 100: "#fef9c3", 700: "#a16207" },
        danger: { 100: "#fee2e2", 600: "#dc2626", 700: "#b91c1c" },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
