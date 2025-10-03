import "dotenv/config";

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { sql } from "./database";

migrate(sql, {
  migrationsFolder: "./src/database/drizzle",
});
