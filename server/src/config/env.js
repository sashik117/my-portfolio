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
  adminTokenExpiresIn: process.env.ADMIN_TOKEN_EXPIRES_IN || "15m",
  clientOrigins: [
    ...splitOrigins(process.env.CLIENT_URLS || process.env.CLIENT_URL),
    ...(process.env.NODE_ENV === "production" ? [] : localClientOrigins)
  ],
  databaseName: process.env.MONGODB_DB || "",
  fileStorageDriver: process.env.FILE_STORAGE_DRIVER || "local",
  jwtSecret: process.env.JWT_SECRET || "",
  mongoUri: process.env.MONGODB_URI || "",
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5050),
  refreshCookieName: process.env.REFRESH_COOKIE_NAME || "portfolio_refresh",
  refreshCookieSameSite:
    process.env.REFRESH_COOKIE_SAMESITE || (process.env.NODE_ENV === "production" ? "none" : "lax"),
  refreshCookieSecure:
    process.env.REFRESH_COOKIE_SECURE === "true" || process.env.NODE_ENV === "production",
  refreshTokenExpiresDays: Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 30),
  cloudinary: {
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    folder: process.env.CLOUDINARY_FOLDER || "portfolio-projects"
  }
};

export function isAllowedOrigin(origin) {
  if (!origin) return true;
  return env.clientOrigins.includes(normalizeOrigin(origin));
}
