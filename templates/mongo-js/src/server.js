import app from "./app.js";
import chalk from "chalk";
import dotenv from "dotenv";
import os from "os";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const getNetworkIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
};

const server = app.listen(PORT, () => {
  const networkIP = getNetworkIP();
  console.log(chalk.cyan.bold("\n🚀 Server is ready!"));
  console.log(chalk.white(`  - Local:    ${chalk.blue(`http://localhost:${PORT}`)}`));
  console.log(chalk.white(`  - Network:  ${chalk.blue(`http://${networkIP}:${PORT}`)}`));
  console.log(chalk.gray(`\nMode: ${NODE_ENV}\n`));
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