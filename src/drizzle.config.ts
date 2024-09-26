import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    database: "playground",
    host: "localhost",
    user: "user",
    password: "password",
    ssl: false,
  },
  verbose: true,
  strict: true,
});
