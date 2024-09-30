import { sql } from "./database";
import { posts, users } from "./schema";

async function main() {
  const [user] = await sql
    .insert(users)
    .values({
      firstName: "John",
      lastName: "Doe",
    })
    .returning();

  console.log(user);

  const [post] = await sql
    .insert(posts)
    .values({
      userId: user.id,
      body: "Lorem ipsum.",
    })
    .returning();

  console.log(post);
}

main();
