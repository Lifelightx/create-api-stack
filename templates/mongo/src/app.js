import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

/**
 * -----------------------------------------
 * Security Middleware
 * -----------------------------------------
 */
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || "*",
    credentials: true
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Too many requests, try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use(mongoSanitize());

/**
 * -----------------------------------------
 * Performance Middleware
 * -----------------------------------------
 */
app.use(compression());

/**
 * -----------------------------------------
 * Body Parsers
 * -----------------------------------------
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * -----------------------------------------
 * Logging
 * -----------------------------------------
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * -----------------------------------------
 * Health Check
 * -----------------------------------------
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

/**
 * -----------------------------------------
 * API Routes
 * -----------------------------------------
 */
app.use("/api/v1/auth", authRoutes);

/**
 * -----------------------------------------
 * Error Handling
 * -----------------------------------------
 */
app.use(errorHandler);

export default app;