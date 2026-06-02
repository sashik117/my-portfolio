import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
