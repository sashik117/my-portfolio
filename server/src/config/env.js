const localClientOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3178",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3178"
];

function splitOrigins(value = "") {
  return value
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
}

function normalizeOrigin(origin = "") {
  return origin.trim().replace(/\/$/, "");
}

export const env = {
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  clientOrigins: [
    ...splitOrigins(process.env.CLIENT_URLS || process.env.CLIENT_URL),
    ...(process.env.NODE_ENV === "production" ? [] : localClientOrigins)
  ],
  databaseName: process.env.MONGODB_DB || "",
  jwtSecret: process.env.JWT_SECRET || "",
  mongoUri: process.env.MONGODB_URI || "",
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5050)
};

export function isAllowedOrigin(origin) {
  if (!origin) return true;
  return env.clientOrigins.includes(normalizeOrigin(origin));
}
