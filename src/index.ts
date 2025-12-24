import dotenvx from "@dotenvx/dotenvx";
import path from "path";

dotenvx.config({
  path: [
    path.join(__dirname, "../.env"),
    path.join(
      __dirname,
      `../environments/.env.${process.env.NODE_ENV ?? "development"}`
    ),
  ],
  envKeysFile: path.join(__dirname, "../.env.keys"),
});

import { config } from "./config";
import { createServer } from "./server";
import { logger } from "./logger";
import { createHttpTerminator } from "http-terminator";

async function main() {
  const server = createServer();

  server.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
  });

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

  const terminator = createHttpTerminator({
    server,
    gracefulTerminationTimeout: config.server.gracefulShutdownTimeoutMs,
  });

  exitSignals.forEach((s) => {
    process.on(s, async () => {
      logger.info(`${s} signal received. Closing server.`);

      await terminator.terminate();

      process.exit(0);
    });
  });
}

main();
