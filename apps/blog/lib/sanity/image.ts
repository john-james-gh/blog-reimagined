import { type SanityImageSource, createImageUrlBuilder } from "@sanity/image-url";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({
  projectId: "gq0n5o36",
  dataset: "development",
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
