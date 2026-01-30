// Backend service bootstrap with safer module semantics.
// Requiring this file will no longer immediately bind a port; instead
// the server starts only when executed directly (node index.js) or when
// start() is called. This prevents secondary diagnostic "require" calls
// from colliding on PORT (EADDRINUSE) and failing silently in CI probes.

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const parcelRoute = require("./routes/parcel");

dotenv.config(); // Loads env vars
const app = express();
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/parcels", parcelRoute);

// Simple health endpoint for container checks
app.get("/api/v1/health", (req, res) => {
  // mongoose.connection.readyState: 0=disconnected,1=connected,2=connecting,3=disconnecting
  res.status(200).json({ status: "ok", db: mongoose.connection.readyState });
});

// Fixed port selection for container environments.
// In Docker we explicitly publish container port 8000 -> host 8000.
const PORT = parseInt(process.env.PORT, 10) || 8000;

// Allow disabling DB connection for diagnostics (e.g., DISABLE_DB=true)
function connectDatabase() {
  const disableDb = process.env.DISABLE_DB === "true";
  if (disableDb) {
    console.log("[BOOT] DISABLE_DB=true -> skipping mongoose.connect");
    return;
  }
  console.log("[BOOT] Connecting to MongoDB...");
  try {
    mongoose
      .connect(process.env.DB)
      .then(() => {
        console.log("DB connection is successful");
      })
      .catch((e) => {
        console.error("DB connection error", e);
      });
  } catch (e) {
    console.error("DB connect threw synchronously", e);
  }
}

function start() {
  console.log(
    `[BOOT] Starting backend (pid ${process.pid}) Node ${process.version} env=${process.env.NODE_ENV || ""}`
  );
  connectDatabase();
  const server = app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Set PORT to a free port.`);
      process.exit(1);
    }
    console.error("Server error", err);
    process.exit(1);
  });
}

// Basic top-level exception logging to avoid silent exits
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection", reason);
});

// Auto-start only when run directly (not when imported for diagnostics)
if (require.main === module) {
  start();
}

module.exports = { app, start };
