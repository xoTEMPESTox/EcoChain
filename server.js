const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const carbonCreditRoutes = require("./src/routes/carbonCreditRoutes");
const projectRoutes = require("./src/routes/projectRoutes");



dotenv.config();

const app = express();

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("EcoChain Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

connectDB();
app.use("/api/users", userRoutes);
app.use("/api/carbon-credits", carbonCreditRoutes);
app.use("/api/projects", projectRoutes);