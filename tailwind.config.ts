import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        "trust-blue": "var(--trust-blue)",
        "bright-blue": "var(--bright-blue)",
        gold: "var(--gold)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-head)", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;

