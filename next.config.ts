import type { NextConfig } from "next";

// GitHub Pages siteyi https://<kullanici>.github.io/<repo>/ altında servis eder;
// NEXT_PUBLIC_BASE_PATH yalnızca Pages derlemesinde (CI) set edilir. Hostinger'da boş kalır.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
};

export default nextConfig;
