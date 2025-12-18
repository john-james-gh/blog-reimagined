import { codeInput } from "@sanity/code-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schema-types";

export default defineConfig({
  name: "default",
  title: "Blog",

  projectId: "gq0n5o36",
  dataset: "development",

  plugins: [codeInput(), structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
