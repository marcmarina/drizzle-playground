import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import http from "http";

import { userRoutes } from "./routes";

export function createServer() {
  const app = new Koa();

  app.use(bodyParser());

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
