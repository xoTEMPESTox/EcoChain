const express = require("express");
const { registerUser, getUserDetails } = require("../controllers/userController");
const router = express.Router();

// Register a new user
router.post("/register", registerUser);

router.get("/me", getUserDetails);

module.exports = router;
