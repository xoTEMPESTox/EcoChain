const Project = require("../models/Project");

const createProject = async (req, res) => {
    const { projectName, description, walletAddress, carbonCreditsGenerated } = req.body;

    try {
        // Create a new project
        const newProject = await Project.create({
            projectName,
            description,
            walletAddress,
            carbonCreditsGenerated,
        });

        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const fundProject = async (req, res) => {
    const { walletAddress, projectId, amount } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ success: false, message: "Invalid projectId format" });
        }
        
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        if (project.status === "funded") {
            return res.status(400).json({ success: false, message: "Project is already fully funded" });
        }

        // Calculate credits allocated (example: 1 USD = 10 credits)
        const creditsAllocated = amount * 10;

        // Update project status
        project.status = "funded";
        await project.save();

        // Log the success case for debugging
        console.log(`Project funded successfully: ${projectId}, Amount: ${amount}`);

        res.status(200).json({
            success: true,
            message: `Project funded successfully. Allocated ${creditsAllocated} credits.`,
        });
    } catch (error) {
        console.error("Error in fundProject API:", error.message);
        res.status(500).send("Internal Server Error");
    }
};


module.exports = { createProject, getAllProjects, fundProject };

