const express = require("express");
const { createProject } = require("../controllers/createProject");
const { getAllProjects } = require("../controllers/createProject");
const { fundProject } = require("../controllers/createProject");
const router = express.Router();

// Route for creating a new project
router.post("/create", createProject);
router.get("/", getAllProjects);
router.post("/fund", fundProject);


module.exports = router;
