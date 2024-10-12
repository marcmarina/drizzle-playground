import { AsyncLocalStorage } from "async_hooks";

export const context = new AsyncLocalStorage<Map<string, any>>();

export const httpContextMiddleware = (ctx, next) => {
  return context.run(new Map(), next);
};
