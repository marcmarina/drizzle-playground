import { boolean, integer, oneOf } from "./helpers";

export const server = {
  port: integer("PORT"),
  requestLogging: {
    enabled: boolean("ENABLE_REQUEST_LOGGING"),
  },
};

export const logger = {
  level: oneOf("LOG_LEVEL", ["silent", "debug", "info", "warn", "error"]),
  format: oneOf("LOG_FORMAT", ["pretty", "json"]),
};
