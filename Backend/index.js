const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());

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