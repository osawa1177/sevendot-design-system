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
          50: "#ebf0ff",
          100: "#d6e2ff",
          300: "#8fa9f2",
          500: "#2e5be8",
          600: "#003adb",
          700: "#002da8",
        },
        neutral: {
          0: "#ffffff",
          50: "#f6f6f6",
          100: "#efefef",
          200: "#e0e6f0",
          500: "#666666",
          700: "#333333",
          900: "#1a1a1a",
        },
        success: { 100: "#dcfce7", 600: "#16a34a", 700: "#15803d" },
        warning: { 100: "#fef9c3", 700: "#a16207" },
        danger: { 100: "#fee2e2", 600: "#dc2626", 700: "#b91c1c" },
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Noto Sans JP", "Yu Gothic", "Hiragino Kaku Gothic Pro", "Meiryo", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
