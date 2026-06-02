import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env.js";
import {
  persistUploadedFile,
  removeStoredProjectImage,
  uploadRoot
} from "../utils/uploadFiles.js";

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64"
);

if (env.fileStorageDriver !== "cloudinary") {
  console.log("Cloudinary verification skipped: FILE_STORAGE_DRIVER is not cloudinary.");
  process.exit(0);
}

const filename = `cloudinary-verify-${Date.now()}.png`;
const filePath = path.join(uploadRoot, filename);

try {
  await fs.mkdir(uploadRoot, { recursive: true });
  await fs.writeFile(filePath, onePixelPng);

  const stored = await persistUploadedFile({
    filename,
    mimetype: "image/png",
    originalname: "cloudinary-verify.png",
    path: filePath
  });

  console.log(`Cloudinary upload ok: ${stored.imageUrl}`);
  await removeStoredProjectImage(stored);
  console.log("Cloudinary delete ok.");
} finally {
  await fs.rm(filePath, { force: true });
}
