import "dotenv/config";

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
    gracefulTerminationTimeout: 3000,
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
