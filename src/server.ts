import http from "http";
import promBundle from "express-prom-bundle";
import cors from "cors";

import { userRoutes } from "./routes";
import { httpContextMiddleware } from "./utils/context";
import express, { Router } from "express";
import { ZodError } from "zod";
import { httpLogger } from "./logger";

export function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(
    promBundle({
      formatStatusCode: (res) => res.statusCode.toString().charAt(0) + "xx",
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 15],
      includeMethod: true,
      includePath: true,
      includeStatusCode: true,
      customLabels: {
        service: "drizzle-playground",
      },
    })
  );

  app.use(httpContextMiddleware);

  app.use(httpLogger);

  const router = Router();

  router.get("/_health", (req, res) => {
    res.status(200).send("OK");
  });

  app.use(router);

  app.use(userRoutes);

  app.use((error: Error, req, res, next) => {
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof ZodError) {
      res.status(400);
    }

    res.json(error);
  });

  return http.createServer(app);
}
