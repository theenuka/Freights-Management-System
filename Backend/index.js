const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const parcelRoute = require("./routes/parcel");

dotenv.config();  //Loads env vars
const app = express();
app.use(cors());
app.use(express.json());

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
// In Docker we explicitly publish container port 8000 -> host 8000, so dynamic
// scanning can cause mismatch if it ever increments. Keep it deterministic.
const PORT = parseInt(process.env.PORT, 10) || 8000;


//Database Connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((e) => {
    console.error("DB connection error", e.message);
  });

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set PORT to a free port.`);
    process.exit(1);
  }
  console.error("Server error", err);
  process.exit(1);
});

// Basic top-level exception logging to avoid silent exits
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection", reason);
});
