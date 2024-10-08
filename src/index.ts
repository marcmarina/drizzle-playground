import "dotenv/config";

import { config } from "./config";
import { createServer } from "./server";
import { logger } from "./logger";

async function main() {
  const server = createServer();

  server.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`);
  });

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

  exitSignals.forEach((s) => {
    process.on(s, () => {
      logger.info(`${s} signal received. Closing server.`);

      server.close(() => {
        process.exit(1);
      });
    });
  });
}

main();
