import type { Config } from "tailwindcss";
import { vantageTailwindTheme } from "@vantage/styles/tailwind-preset";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: vantageTailwindTheme,
};

export default config;
