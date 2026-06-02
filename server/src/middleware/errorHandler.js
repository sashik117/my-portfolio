import multer from "multer";
import { ZodError } from "zod";

export function notFound(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, _req, res, _next) {
  console.error(error);

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Image must be smaller than 4MB."
          : "Upload failed."
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: error.issues[0]?.message || "Invalid request data."
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource id." });
  }

  res.status(error.statusCode || 500).json({
    message: error.message || "Server error."
  });
}
