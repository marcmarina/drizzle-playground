import { Router } from "express";
import { schema, sql } from "../database";
import { eq } from "drizzle-orm";

export const userRoutes = Router();

userRoutes.post("/users", async (req, res, next) => {
  try {
    const values = schema.newUserSchema.parse(req.body);

    const [newUser] = await sql.insert(schema.users).values(values).returning();

    res.status(201).send(newUser);
  } catch (e) {
    next(e);
  }
});

userRoutes.get("/users/:id", async (req, res, next) => {
  try {
    const user = await sql.query.users.findFirst({
      where: eq(schema.users.id, Number(req.params.id)),
      with: {
        posts: true,
      },
    });

    res.send(user ?? null);
  } catch (e) {
    next(e);
  }
});

userRoutes.get("/users", async (req, res, next) => {
  try {
    const users = await sql.query.users.findMany({
      with: {
        posts: true,
      },
    });

    res.send(users);
  } catch (e) {
    next(e);
  }
});
