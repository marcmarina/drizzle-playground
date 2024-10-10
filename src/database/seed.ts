import { sql } from "./database";
import { comments, posts, users } from "./schema";

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

  const newPosts = await sql
    .insert(posts)
    .values([
      {
        userId: newUsers[0].id,
        body: "Lorem ipsum.",
      },
      {
        userId: newUsers[0].id,
        body: "Lorem ipsum.",
      },
      {
        userId: newUsers[1].id,
        body: "Lorem ipsum.",
      },
      {
        userId: newUsers[1].id,
        body: "Lorem ipsum.",
      },
    ])
    .returning();

  const newComments = await sql.insert(comments).values({
    authorId: newUsers[0].id,
    postId: newPosts[0].id,
    body: "This is a comment.",
  });
}

main();
