import bcrypt from "bcryptjs";
import { z } from "zod";
import Admin from "../models/Admin.js";
import {
  clearRefreshCookie,
  createAccessToken,
  createRefreshSession,
  getRefreshCookie,
  revokeRefreshSession,
  rotateRefreshSession,
  setRefreshCookie
} from "../utils/authTokens.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Enter a valid email and password." });
  }

  const admin = await Admin.findOne({ email: parsed.data.email.toLowerCase() });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isValid = await bcrypt.compare(parsed.data.password, admin.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = createAccessToken(admin);
  const refresh = await createRefreshSession(admin, req);
  setRefreshCookie(res, refresh.token);

  res.json({
    token,
    admin: {
      email: admin.email,
      role: admin.role
    }
  });
}

export async function me(req, res) {
  res.json({
    admin: {
      email: req.admin.email,
      role: req.admin.role
    }
  });
}

export async function refresh(req, res) {
  const currentRefreshToken = getRefreshCookie(req);
  const session = await rotateRefreshSession(currentRefreshToken, req);
  const token = createAccessToken(session.admin);
  setRefreshCookie(res, session.refreshToken);

  res.json({
    token,
    admin: {
      email: session.admin.email,
      role: session.admin.role
    }
  });
}

export async function logout(req, res) {
  await revokeRefreshSession(getRefreshCookie(req));
  clearRefreshCookie(res);
  res.json({ message: "Signed out." });
}
