import type { Config } from "tailwindcss";

export const vantageTailwindTheme: NonNullable<Config["theme"]> = {
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
};
