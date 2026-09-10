import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#0F1115",
          light: "#F8F9FA",
        },
        surface: {
          glass: "rgba(255, 255, 255, 0.07)",
          border: "rgba(255, 255, 255, 0.12)",
        },
        brand: {
          gold: "#EAB308",
          azure: "#38BDF8",
          coral: "#F97316",
          emerald: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
export default config;