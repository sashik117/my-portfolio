import fs from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadRoot = path.join(__dirname, "..", "uploads");

export function toUploadPath(url = "") {
  if (!url.startsWith("/uploads/")) return null;
  const filename = path.basename(url);
  return path.join(uploadRoot, filename);
}

export async function removeUploadedFile(url = "") {
  const filePath = toUploadPath(url);

  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn(`Could not remove uploaded file ${filePath}:`, error.message);
    }
  }
}

function signCloudinaryParams(params) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${payload}${env.cloudinary.apiSecret}`)
    .digest("hex");
}

function assertCloudinaryConfigured() {
  const { apiKey, apiSecret, cloudName } = env.cloudinary;

  if (!apiKey || !apiSecret || !cloudName) {
    const error = new Error(
      "Cloudinary storage is enabled but CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET is missing."
    );
    error.statusCode = 500;
    throw error;
  }
}

async function uploadToCloudinary(file) {
  assertCloudinaryConfigured();

  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    folder: env.cloudinary.folder,
    timestamp
  };
  const signature = signCloudinaryParams(params);
  const buffer = await fs.readFile(file.path);
  const form = new FormData();

  form.set("api_key", env.cloudinary.apiKey);
  form.set("folder", env.cloudinary.folder);
  form.set("signature", signature);
  form.set("timestamp", String(timestamp));
  form.set("file", new Blob([buffer], { type: file.mimetype }), file.originalname);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.cloudinary.cloudName}/image/upload`,
    {
      method: "POST",
      body: form
    }
  );
  const data = await response.json();

  await removeUploadedFile(`/uploads/${file.filename}`);

  if (!response.ok) {
    const error = new Error(data.error?.message || "Cloudinary upload failed.");
    error.statusCode = 502;
    throw error;
  }

  return {
    imageStorageKey: data.public_id,
    imageStorageProvider: "cloudinary",
    imageUrl: data.secure_url
  };
}

async function removeFromCloudinary(publicId) {
  if (!publicId) return;
  assertCloudinaryConfigured();

  const timestamp = Math.round(Date.now() / 1000);
  const params = {
    public_id: publicId,
    timestamp
  };
  const signature = signCloudinaryParams(params);
  const form = new FormData();

  form.set("api_key", env.cloudinary.apiKey);
  form.set("public_id", publicId);
  form.set("signature", signature);
  form.set("timestamp", String(timestamp));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.cloudinary.cloudName}/image/destroy`,
    {
      method: "POST",
      body: form
    }
  );

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    console.warn("Could not remove Cloudinary image:", data.error?.message || response.statusText);
  }
}

export async function persistUploadedFile(file) {
  if (!file) return {};

  if (env.fileStorageDriver === "cloudinary") {
    return uploadToCloudinary(file);
  }

  return {
    imageStorageKey: file.filename,
    imageStorageProvider: "local",
    imageUrl: `/uploads/${file.filename}`
  };
}

export async function removeStoredProjectImage(project) {
  if (!project?.imageUrl) return;

  if (project.imageStorageProvider === "cloudinary") {
    await removeFromCloudinary(project.imageStorageKey);
    return;
  }

  await removeUploadedFile(project.imageUrl);
}
