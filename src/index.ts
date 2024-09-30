import { sql } from "./database";

async function main() {
  const rows = await sql.query.users.findMany({
    with: {
      posts: true,
    },
  });

  console.dir(rows, {
    depth: null,
  });
}

main();
