import { type SanityImageSource, createImageUrlBuilder } from "@sanity/image-url";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gq0n5o36",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
