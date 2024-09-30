import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { sql, schema } from "./database";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export function createServer() {
  const app = express();

  app.use(express.json());

  app.get("/_health", (req, res, next) => {
    res.send("OK");
  });

  app.post("/users", async (req, res, next) => {
    try {
      const values = schema.newUserSchema.parse(req.body);

      const [newUser] = await sql
        .insert(schema.users)
        .values(values)
        .returning();

      res.status(201).send(newUser);
    } catch (e) {
      next(e);
    }
  });

  app.get("/users/:id", async (req, res, next) => {
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

  app.get("/users", async (req, res, next) => {
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

  app.use((req, res, next) => {
    res.send(`${req.method} ${req.path} not found`);
  });

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  });

  return http.createServer(app);
}
