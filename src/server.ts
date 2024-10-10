import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { ZodError } from "zod";
import { userRoutes } from "./routes";

export function createServer() {
  const app = express();

  app.use(express.json());

  app.get("/_health", (req, res, next) => {
    res.send("OK");
  });

  app.use(userRoutes);

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
