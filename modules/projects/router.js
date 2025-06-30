import express from "express";
const router = express.Router();

import projectDb from "./db.js";

router.get("/", async (req, res) => {
  try {
    let projects = await projectDb.getProjects();
    res.render("projects", { projects: projects });
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Something went wrong, check console for details");
  }
});

router.get("/add", async (req, res) => {
  res.render("addProject");
});
router.post("/add", async (req, res) => {
  try {
    const {
      projectTitle,
      projectDesc,
      projectTechnologies,
      projectGitLink,
      projectLiveLink,
    } = req.body;

    await projectDb.addProject(
      projectTitle,
      projectDesc,
      projectTechnologies,
      projectGitLink,
      projectLiveLink
    );
    res.redirect("/project");
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).send("Failed to add project");
  }
});

router.get("/update", async (req, res) => {
  try {
    const { id } = req.query;
    const project = await projectDb.getProjectById(id);
    res.render("updateProject", { project: project });
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Something went wrong, check console for details");
  }
});
router.post("/update", async (req, res) => {
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
    await projectDb.updateProjectById(id, updateFields);
    res.redirect("/project");
  } catch (error) {
    console.log("error message: ", error);
    res.status(500).send("Could not update project");
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id } = req.query;
    await projectDb.deleteProjectById(id);
    res.redirect("/project");
  } catch (error) {
    console.log("error message: ", error);
    res
      .status(500)
      .send("Something went wrong, check the console for details.");
  }
});
export default router;
