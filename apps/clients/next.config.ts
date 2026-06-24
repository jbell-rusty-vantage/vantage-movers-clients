import path from "node:path";
import type { NextConfig } from "next";

const monorepoRoot = path.join(__dirname, "../..");

const nextConfig: NextConfig = {
  transpilePackages: ["@vantage/api-client", "@vantage/utils"],
  outputFileTracingRoot: monorepoRoot,
  reactCompiler: true,
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    // Brand + partner logos are first-party SVGs served from /public. They must
    // be allowed through the image optimizer (sandboxed CSP keeps them inert).
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
