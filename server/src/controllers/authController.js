import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../config/env.js";
import Admin from "../models/Admin.js";

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

  const token = jwt.sign({ id: admin._id, role: admin.role }, env.jwtSecret, {
    expiresIn: env.adminTokenExpiresIn
  });

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
