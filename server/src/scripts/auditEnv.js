import "dotenv/config";
import { env } from "../config/env.js";

const strict = process.env.AUDIT_STRICT === "true" || env.nodeEnv === "production";
const errors = [];
const warnings = [];

function requireValue(name, value, hint) {
  if (!value) {
    errors.push(`${name} is missing${hint ? `: ${hint}` : "."}`);
  }
}

function isUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function warnValue(name, value, hint) {
  if (!value) {
    warnings.push(`${name} is missing${hint ? `: ${hint}` : "."}`);
  }
}

requireValue("JWT_SECRET", env.jwtSecret && env.jwtSecret.length >= 24, "use at least 24 characters.");
requireValue("MONGODB_URI", env.mongoUri, "use MongoDB Atlas or another production MongoDB.");
requireValue("ADMIN_EMAIL", env.adminEmail, "needed for the first CMS admin.");
requireValue("ADMIN_PASSWORD", env.adminPassword, "needed for the first CMS admin.");

if (env.nodeEnv === "production") {
  requireValue(
    "CLIENT_URL or CLIENT_URLS",
    env.clientOrigins.length > 0,
    "production CORS must allow only explicit frontend origins."
  );
  env.clientOrigins.forEach((origin) => {
    if (!isUrl(origin)) {
      errors.push(`CLIENT_URLS contains an invalid origin: ${origin}`);
    }
  });
  requireValue(
    "REFRESH_COOKIE_SECURE",
    env.refreshCookieSecure,
    "refresh cookies must be secure in production."
  );
}

if (!["lax", "strict", "none"].includes(String(env.refreshCookieSameSite).toLowerCase())) {
  errors.push("REFRESH_COOKIE_SAMESITE must be lax, strict, or none.");
}

if (!Number.isFinite(env.refreshTokenExpiresDays) || env.refreshTokenExpiresDays < 1) {
  errors.push("REFRESH_TOKEN_EXPIRES_DAYS must be a positive number.");
}

if (/d$/.test(env.adminTokenExpiresIn)) {
  warnings.push("ADMIN_TOKEN_EXPIRES_IN looks long. Prefer a short value such as 15m with refresh rotation.");
}

if (env.fileStorageDriver === "cloudinary") {
  requireValue("CLOUDINARY_CLOUD_NAME", env.cloudinary.cloudName);
  requireValue("CLOUDINARY_API_KEY", env.cloudinary.apiKey);
  requireValue("CLOUDINARY_API_SECRET", env.cloudinary.apiSecret);
} else {
  warnings.push("FILE_STORAGE_DRIVER is local. Use cloudinary for durable production uploads.");
}

warnValue("SMTP_HOST", process.env.SMTP_HOST, "contact messages will still save to CMS, but email alerts are disabled.");
warnValue("SMTP_USER", process.env.SMTP_USER);
warnValue("SMTP_PASS", process.env.SMTP_PASS);
warnValue("CONTACT_TO", process.env.CONTACT_TO);

if (warnings.length) {
  console.log("Environment warnings:");
  warnings.forEach((item) => console.log(`- ${item}`));
}

if (errors.length) {
  const label = strict
    ? "Environment errors:"
    : "Environment missing values (non-strict local audit):";
  const write = strict ? console.error : console.log;
  write(label);
  errors.forEach((item) => write(`- ${item}`));
  if (strict) process.exit(1);
}

console.log(errors.length ? "Environment audit completed with missing values." : "Environment audit completed.");
