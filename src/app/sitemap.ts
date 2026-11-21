import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/config/site";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const dynamic = "force-static";

/**
 * /sitemap.xml — sitemaps require absolute URLs, so entries are emitted only once
 * NEXT_PUBLIC_SITE_URL is set (otherwise an empty, valid sitemap is returned).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "weekly") => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1),
    page("/mehsullar", 0.9),
    page("/aletlerin-kirayesi", 0.8),
    page("/haqqimizda", 0.5, "monthly"),
    page("/elaqe", 0.7, "monthly"),
    ...categories.map((c) => page(`/kateqoriya/${c.slug}`, 0.8)),
    ...products.map((p) => page(`/mehsullar/${p.slug}`, 0.6)),
  ];
}
