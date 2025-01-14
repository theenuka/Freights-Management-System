const express = require("express");
const router = express.Router();


// DELETE 

router.delete("/:id", deleteUser) 


  //GET ALL USERS

router.get("/", getAllUsers) 
 

module.exports = router;
