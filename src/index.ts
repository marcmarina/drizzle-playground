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

import { createHttpTerminator } from "http-terminator";

import { config } from "./config";
import { pool } from "./database";
import { logger } from "./logger";
import { createServer } from "./server";

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

      await pool.end();

      logger.info(`Server closed. Exiting process.`);

      process.exit(0);
    });
  });
}

main();
