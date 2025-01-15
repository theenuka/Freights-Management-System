const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute=require("./routes/auth")
const userRoute=require("./routes/user")
const parcelRoute=require("./routes/parcel")

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/users", userRoute)
app.use("/api/v1/parcels", parcelRoute)

const DB = process.env.DB; // Ensure this matches the variable in your .env file
const PORT = process.env.PORT || 5000;

// Log environment variables for debugging
console.log(`DB: ${DB}, PORT: ${PORT}`);

mongoose.connect(DB)
    .then(() => {
        console.log("DB connection is successful");
    })
    .catch((err) => {
        console.error("DB Connection Error: ", err);
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)});