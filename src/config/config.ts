import { integer, oneOf } from "./helpers";

export const server = {
  port: integer("PORT"),
};

export const logger = {
  level: oneOf("LOG_LEVEL", ["silent", "debug", "info", "warn", "error"]),
  format: oneOf("LOG_FORMAT", ["pretty", "json"]),
};
