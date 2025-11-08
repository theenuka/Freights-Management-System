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

// Prefer env PORT, fallback to 8000 for local dev
const PORT = parseInt(process.env.PORT, 10) || 8000;


//Database Connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });


// start server with basic error handling for common port issues
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Free the port or set a different PORT in your environment (e.g., PORT=8001).`
    );
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});
