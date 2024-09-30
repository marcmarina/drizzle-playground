import "dotenv/config";

import { config } from "./config";
import { createServer } from "./server";

async function main() {
  const server = createServer();

  server.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });

  const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];

  exitSignals.forEach((s) => {
    process.on(s, () => {
      console.log(`${s} signal received. Closing server.`);

      server.close(() => {
        process.exit(1);
      });
    });
  });
}

main();
