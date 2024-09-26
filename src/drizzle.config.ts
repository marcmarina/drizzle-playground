import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./src/drizzle",
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
