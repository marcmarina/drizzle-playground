import { boolean, integer, oneOf, string } from "./helpers";

export const server = {
  port: integer("PORT"),
};

export const logger = {
  level: oneOf("LOG_LEVEL", ["silent", "debug", "info", "warn", "error"]),
  format: oneOf("LOG_FORMAT", ["pretty", "json"]),
};

export const database = {
  host: string("DB_HOST"),
  port: integer("DB_PORT"),
  database: string("DB_DATABASE"),
  user: string("DB_USER"),
  password: string("DB_PASSWORD"),
  ssl: boolean("DB_SSL"),
};
