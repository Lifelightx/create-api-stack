import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { setupSwagger } from "./config/swagger.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();
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


app.use(compression());

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Swagger Documentation
setupSwagger(app);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Server is healthy
 */
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
