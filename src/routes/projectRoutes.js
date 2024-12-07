const express = require("express");
const { createProject } = require("../controllers/projectController");
const router = express.Router();

// Route for creating a new project
router.post("/create", createProject);
router.get("/", getAllProjects);
router.post("/fund", fundProject);


module.exports = router;
