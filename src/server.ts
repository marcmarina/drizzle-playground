import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import http from "http";

import { userRoutes } from "./routes";
import { ZodError } from "zod";
import { logger } from "./logger";

export function createServer() {
  const app = new Koa();

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = 500;

      if (err instanceof ZodError) {
        ctx.status = 400;
      }

      logger.error(err, "Request error");

      ctx.body = err;
    }
  });

  app.use(async (ctx, next) => {
    const requestId = ctx.get("x-request-id") || crypto.randomUUID();

    ctx.set("requestId", requestId);

    await next();
  });

  const router = new Router();

  router.get("/_health", (ctx) => {
    ctx.body = "OK";
  });

  app.use(router.routes());

  app.use(userRoutes.routes());

  app.use((ctx) => {
    ctx.status = 404;

    ctx.body = `${ctx.method} ${ctx.path} not found`;
  });

  return http.createServer(app.callback());
}
