import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gq0n5o36",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
  typegen: {
    path: "../blog/lib/sanity/**/*.{ts,tsx}",
    schema: "../blog/lib/sanity/schema.json",
    generates: "../blog/lib/sanity/types.ts",
  },
});
