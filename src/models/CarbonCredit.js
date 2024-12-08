const mongoose = require("mongoose");

const carbonCreditSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionHash: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CarbonCredit", carbonCreditSchema);
