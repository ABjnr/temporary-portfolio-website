import express from "express";
const router = express.Router();

import db from "./db.js";

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

/*--------------------------------
  Skill Routes
--------------------------------*/

// Get all skills
router.get("/skill", async (req, res) => {
  try {
    let skills = await db.getSkills();
    if (!skills.length) {
      await db.initializeSkills();
      skills = await db.getSkills();
    }
    res.render("skills", { skills: skills });
  } catch (error) {
    console.log("error message: ", error);
  }
});

// Render form to add a new skill
router.get("/skill/add", (req, res) => {
  res.render("addSkill");
});
// Handle new skill creation
router.post("/skill/add", async (req, res) => {
  try {
    const { skillName, skillLevel } = req.body;
    await db.addSkill(skillName, skillLevel);
    res.redirect("/admin/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to add skill");
  }
});

// Render update form with existing skill data for given id
router.get("/skill/update", async (req, res) => {
  const { id } = req.query;
  try {
    const skill = await db.getSkillById(id);
    res.render("updateSkill", { skill: skill });
  } catch (error) {
    console.log("Error fetching skill:", error);
    res.status(500).send("Failed to load skill");
  }
});
// Handle skill level update from submitted form data
router.post("/skill/update", async (req, res) => {
  try {
    const { id, newLevel } = req.body;
    await db.updateSkillLevel(id, newLevel);
    res.redirect("/admin/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to update skill");
  }
});

// Delete skill by id
router.post("/skill/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await db.deleteSkill(id);
    res.redirect("/admin/skill");
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).send("Failed to delete skill");
  }
});

export default router;
