import dotenvx from "@dotenvx/dotenvx";
import path from "path";

const environment = process.env.NODE_ENV ?? "development";

dotenvx.config({
  path: [
    path.join(__dirname, "../.env"),
    path.join(__dirname, `../environments/.env.${environment}`),
  ],
  envKeysFile: path.join(__dirname, "../.env.keys"),
});

import { config } from "./config";
import { createServer } from "./server";
import { logger } from "./logger";
import { createHttpTerminator } from "http-terminator";
import { pool } from "./database";

async function main() {
  const server = createServer();

  server.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
  });

  const terminator = createHttpTerminator({
    server,
    gracefulTerminationTimeout: config.server.gracefulShutdownTimeoutMs,
  });

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

  exitSignals.forEach((signal) => {
    process.on(signal, async () => {
      logger.info(`${signal} signal received. Closing server.`);

      await terminator.terminate();

      await pool.end();

      logger.info(`Server closed. Exiting process.`);

      process.exit(0);
    });
  });
}

main();
