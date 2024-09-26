import { eq } from "drizzle-orm";
import { client, sql } from "./database";
import { posts, users } from "./drizzle/schema";

async function main() {
  await client.connect();

  // const res = await sql
  //   .select()
  //   .from(users)
  //   .innerJoin(posts, eq(users.id, posts.userId))
  //   .where(eq(users.id, 1))
  //   .execute();

  const res = await sql.query.users.findMany({
    with: {
      posts: true,
    },
  });

  console.log(JSON.stringify(res, null, 2));

  await client.end();
}

main();
