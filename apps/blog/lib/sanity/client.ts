import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gq0n5o36",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-12-18",
  token: process.env.SANITY_API_TOKEN,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation,
});
