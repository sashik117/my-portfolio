import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { env } from "../config/env.js";

export async function seedAdmin() {
  const email = env.adminEmail.toLowerCase();
  const password = env.adminPassword;

  if (!email || !password) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD is missing. Admin login is disabled.");
    return;
  }

  const existing = await Admin.findOne({ email });
  if (existing) return;

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash });
  console.log(`Admin user created: ${email}`);
}
