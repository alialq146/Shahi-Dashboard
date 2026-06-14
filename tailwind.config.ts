import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Tajawal", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Cairo", "system-ui", "sans-serif"],
      },
      colors: {
        // هوية شاهي الجبل
        espresso: {
          DEFAULT: "#2B2018",
          800: "#33271D",
          700: "#3E2F22",
          600: "#4C3A2A",
        },
        caramel: {
          DEFAULT: "#C28A4A",
          light: "#E0B884",
          dark: "#A06F35",
        },
        olive: {
          DEFAULT: "#71803F",
          light: "#8B9A57",
          dark: "#586633",
        },
        beige: {
          DEFAULT: "#F5F0E8",
          card: "#FBF8F2",
          line: "#E8DECF",
        },
        ink: "#2B2018",
        muted: "#8C7E6E",
        danger: "#B4503C",
        warn: "#C9962E",
        good: "#71803F",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,32,24,0.04), 0 8px 24px -12px rgba(43,32,24,0.12)",
        card: "0 1px 3px rgba(43,32,24,0.06), 0 12px 32px -16px rgba(43,32,24,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
