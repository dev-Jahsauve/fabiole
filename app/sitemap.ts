import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { getRealisationSlugs } from "@/data/realisations";
import { getServiceSlugs } from "@/data/services";

// Sitemap statique (compatible export + GitHub Pages).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/a-propos", "/services", "/realisations", "/devis", "/contact"];
  const services = getServiceSlugs().map((slug) => `/services/${slug}`);
  const realisations = getRealisationSlugs().map((slug) => `/realisations/${slug}`);
  const now = new Date();
  return [...statics, ...services, ...realisations].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length === 2 ? 0.8 : 0.6,
  }));
}
