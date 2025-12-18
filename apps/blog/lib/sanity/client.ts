import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "gq0n5o36",
  dataset: "development",
  apiVersion: "2025-12-18",
  token: process.env.SANITY_API_TOKEN,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation,
});
