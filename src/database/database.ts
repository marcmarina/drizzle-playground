import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";
import { Pool } from "pg";
import { config } from "../config";

export const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
  ssl: config.database.ssl,
});

export const sql = drizzle(pool, {
  schema: schema,
});
