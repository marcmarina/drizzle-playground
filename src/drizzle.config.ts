import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./src/drizzle",
  dialect: "sqlite",
  verbose: true,
  strict: true,
});
