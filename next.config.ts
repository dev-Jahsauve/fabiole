import type { NextConfig } from "next";

// GitHub Pages (https://dev-Jahsauve.github.io/fabiole) est servi sous le
// sous-chemin "/fabiole" : le build Pages définit NEXT_PUBLIC_BASE_PATH=/fabiole.
// En local et sous XAMPP, la variable est absente -> pas de préfixe.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
