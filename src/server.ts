import http from "http";
import promBundle from "express-prom-bundle";
import cors from "cors";

import { userRoutes } from "./routes";
import { httpContextMiddleware } from "./utils/context";
import express from "express";
import { ZodError } from "zod";
import { httpLogger } from "./logger";

export function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(
    promBundle({
      buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
      includeMethod: true,
      includePath: true,
      includeStatusCode: true,
      normalizePath: (req) => req.route?.path ?? "unknown",
      excludeRoutes: ["/metrics", "/_health"],
      customLabels: {
        service: "drizzle-playground",
      },
      promClient: {
        collectDefaultMetrics: {},
      },
    })
  );

  // Fine buckets for heatmaps/percentiles; only `path` to keep cardinality low.
  app.use(
    promBundle({
      buckets: [
        0.0005, 0.001, 0.0025, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5,
        5, 10, 30, 60,
      ],
      includePath: true,
      includeStatusCode: false,
      normalizePath: (req) => req.route?.path ?? "unknown",
      excludeRoutes: ["/metrics", "/_health"],
      customLabels: {
        service: "drizzle-playground",
      },
      httpDurationMetricName: "http_request_highr_duration_seconds",
      includeUp: false,
    })
  );

  app.use(httpContextMiddleware);

  app.use(httpLogger);

  app.get("/_health", (req, res) => {
    res.status(200).send("OK");
  });

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
