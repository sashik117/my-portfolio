import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isAllowedOrigin } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { requestId } from "./middleware/requestId.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { logger } from "./utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(requestId);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    referrerPolicy: { policy: "no-referrer" }
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      const error = new Error(`CORS blocked origin: ${origin}`);
      error.statusCode = 403;
      callback(error);
    },
    credentials: true,
    maxAge: 86400,
    optionsSuccessStatus: 204
  })
);
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: {
      write(message) {
        logger.info("http_request", { message: message.trim() });
      }
    }
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/api/auth",
  rateLimit({
    legacyHeaders: false,
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true
  }),
  authRoutes
);

app.use("/api/projects", projectRoutes);
app.use(
  "/api/messages",
  rateLimit({
    legacyHeaders: false,
    windowMs: 10 * 60 * 1000,
    max: 12,
    standardHeaders: true
  }),
  messageRoutes
);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "portfolio-api",
    uptime: Math.round(process.uptime()),
    storage: process.env.FILE_STORAGE_DRIVER || "local"
  });
});

app.get("/api/ready", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    ok: connected,
    database: connected ? "connected" : "disconnected",
    service: "portfolio-api"
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
