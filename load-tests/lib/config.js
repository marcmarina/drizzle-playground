export const BASE_URL = (
  __ENV.BASE_URL || "https://drizzle-playground.marc-lab.dev"
).replace(/\/$/, "");

const thresholds = {
  http_req_failed: ["rate<0.01"],
  http_req_duration: ["p(95)<500", "p(99)<1000"],
  checks: ["rate>0.99"],
};

// Pick one with PROFILE=<name>. Defaults to smoke so an accidental run is cheap.
const profiles = {
  smoke: {
    vus: 1,
    duration: "30s",
  },
  load: {
    stages: [
      { duration: "2m", target: 15 },
      { duration: "2m", target: 30 },
      { duration: "2m", target: 50 },
      { duration: "5m", target: 50 },
      { duration: "2m", target: 0 },
    ],
  },
  stress: {
    stages: [
      { duration: "3m", target: 50 },
      { duration: "3m", target: 100 },
      { duration: "3m", target: 150 },
      { duration: "3m", target: 200 },
      { duration: "5m", target: 200 },
      { duration: "3m", target: 0 },
    ],
  },
  spike: {
    stages: [
      { duration: "30s", target: 5 },
      { duration: "10s", target: 150 },
      { duration: "1m", target: 150 },
      { duration: "10s", target: 5 },
      { duration: "30s", target: 5 },
      { duration: "10s", target: 0 },
    ],
  },
};

export function options() {
  const name = __ENV.PROFILE || "smoke";
  const profile = profiles[name];

  if (!profile) {
    throw new Error(
      `Unknown PROFILE "${name}". Use one of: ${Object.keys(profiles).join(", ")}`
    );
  }

  return { ...profile, thresholds };
}
