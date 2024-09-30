import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

import Database from "better-sqlite3";

import path from "path";

const database = new Database(path.join(__dirname, "..", ".tmp", "db.sqlite"));

export const sql = drizzle(database, {
  schema: schema,
});
