import "dotenv/config";

import { config } from "./config";
import { createServer } from "./server";

async function main() {
  const server = createServer();

  server.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });
}

main();
