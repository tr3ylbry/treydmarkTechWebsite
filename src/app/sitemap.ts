import type { MetadataRoute } from "next";

const siteUrl = "https://www.treydmarktech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl },
    { url: `${siteUrl}/projects` },
  ];
}
