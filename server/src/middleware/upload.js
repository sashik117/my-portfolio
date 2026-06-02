import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadRoot = path.join(__dirname, "..", "uploads");
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadRoot,
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    callback(null, safeName);
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 4 * 1024 * 1024
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      return callback(new Error("Only JPG, PNG, WEBP or GIF images are allowed."));
    }
    callback(null, true);
  }
});
