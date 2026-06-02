import { env } from "../config/env.js";

function write(level, event, details = {}) {
  const payload = {
    at: new Date().toISOString(),
    event,
    level,
    service: "portfolio-api",
    ...details
  };

  if (env.nodeEnv === "production") {
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
      JSON.stringify(payload)
    );
    return;
  }

  const summary = details.message || details.error || "";
  console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
    `[${payload.at}] ${level.toUpperCase()} ${event}${summary ? `: ${summary}` : ""}`
  );
}

export const logger = {
  info(event, details) {
    write("info", event, details);
  },
  warn(event, details) {
    write("warn", event, details);
  },
  error(event, details) {
    write("error", event, details);
  }
};
