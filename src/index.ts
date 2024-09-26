import { eq } from "drizzle-orm";
import { client, sql } from "./database";
import { posts, users } from "./schema";

async function main() {
  await client.connect();

  const res = await sql.query.users.findMany();

  console.log(JSON.stringify(res, null, 2));

  await client.end();
}

main();
