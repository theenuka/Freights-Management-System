const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth");
const router = express.Router();

//REGISTER

router.post("/register", registerUser);

//LOGIN

router.post("/login", loginUser);

module.exports = router;
