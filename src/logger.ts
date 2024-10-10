import pino from "pino";
import { config } from "./config";

export const logger = pino({
  level: config.logger.level,
  ...(config.logger.format === "pretty" && {
    transport: {
      target: "pino-pretty",
    },
  }),
});
