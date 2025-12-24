import { defineConfig } from "drizzle-kit";

import { config } from "../config";

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/drizzle",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    ...config.database,
  },
});
