import { sql } from "./database";
import { users } from "./schema";

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
