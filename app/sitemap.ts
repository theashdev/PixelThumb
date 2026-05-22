import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://youtube-thumbnail-downloader.local",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
