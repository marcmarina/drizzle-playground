import express from "express";
import http from "http";
import { sql } from "./database";

export function createServer() {
  const app = express();

  app.get("/_health", (req, res, next) => {
    res.send("OK");
  });

  app.get("/users", async (req, res, next) => {
    const users = await sql.query.users.findMany({
      with: {
        posts: true,
      },
    });

    res.send(users);
  });

  app.use((req, res, next) => {
    res.send(`${req.method} ${req.path} not found`);
  });

  return http.createServer(app);
}
