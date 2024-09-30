import { createServer } from "./server";

async function main() {
  const server = createServer();

  const port = Number(process.env.PORT) || 8080;

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main();
