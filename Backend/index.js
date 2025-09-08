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

const PORT = process.env.PORT;


//Database Connection
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB connection is successfull");
  })
  .catch((e) => {
    console.log(e);
  });


//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
