import Router from "koa-router";
import { eq } from "drizzle-orm";

import { schema, sql } from "../database";

export const userRoutes = new Router();

userRoutes.post("/users", async (ctx) => {
  const values = schema.newUserSchema.parse(ctx.request.body);

  const [newUser] = await sql.insert(schema.users).values(values).returning();

  ctx.status = 201;
  ctx.body = newUser;
});

userRoutes.get("/users/:id", async (ctx) => {
  const user = await sql.query.users.findFirst({
    where: eq(schema.users.id, Number(ctx.params.id)),
    with: {
      posts: {
        with: {
          comments: true,
        },
      },
    },
  });

  ctx.body = user;
});

userRoutes.get("/users", async (ctx) => {
  const users = await sql.query.users.findMany();

  ctx.body = users;
});
