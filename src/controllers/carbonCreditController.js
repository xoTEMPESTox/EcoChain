const CarbonCredit = require("../models/CarbonCredit");

// Add carbon credits for a transaction
const addCarbonCredits = async (req, res) => {
    console.log("Route hit");
    const { from, to, amount, transactionHash } = req.body;

    try {
        const newCredit = await CarbonCredit.create({ from, to, amount, transactionHash });
        res.status(201).json({ success: true, data: newCredit });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all carbon credits for a specific user
const getUserCredits = async (req, res) => {
    const { walletAddress } = req.params;

    try {
        const credits = await CarbonCredit.find({
            $or: [{ from: walletAddress }, { to: walletAddress }],
        });

        res.status(200).json({ success: true, data: credits });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addCarbonCredits, getUserCredits };
