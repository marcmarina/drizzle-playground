import { drizzle } from "drizzle-orm/better-sqlite3";
import SQLite, { Database } from "better-sqlite3";
import path from "path";

import * as schema from "./schema";

export const database: Database = new SQLite(
  path.join(__dirname, "..", "..", "database", "db.sqlite")
);

export const sql = drizzle(database, {
  schema: schema,
});
