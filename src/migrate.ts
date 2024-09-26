import { migrate } from "drizzle-orm/node-postgres/migrator";
import { sql, client } from "./database";

async function main() {
  await client.connect();

  // This will run migrations on the database, skipping the ones already applied
  await migrate(sql, {
    migrationsFolder: "./drizzle",
    migrationsTable: "migrations",
    migrationsSchema: "public",
  });

  await client.end();
}

main();
