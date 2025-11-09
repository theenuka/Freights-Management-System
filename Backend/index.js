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
  res.status(200).json({ status: "ok" });
});

// Prefer env PORT, fallback to 8000 for local dev
// Use env PORT or auto-fallback to first free port from 8000 upward
let basePort = parseInt(process.env.PORT, 10) || 8000;

const net = require('net');
function findFreePort(start, cb) {
  const server = net.createServer();
  server.unref();
  server.on('error', () => findFreePort(start + 1, cb));
  server.listen(start, () => {
    const port = server.address().port;
    server.close(() => cb(port));
  });
}


//Database Connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });


findFreePort(basePort, (PORT) => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  server.on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use even after scan. Set PORT manually to a free port.`
      );
      process.exit(1);
    }
    console.error(err);
    process.exit(1);
  });
});
