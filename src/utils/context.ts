import { AsyncLocalStorage } from "async_hooks";

export const context = new AsyncLocalStorage<Map<string, any>>();

export const httpContextMiddleware = (req, res, next) => {
  context.run(new Map(), () => {
    next();
  });
};
