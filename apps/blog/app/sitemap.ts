import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { SITEMAP_QUERY } from "@/lib/sanity/queries";
import { getBaseUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const paths = await client.fetch(SITEMAP_QUERY);
    const baseUrl = getBaseUrl();

    if (!paths || paths.length === 0) {
      console.info("No paths found for sitemap.");
      return [];
    }

    return paths.map((path) => ({
      url: new URL(path.href, baseUrl).toString(),
      lastModified: new Date(path._updatedAt),
      changeFrequency: "monthly",
      priority: 1,
    }));
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
