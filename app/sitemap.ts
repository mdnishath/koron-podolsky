import type { MetadataRoute } from "next";
import { ARTICLES, ATTORNEYS } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();
  const routes = ["", "/employment-law", "/employment-law/wrongful-termination", "/personal-injury", "/results", "/attorneys", "/what-to-expect", "/contact", "/tell-us-about-your-case", "/resources", "/privacy-policy", "/terms"];
  return [
    ...routes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 })),
    ...ATTORNEYS.map((a) => ({ url: `${base}/attorneys/${a.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...ARTICLES.map((a) => ({ url: `${base}/resources/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
