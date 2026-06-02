import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isAllowedOrigin } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false
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
    credentials: true
  })
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30
  }),
  authRoutes
);

app.use("/api/projects", projectRoutes);
app.use(
  "/api/messages",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 30
  }),
  messageRoutes
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-api" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
