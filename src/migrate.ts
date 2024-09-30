import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";
import path from "path";

const database = new Database(path.join(__dirname, "..", ".tmp", "db.sqlite"));

const sql = drizzle(database);

migrate(sql, {
  migrationsFolder: "./src/drizzle",
});
