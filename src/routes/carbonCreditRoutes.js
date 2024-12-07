const express = require("express");
const { addCarbonCredits, getUserCredits } = require("../controllers/carbonCreditController");
const router = express.Router();

// Add carbon credits for a transaction
router.post("/add", addCarbonCredits);

// Get all carbon credits for a specific user
router.get("/:walletAddress", getUserCredits);

module.exports = router;
