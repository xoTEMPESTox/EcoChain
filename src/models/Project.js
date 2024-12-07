const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    carbonCreditsGenerated: { type: Number, required: true },
    walletAddress: { type: String, required: true },
    status: { type: String, enum: ["active", "funded"], default: "active" },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
