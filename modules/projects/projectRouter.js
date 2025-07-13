import express from "express";
const router = express.Router();

import db from "./projectDb.js";

/*--------------------------------
  Project Routes
--------------------------------*/

// Get all projects; if none, initialize default projects
router.get("/project", async (req, res) => {
  try {
    let projects = await db.getProjects();
    if (!projects.length) {
      await db.initializeProjects();
      projects = await db.getProjects();
    }
    res.render("projects", { projects: projects });
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Something went wrong, check console for details");
  }
});
// Render form for adding a new project
router.get("/project/add", async (req, res) => {
  res.render("addProject");
});
// Handle new project creation from form submission
router.post("/project/add", async (req, res) => {
  try {
    const {
      projectTitle,
      projectDesc,
      projectTechnologies,
      projectGitLink,
      projectLiveLink,
    } = req.body;

    await db.addProject(
      projectTitle,
      projectDesc,
      projectTechnologies,
      projectGitLink,
      projectLiveLink
    );
    res.redirect("/admin/project");
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).send("Failed to add project");
  }
});

// Render update form pre-filled with existing project data
router.get("/project/update", async (req, res) => {
  try {
    const { id } = req.query;
    const project = await db.getProjectById(id);
    res.render("updateProject", { project: project });
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Something went wrong, check console for details");
  }
});
// Process project updates submitted from the form
router.post("/project/update", async (req, res) => {
  try {
    const { id, title, description, technologies, githubLink, liveLink } =
      req.body;
    const updateFields = {
      title,
      description,
      technologies,
      githubLink,
      liveLink,
    };
    await db.updateProjectById(id, updateFields);
    res.redirect("/admin/project");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Could not update project");
  }
});

// Delete a project by its id
router.post("/project/delete", async (req, res) => {
  try {
    const { id } = req.query;
    await db.deleteProjectById(id);
    res.redirect("/admin/project");
  } catch (error) {
    console.log("error message: ", error);
    res
      .status(500)
      .send("Something went wrong, check the console for details.");
  }
});

export default router;
