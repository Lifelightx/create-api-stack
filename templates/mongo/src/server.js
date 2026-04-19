import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const server = app.listen(PORT, () => {
  console.log(
    chalk.yellow.bold(
      `🚀 Server running in ${NODE_ENV} mode on port ${PORT}`
    )
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(chalk.red(`Error: ${err.message}`));
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Graceful shutdown
const shutdown = (signal) => {
  console.log(chalk.red(`\n${signal} received. Shutting down gracefully...`));
  server.close(() => {
    console.log(chalk.red("Process terminated."));
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));