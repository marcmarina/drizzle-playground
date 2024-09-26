import { client, sql } from "./database";

async function main() {
  await client.connect();

  const res = await sql.query.users.findMany({
    with: {
      posts: true,
    },
  });

  console.dir(res, {
    depth: null,
  });

  await client.end();
}

main();
