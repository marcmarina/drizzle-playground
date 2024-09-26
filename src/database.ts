import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./drizzle/schema";

export const client = new Client({
  host: "localhost",
  database: "playground",
  user: "user",
  password: "password",
  port: 5432,
});

export const sql = drizzle(client, {
  schema: schema,
});
