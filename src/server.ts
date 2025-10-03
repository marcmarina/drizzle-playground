import http from "http";
import promBundle from "express-prom-bundle";

import { userRoutes } from "./routes";
import { httpContextMiddleware } from "./utils/context";
import express, { Router } from "express";
import { ZodError } from "zod";

export function createServer() {
  const app = express();

  app.use(
    promBundle({
      formatStatusCode: (res) => res.statusCode.toString().charAt(0) + "xx",
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 15],
      includeMethod: true,
      includePath: true,
      includeStatusCode: true,
    })
  );

  app.use(express.json());

  app.use(httpContextMiddleware);

  const router = Router();

  router.get("/_health", (req, res) => {
    res.send("OK");
  });

  app.use(router);

  app.use(userRoutes);

  app.use((error, req, res, next) => {
    res.status(500);

    if (error instanceof ZodError) {
      res.status(400);
    }

    res.send(error);
  });

  return http.createServer(app);
}
