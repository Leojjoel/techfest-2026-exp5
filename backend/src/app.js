import express from "express";
import cors from "cors";
import helmet from "helmet";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { eventRouter } from "./routes/events.js";
import { registrationRouter } from "./routes/registrations.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
  app.use(express.json({ limit: "20kb" }));

  app.get("/", (_req, res) => res.json({ name: "TechFest 2026 API", status: "running" }));
  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/events", eventRouter);
  app.use("/api/registrations", registrationRouter);

  app.use((_req, res) => res.status(404).json({ message: "Route not found" }));
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.status ? err.message : "Internal server error" });
  });
  return app;
}
