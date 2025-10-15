import { eq } from "drizzle-orm";

import { Router } from "express";
import { schema, sql } from "../database";

export const userRoutes = Router();

userRoutes.post("/users", async (req, res, next) => {
  try {
    const values = schema.newUserSchema.parse(req.body);

    const [newUser] = await sql.insert(schema.users).values(values).returning();

    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

userRoutes.get("/users/:id", async (req, res, next) => {
  try {
    const user = await sql.query.users.findFirst({
      where: eq(schema.users.id, Number(req.params.id)),
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

userRoutes.delete("/users/:id", async (req, res, next) => {
  try {
    const user = await sql
      .delete(schema.users)
      .where(eq(schema.users.id, Number(req.params.id)));

    res.send(user.rowCount);
  } catch (error) {
    next(error);
  }
});

userRoutes.get("/users", async (req, res, next) => {
  try {
    const users = await sql.query.users.findMany();

    res.send(users);
  } catch (error) {
    next(error);
  }
});
