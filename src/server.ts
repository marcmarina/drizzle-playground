import express from "express";
import http from "http";

export function createServer() {
  const app = express();

  app.get("/_health", (req, res, next) => {
    res.send("OK");
  });

  app.use((req, res, next) => {
    res.send(`${req.method} ${req.path} not found`);
  });

  return http.createServer(app);
}
