const express = require("express");
const router = express.Router();

// Import the controller functions
const { deleteUser, getAllUsers } = require("../controllers/user");

// DELETE
router.delete("/:id", deleteUser);

// GET ALL USERS
router.get("/", getAllUsers);

module.exports = router;
