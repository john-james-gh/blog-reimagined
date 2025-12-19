import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schema-types";

export default defineConfig({
  name: "default",
  title: "Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gq0n5o36",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "development",
  plugins: [codeInput(), structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
