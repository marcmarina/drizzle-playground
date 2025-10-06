import "dotenv/config";

import { sql } from "./database";
import { users } from "./schema";

async function main() {
  const newUsers = await sql
    .insert(users)
    .values([
      {
        firstName: "John",
        lastName: "Doe",
      },
      {
        firstName: "Kaladin",
        lastName: "Stormblessed",
      },
    ])
    .returning();

  console.log(`Inserted ${newUsers.length} users`);
}

main();
