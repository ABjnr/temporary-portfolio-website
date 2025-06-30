import express from "express";
const router = express.Router();

import db from "./db.js";

// project router
router.get("/project", async (req, res) => {
  try {
    let projects = await db.getProjects();
    res.render("projects", { projects: projects });
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Something went wrong, check console for details");
  }
});

router.get("/project/add", async (req, res) => {
  res.render("addProject");
});
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

// skill router
router.get("/skill", async (req, res) => {
  try {
    let skills = await db.getSkills();
    res.render("skills", { skills: skills });
  } catch (error) {
    console.log("error message: ", error);
  }
});

router.get("/skill/add", (req, res) => {
  res.render("addSkill");
});
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

router.get("/skill/update", (req, res) => {
  const { name } = req.query;
  res.render("updateSkill", { name: name });
});
router.post("/skill/update", async (req, res) => {
  try {
    const { name, newLevel } = req.body;
    await db.updateSkillLevel(name, newLevel);
    res.redirect("/admin/skill");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Failed to update skill");
  }
});

router.post("/skill/delete", async (req, res) => {
  try {
    const { name } = req.body;
    await db.deleteSkill(name);
    res.redirect("/admin/skill");
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).send("Failed to delete skill");
  }
});

export default router;
