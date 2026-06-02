import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import RefreshToken from "../models/RefreshToken.js";

export function createAccessToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, env.jwtSecret, {
    expiresIn: env.adminTokenExpiresIn
  });
}

export function hashRefreshToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function getRefreshCookie(req) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [key, ...value] = part.split("=");
        return [decodeURIComponent(key), decodeURIComponent(value.join("="))];
      })
  );

  return cookies[env.refreshCookieName] || "";
}

export function setRefreshCookie(res, token) {
  res.cookie(env.refreshCookieName, token, {
    httpOnly: true,
    maxAge: env.refreshTokenExpiresDays * 24 * 60 * 60 * 1000,
    path: "/api/auth",
    sameSite: env.refreshCookieSameSite,
    secure: env.refreshCookieSecure
  });
}

export function clearRefreshCookie(res) {
  res.clearCookie(env.refreshCookieName, {
    path: "/api/auth",
    sameSite: env.refreshCookieSameSite,
    secure: env.refreshCookieSecure
  });
}

export async function createRefreshSession(admin, req, tokenFamily = crypto.randomUUID()) {
  const token = crypto.randomBytes(64).toString("hex");
  const tokenHash = hashRefreshToken(token);
  const expiresAt = new Date(Date.now() + env.refreshTokenExpiresDays * 24 * 60 * 60 * 1000);

  await RefreshToken.create({
    admin: admin._id,
    expiresAt,
    ipAddress: req.ip || "",
    tokenFamily,
    tokenHash,
    userAgent: req.get("user-agent") || ""
  });

  return { token, tokenHash };
}

function authError(message = "Invalid or expired session.") {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
}

export async function rotateRefreshSession(token, req) {
  if (!token) {
    throw authError("Refresh token is missing.");
  }

  const tokenHash = hashRefreshToken(token);
  const current = await RefreshToken.findOne({ tokenHash }).populate("admin");

  if (!current) {
    throw authError();
  }

  if (current.revokedAt) {
    await RefreshToken.updateMany(
      { tokenFamily: current.tokenFamily, revokedAt: null },
      { revokedAt: new Date() }
    );
    throw authError("Refresh token reuse detected.");
  }

  if (current.expiresAt.getTime() <= Date.now()) {
    current.revokedAt = new Date();
    await current.save();
    throw authError();
  }

  const next = await createRefreshSession(current.admin, req, current.tokenFamily);
  current.revokedAt = new Date();
  current.replacedByTokenHash = next.tokenHash;
  await current.save();

  return {
    admin: current.admin,
    refreshToken: next.token
  };
}

export async function revokeRefreshSession(token) {
  if (!token) return;

  await RefreshToken.findOneAndUpdate(
    { tokenHash: hashRefreshToken(token), revokedAt: null },
    { revokedAt: new Date() }
  );
}
