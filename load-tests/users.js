// Exercises the user CRUD routes. Each iteration creates a user, reads it back,
// occasionally lists all users, then deletes it so the table doesn't grow.
//
// Runs against production by default. Pick a profile via the package scripts:
//
//   yarn load-test:smoke | load-test:load | load-test:stress | load-test:spike
//   BASE_URL=http://localhost:8080 yarn load-test:smoke
import http from "k6/http";
import { check, fail, sleep } from "k6";

import { BASE_URL, options as buildOptions } from "./lib/config.js";

export const options = buildOptions();

const jsonParams = (name) => ({
  headers: { "Content-Type": "application/json" },
  tags: { name },
});

// GET /users has no pagination, so keep it to a fraction of iterations.
const LIST_RATIO = Number(__ENV.LIST_RATIO || 0.1);

export function setup() {
  const res = http.get(`${BASE_URL}/_health`);

  if (res.status !== 200) {
    fail(`${BASE_URL} is not healthy (status ${res.status})`);
  }
}

export default function () {
  const payload = {
    firstName: `k6-${__VU}`,
    lastName: `iter-${__ITER}`,
  };

  const created = http.post(
    `${BASE_URL}/users`,
    JSON.stringify(payload),
    jsonParams("POST /users")
  );

  const ok = check(created, {
    "create: status 201": (r) => r.status === 201,
    "create: returns id": (r) => typeof r.json("id") === "number",
  });

  if (!ok) {
    sleep(1);
    return;
  }

  const id = created.json("id");

  const fetched = http.get(`${BASE_URL}/users/${id}`, {
    tags: { name: "GET /users/:id" },
  });

  check(fetched, {
    "get: status 200": (r) => r.status === 200,
    "get: matches created user": (r) =>
      r.json("id") === id && r.json("firstName") === payload.firstName,
  });

  if (Math.random() < LIST_RATIO) {
    const list = http.get(`${BASE_URL}/users`, {
      tags: { name: "GET /users" },
    });

    check(list, {
      "list: status 200": (r) => r.status === 200,
      "list: is array": (r) => Array.isArray(r.json()),
    });
  }

  const deleted = http.del(`${BASE_URL}/users/${id}`, null, {
    tags: { name: "DELETE /users/:id" },
  });

  check(deleted, {
    "delete: status 200": (r) => r.status === 200,
    "delete: removed one row": (r) => r.body === "1",
  });

  sleep(1);
}
