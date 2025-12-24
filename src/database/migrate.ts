import dotenvx from "@dotenvx/dotenvx";
import path from "path";

const environment = process.env.NODE_ENV ?? "development";

dotenvx.config({
  path: [
    path.join(__dirname, "../../.env"),
    path.join(__dirname, `../../environments/.env.${environment}`),
  ],
  envKeysFile: path.join(__dirname, "../../.env.keys"),
});

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { logger } from "../logger";

import { pool, sql } from "./database";

async function main() {
  logger.info("Running database migrations");

  await migrate(sql, {
    migrationsFolder: "./src/database/drizzle",
  });

  logger.info("Migrations ran successfully");

  await pool.end();
}

main();
