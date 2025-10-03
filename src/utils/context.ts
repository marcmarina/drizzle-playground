import { AsyncLocalStorage } from "async_hooks";
import { NextFunction, Request, Response } from "express";

export const context = new AsyncLocalStorage<Map<string, any>>();

export const httpContextMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return context.run(new Map(), next);
};
