const User = require("../models/user");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, walletAddress, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ walletAddress });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Wallet address already registered" });
        }

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            walletAddress,
            role,
        });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        // Example: Fetch the first user in the database (for testing purposes)
        const user = await User.findOne(); // Change this to a real query based on your needs
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                walletAddress: user.walletAddress,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};





module.exports = { registerUser, getUserDetails};
