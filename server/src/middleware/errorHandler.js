import multer from "multer";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

export function notFound(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    logger.error("request_failed", {
      error: error.message,
      method: req.method,
      path: req.originalUrl,
      requestId: req.id,
      stack: error.stack
    });
  } else {
    logger.warn("request_rejected", {
      message: error.message,
      method: req.method,
      path: req.originalUrl,
      requestId: req.id,
      statusCode
    });
  }

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

  res.status(statusCode).json({
    requestId: req.id,
    message: error.message || "Server error."
  });
}
