import { client, sql } from "./database";
import { users } from "./schema";

async function main() {
  await client.connect();

  const rows = await sql.query.users.findMany({
    with: {
      posts: true,
    },
  });

  console.dir(rows, {
    depth: null,
  });

  const rows2 = await sql.select().from(users);

  console.dir(rows2, {
    depth: null,
  });

  await client.end();
}

main();
